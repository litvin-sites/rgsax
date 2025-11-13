import { SESSION_TTL_MS } from '../config.js';

let current = null; // { userId, startedAt }
let waitingList = new Set(); // id-шники ждущих

export function getSession() {
  if (!current) return null;
  const age = Date.now() - current.startedAt;
  if (age > SESSION_TTL_MS) {
    // eslint-disable-next-line no-undef
    console.log(`[auto-release] user ${current.userId}`);
    releaseSession();
    return null;
  }
  return current;
}

export function occupySession(userId) {
  releaseSession();
  current = { userId, startedAt: Date.now() };
  return true;
}

export function releaseSession() {
  if (!current) return;
  const prev = current.userId;
  current = null;
  waitingList.clear();
  return prev;
}

export function addToWaiting(userId) {
  waitingList.add(userId);
}

export function removeFromWaiting(userId) {
  waitingList.delete(userId);
}
