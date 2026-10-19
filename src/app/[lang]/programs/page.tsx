import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, GraduationCap, Calendar } from 'lucide-react';
import Image from 'next/image';

export default async function ProgramsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'استكشف برامجنا التعليمية' : 'Explore Our Educational Programs',
    subtitle: isAr ? 'من القرآن والعربية إلى الأكاديميين الإنجليز، توفر برامجنا تجربة تعليمية شاملة ومرنة وداعمة لكل طالب.' : 'From Quran and Arabic to English academics, our programs provide a holistic, flexible, and supportive learning experience for every student.',
    enrollNow: isAr ? 'سجل الآن' : 'Enroll Now',
    apply: isAr ? 'قدم الآن' : 'Apply Now',
    programs: [
      {
        title: isAr ? 'برنامج المرحلة الابتدائية (الصف 3-5)' : 'Grade 3-5 Remote Program',
        desc: isAr ? 'يوفر برنامجنا للصفوف 3-5 تجربة تعليمية متوازنة عبر الإنترنت تعزز الأكاديميين، وتبني المهارات اللغوية، وتغذي هوية إسلامية قوية.' : 'Our Grades 3–5 program provides a balanced and engaging online learning experience that strengthens academics, builds language skills, and nurtures a strong Islamic identity.',
        icon: BookOpen,
        schedule: isAr ? 'الإثنين - الخميس' : 'Monday–Thursday',
        subjects: isAr ? 'الإنجليزية، الرياضيات، القرآن، العربية والدراسات الإسلامية' : 'English, Math, Quran, Arabic & Islamic Studies',
        image: "https://picsum.photos/seed/grade35/600/400"
      },
      {
        title: isAr ? 'برنامج المرحلة المتوسطة والثانوية (6-12)' : '6-12 Remote Program',
        desc: isAr ? 'برنامجنا للمرحلة الإعدادية والثانوية مبني لدعم الطلاب أكاديمياً، وتعزيز مهاراتهم في اللغة الإنجليزية، وتوفير بيئة تعليمية منظمة.' : 'Our Middle & High School program (Grades 6–12) is fully online and built to support students academically, strengthen their English skills, and provide a structured learning environment.',
        icon: GraduationCap,
        schedule: isAr ? 'مرن مع متابعة أسبوعية' : 'Flexible with Weekly Tracking',
        subjects: isAr ? 'الإنجليزية (Edgenuity)، الدراسات الإسلامية والقرآن' : 'English (Edgenuity), Islamic Studies & Qur’an',
        image: "https://picsum.photos/seed/grade612/600/400"
      },
      {
        title: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
        desc: isAr ? 'مصمم لمساعدة الأطفال في الخارج على تطوير هوية إسلامية واثقة مع تعزيز معرفتهم باللغة العربية والقرآن.' : 'Designed to help children abroad develop a confident Islamic identity while strengthening their Arabic and Quranic knowledge.',
        icon: Calendar,
        schedule: isAr ? 'السبت والأحد' : 'Saturday & Sunday',
        subjects: isAr ? 'التجويد، قواعد اللغة العربية، العبادة والقيم الإسلامية' : 'Tajweed, Arabic Grammar, Worship & Islamic Values',
        image: "https://picsum.photos/seed/weekend/600/400"
      }
    ]
  };

  return (
    <div className="py-24">
      <div className="container px-4 md:px-8">
        <div className="max-w-3xl mb-20">
          <h1 className="text-4xl font-extrabold text-primary mb-6">{t.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{t.subtitle}</p>
          <Button asChild size="lg" className="mt-8 bg-secondary hover:bg-secondary/90 text-primary font-bold">
            <Link href={`/${lang}/enroll`}>{t.enrollNow}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {t.programs.map((prog, idx) => (
            <div key={idx} className="premium-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="p-8 lg:p-12 space-y-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <prog.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">{prog.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{prog.desc}</p>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="font-bold text-primary min-w-[100px]">{isAr ? 'الجدول:' : 'Schedule:'}</div>
                      <div className="text-muted-foreground">{prog.schedule}</div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="font-bold text-primary min-w-[100px]">{isAr ? 'المواد:' : 'Subjects:'}</div>
                      <div className="text-muted-foreground">{prog.subjects}</div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button asChild className="bg-primary">
                      <Link href={`/${lang}/enroll`}>{t.apply}</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto min-h-[300px]">
                <Image 
                  src={prog.image} 
                  alt={prog.title} 
                  fill 
                  className="object-cover" 
                  data-ai-hint="student study"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
