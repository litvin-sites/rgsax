import { Telegraf, session, Scenes } from 'telegraf';
import { TOKEN } from '../config.js';
import { sessionGate } from '../session/middleware.js';
import { scenesMiddleware } from './scenes/index.js';
import { registerCommands } from './commands/index.js';
import { registerMiddleware } from './middleware/index.js';
import { callbackHandler } from './middleware/callbackHandler.js';

export const globalBot = new Telegraf(TOKEN);

/* 1. обязательный session-middleware для сцен */
globalBot.use(session());

/* 2. подключаем Stage (со сценами) */
globalBot.use(scenesMiddleware());

globalBot.hears('🔑 Начать', (ctx) => ctx.scene.enter('passwordScene'));
/* 3. теперь /start работает */
globalBot.start((ctx) => ctx.scene.enter('startScene'));

/* 3. callback-роутер (все inline-кнопки) */
globalBot.action(/^(\w+):(\w+):(view|p|n|d|a|delAlbum):(\d+)$/, callbackHandler);

/* 4. шлюз «только владелец» и остальное */
globalBot.use(sessionGate);
registerCommands(globalBot);
registerMiddleware(globalBot);

export function launchBot() {
  globalBot.launch();
  process.once('SIGINT', () => globalBot.stop());
  process.once('SIGTERM', () => globalBot.stop());
}
