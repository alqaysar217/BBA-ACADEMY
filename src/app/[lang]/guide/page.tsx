
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
  DollarSign
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
    q: isAr ? 'ما هي المواد التي يدرسها الطلاب في البرنامج الصباحي (3-5)؟' : 'What subjects do students learn in the Grades 3-5 program?',
    a: isAr 
      ? 'يدرس الطلاب المنهج الأكاديمي الأمريكي (اللغة الإنجليزية والرياضيات) في الفترة الصباحية، تليها فترة مخصصة للقرآن الكريم (تلاوة وحفظ بالتجويد)، اللغة العربية، والدراسات الإسلامية.'
      : 'Students study the American academic curriculum (English and Mathematics) in the morning, followed by Quran (recitation and memorization), Arabic language, and Islamic Studies.',
    icon: BookOpen
  },
  {
    q: isAr ? 'كيف يعمل برنامج المرحلة المتوسطة والثانوية (6-12)؟' : 'How does the Middle/High School (6-12) program work?',
    a: isAr 
      ? 'يستخدم الطلاب منصة Edgenuity العالمية لإكمال المناهج الأكاديمية تحت إشراف وتتبع أسبوعي من فريقنا، بالإضافة إلى دروس الدراسات الإسلامية والقرآن التي تتناسب مع مرحلتهم العمرية.'
      : 'Students use the Edgenuity platform for academic courses with weekly tracking by our team, plus age-appropriate Islamic Studies and Quran lessons.',
    icon: Monitor
  },
  {
    q: isAr ? 'هل التعليم باللغة العربية أم الإنجليزية؟' : 'Is instruction in Arabic or English?',
    a: isAr 
      ? 'المواد الأكاديمية (رياضيات، علوم، لغة إنجليزية) تدرس باللغة الإنجليزية، بينما تدرس مواد الهوية (لغة عربية، قرآن، تربية إسلامية) باللغة العربية مع توفير الدعم اللازم.'
      : 'Academic subjects are taught in English, while identity subjects (Arabic, Quran, Islamic Studies) are taught in Arabic with necessary support.',
    icon: Languages
  },
  {
    q: isAr ? 'أين يقع مقر الأكاديمية وهل تخدمون جميع الولايات؟' : 'Where is the academy located and do you serve all states?',
    a: isAr 
      ? 'مقرنا الرئيسي في ولاية ميشيغان، ولكننا نخدم العائلات في جميع أنحاء الولايات المتحدة (Nationwide) من خلال نظامنا التعليمي المتقدم عبر الإنترنت.'
      : 'Our headquarters is in Michigan, but we serve families across the entire United States (Nationwide) through our advanced online learning system.',
    icon: MapPin
  },
  {
    q: isAr ? 'كيف يمكنني التواصل مع الأكاديمية؟' : 'How can I contact the academy?',
    a: isAr 
      ? 'يمكنكم التواصل معنا عبر الهاتف (734) 645-3613، أو واتساب (313) 655-5778، أو البريد الإلكتروني info@baneenbanaat.org. نحن متاحون من الإثنين للجمعة، 9 صباحاً - 4 مساءً بتوقيت نيويورك.'
      : 'Contact us via Phone at (734) 645-3613, WhatsApp at (313) 655-5778, or Email at info@baneenbanaat.org. We are available Mon-Fri, 9 AM - 4 PM ET.',
    icon: MessageCircle
  },
  {
    q: isAr ? 'كيف أبدأ في الأكاديمية بعد التسجيل؟' : 'How do I get started after enrollment?',
    a: isAr 
      ? 'بمجرد التسجيل، ستتلقى بريداً ترحيبياً يحتوي على بيانات دخول Edgenuity، خطة الطالب الخاصة بك، ومعلومات التواصل مع مرشدك الشخصي الذي سيوجهك في كل خطوة.'
      : 'After enrollment, you will receive a Welcome Email with Edgenuity login details, your Student Plan, and contact info for your personal mentor.',
    icon: Rocket
  },
  {
    q: isAr ? 'هل يتوفر مرشد تعليمي لكل طالب؟' : 'Is there a mentor for every student?',
    a: isAr 
      ? 'نعم، كل طالب يتم تعيين مرشد مخصص له يراقب تقدمه، يجيب على أسئلته، ويساعده في التغلب على أي تحديات أكاديمية طوال العام الدراسي.'
      : 'Yes, every student is assigned a dedicated mentor who monitors progress, answers questions, and helps overcome any academic challenges.',
    icon: UserCheck
  },
  {
    q: isAr ? 'ما هو عدد الدورات التي يجب إكمالها سنوياً؟' : 'How many courses must be completed annually?',
    a: isAr 
      ? 'يتوقع من معظم الطلاب إكمال 10 دورات دراسية بين سبتمبر ويونيو، بمعدل دورة واحدة تقريباً كل شهر لضمان البقاء في المسار الصحيح للتخرج.'
      : 'Most students are expected to complete 10 courses between September and June, averaging one course per month to stay on track for graduation.',
    icon: ClipboardCheck
  }
];

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const faqs = getFaqs(isAr);

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
            <h1 className="text-3xl sm:text-5xl lg:text-4xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {isAr ? 'دليل طالب وأولياء أمور BBA' : 'BBA Student & Parent Guide'}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-xs sm:text-xl text-white/80 font-bold max-w-3xl mx-auto leading-relaxed italic border-x-2 border-secondary/20 px-8">
            {isAr 
              ? 'إليك كافة الإجابات التي تحتاجها حول تاريخنا، برامجنا، وطرق التواصل والنجاح معنا.' 
              : 'Find all the answers you need about our history, programs, communication, and success with us.'}
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
                  <div className="text-[10px] font-black uppercase text-secondary tracking-widest mb-2">Knowledge Base</div>
                  <p className="text-primary font-black text-xl sm:text-2xl leading-tight border-l-4 border-secondary pl-6 py-1">
                    {isAr ? 'نحن هنا للإجابة على كافة استفساراتكم بوضوح.' : 'We are here to answer all your inquiries clearly.'}
                  </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 opacity-90 leading-relaxed text-slate-500">
                  <p>{isAr ? 'يحتوي هذا الدليل على معلومات مفصلة عن الأكاديمية وكيفية سير العملية التعليمية لضمان عام دراسي متميز.' : 'This guide contains detailed information about the academy and the educational process to ensure an excellent school year.'}</p>
                  <p>{isAr ? 'اضغط على أي سؤال أدناه لمعرفة الإجابة التفصيلية.' : 'Click on any question below to see the detailed answer.'}</p>
               </div>
            </div>
          </div>

          {/* Flat FAQ Accordion List */}
          <div className="space-y-4">
            <Accordion 
              type="single" 
              collapsible 
              className="space-y-4"
            >
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
                      <div className="flex-1 space-y-1">
                        <h3 className="text-sm sm:text-lg font-black text-primary leading-tight group-hover:text-secondary transition-colors tracking-tight">
                          {faq.q}
                        </h3>
                      </div>
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

          {/* Orientation Video Special Section */}
          <div className="bg-slate-50 p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-inner space-y-8">
             <div className="text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-primary uppercase">{isAr ? 'فيديو تعريفي بمنصة Edgenuity' : 'Edgenuity Orientation Video'}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-bold">{isAr ? 'تعلم كيفية التنقل في دروسك وتتبع تقدمك' : 'Learn how to navigate your lessons and track progress'}</p>
             </div>
             <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/wTuSRO3BJ8k?start=9"
                  title="Edgenuity Orientation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
             </div>
             <div className="flex justify-center">
                <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white font-black h-14 px-10 rounded-xl shadow-xl transition-all active:scale-95">
                  <Link href="https://student.edgenuity.com/login" target="_blank" className="flex items-center gap-3">
                    {isAr ? 'دخول منصة الطالب' : 'Student Login'}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
             </div>
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
