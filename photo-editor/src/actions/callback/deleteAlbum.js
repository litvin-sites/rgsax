import { userCtx, saveStore } from '../../store.js';
import { deletePhotoFile } from '../../utils/deletePhotoFile.js';

export async function deleteAlbum(ctx, userId, albumId) {
  const u = userCtx(userId);
  const albumIdx = u.albums.findIndex((a) => a.id === albumId);
  if (albumIdx === -1) {
    return ctx.answerCbQuery('❌ Альбом не найден');
  }
  const [album] = u.albums.splice(albumIdx, 1);
  saveStore();

  // чистим диск
  if (album.cover) await deletePhotoFile(album.cover);
  await Promise.all(album.photos.map((p) => deletePhotoFile(p)));

  await ctx.answerCbQuery('✅ Альбом удалён');
  return ctx.editMessageText(`🗑 Альбом «${album.title}» полностью удалён.`);
}
