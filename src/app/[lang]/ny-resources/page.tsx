'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  FileText, 
  CheckSquare, 
  Info, 
  AlertCircle, 
  GraduationCap, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  BookOpen, 
  ClipboardCheck, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Mail, 
  LayoutDashboard, 
  FileWarning, 
  Lightbulb,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  Target,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function NyResourcesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';

  const t = {
    nav: {
      overview: isAr ? 'نظرة عامة' : 'Overview',
      process: isAr ? 'العملية التعليمية' : 'Process',
      college: isAr ? 'المسارات الجامعية' : 'College',
      mistakes: isAr ? 'أخطاء شائعة' : 'Mistakes',
      support: isAr ? 'دعم الأكاديمية' : 'Support',
      contact: isAr ? 'تواصل معنا' : 'Contact'
    },
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
      {/* SECTION 1 — HERO */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <pattern id="ny-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#ny-grid)" />
          </svg>
        </div>

        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight drop-shadow-xl">
              {t.hero.title}
            </h1>
            <h2 className="text-sm sm:text-xl text-secondary font-black uppercase tracking-[0.2em]">
              {t.hero.subtitle}
            </h2>
          </div>
          <p className="text-xs sm:text-lg text-white/70 font-bold max-w-2xl mx-auto leading-relaxed italic border-l-4 border-secondary pl-6 text-start">
            {t.hero.desc}
          </p>
          <div className="pt-6">
            <Button 
              size="lg" 
              onClick={() => scrollTo('intro')}
              className="bg-secondary hover:bg-white hover:text-secondary text-white font-black h-14 px-8 rounded-2xl shadow-xl transition-all border-2 border-transparent hover:border-secondary"
            >
              {t.hero.cta}
              {isAr ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </div>
        </div>
      </section>

      {/* MOBILE NAV: Horizontal Scrollable Strip */}
      <nav className="md:hidden sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="flex overflow-x-auto py-4 px-4 no-scrollbar gap-4">
          {Object.entries(t.nav).map(([key, label]) => (
            <button
              key={key}
              onClick={() => scrollTo(key === 'overview' ? 'intro' : key)}
              className="whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 active:bg-secondary active:text-white transition-all"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="container-tight py-12 lg:py-24 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* DESKTOP SIDEBAR: Sticky TOC */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-black uppercase text-primary tracking-widest border-b border-slate-200 pb-3">
                {isAr ? 'محتويات المركز' : 'Resource Guide'}
              </h3>
              <nav className="flex flex-col gap-1">
                {Object.entries(t.nav).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => scrollTo(key === 'overview' ? 'intro' : key)}
                    className="flex items-center gap-3 text-start px-4 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-primary hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all group"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary group-hover:scale-150 transition-transform" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="bg-primary p-6 rounded-2xl text-white space-y-4 shadow-xl">
               <ShieldCheck className="h-8 w-8 text-secondary" />
               <p className="text-xs font-bold leading-relaxed opacity-80">
                 {isAr ? 'نحن هنا لضمان رحلة تعليمية آمنة ومنظمة لطفلك.' : 'Ensuring a secure and organized educational journey.'}
               </p>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9 space-y-24">
            
            {/* SECTION 2 — INTRO */}
            <section id="intro" className="scroll-mt-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
                      {t.intro.title}
                    </h2>
                    <p className="text-lg font-black text-secondary italic">
                      {t.intro.supporting}
                    </p>
                  </div>
                  <div className="space-y-6 text-slate-600 font-medium text-sm lg:text-base leading-relaxed">
                    <p>{t.intro.content1}</p>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary rounded-l-2xl" />
                      <p className="text-primary font-black text-base lg:text-lg">
                        {t.intro.content2}
                      </p>
                    </div>
                    <p className="font-black text-primary flex items-center gap-3">
                       <Target className="h-5 w-5 text-secondary shrink-0" />
                       {t.intro.content3}
                    </p>
                  </div>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                   <Image 
                    src="/newyork.png" 
                    alt="New York" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                    unoptimized
                   />
                </div>
              </div>
            </section>

            {/* SECTION 3 — PROCESS */}
            <section id="process" className="scroll-mt-32">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
                    {t.process.title}
                  </h2>
                  <p className="text-slate-500 font-bold text-sm lg:text-lg italic max-w-2xl">
                    {t.process.intro}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.process.steps.map((step) => (
                    <Card key={step.id} className="rounded-2xl border border-slate-100 shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all duration-500">
                      <CardHeader className="bg-primary p-6 text-white flex flex-row items-center gap-4">
                         <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center font-black shadow-lg">
                            {step.id}
                         </div>
                         <CardTitle className="text-sm lg:text-base font-black uppercase tracking-tight leading-tight">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                         <p className="text-slate-600 font-bold text-xs lg:text-sm leading-relaxed">{step.desc}</p>
                         <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-3">
                            <div className="flex items-center gap-3 text-secondary font-black text-[10px] uppercase tracking-widest">
                               <ShieldCheck className="h-4 w-4" />
                               {t.process.bbaSupport}
                            </div>
                            <p className="text-slate-600 text-xs font-bold leading-relaxed">
                               {step.bba}
                            </p>
                         </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4 — COLLEGE */}
            <section id="college" className="scroll-mt-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                   <div className="space-y-4">
                      <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
                        {t.college.title}
                      </h2>
                      <p className="text-lg font-black text-secondary italic">
                        {t.college.supporting}
                      </p>
                   </div>

                   <div className="p-8 bg-slate-900 text-white rounded-2xl shadow-xl space-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                         <GraduationCap className="h-24 w-24" />
                      </div>
                      <h3 className="text-sm font-bold italic relative z-10">{t.college.question}</h3>
                      <p className="text-xl lg:text-3xl font-black text-secondary uppercase relative z-10">{t.college.answer}</p>
                   </div>

                   <div className="space-y-4 text-slate-600 font-medium text-sm leading-relaxed">
                      <p>{t.college.p1}</p>
                      <p className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic">{t.college.p2}</p>
                   </div>
                </div>

                <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-inner space-y-6">
                   <h4 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate-200 pb-3">{t.college.checklistTitle}</h4>
                   <div className="grid grid-cols-2 gap-4">
                     {t.college.checklist.map((item, idx) => (
                       <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-50">
                         <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                         <span className="font-black text-primary text-[10px]">{lang === 'ar' ? item.ar : item.en}</span>
                       </div>
                     ))}
                   </div>
                   <div className="bg-primary text-white p-6 rounded-xl space-y-4">
                      <div className="flex items-center gap-3">
                         <Star className="h-4 w-4 text-secondary" />
                         <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'دعم الأكاديمية' : 'BBA Guidance'}</span>
                      </div>
                      <p className="text-xs font-bold leading-relaxed">{t.college.bba}</p>
                   </div>
                </div>
              </div>
            </section>

            {/* SECTION 5 — MISTAKES */}
            <section id="mistakes" className="scroll-mt-32">
              <div className="space-y-12">
                <div className="space-y-2">
                  <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
                     {t.mistakes.title}
                  </h2>
                  <p className="text-lg font-black text-secondary italic">
                     {t.mistakes.supporting}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {t.mistakes.list.map((mistake, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-8 flex items-start gap-6 group hover:shadow-lg transition-all">
                         <div className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                            <FileWarning className="h-5 w-5" />
                         </div>
                         <p className="text-slate-700 font-black text-xs lg:text-sm leading-relaxed">
                            {mistake}
                         </p>
                      </div>
                   ))}
                </div>

                <div className="bg-primary text-white p-8 lg:p-12 rounded-2xl shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group">
                   <div className="h-14 w-14 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg shrink-0">
                      <Lightbulb className="h-7 w-7" />
                   </div>
                   <div className="space-y-2 relative z-10">
                      <h4 className="text-lg font-black uppercase text-secondary">{t.mistakes.tipTitle}</h4>
                      <p className="text-sm lg:text-lg font-bold italic opacity-90">
                         {t.mistakes.tipContent}
                      </p>
                   </div>
                </div>
              </div>
            </section>

            {/* SECTION 6 — SUPPORT */}
            <section id="support" className="scroll-mt-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div className="space-y-6">
                    <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
                       {t.support.title}
                    </h2>
                    <div className="space-y-4 text-slate-600 font-medium text-sm leading-relaxed border-l-4 border-slate-100 pl-6 py-2">
                       <p>{t.support.intro}</p>
                       <p className="font-black text-primary italic text-base">{t.support.responsibility}</p>
                    </div>
                 </div>

                 <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-6">
                    <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-3">
                       <CheckSquare className="h-4 w-4 text-secondary" />
                       {t.support.listIntro}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                       {t.support.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-50 group">
                             <div className="h-6 w-6 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center font-black text-[9px] group-hover:bg-secondary group-hover:text-white transition-colors">
                                {idx + 1}
                             </div>
                             <span className="font-black text-primary text-xs">
                                {item}
                             </span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
            </section>

            {/* SECTION 7 — FOOTER CTA */}
            <section id="contact" className="scroll-mt-32">
              <Card className="rounded-2xl border border-slate-100 shadow-2xl bg-white p-8 lg:p-16 text-center space-y-10">
                 <div className="space-y-4">
                    <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tight">{t.footer.title}</h2>
                    <p className="text-lg lg:text-xl font-black text-secondary italic">{t.footer.supporting}</p>
                 </div>
                 
                 <div className="space-y-6 text-slate-600 font-bold text-sm lg:text-lg leading-relaxed">
                    <p className="text-primary font-black text-lg">{t.footer.p1}</p>
                    <p>{t.footer.p2}</p>
                 </div>

                 <div className="pt-6">
                    <Button asChild size="lg" className="h-16 px-10 text-lg font-black bg-secondary hover:bg-primary text-white rounded-2xl shadow-xl transition-all border-4 border-transparent hover:border-secondary">
                       <Link href={`/${lang}/contact`}>
                          {t.footer.btn}
                          {isAr ? <ArrowLeft className="mr-3 h-6 w-6" /> : <ArrowRight className="ml-3 h-6 w-6" />}
                       </Link>
                    </Button>
                 </div>
              </Card>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
