import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line no-undef
export const TOKEN = process.env.BOT_TOKEN;
export const PASSWORD = '12345';
export const SESSION_TTL_MS = 60 * 60 * 60 * 1000;
export const PATHS = {
  root: path.join(__dirname, '..'),
  db: path.join(__dirname, '..', 'sessions.json'),
  storage: {
    covers: path.join(__dirname, '..', 'storage', 'covers'),
    photos: path.join(__dirname, '..', 'storage', 'photos'),
  },
  public: {
    covers: path.join(__dirname, '..', 'public', 'covers'),
    photos: path.join(__dirname, '..', 'public', 'photos'),
  },
};
