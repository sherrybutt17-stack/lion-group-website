/**
 * Prefix for files in public/ when the site is served from a sub-path (for
 * example GitHub Pages at /lion-group-website). Next adds the base path to
 * links and its own assets automatically; plain <img>/fetch URLs need this.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
