import 'dotenv/config';
import { launchBot } from './src/bot/index.js';
import { loadEnv } from './src/loader.js';

loadEnv(); // создаёт папки, поднимает БД, cron
launchBot(); // стартуем Telegraf
