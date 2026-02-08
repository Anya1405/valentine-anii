import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const COLLAGE_DIR = path.join(process.cwd(), "assets", "collage");
const OUT_FILE = path.join(COLLAGE_DIR, "manifest.json");
const exts = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry);
    const s = await stat(full);

    if (s.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      const ext = path.extname(entry).toLowerCase();
      if (exts.has(ext)) {
        const rel = full.replace(process.cwd(), "").split(path.sep).join("/");
        files.push(rel.startsWith("/") ? rel : "/" + rel);
      }
    }
  }
  return files;
}

(async () => {
  const files = await walk(COLLAGE_DIR);
  const cleaned = files.filter((f) => !f.endsWith("/assets/collage/manifest.json"));
  await writeFile(OUT_FILE, JSON.stringify(cleaned, null, 2), "utf-8");
  console.log(`manifest.json created with ${cleaned.length} images`);
})();
