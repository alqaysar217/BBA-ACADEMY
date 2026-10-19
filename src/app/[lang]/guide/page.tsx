
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
  ExternalLink
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// --- Structured Guide Data ---
const getGuideData = (isAr: boolean) => [
  {
    id: 'getting-started',
    icon: Rocket,
    title: isAr ? 'البدء في BBA' : 'Getting Started at BBA',
    description: isAr ? 'الخطوات الأولى لبدء رحلتك التعليمية بنجاح.' : 'The first steps to start your educational journey successfully.',
    content: (
      <div className="space-y-8">
        <p className="text-lg text-slate-600 leading-relaxed">
          {isAr 
            ? 'تهانينا لانضمامك إلى أكاديمية بنين وبنات! بمجرد اكتمال تسجيلك، ستكون جاهزاً لبدء رحلة التعلم الخاصة بك. قبل بدء دورتك الأولى، خذ بضع دقائق لإكمال الخطوات أدناه.'
            : 'Congratulations on joining Banaat Academy! Once your enrollment has been completed, you\'re ready to begin your learning journey. Before starting your first course, take a few moments to complete the steps below.'}
        </p>
        <div className="grid gap-6">
          {[
            {
              t: isAr ? '1.1 تحقق من بريدك الإلكتروني الترحيبي' : '1.1 Check Your Welcome Email',
              d: isAr ? 'يحتوي بريدك الإلكتروني الترحيبي على كل ما تحتاجه للبدء، بما في ذلك معلومات تسجيل الدخول إلى Edgenuity، وخطة الطالب الشخصية، ومعلومات التواصل مع مرشدك المخصص.' : 'Your Welcome Email contains everything you need to get started, including your Edgenuity login information, your personalized Student Plan, your assigned mentor and their contact info.'
            },
            {
              t: isAr ? '1.2 سجل الدخول إلى حساب Edgenuity' : '1.2 Log Into Your Edgenuity Account',
              d: isAr ? 'Edgenuity هي منصة التعلم عبر الإنترنت حيث ستكمل جميع دروسك ومهامك واختباراتك. هذا هو المكان الذي ستكتمل فيه معظم أنشطتك الدراسية.' : 'Edgenuity is the online learning platform where you will complete all of your lessons, assignments, quizzes, exams, and coursework.'
            },
            {
              t: isAr ? '1.3 راجع خطة الطالب الخاصة بك' : '1.3 Review Your Student Plan',
              d: isAr ? 'يتلقى كل طالب خطة توضح الدورات المتوقع إكمالها. عادة، يكمل الطلاب 10 دورات بين سبتمبر ويونيو، بمعدل دورة واحدة كل شهر.' : 'Every student receives a Student Plan outlining the courses they are expected to complete. Typically, students complete 10 courses between September and June.'
            },
            {
              t: isAr ? '1.4 قابل مرشدك الأكاديمي' : '1.4 Meet Your Mentor',
              d: isAr ? 'يتم تعيين مرشد لكل طالب للإجابة على الأسئلة ومراقبة التقدم. مرشدك هو نقطة الاتصال الأولى لأي مساعدة.' : 'Every student is assigned a BBA mentor who is available to answer questions, provide guidance, and monitor progress.'
            }
          ].map((step, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-black text-primary mb-2">{step.t}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    icon: BookOpen,
    title: isAr ? 'كيف يعمل برنامج BBA' : 'How the BBA Program Works',
    description: isAr ? 'فهم نظام التعلم المرن والتقدم الأكاديمي.' : 'Understanding the flexible learning system and academic progress.',
    content: (
      <div className="space-y-8">
        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
          <h3 className="text-xl font-black text-primary mb-4">{isAr ? 'BBA تختلف عن المدرسة التقليدية' : 'BBA Is Different From a Traditional School'}</h3>
          <p className="text-slate-600 leading-relaxed">
            {isAr 
              ? 'بدلاً من حضور فصول دراسية مباشرة يومياً، يكمل الطلاب دوراتهم عبر الإنترنت من خلال Edgenuity مع تلقي التوجيه من الفريق الأكاديمي.'
              : 'Instead of attending live classes every day, students complete their coursework online through Edgenuity while receiving guidance and support from BBA\'s academic team.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { t: isAr ? 'اتبع خطة الطالب' : 'Follow Your Student Plan', d: isAr ? 'خارطة الطريق الخاصة بك للنجاح والتخرج في الوقت المحدد.' : 'Your roadmap to success and graduating on time.' },
            { t: isAr ? 'تعلم بالسرعة التي تناسبك' : 'Learn at Your Own Pace', d: isAr ? 'لا توجد ساعات عمل إجبارية، يمكنك الدراسة في الوقت الذي يناسبك.' : 'No required daily class hours. Study whenever fits your schedule.' },
            { t: isAr ? 'التقدم هو الأهم' : 'Progress Is What Matters', d: isAr ? 'النجاح لا يقاس بالحضور، بل بإحراز تقدم ثابت في المواد.' : 'Success isn\'t measured by attendance! It\'s measured by progress.' },
            { t: isAr ? 'تعلم من أي مكان' : 'Learn From Anywhere', d: isAr ? 'فصلك الدراسي يسافر معك أينما وجد إنترنت مستقر.' : 'Your classroom travels with you wherever you have reliable internet.' }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-100 hover:border-secondary transition-all">
              <h4 className="font-black text-primary mb-2">{item.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'edgenuity-guide',
    icon: Monitor,
    title: isAr ? 'البدء مع Edgenuity' : 'Getting Started With Edgenuity',
    description: isAr ? 'دليل استخدام منصة التعلم والوصول للمواد.' : 'Guide to using the learning platform and accessing materials.',
    content: (
      <div className="space-y-8">
        <div className="aspect-video bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden group">
          <div className="text-center p-8 relative z-10">
            <Monitor className="h-12 w-12 text-slate-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-slate-500">{isAr ? 'فيديو توجيهي للمنصة' : 'Platform Orientation Video'}</p>
            <p className="text-xs text-slate-400 mt-2">{isAr ? '(سيتم تفعيل الرابط قريباً)' : '(Video link coming soon)'}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white rounded-full px-12 h-14 font-black shadow-xl shadow-secondary/20">
            <Link href="https://student.edgenuity.com/login" target="_blank">
              {isAr ? 'تسجيل دخول الطالب' : 'Student Login'}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <h4 className="font-black text-primary mb-3">{isAr ? 'الدورات التدريبية' : 'Courses'}</h4>
            <p className="text-sm text-slate-500">{isAr ? 'الوصول إلى جميع الدورات المعينة في مكان واحد مناسب.' : 'Access all assigned courses in one convenient location.'}</p>
          </div>
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <h4 className="font-black text-primary mb-3">{isAr ? 'الدرجات والتقدم' : 'Grades & Progress'}</h4>
            <p className="text-sm text-slate-500">{isAr ? 'راقب أداءك الأكاديمي في أي وقت لضمان البقاء في المسار.' : 'Monitor your academic performance at any time.'}</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'success-formula',
    icon: ClipboardCheck,
    title: isAr ? 'خطة الطالب ومعادلة النجاح' : 'Student Plan & Success Formula',
    description: isAr ? 'المسار المختصر لضمان التخرج والنجاح.' : 'The shortcut to ensure graduation and success.',
    content: (
      <div className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {[
            { id: 1, text: isAr ? 'تسجيل الدخول يومياً' : 'Log in every weekday' },
            { id: 2, text: isAr ? 'إنجاز 5-7% يومياً' : 'Complete 5–7% daily' },
            { id: 3, text: isAr ? 'إنهاء دورة شهرياً' : 'Finish 1 course each month' },
            { id: 4, text: isAr ? 'إكمال 10 دورات سنوياً' : 'Complete all 10 courses' },
            { id: 5, text: isAr ? 'البقاء في مسار التخرج' : 'Stay on track for graduation' }
          ].map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center font-black mb-4">
                {step.id}
              </div>
              <p className="text-sm font-bold text-primary leading-tight">{step.text}</p>
              {i < 4 && (
                <div className={cn(
                  "hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] z-10 text-slate-300",
                  isAr ? "rotate-180" : ""
                )}>
                  <ChevronRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ClipboardCheck className="h-32 w-32" />
          </div>
          <h3 className="text-2xl font-black mb-6 text-secondary">{isAr ? 'نصيحة ذهبية' : 'Pro Tip'}</h3>
          <p className="text-lg text-slate-300 leading-relaxed italic">
            {isAr 
              ? 'لا تنتظر حتى نهاية الشهر لبدء العمل. الطلاب الذين يحققون تقدماً طفيفاً كل يوم هم أكثر نجاحاً بكثير من أولئك الذين يحاولون إنهاء دورة كاملة في اللحظة الأخيرة.'
              : 'Don\'t wait until the end of the month to begin working. Students who make a little progress every weekday are far more successful than those who try to finish an entire course at the last minute.'}
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'understanding-courses',
    icon: HelpCircle,
    title: isAr ? 'فهم الدورات والتقييمات' : 'Understanding Courses & Assessments',
    description: isAr ? 'إجابات على أكثر الأسئلة شيوعاً حول النظام.' : 'Answers to common questions about the system.',
    content: (
      <div className="space-y-6">
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { 
              q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', 
              a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب خلال العام الدراسي، وهي موضحة في خطتك الشخصية.' : 'Most students are assigned 10 courses to complete during the school year, listed in your personalized Student Plan.'
            },
            { 
              q: isAr ? 'هل يمكنني العمل على أكثر من دورة؟' : 'Can I work on more than one course at a time?', 
              a: isAr ? 'في معظم الحالات، لا. يجب التركيز على دورة واحدة لضمان الإتقان وعدم الارتباك.' : 'In most cases, NO. Focusing on one course at a time improves learning and prevents becoming overwhelmed.'
            },
            { 
              q: isAr ? 'كم من الوقت يجب أن تستغرق كل دورة؟' : 'How long should each course take?', 
              a: isAr ? 'عادة ما تستغرق الدورة 3-4 أسابيع، مما يتيح إنهاء دورة واحدة كل شهر تقريباً.' : 'Courses are generally completed within 3–4 weeks, allowing students to finish about one course per month.'
            },
            { 
              q: isAr ? 'هل يمكنني تخطي الدروس أو الواجبات؟' : 'Can I skip lessons or assignments?', 
              a: isAr ? 'لا. كل درس ومهمة مصممة لمساعدتك على إتقان المادة، والتخطي غير مسموح به.' : 'No. Every lesson and assignment is designed to help you master the material. Skipping is not permitted.'
            },
            { 
              q: isAr ? 'كيف أحصل على دورتي التالية؟' : 'How do I receive my next course?', 
              a: isAr ? 'أنهِ دورتك الحالية، أبلغ مرشدك، سيقوم الفريق بمراجعة درجاتك ثم تعيين الدورة التالية.' : 'Complete current course, notify mentor, team reviews grade, then next course is assigned.'
            }
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white border-none rounded-2xl px-6 shadow-sm">
              <AccordionTrigger className="text-primary font-black hover:no-underline text-start">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 font-medium leading-relaxed">
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
    title: isAr ? 'اتفاقية الطالب ومسؤوليات الأهل' : 'Student Agreement & Parent Responsibilities',
    description: isAr ? 'الحقوق والواجبات لضمان بيئة تعليمية ناجحة.' : 'Rights and responsibilities for a successful learning environment.',
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
          <h4 className="text-xl font-black text-primary flex items-center gap-3">
            <UserCheck className="h-6 w-6 text-secondary" />
            {isAr ? 'ماذا تتوقع BBA من الطلاب' : 'What BBA Expects From Students'}
          </h4>
          <ul className="space-y-4">
            {[
              isAr ? 'تسجيل الدخول بانتظام وتحقيق تقدم ثابت.' : 'Log into Edgenuity regularly and make consistent progress.',
              isAr ? 'اتباع خطة الطالب وإكمال الدورات في وقتها.' : 'Follow their Student Plan and complete courses on schedule.',
              isAr ? 'الرد على رسائل المرشد عند الضرورة.' : 'Read and respond to messages from their mentor.',
              isAr ? 'إنجاز جميع المهام بصدق وبجهد شخصي.' : 'Complete all assignments honestly using their own work.'
            ].map((li, i) => (
              <li key={i} className="flex gap-3 text-sm font-bold text-slate-600">
                <div className="h-2 w-2 rounded-full bg-secondary shrink-0 mt-1.5" />
                {li}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6 bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10">
          <h4 className="text-xl font-black text-primary flex items-center gap-3">
            <UsersIcon className="h-6 w-6 text-secondary" />
            {isAr ? 'مسؤوليات أولياء الأمور' : 'Parent Responsibilities'}
          </h4>
          <ul className="space-y-4">
            {[
              isAr ? 'تشجيع الطفل على الحفاظ على روتين تعليمي ثابت.' : 'Encourage a consistent learning routine.',
              isAr ? 'البقاء على تواصل مع المرشدين وفريق الأكاديمية.' : 'Stay in communication with mentors and BBA team.',
              isAr ? 'مراقبة التقدم الأكاديمي للطفل بانتظام.' : 'Monitor child\'s academic progress regularly.',
              isAr ? 'دعم الطفل في البقاء متحفزاً ومنظماً.' : 'Support child in staying motivated and organized.'
            ].map((li, i) => (
              <li key={i} className="flex gap-3 text-sm font-bold text-slate-600">
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
    id: 'mentoring-support',
    icon: MessageSquare,
    title: isAr ? 'التوجيه والدعم الأكاديمي' : 'Mentoring, Academic Support & Communication',
    description: isAr ? 'أنت لست وحدك، فريقنا معك في كل خطوة.' : 'You\'re never alone, our team is with you every step.',
    content: (
      <div className="space-y-8">
        <p className="text-lg text-slate-600 leading-relaxed font-bold italic">
          {isAr 
            ? '"واحدة من أكبر المفاهيم الخاطئة هي أن الطلاب يدرسون بمفردهم. في BBA، هذا غير صحيح أبداً."'
            : '"One of the biggest misconceptions about online learning is that students are expected to figure everything out on their own. At BBA, that\'s never the case."'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: isAr ? 'مراقبة التقدم' : 'Monitoring Progress', i: ClipboardCheck },
            { t: isAr ? 'توجيه أكاديمي' : 'Academic Guidance', i: UserCheck },
            { t: isAr ? 'الإجابة على الأسئلة' : 'Answering Questions', i: HelpCircle }
          ].map((feature, i) => (
            <div key={i} className="p-8 text-center bg-white border border-slate-100 rounded-3xl shadow-sm">
              <feature.i className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h4 className="font-black text-primary">{feature.t}</h4>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'contact-help',
    icon: HelpCircle,
    title: isAr ? 'المساعدة والتواصل' : 'Frequently Asked Questions & Contact',
    description: isAr ? 'طرق التواصل معنا للحصول على الدعم الفني والأكاديمي.' : 'Ways to contact us for technical and academic support.',
    content: (
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-white border border-slate-100 rounded-[2rem] flex items-center gap-6 shadow-sm">
            <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <MailIcon className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'البريد الإلكتروني' : 'Email'}</div>
              <div className="text-lg font-black text-primary">banaatacademy@gmail.com</div>
            </div>
          </div>
          <div className="p-8 bg-white border border-slate-100 rounded-[2rem] flex items-center gap-6 shadow-sm">
            <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <PhoneIcon className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'الهاتف' : 'Phone'}</div>
              <div className="text-lg font-black text-primary">(313) 455-0322</div>
            </div>
          </div>
        </div>
        <div className="text-center p-12 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-6">
          <p className="text-xl font-bold text-slate-500 italic max-w-2xl mx-auto">
            {isAr 
              ? '"النجاح لا يقاس بمدى سرعتك في الانتهاء؛ إنه يبنى من خلال الجهد المستمر والفضول والمثابرة في كل خطوة على الطريق."'
              : '"Success isn’t measured by how quickly you finish; it’s built through consistent effort, curiosity, and perseverance every step of the way."'}
          </p>
          <div className="font-black text-primary">— Baneen and Banaat Academy</div>
        </div>
      </div>
    )
  }
];

function UsersIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function MailIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> }
function PhoneIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2v3a2 2 0 0 1 1.51 1.96 15.38 15.38 0 0 0 3.3 5.4 15.38 15.38 0 0 0 5.4 3.3A2 2 0 0 1 19.07 15v1.92z"/></svg> }

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const data = getGuideData(isAr);

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeSection = data.find(s => s.id === activeSectionId);
  const currentIndex = data.findIndex(s => s.id === activeSectionId);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q)
    );
  }, [searchQuery, data]);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setActiveSectionId(data[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveSectionId(data[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };

  // Sync scroll to top on section change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSectionId]);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Search Header */}
      <section className="bg-white border-b sticky top-20 z-40">
        <div className="container-tight h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {activeSectionId && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setActiveSectionId(null)}
                className="text-primary hover:bg-slate-100 shrink-0"
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
            )}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder={isAr ? 'ابحث في الدليل...' : 'Search the guide...'} 
                className="pl-10 h-11 bg-slate-50 border-none rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              {isAr ? 'دليل طالب BBA الرسمي' : 'Official BBA Student Guide'}
            </span>
          </div>
          {activeSectionId && (
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>
      </section>

      <div className="flex-1 flex container-tight py-12">
        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {!activeSectionId ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Directory Landing */}
              <div className="space-y-4 text-center">
                <h1 className="text-4xl lg:text-6xl font-black text-primary uppercase tracking-tight">
                  {isAr ? 'دليل طالب BBA' : 'BBA Student Guide'}
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                  {isAr 
                    ? 'كل ما يحتاجه الطلاب وأولياء الأمور لمعرفته من أجل عام دراسي ناجح ومثمر.'
                    : 'Everything Students & Parents Need to Know for a Successful and Productive School Year.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((section) => (
                  <Card 
                    key={section.id} 
                    className="premium-card rounded-[2.5rem] border-none shadow-sm cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all"
                    onClick={() => setActiveSectionId(section.id)}
                  >
                    <CardContent className="p-8 space-y-6">
                      <div className="h-14 w-14 rounded-2xl bg-primary/5 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                        <section.icon className="h-7 w-7" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-primary leading-tight">{section.title}</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{section.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-widest pt-2">
                        {isAr ? 'استكشف الآن' : 'Explore Now'}
                        {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-20 text-slate-400 font-bold">
                  {isAr ? 'لم يتم العثور على نتائج تطابق بحثك.' : 'No results found matching your search.'}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
              {/* Section Detail View */}
              <div className="space-y-6">
                <nav className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 tracking-widest">
                  <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setActiveSectionId(null)}>
                    {isAr ? 'الدليل' : 'Guide'}
                  </span>
                  <ChevronRight className={cn("h-3 w-3", isAr ? "rotate-180" : "")} />
                  <span className="text-secondary">{activeSection?.title}</span>
                </nav>
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 rounded-3xl bg-secondary text-white flex items-center justify-center shrink-0 shadow-lg shadow-secondary/20">
                    {activeSection && <activeSection.icon className="h-8 w-8" />}
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-primary leading-tight uppercase tracking-tight">
                    {activeSection?.title}
                  </h2>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-premium border border-slate-100">
                {activeSection?.content}
              </div>

              {/* Internal Navigation Buttons */}
              <div className="flex justify-between items-center py-12 border-t">
                <Button 
                  variant="outline" 
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                  className="rounded-full h-12 px-8 font-bold gap-2"
                >
                  {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  {isAr ? 'السابق' : 'Previous'}
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={currentIndex === data.length - 1}
                  className="bg-primary hover:bg-accent text-white rounded-full h-12 px-8 font-bold gap-2 shadow-lg"
                >
                  {isAr ? 'التالي' : 'Next'}
                  {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </main>

        {/* Desktop Sidebar (Only visible when a section is active) */}
        {activeSectionId && (
          <aside className="hidden lg:block w-72 shrink-0 ml-12 space-y-8 sticky top-44 h-fit">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-4">
                {isAr ? 'أقسام الدليل' : 'Guide Sections'}
              </h4>
              <nav className="space-y-1">
                {data.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSectionId(section.id)}
                    className={cn(
                      "w-full text-start p-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-between group",
                      activeSectionId === section.id 
                        ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                        : "text-slate-500 hover:bg-white hover:text-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className={cn("h-4 w-4", activeSectionId === section.id ? "text-white" : "text-secondary")} />
                      {section.title}
                    </div>
                    {activeSectionId !== section.id && <ChevronRight className={cn("h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity", isAr ? "rotate-180" : "")} />}
                  </button>
                ))}
              </nav>
            </div>
            <div className="bg-primary text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-tight">{isAr ? 'تحتاج لمساعدة؟' : 'Need Help?'}</h4>
                  <p className="text-xs text-white/70 leading-relaxed font-medium">{isAr ? 'فريقنا متاح دائماً للإجابة على استفساراتكم الأكاديمية والتقنية.' : 'Our team is always available to answer your academic and technical questions.'}</p>
                  <Button asChild variant="secondary" size="sm" className="w-full rounded-xl font-bold">
                    <Link href={`/${lang}/contact`}>{isAr ? 'اتصل بنا' : 'Contact Us'}</Link>
                  </Button>
               </div>
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <HelpCircle className="h-20 w-20" />
               </div>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {activeSectionId && isSidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className={cn(
            "absolute inset-y-0 w-80 bg-white p-8 shadow-2xl transition-transform",
            isAr ? "right-0" : "left-0"
          )}>
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-black text-primary uppercase">{isAr ? 'القائمة' : 'Menu'}</h4>
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-2 overflow-y-auto max-h-[70vh]">
              {data.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSectionId(section.id);
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full text-start p-4 rounded-xl font-bold text-sm transition-all",
                    activeSectionId === section.id 
                      ? "bg-secondary text-white" 
                      : "text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {section.title}
                </button>
              ))}
            </nav>
            <div className="mt-8 pt-8 border-t">
              <Button asChild className="w-full bg-primary rounded-xl font-bold h-12">
                <Link href={`/${lang}/contact`} onClick={() => setIsSidebarOpen(false)}>{isAr ? 'اتصل بنا' : 'Contact Us'}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
