
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
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
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
      title: isAr ? 'لماذا تختار العائلات BBA؟' : 'Why Families Choose BBA?!',
      subtitle: isAr ? 'تجربة تعليمية مبنية حول الطلاب والعائلات' : 'A Learning Experience Built Around Students and Families',
      intro: isAr ? 'في أكاديمية بنين وبنات، نجمع بين التعلم الأكاديمي الهادف والقيم القوية والتوجيه الشخصي لمساعدة الطلاب على المضي قدماً بثقة.' : 'At Baneen and Banaat Academy, we combine meaningful academic learning, strong values, and personalized guidance to help students move forward with confidence.',
      items: [
        { 
          title: isAr ? 'التميز الأكاديمي' : 'Academic Excellence', 
          desc: isAr ? 'نساعد الطلاب على بناء المعرفة وتعزيز المهارات الأساسية والاستعداد للفرص التعليمية المستقبلية.' : 'We help students build knowledge, strengthen essential skills, and prepare for future educational opportunities.',
          icon: Star 
        },
        { 
          title: isAr ? 'دعم طلابي شخصي' : 'Personal Student Support', 
          desc: isAr ? 'نحن ندرك أن كل متعلم مختلف ونعمل بشكل وثيق مع العائلات لدعم الرحلة التعليمية لكل طالب.' : "We recognize that every learner is different and work closely with families to support each student's educational journey.",
          icon: Users 
        },
        { 
          title: isAr ? 'تعليم 100% عبر الإنترنت' : '100% Online Learning', 
          desc: isAr ? 'تسمح برامجنا عبر الإنترنت للطلاب بالتعلم من المنزل مع البقاء على اتصال بأهدافهم التعليمية.' : 'Our online programs allow students to learn from home while staying connected to their educational goals.',
          icon: Globe 
        },
        { 
          title: isAr ? 'الشراكة مع الأسرة' : 'Family Partnership', 
          desc: isAr ? 'نؤمن بأن الطلاب يزدهرون عندما يعمل الآباء والمعلمون معاً من خلال التواصل المفتوح والأهداف المشتركة.' : 'We believe students thrive when parents and educators work together through open communication and shared goals.',
          icon: ShieldCheck 
        },
      ]
    },
    programs: {
      title: isAr ? 'استكشف برامجنا عبر الإنترنت' : 'Explore Our Online Programs',
      subtitle: isAr ? 'اعثر على المسار التعليمي المناسب لطفلك' : 'Find the Right Learning Path for Your Child',
      intro: isAr ? 'تقدم BBA برامج تعليمية عبر الإنترنت مصممة لمختلف الأعمار والاحتياجات التعليمية والأهداف الأكاديمية.' : 'BBA offers online educational programs designed for different ages, learning needs, and academic goals.',
      items: [
        {
          id: 'grades-3-5',
          title: isAr ? 'برنامج الصفوف 3-5 (عن بعد)' : 'Grades 3–5 Remote Program',
          desc: isAr ? 'بناء أسس أكاديمية قوية وتطوير الثقة في مهارات التعلم الأساسية.' : 'Build strong academic foundations and develop confidence in essential learning skills.',
          image: "/program-1.png",
        },
        {
          id: 'grades-6-12',
          title: isAr ? 'برنامج الصفوف 6-12 (عن بعد)' : 'Grades 6–12 Remote Program',
          desc: isAr ? 'دعم التقدم الأكاديمي خلال سنوات المرحلة المتوسطة والثانوية مع الاستعداد للفرص المستقبلية.' : 'Support academic progress through the middle and high school years while preparing for future opportunities.',
          image: "/program-2.png",
        },
        {
          id: 'weekend',
          title: isAr ? 'برنامج عطلة نهاية الأسبوع (عن بعد)' : 'Weekend Program (Remote)',
          desc: isAr ? 'إثراء أيام السبت والأحد لتعزيز الهوية الإسلامية واللغة.' : 'Flexible Saturday and Sunday enrichment opportunities for families seeking additional learning support.',
          image: "/program-3.png",
        }
      ],
      cta: isAr ? 'عرض جميع البرامج' : 'View All Programs'
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
      intro: isAr ? 'الرحلة التعليمية الناجحة تتطلب أكثر من مجرد إكمال الحصص. يمكن للتخطيط المدروس والسجلات المنظمة والتوجيه المستمر أن يساعد العائلات على اتخاذ قرارات مدروسة.' : 'A successful educational journey requires more than completing classes. Thoughtful planning, organized records, and ongoing guidance can help families make informed decisions.',
      items: [
        { id: 'graduation', title: isAr ? 'تخطيط التخرج' : 'Graduation Planning', desc: isAr ? 'فهم أهمية التخطيط المسبق، وتتبع التقدم الأكاديمي.' : 'Understand the importance of planning ahead, tracking academic progress.', icon: GraduationCap },
        { id: 'course', title: isAr ? 'تخطيط الدورات' : 'Course Planning', desc: isAr ? 'اتخاذ قرارات مدروسة بشأن الدورات الدراسية والأهداف التعليمية.' : 'Make informed decisions about coursework and educational goals.', icon: BookOpen },
        { id: 'guidance', title: isAr ? 'التوجيه الشخصي' : 'Personal Guidance', desc: isAr ? 'تلقي إرشادات تعليمية تأخذ في الاعتبار احتياجات كل طالب.' : "Receive educational guidance that considers each student's needs.", icon: Target },
        { id: 'records', title: isAr ? 'السجلات الأكاديمية' : 'Academic Records', desc: isAr ? 'تعرف على سبب أهمية الاحتفاظ بكشوف الدرجات المنظمة.' : 'Learn why maintaining organized transcripts and records matters.', icon: FileText },
        { id: 'college', title: isAr ? 'التحضير للكلية والمستقبل' : 'College & Future Preparation', desc: isAr ? 'استكشاف أهمية التخطيط المبكر للقبول في الجامعات.' : 'Explore the importance of early planning for college admissions.', icon: Zap }
      ]
    },
    testimonials: {
      title: isAr ? 'ماذا يقول أولياء الأمور' : 'What Parents Say',
      subtitle: isAr ? 'تجارب حقيقية من عائلات الأكاديمية' : 'Real Experiences from BBA Families',
      items: [
        { 
          studentName: isAr ? 'يوسف' : 'Yusuf',
          parentName: isAr ? 'سارة م.' : 'Sarah M.', 
          role: isAr ? 'ولي أمر (نيويورك)' : 'Parent (New York)', 
          text: isAr ? 'لقد غيرت الأكاديمية حياة أطفالي. التوازن بين المواد الأكاديمية والقرآن الكريم رائع جداً، والمرشدون يتابعون كل تفصيلة بدقة.' : 'The academy has changed my children\'s lives. The balance between academic subjects and the Holy Quran is wonderful, and the mentors follow every detail closely.' 
        },
        { 
          studentName: isAr ? 'مريم' : 'Maryam',
          parentName: isAr ? 'أحمد ك.' : 'Ahmed K.', 
          role: isAr ? 'ولي أمر (ميشيغان)' : 'Parent (Michigan)', 
          text: isAr ? 'أفضل قرار اتخذته لعائلتي هو التسجيل في BBA. المرونة في الوقت والجودة في التعليم ساعدت ابني على التميز والتفوق.' : 'The best decision I made for my family was enrolling in BBA. Time flexibility and quality of education helped my son excel and stand out.' 
        },
        { 
          studentName: isAr ? 'عمر' : 'Omar',
          parentName: isAr ? 'نورة هـ.' : 'Noura H.', 
          role: isAr ? 'ولي أمر (تكساس)' : 'Parent (Texas)', 
          text: isAr ? 'التعليم عبر الإنترنت هنا مختلف تماماً، تشعر أنك في مدرسة حقيقية بفضل التواصل المستمر مع المدرسين والإدارة.' : 'Online education here is completely different; you feel like you are in a real school thanks to the constant communication with teachers and administration.' 
        },
      ]
    },
    faq: {
      title: isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions',
      subtitle: isAr ? 'إجابات مفيدة للعائلات' : 'Helpful Answers for Families',
      items: [
        { 
          q: isAr ? 'كيف يعمل برنامج الأكاديمية عبر الإنترنت؟' : 'How does the BBA online program work?', 
          a: isAr ? 'بدلاً من حضور دروس مباشرة كل يوم، يكمل الطلاب دوراتهم الدراسية عبر الإنترنت من خلال منصة Edgenuity مع تلقي التوجيه والدعم من فريقنا الأكاديمي.' : 'Instead of attending live classes every day, students complete their coursework online through Edgenuity while receiving guidance and support from BBA\'s academic team.'
        },
        { 
          q: isAr ? 'كم عدد الدورات التي سيكملها الطالب؟' : 'How many courses will a student complete?', 
          a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب لإكمالها من سبتمبر حتى يونيو، بمتوسط دورة واحدة شهرياً.' : 'Most students are assigned 10 courses to complete from September through June, averaging one course each month.'
        },
        { 
          q: isAr ? 'هل مرشد الطالب متاح دائماً للمساعدة؟' : 'Is a student mentor always available?', 
          a: isAr ? 'نعم، يتم تعيين مرشد لكل طالب لمراقبة التقدم والإجابة على الأسئلة وتقديم التشجيع طوال العام الدراسي.' : 'Yes, every student is assigned a dedicated mentor to monitor progress, answer questions, and provide encouragement throughout the school year.'
        }
      ],
    },
    cta: {
      title: isAr ? 'جاهز لبدء رحلتك مع BBA؟' : 'Ready to Begin Your BBA Journey?',
      subtitle: isAr ? 'فصل جديد لطفلك يبدأ من هنا' : "Your Child's Next Chapter Starts Here",
      desc: isAr ? 'استكشف تجربة تعلم عبر الإنترنت تتمحور حول النمو الأكاديمي والقيم الهادفة والدعم الشخصي. أكمل نموذج التسجيل الخاص بنا وسيتواصل معك فريقنا.' : 'Explore an online learning experience centered on academic growth, meaningful values, and personalized support. Complete our enrollment form and our team will contact you.',
      primary: isAr ? 'ابدأ التسجيل' : 'Start Your Enrollment',
      secondary: isAr ? 'اتصل بالأكاديمية' : 'Contact BBA'
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* SECTION 1 — HERO: Centered Title/Welcome with Bottom Buttons */}
      <section className="relative min-h-[90vh] sm:min-h-[95vh] flex flex-col items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="hidden sm:block absolute inset-0">
            <Image 
              src="/Academy background.png" 
              alt="Academy background" 
              fill 
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="block sm:hidden absolute inset-0">
            <Image 
              src="/Academy background-phone.png" 
              alt="Academy background mobile" 
              fill 
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/80" />
        </div>

        <div className="container-tight relative z-10 flex flex-col h-full flex-1 pt-20 pb-8 sm:pb-32">
          {/* Top Spacer to push content to middle */}
          <div className="flex-1" />

          {/* Middle: Welcome & Title */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-10 shrink-0">
            <div className="relative group inline-flex items-center gap-4 py-2 px-8">
              <div className="absolute inset-0 bg-white/10 border-l-4 border-secondary -skew-x-12 backdrop-blur-md rounded-lg" />
              <div className="relative flex items-center gap-3">
                <span className="text-[10px] sm:text-sm font-black tracking-[0.3em] text-white uppercase drop-shadow-md">
                  {t.hero.welcome}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-7xl lg:text-9xl leading-none drop-shadow-2xl uppercase">
                {t.hero.title}
              </h1>
            </div>
          </div>

          {/* Spacer between Content and Buttons */}
          <div className="flex-[1.5]" />

          {/* Bottom: Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full sm:w-auto px-6 max-w-4xl mx-auto shrink-0">
            <Button asChild size="lg" className="h-16 sm:h-24 px-12 sm:px-20 text-xl sm:text-3xl bg-secondary hover:bg-white hover:text-secondary text-white shadow-2xl rounded-full transition-all hover:scale-105 font-black border-4 border-transparent hover:border-secondary">
              <Link href={`/${lang}/enroll`}>{t.hero.apply}</Link>
            </Button>
            <Button asChild size="lg" className="h-16 sm:h-24 px-12 sm:px-20 text-xl sm:text-3xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary rounded-full transition-all font-black border-2 border-white/20">
              <Link href={`/${lang}/programs`}>{t.hero.explore}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY FAMILIES CHOOSE BBA: Updated to rounded-2xl and centered content */}
      <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="why-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                 <circle cx="30" cy="30" r="1" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#why-pattern)" />
           </svg>
        </div>

        <div className="container-tight relative z-10 px-4">
          <div className="text-center mb-16 sm:mb-24 space-y-6">
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tight leading-tight">{t.why.title}</h2>
            <p className="text-lg sm:text-3xl font-black text-secondary italic leading-tight max-w-2xl mx-auto">{t.why.subtitle}</p>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            <p className="text-slate-500 max-w-3xl mx-auto font-bold text-sm sm:text-xl leading-relaxed opacity-80">{t.why.intro}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {t.why.items.map((item, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl shadow-premium border border-slate-100 flex flex-col items-center text-center space-y-4 hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shadow-inner group-hover:bg-secondary group-hover:text-white transition-all duration-700 group-hover:rotate-12">
                  <item.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-sm sm:text-lg text-primary uppercase leading-tight">{item.title}</h3>
                  <p className="text-slate-500 font-medium text-[10px] sm:text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — EXPLORE OUR ONLINE PROGRAMS */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="container-tight px-4 relative z-10">
          <div className="text-center mb-16 sm:mb-24 space-y-6">
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tight leading-tight">{t.programs.title}</h2>
            <p className="text-lg sm:text-3xl font-black text-secondary italic max-w-2xl mx-auto">{t.programs.subtitle}</p>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            <p className="text-slate-500 max-w-2xl mx-auto font-bold text-sm sm:text-lg opacity-70">{t.programs.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {t.programs.items.map((prog) => (
              <div key={prog.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100 transition-all duration-700 hover:shadow-premium hover:-translate-y-3">
                <div className="relative h-56 sm:h-80 overflow-hidden">
                  <Image src={prog.image} alt={prog.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                     <span className="inline-block px-4 py-1.5 bg-secondary text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">Online Program</span>
                  </div>
                </div>
                <div className="p-6 sm:p-10 flex-1 flex flex-col space-y-6">
                  <h3 className="text-lg sm:text-xl font-black text-primary group-hover:text-secondary transition-colors duration-300 leading-tight">
                    {prog.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed opacity-90">
                    {prog.desc}
                  </p>
                  <div className="pt-6 mt-auto">
                    <Button asChild variant="outline" className="w-full rounded-xl h-12 sm:h-16 border-primary/10 text-primary font-black text-sm hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Link href={`/${lang}/programs/${prog.id}`}>
                        {isAr ? 'عرض التفاصيل' : 'Learn More'}
                        {isAr ? <ChevronLeft className="mr-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="h-16 sm:h-20 px-12 sm:px-20 rounded-xl bg-primary hover:bg-secondary font-black transition-all shadow-2xl text-lg">
               <Link href={`/${lang}/programs`}>{t.programs.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4 — ABOUT BBA: Using About.png and adjusted text size */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <pattern id="about-geo" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
                  <path d="M 0 80 L 80 0" fill="none" stroke="white" strokeWidth="0.5" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#about-geo)" />
            </svg>
         </div>

        <div className="container-tight px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
             <div className="relative aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden shadow-2xl group order-2 lg:order-1 transition-transform duration-1000 hover:scale-[1.02]">
                <Image src="/About.png" alt="Academy Excellence" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 right-8 text-center p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
                   <p className="text-secondary font-black text-xl sm:text-3xl drop-shadow-md">Est. 2019</p>
                </div>
             </div>

             <div className="space-y-10 order-1 lg:order-2">
                <div className="space-y-6 text-center lg:text-start">
                  <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">{t.about.title}</h2>
                  <p className="text-lg sm:text-3xl font-black text-secondary italic leading-tight">{t.about.subtitle}</p>
                  <div className="h-1.5 w-24 bg-secondary mx-auto lg:mx-0 rounded-full" />
                </div>
                <div className="space-y-8 text-white/80 font-medium text-sm sm:text-xl leading-relaxed">
                   <p className="font-black text-white text-base sm:text-xl border-l-8 border-secondary pl-6 sm:pl-8 py-2 bg-white/5 rounded-r-xl italic leading-relaxed">
                     {t.about.text1}
                   </p>
                   <p className="opacity-90">{t.about.text2}</p>
                </div>
                <div className="pt-6">
                  <Button asChild size="lg" className="h-14 sm:h-16 px-12 rounded-xl bg-secondary hover:bg-white hover:text-secondary transition-all shadow-xl font-black text-lg w-full sm:w-auto">
                    <Link href={`/${lang}/about`}>{t.about.cta}</Link>
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — EDUCATIONAL PLANNING: Grid pattern and centered small cards */}
      <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
         <div className="container-tight relative z-10 px-4">
            <div className="text-center mb-16 sm:mb-24 space-y-6">
               <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tight leading-tight">{t.planning.title}</h2>
               <p className="text-lg sm:text-3xl font-black text-secondary italic max-w-3xl mx-auto">{t.planning.subtitle}</p>
               <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
               <p className="text-slate-500 max-w-4xl mx-auto font-bold text-sm sm:text-xl leading-relaxed opacity-80">{t.planning.intro}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               {t.planning.items.map((item, idx) => (
                 <div key={idx} className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-100 transition-all duration-500 group flex flex-col h-full hover:shadow-premium items-center text-center hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                       <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <pattern id={`card-pattern-${idx}`} width="20" height="20" patternUnits="userSpaceOnUse">
                             <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                          </pattern>
                          <rect width="100%" height="100%" fill={`url(#card-pattern-${idx})`} />
                       </svg>
                    </div>

                    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shadow-inner mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-700 group-hover:rotate-12 relative z-10">
                       <item.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="font-black text-sm sm:text-xl mb-3 uppercase tracking-tight text-primary relative z-10">{item.title}</h3>
                    <p className="text-slate-500 font-medium text-[10px] sm:text-sm leading-relaxed mb-8 flex-1 opacity-80 relative z-10">{item.desc}</p>
                    <Button asChild className="w-full h-12 rounded-xl bg-slate-50 hover:bg-primary hover:text-white text-primary font-black uppercase tracking-widest text-[9px] transition-all relative z-10 shadow-sm">
                       <Link href={`/${lang}/planning#${item.id}`}>
                          {isAr ? 'عرض التفاصيل' : 'View Details'}
                          {isAr ? <ChevronLeft className="mr-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
                       </Link>
                    </Button>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 6 — WHAT PARENTS SAY: Compact horizontal cards */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
         <div className="container-tight px-4 relative z-10">
            <div className="text-center mb-16 sm:mb-24 space-y-6">
               <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tight leading-tight">{t.testimonials.title}</h2>
               <p className="text-lg sm:text-3xl font-black text-secondary italic max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
               <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
              {t.testimonials.items.map((test, idx) => (
                <div key={idx} className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 relative space-y-6 group hover:bg-white hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary text-white flex items-center justify-center text-lg sm:text-xl font-black shadow-xl shrink-0 group-hover:scale-110 transition-transform">
                      {test.studentName[0]}
                    </div>
                    <div className="min-w-0 text-start">
                      <div className="font-black text-primary text-sm sm:text-lg truncate leading-tight">{test.studentName}</div>
                      <div className="text-[10px] sm:text-xs font-black text-secondary uppercase tracking-[0.2em] truncate opacity-70">
                        {test.parentName} — {test.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 font-bold italic leading-relaxed text-xs sm:text-base relative z-10">
                    "{test.text}"
                  </p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* SECTION 7 — FAQ */}
      <section className="py-20 lg:py-32 bg-slate-50 border-y border-slate-100 relative">
         <div className="container-tight px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
               <div className="space-y-8 text-center lg:text-start">
                  <div className="space-y-6">
                     <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tight leading-tight">{t.faq.title}</h2>
                     <p className="text-lg sm:text-3xl font-black text-secondary italic leading-tight">{t.faq.subtitle}</p>
                     <div className="h-1.5 w-24 bg-secondary mx-auto lg:mx-0 rounded-full" />
                  </div>
                  <Button asChild size="lg" className="h-14 rounded-xl px-10 bg-primary hover:bg-secondary transition-all w-full sm:w-auto shadow-2xl font-black text-lg">
                     <Link href={`/${lang}/guide#courses-faqs`}>{isAr ? 'عرض كافة الأسئلة' : 'View All FAQs'}</Link>
                  </Button>
               </div>
               
               <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-premium border border-slate-100">
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {t.faq.items.map((item, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`} className="border-none rounded-xl px-6 bg-slate-50 hover:bg-white transition-all duration-500 shadow-sm">
                        <AccordionTrigger className="hover:no-underline font-black text-primary text-start text-xs sm:text-lg py-6">
                           {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 font-bold leading-relaxed pb-8 pt-2 border-t border-slate-100 text-[11px] sm:text-base opacity-80">
                           {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 8 — FINAL CTA: Corrected rounded corners and layout */}
      <section className="py-20 sm:py-32 bg-primary relative overflow-hidden">
         <div className="container-tight relative z-10 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center group">
               <div className="p-10 sm:p-20 flex-1 space-y-10 text-center lg:text-start">
                  <div className="space-y-6">
                    <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tight leading-tight">{t.cta.title}</h2>
                    <p className="text-lg sm:text-3xl font-black text-secondary italic">{t.cta.subtitle}</p>
                  </div>
                  <p className="text-slate-500 font-bold text-sm sm:text-xl leading-relaxed max-w-2xl">{t.cta.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-6 pt-8">
                     <Button asChild size="lg" className="h-16 sm:h-20 px-12 rounded-xl bg-secondary hover:bg-primary text-white font-black text-lg sm:text-2xl transition-all shadow-2xl">
                        <Link href={`/${lang}/enroll`}>{t.cta.primary}</Link>
                     </Button>
                     <Button asChild variant="outline" size="lg" className="h-16 sm:h-20 px-12 rounded-xl border-2 border-primary/10 text-primary font-black text-lg sm:text-2xl hover:bg-primary hover:text-white transition-all">
                        <Link href={`/${lang}/contact`}>{t.cta.secondary}</Link>
                     </Button>
                  </div>
               </div>
               
               <div className="hidden lg:block relative w-1/3 aspect-[4/5] overflow-hidden">
                  <Image src="https://picsum.photos/seed/bba-cta/800/1200" alt="Academy Future" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
