
'use client';

import { useState, useMemo, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { use } from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  LayoutGrid, 
  BookOpen, 
  Rocket, 
  Monitor, 
  ClipboardCheck, 
  HelpCircle, 
  UserCheck, 
  ShieldCheck, 
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  X,
  Menu,
  ExternalLink,
  Mail,
  Phone,
  Users
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// --- Data Structure ---
const getGuideData = (isAr: boolean) => [
  {
    id: 'getting-started',
    icon: Rocket,
    title: isAr ? 'البدء في BBA' : 'Getting Started at BBA',
    description: isAr ? 'الخطوات الخمس الأولى لبداية رحلتك التعليمية.' : 'The first five steps to begin your educational journey.',
    content: (
      <div className="space-y-12">
        <header className="space-y-4">
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            {isAr 
              ? 'تهانينا لانضمامك إلى أكاديمية بنين وبنات! بمجرد اكتمال تسجيلك، ستكون جاهزاً لبدء رحلة التعلم. اتبع هذه الخطوات بعناية:'
              : 'Congratulations on joining Banaat Academy! Once your enrollment is complete, you are ready to start. Follow these steps carefully:'}
          </p>
        </header>

        <div className="space-y-8">
          {[
            {
              n: "01",
              t: isAr ? 'التحقق من البريد الترحيبي' : 'Check Your Welcome Email',
              d: isAr ? 'يحتوي على معلومات الدخول، خطة الطالب الشخصية، ومعلومات التواصل مع مرشدك. تأكد من فحص البريد المهمل (Spam).' : 'Contains login info, your Student Plan, and mentor contact details. Be sure to check your Spam folder.'
            },
            {
              n: "02",
              t: isAr ? 'تسجيل الدخول إلى Edgenuity' : 'Log Into Edgenuity',
              d: isAr ? 'المنصة الأساسية لإكمال الدروس والمهام. شاهد الفيديو التوجيهي إذا كنت تستخدمها لأول مرة.' : 'The main platform for lessons and assignments. Watch the orientation video if you are new.'
            },
            {
              n: "03",
              t: isAr ? 'مراجعة خطة الطالب' : 'Review Your Student Plan',
              d: isAr ? 'خارطة الطريق الخاصة بك. عادة ما يكمل الطلاب 10 دورات سنوياً بمعدل دورة كل شهر.' : 'Your educational roadmap. Typically 10 courses per year, averaging one per month.'
            },
            {
              n: "04",
              t: isAr ? 'لقاء المرشد الأكاديمي' : 'Meet Your Mentor',
              d: isAr ? 'مرشدك هو نقطة الاتصال الأولى للإجابة على تساؤلاتك ومتابعة تقدمك.' : 'Your mentor is your first point of contact for questions and progress monitoring.'
            },
            {
              n: "05",
              t: isAr ? 'بدء الدورة الأولى' : 'Start Your First Course',
              d: isAr ? 'ابدأ بالدورة الأولى والتزم بالعمل اليومي لبناء عادات دراسية جيدة.' : 'Begin your first course and stick to a daily routine for best results.'
            }
          ].map((step, i) => (
            <div key={i} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-xs shrink-0 shadow-lg shadow-primary/20">
                  {step.n}
                </div>
                {i < 4 && <div className="w-px h-full bg-slate-200 my-2" />}
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-black text-primary mb-2 group-hover:text-secondary transition-colors">{step.t}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    icon: BookOpen,
    title: isAr ? 'آلية عمل البرنامج' : 'How the BBA Program Works',
    description: isAr ? 'فهم الاختلاف عن المدارس التقليدية ونظام المرونة.' : 'Understanding the difference from traditional schools and flexibility.',
    content: (
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              t: isAr ? 'تعلم بالسرعة التي تناسبك' : 'Learn at Your Own Pace', 
              d: isAr ? 'لا توجد ساعات عمل إجبارية، مما يسمح لك ببناء جدول يناسب نمط حياتك.' : 'No required daily class hours, letting you build a schedule that fits your lifestyle.' 
            },
            { 
              t: isAr ? 'التقدم هو المقياس' : 'Progress Is Key', 
              d: isAr ? 'النجاح لا يقاس بالحضور، بل بإكمال 5-7% من المادة يومياً.' : 'Success isn\'t measured by attendance but by completing 5–7% daily.' 
            },
            { 
              t: isAr ? 'الدعم الفردي' : 'One-on-One Support', 
              d: isAr ? 'مرشدك يتابع تقدمك ويساعدك في تجاوز التحديات الأكاديمية.' : 'Your mentor monitors progress and helps you overcome academic challenges.' 
            },
            { 
              t: isAr ? 'تعلم من أي مكان' : 'Learn From Anywhere', 
              d: isAr ? 'فصلك الدراسي معك أينما وجد الإنترنت المستقر.' : 'Your classroom is with you wherever you have stable internet.' 
            }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <h4 className="text-lg font-black text-primary mb-3">{item.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'edgenuity-guide',
    icon: Monitor,
    title: isAr ? 'دليل Edgenuity' : 'Getting Started with Edgenuity',
    description: isAr ? 'كيفية استخدام منصة التعلم والوصول للمواد.' : 'How to use the learning platform and access materials.',
    content: (
      <div className="space-y-12">
        <div className="aspect-video bg-slate-900 rounded-[2.5rem] flex items-center justify-center border-8 border-white shadow-2xl overflow-hidden group">
          <div className="text-center p-8 space-y-4">
             <div className="h-20 w-20 bg-white/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform cursor-pointer">
                <Monitor className="h-10 w-10 text-white" />
             </div>
             <p className="text-white font-bold">{isAr ? 'شاهد الفيديو التوجيهي للمنصة' : 'Watch the Platform Orientation Video'}</p>
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white rounded-full px-12 h-16 font-black shadow-2xl shadow-secondary/20 transition-all scale-100 hover:scale-105">
            <Link href="https://student.edgenuity.com/login" target="_blank">
              {isAr ? 'تسجيل الدخول للمنصة' : 'Student Login to Edgenuity'}
              <ExternalLink className={cn("h-4 w-4", isAr ? "mr-2" : "ml-2")} />
            </Link>
          </Button>
        </div>
      </div>
    )
  },
  {
    id: 'success-formula',
    icon: ClipboardCheck,
    title: isAr ? 'معادلة النجاح' : 'Student Plan & Success Formula',
    description: isAr ? 'خمس خطوات تضمن لك التخرج في الوقت المحدد.' : 'Five steps ensuring you graduate on time.',
    content: (
      <div className="space-y-12">
        <div className="bg-primary text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { n: "1", t: isAr ? "دخول يومي" : "Daily Login" },
              { n: "2", t: isAr ? "5-7% إنجاز" : "5-7% Done" },
              { n: "3", t: isAr ? "دورة شهرياً" : "1 Course/Mo" },
              { n: "4", t: isAr ? "10 دورات سنوياً" : "10 Courses/Yr" },
              { n: "5", t: isAr ? "تخرج بنجاح" : "Graduate!" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-secondary text-white flex items-center justify-center font-black text-xl shadow-lg">
                  {step.n}
                </div>
                <p className="text-xs font-black uppercase tracking-widest">{step.t}</p>
                {i < 4 && <ArrowRight className={cn("hidden md:block h-4 w-4 text-white/20", isAr && "rotate-180")} />}
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ClipboardCheck className="h-64 w-64" />
          </div>
        </div>
        <p className="text-center text-slate-500 font-bold italic">
          {isAr ? '"الطلاب الذين يحققون تقدماً طفيفاً كل يوم هم الأكثر نجاحاً."' : '"Students who make a little progress every day are the most successful."'}
        </p>
      </div>
    )
  },
  {
    id: 'understanding-courses',
    icon: HelpCircle,
    title: isAr ? 'فهم الدورات والتقييمات' : 'Understanding Courses & Assessments',
    description: isAr ? 'إجابات على الأسئلة الشائعة حول المواد.' : 'Answers to common questions about materials.',
    content: (
      <div className="space-y-6">
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { 
              q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', 
              a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب خلال العام الدراسي، وهي موضحة في خطتك الشخصية.' : 'Most students are assigned 10 courses to complete during the school year, as outlined in your personalized Student Plan.'
            },
            { 
              q: isAr ? 'هل يمكنني العمل على أكثر من دورة؟' : 'Can I work on more than one course?', 
              a: isAr ? 'في معظم الحالات، لا. التركيز على دورة واحدة يحسن التعلم ويمنع الارتباك.' : 'In most cases, NO. Focusing on one course at a time improves learning and prevents becoming overwhelmed.'
            },
            { 
              q: isAr ? 'هل يمكنني إعادة الاختبارات؟' : 'Can I redo assignments or exams?', 
              a: isAr ? 'نعم، إذا كانت الدرجة أقل من النجاح، لكن فرص الإعادة محدودة وتتطلب تنسيقاً مع المرشد.' : 'Yes, if the grade is below passing, but retake opportunities are limited and require coordination with your mentor.'
            },
            { 
              q: isAr ? 'كم تستغرق كل دورة؟' : 'How long should each course take?', 
              a: isAr ? 'عادة 3-4 أسابيع عند الالتزام بالتقدم اليومي المطلوب (5-7%).' : 'Typically 3–4 weeks when maintaining the required daily progress (5–7%).'
            }
          ].map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-white border border-slate-100 rounded-3xl px-8 shadow-sm">
              <AccordionTrigger className="text-primary font-black hover:no-underline text-start py-6">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 font-medium leading-relaxed pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  },
  {
    id: 'agreements',
    icon: ShieldCheck,
    title: isAr ? 'اتفاقية الطالب والأهل' : 'Student Agreement & Parent Responsibilities',
    description: isAr ? 'المسؤوليات المشتركة لضمان بيئة تعليمية ناجحة.' : 'Shared responsibilities for a successful learning environment.',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
          <h4 className="text-xl font-black text-primary flex items-center gap-3">
            <UserCheck className="h-6 w-6 text-secondary" />
            {isAr ? 'مسؤوليات الطالب' : 'Student Expectations'}
          </h4>
          <ul className="space-y-4">
            {[
              isAr ? 'الدخول للمنصة بانتظام وتحقيق تقدم ثابت.' : 'Log in regularly and make consistent progress.',
              isAr ? 'إكمال 5-7% من المادة كل يوم عمل.' : 'Complete 5–7% of coursework each weekday.',
              isAr ? 'الرد على رسائل المرشد الأكاديمي.' : 'Read and respond to messages from your mentor.',
              isAr ? 'إنجاز المهام بصدق وبجهد شخصي.' : 'Complete all assignments honestly using your own work.'
            ].map((li, i) => (
              <li key={i} className="flex gap-4 text-sm font-bold text-slate-600">
                <div className="h-2 w-2 rounded-full bg-secondary shrink-0 mt-1.5" />
                {li}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-6">
          <h4 className="text-xl font-black text-primary flex items-center gap-3">
            <Users className="h-6 w-6 text-secondary" />
            {isAr ? 'دور أولياء الأمور' : 'Parent Responsibilities'}
          </h4>
          <ul className="space-y-4">
            {[
              isAr ? 'تشجيع الطالب على الحفاظ على روتين يومي.' : 'Encourage a consistent learning routine.',
              isAr ? 'التواصل المستمر مع المرشدين والأكاديمية.' : 'Stay in communication with mentors and BBA.',
              isAr ? 'مراقبة التقدم الأكاديمي بشكل دوري.' : 'Monitor child\'s academic progress regularly.',
              isAr ? 'دعم الطالب في البقاء متحفزاً ومنظماً.' : 'Support child in staying motivated and organized.'
            ].map((li, i) => (
              <li key={i} className="flex gap-4 text-sm font-bold text-slate-600">
                <div className="h-2 w-2 rounded-full bg-secondary shrink-0 mt-1.5" />
                {li}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'support',
    icon: MessageSquare,
    title: isAr ? 'الدعم والتواصل' : 'Support & Communication',
    description: isAr ? 'نحن معك في كل خطوة، تواصل معنا عند الحاجة.' : 'We are with you every step, reach out whenever needed.',
    content: (
      <div className="space-y-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-xl font-bold text-primary italic leading-relaxed">
            {isAr ? '"التعليم يكون أقوى عندما تعمل المدارس والعائلات معاً كشركاء."' : '"Education is strongest when schools and families work together as partners."'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex flex-col items-center gap-4">
            <Mail className="h-8 w-8 text-secondary" />
            <div className="text-sm font-black text-slate-400 uppercase tracking-widest">Email</div>
            <div className="text-lg font-black text-primary">banaatacademy@gmail.com</div>
          </div>
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex flex-col items-center gap-4">
            <Phone className="h-8 w-8 text-secondary" />
            <div className="text-sm font-black text-slate-400 uppercase tracking-widest">Phone</div>
            <div className="text-lg font-black text-primary">(313) 455-0322</div>
          </div>
        </div>
      </div>
    )
  }
];

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const data = getGuideData(isAr);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeSection = data.find(s => s.id === activeId);
  const currentIndex = data.findIndex(s => s.id === activeId);

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [search, data]);

  const handleNav = (dir: 'next' | 'prev') => {
    const nextIdx = dir === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIdx >= 0 && nextIdx < data.length) {
      setActiveId(data[nextIdx].id);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeId]);

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Search Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-20 z-40 transition-all">
        <div className="container-tight h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            {activeId && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setActiveId(null)}
                className="text-primary hover:bg-slate-100 rounded-xl"
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
            )}
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
              <Input 
                placeholder={isAr ? 'ابحث في محتوى الدليل...' : 'Search guide content...'} 
                className="pl-11 h-12 bg-slate-50 border-none rounded-2xl font-medium focus:ring-2 focus:ring-secondary/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {activeId && (
            <Button variant="ghost" size="icon" className="lg:hidden text-primary" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>
      </nav>

      <div className="container-tight py-12 lg:py-20 flex">
        <main className="flex-1 min-w-0">
          {!activeId ? (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary font-black text-[10px] uppercase tracking-[0.2em]">
                  <Rocket className="h-3 w-3" />
                  {isAr ? 'دليل الطالب الرسمي' : 'Official Student Guide'}
                </div>
                <h1 className="text-4xl lg:text-7xl font-black text-primary tracking-tight leading-tight uppercase">
                  {isAr ? 'مركز BBA الإرشادي' : 'BBA Guide Hub'}
                </h1>
                <p className="text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                  {isAr 
                    ? 'وجهتك الشاملة لفهم آلية الدراسة وضمان رحلة تعليمية ناجحة ومثمرة.'
                    : 'Your comprehensive destination for understanding the study system and ensuring a successful journey.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((s) => (
                  <Card 
                    key={s.id} 
                    className="group rounded-[2.5rem] border-none shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer bg-white overflow-hidden"
                    onClick={() => setActiveId(s.id)}
                  >
                    <CardContent className="p-10 space-y-6">
                      <div className="h-16 w-16 rounded-3xl bg-slate-50 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all shadow-inner">
                        <s.icon className="h-8 w-8" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-black text-primary group-hover:text-secondary transition-colors leading-tight">{s.title}</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">{s.description}</p>
                      </div>
                      <div className="pt-4 flex items-center gap-3 text-secondary font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        {isAr ? 'استكشف القسم' : 'Explore Section'}
                        {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="space-y-8">
                <nav className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setActiveId(null)}>
                    {isAr ? 'دليل الطالب' : 'Guide Hub'}
                  </span>
                  <ChevronRight className={cn("h-3 w-3", isAr && "rotate-180")} />
                  <span className="text-secondary">{activeSection?.title}</span>
                </nav>
                <div className="flex items-center gap-8">
                  <div className="h-20 w-20 rounded-[2rem] bg-secondary text-white flex items-center justify-center shrink-0 shadow-2xl shadow-secondary/20">
                    {activeSection && <activeSection.icon className="h-10 w-10" />}
                  </div>
                  <h2 className="text-3xl lg:text-6xl font-black text-primary leading-tight uppercase tracking-tight">
                    {activeSection?.title}
                  </h2>
                </div>
              </div>

              <div className="bg-white rounded-[3.5rem] p-10 lg:p-20 shadow-premium border border-slate-100">
                {activeSection?.content}
              </div>

              <div className="flex justify-between items-center py-12 border-t mt-12">
                <Button 
                  variant="outline" 
                  disabled={currentIndex === 0}
                  onClick={() => handleNav('prev')}
                  className="rounded-full h-14 px-10 font-bold gap-3 border-slate-200 text-slate-400 hover:text-primary transition-all"
                >
                  {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  {isAr ? 'السابق' : 'Previous'}
                </Button>
                <Button 
                  onClick={() => handleNav('next')}
                  disabled={currentIndex === data.length - 1}
                  className="bg-primary hover:bg-accent text-white rounded-full h-14 px-10 font-bold gap-3 shadow-xl transition-all"
                >
                  {isAr ? 'التالي' : 'Next'}
                  {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </main>

        {activeId && (
          <aside className="hidden lg:block w-80 shrink-0 ml-16 space-y-10 sticky top-48 h-fit">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-4">
                {isAr ? 'محتويات الدليل' : 'Guide Sections'}
              </h4>
              <nav className="space-y-2">
                {data.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    className={cn(
                      "w-full text-start p-5 rounded-2xl font-black text-sm transition-all flex items-center justify-between group border-2",
                      activeId === s.id 
                        ? "bg-primary border-primary text-white shadow-xl shadow-primary/20" 
                        : "bg-transparent border-transparent text-slate-400 hover:bg-white hover:border-slate-100 hover:text-primary"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <s.icon className={cn("h-4 w-4", activeId === s.id ? "text-secondary" : "text-slate-300 group-hover:text-secondary")} />
                      {s.title}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
            <div className="bg-secondary p-10 rounded-[2.5rem] text-white shadow-2xl shadow-secondary/20 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-tight">{isAr ? 'هل تحتاج لمساعدة؟' : 'Need Support?'}</h4>
                  <p className="text-[10px] text-white/70 leading-relaxed font-bold">{isAr ? 'فريقنا متاح خلال ساعات العمل الرسمية للرد على كافة استفساراتكم.' : 'Our team is available during office hours to answer all inquiries.'}</p>
                  <Button asChild variant="secondary" size="sm" className="w-full rounded-xl font-black bg-white text-secondary hover:bg-primary hover:text-white transition-all">
                    <Link href={`/${lang}/contact`}>{isAr ? 'اتصل بنا' : 'Contact Us'}</Link>
                  </Button>
               </div>
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                  <HelpCircle className="h-24 w-24" />
               </div>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Drawer */}
      {activeId && sidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className={cn(
            "absolute inset-y-0 w-80 bg-white p-10 shadow-2xl transition-transform",
            isAr ? "right-0" : "left-0"
          )}>
            <div className="flex justify-between items-center mb-10">
              <h4 className="font-black text-primary uppercase text-sm tracking-widest">{isAr ? 'الأقسام' : 'Sections'}</h4>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="rounded-xl">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="space-y-2 overflow-y-auto max-h-[70vh]">
              {data.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveId(s.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full text-start p-5 rounded-2xl font-black text-sm transition-all",
                    activeId === s.id 
                      ? "bg-primary text-white shadow-lg" 
                      : "text-slate-400 hover:bg-slate-50"
                  )}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
