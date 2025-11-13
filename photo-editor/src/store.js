import fs from 'fs-extra';
import { PATHS } from './config.js';

let store = {};
export function loadStore() {
  try {
    store = fs.readJsonSync(PATHS.db);
  } catch {
    store = {};
  }
}
export function saveStore() {
  fs.writeJsonSync(PATHS.db, store, { spaces: 2 });
}
export function userCtx(uid) {
  if (!store['user']) store['user'] = { albums: [], current: 0, step: null };
  return store['user'];
}
