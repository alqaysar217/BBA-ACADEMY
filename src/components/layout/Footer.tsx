
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
  Lock,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Image from 'next/image';

export function Footer({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar';
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    // Keeping it 2026 as requested or dynamic
    setCurrentYear(2026);
  }, []);

  const t = {
    description: isAr 
      ? 'شريك تعليمي موثوق يساعد الطلاب والعائلات على تحقيق النجاح الأكاديمي من خلال التعلم المرن عبر الإنترنت والتوجيه الشخصي والالتزام بالتميز.'
      : 'A trusted educational partner helping students and families achieve academic success through flexible online learning, personalized guidance, and a commitment to excellence.',
    quickLinks: isAr ? 'روابط سريعة' : 'Quick Links',
    contactUs: isAr ? 'اتصل بنا' : 'Contact Us',
    workingHours: isAr ? 'ساعات العمل' : 'Working Hours',
    whatsapp: isAr ? 'دعم واتساب' : 'WhatsApp Support',
    adminPanel: isAr ? 'لوحة الإدارة' : 'Admin Panel',
    copyright: isAr 
      ? `© ${currentYear} أكاديمية بنين وبنات. جميع الحقوق محفوظة.`
      : `© ${currentYear} Baneen & Banaat Academy. All rights reserved.`,
    privacy: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
    terms: isAr ? 'شروط الخدمة' : 'Terms of Service',
    locationSub: isAr ? '(نخدم جميع الولايات!)' : '(Serving Nationwide!)'
  };

  const links = [
    { name: { en: 'Home', ar: 'الرئيسية' }, href: '/' },
    { name: { en: 'Founder Message', ar: 'كلمة المؤسس' }, href: '/founder' },
    { name: { en: 'Testimonials', ar: 'آراء أولياء الأمور' }, href: '/testimonials' },
    { name: { en: 'NY Resources', ar: 'دليل التعليم المنزلي' }, href: '/ny-resources' },
    { name: { en: 'Programs', ar: 'البرامج التعليمية' }, href: '/programs' },
    { name: { en: 'About Us', ar: 'عن الأكاديمية' }, href: '/about' },
    { name: { en: 'Our Story', ar: 'قصتنا' }, href: '/story' },
    { name: { en: 'Planning', ar: 'التخطيط والمستقبل' }, href: '/planning' },
    { name: { en: 'Student Guide', ar: 'دليل الطالب' }, href: '/guide' },
    { name: { en: 'Contact Us', ar: 'تواصل معنا' }, href: '/contact' },
  ];

  return (
    <footer className="bg-primary text-white pt-16 lg:pt-24 pb-8 relative overflow-hidden border-t border-white/10">
      <div className="container-tight relative z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Logo & Brand */}
          <div className="lg:col-span-4 space-y-8">
            <Link href={`/${lang}`} className="flex items-center gap-3 group">
              <div className="bg-white p-2 rounded-xl transition-transform group-hover:scale-105 shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="BBA Academy Logo" 
                  width={48} 
                  height={48} 
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight leading-none">BBA</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary">Academy</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed font-medium italic max-w-sm">
              {t.description}
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://wa.me/13136555778" target="_blank" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-green-500 transition-all border border-white/10 hover:border-green-500"><MessageCircle className="h-5 w-5" /></Link>
              <Link href="https://www.instagram.com/baneen_banaat_academy/" target="_blank" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary transition-all border border-white/10 hover:border-secondary"><Instagram className="h-5 w-5" /></Link>
              <Link href="https://www.facebook.com/mybba.edu.us" target="_blank" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary transition-all border border-white/10 hover:border-secondary"><Facebook className="h-5 w-5" /></Link>
              <Link href="https://www.youtube.com/@mybba_edu" target="_blank" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all border border-white/10 hover:border-red-600"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-black text-secondary uppercase tracking-widest border-b border-white/10 pb-4 mb-8 inline-block">
              {t.quickLinks}
            </h4>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-3">
              {links.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={`/${lang}${link.href}`}
                  className="text-white/60 hover:text-secondary text-xs font-bold flex items-center gap-2 transition-colors group"
                >
                  {isAr ? <ChevronLeft className="h-3 w-3 opacity-30 group-hover:opacity-100" /> : <ChevronRight className="h-3 w-3 opacity-30 group-hover:opacity-100" />}
                  {link.name[lang]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <h4 className="text-sm font-black text-secondary uppercase tracking-widest border-b border-white/10 pb-4 inline-block">
                {t.contactUs}
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-secondary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Email</p>
                    <p className="text-xs font-bold">info@baneenbanaat.org</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-secondary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Phone</p>
                    <p className="text-xs font-bold" dir="ltr">(734) 645-3613</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-secondary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Location</p>
                    <p className="text-xs font-bold">Michigan, United States</p>
                    <p className="text-[9px] font-medium text-white/50">{t.locationSub}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-secondary uppercase tracking-widest border-b border-white/10 pb-4 inline-block">
                {t.workingHours}
              </h4>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-secondary shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold">Monday - Friday</p>
                  <p className="text-xs text-white/60 font-medium">9:00 AM - 4:00 PM (ET)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="https://wa.me/13136555778" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                {t.whatsapp}
              </Link>
              <Link 
                href={`/${lang}/admin`}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                <Lock className="h-4 w-4 text-secondary" />
                {t.adminPanel}
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-widest text-white/30 text-center md:text-start">
            {t.copyright}
          </div>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-secondary transition-colors">{t.privacy}</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-secondary transition-colors">{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
