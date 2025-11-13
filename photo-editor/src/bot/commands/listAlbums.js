import { userCtx } from '../../store.js';
import { mainKb, albumListKeyboard } from '../keyboards.js';

export async function listAlbumsCmd(ctx) {
  const u = userCtx(ctx.from.id);
  if (!u.albums.length) return ctx.reply('📂 Пока нет альбомов.', mainKb());

  for (const [i, a] of u.albums.entries()) {
  const msg = `${i + 1}. ${a.title}  📷${a.photos.length}`;
  await ctx.reply(msg, albumListKeyboard(ctx.from.id, a.id));   // ← ctx.from.id
}
  return ctx.reply('👆 Твои альбомы.', mainKb());
}