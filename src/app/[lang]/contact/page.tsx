import { type Locale } from '@/lib/i18n/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle, MapPin, Clock, Instagram, Youtube, Facebook, CheckCircle2, Send, User, Type, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === 'ar';
  return {
    title: isAr ? 'تواصل معنا' : 'Contact Us',
    description: isAr 
      ? 'سواء كنت تستكشف الخيارات التعليمية، أو لديك أسئلة حول برامجنا، أو كنت مستعداً لبدء الرحلة التعليمية لعائلتك، فإن فريقنا هنا للمساعدة.'
      : 'Whether you are exploring educational options, have questions about our programs, or are ready to begin your family\'s educational journey, our team is here to help.',
    openGraph: {
      title: isAr ? 'تواصل معنا | أكاديمية بنين وبنات' : 'Contact Us | BBA Academy',
      description: isAr ? 'نحن هنا للإجابة على استفساراتكم ومساعدتكم.' : 'We are here to answer your inquiries and help you.',
      images: ['/logo.png'],
    }
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'تواصل معنا' : 'Connect With Us',
    subtitle: isAr ? 'نود أن نسمع منك' : 'We\'d Love to Hear From You',
    intro: isAr 
      ? 'سواء كنت تستكشف الخيارات التعليمية، أو لديك أسئلة حول برامجنا، أو كنت مستعداً لبدء الرحلة التعليمية لعائلتك، فإن فريقنا هنا للمساعدة. في أكاديمية بنين وبنات، نؤمن بأن كل عائلة تستحق توجيهاً شخصياً. يسعدنا الإجابة على أسئلتك، ومناقشة الأهداف التعليمية لطفلك، ومساعدتك في استكشاف المسار الذي يناسب احتياجات عائلتك بشكل أفضل.'
      : 'Whether you are exploring educational options, have questions about our programs, or are ready to begin your family\'s educational journey, our team is here to help. At Baneen and Banaat Academy, we believe every family deserves personalized guidance.',
    contactInfoTitle: isAr ? 'معلومات التواصل' : 'Contact Information',
    contactInfo: {
      phone: '+1 (734) 645-3613',
      whatsapp: '+1 (313) 655-5778',
      emails: ['banaatacademy@gmail.com', 'info@baneenbanaat.org'],
      hours: isAr ? 'الإثنين – الجمعة | 9:00 صباحاً – 4:00 مساءً' : 'Monday – Friday | 9:00 AM – 4:00 PM',
      location: isAr ? 'ميشيغان، الولايات المتحدة (نخدم العائلات في جميع أنحاء البلاد!)' : 'Michigan, United States (Serving Families Nationwide!)'
    },
    helpTitle: isAr ? 'كيف يمكننا المساعدة' : 'How We Can Help',
    helpItems: [
      isAr ? 'القبول والتسجيل' : 'Admissions and Enrollment',
      isAr ? 'التخطيط التعليمي' : 'Educational Planning',
      isAr ? 'إرشادات التعليم المنزلي' : 'Homeschool Guidance',
      isAr ? 'معلومات البرنامج' : 'Program Information',
      isAr ? 'سجلات الطلاب والنصوص' : 'Student Records and Transcripts',
      isAr ? 'استفسارات عامة' : 'General Inquiries'
    ],
    formTitle: isAr ? 'لنبدأ المحادثة' : 'Let\'s Start the Conversation',
    formText: isAr 
      ? 'تبدأ رحلة كل طالب بمحادثة واحدة. سواء كنت تبحث عن إجابات، أو تستكشف فرصاً تعليمية جديدة، أو مستعداً للتسجيل، يسعدنا مساعدتك في اتخاذ الخطوة التالية.'
      : 'Every student\'s journey begins with a single conversation. Whether you are looking for answers, exploring new educational opportunities, or ready to enroll, we are happy to help you take the next step.',
    socialTitle: isAr ? 'تابعنا على وسائل التواصل الاجتماعي' : 'Follow Us on Social Media',
    labels: {
      name: isAr ? 'الاسم الكامل' : 'Full Name',
      email: isAr ? 'البريد الإلكتروني' : 'Email Address',
      subject: isAr ? 'الموضوع' : 'Subject',
      message: isAr ? 'الرسالة' : 'Message',
      send: isAr ? 'إرسال الرسالة' : 'Send Message'
    }
  };

  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/baneen_banaat_academy/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@mybba_edu', label: 'YouTube' },
    { icon: Facebook, href: 'https://www.facebook.com/mybba.edu.us', label: 'Facebook' },
  ];

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="py-20 lg:py-24 bg-white text-center">
        <div className="container-tight space-y-6">
          <div className="space-y-2">
             <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-primary uppercase">{t.title}</h1>
             <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-xl lg:text-2xl font-bold text-secondary">{t.subtitle}</p>
          <p className="text-slate-600 max-w-4xl mx-auto leading-relaxed text-lg font-medium italic px-4">
            {t.intro}
          </p>
        </div>
      </section>

      <div className="container-tight py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-10">
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-primary uppercase tracking-tight border-b-4 border-secondary pb-2 inline-block">
                {t.contactInfoTitle}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:border-secondary/20">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-black text-primary text-sm">{isAr ? 'الهاتف' : 'Phone'}</h3>
                    <p className="text-slate-600 font-bold">{t.contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:border-secondary/20">
                  <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-primary text-sm">WhatsApp</h3>
                    <Link href="https://wa.me/13136555778" target="_blank" className="text-slate-600 font-bold hover:text-secondary underline decoration-secondary/30 underline-offset-4">
                      {t.contactInfo.whatsapp}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:border-secondary/20">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-black text-primary text-sm">{isAr ? 'البريد الإلكتروني' : 'Email'}</h3>
                    {t.contactInfo.emails.map(email => (
                      <p key={email} className="text-slate-600 font-bold truncate text-sm">{email}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:border-secondary/20">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-black text-primary text-sm">{isAr ? 'ساعات العمل' : 'Office Hours'}</h3>
                    <p className="text-slate-600 font-bold text-sm leading-relaxed">{t.contactInfo.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-white hover:border-secondary/20">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-black text-primary text-sm">{isAr ? 'الموقع' : 'Location'}</h3>
                    <p className="text-slate-600 font-bold text-sm leading-relaxed">{t.contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 space-y-10">
            <Card className="rounded-2xl border border-slate-100 shadow-2xl overflow-hidden bg-white">
              <CardHeader className="bg-slate-50 p-8 lg:p-12 border-b border-slate-100">
                <CardTitle className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">{t.formTitle}</CardTitle>
                <p className="text-slate-500 font-bold leading-relaxed mt-4 max-w-xl">
                  {t.formText}
                </p>
              </CardHeader>
              <CardContent className="p-8 lg:p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-primary/60 flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-secondary" />
                      {t.labels.name}
                    </label>
                    <Input 
                      placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'} 
                      className="h-14 bg-white border border-slate-200 rounded-xl font-bold transition-all focus:border-secondary focus:ring-secondary/10" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-primary/60 flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-secondary" />
                      {t.labels.email}
                    </label>
                    <Input 
                      type="email" 
                      placeholder="email@example.com" 
                      className="h-14 bg-white border border-slate-200 rounded-xl font-bold transition-all focus:border-secondary focus:ring-secondary/10" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-primary/60 flex items-center gap-2">
                    <Type className="h-3.5 w-3.5 text-secondary" />
                    {t.labels.subject}
                  </label>
                  <Input 
                    placeholder={isAr ? 'موضوع الرسالة' : 'Subject of message'} 
                    className="h-14 bg-white border border-slate-200 rounded-xl font-bold transition-all focus:border-secondary focus:ring-secondary/10" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-primary/60 flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5 text-secondary" />
                    {t.labels.message}
                  </label>
                  <Textarea 
                    placeholder={isAr ? 'كيف يمكننا مساعدتك؟ نحن مستعدون للرد على كافة أسئلتك.' : 'How can we help you? We are ready to answer all your questions.'} 
                    className="min-h-[180px] bg-white border border-slate-200 rounded-xl font-bold p-6 transition-all focus:border-secondary focus:ring-secondary/10"
                  />
                </div>
                <Button className="w-full bg-secondary hover:bg-primary text-white font-black h-16 text-lg rounded-xl shadow-xl shadow-secondary/20 transition-all scale-100 hover:scale-[1.01] active:scale-[0.99] gap-3">
                  {t.labels.send}
                  <Send className={isAr ? "h-5 w-5 rotate-180" : "h-5 w-5"} />
                </Button>
              </CardContent>
            </Card>

            {/* Help Items Section - MOVED UNDER FORM */}
            <div className="bg-primary text-white p-10 rounded-2xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                 <CheckCircle2 className="h-24 w-24" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight border-b border-white/20 pb-4 mb-6 relative z-10">
                {t.helpTitle}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {t.helpItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-secondary shrink-0" />
                    <span className="font-bold text-sm opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links Footer */}
            <div className="text-center space-y-10 pt-8 border-t border-slate-100">
              <h2 className="text-xl font-black text-primary uppercase tracking-tight">
                {t.socialTitle}
              </h2>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                {socials.map((social, idx) => (
                  <Link 
                    key={idx} 
                    href={social.href} 
                    target="_blank" 
                    className="group flex flex-col items-center gap-4"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center transition-all group-hover:bg-secondary group-hover:border-secondary group-hover:-translate-y-2 group-hover:rotate-6">
                      <social.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-secondary transition-colors">
                      {social.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
