import { startKb } from '../bot/keyboards.js';

export async function sendStartButton(bot, userId) {
  try {
    await bot.telegram.sendMessage(
      userId,
      '⏰ Сеанс завершён по таймауту (1 ч). \nНажмите кнопку, чтобы войти снова:',
      startKb()
    );
  } catch (e) {
    // eslint-disable-next-line no-undef
    console.log(e);
  }
}
