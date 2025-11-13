import { Scenes } from 'telegraf';
import { occupySession, releaseSession } from '../../session/sessionStore.js';
import { userCtx, saveStore } from '../../store.js';
import { PASSWORD } from '../../config.js';
import { mainKb } from '../keyboards.js';

export const passwordScene = new Scenes.BaseScene('passwordScene');

passwordScene.on('text', async (ctx) => {
  const uid = String(ctx.from.id);
  const txt = ctx.message.text.trim();

  if (txt !== PASSWORD) {
    return ctx.reply('❌ Неверный пароль. Попробуйте ещё раз.');
  }

  // правильный пароль – захватываем сеанс
  const prev = releaseSession(); // освободим старого
  if (prev) {
    await ctx.telegram.sendMessage(prev, '⏰ Ваш сеанс завершён – другой пользователь вошёл.');
  }
  occupySession(uid);
  userCtx(uid).step = null;
  saveStore();
  await ctx.scene.leave();
  return ctx.reply('✅ Добро пожаловать! Что делаем?', mainKb());
});
