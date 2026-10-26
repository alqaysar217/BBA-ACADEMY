import { ReactNode } from 'react';
import { i18n, type Locale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Metadata, Viewport } from 'next';

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

  const baseUrl = 'https://bba-academy.vercel.app';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: isAr 
      ? ['أكاديمية بنين وبنات', 'تعليم عن بعد', 'قرآن كريم أونلاين', 'منهج أمريكي إسلامي', 'دراسة أونلاين أمريكا', 'BBA Academy'] 
      : ['Baneen and Banaat Academy', 'Online Islamic School', 'Remote Learning USA', 'Quran Classes Online', 'BBA Academy', 'Arabic Language School'],
    manifest: '/manifest.json',
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}`,
      siteName,
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'en': `${baseUrl}/en`,
        'ar': `${baseUrl}/ar`,
      },
    },
  };
}

/**
 * Language Layout
 * 
 * This layout handles direction and language-specific components.
 * The <html> and <body> tags are provided by the root layout.
 */
export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isRtl = lang === 'ar';

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className={cn("flex min-h-screen flex-col", isRtl && "font-arabic")}
    >
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
