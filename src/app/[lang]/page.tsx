
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, Users, GraduationCap, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';
  
  const t = {
    hero: {
      welcome: isAr ? 'مرحباً بكم في أكاديمية بنين وبنات' : 'Welcome To Baneen and Banaat Academy',
      title: isAr ? 'التعليم الذي يبني العقول' : 'Education That Builds Minds',
      desc: isAr ? 'شريك تعليمي موثوق يساعد الطلاب والعائلات على تحقيق النجاح الأكاديمي من خلال التعلم المرن عبر الإنترنت والتوجيه الشخصي والالتزام بالتميز.' : 'A trusted educational partner helping students and families achieve academic success through flexible online learning, personalized guidance, and a commitment to excellence.',
      apply: isAr ? 'سجل الآن' : 'Apply Now',
      explore: isAr ? 'استكشف البرامج' : 'Explore Programs',
    },
    why: {
      title: isAr ? 'لماذا تختار العائلات BBA؟' : 'Why Families Choose BBA?!',
      items: [
        { title: isAr ? 'مساحات ثانوية معتمدة' : 'Accredited High School Pathways', icon: ShieldCheck },
        { title: isAr ? 'دعم طلابي شخصي' : 'Personalized Student Support', icon: Users },
        { title: isAr ? 'نخدم العائلات في جميع أنحاء البلاد' : 'Serving Families Nationwide', icon: GraduationCap },
        { title: isAr ? 'توجيه للتعليم المنزلي' : 'Homeschool Guidance', icon: MapPin },
      ]
    },
    pathways: {
      title: isAr ? 'المسارات التعليمية' : 'Educational Pathways',
      desc: isAr ? 'رحلة كل طالب التعليمية فريدة من نوعها. نحن نعمل بشكل وثيق مع العائلات لمساعدة الطلاب على اتباع مسارات تعليمية معترف بها تدعم أهدافهم الأكاديمية وتعدهم للتخرج والتعليم العالي.' : 'Every student’s educational journey is unique. We work closely with families to help students follow recognized educational pathways that support their academic goals and prepare them for graduation and higher education.',
      features: [
        isAr ? 'تخطيط التخرج' : 'Graduation Planning',
        isAr ? 'تخطيط الدورات' : 'Course Planning',
        isAr ? 'توجيه شخصي' : 'Personal Guidance',
        isAr ? 'سجلات أكاديمية' : 'Academic Records',
        isAr ? 'التحضير للجامعة' : 'College Preparation'
      ],
      cta: isAr ? 'اعرف المزيد عن التخطيط' : 'Explore Planning Services'
    }
  };

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center overflow-hidden bg-primary py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <div className="hidden sm:block absolute inset-0">
            <Image 
              src="/Academy background.png" 
              alt="Academy background" 
              fill 
              className="object-cover opacity-100"
              priority
              unoptimized
            />
          </div>
          <div className="block sm:hidden absolute inset-0">
            <Image 
              src="/Academy background-phone.png" 
              alt="Academy background mobile" 
              fill 
              className="object-cover opacity-100"
              priority
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/60" />
        </div>

        <div className="container-tight relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 sm:space-y-10">
            <div className="relative group inline-flex items-center gap-4 py-2 px-6">
              <div className="absolute inset-0 bg-white/10 border-l-4 border-secondary -skew-x-12 backdrop-blur-md transition-all group-hover:bg-white/20" />
              <div className="relative flex items-center gap-3">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </div>
                <span className="text-xs sm:text-sm font-black tracking-[0.25em] text-white uppercase drop-shadow-md">
                  {t.hero.welcome}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.1] drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl font-bold drop-shadow-lg">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4">
              <Button asChild size="lg" className="h-14 sm:h-16 px-10 sm:px-12 text-md sm:text-lg bg-secondary hover:bg-white hover:text-secondary text-white shadow-2xl shadow-secondary/20 rounded-full transition-all hover:scale-105 active:scale-95 font-black">
                <Link href={`/${lang}/enroll`}>
                  {t.hero.apply}
                  {isAr ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                </Link>
              </Button>
              <Button asChild size="lg" className="h-14 sm:h-16 px-10 sm:px-12 text-md sm:text-lg bg-white text-primary hover:bg-primary hover:text-white rounded-full transition-all font-bold shadow-xl border-none">
                <Link href={`/${lang}/programs`}>
                  {t.hero.explore}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-tight">
          <div className="text-center mb-16 sm:mb-20 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-primary">{t.why.title}</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {t.why.items.map((item, idx) => (
              <div key={idx} className="premium-card p-8 sm:p-10 rounded-[2rem] text-center space-y-6">
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-slate-50 text-secondary shadow-inner">
                  <item.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <h3 className="font-extrabold text-lg sm:text-xl text-primary leading-tight">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50/50">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 sm:space-y-10 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight leading-tight">
                  {t.pathways.title}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed italic border-l-4 border-secondary pl-6 py-2">
                  {t.pathways.desc}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 sm:gap-y-6">
                {t.pathways.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="h-3 w-3 rounded-full bg-secondary shadow-sm shadow-secondary/50 group-hover:scale-125 transition-transform" />
                    <span className="font-bold text-primary group-hover:text-secondary transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="bg-primary hover:bg-accent rounded-full h-12 sm:h-14 px-8 text-sm sm:text-md font-bold">
                <Link href={`/${lang}/planning`}>
                  {t.pathways.cta}
                  {isAr ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                </Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl order-1 lg:order-2 ring-8 ring-white/50">
              <Image 
                src="https://picsum.photos/seed/bba1/1000/800" 
                alt="Students learning" 
                fill 
                className="object-cover"
                data-ai-hint="online learning student"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
