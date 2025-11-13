import { Scenes } from 'telegraf';
import { startScene } from './start.js';
import { passwordScene } from './password.js';

const stage = new Scenes.Stage([startScene, passwordScene]);

export const scenesMiddleware = () => stage.middleware();
