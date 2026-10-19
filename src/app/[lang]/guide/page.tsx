
'use client';

import { useState, useMemo, use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  Search, 
  Rocket, 
  BookOpen, 
  Monitor, 
  ClipboardCheck, 
  HelpCircle, 
  ShieldCheck, 
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  CheckCircle2,
  Users,
  UserCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
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
      <div className="space-y-8 py-4">
        <p className="text-slate-600 font-medium">
          {isAr 
            ? 'تهانينا لانضمامك إلى أكاديمية بنين وبنات! قبل بدء دورتك الأولى، اتبع الخطوات التالية:'
            : 'Congratulations on joining Banaat Academy! Before starting your first course, follow these steps:'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: isAr ? '1.1 البريد الترحيبي' : '1.1 Welcome Email', d: isAr ? 'يحتوي على بيانات الدخول وخطة الطالب ومعلومات المرشد.' : 'Contains login info, Student Plan, and mentor details.' },
            { t: isAr ? '1.2 حساب Edgenuity' : '1.2 Edgenuity Account', d: isAr ? 'المنصة الأساسية للدروس والمهام والتقييمات.' : 'The main platform for lessons, assignments, and assessments.' },
            { t: isAr ? '1.3 مراجعة الخطة' : '1.3 Review Your Plan', d: isAr ? 'خارطة الطريق الخاصة بك لإكمال 10 دورات سنوياً.' : 'Your roadmap for completing 10 courses annually.' },
            { t: isAr ? '1.4 لقاء المرشد' : '1.4 Meet Your Mentor', d: isAr ? 'نقطة اتصالك الأولى للدعم والتوجيه المستمر.' : 'Your first point of contact for ongoing support.' },
            { t: isAr ? '1.5 بدء الدراسة' : '1.5 Start Learning', d: isAr ? 'ابدأ والتزم بالعمل اليومي لبناء عادات دراسية جيدة.' : 'Begin and stick to a daily routine for best results.' }
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-black text-primary text-sm">{s.t}</h4>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">{s.d}</p>
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
      <div className="space-y-6 py-4">
        <p className="text-slate-600 font-medium leading-relaxed">
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
            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-100">
              <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <div className="h-2 w-2 rounded-full bg-secondary" />
              </div>
              <div>
                <h4 className="font-black text-primary text-sm mb-1">{item.t}</h4>
                <p className="text-xs text-slate-500 font-bold">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-primary text-white p-6 rounded-[2rem] space-y-4">
          <h4 className="font-black text-secondary uppercase tracking-widest text-xs">{isAr ? 'معادلة النجاح' : 'The BBA Success Formula'}</h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {['1', '2', '3', '4', '5'].map((n) => (
              <div key={n} className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center font-black text-xs">{n}</div>
                <div className="h-0.5 w-full bg-white/10" />
              </div>
            ))}
          </div>
          <p className="text-[10px] font-bold opacity-80 text-center">
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
      <div className="space-y-6 py-4 text-center">
        <div className="aspect-video bg-slate-900 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden group">
          <Monitor className="h-12 w-12 text-white/20 group-hover:scale-110 transition-transform" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
          {[
            { t: isAr ? 'الدروس' : 'Courses', d: isAr ? 'الوصول لكافة المواد في مكان واحد.' : 'Access all courses in one place.' },
            { t: isAr ? 'الدرجات' : 'Grades', d: isAr ? 'مراقبة الأداء والتقدم في أي وقت.' : 'Monitor performance and progress anytime.' }
          ].map((i, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-black text-primary text-xs mb-1">{i.t}</h4>
              <p className="text-[10px] text-slate-500 font-bold">{i.d}</p>
            </div>
          ))}
        </div>
        <Button asChild className="w-full h-14 bg-secondary hover:bg-primary text-white font-black rounded-2xl gap-3">
          <Link href="https://student.edgenuity.com/login" target="_blank">
            {isAr ? 'تسجيل دخول الطالب' : 'Student Login'}
            <ExternalLink className="h-4 w-4" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div className="p-6 bg-slate-50 rounded-[2rem] space-y-4">
          <h4 className="flex items-center gap-2 font-black text-primary text-sm">
            <UserCheck className="h-4 w-4 text-secondary" />
            {isAr ? 'مسؤوليات الطالب' : 'Student Expectations'}
          </h4>
          <ul className="space-y-3">
            {[
              isAr ? 'الدخول يومياً وتحقيق تقدم 5-7%.' : 'Log in daily and make 5–7% progress.',
              isAr ? 'الرد على رسائل المرشد بانتظام.' : 'Respond to mentor messages regularly.',
              isAr ? 'إنجاز المهام بصدق وجهد شخصي.' : 'Complete all work honestly.'
            ].map((li, i) => (
              <li key={i} className="flex gap-2 text-xs font-bold text-slate-500">
                <CheckCircle2 className="h-3 w-3 text-secondary shrink-0 mt-0.5" />
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
              <li key={i} className="flex gap-2 text-xs font-bold text-slate-500">
                <CheckCircle2 className="h-3 w-3 text-secondary shrink-0 mt-0.5" />
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
      <div className="space-y-4 py-4">
        {[
          { q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب خلال العام الدراسي.' : 'Most students are assigned 10 courses for the school year.' },
          { q: isAr ? 'هل يمكنني العمل على أكثر من دورة؟' : 'Can I work on more than one course?', a: isAr ? 'في معظم الحالات، لا. التركيز على دورة واحدة يحسن التعلم.' : 'In most cases, NO. Focusing on one course at a time improves learning.' },
          { q: isAr ? 'كم تستغرق كل دورة؟' : 'How long should each course take?', a: isAr ? 'عادة 3-4 أسابيع عند الالتزام بالتقدم اليومي المطلوب.' : 'Typically 3–4 weeks with consistent daily progress.' },
          { q: isAr ? 'هل يمكنني العمل مسبقاً؟' : 'Can I work ahead?', a: isAr ? 'نعم، نشجع على ذلك ولكن بحد أقصى دورتين شهرياً.' : 'Yes, but generally limited to two courses per month.' }
        ].map((faq, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-2">
            <h4 className="font-black text-primary text-xs">{faq.q}</h4>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{faq.a}</p>
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
      <div className="space-y-6 py-4">
        <p className="text-slate-600 font-medium italic">
          {isAr ? '"نحن معك في كل خطوة، التعليم يكون أقوى عندما نعمل كشركاء."' : '"We are with you every step of the way; education is stronger when we work together."'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <Mail className="h-6 w-6 text-secondary" />
            <div>
              <div className="text-[10px] font-black uppercase text-slate-400">Email</div>
              <div className="text-sm font-black text-primary">banaatacademy@gmail.com</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <Phone className="h-6 w-6 text-secondary" />
            <div>
              <div className="text-[10px] font-black uppercase text-slate-400">Phone</div>
              <div className="text-sm font-black text-primary">(313) 455-0322</div>
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
  const [search, setSearch] = useState('');

  const filteredSections = useMemo(() => {
    if (!search) return sections;
    return sections.filter(s => 
      s.title.toLowerCase().includes(search.toLowerCase()) || 
      s.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, sections]);

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-20 z-30 transition-all py-6 shadow-sm">
        <div className="container-tight flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-start">
             <h1 className="text-2xl font-black text-primary uppercase tracking-tight">{isAr ? 'دليل طالب BBA' : 'BBA Student Guide'}</h1>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{isAr ? 'كل ما تحتاجه لعام دراسي ناجح' : 'Everything you need for a successful year'}</p>
          </div>
          <div className="relative w-full max-w-sm group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
            <Input 
              placeholder={isAr ? 'ابحث في الدليل...' : 'Search the guide...'} 
              className="pl-11 h-12 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-secondary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container-tight py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Accordion List */}
          <Accordion type="single" collapsible className="space-y-4">
            {filteredSections.map((section) => (
              <AccordionItem 
                key={section.id} 
                value={section.id}
                className="bg-white border border-slate-100 rounded-[2rem] px-6 sm:px-10 shadow-premium overflow-hidden data-[state=open]:ring-2 data-[state=open]:ring-secondary/20 transition-all"
              >
                <AccordionTrigger className="hover:no-underline py-8 group">
                  <div className="flex items-center gap-6 text-start">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center shrink-0 transition-all group-hover:bg-secondary group-hover:text-white shadow-inner">
                      <section.icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-black text-primary group-hover:text-secondary transition-colors leading-tight">{section.title}</h3>
                      <p className="text-xs text-slate-400 font-bold leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-10 border-t border-slate-50 animate-in fade-in duration-500">
                   {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredSections.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-slate-300" />
               </div>
               <p className="text-slate-400 font-bold italic">{isAr ? 'لم يتم العثور على نتائج للبحث.' : 'No results found for your search.'}</p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="bg-primary text-white p-10 lg:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden text-center space-y-8 mt-12">
             <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                  {isAr ? 'نحن معك في كل خطوة على الطريق' : 'We\'re With You Every Step of the Way'}
                </h2>
                <p className="text-sm sm:text-lg opacity-80 font-medium leading-relaxed">
                  {isAr 
                    ? 'تذكر، النجاح لا يتعلق بالكمال، بل بالحضور والاستمرارية والتقدم نحو أهدافك.'
                    : 'Remember, success isn\'t about being perfect—it\'s about showing up, staying consistent, and moving forward.'}
                </p>
                <Button asChild className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-full px-10 h-14 mt-6">
                  <Link href={`/${lang}/contact`}>
                    {isAr ? 'تواصل معنا للدعم' : 'Contact Support'}
                    <ArrowRight className={cn("h-4 w-4 ml-2", isAr && "rotate-180")} />
                  </Link>
                </Button>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck className="h-64 w-64" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
