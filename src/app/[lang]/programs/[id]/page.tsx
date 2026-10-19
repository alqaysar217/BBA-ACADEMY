
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen, Calendar, Users, Target, Star, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';

const getProgramData = (id: string, isAr: boolean) => {
  const programs: Record<string, any> = {
    'grades-3-5': {
      name: isAr ? 'برنامج المرحلة الابتدائية (الصفوف 3-5)' : 'Grade 3–5 Remote Program',
      intro: isAr 
        ? 'يوفر برنامجنا للصفوف 3-5 تجربة تعليمية متوازنة وجذابة عبر الإنترنت تعزز الأسس الأكاديمية وتبني المهارات اللغوية وتغذي الهوية الإسلامية القوية. يتبع الطلاب جدولاً منظماً يجمع بين المواد الأكاديمية الأمريكية والتعليم الديني في بيئة تعلم تفاعلية.'
        : 'Our Grades 3–5 program provides a balanced and engaging online learning experience that strengthens academic foundations, builds language skills, and nurtures a strong Islamic identity. Students follow a structured schedule that combines American academic subjects with Islamic education.',
      learn: isAr 
        ? 'يدرس الطلاب في الفترة الصباحية المنهج الأكاديمي الأمريكي الذي يشمل اللغة الإنجليزية والرياضيات مع التركيز على أسس القراءة والكتابة. تليها فترة مخصصة للقرآن الكريم (تلاوة وحفظ بالتجويد)، واللغة العربية، والدراسات الإسلامية التي تغطي العبادات والقيم والأخلاق.'
        : 'Students study the American academic curriculum including English and Mathematics in the morning block. This is followed by a block for Quran (recitation and memorization with Tajweed), Arabic language, and Islamic Studies focusing on worship, values, and character.',
      schedule: isAr 
        ? 'أيام الدراسة هي من الإثنين إلى الخميس. يبدأ اليوم بالفترة الصباحية للمواد الأكاديمية، تليها الفترة المخصصة للقرآن واللغة العربية والدراسات الإسلامية. يتم تقديم البرنامج بالكامل عبر الإنترنت من خلال فصول دراسية مباشرة ومنظمة.'
        : 'Classes are held Monday–Thursday. The day starts with a morning block for academic subjects, followed by a block for Quran, Arabic, and Islamic Studies. The program is fully online with live, structured classes.',
      teachers: isAr 
        ? 'يتم تقديم الدروس من خلال معلمين متخصصين في التعليم عن بعد، حيث يقودون حصصاً تفاعلية تهدف لبناء ثقة الطالب. يقوم المعلمون بمتابعة دقيقة لكل طالب لضمان التفاعل المستمر وتقديم المساعدة الشخصية في المواد الأكاديمية والدينية.'
        : 'Lessons are delivered by specialized remote learning teachers who lead interactive sessions designed to build student confidence. Teachers provide close monitoring for every student to ensure consistent engagement and personalized assistance.',
      features: isAr 
        ? 'روتين تعليمي أسبوعي منظم، مزيج متكامل بين التعليم الأكاديمي والإسلامي، تدريس حي ومباشر عبر الإنترنت، تركيز خاص على تطوير اللغة العربية، وتحفيز الطلاب على حفظ القرآن الكريم بأسلوب محبب.'
        : 'Structured weekly routine, integrated academic and Islamic education, live online instruction, specific focus on Arabic language development, and encouraging Quran memorization in an engaging manner.',
      outcomes: isAr 
        ? 'تطوير مهارات القراءة والكتابة بالعربية، تحسين تلاوة وحفظ القرآن بالتجويد، فهم عميق للمفاهيم الإسلامية الأساسية، الجاهزية الأكاديمية للمراحل القادمة، وبناء هوية إسلامية واثقة مرتبطة بالدين واللغة.'
        : 'Stronger Arabic literacy skills, improved Quran recitation and Tajweed, deep understanding of core Islamic concepts, academic readiness for future grades, and a confident Islamic identity rooted in faith.',
      image: "https://picsum.photos/seed/grade35/1200/600",
      icon: BookOpen
    },
    'grades-6-12': {
      name: isAr ? 'المرحلة المتوسطة والثانوية (الصفوف 6-12)' : 'Grades 6–12 Remote Program',
      intro: isAr 
        ? 'برنامج متكامل للمرحلتين المتوسطة والثانوية مصمم لدعم الطلاب أكاديمياً وتعزيز مهاراتهم في اللغة الإنجليزية من خلال بيئة تعليمية منظمة ومرنة تساعدهم على البقاء في المسار الصحيح نحو التخرج.'
        : 'A comprehensive Middle and High School program designed to support students academically and strengthen their English skills through a structured and flexible learning environment that helps them stay on track for graduation.',
      learn: isAr 
        ? 'يستخدم الطلاب منصة Edgenuity لإكمال منهج اللغة الإنجليزية. بالإضافة إلى ذلك، يتضمن البرنامج دراسات إسلامية وقرآن كريم تشمل التجويد، القيم، الفقه المبسط للمراهقين، والقصص التي تشجع على بناء الشخصية القوية.'
        : 'Students use the Edgenuity platform for English curriculum. The program also includes Islamic Studies and Quran covering Tajweed, values, simple fiqh for teenagers, and stories that encourage strong character building.',
      schedule: isAr 
        ? 'برنامج مرن عبر الإنترنت مع نظام متابعة دقيق. يُتوقع من الطلاب إنهاء 5-7% من المنهج يومياً (من الإثنين للجمعة)، مع تتبع أسبوعي للتقدم والدرجات لضمان عدم التأخر في المناهج.'
        : 'A flexible online program with a rigorous monitoring system. Students are expected to complete 5–7% of coursework each weekday, with weekly progress and grade tracking to ensure they stay on schedule.',
      teachers: isAr 
        ? 'يقوم فريق الأكاديمية بمراقبة تقدم الطلاب أسبوعياً والتواصل المستمر مع أولياء الأمور. يوفر المعلمون دعماً أكاديمياً فردياً (واحد لواحد) لمساعدة الطلاب في فهم الدروس، إكمال المهام، وتنظيم المهام الأسبوعية والتحضير للاختبارات.'
        : 'The academy team monitors progress weekly and maintains regular parent communication. Teachers provide one-on-one academic support to help students understand lessons, complete assignments, organize tasks, and prepare for exams.',
      features: isAr 
        ? 'منهج إنجليزي عبر منصة عالمية، مراقبة أسبوعية دقيقة، تواصل دوري مع الأهالي، تدخل مبكر عند تعثر الطالب، دعم أكاديمي فردي، وإرشاد ديني يتناسب مع احتياجات المراهقين.'
        : 'English curriculum via global platform, rigorous weekly monitoring, regular parent communication, early intervention, one-on-one academic support, and age-appropriate Islamic guidance.',
      outcomes: isAr 
        ? 'إكمال المناهج بنجاح، تطوير مهارات التعلم المستقل والتنظيم، تحسين مهارات القراءة والكتابة الأكاديمية، زيادة الوعي بالمسؤوليات الدراسية، وتعميق المعرفة بالقيم الإسلامية والتجويد.'
        : 'Successful coursework completion, stronger independent learning and organizational skills, improved academic literacy, greater academic responsibility, and deeper Islamic knowledge and Tajweed skills.',
      image: "https://picsum.photos/seed/grade612/1200/600",
      icon: GraduationCap
    },
    'weekend': {
      name: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
      intro: isAr 
        ? 'يهدف هذا البرنامج إلى مساعدة الأطفال المقيمين في الخارج على تطوير هوية إسلامية واثقة ومتوازنة من خلال دروس حية وتفاعلية تقربهم من لغتهم العربية ودينهم الحنيف.'
        : 'This program aims to help children living abroad develop a confident and balanced Islamic identity through live interactive lessons that connect them with their Arabic language and faith.',
      learn: isAr 
        ? 'يركز البرنامج على تلاوة القرآن الكريم بالتجويد، قواعد اللغة العربية، مهارات الكتابة والمحادثة، بالإضافة إلى الدراسات الإسلامية التي تربط العقيدة بالعبادات والقيم في الحياة اليومية.'
        : 'The program focuses on Quran recitation with Tajweed, Arabic grammar, writing and speaking skills, and Islamic Studies connecting faith to daily worship and values.',
      schedule: isAr 
        ? 'تقام الدروس يومي السبت والأحد عبر الإنترنت. تتوفر ثلاث فترات زمنية ليختار منها أولياء الأمور: من 8-10 صباحاً، أو 10-12 ظهراً، أو 12-2 ظهراً (بتوقيت شرق أمريكا).'
        : 'Classes are held Saturdays and Sundays online. Three time slots are available: 8-10 AM, 10-12 PM, or 12-2 PM (Eastern Time).',
      teachers: isAr 
        ? 'تضم الأكاديمية معلمين مؤهلين وذوي خبرة واسعة في تعليم العربية والقرآن للأطفال. يقدم المعلمون اهتماماً شخصياً ويحرصون على التواصل مع الإدارة والأهالي بشأن الحضور والتقدم الأكاديمي.'
        : 'The academy features highly qualified teachers experienced in teaching Arabic and Quran to children. Teachers provide personalized attention and maintain communication regarding attendance and progress.',
      features: isAr 
        ? 'حصص حية وتفاعلية، تعليم مخصص لربط الطفل بهويته، فصول دراسية صغيرة لضمان الجودة، متابعة مستمرة لمستوى الطالب، وبيئة تعلم محفزة من داخل المنزل.'
        : 'Live interactive lessons, personalized identity-building education, small class sizes for quality, continuous progress monitoring, and a stimulating home learning environment.',
      outcomes: isAr 
        ? 'دقة في تلاوة القرآن، طلاقة في التحدث بالعربية، فهم أعمق للعبادات الإسلامية، بناء شخصية مسلمة واثقة، وارتباط قوي باللغة العربية كجزء من الهوية.'
        : 'Accurate Quran recitation, fluency in spoken Arabic, deeper understanding of Islamic worship, a confident Muslim character, and a strong connection to Arabic as part of identity.',
      image: "https://picsum.photos/seed/weekend/1200/600",
      icon: Calendar
    }
  };
  return programs[id];
};

