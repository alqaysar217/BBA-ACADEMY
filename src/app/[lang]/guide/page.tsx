'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  Rocket, 
  BookOpen, 
  Trophy,
  GraduationCap,
  CheckCircle2,
  Users,
  Mail,
  Phone,
  Clock,
  ChevronRight,
  ChevronLeft,
  Target,
  Info,
  Heart,
  HelpCircle,
  ClipboardCheck,
  ShieldCheck,
  MessageSquare,
  Zap,
  Calendar
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
      welcome: isAr ? 'مرحباً بكم في أكاديمية بنين وبنات (BBA)! نحن متحمسون لانضمامكم لمجتمعنا التعليمي ونتطلع لدعمكم طوال رحلتكم التعليمية.' : 'Welcome to Baneen and Banaat Academy (BBA)! We are excited to welcome you to our educational community and look forward to supporting you throughout your learning journey.',
      p1: isAr 
        ? 'يمكن أن يثير بدء برنامج أكاديمي جديد العديد من الأسئلة والمسؤوليات الجديدة. تم تصميم هذا الدليل لمساعدة الطلاب وأولياء الأمور على فهم ما يمكن توقعه، وكيفية التعلم، وكيفية بناء العادات اللازمة لعام دراسي ناجح.'
        : 'Starting a new academic program can bring many questions and new responsibilities. This Student Guide is designed to help students and parents understand what to expect, how learning works, and how to build the habits needed for a successful school year.',
      p2: isAr
        ? 'في BBA، نؤمن بأن الطلاب يزدهرون عندما يكون لديهم خطة أكاديمية واضحة، وعادات دراسية متسقة، وعائلات داعمة، ووصول إلى التوجيه التربوي.'
        : 'At BBA, we believe students thrive when they have a clear academic plan, consistent study habits, supportive families, and access to educational guidance.',
      p3: isAr
        ? 'يوفر مسار التعلم ذاتي الوتيرة لدينا المرونة مع الحفاظ على التوقعات الأكاديمية المنظمة. يمكن للطلاب إكمال دوراتهم الدراسية عن بعد، واتباع خطة الطالب المخصصة لهم، والتواصل مع مرشديهم عند الحاجة للمساعدة.'
        : 'Our self-paced learning pathway offers flexibility while maintaining structured academic expectations. Students can complete their coursework remotely, follow their personalized Student Plan, and communicate with their assigned mentor when assistance is needed.',
      footer: isAr ? 'تبدأ رحلتك التعليمية بخطة، وتنمو من خلال الجهد المستمر، وتنجح من خلال الالتزام والدعم.' : 'Your educational journey begins with a plan, grows through consistent effort, and succeeds through commitment and support.'
    },
    sections: {
      s1: {
        title: isAr ? 'القسم 1 — خطواتك الأولى نحو عام دراسي ناجح' : 'SECTION 1 — Getting Started at BBA',
        subtitle: isAr ? 'التحضير لرحلتك الأكاديمية' : 'Your First Steps Toward a Successful School Year',
        steps: [
          {
            num: 1,
            title: isAr ? 'تفقد بريدك الترحيبي' : 'Step 1 — Check Your Welcome Email',
            desc: isAr ? 'يحتوي بريدك الترحيبي على معلومات هامة لبدء دراستك، بما في ذلك بيانات دخول المنصة التعليمية، خطة الطالب المخصصة، واسم المرشد ومعلومات التواصل معه.' : 'Your Welcome Email contains important information about beginning your studies, including assigned learning platform credentials, your personalized Student Plan, and your mentor\'s contact information.'
          },
          {
            num: 2,
            title: isAr ? 'الوصول إلى منصة التعلم' : 'Step 2 — Access Your Assigned Learning Platform',
            desc: isAr ? 'يكمل الطلاب في هذا المسار دوراتهم عبر منصة Edgenuity. استخدم بيانات الدخول المرسلة في بريدك الترحيبي، وتعرف على الدورات المخصصة، والأنشطة التعليمية، وكيفية تتبع درجاتك.' : 'Students in this pathway complete coursework through Edgenuity. Use the credentials in your Welcome Email to enter. Familiarize yourself with assigned courses, learning activities, and progress tracking.'
          },
          {
            num: 3,
            title: isAr ? 'راجع خطة الطالب الخاصة بك' : 'Step 3 — Review Your Student Plan',
            desc: isAr ? 'تحدد هذه الخطة الدورات المخصصة لك والجدول الموصى به. تتضمن الخطة القياسية 10 دورات بين سبتمبر ويونيو (بمعدل دورة شهرياً تقريباً).' : 'Your personalized Student Plan outlines assigned courses and a recommended schedule. Typically, this includes 10 courses between September and June, averaging one course per month.'
          },
          {
            num: 4,
            title: isAr ? 'تواصل مع مرشدك' : 'Step 4 — Connect With Your Mentor',
            desc: isAr ? 'مرشدك هو جزء أساسي من فريق الدعم الأكاديمي، حيث يساعدك في فهم التوقعات ومراقبة التقدم. تأكد من معرفة كيفية التواصل معه عند الحاجة للمساعدة.' : 'Your mentor monitors progress, answers questions, and provides guidance. Make sure you know how and when to reach out for assistance or report academic difficulties.'
          },
          {
            num: 5,
            title: isAr ? 'ابدأ دورتك الأولى' : 'Step 5 — Begin Your First Course',
            desc: isAr ? 'ابدأ بالدورة الأولى واتبع الدروس بالترتيب المطلوب. بناء روتين يومي منتظم من البداية يسهل عليك البقاء على المسار الصحيح طوال العام.' : 'Start with your first assigned course and follow its lessons in order. Establish a consistent learning routine from the beginning to stay on track.'
          }
        ],
        tip: isAr ? 'نصيحة BBA للنجاح: ابدأ مبكراً، كن متسقاً، وتواصل دائماً عند حاجتك للتوجيه.' : 'BBA Success Tip: Start early, stay consistent, and communicate whenever you need guidance.'
      },
      s2: {
        title: isAr ? 'القسم 2 — كيفية عمل برنامج BBA التعليمي' : 'SECTION 2 — How the BBA Learning Program Works',
        subtitle: isAr ? 'تعلم مرن عبر الإنترنت باتجاه أكاديمي واضح' : 'Flexible Online Learning With a Clear Academic Direction',
        desc: isAr 
          ? 'يجمع مسار التعلم ذاتي الوتيرة في BBA بين الدورات الدراسية المستقلة والتخطيط الأكاديمي والدعم. على عكس الفصول التقليدية، يمكنك تنظيم جدول دراستك حول روتين عائلتك.'
          : 'BBA\'s self-paced pathway combines independent coursework with academic planning and support. Unlike traditional classrooms, you can organize your schedule around your family routine.',
        items: [
          { t: isAr ? 'تعلم بوتيرتك الخاصة' : 'Learn at Your Own Pace', d: isAr ? 'لا توجد ساعات حصص مباشرة يومية إلزامية في هذا المسار. اختر الوقت الذي يناسبك، سواء في الصباح أو المساء، لإكمال دروسك.' : 'No required daily live-class hours. Choose the times that work best for you—morning, afternoon, or evening—to complete assigned lessons.' },
          { t: isAr ? 'اتبع خطة طالب منظمة' : 'Follow a Structured Student Plan', d: isAr ? 'تحدد الخطة دوراتك وما يجب إكماله طوال العام. راجعها بانتظام لضمان عدم التأخر في الجدول الزمني.' : 'Your Student Plan provides the structure behind your schedule, identifying assigned courses and what should be completed throughout the year.' },
          { t: isAr ? 'حافظ على تقدم يومي ثابت' : 'Maintain Consistent Weekday Progress', d: isAr ? 'يتوقع من الطلاب إكمال حوالي 5-7% من المنهج كل يوم (من الإثنين إلى الجمعة) للبقاء على الجدول الزمني.' : 'Students are generally expected to complete approximately 5–7% of coursework each weekday, Monday through Friday, to remain on schedule.' },
          { t: isAr ? 'التعلم من مواقع مختلفة' : 'Learn From Different Locations', d: isAr ? 'يمكنك الوصول للمنصة من المنزل أو أي مكان بإنترنت مستقر. تذكر أن فريقنا يعمل بتوقيت شرق الولايات المتحدة (Eastern Time).' : 'Access coursework from home or any suitable environment with internet. Remember BBA staff operate on US Eastern Time.' }
        ]
      },
      s3: {
        title: isAr ? 'القسم 3 — بناء روتين دراسي ناجح' : 'SECTION 3 — Building a Successful Study Routine',
        subtitle: isAr ? 'الخطوات اليومية الصغيرة تؤدي لتقدم ملموس' : 'Small Daily Steps Lead to Meaningful Progress',
        formulaTitle: isAr ? 'معادلة النجاح في BBA' : 'The BBA Success Formula',
        formula: [
          { t: isAr ? 'الدراسة كل يوم' : 'Study Every Weekday', d: isAr ? 'من الإثنين إلى الجمعة' : 'Monday through Friday' },
          { t: isAr ? 'إنجاز 5-7%' : 'Complete 5–7%', d: isAr ? 'هدف التقدم اليومي' : 'Daily progress target' },
          { t: isAr ? 'دورة واحدة شهرياً' : 'One Course Monthly', d: isAr ? 'حسب خطة الطالب' : 'Follow your Student Plan' },
          { t: isAr ? 'إكمال 10 دورات' : 'Complete 10 Courses', d: isAr ? 'بين سبتمبر ويونيو' : 'September through June' },
          { t: isAr ? 'التواصل مع المرشد' : 'Connect with Mentor', d: isAr ? 'بشكل مستمر' : 'Regular communication' }
        ],
        advice: isAr ? 'التعلم المستقل لا يعني التعلم بدون دعم. إذا تعثرت، لا تتوقف، بل تواصل مع مرشدك فوراً.' : 'Independent learning does not mean learning without support. If you fall behind, reach out to your mentor early.'
      },
      s4: {
        title: isAr ? 'القسم 4 — فهم الدورات الدراسية الخاصة بك' : 'SECTION 4 — Understanding Your Courses',
        subtitle: isAr ? 'فهم المنهج والتوقعات والإجراءات الأكاديمية' : 'Know Your Coursework, Expectations, and Academic Procedures',
        policies: [
          { t: isAr ? 'دراسة دورة واحدة في كل مرة' : 'Studying One Course at a Time', d: isAr ? 'يُتوقع من الطلاب التركيز على دورة واحدة قبل الانتقال للتالية لضمان التركيز التام.' : 'Focus on one course before beginning the next to ensure concentration and successful completion of requirements.' },
          { t: isAr ? 'إعادة التقييمات' : 'Retakes', d: isAr ? 'قد يُسمح بإعادة بعض المهام إذا كانت الدرجة أقل من المطلوبة. فرص الإعادة محدودة وتتطلب موافقة المرشد.' : 'Retakes may be permitted when grades are below passing. Opportunities are limited and require mentor or counselor approval.' },
          { t: isAr ? 'تغيير الدورات' : 'Course Changes', d: isAr ? 'تغيير الدورات يعتمد على الخطة الأكاديمية ومتطلبات التخرج، ويجب مراجعته مع المستشار التعليمي.' : 'Course changes depend on the academic plan and graduation requirements. Contact your BBA counselor for requests.' },
          { t: isAr ? 'العمل المسبق' : 'Working Ahead', d: isAr ? 'نشجع على التقدم في الجدول، ولكن يقتصر الإكمال عادة على دورتين كحد أقصى في الشهر الواحد.' : 'Students may work ahead, but are generally limited to completing no more than two courses in a single month.' },
          { t: isAr ? 'النزاهة الأكاديمية' : 'Academic Honesty', d: isAr ? 'يجب أن تمثل كافة المهام مجهود الطالب الشخصي. النزاهة تبني المعرفة والثقة بالنفس.' : 'All submitted work must be the student\'s own effort. Integrity builds knowledge, responsibility, and confidence.' }
        ]
      },
      s5: {
        title: isAr ? 'القسم 5 — إكمال الدورة والانتقال لما يليها' : 'SECTION 5 — Completing a Course and Moving to the Next',
        subtitle: isAr ? 'كل دورة تكتمل هي إنجاز هام' : 'Every Completed Course Is an Important Milestone',
        steps: [
          { t: isAr ? 'إتمام كافة المتطلبات' : 'Complete All Coursework', d: isAr ? 'إنهاء كافة الدروس والاختبارات والمشاريع.' : 'Finish all required lessons, quizzes, tests, and assessments.' },
          { t: isAr ? 'إبلاغ المرشد' : 'Notify Your Mentor', d: isAr ? 'إعلام الفريق الأكاديمي بإنجاز الدورة.' : 'Inform your mentor or the academic team upon completion.' },
          { t: isAr ? 'المراجعة الأكاديمية' : 'Academic Review', d: isAr ? 'مراجعة الأداء والدرجات من قبل الأكاديمية.' : 'BBA reviews your final grade and overall performance.' },
          { t: isAr ? 'إجراء التحسينات' : 'Required Improvements', d: isAr ? 'إكمال أي مهام إضافية إذا طُلبت.' : 'Complete any requested improvements or retakes.' },
          { t: isAr ? 'استلام الدورة التالية' : 'Receive Next Course', d: isAr ? 'فتح الدورة التالية في خطتك.' : 'BBA assigns your next course once all requirements are met.' }
        ]
      },
      s6: {
        title: isAr ? 'القسم 6 — اتفاقية طالب BBA' : 'SECTION 6 — The BBA Student Agreement',
        subtitle: isAr ? 'النجاح يبنى على الشراكة' : 'Success Is Built on Partnership',
        bba: {
          t: isAr ? 'ماذا يتوقع الطالب من BBA' : 'What Students Can Expect From BBA',
          list: [
            isAr ? 'توفير خطة طالب مخصصة.' : 'Provide a personalized Student Plan.',
            isAr ? 'تعيين مرشد للتوجيه التعليمي.' : 'Assign a mentor for educational guidance.',
            isAr ? 'مراقبة التقدم والتواصل بشأن المخاوف.' : 'Monitor progress and communicate concerns.',
            isAr ? 'الرد على الاستفسارات في ساعات العمل.' : 'Respond to questions during regular office hours.',
            isAr ? 'التعامل بمهنية واحترام ورعاية.' : 'Treat families with professionalism and care.'
          ]
        },
        student: {
          t: isAr ? 'ماذا تتوقع BBA من الطالب' : 'What BBA Expects From Students',
          list: [
            isAr ? 'الوصول للمنصة وإحراز تقدم يومي.' : 'Access coursework regularly and make progress.',
            isAr ? 'إكمال 5-7% من المنهج يومياً.' : 'Complete 5–7% of coursework each weekday.',
            isAr ? 'الرد على رسائل المرشد.' : 'Read and respond to mentor communications.',
            isAr ? 'طلب المساعدة عند مواجهة صعوبات.' : 'Request help when experiencing difficulties.',
            isAr ? 'إتمام المهام بنزاهة شخصية.' : 'Complete your own work honestly.'
          ]
        },
        parent: {
          t: isAr ? 'ماذا تتوقع BBA من أولياء الأمور' : 'What BBA Expects From Parents',
          list: [
            isAr ? 'المساعدة في تأسيس روتين تعلم ثابت.' : 'Help establish a consistent learning routine.',
            isAr ? 'توفير بيئة دراسية مناسبة.' : 'Provide a suitable environment for study.',
            isAr ? 'تشجيع الاستقلالية والمسؤولية.' : 'Encourage responsibility and independent learning.',
            isAr ? 'البقاء على اطلاع بتقدم الطفل.' : 'Stay informed about academic progress.',
            isAr ? 'الرد على اتصالات الأكاديمية الرسمية.' : 'Respond to official academy communications.'
          ]
        }
      },
      s7_10: {
        guidance: isAr ? 'التوجيه الأكاديمي والتواصل' : 'Academic Guidance and Communication',
        stayOnTrack: isAr ? 'البقاء على المسار الصحيح طوال العام' : 'Staying on Track Throughout the School Year',
        neverAlone: isAr ? 'أنت لست وحدك في رحلة التعلم' : 'You\'re Never Learning Alone',
        needHelp: isAr ? 'هل تحتاج مساعدة؟' : 'Need Help?',
        contactInfo: {
          email: 'banaatacademy@gmail.com',
          phone: '(313) 455-0322',
          response: isAr ? 'نسعى للرد بأسرع وقت ممكن خلال ساعات العمل (بتوقيت شرق أمريكا).' : 'We strive to respond as promptly as possible during US Eastern Time office hours.'
        }
      },
      final: {
        title: isAr ? 'كل خطوة تقربك من أهدافك' : 'Every Step Brings You Closer to Your Goals',
        msg: isAr ? 'النجاح لا يعني الكمال أو الانتهاء بسرعة، بل يعني الحضور والاستمرار والتعلم من التحديات. فريق BBA فخور بكونه جزءاً من رحلتك.' : 'Success isn\'t about being perfect or finishing quickly; it\'s about showing up, making progress, and learning from challenges. BBA is proud to be part of your journey.',
        quote: isAr ? 'النجاح لا يقاس بالسرعة، بل بالجهد المستمر والفضول والمثابرة في كل خطوة.' : 'Success isn\'t measured by how quickly you finish; it\'s built through consistent effort, curiosity, and perseverance.'
      }
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Hero Section */}
      <section className="bg-primary text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="guide-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#guide-grid)" />
          </svg>
        </div>
        <div className="container-tight relative z-10 text-center space-y-8 px-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
              <GraduationCap className="h-4 w-4" />
              Student Success Handbook
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
            <p>{t.hero.p3}</p>
            <p className="text-secondary font-black text-lg pt-4 border-t border-white/10 uppercase tracking-widest">{t.hero.footer}</p>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container-tight py-12 lg:py-20 px-4 space-y-24 lg:space-y-32">
        
        {/* Section 1: Getting Started */}
        <section className="space-y-12">
          <div className="space-y-4 text-center lg:text-start">
             <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">{t.sections.s1.title}</h2>
             <p className="text-slate-500 font-bold text-sm sm:text-lg italic">{t.sections.s1.subtitle}</p>
             <div className="h-1 w-16 bg-secondary rounded-full mx-auto lg:mx-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.sections.s1.steps.map((step) => (
              <Card key={step.num} className="border-none shadow-premium rounded-2xl hover:shadow-xl transition-all duration-500 group overflow-hidden bg-slate-50/50">
                <div className="p-8 space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg group-hover:bg-secondary transition-colors">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-black text-primary uppercase leading-tight">{step.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">{step.desc}</p>
                </div>
              </Card>
            ))}
            <div className="md:col-span-2 lg:col-span-1 bg-secondary text-white rounded-2xl p-8 flex items-center justify-center text-center shadow-xl shadow-secondary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="h-24 w-24" /></div>
              <p className="font-black italic text-sm sm:text-lg leading-relaxed relative z-10">
                {t.sections.s1.tip}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: How it Works */}
        <section className="space-y-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8">
                 <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">{t.sections.s2.title}</h2>
                    <p className="text-secondary font-black italic text-lg">{t.sections.s2.subtitle}</p>
                 </div>
                 <p className="text-slate-600 font-medium text-sm sm:text-lg leading-relaxed">{t.sections.s2.desc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {t.sections.s2.items.map((item, i) => (
                   <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
                      <h4 className="font-black text-primary text-sm uppercase tracking-tight">{item.t}</h4>
                      <p className="text-[11px] sm:text-xs font-medium text-slate-500 leading-relaxed">{item.d}</p>
                   </div>
                 ))}
              </div>
           </div>
           <div className="bg-primary p-8 rounded-2xl text-white text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-5 group-hover:scale-110 transition-transform"><BookOpen className="h-64 w-64 mx-auto" /></div>
              <p className="text-lg sm:text-2xl font-black italic relative z-10">{isAr ? 'التعليم في BBA هو مسؤولية مشتركة بين الطالب وولي الأمر والأكاديمية.' : 'Education at BBA is a shared responsibility between student, parent, and academy.'}</p>
           </div>
        </section>

        {/* Section 3: Success Formula */}
        <section className="py-16 bg-slate-900 text-white rounded-2xl overflow-hidden relative shadow-2xl">
          <div className="p-8 sm:p-12 space-y-12 relative z-10">
             <div className="text-center space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{t.sections.s3.title}</h2>
                <p className="text-secondary font-black text-lg sm:text-xl italic">{t.sections.s3.formulaTitle}</p>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {t.sections.s3.formula.map((step, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center space-y-3 transition-all hover:bg-white/10 group">
                    <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center font-black mx-auto shadow-lg group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                       <p className="font-black text-xs sm:text-sm uppercase tracking-tight">{step.t}</p>
                       <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{step.d}</p>
                    </div>
                  </div>
                ))}
             </div>

             <div className="pt-8 text-center">
                <p className="text-xs sm:text-base font-bold text-white/60 max-w-3xl mx-auto italic border-t border-white/10 pt-8">
                  {t.sections.s3.advice}
                </p>
             </div>
          </div>
        </section>

        {/* Section 4: Course Policies */}
        <section className="space-y-12">
           <div className="space-y-4 text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">{t.sections.s4.title}</h2>
              <p className="text-slate-500 font-bold text-sm sm:text-lg">{t.sections.s4.subtitle}</p>
              <div className="h-1 w-16 bg-secondary rounded-full mx-auto" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              {t.sections.s4.policies.map((policy, idx) => (
                <div key={idx} className="flex gap-5 items-start p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-premium transition-all group">
                   <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-inner group-hover:bg-secondary group-hover:text-white transition-all">
                      <ShieldCheck className="h-5 w-5" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="font-black text-primary text-base uppercase tracking-tight">{policy.t}</h3>
                      <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed opacity-90">{policy.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Section 5: Course Completion */}
        <section className="space-y-12">
           <div className="bg-primary text-white p-8 sm:p-12 lg:p-20 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><ClipboardCheck className="h-64 w-64" /></div>
              <div className="relative z-10 space-y-12">
                 <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{t.sections.s5.title}</h2>
                    <p className="text-secondary font-black italic text-lg">{t.sections.s5.subtitle}</p>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {t.sections.s5.steps.map((step, i) => (
                      <div key={i} className="flex flex-col gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                         <div className="h-8 w-8 rounded-lg bg-secondary text-white flex items-center justify-center font-black text-sm">{i+1}</div>
                         <div className="space-y-1">
                            <p className="font-black text-xs uppercase tracking-tight leading-tight">{step.t}</p>
                            <p className="text-[10px] font-medium text-white/50">{step.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Section 6: Agreement */}
        <section className="space-y-12">
           <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">{t.sections.s6.title}</h2>
              <p className="text-secondary font-black text-lg sm:text-xl italic">{t.sections.s6.subtitle}</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                { data: t.sections.s6.bba, icon: Info },
                { data: t.sections.s6.student, icon: Target },
                { data: t.sections.s6.parent, icon: Users }
              ].map((group, i) => (
                <Card key={i} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-premium transition-all overflow-hidden flex flex-col h-full bg-slate-50/30">
                   <CardHeader className="bg-primary text-white p-6 border-b border-white/10">
                      <CardTitle className="text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-3">
                         <group.icon className="h-4 w-4 text-secondary" />
                         {group.data.t}
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="p-8 space-y-4 flex-1">
                      {group.data.list.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                           <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                           <p className="text-slate-600 font-bold text-xs sm:text-sm leading-relaxed">{item}</p>
                        </div>
                      ))}
                   </CardContent>
                </Card>
              ))}
           </div>
        </section>

        {/* Section 7-10: Support & Communication */}
        <section className="space-y-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-10">
                 <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">{t.sections.s7_10.guidance}</h2>
                    <div className="h-1 w-16 bg-secondary rounded-full" />
                 </div>
                 <div className="space-y-6">
                    <div className="flex gap-6 items-start">
                       <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg"><MessageSquare className="h-6 w-6" /></div>
                       <div className="space-y-2">
                          <h3 className="font-black text-primary uppercase tracking-tight">{t.sections.s7_10.neverAlone}</h3>
                          <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">{isAr ? 'التعليم عبر الإنترنت لا يعني إدارة التحديات بمفردك. نحن هنا لمراقبة تقدمك وتقديم التوجيه اللازم.' : 'Online learning doesn\'t mean managing challenges alone. We monitor progress and provide the necessary guidance.'}</p>
                       </div>
                    </div>
                    <div className="flex gap-6 items-start">
                       <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shrink-0 shadow-lg"><Calendar className="h-6 w-6" /></div>
                       <div className="space-y-2">
                          <h3 className="font-black text-primary uppercase tracking-tight">{t.sections.s7_10.stayOnTrack}</h3>
                          <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">{isAr ? 'البقاء على المسار الصحيح يتطلب اهتماماً مستمراً طوال العام، من متابعة البريد وحتى مراجعة خطة الطالب أسبوعياً.' : 'Staying on track requires ongoing attention throughout the year, from checking emails to reviewing Student Plans weekly.'}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <Card className="rounded-2xl border-none shadow-2xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><HelpCircle className="h-48 w-48" /></div>
                 <div className="relative z-10 space-y-8">
                    <div className="space-y-2 text-center lg:text-start">
                       <h3 className="text-2xl font-black uppercase tracking-tight">{t.sections.s7_10.needHelp}</h3>
                       <p className="text-secondary font-black uppercase tracking-widest text-xs">{isAr ? 'نحن هنا لخدمتكم' : 'We are here to support you'}</p>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                          <Mail className="h-5 w-5 text-secondary" />
                          <span className="font-bold text-xs sm:text-base">{t.sections.s7_10.contactInfo.email}</span>
                       </div>
                       <div className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                          <Phone className="h-5 w-5 text-secondary" />
                          <span className="font-bold text-xs sm:text-base" dir="ltr">{t.sections.s7_10.contactInfo.phone}</span>
                       </div>
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/40 font-medium leading-relaxed italic">{t.sections.s7_10.contactInfo.response}</p>
                    <Button asChild size="lg" className="w-full h-16 bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-xl shadow-xl transition-all text-lg">
                       <Link href={`/${lang}/contact`}>{isAr ? 'تواصل مع BBA' : 'Contact BBA'}</Link>
                    </Button>
                 </div>
              </Card>
           </div>
        </section>

        {/* Section 11: Final Message */}
        <section className="py-20 lg:py-32 text-center space-y-12 border-t border-slate-100">
           <div className="flex justify-center">
              <div className="h-20 w-20 rounded-3xl bg-secondary/10 text-secondary flex items-center justify-center shadow-inner group hover:scale-110 transition-transform duration-500">
                 <Heart className="h-10 w-10 fill-secondary animate-pulse" />
              </div>
           </div>
           <div className="space-y-6 max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-5xl font-black text-primary uppercase tracking-tighter leading-tight">
                 {t.sections.final.title}
              </h2>
              <p className="text-slate-500 font-bold text-sm sm:text-xl leading-relaxed italic">
                 {t.sections.final.msg}
              </p>
           </div>
           <div className="p-10 border-y border-slate-50">
              <p className="text-xs sm:text-lg text-slate-400 font-black uppercase tracking-[0.3em] max-w-3xl mx-auto">
                 "{t.sections.final.quote}"
              </p>
           </div>
           <p className="text-xl sm:text-3xl font-black text-secondary uppercase tracking-tight">{isAr ? 'نتمنى لك عاماً دراسياً ملهماً وناجحاً!' : 'We wish you a successful and rewarding school year!'}</p>
        </section>

      </div>
    </div>
  );
}
