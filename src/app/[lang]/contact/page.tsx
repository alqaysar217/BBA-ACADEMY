
import { type Locale } from '@/lib/i18n/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'تواصل معنا' : 'Connect With Us',
    subtitle: isAr ? 'نود أن نسمع منك' : 'We\'d Love to Hear From You',
    intro: isAr 
      ? 'سواء كنت تستكشف الخيارات التعليمية، أو لديك أسئلة حول برامجنا، أو كنت مستعداً لبدء الرحلة التعليمية لعائلتك، فإن فريقنا هنا للمساعدة.'
      : 'Whether you\'re exploring educational options, have questions about our programs, or are ready to begin your family\'s educational journey, our team is here to help.',
    formTitle: isAr ? 'لنبدأ المحادثة' : 'Let\'s Start the Conversation',
    helpItems: [
      isAr ? 'القبول والتسجيل' : 'Admissions & Enrollment',
      isAr ? 'التخطيط التعليمي' : 'Educational Planning',
      isAr ? 'إرشادات التعليم المنزلي' : 'Homeschool Guidance',
      isAr ? 'معلومات البرنامج' : 'Program Information',
      isAr ? 'سجلات الطلاب والنصوص' : 'Student Records & Transcripts',
      isAr ? 'أسئلة عامة' : 'General Questions'
    ],
    contactInfo: {
      phone: '(734) 645-3613',
      whatsapp: '(313) 655-5778',
      emails: ['banaatacademy@gmail.com', 'info@baneenbanaat.org'],
      hours: isAr ? 'الإثنين – الجمعة | 9:00 صباحاً – 4:00 مساءً' : 'Monday – Friday | 9:00 AM – 4:00 PM'
    },
    labels: {
      name: isAr ? 'الاسم الكامل' : 'Full Name',
      email: isAr ? 'البريد الإلكتروني' : 'Email',
      subject: isAr ? 'الموضوع' : 'Subject',
      message: isAr ? 'الرسالة' : 'Message',
      send: isAr ? 'إرسال الرسالة' : 'Send Message'
    }
  };

  return (
    <div className="py-24">
      <div className="container px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl font-extrabold text-primary">{t.title}</h1>
          <p className="text-2xl font-bold text-secondary">{t.subtitle}</p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="space-y-8 lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{isAr ? 'الهاتف' : 'Phone'}</h3>
                  <p className="text-muted-foreground">{t.contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">WhatsApp</h3>
                  <Link href="https://wa.me/13136555778" target="_blank" className="text-muted-foreground hover:text-secondary underline">
                    {t.contactInfo.whatsapp}
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{isAr ? 'البريد الإلكتروني' : 'Email'}</h3>
                  {t.contactInfo.emails.map(email => (
                    <p key={email} className="text-muted-foreground">{email}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{isAr ? 'ساعات العمل' : 'Office Hours'}</h3>
                  <p className="text-muted-foreground text-sm">{t.contactInfo.hours}</p>
                  <p className="text-xs text-secondary mt-1">{isAr ? 'توقيت شرق أمريكا (ET)' : 'Eastern Time (ET)'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{isAr ? 'الموقع' : 'Location'}</h3>
                  <p className="text-muted-foreground">{isAr ? 'ميشيغان، الولايات المتحدة (نخدم جميع الولايات!)' : 'Michigan, United States (We serve all states!)'}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary text-primary-foreground p-8 rounded-3xl">
              <h3 className="font-bold text-secondary mb-4">{isAr ? 'يمكننا المساعدة في:' : 'We Can Help With:'}</h3>
              <ul className="space-y-2">
                {t.helpItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm opacity-80">
                    <div className="h-1 w-1 rounded-full bg-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 premium-card rounded-3xl border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-8">
              <CardTitle className="text-2xl">{t.formTitle}</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.labels.name}</label>
                  <Input placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.labels.email}</label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.labels.subject}</label>
                <Input placeholder={isAr ? 'موضوع الرسالة' : 'Subject of message'} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.labels.message}</label>
                <Textarea 
                  placeholder={isAr ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'} 
                  className="min-h-[150px]"
                />
              </div>
              <Button className="w-full bg-secondary text-primary font-bold h-12 text-lg">
                {t.labels.send}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
