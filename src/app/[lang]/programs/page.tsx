
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, GraduationCap, Calendar, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function ProgramsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'برامجنا التعليمية' : 'Educational Programs',
    subtitle: isAr ? 'نقدم برامج متكاملة تهدف لبناء الشخصية والتميز الأكاديمي' : 'Providing integrated programs aimed at character building and academic excellence',
    viewDetails: isAr ? 'عرض تفاصيل البرنامج' : 'View Program Details',
    programs: [
      {
        id: 'grades-3-5',
        title: isAr ? 'برنامج المرحلة الابتدائية (3-5)' : 'Grade 3-5 Remote Program',
        desc: isAr ? 'تجربة تعليمية متوازنة تعزز الأسس الأكاديمية وتبني الهوية الإسلامية.' : 'A balanced learning experience that strengthens academic foundations and builds Islamic identity.',
        icon: BookOpen,
        image: "/program-1.png",
        color: 'bg-primary'
      },
      {
        id: 'grades-6-12',
        title: isAr ? 'المرحلة المتوسطة والثانوية (6-12)' : 'Grades 6–12 Remote Program',
        desc: isAr ? 'دعم أكاديمي شامل وتعزيز للمهارات اللغوية عبر منصات تعلم عالمية.' : 'Comprehensive academic support and language skill enhancement via global platforms.',
        icon: GraduationCap,
        image: "/program-2.png",
        color: 'bg-accent'
      },
      {
        id: 'weekend',
        title: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
        desc: isAr ? 'تعزيز اللغة العربية والقرآن الكريم للأطفال المقيمين في الخارج.' : 'Strengthening Arabic language and Quran for children living abroad.',
        icon: Calendar,
        image: "/program-3.png",
        color: 'bg-secondary'
      }
    ],
    comparison: {
      title: isAr ? 'مقارنة سريعة بين البرامج' : 'Quick Program Comparison',
      headers: {
        program: isAr ? 'البرنامج' : 'Program',
        days: isAr ? 'الأيام' : 'Days',
        target: isAr ? 'الفئة المستهدفة' : 'Target Audience',
        subjects: isAr ? 'المواد الدراسية' : 'Key Subjects',
        format: isAr ? 'نظام الدراسة' : 'Format'
      },
      rows: [
        {
          name: isAr ? 'الصفوف 3-5' : 'Grades 3-5',
          days: isAr ? 'الإثنين - الخميس' : 'Mon - Thu',
          target: isAr ? 'طلاب المرحلة الابتدائية' : 'Elementary Students',
          subjects: isAr ? 'أكاديمي + قرآن وعربي' : 'Academics + Quran/Arabic',
          format: isAr ? 'حصص حية مباشرة' : 'Live Online Classes'
        },
        {
          name: isAr ? 'الصفوف 6-12' : 'Grades 6-12',
          days: isAr ? 'مرن طوال الأسبوع' : 'Flexible Weekdays',
          target: isAr ? 'المتوسطة والثانوية' : 'Middle & High School',
          subjects: isAr ? 'إنجليزي + دعم إسلامي' : 'English + Islamic Support',
          format: isAr ? 'منصة Edgenuity + متابعة' : 'Edgenuity + Monitoring'
        },
        {
          name: isAr ? 'عطلة نهاية الأسبوع' : 'Weekend',
          days: isAr ? 'السبت والأحد' : 'Sat & Sun',
          target: isAr ? 'الأطفال المقيمون بالخارج' : 'Students Abroad',
          subjects: isAr ? 'هوية + لغة + قرآن' : 'Identity + Arabic + Quran',
          format: isAr ? 'حصص حية تفاعلية' : 'Live Online Sessions'
        }
      ]
    }
  };

  return (
    <div className="bg-slate-50/30 min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-primary text-white py-12 sm:py-16 relative overflow-hidden">
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

        <div className="container px-4 md:px-8 relative z-10 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-xl">
            {t.title}
          </h1>
          <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto font-medium leading-relaxed italic">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Program Cards Grid */}
      <section className="container px-4 md:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {t.programs.map((prog) => {
            const IconComponent = prog.icon;
            return (
              <div key={prog.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <Image 
                    src={prog.image} 
                    alt={prog.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className={cn("absolute top-4 left-4 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-transform duration-500 group-hover:scale-110", prog.color)}>
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                </div>
                
                <div className="p-8 sm:p-10 flex-1 flex flex-col space-y-4">
                  <h3 className="text-sm sm:text-lg font-black text-primary group-hover:text-secondary transition-colors duration-300 leading-tight">
                    {prog.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-xs sm:text-base leading-relaxed">
                    {prog.desc}
                  </p>
                  
                  <div className="pt-6 mt-auto">
                    <Button asChild variant="outline" className="w-full rounded-xl sm:rounded-2xl h-12 sm:h-14 border-primary/20 text-primary font-black text-xs sm:text-sm hover:bg-primary hover:text-white transition-all duration-300">
                      <Link href={`/${lang}/programs/${prog.id}`}>
                        {t.viewDetails}
                        {isAr ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="container px-4 md:px-8 mt-24 lg:mt-32">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tight">
              {t.comparison.title}
            </h2>
            <div className="h-1 w-16 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-premium overflow-hidden">
            <div className="overflow-x-auto pb-4">
              <Table className="min-w-[900px]">
                <TableHeader className="bg-primary text-white">
                  <TableRow className="hover:bg-primary/95 border-none">
                    <TableHead className="text-white font-black uppercase text-[11px] sm:text-xs tracking-widest h-20 px-6">{t.comparison.headers.program}</TableHead>
                    <TableHead className="text-white font-black uppercase text-[11px] sm:text-xs tracking-widest h-20 px-6">{t.comparison.headers.days}</TableHead>
                    <TableHead className="text-white font-black uppercase text-[11px] sm:text-xs tracking-widest h-20 px-6">{t.comparison.headers.target}</TableHead>
                    <TableHead className="text-white font-black uppercase text-[11px] sm:text-xs tracking-widest h-20 px-6">{t.comparison.headers.subjects}</TableHead>
                    <TableHead className="text-white font-black uppercase text-[11px] sm:text-xs tracking-widest h-20 px-6">{t.comparison.headers.format}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {t.comparison.rows.map((row, idx) => (
                    <TableRow key={idx} className="hover:bg-slate-50 transition-colors border-slate-100">
                      <TableCell className="font-black text-primary text-xs sm:text-base py-8 px-6">{row.name}</TableCell>
                      <TableCell className="text-slate-600 font-bold text-xs sm:text-sm px-6">{row.days}</TableCell>
                      <TableCell className="text-slate-600 font-bold text-xs sm:text-sm px-6">{row.target}</TableCell>
                      <TableCell className="text-slate-600 font-bold text-xs sm:text-sm px-6 leading-relaxed max-w-[200px]">{row.subjects}</TableCell>
                      <TableCell className="text-secondary font-black text-xs sm:text-sm italic px-6">{row.format}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs sm:text-sm text-slate-400 font-bold italic leading-relaxed text-center sm:text-start">
                {isAr 
                  ? '* يمكنكم الحصول على مزيد من التفاصيل عبر الضغط على عرض تفاصيل كل برنامج أعلاه.' 
                  : '* You can get more details by clicking on "View Program Details" for each program above.'}
              </p>
              <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white font-black rounded-xl px-8 h-12 transition-all shadow-xl active:scale-95 shrink-0">
                <Link href={`/${lang}/enroll`}>
                  {isAr ? 'سجل الآن' : 'Enroll Now'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
