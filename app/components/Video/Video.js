'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Container from '@/app/global-components/Container/Container';
import SocialIcon from '@/app/global-components/SocialIcon/SocialIcon';

export default function Video() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true });

  return (
    <section id="video" className="w-full mt-16 lg:mt-56">
      <Container customClasses="flex flex-col lg:flex-row">
        <div
          className="flex flex-col justify-center basis-2/4 lg:max-w-lg xl:max-w-2xl 2xl:max-w-4xl"
          ref={textRef}
          style={{
            transform: isInView ? 'none' : 'translateX(-100px)',
            opacity: isInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          }}
        >
          <p>Позвольте нам включить</p>
          <div className="overflow-hidden">
            <h2
              className={`font-bold text-3xl lg:text-6xl pb-6 opacity-0 ${isInView ? 'animate-slide-up' : ''}`}
            >
              Ваше воображение!
            </h2>
          </div>
          <p>
            В нашем арсенале — богатая палитра звуков, инструментов, оттенков и эмоций. Мы готовы
            смешивать краски в любых пропорциях, чтобы вы запомнили свой праздник.
          </p>
          <ul className="flex items-center pt-4 gap-4">
            <SocialIcon kind="rutube" href="https://rutube.ru/channel/19033167/" />
            <SocialIcon kind="vimeo" href="https://vimeo.com/1135711690" />
          </ul>
        </div>
        <div className="flex justify-end items-center mt-5 basis-2/4 lg:max-w-lg lg:mt-0 xl:max-w-2xl 2xl:max-w-4xl">
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/1135711690?h=f7cace4b76"
            width="640"
            height="360"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </Container>
    </section>
  );
}
