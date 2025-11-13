import fs from 'fs/promises';
import path from 'path';
import Intro from './components/Intro/Intro';
import About from './components/About/About';
import Listen from './components/Listen/Listen';
import Shows from './components/Shows/Shows';
import Video from './components/Video/Video';
import ContactUs from './components/ContactUs/ContactUs';
import PhotoGallery from './components/PhotoGallery/PhotoGallery';
import TextParallax from './components/TextParallax/TextParallax';

export default async function Home() {
  const jsonPath = path.join(process.cwd(), 'public', 'gallery', 'galleryThumbnails.json');
  let galleryThumbnails = [];

  try {
    const raw = await fs.readFile(jsonPath, 'utf-8');
    galleryThumbnails = JSON.parse(raw);
  } catch (e) {
    console.warn('galleryThumbnails.json не найден – показываем пустую галерею');
  }

  return (
    <main className="min-h-screen bg-white">
      <Intro />
      <About />
      <Shows />
      <Video />
      <ContactUs />
      <TextParallax />
      <PhotoGallery galleryThumbnails={galleryThumbnails} />
    </main>
  );
}
