'use client';

import { use, useState } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  FileText, 
  CheckSquare, 
  GraduationCap, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  LayoutDashboard, 
  FileWarning, 
  Lightbulb,
  ShieldCheck,
  Zap,
  Target,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function NyResourcesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';

  const navItems = [
    { id: 'intro', label: isAr ? 'نظرة عامة' : 'Overview' },
    { id: 'process', label: isAr ? 'العملية التعليمية' : 'Process' },
    { id: 'college', label: isAr ? 'المسارات الجامعية' : 'College' },
    { id: 'mistakes', label: isAr ? 'أخطاء شائعة' : 'Mistakes' },
    { id: 'support', label: isAr ? 'دعم الأكاديمية' : 'Support' },
    { id: 'contact', label: isAr ? 'تواصل معنا' : 'Contact' }
  ];

  const t = {
    hero: {
      title: isAr ? 'مركز موارد نيويورك' : 'NY Homeschool Center',
      subtitle: isAr ? 'دليلك الشامل للتعليم المنزلي في نيويورك' : 'Your Comprehensive NY Guide',
      desc: isAr 
        ? 'تتمتع نيويورك ببعض من أكثر لوائح التعليم المنزلي تفصيلاً. فهم المتطلبات يصبح أسهل بكثير مع التوجيه الصحيح.'
        : 'New York has detailed homeschool regulations. Understanding requirements becomes much easier with the right guidance.',
      cta: isAr ? 'ابدأ الاستكشاف' : 'Start Exploring'
    },
    intro: {
      title: isAr ? 'التعليم المنزلي في نيويورك' : 'Homeschooling in NY',
      supporting: isAr ? 'نساعدكم في التنقل بين المتطلبات بثقة.' : "Navigating requirements with confidence.",
      content1: isAr
        ? 'تمتلك نيويورك بعضاً من أكثر لوائح التعليم المنزلي شمولاً. وبينما قد تبدو العملية مرهقة في البداية، فإن التوجيه الصحيح يسهل كل شيء.'
        : "New York has comprehensive regulations. While the process may seem overwhelming, the right guidance simplifies everything.",
      content2: isAr
        ? 'في أكاديمية بنين وبنات (BBA)، قضينا سنوات في دعم العائلات في نيويورك. تم إنشاء هذا المركز لتوفير معلومات موثوقة طوال رحلتكم.'
        : "At BBA, we've spent years supporting NY families. This resource center provides reliable information throughout your journey.",
      content3: isAr
        ? 'نحن هنا للمساعدة في كل خطوة.'
        : "We are here to help every step of the way."
    },
    process: {
      title: isAr ? 'خطوات العملية التعليمية' : 'The Homeschool Process',
      intro: isAr 
        ? 'عملية منظمة تساعدكم على تقديم تجربة تعليمية متميزة مع تلبية كافة متطلبات الولاية.'
        : "A structured process designed to help families meet state requirements.",
      subtitle: isAr ? 'المتطلبات الأربعة الأساسية' : "The four primary requirements.",
      bbaSupport: isAr ? 'كيف تدعمكم BBA' : 'BBA Support',
      steps: [
        {
          id: 1,
          title: isAr ? 'خطاب النوايا (LOI)' : 'Notice of Intent (LOI)',
          desc: isAr 
            ? 'خطاب بسيط لإبلاغ المنطقة التعليمية بنية التعليم المنزلي.'
            : "A letter informing your district of your intent to homeschool.",
          extra: isAr ? 'يقدم سنوياً.' : "Submitted annually.",
          bba: isAr ? 'إرشادات موعد وكيفية التقديم.' : "Guidance on when and how to submit."
        },
        {
          id: 2,
          title: isAr ? 'خطة IHIP' : 'IHIP Plan',
          desc: isAr 
            ? 'خطة تعليمية توضح المواد التي سيتم تدريسها.'
            : "A plan outlining subjects to be taught.",
          extra: isAr ? 'تثبت تغطية المنهج.' : "Demonstrates curriculum coverage.",
          bba: isAr ? 'نساعدك في إعداد الخطة بمهنية.' : "We help you prepare the plan professionally."
        },
        {
          id: 3,
          title: isAr ? 'التقارير الفصلية' : 'Quarterly Reports',
          desc: isAr 
            ? 'تقارير توثق الحضور والتقدم الأكاديمي.'
            : "Reports documenting attendance and progress.",
          extra: isAr ? 'تقدم كل 3 أشهر.' : "Submitted every 3 months.",
          bba: isAr ? 'نعد التقارير ونذكرك بالمواعيد.' : "We prepare reports and remind you."
        },
        {
          id: 4,
          title: isAr ? 'التقييم السنوي' : 'Annual Assessment',
          desc: isAr 
            ? 'تقييم في نهاية العام لتوثيق مستوى الطالب.'
            : "A year-end assessment of student level.",
          extra: isAr ? 'الخطوة الختامية للعام.' : "Final step for the school year.",
          bba: isAr ? 'نساعدك في اختيار نوع التقييم.' : "We help you choose the assessment type."
        }
      ]
    },
    college: {
      title: isAr ? 'المسارات الجامعية' : 'College Pathways',
      supporting: isAr ? 'الاستعداد للمستقبل يبدأ مبكراً' : 'Preparing for the Future',
      question: isAr ? 'هل يمكن الالتحاق بالجامعة بعد التعليم المنزلي؟' : 'Can students attend college?',
      answer: isAr ? 'نعم، وبكل فخر.' : 'Yes, Absolutely.',
      p1: isAr 
        ? 'خريجو التعليم المنزلي يلتحقون بأرقى الجامعات. التخطيط المبكر هو المفتاح.'
        : "Homeschool graduates attend top universities. Early planning is key.",
      p2: isAr
        ? 'الحفاظ على سجلات منظمة وكشوف درجات دقيقة يسهل عملية القبول.'
        : "Organized records and accurate transcripts simplify admission.",
      checklistTitle: isAr ? 'سجلات حيوية:' : 'Essential Records:',
      checklist: [
        { en: 'Transcripts', ar: 'كشوف الدرجات' },
        { en: 'Coursework', ar: 'الدورات الدراسية' },
        { en: 'Grades', ar: 'الدرجات' },
        { en: 'Attendance', ar: 'سجلات الحضور' },
        { en: 'Activities', ar: 'الأنشطة' }
      ],
      bba: isAr
        ? 'نحن نوجه طلابنا في بناء سجل أكاديمي قوي يدعم طلبات القبول.'
        : "We guide our students in building a strong academic record.",
      closing: isAr ? 'التخطيط المسبق يفتح أبواباً واسعة.' : 'Advance planning opens doors.'
    },
    mistakes: {
      title: isAr ? 'أخطاء شائعة' : 'Common Mistakes',
      supporting: isAr ? 'تجنب التحديات التنظيمية' : 'Avoid Common Hurdles',
      intro: isAr ? 'البقاء منظماً يحميك من الضغوط.' : "Staying organized avoids stress.",
      list: [
        isAr ? 'تأخير تقديم المستندات.' : 'Delaying document submission.',
        isAr ? 'فقدان التقارير القديمة.' : 'Losing old progress reports.',
        isAr ? 'تأجيل تخطيط التخرج.' : 'Postponing graduation planning.',
        isAr ? 'تجاوز المواعيد النهائية.' : 'Missing district deadlines.'
      ],
      tipTitle: isAr ? 'نصيحة ذهبية' : 'Pro Tip',
      tipContent: isAr 
        ? 'أنشئ مجلداً مخصصاً لجميع وثائق التعليم المنزلي.'
        : "Create a dedicated folder for all homeschool docs."
    },
    support: {
      title: isAr ? 'دعم BBA المتواصل' : 'BBA Support',
      intro: isAr 
        ? 'نحن نؤمن بأن العائلات لا يجب أن تكتشف كل شيء بمفردها.'
        : "Families shouldn't have to figure everything out alone.",
      responsibility: isAr 
        ? 'نحن نسير معك جنباً إلى جنب.'
        : "We walk alongside you every day.",
      listIntro: isAr ? 'نساعدكم في:' : 'We assist with:',
      items: [
        isAr ? 'فهم اللوائح والمتطلبات.' : 'Understanding regulations.',
        isAr ? 'إرشادات خطاب النوايا (LOI).' : 'LOI guidance.',
        isAr ? 'تخطيط المسار التعليمي.' : 'Pathway planning.',
        isAr ? 'إدارة التقارير والتقييمات.' : 'Reports and assessments.',
        isAr ? 'دعم شخصي مستمر.' : 'Personal support.'
      ],
      closing: isAr ? 'نحن شريكك الموثوق.' : "Your trusted partner."
    },
    footer: {
      title: isAr ? 'لديك استفسار؟' : 'Have Questions?',
      supporting: isAr ? 'تواصل مع فريقنا اليوم' : 'Contact our team today',
      p1: isAr ? 'رحلة كل عائلة فريدة.' : "Every family's journey is unique.",
      p2: isAr ? 'نحن هنا لتوفير الإجابات.' : "We are here with answers.",
      btn: isAr ? 'تواصل معنا' : 'Contact BBA'
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <pattern id="ny-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#ny-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[40%] h-full bg-secondary/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white uppercase tracking-tight drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <div className="inline-block px-4 py-1.5 bg-secondary text-white rounded-full font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-lg">
              {t.hero.subtitle}
            </div>
          </div>
          <p className="text-sm sm:text-xl text-white/70 font-bold max-w-3xl mx-auto leading-relaxed italic border-x-2 border-secondary/20 px-8 py-2">
            {t.hero.desc}
          </p>
          <div className="pt-8">
            <Button 
              size="lg" 
              onClick={() => scrollTo('intro')}
              className="bg-secondary hover:bg-white hover:text-secondary text-white font-black h-16 px-10 rounded-2xl shadow-xl transition-all border-4 border-transparent hover:border-secondary active:scale-95"
            >
              {t.hero.cta}
              {isAr ? <ArrowLeft className="mr-3 h-6 w-6" /> : <ArrowRight className="ml-3 h-6 w-6" />}
            </Button>
          </div>
        </div>
      </section>

      <nav className="lg:hidden sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex overflow-x-auto py-4 px-4 no-scrollbar gap-4 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-5 py-2.5 rounded-xl border border-slate-100 active:bg-secondary active:text-white active:border-secondary transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="container-tight py-12 lg:py-24 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-8">
            <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-slate-50/50">
              <CardHeader className="bg-primary text-white p-6">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                   <LayoutDashboard className="h-4 w-4 text-secondary" />
                   {isAr ? 'محتويات المركز' : 'Center Navigation'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="flex items-center gap-4 text-start px-5 py-4 rounded-xl text-xs font-black text-slate-500 hover:text-primary hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all group"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary group-hover:scale-150 transition-transform" />
                    {item.label}
                  </button>
                ))}
              </CardContent>
            </Card>
            
            <div className="bg-primary text-white p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-24 w-24" />
               </div>
               <h4 className="text-sm font-black uppercase tracking-widest border-b border-white/10 pb-3 relative z-10">{isAr ? 'بيئة آمنة' : 'Secure Environment'}</h4>
               <p className="text-xs font-bold leading-relaxed opacity-80 relative z-10">
                 {isAr ? 'نحن هنا لضمان رحلة تعليمية آمنة ومنظمة لطفلك وفق معايير ولاية نيويورك.' : 'Ensuring a secure and organized educational journey according to NY state standards.'}
               </p>
            </div>
          </aside>

          <div className="lg:col-span-9 space-y-24 md:space-y-32">
            <section id="intro" className="scroll-mt-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="h-1 w-12 bg-secondary rounded-full" />
                    <h2 className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tight leading-tight">
                      {t.intro.title}
                    </h2>
                    <p className="text-lg md:text-2xl font-black text-secondary italic">
                      {t.intro.supporting}
                    </p>
                  </div>
                  <div className="space-y-6 text-slate-600 font-medium text-sm md:text-lg leading-relaxed">
                    <p>{t.intro.content1}</p>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative shadow-inner">
                      <div className="absolute top-0 left-0 bottom-0 w-2 h-full bg-secondary rounded-l-2xl" />
                      <p className="text-primary font-black text-base md:text-xl leading-relaxed italic">
                        {t.intro.content2}
                      </p>
                    </div>
                    <p className="font-black text-primary flex items-center gap-4 text-base md:text-xl">
                       <Target className="h-6 w-6 md:h-8 md:w-8 text-secondary shrink-0" />
                       {t.intro.content3}
                    </p>
                  </div>
                </div>
                <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-8 border-white group">
                   <Image 
                    src="/newyork.png" 
                    alt="New York City" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    unoptimized
                   />
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </section>

            <section id="process" className="scroll-mt-32">
              <div className="space-y-12">
                <div className="text-center md:text-start space-y-4">
                  <h2 className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tight">
                    {t.process.title}
                  </h2>
                  <p className="text-slate-500 font-bold text-sm md:text-xl italic max-w-2xl">
                    {t.process.intro}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {t.process.steps.map((step) => (
                    <Card key={step.id} className="rounded-2xl border border-slate-100 shadow-sm bg-white overflow-hidden group hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                      <CardHeader className="bg-primary p-6 text-white flex flex-row items-center gap-5">
                         <div className="h-12 w-12 rounded-xl bg-secondary text-white flex items-center justify-center font-black text-xl shadow-xl transition-transform group-hover:rotate-12">
                            {step.id}
                         </div>
                         <CardTitle className="text-sm md:text-lg font-black uppercase tracking-tight leading-tight">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                         <div className="space-y-2">
                            <p className="text-slate-600 font-bold text-sm md:text-base leading-relaxed">{step.desc}</p>
                            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{step.extra}</span>
                         </div>
                         <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4 shadow-inner">
                            <div className="flex items-center gap-3 text-primary font-black text-[10px] md:text-xs uppercase tracking-widest">
                               <ShieldCheck className="h-4 w-4 text-secondary" />
                               {t.process.bbaSupport}
                            </div>
                            <p className="text-slate-600 text-xs md:text-sm font-bold leading-relaxed italic border-l-2 border-secondary/30 pl-4">
                               {step.bba}
                            </p>
                         </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            <section id="college" className="scroll-mt-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
                <div className="space-y-10">
                   <div className="space-y-4">
                      <h2 className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tight">
                        {t.college.title}
                      </h2>
                      <p className="text-lg md:text-2xl font-black text-secondary italic">
                        {t.college.supporting}
                      </p>
                   </div>

                   <div className="p-8 md:p-12 bg-slate-900 text-white rounded-2xl shadow-2xl space-y-6 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                         <GraduationCap className="h-48 w-48" />
                      </div>
                      <h3 className="text-sm md:text-lg font-bold italic relative z-10 opacity-70">{t.college.question}</h3>
                      <p className="text-2xl md:text-4xl font-black text-secondary uppercase relative z-10 leading-tight drop-shadow-md">{t.college.answer}</p>
                   </div>

                   <div className="space-y-6 text-slate-600 font-medium text-sm md:text-lg leading-relaxed">
                      <p>{t.college.p1}</p>
                      <p className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic font-bold border-l-4 border-secondary">{t.college.p2}</p>
                   </div>
                </div>

                <div className="bg-slate-50/50 p-8 md:p-12 rounded-2xl border border-slate-100 shadow-inner space-y-10 relative">
                   <div className="absolute top-4 right-4 text-slate-200 opacity-20">
                      <CheckCircle2 className="h-24 w-24" />
                   </div>
                   <h4 className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.4em] border-b border-slate-200 pb-4 relative z-10">{t.college.checklistTitle}</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                     {t.college.checklist.map((item, idx) => (
                       <div key={idx} className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-slate-50 group hover:shadow-md transition-all">
                         <div className="h-8 w-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center shrink-0 shadow-inner">
                            <CheckCircle2 className="h-4 w-4" />
                         </div>
                         <span className="font-black text-primary text-[10px] md:text-xs uppercase tracking-widest">{lang === 'ar' ? item.ar : item.en}</span>
                       </div>
                     ))}
                   </div>
                   <Card className="bg-primary text-white p-8 rounded-2xl shadow-xl space-y-6 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                         <Star className="h-16 w-16 fill-secondary" />
                      </div>
                      <div className="flex items-center gap-4 relative z-10">
                         <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shadow-lg">
                            <Zap className="h-5 w-5 text-white" />
                         </div>
                         <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{isAr ? 'دعم الأكاديمية' : 'BBA Strategic Guidance'}</span>
                      </div>
                      <p className="text-xs md:text-base font-bold leading-relaxed opacity-90 relative z-10">{t.college.bba}</p>
                   </Card>
                </div>
              </div>
            </section>

            <section id="mistakes" className="scroll-mt-32">
              <div className="space-y-16">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tight">
                     {t.mistakes.title}
                  </h2>
                  <p className="text-lg md:text-2xl font-black text-secondary italic">
                     {t.mistakes.supporting}
                  </p>
                  <div className="h-1 w-16 bg-secondary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-2">
                   {t.mistakes.list.map((mistake, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-8 flex items-start gap-8 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 shadow-sm">
                         <div className="h-14 w-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-6 transition-transform">
                            <FileWarning className="h-7 w-7" />
                         </div>
                         <p className="text-slate-700 font-black text-sm md:text-lg leading-relaxed pt-2">
                            {mistake}
                         </p>
                      </div>
                   ))}
                </div>

                <div className="bg-primary text-white p-10 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12 group mx-2">
                   <div className="h-20 w-20 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-xl shrink-0 group-hover:scale-110 transition-transform">
                      <Lightbulb className="h-10 w-10" />
                   </div>
                   <div className="space-y-4 text-center md:text-start relative z-10">
                      <h4 className="text-xl md:text-2xl font-black uppercase text-secondary tracking-widest">{t.mistakes.tipTitle}</h4>
                      <p className="text-base md:text-2xl font-bold italic opacity-90 leading-tight">
                         "{t.mistakes.tipContent}"
                      </p>
                   </div>
                </div>
              </div>
            </section>

            <section id="support" className="scroll-mt-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                 <div className="space-y-10 text-center md:text-start">
                    <div className="space-y-4">
                       <div className="h-1 w-12 bg-secondary mx-auto md:mx-0 rounded-full" />
                       <h2 className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tight">
                          {t.support.title}
                       </h2>
                    </div>
                    <div className="space-y-6 text-slate-600 font-medium text-sm md:text-xl leading-relaxed border-l-8 border-slate-100 pl-8 py-4 bg-slate-50/50 rounded-r-2xl">
                       <p className="opacity-80">{t.support.intro}</p>
                       <p className="font-black text-primary italic leading-tight">{t.support.responsibility}</p>
                    </div>
                 </div>

                 <div className="bg-slate-50 p-8 md:p-12 rounded-2xl border border-slate-100 space-y-10 shadow-premium">
                    <h3 className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.4em] flex items-center gap-4 justify-center md:justify-start">
                       <CheckSquare className="h-5 w-5 text-secondary" />
                       {t.support.listIntro}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                       {t.support.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-slate-50 group shadow-sm hover:shadow-md transition-all">
                             <div className="h-8 w-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center font-black text-[10px] group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                {idx + 1}
                             </div>
                             <span className="font-black text-primary text-xs md:text-sm uppercase tracking-tight">
                                {item}
                             </span>
                          </div>
                       ))}
                    </div>
                    <div className="text-center pt-4">
                       <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] bg-secondary/10 px-6 py-2 rounded-full ring-1 ring-secondary/20 shadow-sm">
                          {t.support.closing}
                       </span>
                    </div>
                 </div>
              </div>
            </section>

            <section id="contact" className="scroll-mt-32 pb-12">
              <Card className="rounded-2xl border-none shadow-premium overflow-hidden bg-white group">
                 <div className="p-10 md:p-24 text-center space-y-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                       <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <pattern id="cta-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                             <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                          </pattern>
                          <rect width="100%" height="100%" fill="url(#cta-dots)" />
                       </svg>
                    </div>

                    <div className="space-y-6 relative z-10">
                       <div className="h-1.5 w-16 bg-secondary mx-auto rounded-full mb-8" />
                       <h2 className="text-3xl md:text-6xl font-black text-primary uppercase tracking-tight leading-none">{t.footer.title}</h2>
                       <p className="text-xl md:text-3xl font-black text-secondary italic drop-shadow-sm">{t.footer.supporting}</p>
                    </div>
                    
                    <div className="space-y-8 text-slate-600 font-bold text-sm md:text-xl leading-relaxed max-w-2xl mx-auto relative z-10 px-4">
                       <p className="text-primary font-black text-lg md:text-2xl opacity-90">{t.footer.p1}</p>
                       <p className="opacity-70">{t.footer.p2}</p>
                    </div>

                    <div className="pt-10 relative z-10">
                       <Button asChild size="lg" className="h-16 md:h-20 px-12 md:px-20 text-lg md:text-2xl font-black bg-secondary hover:bg-primary text-white rounded-2xl shadow-premium transition-all border-8 border-white hover:scale-105 active:scale-95 group/btn">
                          <Link href={`/${lang}/contact`} className="flex items-center gap-4">
                             {t.footer.btn}
                             {isAr ? <ArrowLeft className="mr-4 h-8 w-8 group-hover/btn:-translate-x-2 transition-transform" /> : <ArrowRight className="ml-4 h-8 w-8 group-hover/btn:translate-x-2 transition-transform" />}
                          </Link>
                       </Button>
                    </div>
                 </div>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
