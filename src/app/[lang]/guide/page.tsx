
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
  ChevronRight,
  ChevronLeft,
  Trophy,
  ExternalLink,
  Target,
  Clock,
  LayoutDashboard,
  ClipboardCheck,
  UserCheck,
  Star,
  FileText,
  MousePointer2,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  AlertCircle,
  Heart,
  Zap,
  ChevronDown,
  MapPin,
  Globe,
  Languages,
  MessageCircle,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const getGuideSections = (isAr: boolean) => [
  {
    id: 'getting-started',
    icon: Rocket,
    title: isAr ? '1. البدء في أكاديمية بنين وبنات' : '1. Getting Started at BBA',
    content: (
      <div className="space-y-8 py-4">
        <p className="text-slate-600 font-medium leading-relaxed">
          {isAr 
            ? 'تهانينا لانضمامك إلى أكاديمية بنين وبنات! بمجرد اكتمال تسجيلك، ستكون مستعداً لبدء رحلة التعلم الخاصة بك. قبل البدء في دورتك الأولى، خذ بضع لحظات لإكمال الخطوات أدناه:'
            : 'Congratulations on joining Banaat Academy! Once your enrollment has been completed, you\'re ready to begin your learning journey. Before starting your first course, take a few moments to complete the steps below:'}
        </p>
        <div className="grid grid-cols-1 gap-6">
          {[
            { 
              t: isAr ? 'تحقق من بريدك الترحيبي' : 'Check Your Welcome Email', 
              d: isAr ? 'يحتوي بريدك الترحيبي على كل ما تحتاجه للبدء، بما في ذلك معلومات تسجيل الدخول إلى Edgenuity، وخطة الطالب الشخصية الخاصة بك، والمرشد المعين لك ومعلومات الاتصال الخاصة به.' : 'Your Welcome Email contains everything you need to get started, including your Edgenuity login information, your personalized Student Plan, and your assigned mentor.' 
            },
            { 
              t: isAr ? 'تسجيل الدخول إلى حساب Edgenuity' : 'Log Into Your Edgenuity Account', 
              d: isAr ? 'Edgenuity هي منصة التعلم عبر الإنترنت حيث ستكمل جميع دروسك ومهامك واختباراتك. هذا هو المكان الذي ستقضي فيه معظم وقتك طوال العام الدراسي.' : 'Edgenuity is the online learning platform where you will complete all of your lessons, assignments, and quizzes. This is where you will spend most of your time.' 
            },
            { 
              t: isAr ? 'مراجعة خطة الطالب الخاصة بك' : 'Review Your Student Plan', 
              d: isAr ? 'يتلقى كل طالب خطة طالب تحدد الدورات التي من المتوقع أن يكملها. في معظم الحالات، يتوقع من الطلاب إكمال 10 دورات بين سبتمبر ويونيو، بمعدل دورة واحدة كل شهر.' : 'Every student receives a Student Plan outlining the courses they are expected to complete. Usually, students complete 10 courses between September and June, averaging one per month.' 
            },
            { 
              t: isAr ? 'تعرف على مرشدك' : 'Meet Your Mentor', 
              d: isAr ? 'يتم تعيين مرشد لكل طالب ويكون متاحاً للإجابة على الأسئلة وتقديم التوجيه ومراقبة التقدم ومساعدة الطلاب على البقاء في المسار الصحيح. مرشدك هو نقطة الاتصال الأولى لك.' : 'Every student is assigned a BBA mentor who is available to answer questions, provide guidance, and monitor progress. Your mentor is your first point of contact.' 
            },
            { 
              t: isAr ? 'ابدأ دورتك الأولى' : 'Start Your First Course', 
              d: isAr ? 'بمجرد مراجعة خطة الطالب، وتسجيل الدخول إلى Edgenuity، ولقاء مرشدك، فقد حان الوقت لبدء التعلم! ابدأ بأول دورة تدريبية واعمل كل يوم عمل باستمرار للبقاء في الجدول الزمني.' : 'Once you\'ve reviewed your plan and met your mentor, it\'s time to begin learning! Start with your first assigned course and work consistently each weekday.' 
            }
          ].map((s, i) => (
            <div key={i} className="flex gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-lg group">
              <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-black shrink-0 transition-all">
                {i + 1}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-primary text-base sm:text-lg group-hover:text-secondary transition-colors">{s.t}</h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{s.d}</p>
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
    title: isAr ? '2. كيف يعمل برنامج الأكاديمية' : '2. How the BBA Program Works',
    content: (
      <div className="space-y-10 py-4">
        <div className="text-center space-y-4">
          <h4 className="font-black text-primary text-xl sm:text-3xl">{isAr ? 'الأكاديمية تختلف عن المدرسة التقليدية' : 'BBA is different from a traditional school'}</h4>
          <p className="text-slate-500 font-bold text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto italic">
            {isAr 
              ? 'بدلاً من حضور دروس مباشرة كل يوم، يكمل الطلاب دوراتهم الدراسية عبر الإنترنت من خلال Edgenuity مع تلقي التوجيه والدعم من الفريق الأكاديمي.'
              : 'Instead of attending live classes every day, students complete their coursework online through Edgenuity while receiving guidance and support.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { t: isAr ? 'اتبع خطة الطالب الخاصة بك' : 'Follow Your Student Plan', d: isAr ? 'خارطة طريقك للنجاح. يتلقى كل طالب خطة طالب شخصية تحدد الدورات التي من المتوقع أن يكملها طوال العام الدراسي.' : 'Your roadmap to success. Every student receives a personalized Student Plan outlining the courses they are expected to complete.' },
            { t: isAr ? 'تعلم بالسرعة التي تناسبك' : 'Learn at Your Own Pace', d: isAr ? 'اعمل عندما يناسبك ذلك بشكل أفضل. لا توجد ساعات عمل يومية مطلوبة، ولكن يتوقع من الطلاب إكمال ما يقرب من 5-7٪ يومياً.' : 'Work when it works best for you. No required daily class hours, but students are expected to complete approximately 5–7% daily.' },
            { t: isAr ? 'مرشدك هنا للمساعدة' : 'Your Mentor Is Here to Help', d: isAr ? 'يتم تعيين مرشد مخصص لكل طالب يراقب التقدم ويجيب على الأسئلة ويقدم التشجيع طوال العام الدراسي.' : 'Every student is assigned a dedicated mentor who monitors progress, answers questions, and provides encouragement.' },
            { t: isAr ? 'التقدم هو ما يهم' : 'Progress Is What Matters', d: isAr ? 'النجاح لا يقاس بالحضور! بل يقاس بالتقدم. تركز الأكاديمية على التقدم الأكاديمي الملموس في الدورات.' : 'Success isn\'t measured by attendance! It\'s measured by progress. BBA focuses on tangible academic advancement.' },
            { t: isAr ? 'تعلم من أي مكان' : 'Learn From Anywhere', d: isAr ? 'سواء كنت تتعلم من المنزل أو تسافر، تظل دوراتك متاحة أينما كان لديك اتصال موثوق بالإنترنت.' : 'Whether learning from home or traveling, your courses remain available wherever you have a reliable internet connection.' },
            { t: isAr ? 'نجاح الطلاب جهد جماعي' : 'Student Success Is a Team Effort', d: isAr ? 'يأتي النجاح من الشراكة بين الطلاب وأولياء الأمور والمرشدين والمستشارين والأكاديمية.' : 'Success comes from the partnership between students, parents, mentors, counselors, and the academy.' }
          ].map((item, i) => (
            <div key={i} className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 hover:bg-white hover:shadow-xl transition-all group">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shrink-0 group-hover:rotate-12 transition-transform">
                 <Zap className="h-5 w-5" />
              </div>
              <h4 className="font-black text-primary text-base sm:text-lg">{item.t}</h4>
              <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'edgenuity',
    icon: Monitor,
    title: isAr ? '3. البدء مع Edgenuity' : '3. Getting Started With Edgenuity',
    content: (
      <div className="space-y-8 py-4">
        <div className="space-y-4">
          <h4 className="text-primary font-black text-xl sm:text-3xl">{isAr ? 'جديد في Edgenuity؟ لا قلق، ابدأ من هنا!' : 'New to Edgenuity? No Worries, Start here!'}</h4>
          <p className="text-slate-500 font-bold text-sm sm:text-lg leading-relaxed italic">
            {isAr 
              ? 'قبل البدء في دورتك الأولى، شاهد هذا الفيديو لتعرف كيفية التنقل في دوراتك وإكمال الدروس وتتبع تقدمك واستخدام الأدوات التي ستعتمد عليها.'
              : 'Before beginning your first course, watch this video to learn how to navigate your courses, complete lessons, track progress, and use essential tools.'}
          </p>
        </div>

        <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden group">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/wTuSRO3BJ8k?start=9"
            title="Edgenuity Orientation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="bg-slate-50/50 p-8 sm:p-12 rounded-2xl border border-slate-100 space-y-10 shadow-inner relative overflow-hidden">
          <div className="text-center space-y-4 relative z-10">
             <h4 className="text-primary font-black text-xl sm:text-2xl uppercase tracking-tight">{isAr ? 'جاهز لبدء دوراتك؟' : 'Ready to Begin Your Courses?'}</h4>
          </div>
          
          <div className="flex justify-center relative z-10">
            <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white font-black h-16 px-10 rounded-xl shadow-xl transition-all scale-100 active:scale-95">
              <Link href="https://student.edgenuity.com/login" target="_blank" className="flex items-center gap-3 text-lg">
                {isAr ? 'دخول منصة الطالب' : 'Student Login'}
                <ExternalLink className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'courses-faqs',
    icon: HelpCircle,
    title: isAr ? '4. الأسئلة الشائعة والإرشادية' : '4. Frequently Asked Questions',
    content: (
      <div className="space-y-6 py-4">
        <p className="text-slate-500 font-bold text-sm sm:text-lg leading-relaxed mb-6 italic border-r-4 border-secondary pr-4">
          {isAr ? 'إليك إجابات واضحة ومباشرة على أكثر الأسئلة شيوعاً حول الأكاديمية وبرامجنا وكيفية التواصل معنا.' : 'Here are clear and direct answers to the most common questions about the academy, our programs, and how to reach us.'}
        </p>
        <Accordion type="single" collapsible className="space-y-3">
          {[
            // Common Identity & Contact Questions
            { 
              q: isAr ? 'ما هي البرامج التعليمية التي تقدمها الأكاديمية؟' : 'What educational programs do you offer?', 
              a: isAr ? 'نقدم ثلاثة برامج رئيسية: برنامج الصفوف 3-5 للمرحلة الابتدائية، وبرنامج الصفوف 6-12 للمرحلتين المتوسطة والثانوية، بالإضافة إلى برنامج عطلة نهاية الأسبوع المخصص لتعزيز الهوية الإسلامية واللغة العربية والقرآن.' : 'We offer three main programs: Grades 3–5 for elementary, Grades 6–12 for middle and high school, and a Weekend Program dedicated to strengthening Islamic identity, Arabic, and Quran.',
              icon: BookOpen
            },
            { 
              q: isAr ? 'أين يقع مقر الأكاديمية وهل تخدمون جميع الولايات؟' : 'Where is the academy located and do you serve all states?', 
              a: isAr ? 'يقع مقرنا الرئيسي في ولاية ميشيغان، ولكننا أكاديمية تعمل بالكامل عبر الإنترنت (عن بعد)، مما يتيح لنا خدمة الطلاب والعائلات في جميع أنحاء الولايات المتحدة الأمريكية بكفاءة عالية.' : 'Our headquarters is in Michigan, but we are a fully online academy, allowing us to serve students and families effectively across all US states.',
              icon: MapPin
            },
            { 
              q: isAr ? 'كيف يمكنني التواصل مع الأكاديمية مباشرة؟' : 'How can I contact the academy directly?', 
              a: isAr ? 'يمكنكم التواصل معنا عبر الهاتف على (734) 645-3613، أو عبر واتساب على (313) 655-5778. كما يمكنكم مراسلتنا عبر البريد الإلكتروني info@baneenbanaat.org أو زيارة موقعنا baneenbanaat.org.' : 'You can contact us via phone at (734) 645-3613, via WhatsApp at (313) 655-5778, or email us at info@baneenbanaat.org or visit our site baneenbanaat.org.',
              icon: Phone
            },
            { 
              q: isAr ? 'هل التعليم باللغة العربية أم الإنجليزية؟' : 'Is instruction in Arabic or English?', 
              a: isAr ? 'برامجنا ثنائية اللغة؛ حيث يتم تدريس المناهج الأكاديمية الأمريكية باللغة الإنجليزية، بينما يتم تدريس دروس اللغة العربية والقرآن والدراسات الإسلامية باللغة العربية (مع توفير الدعم اللازم لغير الناطقين بها) لضمان بناء هوية متوازنة.' : 'Our programs are bilingual; American academic curricula are taught in English, while Arabic, Quran, and Islamic Studies are taught in Arabic (with support for non-speakers) to build a balanced identity.',
              icon: Languages
            },
            { 
              q: isAr ? 'لماذا أختار أكاديمية بنين وبنات لعائلتي؟' : 'Why should I choose BBA for my family?', 
              a: isAr ? 'لأننا نجمع بين التميز الأكاديمي والقيم الإسلامية في بيئة آمنة ومرنة. نوفر مرشداً خاصاً لكل طالب، ونركز على تنمية الشخصية والارتباط بالهوية واللغة والدين جنباً إلى جنب مع التفوق الدراسي.' : 'Because we combine academic excellence with Islamic values in a safe, flexible environment. We provide a dedicated mentor for each student and focus on character development and identity alongside academic success.',
              icon: Star
            },
            { 
              q: isAr ? 'هل تتوفر الأكاديمية على وسائل التواصل الاجتماعي؟' : 'Is the academy available on social media?', 
              a: isAr ? 'نعم، يسعدنا متابعتكم لنا على إنستغرام (@baneen_banaat_academy)، يوتيوب (@mybba_edu)، وفيسبوك (Baneen & Banaat Academy) لمتابعة آخر الأخبار والأنشطة.' : 'Yes, follow us on Instagram (@baneen_banaat_academy), YouTube (@mybba_edu), and Facebook (Baneen & Banaat Academy) for the latest news and activities.',
              icon: Share2
            },
            // Operational FAQ Items
            { q: isAr ? 'كم عدد الدورات التي سأكملها في العام الدراسي؟' : 'How many courses will I complete in a year?', a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب لإكمالها خلال العام الدراسي (من سبتمبر حتى يونيو)، بمعدل دورة واحدة شهرياً تقريباً.' : 'Most students are assigned 10 courses to complete during the school year (Sept-June), averaging one course per month.', icon: ClipboardCheck },
            { q: isAr ? 'هل يمكنني العمل على أكثر من دورة في وقت واحد؟' : 'Can I work on more than one course at a time?', a: isAr ? 'في معظم الحالات، لا. نفضل أن يركز الطالب على دورة واحدة في كل مرة لضمان الإتقان والتركيز، إلا في حالات استثنائية يوافق عليها المستشار.' : 'In most cases, NO. We prefer students focus on one course at a time for mastery, unless exceptionally approved by a counselor.', icon: Target },
            { q: isAr ? 'هل مرشد الطالب متاح للإجابة على الأسئلة دائماً؟' : 'Is the student mentor always available?', a: isAr ? 'نعم، المرشد المخصص لك متاح خلال ساعات العمل الرسمية لمراقبة تقدمك والإجابة على استفساراتك وتقديم الدعم الأكاديمي والتحفيزي.' : 'Yes, your dedicated mentor is available during official working hours to monitor progress, answer questions, and provide academic support.', icon: UserCheck }
          ].map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-2xl px-5 sm:px-6 bg-white hover:border-secondary transition-all shadow-sm group">
              <AccordionTrigger className="hover:no-underline font-black text-primary text-start text-sm sm:text-base py-5 sm:py-6 gap-4">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-slate-50 text-secondary flex items-center justify-center shrink-0 group-data-[state=open]:bg-secondary group-data-[state=open]:text-white transition-all">
                  <faq.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="flex-1 leading-tight">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 font-medium leading-relaxed pb-6 text-xs sm:text-sm border-t pt-4 opacity-90">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  }
];

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const sections = getGuideSections(isAr);
  const [openSection, setOpenSection] = useState<string | undefined>(undefined);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
           <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
             <pattern id="guide-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
               <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
             </pattern>
             <rect width="100%" height="100%" fill="url(#guide-pattern)" />
           </svg>
           <div className="absolute top-0 right-0 w-[40%] h-full bg-secondary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-6xl lg:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {isAr ? 'دليل طالب BBA' : 'BBA Student Guide'}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-xs sm:text-xl text-white/80 font-bold max-w-3xl mx-auto leading-relaxed italic border-x-2 border-secondary/20 px-8">
            {isAr 
              ? 'كل ما يحتاجه الطلاب وأولياء الأمور لمعرفته من أجل عام دراسي ناجح ومليء بالإنجازات.' 
              : 'Everything Students & Parents Need to Know for a Successful School Year.'}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-8 relative z-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Welcome Intro Card */}
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-100 shadow-premium relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 blur-2xl rounded-full" />
            <div className="space-y-6 text-slate-600 font-bold leading-relaxed text-sm sm:text-lg relative z-10">
               <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase text-secondary tracking-widest mb-2">Introduction</div>
                  <p className="text-primary font-black text-xl sm:text-2xl leading-tight border-l-4 border-secondary pl-6 py-1">
                    {isAr ? 'أهلاً بكم في دليل الطالب، نحن متحمسون لانضمامكم إلينا!' : 'Welcome to the BBA Student Guide. We are excited to have you join us!'}
                  </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 opacity-90 leading-relaxed text-slate-500">
                  <p>{isAr ? 'سواء كنت طالباً جديداً أو ولي أمر، فقد تم تصميم هذا الدليل لمساعدتك على فهم كيفية عمل البرنامج، وما هو متوقع منك، وكيفية البقاء على المسار الصحيح.' : 'Whether you are a new student or a parent, this guide is designed to help you understand how the program works, what is expected, and how to stay on track.'}</p>
                  <p>{isAr ? 'النجاح في الأكاديمية يعتمد على الالتزام واتباع خطة الطالب والتواصل المستمر مع مرشدك.' : 'Success at BBA depends on commitment, following your Student Plan, and communicating with your mentor.'}</p>
               </div>
               <p className="text-center font-black text-primary uppercase tracking-widest text-[10px] sm:text-xs pt-6 border-t border-slate-100">{isAr ? 'نشجعكم على قراءة هذا الدليل بعناية قبل البدء' : 'We encourage you to read this guide carefully before beginning'}</p>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            <Accordion 
              type="single" 
              collapsible 
              value={openSection} 
              onValueChange={setOpenSection}
              className="space-y-4"
            >
              {sections.map((section) => (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className="bg-white border border-slate-100 rounded-2xl px-6 sm:px-10 shadow-sm overflow-hidden transition-all duration-300 data-[state=open]:shadow-xl data-[state=open]:border-secondary/30 group"
                >
                  <AccordionTrigger className="hover:no-underline py-6 sm:py-8">
                    <div className="flex items-center gap-4 sm:gap-6 text-start w-full">
                      <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl bg-slate-50 text-primary flex items-center justify-center shrink-0 transition-all group-data-[state=open]:bg-primary group-data-[state=open]:text-white">
                        <section.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-base sm:text-xl font-black text-primary leading-tight group-hover:text-secondary transition-colors tracking-tight">
                          {section.title}
                        </h3>
                      </div>
                      <ChevronDown className="h-4 w-4 text-slate-300 transition-all group-data-[state=open]:rotate-180 group-data-[state=open]:text-secondary" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-10 border-t border-slate-50 pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                     <div className="max-w-3xl mx-auto">
                        {section.content}
                     </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Encouragement Footer */}
          <div className="bg-primary text-white p-10 sm:p-16 rounded-2xl shadow-2xl relative overflow-hidden text-center space-y-8 border-b-8 border-secondary group">
             <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <div className="flex justify-center">
                   <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                      <Trophy className="h-8 w-8 text-secondary" />
                   </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">{isAr ? 'نحن معك في كل خطوة' : 'With You Every Step'}</h2>
                  <p className="text-sm sm:text-lg opacity-80 font-bold leading-relaxed italic max-w-lg mx-auto">
                     {isAr ? 'كل درس تكتمله وكل مهمة تنهيها تقربك خطوة واحدة من أهدافك الكبيرة.' : 'Every lesson completed and every task finished brings you one step closer to your big goals.'}
                  </p>
                </div>
                
                <div className="pt-6 flex justify-center">
                  <Button asChild className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-xl px-10 h-14 sm:h-16 text-sm sm:text-lg transition-all shadow-xl active:scale-95 border-2 border-transparent hover:border-secondary">
                    <Link href={`/${lang}/contact`} className="flex items-center gap-3">
                      {isAr ? 'تواصل معنا' : 'Contact us'}
                      {isAr ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                    </Link>
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
