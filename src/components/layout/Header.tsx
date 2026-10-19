
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Menu, ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: { en: 'Programs', ar: 'البرامج' }, href: '/programs' },
  { name: { en: 'About Us', ar: 'عن الأكاديمية' }, href: '/about' },
  { name: { en: 'Our Story', ar: 'قصتنا' }, href: '/story' },
  { name: { en: 'Planning', ar: 'التخطيط' }, href: '/planning' },
  { name: { en: 'Resources', ar: 'الموارد' }, href: '/ny-resources' },
  { name: { en: 'Contact', ar: 'اتصل بنا' }, href: '/contact' },
];

export function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const otherLang = lang === 'en' ? 'ar' : 'en';

  const t = {
    applyNow: lang === 'en' ? 'Apply Now' : 'سجل الآن',
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container-tight flex h-20 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href={`/${lang}`} className="group flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <Image 
                src="/logo.png" 
                alt="BBA Academy Logo" 
                width={48}
                height={48}
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-primary leading-none">BBA</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-secondary font-bold">Academy</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-secondary",
                  pathname?.includes(item.href) ? "text-secondary" : "text-primary/70"
                )}
              >
                {item.name[lang]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle Button */}
          <Link
            href={redirectedPathname(otherLang)}
            title={lang === 'en' ? 'تبديل للعربية' : 'Switch to English'}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 hover:border-secondary hover:bg-white transition-all shadow-sm"
          >
            <span className={cn("text-lg transition-opacity", lang === 'en' ? "opacity-100" : "opacity-30")}>🇺🇸</span>
            <ArrowLeftRight className="h-3 w-3 text-slate-300 group-hover:text-secondary transition-colors" />
            <span className={cn("text-lg transition-opacity", lang === 'ar' ? "opacity-100" : "opacity-30")}>🇸🇦</span>
          </Link>

          <Link href={`/${lang}/enroll`} className="hidden sm:block">
            <Button size="sm" className="bg-primary hover:bg-accent shadow-md rounded-full px-6 transition-all duration-300">
              {t.applyNow}
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={lang === 'ar' ? 'right' : 'left'} className="w-[300px] border-none bg-primary text-white">
              <div className="flex flex-col gap-8 mt-12 px-2">
                <div className="flex h-16 w-16 items-center justify-center mb-4 bg-white rounded-xl p-2">
                  <Image 
                    src="/logo.png" 
                    alt="BBA Academy Logo" 
                    width={56}
                    height={56}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${lang}${item.href}`}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-bold hover:text-secondary transition-colors"
                  >
                    {item.name[lang]}
                  </Link>
                ))}
                <Link href={`/${lang}/enroll`} onClick={() => setIsOpen(false)} className="pt-4">
                  <Button className="w-full bg-secondary text-white font-bold h-12 rounded-xl">
                    {t.applyNow}
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
