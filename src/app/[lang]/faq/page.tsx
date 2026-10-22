'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  HelpCircle, 
  BookOpen, 
  GraduationCap, 
  Laptop, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  Info,
  FileSignature,
  Users,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Calendar,
  History,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

const getFaqData = (isAr: boolean) => [
  {
    category: isAr ? 'حول الأكاديمية' : 'About BBA',
    questions: [
      {
        q: isAr ? 'ما هي أكاديمية بنين وبنات (BBA)؟' : 'What is Baneen and Banaat Academy?',
        a: isAr 
          ? 'أكاديمية بنين وبنات (BBA) هي مجتمع تعليمي عبر الإنترنت مخصص لدعم الطلاب والعائلات من خلال التعلم الأكاديمي، التوجيه الشخصي، والقيم التعليمية القوية. تأسست في عام 2019، وتخدم العائلات في جميع أنحاء الولايات المتحدة وتعمل عن كثب مع الآباء لدعم الرحلة التعليمية لكل طالب.'
          : 'Baneen and Banaat Academy (BBA) is an online educational community dedicated to supporting students and families through academic learning, personalized guidance, and strong educational values. Founded in 2019, BBA serves families across the United States.',
        icon: Info
      },
      {
        q: isAr ? 'هل BBA أكاديمية تعمل بالكامل عبر الإنترنت؟' : 'Is BBA a fully online academy?',
        a: isAr 
          ? 'نعم. تقدم BBA برامج تعليمية عبر الإنترنت بنسبة 100%، مما يسمح للطلاب بالتعلم من المنزل أو أي مكان مناسب آخر مع اتصال إنترنت موثوق. لا تقدم BBA حالياً دروساً حضورية.'
          : 'Yes. BBA offers 100% online educational programs, allowing students to learn from home or another suitable location with a reliable internet connection. BBA does not currently offer in-person classes.',
        icon: Laptop
      },
      {
        q: isAr ? 'أين تخدم BBA طلابها؟' : 'Where does BBA serve students?',
        a: isAr 
          ? 'تخدم الأكاديمية العائلات في جميع أنحاء الولايات المتحدة. نحن فخورون بدعم الطلاب من مجتمعات متنوعة يبحثون عن تجربة تعليمية شخصية تعكس قيم أسرهم.'
          : 'The academy serves families nationwide across the United States. We proudly support students from diverse communities seeking a personalized educational experience.',
        icon: MapPin
      },
      {
        q: isAr ? 'ما الذي يميز BBA عن غيرها؟' : 'What makes BBA different?',
        a: isAr 
          ? 'نحن نؤمن بأن الطلاب لا ينبغي أبداً أن يختاروا بين التميز الأكاديمي والحفاظ على قيمهم. نجمع بين المناهج الأكاديمية القوية واللغة العربية والهوية الإسلامية في بيئة تعلم مرنة ومدعومة بالتوجيه الشخصي.'
          : 'We believe students should never have to choose between academic excellence and preserving their values. We combine strong academics with Arabic language and Islamic identity.',
        icon: Star
      }
    ]
  },
  {
    category: isAr ? 'البرامج التعليمية' : 'Programs',
    questions: [
      {
        q: isAr ? 'ما هي البرامج التعليمية التي تقدمها BBA؟' : 'What educational programs does BBA offer?',
        a: isAr 
          ? 'تقدم BBA حالياً ثلاثة برامج رئيسية: برنامج الصفوف 3-5 عن بعد، برنامج الصفوف 6-12 عن بعد، وبرنامج عطلة نهاية الأسبوع (عن بعد).'
          : 'BBA currently offers three main programs: Grades 3–5 Remote Program, Grades 6–12 Remote Program, and Weekend Program (Remote).',
        icon: BookOpen
      },
      {
        q: isAr ? 'ما هي المراحل الدراسية التي تخدمها BBA؟' : 'What grades does BBA serve?',
        a: isAr 
          ? 'نخدم الطلاب من الصف الثالث الابتدائي وحتى الصف الثاني عشر (المرحلة الثانوية)، بالإضافة إلى برامج الإثراء في عطلة نهاية الأسبوع.'
          : 'We serve students from Grade 3 through Grade 12 (High School), in addition to weekend enrichment programs.',
        icon: GraduationCap
      },
      {
        q: isAr ? 'كيف يعمل التعلم عبر الإنترنت؟' : 'How does online learning work?',
        a: isAr 
          ? 'بالنسبة للمسار الأكاديمي، يتم إكمال الدورات عبر منصة Edgenuity باتباع خطة طالب شخصية. يتلقى الطلاب مراقبة أسبوعية للتقدم ودعماً فردياً عند الحاجة لضمان بقائهم في المسار الصحيح.'
          : 'Coursework is completed online via the Edgenuity platform following a personalized plan. Students receive weekly monitoring and one-on-one support.',
        icon: Monitor
      }
    ]
  },
  {
    category: isAr ? 'القبول والرسوم' : 'Enrollment and Tuition',
    questions: [
      {
        q: isAr ? 'كيف يمكنني تسجيل طفلي؟' : 'How do I enroll my child?',
        a: isAr 
          ? 'يمكنك البدء بإكمال نموذج التسجيل عبر الإنترنت على موقعنا. سيقوم فريقنا بمراجعة طلبك والتواصل معك لإكمال الإجراءات.'
          : 'You can begin by completing our online enrollment form. Our team will review your application and contact you to finalize the process.',
        icon: FileSignature
      },
      {
        q: isAr ? 'هل يمكنني تسجيل أكثر من طفل؟' : 'Can I register more than one child?',
        a: isAr 
          ? 'نعم، يدعم نموذج التسجيل إضافة حتى 3 أشقاء في نفس الطلب لتسهيل العملية على العائلات.'
          : 'Yes, our enrollment form supports adding up to 3 siblings in the same application for convenience.',
        icon: Users
      },
      {
        q: isAr ? 'ما هي المستندات المطلوبة للتسجيل؟' : 'What documents are needed for enrollment?',
        a: isAr 
          ? 'المستندات الأساسية تشمل: آخر تقرير درجات للطالب، هوية الطالب، وهوية ولي الأمر.'
          : 'Required documents include: The student\'s last report card, student ID, and parent ID.',
        icon: CheckCircle2
      },
      {
        q: isAr ? 'أين يمكنني العثور على معلومات الرسوم وطرق الدفع؟' : 'Where can I find tuition and payment information?',
        a: isAr 
          ? 'تتوفر تفاصيل الرسوم ضمن صفحة البرامج، كما تظهر خيارات الدفع المتاحة بالتفصيل أثناء خطوات التسجيل الإلكتروني.'
          : 'Tuition details are available on the Programs page, and payment options are displayed during the enrollment process.',
        icon: CreditCard
      },
      {
        q: isAr ? 'هل يمكنني حفظ طلب التسجيل وإكماله لاحقاً؟' : 'Can I save my enrollment application and finish it later?',
        a: isAr 
          ? 'نعم، يتضمن النموذج ميزة "الحفظ والاستئناف لاحقاً" لتتمكن من العودة لبياناتك في أي وقت.'
          : 'Yes, the form includes a "Save and Resume Later" feature to allow you to return at any time.',
        icon: Clock
      }
    ]
  },
  {
    category: isAr ? 'دعم الطلاب' : 'Student Support',
    questions: [
      {
        q: isAr ? 'هل تقدم BBA إرشادات أكاديمية؟' : 'Does BBA provide academic guidance?',
        a: isAr 
          ? 'نعم، يتم تعيين مرشد لكل طالب لمتابعة تقدمه، الإجابة على استفساراته، وتوفير الدعم الأكاديمي الفردي لضمان النجاح.'
          : 'Yes, every student is assigned a mentor to monitor progress, answer questions, and provide individual support.',
        icon: ShieldCheck
      },
      {
        q: isAr ? 'كيف يتابع أولياء الأمور تقدم أبنائهم؟' : 'How do parents stay informed?',
        a: isAr 
          ? 'نشجع التواصل المستمر، ويمكن لأولياء الأمور طلب تلقي تقارير تقدم يومية تلقائية عبر البريد الإلكتروني.'
          : 'We encourage regular communication, and parents can request automatic daily progress reports via email.',
        icon: MessageSquare
      },
      {
        q: isAr ? 'هل تساعد الأكاديمية في التخطيط التعليمي والتخرج؟' : 'Does BBA help with graduation planning?',
        a: isAr 
          ? 'نعم، نوفر إرشادات شاملة للتخطيط للمرحلة الثانوية، مراجعة السجلات الأكاديمية، والتحضير للقبول الجامعي.'
          : 'Yes, we provide comprehensive guidance for high school planning, academic record review, and college prep.',
        icon: Target
      }
    ]
  }
];

