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
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function NyResourcesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';

  const t = {
    nav: {
      overview: isAr ? 'نظرة عامة' : 'Overview',
      process: isAr ? 'العملية التعليمية' : 'Homeschool Process',
      college: isAr ? 'المسارات الجامعية' : 'College Pathways',
      mistakes: isAr ? 'أخطاء شائعة' : 'Common Mistakes',
      support: isAr ? 'دعم الأكاديمية' : 'BBA Support',
      contact: isAr ? 'تواصل معنا' : 'Contact'
    },
    hero: {
      title: isAr ? 'مركز موارد نيويورك' : 'NY Homeschool Resources',
      subtitle: isAr ? 'دليلك الشامل للتعليم المنزلي في نيويورك' : 'Your Comprehensive Guide to NY Homeschooling',
      desc: isAr 
        ? 'تتمتع نيويورك ببعض من أكثر لوائح التعليم المنزلي تفصيلاً. فهم المتطلبات يصبح أسهل بكثير مع التوجيه الصحيح.'
        : 'New York has detailed homeschool regulations. Understanding requirements becomes much easier with the right guidance.',
      cta: isAr ? 'تعرف على المزيد' : 'Learn More'
    },
    intro: {
      title: isAr ? 'التعليم المنزلي في نيويورك' : 'Homeschooling in New York',
      supporting: isAr ? 'نساعدكم في التنقل بين المتطلبات بثقة.' : "Helping you navigate requirements with confidence.",
      content1: isAr
        ? 'تمتلك نيويورك بعضاً من أكثر لوائح التعليم المنزلي شمولاً. وبينما قد تبدو العملية مرهقة في البةاية، فإن التوجيه الصحيح يسهل كل شيء.'
        : "New York has comprehensive homeschool regulations. While the process may seem overwhelming at first, the right guidance simplifies everything.",
      content2: isAr
        ? 'في أكاديمية بنين وبنات (BBA)، قضينا سنوات في دعم العائلات في نيويورك. تم إنشاء هذا المركز لتوفير معلومات موثوقة طوال رحلتكم.'
        : "At BBA, we've spent years supporting NY families. This resource center was created to provide reliable information throughout your journey.",
      content3: isAr
        ? 'نحن هنا للمساعدة في كل خطوة.'
        : "We are here to help every step of the way."
    },
    process: {
      title: isAr ? 'خطوات العملية التعليمية' : 'The Homeschool Process',
      intro: isAr 
        ? 'عملية منظمة تساعدكم على تقديم تجربة تعليمية متميزة مع تلبية كافة متطلبات الولاية.'
        : "A structured process designed to help families provide an organized educational experience while meeting state requirements.",
      subtitle: isAr ? 'المتطلبات الأربعة الأساسية في كل عام دراسي.' : "The four primary requirements for each school year.",
      bbaSupport: isAr ? 'كيف تدعمكم BBA' : 'How BBA Supports You',
      steps: [
        {
          id: 1,
          title: isAr ? '1. خطاب النوايا (LOI)' : '1. Notice of Intent (LOI)',
          desc: isAr 
            ? 'خطاب بسيط لإبلاغ المنطقة التعليمية بنية التعليم المنزلي للعام القادم.'
            : "A simple letter informing your district of your intent to homeschool for the upcoming year.",
          extra: isAr
            ? 'يتم تقديمه في بداية العام أو عند البدء في أي وقت خلال السنة.'
            : "Submitted at the start of the year or when beginning during the term.",
          bba: isAr
            ? 'نقدم لك إرشادات خطوة بخطوة حول موعد وكيفية التقديم.'
            : "We provide step-by-step guidance on when and how to submit."
        },
        {
          id: 2,
          title: isAr ? '2. خطة IHIP' : '2. IHIP Plan',
          desc: isAr 
            ? 'خطابة تعليمية توضح المواد التي سيتم تدريسها وفق اللوائح.'
            : "An educational plan outlining subjects to be taught per regulations.",
          extra: isAr
            ? 'نظرة عامة تثبت تغطية المواد المطلوبة طوال العام.'
            : "An overview demonstrating coverage of required subjects.",
          bba: isAr
            ? 'نساعدك في إعداد هذه الخطة لضمان مطابقتها لكافة الشروط.'
            : "We help you prepare this plan to ensure it meets all criteria."
        },
        {
          id: 3,
          title: isAr ? '3. التقارير الفصلية' : '3. Quarterly Reports',
          desc: isAr 
            ? 'تقارير توثق الحضور والتقدم الأكاديمي والمواد المنجزة.'
            : "Reports documenting attendance, progress, and completed subjects.",
          extra: isAr
            ? 'تثبت أن البرنامج يتقدم كما هو مخطط له.'
            : "Demonstrates that the program is progressing as planned.",
          bba: isAr
            ? 'نقوم بإعداد هذه التقارير وتذكيرك بالمواعيد النهائية.'
            : "We prepare these reports and remind you of all deadlines."
        },
        {
          id: 4,
          title: isAr ? '4. التقييم السنوي' : '4. Annual Assessment',
          desc: isAr 
            ? 'تقييم في نهاية العام لتوثيق مستوى الطالب وتقدمه.'
            : "A year-end assessment documenting student progress and level.",
          extra: isAr
            ? 'الخطوة النهائية لتوثيق النجاح للعام الدراسي.'
            : "The final step in documenting success for the academic year.",
          bba: isAr
            ? 'نساعدك في فهم طرق التقييم وإعداد الوثائق اللازمة.'
            : "We help you understand assessment options and documentation."
        }
      ]
    },
    college: {
      title: isAr ? 'المسارات الجامعية' : 'College Pathways',
      supporting: isAr ? 'الاستعداد للمستقبل يبدأ مبكراً' : 'Preparing for the Future Early',
      question: isAr ? 'هل يمكن الالتحاق بالجامعة بعد التعليم المنزلي؟' : 'Can students attend college after homeschooling?',
      answer: isAr ? 'نعم، بكل تأكيد.' : 'Yes, Absolutely.',
      p1: isAr 
        ? 'خريجو التعليم المنزلي يلتحقون بأرقى الجامعات. التخطيط المبكر هو المفتاح.'
        : "Homeschool graduates attend top universities. Early planning is the key.",
      p2: isAr
        ? 'الحفاظ على سجلات منظمة وكشوف درجات دقيقة يسهل عملية القبول.'
        : "Maintaining organized records and accurate transcripts simplifies admission.",
      checklistTitle: isAr ? 'سجلات يجب الاحتفاظ بها:' : 'Essential Records to Keep:',
      checklist: [
        { en: 'Transcripts', ar: 'كشوف الدرجات' },
        { en: 'Coursework', ar: 'الدورات الدراسية' },
        { en: 'Grades', ar: 'الدرجات' },
        { en: 'Attendance', ar: 'سجلات الحضور' },
        { en: 'Documentation', ar: 'وثائق البرنامج' }
      ],
      bba: isAr
        ? 'نحن نوجه طلابنا في بناء سجل أكاديمي قوي يدعم طلبات القبول.'
        : "We guide our students in building a strong academic record for admissions.",
      closing: isAr ? 'التخطيط المسبق يفتح أبواباً واسعة للطلاب.' : 'Advance planning opens wide doors for students.'
    },
    mistakes: {
      title: isAr ? 'أخطاء شائعة' : 'Common Mistakes',
      supporting: isAr ? 'تجنب التحديات قبل وقوعها' : 'Avoid Challenges Before They Happen',
      intro: isAr ? 'البقاء منظماً يساعد في تجنب الضغوط غير الضرورية.' : "Staying organized helps avoid unnecessary stress.",
      list: [
        isAr ? 'تأخير تقديم المستندات المطلوبة.' : 'Delaying submission of required documents.',
        isAr ? 'عدم الاحتفاظ بنسخ من التقارير.' : 'Not keeping copies of progress reports.',
        isAr ? 'تجاهل تخطيط التخرج حتى السنة الأخيرة.' : 'Ignoring graduation planning until senior year.',
        isAr ? 'فقدان المواعيد النهائية للمنطقة التعليمية.' : 'Missing district established deadlines.'
      ],
      tipTitle: isAr ? 'نصيحة ذهبية' : 'Pro Tip',
      tipContent: isAr 
        ? 'أنشئ مجلداً مخصصاً لجميع وثائق التعليم المنزلي، رقمياً وورقياً.'
        : "Create a dedicated folder for all homeschool documents, both digital and physical."
    },
    support: {
      title: isAr ? 'دعم BBA المتواصل' : 'BBA Ongoing Support',
      intro: isAr 
        ? 'نحن نؤمن بأن العائلات لا يجب أن تكتشف كل شيء بمفردها.'
        : "We believe families shouldn't have to figure everything out alone.",
      responsibility: isAr 
        ? 'نحن نسير معك جنباً إلى جنب طوال العام الدراسي.'
        : "We walk alongside you throughout the entire school year.",
      listIntro: isAr ? 'نساعدكم في:' : 'We assist you with:',
      items: [
        isAr ? 'فهم اللوائح والمتطلبات.' : 'Understanding regulations and requirements.',
        isAr ? 'إرشادات خطاب النوايا (LOI).' : 'LOI guidance and preparation.',
        isAr ? 'تخطيط المسار التعليمي.' : 'Educational pathway planning.',
        isAr ? 'إدارة التقارير والتقييمات.' : 'Managing reports and assessments.',
        isAr ? 'دعم شخصي مستمر.' : 'Personalized ongoing support.'
      ],
      closing: isAr 
        ? 'نحن شريكك الموثوق في هذه الرحلة.'
        : "We are your trusted partner in this journey."
    },
    footer: {
      title: isAr ? 'لديك استفسار؟' : 'Have a Question?',
      supporting: isAr ? 'تواصل مع فريقنا اليوم' : 'Get in touch with our team today',
      p1: isAr ? 'رحلة كل عائلة فريدة.' : "Every family's journey is unique.",
      p2: isAr ? 'نحن هنا لتوفير الإجابات الواضحة.' : "We are here to provide clear answers.",
      p3: isAr ? 'يسعدنا مناقشة أهداف عائلتك التعليمية.' : "We'd love to discuss your family's goals.",
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
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight drop-shadow-xl">
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

      {/* SUB-NAV */}
      <nav className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 hidden md:block">
        <div className="container-tight flex items-center justify-center gap-8 h-16">
          {Object.entries(t.nav).map(([key, label]) => (
            <button
              key={key}
              onClick={() => scrollTo(key === 'overview' ? 'intro' : key)}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all py-2 border-b-2 border-transparent hover:border-secondary"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* SECTION 2 — INTRO */}
      <section id="intro" className="py-16 lg:py-24">
        <div className="container-tight px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
                  {t.intro.title}
                </h2>
                <p className="text-lg lg:text-xl font-black text-secondary italic">
                  {t.intro.supporting}
                </p>
                <div className="h-1 w-16 bg-secondary rounded-full" />
              </div>
              <div className="space-y-6 text-slate-600 font-medium text-sm lg:text-base leading-relaxed">
                <p>{t.intro.content1}</p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group">
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
            <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
               <Image 
                src="/newyork.png" 
                alt="New York" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                unoptimized
               />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROCESS */}
      <section id="process" className="py-16 lg:py-24 bg-slate-50 border-y border-slate-100">
        <div className="container-tight px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
              {t.process.title}
            </h2>
            <p className="text-slate-500 font-bold text-sm lg:text-lg leading-relaxed italic">
              {t.process.intro}
            </p>
            <div className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{t.process.subtitle}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.process.steps.map((step) => (
              <Card key={step.id} className="rounded-2xl border-none shadow-premium bg-white group hover:shadow-xl transition-all duration-500 overflow-hidden">
                <CardHeader className="bg-primary p-6 text-white flex flex-row items-center gap-4">
                   <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center font-black shadow-lg">
                      {step.id}
                   </div>
                   <CardTitle className="text-base lg:text-lg font-black uppercase tracking-tight">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                   <p className="text-slate-600 font-bold text-sm lg:text-base leading-relaxed">{step.desc}</p>
                   <p className="text-slate-400 font-medium text-xs italic">{step.extra}</p>
                   
                   <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-4">
                      <div className="flex items-center gap-3">
                         <ShieldCheck className="h-5 w-5 text-secondary" />
                         <span className="font-black text-primary uppercase text-xs tracking-widest">{t.process.bbaSupport}</span>
                      </div>
                      <p className="text-slate-600 text-xs lg:text-sm font-bold leading-relaxed border-l-3 border-secondary pl-4">
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
      <section id="college" className="py-16 lg:py-24">
        <div className="container-tight px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-10">
               <div className="space-y-4">
                  <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
                    {t.college.title}
                  </h2>
                  <p className="text-lg lg:text-xl font-black text-secondary italic">
                    {t.college.supporting}
                  </p>
               </div>

               <div className="p-8 bg-slate-900 text-white rounded-2xl shadow-xl space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                     <GraduationCap className="h-24 w-24" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold italic relative z-10">{t.college.question}</h3>
                  <p className="text-2xl lg:text-4xl font-black text-secondary uppercase relative z-10">{t.college.answer}</p>
               </div>

               <div className="space-y-4 text-slate-600 font-medium text-sm lg:text-base leading-relaxed">
                  <p>{t.college.p1}</p>
                  <p className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic">{t.college.p2}</p>
               </div>

               <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-inner">
                  <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">{t.college.checklistTitle}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {t.college.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-secondary/30 transition-all">
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                        <span className="font-black text-primary text-[10px] lg:text-xs">{lang === 'ar' ? item.ar : item.en}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
               <Card className="rounded-2xl border-none shadow-xl bg-primary text-white p-8 relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 opacity-10">
                     <ShieldCheck className="h-48 w-48" />
                  </div>
                  <div className="relative z-10 space-y-6">
                     <div className="flex items-center gap-3">
                        <LayoutDashboard className="h-6 w-6 text-secondary" />
                        <h4 className="text-lg font-black uppercase tracking-widest">{isAr ? 'دعم الأكاديمية' : 'BBA Support'}</h4>
                     </div>
                     <p className="text-white font-black leading-relaxed text-sm lg:text-lg italic border-l-4 border-secondary pl-6 py-2">
                        {t.college.bba}
                     </p>
                  </div>
               </Card>

               <div className="bg-secondary/10 p-6 rounded-2xl border-2 border-dashed border-secondary/20 text-center">
                  <p className="text-sm lg:text-base font-black text-primary tracking-tight">
                    {t.college.closing}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — MISTAKES */}
      <section id="mistakes" className="py-16 lg:py-24 bg-slate-50 border-y border-slate-100">
        <div className="container-tight px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
               {t.mistakes.title}
            </h2>
            <p className="text-lg lg:text-xl font-black text-secondary italic">
               {t.mistakes.supporting}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {t.mistakes.list.map((mistake, idx) => (
                <Card key={idx} className="rounded-2xl border-none shadow-sm bg-white p-8 space-y-4 group hover:shadow-md transition-all">
                   <div className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <FileWarning className="h-5 w-5" />
                   </div>
                   <p className="text-slate-700 font-black text-xs lg:text-sm leading-relaxed">
                      {mistake}
                   </p>
                </Card>
             ))}
          </div>

          <div className="mt-10">
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
        </div>
      </section>

      {/* SECTION 6 — SUPPORT */}
      <section id="support" className="py-16 lg:py-24">
        <div className="container-tight px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
             <div className="lg:col-span-5 space-y-6">
                <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
                   {t.support.title}
                </h2>
                <div className="space-y-4 text-slate-600 font-medium text-sm lg:text-base leading-relaxed border-l-4 border-slate-100 pl-6 py-2">
                   <p>{t.support.intro}</p>
                   <p className="font-black text-primary italic text-base lg:text-lg">{t.support.responsibility}</p>
                </div>
             </div>

             <div className="lg:col-span-7">
                <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-inner space-y-8">
                   <h3 className="text-base lg:text-lg font-black text-primary uppercase tracking-tight flex items-center gap-3">
                      <CheckSquare className="h-5 w-5 text-secondary" />
                      {t.support.listIntro}
                   </h3>
                   
                   <div className="grid grid-cols-1 gap-3">
                      {t.support.items.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-50 hover:border-secondary/20 transition-all">
                            <div className="h-8 w-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center font-black text-[10px]">
                               {idx + 1}
                            </div>
                            <span className="font-black text-primary text-xs lg:text-sm">
                               {item}
                            </span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FOOTER CTA */}
      <section id="contact" className="py-16 lg:py-24 bg-primary relative overflow-hidden">
        <div className="container-tight relative z-10 px-4">
          <Card className="rounded-2xl border-none shadow-2xl bg-white p-8 lg:p-16 text-center space-y-8 max-w-4xl mx-auto">
             <div className="space-y-2">
                <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tight">{t.footer.title}</h2>
                <p className="text-base lg:text-xl font-black text-secondary italic">{t.footer.supporting}</p>
             </div>
             
             <div className="space-y-4 text-slate-600 font-bold text-sm lg:text-lg leading-relaxed">
                <p className="text-primary font-black text-lg lg:text-xl">{t.footer.p1}</p>
                <p>{t.footer.p2}</p>
             </div>

             <div className="pt-6">
                <Button asChild size="lg" className="h-16 px-10 text-lg lg:text-xl font-black bg-secondary hover:bg-primary text-white rounded-2xl shadow-xl transition-all border-4 border-transparent hover:border-secondary">
                   <Link href={`/${lang}/contact`}>
                      {t.footer.btn}
                      {isAr ? <ArrowLeft className="mr-3 h-6 w-6" /> : <ArrowRight className="ml-3 h-6 w-6" />}
                   </Link>
                </Button>
             </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
