// Minimal static server for the exported site in out/, used for QA and
// Lighthouse. It mirrors the production URL style (trailing slashes, 404.html),
// gzips text assets like a typical host, and reads whole files into memory
// (cached, invalidated when a rebuild changes the file) so aborted browser
// requests can't leak file handles.
// Usage: npm run start   (PORT=4173 by default)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = path.resolve(import.meta.dirname, "../out");
const port = Number(process.env.PORT ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
const compressible = new Set([".html", ".js", ".css", ".json", ".txt", ".svg"]);
const cache = new Map();

async function load(file) {
  const { mtimeMs, size } = await stat(file);
  const cached = cache.get(file);
  if (cached && cached.mtimeMs === mtimeMs && cached.size === size) return cached;
  const body = await readFile(file);
  const ext = path.extname(file);
  const entry = {
    mtimeMs,
    size,
    body,
    gzip: compressible.has(ext) ? gzipSync(body, { level: 6 }) : null,
    type: types[ext] ?? "application/octet-stream",
  };
  cache.set(file, entry);
  return entry;
}

const isFile = (p) => stat(p).then((s) => s.isFile()).catch(() => false);
const isDir = (p) => stat(p).then((s) => s.isDirectory()).catch(() => false);

createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    let file = path.join(root, pathname);
    if (!file.startsWith(root)) {
      res.writeHead(403).end();
      return;
    }

    let status = 200;
    if (await isDir(file)) {
      if (!pathname.endsWith("/")) {
        res.writeHead(301, { Location: `${pathname}/${url.search}` }).end();
        return;
      }
      file = path.join(file, "index.html");
    }
    if (!(await isFile(file))) {
      status = 404;
      file = path.join(root, "404.html");
    }

    const { body, gzip, type } = await load(file);
    const useGzip = gzip && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
    res.writeHead(status, {
      "Content-Type": type,
      "Cache-Control": pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache",
      ...(useGzip ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}),
    });
    res.end(useGzip ? gzip : body);
  } catch (error) {
    res.writeHead(500).end(String(error));
  }
}).listen(port, () => console.log(`Serving out/ at http://localhost:${port}`));
