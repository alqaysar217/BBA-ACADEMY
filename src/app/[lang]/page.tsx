
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
      intro: isAr ? 'في أكاديمية بنين وبنات، نجمع بين التعلم الأكاديمي الهادف، والقيم القوية، والتوجيه الشخصي لمساعدة الطلاب على المضي قدماً بثقة.' : 'At Baneen and Banaat Academy, we combine meaningful academic learning, strong values, and personalized guidance to help students move forward with confidence.',
      items: [
        { title: isAr ? 'التميز الأكاديمي' : 'Academic Excellence', icon: Star, desc: isAr ? 'نساعد الطلاب على بناء المعرفة، وتعزيز المهارات الأساسية، والتحضير للفرص التعليمية المستقبلية.' : 'We help students build knowledge, strengthen essential skills, and prepare for future educational opportunities.' },
        { title: isAr ? 'دعم طلابي شخصي' : 'Personal Student Support', icon: Users, desc: isAr ? 'ندرك أن كل متعلم مختلف ونعمل عن كثب مع العائلات لدعم الرحلة التعليمية لكل طالب.' : "We recognize that every learner is different and work closely with families to support each student's educational journey." },
        { title: isAr ? 'تعليم عبر الإنترنت 100%' : '100% Online Learning', icon: Globe, desc: isAr ? 'تسمح برامجنا عبر الإنترنت للطلاب بالتعلم من المنزل مع البقاء على اتصال بأهدافهم التعليمية.' : 'Our online programs allow students to learn from home while staying connected to their educational goals.' },
        { title: isAr ? 'الشراكة العائلية' : 'Family Partnership', icon: ShieldCheck, desc: isAr ? 'نؤمن بأن الطلاب يزدهرون عندما يعمل الآباء والمعلمون معاً من خلال التواصل المفتوح والأهداف المشتركة.' : 'We believe students thrive when parents and educators work together through open communication and shared goals.' },
      ]
    },
    programs: {
      title: isAr ? 'برامجنا التعليمية عبر الإنترنت' : 'Our Online Programs',
      subtitle: isAr ? 'ابحث عن المسار التعليمي المناسب لطفلك' : 'Find the Right Learning Path for Your Child',
      viewAll: isAr ? 'تصفح جميع البرامج' : 'Browse All Programs',
      items: [
        { id: 'grades-3-5', title: isAr ? 'برنامج الصفوف 3-5 (عن بعد)' : 'Grades 3–5 Remote', image: "/program-1.png", desc: isAr ? 'بناء الأسس الأكاديمية وتعزيز الهوية الإسلامية.' : 'Building academic foundations and strengthening Islamic identity.' },
        { id: 'grades-6-12', title: isAr ? 'برنامج الصفوف 6-12 (عن بعد)' : 'Grades 6–12 Remote', image: "/program-2.png", desc: isAr ? 'دعم التقدم الأكاديمي والتحضير للمستقبل.' : 'Support academic progress and prepare for future opportunities.' },
        { id: 'weekend', title: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Program', image: "/program-3.png", desc: isAr ? 'فرص إثراء مرنة يومي السبت والأحد للعائلات.' : 'Flexible Saturday and Sunday enrichment opportunities for families.' }
      ]
    },
    about: {
      title: isAr ? 'حول أكاديمية بنين وبنات' : 'About Baneen and Banaat Academy',
      subtitle: isAr ? 'تعليم متجذر في التميز والقيم' : 'Education Rooted in Excellence and Values',
      text1: isAr ? 'تأسست أكاديمية بنين وبنات في عام 2019، وهي مجتمع تعليمي عبر الإنترنت يدعم الطلاب والعائلات في جميع أنحاء الولايات المتحدة.' : 'Founded in 2019, Baneen and Banaat Academy is an online educational community supporting students and families across the United States.',
      text2: isAr ? 'نحن نؤمن بأن التعليم الهادف يتجاوز الإنجاز الأكاديمي. من خلال التعلم عبر الإنترنت، والتوجيه الشخصي، والقيم الأخلاقية القوية، والشراكة العائلية، نساعد الطلاب على بناء الثقة والاستعداد للفرص المقبلة.' : 'We believe meaningful education goes beyond academic achievement. Through online learning, personalized guidance, strong moral values, and family partnership, we help students build confidence and prepare for the opportunities ahead.',
      cta: isAr ? 'اعرف المزيد عن الأكاديمية' : 'Learn More About BBA'
    },
    planning: {
      title: isAr ? 'التخطيط التعليمي والمسارات المستقبلية' : 'Educational Planning & Future Pathways',
      subtitle: isAr ? 'مساعدة الطلاب على الاستعداد لما هو قادم' : 'Helping Students Prepare for What Comes Next',
      intro: isAr ? 'تتطلب الرحلة التعليمية الناجحة أكثر من مجرد إكمال الفصول الدراسية. يمكن أن يساعد التخطيط المدروس والسجلات المنظمة والتوجيه المستمر العائلات على اتخاذ قرارات مدروسة.' : 'A successful educational journey requires more than completing classes. Thoughtful planning, organized records, and ongoing guidance can help families make informed decisions.',
      items: [
        { id: 'graduation', title: isAr ? 'تخطيط التخرج' : 'Graduation Planning', icon: GraduationCap, desc: isAr ? 'فهم أهمية التخطيط المسبق وتتبع التقدم الأكاديمي.' : 'Understand the importance of planning ahead and tracking academic progress.' },
        { id: 'course', title: isAr ? 'تخطيط الدورات' : 'Course Planning', icon: BookOpen, desc: isAr ? 'اتخاذ قرارات مدروسة بشأن الدورات الدراسية والأهداف التعليمية.' : 'Make informed decisions about coursework and educational goals.' },
        { id: 'guidance', title: isAr ? 'التوجيه الشخصي' : 'Personal Guidance', icon: Target, desc: isAr ? 'تلقي توجيه تعليمي يأخذ في الاعتبار الاحتياجات الفردية لكل طالب.' : "Receive educational guidance that considers each student's individual needs." },
        { id: 'records', title: isAr ? 'السجلات الأكاديمية' : 'Academic Records', icon: FileText, desc: isAr ? 'تعرف على سبب أهمية الاحتفاظ بكشوف الدرجات والسجلات التعليمية.' : 'Learn why maintaining organized transcripts and educational records matters.' },
        { id: 'college', title: isAr ? 'التحضير للمستقبل' : 'College & Future Prep', icon: Zap, desc: isAr ? 'استكشاف أهمية التخطيط المبكر للقبول في الجامعات.' : 'Explore the importance of early planning for college admissions.' }
      ]
    },
    faqs: {
      title: isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
      subtitle: isAr ? 'إجابات مفيدة للعائلات' : 'Helpful Answers for Families',
      items: [
        { q: isAr ? 'كيف يعمل برنامج BBA عبر الإنترنت؟' : 'How does the BBA online program work?', a: isAr ? 'بدلاً من حضور دروس مباشرة كل يوم، يكمل الطلاب دوراتهم الدراسية عبر الإنترنت من خلال Edgenuity مع تلقي التوجيه والدعم.' : "Instead of attending live classes every day, students complete their coursework online through Edgenuity with guidance and support." },
        { q: isAr ? 'كم عدد الدورات التي سيكملها الطالب؟' : 'How many courses will a student complete?', a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب لإكمالها من سبتمبر حتى يونيو.' : 'Most students are assigned 10 courses to complete from September through June.' },
        { q: isAr ? 'هل مرشد الطالب متاح دائماً؟' : 'Is a student mentor always available?', a: isAr ? 'نعم، يتم تعيين مرشد مخصص لكل طالب لمراقبة التقدم والإجابة على الأسئلة.' : 'Yes, every student is assigned a dedicated mentor to monitor progress and answer questions.' }
      ]
    },
    cta: {
      title: isAr ? 'جاهز لبدء رحلتك مع BBA؟' : 'Ready to Begin Your BBA Journey?',
      subtitle: isAr ? 'فصل جديد لطفلك يبدأ من هنا' : "Your Child's Next Chapter Starts Here",
      text: isAr ? 'استكشف تجربة تعلم عبر الإنترنت تتمحور حول النمو الأكاديمي والقيم الهادفة والدعم الشخصي. أكمل نموذج التسجيل الخاص بنا وسيتواصل معك فريقنا.' : 'Explore an online learning experience centered on academic growth, meaningful values, and personalized support. Complete our enrollment form and our team will contact you.',
      primary: isAr ? 'ابدأ التسجيل' : 'Start Your Enrollment',
      secondary: isAr ? 'اتصل بالأكاديمية' : 'Contact BBA'
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[95vh] flex flex-col overflow-hidden bg-primary py-12 lg:py-20">
        <div className="absolute inset-0 z-0">
          <div className="hidden sm:block absolute inset-0">
            <Image src="/Academy background.png" alt="Academy background" fill className="object-cover" priority unoptimized />
          </div>
          <div className="block sm:hidden absolute inset-0">
            <Image src="/Academy background-phone.png" alt="Academy background mobile" fill className="object-cover" priority unoptimized />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/80" />
        </div>

        <div className="container-tight relative z-10 flex flex-col flex-1 w-full px-4 h-full">
          <div className="flex-[1.5]" />
          
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="relative inline-flex items-center gap-4 py-2 px-8">
              <div className="absolute inset-0 bg-white/10 border-l-4 border-secondary -skew-x-12 backdrop-blur-md rounded-lg" />
              <span className="relative text-[10px] sm:text-xs font-black tracking-[0.3em] text-white uppercase drop-shadow-md">{t.hero.welcome}</span>
            </div>
            
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-3xl xl:text-4xl leading-tight uppercase drop-shadow-2xl">
              {t.hero.title}
            </h1>
          </div>
          
          <div className="flex-1" />

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full sm:w-auto px-6 max-w-4xl mx-auto mb-12 lg:mb-20">
            <Button asChild size="lg" className="h-16 sm:h-20 lg:h-16 px-12 sm:px-16 lg:px-12 text-xl sm:text-2xl lg:text-xl bg-secondary hover:bg-white hover:text-secondary text-white shadow-2xl rounded-2xl transition-all font-black border-4 border-transparent hover:border-secondary">
              <Link href={`/${lang}/enroll`}>{t.hero.apply}</Link>
            </Button>
            <Button asChild size="lg" className="h-16 sm:h-20 lg:h-16 px-12 sm:px-16 lg:px-12 text-xl sm:text-2xl lg:text-xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary rounded-2xl transition-all font-black border-2 border-white/20">
              <Link href={`/${lang}/programs`}>{t.hero.explore}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY CHOOSE BBA */}
      <section className="py-20 lg:py-40 bg-slate-50 relative overflow-hidden">
        <div className="container-tight relative z-10 px-4">
          <div className="text-center mb-16 lg:mb-24 space-y-4">
            <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight leading-tight">{t.why.title}</h2>
            <p className="text-lg lg:text-xl font-black text-secondary italic leading-tight max-w-2xl mx-auto">{t.why.subtitle}</p>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            <p className="text-slate-500 max-w-3xl mx-auto font-bold text-sm lg:text-lg leading-relaxed opacity-80">{t.why.intro}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {t.why.items.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-premium border border-slate-100 flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden hover:-translate-y-2">
                <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-16 lg:w-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shrink-0 transition-all duration-700 group-hover:rotate-12">
                  <item.icon className="h-7 w-7 lg:h-8 lg:w-8" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-black text-base lg:text-lg text-primary uppercase leading-tight">{item.title}</h3>
                  <p className="text-slate-500 font-medium text-[11px] lg:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROGRAMS */}
      <section className="py-20 lg:py-40 bg-white relative overflow-hidden">
        <div className="container-tight px-4 relative z-10">
          <div className="text-center mb-16 lg:mb-24 space-y-4">
            <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight leading-tight">{t.programs.title}</h2>
            <p className="text-lg lg:text-xl font-black text-secondary italic max-w-2xl mx-auto">{t.programs.subtitle}</p>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {t.programs.items.map((prog) => (
              <div key={prog.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100 transition-all duration-700 hover:shadow-premium hover:-translate-y-3">
                <div className="relative h-56 lg:h-64 overflow-hidden">
                  <Image src={prog.image} alt={prog.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-4 py-1.5 bg-secondary text-white rounded-full font-black text-[10px] lg:text-xs uppercase tracking-widest shadow-lg">Online Program</span>
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex-1 flex flex-col space-y-6">
                  <h3 className="text-lg lg:text-xl font-black text-primary group-hover:text-secondary transition-colors duration-300 leading-tight">{prog.title}</h3>
                  <p className="text-slate-500 font-medium text-xs lg:text-sm leading-relaxed opacity-90">{prog.desc}</p>
                  <div className="pt-6 mt-auto">
                    <Button asChild variant="outline" className="w-full rounded-xl h-14 border-primary/10 text-primary font-black text-sm hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Link href={`/${lang}/programs/${prog.id}`}>
                        {isAr ? 'عرض التفاصيل' : 'Learn More'}
                        {isAr ? <ChevronLeft className="mr-2 h-5 w-5" /> : <ChevronRight className="ml-2 h-5 w-5" />}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-primary hover:bg-secondary text-white font-black text-lg transition-all shadow-xl">
              <Link href={`/${lang}/programs`}>
                {t.programs.viewAll}
                {isAr ? <ArrowLeft className="mr-3 h-6 w-6" /> : <ArrowRight className="ml-3 h-6 w-6" />}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4 — ABOUT */}
      <section className="py-20 lg:py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="container-tight px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
             <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group order-2 lg:order-1 transition-transform duration-1000 hover:scale-[1.02]">
                <Image src="/About.png" alt="Academy Excellence" fill className="object-cover" unoptimized />
             </div>
             <div className="space-y-10 order-1 lg:order-2">
                <div className="space-y-6 text-center lg:text-start">
                   <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight">{t.about.title}</h2>
                   <p className="text-lg lg:text-xl font-black text-secondary italic leading-tight">{t.about.subtitle}</p>
                   <div className="h-1.5 w-24 bg-secondary mx-auto lg:mx-0 rounded-full" />
                </div>
                <div className="space-y-8 text-white/80 font-medium text-sm lg:text-lg leading-relaxed">
                   <p className="font-black text-white text-sm sm:text-xl border-l-8 border-secondary pl-6 sm:pl-8 py-2 bg-white/5 rounded-r-xl italic">
                     {t.about.text1}
                   </p>
                   <p className="opacity-90">{t.about.text2}</p>
                </div>
                <div className="pt-6">
                  <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-secondary hover:bg-white hover:text-secondary transition-all shadow-xl font-black text-lg w-full sm:w-auto">
                    <Link href={`/${lang}/about`}>{t.about.cta}</Link>
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PLANNING */}
      <section className="py-20 lg:py-40 bg-slate-50 relative overflow-hidden">
        <div className="container-tight relative z-10 px-4">
          <div className="text-center mb-16 lg:mb-24 space-y-4">
            <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight leading-tight">{t.planning.title}</h2>
            <p className="text-lg lg:text-xl font-black text-secondary italic max-w-2xl mx-auto">{t.planning.subtitle}</p>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            <p className="text-slate-500 max-w-3xl mx-auto font-bold text-sm lg:text-lg leading-relaxed opacity-80">{t.planning.intro}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
            {t.planning.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 transition-all duration-500 group flex flex-col h-full hover:shadow-premium items-center text-center relative overflow-hidden hover:-translate-y-2">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id={`grid-plan-${idx}`} width="15" height="15" patternUnits="userSpaceOnUse">
                      <path d="M 15 0 L 0 0 0 15" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#grid-plan-${idx})`} />
                  </svg>
                </div>
                
                <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg mb-6 shrink-0 transition-all duration-700 group-hover:rotate-12 relative z-10">
                  <item.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                </div>
                <h3 className="font-black text-sm lg:text-base mb-3 uppercase tracking-tight text-primary relative z-10">{item.title}</h3>
                <p className="text-slate-500 font-medium text-[10px] lg:text-xs leading-relaxed mb-6 flex-1 opacity-80 relative z-10">{item.desc}</p>
                <Button asChild className="w-full h-10 lg:h-9 rounded-xl bg-slate-50 hover:bg-primary hover:text-white text-primary font-black uppercase tracking-widest text-[8px] transition-all relative z-10">
                  <Link href={`/${lang}/planning#${item.id}`}>
                    {isAr ? 'عرض التفاصيل' : 'View Details'}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="py-20 lg:py-40 bg-white relative overflow-hidden">
        <div className="container-tight px-4 relative z-10">
          <div className="text-center mb-16 lg:mb-24 space-y-4">
            <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight leading-tight">{isAr ? 'آراء أولياء الأمور' : 'What Parents Say'}</h2>
            <p className="text-lg lg:text-xl font-black text-secondary italic max-w-2xl mx-auto">{isAr ? 'تجارب حقيقية من عائلات BBA' : 'Real Experiences from BBA Families'}</p>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {[
              { s: 'S', student: isAr ? 'طالب 1' : 'Student 1', name: 'Sarah M.', role: isAr ? 'ولي أمر (نيويورك)' : 'Parent (New York)', text: isAr ? 'لقد غيرت الأكاديمية حياة أطفالي. التوازن بين المواد الأكاديمية والقرآن الكريم رائع جداً، والمرشدون يتابعون كل تفصيلة بدقة.' : "The academy has changed my children's lives. The balance between academic subjects and the Holy Quran is wonderful." },
              { s: 'A', student: isAr ? 'طالب 2' : 'Student 2', name: 'Ahmed K.', role: isAr ? 'ولي أمر (ميشيغان)' : 'Parent (Michigan)', text: isAr ? 'أفضل قرار اتخذته لعائلتي كان التسجيل في BBA. المرونة في الوقت وجودة التعليم ساعدت ابني على التميز والتفوق.' : 'The best decision I made for my family was enrolling in BBA. Time flexibility and quality of education helped my son excel.' },
              { s: 'N', student: isAr ? 'طالب 3' : 'Student 3', name: 'Noura H.', role: isAr ? 'ولي أمر (تكساس)' : 'Parent (Texas)', text: isAr ? 'التعليم عبر الإنترنت هنا مختلف تماماً، تشعر أنك في مدرسة حقيقية بفضل التواصل المستمر مع المدرسين وإدارة محترفة.' : 'Online education here is completely different; you feel like you are in a real school thanks to the constant communication.' }
            ].map((test, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative space-y-4 group hover:bg-white hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-black shadow-lg shrink-0">
                    {test.s}
                  </div>
                  <div className="min-w-0 text-start space-y-0.5">
                    <div className="font-black text-primary text-sm">{test.student}</div>
                    <div className="text-[10px] font-bold text-secondary uppercase truncate">{test.name} — {test.role}</div>
                  </div>
                </div>
                <p className="text-slate-600 font-bold italic leading-relaxed text-xs lg:text-sm opacity-90 border-t border-slate-100 pt-4">
                  "{test.text}"
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="ghost" className="text-secondary font-black hover:bg-secondary/5 gap-2 h-12 rounded-xl">
              <Link href={`/${lang}/testimonials`} className="flex items-center gap-2">
                {isAr ? 'عرض كافة الآراء' : 'View All Testimonials'}
                {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FAQS */}
      <section className="py-20 lg:py-40 bg-slate-50 border-y border-slate-100 relative">
        <div className="container-tight px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="space-y-8 text-center lg:text-start">
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight leading-tight">{t.faqs.title}</h2>
                <p className="text-lg lg:text-xl font-black text-secondary italic leading-tight">{t.faqs.subtitle}</p>
                <div className="h-1.5 w-24 bg-secondary mx-auto lg:mx-0 rounded-full" />
              </div>
              <Button asChild size="lg" className="h-16 px-10 bg-primary hover:bg-secondary transition-all w-full sm:w-auto shadow-2xl font-black text-lg rounded-2xl">
                <Link href={`/${lang}/guide#courses-faqs`}>{isAr ? 'عرض كافة الأسئلة' : 'View All FAQs'}</Link>
              </Button>
            </div>
            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-premium border border-slate-100">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {t.faqs.items.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border-none rounded-xl px-6 bg-slate-50 hover:bg-white transition-all duration-500 shadow-sm">
                    <AccordionTrigger className="hover:no-underline font-black text-primary text-start text-xs sm:text-lg lg:text-sm py-6">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-slate-600 font-bold leading-relaxed pb-8 pt-2 border-t border-slate-100 text-[11px] lg:text-sm opacity-80">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="py-20 lg:py-40 bg-primary relative overflow-hidden">
        <div className="container-tight relative z-10 px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center group">
            <div className="p-10 lg:p-16 flex-1 space-y-10 text-center lg:text-start">
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight leading-tight">{t.cta.title}</h2>
                <p className="text-lg lg:text-xl font-black text-secondary italic">{t.cta.subtitle}</p>
              </div>
              <p className="text-slate-500 font-bold text-sm lg:text-lg leading-relaxed max-w-2xl">{t.cta.text}</p>
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-secondary hover:bg-primary text-white font-black text-lg transition-all shadow-2xl">
                  <Link href={`/${lang}/enroll`}>{t.cta.primary}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-2xl border-2 border-primary/10 text-primary font-black text-lg hover:bg-primary hover:text-white transition-all">
                  <Link href={`/${lang}/contact`}>{t.cta.secondary}</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block relative w-1/3 aspect-[4/5] overflow-hidden">
              <Image src="/program-1.png" alt="Academy Future" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
