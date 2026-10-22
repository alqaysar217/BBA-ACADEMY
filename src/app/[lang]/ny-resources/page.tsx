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
  Info,
  GraduationCap,
  MapPin,
  Clock,
  ExternalLink,
  BookOpen,
  Calendar,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function NyResourcesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = {
    hero: {
      title: isAr ? 'مركز موارد نيويورك للتعليم المنزلي' : 'NY Homeschool Resource Center',
      desc: isAr 
        ? 'كل ما تحتاج لمعرفته حول التعليم المنزلي في ولاية نيويورك. نحن هنا لتبسيط اللوائح المعقدة وتوجيهك خطوة بخطوة.'
        : 'Everything You Need to Know About Homeschooling in New York. We simplify the regulations and guide you step-by-step.',
    },
    intro: {
      title: isAr ? 'التعليم المنزلي في نيويورك' : 'Homeschooling in New York',
      p1: isAr 
        ? 'تتمتع ولاية نيويورك ببعض من أكثر لوائح التعليم المنزلي تفصيلاً في الولايات المتحدة. وبينما قد تبدو العملية مرهقة في البداية، فإن فهم المتطلبات يصبح أسهل بكثير مع التوجيه الصحيح.'
        : 'New York has some of the most comprehensive homeschool regulations in the United States. While the process may seem overwhelming at first, understanding the requirements becomes much easier with the right guidance.',
      p2: isAr
        ? 'في أكاديمية بنين وبنات (BBA)، قضينا سنوات في دعم عائلات التعليم المنزلي في نيويورك ومساعدة الآباء على فهم متطلبات الولاية. تم إنشاء هذا المركز لتوفير معلومات موثوقة وإرشادات عملية.'
        : 'At Baneen and Banaat Academy (BBA), we have spent years supporting homeschool families in New York and helping parents understand state requirements. This resource center provides clear, reliable information and practical guidance.'
    },
    process: {
      title: isAr ? 'عملية التعليم المنزلي في نيويورك' : 'The Homeschool Process in New York',
      intro: isAr 
        ? 'يتبع التعليم المنزلي في نيويورك عملية منظمة مصممة لمساعدة العائلات على تقديم تجربة تعليمية منظمة مع تلبية متطلبات الولاية.'
        : 'Homeschooling in New York follows a structured process designed to help families provide an organized educational experience while meeting state requirements.',
      steps: [
        {
          id: 1,
          title: isAr ? 'الخطوة 1: خطاب النوايا (LOI)' : 'Step 1 — Notice of Intent (LOI)',
          desc: isAr 
            ? 'رسالة بسيطة تبلغ منطقتك التعليمية المحلية بأنك تنوي تعليم طفلك منزلياً للعام الدراسي القادم. يجب تقديمها في غضون الإطار الزمني المطلوب.'
            : 'A simple letter informing your local school district that you intend to homeschool your child for the upcoming school year. It officially notifies the district.',
          bba: isAr ? 'كيف تساعد BBA: نقدم توجيهاً خطوة بخطوة حول متى وكيف يتم تقديم هذا الخطاب.' : 'How BBA Helps: Our team provides step-by-step guidance, helping you understand when the Notice of Intent should be submitted.'
        },
        {
          id: 2,
          title: isAr ? 'الخطوة 2: خطة IHIP' : 'Step 2 — Individualized Home Instruction Plan (IHIP)',
          desc: isAr 
            ? 'توضح الـ IHIP الخطة التعليمية للعام الدراسي، بما في ذلك المواد التي سيتم تدريسها وفقاً للوائح نيويورك.'
            : 'The IHIP outlines the educational plan for the school year, including the subjects that will be taught in accordance with New York\'s homeschool regulations.',
          bba: isAr ? 'كيف تساعد BBA: نساعدك في فهم المتطلبات التعليمية ونوجهك أثناء إعداد الخطة لضمان ثقتك بالعملية.' : 'How BBA Helps: We help families understand educational requirements and provide guidance while preparing the IHIP.'
        },
        {
          id: 3,
          title: isAr ? 'الخطوة 3: التقارير الفصلية' : 'Step 3 — Quarterly Reports',
          desc: isAr 
            ? 'يقوم الآباء بتقديم تقارير توثق التقدم التعليمي للطالب، بما في ذلك الحضور والمواد التي تمت تغطيتها.'
            : 'Throughout the school year, parents submit Quarterly Reports documenting progress, including attendance and subjects covered.',
          bba: isAr ? 'كيف تساعد BBA: نقوم بإعداد هذه التقارير لطلاب BBA وتذكير العائلات بالمواعيد النهائية لجعل العملية خالية من التوتر.' : 'How BBA Helps: We prepare these reports for BBA students and remind families of important deadlines.'
        },
        {
          id: 4,
          title: isAr ? 'الخطوة 4: التقييم السنوي' : 'Step 4 — Annual Assessment',
          desc: isAr 
            ? 'في نهاية كل عام، يكمل الطلاب تقييماً سنوياً (اختباراً موحداً أو طريقة تقييم أخرى مسموح بها).'
            : 'At the conclusion of each school year, students complete an Annual Assessment as required by New York regulations.',
          bba: isAr ? 'كيف تساعد BBA: نساعد العائلات في فهم متطلبات التقييم السنوي وإعداد الوثائق اللازمة.' : 'How BBA Helps: We assist BBA families in understanding the requirements and preparing necessary documentation.'
        }
      ]
    },
    college: {
      title: isAr ? 'المسارات الجامعية لطلاب نيويورك' : 'College Pathways for NY Homeschool Students',
      subtitle: isAr ? 'الاستعداد للجامعة يبدأ قبل التخرج بوقت طويل' : 'Preparing for College Starts Long Before Graduation',
      p1: isAr 
        ? 'هل سيتمكن طفلي من دخول الجامعة بعد التعليم المنزلي؟ الإجابة هي نعم. كل عام، يكمل خريجو التعليم المنزلي في نيويورك تعليمهم في أفضل الكليات والجامعات.'
        : 'Will my child be able to attend college after homeschooling? The answer is YES. Every year, NY homeschool graduates continue their education at community colleges and universities.',
      p2: isAr
        ? 'يجب على العائلات الحفاظ على سجلات أكاديمية منظمة تشمل كشوف الدرجات، سجلات الحضور، والوثائق المتعلقة ببرنامج التعليم المنزلي.'
        : 'Families should maintain organized academic records including transcripts, coursework, grades, and attendance records.',
      bba: isAr ? 'كيف تساعد BBA: نتواصل مع الآباء لمساعدة الطلاب على البقاء في المسار الصحيح، وإعداد السجلات، والتخطيط للقبول الجامعي بثقة.' : 'How BBA Helps: We work closely with parents to help students stay on track, prepare records, and confidently plan for college.'
    },
    mistakes: {
      title: isAr ? 'أخطاء شائعة يجب تجنبها' : 'Common Mistakes NY Families Should Avoid',
      p: isAr ? 'الأخطاء الصغيرة اليوم قد تخلق تحديات كبيرة غداً. البقاء منظماً هو المفتاح.' : 'Small mistakes today can create bigger challenges tomorrow. Staying organized is key.',
      items: [
        isAr ? 'الانتظار حتى اللحظة الأخيرة لتقديم الوثائق المطلوبة.' : 'Waiting until the last minute to submit required documents.',
        isAr ? 'نسيان الاحتفاظ بنسخ من السجلات الهامة مثل IHIP والتقارير الفصلية.' : 'Forgetting to keep copies of records like IHIPs and Quarterly Reports.',
        isAr ? 'تأجيل التفكير في التخرج أو التخطيط الجامعي حتى السنة الأخيرة.' : 'Waiting until senior year to begin thinking about graduation or college.',
        isAr ? 'افتراض أن كل كلية في نيويورك تتطلب نفس وثائق القبول.' : 'Assuming every college in NY requires the same admission documents.',
        isAr ? 'تجاوز المواعيد النهائية التي تحددها المنطقة التعليمية المحلية.' : 'Missing important deadlines established by your local school district.'
      ],
      tip: isAr ? 'نصيحة BBA: أنشئ مجلداً خاصاً (رقمياً أو ورقياً) لتخزين كل وثيقة هامة من سنة لأخرى.' : 'BBA Tip: Create a dedicated homeschool folder, digital or physical, to store every important document.'
    },
    support: {
      title: isAr ? 'كيف تدعم BBA عائلات نيويورك' : 'How BBA Supports NY Homeschool Families',
      p: isAr 
        ? 'بينما يظل الآباء مسؤولين عن الامتثال للوائح الولاية، يوفر فريقنا توجيهاً مستمراً طوال العام لضمان بقائكم في المسار الصحيح.'
        : 'While parents remain responsible for complying with state regulations, our team provides ongoing guidance throughout the school year.',
      list: [
        isAr ? 'فهم متطلبات نيويورك للتعليم المنزلي' : 'Understanding NY homeschool requirements',
        isAr ? 'إرشادات خطاب النوايا (LOI)' : 'Guidance with the Notice of Intent (LOI)',
        isAr ? 'المساعدة في فهم خطة IHIP' : 'Assistance understanding the IHIP',
        isAr ? 'إرشادات التقارير الفصلية' : 'Quarterly Report guidance',
        isAr ? 'إرشادات التقييم السنوي' : 'Annual Assessment guidance',
        isAr ? 'التخطيط للمرحلة الثانوية والتخرج' : 'High school and graduation planning',
        isAr ? 'توجيه كشوف الدرجات والتخطيط الجامعي' : 'Transcript guidance and college planning'
      ]
    },
    cta: {
      title: isAr ? 'هل لديك أسئلة؟' : 'Have Questions?',
      p: isAr ? 'رحلة كل عائلة فريدة من نوعها. نحن هنا للإجابة على استفساراتك ومناقشة أهدافك التعليمية.' : 'Every family\'s homeschooling journey is unique. We are here to help.',
      btn: isAr ? 'تواصل معنا اليوم' : 'Contact Us Today'
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
           <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
             <pattern id="ny-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
               <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
             </pattern>
             <rect width="100%" height="100%" fill="url(#ny-pattern)" />
           </svg>
        </div>
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-xs sm:text-lg text-white/80 font-bold max-w-2xl mx-auto italic">
            {t.hero.desc}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-10 relative z-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Introduction Card */}
          <Card className="rounded-2xl border-none shadow-premium overflow-hidden bg-white">
            <div className="p-8 sm:p-12 space-y-8">
               <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                  <div className="h-14 w-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                     <MapPin className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase">{t.intro.title}</h2>
               </div>
               <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-sm sm:text-lg">
                  <p>{t.intro.p1}</p>
                  <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-secondary italic">
                    {t.intro.p2}
                  </div>
               </div>
            </div>
          </Card>

          {/* Process Section */}
          <section className="space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase">{t.process.title}</h2>
              <p className="text-slate-500 font-bold text-xs sm:text-base max-w-2xl mx-auto">{t.process.intro}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {t.process.steps.map((step) => (
                <div key={step.id} className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col sm:flex-row gap-6">
                   <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl sm:text-2xl shrink-0 group-hover:scale-110 transition-transform">
                     {step.id}
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-black text-primary uppercase">{step.title}</h3>
                      <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">{step.desc}</p>
                      <div className="flex items-start gap-3 bg-secondary/5 p-4 rounded-xl">
                         <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                         <span className="text-xs sm:text-sm font-bold text-secondary italic">{step.bba}</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* College Pathways Section */}
          <section className="bg-slate-900 text-white rounded-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
               <GraduationCap className="h-32 w-32" />
            </div>
            <div className="p-8 sm:p-12 space-y-8 relative z-10">
               <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{t.college.title}</h2>
                  <p className="text-secondary font-black text-xs sm:text-lg italic">{t.college.subtitle}</p>
               </div>
               <div className="space-y-6 text-white/80 font-medium text-sm sm:text-lg leading-relaxed">
                  <p>{t.college.p1}</p>
                  <p>{t.college.p2}</p>
                  <div className="bg-white/10 p-6 rounded-xl border border-white/20 flex items-center gap-4">
                     <Target className="h-6 w-6 text-secondary" />
                     <span className="font-bold text-xs sm:text-base">{t.college.bba}</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <div className="space-y-8">
                <h2 className="text-2xl font-black text-primary uppercase flex items-center gap-3">
                   <XCircle className="h-6 w-6 text-red-500" />
                   {t.mistakes.title}
                </h2>
                <p className="text-slate-500 font-bold">{t.mistakes.p}</p>
                <div className="space-y-4">
                   {t.mistakes.items.map((item, idx) => (
                     <div key={idx} className="flex items-start gap-3 p-4 bg-red-50/50 rounded-xl border border-red-100/50">
                        <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-bold text-slate-700">{item}</span>
                     </div>
                   ))}
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-400 flex items-center gap-4">
                   <Lightbulb className="h-6 w-6 text-amber-500" />
                   <span className="text-xs sm:text-sm font-black text-amber-900">{t.mistakes.tip}</span>
                </div>
             </div>

             <div className="bg-primary text-white p-8 sm:p-10 rounded-2xl shadow-xl space-y-8">
                <h2 className="text-2xl font-black uppercase tracking-tight border-b border-white/10 pb-4">{t.support.title}</h2>
                <p className="text-white/70 font-medium text-sm leading-relaxed">{t.support.p}</p>
                <ul className="space-y-4">
                   {t.support.list.map((item, idx) => (
                     <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                        <span className="text-xs sm:text-sm font-bold opacity-90">{item}</span>
                     </li>
                   ))}
                </ul>
             </div>
          </section>

          {/* Call to Action */}
          <div className="bg-secondary p-10 sm:p-16 rounded-2xl shadow-2xl relative overflow-hidden text-center space-y-8 group border-b-8 border-primary">
             <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">{t.cta.title}</h2>
                <p className="text-sm sm:text-xl text-white/90 font-bold italic">
                   {t.cta.p}
                </p>
                <div className="pt-6 flex justify-center">
                  <Button asChild className="bg-primary hover:bg-white hover:text-primary text-white font-black rounded-xl px-10 h-14 sm:h-16 text-sm sm:text-lg transition-all shadow-xl active:scale-95">
                    <Link href={`/${lang}/contact`} className="flex items-center gap-3">
                      {t.cta.btn}
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
