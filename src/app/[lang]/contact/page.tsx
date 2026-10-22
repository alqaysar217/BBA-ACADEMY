import { type Locale } from '@/lib/i18n/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle, MapPin, Clock, Instagram, Youtube, Facebook, CheckCircle2, Send } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === 'ar';
  return {
    title: isAr ? 'تواصل معنا' : 'Contact Us',
    description: isAr 
      ? 'نحن هنا للإجابة على استفساراتكم ومساعدتكم في الانضمام لأكاديمية بنين وبنات.' 
      : 'We are here to answer your inquiries and help you join Baneen and Banaat Academy.',
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'تواصل معنا' : 'Connect With Us',
    subtitle: isAr ? 'نود أن نسمع منك' : 'We\'d Love to Hear From You',
    intro: isAr 
      ? 'سواء كنت تستكشف الخيارات التعليمية، أو لديك أسئلة حول برامجنا، أو كنت مستعداً لبدء الرحلة التعليمية لعائلتك، فإن فريقنا هنا للمساعدة.'
      : 'Whether you are exploring educational options, have questions about our programs, or are ready to begin your family\'s educational journey, our team is here to help.',
    contactInfoTitle: isAr ? 'معلومات التواصل' : 'Contact Information',
    contactInfo: {
      phone: '+1 (734) 645-3613',
      whatsapp: '+1 (313) 655-5778',
      emails: ['banaatacademy@gmail.com', 'info@baneenbanaat.org'],
      hours: isAr ? 'الإثنين – الجمعة | 9:00 صباحاً – 4:00 مساءً' : 'Monday – Friday | 9:00 AM – 4:00 PM',
      location: isAr ? 'ميشيغان، الولايات المتحدة (نخدم العائلات في جميع أنحاء البلاد!)' : 'Michigan, United States (Serving Families Nationwide!)'
    },
    // labels and other translations...
    formTitle: isAr ? 'لنبدأ المحادثة' : 'Let\'s Start the Conversation',
    formText: isAr 
      ? 'تبدأ رحلة كل طالب بمحادثة واحدة. سواء كنت تبحث عن إجابات، أو تستكشف فرصاً تعليمية جديدة، أو مستعداً للتسجيل، يسعدنا مساعدتك في اتخاذ الخطوة التالية.'
      : 'Every student\'s journey begins with a single conversation. Whether you are looking for answers, exploring new educational opportunities, or ready to enroll, we are happy to help you take the next step.',
    labels: {
      name: isAr ? 'الاسم الكامل' : 'Full Name',
      email: isAr ? 'البريد الإلكتروني' : 'Email Address',
      subject: isAr ? 'الموضوع' : 'Subject',
      message: isAr ? 'الرسالة' : 'Message',
      send: isAr ? 'إرسال الرسالة' : 'Send Message'
    }
  };

  return (
    <div className="bg-white">
      <section className="py-20 lg:py-24 bg-white text-center">
        <div className="container-tight space-y-6">
          <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-primary uppercase">{t.title}</h1>
          <p className="text-xl lg:text-2xl font-bold text-secondary">{t.subtitle}</p>
          <p className="text-slate-600 max-w-4xl mx-auto leading-relaxed text-lg font-medium italic">{t.intro}</p>
        </div>
      </section>
      {/* Contact form and details... */}
    </div>
  );
}
