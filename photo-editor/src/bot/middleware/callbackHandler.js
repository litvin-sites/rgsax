// src/bot/middleware/callbackHandler.js
import { callbackRouter } from '../../actions/callback/index.js';

/**
 * Единый вход для всех callback-апдейтов.
 * Ожидаем data:  userId:albumId:action:index
 * Пример:       123456:abcd:n:2
 */
export async function callbackHandler(ctx) {
  const m = ctx.callbackQuery.data.match(/^(\w+):(\w+):(view|p|n|d|a|delAlbum):(\d+)$/);
  if (!m) return ctx.answerCbQuery('🤷‍♂️ Неверный формат кнопки');

  const [, userId, albumId, action, strIdx] = m;
  const idx = Number(strIdx);

  return callbackRouter(ctx, userId, albumId, action, idx);
}
