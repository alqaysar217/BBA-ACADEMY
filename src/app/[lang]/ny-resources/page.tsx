
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
  HelpCircle, 
  BookOpen, 
  Calendar, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  MousePointer2, 
  Clock, 
  History, 
  FileSignature 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
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
        ? 'يتبع التعليم المنزلي في نيويورك عملية منظمة مصممة لمساعدة العائلات على توفير تجربة تعليمية منظمة مع تلبية متطلبات الولاية.'
        : 'Homeschooling in New York follows a structured process designed to help families provide an organized educational experience while meeting state requirements.',
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
      image: 'https://picsum.photos/seed/gradny/800/600'
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
    { id: 'homeschool-intro', label: t.navigation.title, icon: BookOpen },
    { id: 'process-steps', label: t.navigation.steps, icon: Clock },
    { id: 'college-pathways', label: t.navigation.college, icon: GraduationCap },
    { id: 'common-mistakes', label: t.navigation.mistakes, icon: AlertTriangle },
    { id: 'bba-support', label: t.navigation.support, icon: ShieldCheck },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/nyhero/1920/1080" 
            alt="New York Education" 
            fill 
            className="object-cover opacity-20 grayscale"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        
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
      <div className="container-tight py-16 lg:py-24 px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Sticky Navigation Sidebar */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  {t.navigation.title}
                </h3>
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-start flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md hover:text-secondary font-black text-xs text-primary/60 transition-all group"
                    >
                      <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="bg-primary text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-16 w-16" />
                 </div>
                 <p className="text-xs font-bold leading-relaxed relative z-10 italic">
                    {isAr ? 'الأهالي مسؤولون عن الامتثال للوائح الولاية، ونحن هنا لتوفير كل الدعم اللازم.' : 'Parents are responsible for state compliance, and we are here to provide all necessary support.'}
                 </p>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-32">
            
            {/* Section 1: Intro */}
            <section id="homeschool-intro" className="space-y-10 scroll-mt-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-black text-primary uppercase border-l-8 border-secondary pl-6">
                    {t.introSection.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                     <div className="space-y-6 text-slate-600 font-medium text-sm sm:text-lg leading-relaxed">
                        <p className="text-primary font-black italic">{t.introSection.subtitle}</p>
                        <p>{t.introSection.content1}</p>
                        <p>{t.introSection.content2}</p>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 font-bold text-slate-500 italic">
                          {t.introSection.footer}
                        </div>
                     </div>
                     <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                        <Image src="https://picsum.photos/seed/nyhomeschool/800/800" alt="NY Homeschooling" fill className="object-cover" unoptimized />
                     </div>
                  </div>
               </div>
            </section>

            {/* Section 2: The 4 Steps */}
            <section id="process-steps" className="space-y-12 scroll-mt-32">
               <div className="text-center space-y-4">
                  <h2 className="text-2xl sm:text-4xl font-black text-primary uppercase tracking-tight">{t.process.title}</h2>
                  <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
                  <p className="text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">{t.process.desc}</p>
               </div>

               <div className="grid grid-cols-1 gap-12">
                  {t.process.steps.map((step) => (
                    <div key={step.id} id={step.id} className="group relative flex flex-col md:flex-row items-stretch bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                       <div className="md:w-20 bg-primary text-white flex items-center justify-center font-black text-4xl p-6 md:p-0 shrink-0">
                          {step.num}
                       </div>
                       <div className="flex-1 p-8 sm:p-12 space-y-8">
                          <div className="space-y-4">
                             <h3 className="text-xl sm:text-3xl font-black text-primary uppercase leading-tight group-hover:text-secondary transition-colors">{step.title}</h3>
                             <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed border-l-2 border-slate-100 pl-6 py-2">
                                {step.content}
                             </p>
                          </div>
                          
                          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 space-y-4 relative group/bba">
                             <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-secondary text-white flex items-center justify-center shadow-lg group-hover/bba:scale-110 transition-transform">
                                   <ShieldCheck className="h-4 w-4" />
                                </div>
                                <span className="font-black text-secondary uppercase tracking-widest text-xs">{t.process.howBbaHelps}</span>
                             </div>
                             <p className="text-slate-700 font-bold text-xs sm:text-base italic leading-relaxed">
                                {step.bba}
                             </p>
                          </div>
                       </div>
                       <div className="hidden xl:block relative w-1/4 overflow-hidden border-l border-slate-100">
                          <Image src={`https://picsum.photos/seed/nystep${step.num}/600/800`} alt={step.title} fill className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" unoptimized />
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Section 3: College Pathways */}
            <section id="college-pathways" className="scroll-mt-32 bg-slate-900 text-white rounded-2xl overflow-hidden relative group">
               <div className="absolute inset-0 opacity-10">
                  <Image src="https://picsum.photos/seed/nygrad/1200/800" alt="NY Graduation" fill className="object-cover grayscale" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
               </div>
               <div className="p-8 sm:p-16 lg:p-24 space-y-12 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="space-y-8">
                        <div className="space-y-4">
                           <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">{t.college.title}</h2>
                           <p className="text-secondary font-black italic text-lg sm:text-xl">{t.college.subtitle}</p>
                           <div className="h-1.5 w-16 bg-secondary rounded-full" />
                        </div>
                        
                        <div className="space-y-6">
                           <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-4 shadow-2xl">
                             <p className="text-lg sm:text-2xl font-black text-white leading-tight italic">"{t.college.q}"</p>
                             <p className="text-2xl sm:text-5xl font-black text-secondary drop-shadow-lg">{t.college.a}</p>
                           </div>
                           <p className="text-white/70 font-medium text-sm sm:text-lg leading-relaxed">{t.college.desc}</p>
                        </div>
                     </div>
                     <div className="bg-white p-8 sm:p-12 rounded-2xl space-y-6 shadow-2xl border-b-8 border-secondary relative overflow-hidden group/card">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover/card:scale-110 transition-transform"><GraduationCap className="h-48 w-48 text-primary" /></div>
                        <div className="flex items-center gap-4 border-b border-slate-100 pb-6 relative z-10">
                           <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                              <Target className="h-6 w-6" />
                           </div>
                           <span className="font-black text-primary uppercase tracking-widest text-sm">{t.process.howBbaHelps}</span>
                        </div>
                        <p className="text-slate-600 font-bold text-sm sm:text-lg leading-relaxed relative z-10 italic">
                           {t.college.howBbaHelps}
                        </p>
                        <p className="text-secondary font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] relative z-10 text-center border-t border-slate-50 pt-6">
                           Planning ahead creates more opportunities.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* Section 4: Common Mistakes */}
            <section id="common-mistakes" className="space-y-12 scroll-mt-32">
               <div className="text-center space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase flex items-center justify-center gap-4 tracking-tighter">
                     <XCircle className="h-8 w-8 text-red-500" />
                     {t.mistakes.title}
                  </h2>
                  <p className="text-red-500 font-black italic">{t.mistakes.subtitle}</p>
                  <div className="h-1 w-16 bg-red-100 mx-auto rounded-full" />
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                  <div className="lg:col-span-3 space-y-4">
                     {t.mistakes.items.map((item, idx) => (
                       <div key={idx} className="flex items-center gap-6 p-6 bg-red-50 rounded-2xl border border-red-100 transition-all hover:bg-white hover:shadow-xl hover:scale-[1.01] group">
                          <div className="h-10 w-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-black shadow-lg group-hover:rotate-12 transition-transform shrink-0">
                             {idx + 1}
                          </div>
                          <span className="text-sm sm:text-lg font-bold text-slate-700 leading-snug">{item}</span>
                       </div>
                     ))}
                  </div>
                  
                  <div className="lg:col-span-2 bg-amber-50 p-8 sm:p-12 rounded-2xl border-2 border-amber-200 flex flex-col justify-center gap-8 relative overflow-hidden group shadow-premium">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
                     <div className="flex items-center gap-4 relative z-10">
                        <div className="h-14 w-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                           <Lightbulb className="h-8 w-8" />
                        </div>
                        <h3 className="font-black text-amber-900 uppercase tracking-widest text-lg">{t.mistakes.tipTitle}</h3>
                     </div>
                     <p className="text-sm sm:text-xl font-black text-amber-900 italic leading-relaxed relative z-10 border-l-4 border-amber-500/30 pl-6">
                        {t.mistakes.tipContent}
                     </p>
                  </div>
               </div>
            </section>

            {/* Section 5: Support Areas */}
            <section id="bba-support" className="scroll-mt-32 bg-slate-50 p-8 sm:p-16 lg:p-24 rounded-2xl border border-slate-200 space-y-16 shadow-inner relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full" />
               <div className="space-y-6 text-center relative z-10">
                  <h2 className="text-3xl sm:text-5xl font-black text-primary uppercase tracking-tight">{t.support.title}</h2>
                  <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
                  <p className="text-slate-500 font-bold text-sm sm:text-lg max-w-2xl mx-auto">
                    {isAr ? 'نحن نؤمن بأن أولياء الأمور لا ينبغي أن يضطروا لاكتشاف كل شيء بمفردهم.' : 'We believe parents should never have to figure everything out on their own.'}
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {t.support.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:border-secondary/20 group">
                       <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-all shadow-inner">
                          <CheckCircle2 className="h-5 w-5 text-secondary group-hover:text-white" />
                       </div>
                       <span className="text-sm sm:text-base font-black text-primary/80 group-hover:text-primary transition-colors">{item}</span>
                    </div>
                  ))}
               </div>

               <p className="text-center text-slate-400 font-bold text-[10px] sm:text-sm border-t border-slate-200 pt-12 leading-relaxed italic relative z-10">
                 {isAr ? '* تذكر: يظل أولياء الأمور مسؤولين عن الامتثال للوائح التعليم المنزلي في ولاية نيويورك.' : '* Remember: Parents remain responsible for complying with New York State homeschool regulations.'}
               </p>
            </section>

            {/* Final Contact CTA */}
            <section className="text-center space-y-12 bg-primary text-white p-10 sm:p-20 rounded-2xl shadow-2xl relative overflow-hidden group border-b-[12px] border-secondary">
               <div className="absolute inset-0 opacity-10 z-0">
                  <Image src="https://picsum.photos/seed/contactny/1200/800" alt="Contact Support" fill className="object-cover" unoptimized />
               </div>
               <div className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter drop-shadow-2xl italic">
                    {isAr ? 'هل لديك أسئلة؟' : 'Have Questions?'}
                  </h2>
                  <div className="h-1.5 w-32 bg-secondary mx-auto rounded-full shadow-lg" />
                  <p className="text-lg sm:text-2xl font-bold text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
                    {isAr 
                      ? 'رحلة كل عائلة فريدة من نوعها. نحن هنا لنكون شريكك الموثوق في كل خطوة.' 
                      : 'Every family\'s journey is unique. We are here to be your trusted partner every step of the way.'}
                  </p>
               </div>
               
               <div className="pt-8 relative z-10">
                  <Button asChild size="lg" className="h-20 px-16 bg-secondary hover:bg-white hover:text-secondary text-white font-black text-lg sm:text-2xl rounded-2xl shadow-[0_20px_50px_rgba(200,84,46,0.3)] transition-all active:scale-95 group/btn border-4 border-transparent hover:border-secondary">
                    <Link href={`/${lang}/contact`} className="flex items-center gap-4">
                      {isAr ? 'تواصل مع BBA الآن' : 'Contact BBA Now'}
                      {isAr ? <ChevronLeft className="h-8 w-8 group-hover/btn:-translate-x-2 transition-transform" /> : <ChevronRight className="h-8 w-8 group-hover/btn:translate-x-2 transition-transform" />}
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
