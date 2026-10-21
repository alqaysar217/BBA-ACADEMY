
'use client';

import { use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { Star, Quote, Users, MessageSquare, ArrowRight, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const getTestimonials = (isAr: boolean) => [
  {
    initial: 'S',
    name: isAr ? 'سارة م.' : 'Sarah M.',
    role: isAr ? 'ولي أمر - نيويورك' : 'Parent - New York',
    text: isAr 
      ? 'لقد غيرت الأكاديمية حياة أطفالي تماماً. التوازن بين المواد الأكاديمية الأمريكية والقرآن الكريم رائع جداً. أشعر بالراحة لأن أطفالي يتعلمون في بيئة تحترم قيمنا.'
      : "The academy has completely changed my children's lives. The balance between American academics and the Holy Quran is wonderful. I feel at peace knowing my children learn in an environment that respects our values."
  },
  {
    initial: 'A',
    name: isAr ? 'أحمد ك.' : 'Ahmed K.',
    role: isAr ? 'ولي أمر - ميشيغان' : 'Parent - Michigan',
    text: isAr 
      ? 'أفضل قرار اتخذته لعائلتي كان التسجيل في BBA. المرونة في الوقت وجودة التعليم ساعدت ابني على التميز والتفوق بشكل لم أكن أتوقعه.'
      : 'The best decision I made for my family was enrolling in BBA. Time flexibility and quality of education helped my son excel in ways I didn’t expect.'
  },
  {
    initial: 'N',
    name: isAr ? 'نورة ح.' : 'Noura H.',
    role: isAr ? 'ولي أمر - تكساس' : 'Parent - Texas',
    text: isAr 
      ? 'التعليم عبر الإنترنت هنا مختلف تماماً، تشعر أنك في مدرسة حقيقية بفضل التواصل المستمر مع المدرسين وإدارة محترفة تتابع كل صغيرة وكبيرة.'
      : 'Online education here is completely different; you feel like you are in a real school thanks to the constant communication with teachers and a professional administration.'
  },
  {
    initial: 'M',
    name: isAr ? 'مريم ر.' : 'Mariam R.',
    role: isAr ? 'ولي أمر - فرجينيا' : 'Parent - Virginia',
    text: isAr 
      ? 'نظام Edgenuity مع توجيه BBA جعل ابني أكثر استقلالية ومسؤولية. المعلمون متعاونون جداً ويجيبون على كافة استفساراتنا بسرعة.'
      : 'The Edgenuity system with BBA guidance made my son more independent. The teachers are very helpful and answer all our inquiries quickly.'
  },
  {
    initial: 'Y',
    name: isAr ? 'ياسين ب.' : 'Yassine B.',
    role: isAr ? 'ولي أمر - نيوجيرسي' : 'Parent - New Jersey',
    text: isAr 
      ? 'أقدر جداً التركيز على الهوية الإسلامية واللغة العربية بجانب المنهج القوي. ابني الآن يقرأ القرآن بتجويد أفضل بكثير بفضل الله ثم الأكاديمية.'
      : 'I truly appreciate the focus on Islamic identity and Arabic alongside a strong curriculum. My son now reads Quran with much better Tajweed.'
  },
  {
    initial: 'L',
    name: isAr ? 'ليلى س.' : 'Layla S.',
    role: isAr ? 'ولي أمر - أوهايو' : 'Parent - Ohio',
    text: isAr 
      ? 'شكراً لكل القائمين على هذا العمل العظيم. ابنتي متحمسة دائماً لحضور حصصها المباشرة وتكوين صداقات مع طالبات من مختلف الولايات.'
      : 'Thank you to everyone behind this great work. My daughter is always excited to attend her live classes and make friends with students from different states.'
  }
];

export default function TestimonialsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const testimonials = getTestimonials(isAr);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-primary pt-24 pb-16 relative overflow-hidden text-center">
        <div className="absolute inset-0">
           <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
             <pattern id="test-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
               <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
             </pattern>
             <rect width="100%" height="100%" fill="url(#test-pattern)" />
           </svg>
        </div>
        
        <div className="container-tight relative z-10 space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {isAr ? 'آراء أولياء الأمور' : 'Parents\' Testimonials'}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-xs sm:text-lg text-white/80 font-bold max-w-2xl mx-auto leading-relaxed italic">
            {isAr 
              ? 'تجارب حقيقية ترويها عائلاتنا حول رحلة أبنائهم التعليمية في أكاديمية بنين وبنات.' 
              : 'Real experiences shared by our families about their children\'s educational journey at BBA Academy.'}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-8 relative z-20 px-4">
        {/* Intro Card */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-100 shadow-premium mb-12 text-center space-y-4">
           <div className="flex justify-center gap-1 text-amber-400">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 fill-current" />)}
           </div>
           <h2 className="text-xl sm:text-2xl font-black text-primary uppercase">
              {isAr ? 'مجتمعنا يثق بنا' : 'Our Community Trusts Us'}
           </h2>
           <p className="text-slate-500 font-bold max-w-xl mx-auto text-sm sm:text-base">
              {isAr 
                ? 'فخورون بكوننا شريكاً تعليمياً لأكثر من 300 عائلة عبر الولايات المتحدة، نسعى دائماً لتقديم الأفضل لأبنائنا.' 
                : 'Proud to be an educational partner for over 300 families across the US, always striving for the best for our children.'}
           </p>
        </div>

        {/* Grid of Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
           {testimonials.map((test, idx) => (
             <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                   <Quote className="h-16 w-16" />
                </div>
                
                {/* Compact Profile Section */}
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shrink-0 border-2 border-white ring-1 ring-slate-100">
                      {test.initial}
                   </div>
                   <div className="min-w-0 text-start space-y-0.5">
                      <div className="font-black text-primary text-sm sm:text-base truncate">{test.name}</div>
                      <div className="text-[10px] font-bold text-secondary uppercase truncate">{test.role}</div>
                   </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-600 font-bold italic leading-relaxed text-xs sm:text-sm flex-1 opacity-90 border-t border-slate-50 pt-6">
                   "{test.text}"
                </p>
             </div>
           ))}
        </div>

        {/* Call to Action Footer */}
        <div className="mt-20 p-10 sm:p-16 bg-slate-900 text-white rounded-2xl shadow-2xl relative overflow-hidden text-center space-y-8 group border-b-8 border-secondary">
           <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
              <MessageSquare className="h-48 w-48" />
           </div>
           <div className="relative z-10 space-y-6">
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                 {isAr ? 'هل تود مشاركتنا تجربتك؟' : 'Want to share your experience?'}
              </h2>
              <p className="text-sm sm:text-xl text-white/70 font-bold max-w-2xl mx-auto italic">
                 {isAr 
                    ? 'يسعدنا دائماً سماع قصص نجاح طلابنا. تواصل معنا لمشاركة انطباعك.' 
                    : 'We always love to hear our students\' success stories. Contact us to share your feedback.'}
              </p>
              <div className="pt-6 flex justify-center">
                 <Button asChild className="bg-secondary hover:bg-white hover:text-secondary text-white font-black h-14 sm:h-16 px-10 rounded-xl transition-all shadow-xl active:scale-95 group/btn">
                    <Link href={`/${lang}/contact`} className="flex items-center gap-3">
                       {isAr ? 'شاركنا تجربتك الآن' : 'Share your story now'}
                       {isAr ? <ArrowLeft className="h-5 w-5 group-hover/btn:-translate-x-2 transition-transform" /> : <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />}
                    </Link>
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
