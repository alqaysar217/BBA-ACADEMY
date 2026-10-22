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
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const title = isAr 
    ? 'أكاديمية بنين وبنات | تعليم يبني العقول وقيم تشكل الشخصية' 
    : 'Baneen & Banaat Academy | Education Builds Minds, Values Shape Character';
  
  const description = isAr
    ? 'شريك تعليمي موثوق يساعد الطلاب والعائلات على تحقيق النجاح الأكاديمي من خلال التعلم المرن عبر الإنترنت والتوجيه الشخصي والالتزام بالتميز.'
    : 'A trusted educational partner helping students and families achieve academic success through flexible online learning and personalized guidance.';

  return {
    title: {
      default: title,
      template: `%s | ${isAr ? 'أكاديمية بنين وبنات' : 'BBA Academy'}`,
    },
    description,
    manifest: '/manifest.json',
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      title,
      description,
      url: 'https://baneenbanaat.org',
      siteName: isAr ? 'أكاديمية بنين وبنات' : 'Baneen & Banaat Academy',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isAr ? 'شعار أكاديمية بنين وبنات' : 'BBA Academy Logo',
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
      title: 'BBA Academy',
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
