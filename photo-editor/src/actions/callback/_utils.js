import { userCtx } from '../../store.js';
import path from 'path';
import { PATHS } from '../../config.js';
import fs from 'fs-extra';

export function getAlbum(ctx, userId, albumId) {
  const u = userCtx(userId);          // ← используем именно тот, что в data
  const album = u?.albums.find(a => a.id === albumId);
  if (!album) {
    ctx.answerCbQuery('❌ Альбом не найден');
    return null;
  }
  return album;
}

export async function fileExists(relPath) {
  const abs  = path.join(PATHS.root, 'storage', relPath);
  const pub  = path.join(PATHS.root, 'public', relPath);
  return (await fs.pathExists(abs)) ? abs
       : (await fs.pathExists(pub)) ? pub
       : null;
}