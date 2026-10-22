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
  BookOpen
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

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
              {isAr ? 'مركز موارد نيويورك للتعليم المنزلي' : 'New York Homeschool Resource Center'}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-xs sm:text-xl text-white/80 font-bold max-w-2xl mx-auto italic">
            {isAr 
              ? 'كل ما تحتاج لمعرفته حول التعليم المنزلي في ولاية نيويورك. نحن هنا لتبسيط اللوائح وتوجيهك.' 
              : 'Everything You Need to Know About Homeschooling in New York.'}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-10 relative z-20 px-4">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* Intro */}
          <section className="bg-white p-8 sm:p-12 rounded-2xl border-none shadow-premium space-y-8">
             <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                <div className="h-14 w-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                   <MapPin className="h-8 w-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase">{isAr ? 'التعليم المنزلي في نيويورك' : 'Homeschooling in New York'}</h2>
             </div>
             <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-sm sm:text-lg">
                <p>{isAr ? 'تتمتع ولاية نيويورك ببعض من أكثر لوائح التعليم المنزلي تفصيلاً في الولايات المتحدة. نحن نساعد العائلات على فهم هذه المتطلبات بثقة.' : 'New York has some of the most comprehensive homeschool regulations in the United States. While the process may seem overwhelming at first, understanding the requirements becomes much easier with the right guidance.'}</p>
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-secondary italic font-bold text-primary">
                  {isAr ? 'في BBA، قضينا سنوات في دعم عائلات نيويورك وتوفير معلومات موثوقة وإرشادات عملية.' : 'At Baneen and Banaat Academy (BBA), we have spent years supporting homeschool families in New York and helping parents understand state requirements.'}
                </div>
             </div>
          </section>

          {/* The Process - 4 Steps */}
          <section className="space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase">{isAr ? 'عملية التعليم المنزلي في نيويورك' : 'The Homeschool Process in New York'}</h2>
              <p className="text-slate-500 font-bold max-w-2xl mx-auto">{isAr ? 'أربعة متطلبات أساسية يكملها معظم أولياء الأمور كل عام دراسي.' : 'Overview of the four primary requirements most homeschool families complete each school year.'}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {[
                { 
                  id: 1, 
                  t: isAr ? 'الخطوة 1: خطاب النوايا (LOI)' : 'Step 1 — Notice of Intent (LOI)', 
                  d: isAr ? 'رسالة تبلغ المنطقة التعليمية بأنك تنوي تعليم طفلك منزلياً للعام الدراسي القادم.' : 'A simple letter informing your local school district that you intend to homeschool your child.',
                  bba: isAr ? 'نقدم توجيهاً خطوة بخطوة حول متى وكيف يتم تقديم هذا الخطاب.' : 'Our team provides step-by-step guidance on when and how to submit.'
                },
                { 
                  id: 2, 
                  t: isAr ? 'الخطوة 2: خطة IHIP' : 'Step 2 — Individualized Home Instruction Plan (IHIP)', 
                  d: isAr ? 'توضح الخطة التعليمية للعام الدراسي والمواد التي سيتم تدريسها وفقاً للوائح.' : 'Outlines the educational plan and subjects that will be taught for the school year.',
                  bba: isAr ? 'نساعد العائلات في فهم المتطلبات ونوجههم أثناء إعداد الخطة لضمان ثقتهم.' : 'We help families understand requirements and guide them during IHIP preparation.'
                },
                { 
                  id: 3, 
                  t: isAr ? 'الخطوة 3: التقارير الفصلية' : 'Step 3 — Quarterly Reports', 
                  d: isAr ? 'تقارير توثق التقدم التعليمي، بما في ذلك الحضور والمواد التي تمت تغطيتها.' : 'Reports documenting student progress, including attendance and subjects covered.',
                  bba: isAr ? 'نقوم بإعداد هذه التقارير لطلابنا وتذكير العائلات بالمواعيد النهائية لتقليل التوتر.' : 'We prepare these reports for BBA students and remind families of deadlines.'
                },
                { 
                  id: 4, 
                  t: isAr ? 'الخطوة 4: التقييم السنوي' : 'Step 4 — Annual Assessment', 
                  d: isAr ? 'في نهاية العام، يكمل الطلاب تقييماً (اختباراً موحداً أو طريقة تقييم أخرى مسموح بها).' : 'Completion of a standardized assessment or another evaluation method at the end of the year.',
                  bba: isAr ? 'نساعد العائلات في فهم متطلبات التقييم وإعداد الوثائق اللازمة.' : 'We assist BBA families in understanding assessment requirements and documentation.'
                }
              ].map((step) => (
                <div key={step.id} className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group">
                   <div className="flex flex-col sm:flex-row gap-6">
                      <div className="h-16 w-16 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-2xl shrink-0 group-hover:scale-110 transition-transform">{step.id}</div>
                      <div className="space-y-4 flex-1">
                         <h3 className="text-xl font-black text-primary uppercase">{step.t}</h3>
                         <p className="text-slate-500 font-medium leading-relaxed">{step.d}</p>
                         <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/20">
                            <p className="text-sm font-black text-secondary uppercase tracking-tight flex items-center gap-2">
                               <CheckCircle2 className="h-4 w-4" /> {isAr ? 'كيف تساعد BBA' : 'How BBA Helps'}
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-slate-700 mt-2 italic">{step.bba}</p>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* College Pathways */}
          <section className="bg-slate-900 text-white rounded-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
               <GraduationCap className="h-32 w-32" />
            </div>
            <div className="p-8 sm:p-12 space-y-8 relative z-10">
               <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase">{isAr ? 'المسارات الجامعية لطلاب نيويورك' : 'College Pathways for New York Homeschool Students'}</h2>
                  <p className="text-secondary font-black italic">{isAr ? 'الاستعداد للجامعة يبدأ قبل التخرج بوقت طويل' : 'Preparing for College Starts Long Before Graduation'}</p>
               </div>
               <div className="space-y-6 text-white/80 font-medium text-sm sm:text-lg leading-relaxed">
                  <p>{isAr ? 'هل سيتمكن طفلي من دخول الجامعة بعد التعليم المنزلي؟ الإجابة هي نعم. خريجو نيويورك يكملون تعليمهم في أفضل الجامعات.' : 'Will my child be able to attend college after homeschooling? The answer is YES. Every year, New York homeschool graduates continue their education throughout New York and across the US.'}</p>
                  <p>{isAr ? 'يجب الحفاظ على سجلات منظمة تشمل كشوف الدرجات، الحضور، والوثائق المتعلقة بالبرنامج.' : 'Families should maintain organized academic records, including transcripts, grades, and homeschool records.'}</p>
                  <div className="bg-white/10 p-6 rounded-xl border border-white/20 flex items-center gap-4">
                     <Target className="h-6 w-6 text-secondary" />
                     <span className="font-bold text-xs sm:text-base">{isAr ? 'كيف تساعد BBA: نوفر توجيهاً شخصياً لمساعدة الطلاب على الاستعداد للقبول الجامعي بثقة.' : 'How BBA Helps: We provide personalized guidance throughout the high school years to help students plan for college.'}</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Mistakes to Avoid */}
          <section className="space-y-8">
             <h2 className="text-2xl font-black text-primary uppercase flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-500" />
                {isAr ? 'أخطاء شائعة يجب تجنبها' : 'Common Mistakes to Avoid'}
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   {[
                     isAr ? 'تأخير تقديم الوثائق المطلوبة.' : 'Submitting required documents late.',
                     isAr ? 'عدم الاحتفاظ بنسخ من السجلات الهامة.' : 'Failing to retain important records.',
                     isAr ? 'تأجيل التفكير في التخرج والجامعة.' : 'Delaying graduation and college planning.',
                     isAr ? 'افتراض تشابه شروط القبول في كافة الكليات.' : 'Assuming all colleges have identical requirements.',
                     isAr ? 'تجاوز المواعيد النهائية للمنطقة التعليمية.' : 'Missing school district deadlines.'
                   ].map((item, idx) => (
                     <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                        <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-sm font-bold text-slate-700">{item}</span>
                     </div>
                   ))}
                </div>
                <div className="bg-amber-50 p-8 rounded-2xl border-l-4 border-amber-400 flex flex-col justify-center gap-4">
                   <Lightbulb className="h-10 w-10 text-amber-500" />
                   <p className="text-sm sm:text-base font-black text-amber-900 italic">
                      {isAr ? 'نصيحة BBA: أنشئ مجلداً خاصاً (رقمياً أو ورقياً) لتخزين كل وثيقة هامة من سنة لأخرى.' : 'BBA Tip: Create a dedicated homeschool folder, digital, physical, or both, to store every important document from year to year.'}
                   </p>
                </div>
             </div>
          </section>

          {/* BBA Support Areas */}
          <section className="bg-primary text-white p-8 sm:p-12 rounded-2xl space-y-10 shadow-2xl">
             <h2 className="text-2xl font-black uppercase text-center border-b border-white/10 pb-4">{isAr ? 'كيف تدعم BBA عائلات نيويورك' : 'How BBA Supports NY Homeschool Families'}</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  isAr ? 'فهم متطلبات نيويورك للتعليم المنزلي' : 'Understanding NY homeschool requirements',
                  isAr ? 'إرشادات خطاب النوايا (LOI)' : 'Notice of Intent guidance',
                  isAr ? 'المساعدة في فهم خطة IHIP' : 'IHIP guidance',
                  isAr ? 'إرشادات التقارير الفصلية' : 'Quarterly Report guidance',
                  isAr ? 'إرشادات التقييم السنوي' : 'Annual Assessment guidance',
                  isAr ? 'التخطيط للمرحلة الثانوية والتخرج' : 'High school planning',
                  isAr ? 'توجيه كشوف الدرجات' : 'Transcript guidance',
                  isAr ? 'التخطيط التعليمي الشخصي' : 'Graduation planning',
                  isAr ? 'دعم عائلي مستمر' : 'Ongoing family support'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                     <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                     <span className="text-xs sm:text-sm font-bold opacity-90">{item}</span>
                  </div>
                ))}
             </div>
             <p className="text-center text-[10px] sm:text-xs text-white/50 pt-6 border-t border-white/10">
                {isAr ? '* يظل أولياء الأمور مسؤولين عن الامتثال للوائح التعليم المنزلي في ولاية نيويورك.' : 'Parents remain responsible for complying with New York State homeschool regulations.'}
             </p>
          </section>

          {/* Final CTA */}
          <div className="text-center space-y-8 bg-slate-50 p-12 rounded-2xl border border-slate-100 shadow-premium">
             <h2 className="text-2xl sm:text-4xl font-black text-primary uppercase">{isAr ? 'هل لديك أسئلة؟' : 'Have Questions?'}</h2>
             <p className="text-sm sm:text-xl text-slate-500 font-bold max-w-2xl mx-auto italic">
                {isAr ? 'رحلة كل عائلة فريدة من نوعها. نحن هنا للإجابة على استفساراتك ومناقشة أهدافك.' : 'Every family\'s homeschooling journey is unique. We are here to help.'}
             </p>
             <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white font-black rounded-xl h-16 px-10 shadow-xl transition-all active:scale-95">
               <Link href={`/${lang}/contact`} className="flex items-center gap-3">
                 {isAr ? 'تواصل معنا الآن' : 'Contact BBA'}
                 {isAr ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
               </Link>
             </Button>
          </div>

        </div>
      </div>
    </div>
  );
}