import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import { Target, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'حول أكاديمية بنين وبنات' : 'About Baneen and Banaat Academy (BBA)',
    subtitle: isAr ? 'شريكك التعليمي لعائلتك' : 'More Than a School — It’s Your Family\'s Educational Partner',
    content: isAr 
      ? 'تأسست BBA برؤية بسيطة: تزويد العائلات بخيار تعليمي مرن يجمع بين التميز الأكاديمي والقيم الأخلاقية القوية واللغة العربية والهوية الإسلامية. ما بدأ كمبادرة تعليمية صغيرة تخدم العائلات في ميشيغان قد نما، بفضل الله، ليصبح شريكاً تعليمياً موثوقاً للعائلات في جميع أنحاء الولايات المتحدة.'
      : 'BBA was founded with a simple vision: to provide families with a flexible educational option that combines academic excellence with strong moral values, Arabic language, and Islamic identity. What began as a small educational initiative serving families in Michigan has, by the grace of God, grown into a trusted educational partner for families across the United States.',
    believeTitle: isAr ? 'ما نؤمن به' : 'What We Believe',
    beliefs: [
      isAr ? 'نؤمن أن الطلاب لا ينبغي أبداً أن يختاروا بين جودة التعليم والحفاظ على هويتهم.' : 'We believe students should never have to choose between a quality education and preserving their faith, language, and identity.',
      isAr ? 'برامجنا مصممة لتوفير المرونة والدعم الشخصي والبيئة التعليمية المتكاملة.' : 'Our programs provide flexibility, personal support, and an environment where achievement and character development go hand in hand.'
    ],
    mission: isAr ? 'مهمتنا' : 'Our Mission',
    vision: isAr ? 'رؤيتنا' : 'Our Vision',
    stats: [
      { label: isAr ? 'المقر' : 'Location', value: 'Michigan' },
      { label: isAr ? 'الخدمة' : 'Service', value: 'Nationwide' },
      { label: isAr ? 'توجيه' : 'Students', value: '300+' },
      { label: isAr ? 'دعم' : 'Support', value: 'Personalized' }
    ]
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-slate-50/50">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-black text-primary leading-[1.1] tracking-tight">
                  {t.title}
                </h1>
                <p className="text-2xl font-bold text-secondary">{t.subtitle}</p>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {t.content}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {t.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:border-secondary transition-colors">
                    <div className="text-3xl font-black text-primary mb-1 group-hover:text-secondary transition-colors">{stat.value}</div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white">
              <Image 
                src="https://picsum.photos/seed/about/1000/1200" 
                alt="Academy building" 
                fill 
                className="object-cover"
                data-ai-hint="professional academy building"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-primary text-white p-12 lg:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight">{t.mission}</h2>
                <p className="text-white/80 leading-relaxed font-medium text-lg">
                  {isAr 
                    ? 'تمكين الطلاب من خلال التوجيه التعليمي الشخصي، وفرص التعلم المرنة، والشراكات العائلية القوية مع مساعدتهم على الاستعداد للنجاح الأكاديمي في المستقبل.'
                    : 'To empower students through personalized educational guidance, flexible learning opportunities, and strong family partnerships while helping them prepare for future academic success.'}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
            </div>

            <div className="bg-slate-50 border-2 border-slate-100 p-12 lg:p-16 rounded-[3rem] relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-black text-primary uppercase tracking-tight">{t.vision}</h2>
                <p className="text-slate-600 leading-relaxed font-medium text-lg">
                  {isAr 
                    ? 'أن نصبح أحد أكثر الشركاء التعليميين موثوقية للعائلات في جميع أنحاء الولايات المتحدة من خلال توفير التوجيه والدعم والمسارات التعليمية التي تلهم الطلاب للوصول إلى إمكاناتهم الكاملة مع البقاء متجذرين في عقيدتهم وقيمهم وهويتهم.'
                    : 'To become one of the most trusted educational partners for families across the United States by providing guidance, support, and educational pathways that inspire students to reach their full potential while remaining grounded in their faith, values, and identity.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="section-padding bg-slate-50/30">
        <div className="container-tight">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-primary">{t.believeTitle}</h2>
              <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
            </div>
            <div className="grid gap-8">
              {t.beliefs.map((belief, idx) => (
                <div key={idx} className="flex gap-8 items-start bg-white p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-slate-100 transition-all hover:border-secondary/20">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-xl text-primary font-bold leading-relaxed">{belief}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}