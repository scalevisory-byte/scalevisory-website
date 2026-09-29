/**
 * GitHub Pages serves this site under /<repo>/ until the custom domain is
 * pointed at it. Next handles that prefix for its own bundles and for <Link>,
 * but not for a plain <img src="/…">, so those go through `asset()`.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
