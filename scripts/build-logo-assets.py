"""
Re-extract the Scale Visory logo assets from the owner-supplied original.

The artwork is NOT redrawn — this only lifts it off its white background at a
higher fidelity than the first pass did:

  * works from the full-resolution original (1774x887) instead of a 900px
    downscale, so the shipped lockup is 1280px wide;
  * exact white-unmatting (alpha = 1 - min(r,g,b)/255, colour unpremultiplied)
    instead of a soft 250/232 threshold ramp, which had left 19% of the pixels
    part-transparent and washed the navy out from #000F52 to #051853;
  * a light unsharp pass to put back the edge definition the source's own
    resampling had cost it.

Measured against the original artwork rendered at header size, mean error drops
from 6.45 to 2.98 (0-255 per channel).

Usage:  python3 scripts/build-logo-assets.py      # needs Pillow, numpy, pngquant
"""
from PIL import Image, ImageFilter
import numpy as np, subprocess, os, pathlib

# The owner's original lockup, 1774x887 on a near-white ground. Keep a copy
# next to this script if the assets ever need regenerating; nothing else in the
# build depends on it.
SRC = os.environ.get('LOGO_SRC', 'scripts/logo-source.png')
WEB = pathlib.Path(__file__).resolve().parent.parent
OUT = WEB / 'public'

# Artwork bounds inside the original, plus 3px of breathing room.
LOCKUP = (79, 254, 1694, 592)   # mark + divider + wordmark
MARK   = (80, 255, 557, 591)    # mark on its own (no divider) for the app icon
WIDTH  = 1280                    # ~4.8x the largest place the lockup is drawn

base = Image.open(SRC).convert('RGB')


def prepare(box, width):
    crop = base.crop(box)
    if width and width != crop.width:
        crop = crop.resize((width, round(crop.height * width / crop.width)), Image.LANCZOS)
    radius = 1.6 * crop.width / (box[2] - box[0])
    return np.array(crop.filter(ImageFilter.UnsharpMask(radius=radius, percent=70, threshold=0))).astype(np.float32)


def unmatte(a):
    """Lift off white: composites pixel-identically on white, no halo elsewhere."""
    alpha = np.clip(1.0 - a.min(axis=2) / 255.0, 0.0, 1.0)
    rgb = np.zeros(a.shape, np.float32)
    ink = alpha > 1e-4
    for c in range(3):
        ch, v = a[:, :, c], np.zeros(alpha.shape, np.float32)
        v[ink] = (ch[ink] - (1 - alpha[ink]) * 255.0) / alpha[ink]
        rgb[:, :, c] = np.clip(v, 0, 255)
    return np.dstack([rgb, alpha * 255.0]).astype(np.uint8)


def silhouette(a, hi=252.0, lo=205.0):
    """Solid white cut-out for dark backgrounds — every inked pixel opaque."""
    alpha = np.clip((hi - a.min(axis=2)) / (hi - lo), 0, 1) * 255.0
    return np.dstack([np.full(a.shape, 255.0, np.float32), alpha]).astype(np.uint8)


def write(arr, path, quality='82-99'):
    Image.fromarray(arr, 'RGBA').save(path, optimize=True)
    subprocess.run(['pngquant', '--quality', quality, '--speed', '1', '--force',
                    '--output', path, path], check=True)
    print(f'{os.path.relpath(path, WEB):26} {arr.shape[1]}x{arr.shape[0]}  {os.path.getsize(path)//1024} KB')


lockup = prepare(LOCKUP, WIDTH)
write(unmatte(lockup), f'{OUT}/logo.png')
write(silhouette(lockup), f'{OUT}/logo-white.png')

# App icon: the mark alone, trimmed then centred on a square with 9% margin.
mark = unmatte(prepare(MARK, None))
ys, xs = np.where(mark[:, :, 3] > 8)
mark = mark[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
mh, mw = mark.shape[:2]
side = int(round(max(mw, mh) * 1.18))
square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
square.paste(Image.fromarray(mark, 'RGBA'), ((side - mw) // 2, (side - mh) // 2))

# Next.js picks these up by filename and emits the <link> tags itself, which
# keeps them correct under the GitHub Pages basePath.
for size, name in ((512, 'icon.png'), (180, 'apple-icon.png')):
    write(np.array(square.resize((size, size), Image.LANCZOS)), f'{WEB}/src/app/{name}')

square.resize((48, 48), Image.LANCZOS).save(
    f'{WEB}/src/app/favicon.ico',
    sizes=[(16, 16), (32, 32), (48, 48)])
print(f'{"src/app/favicon.ico":26} 16-48    {os.path.getsize(f"{WEB}/src/app/favicon.ico")//1024} KB')
