import Container from '@/app/global-components/Container/Container';
import SubscribeForm from '@/app/global-components/SubscribeForm/SubscribeForm';
import Image from 'next/image';
import SocialIcon from '@/app/global-components/SocialIcon/SocialIcon';

export default function Footer() {
  return (
    <section id="footer" className="bg-black w-full lg:fixed lg:bottom-0 lg:z-[-1] lg:h-92">
      <footer className="w-full">
        <div className=" py-16">
          <Container customClasses="flex flex-col lg:items-center lg:flex-row">
            <div className="basis-2/3 text-white">
              <h3 className="text-5xl font-bold">Подпишись</h3>
              <p>На нашу рассылку, чтобы получать актуальные новости.</p>
            </div>
            <div className="flex items-cente w-full mt-2.5 lg:mt-0 lg:basis-1/3 lg:justify-end">
              <SubscribeForm />
            </div>
          </Container>
        </div>
        <div className="bg-fluo-red pt-3 relative z-100">
          <Container customClasses="flex justify-between items-center">
            <Image
              className="max-w-40 lg:max-w-60 h-auto"
              src="/_logo-landscape.png"
              width={815}
              height={144}
              alt="Footer logo"
            />
            <ul className="flex gap-3">
              <SocialIcon kind="telegram" href="https://t.me/R_G_Sax" />
              <SocialIcon kind="vk" href="https://vk.com/imaginationcovergroup" />
              <SocialIcon kind="rutube" href="https://rutube.ru/channel/19033167/" />
              <SocialIcon kind="whatsapp" href="https://wa.me/79688635972" />
            </ul>
          </Container>
          <div className="bg-black text-white mt-2 py-4">
            <p className="text-[0.7rem] text-center leading-tight mb-1">
              Website powered by{' '}
              <a
                className="text-yellow-btn-primary underline underline-offset-4 hover:text-yellow-600"
                href="https://t.me/R_G_Sax"
                target="_blank"
                rel="noreferrer"
              >
                Imagination
              </a>{' '}
              😎
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
