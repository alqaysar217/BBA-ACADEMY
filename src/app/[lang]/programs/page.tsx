
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, GraduationCap, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default async function ProgramsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'برامجنا التعليمية' : 'Educational Programs',
    subtitle: isAr ? 'نقدم برامج متكاملة تهدف لبناء الشخصية والتميز الأكاديمي' : 'Providing integrated programs aimed at character building and academic excellence',
    viewDetails: isAr ? 'عرض تفاصيل البرنامج' : 'View Program Details',
    enrollNow: isAr ? 'سجل الآن' : 'Enroll Now',
    programs: [
      {
        id: 'grades-3-5',
        title: isAr ? 'برنامج المرحلة الابتدائية (3-5)' : 'Grade 3-5 Remote Program',
        desc: isAr ? 'تجربة تعليمية متوازنة تعزز الأسس الأكاديمية وتبني الهوية الإسلامية.' : 'A balanced learning experience that strengthens academic foundations and builds Islamic identity.',
        icon: BookOpen,
        image: "https://picsum.photos/seed/grade35/800/600",
        color: 'bg-primary'
      },
      {
        id: 'grades-6-12',
        title: isAr ? 'المرحلة المتوسطة والثانوية (6-12)' : 'Grades 6–12 Remote Program',
        desc: isAr ? 'دعم أكاديمي شامل وتعزيز للمهارات اللغوية عبر منصات تعلم عالمية.' : 'Comprehensive academic support and language skill enhancement via global platforms.',
        icon: GraduationCap,
        image: "https://picsum.photos/seed/grade612/800/600",
        color: 'bg-accent'
      },
      {
        id: 'weekend',
        title: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
        desc: isAr ? 'تعزيز اللغة العربية والقرآن الكريم للأطفال المقيمين في الخارج.' : 'Strengthening Arabic language and Quran for children living abroad.',
        icon: Calendar,
        image: "https://picsum.photos/seed/weekend/800/600",
        color: 'bg-secondary'
      }
    ]
  };

  return (
    <div className="bg-slate-50/30 min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-primary text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="container px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight">
            {t.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-medium">
            {t.subtitle}
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Programs Cards Grid */}
      <section className="container px-4 md:px-8 -mt-10 sm:-mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {t.programs.map((prog) => (
            <div key={prog.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image 
                  src={prog.image} 
                  alt={prog.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className={cn("absolute top-6 left-6 h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg", prog.color)}>
                  <prog.icon className="h-6 w-6" />
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col space-y-4">
                <h3 className="text-2xl font-black text-primary group-hover:text-secondary transition-colors">
                  {prog.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {prog.desc}
                </p>
                
                <div className="pt-6 mt-auto">
                  <Link href={`/${lang}/programs/${prog.id}`}>
                    <Button variant="outline" className="w-full rounded-full h-12 border-primary/20 text-primary font-bold hover:bg-primary hover:text-white transition-all">
                      {t.viewDetails}
                      {isAr ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
