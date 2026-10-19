'use client';

import { use, useState } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  Rocket, 
  BookOpen, 
  Monitor, 
  ShieldCheck, 
  HelpCircle, 
  MessageSquare,
  Mail,
  Phone,
  CheckCircle2,
  Users,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const getGuideSections = (isAr: boolean) => [
  {
    id: 'getting-started',
    icon: Rocket,
    title: isAr ? '1. البدء في BBA' : '1. Getting Started at BBA',
    description: isAr ? 'الخطوات الخمس الأولى لبداية رحلتك التعليمية بنجاح.' : 'The first five steps to begin your educational journey successfully.',
    content: (
      <div className="space-y-6 sm:space-y-8 py-2 sm:py-4">
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          {isAr 
            ? 'تهانينا لانضمامك إلى أكاديمية بنين وبنات! قبل بدء دورتك الأولى، اتبع الخطوات التالية:'
            : 'Congratulations on joining Banaat Academy! Before starting your first course, follow these steps:'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {[
            { t: isAr ? '1.1 البريد الترحيبي' : '1.1 Welcome Email', d: isAr ? 'يحتوي على بيانات الدخول وخطة الطالب ومعلومات المرشد.' : 'Contains login info, Student Plan, and mentor details.' },
            { t: isAr ? '1.2 حساب Edgenuity' : '1.2 Edgenuity Account', d: isAr ? 'المنصة الأساسية للدروس والمهام والتقييمات.' : 'The main platform for lessons, assignments, and assessments.' },
            { t: isAr ? '1.3 مراجعة الخطة' : '1.3 Review Your Plan', d: isAr ? 'خارطة الطريق الخاصة بك لإكمال 10 دورات سنوياً.' : 'Your roadmap for completing 10 courses annually.' },
            { t: isAr ? '1.4 لقاء المرشد' : '1.4 Meet Your Mentor', d: isAr ? 'نقطة اتصالك الأولى للدعم والتوجيه المستمر.' : 'Your first point of contact for ongoing support.' },
            { t: isAr ? '1.5 بدء الدراسة' : '1.5 Start Learning', d: isAr ? 'ابدأ والتزم بالعمل اليومي لبناء عادات دراسية جيدة.' : 'Begin and stick to a daily routine for best results.' }
          ].map((s, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-black text-primary text-xs sm:text-sm">{s.t}</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-bold leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    icon: BookOpen,
    title: isAr ? '2. آلية عمل البرنامج' : '2. How the BBA Program Works',
    description: isAr ? 'فهم نظام التعلم الذاتي والمرونة الأكاديمية.' : 'Understanding the self-paced learning system and academic flexibility.',
    content: (
      <div className="space-y-6 py-2 sm:py-4">
        <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
          {isAr 
            ? 'بدلاً من الفصول التقليدية، يكمل الطلاب دوراتهم عبر الإنترنت عبر Edgenuity مع توجيه فريق BBA الأكاديمي.'
            : 'Instead of traditional classes, students complete coursework online through Edgenuity with BBA academic guidance.'}
        </p>
        <div className="space-y-3">
          {[
            { t: isAr ? 'التعلم الذاتي' : 'Learn at Your Own Pace', d: isAr ? 'لا توجد ساعات عمل إجبارية، يمكنك بناء جدول يناسب نمط حياتك.' : 'No required daily class hours; build a schedule that fits your lifestyle.' },
            { t: isAr ? 'التقدم هو المقياس' : 'Progress Is Key', d: isAr ? 'النجاح يقاس بالتقدم الأكاديمي، وليس بساعات الحضور.' : 'Success is measured by academic progress, not attendance hours.' },
            { t: isAr ? 'الدعم الفردي' : 'One-on-One Support', d: isAr ? 'مرشدك يتابع تقدمك ويساعدك في تجاوز التحديات.' : 'Your mentor monitors progress and helps you overcome challenges.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-3 sm:gap-4 p-4 rounded-xl bg-white border border-slate-100">
              <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <div className="h-2 w-2 rounded-full bg-secondary" />
              </div>
              <div>
                <h4 className="font-black text-primary text-xs sm:text-sm mb-1">{item.t}</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 font-bold">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-primary text-white p-5 sm:p-8 rounded-[2rem] space-y-6">
          <h4 className="font-black text-secondary uppercase tracking-widest text-center text-[10px] sm:text-xs">{isAr ? 'معادلة النجاح في BBA' : 'The BBA Success Formula'}</h4>
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {['1', '2', '3', '4', '5'].map((n) => (
              <div key={n} className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-xs sm:text-sm">{n}</div>
                <div className="h-0.5 w-full bg-white/10" />
              </div>
            ))}
          </div>
          <p className="text-[10px] sm:text-xs font-bold opacity-80 text-center leading-relaxed">
            {isAr ? 'دخول يومي ➔ إنجاز 5-7% ➔ دورة شهرياً ➔ 10 دورات سنوياً ➔ تخرج!' : 'Login ➔ 5-7% Progress ➔ 1 Course/Mo ➔ 10 Courses/Yr ➔ Graduate!'}
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'edgenuity',
    icon: Monitor,
    title: isAr ? '3. منصة Edgenuity التعليمية' : '3. Getting Started with Edgenuity',
    description: isAr ? 'دليلك لاستخدام منصة التعلم والوصول للمواد.' : 'Your guide to using the learning platform and accessing materials.',
    content: (
      <div className="space-y-6 py-2 sm:py-4 text-center">
        <div className="aspect-video bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl group relative">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/wTuSRO3BJ8k"
            title="BBA Academy - Edgenuity Orientation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-start">
          {[
            { t: isAr ? 'الوصول للدروس' : 'Access Courses', d: isAr ? 'شاهد كافة موادك الدراسية في مكان واحد منظم.' : 'Access all your courses in one convenient location.' },
            { t: isAr ? 'تتبع الدرجات' : 'Track Grades', d: isAr ? 'راقب أداءك الأكاديمي وتقدمك في أي وقت.' : 'Monitor performance and overall progress anytime.' }
          ].map((i, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-black text-primary text-xs mb-1">{i.t}</h4>
              <p className="text-[11px] text-slate-500 font-bold">{i.d}</p>
            </div>
          ))}
        </div>
        <Button asChild className="w-full h-14 bg-secondary hover:bg-primary text-white font-black rounded-2xl gap-3">
          <Link href="https://student.edgenuity.com/login" target="_blank">
            {isAr ? 'دخول منصة الطالب' : 'Student Login'}
            <GraduationCap className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    )
  },
  {
    id: 'agreement',
    icon: ShieldCheck,
    title: isAr ? '4. اتفاقية الطالب وولي الأمر' : '4. The BBA Student Agreement',
    description: isAr ? 'المسؤوليات المشتركة لضمان رحلة تعليمية ناجحة.' : 'Shared responsibilities for a successful learning journey.',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-2 sm:py-4">
        <div className="p-6 bg-slate-50 rounded-[2rem] space-y-4">
          <h4 className="flex items-center gap-2 font-black text-primary text-sm">
            <UserCheck className="h-4 w-4 text-secondary" />
            {isAr ? 'توقعاتنا من الطالب' : 'Student Expectations'}
          </h4>
          <ul className="space-y-3">
            {[
              isAr ? 'الدخول يومياً وتحقيق تقدم 5-7%.' : 'Log in daily and make 5–7% progress.',
              isAr ? 'الرد على رسائل المرشد بانتظام.' : 'Respond to mentor messages regularly.',
              isAr ? 'إنجاز المهام بصدق وجهد شخصي.' : 'Complete all work honestly.'
            ].map((li, i) => (
              <li key={i} className="flex gap-2 text-xs font-bold text-slate-500 leading-relaxed">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                {li}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 bg-white border border-slate-100 rounded-[2rem] space-y-4 shadow-sm">
          <h4 className="flex items-center gap-2 font-black text-primary text-sm">
            <Users className="h-4 w-4 text-secondary" />
            {isAr ? 'دور أولياء الأمور' : 'Parent Responsibilities'}
          </h4>
          <ul className="space-y-3">
            {[
              isAr ? 'تشجيع الروتين اليومي للتعلم.' : 'Encourage a daily learning routine.',
              isAr ? 'التواصل المستمر مع الأكاديمية.' : 'Stay in communication with BBA.',
              isAr ? 'متابعة التقدم الأكاديمي دورياً.' : 'Monitor academic progress regularly.'
            ].map((li, i) => (
              <li key={i} className="flex gap-2 text-xs font-bold text-slate-500 leading-relaxed">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                {li}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'courses-faqs',
    icon: HelpCircle,
    title: isAr ? '5. فهم الدورات (الأسئلة الشائعة)' : '5. Understanding Your Courses (FAQs)',
    description: isAr ? 'إجابات على الأسئلة الشائعة حول المواد والتقييمات.' : 'Answers to common questions about materials and assessments.',
    content: (
      <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
        {[
          { q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب خلال العام الدراسي.' : 'Most students are assigned 10 courses for the school year.' },
          { q: isAr ? 'هل يمكنني العمل على أكثر من دورة؟' : 'Can I work on more than one course?', a: isAr ? 'في معظم الحالات، لا. التركيز على دورة واحدة يحسن التعلم.' : 'In most cases, NO. Focusing on one course at a time improves learning.' },
          { q: isAr ? 'كم تستغرق كل دورة؟' : 'How long should each course take?', a: isAr ? 'عادة 3-4 أسابيع عند الالتزام بالتقدم اليومي المطلوب.' : 'Typically 3–4 weeks with consistent daily progress.' },
          { q: isAr ? 'هل يمكنني العمل مسبقاً؟' : 'Can I work ahead?', a: isAr ? 'نعم، ولكن بحد أقصى دورتين في الشهر الواحد.' : 'Yes, but limited to two courses per month.' }
        ].map((faq, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-2">
            <h4 className="font-black text-primary text-xs sm:text-sm">{faq.q}</h4>
            <p className="text-[11px] sm:text-xs text-slate-500 font-bold leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'support',
    icon: MessageSquare,
    title: isAr ? '6. الدعم والتواصل' : '6. Support & Communication',
    description: isAr ? 'كيفية الحصول على المساعدة الأكاديمية والتقنية.' : 'How to get academic and technical assistance.',
    content: (
      <div className="space-y-6 py-2 sm:py-4">
        <p className="text-slate-600 font-medium italic text-sm sm:text-base text-center">
          {isAr ? '"نحن معك في كل خطوة، النجاح يُبنى بالجهد المستمر والتواصل."' : '"Success is built through consistent effort, curiosity, and perseverance every step of the way."'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
               <Mail className="h-5 w-5 text-secondary" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase text-slate-400">Email</div>
              <div className="text-xs sm:text-sm font-black text-primary truncate">banaatacademy@gmail.com</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
               <Phone className="h-5 w-5 text-secondary" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase text-slate-400">Phone</div>
              <div className="text-xs sm:text-sm font-black text-primary">(313) 455-0322</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const sections = getGuideSections(isAr);

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Glowing Header Section */}
      <section className="bg-primary pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="container-tight relative z-10 text-center space-y-4 px-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            {isAr ? 'دليل طالب BBA' : 'BBA Student Guide'}
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-white/80 font-bold max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'كل ما يحتاجه الطلاب وأولياء الأمور لعام دراسي ناجح ومتميز.' 
              : 'Everything Students & Parents Need to Know for a Successful School Year.'}
          </p>
          <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
        </div>
      </section>

      <div className="container-tight py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Main Expandable List (Accordion) */}
          <Accordion type="single" collapsible className="space-y-4">
            {sections.map((section) => (
              <AccordionItem 
                key={section.id} 
                value={section.id}
                className="bg-white border border-slate-100 rounded-[1.5rem] sm:rounded-[2.5rem] px-5 sm:px-10 shadow-premium overflow-hidden transition-all duration-300 hover:shadow-xl group data-[state=open]:ring-4 data-[state=open]:ring-secondary/5"
              >
                <AccordionTrigger className="hover:no-underline py-6 sm:py-8 group">
                  <div className="flex items-center gap-4 sm:gap-6 text-start">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center shrink-0 transition-all group-hover:bg-secondary group-hover:text-white shadow-inner">
                      <section.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-xl font-black text-primary group-hover:text-secondary transition-colors leading-tight">{section.title}</h3>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-bold leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 sm:pb-12 border-t border-slate-50 animate-in fade-in slide-in-from-top-4 duration-500">
                   {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Responsive Bottom CTA */}
          <div className="bg-primary text-white p-8 sm:p-16 rounded-[2rem] sm:rounded-[3.5rem] shadow-2xl relative overflow-hidden text-center space-y-8 mt-12 sm:mt-20">
             <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                  {isAr ? 'نحن معك في كل خطوة' : 'We\'re With You Every Step'}
                </h2>
                <p className="text-xs sm:text-lg opacity-80 font-medium leading-relaxed">
                  {isAr 
                    ? 'النجاح لا يتعلق بالكمال، بل بالحضور والاستمرارية والتقدم نحو أهدافك.'
                    : 'Success isn\'t about being perfect—it\'s about showing up, staying consistent, and moving forward.'}
                </p>
                <Button asChild className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-full px-8 sm:px-12 h-12 sm:h-16 mt-6 transition-all shadow-xl shadow-secondary/20">
                  <Link href={`/${lang}/contact`}>
                    {isAr ? 'تواصل معنا للدعم' : 'Contact Support'}
                    {isAr ? <ChevronLeft className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
                  </Link>
                </Button>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck className="h-32 w-32 sm:h-64 sm:w-64" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
