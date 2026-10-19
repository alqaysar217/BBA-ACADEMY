import { type Locale } from '@/lib/i18n/config';
import Image from 'next/image';

export default async function OurStoryPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'قصتنا' : 'Our Story',
    subtitle: isAr ? 'كل شيء يبدأ بفكرة...' : 'It all starts with an idea...',
    question: isAr ? 'لماذا يجب على العائلات الاختيار بين التميز الأكاديمي والقيم التي يريدون الحفاظ عليها؟' : 'Why should families have to choose between academic excellence and the values they want to preserve?',
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
      }
    ],
    principleTitle: isAr ? 'مبدأنا الأساسي' : 'Our Core Principle',
    principleDesc: isAr 
      ? 'التعليم يكون في أقوى حالاته عندما تعمل المدارس والعائلات معاً.'
      : 'Education is strongest when schools and families work together.',
    footer: isAr 
      ? 'قصتنا لا تزال تُكتب. وسيشرفنا أن تصبح عائلتكم جزءاً منها.'
      : 'Our story is still being written. And we would be honored for your family to become part of it.'
  };

  return (
    <div className="py-24">
      <div className="container px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl font-extrabold text-primary">{t.title}</h1>
          <p className="text-2xl text-secondary font-bold italic">{t.subtitle}</p>
          <div className="h-1 w-24 bg-accent mx-auto" />
        </div>

        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-12">
          <section className="bg-primary/5 p-8 rounded-3xl border-l-4 border-secondary">
            <p className="text-xl font-medium text-primary italic">"{t.question}"</p>
          </section>

          <section className="space-y-12">
            {t.milestones.map((milestone, idx) => (
              <div key={idx} className="relative pl-8 md:pl-0">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="text-3xl font-extrabold text-secondary md:w-32">{milestone.year}</div>
                  <div className="flex-1 premium-card p-8 rounded-2xl">
                    <p>{milestone.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="text-center py-16">
            <h2 className="text-3xl font-bold text-primary mb-6">{t.principleTitle}</h2>
            <p className="text-2xl text-secondary font-extrabold">{t.principleDesc}</p>
            <p className="mt-6 max-w-2xl mx-auto">
              {isAr 
                ? 'نحن نؤمن بأن الآباء هم المعلمون الأوائل للطفل، وأن النجاح المستدام يتحقق عندما يعمل المعلمون والعائلات كشركاء نحو نفس الهدف.'
                : 'We believe parents are a child\'s first teachers, and lasting success is achieved when educators and families work as partners toward the same goal.'}
            </p>
          </section>

          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl my-16">
            <Image 
              src="https://picsum.photos/seed/story/1200/800" 
              alt="Our Story" 
              fill 
              className="object-cover"
              data-ai-hint="school history"
            />
          </div>

          <p className="text-center text-xl font-bold text-primary pt-8">
            {t.footer}
          </p>
        </div>
      </div>
    </div>
  );
}
