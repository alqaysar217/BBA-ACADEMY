
import Link from 'next/link';
import { type Locale } from '@/lib/i18n/config';
import { Mail, Phone, MessageCircle, MapPin, Clock, Instagram, Youtube, Facebook, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export function Footer({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar';
  
  const content = {
    intro: isAr 
      ? 'شريك تعليمي موثوق يساعد الطلاب والعائلات على تحقيق النجاح الأكاديمي من خلال التعلم المرن عبر الإنترنت والتوجيه الشخصي والالتزام بالتميز.'
      : 'A trusted educational partner helping students and families achieve academic success through flexible online learning, personalized guidance, and a commitment to excellence.',
    hours: isAr ? 'ساعات العمل' : 'Working Hours',
    weekdays: isAr ? 'الإثنين - الجمعة' : 'Monday - Friday',
    weekdaysTime: '9:00 AM - 4:00 PM (ET)',
    weekends: isAr ? 'السبت والأحد: لا توجد دروس' : 'Sat & Sun: No School',
    contact: isAr ? 'تواصل معنا' : 'Contact Us',
    links: isAr ? 'روابط سريعة' : 'Quick Links',
    location: isAr ? 'ميشيغان، الولايات المتحدة' : 'Michigan, United States',
    serving: isAr ? '(نخدم جميع الولايات!)' : '(Serving Nationwide!)',
    copyright: isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.',
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/baneen_banaat_academy/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@mybba_edu', label: 'YouTube' },
    { icon: Facebook, href: 'https://www.facebook.com/mybba.edu.us', label: 'Facebook' },
  ];

  const quickLinks = [
    { name: { en: 'Home', ar: 'الرئيسية' }, href: '' },
    { name: { en: 'Programs', ar: 'البرامج التعليمية' }, href: '/programs' },
    { name: { en: 'About Us', ar: 'عن الأكاديمية' }, href: '/about' },
    { name: { en: 'Our Story', ar: 'قصتنا' }, href: '/story' },
    { name: { en: 'Planning', ar: 'التخطيط والتخرج' }, href: '/planning' },
    { name: { en: 'Student Guide', ar: 'دليل الطالب' }, href: '/guide' },
    { name: { en: 'NY Resources', ar: 'موارد نيويورك' }, href: '/ny-resources' },
    { name: { en: 'Contact Us', ar: 'اتصل بنا' }, href: '/contact' },
  ];

  return (
    <footer className="bg-primary text-white border-t border-white/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container-tight py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Column 1: Intro & Socials */}
          <div className="space-y-8">
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
            <p className="text-white/70 text-sm leading-relaxed font-medium italic">
              {content.intro}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all border border-white/10 hover:border-secondary hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-8">
            <h4 className="text-lg font-black text-secondary uppercase tracking-widest border-b border-white/10 pb-4 inline-block">
              {content.links}
            </h4>
            <nav className="grid grid-cols-1 gap-3">
              {quickLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={`/${lang}${link.href}`}
                  className="text-white/60 hover:text-secondary text-sm font-bold flex items-center gap-2 group transition-colors"
                >
                  <ChevronRight className={cn("h-3 w-3 text-secondary/40 group-hover:text-secondary transition-colors", isAr && "rotate-180")} />
                  {link.name[lang]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-8">
            <h4 className="text-lg font-black text-secondary uppercase tracking-widest border-b border-white/10 pb-4 inline-block">
              {content.contact}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors shrink-0">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Email</span>
                  <span className="text-sm font-bold text-white/80 break-all">info@baneenbanaat.org</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors shrink-0">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Phone</span>
                  <span className="text-sm font-bold text-white/80">(734) 645-3613</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors shrink-0">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Location</span>
                  <span className="text-sm font-bold text-white/80">{content.location}</span>
                  <span className="text-[10px] font-medium text-secondary/60 mt-1">{content.serving}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Working Hours */}
          <div className="space-y-8">
            <h4 className="text-lg font-black text-secondary uppercase tracking-widest border-b border-white/10 pb-4 inline-block">
              {content.hours}
            </h4>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-secondary" />
                  <span className="font-black text-sm uppercase tracking-tight">{content.weekdays}</span>
                </div>
                <div className="text-2xl font-black text-white">{content.weekdaysTime}</div>
              </div>
              <div className="flex items-center gap-3 px-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm font-bold text-white/60">{content.weekends}</span>
              </div>
              
              {/* Quick WhatsApp Link in Footer */}
              <Link 
                href="https://wa.me/13136555778" 
                target="_blank" 
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl transition-all font-black text-sm shadow-xl shadow-green-500/20 active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                {isAr ? 'تواصل عبر واتساب' : 'WhatsApp Support'}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase text-center md:text-start">
            © {new Date().getFullYear()} Baneen & Banaat Academy. {content.copyright}
          </p>
          <div className="flex items-center gap-8 text-[10px] font-black text-white/40 tracking-widest uppercase">
            <Link href="#" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
