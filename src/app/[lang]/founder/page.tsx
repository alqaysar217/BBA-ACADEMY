import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';

export default function FounderPage({ params: { lang } }: { params: { lang: Locale } }) {
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'رسالة من مؤسس ومدير الأكاديمية' : 'Message from BBA Founder & Academy Director',
    quote: isAr 
      ? 'التعليم يدور حول أكثر من مجرد إعداد الطلاب للتخرج. إنه يتعلق بإعدادهم للحياة.'
      : 'Education is about more than preparing students for graduation. It is about preparing them for life.',
    welcome: isAr ? 'مرحباً بكم في BBA.' : 'Welcome to BBA.',
    message: isAr
      ? 'عندما تصورت هذه الأكاديمية لأول مرة، لم يكن هدفي مجرد إنشاء مؤسسة تعليمية أخرى. كانت رؤيتي هي إنشاء مكان يمكن للطلاب فيه السعي وراء التميز الأكاديمي مع البقاء مرتبطين بعقيدتهم وقيمهم ولغتهم وهويتهم.'
      : 'When I first envisioned this academy, my goal was never simply to establish another educational institution. My vision was to create a place where students could pursue academic excellence while remaining connected to their faith, values, language, and identity.',
    meetTitle: isAr ? 'تعرف على الدكتور مصطفى علي' : 'Meet Dr. Mustafa Ali',
    bio: isAr
      ? 'الدكتور مصطفى علي هو المؤسس ومدير الأكاديمية، حيث يقود مهمة الأكاديمية في توفير فرص تعليمية ذات مغزى تجمع بين التميز الأكاديمي والقيم الأخلاقية القوية.'
      : 'Dr. Mustafa Ali is the Founder and Academy Director of Baneen and Banaat Academy, where he leads the academy\'s mission of providing meaningful educational opportunities that combine academic excellence with strong moral values.',
    philosophyTitle: isAr ? 'فلسفتنا التعليمية' : 'Our Educational Philosophy',
    philosophy: [
      {
        title: isAr ? 'التميز الأكاديمي' : 'Academic Excellence',
        desc: isAr ? 'نؤمن بأن كل طالب يستحق تعليماً يتحدى ويلهم ويعد للنجاح مدى الحياة.' : 'We believe every student deserves an education that challenges, inspires, and prepares them for lifelong success.'
      },
      {
        title: isAr ? 'الشخصية والقيم' : 'Character & Values',
        desc: isAr ? 'التعليم الحقيقي يتجاوز الأكاديميين. نحن نسعى لنشر النزاهة والمسؤولية والرحمة والاحترام.' : 'True education goes beyond academics. We strive to nurture integrity, responsibility, compassion, respect, and strong moral values.'
      },
      {
        title: isAr ? 'الشراكة العائلية' : 'Family Partnership',
        desc: isAr ? 'التعليم يكون أقوى عندما تعمل المدارس والعائلات معاً.' : 'Education is strongest when schools and families work together.'
      }
    ]
  };

  return (
    <div className="py-24">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold text-primary leading-tight">{t.title}</h1>
            <p className="text-2xl font-bold text-secondary italic">"{t.quote}"</p>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="font-bold text-primary text-xl">{t.welcome}</p>
              <p>{t.message}</p>
              <p>
                {isAr 
                  ? 'منذ تأسيس الأكاديمية في عام 2019، قاد نموها من مؤسسة تعليمية محلية في ميشيغان إلى مجتمع تعليمي يخدم العائلات في جميع أنحاء الولايات المتحدة.'
                  : 'Since founding the academy in 2019, he has guided its growth from a local educational institution in Michigan to a learning community serving families across the United States.'}
              </p>
            </div>
            <div className="pt-4">
              <p className="font-bold text-primary">Dr. Mustafa Ali</p>
              <p className="text-sm text-secondary">Founder & Academy Director</p>
            </div>
          </div>
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto">
            <Image 
              src="https://picsum.photos/seed/founder/600/800" 
              alt="Dr. Mustafa Ali" 
              fill 
              className="object-cover"
              data-ai-hint="professional portrait"
            />
          </div>
        </div>

        <div className="bg-muted/30 p-12 rounded-[3rem] mb-24">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">{t.philosophyTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.philosophy.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-secondary/20">
                <h3 className="text-xl font-bold text-secondary mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
