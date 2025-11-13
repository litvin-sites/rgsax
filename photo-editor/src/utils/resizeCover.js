import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

export async function saveCover(buffer, destPath) {
  await fs.ensureDir(path.dirname(destPath)); // ← создать папку если нет
  const resized = await sharp(buffer)
    .resize(400, 400, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toBuffer();
  await fs.writeFile(destPath, resized);
}