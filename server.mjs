import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "dist/client");
const port = Number(process.env.PORT || 3000);
const mime = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".svg":"image/svg+xml" };

createServer(async (req, res) => {
  if (req.url === "/health") { res.writeHead(200, { "content-type":"application/json" }); return res.end('{"status":"ok"}'); }
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
  let file = join(root, safePath === "/" ? "index.html" : safePath);
  try { if (!(await stat(file)).isFile()) throw new Error("not-file"); }
  catch { file = join(root, "index.html"); }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type":mime[extname(file)] || "application/octet-stream", "cache-control":extname(file)===".html"?"no-cache":"public, max-age=31536000, immutable", "x-content-type-options":"nosniff", "x-frame-options":"SAMEORIGIN", "referrer-policy":"strict-origin-when-cross-origin" });
    res.end(body);
  } catch { res.writeHead(500); res.end("Server error"); }
}).listen(port, "0.0.0.0", () => console.log(`Baad Data listening on ${port}`));
