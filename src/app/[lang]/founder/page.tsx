import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import { Quote, Award, Heart, Users, Target, BookOpen, CheckCircle2 } from 'lucide-react';

export default async function FounderPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'رسالة من مؤسس ومدير الأكاديمية' : 'Message from BBA Founder & Academy Director',
    quote: isAr 
      ? 'التعليم يدور حول أكثر من مجرد إعداد الطلاب للتخرج. إنه يتعلق بإعدادهم للحياة.'
      : 'Education is about more than preparing students for graduation. It is about preparing them for life.',
    welcome: isAr ? 'مرحباً بكم في أكاديمية بنين وبنات.' : 'Welcome to BBA Academy.',
    message: isAr
      ? 'عندما تصورت هذه الأكاديمية لأول مرة، لم يكن هدفي مجرد إنشاء مؤسسة تعليمية أخرى. كانت رؤيتي هي إنشاء مكان يمكن للطلاب فيه السعي وراء التميز الأكاديمي مع البقاء مرتبطين بعقيدتهم وقيمهم ولغتهم وهويتهم.'
      : 'When I first envisioned this academy, my goal was never simply to establish another educational institution. My vision was to create a place where students could pursue academic excellence while remaining connected to their faith, values, language, and identity.',
    history: isAr
      ? 'بعد سنوات من التخطيط والإعداد، أصبح هذه الرؤية حقيقة واقعة في عام 2019. ومنذ ذلك الحين، كان من دواعي سرورنا مشاهدة أكاديميتنا تنمو من خدمة العائلات المحلية في ميشيغان إلى دعم الطلاب والعائلات في جميع أنحاء الولايات المتحدة.'
      : 'After years of planning and preparation, that vision became a reality in 2019. Since then, it has been a privilege to watch our academy grow from serving local families in Michigan to supporting students and families across the United States.',
    partnership: isAr
      ? 'خلال هذه الرحلة، ظل هناك درس واحد ثابتاً: التعليم يكون في أقوى حالاته عندما تعمل المدارس والعائلات معاً. كل طفل فريد من نوعه، ولكل أسرة قصتها الخاصة، ويستحق كل طالب توجيهاً شخصياً وتشجيعاً وفرصاً للوصول إلى كامل إمكاناته.'
      : 'Throughout this journey, one lesson has remained constant: education is strongest when schools and families work together. Every child is unique, every family has its own story, and every student deserves personal guidance and opportunities to reach their full potential.',
    meetTitle: isAr ? 'تعرف على الدكتور مصطفى علي' : 'Meet Dr. Mustafa Ali',
    bio: isAr
      ? 'الدكتور مصطفى علي هو المؤسس ومدير أكاديمية بنين وبنات، حيث يقود مهمة الأكاديمية في توفير فرص تعليمية ذات مغزى تجمع بين التميز الأكاديمي والقيم الأخلاقية القوية. بفضل خلفيته في التعليم والقيادة، قضى سنوات في تطوير الرؤية التي أصبحت الآن صرحاً تعليمياً يخدم مئات الطلاب.'
      : 'Dr. Mustafa Ali is the Founder and Academy Director of Baneen and Banaat Academy, where he leads the mission of providing meaningful educational opportunities that combine academic excellence with strong moral values. With a background in education and leadership, he spent years developing the vision that is now an educational landmark serving hundreds of students.',
    philosophyTitle: isAr ? 'فلسفتنا التعليمية' : 'Our Educational Philosophy',
    philosophy: [
      {
        title: isAr ? 'التميز الأكاديمي' : 'Academic Excellence',
        desc: isAr ? 'نؤمن بأن كل طالب يستحق تعليماً يتحدى ويلهم ويعد للنجاح مدى الحياة في التعليم العالي وما بعده.' : 'We believe every student deserves an education that challenges, inspires, and prepares them for lifelong success.',
        icon: Award
      },
      {
        title: isAr ? 'الشخصية والقيم' : 'Character & Values',
        desc: isAr ? 'التعليم الحقيقي يتجاوز الأكاديميين. نحن نسعى لنشر النزاهة والمسؤولية والرحمة والاحترام في نفوس طلابنا.' : 'True education goes beyond academics. We strive to nurture integrity, responsibility, compassion, and respect.',
        icon: Heart
      },
      {
        title: isAr ? 'الشراكة العائلية' : 'Family Partnership',
        desc: isAr ? 'نحن نقدر التواصل المفتوح والتعاون الهادف لمساعدة كل طالب على الوصول إلى أقصى إمكاناته.' : 'We value open communication and meaningful collaboration to help every student reach their full potential.',
        icon: Users
      }
    ]
  };

  return (
    <div className="bg-white">
      {/* Hero Banner Section */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="founder-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                 <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#founder-pattern)" />
           </svg>
        </div>
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/20 rounded-full text-secondary font-black text-[10px] uppercase tracking-[0.2em] mb-4">
              <Quote className="h-3 w-3" />
              {isAr ? 'كلمة القيادة' : "LEADER'S MESSAGE"}
           </div>
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl mx-auto drop-shadow-xl">
             {t.title}
           </h1>
           <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full shadow-[0_0_20px_rgba(var(--secondary),0.6)]" />
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: The Message */}
            <div className="space-y-12 order-2 lg:order-1">
              <div className="relative">
                <Quote className="absolute -top-10 -left-6 h-20 w-20 text-slate-100 -z-10" />
                <p className="text-2xl md:text-3xl font-black text-primary leading-tight italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="space-y-8 text-slate-600 font-medium text-lg leading-relaxed">
                <p className="text-secondary font-black text-2xl border-l-4 border-secondary pl-6 py-2">
                  {t.welcome}
                </p>
                <p>{t.message}</p>
                <p>{t.history}</p>
                <p className="bg-slate-50 p-8 rounded-3xl border border-slate-100 font-bold text-primary italic">
                  {t.partnership}
                </p>
                <p>
                  {isAr 
                    ? 'شكراً لكم على اعتبار BBA جزءاً من رحلة عائلتكم التعليمية. نحن نتطلع إلى الشراكة معكم ومساعدة طفلكم على بناء مستقبل ناجح.'
                    : 'Thank you for considering BBA as part of your family\'s educational journey. We look forward to partnering with you.'}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
                   <Award className="h-8 w-8 text-secondary" />
                </div>
                <div>
                   <p className="text-xl font-black text-primary leading-none">Dr. Mustafa Ali</p>
                   <p className="text-sm font-bold text-secondary uppercase tracking-widest mt-1">Founder & Academy Director</p>
                </div>
              </div>
            </div>

            {/* Right Column: Portrait & Biography */}
            <div className="space-y-12 order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-secondary rounded-[3rem] rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition-transform duration-500" />
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                  <Image 
                    src="https://picsum.photos/seed/dr-mustafa/800/1000" 
                    alt="Dr. Mustafa Ali" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    data-ai-hint="professional headshot"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-premium space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                   <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-secondary" />
                   </div>
                   <h3 className="text-xl font-black text-primary uppercase tracking-tight">{t.meetTitle}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed font-bold italic">
                  {t.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container-tight">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">
              {t.philosophyTitle}
            </h2>
            <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.philosophy.map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 group hover:-translate-y-2">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center mb-8 shadow-inner group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-primary mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                <div className="mt-8 flex items-center gap-2">
                   <CheckCircle2 className="h-4 w-4 text-green-500" />
                   <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'قيمة أساسية' : 'Core Value'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 lg:py-32">
        <div className="container-tight text-center">
          <div className="max-w-3xl mx-auto space-y-10 bg-primary p-12 lg:p-20 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5">
                <Target className="h-64 w-64" />
             </div>
             <div className="relative z-10 space-y-6">
                <h2 className="text-3xl lg:text-5xl font-black leading-tight">
                   {isAr ? 'ابدأ رحلة طفلك التعليمية معنا اليوم' : 'Start Your Child\'s Journey With Us Today'}
                </h2>
                <p className="text-white/70 font-bold text-lg max-w-xl mx-auto italic">
                   {isAr ? 'نحن ملتزمون بتوفير أفضل بيئة تعليمية تجمع بين القيم والتميز.' : 'We are committed to providing the best learning environment combining values and excellence.'}
                </p>
                <div className="pt-6">
                   <a href={`/${lang}/enroll`} className="inline-flex h-16 px-12 items-center justify-center bg-secondary hover:bg-white hover:text-secondary text-white font-black text-lg rounded-2xl shadow-xl shadow-secondary/20 transition-all scale-105 active:scale-95">
                      {isAr ? 'سجل الآن' : 'Enroll Now'}
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
