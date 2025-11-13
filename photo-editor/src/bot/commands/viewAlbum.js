import { userCtx } from '../../store.js';
import { sendViewer } from '../../utils/sendViewer.js';

export function viewAlbumCmd(ctx) {
  const u = userCtx(ctx.from.id);
  if (!u.albums.length) return ctx.reply('📂 У тебя нет альбомов.');
  const a = u.albums[u.current];
  if (!a.photos.length) return ctx.reply('📂 В альбоме нет фото.');
  return sendViewer(ctx, a, 0);
}