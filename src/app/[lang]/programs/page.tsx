import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, GraduationCap, Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default async function ProgramsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'برامجنا التعليمية' : 'Educational Programs',
    subtitle: isAr ? 'نحن نؤمن بأن التعليم هو حجر الزاوية لبناء شخصية متكاملة. برامجنا مصممة لتلبية احتياجات الطلاب الأكاديمية والروحية واللغوية.' : 'We believe education is more than courses; it\'s about building a strong foundation while supporting families every step of the way.',
    enrollNow: isAr ? 'ابدأ التسجيل الآن' : 'Start Enrollment Now',
    apply: isAr ? 'سجل في البرنامج' : 'Apply for Program',
    details: isAr ? 'تفاصيل البرنامج' : 'Program Details',
    programs: [
      {
        id: 'grades-3-5',
        title: isAr ? 'برنامج المرحلة الابتدائية (3-5)' : 'Grade 3-5 Remote Program',
        desc: isAr ? 'تجربة تعليمية متوازنة عبر الإنترنت تدمج المناهج الأمريكية المعتمدة مع اللغة العربية والقرآن الكريم.' : 'A balanced and engaging online learning experience following a structured schedule that blends accredited American subjects with Quran & Arabic.',
        icon: BookOpen,
        schedule: isAr ? 'الإثنين - الخميس (صباحاً)' : 'Monday–Thursday (Morning)',
        subjects: isAr ? 'الإنجليزية، الرياضيات، القرآن، العربية والدراسات الإسلامية' : 'English, Math, Quran, Arabic & Islamic Studies',
        image: "https://picsum.photos/seed/grade35/800/600",
        color: 'bg-primary'
      },
      {
        id: 'grades-6-12',
        title: isAr ? 'المرحلة المتوسطة والثانوية (6-12)' : '6-12 Remote Program',
        desc: isAr ? 'برنامج مرن وشامل يدعم الطلاب أكاديمياً عبر منصة Edgenuity مع توجيه شخصي ومتابعة مستمرة.' : 'Fully online and built to support students academically, strengthen English skills, and provide a structured environment using the Edgenuity platform.',
        icon: GraduationCap,
        schedule: isAr ? 'مرن مع متابعة أسبوعية' : 'Flexible with Weekly Mentor Progress',
        subjects: isAr ? 'الإنجليزية، المناهج الأساسية، الدراسات الإسلامية والقرآن' : 'English (Edgenuity), Core Academics, Islamic Studies & Qur’an',
        image: "https://picsum.photos/seed/grade612/800/600",
        color: 'bg-accent'
      },
      {
        id: 'weekend',
        title: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
        desc: isAr ? 'مصمم لتعزيز الهوية الإسلامية واللغة العربية للأطفال المقيمين في الخارج بطريقة تفاعلية وممتعة.' : 'Designed to help children develop a confident Islamic identity while strengthening Arabic knowledge through engaging online lessons.',
        icon: Calendar,
        schedule: isAr ? 'السبت والأحد (فترات متعددة)' : 'Saturday & Sunday (Multiple Slots)',
        subjects: isAr ? 'التجويد، قواعد اللغة، العبادة والقيم الإسلامية' : 'Tajweed, Arabic Grammar, Worship & Islamic Values',
        image: "https://picsum.photos/seed/weekend/800/600",
        color: 'bg-secondary'
      }
    ]
  };

  return (
    <div className="bg-slate-50/30">
      {/* Header Section */}
      <section className="bg-primary text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="container-tight relative z-10">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl leading-none underline decoration-secondary decoration-8 underline-offset-[12px]">
              {t.title}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed font-medium">
              {t.subtitle}
            </p>
            <div className="pt-6">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-black h-16 px-10 rounded-2xl shadow-xl shadow-secondary/20 transition-all hover:scale-105">
                <Link href={`/${lang}/enroll`}>{t.enrollNow}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
      </section>

      {/* Programs List */}
      <section className="section-padding">
        <div className="container-tight space-y-20 lg:space-y-32">
          {t.programs.map((prog, idx) => (
            <div key={prog.id} className="group relative">
              <div className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 premium-card rounded-[3rem] overflow-hidden border-none shadow-2xl bg-white",
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              )}>
                {/* Image Section */}
                <div className={cn(
                  "relative h-80 lg:h-auto min-h-[400px] overflow-hidden",
                  idx % 2 === 1 ? 'lg:order-2' : ''
                )}>
                  <Image 
                    src={prog.image} 
                    alt={prog.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    data-ai-hint="classroom study"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
                  <div className="absolute top-8 left-8">
                    <div className={cn("h-16 w-16 flex items-center justify-center rounded-2xl text-white shadow-lg", prog.color)}>
                      <prog.icon className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={cn(
                  "p-10 lg:p-16 space-y-10",
                  idx % 2 === 1 ? 'lg:order-1' : ''
                )}>
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-black text-primary group-hover:text-secondary transition-colors">
                      {prog.title}
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                      {prog.desc}
                    </p>
                  </div>
                  
                  <div className="grid gap-6 border-y border-slate-100 py-10">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{isAr ? 'الجدول الزمني' : 'Schedule'}</div>
                        <div className="text-primary font-bold">{prog.schedule}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{isAr ? 'المواد الدراسية' : 'Key Subjects'}</div>
                        <div className="text-primary font-bold">{prog.subjects}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <Button asChild className="bg-primary hover:bg-accent rounded-full h-14 px-8 font-bold shadow-lg">
                      <Link href={`/${lang}/enroll`}>
                        {t.apply}
                        {isAr ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                      </Link>
                    </Button>
                    <Button variant="ghost" className="rounded-full h-14 px-8 text-primary font-bold hover:bg-primary/5">
                      {t.details}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-primary text-white text-center relative overflow-hidden">
        <div className="container-tight relative z-10 space-y-8">
          <h2 className="text-4xl font-black">{isAr ? 'مستعد لبدء الرحلة؟' : 'Ready to Start the Journey?'}</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
            {isAr ? 'انضم إلى عائلتنا اليوم وامنح طفلك التعليم الذي يستحقه.' : 'Join our academy today and give your child the education they deserve.'}
          </p>
          <div className="pt-4">
            <Link href={`/${lang}/enroll`}>
              <Button size="lg" className="bg-secondary hover:bg-white hover:text-secondary rounded-full h-16 px-12 font-black transition-all">
                {isAr ? 'قدم الآن' : 'Enroll My Student'}
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border-8 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border-8 border-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
      </section>
    </div>
  );
}