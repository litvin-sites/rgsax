import { userCtx, saveStore } from '../../store.js';
import { mainKb, finishEditKb } from '../keyboards.js';
import { nanoid } from 'nanoid';

export async function textInputMw(ctx) {
  const u = userCtx(ctx.from.id);
  const txt = ctx.message.text;

  /* ---------- кнопка «Завершить редактирование» ---------- */
  if (txt === '✅ Завершить редактирование') {
    u.step = null;
    saveStore();
    return ctx.reply('👌 Альбом готов! Что дальше?', mainKb());
  }

  /* ---------- ввод названия нового альбома ---------- */
  if (u.step === 'wait_title') {
    const id = nanoid(10);
    u.albums.push({ id, title: txt, cover: null, photos: [] });
    u.current = u.albums.length - 1;
    u.step = 'wait_cover';
    saveStore();
    return ctx.reply('🖼 Теперь пришли обложку альбома:', finishEditKb());
  }
}
