'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  Rocket, 
  BookOpen, 
  Trophy,
  GraduationCap,
  Laptop,
  ArrowRight,
  ArrowLeft,
  Zap,
  CheckCircle2,
  Users,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ClipboardCheck,
  UserCheck,
  Target,
  MousePointer2,
  Info,
  Heart,
  Video,
  LayoutDashboard,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const t = {
    hero: {
      title: isAr ? 'دليل طالب BBA' : 'BBA Student Guide',
      subtitle: isAr ? 'كل ما يحتاجه الطلاب وأولياء الأمور لعام دراسي ناجح' : 'Everything Students & Parents Need to Know for a Successful School Year',
      welcome: isAr ? 'مرحباً بكم في دليل طالب BBA. نحن متحمسون لانضمامكم لمجتمعنا التعليمي ونتطلع لدعمكم طوال رحلتكم التعليمية.' : 'Welcome to the BBA Student Guide. We are excited to have you join our learning community and look forward to supporting you throughout your educational journey.',
      p1: isAr 
        ? 'سواء كنت طالباً جديداً أو ولي أمر، تم تصميم هذا الدليل لمساعدتك على فهم كيفية عمل برنامج BBA، وما هو متوقع طوال العام الدراسي، وكيفية البقاء على المسار الصحيح لتحقيق النجاح.'
        : 'Whether you are a new student or a parent, this guide is designed to help you understand how the BBA program works, what is expected throughout the school year, and how to stay on track for success.',
      p2: isAr
        ? 'بما أن BBA تقدم مساراً تعليمياً عبر الإنترنت ذاتي الوتيرة، فإن الطلاب يمتلكون المرونة للتعلم من أي مكان مع التقدم وفقاً لجدولهم الأكاديمي. ومع ذلك، تأتي هذه المرونة مع المسؤولية.'
        : 'Because BBA offers an online, self-paced learning pathway, students have the flexibility to learn from anywhere while progressing according to their academic schedule. However, with that flexibility comes responsibility.',
      p3: isAr
        ? 'يعتمد النجاح على الالتزام، واتباع خطة الطالب الخاصة بك، والتواصل مع مرشدك كلما احتجت إلى مساعدة.'
        : 'Success depends on staying consistent, following your Student Plan, and communicating with your mentor whenever you need assistance.',
      goal: isAr
        ? 'هدفنا هو تزويد الطلاب بالتوجيه والدعم والموارد التي يحتاجونها لإكمال دوراتهم بنجاح والوصول إلى أهدافهم الأكاديمية.'
        : 'Our goal is to provide students with the guidance, support, and resources they need to complete their courses successfully and reach their academic goals.'
    },
    gettingStarted: {
      title: isAr ? 'خطواتك الأولى نحو عام دراسي ناجح' : 'Your First Steps Toward a Successful School Year',
      intro: isAr ? 'تهانينا لانضمامك إلى أكاديمية بنين وبنات! بمجرد اكتمال تسجيلك، تصبح مستعداً لبدء رحلة التعلم الخاصة بك.' : 'Congratulations on joining Baneen and Banaat Academy! Once your enrollment has been completed, you\'re ready to begin your learning journey.',
      steps: [
        {
          num: 1,
          title: isAr ? 'تفقد بريدك الترحيبي' : 'Step 1 — Check Your Welcome Email',
          desc: isAr 
            ? 'يحتوي بريدك الإلكتروني الترحيبي على المعلومات التي تحتاجها للبدء، بما في ذلك بيانات دخول Edgenuity، خطة الطالب المخصصة، ومعلومات التواصل مع مرشدك.' 
            : 'Your Welcome Email contains the information you need to get started, including Edgenuity login, Student Plan, and mentor contact info.'
        },
        {
          num: 2,
          title: isAr ? 'سجل دخولك لمنصة Edgenuity' : 'Step 2 — Log Into Your Edgenuity Account',
          desc: isAr
            ? 'Edgenuity هي المنصة التعليمية التي يكمل فيها الطلاب دروسهم ومهامهم واختباراتهم. راجع فيديو التوجه المتاح للتعرف على المنصة.'
            : 'Edgenuity is the online learning platform where students complete lessons and coursework. Review the orientation video to become familiar.'
        },
        {
          num: 3,
          title: isAr ? 'راجع خطة الطالب الخاصة بك' : 'Step 3 — Review Your Student Plan',
          desc: isAr
            ? 'يتلقى كل طالب خطة مخصصة توضح الدورات المتوقع إكمالها. في معظم الحالات، يتوقع إكمال 10 دورات بين سبتمبر ويونيو (بمعدل دورة شهرياً).'
            : 'Every student receives a personalized Student Plan. Typically, students complete 10 courses between September and June.'
        },
        {
          num: 4,
          title: isAr ? 'تعرف على مرشدك' : 'Step 4 — Meet Your Mentor',
          desc: isAr
            ? 'يتم تعيين مرشد لكل طالب للمساعدة في الإجابة على الأسئلة، تقديم التوجيه التربوي، مراقبة التقدم، ودعمك عند مواجهة التحديات.'
            : 'Every student is assigned a BBA mentor to answer questions, provide guidance, monitor progress, and support you through challenges.'
        },
        {
          num: 5,
          title: isAr ? 'ابدأ دورتك الأولى' : 'Step 5 — Start Your First Course',
          desc: isAr
            ? 'ابدأ بدورتك الأولى المخصصة واعمل بانتظام كل يوم من أيام الأسبوع للبقاء على الجدول الزمني. بناء عادات دراسية جيدة مبكراً يجعل الأمر أسهل.'
            : 'Start with your first assigned course and work consistently each weekday. Building good habits early makes it easier to stay on track.'
        }
      ],
      tip: isAr 
        ? 'نصيحة لنجاح الطالب: لا تنتظر حتى نهاية الشهر لبدء العمل. الطلاب الذين يحرزون تقدماً ثابتاً كل يوم هم الأقدر على إكمال دوراتهم في الموعد المحدد.' 
        : 'Student Success Tip: Don\'t wait until the end of the month to begin working. Students who make steady progress each weekday are better positioned to succeed.'
    },
    howItWorks: {
      title: isAr ? 'تعلم مرن مع خطة أكاديمية منظمة' : 'Flexible Learning with a Structured Academic Plan',
      intro: isAr ? 'يختلف مسار التعلم ذاتي الوتيرة في BBA عن الفصول الدراسية التقليدية.' : 'BBA\'s self-paced learning pathway is different from a traditional classroom.',
      items: [
        {
          title: isAr ? 'اتبع خطة الطالب الخاصة بك' : 'Follow Your Student Plan',
          subtitle: isAr ? 'خارطة طريقك للنجاح' : 'Your Roadmap to Success',
          desc: isAr ? 'تساعدك خطة الطالب على البقاء منظماً وإحراز تقدم ثابت نحو أهدافك الأكاديمية (غالباً 10 دورات في العام).' : 'Your Student Plan helps you stay organized and make steady progress toward academic goals.'
        },
        {
          title: isAr ? 'تعلم بوتيرتك الخاصة' : 'Learn at Your Own Pace',
          subtitle: isAr ? 'اعمل في الوقت الذي يناسبك' : 'Work When It Works Best for You',
          desc: isAr ? 'لا توجد ساعات حصص مباشرة يومية إجبارية، ولكن يتوقع إكمال 5-7% من المنهج يومياً للبقاء على المسار الصحيح.' : 'No required daily live-class hours, but students are expected to complete 5–7% of coursework each weekday.'
        },
        {
          title: isAr ? 'المرشد موجود للمساعدة' : 'Your Mentor Is Here to Help',
          subtitle: isAr ? 'توجيه طوال رحلتك التعليمية' : 'Guidance Throughout Your Journey',
          desc: isAr ? 'يقوم مرشدك بمراقبة تقدمك، الإجابة على الأسئلة، وتقديم التشجيع اللازم طوال العام الدراسي.' : 'Your mentor monitors progress, answers questions, and provides encouragement throughout the school year.'
        },
        {
          title: isAr ? 'التقدم هو الأهم' : 'Progress Is What Matters',
          subtitle: isAr ? 'تقدم أكاديمي مستمر' : 'Consistent Academic Progress',
          desc: isAr ? 'نركز على التقدم الأكاديمي وإكمال الدورات بدلاً من مجرد الوقت الذي تقضيه أمام الشاشة.' : 'We focus on academic progress and course completion rather than just time spent in a classroom.'
        }
      ],
      anywhere: {
        title: isAr ? 'تعلم من أي مكان' : 'Learn From Anywhere',
        subtitle: isAr ? 'فصلك الدراسي يسافر معك' : 'Your Classroom Travels With You',
        desc: isAr ? 'يمكنك الوصول للمنصة من المنزل أو أثناء السفر. تذكر أن فريق BBA يعمل بتوقيت شرق الولايات المتحدة (Eastern Time).' : 'Access online coursework from home or while traveling. Remember BBA staff operate during US Eastern Time.'
      }
    },
    formula: {
      title: isAr ? 'معادلة النجاح في BBA' : 'The BBA Success Formula',
      subtitle: isAr ? 'ابنِ عادات قوية، وحقق تقدماً ثابتاً' : 'Build Strong Habits, Make Steady Progress',
      steps: [
        { t: isAr ? 'سجل دخولك' : 'Log In', d: isAr ? 'كل يوم من أيام الأسبوع' : 'Every Weekday' },
        { t: isAr ? 'أنجز 5-7%' : 'Complete 5–7%', d: isAr ? 'تقدماً يومياً ثابتاً' : 'Each Weekday' },
        { t: isAr ? 'دورة واحدة شهرياً' : 'One Course Monthly', d: isAr ? 'تقريباً كل شهر' : 'Follow your schedule' },
        { t: isAr ? 'أكمل كافة الدورات' : 'Complete All Courses', d: isAr ? '10 دورات في العام' : 'Sept – June' },
        { t: isAr ? 'حقق التخرج' : 'Graduation', d: isAr ? 'أو الترقية للصف التالي' : 'Promotion or Graduation' }
      ]
    },
    edgenuity: {
      title: isAr ? 'البدء مع منصة Edgenuity' : 'Getting Started with Edgenuity',
      new: isAr ? 'جديد على Edgenuity؟ ابدأ هنا!' : 'New to Edgenuity? Start Here!',
      videoDesc: isAr ? 'يستعرض هذا الفيديو كيفية التنقل في الدورات، إكمال الدروس، تتبع التقدم، واستخدام أدوات التعلم.' : 'This video introduces the platform and explains how to navigate courses, complete lessons, and track progress.',
      platform: {
        title: isAr ? 'منصة تعلم الطالب' : 'Student Learning Platform',
        ready: isAr ? 'جاهز لبدء دوراتك؟' : 'Ready to Begin Your Courses?',
        btn: isAr ? 'تسجيل دخول الطالب' : 'Student Login',
        url: 'https://auth.edgenuity.com/Login/Login/Student'
      },
      inside: {
        title: isAr ? 'ماذا ستجد في الداخل' : 'What You\'ll Find Inside',
        items: [
          { t: isAr ? 'الدورات' : 'Courses', d: isAr ? 'الوصول لكافة دوراتك المنظمة في دروس وأنشطة.' : 'Access assigned courses organized into lessons and activities.' },
          { t: isAr ? 'الدرجات والتقدم' : 'Grades & Progress', d: isAr ? 'مراقبة العمل المكتمل والدرجات والتقدم العام.' : 'Monitor completed work, grades, and overall course progress.' },
          { t: isAr ? 'المهام والتقييمات' : 'Assignments & Assessments', d: isAr ? 'إكمال الاختبارات والمشاريع مع حفظ تلقائي لتقدمك.' : 'Complete quizzes and projects with automatically saved progress.' },
          { t: isAr ? 'التواصل والدعم' : 'Communication & Support', d: isAr ? 'تلقي الإرشادات التعليمية والمساعدة من فريق BBA.' : 'Receive educational guidance and assistance from the BBA team.' }
        ]
      }
    },
    agreement: {
      title: isAr ? 'اتفاقية طالب BBA' : 'The BBA Student Agreement',
      subtitle: isAr ? 'النجاح يبنى على الشراكة' : 'Success Is Built on Partnership',
      bba: {
        title: isAr ? 'ماذا يتوقع الطالب من BBA' : 'What You Can Expect From BBA',
        list: [
          isAr ? 'توفير خطة طالب مخصصة.' : 'Provide a personalized Student Plan.',
          isAr ? 'تعيين مرشد مخصص للتوجيه.' : 'Assign a dedicated mentor for guidance.',
          isAr ? 'مراقبة التقدم الأكاديمي والتواصل بانتظام.' : 'Monitor academic progress and communicate concerns.',
          isAr ? 'الرد على الاستفسارات خلال ساعات العمل الرسمية.' : 'Respond to questions during regular office hours.',
          isAr ? 'مراجعة الدورات المكتملة وفتح دورات جديدة.' : 'Review completed courses and unlock new ones.',
          isAr ? 'التعامل بمهنية واحترام ورعاية.' : 'Treat students and families with professionalism and care.'
        ]
      },
      student: {
        title: isAr ? 'ماذا تتوقع BBA من الطالب' : 'What BBA Expects From Students',
        list: [
          isAr ? 'تسجيل الدخول بانتظام وإحراز تقدم ثابت.' : 'Log into Edgenuity regularly and make consistent progress.',
          isAr ? 'إكمال 5-7% من المنهج كل يوم عمل.' : 'Complete approximately 5–7% of coursework each weekday.',
          isAr ? 'اتباع خطة الطالب والجدول الموصى به.' : 'Follow the Student Plan and recommended schedule.',
          isAr ? 'الرد على رسائل المرشد عند الضرورة.' : 'Read and respond to mentor messages when necessary.',
          isAr ? 'طلب المساعدة عند مواجهة صعوبات.' : 'Request assistance when questions or difficulties arise.',
          isAr ? 'إتمام المهام بنزاهة واعتماداً على الجهد الشخصي.' : 'Complete assignments honestly using your own work.',
          isAr ? 'إبلاغ المرشد عند التوقف عن الدراسة لفترة ممتدة.' : 'Inform their mentor when unable to study for an extended period.'
        ]
      },
      parent: {
        title: isAr ? 'ماذا تتوقع BBA من أولياء الأمور' : 'What BBA Expects From Parents',
        list: [
          isAr ? 'مساعدة الطفل على الحفاظ على روتين تعليمي.' : 'Help their child maintain a consistent learning routine.',
          isAr ? 'البقاء على تواصل مستمر مع المرشد والأكاديمية.' : 'Stay in communication with mentors and the academy.',
          isAr ? 'الرد على رسائل البريد والمكالمات الرسمية.' : 'Respond to academy emails, phone calls, and official communications.',
          isAr ? 'مراقبة التقدم الأكاديمي للطفل بانتظام.' : 'Monitor academic progress regularly.',
          isAr ? 'دعم تحفيز الطفل وتنظيمه لجدوله.' : 'Support their child\'s motivation, organization, and schedule.'
        ]
      }
    },
    courses: {
      title: isAr ? 'فهم الدورات الدراسية الخاصة بك' : 'Understanding Your Courses',
      subtitle: isAr ? 'حقق أقصى استفادة من تجربتك التعليمية' : 'Make the Most of Your Learning Experience',
      sections: [
        {
          t: isAr ? 'الدورات المخصصة' : 'Your Assigned Courses',
          d: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب خلال العام الدراسي (من سبتمبر إلى يونيو). راجع خطتك بانتظام لفهم أهدافك.' : 'Most students are assigned 10 courses during the school year. Review your plan regularly to understand your goals.'
        },
        {
          t: isAr ? 'دراسة دورة واحدة في كل مرة' : 'Studying One Course at a Time',
          d: isAr ? 'في معظم الحالات، يركز الطلاب على دورة واحدة قبل الانتقال للتالية لضمان التركيز وعدم الشعور بالارتباك.' : 'In most cases, students focus on one course before moving to the next to remain focused and avoid overwhelm.'
        },
        {
          t: isAr ? 'إعادة المهام والاختبارات' : 'Assignment, Quiz, and Exam Retakes',
          d: isAr ? 'قد يُسمح بإعادة بعض المهام إذا كانت الدرجة أقل من المطلوب. فرص الإعادة محدودة ويجب التنسيق مع المرشد.' : 'Retakes may be permitted when grades are below passing. Opportunities are limited; contact your mentor to review.'
        },
        {
          t: isAr ? 'تغيير الدورات' : 'Course Changes',
          d: isAr ? 'تغيير الدورات ممكن في حالات معينة بعد موافقة مستشار BBA، بناءً على الخطة الأكاديمية ومتطلبات التخرج.' : 'Course changes may be possible with counselor approval, depending on the academic plan and graduation requirements.'
        },
        {
          t: isAr ? 'الجدول الزمني للإكمال' : 'Course Completion Timeline',
          d: isAr ? 'من المقرر إكمال كل دورة في غضون 3-4 أسابيع تقريباً، وهو ما يضمن إكمال دورة واحدة كل شهر.' : 'Courses are generally scheduled for completion within approximately 3–4 weeks (about one course per month).'
        },
        {
          t: isAr ? 'العمل المسبق' : 'Working Ahead',
          d: isAr ? 'نشجع الطلاب على التقدم في جدولهم، ولكن يقتصر الإكمال عادة على دورتين كحد أقصى في الشهر الواحد.' : 'Students can work ahead, but are generally limited to completing no more than two courses in a single month.'
        },
        {
          t: isAr ? 'إتمام المتطلبات' : 'Completing Required Coursework',
          d: isAr ? 'يجب إكمال كافة الدروس والمهام والاختبارات. تخطي أي جزء غير مسموح به وقد يعيق إكمال الدورة بنجاح.' : 'Students must complete all required lessons and assessments. Skipping required coursework is not permitted.'
        },
        {
          t: isAr ? 'استلام الدورة التالية' : 'Receiving Your Next Course',
          d: isAr ? 'بعد إكمال الدورة، أبلغ مرشدك. سنقوم بمراجعة أدائك النهائي ثم تفعيل الدورة التالية المخصصة لك.' : 'After completing a course, notify your mentor. We will review your performance and assign the next course once ready.'
        }
      ]
    },
    support: {
      title: isAr ? 'أنت لست وحدك في رحلة التعلم' : 'You\'re Never Learning Alone',
      subtitle: isAr ? 'التعليم يكون أفضل مع التوجيه' : 'Education Is Better with Guidance',
      desc: isAr 
        ? 'من المفاهيم الخاطئة عن التعلم عبر الإنترنت أن الطالب يجب أن يدير كل شيء بمفرده. في BBA، يتلقى الطلاب وعائلاتهم توجيهاً تعليمياً مستمراً طوال العام.'
        : 'One common misconception about online learning is that students must manage everything on their own. At BBA, families receive educational guidance throughout the year.',
      help: {
        title: isAr ? 'هل تحتاج إلى مساعدة؟' : 'Need Help?',
        subtitle: isAr ? 'نحن هنا لدعمك' : 'We\'re Here to Support You',
        email: 'banaatacademy@gmail.com',
        phone: '(313) 455-0322',
        response: isAr ? 'نسعى للرد على الاستفسارات بأسرع وقت ممكن خلال ساعات العمل الرسمية.' : 'We strive to respond to inquiries as quickly as possible during regular business hours.',
        btn: isAr ? 'تواصل مع BBA' : 'Contact BBA'
      }
    },
    final: {
      title: isAr ? 'كل خطوة تقربك من أهدافك' : 'Every Step Brings You Closer to Your Goals',
      p1: isAr ? 'كل درس تنهيه.. كل مهمة تنجزها.. كل إنجاز تحققه.' : 'Every completed lesson. Every finished assignment. Every milestone you achieve.',
      p2: isAr ? 'كل واحدة منها تقربك خطوة من أهدافك التعليمية. النجاح ليس في الكمال، بل في الاستمرار والتقدم.' : 'Each one brings you closer to your educational goals. Success isn\'t about being perfect, it\'s about moving forward.',
      wish: isAr ? 'فريق BBA فخور بكونه جزءاً من رحلتك. نتمنى لك عاماً دراسياً مذهلاً!' : 'The BBA team is proud to be part of your journey. We wish you an amazing school year!',
      quote: isAr ? 'النجاح لا يقاس بالسرعة، بل بالجهد المستمر والفضول والمثابرة في كل خطوة.' : 'Success isn\'t measured by how quickly you finish; it\'s built through consistent effort, curiosity, and perseverance.'
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-primary text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="guide-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#guide-grid)" />
          </svg>
        </div>
        <div className="container-tight relative z-10 text-center space-y-8">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
               <GraduationCap className="h-4 w-4" />
               Academic Success Resource
             </div>
             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter drop-shadow-2xl">
               {t.hero.title}
             </h1>
             <p className="text-sm sm:text-xl text-white/80 font-bold max-w-3xl mx-auto leading-relaxed">
               {t.hero.subtitle}
             </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6 text-white/70 font-medium text-sm sm:text-base leading-relaxed">
             <p className="text-white font-bold text-lg italic border-l-4 border-secondary pl-6 py-2 bg-white/5 rounded-r-xl">
               {t.hero.welcome}
             </p>
             <p>{t.hero.p1}</p>
             <p>{t.hero.p2}</p>
             <p className="text-secondary font-black">{t.hero.p3}</p>
          </div>
        </div>
      </section>

      {/* 2. Getting Started Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container-tight space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">{t.gettingStarted.title}</h2>
            <div className="h-1 w-16 bg-secondary mx-auto rounded-full" />
            <p className="text-slate-500 font-bold max-w-2xl mx-auto text-sm sm:text-base">{t.gettingStarted.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.gettingStarted.steps.map((step) => (
              <Card key={step.num} className="border-none shadow-sm rounded-2xl hover:shadow-xl transition-all duration-500 group overflow-hidden">
                <div className="p-8 space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg group-hover:bg-secondary transition-colors">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-black text-primary uppercase">{step.title}</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">{step.desc}</p>
                </div>
              </Card>
            ))}
            <div className="md:col-span-2 lg:col-span-1 bg-secondary/5 border-2 border-dashed border-secondary/20 rounded-2xl p-8 flex items-center justify-center text-center">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
                  <Info className="h-5 w-5" />
                </div>
                <p className="text-primary font-black italic text-sm sm:text-base leading-relaxed">
                  {t.gettingStarted.tip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How the BBA Program Works */}
      <section className="py-20 bg-white">
        <div className="container-tight space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-primary uppercase tracking-tight">{t.howItWorks.title}</h2>
            <p className="text-slate-500 font-bold text-sm sm:text-lg">{t.howItWorks.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {t.howItWorks.items.map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <div className="h-12 w-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-inner group-hover:bg-secondary group-hover:text-white transition-all">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-primary text-lg sm:text-xl uppercase tracking-tight">{item.title}</h3>
                  <p className="text-secondary font-black text-[10px] uppercase tracking-widest">{item.subtitle}</p>
                  <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Card className="bg-primary text-white rounded-2xl overflow-hidden border-none shadow-2xl relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <MousePointer2 className="h-48 w-48 rotate-12" />
            </div>
            <div className="p-8 sm:p-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">{t.howItWorks.anywhere.title}</h3>
                  <p className="text-secondary font-black text-sm sm:text-xl italic">{t.howItWorks.anywhere.subtitle}</p>
                </div>
                <p className="text-white/80 font-medium text-sm sm:text-lg leading-relaxed">{t.howItWorks.anywhere.desc}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center">
                 <p className="text-lg sm:text-xl font-black italic">
                   {isAr ? '"النجاح هو جهد جماعي بين الطالب، ولي الأمر، المرشد، والأكاديمية."' : '"Student Success Is a Team Effort between students, parents, mentors, and the academy."'}
                 </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 4. Success Formula Section */}
      <section className="py-20 bg-slate-50">
        <div className="container-tight space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">{t.formula.title}</h2>
            <p className="text-secondary font-black italic">{t.formula.subtitle}</p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 hidden lg:block" />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {t.formula.steps.map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center gap-4 group">
                  <div className="h-16 w-16 rounded-2xl bg-white border-2 border-slate-200 text-primary flex items-center justify-center font-black text-2xl shadow-sm transition-all duration-500 group-hover:bg-secondary group-hover:border-secondary group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-primary text-sm uppercase tracking-tight">{step.t}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Getting Started with Edgenuity */}
      <section className="py-20 bg-white">
        <div className="container-tight space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-4xl font-black text-primary uppercase tracking-tight leading-tight">{t.edgenuity.title}</h2>
                <p className="text-lg sm:text-2xl font-black text-secondary italic">{t.edgenuity.new}</p>
              </div>
              <p className="text-slate-600 font-medium text-sm sm:text-lg leading-relaxed">
                {t.edgenuity.videoDesc}
              </p>
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
                <div className="space-y-2 text-center sm:text-start">
                  <h3 className="font-black text-primary uppercase">{t.edgenuity.platform.title}</h3>
                  <p className="text-xs font-bold text-slate-400">{t.edgenuity.platform.ready}</p>
                </div>
                <Button asChild size="lg" className="w-full sm:w-auto h-14 px-10 bg-primary hover:bg-secondary text-white font-black rounded-xl shadow-xl transition-all">
                  <Link href={t.edgenuity.platform.url} target="_blank">
                    {t.edgenuity.platform.btn}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-900 group">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-secondary text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                    <Video className="h-10 w-10 fill-current" />
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-10 pt-10">
             <h3 className="text-xl sm:text-2xl font-black text-primary uppercase text-center">{t.edgenuity.inside.title}</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.edgenuity.inside.items.map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center space-y-3 hover:bg-white hover:shadow-premium transition-all">
                     <h4 className="font-black text-primary uppercase text-sm tracking-tight">{item.t}</h4>
                     <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.d}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 6. The BBA Student Agreement */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
         <div className="container-tight space-y-16 relative z-10">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">{t.agreement.title}</h2>
              <p className="text-secondary font-black text-lg sm:text-xl italic">{t.agreement.subtitle}</p>
              <div className="h-1 w-16 bg-secondary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {[t.agreement.bba, t.agreement.student, t.agreement.parent].map((section, idx) => (
                 <Card key={idx} className="bg-white/5 border-white/10 text-white rounded-2xl h-full shadow-lg backdrop-blur-sm">
                    <CardHeader className="border-b border-white/10">
                      <CardTitle className="text-sm sm:text-lg font-black uppercase text-secondary">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4 font-medium text-xs sm:text-sm">
                      {section.list.map((l, i) => <div key={i} className="flex gap-3"><CheckCircle2 className="h-4 w-4 text-secondary shrink-0" /><span>{l}</span></div>)}
                    </CardContent>
                 </Card>
               ))}
            </div>

            <div className="pt-10 text-center border-t border-white/10">
               <p className="text-lg sm:text-xl font-black italic text-white/90 max-w-4xl mx-auto">
                 {isAr ? '"في BBA، نؤمن أن النجاح لا يبنى في يوم واحد، بل من خلال الجهد المستمر والتواصل المفتوح والشراكة القوية."' : '"At BBA, we believe success isn\'t built in a single day—it\'s built through consistent effort, open communication, and a strong partnership."'}
               </p>
            </div>
         </div>
      </section>

      {/* 7. Understanding Your Courses */}
      <section className="py-20 bg-white">
        <div className="container-tight space-y-16">
           <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-4xl font-black text-primary uppercase tracking-tight">{t.courses.title}</h2>
              <p className="text-slate-500 font-bold text-sm sm:text-lg">{t.courses.subtitle}</p>
              <div className="h-1 w-16 bg-secondary mx-auto rounded-full" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {t.courses.sections.map((section, idx) => (
                <div key={idx} className="space-y-4 border-l-4 border-slate-100 pl-6 group hover:border-secondary transition-all">
                   <h3 className="text-lg font-black text-primary uppercase tracking-tight group-hover:text-secondary transition-colors">{section.t}</h3>
                   <p className="text-slate-600 font-medium text-xs sm:text-base leading-relaxed opacity-90">{section.d}</p>
                </div>
              ))}
           </div>

           <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
              <div className="flex justify-center mb-4"><Info className="h-8 w-8 text-secondary" /></div>
              <p className="text-primary font-black text-base sm:text-xl italic">
                {isAr ? 'تذكير هام: خطة الطالب الخاصة بك مصممة لمساعدتك على النجاح. ركز على دورة واحدة في كل مرة، واعمل بانتظام، وتواصل مع مرشدك كلما احتجت إلى توجيه.' : 'Important Reminder: Your Student Plan is designed to help you succeed. Focus on one course at a time, work consistently, and communicate with your mentor whenever you need guidance.'}
              </p>
           </div>
        </div>
      </section>

      {/* 8 & 9. Support and Help */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
         <div className="container-tight relative z-10 space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="space-y-8">
                  <div className="space-y-4">
                     <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight">{t.support.title}</h2>
                     <p className="text-secondary font-black text-lg sm:text-xl italic">{t.support.subtitle}</p>
                  </div>
                  <div className="space-y-6 text-white/70 font-medium text-sm sm:text-lg leading-relaxed">
                     <p>{t.support.desc}</p>
                     <p className="text-white font-bold">{isAr ? 'نحن نؤمن بأن التعليم يكون في أقوى حالاته عندما يعمل الطلاب وأولياء الأمور والأكاديمية معاً.' : 'We believe education is strongest when students, parents, and the academy work together.'}</p>
                  </div>
               </div>
               <div className="bg-white p-8 sm:p-12 rounded-2xl text-primary space-y-8 shadow-2xl relative group">
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black uppercase tracking-tight">{t.support.help.title}</h3>
                     <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{t.support.help.subtitle}</p>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <Mail className="h-5 w-5 text-secondary" />
                        <span className="font-bold text-sm sm:text-base">{t.support.help.email}</span>
                     </div>
                     <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <Phone className="h-5 w-5 text-secondary" />
                        <span className="font-bold text-sm sm:text-base" dir="ltr">{t.support.help.phone}</span>
                     </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-bold leading-relaxed">{t.support.help.response}</p>
                  <Button asChild className="w-full h-16 bg-secondary hover:bg-primary text-white font-black rounded-xl shadow-xl transition-all text-lg">
                    <Link href={`/${lang}/contact`}>{t.support.help.btn}</Link>
                  </Button>
               </div>
            </div>
         </div>
      </section>

      {/* 10. Final Message */}
      <section className="py-24 lg:py-32 bg-white text-center">
         <div className="container-tight space-y-12">
            <div className="flex justify-center">
               <div className="h-16 w-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shadow-inner">
                  <Heart className="h-8 w-8 fill-secondary animate-pulse" />
               </div>
            </div>
            <div className="space-y-6">
               <h2 className="text-2xl lg:text-5xl font-black text-primary uppercase tracking-tighter max-w-4xl mx-auto leading-tight">
                 {t.final.title}
               </h2>
               <div className="max-w-2xl mx-auto space-y-4 font-bold text-slate-500 text-sm sm:text-xl italic opacity-80">
                  <p>{t.final.p1}</p>
                  <p>{t.final.p2}</p>
               </div>
            </div>
            <div className="pt-8 space-y-8">
               <p className="text-xl sm:text-3xl font-black text-secondary uppercase tracking-tight">{t.final.wish}</p>
               <div className="p-10 border-y border-slate-100">
                  <p className="text-xs sm:text-lg text-slate-400 font-black uppercase tracking-[0.2em]">
                    {t.final.quote}
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
