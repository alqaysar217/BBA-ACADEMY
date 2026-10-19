import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import { Quote, History, Target, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
        content: isAr 
          ? 'بعد سنوات من التخطيط والإعداد، أصبح هذا الطموح حقيقة واقعة بتأسيس أكاديمية بنين وبنات. فتحت الأكاديمية أبوابها لأول مرة للطالبات، حيث وفرت بيئة تعليمية تتمحور حول التميز الأكاديمي والقيم الأخلاقية القوية والنمو الشخصي.'
          : 'After years of planning and preparation, that vision became a reality with the founding of Baneen and Banaat Academy. The academy first opened its doors to female students, providing a learning environment centered on academic excellence, strong ethical values, and personal growth.'
      },
      {
        year: '2023',
        content: isAr
          ? 'مع تزايد ثقة العائلات في مهمتنا، توسعت أكاديمية بنين وبنات من خلال افتتاح قسم للبنين وإنشاء حرم جامعي ثانٍ، مما سمح لمزيد من العائلات بالاستفادة من الفلسفة التعليمية للأكاديمية والنهج المتمحور حول الطالب.'
          : 'As more families placed their trust in our mission, Baneen and Banaat Academy expanded by opening a boys\' division and establishing a second campus, allowing even more families to benefit from the academy\'s educational philosophy and student-centered approach.'
      },
      {
        year: isAr ? 'التوسع الرقمي' : 'Digital Expansion',
        content: isAr
          ? 'استجابة لأولياء الأمور في جميع أنحاء الولايات المتحدة، أطلقت الأكاديمية برامجها للتعلم عن بعد—بدءاً بطلاب المرحلتين المتوسطة والثانوية قبل التوسع إلى مستويات دراسية إضافية وبرامج متخصصة، بما في ذلك برامج عطلة نهاية الأسبوع ومبادرات تعليم الكبار.'
          : 'In response to parents across the United States, the academy launched its remote learning programs—initially serving middle and high school students before expanding to additional grade levels and specialized programs, including weekend learning opportunities and adult education initiatives.'
      }
    ],
    principle: {
      title: isAr ? 'مبدأنا الأساسي' : 'Our Core Principle',
      main: isAr ? 'التعليم يكون في أقوى حالاته عندما تعمل المدارس والعائلات معاً.' : 'Education is strongest when schools and families work together.',
      sub: isAr
        ? 'نحن نؤمن بأن الآباء هم المعلمون الأوائل للطفل، وأن النجاح المستدام يتحقق عندما يعمل المعلمون والعائلات كشركاء نحو نفس الهدف. هذا الاعتقاد يستمر في تشكيل كل قرار نتخذه.'
        : 'We believe parents are a child\'s first teachers, and lasting success is achieved when educators and families work as partners toward the same goal. That belief continues to shape every decision we make.',
      conclusion: isAr
        ? 'في أكاديمية بنين وبنات، التعليم يتعلق ببناء الشخصية، وإلهام الثقة، وتقوية العائلات، وإعداد الطلاب لنجاح طويل الأمد.'
        : 'At Baneen and Banaat Academy, education is about building character, inspiring confidence, strengthening families, and preparing students for lifelong success.'
    },
    closing: "Our story is still being written. And we would be honored for your family to become part of it."
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 border-b border-slate-100">
        <div className="container-tight">
          <div className="max-w-4xl mx-auto space-y-12 text-center">
            {/* Page Title */}
            <h1 className="text-3xl lg:text-5xl font-black text-primary tracking-tight">
              {t.title}
            </h1>

            {/* Hero Card with Image and Phrase */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-4 lg:p-6 shadow-2xl overflow-hidden">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-8">
                <Image 
                  src="/story.png" 
                  alt="BBA Story" 
                  fill 
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              <div className="pb-6 px-4">
                <p className="text-xl lg:text-2xl font-black text-secondary italic">
                  {t.heroQuote}
                </p>
              </div>
            </div>

            {/* Intro Questions and Text */}
            <div className="space-y-8 text-slate-600 leading-relaxed font-medium text-lg text-start mt-16">
              <h2 className="text-2xl lg:text-3xl font-black text-primary leading-tight">
                {t.intro.question}
              </h2>
              <p className="text-primary font-black text-xl leading-snug border-l-4 border-secondary pl-6">
                {t.intro.text}
              </p>
              <p>{t.intro.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-24 bg-slate-50/50">
        <div className="container-tight">
          <div className="mb-16 text-center">
            <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tight">
              {t.milestonesTitle}
            </h2>
            <div className="h-1 w-12 bg-secondary mx-auto mt-4" />
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {t.milestones.map((milestone, idx) => (
              <div key={idx} className="space-y-4">
                {/* Year Title Alone on Top */}
                <div className="text-2xl lg:text-3xl font-black text-secondary px-2">
                  {milestone.year}
                </div>
                {/* Card with Text Content */}
                <div className="bg-white border border-slate-200 rounded-xl p-8 lg:p-12 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-slate-600 leading-relaxed font-medium text-base lg:text-lg">
                    {milestone.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principle Section */}
      <section className="py-20 lg:py-24">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[16/10] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/partnership/800/800" 
                alt="Academy Core Principle" 
                fill 
                className="object-cover"
                data-ai-hint="school family partnership"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-secondary" />
                  <h2 className="text-xl lg:text-2xl font-black text-primary uppercase tracking-tight">
                    {t.principle.title}
                  </h2>
                </div>
                <div className="h-1 w-12 bg-secondary" />
              </div>
              <div className="space-y-6">
                <p className="text-xl lg:text-2xl font-black text-primary leading-tight italic border-l-4 border-secondary pl-6 py-2">
                  "{t.principle.main}"
                </p>
                <div className="space-y-4 text-slate-600 font-medium text-lg leading-relaxed">
                  <p>{t.principle.sub}</p>
                  <p>{t.principle.conclusion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 lg:py-24 bg-primary text-white">
        <div className="container-tight text-center max-w-4xl mx-auto space-y-12">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center text-secondary">
              <Users className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black leading-tight px-4">
            {t.closing}
          </h2>
          <div className="pt-4">
            <Link 
              href={`/${lang}/enroll`}
              className="inline-flex items-center gap-4 bg-secondary hover:bg-white hover:text-secondary text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl shadow-secondary/20"
            >
              {isAr ? 'كن جزءاً من قصتنا' : 'Become Part of Our Story'}
              {isAr ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
