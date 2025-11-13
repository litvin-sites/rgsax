import { sendViewer } from '../../utils/sendViewer.js';
import { getAlbum } from './_utils.js';

export async function nextPhoto(ctx, userId, albumId, idx) {
  const album = getAlbum(ctx, userId, albumId);
  if (!album) return;

  const newIdx = idx + 1;
  if (newIdx >= album.photos.length) {
    return ctx.answerCbQuery('⚠️ Конец альбома');
  }
  await ctx.deleteMessage().catch(() => {});
  return sendViewer(ctx, userId, album, newIdx);
}