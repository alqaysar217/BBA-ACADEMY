import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import { Target, Users, ArrowRight, ArrowLeft, History, Star, Lightbulb, Heart, ShieldCheck, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === 'ar';
  return {
    title: isAr ? 'قصتنا' : 'Our Story',
    description: isAr 
      ? 'اكتشف كيف بدأت أكاديمية بنين وبنات وكيف تطورت لتصبح شريكاً تعليمياً موثوقاً.' 
      : 'Discover how Baneen and Banaat Academy started and evolved into a trusted educational partner.',
  };
}

export default async function OurStoryPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'قصتنا' : 'Our Story',
    heroQuote: isAr ? 'كل رحلة رائعة تبدأ بهدف بسيط.' : 'Every great journey begins with a simple purpose.',
    intro: {
      question: isAr ? 'لماذا يجب على العائلات الاختيار بين التميز الأكاديمي والقيم التي يريدون الحفاظ عليها؟' : 'Why should families have to choose between academic excellence and the values they want to preserve?',
      text: isAr 
        ? 'بدأت رحلتنا بسؤال ألهم رؤيتنا لسنوات: إنشاء مؤسسة تعليمية حيث يمكن للطلاب تلقي تعليم عالي الجودة مع البقاء على اتصال بعقيدتهم ولغتهم وثقافتهم وهويتهم.'
        : 'Ours began with a question that inspired a vision for years: to create an educational institution where students could receive a high-quality education while remaining connected to their faith, language, culture, and identity.',
      vision: isAr
        ? 'لم يكن الهدف أبداً مجرد فتح مدرسة أخرى. كان الهدف بناء مكان ينمو فيه الإنجاز الأكاديمي وتنمية الشخصية معاً، وحيث يتم دائماً تقدير العائلات كشركاء في رحلة أطفالهم التعليمية.'
        : 'The goal was never simply to open another school. It was to build a place where academic achievement and character development would grow together, and where families would always be valued as partners in their children\'s educational journey.'
    },
    milestonesTitle: isAr ? 'معالمنا ونمونا' : 'Our Milestones & Growth',
    milestones: [
      {
        year: '2019',
        title: isAr ? 'تأسيس الأكاديمية' : 'Academy Foundation',
        content: isAr 
          ? 'بعد سنوات من التخطيط والإعداد، أصبح هذا الطموح حقيقة واقعة بتأسيس أكاديمية بنين وبنات. فتحت الأكاديمية أبوابها لأول مرة للطالبات، حيث وفرت بيئة تعليمية تتمحور حول التميز الأكاديمي والقيم الأخلاقية القوية والنمو الشخصي.'
          : 'After years of planning and preparation, that vision became a reality with the founding of Baneen and Banaat Academy. The academy first opened its doors to female students, providing a learning environment centered on academic excellence and personal growth.'
      },
      {
        year: '2023',
        title: isAr ? 'التوسع والنمو' : 'Expansion & Growth',
        content: isAr
          ? 'مع تزايد ثقة العائلات في مهمتنا، توسعت أكاديمية بنين وبنات من خلال افتتاح قسم للبنين وإنشاء حرم جامعي ثانٍ، مما سمح لمزيد من العائلات بالاستفادة من الفلسفة التعليمية للأكاديمية والنهج المتمحور حول الطالب.'
          : 'As more families placed their trust in our mission, BBA expanded by opening a boys\' division and establishing a second campus, allowing more families to benefit from our student-centered approach.'
      },
      {
        year: isAr ? 'التوسع الرقمي' : 'Digital Expansion',
        title: isAr ? 'التعليم عن بعد' : 'Remote Learning',
        content: isAr
          ? 'استجابة لأولياء الأمور في جميع أنحاء الولايات المتحدة، أطلقت الأكاديمية برامجها للتعلم عن بعد—بدءاً بطلاب المرحلتين المتوسطة والثانوية قبل التوسع إلى مستويات دراسية إضافية وبرامج متخصصة، بما في ذلك برامج عطلة نهاية الأسبوع.'
          : 'In response to parents nationwide, the academy launched remote learning programs—initially for middle and high school before expanding to additional levels and specialized weekend programs.'
      }
    ],
    principle: {
      title: isAr ? 'مبدأنا الأساسي' : 'Our Core Principle',
      main: isAr ? 'التعليم يكون في أقوى حالاته عندما تعمل المدارس والعائلات معاً.' : 'Education is strongest when schools and families work together.',
      sub: isAr
        ? 'نحن نؤمن بأن الآباء هم المعلمون الأوائل للطفل، وأن النجاح المستدام يتحقق عندما يعمل المعلمون والعائلات كشركاء نحو نفس الهدف. هذا الاعتقاد يستمر في تشكيل كل قرار نتخذه.'
        : 'We believe parents are a child\'s first teachers, and lasting success is achieved when educators and families work as partners toward the same goal. This belief continues to shape every decision we make.',
      conclusion: isAr
        ? 'في أكاديمية بنين وبنات، التعليم يتعلق ببناء الشخصية، وإلهام الثقة، وتقوية العائلات، وإعداد الطلاب لنجاح طويل الأمد.'
        : 'At Baneen and Banaat Academy, education is about building character, inspiring confidence, strengthening families, and preparing students for lifelong success.'
    },
    closing: {
      text: isAr 
        ? 'قصتنا لا تزال تُكتب. وسيكون من دواعي سرورنا أن تصبح عائلتكم جزءاً منها.'
        : 'Our story is still being written. And we would be honored for your family to become part of it.',
      btn: isAr ? 'كن جزءاً من قصتنا' : 'Become Part of Our Story'
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="story-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#story-grid)" />
          </svg>
        </div>
        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto space-y-12 text-center">
            <div className="space-y-4">
               <h1 className="text-3xl lg:text-6xl font-black text-primary uppercase tracking-tight">{t.title}</h1>
               <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            </div>
            
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-4 lg:p-10 shadow-premium overflow-hidden group">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-2xl">
                <Image src="/story.png" alt="BBA Academy History" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority unoptimized />
                <div className="absolute inset-0 bg-primary/20" />
              </div>
              <div className="space-y-6">
                <p className="text-xl lg:text-3xl font-black text-secondary italic leading-tight">
                  "{t.heroQuote}"
                </p>
                <div className="h-0.5 w-16 bg-slate-100 mx-auto" />
                <p className="text-slate-500 font-bold text-sm lg:text-lg uppercase tracking-[0.2em]">Baneen & Banaat Academy Journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Question Section */}
      <section className="py-20 lg:py-32 container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="h-1 w-12 bg-secondary rounded-full" />
              <h2 className="text-2xl lg:text-4xl font-black text-primary leading-tight">
                {t.intro.question}
              </h2>
            </div>
            <div className="space-y-8 text-slate-600 font-medium text-lg leading-relaxed">
              <p className="text-primary font-black text-xl lg:text-2xl italic border-l-4 border-secondary pl-6">
                {t.intro.text}
              </p>
              <p>{t.intro.vision}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-8 lg:p-16 rounded-[3rem] border border-slate-100 relative shadow-inner group">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Lightbulb className="h-32 w-32 text-secondary group-hover:scale-110 transition-transform" />
             </div>
             <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg">
                      <Target className="h-6 w-6" />
                   </div>
                   <h3 className="text-xl font-black text-primary uppercase tracking-widest">{isAr ? 'رؤيتنا الأصلية' : 'Our Original Vision'}</h3>
                </div>
                <p className="text-slate-700 font-bold leading-relaxed italic">
                  {isAr 
                    ? 'لم يكن هدفنا أبداً مجرد بناء جدران وفصول دراسية، بل بناء هوية ومستقبل يحافظ فيه الطالب على اعتزازه بدينه ولغته في قلب المجتمع الأمريكي.'
                    : 'Our goal was never just about building walls and classrooms, but building an identity and a future where students maintain pride in their faith and language in the heart of American society.'}
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 lg:py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="1.5" fill="white" />
           </svg>
        </div>
        <div className="container-tight relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight">{t.milestonesTitle}</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {t.milestones.map((milestone, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-10 rounded-[2.5rem] space-y-6 hover:bg-white/10 transition-all duration-500 group">
                <div className="flex justify-between items-start">
                   <span className="text-4xl lg:text-6xl font-black text-secondary/30 group-hover:text-secondary transition-colors">{milestone.year}</span>
                   <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shadow-xl">
                      {idx === 0 ? <History className="h-6 w-6 text-secondary" /> : idx === 1 ? <Users className="h-6 w-6 text-secondary" /> : <ShieldCheck className="h-6 w-6 text-secondary" />}
                   </div>
                </div>
                <div className="space-y-4">
                   <h3 className="text-xl font-black uppercase tracking-tight text-secondary">{milestone.title}</h3>
                   <p className="text-white/70 font-medium leading-relaxed text-sm lg:text-base">
                     {milestone.content}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principle Section */}
      <section className="py-20 lg:py-32 container-tight">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
               <h2 className="text-2xl lg:text-4xl font-black text-primary uppercase tracking-tight">{t.principle.title}</h2>
               <div className="h-1 w-16 bg-secondary mx-auto rounded-full" />
            </div>

            <div className="bg-slate-900 text-white p-10 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                  <Heart className="h-48 w-48 fill-secondary" />
               </div>
               <div className="relative z-10 space-y-8">
                  <h3 className="text-2xl lg:text-4xl font-black leading-tight text-secondary">
                    "{t.principle.main}"
                  </h3>
                  <div className="space-y-6 text-white/80 font-bold text-sm lg:text-xl leading-relaxed italic border-t border-white/10 pt-8">
                    <p>{t.principle.sub}</p>
                    <p className="text-white not-italic">{t.principle.conclusion}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Stats Quick Glance */}
      <section className="pb-20 lg:pb-32 container-tight">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: isAr ? 'طلاب متفوقون' : 'Guided Students', val: '300+', icon: GraduationCap },
              { label: isAr ? 'عام من التميز' : 'Years of Excellence', val: '7+', icon: Star },
              { label: isAr ? 'ولايات نخدمها' : 'States Served', val: '50', icon: ShieldCheck },
              { label: isAr ? 'شراكات ناجحة' : 'Family Partnerships', val: '100%', icon: Users },
            ].map((stat, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm text-center space-y-3 hover:shadow-xl transition-all group">
                 <div className="h-12 w-12 rounded-xl bg-slate-50 text-secondary mx-auto flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                    <stat.icon className="h-6 w-6" />
                 </div>
                 <div className="text-2xl lg:text-4xl font-black text-primary">{stat.val}</div>
                 <div className="text-[10px] lg:text-xs font-black uppercase text-slate-400 tracking-widest">{stat.label}</div>
              </div>
            ))}
         </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-32 bg-slate-50 border-t border-slate-100">
        <div className="container-tight text-center space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl lg:text-5xl font-black text-primary tracking-tight leading-tight max-w-3xl mx-auto">
              {t.closing.text}
            </h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          
          <div className="pt-6">
            <Button asChild size="lg" className="h-16 lg:h-20 px-10 lg:px-16 text-lg lg:text-2xl font-black bg-secondary hover:bg-primary text-white rounded-2xl shadow-2xl transition-all border-4 border-transparent hover:border-secondary active:scale-95 group">
              <Link href={`/${lang}/enroll`} className="flex items-center gap-4">
                {t.closing.btn}
                {isAr ? <ArrowLeft className="mr-3 h-8 w-8 group-hover:-translate-x-2 transition-transform" /> : <ArrowRight className="ml-3 h-8 w-8 group-hover:translate-x-2 transition-transform" />}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
