import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import { Target, Eye, CheckCircle2, Users, Heart, Star, MapPin, GraduationCap, Globe, Handshake } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === 'ar';
  return {
    title: isAr ? 'حول الأكاديمية' : 'About Us',
    description: isAr 
      ? 'تعرف على قصة ورؤية أكاديمية بنين وبنات وشريكك التعليمي في الولايات المتحدة.' 
      : 'Learn about the story and vision of Baneen and Banaat Academy, your educational partner in the US.',
    openGraph: {
      title: isAr ? 'حول الأكاديمية | بنين وبنات' : 'About BBA Academy',
      description: isAr ? 'رؤيتنا ورسالتنا التعليمية للعائلات.' : 'Our educational vision and mission for families.',
      images: ['/logo.png'],
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'حول أكاديمية بنين وبنات' : 'About BBA Academy',
    tagline: isAr ? 'شريك عائلتك التعليمي' : 'It\'s Your Family\'s Educational Partner',
    intro: isAr 
      ? 'في أكاديمية بنين وبنات (BBA)، نؤمن بأن التعليم هو أكثر من مجرد إكمال الدورات أو كسب الساعات المعتمدة. إنه يتعلق بمساعدة الطلاب على بناء أساس قوي لمستقبلهم مع دعم العائلات في كل خطوة على الطريق.'
      : 'At Baneen and Banaat Academy (BBA), we believe that education is more than completing courses or earning credits. It is about helping students build a strong foundation for their future while supporting families every step of the way.',
    history: isAr
      ? 'تأسست BBA برؤية بسيطة: تزويد العائلات بخيار تعليمي مرن يجمع بين التميز الأكاديمي والقيم الأخلاقية القوية واللغة العربية والهوية الإسلامية. ما بدأ كمبادرة تعليمية صغيرة تخدم العائلات في ميشيغان قد نما، بفضل الله، ليصبح شريكاً تعليمياً موثوقاً للعائلات في جميع أنحاء الولايات المتحدة.'
      : 'BBA was founded with a simple vision: to provide families with a flexible educational option that combines academic excellence with strong moral values, Arabic language, and Islamic identity. What began as a small educational initiative serving families in Michigan has, by the grace of God, grown into a trusted educational partner for families across the United States.',
    serving: isAr
      ? 'اليوم، نحن نخدم بفخر طلاباً من مجتمعات متنوعة يبحثون عن تجربة تعليمية شخصية تتيح لهم تحقيق أهدافهم الأكاديمية أثناء التعلم في بيئة تعكس قيم أسرهم.'
      : 'Today, we proudly serve students from diverse communities who are looking for a personalized educational experience that allows them to achieve their academic goals while learning in an environment that reflects their family\'s values.',
    sections: {
      beliefs: {
        title: isAr ? 'ما نؤمن به' : 'What We Believe',
        items: [
          isAr ? 'نؤمن أن الطلاب لا ينبغي أبداً أن يختاروا بين تلقي تعليم عالي الجودة والحفاظ على عقيدتهم ولغتهم وثقافتهم وهويتهم.' : 'We believe students should never have to choose between receiving a quality education and preserving their faith, language, culture, and identity.',
          isAr ? 'تم تصميم برامجنا لتزويد العائلات بالمرونة والدعم الشخصي والبيئة التعليمية التي يسير فيها الإنجاز الأكاديمي وتنمية الشخصية جنباً إلى جنب.' : 'Our programs are designed to provide families with flexibility, personal support, and an educational environment where academic achievement and character development go hand in hand.'
        ]
      },
      approach: {
        title: isAr ? 'نهجنا' : 'Our Approach',
        content1: isAr
          ? 'لكل طالب قصة فريدة وأهداف مختلفة واحتياجات تعليمية متميزة. لهذا السبب لا نؤمن بنهج مقاس واحد يناسب الجميع.'
          : 'Every student has a unique story, different goals, and different educational needs. That\'s why we don\'t believe in a one-size-fits-all approach.',
        content2: isAr
          ? 'بدلاً من ذلك، نحن نعمل عن كثب مع العائلات لفهم خلفية كل طالب وتقدمه الأكاديمي وتطلعاته المستقبلية. من التخطيط التعليمي إلى التوجيه الأكاديمي المستمر، يلتزم فريقنا بمساعدة كل طالب على اتباع المسار التعليمي الذي يدعم نجاحه بشكل أفضل.'
          : 'Instead, we work closely with families to understand each student\'s background, academic progress, and future aspirations. From educational planning to ongoing academic guidance, our team is committed to helping every student follow the educational pathway that best supports their success.',
        content3: isAr
          ? 'يتجاوز دورنا مجرد تقديم الدورات الدراسية. نحن نسعى جاهدين لنكون شريكاً تعليمياً موثوقاً يساعد العائلات على اتخاذ قرارات مدروسة، والتنقل في رحلتهم التعليمية بثقة، وإعداد الطلاب للتخرج والتعليم العالي.'
          : 'Our role goes beyond providing coursework. We strive to be a trusted educational partner that helps families make informed decisions, navigate their educational journey with confidence, and prepare students for graduation and higher education.'
      },
      mission: {
        title: isAr ? 'مهمتنا' : 'Our Mission',
        text: isAr 
          ? 'تمكين الطلاب من خلال التوجيه التعليمي الشخصي، وفرص التعلم المرنة، والشراكات العائلية القوية مع مساعدتهم على الاستعداد للنجاح الأكاديمي في المستقبل.'
          : 'To empower students through personalized educational guidance, flexible learning opportunities, and strong family partnerships while helping them prepare for future academic success.'
      },
      vision: {
        title: isAr ? 'رؤيتنا' : 'Our Vision',
        text: isAr 
          ? 'أن نصبح أحد أكثر الشركاء التعليميين موثوقية للعائلات في جميع أنحاء الولايات المتحدة من خلال توفير التوجيه والدعم والمسارات التعليمية التي تلهم الطلاب للوصول إلى إمكاناتهم الكاملة مع البقاء متجذرين في عقيدتهم وقيمهم وهويتهم.'
          : 'To become one of the most trusted educational partners for families across the United States by providing guidance, support, and educational pathways that inspire students to reach their full potential while remaining grounded in their faith, values, and identity.',
      },
      commitment: {
        title: isAr ? 'التزامنا' : 'Our Commitment',
        intro: isAr ? 'في أكاديمية بنين وبنات، كل عائلة مهمة.' : 'At Baneen and Banaat Academy, every family matters.',
        text: isAr
          ? 'سواء كنت تستكشف التعليم المنزلي لأول مرة، أو تبحث عن مرونة تعليمية أكبر، أو تبحث عن برنامج يتوافق مع قيم عائلتك، فإن التزامنا يبقى كما هو:'
          : 'Whether you are exploring homeschooling for the first time, looking for greater educational flexibility, or searching for a program that aligns with your family\'s values, our commitment remains the same:',
        goal: isAr ? 'توجيه ودعم والسير جنباً إلى جنب مع عائلتكم في كل خطوة من خطوات رحلتكم التعليمية.' : 'To guide, support, and walk alongside your family throughout every step of your educational journey.'
      },
      glance: {
        title: isAr ? 'لمحة سريعة' : 'At a Glance',
        items: [
          { label: isAr ? 'تأسست في' : 'Founded in', value: 'Michigan', icon: MapPin },
          { label: isAr ? 'النطاق' : 'Reach', value: isAr ? 'نخدم جميع الولايات' : 'Serving Nationwide', icon: Globe },
          { label: isAr ? 'الأثر' : 'Impact', value: isAr ? 'توجيه 300+ طالب' : '300+ Students Guided', icon: GraduationCap },
          { label: isAr ? 'الدعم' : 'Support', value: isAr ? 'دعم عائلي شخصي' : 'Personalized Support', icon: Handshake }
        ]
      }
    }
  };

  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24 border-b border-slate-100">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-2xl lg:text-4xl font-black text-primary tracking-tight leading-tight">
                  {t.title}
                </h1>
                <p className="text-xl font-bold text-secondary italic">
                  {t.tagline}
                </p>
              </div>
              <div className="space-y-6 text-slate-600 leading-relaxed font-medium text-lg">
                <p className="text-primary font-black text-xl leading-snug border-l-4 border-secondary pl-6">
                  {t.intro}
                </p>
                <p>{t.history}</p>
                <p>{t.serving}</p>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <Image src="/About.png" alt="Academy Foundation" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50/50">
        <div className="container-tight">
          <div className="mb-12">
            <h2 className="text-2xl font-black text-primary uppercase tracking-tight">{t.sections.beliefs.title}</h2>
            <div className="h-1 w-12 bg-secondary mt-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.sections.beliefs.items.map((belief, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border border-slate-200 flex gap-6 items-start shadow-sm">
                <div className="h-12 w-12 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-lg text-primary font-bold leading-relaxed">{belief}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}