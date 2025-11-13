import fs from 'fs-extra';
import fetch from 'node-fetch';
import { PATHS } from '../config.js';
import path from 'path';

export async function downloadPhoto(fileUrl, destPath) {
  await fs.ensureDir(path.dirname(destPath));
  const res = await fetch(fileUrl);
  if (!res.ok) throw new Error('fetch failed');
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(destPath, buf);

  // копия / symlink в public
  const pubPath = destPath.replace('/storage/', '/public/');
  await fs.ensureDir(path.dirname(pubPath));
  if (destPath !== pubPath && !(await fs.pathExists(pubPath))) {
    await fs.copy(destPath, pubPath);
  }
}
