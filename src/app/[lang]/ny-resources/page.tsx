
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
      title: isAr ? 'مركز موارد التعليم المنزلي في نيويورك' : 'New York Homeschool Resource Center',
      subtitle: isAr ? 'كل ما تحتاج لمعرفته حول التعليم المنزلي في نيويورك.' : 'Everything You Need to Know About Homeschooling in New York.',
      desc: isAr 
        ? 'تتمتع نيويورك ببعض من أكثر لوائح التعليم المنزلي تفصيلاً في الولايات المتحدة. وبينما قد تبدو العملية مرهقة، فإن فهم المتطلبات يصبح أسهل بكثير مع التوجيه الصحيح.'
        : 'New York has some of the most detailed homeschool regulations in the United States. While the process may seem overwhelming, understanding the requirements becomes much easier with the right guidance.',
      cta: isAr ? 'تعرف على المزيد' : 'Learn More'
    },
    intro: {
      title: isAr ? 'التعليم المنزلي في نيويورك' : 'Homeschooling in New York',
      supporting: isAr ? 'مساعدة العائلات على التنقل في متطلبات التعليم المنزلي بنيويورك بثقة.' : "Helping families navigate New York's homeschool requirements with confidence.",
      content1: isAr
        ? 'تمتلك نيويورك بعضاً من أكثر لوائح التعليم المنزلي شمولاً في الولايات المتحدة. وبينما قد تبدو العملية مرهقة في البداية، فإن فهم المتطلبات يصبح أسهل بكثير مع التوجيه الصحيح.'
        : "New York has some of the most comprehensive homeschool regulations in the United States. While the process may seem overwhelming at first, understanding the requirements becomes much easier with the right guidance.",
      content2: isAr
        ? 'في أكاديمية بنين وبنات (BBA)، قضينا سنوات في دعم عائلات التعليم المنزلي في نيويورك ومساعدة الآباء على فهم متطلبات الولاية. تم إنشاء مركز الموارد هذا لتوفير معلومات واضحة وموثوقة وتوجيهات عملية طوال رحلة التعليم المنزلي الخاصة بك.'
        : "At Baneen and Banaat Academy (BBA), we have spent years supporting homeschool families in New York and helping parents understand state requirements. This resource center was created to provide clear, reliable information and practical guidance throughout your homeschooling journey.",
      content3: isAr
        ? 'سواء كنت بدأت للتو أو كنت تقوم بالفعل بالتعليم المنزلي لطفلك، فنحن هنا للمساعدة.'
        : "Whether you're just getting started or already homeschooling your child, we're here to help."
    },
    process: {
      title: isAr ? 'عملية التعليم المنزلي في نيويورك' : 'The Homeschool Process in New York',
      intro: isAr 
        ? 'يتبع التعليم المنزلي في نيويورك عملية منظمة مصممة لمساعدة العائلات على توفير تجربة تعليمية منظمة مع تلبية متطلبات الولاية. على الرغم من أن العملية قد تبدو مفصلة في البداية، إلا أنها تصبح أكثر قابلية للإدارة عند تقسيمها إلى خطوات واضحة.'
        : "Homeschooling in New York follows a structured process designed to help families provide an organized educational experience while meeting state requirements. Although the process may seem detailed at first, it becomes much more manageable when broken down into clear steps.",
      subtitle: isAr ? 'فيما يلي نظرة عامة على المتطلبات الأربعة الأساسية التي تكملها معظم عائلات التعليم المنزلي في كل عام دراسي.' : "Below is an overview of the four primary requirements most homeschool families complete each school year.",
      bbaSupport: isAr ? 'كيف تساعد BBA' : 'How BBA Helps',
      steps: [
        {
          id: 1,
          title: isAr ? 'الخطوة 1 - خطاب النوايا (LOI)' : 'Step 1 — Notice of Intent (LOI)',
          desc: isAr 
            ? 'تبدأ رحلة التعليم المنزلي بخطاب النوايا (LOI). هذا خطاب بسيط لإعلام منطقتك التعليمية المحلية بأنك تنوي تعليم طفلك منزلياً للعام الدراسي القادم. إنه يخطر المنطقة رسمياً بأن طفلك سيتم تعليمه من خلال برنامج تعليم منزلي بدلاً من حضور المدرسة العامة.'
            : "The homeschooling journey begins with the Notice of Intent (LOI). This is a simple letter informing your local school district that you intend to homeschool your child for the upcoming school year. It officially notifies the district that your child will be educated through a home instruction program rather than attending public school.",
          extra: isAr
            ? 'بالنسبة للعائلات التي تبدأ التعليم المنزلي خلال العام الدراسي، يتم تقديم خطاب النوايا بشكل عام في غضون الإطار الزمني المطلوب بعد إنشاء برنامج التعليم المنزلي.'
            : "For families beginning homeschooling during the school year, the Notice of Intent is generally submitted within the required timeframe after establishing the homeschool program.",
          bba: isAr
            ? 'إذا كانت عائلتك مسجلة في أكاديمية بنين وبنات، فلن تضطر إلى التنقل في هذه العملية بمفردك. يقدم فريقنا إرشادات خطوة بخطوة، مما يساعدك على فهم متى يجب تقديم خطاب النوايا والإجابة على أي أسئلة قد تكون لديك طوال العملية.'
            : "If your family is enrolled with Baneen and Banaat Academy, you won't have to navigate this process alone. Our team provides step-by-step guidance, helping you understand when the Notice of Intent should be submitted and answering any questions you may have throughout the process."
        },
        {
          id: 2,
          title: isAr ? 'الخطوة 2 - خطة التعليم المنزلي الفردية (IHIP)' : 'Step 2 — Individualized Home Instruction Plan (IHIP)',
          desc: isAr 
            ? 'بعد تقديم خطاب النوايا، يقوم الآباء بإعداد خطة تعليم منزلي فردية. توضح IHIP الخطة التعليمية للعام الدراسي، بما في ذلك المواد التي سيتم تدريسها وفقاً للوائح التعليم المنزلي في نيويورك.'
            : "After submitting the LOI, parents prepare an Individualized Home Instruction Plan. The IHIP outlines the educational plan for the school year, including the subjects that will be taught in accordance with New York's homeschool regulations.",
          extra: isAr
            ? 'بدلاً من العمل كمنهج دراسي جامد، توفر IHIP للمنطقة التعليمية نظرة عامة عامة على التدريس المخطط لطالبك وتوضح أنه سيتم تغطية المواد المطلوبة طوال العام.'
            : "Rather than serving as a rigid curriculum, the IHIP provides the school district with a general overview of your student's planned instruction and demonstrates that the required subjects will be covered throughout the year.",
          bba: isAr
            ? 'نحن نساعد العائلات المسجلة في BBA على فهم المتطلبات التعليمية لنيويورك ونقدم التوجيه أثناء إعداد خطة التعليم المنزلي الفردية (IHIP)، مما يضمن شعور الوالدين بالثقة طوال العملية.'
            : "We help families enrolled with BBA understand New York's educational requirements and provide guidance while preparing the Individualized Home Instruction Plan (IHIP), ensuring parents feel confident throughout the process."
        },
        {
          id: 3,
          title: isAr ? 'الخطوة 3 - التقارير الفصلية' : 'Step 3 — Quarterly Reports',
          desc: isAr 
            ? 'طوال العام الدراسي، يقدم الآباء تقارير فصلية توثق التقدم التعليمي لطلابهم. توفر هذه التقارير ملخصاً للتعليم المكتمل خلال كل ربع سنة، بما في ذلك الحضور والتقدم الأكاديمي والمواد التي تمت تغطيتها.'
            : "Throughout the school year, parents submit Quarterly Reports documenting their student's educational progress. These reports provide a summary of the instruction completed during each quarter, including attendance, academic progress, and the subjects covered.",
          extra: isAr
            ? 'تساعد التقارير الفصلية في إثبات أن البرنامج التعليمي للطالب يتقدم كما هو مخطط له.'
            : "Quarterly Reports help demonstrate that the student's educational program is progressing as planned.",
          bba: isAr
            ? 'طوال العام الدراسي، نقوم بإعداد هذه التقارير لطلاب BBA، ونذكر العائلات بالمواعيد النهائية الهامة، ونقدم التوجيه بشأن تقديم هذه التقارير الفصلية. هدفنا هو جعل عملية إعداد التقارير بسيطة وخالية من الإجهاد قدر الإمكان.'
            : "Throughout the school year, we prepare these reports for BBA students, remind families of important deadlines, and provide guidance on submitting these Quarterly Reports. Our goal is to make the reporting process as simple and stress-free as possible."
        },
        {
          id: 4,
          title: isAr ? 'الخطوة 4 - التقييم السنوي' : 'Step 4 — Annual Assessment',
          desc: isAr 
            ? 'في ختام كل عام دراسي، يكمل الطلاب تقييماً سنوياً كما هو مطلوب بموجب لوائح التعليم المنزلي في نيويورك. اعتماداً على مستوى صف الطالب وظروفه الفردية، قد يتضمن ذلك تقييماً موحداً أو طريقة تقييم أخرى مسموح بها بموجب لوائح نيويورك.'
            : "At the conclusion of each school year, students complete an Annual Assessment as required by New York homeschool regulations. Depending on the student's grade level and individual circumstances, this may involve a standardized assessment or another evaluation method permitted under New York regulations.",
          extra: isAr
            ? 'يعمل التقييم السنوي كخطوة نهائية في توثيق تقدم الطالب للعام الدراسي.'
            : "The Annual Assessment serves as the final step in documenting the student's progress for the academic year.",
          bba: isAr
            ? 'في نهاية العام الدراسي، نساعد عائلات BBA في فهم متطلبات التقييم السنوي ونساعدهم في إعداد الوثائق اللازمة بناءً على لوائح ولاية نيويورك.'
            : "At the end of the school year, we assist BBA families in understanding the Annual Assessment requirements and help them prepare the necessary documentation based on New York State regulations."
        }
      ]
    },
    college: {
      title: isAr ? 'المسارات الجامعية لطلاب التعليم المنزلي في نيويورك' : 'College Pathways for New York Homeschool Students',
      supporting: isAr ? 'الاستعداد للجامعة يبدأ قبل وقت طويل من التخرج' : 'Preparing for College Starts Long Before Graduation',
      question: isAr ? '"هل سيتمكن طفلي من الالتحاق بالجامعة بعد التعليم المنزلي؟"' : '"Will my child be able to attend college after homeschooling?"',
      answer: isAr ? 'الإجابة هي نعم.' : 'The answer is YES.',
      p1: isAr 
        ? 'في كل عام، يواصل خريجو التعليم المنزلي في نيويورك تعليمهم في كليات المجتمع والكليات والجامعات في جميع أنحاء نيويورك والولايات المتحدة. ومع ذلك، تختلف متطلبات القبول حسب المؤسسة، مما يجعل التخطيط المبكر أحد أهم أجزاء التجربة الثانوية الناجحة.'
        : "Every year, New York homeschool graduates continue their education at community colleges, colleges, and universities throughout New York and across the United States. However, admission requirements vary by institution, making early planning one of the most important parts of a successful high school experience.",
      p2: isAr
        ? 'يجب على العائلات الاحتفاظ بسجلات أكاديمية منظمة طوال المرحلة الثانوية، بما في ذلك كشوف الدرجات، والدورات الدراسية، والدرجات، وسجلات الحضور، وأي وثائق متعلقة ببرنامج التعليم المنزلي الخاص بهم. يمكن أن تلعب هذه السجلات دوراً هاماً خلال عملية القبول في الجامعة.'
        : "Families should maintain organized academic records throughout high school, including transcripts, coursework, grades, attendance records, and any documentation related to their homeschool program. These records can play an important role during the college admissions process.",
      checklistTitle: isAr ? 'أهمية الاحتفاظ بـ:' : 'Importance of Maintaining:',
      checklist: [
        { en: 'Transcripts', ar: 'كشوف الدرجات' },
        { en: 'Coursework', ar: 'الدورات الدراسية' },
        { en: 'Grades', ar: 'الدرجات' },
        { en: 'Attendance records', ar: 'سجلات الحضور' },
        { en: 'Homeschool documentation', ar: 'وثائق التعليم المنزلي' }
      ],
      bba: isAr
        ? 'تتلقى العائلات المسجلة في أكاديمية بنين وبنات توجيهاً شخصياً طوال سنوات المرحلة الثانوية. نحن نعمل عن كثب مع أولياء الأمور لمساعدة الطلاب على البقاء في المسار الصحيح أكاديمياً، وإعداد السجلات التعليمية، وفهم مسارات التخرج، والتخطيط للجامعة بثقة بعد التعليم المنزلي.'
        : "Families enrolled with Baneen and Banaat Academy receive personalized guidance throughout the high school years. We work closely with parents to help students stay on track academically, prepare educational records, understand graduation pathways, and confidently plan for college after homeschooling.",
      closing: isAr ? 'التخطيط المسبق يمنح الطلاب المزيد من الفرص ومفاجآت أقل خلال عملية القبول في الجامعة.' : 'Planning ahead gives students more opportunities and fewer surprises during the college admissions process.'
    },
    mistakes: {
      title: isAr ? 'أخطاء شائعة يجب على عائلات التعليم المنزلي في نيويورك تجنبها' : 'Common Mistakes New York Homeschool Families Should Avoid',
      supporting: isAr ? 'الأخطاء الصغيرة اليوم يمكن أن تخلق تحديات أكبر غداً.' : 'Small Mistakes Today Can Create Bigger Challenges Tomorrow.',
      intro: isAr ? 'تمتلك نيويورك واحداً من أكثر أنظمة التعليم المنزلي تنظيماً في البلاد. يساعد البقاء منظماً طوال العام الدراسي العائلات على تجنب الضغوط غير الضرورية ويبقي الطلاب يتحركون بثقة نحو التخرج.' : "New York has one of the most structured homeschool systems in the country. Staying organized throughout the school year helps families avoid unnecessary stress and keeps students moving confidently toward graduation.",
      list: [
        isAr ? 'الانتظار حتى اللحظة الأخيرة لتقديم مستندات التعليم المنزلي المطلوبة.' : 'Waiting until the last minute to submit required homeschool documents.',
        isAr ? 'نسيان الاحتفاظ بنسخ من السجلات المهمة مثل IHIPs، والتقارير الفصلية، والتقييمات السنوية، وكشوف الدرجات.' : 'Forgetting to keep copies of important records such as IHIPs, Quarterly Reports, Annual Assessments, and transcripts.',
        isAr ? 'الانتظار حتى السنة الأخيرة لبدء التفكير في التخرج أو التخطيط للجامعة.' : 'Waiting until senior year to begin thinking about graduation or college planning.',
        isAr ? 'افتراض أن كل كلية في نيويورك تتطلب نفس مستندات القبول.' : 'Assuming every college in New York requires the same admission documents.',
        isAr ? 'تويت المواعيد النهائية الهامة التي حددتها منطقتك التعليمية المحلية.' : 'Missing important deadlines established by your local school district.'
      ],
      tipTitle: isAr ? 'نصيحة BBA' : 'BBA Tip',
      tipContent: isAr 
        ? 'قم بإنشاء مجلد مخصص للتعليم المنزلي، رقمي أو ورقي أو كليهما، لتخزين كل وثيقة مهمة من سنة إلى أخرى. حفظ السجلات الجيد يجعل التخرج والتحويلات وطلبات الالتحاق بالجامعة أسهل بكثير.'
        : "Create a dedicated homeschool folder, digital, physical, or both, to store every important document from year to year. Good recordkeeping makes graduation, transfers, and college applications significantly easier."
    },
    support: {
      title: isAr ? 'كيف تدعم BBA عائلات التعليم المنزلي في نيويورك' : 'How BBA Supports New York Homeschool Families',
      intro: isAr 
        ? 'يمكن أن يكون فهم لوائح التعليم المنزلي في نيويورك أمراً مرهقاً، خاصة للعائلات التي تتنقل في العملية لأول مرة. في أكاديمية بنين وبنات، نؤمن بأن الآباء لا ينبغي أبداً أن يضطروا إلى اكتشاف كل شيء بأنفسهم.'
        : "Understanding New York's homeschool regulations can feel overwhelming, especially for families navigating the process for the first time. At Baneen and Banaat Academy, we believe parents should never have to figure everything out on their own.",
      responsibility: isAr 
        ? 'بينما يظل الآباء مسؤولين عن الامتثال للوائح التعليم المنزلي في ولاية نيويورك، يقدم فريقنا توجيهاً مستمراً طوال العام الدراسي لمساعدة العائلات على فهم العملية والبقاء في المسار الصحيح.'
        : "While parents remain responsible for complying with New York State homeschool regulations, our team provides ongoing guidance throughout the school year to help families understand the process and stay on track.",
      listIntro: isAr ? 'عندما تسجل في BBA، فإننا نساعدك في:' : 'When you enroll with BBA, we help you with:',
      items: [
        isAr ? 'فهم متطلبات التعليم المنزلي في نيويورك.' : 'Understanding New York homeschool requirements.',
        isAr ? 'التوجيه مع خطاب النوايا (LOI).' : 'Guidance with the Notice of Intent (LOI).',
        isAr ? 'المساعدة في فهم خطة التعليم المنزلي الفردية (IHIP).' : 'Assistance understanding the Individualized Home Instruction Plan (IHIP).',
        isAr ? 'توجيه التقارير الفصلية.' : 'Quarterly Report guidance.',
        isAr ? 'توجيه التقييم السنوي.' : 'Annual Assessment guidance.',
        isAr ? 'تخطيط المرحلة الثانوية.' : 'High school planning.',
        isAr ? 'تخطيط التخرج.' : 'Graduation planning.',
        isAr ? 'توجيه كشوف الدرجات.' : 'Transcript guidance.',
        isAr ? 'التخطيط التعليمي بناءً على أهداف طالبك.' : "Educational planning based on your student's goals.",
        isAr ? 'دعم شخصي كلما ظهرت أسئلة.' : 'Personalized support whenever questions arise.'
      ],
      closing: isAr 
        ? 'هدفنا ليس مجرد تقديم برامج تعليمية. نحن نسعى جاهدين لنصبح شريكاً تعليمياً موثوقاً لعائلات التعليم المنزلي في نيويورك من خلال توفير التوجيه والتشجيع والدعم في كل مرحلة من مراحل رحلة التعليم المنزلي.'
        : "Our goal is not simply to provide educational programs. We strive to become a trusted educational partner for New York homeschool families by providing guidance, encouragement, and support throughout every stage of the homeschooling journey."
    },
    footer: {
      title: isAr ? 'لديك أسئلة؟' : 'Have Questions?',
      supporting: isAr ? 'تواصل معنا اليوم — نود أن نسمع منك.' : 'Contact us today—we\'d love to hear from you.',
      p1: isAr ? 'رحلة التعليم المنزلي لكل عائلة فريدة من نوعها.' : "Every family's homeschooling journey is unique.",
      p2: isAr ? 'سواء كنت بدأت للتو أو كنت تبحث عن توجيه بشأن متطلبات التعليم المنزلي في نيويورك، فنحن هنا للمساعدة.' : "Whether you're just getting started or you're looking for guidance with New York's homeschool requirements, we're here to help.",
      p3: isAr ? 'سيشرفنا الإجابة على أسئلتك، ومناقشة الأهداف التعليمية لعائلتك، ومساعدتك في معرفة كيف يمكن لأكاديمية بنين وبنات دعم رحلة التعليم المنزلي الخاصة بك.' : "We'd be honored to answer your questions, discuss your family's educational goals, and show you how Baneen and Banaat Academy can support your homeschooling journey.",
      btn: isAr ? 'اتصل بـ BBA' : 'Contact BBA'
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; // Account for headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Section 1 — Improved Hero with Geometric Patterns */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Triangular Geometric Grid Pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ny-geo-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
                <path d="M 0 80 L 80 0" fill="none" stroke="white" strokeWidth="1" />
                <path d="M 40 0 L 40 80" fill="none" stroke="white" strokeWidth="0.5" />
                <path d="M 0 40 L 80 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ny-geo-pattern)" />
          </svg>
          
          {/* Layered Glow Gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/15 blur-[160px] rounded-full animate-pulse" />
          <div className="absolute top-0 right-0 w-[40%] h-full bg-accent/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        </div>

        <div className="container-tight relative z-10 text-center space-y-8 px-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[1] drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]">
              {t.hero.title}
            </h1>
            <h2 className="text-lg sm:text-3xl text-secondary font-black uppercase tracking-[0.2em] drop-shadow-md">
              {t.hero.subtitle}
            </h2>
          </div>
          <p className="text-sm sm:text-xl text-white/80 font-bold max-w-3xl mx-auto leading-relaxed italic border-l-4 border-secondary pl-6 sm:pl-10 inline-block text-start">
            {t.hero.desc}
          </p>
          <div className="pt-8">
            <Button 
              size="lg" 
              onClick={() => scrollTo('intro')}
              className="bg-secondary hover:bg-white hover:text-secondary text-white font-black h-16 px-12 rounded-2xl shadow-[0_20px_40px_rgba(var(--secondary),0.3)] transition-all scale-110 active:scale-95 border-2 border-transparent hover:border-secondary"
            >
              {t.hero.cta}
              {isAr ? <ArrowLeft className="mr-3 h-6 w-6" /> : <ArrowRight className="ml-3 h-6 w-6" />}
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <nav className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm hidden md:block">
        <div className="container-tight flex items-center justify-center gap-10 h-20">
          {Object.entries(t.nav).map(([key, label]) => (
            <button
              key={key}
              onClick={() => scrollTo(key === 'overview' ? 'intro' : key)}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all py-2 border-b-2 border-transparent hover:border-secondary relative group"
            >
              {label}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>
      </nav>

      {/* Section 2 — Homeschooling in New York (Intro) */}
      <section id="intro" className="py-24 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="intro-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                 <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#intro-dots)" />
           </svg>
        </div>

        <div className="container-tight px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-6xl font-black text-primary uppercase tracking-tight leading-tight">
                  {t.intro.title}
                </h2>
                <div className="h-2 w-24 bg-secondary rounded-full" />
                <p className="text-xl lg:text-2xl font-black text-secondary italic leading-snug">
                  {t.intro.supporting}
                </p>
              </div>
              <div className="space-y-8 text-slate-600 font-medium text-lg leading-relaxed">
                <p>{t.intro.content1}</p>
                <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2.5 h-full bg-secondary group-hover:w-full group-hover:opacity-5 transition-all duration-700" />
                  <p className="relative z-10 text-primary font-black text-xl leading-relaxed">
                    {t.intro.content2}
                  </p>
                </div>
                <p className="font-black text-primary text-xl flex items-center gap-4">
                   <Target className="h-6 w-6 text-secondary shrink-0" />
                   {t.intro.content3}
                </p>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-100 group">
               <Image 
                src="https://picsum.photos/seed/ny1/800/1000" 
                alt="New York Landscape" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                unoptimized
                data-ai-hint="new york building"
               />
               <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors" />
               <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                  <p className="text-xs font-black text-primary uppercase tracking-widest leading-relaxed">
                     {isAr ? 'ندعم رحلة طفلك التعليمية في قلب نيويورك' : 'Supporting your child\'s journey in the heart of NY'}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — The Homeschool Process in New York */}
      <section id="process" className="py-24 bg-slate-50 border-y border-slate-100 relative">
        <div className="container-tight px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-24">
            <h2 className="text-3xl lg:text-7xl font-black text-primary uppercase tracking-tight">
              {t.process.title}
            </h2>
            <p className="text-slate-600 font-bold text-lg lg:text-2xl leading-relaxed italic max-w-3xl mx-auto">
              {t.process.intro}
            </p>
            <div className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 inline-block shadow-sm">
               <p className="text-[10px] lg:text-xs font-black text-secondary uppercase tracking-[0.3em]">{t.process.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-16 relative">
             {/* Desktop visual connector line - enhanced */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent -translate-x-1/2" />
            
            {t.process.steps.map((step, idx) => (
              <div key={idx} className={cn(
                "relative flex flex-col lg:flex-row items-center gap-12 lg:gap-32 group",
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              )}>
                {/* Step Number Circle */}
                <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-20">
                   <div className="h-20 w-20 rounded-[2rem] bg-white border-4 border-secondary flex items-center justify-center font-black text-3xl text-primary shadow-2xl group-hover:bg-secondary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      {step.id}
                   </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 w-full">
                   <Card className="rounded-[3rem] border-none shadow-premium overflow-hidden bg-white hover:shadow-2xl transition-all duration-700 ring-1 ring-slate-100">
                      <CardHeader className="bg-primary p-10 text-white relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <Zap className="h-16 w-16" />
                         </div>
                         <CardTitle className="text-xl lg:text-3xl font-black uppercase tracking-tight relative z-10 drop-shadow-md">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 lg:p-12 space-y-10">
                         <div className="space-y-6">
                            <p className="text-slate-600 font-bold leading-relaxed text-sm lg:text-lg">
                              {step.desc}
                            </p>
                            <p className="text-slate-400 font-medium text-xs lg:text-sm italic leading-relaxed pl-6 border-l-2 border-slate-100">
                              {step.extra}
                            </p>
                         </div>
                         
                         <div className="bg-secondary/5 rounded-[2.5rem] p-8 lg:p-10 border border-secondary/10 space-y-6 shadow-inner relative overflow-hidden group/support">
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary/5 blur-3xl rounded-full" />
                            <div className="flex items-center gap-4 relative z-10">
                               <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-xl group-hover/support:rotate-12 transition-transform">
                                  <ShieldCheck className="h-6 w-6" />
                               </div>
                               <h4 className="font-black text-primary uppercase text-sm lg:text-lg tracking-widest">{t.process.bbaSupport}</h4>
                            </div>
                            <p className="text-slate-600 text-sm lg:text-base font-bold leading-relaxed border-l-4 border-secondary pl-6 py-2 relative z-10">
                               {step.bba}
                            </p>
                         </div>
                      </CardContent>
                   </Card>
                </div>
                
                {/* Empty side for layout on desktop */}
                <div className="hidden lg:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — College Pathways */}
      <section id="college" className="py-32 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="container-tight px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-7 space-y-12">
               <div className="space-y-6">
                  <h2 className="text-4xl lg:text-7xl font-black text-primary uppercase tracking-tight leading-tight">
                    {t.college.title}
                  </h2>
                  <p className="text-2xl lg:text-4xl font-black text-secondary italic drop-shadow-sm">
                    {t.college.supporting}
                  </p>
               </div>

               <div className="p-10 lg:p-16 bg-slate-900 text-white rounded-[4rem] shadow-2xl relative overflow-hidden space-y-8 group border-b-8 border-secondary">
                  <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                     <GraduationCap className="h-48 w-48" />
                  </div>
                  <h3 className="text-xl lg:text-4xl font-black italic relative z-10 leading-tight">{t.college.question}</h3>
                  <div className="h-2 w-24 bg-secondary rounded-full relative z-10" />
                  <p className="text-5xl lg:text-8xl font-black text-secondary uppercase relative z-10 drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]">{t.college.answer}</p>
               </div>

               <div className="space-y-8 text-slate-600 font-medium text-lg lg:text-xl leading-relaxed">
                  <p>{t.college.p1}</p>
                  <p className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic">{t.college.p2}</p>
               </div>

               <div className="bg-slate-50/50 p-10 lg:p-16 rounded-[4rem] border border-slate-100 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                     <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="checklist-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                           <path d="M 0 40 L 40 0" stroke="currentColor" strokeWidth="1" fill="none" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#checklist-pattern)" />
                     </svg>
                  </div>
                  <div className="flex items-center gap-6 mb-10 relative z-10">
                     <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl">
                        <Zap className="h-7 w-7" />
                     </div>
                     <h4 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-widest">{t.college.checklistTitle}</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {t.college.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-5 p-6 bg-white rounded-3xl shadow-premium border border-slate-100 hover:border-secondary/50 hover:shadow-2xl transition-all group">
                        <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors shadow-sm">
                           <CheckCircle2 className="h-5 w-5 shrink-0" />
                        </div>
                        <span className="font-black text-primary text-sm lg:text-lg">{lang === 'ar' ? item.ar : item.en}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-48">
               <Card className="rounded-[4rem] border-none shadow-2xl bg-primary text-white p-12 lg:p-16 relative overflow-hidden group ring-1 ring-white/10">
                  <div className="absolute -bottom-16 -right-16 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000">
                     <ShieldCheck className="h-80 w-80" />
                  </div>
                  <div className="relative z-10 space-y-10">
                     <div className="flex items-center gap-5">
                        <div className="h-16 w-16 rounded-3xl bg-secondary text-white flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
                           <LayoutDashboard className="h-8 w-8" />
                        </div>
                        <h4 className="text-2xl font-black uppercase tracking-[0.2em]">{isAr ? 'دعم الأكاديمية' : 'BBA Support'}</h4>
                     </div>
                     <p className="text-white/90 font-black leading-relaxed text-lg lg:text-2xl italic border-l-4 border-secondary pl-8 py-4">
                        {t.college.bba}
                     </p>
                  </div>
               </Card>

               <div className="bg-secondary/10 p-12 rounded-[3rem] border-2 border-dashed border-secondary/30 text-center space-y-6 hover:bg-secondary/15 transition-colors">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-xl flex items-center justify-center mx-auto mb-6">
                     <Lightbulb className="h-8 w-8 text-secondary animate-pulse" />
                  </div>
                  <p className="text-xl lg:text-3xl font-black text-primary leading-tight tracking-tight px-4">
                    {t.college.closing}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Common Mistakes */}
      <section id="mistakes" className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        {/* Geometric Background Triangles */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="mistake-geo" width="100" height="100" patternUnits="userSpaceOnUse">
                 <path d="M 0 100 L 100 0" stroke="currentColor" strokeWidth="1" fill="none" />
                 <path d="M 0 0 L 100 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#mistake-geo)" />
           </svg>
        </div>

        <div className="container-tight px-4 relative z-10">
          <div className="text-center space-y-8 mb-24 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-7xl font-black text-primary uppercase tracking-tight">
               {t.mistakes.title}
            </h2>
            <p className="text-2xl lg:text-4xl font-black text-secondary italic leading-tight">
               {t.mistakes.supporting}
            </p>
            <div className="h-1.5 w-32 bg-secondary mx-auto rounded-full" />
            <p className="text-slate-500 font-bold text-lg lg:text-2xl leading-relaxed max-w-3xl mx-auto opacity-80">
               {t.mistakes.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {t.mistakes.list.map((mistake, idx) => (
                <Card key={idx} className="rounded-[3rem] border-none shadow-premium hover:shadow-2xl transition-all duration-500 bg-white group flex flex-col h-full overflow-hidden hover:-translate-y-2 ring-1 ring-slate-100">
                   <div className="p-10 lg:p-12 space-y-8 flex-1">
                      <div className="h-16 w-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shadow-inner group-hover:bg-red-500 group-hover:text-white group-hover:rotate-12 transition-all duration-700 shrink-0">
                         <FileWarning className="h-8 w-8" />
                      </div>
                      <p className="text-slate-700 font-black text-base lg:text-xl leading-relaxed">
                         {mistake}
                      </p>
                   </div>
                </Card>
             ))}
             
             {/* BBA Tip Card spanning remaining columns */}
             <div className="md:col-span-2 lg:col-span-3 mt-10">
                <div className="bg-primary text-white p-10 lg:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12 group border-b-8 border-secondary">
                   <div className="absolute top-0 right-0 p-16 opacity-[0.05] group-hover:scale-125 group-hover:rotate-6 transition-transform duration-1000">
                      <Lightbulb className="h-96 w-96" />
                   </div>
                   <div className="h-24 w-24 rounded-[2rem] bg-secondary text-white flex items-center justify-center shadow-2xl shrink-0 group-hover:rotate-12 transition-all duration-500 ring-4 ring-white/10 relative z-10">
                      <ShieldCheck className="h-12 w-12" />
                   </div>
                   <div className="space-y-6 relative z-10 text-center md:text-start">
                      <h4 className="text-2xl lg:text-4xl font-black uppercase tracking-[0.2em] text-secondary drop-shadow-md">{t.mistakes.tipTitle}</h4>
                      <p className="text-lg lg:text-3xl font-bold leading-relaxed text-white opacity-95 italic max-w-4xl">
                         {t.mistakes.tipContent}
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Section 6 — How BBA Supports New York Families */}
      <section id="support" className="py-32 bg-white relative">
        <div className="container-tight px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
             <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-48">
                <h2 className="text-4xl lg:text-7xl font-black text-primary uppercase tracking-tight leading-none drop-shadow-sm">
                   {t.support.title}
                </h2>
                <div className="h-2.5 w-24 bg-secondary rounded-full" />
                <div className="space-y-8 text-slate-600 font-medium text-lg lg:text-xl leading-relaxed border-l-8 border-slate-50 pl-10 py-4">
                   <p>{t.support.intro}</p>
                   <p className="font-black text-primary italic text-xl lg:text-2xl drop-shadow-sm">{t.support.responsibility}</p>
                </div>
             </div>

             <div className="lg:col-span-7">
                <div className="bg-slate-50/50 p-10 lg:p-20 rounded-[4rem] border border-slate-100 shadow-inner space-y-12 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[120px] rounded-full" />
                   
                   <h3 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tight flex items-center gap-6 relative z-10">
                      <div className="h-14 w-14 rounded-2xl bg-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                         <CheckSquare className="h-8 w-8 text-secondary" />
                      </div>
                      {t.support.listIntro}
                   </h3>
                   
                   <div className="grid grid-cols-1 gap-5 relative z-10">
                      {t.support.items.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 group/item border border-slate-50 hover:border-secondary/20 hover:-translate-x-2">
                            <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center font-black text-sm group-hover/item:bg-secondary group-hover/item:text-white transition-all shadow-inner">
                               {idx + 1}
                            </div>
                            <span className="font-black text-primary text-base lg:text-xl leading-tight opacity-90 group-hover/item:opacity-100 transition-opacity">
                               {item}
                            </span>
                         </div>
                      ))}
                   </div>

                   <div className="pt-12 border-t border-slate-200 relative z-10">
                      <p className="text-slate-500 font-bold text-lg lg:text-2xl leading-relaxed italic text-center max-w-2xl mx-auto opacity-70">
                        {t.support.closing}
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Have Questions? */}
      <section id="contact" className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Sophisticated Glow Layers */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/15 blur-[200px] rounded-full animate-pulse" />
           <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-white/5 blur-[140px] rounded-full" />
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                 <pattern id="footer-tri" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 0 0 L 100 0 L 50 100 Z" fill="none" stroke="white" strokeWidth="0.5" />
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#footer-tri)" />
              </svg>
           </div>
        </div>

        <div className="container-tight relative z-10 px-4">
          <Card className="rounded-[4rem] border-none shadow-2xl bg-white p-12 lg:p-24 text-center space-y-12 max-w-5xl mx-auto group">
             <div className="space-y-6">
                <h2 className="text-4xl lg:text-8xl font-black text-primary uppercase tracking-tighter drop-shadow-sm group-hover:scale-105 transition-transform duration-700">{t.footer.title}</h2>
                <div className="h-2 w-32 bg-secondary mx-auto rounded-full shadow-[0_0_20px_rgba(var(--secondary),0.5)]" />
                <p className="text-xl lg:text-4xl font-black text-secondary italic tracking-tight">{t.footer.supporting}</p>
             </div>
             
             <div className="space-y-10 text-slate-600 font-bold text-lg lg:text-2xl leading-relaxed max-w-3xl mx-auto">
                <p className="text-primary font-black text-2xl lg:text-4xl leading-tight border-x-4 border-slate-100 px-8 py-2 inline-block">{t.footer.p1}</p>
                <p className="opacity-90">{t.footer.p2}</p>
                <p className="text-base lg:text-xl opacity-60 italic leading-relaxed border-t border-slate-50 pt-8">{t.footer.p3}</p>
             </div>

             <div className="pt-10">
                <Button asChild size="lg" className="h-20 px-16 text-xl lg:text-3xl font-black bg-secondary hover:bg-primary text-white rounded-3xl shadow-[0_30px_60px_rgba(var(--secondary),0.3)] transition-all scale-110 active:scale-95 border-4 border-transparent hover:border-secondary group-hover:shadow-[0_40px_80px_rgba(var(--secondary),0.4)]">
                   <Link href={`/${lang}/contact`}>
                      {t.footer.btn}
                      {isAr ? <ArrowLeft className="mr-5 h-8 w-8" /> : <ArrowRight className="ml-5 h-8 w-8" />}
                   </Link>
                </Button>
             </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
