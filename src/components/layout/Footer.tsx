import Link from 'next/link';
import { type Locale } from '@/lib/i18n/config';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import Image from 'next/image';

export function Footer({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar';
  
  const content = {
    tagline: isAr ? 'نحن لا نعلّم فحسب؛ بل نمكّن المستقبل' : 'We don’t just teach; we empower futures',
    hours: isAr ? 'ساعات العمل' : 'Working Hours',
    weekdays: isAr ? 'الإثنين - الجمعة' : 'Monday - Friday',
    weekends: isAr ? 'السبت والأحد: لا توجد دروس' : 'Sat & Sun: Closed',
    contact: isAr ? 'تواصل معنا' : 'Contact Us',
    links: isAr ? 'روابط سريعة' : 'Quick Links',
    whatsapp: isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp',
  };

  return (
    <footer className="bg-primary text-white border-t border-white/5">
      <div className="container-tight py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-4">
          <div className="space-y-8">
            <Link href={`/${lang}`} className="flex items-center gap-3">
              <div className="relative h-12 w-12 bg-white rounded-lg p-1">
                <Image 
                  src="/logo.png" 
                  alt="BBA Academy Logo" 
                  fill 
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight leading-none">BBA</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Academy</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm italic leading-relaxed font-medium">
              "{content.tagline}"
            </p>
            <div className="pt-2">
              <Link href="https://wa.me/13136555778" target="_blank" className="inline-flex items-center gap-3 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30 px-5 py-3 rounded-2xl transition-all font-bold text-sm">
                <MessageCircle className="h-5 w-5" />
                {content.whatsapp}
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-black text-secondary uppercase tracking-widest">{content.hours}</h4>
            <ul className="space-y-4 text-white/70 font-medium">
              <li className="flex flex-col">
                <span className="text-white">{content.weekdays}</span>
                <span className="text-sm opacity-80">9:00 AM - 4:00 PM (ET)</span>
              </li>
              <li className="text-sm border-t border-white/10 pt-4">{content.weekends}</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-black text-secondary uppercase tracking-widest">{content.contact}</h4>
            <ul className="space-y-4 text-white/70 font-medium">
              <li className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm truncate">info@baneenbanaat.org</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm">(734) 645-3613</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm opacity-80">{isAr ? 'ميشيغان، الولايات المتحدة' : 'Michigan, United States'}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-black text-secondary uppercase tracking-widest">{content.links}</h4>
            <nav className="flex flex-col gap-4 text-white/70 font-bold text-sm">
              <Link href={`/${lang}/programs`} className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Educational Programs</Link>
              <Link href={`/${lang}/enroll`} className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Enrollment Form</Link>
              <Link href={`/${lang}/guide`} className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Student Guide</Link>
              <Link href={`/${lang}/ny-resources`} className="hover:text-secondary transition-colors underline-offset-4 hover:underline">NY Resources</Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-xs font-bold text-white/30 tracking-widest uppercase">
            © {new Date().getFullYear()} Baneen & Banaat Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
