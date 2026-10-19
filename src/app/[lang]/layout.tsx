import { ReactNode } from 'react';
import { i18n, type Locale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Noto_Sans_Arabic, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-noto-sans-arabic' });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
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
