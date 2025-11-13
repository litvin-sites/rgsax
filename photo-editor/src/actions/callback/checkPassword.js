import { userCtx, saveStore } from '../../store.js';
import { getSession } from '../../session/sessionStore.js';
import { Markup } from 'telegraf';

export async function checkPassword(ctx) {
  const uid = String(ctx.from.id);

  /* если уже внутри – просто выходим */
  const session = getSession();
  if (session?.userId === uid) {
    return ctx.answerCbQuery('✅ Вы уже внутри.');
  }

  /* если занято – сообщаем и выходим */
  if (session && session.userId !== uid) {
    await ctx.answerCbQuery('⛔ Сеанс занят.', { show_alert: true });
    return;
  }

  /* просим ввести пароль обычным сообщением */
  await ctx.answerCbQuery(); // убираем «часики»
  userCtx(uid).step = 'wait_password'; // глобальный шаг
  saveStore();
  return ctx.reply('🔐 Введите пароль:', Markup.keyboard(['❌ Отмена']).resize());
}
