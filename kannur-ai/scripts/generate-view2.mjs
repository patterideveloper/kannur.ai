import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..", "public", "images");
const sizes = [480, 800, 1200];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

async function ensureView2(base1200) {
  const dir = path.dirname(base1200);
  const baseName = path.basename(base1200, ".jpg").replace(/-1200$/, "");
  const input = sharp(base1200);
  const meta = await input.metadata();

  if (!meta.width || !meta.height) return;

  const cropWidth = Math.max(1, Math.floor(meta.width * 0.88));
  const cropHeight = Math.max(1, Math.floor(meta.height * 0.88));
  const left = Math.max(0, Math.floor((meta.width - cropWidth) * 0.22));
  const top = Math.max(0, Math.floor((meta.height - cropHeight) * 0.12));

  for (const size of sizes) {
    const outJpg = path.join(dir, `${baseName}_view2-${size}.jpg`);
    const outWebp = path.join(dir, `${baseName}_view2-${size}.webp`);

    await sharp(base1200)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(size, size, { fit: "inside", withoutEnlargement: false })
      .modulate({ saturation: 1.04, brightness: 1.01 })
      .jpeg({ quality: 82 })
      .toFile(outJpg);

    await sharp(base1200)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(size, size, { fit: "inside", withoutEnlargement: false })
      .modulate({ saturation: 1.04, brightness: 1.01 })
      .webp({ quality: 80 })
      .toFile(outWebp);
  }
}

async function main() {
  const targets = [path.join(root, "places"), path.join(root, "temples")];
  let count = 0;

  for (const target of targets) {
    try {
      await fs.access(target);
    } catch {
      continue;
    }

    const files = await walk(target);
    const baseFiles = files.filter(
      (file) =>
        file.endsWith("-1200.jpg") &&
        !path.basename(file).includes("_view2-")
    );

    for (const base of baseFiles) {
      await ensureView2(base);
      count += 1;
    }
  }

  console.log(`Generated view2 variants for ${count} base images.`);
}

main();
