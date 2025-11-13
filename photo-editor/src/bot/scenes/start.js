import { Scenes } from 'telegraf';
import { getSession, addToWaiting } from '../../session/sessionStore.js';
import { startKb } from '../keyboards.js';

export const startScene = new Scenes.BaseScene('startScene');

/* вход в сцену */
startScene.enter(async (ctx) => {
  const uid = String(ctx.from.id);
  const s = getSession();

  // уже внутри – выходим
  if (s && s.userId === uid) {
    return ctx.scene.leave();
  }

  // занято – ставим в очередь
  if (s && s.userId !== uid) {
    addToWaiting(uid);
    return ctx.reply(
      '⛔ Сеанс занят. Когда освободится – придёт уведомление.',
      { reply_markup: { remove_keyboard: true } }
    );
  }

  // свободно – показываем кнопку
  await ctx.reply(
    'Нажмите «🔑 Начать» и введите пароль.',
    startKb()
  );
});

/* кнопка «🔑 Начать» → callback «check:0» ловится глобально, 
   поэтому в сцене ничего не делаем – просто выходим */
startScene.on('callback_query', (ctx) => ctx.answerCbQuery());