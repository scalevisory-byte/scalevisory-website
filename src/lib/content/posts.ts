/**
 * Resource posts.
 *
 * The site is a static export on GitHub Pages — there is no database and no
 * admin editor, so posts live here in code. To publish one, add an entry to
 * `posts` below and push; the build generates its page, adds it to the sitemap
 * and lists it under its category.
 *
 * `category` must be one of the `name` values in `resources.ts`.
 * `content` uses the same mini-markdown the site has always used:
 *   blank line = new paragraph · `## ` heading · `### ` sub-heading
 *   `- ` bullet · `**bold**`
 * Dates are ISO (YYYY-MM-DD).
 */

export interface Post {
  slug: string;
  title: string;
  category: string;
  /** Shown in listings and as the meta description. Keep it under ~160 chars. */
  excerpt: string;
  date: string;
  content: string;
}

/**
 * Empty on purpose — nothing is invented here. The Resources hub and each
 * category page handle the empty state on their own.
 *
 * NOTE FOR THE FIRST POST: the individual post route
 * `src/app/resources/[category]/[slug]/page.tsx` is currently NOT in the repo.
 * A static export refuses to build a dynamic route with zero pages, so it was
 * removed while this list is empty. Adding the first post means restoring that
 * page as well — ask Claude to "add a resource post" and both land together.
 * Until then, category pages show their empty state and nothing is broken.
 */
export const posts: Post[] = [];

export const publishedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
