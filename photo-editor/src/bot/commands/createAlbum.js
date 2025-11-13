import { userCtx, saveStore } from '../../store.js';
import { finishEditKb } from '../keyboards.js';

export function createAlbumCmd(ctx) {
  const u = userCtx(ctx.from.id);
  u.step = 'wait_title';
  saveStore();
  return ctx.reply('📝 Введи название нового альбома:', finishEditKb());
}