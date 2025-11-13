'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Container from '@/app/global-components/Container/Container';
import ButtonPrimary from '@/app/global-components/ButtonPrimary/ButtonPrimary';

export default function ContactUs() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  return (
    <section
      id="contacts"
      className={`relative flex flex-col-reverse items-center w-full mt-16 mx-auto max-w-600 lg:mt-56 lg:flex-row`}
    >
      <Image
        className="mt-5 max-h-96 object-cover lg:mt-0 lg:max-h-none lg:max-w-lg lg:block xl:max-w-xl"
        src="/_contacts.jpg"
        width={750}
        height={533}
        alt="Band playing"
      />
      <Container customClasses="flex flex-col overflow-hidden lg:items-end lg:justify-end lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        <div
          className="flex justify-end flex-col lg:items-end lg:max-w-md xl:max-w-2xl 2xl:max-w-4xl pb-4 pr-2"
          ref={textRef}
          style={{
            transform: isInView ? 'none' : 'translateX(100px)',
            opacity: isInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
          }}
        >
          <div className="flex flex-col max-w-4xl lg:text-right">
            <div className="overflow-hidden">
              <h2
                className={`font-bold text-6xl pb-6 opacity-0 ${
                  isInView ? 'animate-slide-up' : ''
                }`}
              >
                Связаться с&nbsp;нами
              </h2>
            </div>
          </div>
          <a href="https://t.me/R_G_Sax" target="_blank" rel="noreferrer">
            <ButtonPrimary
              customClasses={'scale-100 hover:scale-110 transition-transform duration-200'}
            >
              узнать свободную дату
            </ButtonPrimary>
          </a>
        </div>
      </Container>
    </section>
  );
}
