
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Globe,
  FileText,
  MousePointer2,
  Compass,
  Quote
} from 'lucide-react';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';
  
  const t = {
    hero: {
      welcome: isAr ? 'مرحباً بكم في أكاديمية بنين وبنات' : 'Welcome To Baneen and Banaat Academy',
      title: isAr ? 'التعليم الذي يبني العقول' : 'Education That Builds Minds',
      subtitle: isAr ? 'والقيم التي تشكل الشخصية' : 'Values That Shape Character',
      desc: isAr ? 'شريك تعليمي موثوق يساعد الطلاب والعائلات على تحقيق النجاح الأكاديمي من خلال التعلم المرن عبر الإنترنت والتوجيه الشخصي والالتزام بالتميز.' : 'A trusted educational partner helping students and families achieve academic success through flexible online learning, personalized guidance, and a commitment to excellence.',
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
          title: isAr ? 'دعم طلابي شخصي' : 'Personalized Student Support', 
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
          color: 'bg-primary'
        },
        {
          id: 'grades-6-12',
          title: isAr ? 'برنامج الصفوف 6-12 (عن بعد)' : 'Grades 6–12 Remote Program',
          desc: isAr ? 'دعم التقدم الأكاديمي خلال سنوات المرحلة المتوسطة والثانوية مع الاستعداد للفرص المستقبلية.' : 'Support academic progress through the middle and high school years while preparing for future opportunities.',
          image: "/program-2.png",
          color: 'bg-accent'
        },
        {
          id: 'weekend',
          title: isAr ? 'برنامج عطلة نهاية الأسبوع (عن بعد)' : 'Weekend Program (Remote)',
          desc: isAr ? 'فرص إثراء مرنة يومي السبت والأحد للعائلات التي تبحث عن دعم تعليمي إضافي.' : 'Flexible Saturday and Sunday enrichment opportunities for families seeking additional learning support.',
          image: "/program-3.png",
          color: 'bg-secondary'
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
        { id: 'graduation', title: isAr ? 'تخطيط التخرج' : 'Graduation Planning', desc: isAr ? 'فهم أهمية التخطيط المسبق، وتتبع التقدم الأكاديمي، والاستعداد لمتطلبات التخرج.' : 'Understand the importance of planning ahead, tracking academic progress, and preparing for graduation requirements.' },
        { id: 'course', title: isAr ? 'تخطيط الدورات' : 'Course Planning', desc: isAr ? 'اتخاذ قرارات مدروسة بشأن الدورات الدراسية والأهداف التعليمية طوال السنوات الدراسية.' : 'Make informed decisions about coursework and educational goals throughout the school years.' },
        { id: 'guidance', title: isAr ? 'التوجيه الشخصي' : 'Personal Guidance', desc: isAr ? 'تلقي إرشادات تعليمية تأخذ في الاعتبار احتياجات كل طالب الفردية وتقدمه وخططه المستقبلية.' : "Receive educational guidance that considers each student's individual needs, progress, and future plans." },
        { id: 'records', title: isAr ? 'السجلات الأكاديمية' : 'Academic Records', desc: isAr ? 'تعرف على سبب أهمية الاحتفاظ بكشوف الدرجات المنظمة، والدورات الدراسية، والحضور، والسجلات الأخرى.' : 'Learn why maintaining organized transcripts, grades, coursework, attendance, and other educational records matters.' },
        { id: 'college', title: isAr ? 'التحضير للكلية والمستقبل' : 'College & Future Preparation', desc: isAr ? 'استكشاف أهمية التخطيط المبكر للقبول في الجامعات، والتعليم المستقبلي، والفرص بعد التخرج.' : 'Explore the importance of early planning for college admissions, future education, and opportunities beyond graduation.' }
      ],
      details: isAr ? 'عرض التفاصيل' : 'View Details'
    },
    testimonials: {
      title: isAr ? 'ماذا يقول أولياء الأمور' : 'What Parents Say',
      subtitle: isAr ? 'تجارب حقيقية من عائلات الأكاديمية' : 'Real Experiences from BBA Families',
      items: [
        { 
          name: isAr ? 'سارة م.' : 'Sarah M.', 
          role: isAr ? 'ولي أمر (نيويورك)' : 'Parent (New York)', 
          text: isAr ? 'لقد غيرت الأكاديمية حياة أطفالي. التوازن بين المواد الأكاديمية والقرآن الكريم رائع جداً، والمرشدون يتابعون كل تفصيلة بدقة.' : 'The academy has changed my children\'s lives. The balance between academic subjects and the Holy Quran is wonderful, and the mentors follow every detail closely.' 
        },
        { 
          name: isAr ? 'أحمد ك.' : 'Ahmed K.', 
          role: isAr ? 'ولي أمر (ميشيغان)' : 'Parent (Michigan)', 
          text: isAr ? 'أفضل قرار اتخذته لعائلتي هو التسجيل في BBA. المرونة في الوقت والجودة في التعليم ساعدت ابني على التميز والتفوق.' : 'The best decision I made for my family was enrolling in BBA. Time flexibility and quality of education helped my son excel and stand out.' 
        },
        { 
          name: isAr ? 'نورة هـ.' : 'Noura H.', 
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
    <div className="flex flex-col overflow-hidden">
      {/* SECTION 1 — HERO (Preserved Design) */}
      <section className="relative min-h-[70vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-primary py-12 sm:py-24">
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

        <div className="container-tight relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-10">
            <div className="relative group inline-flex items-center gap-4 py-2 px-6">
              <div className="absolute inset-0 bg-white/10 border-l-4 border-secondary -skew-x-12 backdrop-blur-md" />
              <div className="relative flex items-center gap-3">
                <span className="text-[10px] sm:text-sm font-black tracking-[0.25em] text-white uppercase drop-shadow-md">
                  {t.hero.welcome}
                </span>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-6xl lg:text-8xl leading-tight sm:leading-[1] drop-shadow-2xl uppercase">
                {t.hero.title}
              </h1>
              <h2 className="text-xl font-black text-secondary sm:text-4xl lg:text-5xl drop-shadow-lg italic">
                {t.hero.subtitle}
              </h2>
            </div>

            <p className="text-base sm:text-2xl text-white/90 leading-relaxed max-w-3xl font-bold drop-shadow-lg px-4">
              {t.hero.desc}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6 w-full sm:w-auto px-6">
              <Button asChild size="lg" className="h-14 sm:h-20 px-10 sm:px-16 text-lg sm:text-2xl bg-secondary hover:bg-white hover:text-secondary text-white shadow-2xl rounded-full transition-all hover:scale-105 font-black border-4 border-transparent hover:border-secondary">
                <Link href={`/${lang}/enroll`}>{t.hero.apply}</Link>
              </Button>
              <Button asChild size="lg" className="h-14 sm:h-20 px-10 sm:px-16 text-lg sm:text-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary rounded-full transition-all font-black border-2 border-white/20">
                <Link href={`/${lang}/programs`}>{t.hero.explore}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY FAMILIES CHOOSE BBA (Light Theme) */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="container-tight relative z-10">
          <div className="text-center mb-12 sm:mb-20 space-y-4">
            <h2 className="text-2xl sm:text-5xl font-black text-primary uppercase tracking-tight">{t.why.title}</h2>
            <p className="text-lg sm:text-2xl font-black text-secondary italic leading-tight px-4">{t.why.subtitle}</p>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full mt-4" />
            <p className="text-slate-500 max-w-3xl mx-auto font-bold text-sm sm:text-lg leading-relaxed mt-6 px-4">{t.why.intro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4">
            {t.why.items.map((item, idx) => (
              <div key={idx} className="bg-white p-8 sm:p-10 rounded-[2rem] border border-slate-100 space-y-6 hover:bg-white hover:shadow-2xl transition-all group border-b-8 border-b-transparent hover:border-b-secondary">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl bg-slate-50 shadow-inner flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <h3 className="font-black text-lg sm:text-xl text-primary leading-tight uppercase">{item.title}</h3>
                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — EXPLORE OUR ONLINE PROGRAMS (Visual Cards) */}
      <section className="section-padding bg-white">
        <div className="container-tight px-4">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <h2 className="text-2xl sm:text-5xl font-black text-primary uppercase tracking-tight">{t.programs.title}</h2>
            <p className="text-lg sm:text-2xl font-black text-secondary italic">{t.programs.subtitle}</p>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {t.programs.items.map((prog) => (
              <div key={prog.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <Image src={prog.image} alt={prog.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                </div>
                <div className="p-8 sm:p-10 flex-1 flex flex-col space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-primary group-hover:text-secondary transition-colors duration-300 leading-tight">
                    {prog.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-base leading-relaxed">
                    {prog.desc}
                  </p>
                  <div className="pt-6 mt-auto">
                    <Button asChild variant="outline" className="w-full rounded-xl h-12 sm:h-14 border-primary/20 text-primary font-black text-xs sm:text-sm hover:bg-primary hover:text-white transition-all">
                      <Link href={`/${lang}/programs/${prog.id}`}>
                        {isAr ? 'اعرف المزيد' : 'Learn More'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center px-4">
            <Button asChild size="lg" className="h-14 sm:h-16 px-10 sm:px-12 rounded-2xl bg-primary hover:bg-secondary font-black transition-all shadow-xl">
               <Link href={`/${lang}/programs`}>{t.programs.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4 — ABOUT BBA (Editorial) */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="container-tight px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
             <div className="relative aspect-[4/3] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white group order-2 lg:order-1">
                <Image src="https://picsum.photos/seed/bba-about/1000/800" alt="Academy Learning" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
             </div>
             <div className="space-y-8 order-1 lg:order-2">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-5xl font-black text-primary uppercase tracking-tight leading-tight">{t.about.title}</h2>
                  <p className="text-lg sm:text-2xl font-black text-secondary italic leading-tight">{t.about.subtitle}</p>
                  <div className="h-1.5 w-20 bg-secondary rounded-full" />
                </div>
                <div className="space-y-6 text-slate-600 font-medium text-sm sm:text-lg leading-relaxed">
                   <p className="font-black text-primary text-base sm:text-xl border-l-4 border-secondary pl-6 py-2">{t.about.text1}</p>
                   <p>{t.about.text2}</p>
                </div>
                <Button asChild className="h-14 px-10 rounded-2xl bg-primary hover:bg-accent font-black transition-all shadow-xl w-full sm:w-auto">
                  <Link href={`/${lang}/about`}>{t.about.cta}</Link>
                </Button>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — EDUCATIONAL PLANNING & FUTURE PATHWAYS (Contrast) */}
      <section className="section-padding bg-primary text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.05]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <pattern id="plan-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 60 M 30 0 L 0 30 M 60 30 L 30 60" stroke="white" strokeWidth="1" fill="none" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#plan-pattern)" />
            </svg>
         </div>
         
         <div className="container-tight relative z-10 px-4">
            <div className="text-center mb-12 sm:mb-20 space-y-6">
               <h2 className="text-2xl sm:text-6xl font-black uppercase tracking-tight drop-shadow-md">{t.planning.title}</h2>
               <p className="text-lg sm:text-3xl font-black text-secondary italic">{t.planning.subtitle}</p>
               <div className="h-1.5 w-32 bg-secondary mx-auto rounded-full mt-4" />
               <p className="text-white/70 max-w-3xl mx-auto font-bold text-sm sm:text-lg leading-relaxed mt-6">{t.planning.intro}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               {t.planning.items.map((item, idx) => (
                 <div key={idx} className="bg-white rounded-[2rem] p-8 sm:p-10 border border-white/10 hover:bg-slate-50 transition-all group flex flex-col h-full hover:-translate-y-2 shadow-2xl">
                    <div className="h-14 w-14 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-xl mb-6 group-hover:rotate-12 transition-transform">
                       <Compass className="h-7 w-7" />
                    </div>
                    <h3 className="font-black text-lg sm:text-xl mb-4 uppercase tracking-tight text-primary transition-colors">{item.title}</h3>
                    <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed mb-8 flex-1">{item.desc}</p>
                    <Button asChild variant="link" className="text-secondary font-black uppercase tracking-widest p-0 justify-start hover:text-primary transition-colors text-xs">
                       <Link href={`/${lang}/planning#${item.id}`}>
                          {t.planning.details}
                          {isAr ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                       </Link>
                    </Button>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 6 — WHAT PARENTS SAY (Cards) */}
      <section className="section-padding bg-white">
         <div className="container-tight px-4">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
               <h2 className="text-2xl sm:text-5xl font-black text-primary uppercase tracking-tight">{t.testimonials.title}</h2>
               <p className="text-lg sm:text-2xl font-black text-secondary italic">{t.testimonials.subtitle}</p>
               <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.testimonials.items.map((test, idx) => (
                <div key={idx} className="bg-slate-50 p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 relative space-y-6 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-slate-600 font-bold italic leading-relaxed text-sm sm:text-lg">"{test.text}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black shadow-inner">
                      {test.name[0]}
                    </div>
                    <div>
                      <div className="font-black text-primary text-sm sm:text-base">{test.name}</div>
                      <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{test.role}</div>
                    </div>
                  </div>
                  <Quote className="absolute top-8 right-8 h-12 w-12 text-primary/5 group-hover:text-secondary/10 transition-colors" />
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* SECTION 7 — FREQUENTLY ASKED QUESTIONS (Compact) */}
      <section className="section-padding bg-slate-50 border-y border-slate-100">
         <div className="container-tight px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
               <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4">
                     <h2 className="text-2xl sm:text-5xl font-black text-primary uppercase tracking-tight">{t.faq.title}</h2>
                     <p className="text-lg sm:text-2xl font-black text-secondary italic">{t.faq.subtitle}</p>
                     <div className="h-1.5 w-24 bg-secondary rounded-full" />
                  </div>
                  <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-primary hover:bg-secondary transition-all w-full sm:w-auto shadow-lg">
                     <Link href={`/${lang}/guide#courses-faqs`}>{isAr ? 'عرض جميع الأسئلة' : 'View All FAQs'}</Link>
                  </Button>
               </div>
               
               <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-premium border border-slate-100">
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {t.faq.items.map((item, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`} className="border-2 rounded-2xl px-6 bg-slate-50/50 hover:bg-white transition-all">
                        <AccordionTrigger className="hover:no-underline font-black text-primary text-start text-sm sm:text-lg py-6">
                           {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-500 font-bold leading-relaxed pb-6 pt-2 border-t border-slate-100 text-xs sm:text-base">
                           {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 8 — FINAL ENROLLMENT CALL TO ACTION (Premium) */}
      <section className="section-padding bg-primary relative overflow-hidden">
         <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 blur-[150px] rounded-full" />
         </div>
         
         <div className="container-tight relative z-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch border border-white/20">
               <div className="p-8 sm:p-16 flex-1 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-5xl font-black text-primary uppercase tracking-tight leading-tight">{t.cta.title}</h2>
                    <p className="text-lg sm:text-2xl font-black text-secondary italic leading-tight">{t.cta.subtitle}</p>
                  </div>
                  <p className="text-slate-500 font-bold text-sm sm:text-lg leading-relaxed">{t.cta.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                     <Button asChild size="lg" className="h-14 sm:h-16 px-10 rounded-2xl bg-secondary hover:bg-primary text-white font-black text-base sm:text-lg transition-all shadow-xl">
                        <Link href={`/${lang}/enroll`}>{t.cta.primary}</Link>
                     </Button>
                     <Button asChild variant="outline" size="lg" className="h-14 sm:h-16 px-10 rounded-2xl border-2 border-primary/20 text-primary font-black hover:bg-primary hover:text-white transition-all">
                        <Link href={`/${lang}/contact`}>{t.cta.secondary}</Link>
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
