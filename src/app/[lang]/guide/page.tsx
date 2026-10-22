
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
  History,
  User,
  Lightbulb,
  DollarSign,
  Laptop,
  FileSignature
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const getFaqs = (isAr: boolean) => [
  {
    q: isAr ? 'متى تأسست أكاديمية بنين وبنات وما هي قصتها؟' : 'When was BBA founded and what is its story?',
    a: isAr 
      ? 'تأسست الأكاديمية في عام 2019 برؤية بسيطة: تزويد العائلات بخيار تعليمي مرن يجمع بين التميز الأكاديمي والقيم الأخلاقية القوية واللغة العربية والهوية الإسلامية. ما بدأ كمبادرة صغيرة في ميشيغان نما ليصبح شريكاً تعليمياً موثوقاً في جميع أنحاء الولايات المتحدة.'
      : 'BBA was founded in 2019 with a simple vision: to provide families with a flexible educational option that combines academic excellence with strong moral values, Arabic language, and Islamic identity. What started in Michigan has grown into a trusted partner nationwide.',
    icon: History
  },
  {
    q: isAr ? 'من هو مؤسس الأكاديمية؟' : 'Who is the founder of the academy?',
    a: isAr 
      ? 'المؤسس ومدير الأكاديمية هو الدكتور مصطفى علي، وهو تربوي وقائد كرس سنوات لتطوير رؤية تعليمية تحضر الطلاب ليس فقط للتخرج، بل للحياة العملية والدينية بنزاهة ومسؤولية.'
      : 'The founder and Academy Director is Dr. Mustafa Ali, an educator and leader who dedicated years to developing a vision that prepares students not just for graduation, but for life and faith with integrity.',
    icon: User
  },
  {
    q: isAr ? 'لماذا أختار أكاديمية بنين وبنات لعائلتي؟' : 'Why should I choose BBA for my family?',
    a: isAr 
      ? 'لأننا نؤمن أن الطلاب لا ينبغي أبداً أن يختاروا بين جودة التعليم والحفاظ على هويتهم. نحن نوفر بيئة تعلم مرنة، توجيه أكاديمي شخصي لكل طالب، وشراكة حقيقية مع أولياء الأمور لضمان النجاح.'
      : 'Because we believe students should never have to choose between quality education and preserving their identity. We provide a flexible learning environment, personalized guidance, and a true partnership with parents.',
    icon: Star
  },
  {
    q: isAr ? 'ما هي البرامج التعليمية المتاحة؟' : 'What educational programs are available?',
    a: isAr 
      ? 'نقدم ثلاثة برامج رئيسية: برنامج الصفوف 3-5 (تأسيس ابتدائي)، برنامج الصفوف 6-12 (أكاديميات المتوسطة والثانوية)، وبرنامج عطلة نهاية الأسبوع (لتعزيز الهوية واللغة).'
      : 'We offer three main programs: Grades 3–5 (Elementary foundation), Grades 6–12 (Middle and High School), and the Weekend Program (Identity and Language enrichment).',
    icon: GraduationCap
  },
  {
    q: isAr ? 'ما هي المتطلبات التقنية للدراسة؟' : 'What are the technical requirements?',
    a: isAr 
      ? 'يحتاج الطالب إلى جهاز كمبيوتر (لابتوب) أو جهاز لوحي (تابلت) بحد أدنى، بالإضافة إلى اتصال مستقر بالإنترنت لضمان الوصول للمنصة التعليمية وحضور الحصص المباشرة دون انقطاع.'
      : 'The student needs at least a laptop or tablet, plus a stable internet connection to ensure access to the learning platform and attend live sessions without interruption.',
    icon: Laptop
  },
  {
    q: isAr ? 'أين يقع مقر الأكاديمية وهل تخدمون جميع الولايات؟' : 'Where is the academy located and do you serve all states?',
    a: isAr 
      ? 'مقرنا الرئيسي في ولاية ميشيغان، ولكننا نخدم العائلات في جميع أنحاء الولايات المتحدة (Nationwide) من خلال نظامنا التعليمي المتقدم عبر الإنترنت.'
      : 'Our headquarters is in Michigan, but we serve families across the entire United States (Nationwide) through our advanced online learning system.',
    icon: MapPin
  }
];

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const faqs = getFaqs(isAr);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
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
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {isAr ? 'دليل نجاح الطالب والأسرة' : 'Student & Parent Success Guide'}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-xs sm:text-lg text-white/80 font-bold max-w-3xl mx-auto leading-relaxed italic border-x-2 border-secondary/20 px-8">
            {isAr 
              ? 'كل ما تحتاج معرفته لضمان عام دراسي متميز ونتائج أكاديمية قوية.' 
              : 'Everything you need to know for a successful school year and strong academic results.'}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-10 relative z-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Success Formula Section */}
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-100 shadow-premium relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full" />
            <div className="space-y-8 relative z-10 text-center">
               <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full text-secondary font-black text-[10px] uppercase tracking-widest">
                    <Trophy className="h-3 w-3" />
                    {isAr ? 'معادلة النجاح في BBA' : 'BBA Success Formula'}
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-primary uppercase">{isAr ? 'كيف تحقق التفوق؟' : 'How to Excel?'}</h2>
               </div>
               
               <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-y border-slate-50">
                  {[
                    { t: isAr ? 'سجل دخولك يومياً' : 'Log in Daily', d: 'Mon - Fri', i: Laptop },
                    { t: isAr ? 'أنجز 5-7% يومياً' : '5-7% Progress', d: 'Steady Growth', i: Zap },
                    { t: isAr ? 'أنهِ دورة كل شهر' : '1 Course Monthly', d: '10/10 Months', i: BookOpen },
                    { t: isAr ? 'التخرج أو الترقية' : 'Promotion/Grad', d: 'The Goal', i: GraduationCap },
                  ].map((step, idx, arr) => (
                    <div key={idx} className="flex flex-col items-center flex-1 gap-4">
                       <div className="h-16 w-16 rounded-2xl bg-slate-50 text-primary flex items-center justify-center shadow-inner group-hover:bg-primary group-hover:text-white transition-all">
                          <step.i className="h-8 w-8" />
                       </div>
                       <div className="text-center">
                          <p className="font-black text-xs sm:text-sm text-primary uppercase leading-tight">{step.t}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{step.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <p className="text-slate-500 font-bold italic text-sm">
                 {isAr ? '"النجاح لا يُبنى في يوم واحد، بل بالجهد المستمر والتواصل المفتوح."' : '"Success isn\'t built in a single day—it\'s built through consistent effort."'}
               </p>
            </div>
          </div>

          {/* Getting Started Guide */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-primary uppercase tracking-tight flex items-center gap-4">
              <Rocket className="h-6 w-6 text-secondary" />
              {isAr ? 'خطوات البدء السريع' : 'Quick Start Steps'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { t: isAr ? '1. تفقد بريدك الترحيبي' : '1. Check Welcome Email', c: isAr ? 'يحتوي على بيانات دخول Edgenuity وخطتك الدراسية.' : 'Contains Edgenuity login and your student plan.' },
                 { t: isAr ? '2. سجل دخولك للمنصة' : '2. Log Into Edgenuity', c: isAr ? 'هنا ستقضي معظم وقتك في التعلم وإنجاز المهام.' : 'Where you will spend most time learning.' },
                 { t: isAr ? '3. راجع خطة الطالب' : '3. Review Student Plan', c: isAr ? 'خارطة طريقك لإنهاء 10 دورات خلال العام الدراسي.' : 'Your roadmap to finish 10 courses annually.' },
                 { t: isAr ? '4. تعرف على مرشدك' : '4. Meet Your Mentor', c: isAr ? 'هو شريكك في النجاح ومستشارك الأول لأي تحدي.' : 'Your success partner and first point of contact.' }
               ].map((step, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3 hover:bg-white hover:shadow-xl transition-all">
                    <h3 className="font-black text-primary text-sm sm:text-lg">{step.t}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">{step.c}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-primary uppercase tracking-tight flex items-center gap-4">
              <HelpCircle className="h-6 w-6 text-secondary" />
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`item-${idx}`}
                  className="bg-white border border-slate-100 rounded-2xl px-6 sm:px-10 shadow-sm overflow-hidden transition-all duration-300 data-[state=open]:shadow-xl data-[state=open]:border-secondary/30 group"
                >
                  <AccordionTrigger className="hover:no-underline py-6 sm:py-8">
                    <div className="flex items-center gap-4 sm:gap-6 text-start w-full">
                      <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl bg-slate-50 text-primary flex items-center justify-center shrink-0 transition-all group-data-[state=open]:bg-primary group-data-[state=open]:text-white shadow-inner">
                        <faq.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                      </div>
                      <h3 className="text-sm sm:text-lg font-black text-primary leading-tight group-hover:text-secondary transition-colors tracking-tight">
                        {faq.q}
                      </h3>
                      <ChevronDown className="h-4 w-4 text-slate-300 transition-all group-data-[state=open]:rotate-180 group-data-[state=open]:text-secondary" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-10 border-t border-slate-50 pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                     <div className="max-w-3xl mx-auto">
                        <div className="bg-slate-50/50 p-6 sm:p-8 rounded-xl border border-slate-100/50">
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

          {/* Encouragement Footer */}
          <div className="bg-primary text-white p-10 sm:p-16 rounded-2xl shadow-2xl relative overflow-hidden text-center space-y-8 border-b-8 border-secondary group">
             <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <div className="flex justify-center">
                   <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                      <Trophy className="h-8 w-8 text-secondary" />
                   </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">{isAr ? 'نحن معك في كل خطوة' : 'With You Every Step'}</h2>
                  <p className="text-sm sm:text-lg opacity-80 font-bold leading-relaxed italic max-w-lg mx-auto">
                     {isAr ? 'إذا كان لديك أي سؤال لم يتم ذكره أعلاه، فلا تتردد في التواصل معنا مباشرة.' : 'If you have any question not listed above, please feel free to reach out to us directly.'}
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