export default async function ProgramDetailPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = await params;
  const isAr = lang === 'ar';
  const data = getProgramData(id, isAr);

  if (!data) notFound();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[40vh] sm:h-[50vh] min-h-[300px]">
        <Image src={data.image} alt={data.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="container-tight space-y-4">
             <Link 
              href={`/${lang}/programs`} 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm mb-4 transition-all"
            >
              {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {isAr ? 'العودة للبرامج' : 'Back to Programs'}
            </Link>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-xl">
              {data.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-tight py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Main Content Areas */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* 1. اسم البرنامج & 2. الفقرة التعريفية */}
            <section className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/10 rounded-full text-secondary font-black text-xs uppercase tracking-widest">
                <Star className="h-4 w-4" />
                {isAr ? 'عن البرنامج' : 'Program Overview'}
              </div>
              <h2 className="text-3xl font-black text-primary">{data.name}</h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-secondary pl-6">
                {data.intro}
              </p>
            </section>

            {/* 3. ما يتعلمه الطلاب */}
            <section className="space-y-6 p-8 sm:p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-2xl font-black text-primary flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-secondary" />
                {isAr ? 'ما يتعلمه الطلاب' : 'What Students Learn'}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {data.learn}
              </p>
            </section>

            {/* 4. الجدول الدراسي */}
            <section className="space-y-6">
              <h3 className="text-2xl font-black text-primary flex items-center gap-4">
                <Calendar className="h-6 w-6 text-secondary" />
                {isAr ? 'الجدول الدراسي' : 'Study Schedule'}
              </h3>
              <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-lg text-primary font-bold leading-relaxed">
                {data.schedule}
              </div>
            </section>

            {/* 5. المعلمون */}
            <section className="space-y-6 p-8 sm:p-10 bg-secondary/5 rounded-[2.5rem] border border-secondary/10">
              <h3 className="text-2xl font-black text-primary flex items-center gap-4">
                <Users className="h-6 w-6 text-secondary" />
                {isAr ? 'المعلمون والمتابعة' : 'Teachers & Support'}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {data.teachers}
              </p>
            </section>
          </div>

          {/* Sidebar / Features & Outcomes */}
          <div className="space-y-12">
            {/* 6. المميزات */}
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-primary/5 border border-slate-100 space-y-6">
              <h3 className="text-xl font-black text-primary uppercase tracking-tight border-b pb-4">
                {isAr ? 'أبرز المميزات' : 'Key Features'}
              </h3>
              <ul className="space-y-4">
                {data.features.split('،').map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="font-bold text-slate-700 text-sm leading-relaxed">{feature.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7. المخرجات */}
            <div className="bg-primary p-8 rounded-[2rem] text-white space-y-6">
              <h3 className="text-xl font-black uppercase tracking-tight border-b border-white/10 pb-4">
                {isAr ? 'المخرجات المتوقعة' : 'Expected Outcomes'}
              </h3>
              <div className="space-y-4">
                {data.outcomes.split('،').map((outcome: string, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                    <span className="font-bold text-sm leading-relaxed opacity-90">{outcome.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Link href={`/${lang}/enroll`}>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-black h-16 rounded-2xl shadow-xl shadow-secondary/20 transition-all scale-105">
                  {isAr ? 'سجل طفلك الآن' : 'Enroll Now'}
                  {isAr ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
