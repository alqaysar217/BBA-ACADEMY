import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'حول أكاديمية بنين وبنات' : 'About Baneen and Banaat Academy (BBA)',
    subtitle: isAr ? 'BBA أكثر من مجرد مدرسة - إنها شريك تعليمي لعائلتك' : 'BBA is More Than a School — It’s Your Family\'s Educational Partner',
    vision: isAr ? 'رؤيتنا' : 'Our Vision',
    mission: isAr ? 'مهمتنا' : 'Our Mission',
    content: isAr 
      ? 'تأسست BBA برؤية بسيطة: تزويد العائلات بخيار تعليمي مرن يجمع بين التميز الأكاديمي والقيم الأخلاقية القوية واللغة العربية والهوية الإسلامية. ما بدأ كمبادرة تعليمية صغيرة تخدم العائلات في ميشيغان قد نما، بفضل الله، ليصبح شريكاً تعليمياً موثوقاً للعائلات في جميع أنحاء الولايات المتحدة.'
      : 'BBA was founded with a simple vision: to provide families with a flexible educational option that combines academic excellence with strong moral values, Arabic language, and Islamic identity. What began as a small educational initiative serving families in Michigan has, by the grace of God, grown into a trusted educational partner for families across the United States.',
    stats: [
      { label: isAr ? 'تأسست في' : 'Founded in', value: 'Michigan' },
      { label: isAr ? 'الخدمة' : 'Serving', value: 'Nationwide' },
      { label: isAr ? 'طالب تم توجيههم' : 'Students Guided', value: '300+' },
      { label: isAr ? 'دعم عائلي' : 'Family Support', value: 'Personalized' }
    ]
  };

  return (
    <div className="py-24">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold text-primary leading-tight">{t.title}</h1>
            <p className="text-xl font-bold text-secondary">{t.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.content}
            </p>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/about/800/600" 
              alt="Academy building" 
              fill 
              className="object-cover"
              data-ai-hint="school building"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {t.stats.map((stat, idx) => (
            <div key={idx} className="premium-card p-8 rounded-2xl text-center">
              <div className="text-2xl font-extrabold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-primary text-primary-foreground p-12 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-secondary">{t.mission}</h2>
            <p className="text-primary-foreground/80 leading-relaxed">
              {isAr 
                ? 'تمكين الطلاب من خلال التوجيه التعليمي الشخصي، وفرص التعلم المرنة، والشراكات العائلية القوية مع مساعدتهم على الاستعداد للنجاح الأكاديمي في المستقبل.'
                : 'To empower students through personalized educational guidance, flexible learning opportunities, and strong family partnerships while helping them prepare for future academic success.'}
            </p>
          </div>
          <div className="bg-white border-2 border-primary/10 p-12 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-primary">{t.vision}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {isAr 
                ? 'أن نصبح أحد أكثر الشركاء التعليميين موثوقية للعائلات في جميع أنحاء الولايات المتحدة من خلال توفير التوجيه والدعم والمسارات التعليمية التي تلهم الطلاب للوصول إلى إمكاناتهم الكاملة مع البقاء متجذرين في عقيدتهم وقيمهم وهويتهم.'
                : 'To become one of the most trusted educational partners for families across the United States by providing guidance, support, and educational pathways that inspire students to reach their full potential while remaining grounded in their faith, values, and identity.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
