
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, Users, GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const isAr = lang === 'ar';
  
  const t = {
    hero: {
      welcome: isAr ? 'مرحباً بكم في أكاديمية بنين وبنات' : 'Welcome To Baneen and Banaat Academy',
      title: isAr ? 'تعليم يبني العقول.. وقيم تصقل الشخصية' : 'Education That Builds Minds, Values That Shape Character',
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
        isAr ? 'تخطيط الدورة التدريبية' : 'Course Planning',
        isAr ? 'توجيه شخصي' : 'Personal Guidance',
        isAr ? 'السجلات الأكاديمية' : 'Academic Records',
        isAr ? 'التحضير للكلية' : 'College Preparation'
      ]
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 lg:py-32 border-b">
        <div className="container relative px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1 text-sm font-bold text-secondary mb-6">
              {t.hero.welcome}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-6xl mb-8 leading-[1.1]">
              {t.hero.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/enroll`}>
                <Button size="lg" className="h-14 px-10 text-lg bg-primary hover:bg-primary/90">
                  {t.hero.apply}
                </Button>
              </Link>
              <Link href={`/${lang}/programs`}>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg">
                  {t.hero.explore}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">{t.why.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.why.items.map((item, idx) => (
              <div key={idx} className="premium-card p-8 rounded-2xl text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-primary">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Pathways */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">{t.pathways.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.pathways.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.pathways.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                    <span className="font-medium text-primary/80">{feature}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="bg-primary mt-4">
                <Link href={`/${lang}/planning`}>{isAr ? 'اعرف المزيد' : 'Learn More'}</Link>
              </Button>
            </div>
            <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/bba1/800/600" 
                alt="Students learning" 
                fill 
                className="object-cover"
                data-ai-hint="online learning"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
