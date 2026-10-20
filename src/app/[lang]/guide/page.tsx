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
  Trophy
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
        <div className="grid grid-cols-1 gap-4">
          {[
            { 
              t: isAr ? '1.1 تحقق من بريدك الترحيبي' : '1.1 Check Your Welcome Email', 
              d: isAr ? 'يحتوي بريدك الترحيبي على كل ما تحتاجه للبدء، بما في ذلك معلومات تسجيل الدخول إلى Edgenuity، وخطة الطالب الشخصية الخاصة بك، والمرشد المعين لك ومعلومات الاتصال الخاصة به، ومعلومات مهمة أخرى حول عامك الدراسي. إذا لم تجد البريد الإلكتروني، فتأكد من مراجعة مجلد البريد العشوائي (Spam).' : 'Your Welcome Email contains everything you need to get started, including your Edgenuity login information, your personalized Student Plan, your assigned mentor and their contact info, and other important information about your school year. If you cannot find the email, be sure to check your Spam or Junk folder before contacting BBA.' 
            },
            { 
              t: isAr ? '1.2 تسجيل الدخول إلى حساب Edgenuity' : '1.2 Log Into Your Edgenuity Account', 
              d: isAr ? 'Edgenuity هي منصة التعلم عبر الإنترنت حيث ستكمل جميع دروسك ومهامك واختباراتك ودوراتك الدراسية. هذا هو المكان الذي ستقضي فيه معظم وقتك طوال العام الدراسي.' : 'Edgenuity is the online learning platform where you will complete all of your lessons, assignments, quizzes, exams, and coursework. This is where you will spend most of your time throughout the school year.' 
            },
            { 
              t: isAr ? '1.3 مراجعة خطة الطالب الخاصة بك' : '1.3 Review Your Student Plan', 
              d: isAr ? 'يتلقى كل طالب خطة طالب تحدد الدورات التي من المتوقع أن يكملها خلال العام الدراسي. في معظم الحالات، يتوقع من الطلاب إكمال 10 دورات بين سبتمبر ويونيو، بمعدل دورة واحدة كل شهر.' : 'Every student receives a Student Plan outlining the courses they are expected to complete during the school year. In most cases, students are expected to complete 10 courses between September and June, averaging one course each month.' 
            },
            { 
              t: isAr ? '1.4 تعرف على مرشدك' : '1.4 Meet Your Mentor', 
              d: isAr ? 'يتم تعيين مرشد BBA لكل طالب ويكون متاحاً للإجابة على الأسئلة وتقديم التوجيه ومراقبة التقدم ومساعدة الطلاب على البقاء في المسار الصحيح. يجب أن يكون مرشدك دائماً نقطة الاتصال الأولى لك كلما احتجت إلى مساعدة.' : 'Every student is assigned a BBA mentor who is available to answer questions, provide guidance, monitor progress, and help students stay on track throughout the school year. Your mentor should always be your first point of contact whenever you need assistance.' 
            },
            { 
              t: isAr ? '1.5 ابدأ دورتك الأولى' : '1.5 Start Your First Course', 
              d: isAr ? 'بمجرد مراجعة خطة الطالب الخاصة بك، وتسجيل الدخول إلى Edgenuity، ولقاء مرشدك، فقد حان الوقت لبدء التعلم! ابدأ بأول دورة تدريبية معينة لك واعمل كل يوم عمل باستمرار للبقاء في الجدول الزمني.' : 'Once you\'ve reviewed your Student Plan, logged into Edgenuity, and met your mentor, it\'s time to begin learning! Start with your first assigned course and work each weekday consistently to stay on schedule.' 
            }
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-primary text-sm sm:text-base">{s.t}</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20">
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
    title: isAr ? '2. كيف يعمل برنامج BBA' : '2. How the BBA Program Works',
    content: (
      <div className="space-y-6 py-2">
        <div className="space-y-4">
          <h4 className="font-black text-primary text-base sm:text-lg">{isAr ? 'BBA تختلف عن المدرسة التقليدية' : 'BBA is different from a traditional school'}</h4>
          <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
            {isAr 
              ? 'بدلاً من حضور دروس مباشرة كل يوم، يكمل الطلاب دوراتهم الدراسية عبر الإنترنت من خلال Edgenuity مع تلقي التوجيه والدعم من الفريق الأكاديمي للأكاديمية. هذا يمنح الطلاب المرونة للتعلم بالسرعة التي تناسبهم مع اتباع خطة طالب منظمة مصممة لإبقائهم في المسار الصحيح طوال العام الدراسي.'
              : 'Instead of attending live classes every day, students complete their coursework online through Edgenuity while receiving guidance and support from BBA\'s academic team. This gives students the flexibility to learn at their own pace while following a structured Student Plan designed to keep them on track throughout the school year.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: isAr ? 'اتبع خطة الطالب الخاصة بك' : 'Follow Your Student Plan', d: isAr ? 'خارطة طريقك للنجاح. يتلقى كل طالب خطة طالب شخصية تحدد الدورات التي من المتوقع أن يكملها طوال العام الدراسي. اتباع خطتك هو أسهل طريقة للبقاء منظماً والتخرج في الوقت المحدد.' : 'Your roadmap to success. Every student receives a personalized Student Plan outlining the courses they are expected to complete throughout the school year. Following your Student Plan is the easiest way to stay organized and graduate on time.' },
            { t: isAr ? 'تعلم بالسرعة التي تناسبك' : 'Learn at Your Own Pace', d: isAr ? 'اعمل عندما يناسبك ذلك بشكل أفضل. لا توجد ساعات عمل يومية مطلوبة. ومع ذلك، فإن المرونة لا تعني وقتاً غير محدود. يتوقع من الطلاب إكمال ما يقرب من 5-7٪ من دوراتهم الدراسية كل يوم عمل للبقاء على المسار الصحيح.' : 'Work when it works best for you. There are no required daily class hours. However, flexibility does not mean unlimited time. Students are expected to complete approximately 5–7% of their coursework each weekday to remain on track.' },
            { t: isAr ? 'مرشدك هنا للمساعدة' : 'Your Mentor Is Here to Help', d: isAr ? 'لا تخف أبداً من طرح الأسئلة. يتم تعيين مرشد مخصص لكل طالب يراقب التقدم ويجيب على الأسئلة ويقدم التشجيع ويساعد في حل التحديات طوال العام الدراسي.' : 'Never be afraid to ask questions. Every student is assigned a dedicated mentor who monitors progress, answers questions, provides encouragement, and helps solve challenges throughout the school year.' },
            { t: isAr ? 'التقدم هو ما يهم' : 'Progress Is What Matters', d: isAr ? 'لا يقاس النجاح بالحضور! بل يقاس بالتقدم الأكاديمي. سواء أكملت عملك في الصباح أو بعد الظهر أو في المساء، فإن هدفك يظل كما هو: الاستمرار في إحراز تقدم ثابت.' : 'Success isn\'t measured by attendance! It\'s measured by progress. Unlike traditional schools, BBA focuses on academic progress. Whether you complete your work in the morning, afternoon, or evening, your goal remains the same.' },
            { t: isAr ? 'تعلم من أي مكان' : 'Learn From Anywhere', d: isAr ? 'فصلك الدراسي يسافر معك. سواء كنت تتعلم من المنزل أو تسافر مع عائلتك أو تعيش في بلد آخر، تظل دوراتك متاحة أينما كان لديك اتصال موثوق بالإنترنت.' : 'Your classroom travels with you. Whether you\'re learning from home, traveling with your family, or living in another country, your courses remain available wherever you have a reliable internet connection.' },
            { t: isAr ? 'نجاح الطلاب جهد جماعي' : 'Student Success Is a Team Effort', d: isAr ? 'كل طالب ناجح لديه فريق دعم قوي خلفه. في BBA، يأتي النجاح من الشراكة بين الطلاب وأولياء الأمور والمرشدين والمستشارين والأكاديمية.' : 'Every successful student has a strong support team behind them. At BBA, success comes from the partnership between students, parents, mentors, counselors, and the academy.' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex gap-3">
              <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-primary text-sm sm:text-base">{item.t}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Success Formula */}
        <div className="bg-primary text-white p-6 rounded-2xl space-y-6">
          <h4 className="text-center font-black text-secondary uppercase tracking-widest text-xs sm:text-sm">{isAr ? 'معادلة النجاح في BBA' : 'The BBA Success Formula'}</h4>
          <div className="flex flex-col gap-4">
            {[
              { t: isAr ? 'تسجيل الدخول كل يوم عمل' : 'Log in every weekday' },
              { t: isAr ? 'إكمال 5-7% يومياً (من الإثنين للجمعة)' : 'Complete 5–7% daily (Mon - Fri)' },
              { t: isAr ? 'إنهاء دورة واحدة كل شهر' : 'Finish 1 course each month' },
              { t: isAr ? 'إكمال جميع الدورات الـ 10 في 10 أشهر' : 'Complete all 10 courses in 10 months' },
              { t: isAr ? 'البقاء في المسار الصحيح للترقية أو التخرج' : 'Stay on track for promotion or graduation' }
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center font-black text-sm shrink-0 border border-white/20">{idx + 1}</div>
                <span className="text-xs sm:text-sm font-bold opacity-90">{step.t}</span>
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
        <div className="text-center space-y-2">
          <h4 className="text-primary font-black text-base sm:text-xl">{isAr ? 'جديد في Edgenuity؟ لا قلق، ابدأ من هنا!' : 'New to Edgenuity? No Worries, Start here!'}</h4>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            {isAr 
              ? 'قبل البدء في دورتك الأولى، خذ بضع دقائق لمشاهدة هذا الفيديو. سيعرفك على منصة التعلم Edgenuity ويوضح لك كيفية التنقل في دوراتك وإكمال الدروس وتتبع تقدمك.'
              : 'Before beginning your first course, take a few minutes to watch this video. It will introduce you to the Edgenuity learning platform and show you how to navigate your courses, complete lessons, track your progress, and use the tools you\'ll rely on throughout the school year.'}
          </p>
        </div>

        <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-200 shadow-lg relative">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/wTuSRO3BJ8k?start=9"
            title="Edgenuity Orientation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
             <h4 className="text-base sm:text-lg font-black text-primary uppercase tracking-tight">{isAr ? 'ماذا ستجد في الداخل' : 'What You\'ll Find Inside'}</h4>
             <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{isAr ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need in One Place'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: BookOpen, t: isAr ? 'الدورات' : 'Courses', d: isAr ? 'الوصول إلى جميع الدورات التدريبية المعينة لك في مكان واحد مريح.' : 'Access all of your assigned courses in one convenient location.' },
              { icon: Star, t: isAr ? 'الدرجات والتقدم' : 'Grades & Progress', d: isAr ? 'راقب أداءك الأكاديمي في أي وقت لضمان البقاء على المسار الصحيح.' : 'Monitor your academic performance at any time to ensure you remain on track.' },
              { icon: FileText, t: isAr ? 'المهام والتقييمات' : 'Assignments & Assessments', d: isAr ? 'أكمل الاختبارات والمشاريع والمهام الأخرى مباشرة من خلال المنصة.' : 'Complete quizzes, tests, projects, and other assignments directly through the platform.' },
              { icon: MessageSquare, t: isAr ? 'التواصل والدعم' : 'Communication & Support', d: isAr ? 'فريق BBA متاح دائماً للإجابة على الأسئلة وتقديم التوجيه.' : 'The BBA team is always available to answer questions and provide guidance.' }
            ].map((i, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-slate-50 text-secondary flex items-center justify-center shrink-0">
                  <i.icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-primary text-sm">{i.t}</h5>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{i.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white font-black h-12 px-10 rounded-xl shadow-lg shadow-secondary/20">
            <Link href="https://student.edgenuity.com/login" target="_blank">
              {isAr ? 'دخول منصة الطالب' : 'Student Login'}
            </Link>
          </Button>
        </div>
      </div>
    )
  },
  {
    id: 'agreement',
    icon: ShieldCheck,
    title: isAr ? '4. اتفاقية الطالب في BBA' : '4. The BBA Student Agreement',
    content: (
      <div className="space-y-8 py-2">
        <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base italic text-center max-w-2xl mx-auto">
          {isAr 
            ? 'في أكاديمية بنين وبنات، يُبنى نجاح الطلاب على الشراكة. هدفنا هو تزويد كل طالب بالأدوات والتوجيه والدعم اللازم للنجاح. في المقابل، نطلب من الطلاب وأولياء الأمور البقاء مشاركين والتواصل بانفتاح.'
            : 'At Baneen Banaat Academy, student success is built on partnership. Our goal is to provide every student with the tools, guidance, and support needed to succeed. In return, we ask students and parents to stay engaged and communicate openly.'}
        </p>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Expectations from BBA */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-black text-primary text-base flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-secondary" />
              {isAr ? 'ماذا تتوقع من BBA' : 'What You Can Expect From BBA'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                isAr ? 'تقديم خطة طالب شخصية مصممة لتوجيهك طوال العام الدراسي.' : 'Provide a personalized Student Plan designed to guide you throughout the school year.',
                isAr ? 'تعيين مرشد مخصص لدعمك وتشجيعك وتوجيهك على طول الطريق.' : 'Assign a dedicated mentor to support, encourage, and guide you along the way.',
                isAr ? 'مراقبة تقدمك الأكاديمي والتواصل إذا لاحظنا مخاوف.' : 'Monitor your academic progress and reach out if we notice concerns.',
                isAr ? 'الرد على أسئلتك والمساعدة خلال ساعات العمل العادية لدينا.' : 'Respond to your questions and assist during our regular office hours.',
                isAr ? 'مراجعة الدورات المكتملة وفتح دورات جديدة بمجرد استيفاء جميع المتطلبات.' : 'Review completed courses and unlock new courses once all requirements have been successfully met.',
                isAr ? 'محاملة كل طالب وأسرة بمهنية واحترام ورعاية.' : 'Treat every student and family with professionalism, respect, and care.'
              ].map((li, i) => (
                <div key={i} className="flex gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expectations from Students */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-black text-primary text-base flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-secondary" />
              {isAr ? 'ماذا تتوقع BBA من الطلاب' : 'What BBA Expects From Students'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                isAr ? 'تسجيل الدخول إلى Edgenuity بانتظام وإحراز تقدم ثابت.' : 'Log into Edgenuity regularly and make consistent progress.',
                isAr ? 'إكمال ما يقرب من 5-7٪ من دوراتهم الدراسية كل يوم عمل للبقاء في المسار الصحيح.' : 'Complete approximately 5–7% of their coursework each weekday to stay on track.',
                isAr ? 'اتباع خطة الطالب الخاصة بهم وإكمال الدورات وفقاً للجدول الزمني الموصى به.' : 'Follow their Student Plan and complete courses according to the recommended schedule.',
                isAr ? 'قراءة الرسائل من مرشدهم والرد عليها عند الضرورة.' : 'Read and respond to messages from their mentor when necessary.',
                isAr ? 'طلب المساعدة كلما كان لديهم أسئلة أو احتاجوا إلى دعم.' : 'Reach out for help whenever they have questions or need support.',
                isAr ? 'إكمال جميع المهام والاختبارات والمشاريع بأمانة باستخدام عملهم الخاص.' : 'Complete all assignments, quizzes, projects, and exams honestly using their own work.',
                isAr ? 'إخطار مرشدهم إذا كانوا غير قادرين على الدراسة لفترة طويلة من الزمن.' : 'Notify their mentor if they will be unable to study for an extended period of time.'
              ].map((li, i) => (
                <div key={i} className="flex gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expectations from Parents */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-black text-primary text-base flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              {isAr ? 'ماذا تتوقع BBA من أولياء الأمور' : 'What BBA Expects From Parents'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                isAr ? 'تشجيع طفلهم على الحفاظ على روتين تعليمي ثابت.' : 'Encourage their child to maintain a consistent learning routine.',
                isAr ? 'البقاء على اتصال مع المرشدين وفريق BBA عند الحاجة.' : 'Stay in communication with mentors and the BBA team when needed.',
                isAr ? 'الرد على رسائل البريد الإلكتروني أو المكالمات الهاتفية أو رسائل WhatsApp من الأكاديمية.' : 'Respond to emails, phone calls, or WhatsApp messages from the academy.',
                isAr ? 'مراقبة التقدم الأكاديمي لأطفالهم بانتظام.' : 'Monitor their child\'s academic progress regularly.',
                isAr ? 'دعم طفلهم في البقاء متحفزاً ومنظماً وفي الموعد المحدد طوال العام الدراسي.' : 'Support their child in staying motivated, organized, and on schedule throughout the school year.'
              ].map((li, i) => (
                <div key={i} className="flex gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-primary text-white p-6 rounded-2xl text-center italic font-bold text-xs sm:text-sm border-l-4 border-secondary">
           "{isAr ? 'في BBA، نؤمن بأن النجاح لا يُبنى في يوم واحد - بل يُبنى من خلال الجهد المستمر والتواصل المفتوح والشراكة القوية بين الطلاب وأولياء الأمور والمدرسة' : 'At BBA, we believe success isn\'t built in a single day—it\'s built through consistent effort, open communication, and a strong partnership between students, parents, and the school'}"
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
        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
          {isAr ? 'دوراتك هي أساس تجربتك التعليمية في أكاديمية بنين وبنات. سيساعدك فهم كيفية عملها على البقاء منظماً وتجنب التأخير غير الضروري.' : 'Your courses are the foundation of your learning experience at Banaat Academy. Understanding how they work will help you stay organized and avoid unnecessary delays.'}
        </p>
        {[
          { q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب لإكمالها خلال العام الدراسي. يتم سرد هذه الدورات في خطة الطالب الشخصية الخاصة بك، والتي تعمل كخارطة طريق لك من سبتمبر حتى يونيو.' : 'Most students are assigned 10 courses to complete during the school year. These courses are listed in your personalized Student Plan, which serves as your roadmap from September through June.' },
          { q: isAr ? 'هل يمكنني العمل على أكثر من دورة تدريبية في وقت واحد؟' : 'Can I work on more than one course at a time?', a: isAr ? 'في معظم الحالات، لا. يتوقع من الطلاب التركيز على دورة واحدة في كل مرة قبل الانتقال إلى التالية. هذا يساعد الطلاب على البقاء مركزين ويحسن التعلم ويمنعهم من الشعور بالإرهاق.' : 'In most cases, NO. Students are expected to focus on one course at a time before moving on to the next. This helps students stay focused, improves learning, and prevents them from becoming overwhelmed.' },
          { q: isAr ? 'هل يمكنني إعادة المهام أو الاختبارات؟' : 'Can I redo assignments, quizzes, or exams?', a: isAr ? 'نعم. إذا كانت درجتك الإجمالية في الدورة أقل من درجة النجاح المطلوبة، أو إذا كنت ترغب ببساطة في تحسين أدائك، فقد يُطلب منك أو يُسمح لك بإعادة مهام معينة. يرجى ملاحظة أن فرص إعادة الاختبار محدودة.' : 'Yes. If your overall course grade is below the required passing grade, or if you would simply like to improve your performance, you may be asked or permitted to redo certain assignments, quizzes, or exams. Please note that retake opportunities are limited.' },
          { q: isAr ? 'هل يمكنني تغيير إحدى دوراتي؟' : 'Can I change one of my courses?', a: isAr ? 'ممكن. إذا كنت ترغب في تغيير دورة تدريبية، يجب عليك الاتصال بمستشار BBA لمناقشة طلبك. قد لا تتم الموافقة على بعض الطلبات بناءً على متطلبات التخرج أو خطتك الأكاديمية.' : 'Possibly. If you would like to change a course, you should contact your BBA counselor to discuss your request. While many course changes can be accommodated, some requests may not be approved depending on your graduation requirements.' },
          { q: isAr ? 'كم من الوقت يجب أن تستغرق كل دورة؟' : 'How long should each course take?', a: isAr ? 'من المقرر عموماً إكمال الدورات في غضون 3-4 أسابيع، مما يسمح لمعظم الطلاب بإنهاء دورة واحدة تقريباً كل شهر.' : 'Courses are generally scheduled to be completed within 3–4 weeks, which allows most students to finish approximately one course each month.' },
          { q: isAr ? 'هل يمكنني العمل مسبقاً؟' : 'Can I work ahead?', a: isAr ? 'نعم! نُشجع الطلاب على البقاء متقدمين كلما أمكن ذلك. ومع ذلك، يقتصر الطلاب عموماً على إكمال ما لا يزيد عن دورتين في شهر واحد.' : 'Yes! Students are encouraged to stay ahead whenever possible. However, students are generally limited to completing no more than two courses within a single month.' },
          { q: isAr ? 'هل يمكنني تخطي الدروس أو المهام؟' : 'Can I skip lessons or assignments?', a: isAr ? 'لا. تم تصميم كل درس ومهمة واختبار واختبار وحدة وامتحان نهائي لمساعدتك على إتقان مادة الدورة التدريبية. تخطي الدورات الدراسية المطلوبة غير مسموح به.' : 'No. Every lesson, assignment, quiz, unit test, and final exam is designed to help you master the course material. Skipping required coursework is not permitted.' },
          { q: isAr ? 'كيف أستلم دورتي القادمة؟' : 'How Do I Receive My Next Course?', a: isAr ? 'إكمال الدورة هو الخطوة الأولى فقط. قبل تعيين دورتك التالية، ستقوم BBA بمراجعة تقدمك الأكاديمي لضمان استعدادك للمضي قدماً. العملية بسيطة: أكمل دورتك الحالية، أخطر مرشدك، سنراجع الدرجة، وقد يُطلب منك التحسين، ثم يتم تعيين الدورة التالية.' : 'Completing a course is only the first step. Before your next course is assigned, BBA will review your academic progress to ensure you\'re ready to move forward. The process is simple: Complete current course, Notify mentor, We review grade, Improve if needed, then Next course assigned.' }
        ].map((faq, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
            <h4 className="font-bold text-primary text-sm sm:text-base">{faq.q}</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
          </div>
        ))}
        
        <div className="bg-secondary text-white p-4 rounded-xl text-center font-bold text-xs sm:text-sm mt-6">
          {isAr ? 'تذكر: تم تصميم خطة الطالب الخاصة بك بعناية لمساعدتك على النجاح. أسهل طريقة لإنهاء العام الدراسي في الوقت المحدد هي التركيز على دورة واحدة في كل مرة.' : 'Remember: Your Student Plan was carefully designed to help you succeed. The easiest way to finish the school year on time is to focus on one course at a time.'}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            isAr ? 'مراقبة تقدم الطالب' : 'Monitoring student progress',
            isAr ? 'تقديم التوجيه الأكاديمي' : 'Providing academic guidance',
            isAr ? 'الإجابة على الأسئلة' : 'Answering questions',
            isAr ? 'مساعدة الطلاب على البقاء على المسار الصحيح' : 'Helping students stay on pace',
            isAr ? 'الشراكة مع العائلات لدعم نجاح الطلاب' : 'Partnering with families to support student success'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
               <div className="h-2 w-2 rounded-full bg-secondary shrink-0" />
               <span className="font-bold text-primary text-xs sm:text-sm">{item}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-100 p-6 rounded-2xl space-y-6 border border-slate-200">
          <div className="text-center space-y-1">
            <h4 className="text-base sm:text-lg font-black text-primary uppercase tracking-tight">{isAr ? 'نحن هنا لدعمك' : 'We\'re Here to Support You'}</h4>
            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{isAr ? 'هل تحتاج إلى مساعدة؟' : 'Need Help?'}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
              <div className="h-10 w-10 rounded-lg bg-slate-50 text-secondary flex items-center justify-center shrink-0">
                 <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase text-slate-400">Email</div>
                <div className="text-xs font-bold text-primary truncate">banaatacademy@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
              <div className="h-10 w-10 rounded-lg bg-slate-50 text-secondary flex items-center justify-center shrink-0">
                 <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase text-slate-400">Phone</div>
                <div className="text-xs font-bold text-primary">(313) 455-0322</div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-[10px] sm:text-xs text-slate-500 font-bold">
            {isAr ? 'وقت الاستجابة: نسعى للرد على جميع استفسارات الطلاب والعائلات في أسرع وقت ممكن خلال ساعات العمل العادية.' : 'Response Time: We strive to respond to all student and family inquiries as quickly as possible during regular business hours.'}
          </p>
        </div>

        <div className="text-center italic font-black text-primary border-t pt-6 text-sm sm:text-base px-4">
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
    <div className="bg-white min-h-screen pb-20">
      {/* Dynamic Header */}
      <section className="bg-primary pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="container-tight relative z-10 text-center space-y-4 px-4">
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight drop-shadow-lg">
            {isAr ? 'دليل طالب BBA' : 'BBA Student Guide'}
          </h1>
          <p className="text-sm sm:text-lg text-white/80 font-bold max-w-2xl mx-auto leading-relaxed italic">
            {isAr 
              ? 'كل ما يحتاجه الطلاب وأولياء الأمور لمعرفته من أجل عام دراسي ناجح.' 
              : 'Everything Students & Parents Need to Know for a Successful School Year.'}
          </p>
        </div>
      </section>

      <div className="container-tight py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Welcome Intro Section - Sharp corners */}
          <div className="bg-slate-50 p-6 sm:p-10 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-primary leading-tight text-center">
               {isAr ? 'أهلاً بكم في دليل الطالب، نحن متحمسون لانضمامكم إلينا!' : 'Welcome to the BBA Student Guide. We are excited to have you join us!'}
            </h2>
            <div className="space-y-4 text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
               <p>{isAr ? 'سواء كنت طالباً جديداً أو ولي أمر، فقد تم تصميم هذا الدليل لمساعدتك على فهم كيفية عمل برنامج BBA، وما هو متوقع طوال العام الدراسي، وكيفية البقاء على المسار الصحيح للنجاح.' : 'Whether you are a new student or a parent, this guide is designed to help you understand how the BBA program works, what is expected throughout the school year, and how to stay on track for success.'}</p>
               <p>{isAr ? 'نظراً لأن BBA هي مدرسة ذاتية التعلم عبر الإنترنت، يتمتع الطلاب بالمرونة للتعلم من أي مكان مع التقدم بوتيرة تناسب جدولهم الزمني. ومع ذلك، فإن هذه المرونة تأتي مع المسؤولية. يعتمد النجاح في BBA على الاستمرار في الالتزام واتباع خطة الطالب الخاصة بك والتواصل مع مرشدك كلما احتجت إلى مساعدة.' : 'Because BBA is an online, self-paced school, students have the flexibility to learn from anywhere while progressing at a pace that fits their schedule. However, with that flexibility comes responsibility. Success at BBA depends on staying consistent, following your Student Plan, and communicating with your mentor whenever you need assistance.'}</p>
               <p>{isAr ? 'يشرح هذا الدليل العديد من الأسئلة الأكثر شيوعاً، بما في ذلك كيفية عمل الدورات، التوقعات اليومية والشهرية، الدرجات، التواصل، الدعم الأكاديمي، وغير ذلك الكثير. نحن نشجع كل طالب وولي أمر على قراءة هذا الدليل بعناية قبل بدء الدورات الدراسية والعودة إليه كلما ظهرت أسئلة خلال العام الدراسي.' : 'This guide answers many of the most common questions, including how courses work, daily and monthly expectations, grading, communication, academic support, and much more. We encourage every student and parent to read this guide carefully before beginning coursework and to return to it whenever questions arise during the school year.'}</p>
               <p>{isAr ? 'هدفنا بسيط: تزويد كل طالب بالتوجيه والدعم والموارد التي يحتاجها لإكمال دوراته بنجاح والوصول إلى أهدافه الأكاديمية.' : 'Our goal is simple: to provide every student with the guidance, support, and resources they need to successfully complete their courses and reach their academic goals.'}</p>
               <p className="text-primary font-black text-center pt-2">
                 {isAr ? 'أهلاً بكم في BBA، نحن متحمسون لكوننا جزءاً من رحلتكم، ونتمنى لكم عاماً دراسياً ناجحاً!' : 'Welcome to BBA, we\'re excited to be part of your journey, and we wish you a successful school year!'}
               </p>
            </div>
          </div>

          {/* Accordion Menu */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {sections.map((section) => (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className="bg-white border border-slate-200 rounded-xl px-4 sm:px-6 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-4 text-start">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-slate-50 text-secondary flex items-center justify-center shrink-0 shadow-inner">
                        <section.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <h3 className="text-base sm:text-xl font-black text-primary leading-tight">{section.title}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 border-t border-slate-50 animate-in fade-in slide-in-from-top-4 duration-500">
                     {section.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Final Encouragement Section - Sharp edges */}
          <div className="bg-primary text-white p-8 sm:p-12 rounded-xl shadow-xl relative overflow-hidden text-center space-y-6 mt-16">
             <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-black leading-tight text-secondary">
                  {isAr ? 'نحن معك في كل خطوة على الطريق' : 'We\'re With You Every Step of the Way'}
                </h2>
                <div className="space-y-3 text-sm sm:text-base opacity-90 font-bold leading-relaxed italic">
                   <p>{isAr ? 'كل درس تكتمله... كل مهمة تنهيها... كل إنجاز تحققه... يقربك خطوة واحدة من أهدافك.' : 'Every completed lesson... Every finished assignment... Every milestone you achieve... Brings you one step closer to your goals.'}</p>
                   <p>{isAr ? 'تذكر، النجاح لا يعني أن تكون مثالياً - بل يعني الحضور والاستمرار في المضي قدماً.' : 'Remember, success isn\'t about being perfect—it\'s about showing up, staying consistent, and continuing to move forward.'}</p>
                </div>
                <div className="pt-6">
                   <p className="text-xs sm:text-sm font-black text-white/70 uppercase tracking-widest mb-4">
                     {isAr ? 'أكاديمية بنين وبنات فخورة بكونها جزءاً من رحلتك التعليمية' : 'The Baneen and Banaat Academy team is proud to be part of your educational journey'}
                   </p>
                  <Button asChild size="lg" className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-lg px-8 h-14 text-sm transition-all shadow-lg active:scale-95">
                    <Link href={`/${lang}/contact`}>
                      {isAr ? 'تواصل معنا إذا كنت بحاجة للمساعدة' : 'Contact us if you need help'}
                    </Link>
                  </Button>
                </div>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Trophy className="h-48 w-48 sm:h-64 sm:w-64" />
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
