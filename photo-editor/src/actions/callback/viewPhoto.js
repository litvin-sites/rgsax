import { sendViewer } from '../../utils/sendViewer.js';
import { getAlbum } from './_utils.js';

export async function viewPhoto(ctx, userId, albumId) {
  const album = getAlbum(ctx, userId, albumId); // ← userId из callback
  if (!album) return;

  if (!album.photos.length) {
    return ctx.answerCbQuery('📂 В альбоме нет фото');
  }
  await ctx.answerCbQuery();
  return sendViewer(ctx, userId, album, 0);
}