export default function FaqPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const faqData = getFaqData(isAr);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full shadow-[0_0_20px_rgba(200,84,46,0.5)]" />
          </div>
          <p className="text-sm sm:text-xl text-white/80 font-bold max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'ابحث عن إجابات مفيدة حول الأكاديمية، برامجنا، التسجيل، ودعم الطلاب.' 
              : 'Find helpful answers about our academy, online programs, enrollment, and student support.'}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-10 relative z-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {faqData.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-primary uppercase border-l-4 border-secondary pl-4 tracking-widest">
                {category.category}
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`cat-${catIdx}-item-${idx}`}
                    className="bg-white border border-slate-100 rounded-2xl px-6 sm:px-8 shadow-sm overflow-hidden transition-all data-[state=open]:shadow-xl data-[state=open]:border-secondary/20 group"
                  >
                    <AccordionTrigger className="hover:no-underline py-6 sm:py-8">
                      <span className="flex items-center gap-4 sm:gap-6 text-start w-full">
                        <span className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 text-primary flex items-center justify-center shrink-0 group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all shadow-inner">
                          <faq.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </span>
                        <span className="text-sm sm:text-lg font-black text-primary leading-tight group-hover:text-secondary transition-colors">
                          {faq.q}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-10 border-t border-slate-50 pt-8">
                       <div className="max-w-3xl mx-auto">
                          <p className="text-slate-600 font-bold leading-relaxed text-xs sm:text-base">
                             {faq.a}
                          </p>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="bg-slate-50 p-8 sm:p-12 rounded-2xl border border-slate-100 text-center space-y-8 shadow-premium">
             <h2 className="text-2xl font-black text-primary uppercase">{isAr ? 'هل أنت مستعد للبدء؟' : 'Ready to Start?'}</h2>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white font-black rounded-xl h-14 px-10 shadow-xl">
                  <Link href={`/${lang}/enroll`}>{isAr ? 'ابدأ التسجيل' : 'Start Enrollment'}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-10 rounded-xl border-2 font-black text-primary hover:bg-primary hover:text-white transition-all">
                  <Link href={`/${lang}/contact`}>{isAr ? 'تواصل مع BBA' : 'Contact BBA'}</Link>
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon Hallucination Fixes
function Monitor(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  )
}