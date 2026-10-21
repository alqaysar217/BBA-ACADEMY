
import { type Locale } from '@/lib/i18n/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  GraduationCap, 
  BookOpen, 
  Users, 
  FileText, 
  Target,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default async function PlanningPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    hero: {
      title: isAr ? 'التخطيط التعليمي والمسارات المستقبلية' : 'Educational Planning & Future Pathways',
      intro: isAr 
        ? 'رحلة كل طالب التعليمية فريدة من نوعها. نحن نعمل بشكل وثيق مع العائلات لمساعدة الطلاب على اتباع مسارات تعليمية معترف بها تدعم أهدافهم الأكاديمية وتعدهم للتخرج والتعليم العالي.'
        : 'Every student’s educational journey is unique. We work closely with families to help students follow recognized educational pathways that support their academic goals and prepare them for graduation and higher education.',
      guide: isAr 
        ? 'يقوم فريقنا بتوجيه العائلات خلال كل خطوة من العملية، ومساعدتهم على فهم المتطلبات، والتخطيط المسبق، واتخاذ قرارات تعليمية مدروسة.'
        : 'Our team guides families through every step of the process, helping them understand requirements, plan ahead, and make informed educational decisions.'
    },
    sections: [
      {
        id: 'graduation',
        title: isAr ? 'تخطيط التخرج' : 'Graduation Planning',
        subtitle: isAr ? 'الاستعداد للتخرج وما بعده' : 'Preparing Students for Graduation and Beyond',
        icon: GraduationCap,
        image: '/planning-1.png',
        content: isAr
          ? 'المرحلة الثانوية هي واحدة من أهم مراحل الرحلة التعليمية للطالب. القرارات المتخذة خلال هذه السنوات يمكن أن يكون لها تأثير دائم على التخرج والقبول في الجامعات وفرص العمل والنجاح المستقبلي. نساعد الطلاب على تتبع الساعات المعتمدة وضمان استيفاء جميع المتطلبات اللازمة للحصول على الشهادة الثانوية بنجاح.'
          : 'High school is one of the most important stages of a student\'s educational journey. The decisions made during these years can have a lasting impact on graduation, college admissions, career opportunities, and future success. We help students track credits and ensure all necessary requirements are met for a successful high school diploma.'
      },
      {
        id: 'course',
        title: isAr ? 'تخطيط الدورات' : 'Course Planning',
        subtitle: isAr ? 'اختيارات ذكية لمستقبل مشرق' : 'Smart Choices for a Bright Future',
        icon: BookOpen,
        image: '/planning-2.png',
        content: isAr
          ? 'على عكس المرحلتين الابتدائية والمتوسطة، تتطلب المرحلة الثانوية تخطيطاً دقيقاً. يجب على العائلات تتبع الدورات المكتملة بعناية، والحفاظ على سجلات أكاديمية دقيقة، والتأكد من استمرار الطلاب في إحراز تقدم مطرد نحو أهدافهم التعليمية. نحن نوجهك في اختيار المواد التي تتناسب مع ميول الطالب وتطلعاته الجامعية.'
          : 'Unlike elementary and middle school, high school requires thoughtful planning. Families should carefully track completed courses, maintain accurate academic records, and ensure students continue making steady progress toward their educational goals. We guide you in choosing subjects that align with the student\'s interests and university aspirations.'
      },
      {
        id: 'guidance',
        title: isAr ? 'التوجيه الشخصي' : 'Personal Guidance',
        subtitle: isAr ? 'دعم فردي لكل طالب' : 'Individual Support for Every Learner',
        icon: Users,
        image: '/planning-3.png',
        content: isAr
          ? 'نحن نؤمن بأن رحلة كل طالب التعليمية فريدة من نوعها. ولهذا السبب نعمل بشكل فردي مع العائلات لمساعدة الطلاب على البقاء منظمين واتخاذ قرارات تعليمية مدروسة والاستعداد بثقة للحياة بعد المدرسة الثانوية. يتلقى الطلاب المسجلون توجيهاً مستمراً كلما ظهرت أسئلة أو تحديات.'
          : 'We believe every student\'s educational journey is unique. That\'s why we work one-on-one with families to help students stay organized, make informed educational decisions, and confidently prepare for life after high school. Enrolled students receive ongoing support whenever questions or challenges arise.'
      },
      {
        id: 'records',
        title: isAr ? 'السجلات الأكاديمية' : 'Academic Records',
        subtitle: isAr ? 'التنظيم هو مفتاح النجاح' : 'Organization is the Key to Success',
        icon: FileText,
        image: '/planning-4.png',
        content: isAr
          ? 'إن الاحتفاظ بوثائق منظمة طوال المرحلة الثانوية - بما في ذلك كشوف الدرجات والدرجات وسجلات الحضور والدورات الدراسية وسجلات التعليم المنزلي - يمكن أن يجعل التحولات التعليمية المستقبلية أسهل بكثير. نحن نساعد العائلات في فهم كيفية بناء سجل أكاديمي قوي يعكس قدرات الطالب الحقيقية.'
          : 'Keeping organized documentation throughout high school—including transcripts, grades, attendance records, coursework, and homeschool records—can make future educational transitions much easier. We help families understand how to build a strong academic record that reflects the student\'s true abilities.'
      },
      {
        id: 'college',
        title: isAr ? 'التحضير للكلية والمستقبل' : 'College & Future Preparation',
        subtitle: isAr ? 'خطوات مبكرة لنجاح طويل الأمد' : 'Early Steps for Long-term Success',
        icon: Target,
        image: '/planning-5.png',
        content: isAr
          ? 'يعد الاستعداد للقبول في الكلية والمنح الدراسية عملية مستمرة تبدأ قبل وقت طويل من السنة الأخيرة. نحن نساعد الطلاب في فهم متطلبات القبول في الجامعات المختلفة، والتحضير للاختبارات القياسية، وجمع الوثائق اللازمة للتقديم، مما يقلل من التوتر خلال السنة الدراسية الأخيرة.'
          : 'Preparing for college admissions and scholarships is an ongoing process that starts long before senior year. We assist students in understanding the entry requirements of different universities, preparing for standardized tests, and gathering necessary documents, reducing stress during the final school year.'
      }
    ],
    why: {
      title: isAr ? 'لماذا يعد التخطيط مهماً؟' : 'Why Planning Matters',
      items: [
        isAr ? 'يساعد الطلاب على البقاء على المسار الصحيح للتخرج.' : 'Helps students stay on track for graduation.',
        isAr ? 'يبسط القبول في الجامعات وطلبات المنح الدراسية.' : 'Simplifies college admissions and scholarship applications.',
        isAr ? 'ينشئ سجلات أكاديمية منظمة.' : 'Creates organized academic records.',
        isAr ? 'يقلل التوتر خلال السنة الأخيرة.' : 'Reduces stress during the final year.',
        isAr ? 'يساعد العائلات على الاستعداد لفرص تعليمية مستقبلية.' : 'Helps families prepare for future educational opportunities.'
      ]
    },
    howBbaHelps: {
      title: isAr ? 'كيف تساعد BBA' : 'How BBA Helps',
      intro: isAr 
        ? 'العائلات المسجلة في أكاديمية بنين وبنات لا تضطر إلى التنقل في تخطيط المرحلة الثانوية بمفردها.'
        : 'Families enrolled with Baneen and Banaat Academy don\'t have to navigate high school planning alone.',
      list: [
        isAr ? 'التخطيط التعليمي الشامل' : 'Comprehensive educational planning',
        isAr ? 'مراجعة التقدم الأكاديمي دورياً' : 'Reviewing academic progress regularly',
        isAr ? 'تخطيط مسار التخرج بدقة' : 'Graduation pathway planning',
        isAr ? 'توجيه وإعداد كشوف الدرجات' : 'Transcript guidance and preparation',
        isAr ? 'التحضير للكلية والجامعات' : 'College and university preparation',
        isAr ? 'دعم تعليمي مستمر طوال العام' : 'Ongoing educational support all year'
      ]
    },
    quote: {
      text: isAr 
        ? 'أفضل وقت للاستعداد للتخرج هو قبل وقت طويل من السنة الأخيرة. التخطيط المبكر يخلق المزيد من الفرص ومفاجآت أقل.'
        : 'The best time to prepare for graduation is long before senior year. Early planning creates more opportunities and fewer surprises.',
      author: isAr ? 'مستشار BBA' : 'BBA Counselor'
    },
    cta: {
      title: isAr ? 'هل أنت مستعد للبدء؟' : 'Ready to Start?',
      btn: isAr ? 'سجل الآن' : 'Enroll Now'
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 lg:py-24 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <pattern id="plan-hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#plan-hero-grid)" />
            </svg>
         </div>
         <div className="container-tight relative z-10 text-center space-y-8 px-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight drop-shadow-xl leading-tight">{t.hero.title}</h1>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg sm:text-xl font-bold leading-relaxed">{t.hero.intro}</p>
              <p className="text-sm sm:text-lg text-white/70 italic">{t.hero.guide}</p>
            </div>
         </div>
      </section>

      {/* Main Sections - The Five Cards */}
      <section className="py-16 lg:py-24 container-tight space-y-8 lg:space-y-12 px-4">
         {t.sections.map((section) => (
           <div key={section.id} id={section.id} className="scroll-mt-32">
              <Card className="rounded-2xl border-none shadow-premium overflow-hidden bg-slate-50/50 hover:shadow-xl transition-all duration-700 group">
                 <div className="flex flex-col md:flex-row items-stretch">
                    <div className="md:w-1/4 bg-primary text-white p-8 lg:p-10 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden shrink-0 min-h-[200px]">
                       {/* Background Image Replace Icons */}
                       <div className="absolute inset-0 opacity-[0.15] group-hover:scale-110 transition-transform duration-1000">
                          <Image 
                            src={section.image} 
                            alt={section.title} 
                            fill 
                            className="object-cover"
                            unoptimized
                          />
                       </div>
                       <section.icon className="h-10 w-10 lg:h-12 lg:w-12 text-secondary relative z-10 drop-shadow-lg" />
                       <h2 className="text-xl lg:text-2xl font-black uppercase tracking-tight relative z-10 leading-tight drop-shadow-md">{section.title}</h2>
                    </div>
                    <div className="flex-1 p-8 lg:p-12 space-y-6 bg-white">
                       <h3 className="text-lg lg:text-2xl font-black text-primary">{section.subtitle}</h3>
                       <p className="text-sm lg:text-lg text-slate-600 leading-relaxed font-medium">
                          {section.content}
                       </p>
                       <div className="pt-2">
                          <div className="h-1 w-16 bg-secondary rounded-full" />
                       </div>
                    </div>
                 </div>
              </Card>
           </div>
         ))}
      </section>

      {/* Why Planning Matters Section */}
      <section className="py-16 lg:py-24 bg-slate-50 border-y border-slate-100">
         <div className="container-tight grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4">
            <div className="space-y-8">
               <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">{t.why.title}</h2>
               <div className="space-y-3">
                  {t.why.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 group hover:shadow-md transition-all">
                       <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 group-hover:scale-110 transition-transform" />
                       <span className="font-bold text-slate-700 text-sm lg:text-base">{item}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-primary text-white p-8 lg:p-12 rounded-2xl shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Star className="h-32 w-32 lg:h-48 lg:w-48" />
               </div>
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg">
                        <Users className="h-6 w-6" />
                     </div>
                     <h2 className="text-lg lg:text-xl font-black uppercase tracking-[0.2em]">{t.howBbaHelps.title}</h2>
                  </div>
                  <p className="text-white/80 font-bold text-sm lg:text-lg border-l-4 border-secondary pl-6 py-1">{t.howBbaHelps.intro}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {t.howBbaHelps.list.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                         <div className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                         <span className="font-bold text-xs lg:text-sm opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 lg:py-24 container-tight text-center px-4">
         <Card className="bg-secondary/5 border-2 border-dashed border-secondary/20 rounded-2xl overflow-hidden group hover:bg-secondary/10 transition-all duration-500">
            <CardContent className="p-10 lg:p-20 space-y-8">
               <div className="flex justify-center">
                  <Clock className="h-12 w-12 lg:h-16 lg:w-16 text-secondary animate-pulse" />
               </div>
               <p className="text-xl lg:text-3xl font-black text-primary leading-tight italic max-w-4xl mx-auto transition-transform group-hover:scale-[1.01] duration-700">
                  "{t.quote.text}"
               </p>
               <div className="space-y-2">
                  <div className="h-1 w-16 bg-secondary mx-auto rounded-full" />
                  <p className="text-sm lg:text-lg font-black text-secondary uppercase tracking-[0.3em]">— {t.quote.author}</p>
               </div>
            </CardContent>
         </Card>
      </section>

      {/* Final Enrollment CTA */}
      <section className="py-20 lg:py-32 bg-primary text-white text-center px-4 relative overflow-hidden">
         <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <circle cx="10" cy="10" r="1" fill="white" />
            </svg>
         </div>
         <div className="container-tight relative z-10 space-y-10">
            <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight drop-shadow-xl">{t.cta.title}</h2>
            <div className="pt-4">
              <Button asChild size="lg" className="h-16 lg:h-18 px-10 lg:px-16 text-lg lg:text-xl bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-xl shadow-2xl transition-all active:scale-95 border-2 border-transparent hover:border-secondary">
                 <Link href={`/${lang}/enroll`} className="flex items-center gap-3">
                    {t.cta.btn}
                    {isAr ? <ArrowLeft className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />}
                 </Link>
              </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
