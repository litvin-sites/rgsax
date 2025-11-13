import { userCtx, saveStore } from '../../store.js';
import { mainKb, finishEditKb } from '../keyboards.js';
import { PATHS } from '../../config.js';
import path from 'path';
import { downloadPhoto } from '../../utils/downloadPhoto.js';
import { saveCover } from '../../utils/resizeCover.js';
import { nanoid } from 'nanoid';
import fs from 'fs-extra';

export async function photoMw(ctx) {
  const u = userCtx(ctx.from.id);
  const fileId = ctx.message.photo.pop().file_id;
  const album = u.albums[u.current];
  if (!album) return ctx.reply('📂 Сначала создай альбом.');

  const fileUrl = await ctx.telegram.getFileLink(fileId);

  if (u.step === 'wait_cover') {
    const name = `${album.id}-cover.jpg`;
    const dest = path.join(PATHS.storage.covers, name);
    const buf = await fetch(fileUrl)
      .then((r) => r.arrayBuffer())
      .then(Buffer.from);
    await saveCover(buf, dest);
    album.cover = `covers/${name}`;

    u.step = 'editing'; // новый статус «внутри альбома»
    saveStore();
    return ctx.reply(
      '✅ Обложка сохранена. \n\nМожешь присылать фото.\n' +
        'Когда закончишь – нажми \n«Завершить редактирование».',
      finishEditKb()
    );
  }

  // обычное фото
  const name = `${album.id}-${nanoid(6)}.jpg`;
  const dest = path.join(PATHS.storage.photos, name);
  await downloadPhoto(fileUrl, dest);
  console.log('[photoHandler] записал файл:', dest);
  album.photos.push(`photos/${name}`);
  saveStore();
  ctx.reply(`➕ Фото добавлено. Всего: ${album.photos.length}`, finishEditKb());
}
