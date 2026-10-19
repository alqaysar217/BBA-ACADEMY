import { type Locale } from '@/lib/i18n/config';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default async function PlanningPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'تخطيط المرحلة الثانوية والتخرج' : 'High School & Graduation Planning',
    subtitle: isAr ? 'إعداد الطلاب للتخرج وما بعده' : 'Preparing Students for Graduation and Beyond',
    intro: isAr 
      ? 'المرحلة الثانوية هي واحدة من أهم مراحل الرحلة التعليمية للطالب. القرارات المتخذة خلال هذه السنوات يمكن أن يكون لها تأثير دائم على التخرج والقبول في الجامعات وفرص العمل والنجاح المستقبلي.'
      : 'High school is one of the most important stages of a student\'s educational journey. The decisions made during these years can have a lasting impact on graduation, college admissions, career opportunities, and future success.',
    whyTitle: isAr ? 'لماذا يعد التخطيط مهماً؟' : 'Why Planning Matters',
    whyItems: [
      { text: isAr ? 'يساعد الطلاب على البقاء على المسار الصحيح للتخرج.' : 'Helps students stay on track for graduation.' },
      { text: isAr ? 'يبسط القبول في الجامعات وطلبات المنح الدراسية.' : 'Simplifies college admissions and scholarship applications.' },
      { text: isAr ? 'ينشئ سجلات أكاديمية منظمة.' : 'Creates organized academic records.' },
      { text: isAr ? 'يقلل التوتر خلال السنة الأخيرة.' : 'Reduces stress during the senior year.' },
      { text: isAr ? 'يساعد العائلات على الاستعداد لفرص تعليمية مستقبلية.' : 'Helps families prepare for future educational opportunities' }
    ],
    howBbaHelps: isAr 
      ? 'العائلات المسجلة في أكاديمية بنين وبنات لا تضطر إلى التنقل في تخطيط المرحلة الثانوية بمفردها.'
      : 'Families enrolled with Baneen and Banaat Academy don\'t have to navigate high school planning alone.',
    servicesTitle: isAr ? 'خدماتنا الاستشارية' : 'How BBA Helps',
    services: [
      isAr ? 'تخطيط تعليمي' : 'Educational planning',
      isAr ? 'مراجعة التقدم الأكاديمي' : 'Reviewing academic progress',
      isAr ? 'تخطيط التخرج' : 'Graduation planning',
      isAr ? 'إرشادات النصوص الأكاديمية' : 'Transcript guidance',
      isAr ? 'التحضير للكلية' : 'College preparation',
      isAr ? 'دعم تعليمي مستمر' : 'Ongoing educational support'
    ],
    quote: isAr 
      ? 'أفضل وقت للاستعداد للتخرج هو قبل وقت طويل من السنة الأخيرة. التخطيط المبكر يخلق المزيد من الفرص ومفاجآت أقل.'
      : 'The best time to prepare for graduation is long before senior year. Early planning creates more opportunities and fewer surprises.',
    quoteAuthor: isAr ? 'مستشار BBA' : 'BBA Counselor'
  };

  return (
    <div className="py-24">
      <div className="container px-4 md:px-8 max-w-5xl mx-auto">
        <div className="mb-16 space-y-6">
          <h1 className="text-4xl font-extrabold text-primary">{t.title}</h1>
          <p className="text-2xl font-bold text-secondary">{t.subtitle}</p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {t.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-primary">{t.whyTitle}</h2>
            <div className="grid gap-4">
              {t.whyItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-border">
                  <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary text-primary-foreground p-12 rounded-[2rem] shadow-xl">
            <h2 className="text-2xl font-bold mb-8 text-secondary">{t.servicesTitle}</h2>
            <p className="mb-8 opacity-80">{t.howBbaHelps}</p>
            <ul className="grid grid-cols-1 gap-4">
              {t.services.map((service, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span className="font-medium">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card className="bg-secondary/10 border-none rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center space-y-6">
            <p className="text-2xl font-bold text-primary italic">"{t.quote}"</p>
            <p className="text-secondary font-bold">— {t.quoteAuthor}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
