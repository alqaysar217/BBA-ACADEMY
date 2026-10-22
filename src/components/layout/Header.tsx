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
  HelpCircle,
  FileSignature,
  ArrowRight,
  ArrowLeft
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
        {/* Logo Section */}
        <div className="flex flex-1 items-center">
          <Link href={`/${lang}`} className="group flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 transition-transform group-hover:scale-105 shrink-0">
              <Image src="/logo.png" alt="BBA Logo" width={42} height={42} priority unoptimized />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-primary leading-none tracking-tight">BBA</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-secondary font-black">Academy</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-6 px-4">
          {menuStructure.map((item, idx) => {
            if (item.subLinks) {
              return (
                <DropdownMenu key={idx}>
                  <DropdownMenuTrigger className="text-[11px] font-black uppercase tracking-widest hover:text-secondary flex items-center gap-2 text-primary/70 outline-none transition-colors group">
                    <item.icon className="h-3.5 w-3.5 text-secondary" />
                    {item.name[lang]}
                    <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-100" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={isAr ? 'end' : 'start'} className="rounded-xl p-2 min-w-[220px] shadow-2xl border-slate-100">
                    {item.subLinks.map((sub, sIdx) => (
                      <DropdownMenuItem key={sIdx} asChild className="rounded-lg">
                        <Link href={`/${lang}${sub.href}`} className="flex items-center gap-3 py-3 cursor-pointer">
                          <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                            <sub.icon className="h-4 w-4 text-secondary" />
                          </div>
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
              <Link 
                key={idx} 
                href={`/${lang}${item.href}`} 
                className={cn(
                  "text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:text-secondary",
                  active ? "text-secondary" : "text-primary/70"
                )}
              >
                <item.icon className="h-3.5 w-3.5 text-secondary" />
                {item.name[lang]}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Language, Apply Button, Mobile Menu */}
        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
          <Link 
            href={redirectedPathname(otherLang)} 
            className="flex items-center gap-2 text-[10px] font-black px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 text-primary"
          >
            <Languages className="h-3.5 w-3.5 text-secondary" />
            {lang === 'en' ? 'العربية' : 'ENGLISH'}
          </Link>
          
          <Button asChild size="sm" className="hidden sm:inline-flex bg-primary hover:bg-secondary text-white rounded-xl px-6 h-10 font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 active:scale-95">
            <Link href={`/${lang}/enroll`} className="flex items-center gap-2">
              <FileSignature className="h-3.5 w-3.5 text-white" />
              {isAr ? 'سجل الآن' : 'Apply Now'}
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isAr ? 'right' : 'left'} className="w-[320px] p-0 bg-white border-none">
              {/* Sidebar Header with Logo */}
              <div className="p-6 bg-primary text-white space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-xl">
                    <Image src="/logo.png" alt="BBA Logo" width={40} height={40} unoptimized />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black leading-none">BBA</span>
                    <span className="text-[9px] uppercase tracking-widest text-secondary font-black">Academy</span>
                  </div>
                </div>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </div>

              {/* Sidebar Navigation Links */}
              <nav className="p-4 space-y-1">
                {menuStructure.map((item, idx) => {
                  if (item.subLinks) {
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50 mb-1">
                          {item.name[lang]}
                        </div>
                        {item.subLinks.map((sub, sIdx) => (
                          <Link 
                            key={sIdx} 
                            href={`/${lang}${sub.href}`} 
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-xl font-bold text-sm transition-all hover:bg-slate-50",
                              isLinkActive(sub.href!) ? "text-secondary bg-secondary/5" : "text-primary/70"
                            )}
                          >
                            <sub.icon className="h-5 w-5 text-secondary" />
                            {sub.name[lang]}
                          </Link>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <Link 
                      key={idx} 
                      href={`/${lang}${item.href || ''}`} 
                      onClick={() => setIsOpen(false)} 
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl font-bold text-sm transition-all hover:bg-slate-50",
                        isLinkActive(item.href!) ? "text-secondary bg-secondary/5" : "text-primary/70"
                      )}
                    >
                      <item.icon className="h-5 w-5 text-secondary" />
                      {item.name[lang]}
                    </Link>
                  );
                })}
              </nav>

              {/* Sidebar Bottom Action */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-50 bg-slate-50/50">
                <Button asChild className="w-full h-14 bg-secondary hover:bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-secondary/20 group">
                  <Link href={`/${lang}/enroll`} onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3">
                    {isAr ? 'ابدأ التسجيل' : 'Start Enrollment'}
                    {isAr ? <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}