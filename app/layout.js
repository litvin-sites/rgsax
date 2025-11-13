import Footer from './components/Footer/Footer';
import './globals.css';
import { Poppins, Permanent_Marker, Rock_Salt } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-permanent-marker',
  display: 'swap',
});

const rockSalt = Rock_Salt({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rock-salt',
  display: 'swap',
});

export const metadata = {
  title: 'Imagination - Музыкальная группа | Живая музыка на праздник',
  description:
    'Imagination - профессиональная музыкальная группа. Живая музыка на свадьбы, корпоративы и частные мероприятия. Заказать выступление в Москве и области.',
  keywords:
    'кавер, живая музыка, музыкальная группа, свадьба, корпоратив, мероприятие, заказать музыкантов',
  authors: [{ name: 'Imagination' }],
  creator: 'Imagination',
  publisher: 'Imagination',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Imagination - Музыкальная группа | Живая музыка на праздник',
    description:
      'Профессиональная музыкальная группа. Живая музыка на ваш праздник. Закажите выступление для свадьбы, корпоратива или частного мероприятия.',
    url: 'https://nrgsax.netlify.app',
    siteName: 'Imagination',
    images: [
      {
        url: 'https://nrgsax.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Imagination - Музыкальная группа',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imagination - Музыкальная группа',
    description: 'Живая музыка на ваш праздник',
    images: ['https://nrgsax.netlify.app/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://nrgsax.netlify.app',
    languages: {
      'ru-RU': 'https://nrgsax.netlify.app',
    },
  },
  other: {
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
      className={`${poppins.variable} ${permanentMarker.variable} ${rockSalt.variable}`}
    >
      <head>
        {/* Дополнительные мета-теги */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light" />

        {/* Schema.org для Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicGroup',
            name: 'Imagination',
            description: 'Профессиональная музыкальная группа',
            url: 'https://nrgsax.netlify.app',
            genre: ['Jazz', 'Pop', 'Instrumental'],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Москва',
              addressCountry: 'RU',
            },
            telephone: '+7-XXX-XXX-XX-XX', // Добавьте реальный номер
            email: 'info@nrgsax.ru', // Добавьте реальный email
            sameAs: [
              'https://www.instagram.com/nrgsax', // Добавьте соцсети
              'https://www.youtube.com/nrgsax',
              'https://t.me/nrgsax',
            ],
          })}
        </script>

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${poppins.className} font-rendering text-2xl xl:text-3xl`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
