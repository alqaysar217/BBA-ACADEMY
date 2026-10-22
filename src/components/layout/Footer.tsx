
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n/config';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Instagram, 
  Youtube, 
  Facebook, 
  Home,
  BookOpen,
  Info,
  History,
  Map,
  PhoneCall,
  GraduationCap,
  Lock,
  UserCheck,
  MessageSquare,
  Library
} from 'lucide-react';
import Image from 'next/image';

export function Footer({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar';
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const content = {
    intro: isAr 
      ? 'شريك تعليمي موثوق يساعد الطلاب والعائلات على تحقيق النجاح الأكاديمي من خلال التعلم المرن عبر الإنترنت والتوجيه الشخصي والالتزام بالتميز.'
      : 'A trusted educational partner helping students and families achieve academic success through flexible online learning, personalized guidance, and a commitment to excellence.',
    hours: isAr ? 'ساعات العمل' : 'Working Hours',
    weekdays: isAr ? 'الإثنين - الجمعة' : 'Monday - Friday',
    weekdaysTime: '9:00 AM - 4:00 PM (ET)',
    contact: isAr ? 'تواصل معنا' : 'Contact Us',
    location: isAr ? 'ميشيغان، الولايات المتحدة' : 'Michigan, United States',
    serving: isAr ? '(نخدم جميع الولايات!)' : '(Serving Nationwide!)',
    copyright: isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.',
  };

  const sections = [
    {
      title: isAr ? 'المصادر' : 'Resources',
      links: [
        { name: { en: 'Student Guide', ar: 'دليل الطالب' }, href: '/guide', icon: GraduationCap },
        { name: { en: 'NY Homeschool', ar: 'دليل التعليم المنزلي' }, href: '/ny-resources', icon: MapPin },
      ]
    },
    {
      title: isAr ? 'عن الأكاديمية' : 'About BBA',
      links: [
        { name: { en: 'About Us', ar: 'عن الأكاديمية' }, href: '/about', icon: Info },
        { name: { en: 'Our Story', ar: 'قصتنا' }, href: '/story', icon: History },
        { name: { en: 'Founder Message', ar: 'كلمة المؤسس' }, href: '/founder', icon: UserCheck },
      ]
    },
    {
      title: isAr ? 'التخطيط والمستقبل' : 'Planning',
      links: [
        { name: { en: 'College Pathways', ar: 'التخطيط والمسارات الجامعية' }, href: '/planning', icon: Map },
        { name: { en: 'FAQs', ar: 'الأسئلة الشائعة' }, href: '/guide', icon: MessageSquare },
        { name: { en: 'Testimonials', ar: 'آراء أولياء الأمور' }, href: '/testimonials', icon: MessageSquare },
      ]
    }
  ];

  return (
    <footer className="bg-primary text-white border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container-tight py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Column 1: Intro */}
          <div className="lg:col-span-2 space-y-8">
            <Link href={`/${lang}`} className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center bg-white rounded-xl p-1.5 shrink-0 transition-transform group-hover:scale-105">
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
                <span className="text-2xl font-black tracking-tight leading-none text-white">BBA</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary">Academy</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed font-medium italic max-w-sm">
              {content.intro}
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://wa.me/13136555778" target="_blank" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-green-500 transition-all border border-white/10 hover:border-green-500"><MessageCircle className="h-5 w-5" /></Link>
              <Link href="https://www.instagram.com/baneen_banaat_academy/" target="_blank" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary transition-all border border-white/10 hover:border-secondary"><Instagram className="h-5 w-5" /></Link>
              <Link href="https://www.facebook.com/mybba.edu.us" target="_blank" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary transition-all border border-white/10 hover:border-secondary"><Facebook className="h-5 w-5" /></Link>
              <Link href="https://www.youtube.com/@mybba_edu" target="_blank" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all border border-white/10 hover:border-red-600"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Grouped Links Columns */}
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <h4 className="text-sm font-black text-secondary uppercase tracking-widest border-b border-white/10 pb-4 inline-block">
                {section.title}
              </h4>
              <nav className="grid grid-cols-1 gap-4">
                {section.links.map((link, lIdx) => (
                  <Link 
                    key={lIdx} 
                    href={`/${lang}${link.href}`}
                    className="text-white/60 hover:text-secondary text-xs font-bold flex items-center gap-3 transition-colors"
                  >
                    {link.name[lang]}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
            <span>© <span suppressHydrationWarning>{currentYear}</span> BBA Academy. {content.copyright}</span>
            <div className="flex items-center gap-4">
               <span className="flex items-center gap-2"><MapPin className="h-3 w-3 text-secondary" /> {content.location}</span>
               <span className="flex items-center gap-2"><Clock className="h-3 w-3 text-secondary" /> {content.weekdaysTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${lang}/admin`} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all font-bold text-[8px] uppercase tracking-widest flex items-center gap-2">
              <Lock className="h-3 w-3 text-secondary" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
