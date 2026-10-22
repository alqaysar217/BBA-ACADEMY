'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  HelpCircle, 
  History,
  User,
  Star,
  GraduationCap,
  Laptop,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

const getFaqs = (isAr: boolean) => [
  {
    q: isAr ? 'متى تأسست أكاديمية بنين وبنات وما هي قصتها؟' : 'When was BBA founded and what is its story?',
    a: isAr 
      ? 'تأسست الأكاديمية في عام 2019 برؤية بسيطة: تزويد العائلات بخيار تعليمي مرن يجمع بين التميز الأكاديمي والقيم الأخلاقية القوية واللغة العربية والهوية الإسلامية.'
      : 'BBA was founded in 2019 with a simple vision: to provide families with a flexible educational option combining academic excellence with moral values.',
    icon: History
  },
  {
    q: isAr ? 'من هو مؤسس الأكاديمية؟' : 'Who is the founder of the academy?',
    a: isAr 
      ? 'المؤسس ومدير الأكاديمية هو الدكتور مصطفى علي، وهو تربوي وقائد كرس سنوات لتطوير رؤية تعليمية تحضر الطلاب للحياة العملية والدينية بنزاهة.'
      : 'The founder and Academy Director is Dr. Mustafa Ali, an educator and leader who prepares students for life and faith with integrity.',
    icon: User
  },
  {
    q: isAr ? 'لماذا أختار أكاديمية بنين وبنات لعائلتي؟' : 'Why should I choose BBA for my family?',
    a: isAr 
      ? 'لأننا نؤمن أن الطلاب لا ينبغي أبداً أن يختاروا بين جودة التعليم والحفاظ على هويتهم. نحن نوفر بيئة تعلم مرنة وتوجيه أكاديمي شخصي.'
      : 'Because we believe students should never choose between quality education and identity. We provide flexibility and personalized guidance.',
    icon: Star
  },
  {
    q: isAr ? 'ما هي البرامج التعليمية المتاحة؟' : 'What educational programs are available?',
    a: isAr 
      ? 'نقدم ثلاثة برامج رئيسية: برنامج الصفوف 3-5، برنامج الصفوف 6-12، وبرنامج عطلة نهاية الأسبوع.'
      : 'We offer three main programs: Grades 3–5, Grades 6–12, and the Weekend Program.',
    icon: GraduationCap
  },
  {
    q: isAr ? 'ما هي المتطلبات التقنية للدراسة؟' : 'What are the technical requirements?',
    a: isAr 
      ? 'يحتاج الطالب إلى جهاز كمبيوتر (لابتوب) أو جهاز لوحي (تابلت) بحد أدنى، بالإضافة إلى اتصال مستقر بالإنترنت.'
      : 'Students need at least a laptop or tablet, plus a stable internet connection.',
    icon: Laptop
  },
  {
    q: isAr ? 'أين يقع مقر الأكاديمية وهل تخدمون جميع الولايات؟' : 'Where is the academy located?',
    a: isAr 
      ? 'مقرنا الرئيسي في ولاية ميشيغان، ولكننا نخدم العائلات في جميع أنحاء الولايات المتحدة من خلال نظامنا التعليمي المتقدم عبر الإنترنت.'
      : 'Based in Michigan, but we serve families across the entire United States through our advanced online system.',
    icon: MapPin
  }
];

export default function FaqPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const faqs = getFaqs(isAr);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-xs sm:text-lg text-white/80 font-bold max-w-2xl mx-auto italic">
            {isAr 
              ? 'إجابات واضحة وشاملة لأكثر التساؤلات تكراراً حول برامجنا ونظامنا التعليمي.' 
              : 'Clear and comprehensive answers to the most common questions about our programs and system.'}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-10 relative z-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {mounted && (
            <div className="bg-white rounded-2xl">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`item-${idx}`}
                    className="bg-white border border-slate-100 rounded-2xl px-6 sm:px-10 shadow-sm overflow-hidden transition-all data-[state=open]:shadow-xl group"
                  >
                    <AccordionTrigger className="hover:no-underline py-6 sm:py-8">
                      <span className="flex items-center gap-4 sm:gap-6 text-start w-full">
                        <span className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl bg-slate-50 text-primary flex items-center justify-center shrink-0 group-data-[state=open]:bg-primary group-data-[state=open]:text-white">
                          <faq.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                        </span>
                        <span className="text-sm sm:text-lg font-black text-primary leading-tight group-hover:text-secondary">
                          {faq.q}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-10 border-t border-slate-50 pt-8">
                       <div className="max-w-3xl mx-auto">
                          <div className="bg-slate-50/50 p-6 sm:p-8 rounded-xl">
                             <p className="text-slate-600 font-bold leading-relaxed text-xs sm:text-base">
                                {faq.a}
                             </p>
                          </div>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          <div className="bg-primary text-white p-10 sm:p-16 rounded-2xl shadow-2xl relative overflow-hidden text-center space-y-8 border-b-8 border-secondary group">
             <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-black">{isAr ? 'لم تجد إجابتك؟' : "Didn't find your answer?"}</h2>
                <p className="text-sm sm:text-lg opacity-80 font-bold italic">
                   {isAr ? 'فريقنا متاح دائماً للإجابة على استفساراتكم الخاصة بشكل مباشر.' : 'Our team is always available to answer your specific inquiries directly.'}
                </p>
                <div className="pt-6 flex justify-center">
                  <Button asChild className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-xl px-10 h-14 sm:h-16 shadow-xl">
                    <Link href={`/${lang}/contact`} className="flex items-center gap-3">
                      {isAr ? 'تواصل معنا الآن' : 'Contact us now'}
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