import "./globals.css";
import { Noto_Sans_Arabic, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { PWAScript } from '@/components/PWAScript';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-noto-sans-arabic' });

/**
 * RootLayout
 * 
 * In Next.js 15, the root layout MUST contain the <html> and <body> tags.
 * We set a default lang and fonts here, while language-specific direction
 * and attributes are handled in the [lang] nested layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, notoArabic.variable)} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        <FirebaseClientProvider>
          <FirebaseErrorListener />
          <PWAScript />
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
