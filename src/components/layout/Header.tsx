
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Menu, Globe, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';

const navigation = [
  { name: { en: 'Programs', ar: 'البرامج التعليمية' }, href: '/programs' },
  { name: { en: 'About Us', ar: 'عن الأكاديمية' }, href: '/about' },
  { name: { en: 'Our Story', ar: 'قصتنا' }, href: '/story' },
  { name: { en: 'Resources', ar: 'الموارد' }, href: '/ny-resources' },
  { name: { en: 'Planning', ar: 'التخطيط الدراسي' }, href: '/planning' },
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

  const t = {
    applyNow: lang === 'en' ? 'Apply Now' : 'سجل الآن',
    programs: lang === 'en' ? 'Programs' : 'البرامج',
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-10">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-primary leading-none">BBA</span>
              <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold">Academy</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="text-sm font-medium transition-colors hover:text-secondary"
              >
                {item.name[lang]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="uppercase">{lang}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={redirectedPathname('en')}>English</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={redirectedPathname('ar')}>العربية</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={`/${lang}/enroll`} className="hidden sm:block">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              {t.applyNow}
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={lang === 'ar' ? 'right' : 'left'}>
              <div className="flex flex-col gap-6 mt-10">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${lang}${item.href}`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium"
                  >
                    {item.name[lang]}
                  </Link>
                ))}
                <Link href={`/${lang}/enroll`} onClick={() => setIsOpen(false)}>
                  <Button className="w-full">{t.applyNow}</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
