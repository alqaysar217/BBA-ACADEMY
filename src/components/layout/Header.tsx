
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
  PhoneCall,
  Home,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  MapPin,
  MessageSquare,
  GraduationCap,
  Library,
  Layers
} from 'lucide-react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isAr = lang === 'ar';

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const otherLang = lang === 'en' ? 'ar' : 'en';

  const menuStructure = [
    { 
      name: { en: 'Home', ar: 'الرئيسية' }, 
      href: '', 
      icon: Home 
    },
    { 
      name: { en: 'Programs', ar: 'البرامج' }, 
      href: '/programs', 
      icon: BookOpen 
    },
    { 
      name: { en: 'Resources', ar: 'المصادر' }, 
      icon: Library,
      subLinks: [
        { name: { en: 'Student Guide', ar: 'دليل الطالب' }, href: '/guide', icon: GraduationCap },
        { name: { en: 'NY Homeschool', ar: 'دليل التعليم المنزلي' }, href: '/ny-resources', icon: MapPin },
      ]
    },
    { 
      name: { en: 'About BBA', ar: 'عن الأكاديمية' }, 
      icon: Info,
      subLinks: [
        { name: { en: 'About Us', ar: 'عن الأكاديمية' }, href: '/about', icon: Info },
        { name: { en: 'Our Story', ar: 'قصتنا' }, href: '/story', icon: History },
        { name: { en: 'Founder Message', ar: 'كلمة المؤسس' }, href: '/founder', icon: UserCheck },
      ]
    },
    { 
      name: { en: 'Planning', ar: 'التخطيط' }, 
      icon: Map,
      subLinks: [
        { name: { en: 'College Pathways', ar: 'التخطيط والمسارات الجامعية' }, href: '/planning', icon: Map },
        { name: { en: 'FAQs', ar: 'الأسئلة الشائعة' }, href: '/guide', icon: MessageSquare },
        { name: { en: 'Testimonials', ar: 'آراء أولياء الأمور' }, href: '/testimonials', icon: MessageSquare },
      ]
    },
    { 
      name: { en: 'Contact', ar: 'التواصل' }, 
      href: '/contact', 
      icon: PhoneCall 
    },
  ];

  const isLinkActive = (href: string) => {
    if (!pathname) return false;
    const fullHref = `/${lang}${href}`;
    if (href === '') return pathname === `/${lang}`;
    return pathname.startsWith(fullHref);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container-tight flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuStructure.map((item, idx) => {
              if (item.subLinks) {
                return (
                  <DropdownMenu key={idx}>
                    <DropdownMenuTrigger className="text-xs font-bold transition-colors hover:text-secondary flex items-center gap-1.5 text-primary/70 outline-none">
                      <item.icon className="h-3.5 w-3.5 text-secondary/60" />
                      {item.name[lang]}
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={isAr ? 'end' : 'start'} className="rounded-xl border-slate-100 shadow-premium p-2 min-w-[200px]">
                      {item.subLinks.map((sub, sIdx) => (
                        <DropdownMenuItem key={sIdx} asChild className="rounded-lg">
                          <Link href={`/${lang}${sub.href}`} className="flex items-center gap-3 py-2.5 cursor-pointer">
                            <sub.icon className="h-4 w-4 text-secondary/70" />
                            <span className="text-xs font-bold text-primary/80">{sub.name[lang]}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              
              const active = isLinkActive(item.href!);
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={`/${lang}${item.href}`}
                  className={cn(
                    "text-xs font-bold transition-colors hover:text-secondary flex items-center gap-1.5",
                    active ? "text-secondary" : "text-primary/70"
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", active ? "text-secondary" : "text-secondary/60")} />
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
            <Link href={`/${lang}/enroll`}>{isAr ? 'سجل الآن' : 'Apply Now'}</Link>
          </Button>

          {/* Mobile Menu Trigger */}
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
                  {menuStructure.map((item, idx) => {
                    if (item.subLinks) {
                      return item.subLinks.map((sub, sIdx) => {
                         const active = isLinkActive(sub.href!);
                         const SubIcon = sub.icon;
                         return (
                          <Link
                            key={`${idx}-${sIdx}`}
                            href={`/${lang}${sub.href}`}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center justify-between p-4 rounded-xl transition-all group",
                              active 
                                ? "bg-secondary text-white shadow-lg" 
                                : "hover:bg-white/5 text-white/70 hover:text-white"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <SubIcon className={cn("h-5 w-5", active ? "text-white" : "text-secondary group-hover:scale-110 transition-transform")} />
                              <span className="font-bold text-lg">{sub.name[lang]}</span>
                            </div>
                            {isAr ? <ChevronLeft className="h-4 w-4 opacity-50" /> : <ChevronRight className="h-4 w-4 opacity-50" />}
                          </Link>
                         );
                      });
                    }

                    const active = isLinkActive(item.href!);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={idx}
                        href={`/${lang}${item.href}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl transition-all group",
                          active 
                            ? "bg-secondary text-white shadow-lg" 
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
                      {isAr ? 'سجل الآن' : 'Apply Now'}
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
