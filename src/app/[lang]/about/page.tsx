import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import { Target, Eye, ShieldCheck, CheckCircle2, Users, Heart, Star, MapPin, GraduationCap, Globe, Handshake } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'حول أكاديمية بنين وبنات' : 'About Baneen and Banaat Academy',
    subtitle: isAr ? 'BBA أكثر من مجرد مدرسة' : 'BBA is More Than a School',
    tagline: isAr ? 'شريك عائلتك التعليمي' : 'It’s Your Family\'s Educational Partner',
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
          : 'To become one of the most trusted educational partners for families across the United States by providing guidance, support, and educational pathways that inspire students to reach their full potential while remaining grounded in their faith, values, and identity.'
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
          { label: isAr ? 'النطاق' : 'Reach', value: isAr ? 'نخدم العائلات في جميع أنحاء البلاد' : 'Serving Families Nationwide', icon: Globe },
          { label: isAr ? 'الأثر' : 'Impact', value: isAr ? 'توجيه أكثر من 300 طالب' : '300+ Students Guided', icon: GraduationCap },
          { label: isAr ? 'الدعم' : 'Support', value: isAr ? 'دعم عائلي شخصي' : 'Personalized Family Support', icon: Handshake }
        ]
      }
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full">
              <Star className="h-4 w-4 text-secondary" />
              <span className="text-xs sm:text-sm font-black text-secondary uppercase tracking-[0.2em]">{t.subtitle}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              {t.title}
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-white/90 italic">
              {t.tagline}
            </p>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Intro & History Section */}
      <section className="section-padding bg-slate-50/50">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-xl sm:text-2xl text-primary font-bold leading-relaxed border-l-4 border-secondary pl-6">
                {t.intro}
              </p>
              <div className="space-y-6 text-slate-600 leading-relaxed font-medium text-lg">
                <p>{t.history}</p>
                <p>{t.serving}</p>
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white">
              <Image 
                src="https://picsum.photos/seed/academy-bba/800/800" 
                alt="Academy Foundation" 
                fill 
                className="object-cover"
                data-ai-hint="educational foundation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-primary uppercase tracking-tight">{t.sections.beliefs.title}</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.sections.beliefs.items.map((belief, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100 flex gap-6 items-start group hover:border-secondary transition-all">
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-secondary group-hover:text-white" />
                </div>
                <p className="text-lg text-primary font-bold leading-relaxed">{belief}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="section-padding bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="approach-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#approach-grid)" />
          </svg>
        </div>
        
        <div className="container-tight relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-secondary">
                {t.sections.approach.title}
              </h2>
              <div className="h-1.5 w-24 bg-white/20 rounded-full" />
              <div className="space-y-6 text-lg sm:text-xl font-medium leading-relaxed opacity-90">
                <p className="text-white font-black">{t.sections.approach.content1}</p>
                <p>{t.sections.approach.content2}</p>
                <p>{t.sections.approach.content3}</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 space-y-8">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center shadow-lg shadow-secondary/20">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black">{isAr ? 'تركيزنا الأساسي' : 'Our Core Focus'}</h3>
              </div>
              <ul className="space-y-6">
                {[
                  isAr ? 'فهم قصة كل طالب' : 'Understanding every student\'s story',
                  isAr ? 'توجيه أكاديمي مستمر' : 'Ongoing academic guidance',
                  isAr ? 'إعداد الطلاب للتخرج' : 'Preparing students for graduation',
                  isAr ? 'قرارات تعليمية مدروسة' : 'Informed educational decisions'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                    <span className="font-bold text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-slate-50 border-2 border-slate-100 p-12 lg:p-16 rounded-[3rem] relative overflow-hidden group hover:border-secondary/20 transition-all">
              <div className="relative z-10 space-y-6">
                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">{t.sections.mission.title}</h2>
                <p className="text-slate-600 leading-relaxed font-bold text-lg sm:text-xl">
                  {t.sections.mission.text}
                </p>
              </div>
            </div>

            <div className="bg-primary text-white p-12 lg:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{t.sections.vision.title}</h2>
                <p className="text-white/80 leading-relaxed font-medium text-lg sm:text-xl">
                  {t.sections.vision.text}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="section-padding bg-slate-50/50">
        <div className="container-tight text-center max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-primary uppercase tracking-tight">{t.sections.commitment.title}</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="space-y-8 bg-white p-12 lg:p-16 rounded-[3rem] shadow-xl border border-slate-100">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center">
                <Heart className="h-10 w-10 text-secondary" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-primary">{t.sections.commitment.intro}</h3>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              {t.sections.commitment.text}
            </p>
            <p className="text-xl sm:text-2xl font-black text-secondary leading-tight">
              {t.sections.commitment.goal}
            </p>
          </div>
        </div>
      </section>

      {/* At a Glance Section */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-primary uppercase tracking-tight">{t.sections.glance.title}</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.sections.glance.items.map((stat, idx) => (stat && (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center space-y-4 group hover:shadow-xl hover:-translate-y-2 transition-all">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-lg font-black text-primary leading-tight">{stat.value}</div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </section>
    </div>
  );
}
