'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  Rocket, 
  BookOpen, 
  Trophy,
  Target,
  Zap,
  GraduationCap,
  Laptop,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              ? 'كل ما تحتاج معرفته لضمان عام دراسي متميز ونتائج أكاديمية قوية في BBA.' 
              : 'Everything you need to know for a successful school year and strong academic results at BBA.'}
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
                  ].map((step, idx) => (
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

          {/* Encouragement Footer */}
          <div className="bg-primary text-white p-10 sm:p-16 rounded-2xl shadow-2xl relative overflow-hidden text-center space-y-8 border-b-8 border-secondary group">
             <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <div className="flex justify-center">
                   <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                      <Zap className="h-8 w-8 text-secondary" />
                   </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">{isAr ? 'نحن معك في كل خطوة' : 'With You Every Step'}</h2>
                  <p className="text-sm sm:text-lg opacity-80 font-bold leading-relaxed italic max-w-lg mx-auto">
                     {isAr ? 'هل لديك أسئلة فنية أو أكاديمية؟ لا تتردد في مراجعة قسم الأسئلة الشائعة أو التواصل معنا.' : 'Do you have technical or academic questions? Feel free to check the FAQs or contact us.'}
                  </p>
                </div>
                
                <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-xl px-10 h-14 transition-all shadow-xl active:scale-95 border-2 border-transparent hover:border-secondary">
                    <Link href={`/${lang}/contact`} className="flex items-center gap-3">
                      {isAr ? 'تواصل معنا' : 'Contact us'}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary font-black rounded-xl px-10 h-14 transition-all shadow-xl">
                    <Link href={`/${lang}/faq`} className="flex items-center gap-3">
                      {isAr ? 'الأسئلة الشائعة' : 'Read FAQs'}
                      {isAr ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
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
