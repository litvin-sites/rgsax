import { textInputMw } from './textInput.js';
import { photoMw } from './photoHandler.js';
import { callbackHandler } from './callbackHandler.js';

export function registerMiddleware(bot) {
  bot.on('text', textInputMw);
  bot.on('photo', photoMw);
  bot.action(/(\w+):(\w+):(view|p|n|d|a|delAlbum):(\d+)/, callbackHandler);
}
