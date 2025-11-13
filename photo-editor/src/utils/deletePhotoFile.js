import fs from 'fs-extra';
import path from 'path';
import { PATHS } from '../config.js';

/**
 * Удаляет файл как из storage, так и из public
 * @param {string} relPath - путь относительно корня проекта, например "photos/abc.jpg"
 */
export async function deletePhotoFile(relPath) {
  if (!relPath) return;
  const root = PATHS.root; // <project>/storage/… и public/…
  await fs.remove(path.join(root, relPath)).catch(() => {});
  await fs.remove(path.join(root, 'storage', relPath)).catch(() => {});
  await fs.remove(path.join(root, 'public', relPath)).catch(() => {});
}
