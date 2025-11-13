'use client';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';
import Container from '@/app/global-components/Container/Container';
import { useRef } from 'react';
import { useInView } from "framer-motion";

export default function PhotoGallery({ galleryThumbnails = [] }) {
  const [openGallery, setOpenGallery] = useState(false);
	const [galleryIndex, setGalleryIndex] = useState(0);
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true });

  const clickHandler = (index) => {
		setOpenGallery(true);
		setGalleryIndex(index);
	};

  return (
    <section 
      id="photo-gallery" 
      className="w-full mt-16 pb-14 lg:mt-56 lg:pb-56 lg:mb-90"
      style={{
				transform: isInView ? "none" : "translateY(100px)",
				opacity: isInView ? 1 : 0,
				transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
			}}
      ref={sectionRef}>
      <Container>
        <div className="overflow-hidden">
					<h2 className={`font-bold text-6xl pb-6 opacity-0 ${isInView ? "animate-slide-up" : ""}`}>
						Фото
					</h2>
				</div>
        <p>Как это было</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {galleryThumbnails.map((item, index) => (
            <div className="flex flex-col mb-5 leading-none" key={item.id}>
              <div className="w-full h-full rounded-lg bg-fluo-red transition-all">
                <Image
                  className="rounded-lg cursor-pointer hover:opacity-60 transition-all"
                  src={item.cover}
                  width={400}
                  height={400}
                  alt="Gallery thumbnail"
                  onClick={() => clickHandler(index)}
                />
              </div>
              <h5 className="text-sm md:text-lg xl:text-xl font-medium">{item.title}</h5>
            </div>
          ))}

          <Lightbox
						open={openGallery}
						close={() => setOpenGallery(false)}
						slides={galleryThumbnails[galleryIndex].photos}
					/>
          </div>
      </Container>
    </section>
  );
}
