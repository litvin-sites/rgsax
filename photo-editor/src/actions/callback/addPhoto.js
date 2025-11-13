import { userCtx, saveStore } from '../../store.js';
import { getAlbum } from './_utils.js';
import { mainKb } from '../../bot/keyboards.js';

export async function addPhoto(ctx, userId, albumId) {
  const album = getAlbum(ctx, userId, albumId);
  if (!album) return;

  const u = userCtx(userId);
  u.current = u.albums.indexOf(album);
  u.step = null;
  saveStore();
  await ctx.answerCbQuery();
  return ctx.reply('➕ Пришли новые фото – я добавлю их в альбом.', mainKb());
}