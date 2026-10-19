import { type Locale } from '@/lib/i18n/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, AlertCircle, FileText, CheckSquare } from 'lucide-react';

export default async function NyResourcesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'مركز موارد التعليم المنزلي في نيويورك' : 'New York Homeschool Resource Center',
    intro: isAr 
      ? 'كل ما تحتاج لمعرفته حول التعليم المنزلي في نيويورك. نحن نساعد العائلات على التنقل في متطلبات التعليم المنزلي بثقة.'
      : 'Everything You Need to Know About Homeschooling in New York. Helping families navigate New York\'s homeschool requirements with confidence.',
    steps: [
      {
        title: isAr ? 'الخطوة 1 - خطاب النوايا (LOI)' : 'Step 1 — Notice of Intent (LOI)',
        desc: isAr 
          ? 'تبدأ رحلة التعليم المنزلي بخطاب النوايا. هذا خطاب بسيط لإعلام منطقتك التعليمية المحلية.'
          : 'The homeschooling journey begins with the Notice of Intent (LOI). This is a simple letter informing your local school district.',
        icon: FileText
      },
      {
        title: isAr ? 'الخطوة 2 - خطة التعليم (IHIP)' : 'Step 2 — Individualized Home Instruction Plan (IHIP)',
        desc: isAr 
          ? 'يوضح IHIP الخطة التعليمية للعام الدراسي، بما في ذلك المواد التي سيتم تدريسها.'
          : 'The IHIP outlines the educational plan for the school year, including the subjects that will be taught.',
        icon: CheckSquare
      },
      {
        title: isAr ? 'الخطوة 3 - التقارير الفصلية' : 'Step 3 — Quarterly Reports',
        desc: isAr 
          ? 'يقدم الآباء تقارير فصلية توثق التقدم التعليمي لطلابهم.'
          : 'Throughout the school year, parents submit Quarterly Reports documenting their student\'s educational progress.',
        icon: Info
      }
    ],
    mistakesTitle: isAr ? 'أخطاء شائعة يجب تجنبها' : 'Common Mistakes to Avoid',
    mistakes: [
      isAr ? 'الانتظار حتى اللحظة الأخيرة لتقديم المستندات المطلوبة.' : 'Waiting until the last minute to submit required documents.',
      isAr ? 'نسيان الاحتفاظ بنسخ من السجلات الهامة.' : 'Forgetting to keep copies of important records.',
      isAr ? 'الانتظار حتى السنة الأخيرة لبدء التفكير في التخرج.' : 'Waiting until senior year to begin thinking about graduation.'
    ]
  };

  return (
    <div className="py-24">
      <div className="container px-4 md:px-8 max-w-5xl mx-auto">
        <div className="mb-16 space-y-6">
          <h1 className="text-4xl font-extrabold text-primary">{t.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {t.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {t.steps.map((step, idx) => (
            <Card key={idx} className="premium-card rounded-3xl overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-primary/5 p-6">
                <step.icon className="h-8 w-8 text-secondary mb-4" />
                <CardTitle className="text-xl text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-destructive/5 border-2 border-destructive/20 p-12 rounded-[3rem]">
          <div className="flex items-center gap-4 mb-8">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <h2 className="text-2xl font-bold text-primary">{t.mistakesTitle}</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.mistakes.map((mistake, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="h-2 w-2 rounded-full bg-destructive mt-2 shrink-0" />
                <span className="text-muted-foreground font-medium">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
