
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen, Calendar, Users, Star, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const getProgramData = (id: string, isAr: boolean) => {
  const programs: Record<string, any> = {
    'grades-3-5': {
      name: isAr ? 'برنامج المرحلة الابتدائية (الصفوف 3-5)' : 'Grade 3–5 Remote Program',
      intro: isAr 
        ? 'يوفر برنامجنا للصفوف 3-5 تجربة تعليمية متوازنة وجذابة عبر الإنترنت تعزز الأسس الأكاديمية وتبني المهارات اللغوية وتغذي الهوية الإسلامية القوية. يتبع الطلاب جدولاً منظماً يجمع بين المواد الأكاديمية الأمريكية والتعليم الديني في بيئة تعلم تفاعلية.'
        : 'Our Grades 3–5 program provides a balanced and engaging online learning experience that strengthens academic foundations, builds language skills, and nurtures a strong Islamic identity. Students attend live classes Monday through Thursday, following a structured schedule that combines American academic subjects with Quran, Arabic, and Islamic Studies.',
      learn: isAr 
        ? 'يدرس الطلاب المنهج الأكاديمي الأمريكي الذي يشمل اللغة الإنجليزية والرياضيات مع التركيز على أسس القراءة والكتابة. تليها فترة مخصصة للقرآن الكريم (تلاوة وحفظ بالتجويد)، واللغة العربية، والدراسات الإسلامية التي تغطي العبادات والقيم والأخلاق.'
        : 'Students study the American academic curriculum including English and Mathematics in the morning block, focusing on strong foundations in reading, writing, and math. This is followed by a block for Quran (recitation and memorization with Tajweed), Arabic language, and Islamic Studies focusing on worship, values, and character.',
      schedule: isAr 
        ? 'أيام الدراسة هي من الإثنين إلى الخميس. يبدأ اليوم بالفترة الصباحية للمواد الأكاديمية، تليها الفترة المخصصة للقرآن واللغة العربية والدراسات الإسلامية. يتم تقديم البرنامج بالكامل عبر الإنترنت من خلال فصول دراسية مباشرة ومنظمة.'
        : 'Classes are held Monday–Thursday. The schedule includes a morning block for English and Mathematics, followed by a block for Arabic, Quran, and Islamic Studies. The program is fully online with live, structured classes from home.',
      teachers: isAr 
        ? 'يتم تقديم الدروس من خلال معلمين متخصصين يقودون حصصاً تفاعلية تهدف لبناء ثقة الطالب. يقوم المعلمون بمتابعة دقيقة لكل طالب لضمان التفاعل المستمر وتقديم المساعدة الشخصية في المواد الأكاديمية والدينية، مع مراعاة الفروق الفردية.'
        : 'The academy features specialized teachers who lead interactive online lessons designed to build confidence. Teachers provide personalized attention and maintain communication with parents and administration about attendance, progress, and additional support needs.',
      features: isAr 
        ? 'روتين تعليمي أسبوعي منظم، مزيج متكامل بين التعليم الأكاديمي والإسلامي، تدريس حي ومباشر عبر الإنترنت، تطوير مهارات اللغة العربية، وتحفيز الطلاب على حفظ القرآن الكريم بأسلوب تربوي محبب.'
        : 'Structured weekly learning routine, combination of academic and Islamic education, live online instruction, Arabic language development, and Quran recitation and memorization practice with age-appropriate Islamic learning.',
      outcomes: isAr 
        ? 'تطوير مهارات القراءة والكتابة بالعربية، تحسين تلاوة وحفظ القرآن بالتجويد، فهم عميق للمفاهيم الإسلامية، الجاهزية الأكاديمية وفق المعايير الأمريكية، وبناء هوية إسلامية واثقة مرتبطة بالدين واللغة.'
        : 'Stronger Arabic reading and writing skills, improved Quran recitation and Tajweed, meaningful understanding of core Islamic concepts, academic readiness aligned with American standards, and a confident identity rooted in faith.',
      image: "https://picsum.photos/seed/grade35/1200/600"
    },
    'grades-6-12': {
      name: isAr ? 'المرحلة المتوسطة والثانوية (الصفوف 6-12)' : 'Grades 6–12 Remote Program',
      intro: isAr 
        ? 'برنامج متكامل للمرحلتين المتوسطة والثانوية مصمم لدعم الطلاب أكاديمياً وتعزيز مهاراتهم في اللغة الإنجليزية من خلال بيئة تعليمية منظمة ومرنة تساعدهم على البقاء في المسار الصحيح نحو التخرج.'
        : 'Our Middle and High School program for Grades 6–12 is fully online and designed to support students academically, strengthen their English skills, and provide a structured learning environment that helps them stay on track.',
      learn: isAr 
        ? 'يستخدم الطلاب منصة Edgenuity لإكمال منهج اللغة الإنجليزية. بالإضافة إلى ذلك، يتضمن البرنامج دراسات إسلامية وقرآن كريم تشمل التجويد، القيم، الفقه المبسط للمراهقين، والقصص التي تشجع على بناء الشخصية القوية.'
        : 'Students use the Edgenuity platform to complete their English curriculum online. The program also includes age-appropriate Islamic learning such as Quran recitation with Tajweed, Islamic manners, simple fiqh for teenagers, and character-building stories.',
      schedule: isAr 
        ? 'برنامج مرن عبر الإنترنت مع نظام متابعة دقيق. يُتوقع من الطلاب إنهاء 5-7% من المنهج يومياً (من الإثنين للجمعة)، مع تتبع أسبوعي للتقدم والدرجات لضمان الجدية والالتزام.'
        : 'Fully online lessons and support offering flexibility for families while maintaining a structured learning plan. All monitoring and support activities follow a consistent weekly progress tracking schedule.',
      teachers: isAr 
        ? 'يقوم الفريق بمراقبة التقدم أسبوعياً والتواصل مع الأهالي. يوفر المعلمون دعماً أكاديمياً فردياً (واحد لواحد) لمساعدة الطلاب في فهم الدروس، إكمال المهام، وتنظيم الوقت والتحضير للاختبارات والمشاريع.'
        : 'The academy team monitors each student\'s progress and grades weekly, communicates updates to parents regularly, and provides one-on-one academic support for understanding lessons, completing assignments, and improving reading and writing skills.',
      features: isAr 
        ? 'منهج إنجليزي عبر منصة متطورة، مراقبة أسبوعية دقيقة، تواصل دوري مع الأهالي، تدخل مبكر عند تعثر الطالب، دعم أكاديمي فردي، وإرشاد ديني يتناسب مع احتياجات الشباب.'
        : 'Online English coursework through Edgenuity, weekly monitoring of progress and grades, regular parent communication, early intervention, one-on-one academic assistance, and age-appropriate Islamic learning.',
      outcomes: isAr 
        ? 'إكمال المناهج بنجاح، تطوير مهارات التعلم المستقل والتنظيم، تحسين مهارات القراءة والكتابة الأكاديمية، زيادة الوعي بالمسؤوليات الدراسية، وتعميق المعرفة بالقيم الإسلامية والتجويد.'
        : 'Consistent completion of online coursework, stronger independent learning and organizational skills, improved reading and writing, greater awareness of academic responsibilities, and deeper Islamic knowledge.',
      image: "https://picsum.photos/seed/grade612/1200/600"
    },
    'weekend': {
      name: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
      intro: isAr 
        ? 'يهدف هذا البرنامج إلى مساعدة الأطفال المقيمين في الخارج على تطوير هوية إسلامية واثقة ومتوازنة من خلال دروس حية وتفاعلية تقربهم من لغتهم العربية ودينهم الحنيف من المنزل.'
        : 'Our Weekend Program is designed to help children living abroad develop a confident Islamic identity while strengthening their Arabic and Quranic knowledge through engaging live online lessons.',
      learn: isAr 
        ? 'يركز البرنامج على تلاوة القرآن الكريم بالتجويد، قواعد اللغة العربية، مهارات الكتابة والمحادثة، بالإضافة إلى الدراسات الإسلامية التي تربط العقيدة بالعبادات والقيم في الحياة اليومية.'
        : 'Students learn Quran recitation and Tajweed, Arabic language (grammar, writing, and speaking), and Islamic Studies focusing on values, worship, and character development in everyday life.',
      schedule: isAr 
        ? 'تقام الدروس يومي السبت والأحد عبر الإنترنت. تتوفر ثلاث فترات زمنية ليختار منها أولياء الأمور: من 8-10 صباحاً، أو 10-12 ظهراً، أو 12-2 ظهراً (بتوقيت شرق أمريكا).'
        : 'Classes are held Saturday and Sunday. Available time slots: 8:00 AM–10:00 AM, 10:00 AM–12:00 PM, or 12:00 PM–2:00 PM (Eastern Time). Parents choose one session.',
      teachers: isAr 
        ? 'تضم الأكاديمية معلمين مؤهلين وذوي خبرة واسعة في تعليم العربية والقرآن للأطفال. يقدم المعلمون اهتماماً شخصياً ويحرصون على التواصل مع الإدارة والأهالي بشأن الحضور والتقدم الأكاديمي والسلوكي.'
        : 'Teachers are highly qualified and experienced in teaching Arabic, Quran, and Islamic Studies to children. They provide personalized attention and maintain communication with parents and administration about student progress.',
      features: isAr 
        ? 'حصص حية وتفاعلية، تعليم مخصص لربط الطفل بهويته، فصول دراسية صغيرة لضمان الجودة، متابعة مستمرة لمستوى الطالب، وبيئة تعلم محفزة تدعم القيم الأخلاقية.'
        : 'Live online weekend lessons, Quran and Tajweed instruction, Arabic grammar and writing development, spoken Arabic practice, personalized attention, and support for Islamic identity development.',
      outcomes: isAr 
        ? 'دقة في تلاوة القرآن، طلاقة في التحدث بالعربية، فهم أعمق للعبادات الإسلامية، بناء شخصية مسلمة واثقة، وارتباط قوي باللغة العربية كجزء لا يتجزأ من الهوية.'
        : 'More accurate Quranic recitation, stronger Arabic language skills, better communication, greater understanding of Islamic practices, and a confident Islamic character.',
      image: "https://picsum.photos/seed/weekend/1200/600"
    }
  };
  return programs[id];
};

