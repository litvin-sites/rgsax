import fs from 'fs-extra';
import path from 'path';
import { PATHS } from '../../config.js';
import { userCtx } from '../../store.js';
import { mainKb } from '../keyboards.js';
import { execa } from 'execa';
import { canPublish, markPublished, MARK_FILE } from '../../utils/publish-helpers.js';

const REPO_ROOT = path.join(PATHS.root, '..'); // корень репозитория
const GALLERY_ROOT = path.join(PATHS.root, '..', 'public', 'gallery');
const THUMB_DIR = path.join(GALLERY_ROOT, 'thumbnails');
const SLIDER_DIR = path.join(GALLERY_ROOT, 'slider-images');
const META_FILE = path.join(GALLERY_ROOT, 'galleryThumbnails.json');

/* ---------- публикация ---------- */
export async function publishCmd(ctx) {
  const uid = String(ctx.from.id);
  const u = userCtx(uid);

  if (!u.albums.length) return ctx.reply('📂 Нет альбомов для публикации.', mainKb());

  if (!(await canPublish())) {
    const msLeft = 24 * 60 * 60 * 1000 - (Date.now() - Number(await fs.readFile(MARK_FILE, 'utf-8')));
    const hours = Math.floor(msLeft / 3600000);
    return ctx.reply(`⏳ Публикация возможна через ${hours} ч.`, mainKb());
  }

  await ctx.reply('🚀 Начинаю публикацию…');

  try {
    /* 1. чистим старую галерею */
    await fs.remove(GALLERY_ROOT).catch(() => {});
    await fs.ensureDir(THUMB_DIR);
    await fs.ensureDir(SLIDER_DIR);

    /* 2. счётчик для slider-{num}.jpg */
    let sliderCounter = 1;

    /* 3. будущий JSON для фронта */
    const out = [];

    /* 4. обход альбомов */
    for (let i = 0; i < u.albums.length; i++) {
      const al = u.albums[i];

      /* 4a. обложка → thumbnail-{id}.jpg (400×400) */
      const thumbName = `thumbnail-${al.id}.jpg`;
      if (al.cover) {
        const coverPath = path.join(PATHS.root, 'storage', al.cover);
        if (!(await fs.pathExists(coverPath))) {
          // eslint-disable-next-line no-undef
          console.warn('[publish] обложка не найдена:', coverPath);
        } else {
          // копируем готовый 400×400-файл
          const thumbDest = path.join(THUMB_DIR, `thumbnail-${al.id}.jpg`);
          await fs.copy(coverPath, thumbDest);
        }
      }

      /* 4b. фото альбома → slider-{num}.jpg (без resize) */
      const photos = [];
      for (const rel of al.photos) {
        const src = path.join(PATHS.root, 'storage', rel);
        const name = `slider-${sliderCounter}.jpg`;
        const dest = path.join(SLIDER_DIR, name);
        await fs.copy(src, dest);
        photos.push({ src: `/gallery/slider-images/${name}` });
        sliderCounter++;
      }

      /* 4c. запись в итоговый массив */
      out.push({
        id: i + 1, // порядковый id для фронта
        title: al.title,
        cover: `/gallery/thumbnails/${thumbName}`,
        photos,
      });
    }

    /* 5. пишем JSON */
    await fs.writeFile(META_FILE, JSON.stringify(out, null, 2));

    /* 6. чистим session.json – опционально */
    // u.albums = []; saveStore();

    await execa('git', ['add', 'public/gallery'], { cwd: REPO_ROOT });
    await execa('git', ['commit', '-m', 'bot: update gallery'], { cwd: REPO_ROOT });
    await execa('git', ['push'], { cwd: REPO_ROOT });

    await ctx.reply('✅ Галерея опубликована и отправлена в репозиторий!', mainKb());
  } catch (e) {
    // eslint-disable-next-line no-undef
    console.error('[publish]', e);
    await ctx.reply('❌ Ошибка при публикации.', mainKb());
  } finally {
    await markPublished();
  }
}
