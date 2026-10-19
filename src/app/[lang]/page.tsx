
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
      title: isAr ? 'تعليم يبني العقول وقيم تصقل الشخصية' : 'Education That Builds Minds, Values That Shape Character',
      desc: isAr ? 'شريك تعليمي موثوق يساعد الطلاب والعائلات على تحقيق النجاح الأكاديمي من خلال التعلم المرن عبر الإنترنت والتوجيه الشخصي والالتزام بالتميز.' : 'A trusted educational partner helping students and families achieve academic success through flexible online learning, personalized guidance, and a commitment to excellence.',
      apply: isAr ? 'سجل الآن' : 'Apply Now',
      explore: isAr ? 'استكشف البرامج' : 'Explore Programs',
    },
    why: {
      title: isAr ? 'لماذا تختار العائلات BBA؟' : 'Why Families Choose BBA?!',
      items: [
        { title: isAr ? 'مسارات ثانوية معتمدة' : 'Accredited High School Pathways', icon: ShieldCheck },
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
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary py-24 lg:py-32">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/bbahero/1920/1080" 
            alt="Academy background" 
            fill 
            className="object-cover opacity-40 grayscale-[20%]"
            priority
            data-ai-hint="modern classroom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
        </div>

        <div className="container-tight relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 border border-secondary/30 px-5 py-2 text-sm font-bold text-white uppercase tracking-wider backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary text-white"></span>
              </span>
              {t.hero.welcome}
            </div>
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl leading-[1.1]">
              {t.hero.title}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl font-medium">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Link href={`/${lang}/enroll`}>
                <Button size="lg" className="h-16 px-12 text-lg bg-secondary hover:bg-white hover:text-secondary text-white shadow-2xl shadow-secondary/20 rounded-full transition-all hover:scale-105 active:scale-95 font-black">
                  {t.hero.apply}
                  {isAr ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </Link>
              <Link href={`/${lang}/programs`}>
                <Button size="lg" variant="outline" className="h-16 px-12 text-lg border-2 border-white/20 text-white hover:bg-white hover:text-primary rounded-full transition-all backdrop-blur-sm font-bold">
                  {t.hero.explore}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why BBA Section */}
      <section className="section-padding bg-white">
        <div className="container-tight">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black text-primary">{t.why.title}</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.why.items.map((item, idx) => (
              <div key={idx} className="premium-card p-10 rounded-[2rem] text-center space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-secondary shadow-inner">
                  <item.icon className="h-10 w-10" />
                </div>
                <h3 className="font-extrabold text-xl text-primary leading-tight">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Pathways Section */}
      <section className="section-padding bg-slate-50/50">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-primary sm:text-5xl tracking-tight leading-tight">
                  {t.pathways.title}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-secondary pl-6 py-2">
                  {t.pathways.desc}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {t.pathways.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="h-3 w-3 rounded-full bg-secondary shadow-sm shadow-secondary/50 group-hover:scale-125 transition-transform" />
                    <span className="font-bold text-primary group-hover:text-secondary transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href={`/${lang}/planning`} className="block pt-4">
                <Button className="bg-primary hover:bg-accent rounded-full h-14 px-8 text-md font-bold">
                  {t.pathways.cta}
                  {isAr ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl order-1 lg:order-2 ring-8 ring-white/50">
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
