import fs from 'fs-extra';
import path from 'path';
import { PATHS } from '../config.js';
import { viewKeyboard } from '../bot/keyboards.js';

export async function sendViewer(ctx, userId, album, idx) {
  const relPath = album.photos[idx];
  const absPath = path.join(PATHS.root, 'storage', relPath);
  const publicPath = path.join(PATHS.root, 'public', relPath);
  const finalPath = (await fs.pathExists(absPath)) ? absPath
                : (await fs.pathExists(publicPath)) ? publicPath
                : null;
  if (!finalPath) {
    return ctx.reply('❌ Файл не найден на диске.');
  }
  const caption = `📷 ${album.title}  (${idx + 1} / ${album.photos.length})`;
  await ctx.replyWithPhoto(
    { source: finalPath },
    { caption, ...viewKeyboard(userId, album.id, idx, album.photos.length) }
  );
}