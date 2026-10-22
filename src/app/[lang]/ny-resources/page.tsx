'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function NyResourcesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = {
    hero: {
      title: isAr ? 'مركز موارد نيويورك' : 'NY Homeschool Center',
      desc: isAr 
        ? 'تتمتع نيويورك ببعض من أكثر لوائح التعليم المنزلي تفصيلاً. فهم المتطلبات يصبح أسهل مع التوجيه الصحيح.'
        : 'New York has detailed homeschool regulations. Understanding requirements becomes easier with guidance.',
    },
    process: {
      title: isAr ? 'خطوات العملية التعليمية' : 'The Homeschool Process',
      steps: [
        { id: 1, title: isAr ? 'خطاب النوايا (LOI)' : 'Notice of Intent (LOI)', desc: isAr ? 'إبلاغ المنطقة التعليمية بنية التعليم المنزلي.' : "Informing the district of your intent." },
        { id: 2, title: isAr ? 'خطة IHIP' : 'IHIP Plan', desc: isAr ? 'خطة تعليمية توضح المواد التي سيتم تدريسها.' : "A plan outlining subjects." },
        { id: 3, title: isAr ? 'التقارير الفصلية' : 'Quarterly Reports', desc: isAr ? 'توثيق الحضور والتقدم الأكاديمي.' : "Documenting attendance and progress." },
        { id: 4, title: isAr ? 'التقييم السنوي' : 'Annual Assessment', desc: isAr ? 'تقييم ختامي للعام الدراسي.' : "Final step for the school year." }
      ]
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-20 pb-16 bg-primary overflow-hidden">
        <div className="container-tight relative z-10 text-center space-y-6 px-4 text-white">
          <h1 className="text-3xl sm:text-6xl font-black uppercase">{t.hero.title}</h1>
          <p className="text-sm sm:text-xl font-bold opacity-80 max-w-2xl mx-auto">{t.hero.desc}</p>
        </div>
      </section>

      <div className="container-tight py-16 px-4">
        <div className="space-y-16">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-black text-primary uppercase">{isAr ? 'التعليم المنزلي في نيويورك' : 'Homeschooling in NY'}</h2>
              <p className="text-slate-600 leading-relaxed font-medium">{isAr ? 'نحن هنا لمساعدتكم في كل خطوة.' : 'We are here to help every step of the way.'}</p>
              <Button asChild className="bg-secondary rounded-xl h-14 px-8 font-black">
                <Link href={`/${lang}/contact`}>{isAr ? 'تواصل معنا' : 'Contact Us'}</Link>
              </Button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
               <Image src="/newyork.png" alt="NY" fill className="object-cover" unoptimized />
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black text-primary uppercase text-center">{t.process.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.process.steps.map((step) => (
                <Card key={step.id} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-xl transition-all">
                  <CardHeader className="bg-primary text-white rounded-t-2xl p-6">
                    <CardTitle className="text-lg font-black">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-slate-600 font-bold text-sm">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}