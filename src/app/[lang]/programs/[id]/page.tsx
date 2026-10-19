
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
        ? 'يدرس الطلاب المنهج الأكاديمي الأمريكي (اللغة الإنجليزية والرياضيات) مع التركيز على أسس القراءة والكتابة. تليها دروس اللغة العربية والقرآن الكريم (تلاوة وحفظ بالتجويد)، والدراسات الإسلامية التي تغطي العبادات والقيم والأخلاق.'
        : 'Students study the American academic curriculum (English and Mathematics) focusing on reading, writing, and math foundations. This is followed by Arabic reading and writing, Quran recitation and memorization with Tajweed, and Islamic Studies on worship, values, and character.',
      schedule: isAr 
        ? 'الأيام: من الإثنين إلى الخميس. الفترة الصباحية: الإنجليزية والرياضيات. الفترة التالية: العربية والقرآن والدراسات الإسلامية. الشكل: نظام تعليمي كامل عبر الإنترنت مع حصص مباشرة.'
        : 'Days: Monday–Thursday. Morning Block: English and Mathematics. Following Block: Arabic, Quran, and Islamic Studies. Format: Fully online with live, structured classes from home.',
      teachers: isAr 
        ? 'يتم تقديم الدروس من خلال معلمين متخصصين يقودون حصصاً تفاعلية تهدف لبناء ثقة الطالب. يقوم المعلمون بمتابعة دقيقة لكل طالب لضمان التفاعل المستمر وتقديم المساعدة الشخصية، مع الحفاظ على تواصل دوري مع الإدارة والأهالي.'
        : 'Interactive online lessons designed to build confidence. Teachers provide personalized attention and maintain communication with parents and administration about attendance, progress, and support needs.',
      features: isAr 
        ? 'روتين تعليمي أسبوعي منظم، مزيج متكامل بين التعليم الأكاديمي والإسلامي، تدريس حي ومباشر عبر الإنترنت، تطوير مهارات اللغة العربية، ممارسة حفظ وتلاوة القرآن، تعلم إسلامي يتناسب مع الفئة العمرية.'
        : 'Structured weekly learning routine, Academic and Islamic education combination, Live online instruction, Arabic language development, Quran recitation and memorization practice, Age-appropriate Islamic learning.',
      outcomes: isAr 
        ? 'مهارات قوية في القراءة والكتابة بالعربية، تحسين تلاوة وحفظ القرآن بالتجويد، فهم عميق للمفاهيم الإسلامية، جاهزية أكاديمية وفق المعايير الأمريكية، هوية واثقة متجذرة في اللغة والدين.'
        : 'Stronger Arabic reading and writing, Improved Quran recitation and Tajweed, Meaningful understanding of core Islamic concepts, Academic readiness aligned with American standards, Confident identity rooted in faith.',
      image: "/program-1.png"
    },
    'grades-6-12': {
      name: isAr ? 'المرحلة المتوسطة والثانوية (الصفوف 6-12)' : 'Grades 6–12 Remote Program',
      intro: isAr 
        ? 'برنامج متكامل للمرحلة المتوسطة والثانوية مصمم لدعم الطلاب أكاديمياً وتعزيز مهاراتهم في اللغة الإنجليزية من خلال بيئة تعليمية منظمة ومرنة تساعدهم على البقاء في المسار الصحيح. يستخدم الطلاب منصة Edgenuity لإكمال المنهج.'
        : 'Our Middle and High School program for Grades 6–12 is fully online and designed to support students academically, strengthen their English skills, and provide a structured learning environment. Students use the Edgenuity platform to complete their English curriculum.',
      learn: isAr 
        ? 'منهج اللغة الإنجليزية عبر Edgenuity، بالإضافة إلى تعليم إسلامي عملي يشمل القرآن الكريم بالتجويد، آداب وقيم إسلامية، فقه مبسط للمراهقين، وقصص تربوية تشجع على بناء الشخصية.'
        : 'English curriculum through Edgenuity, plus practical Islamic learning including Quran with Tajweed, Islamic manners, simple fiqh for teenagers, and character-building stories.',
      schedule: isAr 
        ? 'برنامج مرن عبر الإنترنت مع تتبع أسبوعي للتقدم. يقدم الفريق دعماً وتوجيهاً مستمراً لضمان بقاء الطالب في المسار الصحيح، مع إمكانية الوصول للمواد التعليمية في أي وقت مع الالتزام بجدول المتابعة.'
        : 'Flexible online learning with weekly progress tracking. The team provides consistent support to keep students on track, with 24/7 access to materials while adhering to the monitoring schedule.',
      teachers: isAr 
        ? 'يقوم الفريق بمراقبة التقدم أسبوعياً والتواصل مع الأهالي. يوفر المعلمون دعماً أكاديمياً فردياً (واحد لواحد) لمساعدة الطلاب في فهم الدروس، إكمال المهام، تنظيم المهام الأسبوعية، والتحضير للاختبارات والمشاريع.'
        : 'Weekly monitoring of progress and grades, regular parent communication, and one-on-one assistance with lessons, assignments, reading, writing, organization, and exam preparation.',
      features: isAr 
        ? 'منهج إنجليزي عبر Edgenuity، تتبع أسبوعي للتقدم، تواصل دوري مع أولياء الأمور، تدخل مبكر عند تعثر الطالب، دعم أكاديمي فردي عند الحاجة، تعلم إسلامي يتناسب مع المرحلة العمرية، إرشاد لتشجيع الاستمرارية.'
        : 'Online English via Edgenuity, Weekly monitoring, Regular parent communication, Early intervention, One-on-one assistance, Age-appropriate Islamic learning, Guidance for consistency and accountability.',
      outcomes: isAr 
        ? 'إكمال الدورات عبر الإنترنت بانتظام، مهارات تعلم مستقل وتنظيم قوية، تحسين القراءة والكتابة الأكاديمية، وعي أكبر بالمسؤوليات الدراسية، تطوير مستمر لتلاوة القرآن والمعرفة الإسلامية، فهم أعمق للقيم الشخصية.'
        : 'Consistent course completion, Stronger independent learning and organization, Improved reading and writing, Greater awareness of academic goals, Continued Quran and Islamic development, Deeper understanding of values.',
      image: "/program-2.png"
    },
    'weekend': {
      name: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
      intro: isAr 
        ? 'مصمم لمساعدة الأطفال المقيمين في الخارج على تطوير هوية إسلامية واثقة مع تعزيز معارفهم في اللغة العربية والقرآن الكريم من خلال دروس حية وجذابة عبر الإنترنت من المنزل.'
        : 'Designed to help children living abroad develop a confident Islamic identity while strengthening Arabic and Quranic knowledge through engaging live online lessons from home.',
      learn: isAr 
        ? 'القرآن الكريم والتجويد، قواعد اللغة العربية، مهارات الكتابة، وممارسة المحادثة. بالإضافة إلى دراسات إسلامية تتناول العبادات، القيم، وتطوير الشخصية وربط العقيدة بالحياة اليومية.'
        : 'Quran and Tajweed, Arabic grammar, Writing skills, and Speaking practice. Plus Islamic Studies covering worship, values, character development, and connecting faith to everyday life.',
      schedule: isAr 
        ? 'الأيام: السبت والأحد. الفترات المتاحة (بتوقيت شرق أمريكا): 8-10 صباحاً، 10-12 ظهراً، أو 12-2 ظهراً. يختار أولياء الأمور جلسة واحدة فقط.'
        : 'Days: Saturday and Sunday. Available slots (Eastern Time): 8:00 AM–10:00 AM, 10:00 AM–12:00 PM, or 12:00 PM–2:00 PM. Parents choose one session.',
      teachers: isAr 
        ? 'معلمون مؤهلون وذوي خبرة واسعة في تعليم الأطفال المقيمين في الخارج. يقدم المعلمون اهتماماً شخصياً ويحرصون على التواصل مع الأهالي بشأن الحضور والتقدم والاحتياجات الإضافية للدعم.'
        : 'Highly qualified and experienced teachers. They provide personalized attention and maintain open communication with parents about attendance, progress, and support needs.',
      features: isAr 
        ? 'دروس حية في عطلة نهاية الأسبوع، تعليم القرآن بالتجويد، تطوير قواعد وكتابة العربية، ممارسة المحادثة، دراسات إسلامية عملية، اهتمام شخصي بكل طالب، متابعة مستمرة للتقدم، دعم الهوية الإسلامية.'
        : 'Live weekend lessons, Quran and Tajweed instruction, Arabic grammar and writing, Spoken Arabic practice, Practical Islamic Studies, Personalized attention, Progress monitoring, Identity and character support.',
      outcomes: isAr 
        ? 'تلاوة أكثر دقة للقرآن، إلمام أفضل بالتجويد، مهارات لغوية عربية قوية، تواصل وكتابة أفضل بالعربية، فهم أكبر للمعرفة والممارسات الإسلامية، شخصية إسلامية واثقة، ارتباط قوي بالدين واللغة.'
        : 'More accurate Quranic recitation, Improved Tajweed familiarity, Stronger Arabic language skills, Better communication, Greater understanding of Islamic practices, Confident Islamic character, Stronger faith connection.',
      image: "/program-3.png"
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
  const splitList = (text: string) => {
    if (!text) return [];
    return text.split(/[،,]/).map(s => s.trim()).filter(Boolean);
  };

  return (
    <div className="bg-white min-h-screen">
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
            <h1 className="text-2xl sm:text-5xl font-black text-white leading-tight drop-shadow-2xl">
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
              <h3 className="text-xl sm:text-2xl font-black text-primary flex items-center gap-4 border-b pb-4">
                <BookOpen className="h-6 w-6 text-secondary" />
                {sectionLabel('What Students Learn', 'ما يتعلمه الطلاب')}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                {data.learn}
              </p>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-primary flex items-center gap-4 border-b pb-4">
                <Calendar className="h-6 w-6 text-secondary" />
                {sectionLabel('Study Schedule', 'الجدول الدراسي')}
              </h3>
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 text-base sm:text-lg text-primary font-bold leading-relaxed">
                {data.schedule}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-black text-primary flex items-center gap-4 border-b pb-4">
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
