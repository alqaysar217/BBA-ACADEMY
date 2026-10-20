'use client';

import { use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  Rocket, 
  BookOpen, 
  Monitor, 
  ShieldCheck, 
  HelpCircle, 
  MessageSquare,
  Mail,
  Phone,
  CheckCircle2,
  Users,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Star,
  FileText,
  MousePointer2,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Clock,
  ExternalLink,
  Target,
  LayoutDashboard,
  ClipboardCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const getGuideSections = (isAr: boolean) => [
  {
    id: 'getting-started',
    icon: Rocket,
    title: isAr ? '1. البدء في أكاديمية بنين وبنات' : '1. Getting Started at BBA',
    content: (
      <div className="space-y-6 py-2">
        <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
          {isAr 
            ? 'تهانينا لانضمامك إلى أكاديمية بنين وبنات! بمجرد اكتمال تسجيلك، ستكون مستعداً لبدء رحلة التعلم الخاصة بك. قبل البدء في دورتك الأولى، خذ بضع لحظات لإكمال الخطوات أدناه:'
            : 'Congratulations on joining Banaat Academy! Once your enrollment has been completed, you\'re ready to begin your learning journey. Before starting your first course, take a few moments to complete the steps below:'}
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { 
              t: isAr ? '1.1 تحقق من بريدك الترحيبي' : '1.1 Check Your Welcome Email', 
              d: isAr ? 'يحتوي بريدك الترحيبي على كل ما تحتاجه للبدء، بما في ذلك معلومات تسجيل الدخول إلى Edgenuity، وخطة الطالب الشخصية الخاصة بك، والمرشد المعين لك ومعلومات الاتصال الخاصة به، ومعلومات مهمة أخرى حول عامك الدراسي. إذا لم تجد البريد الإلكتروني، فتأكد من مراجعة مجلد البريد العشوائي قبل التواصل معنا.' : 'Your Welcome Email contains everything you need to get started, including your Edgenuity login information, your personalized Student Plan, your assigned mentor and their contact info, and other important information about your school year. If you cannot find the email, be sure to check your Spam or Junk folder before contacting BBA.' 
            },
            { 
              t: isAr ? '1.2 تسجيل الدخول إلى حساب Edgenuity' : '1.2 Log Into Your Edgenuity Account', 
              d: isAr ? 'Edgenuity هي منصة التعلم عبر الإنترنت حيث ستكمل جميع دروسك ومهامك واختباراتك ودوراتك الدراسية. هذا هو المكان الذي ستقضي فيه معظم وقتك طوال العام الدراسي. إذا كنت بحاجة للمساعدة، يرجى مراجعة الفيديو التوجيهي أدناه لفهم كيفية استخدام المنصة.' : 'Edgenuity is the online learning platform where you will complete all of your lessons, assignments, quizzes, exams, and coursework. This is where you will spend most of your time throughout the school year. If needed, please check the orientation video below to understand how to use the platform.' 
            },
            { 
              t: isAr ? '1.3 مراجعة خطة الطالب الخاصة بك' : '1.3 Review Your Student Plan', 
              d: isAr ? 'يتلقى كل طالب خطة طالب تحدد الدورات التي من المتوقع أن يكملها خلال العام الدراسي. في معظم الحالات، يتوقع من الطلاب إكمال 10 دورات بين سبتمبر ويونيو، بمعدل دورة واحدة كل شهر. خطة الطالب هي خارطة الطريق الخاصة بك للبقاء في المسار الصحيح نحو الترقية أو التخرج.' : 'Every student receives a Student Plan outlining the courses they are expected to complete during the school year. In most cases, students are expected to complete 10 courses between September and June, averaging one course each month. Your Student Plan is your roadmap for staying on track toward promotion or graduation.' 
            },
            { 
              t: isAr ? '1.4 تعرف على مرشدك' : '1.4 Meet Your Mentor', 
              d: isAr ? 'يتم تعيين مرشد لكل طالب ويكون متاحاً للإجابة على الأسئلة وتقديم التوجيه ومراقبة التقدم ومساعدة الطلاب على البقاء في المسار الصحيح طوال العام الدراسي. يجب أن يكون مرشدك دائماً نقطة الاتصال الأولى لك كلما احتجت إلى مساعدة.' : 'Every student is assigned a BBA mentor who is available to answer questions, provide guidance, monitor progress, and help students stay on track throughout the school year. Your mentor should always be your first point of contact whenever you need assistance.' 
            },
            { 
              t: isAr ? '1.5 ابدأ دورتك الأولى' : '1.5 Start Your First Course', 
              d: isAr ? 'بمجرد مراجعة خطة الطالب الخاصة بك، وتسجيل الدخول إلى Edgenuity، ولقاء مرشدك، فقد حان الوقت لبدء التعلم! ابدأ بأول دورة تدريبية معينة لك واعمل كل يوم عمل باستمرار للبقاء في الجدول الزمني. كلما بدأت في بناء عادات دراسية جيدة مبكراً، كان من الأسهل البقاء في المسار الصحيح طوال العام الدراسي.' : 'Once you\'ve reviewed your Student Plan, logged into Edgenuity, and met your mentor, it\'s time to begin learning! Start with your first assigned course and work each weekday consistently to stay on schedule. The earlier you build good study habits, the easier it will be to remain on track throughout the school year.' 
            }
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-primary text-sm sm:text-base">{i + 1}) {s.t}</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
          <p className="text-xs sm:text-sm font-bold text-primary italic">
            {isAr ? 'نصيحة: لا تنتظر حتى نهاية الشهر لبدء العمل. الطلاب الذين يحققون تقدماً بسيطاً كل يوم عمل هم أكثر نجاحاً بكثير من أولئك الذين يحاولون إنهاء دورة كاملة في اللحظة الأخيرة.' : 'Tip: Don\'t wait until the end of the month to begin working. Students who make a little progress every weekday are far more successful than those who try to finish an entire course at the last minute.'}
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    icon: BookOpen,
    title: isAr ? '2. كيف يعمل برنامج الأكاديمية' : '2. How the BBA Program Works',
    content: (
      <div className="space-y-6 py-2">
        <div className="space-y-3">
          <h4 className="font-black text-primary text-base sm:text-lg">{isAr ? 'الأكاديمية تختلف عن المدرسة التقليدية' : 'BBA is different from a traditional school'}</h4>
          <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
            {isAr 
              ? 'بدلاً من حضور دروس مباشرة كل يوم، يكمل الطلاب دوراتهم الدراسية عبر الإنترنت من خلال Edgenuity مع تلقي التوجيه والدعم من الفريق الأكاديمي للأكاديمية. هذا يمنح الطلاب المرونة للتعلم بالسرعة التي تناسبهم مع اتباع خطة طالب منظمة مصممة لإبقائهم في المسار الصحيح طوال العام الدراسي.'
              : 'Instead of attending live classes every day, students complete their coursework online through Edgenuity while receiving guidance and support from BBA\'s academic team. This gives students the flexibility to learn at their own pace while following a structured Student Plan designed to keep them on track throughout the school year.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: isAr ? 'اتبع خطة الطالب الخاصة بك' : 'Follow Your Student Plan', d: isAr ? 'خارطة طريقك للنجاح. يتلقى كل طالب خطة طالب شخصية تحدد الدورات التي من المتوقع أن يكملها طوال العام الدراسي. في معظم الحالات، يكمل الطلاب 10 دورات بين سبتمبر ويونيو، بمعدل دورة واحدة كل شهر. اتباع خطة الطالب هو أسهل طريقة للبقاء منظماً والتخرج في الوقت المحدد.' : 'Your roadmap to success. Every student receives a personalized Student Plan outlining the courses they are expected to complete throughout the school year. In most cases, students complete 10 courses between September and June, averaging one course each month. Following your Student Plan is the easiest way to stay organized and graduate on time.' },
            { t: isAr ? 'تعلم بالسرعة التي تناسبك' : 'Learn at Your Own Pace', d: isAr ? 'اعمل عندما يناسبك ذلك بشكل أفضل. لا توجد ساعات عمل يومية مطلوبة. يمكن للطلاب إكمال دوراتهم الدراسية في أي وقت خلال اليوم، مما يسمح لهم ببناء جدول زمني يناسب أسلوب حياتهم. ومع ذلك، فإن المرونة لا تعني وقتاً غير محدود. يتوقع من الطلاب إكمال ما يقرب من 5-7٪ من دوراتهم الدراسية كل يوم عمل للبقاء في المسار الصحيح.' : 'Work when it works best for you. There are no required daily class hours. Students can complete their coursework at any time during the day, allowing them to build a schedule that fits their lifestyle. However, flexibility does not mean unlimited time. Students are expected to complete approximately 5–7% of their coursework each weekday to remain on track with their Student Plan.' },
            { t: isAr ? 'مرشدك هنا للمساعدة' : 'Your Mentor Is Here to Help', d: isAr ? 'لا تخف أبداً من طرح الأسئلة. يتم تعيين مرشد مخصص لكل طالب يراقب التقدم ويجيب على الأسئلة ويقدم التشجيع ويساعد في حل التحديات طوال العام الدراسي. إذا كنت بحاجة إلى مساعدة، يجب أن يكون مرشدك دائماً نقطة الاتصال الأولى لك.' : 'Never be afraid to ask questions. Every student is assigned a dedicated mentor who monitors progress, answers questions, provides encouragement, and helps solve challenges throughout the school year. If you ever need help, your mentor should always be your first point of contact.' },
            { t: isAr ? 'التقدم هو ما يهم' : 'Progress Is What Matters', d: isAr ? 'النجاح لا يقاس بالحضور! بل يقاس بالتقدم. على عكس المدارس التقليدية، لا يتوقع من الطلاب الجلوس في الفصل الدراسي لعدد معين من الساعات كل يوم. بدلاً من ذلك، تركز الأكاديمية على التقدم الأكاديمي. سواء أكملت عملك في الصباح أو بعد الظهر أو في المساء، فإن هدفك يظل كما هو: الاستمرار في إحراز تقدم ثابت نحو إكمال دوراتك في الوقت المحدد.' : 'Success isn\'t measured by attendance! It\'s measured by progress. Unlike traditional schools, students are not expected to sit in a classroom for a certain number of hours each day. Instead, BBA focuses on academic progress. Whether you complete your work in the morning, afternoon, or evening, your goal remains the same: continue making steady progress toward completing your courses on time.' },
            { t: isAr ? 'تعلم من أي مكان' : 'Learn From Anywhere', d: isAr ? 'فصلك الدراسي يسافر معك. سواء كنت تتعلم من المنزل أو تسافر مع عائلتك أو تعيش في بلد آخر، تظل دوراتك متاحة أينما كان لديك اتصال موثوق بالإنترنت. إذا كنت تسافر دولياً، تذكر أن موظفي الأكاديمية والمرشدين يعملون خلال التوقيت الشرقي (نيويورك / ميشيغان)، لذلك قد تختلف الاستجابات حسب منطقتك الزمنية.' : 'Your classroom travels with you. Whether you\'re learning from home, traveling with your family, or living in another country, your courses remain available wherever you have a reliable internet connection. If you\'re traveling internationally, remember that BBA staff and mentors operate during Eastern Time (New York/Michigan), so responses may vary depending on your time zone.' },
            { t: isAr ? 'نجاح الطلاب جهد جماعي' : 'Student Success Is a Team Effort', d: isAr ? 'كل طالب ناجح لديه فريق دعم قوي خلفه. في الأكاديمية، يأتي النجاح من الشراكة بين الطلاب وأولياء الأمور والمرشدين والمستشارين والأكاديمية. عندما يتواصل الجميع ويظلون مشاركين ويعملون نحو نفس الهدف، يكون الطلاب أكثر عرضة لإكمال دوراتهم بنجاح والبقاء في المسار الصحيح طوال العام الدراسي.' : 'Every successful student has a strong support team behind them. At BBA, success comes from the partnership between students, parents, mentors, counselors, and the academy. When everyone communicates, stays engaged, and works toward the same goal, students are far more likely to complete their courses successfully and stay on track throughout the school year.' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
              <h4 className="font-bold text-primary text-sm sm:text-base">{item.t}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
        
        {/* Success Formula */}
        <div className="bg-slate-900 text-white p-6 rounded-xl space-y-8">
          <h4 className="text-center font-black text-secondary uppercase tracking-widest text-xs sm:text-sm">{isAr ? 'معادلة النجاح في الأكاديمية' : 'The BBA Success Formula'}</h4>
          <div className="flex flex-col gap-6 relative">
            {[
              { t: isAr ? 'تسجيل الدخول كل يوم عمل' : 'Log in every weekday' },
              { t: isAr ? 'إكمال 5-7% يومياً (من الإثنين إلى الجمعة)' : 'Complete 5–7% daily (Mon - Fri)' },
              { t: isAr ? 'إنهاء دورة واحدة كل شهر' : 'Finish 1 course each month' },
              { t: isAr ? 'إكمال جميع الدورات العشر في 10 أشهر' : 'Complete all 10 courses in 10 months' },
              { t: isAr ? 'البقاء في المسار الصحيح للترقية أو التخرج' : 'Stay on track for promotion or graduation' }
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center font-black text-sm shrink-0 border border-white/20 group-hover:bg-secondary transition-all">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <span className="text-xs sm:text-sm font-bold opacity-90">{step.t}</span>
                </div>
                {idx < 4 && <div className="absolute left-5 top-10 w-0.5 h-6 bg-white/10" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'edgenuity',
    icon: Monitor,
    title: isAr ? '3. البدء مع Edgenuity' : '3. Getting Started With Edgenuity',
    content: (
      <div className="space-y-6 py-2">
        <div className="space-y-2">
          <h4 className="text-primary font-black text-base sm:text-xl">{isAr ? 'جديد في Edgenuity؟ لا قلق، ابدأ من هنا!' : 'New to Edgenuity? No Worries, Start here!'}</h4>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {isAr 
              ? 'قبل البدء في دورتك الأولى، خذ بضع دقائق لمشاهدة هذا الفيديو. سيعرفك على منصة التعلم Edgenuity ويوضح لك كيفية التنقل في دوراتك وإكمال الدروس وتتبع تقدمك واستخدام الأدوات التي ستعتمد عليها طوال العام الدراسي.'
              : 'Before beginning your first course, take a few minutes to watch this video. It will introduce you to the Edgenuity learning platform and show you how to navigate your courses, complete lessons, track your progress, and use the tools you\'ll rely on throughout the school year.'}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 italic">
            {isAr ? 'هام: يركز هذا الفيديو على استخدام منصة Edgenuity. استمر في قراءة هذا الدليل للتعرف على سياسات الأكاديمية وتوقعاتها والدعم الأكاديمي وكل ما تحتاجه للنجاح.' : 'Important: This video focuses on using the Edgenuity platform. Continue reading this guide to learn about BBA\'s policies, expectations, academic support, and everything else you need to succeed.'}
          </p>
        </div>

        <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden border-4 border-white shadow-xl relative">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/wTuSRO3BJ8k?start=9"
            title="Edgenuity Orientation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="space-y-4">
          <h4 className="text-primary font-black text-base sm:text-lg">{isAr ? 'جاهز لبدء دوراتك؟' : 'Ready to Begin Your Courses?'}</h4>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {isAr ? 'انقر فوق الزر أدناه للوصول إلى منصة تعلم الطالب وتسجيل الدخول باستخدام اسم المستخدم وكلمة المرور المعينين لك.' : 'Click the button below to access the Student Learning Platform and sign in using your assigned username and password.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white font-black h-12 px-10 rounded-xl shadow-lg">
              <Link href="https://student.edgenuity.com/login" target="_blank" className="flex items-center gap-2">
                {isAr ? 'دخول منصة الطالب' : 'Student Login'}
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-4">
            {isAr ? 'بمجرد تسجيل الدخول، ستتمكن من:' : 'Once logged in, you\'ll be able to:'}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              isAr ? 'الوصول إلى الدورات التدريبية المعينة لك.' : 'Access your assigned courses.',
              isAr ? 'إكمال الدروس والمهام والاختبارات.' : 'Complete lessons, assignments, and quizzes.',
              isAr ? 'مراقبة درجاتك وتقدمك.' : 'Monitor your grades and progress.',
              isAr ? 'البقاء في المسار الصحيح طوال العام الدراسي.' : 'Stay on pace throughout the school year.'
            ].map((li, i) => (
              <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          <h4 className="text-base sm:text-lg font-black text-primary uppercase tracking-tight">{isAr ? 'ماذا ستجد في الداخل' : 'What You\'ll Find Inside'}</h4>
          <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{isAr ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need in One Place'}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              { t: isAr ? 'الدورات' : 'Courses', d: isAr ? 'الوصول إلى جميع الدورات التدريبية المعينة لك في مكان واحد مريح. يتم تنظيم كل دورة في دروس وأنشطة توجهك عبر المنهج الدراسي بالسرعة التي تناسبك.' : 'Access all of your assigned courses in one convenient location. Each course is organized into lessons and activities that guide you through the curriculum at your own pace.' },
              { t: isAr ? 'الدرجات والتقدم' : 'Grades & Progress', d: isAr ? 'راقب أداءك الأكاديمي في أي وقت. يمكن للطلاب عرض العمل المكتمل والدرجات والتقدم العام في الدورة لضمان البقاء على المسار الصحيح طوال العام الدراسي.' : 'Monitor your academic performance at any time. Students can view completed work, grades, and overall course progress to ensure they remain on track throughout the school year.' },
              { t: isAr ? 'المهام والتقييمات' : 'Assignments & Assessments', d: isAr ? 'أكمل الاختبارات والمشاريع والمهام الأخرى مباشرة من خلال المنصة. يتم حفظ تقدمك تلقائياً، مما يسمح لك بالمتابعة من حيث توقفت.' : 'Complete quizzes, tests, projects, and other assignments directly through the platform. Your progress is automatically saved, allowing you to continue where you left off.' },
              { t: isAr ? 'التواصل والدعم' : 'Communication & Support', d: isAr ? 'بينما توفر منصة تعلم الطالب دوراتك الدراسية، فإن فريق الأكاديمية متاح دائماً للإجابة على الأسئلة وتقديم التوجيه ومساعدتك على النجاح كلما احتجت إلى مساعدة.' : 'While the Student Learning Platform delivers your coursework, the BBA team is always available to answer questions, provide guidance, and help you succeed whenever you need assistance.' }
            ].map((i, idx) => (
              <div key={idx} className="space-y-1">
                <h5 className="font-bold text-primary text-sm">{i.t}</h5>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'agreement',
    icon: ShieldCheck,
    title: isAr ? '4. اتفاقية الطالب في الأكاديمية' : '4. The BBA Student Agreement',
    content: (
      <div className="space-y-8 py-2">
        <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
          {isAr 
            ? 'في أكاديمية بنين وبنات، يُبنى نجاح الطلاب على الشراكة. هدفنا هو تزويد كل طالب بالأدوات والتوجيه والدعم اللازم للنجاح طوال العام الدراسي. في المقابل، نطلب من الطلاب وأولياء الأمور البقاء مشاركين والتواصل بانفتاح والقيام بدور نشط في عملية التعلم. عندما يعمل الجميع معاً، يكون الطلاب أكثر عرضة لإكمال دوراتهم بنجاح والوصول إلى أهدافهم الأكاديمية.'
            : 'At Baneen Banaat Academy, student success is built on partnership. Our goal is to provide every student with the tools, guidance, and support needed to succeed throughout the school year. In return, we ask students and parents to stay engaged, communicate openly, and take an active role in the learning process. When everyone works together, students are more likely to stay on track, complete their courses successfully, and achieve their academic goals.'}
        </p>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <h4 className="font-black text-primary text-base border-b pb-3">
              {isAr ? 'ماذا تتوقع من الأكاديمية' : 'What You Can Expect From BBA'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                isAr ? 'تقديم خطة طالب شخصية مصممة لتوجيهك طوال العام الدراسي.' : 'Provide a personalized Student Plan designed to guide you throughout the school year.',
                isAr ? 'تعيين مرشد مخصص لدعمك وتشجيعك وتوجيهك على طول الطريق.' : 'Assign a dedicated mentor to support, encourage, and guide you along the way.',
                isAr ? 'مراقبة تقدمك الأكاديمي والتواصل إذا لاحظنا مخاوف.' : 'Monitor your academic progress and reach out if we notice concerns.',
                isAr ? 'الرد على أسئلتك والمساعدة خلال ساعات العمل العادية لدينا.' : 'Respond to your questions and assist during our regular office hours.',
                isAr ? 'مراجعة الدورات المكتملة وفتح دورات جديدة بمجرد استيفاء جميع المتطلبات بنجاح.' : 'Review completed courses and unlock new courses once all requirements have been successfully met.',
                isAr ? 'معاملة كل طالب وأسرة بمهنية واحترام ورعاية.' : 'Treat every student and family with professionalism, respect, and care.'
              ].map((li, i) => (
                <div key={i} className="flex gap-2 text-xs font-bold text-slate-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <h4 className="font-black text-primary text-base border-b pb-3">
              {isAr ? 'ماذا تتوقع الأكاديمية من الطلاب' : 'What BBA Expects From Students'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                isAr ? 'تسجيل الدخول إلى Edgenuity بانتظام وإحراز تقدم ثابت.' : 'Log into Edgenuity regularly and make consistent progress.',
                isAr ? 'إكمال ما يقرب من 5-7٪ من دوراتهم الدراسية كل يوم عمل للبقاء في المسار الصحيح.' : 'Complete approximately 5–7% of their coursework each weekday to stay on track.',
                isAr ? 'اتباع خطة الطالب الخاصة بهم وإكمال الدورات وفقاً للجدول الزمني الموصى به.' : 'Follow their Student Plan and complete courses according to the recommended schedule.',
                isAr ? 'قراءة الرسائل من مرشدهم والرد عليها عند الضرورة.' : 'Read and respond to messages from their mentor when necessary.',
                isAr ? 'طلب المساعدة كلما كان لديهم أسئلة أو احتاجوا إلى دعم.' : 'Reach out for help whenever they have questions or need support.',
                isAr ? 'إكمال جميع المهام والاختبارات والمشاريع والامتحانات بأمانة باستخدام عملهم الخاص.' : 'Complete all assignments, quizzes, projects, and exams honestly using their own work.',
                isAr ? 'إخطار مرشدهم إذا كانوا غير قادرين على الدراسة لفترة طويلة من الزمن.' : 'Notify their mentor if they will be unable to study for an extended period of time.'
              ].map((li, i) => (
                <div key={i} className="flex gap-2 text-xs font-bold text-slate-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <h4 className="font-black text-primary text-base border-b pb-3">
              {isAr ? 'ماذا تتوقع الأكاديمية من أولياء الأمور' : 'What BBA Expects From Parents'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                isAr ? 'تشجيع طفلهم على الحفاظ على روتين تعليمي ثابت.' : 'Encourage their child to maintain a consistent learning routine.',
                isAr ? 'البقاء على اتصال مع المرشدين وفريق الأكاديمية عند الحاجة.' : 'Stay in communication with mentors and the BBA team when needed.',
                isAr ? 'الرد على رسائل البريد الإلكتروني أو المكالمات الهاتفية أو رسائل الواتساب من الأكاديمية.' : 'Respond to emails, phone calls, or WhatsApp messages from the academy.',
                isAr ? 'مراقبة التقدم الأكاديمي لأطفالهم بانتظام.' : 'Monitor their child\'s academic progress regularly.',
                isAr ? 'دعم طفلهم في البقاء متحفزاً ومنظماً وفي الموعد المحدد طوال العام الدراسي.' : 'Support their child in staying motivated, organized, and on schedule throughout the school year.'
              ].map((li, i) => (
                <div key={i} className="flex gap-2 text-xs font-bold text-slate-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-bold mt-2">
              {isAr ? 'يمكن لأولياء الأمور الذين يرغبون في تلقي تحديثات التقدم اليومية التلقائية من Edgenuity طلب إضافة بريدهم الإلكتروني إلى حساب الطالب الخاص بهم.' : 'Parents who would like to receive automatic daily progress updates from Edgenuity may request that their email be added to their student\'s account.'}
            </p>
          </div>
        </div>

        <div className="bg-primary text-white p-6 rounded-xl text-center italic font-bold text-xs sm:text-sm border-l-4 border-secondary shadow-lg">
           "{isAr ? 'في الأكاديمية، نؤمن بأن النجاح لا يُبنى في يوم واحد - بل يُبنى من خلال الجهد المستمر والتواصل المفتوح والشراكة القوية بين الطلاب وأولياء الأمور والمدرسة' : 'At BBA, we believe success isn\'t built in a single day—it\'s built through consistent effort, open communication, and a strong partnership between students, parents, and the school'}"
        </div>
      </div>
    )
  },
  {
    id: 'courses-faqs',
    icon: HelpCircle,
    title: isAr ? '5. فهم الدورات (الأسئلة الشائعة)' : '5. Understanding Your Courses (FAQs)',
    content: (
      <div className="space-y-4 py-2">
        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-4">
          {isAr ? 'دوراتك هي أساس تجربتك التعليمية في أكاديمية بنين وبنات. سيساعدك فهم كيفية عملها على البقاء منظماً وتجنب التأخير غير الضروري وإكمال خطة الطالب الخاصة بك طوال العام الدراسي.' : 'Your courses are the foundation of your learning experience at Banaat Academy. Understanding how they work will help you stay organized, avoid unnecessary delays, and complete your Student Plan throughout the school year.'}
        </p>
        {[
          { q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب لإكمالها خلال العام الدراسي. يتم سرد هذه الدورات في خطة الطالب الشخصية الخاصة بك، والتي تعمل كخارطة طريق لك من سبتمبر حتى يونيو. تم تصميم خطة الطالب الخاصة بك لمساعدتك على البقاء في المسار الصحيح للترقية أو التخرج. نشجع الطلاب على مراجعتها بانتظام واستخدامها كدليل طوال العام الدراسي.' : 'Most students are assigned 10 courses to complete during the school year. These courses are listed in your personalized Student Plan, which serves as your roadmap from September through June. Your Student Plan is designed to help you stay on track for promotion or graduation. We encourage students to review it regularly and use it as a guide throughout the school year.' },
          { q: isAr ? 'هل يمكنني العمل على أكثر من دورة تدريبية في وقت واحد؟' : 'Can I work on more than one course at a time?', a: isAr ? 'في معظم الحالات، لا. يتوقع من الطلاب التركيز على دورة واحدة في كل مرة قبل الانتقال إلى التالية. هذا يساعد الطلاب على البقاء مركزين ويحسن التعلم ويمنعهم من الشعور بالإرهاق. في حالات معينة، قد يوافق مستشار الأكاديمية على جدول دورات مختلف إذا تم تحديد أنه في مصلحة الطالب.' : 'In most cases, NO. Students are expected to focus on one course at a time before moving on to the next. This helps students stay focused, improves learning, and prevents them from becoming overwhelmed. In certain situations, a BBA counselor may approve a different course schedule if it is determined to be in the student\'s best interest.' },
          { q: isAr ? 'هل يمكنني إعادة المهام أو الاختبارات أو الامتحانات؟' : 'Can I redo assignments, quizzes, or exams?', a: isAr ? 'نعم. إذا كانت درجتك الإجمالية في الدورة أقل من درجة النجاح المطلوبة، أو إذا كنت ترغب ببساطة في تحسين أدائك، فقد يُطلب منك أو يُسمح لك بإعادة مهام أو اختبارات أو امتحانات معينة. يرجى ملاحظة أن فرص إعادة الاختبار محدودة. إذا كانت هناك حاجة إلى عمليات إعادة إضافية، يجب على الطلاب الاتصال بمرشدهم أو مستشارهم، الذي سيراجع الموقف ويحدد ما إذا كان يمكن توفير المزيد من المحاولات.' : 'Yes. If your overall course grade is below the required passing grade, or if you would simply like to improve your performance, you may be asked or permitted to redo certain assignments, quizzes, or exams. Please note that retake opportunities are limited. If additional retakes are needed, students should contact their mentor or counselor, who will review the situation and determine whether more attempts can be provided.' },
          { q: isAr ? 'هل يمكنني تغيير إحدى دوراتي؟' : 'Can I change one of my courses?', a: isAr ? 'ممكن. إذا كنت ترغب في تغيير دورة تدريبية، يجب عليك الاتصال بمستشار الأكاديمية لمناقشة طلبك. بينما يمكن تلبية العديد من تغييرات الدورات، قد لا تتم الموافقة على بعض الطلبات بناءً على متطلبات التخرج أو خطتك الأكاديمية أو عوامل أخرى.' : 'Possibly. If you would like to change a course, you should contact your BBA counselor to discuss your request. While many course changes can be accommodated, some requests may not be approved depending on your graduation requirements, academic plan, or other factors.' },
          { q: isAr ? 'كم من الوقت يجب أن تستغرق كل دورة؟' : 'How long should each course take?', a: isAr ? 'من المقرر عموماً إكمال الدورات في غضون 3-4 أسابيع، مما يسمح لمعظم الطلاب بإنهاء دورة واحدة تقريباً كل شهر. عادة ما يظل الطلاب الذين يكملون باستمرار 5-7٪ من دوراتهم الدراسية كل يوم عمل في الجدول الزمني ويكملون جميع دوراتهم المعينة بنهاية العام الدراسي.' : 'Courses are generally scheduled to be completed within 3–4 weeks, which allows most students to finish approximately one course each month. Students who consistently complete 5–7% of their coursework every weekday usually remain on schedule and complete all of their assigned courses by the end of the school year.' },
          { q: isAr ? 'هل يمكنني العمل مسبقاً؟' : 'Can I work ahead?', a: isAr ? 'نعم! نُشجع الطلاب على البقاء متقدمين كلما أمكن ذلك. يمكن للطلاب إكمال الدورات قبل تواريخ استحقاقها المحددة. ومع ذلك، يقتصر الطلاب عموماً على إكمال ما لا يزيد عن دورتين في شهر واحد. بمجرد الوصول إلى هذا الحد، سيتم عادةً تعيين دورات إضافية خلال الشهر التالي وفقاً لخطة الطالب.' : 'Yes! Students are encouraged to stay ahead whenever possible. Students may complete courses before their scheduled due dates. However, students are generally limited to completing no more than two courses within a single month. Once that limit has been reached, additional courses will typically be assigned during the following month according to the Student Plan.' },
          { q: isAr ? 'هل يمكنني تخطي الدروس أو المهام؟' : 'Can I skip lessons or assignments?', a: isAr ? 'لا. تم تصميم كل درس ومهمة واختبار واختبار وحدة وامتحان نهائي لمساعدتك على إتقان مادة الدورة التدريبية. تخطي الدورات الدراسية المطلوبة غير مسموح به وقد يمنعك من إكمال الدورة بنجاح.' : 'No. Every lesson, assignment, quiz, unit test, and final exam is designed to help you master the course material. Skipping required coursework is not permitted and may prevent you from successfully completing the course.' },
          { q: isAr ? 'كيف أستلم دورتي القادمة؟' : 'How Do I Receive My Next Course?', a: isAr ? 'إكمال الدورة هو الخطوة الأولى فقط. قبل تعيين دورتك التالية، ستقوم الأكاديمية بمراجعة تقدمك الأكاديمي لضمان استعدادك للمضي قدماً. العملية بسيطة: أكمل دورتك الحالية، أخطر مرشدك أو اتصل بفريق الأكاديمية لإعلامهم بأنك قد انتهيت، سنراجع درجتك النهائية وأداءك العام في الدورة، إذا لزم الأمر قد يُطلب منك إعادة مهام معينة لتحسين درجتك، وبمجرد استيفاء جميع المتطلبات سيتم تعيين دورتك التالية.' : 'Completing a course is only the first step. Before your next course is assigned, BBA will review your academic progress to ensure you\'re ready to move forward. The process is simple: Complete your current course, Notify your mentor or contact the BBA team to let them know you\'ve finished, We will review your final grade and overall course performance, If needed you may be asked to redo certain assignments, quizzes, or exams to improve your overall grade, Once all requirements have been met your next course will be assigned.' }
        ].map((faq, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-primary text-sm sm:text-base">{faq.q}</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
          </div>
        ))}
        
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mt-6">
          <p className="text-xs sm:text-sm font-bold text-primary italic">
            {isAr ? 'تذكر: تم تصميم خطة الطالب الخاصة بك بعناية لمساعدتك على النجاح. أسهل طريقة لإنهاء العام الدراسي في الوقت المحدد هي التركيز على دورة واحدة في كل مرة، والعمل كل يوم عمل باستمرار، والتواصل مع مرشدك كلما كان لديك أسئلة أو كنت بحاجة إلى مساعدة.' : 'Remember: Your Student Plan was carefully designed to help you succeed. The easiest way to finish the school year on time is to focus on one course at a time, work each weekday consistently, and communicate with your mentor whenever you have questions or need assistance.'}
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'support',
    icon: MessageSquare,
    title: isAr ? '6. أنت لا تتعلم بمفردك أبداً' : '6. You\'re Never Learning Alone',
    content: (
      <div className="space-y-6 py-2">
        <div className="space-y-2">
          <h4 className="text-base sm:text-xl font-black text-primary">{isAr ? 'التعليم أفضل مع التوجيه' : 'Education Is Better with Guidance'}</h4>
          <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
            {isAr 
              ? 'أحد أكبر المفاهيم الخاطئة حول التعلم عبر الإنترنت هو أنه يتوقع من الطلاب اكتشاف كل شيء بأنفسهم. في أكاديمية بنين وبنات، ليس هذا هو الحال أبداً.'
              : 'One of the biggest misconceptions about online learning is that students are expected to figure everything out on their own. At Baneen and Banaat Academy, that\'s never the case.'}
          </p>
          <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
            {isAr 
              ? 'يعمل فريقنا التعليمي بشكل وثيق مع الطلاب والعائلات طوال العام الدراسي من خلال:'
              : 'Our educational team works closely with students and families throughout the school year by:'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { t: isAr ? 'مراقبة تقدم الطالب' : 'Monitoring student progress', icon: Target },
            { t: isAr ? 'تقديم التوجيه الأكاديمي' : 'Providing academic guidance', icon: BookOpen },
            { t: isAr ? 'الإجابة على الأسئلة' : 'Answering questions', icon: MessageSquare },
            { t: isAr ? 'مساعدة الطلاب على البقاء على المسار الصحيح' : 'Helping students stay on pace', icon: Clock },
            { t: isAr ? 'الشراكة مع العائلات لدعم نجاح الطلاب' : 'Partnering with families to support student success', icon: Users }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm group hover:border-secondary transition-all">
               <div className="h-10 w-10 rounded-lg bg-slate-50 text-secondary flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5" />
               </div>
               <span className="font-bold text-primary text-xs sm:text-sm">{item.t}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-100 p-6 rounded-xl space-y-6 border border-slate-200 shadow-inner">
          <div className="text-center space-y-1">
            <h4 className="text-base sm:text-lg font-black text-primary uppercase tracking-tight">{isAr ? 'نحن هنا لدعمك' : 'We\'re Here to Support You'}</h4>
            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{isAr ? 'هل تحتاج إلى مساعدة؟' : 'Need Help?'}</p>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-600 font-medium text-center">
            {isAr ? 'سواء كنت تواجه صعوبات تقنية، أو لديك أسئلة حول دوراتك، أو كنت بحاجة ببساطة إلى توجيه، فإن فريق الأكاديمية موجود دائماً للمساعدة.' : 'Whether you\'re experiencing technical difficulties, have questions about your courses, or simply need guidance, the BBA team is always here to help.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-slate-50 text-secondary flex items-center justify-center shrink-0">
                 <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase text-slate-400">Email</div>
                <div className="text-[10px] sm:text-xs font-bold text-primary truncate">banaatacademy@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-slate-50 text-secondary flex items-center justify-center shrink-0">
                 <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase text-slate-400">Phone</div>
                <div className="text-[10px] sm:text-xs font-bold text-primary">(313) 455-0322</div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-[10px] sm:text-xs text-slate-500 font-bold">
            {isAr ? 'وقت الاستجابة: نسعى للرد على جميع استفسارات الطلاب والعائلات في أسرع وقت ممكن خلال ساعات العمل العادية.' : 'Response Time: We strive to respond to all student and family inquiries as quickly as possible during regular business hours.'}
          </p>

          <p className="text-center text-xs text-slate-500 italic">
            {isAr ? 'هل تحتاج إلى مساعدة؟ لا تتردد في الاتصال بنا؛ يسعدنا دائماً تقديم المساعدة.' : 'Need assistance? Don\'t hesitate to contact us; we\'re always happy to help.'}
          </p>
        </div>

        <div className="text-center italic font-black text-primary border-t pt-6 text-sm sm:text-base px-4 leading-relaxed">
           "{isAr ? 'النجاح لا يقاس بمدى سرعة انتهائك؛ إنه يُبنى من خلال الجهد المستمر والفضول والمثابرة في كل خطوة على الطريق' : 'Success isn’t measured by how quickly you finish; it’s built through consistent effort, curiosity, and perseverance every step of the way.'}"
        </div>
      </div>
    )
  }
];

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const sections = getGuideSections(isAr);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Enhanced Glow Header */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
           {/* Primary Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/20 blur-[140px] rounded-full animate-pulse" />
           {/* Accent Glow */}
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
           {/* Subtle Grid Overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <h1 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
            {isAr ? 'دليل طالب BBA' : 'BBA Student Guide'}
          </h1>
          <p className="text-sm sm:text-xl text-white/70 font-bold max-w-2xl mx-auto leading-relaxed italic border-t border-white/10 pt-6">
            {isAr 
              ? 'كل ما يحتاجه الطلاب وأولياء الأمور لمعرفته من أجل عام دراسي ناجح ومليء بالإنجازات.' 
              : 'Everything Students & Parents Need to Know for a Successful and Productive School Year.'}
          </p>
        </div>
      </section>

      <div className="container-tight py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Intro Section */}
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-3xl font-black text-primary leading-tight text-center sm:text-start">
               {isAr ? 'أهلاً بكم في دليل الطالب، نحن متحمسون لانضمامكم إلينا!' : 'Welcome to the BBA Student Guide. We are excited to have you join us!'}
            </h2>
            <div className="space-y-4 text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
               <p>{isAr ? 'سواء كنت طالباً جديداً أو ولي أمر، فقد تم تصميم هذا الدليل لمساعدتك على فهم كيفية عمل برنامج الأكاديمية، وما هو متوقع طوال العام الدراسي، وكيفية البقاء على المسار الصحيح للنجاح.' : 'Whether you are a new student or a parent, this guide is designed to help you understand how the BBA program works, what is expected throughout the school year, and how to stay on track for success.'}</p>
               <p>{isAr ? 'نظراً لأن الأكاديمية هي مدرسة ذاتية التعلم عبر الإنترنت، يتمتع الطلاب بالمرونة للتعلم من أي مكان مع التقدم بوتيرة تناسب جدولهم الزمني. ومع ذلك، فإن هذه المرونة تأتي مع المسؤولية. يعتمد النجاح في الأكاديمية على الاستمرار في الالتزام واتباع خطة الطالب الخاصة بك والتواصل مع مرشدك كلما احتجت إلى مساعدة.' : 'Because BBA is an online, self-paced school, students have the flexibility to learn from anywhere while progressing at a pace that fits their schedule. However, with that flexibility comes responsibility. Success at BBA depends on staying consistent, following your Student Plan, and communicating with your mentor whenever you need assistance.'}</p>
               <p>{isAr ? 'يشرح هذا الدليل العديد من الأسئلة الأكثر شيوعاً، بما في ذلك كيفية عمل الدورات، التوقعات اليومية والشهرية، الدرجات، التواصل، الدعم الأكاديمي، وغير ذلك الكثير. نحن نشجع كل طالب وولي أمر على قراءة هذا الدليل بعناية قبل بدء الدورات الدراسية والعودة إليه كلما ظهرت أسئلة خلال العام الدراسي.' : 'This guide answers many of the most common questions, including how courses work, daily and monthly expectations, grading, communication, academic support, and much more. We encourage every student and parent to read this guide carefully before beginning coursework and to return to it whenever questions arise during the school year.'}</p>
               <p>{isAr ? 'هدفنا بسيط: تزويد كل طالب بالتوجيه والدعم والموارد التي يحتاجها لإكمال دوراته بنجاح والوصول إلى أهدافه الأكاديمية.' : 'Our goal is simple: to provide every student with the guidance, support, and resources they need to successfully complete their courses and reach their academic goals.'}</p>
               <div className="flex items-center justify-center sm:justify-start gap-4 pt-4 border-t border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                     <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="text-primary font-black text-sm sm:text-lg">
                    {isAr ? 'نتمنى لكم عاماً دراسياً ناجحاً ومميزاً!' : 'We wish you a successful and outstanding school year!'}
                  </p>
               </div>
            </div>
          </div>

          {/* Expandable Accordion Menu */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {sections.map((section) => (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className="bg-white border border-slate-200 rounded-xl px-4 sm:px-6 shadow-sm overflow-hidden hover:border-secondary/30 transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline py-6 group">
                    <div className="flex items-center gap-4 text-start">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-slate-50 text-secondary flex items-center justify-center shrink-0 shadow-inner group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all">
                        <section.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <h3 className="text-base sm:text-xl font-black text-primary leading-tight">{section.title}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 border-t border-slate-50 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                     {section.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Encouragement Footer */}
          <div className="bg-primary text-white p-8 sm:p-12 rounded-xl shadow-2xl relative overflow-hidden text-center space-y-8 mt-16 border-b-8 border-secondary">
             <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <div className="flex justify-center">
                   <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                      <Trophy className="h-8 w-8 text-secondary" />
                   </div>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                  {isAr ? 'نحن معك في كل خطوة على الطريق' : 'We\'re With You Every Step of the Way'}
                </h2>
                <div className="space-y-3 text-sm sm:text-base opacity-80 font-bold leading-relaxed italic max-w-md mx-auto">
                   <p>{isAr ? 'كل درس تكتمله، كل مهمة تنهيها، وكل إنجاز تحققه يقربك خطوة واحدة من أهدافك الكبيرة.' : 'Every completed lesson, every finished assignment, and every milestone you achieve brings you one step closer to your goals.'}</p>
                   <p>{isAr ? 'تذكر، النجاح لا يعني أن تكون مثالياً، بل يعني الحضور والاستمرار والمحاولة من جديد.' : 'Remember, success isn\'t about being perfect—it\'s about showing up, staying consistent, and continuing to move forward.'}</p>
                </div>
                <div className="pt-6">
                  <Button asChild size="lg" className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-lg px-6 h-12 text-xs sm:text-sm transition-all shadow-lg active:scale-95 w-full sm:w-auto">
                    <Link href={`/${lang}/contact`}>
                      {isAr ? 'تواصل معنا إذا كنت بحاجة للمساعدة' : 'Contact us if you need help'}
                    </Link>
                  </Button>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 opacity-5">
                <Users className="h-48 w-48 sm:h-64 sm:w-64" />
             </div>
          </div>

          <div className="text-center pb-12 space-y-4">
             <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">
                {isAr ? 'نتمنى لكم عاماً دراسياً مذهلاً ومليئاً بالنجاح' : 'Wishing you an amazing and successful school year'}
             </p>
             <div className="h-1 w-10 bg-slate-200 mx-auto rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
