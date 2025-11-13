import { getSession } from './sessionStore.js';

export function sessionGate(ctx, next) {
  const session = getSession();
  if (!session || session.userId !== String(ctx.from.id)) return; // игнор
  return next();
}