export default async function ProgramDetailPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = await params;
  const isAr = lang === 'ar';
  const data = getProgramData(id, isAr);

  if (!data) notFound();

  const sectionLabel = (en: string, ar: string) => isAr ? ar : en;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[35vh] sm:h-[45vh] min-h-[250px]">
        <Image src={data.image} alt={data.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="container-tight">
             <Link 
              href={`/${lang}/programs`} 
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-bold text-sm mb-6 transition-all"
            >
              {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {sectionLabel('Back to Programs', 'العودة للبرامج')}
            </Link>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-2xl">
              {data.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-tight py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 1 & 2. Name and Intro */}
            <section className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-secondary/10 rounded-full text-secondary font-black text-xs uppercase tracking-widest">
                <Star className="h-4 w-4" />
                {sectionLabel('Program Overview', 'نبذة عن البرنامج')}
              </div>
              <p className="text-xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-secondary pl-6">
                {data.intro}
              </p>
            </section>

            {/* 3. What Students Learn */}
            <section className="space-y-6 p-8 sm:p-10 bg-slate-50 rounded-[2rem] border border-slate-100">
              <h3 className="text-2xl font-black text-primary flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-secondary" />
                {sectionLabel('What Students Learn', 'ما يتعلمه الطلاب')}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {data.learn}
              </p>
            </section>

            {/* 4. Study Schedule */}
            <section className="space-y-6">
              <h3 className="text-2xl font-black text-primary flex items-center gap-4">
                <Calendar className="h-6 w-6 text-secondary" />
                {sectionLabel('Study Schedule', 'الجدول الدراسي')}
              </h3>
              <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-lg text-primary font-bold leading-relaxed">
                {data.schedule}
              </div>
            </section>

            {/* 5. Teachers */}
            <section className="space-y-6 p-8 sm:p-10 bg-secondary/5 rounded-[2rem] border border-secondary/10">
              <h3 className="text-2xl font-black text-primary flex items-center gap-4">
                <Users className="h-6 w-6 text-secondary" />
                {sectionLabel('Teachers & Monitoring', 'المعلمون والمتابعة')}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {data.teachers}
              </p>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-10">
            {/* 6. Key Features */}
            <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100 space-y-6">
              <h3 className="text-xl font-black text-primary uppercase tracking-tight border-b pb-4">
                {sectionLabel('Key Features', 'أبرز المميزات')}
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

            {/* 7. Expected Outcomes */}
            <div className="bg-primary p-8 rounded-[2rem] text-white space-y-6">
              <h3 className="text-xl font-black uppercase tracking-tight border-b border-white/10 pb-4">
                {sectionLabel('Expected Outcomes', 'المخرجات المتوقعة')}
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

            {/* Enroll CTA */}
            <div className="pt-6">
              <Link href={`/${lang}/enroll`}>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-black h-16 rounded-2xl shadow-xl shadow-secondary/20 transition-all scale-100 hover:scale-[1.02] active:scale-[0.98]">
                  {sectionLabel('Enroll Your Child Now', 'سجل طفلك الآن')}
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
