import { type Locale } from '@/lib/i18n/config';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function StudentGuidePage({ params: { lang } }: { params: { lang: Locale } }) {
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'دليل طالب BBA' : 'BBA Student Guide',
    welcome: isAr 
      ? 'كل ما يحتاجه الطلاب وأولياء الأمور لمعرفته من أجل عام دراسي ناجح'
      : 'Everything Students & Parents Need to Know for a Successful School Year',
    intro: isAr
      ? 'مرحباً بكم في دليل طالب BBA. نحن متحمسون لانضمامكم إلى مجتمعنا التعليمي ونتطلع إلى دعمكم طوال رحلتكم التعليمية.'
      : 'Welcome to the BBA Student Guide. We are excited to have you join our learning community and look forward to supporting you throughout your educational journey.',
    stepsTitle: isAr ? 'البدء في BBA' : 'Getting Started at BBA',
    steps: [
      {
        title: isAr ? 'تحقق من بريدك الإلكتروني الترحيبي' : 'Check Your Welcome Email',
        desc: isAr 
          ? 'يحتوي بريدك الإلكتروني الترحيبي على كل ما تحتاجه للبدء، بما في ذلك معلومات تسجيل الدخول إلى Edgenuity وخطة الطالب الخاصة بك.'
          : 'Your Welcome Email contains everything you need to get started, including your Edgenuity login information and your personalized Student Plan.'
      },
      {
        title: isAr ? 'سجل الدخول إلى حساب Edgenuity الخاص بك' : 'Log Into Your Edgenuity Account',
        desc: isAr 
          ? 'Edgenuity هي منصة التعلم عبر الإنترنت حيث ستكمل جميع دروسك ومهامك واختباراتك.'
          : 'Edgenuity is the online learning platform where you will complete all of your lessons, assignments, quizzes, and exams.'
      },
      {
        title: isAr ? 'راجع خطة الطالب الخاصة بك' : 'Review Your Student Plan',
        desc: isAr 
          ? 'يتلقى كل طالب خطة طالب توضح الدورات التدريبية التي من المتوقع أن يكملها خلال العام الدراسي.'
          : 'Every student receives a Student Plan outlining the courses they are expected to complete during the school year.'
      }
    ],
    formulaTitle: isAr ? 'معادلة نجاح BBA' : 'The BBA Success Formula',
    formula: [
      isAr ? 'سجل الدخول كل يوم عمل' : 'Log in every weekday',
      isAr ? 'أكمل 5-7٪ يومياً' : 'Complete 5–7% daily',
      isAr ? 'أنهِ دورة واحدة كل شهر' : 'Finish 1 course each month',
      isAr ? 'أكمل جميع الدورات العشر في 10 أشهر' : 'Complete all 10 courses in 10 months'
    ]
  };

  return (
    <div className="py-24">
      <div className="container px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl font-extrabold text-primary">{t.title}</h1>
          <p className="text-xl font-bold text-secondary">{t.welcome}</p>
          <p className="text-muted-foreground">{t.intro}</p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-8 border-b pb-4">{t.stepsTitle}</h2>
            <div className="grid gap-6">
              {t.steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="h-10 w-10 rounded-full bg-secondary text-primary font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary text-primary-foreground p-12 rounded-[3rem] text-center">
            <h2 className="text-2xl font-bold mb-8 text-secondary">{t.formulaTitle}</h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              {t.formula.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center font-bold text-secondary">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-8 border-b pb-4">
              {isAr ? 'فهم دوراتك التدريبية' : 'Understanding Your Courses'}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?'}
                </AccordionTrigger>
                <AccordionContent>
                  {isAr 
                    ? 'يتم تعيين 10 دورات لمعظم الطلاب لإكمالها من سبتمبر إلى يونيو.'
                    : 'Most students are assigned 10 courses to complete from September through June.'}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {isAr ? 'كم من الوقت يجب أن تستغرق كل دورة؟' : 'How long should each course take?'}
                </AccordionTrigger>
                <AccordionContent>
                  {isAr 
                    ? '3-4 أسابيع (حوالي دورة واحدة شهرياً) عند الحفاظ على تقدم يومي بنسبة 5-7٪.'
                    : '3–4 weeks (about one course per month) when maintaining 5–7% daily progress.'}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </div>
  );
}
