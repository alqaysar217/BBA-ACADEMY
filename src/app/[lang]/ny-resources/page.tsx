
'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  MapPin, 
  GraduationCap, 
  XCircle, 
  BookOpen, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function NyResourcesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = {
    hero: {
      title: isAr ? 'مركز موارد نيويورك للتعليم المنزلي' : 'New York Homeschool Resource Center',
      subtitle: isAr ? 'كل ما تحتاج لمعرفته حول التعليم المنزلي في ولاية نيويورك.' : 'Everything You Need to Know About Homeschooling in New York.',
      intro: isAr 
        ? 'تتمتع ولاية نيويورك ببعض من أكثر لوائح التعليم المنزلي تفصيلاً في الولايات المتحدة. وبينما قد تبدو العملية مرهقة، فإن فهم المتطلبات يصبح أسهل بكثير مع التوجيه الصحيح.'
        : 'New York has some of the most detailed homeschool regulations in the United States. While the process may seem overwhelming, understanding the requirements becomes much easier with the right guidance.',
      btn: isAr ? 'ابدأ الاستكشاف' : 'Start Exploring'
    },
    navigation: {
      title: isAr ? 'محتويات الدليل' : 'In this Guide',
      steps: isAr ? 'خطوات العملية' : 'Process Steps',
      college: isAr ? 'المسارات الجامعية' : 'College Pathways',
      mistakes: isAr ? 'أخطاء شائعة' : 'Common Mistakes',
      support: isAr ? 'دعم الأكاديمية' : 'Academy Support'
    },
    introSection: {
      title: isAr ? 'التعليم المنزلي في نيويورك' : 'Homeschooling in New York',
      subtitle: isAr ? 'نساعد العائلات في التنقل بين متطلبات نيويورك بكل ثقة.' : "Helping families navigate New York's homeschool requirements with confidence.",
      content1: isAr
        ? 'تمتلك ولاية نيويورك بعضاً من أكثر لوائح التعليم المنزلي شمولاً في الولايات المتحدة. وبينما قد تبدو العملية مرهقة في البداية، فإن فهم المتطلبات يصبح أسهل بكثير مع التوجيه الصحيح.'
        : "New York has some of the most comprehensive homeschool regulations in the United States. While the process may seem overwhelming at first, understanding the requirements becomes much easier with the right guidance.",
      content2: isAr
        ? 'في أكاديمية بنين وبنات (BBA)، قضينا سنوات في دعم عائلات التعليم المنزلي في نيويورك ومساعدة أولياء الأمور على فهم متطلبات الولاية. تم إنشاء مركز الموارد هذا لتوفير معلومات واضحة وموثوقة وإرشادات عملية طوال رحلة التعليم المنزلي الخاصة بك.'
        : "At Baneen and Banaat Academy (BBA), we have spent years supporting homeschool families in New York and helping parents understand state requirements. This resource center was created to provide clear, reliable information and practical guidance throughout your homeschooling journey.",
      footer: isAr ? 'سواء كنت بدأت للتو أو كنت تقوم بالفعل بتعليم طفلك منزلياً، فنحن هنا للمساعدة.' : "Whether you're just getting started or already homeschooling your child, we're here to help."
    },
    process: {
      title: isAr ? 'عملية التعليم المنزلي في نيويورك' : 'The Homeschool Process in New York',
      desc: isAr 
        ? 'يتبع التعليم المنزلي في نيويورك عملية منظمة مصممة لمساعدة العائلات على تلبية متطلبات الولاية.'
        : 'Homeschooling in New York follows a structured process designed to help families meet state requirements.',
      howBbaHelps: isAr ? 'كيف تساعد BBA' : 'How BBA Helps',
      steps: [
        {
          id: 'step1',
          num: 1,
          title: isAr ? 'خطاب النوايا (LOI)' : 'Notice of Intent (LOI)',
          content: isAr
            ? 'تبدأ رحلة التعليم المنزلي بخطاب النوايا (LOI). هذه رسالة بسيطة تبلغ منطقتك التعليمية المحلية بأنك تنوي تعليم طفلك منزلياً للعام الدراسي القادم. وهي تخطر المنطقة رسمياً بأن طفلك سيتلقى تعليمه من خلال برنامج تعليم منزلي بدلاً من حضور المدرسة العامة.'
            : 'The homeschooling journey begins with the Notice of Intent (LOI). This is a simple letter informing your local school district that you intend to homeschool your child for the upcoming school year. It officially notifies the district that your child will be educated through a home instruction program.',
          bba: isAr
            ? 'إذا كانت عائلتك مسجلة في BBA، فلن تضطر إلى التنقل في هذه العملية بمفردك. يوفر فريقنا إرشادات خطوة بخطوة حول متى يجب تقديم خطاب النوايا والإجابة على أي أسئلة.'
            : 'If your family is enrolled with BBA, you won\'t have to navigate this process alone. Our team provides step-by-step guidance on when to submit and answering your questions.'
        },
        {
          id: 'step2',
          num: 2,
          title: isAr ? 'خطة التعليم المنزلي الفردية (IHIP)' : 'Individualized Home Instruction Plan (IHIP)',
          content: isAr
            ? 'بعد تقديم خطاب النوايا، يقوم أولياء الأمور بإعداد خطة التعليم المنزلي الفردية. توضح خطة IHIP الخطة التعليمية للعام الدراسي، بما في ذلك المواد التي سيتم تدريسها وفقاً للوائح التعليم المنزلي في نيويورك.'
            : 'After submitting the LOI, parents prepare an Individualized Home Instruction Plan (IHIP). The IHIP outlines the educational plan for the school year, including the subjects required by NY regulations.',
          bba: isAr
            ? 'نحن نساعد العائلات المسجلة في BBA على فهم المتطلبات التعليمية في نيويورك ونقدم التوجيه أثناء إعداد خطة الـ IHIP، مما يضمن شعوركم بالثقة.'
            : 'We help families enrolled with BBA understand NY requirements and provide guidance while preparing the IHIP, ensuring you feel confident.'
        },
        {
          id: 'step3',
          num: 3,
          title: isAr ? 'التقارير الفصلية' : 'Quarterly Reports',
          content: isAr
            ? 'طوال العام الدراسي، يقدم أولياء الأمور تقارير فصلية توثق التقدم التعليمي لطلابهم. توفر هذه التقارير ملخصاً للتعليم المكتمل خلال كل فصل، بما في ذلك الحضور والتقدم الأكاديمي.'
            : 'Throughout the school year, parents submit Quarterly Reports documenting progress. These reports summarize instruction completed each quarter, including attendance and academic progress.',
          bba: isAr
            ? 'طوال العام الدراسي، نقوم بإعداد هذه التقارير لطلاب BBA، وتذكير العائلات بالمواعيد النهائية الهامة، وتقديم التوجيه بشأن تقديمها للمنطقة التعليمية.'
            : 'Throughout the school year, we prepare these reports for BBA students, remind families of deadlines, and provide guidance on submission.'
        },
        {
          id: 'step4',
          num: 4,
          title: isAr ? 'التقييم السنوي' : 'Annual Assessment',
          content: isAr
            ? 'في نهاية كل عام دراسي، يكمل الطلاب تقييماً سنوياً كما هو مطلوب بموجب لوائح نيويورك. قد يتضمن ذلك تقييماً موحداً أو طريقة تقييم أخرى مسموح بها.'
            : 'At the end of each school year, students complete an Annual Assessment as required by NY regulations. This may involve standardized testing or other permitted methods.',
          bba: isAr
            ? 'نحن نساعد عائلات BBA في فهم متطلبات التقييم السنوي ونساعدهم في إعداد الوثائق اللازمة بناءً على لوائح ولاية نيويورك الحالية.'
            : 'We assist BBA families in understanding the Annual Assessment requirements and help them prepare the necessary documentation.'
        }
      ]
    },
    college: {
      title: isAr ? 'المسارات الجامعية لطلاب نيويورك' : 'College Pathways for NY Students',
      subtitle: isAr ? 'الاستعداد للجامعة يبدأ قبل التخرج بوقت طويل' : 'Preparing for College Starts Long Before Graduation',
      q: isAr ? 'هل سيتمكن طفلي من دخول الجامعة بعد التعليم المنزلي؟' : '"Will my child be able to attend college after homeschooling?"',
      a: isAr ? 'الإجابة هي نعم.' : 'The answer is YES.',
      desc: isAr
        ? 'في كل عام، يواصل خريجو التعليم المنزلي في نيويورك تعليمهم في كليات المجتمع والجامعات. ومع ذلك، تختلف شروط القبول، مما يجعل التخطيط المبكر أساسياً. يجب الاحتفاظ بسجلات منظمة تشمل كشوف الدرجات وسجلات الحضور.'
        : 'Every year, NY homeschool graduates continue to colleges and universities. However, requirements vary, making early planning essential. Organized records like transcripts and attendance are vital.',
      howBbaHelps: isAr 
        ? 'تتلقى عائلات BBA توجيهاً شخصياً طوال سنوات المرحلة الثانوية للبقاء على المسار الصحيح وإعداد السجلات وفهم مسارات التخرج.'
        : 'BBA families receive personalized guidance throughout high school to stay on track, prepare records, and understand graduation pathways.',
    },
    mistakes: {
      title: isAr ? 'أخطاء شائعة يجب تجنبها' : 'Common Mistakes to Avoid',
      subtitle: isAr ? 'الأخطاء الصغيرة اليوم قد تخلق تحديات كبيرة غداً.' : 'Small Mistakes Today Can Create Bigger Challenges Tomorrow.',
      items: [
        isAr ? 'الانتظار حتى اللحظة الأخيرة لتقديم الوثائق المطلوبة.' : 'Waiting until the last minute to submit required documents.',
        isAr ? 'نسيان الاحتفاظ بنسخ من السجلات الهامة (IHIP، التقارير).' : 'Forgetting to keep copies of important records (IHIP, Reports).',
        isAr ? 'تأخير التفكير في التخرج أو التخطيط للجامعة.' : 'Delaying graduation and college planning.',
        isAr ? 'افتراض أن كل كليات نيويورك تطلب نفس الوثائق.' : 'Assuming every NY college requires the same admission documents.',
        isAr ? 'تجاوز المواعيد النهائية التي تحددها المنطقة التعليمية.' : 'Missing deadlines established by your local school district.'
      ],
      tipTitle: isAr ? 'نصيحة BBA' : 'BBA Tip',
      tipContent: isAr
        ? 'أنشئ مجلداً مخصصاً للتعليم المنزلي لتخزين كل وثيقة مهمة. مسك السجلات الجيد يجعل التخرج والتقديم للجامعات أسهل بكثير.'
        : 'Create a dedicated homeschool folder for every important document. Good recordkeeping makes graduation and college apps easier.'
    },
    support: {
      title: isAr ? 'كيف تدعم BBA عائلات نيويورك' : 'How BBA Supports NY Families',
      items: [
        isAr ? 'فهم متطلبات التعليم المنزلي في نيويورك' : 'Understanding NY homeschool requirements',
        isAr ? 'توجيه بشأن خطاب النوايا (LOI)' : 'Guidance with the Notice of Intent (LOI)',
        isAr ? 'المساعدة في فهم خطة الـ IHIP' : 'Assistance understanding the IHIP',
        isAr ? 'توجيه بشأن التقارير الفصلية' : 'Quarterly Report guidance',
        isAr ? 'توجيه بشأن التقييم السنوي' : 'Annual Assessment guidance',
        isAr ? 'التخطيط للمرحلة الثانوية' : 'High school planning',
        isAr ? 'التخطيط للتخرج' : 'Graduation planning',
        isAr ? 'توجيه بشأن كشوف الدرجات' : 'Transcript guidance',
        isAr ? 'التخطيط التعليمي بناءً على أهداف طالبك' : 'Educational planning based on student goals',
        isAr ? 'دعم عائلي شخصي ومستمر' : 'Ongoing personalized family support'
      ]
    }
  };

  const menuItems = [
    { id: 'homeschool-intro', label: t.navigation.steps, icon: BookOpen },
    { id: 'college-pathways', label: t.navigation.college, icon: GraduationCap },
    { id: 'common-mistakes', label: t.navigation.mistakes, icon: AlertTriangle },
    { id: 'bba-support', label: t.navigation.support, icon: ShieldCheck },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-16 lg:py-24 overflow-hidden">
        <div className="container-tight relative z-10 text-center space-y-8 px-4">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl animate-in fade-in slide-in-from-top-4 duration-700">
               <MapPin className="h-3 w-3" />
               New York State Guide
             </div>
             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter drop-shadow-2xl">
               {t.hero.title}
             </h1>
             <p className="text-sm sm:text-xl text-white/80 font-bold max-w-2xl mx-auto leading-relaxed">
               {t.hero.subtitle}
             </p>
          </div>
          <p className="text-white/60 max-w-3xl mx-auto italic text-sm sm:text-base border-x border-white/20 px-8">
            {t.hero.intro}
          </p>
          <div className="pt-4">
            <Button onClick={() => scrollToSection('homeschool-intro')} size="lg" className="h-16 px-10 bg-white text-primary hover:bg-secondary hover:text-white font-black rounded-xl shadow-2xl transition-all">
              {t.hero.btn}
              <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container-tight py-12 lg:py-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Narrow Sticky Navigation Sidebar - Improved for Laptop */}
          <aside className="lg:w-64 shrink-0 hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200/50">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Search className="h-3 w-3" />
                  {t.navigation.title}
                </h3>
                <nav className="space-y-1.5">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-start flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md hover:text-secondary font-black text-[11px] text-primary/70 transition-all group"
                    >
                      <item.icon className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="p-6 bg-primary rounded-2xl text-white space-y-4 shadow-lg shadow-primary/10">
                 <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Need Help?</p>
                 <p className="text-xs font-bold leading-relaxed opacity-80">Our team is ready to guide your family through the NY process.</p>
                 <Button asChild variant="secondary" className="w-full h-10 rounded-lg font-black text-[10px] uppercase">
                    <Link href={`/${lang}/contact`}>Contact Us</Link>
                 </Button>
              </div>
            </div>
          </aside>

          {/* Main Content Area - Taking more space and balanced */}
          <div className="flex-1 space-y-24 lg:space-y-32">
            
            {/* Section 1: Intro */}
            <section id="homeschool-intro" className="space-y-10 scroll-mt-32">
               <div className="space-y-8">
                  <h2 className="text-3xl sm:text-4xl font-black text-primary uppercase border-l-8 border-secondary pl-6">
                    {t.introSection.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                     <div className="space-y-6 text-slate-600 font-medium text-sm sm:text-lg leading-relaxed order-2 md:order-1">
                        <p className="text-primary font-black italic">{t.introSection.subtitle}</p>
                        <p>{t.introSection.content1}</p>
                        <p>{t.introSection.content2}</p>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 font-bold text-slate-500 italic text-sm">
                          {t.introSection.footer}
                        </div>
                     </div>
                     <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 order-1 md:order-2">
                        <Image src="/newyork.png" alt="New York Homeschooling" fill className="object-cover" unoptimized />
                     </div>
                  </div>
               </div>

               {/* The 4 Steps Grid - More compact for Laptop */}
               <div className="pt-16 space-y-12">
                  <div className="text-center space-y-4">
                     <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">{t.process.title}</h2>
                     <div className="h-1 w-16 bg-secondary mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     {t.process.steps.map((step) => (
                       <div key={step.id} className="group flex flex-col md:flex-row items-stretch bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                          <div className="md:w-16 bg-primary text-white flex items-center justify-center font-black text-2xl p-4 md:p-0 shrink-0">
                             {step.num}
                          </div>
                          <div className="flex-1 p-6 sm:p-10 space-y-6">
                             <div className="space-y-3">
                                <h3 className="text-lg sm:text-2xl font-black text-primary uppercase leading-tight group-hover:text-secondary transition-colors">{step.title}</h3>
                                <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed opacity-90">
                                   {step.content}
                                </p>
                             </div>
                             <div className="bg-slate-50/80 p-5 rounded-xl border-l-4 border-secondary space-y-2">
                                <div className="flex items-center gap-2">
                                   <ShieldCheck className="h-4 w-4 text-secondary" />
                                   <span className="font-black text-secondary uppercase tracking-widest text-[10px]">{t.process.howBbaHelps}</span>
                                </div>
                                <p className="text-slate-700 font-bold text-xs sm:text-sm italic leading-relaxed">
                                   {step.bba}
                                </p>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Section 2: College Pathways */}
            <section id="college-pathways" className="scroll-mt-32 bg-slate-900 text-white rounded-3xl overflow-hidden relative">
               <div className="p-8 sm:p-12 lg:p-20 space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                     <div className="space-y-8">
                        <div className="space-y-4">
                           <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight">{t.college.title}</h2>
                           <p className="text-secondary font-black italic text-lg">{t.college.subtitle}</p>
                           <div className="h-1 w-12 bg-secondary rounded-full" />
                        </div>
                        
                        <div className="space-y-6">
                           <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 space-y-4">
                             <p className="text-lg sm:text-xl font-black text-white leading-tight italic">"{t.college.q}"</p>
                             <p className="text-2xl sm:text-4xl font-black text-secondary">{t.college.a}</p>
                           </div>
                           <p className="text-white/70 font-medium text-sm sm:text-base leading-relaxed">{t.college.desc}</p>
                        </div>
                     </div>
                     <div className="bg-white p-8 sm:p-10 rounded-2xl space-y-6 shadow-2xl border-b-8 border-secondary">
                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                           <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center">
                              <Target className="h-5 w-5" />
                           </div>
                           <span className="font-black text-primary uppercase tracking-widest text-xs">{t.process.howBbaHelps}</span>
                        </div>
                        <p className="text-slate-600 font-bold text-sm sm:text-base leading-relaxed italic">
                           {t.college.howBbaHelps}
                        </p>
                        <p className="text-secondary font-black text-[10px] uppercase tracking-[0.2em] text-center border-t border-slate-50 pt-4 opacity-60">
                           Planning ahead creates more opportunities.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* Section 3: Common Mistakes */}
            <section id="common-mistakes" className="space-y-12 scroll-mt-32">
               <div className="text-center space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase flex items-center justify-center gap-4 tracking-tighter">
                     <XCircle className="h-6 w-6 text-red-500" />
                     {t.mistakes.title}
                  </h2>
                  <p className="text-red-500 font-black italic text-sm">{t.mistakes.subtitle}</p>
                  <div className="h-1 w-12 bg-red-100 mx-auto rounded-full" />
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                  <div className="lg:col-span-3 space-y-3">
                     {t.mistakes.items.map((item, idx) => (
                       <div key={idx} className="flex items-center gap-4 p-5 bg-red-50/50 rounded-xl border border-red-100 transition-all hover:bg-white hover:shadow-lg group">
                          <div className="h-8 w-8 rounded-lg bg-red-500 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
                             {idx + 1}
                          </div>
                          <span className="text-xs sm:text-base font-bold text-slate-700 leading-snug">{item}</span>
                       </div>
                     ))}
                  </div>
                  
                  <div className="lg:col-span-2 bg-amber-50 p-8 rounded-2xl border-2 border-amber-200 flex flex-col justify-center gap-6 relative group shadow-sm">
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                           <Lightbulb className="h-6 w-6" />
                        </div>
                        <h3 className="font-black text-amber-900 uppercase tracking-widest text-base">{t.mistakes.tipTitle}</h3>
                     </div>
                     <p className="text-sm sm:text-lg font-black text-amber-900 italic leading-relaxed border-l-4 border-amber-500/30 pl-4">
                        {t.mistakes.tipContent}
                     </p>
                  </div>
               </div>
            </section>

            {/* Section 4: Support Areas */}
            <section id="bba-support" className="scroll-mt-32 bg-slate-50 p-8 sm:p-12 lg:p-20 rounded-3xl border border-slate-200 space-y-12 shadow-inner relative">
               <div className="space-y-4 text-center">
                  <h2 className="text-2xl sm:text-4xl font-black text-primary uppercase tracking-tight">{t.support.title}</h2>
                  <div className="h-1 w-16 bg-secondary mx-auto rounded-full" />
                  <p className="text-slate-500 font-bold text-sm sm:text-base max-w-xl mx-auto">
                    {isAr ? 'نحن نؤمن بأن أولياء الأمور لا ينبغي أن يضطروا لاكتشاف كل شيء بمفردهم.' : 'We believe parents should never have to figure everything out on their own.'}
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {t.support.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-secondary/20 group">
                       <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-all">
                          <CheckCircle2 className="h-4 w-4 text-secondary group-hover:text-white" />
                       </div>
                       <span className="text-xs sm:text-sm font-black text-primary/80 group-hover:text-primary transition-colors">{item}</span>
                    </div>
                  ))}
               </div>

               <p className="text-center text-slate-400 font-bold text-[10px] sm:text-xs border-t border-slate-200 pt-8 leading-relaxed italic">
                 {isAr ? '* تذكر: يظل أولياء الأمور مسؤولين عن الامتثال للوائح التعليم المنزلي في ولاية نيويورك.' : '* Remember: Parents remain responsible for complying with New York State homeschool regulations.'}
               </p>
            </section>

            {/* Final Contact CTA */}
            <section className="text-center space-y-10 bg-primary text-white p-10 sm:p-16 rounded-3xl shadow-2xl relative overflow-hidden group border-b-[10px] border-secondary">
               <div className="space-y-4 relative z-10">
                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic">
                    {isAr ? 'هل لديك أسئلة؟' : 'Have Questions?'}
                  </h2>
                  <p className="text-base sm:text-xl font-bold text-white/90 max-w-2xl mx-auto leading-relaxed opacity-80">
                    {isAr 
                      ? 'رحلة كل عائلة فريدة من نوعها. نحن هنا لنكون شريكك الموثوق في كل خطوة.' 
                      : 'Every family\'s journey is unique. We are here to be your trusted partner every step of the way.'}
                  </p>
               </div>
               
               <div className="pt-4 relative z-10">
                  <Button asChild size="lg" className="h-16 px-12 bg-secondary hover:bg-white hover:text-secondary text-white font-black text-lg rounded-xl shadow-2xl transition-all active:scale-95 group/btn">
                    <Link href={`/${lang}/contact`} className="flex items-center gap-3">
                      {isAr ? 'تواصل مع BBA الآن' : 'Contact BBA Now'}
                      {isAr ? <ChevronLeft className="h-6 w-6 group-hover/btn:-translate-x-1 transition-transform" /> : <ChevronRight className="h-6 w-6 group-hover/btn:translate-x-1 transition-transform" />}
                    </Link>
                  </Button>
               </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
