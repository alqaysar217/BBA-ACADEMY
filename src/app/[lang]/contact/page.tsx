import { type Locale } from '@/lib/i18n/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle, MapPin, Clock, Instagram, Youtube, Facebook, CheckCircle2, Send, PhoneCall, Headphones } from 'lucide-react';
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
      phone: '(734) 645-3613',
      whatsapp: '(313) 655-5778',
      emails: ['info@baneenbanaat.org', 'banaatacademy@gmail.com'],
      hours: isAr ? 'الإثنين – الجمعة | 9:00 صباحاً – 4:00 مساءً' : 'Monday – Friday | 9:00 AM – 4:00 PM',
      location: isAr ? 'ميشيغان، الولايات المتحدة (نخدم العائلات في جميع أنحاء البلاد!)' : 'Michigan, United States (Serving Families Nationwide!)'
    },
    formTitle: isAr ? 'لنبدأ المحادثة' : 'Let\'s Start the Conversation',
    formText: isAr 
      ? 'تبدأ رحلة كل طالب بمحادثة واحدة. سواء كنت تبحث عن إجابات، أو تستكشف فرصاً تعليمية جديدة، أو مستعداً للتسجيل، يسعدنا مساعدتك في اتخاذ الخطوة التالية.'
      : 'Every student\'s journey begins with a single conversation. Whether you are looking for answers, exploring new educational opportunities, or ready to enroll, we are happy to help you take the next step.',
    helpWith: {
      title: isAr ? 'يمكننا مساعدتك في:' : 'We Can Help With:',
      items: [
        isAr ? 'القبول والتسجيل' : 'Admissions & Enrollment',
        isAr ? 'التخطيط التعليمي' : 'Educational Planning',
        isAr ? 'إرشادات التعليم المنزلي' : 'Homeschool Guidance',
        isAr ? 'معلومات البرامج' : 'Program Information',
        isAr ? 'سجلات الطلاب والشهادات' : 'Student Records & Transcripts',
        isAr ? 'أسئلة عامة' : 'General Questions'
      ]
    },
    labels: {
      name: isAr ? 'الاسم الكامل' : 'Full Name',
      email: isAr ? 'البريد الإلكتروني' : 'Email Address',
      subject: isAr ? 'الموضوع' : 'Subject',
      message: isAr ? 'الرسالة' : 'Message',
      send: isAr ? 'إرسال الرسالة' : 'Send Message'
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#contact-grid)" />
           </svg>
        </div>
        <div className="container-tight relative z-10 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-6xl font-black tracking-tight text-primary uppercase">{t.title}</h1>
            <p className="text-xl lg:text-3xl font-black text-secondary italic">{t.subtitle}</p>
          </div>
          <p className="text-slate-500 max-w-4xl mx-auto leading-relaxed text-sm lg:text-xl font-bold italic px-4">
            {t.intro}
          </p>
          <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full mt-8" />
        </div>
      </section>

      <section className="py-16 lg:py-24 container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Form & Help List */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tight">{t.formTitle}</h2>
              <p className="text-slate-600 font-medium text-sm lg:text-lg leading-relaxed">
                {t.formText}
              </p>
            </div>

            <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 lg:p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{t.labels.name}</label>
                    <Input className="h-14 bg-slate-50 border-slate-100 rounded-xl font-bold focus:ring-secondary/20" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{t.labels.email}</label>
                    <Input className="h-14 bg-slate-50 border-slate-100 rounded-xl font-bold focus:ring-secondary/20" type="email" placeholder="example@mail.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{t.labels.subject}</label>
                  <Input className="h-14 bg-slate-50 border-slate-100 rounded-xl font-bold focus:ring-secondary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{t.labels.message}</label>
                  <Textarea className="min-h-[150px] bg-slate-50 border-slate-100 rounded-xl font-bold focus:ring-secondary/20 pt-4" />
                </div>
                <Button className="w-full h-16 bg-secondary hover:bg-primary text-white font-black text-lg rounded-xl shadow-xl transition-all gap-3">
                  <Send className="h-5 w-5" />
                  {t.labels.send}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6 pt-6">
               <h3 className="text-lg font-black text-primary uppercase tracking-widest border-b-2 border-secondary/20 pb-3 inline-block">
                 {t.helpWith.title}
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.helpWith.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                       <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                       <span className="font-bold text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Column: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-xl lg:text-2xl font-black text-primary uppercase tracking-widest">{t.contactInfoTitle}</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Phone Card */}
              <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm group hover:shadow-xl transition-all duration-500 flex items-start gap-6">
                <div className="h-14 w-14 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg shrink-0 group-hover:rotate-12 transition-transform">
                  <PhoneCall className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone Support</p>
                  <p className="text-lg font-black text-primary" dir="ltr">{t.contactInfo.phone}</p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <Link href={`https://wa.me/13136555778`} target="_blank" className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm group hover:shadow-xl hover:border-green-100 transition-all duration-500 flex items-start gap-6">
                <div className="h-14 w-14 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">WhatsApp Support</p>
                  <p className="text-lg font-black text-green-600 font-mono" dir="ltr">{t.contactInfo.whatsapp}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Instant Messaging available</p>
                </div>
              </Link>

              {/* Email Card */}
              <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm group hover:shadow-xl transition-all duration-500 flex items-start gap-6">
                <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shrink-0 group-hover:rotate-12 transition-transform">
                  <Mail className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Inquiry</p>
                  {t.contactInfo.emails.map((email, idx) => (
                    <p key={idx} className="text-sm lg:text-base font-black text-primary break-all">{email}</p>
                  ))}
                </div>
              </div>

              {/* Location Card */}
              <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm group hover:shadow-xl transition-all duration-500 flex items-start gap-6">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 text-primary flex items-center justify-center shadow-inner shrink-0">
                  <MapPin className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">HQ Location</p>
                  <p className="text-sm font-black text-primary leading-relaxed">{t.contactInfo.location}</p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="p-8 bg-slate-900 text-white rounded-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                   <Clock className="h-32 w-32" />
                </div>
                <div className="flex items-start gap-6 relative z-10">
                   <div className="h-12 w-12 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg shrink-0">
                      <Clock className="h-6 w-6" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Office Hours (ET)</p>
                      <p className="text-base font-black text-white">{t.contactInfo.hours}</p>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
               <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">{isAr ? 'تابعنا على المنصات الاجتماعية' : 'Follow our community'}</h4>
               <div className="flex items-center gap-6">
                  <Link href="https://wa.me/13136555778" target="_blank" className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:text-white transition-all shadow-sm border border-slate-100"><MessageCircle className="h-6 w-6" /></Link>
                  <Link href="https://www.instagram.com/baneen_banaat_academy/" target="_blank" className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-secondary hover:text-white transition-all shadow-sm border border-slate-100"><Instagram className="h-6 w-6" /></Link>
                  <Link href="https://www.facebook.com/mybba.edu.us" target="_blank" className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-secondary hover:text-white transition-all shadow-sm border border-slate-100"><Facebook className="h-6 w-6" /></Link>
                  <Link href="https://www.youtube.com/@mybba_edu" target="_blank" className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all shadow-sm border border-slate-100"><Youtube className="h-6 w-6" /></Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Bottom Support Section */}
      <section className="bg-primary py-20 lg:py-32 text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <circle cx="20" cy="20" r="1.5" fill="white" />
            </svg>
         </div>
         <div className="container-tight text-center space-y-8 relative z-10">
            <div className="flex justify-center">
               <div className="h-20 w-20 bg-white/10 rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-md">
                  <Headphones className="h-10 w-10 text-secondary" />
               </div>
            </div>
            <div className="space-y-4">
               <h2 className="text-2xl lg:text-5xl font-black uppercase tracking-tight">{isAr ? 'نحن هنا لخدمتكم دائماً' : 'Support is Always Ready'}</h2>
               <p className="text-sm lg:text-2xl font-bold opacity-70 italic max-w-3xl mx-auto leading-relaxed">
                  {isAr 
                    ? 'فريق القبول والدعم الأكاديمي جاهز للرد على استفساراتكم خلال ساعات العمل الرسمية لضمان تجربة تعليمية متميزة لأطفالكم.'
                    : 'Our admissions and support team is ready to respond to your inquiries during official hours to ensure a premium education for your children.'}
               </p>
            </div>
         </div>
      </section>
    </div>
  );
}
