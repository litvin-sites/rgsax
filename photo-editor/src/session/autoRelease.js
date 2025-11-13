import { getSession } from './sessionStore.js';

export function startAutoRelease() {
  // eslint-disable-next-line no-undef
  setInterval(() => {
    getSession(); // внутри уже отправит кнопку
  }, 60_000); // проверяем каждую минуту
}
