import { getSession } from './sessionStore.js';
import { globalBot } from '../bot/index.js';

export function startAutoRelease() {
  setInterval(() => {
    getSession(); // внутри уже отправит кнопку
  }, 60_000); // проверяем каждую минуту
}