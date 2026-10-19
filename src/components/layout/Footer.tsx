
import Link from 'next/link';
import { type Locale } from '@/lib/i18n/config';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export function Footer({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar';
  
  const content = {
    tagline: isAr ? 'نحن لا نعلّم فحسب؛ بل نمكّن المستقبل' : 'We don’t just teach; we empower futures',
    hours: isAr ? 'ساعات العمل' : 'Hours',
    weekdays: isAr ? 'الإثنين - الجمعة' : 'Monday - Friday',
    weekends: isAr ? 'السبت والأحد: لا توجد دروس' : 'Saturday & Sunday: No School',
    contact: isAr ? 'اتصل بنا' : 'Contact',
    links: isAr ? 'روابط سريعة' : 'Quick Links',
    whatsapp: isAr ? 'تواصل معنا عبر واتساب!' : 'Contact us through WhatsApp!',
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href={`/${lang}`} className="block">
              <span className="text-2xl font-bold tracking-tight">BBA Academy</span>
            </Link>
            <p className="text-primary-foreground/70 max-w-xs italic leading-relaxed">
              "{content.tagline}"
            </p>
            <div className="flex items-center gap-2 text-secondary font-medium">
              <MessageCircle className="h-5 w-5" />
              <Link href="https://wa.me/13136555778" target="_blank" className="hover:underline">
                {content.whatsapp}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">{content.hours}</h4>
            <ul className="space-y-4 text-primary-foreground/70">
              <li>{content.weekdays} <br /> <span className="text-white">9 AM - 4 PM</span></li>
              <li>{content.weekends}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">{content.contact}</h4>
            <ul className="space-y-4 text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span>info@baneenbanaat.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary" />
                <span>(734) 645-3613</span>
              </li>
              <li className="text-sm">Michigan, United States</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary">{content.links}</h4>
            <nav className="flex flex-col gap-4 text-primary-foreground/70">
              <Link href={`/${lang}/programs`} className="hover:text-secondary transition-colors">Programs</Link>
              <Link href={`/${lang}/enroll`} className="hover:text-secondary transition-colors">Enrollment</Link>
              <Link href={`/${lang}/guide`} className="hover:text-secondary transition-colors">Student Guide</Link>
              <Link href={`/${lang}/ny-resources`} className="hover:text-secondary transition-colors">NY Resources</Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Baneen & Banaat Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
