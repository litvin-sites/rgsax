import fs from 'fs/promises';
import path from 'path';
import { PATHS } from '../config.js';

export const MARK_FILE = path.join(PATHS.root, '..', '.last-publish');

const DAY_MS = 24 * 60 * 60 * 1000;

export async function canPublish() {
  try {
    const stamp = Number(await fs.readFile(MARK_FILE, 'utf-8'));
    const now = Date.now();
    return now - stamp >= DAY_MS;
  } catch {
    // файла нет — можно
    return true;
  }
}

export async function markPublished() {
  await fs.writeFile(MARK_FILE, String(Date.now()));
}
