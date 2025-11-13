import { Markup } from 'telegraf';
import { ACTION } from '../constants.js';


export const startKb = () =>
  Markup.keyboard(['🔑 Начать'], { resize: true })   
    .oneTime()                                    
    .resize();

export const mainKb = () =>
  Markup.keyboard([
    ['📸 Создать альбом', '📚 Мои альбомы'],
    ['✅ Опубликовать всё']
  ]).resize();

export const cancelKb = () => Markup.keyboard(['❌ Отмена']).resize();

export function viewKeyboard(userId, albumId, idx, len) {
  const prefix = `${userId}:${albumId}`;
  const row = [];
  if (idx > 0) row.push(Markup.button.callback('⬅️ Назад', `${prefix}:${ACTION.prev}:${idx}`));
  row.push(Markup.button.callback('❌ Удалить фото', `${prefix}:${ACTION.del}:${idx}`));
  if (idx < len - 1) row.push(Markup.button.callback('➡️ Далее', `${prefix}:${ACTION.next}:${idx}`));
  return Markup.inlineKeyboard([
    row,
    [Markup.button.callback('➕ Добавить фото', `${prefix}:${ACTION.add}:0`)]
  ]);
}

export function albumListKeyboard(userId, albumId) {
  const prefix = `${userId}:${albumId}`;
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('👁 Посмотреть', `${prefix}:view:0`),
      Markup.button.callback('🗑 Удалить', `${prefix}:${ACTION.delAlbum}:0`)
    ]
  ]);
}

export const finishEditKb = () =>
  Markup.keyboard(['✅ Завершить редактирование']).resize();