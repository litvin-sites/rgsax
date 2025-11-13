'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Container from '@/app/global-components/Container/Container';
import SocialIcon from '@/app/global-components/SocialIcon/SocialIcon';

export default function About() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true });

  return (
    <section
      id="about"
      className={`relative flex flex-col items-center justify-end w-full mt-16 mx-auto max-w-600 lg:flex-row lg:pt-56`}
    >
      <Container customClasses="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        <div
          className="relative flex flex-col lg:max-w-md xl:max-w-2xl 2xl:max-w-4xl"
          ref={textRef}
          style={{
            transform: isInView ? 'none' : 'translateX(-100px)',
            opacity: isInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          }}
        >
          <div className="overflow-hidden">
            <h2
              className={`font-bold text-6xl pb-6 opacity-0 ${isInView ? 'animate-slide-up' : ''}`}
            >
              О нас
            </h2>
          </div>

          <p>
            Давайте представим. <br />
            Важный день, рядом с вами близкие люди. Всего хватает, но что, если приедет компания
            друзей-меломанов, которые любят свою работу так, словно это не работа, а самый большой
            кайф, удовольствие, награда?
          </p>
          <p className="pt-8">
            Мы будем вместе воспевать забытое,
            <br />
            но такое важное, учить новую хореографию (для фанатов — ну, чтоб как в K-Pop) и искать
            отдушину в серой повседневности, замечая красоту настоящего.
          </p>
          <div className="flex pt-8 gap-4">
            <ul className="flex gap-3">
              <SocialIcon kind="telegram" href="https://t.me/R_G_Sax" />
              <SocialIcon kind="vk" href="https://vk.com/imaginationcovergroup" />
              <SocialIcon kind="rutube" href="https://rutube.ru/channel/19033167/" />
              <SocialIcon kind="whatsapp" href="https://wa.me/79688635972" />
            </ul>
          </div>
        </div>
      </Container>
      <Image
        className="w-full mt-5 max-h-96 object-cover lg:mt-0 lg:max-h-none lg:max-w-lg lg:block xl:max-w-xl"
        src="/_about.jpg"
        width={750}
        height={533}
        alt="Holding guitar"
      />
    </section>
  );
}
