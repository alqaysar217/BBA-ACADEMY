
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
      {/* Page Header - Professional Redesign */}
      <section className="bg-primary text-white py-20 sm:py-32 relative overflow-hidden">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.15]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -rotate-6" />
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/5 rotate-3" />
        </div>

        <div className="container px-4 md:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <div className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90">Academy Excellence</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight drop-shadow-xl">
            {t.title}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-medium leading-relaxed italic">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Programs Cards Grid */}
      <section className="container px-4 md:px-8 -mt-10 sm:-mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {t.programs.map((prog) => {
            const IconComponent = prog.icon;
            return (
              <div key={prog.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <Image 
                    src={prog.image} 
                    alt={prog.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
                  <div className={cn("absolute top-6 left-6 h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", prog.color)}>
                    <IconComponent className="h-7 w-7" />
                  </div>
                </div>
                
                <div className="p-10 flex-1 flex flex-col space-y-4">
                  <h3 className="text-2xl font-black text-primary group-hover:text-secondary transition-colors duration-300">
                    {prog.title}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {prog.desc}
                  </p>
                  
                  <div className="pt-8 mt-auto">
                    <Link href={`/${lang}/programs/${prog.id}`}>
                      <Button variant="outline" className="w-full rounded-2xl h-14 border-primary/20 text-primary font-black hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md">
                        {t.viewDetails}
                        {isAr ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
