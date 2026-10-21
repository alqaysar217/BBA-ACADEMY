import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default async function FounderPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    founderIntro: {
      heading: isAr ? 'تعرف على الدكتور مصطفى علي' : 'Meet Dr. Mustafa Ali',
      role: isAr ? 'المؤسس ومدير الأكاديمية' : 'Founder & Academy Director',
      p1: isAr 
        ? 'الدكتور مصطفى علي هو المؤسس ومدير أكاديمية بنين وبنات، حيث يقود مهمة الأكاديمية في توفير فرص تعليمية ذات مغزى تجمع بين التميز الأكاديمي والقيم الأخلاقية القوية.'
        : 'Dr. Mustafa Ali is the Founder and Academy Director of Baneen and Banaat Academy, where he leads the academy\'s mission of providing meaningful educational opportunities that combine academic excellence with strong moral values.',
      p2: isAr
        ? 'بفضل خلفيته في التعليم والقيادة، قضى الدكتور علي سنوات في تطوير الرؤية التي أصبحت في نهاية المطاف أكاديمية بنين وبنات. لطالما كان اعتقاده هو أن التعليم يجب أن يعد الطلاب ليس فقط للتعليم العالي والوظائف المستقبلية، ولكن أيضاً لحياة متجذرة في النزاهة والمسؤولية والخدمة.'
        : 'With a background in education and leadership, Dr. Ali spent years developing the vision that would eventually become Baneen and Banaat Academy. His belief has always been that education should prepare students not only for higher education and future careers, but also for lives rooted in integrity, responsibility, and service.',
      p3: isAr
        ? 'منذ تأسيس الأكاديمية في عام 2019، قاد نموها من مؤسسة تعليمية محلية في ميشيغان إلى مجتمع تعليمي يخدم العائلات في جميع أنحاء الولايات المتحدة. تحت قيادته، وسعت الأكاديمية برامجها لتلبية الاحتياجات المتنوعة للطلاب مع الحفاظ على التزامها بالشراكة العائلية والدعم الشخصي والتميز الأكاديمي.'
        : 'Since founding the academy in 2019, he has guided its growth from a local educational institution in Michigan to a learning community serving families across the United States. Under his leadership, the academy has expanded its programs to meet the diverse needs of students while maintaining its commitment to family partnership, personalized support, and academic excellence.',
      p4: isAr
        ? 'يواصل الدكتور علي العمل عن كثب مع الطلاب وأولياء الأمور والمعلمين، مؤمناً بأن النجاح المستدام يتحقق عندما تعمل المدارس والعائلات معاً نحو رؤية مشتركة لمستقبل كل طفل.'
        : 'Dr. Ali continues to work closely with students, parents, and educators, believing that lasting success is achieved when schools and families work together toward a shared vision for every child\'s future.'
    },
    philosophy: {
      heading: isAr ? 'الفلسفة التعليمية' : 'Our Educational Philosophy',
      pillars: [
        {
          title: isAr ? 'التميز الأكاديمي' : 'Academic Excellence',
          text: isAr 
            ? 'نؤمن بأن كل طالب يستحق تعليماً يتحدى ويلهم ويعد للنجاح مدى الحياة في التعليم العالي وما بعده. هدفنا هو مساعدة الطلاب على بناء المعرفة والمهارات والثقة التي يحتاجونها للازدهار في التعليم العالي وما بعده.'
            : 'We believe every student deserves an education that challenges, inspires, and prepares them for lifelong success. Our goal is to help students build the knowledge, skills, and confidence they need to thrive in higher education and beyond.'
        },
        {
          title: isAr ? 'الشخصية والقيم' : 'Character & Values',
          text: isAr
            ? 'التعليم الحقيقي يتجاوز الأكاديميين. نحن نسعى جاهدين لغرس النزاهة والمسؤولية والتعاطف والاحترام والقيم الأخلاقية القوية التي توجه الطلاب طوال حياتهم.'
            : 'True education goes beyond academics. We strive to nurture integrity, responsibility, compassion, respect, and strong moral values that guide students throughout their lives.'
        },
        {
          title: isAr ? 'الشراكة العائلية' : 'Family Partnership',
          text: isAr
            ? 'التعليم يكون في أقوى حالاته عندما تعمل المدارس والعائلات معاً. نحن نقدر التواصل المفتوح والثقة المتبادلة والتعاون الهادف لمساعدة كل طالب على الوصول إلى أقصى إمكاناته.'
            : 'Education is strongest when schools and families work together. We value open communication, mutual trust, and meaningful collaboration to help every student reach their full potential.'
        },
        {
          title: isAr ? 'التعلم مدى الحياة' : 'Lifelong Learning',
          text: isAr
            ? 'نحن نلهم الطلاب ليصبحوا متعلمين فضوليين وواثقين ومستقلين يتبنون النمو، ويتكيفون مع التحديات الجديدة، ويواصلون التعلم لفترة طويلة بعد التخرج.'
            : 'We inspire students to become curious, confident, and independent learners who embrace growth, adapt to new challenges, and continue learning long after graduation.'
        }
      ]
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Section One — Founder Introduction */}
      <section className="py-16 lg:py-24">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white order-1 lg:order-none">
              <Image 
                src="https://picsum.photos/seed/dr-mustafa/800/1000" 
                alt="Dr. Mustafa Ali" 
                fill 
                className="object-cover"
                priority
                unoptimized
                data-ai-hint="professional headshot"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] block">
                  {t.founderIntro.role}
                </span>
                <h1 className="text-3xl lg:text-5xl font-black text-primary tracking-tight leading-tight">
                  {t.founderIntro.heading}
                </h1>
                <div className="h-1 w-12 bg-secondary mt-4" />
              </div>
              
              <div className="text-lg lg:text-xl text-slate-700 leading-relaxed font-medium">
                {t.founderIntro.p1}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Two — Leadership, Vision, and Academy Growth */}
      <section className="py-16 lg:py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="container-tight max-w-4xl">
          <div className="space-y-12 text-slate-600 leading-relaxed font-medium text-lg">
            <div className="space-y-8">
              <p>{t.founderIntro.p2}</p>
              
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
                <p className="relative z-10 text-primary font-bold italic">
                  {t.founderIntro.p3}
                </p>
              </div>
              
              <p>{t.founderIntro.p4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Three — Our Educational Philosophy */}
      <section className="py-20 lg:py-32">
        <div className="container-tight">
          <div className="text-center mb-16 lg:mb-24 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-primary uppercase tracking-tight">
              {t.philosophy.heading}
            </h2>
            <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {t.philosophy.pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 lg:p-12 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-2 w-2 rounded-full bg-secondary group-hover:scale-150 transition-transform" />
                  <h3 className="text-xl lg:text-2xl font-black text-primary uppercase tracking-tight">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed text-sm lg:text-base flex-1">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
