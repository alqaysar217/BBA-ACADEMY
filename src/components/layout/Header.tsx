
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Languages, 
  BookOpen, 
  Info, 
  History, 
  Map, 
  Library, 
  PhoneCall,
  Home,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: { en: 'Home', ar: 'الرئيسية' }, href: '', icon: Home },
  { name: { en: 'Programs', ar: 'البرامج' }, href: '/programs', icon: BookOpen },
  { name: { en: 'About Us', ar: 'عن الأكاديمية' }, href: '/about', icon: Info },
  { name: { en: 'Our Story', ar: 'قصتنا' }, href: '/story', icon: History },
  { name: { en: 'Planning', ar: 'التخطيط' }, href: '/planning', icon: Map },
  { name: { en: 'Resources', ar: 'الموارد' }, href: '/ny-resources', icon: Library },
  { name: { en: 'Contact', ar: 'اتصل بنا' }, href: '/contact', icon: PhoneCall },
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
  const isAr = lang === 'ar';

  const t = {
    applyNow: lang === 'en' ? 'Apply Now' : 'سجل الآن',
  };

  const isLinkActive = (href: string) => {
    if (!pathname) return false;
    const fullHref = `/${lang}${href}`;
    if (href === '') return pathname === `/${lang}`;
    return pathname.startsWith(fullHref);
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
            {navigation.filter(i => i.href !== '').map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  className={cn(
                    "text-sm font-semibold transition-colors hover:text-secondary flex items-center gap-2",
                    active ? "text-secondary" : "text-primary/70"
                  )}
                >
                  <Icon className={cn("h-4 w-4", active ? "text-secondary" : "text-secondary/60")} />
                  {item.name[lang]}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={redirectedPathname(otherLang)}
            title={lang === 'en' ? 'تبديل للعربية' : 'Switch to English'}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/50 hover:bg-secondary/10 border border-transparent hover:border-secondary/20 transition-all text-primary/80"
          >
            <Languages className="h-4 w-4 text-secondary group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black uppercase tracking-tighter">
              {lang === 'en' ? 'AR' : 'EN'}
            </span>
          </Link>

          <Button asChild size="sm" className="hidden sm:inline-flex bg-primary hover:bg-accent shadow-md rounded-full px-6 transition-all duration-300">
            <Link href={`/${lang}/enroll`}>{t.applyNow}</Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isAr ? 'right' : 'left'} className="w-[320px] p-0 border-none bg-primary text-white overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="p-8 border-b border-white/10">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 items-center justify-center bg-white rounded-2xl p-2 shrink-0 flex">
                      <Image 
                        src="/logo.png" 
                        alt="BBA Academy Logo" 
                        width={40}
                        height={40}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-black tracking-tight text-white leading-none">BBA</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-black">Academy</span>
                    </div>
                  </div>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2">
                  {navigation.map((item) => {
                    const active = isLinkActive(item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={`/${lang}${item.href}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl transition-all group",
                          active 
                            ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                            : "hover:bg-white/5 text-white/70 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <Icon className={cn("h-5 w-5", active ? "text-white" : "text-secondary group-hover:scale-110 transition-transform")} />
                          <span className="font-bold text-lg">{item.name[lang]}</span>
                        </div>
                        {isAr ? <ChevronLeft className="h-4 w-4 opacity-50" /> : <ChevronRight className="h-4 w-4 opacity-50" />}
                      </Link>
                    );
                  })}
                </nav>

                <div className="p-6 mt-auto border-t border-white/10">
                  <Button asChild className="w-full bg-secondary hover:bg-white hover:text-secondary text-white font-black h-14 rounded-2xl shadow-xl transition-all">
                    <Link href={`/${lang}/enroll`} onClick={() => setIsOpen(false)}>
                      {t.applyNow}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
