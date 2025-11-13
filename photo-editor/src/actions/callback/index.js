import { viewPhoto } from './viewPhoto.js';
import { nextPhoto } from './nextPhoto.js';
import { prevPhoto } from './prevPhoto.js';
import { deletePhoto } from './deletePhoto.js';
import { addPhoto } from './addPhoto.js';
import { deleteAlbum } from './deleteAlbum.js';

export async function callbackRouter(ctx, userId, albumId, action, idx) {
  switch (action) {
    case 'view':
      return viewPhoto(ctx, userId, albumId);
    case 'p':
      return prevPhoto(ctx, userId, albumId, idx);
    case 'n':
      return nextPhoto(ctx, userId, albumId, idx);
    case 'd':
      return deletePhoto(ctx, userId, albumId, idx);
    case 'a':
      return addPhoto(ctx, userId, albumId);
    case 'delAlbum':
      return deleteAlbum(ctx, userId, albumId);
    default:
      return ctx.answerCbQuery('🤷‍♂️ Неизвестное действие');
  }
}
