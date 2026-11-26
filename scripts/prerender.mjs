// Runs after `vite build`: writes a finished HTML file for every page, plus sitemap.xml and robots.txt.
// Cloudflare Pages serves dist/about.html at /about, and dist/404.html for unknown addresses.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, pages, notFound, SITE_URL, SHARE_IMAGE } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headFor(meta) {
  const url = SITE_URL + (meta.path === "/" ? "/" : meta.path);
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="House of Prayer Church" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}${SHARE_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  return lines.map((l) => "    " + l).join("\n");
}

function page(meta, url) {
  let html = template
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta name="description"[^>]*>/, "")
    .replace(/\s*<meta property="og:[^"]+"[^>]*>/g, "");
  html = html.replace("</head>", headFor(meta) + "\n  </head>");
  const body = render(url);
  if (!body || body.length < 200) throw new Error(`Prerender of ${url} came out empty`);
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

for (const meta of pages) {
  const file = meta.path === "/" ? "index.html" : meta.path.slice(1) + ".html";
  fs.writeFileSync(path.join(dist, file), page(meta, meta.path));
  console.log("prerendered", meta.path, "->", file);
}
fs.writeFileSync(path.join(dist, "404.html"), page(notFound, "/this-page-does-not-exist"));
console.log("prerendered 404 -> 404.html");

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log("wrote sitemap.xml and robots.txt");

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
