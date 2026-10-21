
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  BookOpen, 
  Globe,
  FileText,
  Target,
  Zap,
  ChevronRight,
  ChevronLeft,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';
  
  const t = {
    hero: {
      welcome: isAr ? 'مرحباً بكم في أكاديمية بنين وبنات' : 'Welcome To Baneen and Banaat Academy',
      title: isAr ? 'التعليم الذي يبني العقول' : 'Education That Builds Minds',
      apply: isAr ? 'سجل الآن' : 'Apply Now',
      explore: isAr ? 'استكشف البرامج' : 'Explore Programs',
    },
    why: {
      title: isAr ? 'لماذا تختار BBA؟' : 'Why Families Choose BBA?!',
      subtitle: isAr ? 'تجربة تعليمية مبنية حول الطلاب والعائلات' : 'A Learning Experience Built Around Students and Families',
      intro: isAr ? 'نجمع بين التعلم الأكاديمي الهادف والقيم القوية والتوجيه الشخصي لمساعدة الطلاب على المضي قدماً بثقة.' : 'We combine meaningful academic learning, strong values, and personalized guidance.',
      items: [
        { title: isAr ? 'التميز الأكاديمي' : 'Academic Excellence', icon: Star, desc: isAr ? 'بناء المعرفة وتعزيز المهارات.' : 'Building knowledge and skills.' },
        { title: isAr ? 'دعم طلابي شخصي' : 'Personal Support', icon: Users, desc: isAr ? 'توجيه مخصص لكل طالب.' : 'Personalized student guidance.' },
        { title: isAr ? 'تعليم عبر الإنترنت' : 'Online Learning', icon: Globe, desc: isAr ? 'تعلم مرن من أي مكان.' : 'Flexible remote education.' },
        { title: isAr ? 'الشراكة العائلية' : 'Family Partnership', icon: ShieldCheck, desc: isAr ? 'تواصل مفتوح مع الأسرة.' : 'Open family communication.' },
      ]
    },
    programs: {
      title: isAr ? 'برامجنا عبر الإنترنت' : 'Our Online Programs',
      items: [
        { id: 'grades-3-5', title: isAr ? 'برنامج الصفوف 3-5 (عن بعد)' : 'Grades 3–5 Remote', image: "/program-1.png", desc: isAr ? 'بناء الأسس الأكاديمية.' : 'Building academic foundations.' },
        { id: 'grades-6-12', title: isAr ? 'برنامج الصفوف 6-12 (عن بعد)' : 'Grades 6–12 Remote', image: "/program-2.png", desc: isAr ? 'دعم التقدم المتوسط والثانوي.' : 'Middle and high school support.' },
        { id: 'weekend', title: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Program', image: "/program-3.png", desc: isAr ? 'تعزيز الهوية واللغة.' : 'Islamic identity and Arabic.' }
      ]
    },
    about: {
      title: isAr ? 'حول أكاديمية BBA' : 'About BBA Academy',
      text1: isAr ? 'تأسست أكاديمية بنين وبنات في عام 2019، وهي مجتمع تعليمي عبر الإنترنت يدعم الطلاب والعائلات في جميع أنحاء الولايات المتحدة.' : 'Founded in 2019, BBA is an online educational community supporting families across the USA.',
      text2: isAr ? 'نحن نؤمن بأن التعليم الهادف يتجاوز الإنجاز الأكاديمي. نساعد الطلاب على بناء الثقة والاستعداد للمستقبل من خلال قيم قوية وشراكة عائلية حقيقية.' : 'We believe education goes beyond academics, focusing on values and character building.',
      cta: isAr ? 'اعرف المزيد' : 'Learn More'
    },
    planning: {
      title: isAr ? 'التخطيط التعليمي' : 'Educational Planning',
      items: [
        { id: 'graduation', title: isAr ? 'تخطيط التخرج' : 'Graduation Planning', icon: GraduationCap, desc: isAr ? 'تتبع التقدم الأكاديمي.' : 'Track academic progress.' },
        { id: 'course', title: isAr ? 'تخطيط الدورات' : 'Course Planning', icon: BookOpen, desc: isAr ? 'قرارات مدروسة للمواد.' : 'Informed course decisions.' },
        { id: 'college', title: isAr ? 'التحضير للمستقبل' : 'Future Preparation', icon: Zap, desc: isAr ? 'الاستعداد للجامعة مبكراً.' : 'Early college preparation.' }
      ]
    },
    testimonials: {
      title: isAr ? 'آراء أولياء الأمور' : 'What Parents Say',
      items: [
        { student: isAr ? 'يوسف' : 'Yusuf', parent: isAr ? 'سارة م.' : 'Sarah M.', role: isAr ? 'نيويورك' : 'New York', text: isAr ? 'التوازن بين المواد الأكاديمية والقرآن الكريم رائع جداً.' : 'The balance between academics and Quran is wonderful.' },
        { student: isAr ? 'مريم' : 'Maryam', parent: isAr ? 'أحمد ك.' : 'Ahmed K.', role: isAr ? 'ميشيغان' : 'Michigan', text: isAr ? 'ساعدت ابني على التميز والتفوق بفضل المرونة.' : 'Flexibility helped my son excel and stand out.' },
        { student: isAr ? 'عمر' : 'Omar', parent: isAr ? 'نورة هـ.' : 'Noura H.', role: isAr ? 'تكساس' : 'Texas', text: isAr ? 'تواصل مستمر مع المدرسين وإدارة محترفة.' : 'Constant communication and professional management.' }
      ]
    },
    cta: {
      title: isAr ? 'ابدأ رحلة طفلك الآن' : 'Start Your Journey Now',
      primary: isAr ? 'سجل الآن' : 'Enroll Now',
      secondary: isAr ? 'اتصل بنا' : 'Contact Us'
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[85vh] lg:min-h-[95vh] flex flex-col items-center overflow-hidden bg-primary px-4">
        <div className="absolute inset-0 z-0">
          <div className="hidden sm:block absolute inset-0">
            <Image src="/Academy background.png" alt="Academy background" fill className="object-cover" priority unoptimized />
          </div>
          <div className="block sm:hidden absolute inset-0">
            <Image src="/Academy background-phone.png" alt="Academy background mobile" fill className="object-cover" priority unoptimized />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/80" />
        </div>

        <div className="container-tight relative z-10 flex flex-col h-full flex-1 pt-20 pb-10 lg:pb-24">
          <div className="flex-1" />
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-6 lg:space-y-12">
            <div className="relative inline-flex items-center gap-4 py-2 px-8">
              <div className="absolute inset-0 bg-white/10 border-l-4 border-secondary -skew-x-12 backdrop-blur-md rounded-lg" />
              <span className="relative text-[10px] sm:text-sm lg:text-base font-black tracking-[0.3em] text-white uppercase">{t.hero.welcome}</span>
            </div>
            <h1 className="text-3xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none uppercase drop-shadow-2xl">
              {t.hero.title}
            </h1>
          </div>
          <div className="flex-1" />
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full sm:w-auto max-w-4xl mx-auto mb-6 lg:mb-0">
            <Button asChild className="h-16 sm:h-20 lg:h-24 px-10 sm:px-20 text-xl sm:text-2xl lg:text-3xl bg-secondary hover:bg-white hover:text-secondary text-white shadow-2xl rounded-full transition-all font-black border-4 border-transparent hover:border-secondary">
              <Link href={`/${lang}/enroll`}>{t.hero.apply}</Link>
            </Button>
            <Button asChild className="h-16 sm:h-20 lg:h-24 px-10 sm:px-20 text-xl sm:text-2xl lg:text-3xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary rounded-full transition-all font-black border-2 border-white/20">
              <Link href={`/${lang}/programs`}>{t.hero.explore}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY CHOOSE BBA */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container-tight px-4">
          <div className="text-center mb-16 lg:mb-24 space-y-4">
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase">{t.why.title}</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            <p className="text-slate-500 max-w-2xl mx-auto font-bold text-sm sm:text-lg opacity-80">{t.why.intro}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {t.why.items.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all group">
                <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-black text-base sm:text-xl text-primary uppercase">{item.title}</h3>
                <p className="text-slate-500 font-medium text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROGRAMS */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-tight px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {t.programs.items.map((prog) => (
              <div key={prog.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all">
                <div className="relative h-56 sm:h-72 overflow-hidden">
                  <Image src={prog.image} alt={prog.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-2xl font-black text-primary leading-tight">{prog.title}</h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-base">{prog.desc}</p>
                  <Button asChild variant="outline" className="mt-auto h-12 rounded-xl border-primary/10 text-primary font-black hover:bg-primary hover:text-white transition-all">
                    <Link href={`/${lang}/programs/${prog.id}`}>
                      {isAr ? 'التفاصيل' : 'Details'}
                      {isAr ? <ChevronLeft className="mr-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — ABOUT */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container-tight px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
             <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                <Image src="/About.png" alt="Academy" fill className="object-cover" unoptimized />
             </div>
             <div className="space-y-8 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black uppercase text-center lg:text-start">{t.about.title}</h2>
                <div className="space-y-6">
                   <p className="font-black text-white text-base sm:text-xl border-l-4 border-secondary pl-6 py-2 bg-white/5 rounded-r-xl italic">
                     {t.about.text1}
                   </p>
                   <p className="text-white/70 font-medium text-sm sm:text-lg leading-relaxed">{t.about.text2}</p>
                </div>
                <Button asChild className="h-14 sm:h-16 px-10 rounded-xl bg-secondary hover:bg-white hover:text-secondary font-black text-lg w-full sm:w-auto transition-all">
                  <Link href={`/${lang}/about`}>{t.about.cta}</Link>
                </Button>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PLANNING */}
      <section className="py-20 lg:py-32 bg-slate-50">
         <div className="container-tight px-4">
            <div className="text-center mb-16 lg:mb-24 space-y-4">
               <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase">{t.planning.title}</h2>
               <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
               {t.planning.items.map((item, idx) => (
                 <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm transition-all hover:shadow-xl group flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                       <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <pattern id={`grid-${idx}`} width="20" height="20" patternUnits="userSpaceOnUse">
                             <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                          </pattern>
                          <rect width="100%" height="100%" fill={`url(#grid-${idx})`} />
                       </svg>
                    </div>
                    <div className="h-16 w-16 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-all">
                       <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-2 text-primary">{item.title}</h3>
                    <p className="text-slate-500 font-medium text-xs sm:text-sm flex-1">{item.desc}</p>
                    <Button asChild variant="link" className="mt-6 text-secondary font-black uppercase text-[10px] tracking-widest">
                       <Link href={`/${lang}/planning#${item.id}`}>{isAr ? 'المزيد' : 'Details'} <ArrowRight className="ml-1 h-3 w-3" /></Link>
                    </Button>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS (COMPACT ROW LAYOUT) */}
      <section className="py-20 lg:py-32 bg-white">
         <div className="container-tight px-4">
            <div className="text-center mb-12 lg:mb-20 space-y-4">
               <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase">{t.testimonials.title}</h2>
               <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {t.testimonials.items.map((test, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-xl shrink-0">
                      {test.student[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-primary text-sm sm:text-base truncate">{test.student}</div>
                      <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase truncate">
                        {test.parent} — {test.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 font-medium italic text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4">
                    "{test.text}"
                  </p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="py-20 lg:py-32 bg-primary px-4">
         <div className="container-tight">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center">
               <div className="p-10 lg:p-20 flex-1 space-y-8 text-center lg:text-start">
                  <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase leading-tight">{t.cta.title}</h2>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                     <Button asChild className="h-16 px-10 rounded-full bg-secondary hover:bg-primary text-white font-black text-lg sm:text-xl shadow-xl transition-all">
                        <Link href={`/${lang}/enroll`}>{t.cta.primary}</Link>
                     </Button>
                     <Button asChild variant="outline" className="h-16 px-10 rounded-full border-2 border-primary/10 text-primary font-black text-lg sm:text-xl hover:bg-primary hover:text-white transition-all">
                        <Link href={`/${lang}/contact`}>{t.cta.secondary}</Link>
                     </Button>
                  </div>
               </div>
               <div className="hidden lg:block relative w-1/3 aspect-[4/5]">
                  <Image src="https://picsum.photos/seed/bba-cta/800/1200" alt="Future" fill className="object-cover" unoptimized />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
