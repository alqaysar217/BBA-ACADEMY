import { ReactNode } from 'react';
import { i18n, type Locale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Noto_Sans_Arabic, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PWAScript } from '@/components/PWAScript';
import { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-noto-sans-arabic' });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const viewport: Viewport = {
  themeColor: '#1A73E8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === 'ar';
  
  const siteName = isAr ? 'أكاديمية بنين وبنات' : 'BBA Academy';
  const title = isAr 
    ? 'أكاديمية بنين وبنات | تعليم يبني العقول وقيم تشكل الشخصية' 
    : 'Baneen & Banaat Academy | Education Builds Minds, Values Shape Character';
  
  const description = isAr
    ? 'شريك تعليمي موثوق يساعد الطلاب والعائلات على تحقيق النجاح الأكاديمي من خلال التعلم المرن عبر الإنترنت والتوجيه الشخصي والالتزام بالتميز.'
    : 'A trusted educational partner helping students and families achieve academic success through flexible online learning and personalized guidance.';

  const baseUrl = 'https://bba-academic.farsel.app';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    manifest: '/manifest.json',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/icon-192.png',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: siteName,
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isRtl = lang === 'ar';

  return (
    <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'} className={cn(inter.variable, notoArabic.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={cn("min-h-screen font-sans antialiased", isRtl && "font-arabic")}>
        <FirebaseClientProvider>
          <FirebaseErrorListener />
          <PWAScript />
          <div className="relative flex min-h-screen flex-col">
            <Header lang={lang} />
            <main className="flex-1">{children}</main>
            <Footer lang={lang} />
            <WhatsAppButton lang={lang} />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
