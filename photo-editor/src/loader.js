import fs from 'fs-extra';
import { PATHS } from './config.js';
import { startAutoRelease } from './session/autoRelease.js';
import { loadStore } from './store.js';

export function loadEnv() {
  // папки
  Object.values(PATHS.storage).forEach(p => fs.ensureDirSync(p));
  Object.values(PATHS.public).forEach(p => fs.ensureDirSync(p));
  // БД
  loadStore();
  // таймер 1 ч
  startAutoRelease();
}