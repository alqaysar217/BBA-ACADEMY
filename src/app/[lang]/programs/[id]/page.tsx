import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen, Calendar, Users, Star, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const getProgramData = (id: string, isAr: boolean) => {
  const programs: Record<string, any> = {
    'grades-3-5': {
      name: isAr ? 'برنامج المرحلة الابتدائية (الصفوف 3-5)' : 'Grade 3–5 Remote Program',
      intro: isAr 
        ? 'يوفر برنامجنا للصفوف 3-5 تجربة تعليمية متوازنة وجذابة عبر الإنترنت تعزز الأسس الأكاديمية وتبني المهارات اللغوية وتغذي الهوية الإسلامية القوية.'
        : 'Our Grades 3–5 program provides a balanced and engaging online learning experience that strengthens academic foundations and builds language skills.',
      learn: isAr 
        ? 'يدرس الطلاب المنهج الأكاديمي الأمريكي (اللغة الإنجليزية والرياضيات) مع التركيز على أسس القراءة والكتابة. تليها دروس اللغة العربية والقرآن الكريم.'
        : 'Students study the American academic curriculum focusing on reading, writing, and math foundations, followed by Arabic and Quran.',
      schedule: isAr 
        ? 'الأيام: من الإثنين إلى الخميس. الفترة الصباحية: الإنجليزية والرياضيات. الفترة التالية: العربية والقرآن والدراسات الإسلامية.'
        : 'Days: Monday–Thursday. Morning Block: English and Mathematics. Following Block: Arabic, Quran, and Islamic Studies.',
      teachers: isAr 
        ? 'يتم تقديم الدروس من خلال معلمين متخصصين يقودون حصصاً تفاعلية تهدف لبناء ثقة الطالب ومتابعة دقيقة لكل طالب.'
        : 'Interactive online lessons designed to build confidence. Teachers provide personalized attention and maintain communication.',
      features: isAr 
        ? 'روتين تعليمي أسبوعي منظم، مزيج متكامل بين التعليم الأكاديمي والإسلامي، تدريس حي ومباشر عبر الإنترنت، تطوير مهارات اللغة العربية.'
        : 'Structured weekly learning routine, Academic and Islamic education combination, Live online instruction, Arabic language development.',
      outcomes: isAr 
        ? 'مهارات قوية في القراءة والكتابة بالعربية، تحسين تلاوة وحفظ القرآن بالتجويد، فهم عميق للمفاهيم الإسلامية، جاهزية أكاديمية.'
        : 'Stronger Arabic reading and writing, Improved Quran recitation and Tajweed, Meaningful understanding of core Islamic concepts.',
      image: "/program-1.png"
    },
    'grades-6-12': {
      name: isAr ? 'المرحلة المتوسطة والثانوية (الصفوف 6-12)' : 'Grades 6–12 Remote Program',
      intro: isAr 
        ? 'برنامج متكامل للمرحلة المتوسطة والثانوية مصمم لدعم الطلاب أكاديمياً وتعزيز مهاراتهم في اللغة الإنجليزية من خلال بيئة تعليمية منظمة.'
        : 'Our Middle and High School program for Grades 6–12 is fully online and designed to support students academically and strengthen English skills.',
      learn: isAr 
        ? 'منهج اللغة الإنجليزية عبر Edgenuity، بالإضافة إلى تعليم إسلامي عملي يشمل القرآن الكريم بالتجويد، آداب وقيم إسلامية، وفقه مبسط.'
        : 'English curriculum through Edgenuity, plus practical Islamic learning including Quran with Tajweed and character-building stories.',
      schedule: isAr 
        ? 'برنامج مرن عبر الإنترنت مع تتبع أسبوعي للتقدم. يقدم الفريق دعماً وتوجيهاً مستمراً لضمان بقاء الطالب في المسار الصحيح.'
        : 'Flexible online learning with weekly progress tracking. The team provides consistent support to keep students on track.',
      teachers: isAr 
        ? 'يقوم الفريق بمراقبة التقدم أسبوعياً والتواصل مع الأهالي. يوفر المعلمون دعماً أكاديمياً فردياً لمساعدة الطلاب في فهم الدروس.'
        : 'Weekly monitoring of progress and grades, regular parent communication, and one-on-one assistance with lessons and assignments.',
      features: isAr 
        ? 'منهج إنجليزي عبر Edgenuity، تتبع أسبوعي للتقدم، تواصل دوري مع أولياء الأمور، تدخل مبكر عند تعثر الطالب، دعم أكاديمي فردي.'
        : 'Online English via Edgenuity, Weekly monitoring, Regular parent communication, Early intervention, One-on-one assistance.',
      outcomes: isAr 
        ? 'إكمال الدورات عبر الإنترنت بانتظام، مهارات تعلم مستقل وتنظيم قوية، تحسين القراءة والكتابة الأكاديمية، وعي أكبر بالمسؤوليات.'
        : 'Consistent course completion, Stronger independent learning and organization, Improved reading and writing, Greater academic awareness.',
      image: "/program-2.png"
    },
    'weekend': {
      name: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
      intro: isAr 
        ? 'مصمم لمساعدة الأطفال المقيمين في الخارج على تطوير هوية إسلامية واثقة مع تعزيز معارفهم في اللغة العربية والقرآن الكريم.'
        : 'Designed to help children living abroad develop a confident Islamic identity while strengthening Arabic and Quranic knowledge.',
      learn: isAr 
        ? 'القرآن الكريم والتجويد، قواعد اللغة العربية، مهارات الكتابة، وممارسة المحادثة. بالإضافة إلى دراسات إسلامية تتناول العبادات والقيم.'
        : 'Quran and Tajweed, Arabic grammar, Writing skills, and Speaking practice. Plus Islamic Studies covering worship and values.',
      schedule: isAr 
        ? 'الأيام: السبت والأحد. الفترات المتاحة (بتوقيت شرق أمريكا): 8-10 صباحاً، 10-12 ظهراً، أو 12-2 ظهراً.'
        : 'Days: Saturday and Sunday. Available slots (Eastern Time): 8:00 AM–10:00 AM, 10:00 AM–12:00 PM, or 12:00 PM–2:00 PM.',
      teachers: isAr 
        ? 'معلمون مؤهلون وذوي خبرة واسعة في تعليم الأطفال المقيمين في الخارج. يقدم المعلمون اهتماماً شخصياً وتواصلاً مستمراً مع الأهالي.'
        : 'Highly qualified and experienced teachers. They provide personalized attention and maintain open communication with parents.',
      features: isAr 
        ? 'دروس حية في عطلة نهاية الأسبوع، تعليم القرآن بالتجويد، تطوير قواعد وكتابة العربية، ممارسة المحادثة، دراسات إسلامية عملية.'
        : 'Live weekend lessons, Quran and Tajweed instruction, Arabic grammar and writing, Spoken Arabic practice, Practical Islamic Studies.',
      outcomes: isAr 
        ? 'تلاوة أكثر دقة للقرآن، إلمام أفضل بالتجويد، مهارات لغوية عربية قوية، تواصل وكتابة أفضل بالعربية، شخصية إسلامية واثقة.'
        : 'More accurate Quranic recitation, Improved Tajweed familiarity, Stronger Arabic language skills, Confident Islamic character.',
      image: "/program-3.png"
    }
  };
  return programs[id];
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale, id: string }> }): Promise<Metadata> {
  const { lang, id } = await params;
  const isAr = lang === 'ar';
  const data = getProgramData(id, isAr);

  if (!data) return {};

  return {
    title: data.name,
    description: data.intro,
    openGraph: {
      title: data.name,
      description: data.intro,
      images: [{ url: '/logo.png' }],
      type: 'article',
    }
  };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = await params;
  const isAr = lang === 'ar';
  const data = getProgramData(id, isAr);

  if (!data) notFound();

  const sectionLabel = (en: string, ar: string) => isAr ? ar : en;
  const splitList = (text: string) => {
    if (!text) return [];
    return text.split(/[،,]/).map(s => s.trim()).filter(Boolean);
  };

  return (
    <div className="bg-white">
      <div className="relative h-[30vh] sm:h-[40vh] min-h-[200px]">
        <Image src={data.image} alt={data.name} fill className="object-cover" priority unoptimized />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="container-tight">
            <Link 
              href={`/${lang}/programs`} 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm mb-4 transition-all"
            >
              {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {sectionLabel('Back to Programs', 'العودة للبرامج')}
            </Link>
            <h1 className="text-2xl sm:text-5xl font-black text-white leading-tight drop-shadow-2xl uppercase">
              {data.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-tight py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full text-secondary font-black text-[10px] uppercase tracking-[0.2em]">
                <Star className="h-3 w-3" />
                {sectionLabel('Program Overview', 'الفقرة التعريفية')}
              </div>
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-bold italic border-l-4 border-secondary pl-6">
                {data.intro}
              </p>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-primary flex items-center gap-4 border-b pb-4 uppercase">
                <BookOpen className="h-6 w-6 text-secondary" />
                {sectionLabel('What Students Learn', 'ما يتعلمه الطلاب')}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                {data.learn}
              </p>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-primary flex items-center gap-4 border-b pb-4 uppercase">
                <Calendar className="h-6 w-6 text-secondary" />
                {sectionLabel('Study Schedule', 'الجدول الدراسي')}
              </h3>
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 text-base sm:text-lg text-primary font-bold leading-relaxed">
                {data.schedule}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-primary flex items-center gap-4 border-b pb-4 uppercase">
                <Users className="h-6 w-6 text-secondary" />
                {sectionLabel('Experienced Teachers', 'المعلمون والمتابعة')}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                {data.teachers}
              </p>
            </section>
          </div>

          <div className="space-y-10">
            <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100 space-y-6">
              <h3 className="text-lg font-black text-primary uppercase tracking-tight border-b pb-4">
                {sectionLabel('Key Program Features', 'المميزات')}
              </h3>
              <ul className="space-y-4">
                {splitList(data.features).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="font-bold text-slate-700 text-xs sm:text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary p-8 rounded-[2rem] text-white space-y-6 shadow-2xl shadow-primary/20">
              <h3 className="text-lg font-black uppercase tracking-tight border-b border-white/10 pb-4">
                {sectionLabel('Expected Learning Outcomes', 'المخرجات التعليمية المتوقعة')}
              </h3>
              <div className="space-y-4">
                {splitList(data.outcomes).map((outcome, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                    <span className="font-bold text-xs sm:text-sm leading-relaxed opacity-90">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button asChild className="w-full bg-secondary hover:bg-white hover:text-secondary text-white font-black h-16 rounded-2xl shadow-xl transition-all border-2 border-transparent hover:border-secondary">
                <Link href={`/${lang}/enroll`}>
                  {sectionLabel('Enroll Now', 'سجل الآن')}
                  {isAr ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
