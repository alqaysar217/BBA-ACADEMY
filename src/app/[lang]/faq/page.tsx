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
  Calendar
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
        q: isAr ? 'هل BBA مدرسة عبر الإنترنت؟' : 'Is BBA an online school?',
        a: isAr 
          ? 'نعم. تقدم BBA برامج تعليمية عبر الإنترنت بنسبة 100%، مما يسمح للطلاب بالتعلم من المنزل أو أي مكان مناسب آخر مع اتصال إنترنت موثوق. لا تقدم BBA حالياً دروساً حضورية.'
          : 'Yes. BBA offers 100% online educational programs, allowing students to learn from home or another suitable location with a reliable internet connection. BBA does not currently offer in-person classes.',
        icon: Laptop
      },
      {
        q: isAr ? 'ما هي البرامج التعليمية التي تقدمها BBA؟' : 'What educational programs does BBA offer?',
        a: isAr 
          ? 'تقدم BBA حالياً ثلاثة برامج عبر الإنترنت: برنامج الصفوف 3-5 عن بعد، برنامج الصفوف 6-12 عن بعد، وبرنامج عطلة نهاية الأسبوع (عن بعد). تم تصميم كل برنامج لدعم أعمار واحتياجات تعليمية مختلفة.'
          : 'BBA currently offers three online programs: Grades 3–5 Remote Program, Grades 6–12 Remote Program, and Weekend Program (Remote). Each program is designed for different needs.',
        icon: GraduationCap
      }
    ]
  },
  {
    category: isAr ? 'القبول والتسجيل' : 'Enrollment and Registration',
    questions: [
      {
        q: isAr ? 'كيف يمكنني تسجيل طفلي في BBA؟' : 'How can I enroll my child at BBA?',
        a: isAr 
          ? 'يمكنك البدء بإكمال نموذج التسجيل عبر الإنترنت. يجمع النموذج معلومات ولي الأمر، معلومات الطالب، تفضيلات البرنامج، والمستندات الداعمة المطلوبة. بعد التقديم، سيقوم فريق BBA بمراجعة معلوماتك والتواصل معك.'
          : 'You can begin by completing our online enrollment form. The form collects parent and student info, preferences, and documents. After submission, the BBA team will review and contact you.',
        icon: FileSignature,
        hasButton: true,
        buttonText: isAr ? 'ابدأ التسجيل' : 'Start Enrollment',
        buttonLink: '/enroll'
      },
      {
        q: isAr ? 'هل يمكنني تسجيل أكثر من طفل؟' : 'Can I register more than one child?',
        a: isAr 
          ? 'نعم. يدعم نموذج التسجيل عبر الإنترنت حالياً تسجيل طالب واحد أو اثنين أو ثلاثة. يمكن للوالدين تقديم المعلومات المطلوبة لكل طالب أثناء عملية التسجيل.'
          : 'Yes. The online enrollment form currently supports registration for one, two, or three students. Parents can provide the required information for each student.',
        icon: Users
      },
      {
        q: isAr ? 'هل يمكنني حفظ طلب التسجيل وإكماله لاحقاً؟' : 'Can I save my enrollment application and finish it later?',
        a: isAr 
          ? 'نعم. يتضمن نموذج التسجيل ميزة "الحفظ والاستئناف لاحقاً"، مما يسمح للوالدين بالعودة إلى طلبهم دون الحاجة إلى إكمال كل شيء في جلسة واحدة.'
          : 'Yes. The enrollment form includes a Save and Resume Later feature, allowing parents to return to their application without completing everything at once.',
        icon: CheckCircle2
      },
      {
        q: isAr ? 'أين يمكنني العثور على معلومات الرسوم وطرق الدفع؟' : 'Where can I find tuition and payment information?',
        a: isAr 
          ? 'تختلف خيارات الرسوم والدفع حسب البرنامج المختار. يرجى مراجعة المعلومات المنشورة على صفحة البرامج وخيارات الدفع المتاحة أثناء التسجيل. في حال تسجيل عدة أطفال، يمكن لـ BBA تأكيد الرسوم العائلية وأي خصومات للأشقاء.'
          : 'Tuition and payment options vary by program. Please review the Programs page and payment options during enrollment. Sibling discounts are available.',
        icon: CreditCard
      }
    ]
  },
  {
    category: isAr ? 'التعلم عبر الإنترنت ودعم الطلاب' : 'Online Learning and Student Support',
    questions: [
      {
        q: isAr ? 'كيف يعمل التعلم عبر الإنترنت في BBA؟' : 'How does online learning work at BBA?',
        a: isAr 
          ? 'بالنسبة للطلاب الذين يستخدمون مسار التعلم القائم على Edgenuity، يتم إكمال الدورات الدراسية عبر الإنترنت من خلال المنصة. يتبع الطلاب خطة طالب شخصية ويتلقون إرشادات من الفريق الأكاديمي في BBA.'
          : 'For students using BBA\'s Edgenuity-based pathway, coursework is completed online through the platform. Students follow a personalized Student Plan and receive guidance.',
        icon: BookOpen
      },
      {
        q: isAr ? 'هل يجب على الطلاب حضور دروس مباشرة في أوقات ثابتة؟' : 'Do students have to attend live classes at fixed times?',
        a: isAr 
          ? 'في مسار Edgenuity ذاتي التوجيه، لا يطالب الطلاب بحضور دروس مباشرة يومية في ساعات ثابتة. أما البرامج الأخرى، بما في ذلك جلسات برنامج عطلة نهاية الأسبوع، فقد يكون لها أوقات تعلم محددة.'
          : 'In the self-paced Edgenuity pathway, students are not required to attend daily live classes at fixed hours. Weekend Program sessions may have scheduled times.',
        icon: Clock
      },
      {
        q: isAr ? 'هل سيتلقى طفلي دعماً أكاديمياً؟' : 'Will my child receive academic support?',
        a: isAr 
          ? 'نعم. تؤكد BBA على التوجيه الأكاديمي الشخصي والتواصل مع العائلات. يتلقى الطلاب في مسار التعلم المدعوم من المرشد مساعدة في فهم خطتهم الدراسية ومراقبة التقدم.'
          : 'Yes. BBA emphasizes personalized academic guidance. Students receive assistance with understanding their Student Plan and monitoring progress.',
        icon: ShieldCheck
      },
      {
        q: isAr ? 'كيف يمكن للوالدين البقاء على اطلاع بتقدم طفلهم؟' : 'How can parents stay informed about their child\'s progress?',
        a: isAr 
          ? 'نشجع الوالدين على البقاء على تواصل مع BBA ومراقبة تقدم طفلهم بانتظام. يمكن للوالدين طلب تحديثات التقدم اليومية التلقائية عبر البريد الإلكتروني.'
          : 'Parents are encouraged to stay in communication with BBA. For Edgenuity students, parents may request automatic daily progress updates via email.',
        icon: MessageSquare
      }
    ]
  },
  {
    category: isAr ? 'التخطيط الأكاديمي ودليل الطالب' : 'Academic Planning and the Student Guide',
    questions: [
      {
        q: isAr ? 'هل تساعد BBA العائلات في التخطيط للمرحلة الثانوية والتخرج؟' : 'Does BBA help families with high school and graduation planning?',
        a: isAr 
          ? 'تقدم BBA إرشادات تعليمية لمساعدة العائلات على فهم التقدم الأكاديمي، وتنظيم السجلات التعليمية، والتخطيط للتخرج والفرص التعليمية المستقبلية.'
          : 'BBA provides educational guidance to help families understand progress, organize records, and plan for graduation and future opportunities.',
        icon: Target
      },
      {
        q: isAr ? 'أين يمكن للطلاب العثور على معلومات حول الدورات وتوقعات المدرسة؟' : 'Where can students find information about school expectations?',
        a: isAr 
          ? 'يوفر دليل طالب BBA معلومات مفصلة حول البدء، الوصول للمنصة، اتباع خطة الطالب، ومسؤوليات الطالب والوالدين.'
          : 'The BBA Student Guide provides detailed information about getting started, accessing the platform, and responsibilities.',
        icon: BookOpen,
        hasButton: true,
        buttonText: isAr ? 'اقرأ دليل الطالب' : 'Read the Student Guide',
        buttonLink: '/guide'
      },
      {
        q: isAr ? 'كيف يمكنني التواصل مع BBA إذا كان لدي المزيد من الأسئلة؟' : 'How can I contact BBA if I have more questions?',
        a: isAr 
          ? 'يسعد فريقنا بمساعدة العائلات في فهم برامجنا وعملية التسجيل. يرجى زيارة صفحة التواصل للتواصل معنا.'
          : 'Our team is happy to help families understand our programs and enrollment. Please visit the Contact page to get in touch.',
        icon: HelpCircle,
        hasButton: true,
        buttonText: isAr ? 'تواصل مع BBA' : 'Contact BBA',
        buttonLink: '/contact'
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
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full shadow-[0_0_20px_rgba(200,84,46,0.5)]" />
          </div>
          <div className="space-y-2">
             <p className="text-sm sm:text-2xl font-black text-secondary italic">
               {isAr ? 'ابحث عن الإجابات التي تحتاجها' : 'Find the Answers You Need'}
             </p>
             <p className="text-xs sm:text-lg text-white/80 font-bold max-w-2xl mx-auto leading-relaxed">
               {isAr 
                 ? 'نحن نعلم أن اختيار البرنامج التعليمي المناسب هو قرار مهم لكل عائلة. هنا ستجد إجابات مفيدة للأسئلة الشائعة.' 
                 : 'We know that choosing the right educational program is an important decision for every family. Here you\'ll find helpful answers.'}
             </p>
          </div>
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
                    <AccordionContent className="pb-10 border-t border-slate-50 pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                       <div className="max-w-3xl mx-auto space-y-8">
                          <p className="text-slate-600 font-bold leading-relaxed text-xs sm:text-base bg-slate-50 p-6 rounded-xl border border-slate-100/50">
                             {faq.a}
                          </p>
                          
                          {faq.hasButton && (
                            <div className="flex justify-center sm:justify-start">
                               <Button asChild className="bg-secondary hover:bg-primary text-white font-black rounded-xl h-12 sm:h-14 px-8 shadow-lg transition-all group-hover:scale-105 active:scale-95">
                                  <Link href={`/${lang}${faq.buttonLink}`} className="flex items-center gap-2">
                                     {faq.buttonText}
                                     {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                  </Link>
                               </Button>
                            </div>
                          )}
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Final Call to Action */}
          <div className="bg-primary text-white p-10 sm:p-16 rounded-2xl shadow-2xl relative overflow-hidden text-center space-y-8 border-b-8 border-secondary group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <HelpCircle className="h-48 w-48" />
             </div>
             <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                  {isAr ? 'هل ما زال لديك استفسارات؟' : 'Still Have Questions?'}
                </h2>
                <p className="text-sm sm:text-xl text-white/80 font-bold italic max-w-lg mx-auto">
                   {isAr 
                     ? 'فريقنا المتفاني مستعد دائماً لمساعدتك في فهم كل جانب من جوانب برامجنا التعليمية.' 
                     : 'Our dedicated team is always ready to help you understand every aspect of our programs.'}
                </p>
                <div className="pt-6 flex justify-center">
                   <Button asChild className="bg-secondary hover:bg-white hover:text-secondary text-white font-black h-14 sm:h-16 px-10 rounded-xl transition-all shadow-xl active:scale-95 group/btn">
                      <Link href={`/${lang}/contact`} className="flex items-center gap-3">
                         {isAr ? 'تواصل معنا الآن' : 'Contact Us Now'}
                         {isAr ? <ArrowLeft className="h-5 w-5 group-hover/btn:-translate-x-2 transition-transform" /> : <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />}
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
