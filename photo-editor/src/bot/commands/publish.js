import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import { PATHS } from '../../config.js';
import { userCtx, saveStore } from '../../store.js';
import { nanoid } from 'nanoid';

const GALLERY_ROOT   = path.join(PATHS.root, '..', 'public', 'gallery');
const THUMB_DIR      = path.join(GALLERY_ROOT, 'thumbnails');
const SLIDER_DIR     = path.join(GALLERY_ROOT, 'slider-images');
const META_FILE      = path.join(GALLERY_ROOT, 'galleryThumbnails.json');

/* ---------- публикация ---------- */
export async function publishCmd(ctx) {
  const uid = String(ctx.from.id);
  const u   = userCtx(uid);
  if (!u.albums.length) return ctx.reply('📂 Нет альбомов для публикации.', mainKb());

  await ctx.reply('🚀 Начинаю публикацию…');

  try {
    /* 1. чистим старую галерею */
    await fs.remove(GALLERY_ROOT).catch(() => {});;
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
      const thumbDest = path.join(THUMB_DIR, thumbName);
      if (al.cover) {
        const coverPath = path.join(PATHS.root, al.cover);
        await sharp(coverPath)
              .resize(400, 400, { fit: 'cover', position: 'center' })
              .jpeg({ quality: 90 })
              .toFile(thumbDest);
      }

      /* 4b. фото альбома → slider-{num}.jpg (без resize) */
      const photos = [];
      for (const rel of al.photos) {
        const src   = path.join(PATHS.root, rel);
        const name  = `slider-${sliderCounter}.jpg`;
        const dest  = path.join(SLIDER_DIR, name);
        await fs.copy(src, dest);
        photos.push({ src: `/gallery/slider-images/${name}` });
        sliderCounter++;
      }

      /* 4c. запись в итоговый массив */
      out.push({
        id:    i + 1,                       // порядковый id для фронта
        title: al.title,
        cover: `/gallery/thumbnails/${thumbName}`,
        photos,
      });
    }

    /* 5. пишем JSON */
    await fs.writeFile(META_FILE, JSON.stringify(out, null, 2));

    /* 6. чистим session.json – опционально */
    // u.albums = []; saveStore();

    await ctx.reply('✅ Галерея опубликована! Файлы и JSON готовы.', mainKb());
  } catch (e) {
    console.error('[publish]', e);
    await ctx.reply('❌ Ошибка при публикации.', mainKb());
  }
}