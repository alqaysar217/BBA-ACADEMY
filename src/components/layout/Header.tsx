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
  HelpCircle
} from 'lucide-react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isAr = lang === 'ar';

  useEffect(() => {
    setMounted(true);
  }, []);

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const otherLang = lang === 'en' ? 'ar' : 'en';

  const menuStructure = [
    { name: { en: 'Home', ar: 'الرئيسية' }, href: '', icon: Home },
    { name: { en: 'Programs', ar: 'البرامج' }, href: '/programs', icon: BookOpen },
    { 
      name: { en: 'Resources', ar: 'المصادر' }, 
      icon: Library,
      subLinks: [
        { name: { en: 'Student Guide', ar: 'دليل الطالب' }, href: '/guide', icon: GraduationCap },
        { name: { en: 'NY Homeschool', ar: 'دليل التعليم المنزلي' }, href: '/ny-resources', icon: MapPin },
        { name: { en: 'FAQs', ar: 'الأسئلة الشائعة' }, href: '/faq', icon: HelpCircle },
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
        { name: { en: 'Testimonials', ar: 'آراء أولياء الأمور' }, href: '/testimonials', icon: MessageSquare },
      ]
    },
    { name: { en: 'Contact', ar: 'التواصل' }, href: '/contact', icon: PhoneCall },
  ];

  const isLinkActive = (href: string) => {
    if (!pathname || !mounted) return false;
    const fullHref = `/${lang}${href}`;
    if (href === '') return pathname === `/${lang}`;
    return pathname.startsWith(fullHref);
  };

  if (!mounted) return <div className="h-20" />;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container-tight flex h-20 items-center justify-between">
        <div className="flex flex-1 items-center">
          <Link href={`/${lang}`} className="group flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={48} height={48} priority unoptimized />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary leading-none">BBA</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-secondary font-bold">Academy</span>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-8 px-4">
          {menuStructure.map((item, idx) => {
            if (item.subLinks) {
              return (
                <DropdownMenu key={idx}>
                  <DropdownMenuTrigger className="text-xs font-bold hover:text-secondary flex items-center gap-1.5 text-primary/70 outline-none">
                    <item.icon className="h-3.5 w-3.5 text-secondary/60" />
                    {item.name[lang]}
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={isAr ? 'end' : 'start'} className="rounded-xl p-2 min-w-[200px]">
                    {item.subLinks.map((sub, sIdx) => (
                      <DropdownMenuItem key={sIdx} asChild>
                        <Link href={`/${lang}${sub.href}`} className="flex items-center gap-3 py-2.5">
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
            return (
              <Link key={idx} href={`/${lang}${item.href}`} className={cn("text-xs font-bold", active ? "text-secondary" : "text-primary/70")}>
                {item.name[lang]}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Link href={redirectedPathname(otherLang)} className="text-xs font-black p-2 bg-slate-100 rounded-xl">
            {lang === 'en' ? 'AR' : 'EN'}
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex bg-primary rounded-full px-6">
            <Link href={`/${lang}/enroll`}>{isAr ? 'سجل الآن' : 'Apply Now'}</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side={isAr ? 'right' : 'left'} className="w-[320px] p-0 bg-primary text-white">
              <SheetHeader className="p-8 border-b border-white/10">
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <nav className="p-4 space-y-2">
                {menuStructure.map((item, idx) => (
                  <Link key={idx} href={`/${lang}${item.href || ''}`} onClick={() => setIsOpen(false)} className="block p-4 font-bold">
                    {item.name[lang]}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}