'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck,
  Target,
  AlertTriangle,
  Lightbulb,
  MapPin,
  GraduationCap,
  XCircle,
  HelpCircle,
  ClipboardCheck,
  Calendar,
  BookOpen,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function NyResourcesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = {
    hero: {
      title: isAr ? 'مركز موارد نيويورك للتعليم المنزلي' : 'New York Homeschool Resource Center',
      subtitle: isAr ? 'كل ما تحتاج لمعرفته حول التعليم المنزلي في ولاية نيويورك.' : 'Everything You Need to Know About Homeschooling in New York.',
      intro: isAr 
        ? 'تتمتع ولاية نيويورك ببعض من أكثر لوائح التعليم المنزلي تفصيلاً في الولايات المتحدة. وبينما قد تبدو العملية مرهقة، فإن فهم المتطلبات يصبح أسهل بكثير مع التوجيه الصحيح.'
        : 'New York has some of the most detailed homeschool regulations in the United States. While the process may seem overwhelming, understanding the requirements becomes much easier with the right guidance.',
      btn: isAr ? 'اعرف المزيد' : 'Learn More'
    },
    introSection: {
      title: isAr ? 'التعليم المنزلي في نيويورك' : 'Homeschooling in New York',
      subtitle: isAr ? 'نساعد العائلات في التنقل بين متطلبات نيويورك للتعليم المنزلي بكل ثقة.' : "Helping families navigate New York's homeschool requirements with confidence.",
      content1: isAr
        ? 'تمتلك ولاية نيويورك بعضاً من أكثر لوائح التعليم المنزلي شمولاً في الولايات المتحدة. وبينما قد تبدو العملية مرهقة في البداية، فإن فهم المتطلبات يصبح أسهل بكثير مع التوجيه الصحيح.'
        : "New York has some of the most comprehensive homeschool regulations in the United States. While the process may seem overwhelming at first, understanding the requirements becomes much easier with the right guidance.",
      content2: isAr
        ? 'في أكاديمية بنين وبنات (BBA)، قضينا سنوات في دعم عائلات التعليم المنزلي في نيويورك ومساعدة أولياء الأمور على فهم متطلبات الولاية. تم إنشاء مركز الموارد هذا لتوفير معلومات واضحة وموثوقة وإرشادات عملية طوال رحلة التعليم المنزلي الخاصة بك.'
        : "At Baneen and Banaat Academy (BBA), we have spent years supporting homeschool families in New York and helping parents understand state requirements. This resource center was created to provide clear, reliable information and practical guidance throughout your homeschooling journey.",
      footer: isAr ? 'سواء كنت بدأت للتو أو كنت تقوم بالفعل بتعليم طفلك منزلياً، فنحن هنا للمساعدة.' : "Whether you're just getting started or already homeschooling your child, we're here to help."
    },
    process: {
      title: isAr ? 'عملية التعليم المنزلي في نيويورك' : 'The Homeschool Process in New York',
      desc: isAr 
        ? 'يتبع التعليم المنزلي في نيويورك عملية منظمة مصممة لمساعدة العائلات على توفير تجربة تعليمية منظمة مع تلبية متطلبات الولاية. على الرغم من أن العملية قد تبدو مفصلة في البداية، إلا أنها تصبح أكثر قابلية للإدارة عند تقسيمها إلى خطوات واضحة.'
        : 'Homeschooling in New York follows a structured process designed to help families provide an organized educational experience while meeting state requirements. Although the process may seem detailed at first, it becomes much more manageable when broken down into clear steps.',
      overview: isAr ? 'فيما يلي نظرة عامة على المتطلبات الأساسية الأربعة التي يكملها معظم عائلات التعليم المنزلي في كل عام دراسي.' : 'Below is an overview of the four primary requirements most homeschool families complete each school year.',
      howBbaHelps: isAr ? 'كيف تساعد BBA' : 'How BBA Helps',
      steps: [
        {
          id: 1,
          title: isAr ? 'الخطوة 1 — خطاب النوايا (LOI)' : 'Step 1 — Notice of Intent (LOI)',
          content: isAr
            ? 'تبدأ رحلة التعليم المنزلي بخطاب النوايا (LOI). هذه رسالة بسيطة تبلغ منطقتك التعليمية المحلية بأنك تنوي تعليم طفلك منزلياً للعام الدراسي القادم. وهي تخطر المنطقة رسمياً بأن طفلك سيتلقى تعليمه من خلال برنامج تعليم منزلي بدلاً من حضور المدرسة العامة. بالنسبة للعائلات التي تبدأ التعليم المنزلي خلال العام الدراسي، يتم تقديم خطاب النوايا عادةً في غضون الإطار الزمني المطلوب بعد إنشاء برنامج التعليم المنزلي.'
            : 'The homeschooling journey begins with the Notice of Intent (LOI). This is a simple letter informing your local school district that you intend to homeschool your child for the upcoming school year. It officially notifies the district that your child will be educated through a home instruction program rather than attending public school. For families beginning homeschooling during the school year, the Notice of Intent is generally submitted within the required timeframe after establishing the homeschool program.',
          bba: isAr
            ? 'إذا كانت عائلتك مسجلة في أكاديمية بنين وبنات، فلن تضطر إلى التنقل في هذه العملية بمفردك. يوفر فريقنا إرشادات خطوة بخطوة، مما يساعدك على فهم متى يجب تقديم خطاب النوايا والإجابة على أي أسئلة قد تكون لديك طوال العملية.'
            : 'If your family is enrolled with Baneen and Banaat Academy, you won\'t have to navigate this process alone. Our team provides step-by-step guidance, helping you understand when the Notice of Intent should be submitted and answering any questions you may have throughout the process.'
        },
        {
          id: 2,
          title: isAr ? 'الخطوة 2 — خطة التعليم المنزلي الفردية (IHIP)' : 'Step 2 — Individualized Home Instruction Plan (IHIP)',
          content: isAr
            ? 'بعد تقديم خطاب النوايا، يقوم أولياء الأمور بإعداد خطة التعليم المنزلي الفردية. توضح خطة IHIP الخطة التعليمية للعام الدراسي، بما في ذلك المواد التي سيتم تدريسها وفقاً للوائح التعليم المنزلي في نيويورك. بدلاً من العمل كمنهج صارم، تزود خطة IHIP المنطقة التعليمية بنظرة عامة على التعليم المخطط لطالبك وتوضح أنه سيتم تغطية المواد المطلوبة طوال العام.'
            : 'After submitting the LOI, parents prepare an Individualized Home Instruction Plan. The IHIP outlines the educational plan for the school year, including the subjects that will be taught in accordance with New York\'s homeschool regulations. Rather than serving as a rigid curriculum, the IHIP provides the school district with a general overview of your student\'s planned instruction and demonstrates that the required subjects will be covered throughout the year.',
          bba: isAr
            ? 'نحن نساعد العائلات المسجلة في BBA على فهم المتطلبات التعليمية في نيويورك ونقدم التوجيه أثناء إعداد خطة التعليم المنزلي الفردية (IHIP)، مما يضمن شعور أولياء الأمور بالثقة طوال العملية.'
            : 'We help families enrolled with BBA understand New York\'s educational requirements and provide guidance while preparing the Individualized Home Instruction Plan (IHIP), ensuring parents feel confident throughout the process.'
        },
        {
          id: 3,
          title: isAr ? 'الخطوة 3 — التقارير الفصلية' : 'Step 3 — Quarterly Reports',
          content: isAr
            ? 'طوال العام الدراسي، يقدم أولياء الأمور تقارير فصلية توثق التقدم التعليمي لطلابهم. توفر هذه التقارير ملخصاً للتعليم المكتمل خلال كل فصل، بما في ذلك الحضور والتقدم الأكاديمي والمواد التي تمت تغطيتها. تساعد التقارير الفصلية في إثبات أن البرنامج التعليمي للطالب يتقدم كما هو مخطط له.'
            : 'Throughout the school year, parents submit Quarterly Reports documenting their student\'s educational progress. These reports provide a summary of the instruction completed during each quarter, including attendance, academic progress, and the subjects covered. Quarterly Reports help demonstrate that the student\'s educational program is progressing as planned.',
          bba: isAr
            ? 'طوال العام الدراسي، نقوم بإعداد هذه التقارير لطلاب BBA، وتذكير العائلات بالمواعيد النهائية الهامة، وتقديم التوجيه بشأن تقديم هذه التقارير الفصلية. هدفنا هو جعل عملية إعداد التقارير بسيطة وخالية من التوتر قدر الإمكان.'
            : 'Throughout the school year, we prepare these reports for BBA students, remind families of important deadlines, and provide guidance on submitting these Quarterly Reports. Our goal is to make the reporting process as simple and stress-free as possible.'
        },
        {
          id: 4,
          title: isAr ? 'الخطوة 4 — التقييم السنوي' : 'Step 4 — Annual Assessment',
          content: isAr
            ? 'في نهاية كل عام دراسي، يكمل الطلاب تقييماً سنوياً كما هو مطلوب بموجب لوائح التعليم المنزلي في نيويورك. اعتماداً على المستوى الدراسي للطالب والظروف الفردية، قد يتضمن ذلك تقييماً موحداً أو طريقة تقييم أخرى مسموح بها بموجب لوائح نيويورك. يخدم التقييم السنوي كخطوة نهائية في توثيق تقدم الطالب للعام الأكاديمي.'
            : 'At the conclusion of each school year, students complete an Annual Assessment as required by New York homeschool regulations. Depending on the student\'s grade level and individual circumstances, this may involve a standardized assessment or another evaluation method permitted under New York regulations. The Annual Assessment serves as the final step in documenting the student\'s progress for the academic year.',
          bba: isAr
            ? 'في نهاية العام الدراسي، نساعد عائلات BBA في فهم متطلبات التقييم السنوي ونساعدهم في إعداد الوثائق اللازمة بناءً على لوائح ولاية نيويورك.'
            : 'At the end of the school year, we assist BBA families in understanding the Annual Assessment requirements and help them prepare the necessary documentation based on New York State regulations.'
        }
      ]
    },
    college: {
      title: isAr ? 'المسارات الجامعية لطلاب التعليم المنزلي في نيويورك' : 'College Pathways for New York Homeschool Students',
      subtitle: isAr ? 'الاستعداد للجامعة يبدأ قبل التخرج بوقت طويل' : 'Preparing for College Starts Long Before Graduation',
      q: isAr ? 'هل سيتمكن طفلي من دخول الجامعة بعد التعليم المنزلي؟' : '"Will my child be able to attend college after homeschooling?"',
      a: isAr ? 'الإجابة هي نعم.' : 'The answer is YES.',
      desc: isAr
        ? 'في كل عام، يواصل خريجو التعليم المنزلي في نيويورك تعليمهم في كليات المجتمع والكليات والجامعات في جميع أنحاء نيويورك والولايات المتحدة. ومع ذلك، تختلف شروط القبول حسب المؤسسة، مما يجعل التخطيط المبكر أحد أهم أجزاء التجربة الثانوية الناجحة. يجب على العائلات الاحتفاظ بسجلات أكاديمية منظمة طوال المرحلة الثانوية، بما في ذلك كشوف الدرجات والدرجات والدورات الدراسية والحضور وأي وثائق متعلقة ببرنامج التعليم المنزلي الخاص بهم. يمكن أن تلعب هذه السجلات دوراً مهماً خلال عملية القبول في الجامعة.'
        : 'Every year, New York homeschool graduates continue their education at community colleges, colleges, and universities throughout New York and across the United States. However, admission requirements vary by institution, making early planning one of the most important parts of a successful high school experience. Families should maintain organized academic records throughout high school, including transcripts, coursework, grades, attendance records, and any documentation related to their homeschool program. These records can play an important role during the college admissions process.',
      howBbaHelps: isAr 
        ? 'تتلقى العائلات المسجلة في أكاديمية بنين وبنات توجيهاً شخصياً طوال سنوات المرحلة الثانوية. نحن نعمل عن كثب مع أولياء الأمور لمساعدة الطلاب على البقاء على المسار الصحيح أكاديمياً، وإعداد السجلات التعليمية، وفهم مسارات التخرج، والتخطيط للجامعة بثقة بعد التعليم المنزلي.'
        : 'Families enrolled with Baneen and Banaat Academy receive personalized guidance throughout the high school years. We work closely with parents to help students stay on track academically, prepare educational records, understand graduation pathways, and confidently plan for college after homeschooling.',
      footer: isAr ? 'التخطيط المسبق يمنح الطلاب المزيد من الفرص ومفاجآت أقل أثناء عملية القبول في الجامعة.' : 'Planning ahead gives students more opportunities and fewer surprises during the college admissions process.'
    },
    mistakes: {
      title: isAr ? 'أخطاء شائعة يجب على عائلات التعليم المنزلي في نيويورك تجنبها' : 'Common Mistakes New York Homeschool Families Should Avoid',
      subtitle: isAr ? 'الأخطاء الصغيرة اليوم يمكن أن تخلق تحديات أكبر غداً.' : 'Small Mistakes Today Can Create Bigger Challenges Tomorrow.',
      desc: isAr
        ? 'تتمتع نيويورك بواحد من أكثر أنظمة التعليم المنزلي تنظيماً في البلاد. يساعد البقاء منظماً طوال العام الدراسي العائلات على تجنب التوتر غير الضروري ويبقي الطلاب يتحركون بثقة نحو التخرج.'
        : 'New York has one of the most structured homeschool systems in the country. Staying organized throughout the school year helps families avoid unnecessary stress and keeps students moving confidently toward graduation.',
      items: [
        isAr ? 'الانتظار حتى اللحظة الأخيرة لتقديم وثائق التعليم المنزلي المطلوبة.' : 'Waiting until the last minute to submit required homeschool documents.',
        isAr ? 'نسيان الاحتفاظ بنسخ من السجلات الهامة مثل IHIPs والتقارير الفصلية والتقييمات السنوية وكشوف الدرجات.' : 'Forgetting to keep copies of important records such as IHIPs, Quarterly Reports, Annual Assessments, and transcripts.',
        isAr ? 'الانتظار حتى السنة الأخيرة لبدء التفكير في التخرج أو التخطيط للجامعة.' : 'Waiting until senior year to begin thinking about graduation or college planning.',
        isAr ? 'افتراض أن كل كلية في نيويورك تتطلب نفس وثائق القبول.' : 'Assuming every college in New York requires the same admission documents.',
        isAr ? 'تجاوز المواعيد النهائية الهامة التي حددتها منطقتك التعليمية المحلية.' : 'Missing important deadlines established by your local school district.'
      ],
      tipTitle: isAr ? 'نصيحة BBA' : 'BBA Tip',
      tipContent: isAr
        ? 'أنشئ مجلداً مخصصاً للتعليم المنزلي، رقمياً أو ورقياً أو كليهما، لتخزين كل وثيقة مهمة من سنة إلى أخرى. مسك السجلات الجيد يجعل التخرج والانتقال وطلبات الجامعات أسهل بكثير.'
        : 'Create a dedicated homeschool folder, digital, physical, or both, to store every important document from year to year. Good recordkeeping makes graduation, transfers, and college applications significantly easier.'
    },
    support: {
      title: isAr ? 'كيف تدعم BBA عائلات التعليم المنزلي في نيويورك' : 'How BBA Supports New York Homeschool Families',
      intro: isAr 
        ? 'يمكن أن يكون فهم لوائح التعليم المنزلي في نيويورك أمراً مرهقاً، خاصة للعائلات التي تتنقل في العملية لأول مرة. في أكاديمية بنين وبنات، نؤمن بأن أولياء الأمور لا ينبغي أن يضطروا أبداً إلى اكتشاف كل شيء بمفردهم.'
        : 'Understanding New York\'s homeschool regulations can feel overwhelming, especially for families navigating the process for the first time. At Baneen and Banaat Academy, we believe parents should never have to figure everything out on their own.',
      responsibility: isAr 
        ? 'بينما يظل أولياء الأمور مسؤولين عن الامتثال للوائح التعليم المنزلي في ولاية نيويورك، يقدم فريقنا إرشادات مستمرة طوال العام الدراسي لمساعدة العائلات على فهم العملية والبقاء على المسار الصحيح.'
        : 'While parents remain responsible for complying with New York State homeschool regulations, our team provides ongoing guidance throughout the school year to help families understand the process and stay on track.',
      listTitle: isAr ? 'عندما تسجل مع BBA، نساعدك في:' : 'When you enroll with BBA, we help you with:',
      items: [
        isAr ? 'فهم متطلبات التعليم المنزلي في نيويورك.' : 'Understanding New York homeschool requirements.',
        isAr ? 'توجيه بشأن خطاب النوايا (LOI).' : 'Guidance with the Notice of Intent (LOI).',
        isAr ? 'المساعدة في فهم خطة التعليم المنزلي الفردية (IHIP).' : 'Assistance understanding the Individualized Home Instruction Plan (IHIP).',
        isAr ? 'توجيه بشأن التقارير الفصلية.' : 'Quarterly Report guidance.',
        isAr ? 'توجيه بشأن التقييم السنوي.' : 'Annual Assessment guidance.',
        isAr ? 'التخطيط للمرحلة الثانوية.' : 'High school planning.',
        isAr ? 'التخطيط للتخرج.' : 'Graduation planning.',
        isAr ? 'توجيه بشأن كشوف الدرجات.' : 'Transcript guidance.',
        isAr ? 'التخطيط التعليمي بناءً على أهداف طالبك.' : 'Educational planning based on your student\'s goals.',
        isAr ? 'دعم شخصي كلما ظهرت أسئلة.' : 'Personalized support whenever questions arise.'
      ],
      footer: isAr 
        ? 'هدفنا ليس ببساطة تقديم البرامج التعليمية. نحن نسعى جاهدين لنصبح شريكاً تعليمياً موثوقاً لعائلات التعليم المنزلي في نيويورك من خلال توفير التوجيه والتشجيع والدعم في كل مرحلة من مراحل رحلة التعليم المنزلي.'
        : 'Our goal is not simply to provide educational programs. We strive to become a trusted educational partner for New York homeschool families by providing guidance, encouragement, and support throughout every stage of the homeschooling journey.'
    },
    closing: {
      title: isAr ? 'لديك أسئلة؟' : 'Have Questions?',
      subtitle: isAr ? 'اتصل بنا اليوم — نود أن نسمع منك.' : 'Contact us today—we\'d love to hear from you.',
      text1: isAr ? 'رحلة كل عائلة في التعليم المنزلي فريدة من نوعها.' : "Every family's homeschooling journey is unique.",
      text2: isAr ? 'سواء كنت قد بدأت للتو أو كنت تبحث عن توجيه بشأن متطلبات التعليم المنزلي في نيويورك، فنحن هنا للمساعدة.' : "Whether you're just getting started or you're looking for guidance with New York's homeschool requirements, we're here to help.",
      text3: isAr ? 'سيشرفنا الإجابة على أسئلتك، ومناقشة أهداف عائلتك التعليمية، وإظهار كيف يمكن لأكاديمية بنين وبنات دعم رحلتك في التعليم المنزلي.' : "We'd be honored to answer your questions, discuss your family's educational goals, and show you how Baneen and Banaat Academy can support your homeschooling journey.",
      btn: isAr ? 'تواصل مع BBA' : 'Contact BBA'
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-ny" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-ny)" />
          </svg>
        </div>
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-sm sm:text-xl text-white/80 font-bold max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="pt-8">
            <Button asChild size="lg" className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-xl h-14 px-10 shadow-xl transition-all">
              <Link href="#homeschooling-in-ny">{t.hero.btn}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Content Starts Here */}
      <div className="container-tight -mt-10 relative z-20 px-4">
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* Section 1: Intro */}
          <section id="homeschooling-in-ny" className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-100 shadow-premium space-y-8 scroll-mt-24">
             <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                <div className="h-14 w-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                   <MapPin className="h-8 w-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase">{t.introSection.title}</h2>
             </div>
             <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-sm sm:text-lg">
                <p className="text-primary font-black text-xl italic">{t.introSection.subtitle}</p>
                <p>{t.introSection.content1}</p>
                <p>{t.introSection.content2}</p>
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-secondary italic font-bold text-primary">
                  {t.introSection.footer}
                </div>
             </div>
          </section>

          {/* Section 2: The Process (4 Steps) */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-4xl font-black text-primary uppercase tracking-tight">{t.process.title}</h2>
              <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
              <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-slate-600 font-medium text-sm sm:text-lg">{t.process.desc}</p>
                <p className="text-secondary font-black uppercase text-xs tracking-widest">{t.process.overview}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-12">
              {t.process.steps.map((step) => (
                <div key={step.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                   <div className="flex flex-col md:flex-row items-stretch">
                      <div className="md:w-20 bg-primary text-white flex items-center justify-center font-black text-3xl p-6 md:p-0 shrink-0">
                         {step.id}
                      </div>
                      <div className="flex-1 p-8 sm:p-12 space-y-6">
                         <h3 className="text-xl sm:text-2xl font-black text-primary uppercase">{step.title}</h3>
                         <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">{step.content}</p>
                         
                         <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 space-y-4">
                            <div className="flex items-center gap-3">
                               <ShieldCheck className="h-6 w-6 text-secondary" />
                               <span className="font-black text-secondary uppercase tracking-widest text-sm">{t.process.howBbaHelps}</span>
                            </div>
                            <p className="text-slate-700 font-bold text-sm sm:text-base italic leading-relaxed">{step.bba}</p>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: College Pathways */}
          <section className="bg-slate-900 text-white rounded-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
               <GraduationCap className="h-64 w-64" />
            </div>
            <div className="p-8 sm:p-16 space-y-10 relative z-10">
               <div className="space-y-4 text-center sm:text-start">
                  <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">{t.college.title}</h2>
                  <p className="text-secondary font-black italic text-sm sm:text-xl">{t.college.subtitle}</p>
                  <div className="h-1 w-16 bg-secondary rounded-full mx-auto sm:mx-0" />
               </div>

               <div className="space-y-8">
                  <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-4">
                    <p className="text-lg sm:text-2xl font-black text-white leading-tight italic">{t.college.q}</p>
                    <p className="text-2xl sm:text-4xl font-black text-secondary">{t.college.a}</p>
                  </div>
                  
                  <p className="text-white/80 font-medium text-sm sm:text-lg leading-relaxed">{t.college.desc}</p>
                  
                  <div className="bg-white p-8 rounded-2xl border-l-8 border-secondary space-y-4 shadow-2xl">
                     <div className="flex items-center gap-3">
                        <Target className="h-6 w-6 text-primary" />
                        <span className="font-black text-primary uppercase tracking-widest text-sm">{t.process.howBbaHelps}</span>
                     </div>
                     <p className="text-slate-700 font-bold text-sm sm:text-base leading-relaxed">{t.college.howBbaHelps}</p>
                  </div>

                  <p className="text-center text-secondary font-black italic text-sm sm:text-lg border-t border-white/10 pt-8">
                    {t.college.footer}
                  </p>
               </div>
            </div>
          </section>

          {/* Section 4: Common Mistakes */}
          <section className="space-y-10">
             <div className="text-center space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase flex items-center justify-center gap-4">
                   <XCircle className="h-8 w-8 text-red-500" />
                   {t.mistakes.title}
                </h2>
                <p className="text-red-500 font-black italic">{t.mistakes.subtitle}</p>
                <div className="h-1 w-16 bg-red-100 mx-auto rounded-full" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="space-y-4">
                   {t.mistakes.items.map((item, idx) => (
                     <div key={idx} className="flex items-start gap-4 p-5 bg-red-50 rounded-2xl border border-red-100 transition-all hover:scale-[1.02]">
                        <AlertTriangle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base font-bold text-slate-700 leading-snug">{item}</span>
                     </div>
                   ))}
                </div>
                
                <div className="bg-amber-50 p-8 sm:p-12 rounded-2xl border-2 border-amber-200 flex flex-col justify-center gap-6 relative overflow-hidden group">
                   <div className="absolute -top-4 -right-4 h-24 w-24 bg-amber-200/20 blur-2xl rounded-full" />
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                         <Lightbulb className="h-6 w-6" />
                      </div>
                      <h3 className="font-black text-amber-900 uppercase tracking-widest">{t.mistakes.tipTitle}</h3>
                   </div>
                   <p className="text-sm sm:text-lg font-black text-amber-900 italic leading-relaxed">
                      {t.mistakes.tipContent}
                   </p>
                </div>
             </div>
          </section>

          {/* Section 5: How BBA Supports */}
          <section className="bg-slate-50 p-8 sm:p-16 rounded-2xl border border-slate-200 space-y-12 shadow-inner">
             <div className="space-y-6 text-center">
                <h2 className="text-2xl sm:text-4xl font-black text-primary uppercase tracking-tight">{t.support.title}</h2>
                <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
             </div>
             
             <div className="space-y-8 max-w-3xl mx-auto">
                <p className="text-slate-600 font-medium text-sm sm:text-lg leading-relaxed text-center italic">{t.support.intro}</p>
                <div className="bg-primary text-white p-6 rounded-xl text-center text-xs sm:text-sm font-bold opacity-90 leading-relaxed">
                   {t.support.responsibility}
                </div>
                
                <div className="space-y-6">
                   <h3 className="text-lg sm:text-xl font-black text-primary uppercase text-center border-b border-slate-200 pb-4">{t.support.listTitle}</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-12 sm:gap-y-6">
                      {t.support.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group">
                           <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
                              <CheckCircle2 className="h-4 w-4 text-secondary group-hover:text-white" />
                           </div>
                           <span className="text-xs sm:text-base font-bold text-slate-700 opacity-90 group-hover:text-primary transition-colors">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <p className="text-center text-slate-500 font-bold text-xs sm:text-base border-t border-slate-200 pt-8 leading-relaxed">
                  {t.support.footer}
                </p>
             </div>
          </section>

          {/* Final Section: Have Questions? */}
          <section className="text-center space-y-10 bg-white p-8 sm:p-16 rounded-2xl border border-slate-100 shadow-premium relative overflow-hidden group">
             <div className="absolute top-0 left-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                <HelpCircle className="h-48 w-48" />
             </div>
             <div className="space-y-4 relative z-10">
                <h2 className="text-3xl sm:text-5xl font-black text-primary uppercase tracking-tighter">{t.closing.title}</h2>
                <p className="text-lg sm:text-2xl font-black text-secondary italic">{t.closing.subtitle}</p>
                <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
             </div>
             
             <div className="space-y-6 max-w-2xl mx-auto relative z-10">
                <p className="text-slate-500 font-bold text-sm sm:text-lg leading-relaxed">{t.closing.text1}</p>
                <p className="text-slate-500 font-bold text-sm sm:text-lg leading-relaxed">{t.closing.text2}</p>
                <p className="text-primary font-black text-sm sm:text-lg leading-relaxed border-x-4 border-secondary px-8">{t.closing.text3}</p>
             </div>

             <div className="pt-8 relative z-10">
                <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white font-black rounded-xl h-16 px-12 shadow-xl shadow-secondary/20 transition-all active:scale-95 group/btn">
                  <Link href={`/${lang}/contact`} className="flex items-center gap-3 text-lg">
                    {t.closing.btn}
                    {isAr ? <ArrowLeft className="h-6 w-6 group-hover/btn:-translate-x-2 transition-transform" /> : <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-2 transition-transform" />}
                  </Link>
                </Button>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}