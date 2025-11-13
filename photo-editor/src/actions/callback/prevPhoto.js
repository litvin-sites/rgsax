import { sendViewer } from '../../utils/sendViewer.js';
import { getAlbum } from './_utils.js';

export async function prevPhoto(ctx, userId, albumId, idx) {
  const album = getAlbum(ctx, userId, albumId);
  if (!album) return;

  const newIdx = idx - 1;
  if (newIdx < 0) return ctx.answerCbQuery('⚠️ Начало альбома');
  await ctx.deleteMessage().catch(() => {});
  return sendViewer(ctx, userId, album, newIdx);
}
