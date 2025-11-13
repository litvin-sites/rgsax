import { userCtx, saveStore } from '../../store.js';
import { getAlbum, fileExists } from './_utils.js';
import { deletePhotoFile } from '../../utils/deletePhotoFile.js';
import { Markup } from 'telegraf';
import { viewKeyboard } from '../../bot/keyboards.js';

export async function deletePhoto(ctx, userId, albumId, idx) {
  const album = getAlbum(ctx, userId, albumId);
  if (!album) return;

  const [relPath] = album.photos.splice(idx, 1);
  saveStore();
  await deletePhotoFile(relPath);

  await ctx.answerCbQuery('✅ Фото удалено');

  if (!album.photos.length) {
    return ctx.editMessageCaption('📂 В альбоме больше нет фото.', {
      reply_markup: Markup.inlineKeyboard([]).reply_markup,
    });
  }
  const newIdx = idx >= album.photos.length ? album.photos.length - 1 : idx;
  const filePath = await fileExists(album.photos[newIdx]);
  if (!filePath) return ctx.reply('❌ Файл не найден');

  await ctx.editMessageMedia(
    { type: 'photo', media: { source: filePath } },
    {
      caption: `📷 ${album.title}  (${newIdx + 1} / ${album.photos.length})`,
      ...viewKeyboard(userId, album.id, newIdx, album.photos.length),
    }
  );
}
