'use client';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';
import Container from '@/app/global-components/Container/Container';

export default function PhotoGallery({ galleryThumbnails = [] }) {
  const [index, setIndex] = useState(-1);
  const slides = galleryThumbnails.flatMap((g) => g.photos);

  return (
    <section id="photo-gallery" className="w-full mt-16 pb-14 lg:mt-56 lg:pb-56 lg:mb-90">
      <Container>
        <h2 className="font-bold text-6xl pb-6">Фото</h2>
        <p>Как это было</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {galleryThumbnails.map((item) => (
            <div className="flex flex-col mb-5 leading-none" key={item.id}>
              <div className="w-full h-full rounded-lg bg-fluo-red transition-all">
                <Image
                  className="rounded-lg cursor-pointer hover:opacity-60 transition-all"
                  src={item.cover}
                  width={400}
                  height={400}
                  alt="Gallery thumbnail"
                  onClick={() => setIndex(item.id - 1)}
                />
              </div>
              <h5 className="text-sm md:text-lg xl:text-xl font-medium">{item.title}</h5>
            </div>
          ))}
        </div>

        <Lightbox open={index >= 0} close={() => setIndex(-1)} index={index} slides={slides} />
      </Container>
    </section>
  );
}
