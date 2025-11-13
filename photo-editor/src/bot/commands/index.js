import { listAlbumsCmd } from './listAlbums.js';
import { createAlbumCmd } from './createAlbum.js';
import { viewAlbumCmd } from './viewAlbum.js';
import { publishCmd } from './publish.js';
import { userCtx, saveStore } from '../../store.js';
import { mainKb } from '../../bot/keyboards.js';

export function registerCommands(bot) {
  bot.command('start', (ctx) => ctx.scene.enter('startScene'));
  bot.hears('📸 Создать альбом', createAlbumCmd);
  bot.hears('📚 Мои альбомы', listAlbumsCmd);
  bot.hears('👁 Посмотреть альбом', viewAlbumCmd);
  bot.hears('✅ Опубликовать всё', publishCmd);
  bot.hears('✅ Завершить редактирование', (ctx) => {
    const u = userCtx(String(ctx.from.id));
    u.step = null;
    saveStore();
    ctx.reply('👌 Редактирование завершено. Что дальше?', mainKb());
  });
}
