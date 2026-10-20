'use client';

import { use, useState } from 'react';
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
  Star
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
    description: isAr ? 'الخطوات الخمس الأولى لبدء رحلتك التعليمية بنجاح.' : 'The first five steps to begin your educational journey successfully.',
    content: (
      <div className="space-y-8 py-4">
        <p className="text-slate-600 font-medium leading-relaxed">
          {isAr 
            ? 'تهانينا لانضمامك إلى أكاديمية بنين وبنات! بمجرد اكتمال تسجيلك، ستكون مستعداً لبدء رحلة التعلم الخاصة بك. قبل البدء في دورتك الأولى، خذ بضع لحظات لإكمال الخطوات أدناه:'
            : 'Congratulations on joining Banaat Academy! Once your enrollment has been completed, you\'re ready to begin your learning journey. Before starting your first course, take a few moments to complete the steps below:'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <h4 className="font-black text-primary text-base">{s.t}</h4>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20">
          <p className="text-sm font-black text-primary">
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
    description: isAr ? 'فهم الاختلافات الجوهرية عن المدرسة التقليدية ونظام التقدم.' : 'Understanding the core differences from traditional schools and the progress system.',
    content: (
      <div className="space-y-8 py-4">
        <p className="text-slate-600 font-medium leading-relaxed">
          {isAr 
            ? 'BBA تختلف عن المدرسة التقليدية. بدلاً من حضور دروس مباشرة كل يوم، يكمل الطلاب دوراتهم الدراسية عبر الإنترنت من خلال Edgenuity مع تلقي التوجيه والدعم من الفريق الأكاديمي للأكاديمية.'
            : 'BBA is different from a traditional school. Instead of attending live classes every day, students complete their coursework online through Edgenuity while receiving guidance and support from BBA\'s academic team.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { t: isAr ? 'اتبع خطة الطالب الخاصة بك' : 'Follow Your Student Plan', d: isAr ? 'خارطة طريقك للنجاح. يتلقى كل طالب خطة طالب شخصية تحدد الدورات التي من المتوقع أن يكملها طوال العام الدراسي. اتباع خطتك هو أسهل طريقة للبقاء منظماً والتخرج في الوقت المحدد.' : 'Your roadmap to success. Every student receives a personalized Student Plan outlining the courses they are expected to complete throughout the school year. Following your Student Plan is the easiest way to stay organized and graduate on time.' },
            { t: isAr ? 'تعلم بالسرعة التي تناسبك' : 'Learn at Your Own Pace', d: isAr ? 'اعمل عندما يناسبك ذلك بشكل أفضل. لا توجد ساعات عمل يومية مطلوبة. ومع ذلك، فإن المرونة لا تعني وقتاً غير محدود. يتوقع من الطلاب إكمال ما يقرب من 5-7٪ من دوراتهم الدراسية كل يوم عمل للبقاء على المسار الصحيح.' : 'Work when it works best for you. There are no required daily class hours. However, flexibility does not mean unlimited time. Students are expected to complete approximately 5–7% of their coursework each weekday to remain on track.' },
            { t: isAr ? 'مرشدك هنا للمساعدة' : 'Your Mentor Is Here to Help', d: isAr ? 'لا تخف أبداً من طرح الأسئلة. يتم تعيين مرشد مخصص لكل طالب يراقب التقدم ويجيب على الأسئلة ويقدم التشجيع ويساعد في حل التحديات طوال العام الدراسي.' : 'Never be afraid to ask questions. Every student is assigned a dedicated mentor who monitors progress, answers questions, provides encouragement, and helps solve challenges throughout the school year.' },
            { t: isAr ? 'التقدم هو ما يهم' : 'Progress Is What Matters', d: isAr ? 'لا يقاس النجاح بالحضور! بل يقاس بالتقدم الأكاديمي. سواء أكملت عملك في الصباح أو بعد الظهر أو في المساء، فإن هدفك يظل كما هو: الاستمرار في إحراز تقدم ثابت.' : 'Success isn\'t measured by attendance! It\'s measured by progress. Unlike traditional schools, BBA focuses on academic progress. Whether you complete your work in the morning, afternoon, or evening, your goal remains the same.' },
            { t: isAr ? 'تعلم من أي مكان' : 'Learn From Anywhere', d: isAr ? 'فصلك الدراسي يسافر معك. سواء كنت تتعلم من المنزل أو تسافر مع عائلتك أو تعيش في بلد آخر، تظل دوراتك متاحة أينما كان لديك اتصال موثوق بالإنترنت.' : 'Your classroom travels with you. Whether you\'re learning from home, traveling with your family, or living in another country, your courses remain available wherever you have a reliable internet connection.' },
            { t: isAr ? 'نجاح الطلاب جهد جماعي' : 'Student Success Is a Team Effort', d: isAr ? 'كل طالب ناجح لديه فريق دعم قوي خلفه. في BBA، يأتي النجاح من الشراكة بين الطلاب وأولياء الأمور والمرشدين والمستشارين والأكاديمية.' : 'Every successful student has a strong support team behind them. At BBA, success comes from the partnership between students, parents, mentors, counselors, and the academy.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-3xl bg-white border border-slate-100 shadow-sm">
              <div className="h-8 w-8 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-black text-primary text-base mb-1">{item.t}</h4>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Success Formula Visual */}
        <div className="bg-primary text-white p-8 rounded-[3rem] space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <GraduationCap className="h-32 w-32" />
          </div>
          <h4 className="font-black text-secondary uppercase tracking-[0.2em] text-center text-sm">{isAr ? 'معادلة النجاح في BBA' : 'The BBA Success Formula'}</h4>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            {[
              { n: '1', t: isAr ? 'دخول يومي' : 'Daily Login' },
              { n: '2', t: isAr ? 'إنجاز 5-7%' : '5-7% Progress' },
              { n: '3', t: isAr ? 'دورة شهرياً' : '1 Course/Mo' },
              { n: '4', t: isAr ? '10 دورات سنوياً' : '10 Courses/Yr' },
              { n: '5', t: isAr ? 'تخرج' : 'Graduation' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 text-center">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center font-black text-lg border border-white/20">{step.n}</div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{step.t}</span>
                {idx < 4 && <div className="hidden md:block absolute h-0.5 w-12 bg-white/20 -right-10 top-6" />}
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
    description: isAr ? 'دليلك التقني للمنصة والوصول للمواد التعليمية.' : 'Your technical guide to the platform and accessing educational materials.',
    content: (
      <div className="space-y-8 py-4">
        <div className="text-center space-y-4">
          <p className="text-slate-600 font-bold text-lg">
            {isAr ? 'جديد في Edgenuity؟ لا قلق، ابدأ من هنا!' : 'New to Edgenuity? No Worries, Start here!'}
          </p>
          <p className="text-sm text-slate-500 font-medium max-w-2xl mx-auto">
            {isAr 
              ? 'قبل البدء في دورتك الأولى، خذ بضع دقائق لمشاهدة هذا الفيديو. سيعرفك على منصة التعلم Edgenuity ويوضح لك كيفية التنقل في دوراتك وإكمال الدروس وتتبع تقدمك.'
              : 'Before beginning your first course, take a few minutes to watch this video. It will introduce you to the Edgenuity learning platform and show you how to navigate your courses, complete lessons, track your progress, and use the tools you\'ll rely on throughout the school year.'}
          </p>
        </div>

        <div className="aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/wTuSRO3BJ8k"
            title="BBA Academy - Edgenuity Orientation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="bg-slate-50 p-8 rounded-[3rem] space-y-8">
          <div className="text-center space-y-4">
             <h4 className="text-xl font-black text-primary uppercase tracking-tight">{isAr ? 'ماذا ستجد في الداخل' : 'What You\'ll Find Inside'}</h4>
             <p className="text-xs font-black text-secondary uppercase tracking-widest">{isAr ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need in One Place'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { t: isAr ? 'الدورات' : 'Courses', d: isAr ? 'الوصول إلى جميع الدورات التدريبية المعينة لك في مكان واحد مريح.' : 'Access all of your assigned courses in one convenient location.' },
              { t: isAr ? 'الدرجات والتقدم' : 'Grades & Progress', d: isAr ? 'راقب أداءك الأكاديمي في أي وقت لضمان البقاء على المسار الصحيح.' : 'Monitor your academic performance at any time to ensure you remain on track.' },
              { t: isAr ? 'المهام والتقييمات' : 'Assignments & Assessments', d: isAr ? 'أكمل الاختبارات والمشاريع والمهام الأخرى مباشرة من خلال المنصة.' : 'Complete quizzes, tests, projects, and other assignments directly through the platform.' },
              { t: isAr ? 'التواصل والدعم' : 'Communication & Support', d: isAr ? 'فريق BBA متاح دائماً للإجابة على الأسئلة وتقديم التوجيه.' : 'The BBA team is always available to answer questions and provide guidance.' }
            ].map((i, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h5 className="font-black text-primary text-sm">{i.t}</h5>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">{i.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="h-16 px-12 bg-secondary hover:bg-primary text-white font-black rounded-2xl shadow-xl shadow-secondary/20">
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
    description: isAr ? 'المسؤوليات المشتركة لضمان رحلة تعليمية ناجحة.' : 'Shared responsibilities for a successful learning journey.',
    content: (
      <div className="space-y-8 py-4">
        <p className="text-slate-600 font-medium leading-relaxed italic text-center max-w-3xl mx-auto">
          {isAr 
            ? 'في أكاديمية بنين وبنات، يُبنى نجاح الطلاب على الشراكة. هدفنا هو تزويد كل طالب بالأدوات والتوجيه والدعم اللازم للنجاح. في المقابل، نطلب من الطلاب وأولياء الأمور البقاء مشاركين والتواصل بانفتاح.'
            : 'At Baneen Banaat Academy, student success is built on partnership. Our goal is to provide every student with the tools, guidance, and support needed to succeed. In return, we ask students and parents to stay engaged and communicate openly.'}
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expectations from BBA */}
          <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 space-y-6">
            <h4 className="font-black text-primary text-base flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              {isAr ? 'ماذا تتوقع من BBA' : 'What You Can Expect From BBA'}
            </h4>
            <ul className="space-y-4">
              {[
                isAr ? 'تقديم خطة طالب شخصية مصممة لتوجيهك طوال العام.' : 'Provide a personalized Student Plan designed to guide you.',
                isAr ? 'تعيين مرشد مخصص لدعمك وتشجيعك وتوجيهك.' : 'Assign a dedicated mentor to support, encourage, and guide you.',
                isAr ? 'مراقبة تقدمك الأكاديمي والتواصل عند وجود مخاوف.' : 'Monitor your academic progress and reach out if we notice concerns.',
                isAr ? 'الرد على أسئلتك والمساعدة خلال ساعات العمل الرسمية.' : 'Respond to your questions and assist during regular office hours.',
                isAr ? 'مراجعة الدورات المكتملة وفتح دورات جديدة عند استيفاء المتطلبات.' : 'Review completed courses and unlock new courses upon completion.',
                isAr ? 'عامل كل طالب وأسرة بمهنية واحترام ورعاية.' : 'Treat every student and family with professionalism and respect.'
              ].map((li, i) => (
                <li key={i} className="flex gap-3 text-xs font-bold text-slate-600 leading-relaxed">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                  {li}
                </li>
              ))}
            </ul>
          </div>

          {/* Expectations from Students */}
          <div className="p-8 bg-secondary/5 rounded-[2.5rem] border border-secondary/10 space-y-6">
            <h4 className="font-black text-primary text-base flex items-center gap-3">
              <UserCheck className="h-5 w-5 text-secondary" />
              {isAr ? 'ماذا تتوقع BBA من الطلاب' : 'What BBA Expects From Students'}
            </h4>
            <ul className="space-y-4">
              {[
                isAr ? 'تسجيل الدخول بانتظام وإحراز تقدم ثابت.' : 'Log into Edgenuity regularly and make consistent progress.',
                isAr ? 'إكمال ما يقرب من 5-7٪ من الدورات الدراسية كل يوم عمل.' : 'Complete approximately 5–7% of coursework each weekday.',
                isAr ? 'اتباع خطة الطالب وإكمال الدورات وفقاً للجدول الموصى به.' : 'Follow their Student Plan and recommended schedule.',
                isAr ? 'قراءة الرسائل من مرشدهم والرد عليها عند الضرورة.' : 'Read and respond to messages from their mentor.',
                isAr ? 'طلب المساعدة كلما كان لديهم أسئلة أو احتاجوا إلى دعم.' : 'Reach out for help whenever they have questions.',
                isAr ? 'إكمال جميع المهام والاختبارات والمشاريع بأمانة.' : 'Complete all assignments and exams honestly.',
                isAr ? 'إخطار مرشدهم إذا كانوا غير قادرين على الدراسة لفترة طويلة.' : 'Notify their mentor if unable to study for an extended period.'
              ].map((li, i) => (
                <li key={i} className="flex gap-3 text-xs font-bold text-slate-600 leading-relaxed">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  {li}
                </li>
              ))}
            </ul>
          </div>

          {/* Expectations from Parents */}
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 space-y-6">
            <h4 className="font-black text-primary text-base flex items-center gap-3">
              <Users className="h-5 w-5 text-secondary" />
              {isAr ? 'ماذا تتوقع BBA من أولياء الأمور' : 'What BBA Expects From Parents'}
            </h4>
            <ul className="space-y-4">
              {[
                isAr ? 'تشجيع طفلهم على الحفاظ على روتين تعليمي ثابت.' : 'Encourage their child to maintain a consistent routine.',
                isAr ? 'البقاء على اتصال مع المرشدين وفريق BBA عند الحاجة.' : 'Stay in communication with mentors and the BBA team.',
                isAr ? 'الرد على رسائل البريد الإلكتروني أو المكالمات من الأكاديمية.' : 'Respond to emails, phone calls, or messages from the academy.',
                isAr ? 'مراقبة التقدم الأكاديمي لأطفالهم بانتظام.' : 'Monitor their child\'s academic progress regularly.',
                isAr ? 'دعم طفلهم في البقاء متحفزاً ومنظماً وفي الموعد المحدد.' : 'Support their child in staying motivated and organized.'
              ].map((li, i) => (
                <li key={i} className="flex gap-3 text-xs font-bold text-slate-600 leading-relaxed">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                  {li}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-10 rounded-[3rem] text-center italic font-bold">
           "{isAr ? 'في BBA، نؤمن بأن النجاح لا يُبنى في يوم واحد - بل يُبنى من خلال الجهد المستمر والتواصل المفتوح والشراكة القوية بين الطلاب وأولياء الأمور والمدرسة' : 'At BBA, we believe success isn\'t built in a single day—it\'s built through consistent effort, open communication, and a strong partnership between students, parents, and the school'}"
        </div>
      </div>
    )
  },
  {
    id: 'courses-faqs',
    icon: HelpCircle,
    title: isAr ? '5. فهم الدورات (الأسئلة الشائعة)' : '5. Understanding Your Courses (FAQs)',
    description: isAr ? 'إجابات على الأسئلة الأكثر شيوعاً حول المواد والتقييمات.' : 'Answers to the most common questions about materials and assessments.',
    content: (
      <div className="space-y-6 py-4">
        {[
          { q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب خلال العام الدراسي. هذه الدورات مدرجة في خطة الطالب الشخصية الخاصة بك، والتي تعمل كخارطة طريق لك من سبتمبر حتى يونيو.' : 'Most students are assigned 10 courses to complete during the school year. These courses are listed in your personalized Student Plan, which serves as your roadmap from September through June.' },
          { q: isAr ? 'هل يمكنني العمل على أكثر من دورة تدريبية في وقت واحد؟' : 'Can I work on more than one course at a time?', a: isAr ? 'في معظم الحالات، لا. يتوقع من الطلاب التركيز على دورة واحدة في كل مرة قبل الانتقال إلى التالية. هذا يساعد الطلاب على البقاء مركزين ويمنعهم من الشعور بالإرهاق.' : 'In most cases, NO. Students are expected to focus on one course at a time before moving on to the next. This helps students stay focused and prevents them from becoming overwhelmed.' },
          { q: isAr ? 'هل يمكنني إعادة المهام أو الاختبارات؟' : 'Can I redo assignments, quizzes, or exams?', a: isAr ? 'نعم. إذا كانت درجتك الإجمالية أقل من درجة النجاح المطلوبة، أو إذا كنت ترغب ببساطة في تحسين أدائك، فقد يُطلب منك أو يُسمح لك بإعادة مهام معينة. يرجى ملاحظة أن فرص إعادة الاختبار محدودة.' : 'Yes. If your overall course grade is below the required passing grade, or if you would simply like to improve your performance, you may be asked or permitted to redo certain assignments. Please note that retake opportunities are limited.' },
          { q: isAr ? 'هل يمكنني تغيير إحدى دوراتي؟' : 'Can I change one of my courses?', a: isAr ? 'ممكن. إذا كنت ترغب في تغيير دورة تدريبية، يجب عليك الاتصال بمستشار BBA لمناقشة طلبك. قد لا تتم الموافقة على بعض الطلبات بناءً على متطلبات التخرج أو خطتك الأكاديمية.' : 'Possibly. If you would like to change a course, you should contact your BBA counselor to discuss your request. Some requests may not be approved depending on graduation requirements or your academic plan.' },
          { q: isAr ? 'كم من الوقت يجب أن تستغرق كل دورة؟' : 'How long should each course take?', a: isAr ? 'من المقرر إكمال الدورات بشكل عام في غضون 3-4 أسابيع، مما يسمح لمعظم الطلاب بإنهاء دورة واحدة تقريباً كل شهر.' : 'Courses are generally scheduled to be completed within 3–4 weeks, which allows most students to finish approximately one course each month.' },
          { q: isAr ? 'هل يمكنني العمل مسبقاً؟' : 'Can I work ahead?', a: isAr ? 'نعم! نُشجع الطلاب على البقاء متقدمين كلما أمكن ذلك. ومع ذلك، يقتصر الطلاب عموماً على إكمال ما لا يزيد عن دورتين في شهر واحد.' : 'Yes! Students are encouraged to stay ahead whenever possible. However, students are generally limited to completing no more than two courses within a single month.' },
          { q: isAr ? 'هل يمكنني تخطي الدروس أو المهام؟' : 'Can I skip lessons or assignments?', a: isAr ? 'لا. تم تصميم كل درس ومهمة واختبار لمساعدتك على إتقان مادة الدورة التدريبية. تخطي الدورات الدراسية المطلوبة غير مسموح به.' : 'No. Every lesson, assignment, quiz, and exam is designed to help you master the course material. Skipping required coursework is not permitted.' }
        ].map((faq, i) => (
          <div key={i} className="p-6 bg-slate-50 rounded-3xl space-y-3 border border-slate-100 shadow-sm">
            <h4 className="font-black text-primary text-base">{faq.q}</h4>
            <p className="text-sm text-slate-500 font-bold leading-relaxed">{faq.a}</p>
          </div>
        ))}
        
        {/* Next Course Process */}
        <div className="bg-primary text-white p-8 rounded-[3rem] space-y-6">
          <h4 className="text-xl font-black text-secondary uppercase tracking-tight text-center">{isAr ? 'كيف أستلم دورتي القادمة؟' : 'How Do I Receive My Next Course?'}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
               isAr ? '1. أكمل دورتك الحالية' : '1. Complete course',
               isAr ? '2. أخطر مرشدك بالانتهاء' : '2. Notify mentor',
               isAr ? '3. سنراجع درجتك النهائية' : '3. Review grade',
               isAr ? '4. قد يطلب منك التحسين' : '4. Improve if needed',
               isAr ? '5. سيتم تعيين دورتك التالية' : '5. Next course assigned'
            ].map((step, idx) => (
              <div key={idx} className="p-4 bg-white/10 rounded-xl text-center text-[10px] font-black uppercase tracking-widest">{step}</div>
            ))}
          </div>
        </div>

        <div className="bg-secondary text-white p-6 rounded-2xl text-center font-bold">
          {isAr ? 'تذكر: خطة الطالب الخاصة بك مصممة بعناية لمساعدتك على النجاح. أسهل طريقة لإنهاء العام الدراسي في الوقت المحدد هي التركيز على دورة واحدة في كل مرة.' : 'Remember: Your Student Plan was carefully designed to help you succeed. The easiest way to finish the school year on time is to focus on one course at a time.'}
        </div>
      </div>
    )
  },
  {
    id: 'support',
    icon: MessageSquare,
    title: isAr ? '6. أنت لا تتعلم بمفردك أبداً' : '6. You\'re Never Learning Alone',
    description: isAr ? 'فريقنا التعليمي معك في كل خطوة لدعم نجاحك.' : 'Our educational team is with you every step to support your success.',
    content: (
      <div className="space-y-8 py-4">
        <div className="text-center space-y-4">
          <h4 className="text-2xl font-black text-primary">{isAr ? 'التعليم أفضل مع التوجيه' : 'Education Is Better with Guidance'}</h4>
          <p className="text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {isAr 
              ? 'أحد أكبر المفاهيم الخاطئة حول التعلم عبر الإنترنت هو أنه يتوقع من الطلاب اكتشاف كل شيء بأنفسهم. في أكاديمية بنين وبنات، ليس هذا هو الحال أبداً.'
              : 'One of the biggest misconceptions about online learning is that students are expected to figure everything out on their own. At Baneen and Banaat Academy, that\'s never the case.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: isAr ? 'مراقبة تقدم الطالب' : 'Monitoring student progress', icon: Star },
            { t: isAr ? 'تقديم التوجيه الأكاديمي' : 'Providing academic guidance', icon: Star },
            { t: isAr ? 'الإجابة على الأسئلة' : 'Answering questions', icon: Star },
            { t: isAr ? 'مساعدة الطلاب على البقاء على المسار الصحيح' : 'Helping students stay on pace', icon: Star },
            { t: isAr ? 'الشراكة مع العائلات لدعم النجاح' : 'Partnering with families to support success', icon: Star }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
               <item.icon className="h-5 w-5 text-secondary shrink-0" />
               <span className="font-bold text-primary text-sm">{item.t}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-10 rounded-[3rem] space-y-8">
          <div className="text-center space-y-2">
            <h4 className="text-xl font-black text-primary uppercase tracking-tight">{isAr ? 'نحن هنا لدعمك' : 'We\'re Here to Support You'}</h4>
            <p className="text-xs font-black text-secondary uppercase tracking-[0.3em]">{isAr ? 'هل تحتاج إلى مساعدة؟' : 'Need Help?'}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center shrink-0">
                 <Mail className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email</div>
                <div className="text-sm font-black text-primary truncate">banaatacademy@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center shrink-0">
                 <Phone className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone</div>
                <div className="text-sm font-black text-primary">(313) 455-0322</div>
              </div>
            </div>
          </div>
          
          <div className="text-center p-6 border-t border-slate-200">
             <p className="text-sm text-slate-500 font-bold leading-relaxed">
               {isAr ? 'وقت الاستجابة: نسعى للرد على جميع استفسارات الطلاب والعائلات في أسرع وقت ممكن خلال ساعات العمل العادية.' : 'Response Time: We strive to respond to all student and family inquiries as quickly as possible during regular business hours.'}
             </p>
          </div>
        </div>

        <div className="bg-primary text-white p-12 rounded-[3rem] text-center italic font-black text-lg">
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
    <div className="bg-white min-h-screen">
      {/* Premium Header Section */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">
            {isAr ? 'دليل طالب BBA' : 'BBA Student Guide'}
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-white/70 font-bold max-w-3xl mx-auto leading-relaxed italic">
            {isAr 
              ? 'كل ما يحتاجه الطلاب وأولياء الأمور لمعرفته من أجل عام دراسي ناجح.' 
              : 'Everything Students & Parents Need to Know for a Successful School Year.'}
          </p>
          <div className="h-2 w-32 bg-secondary mx-auto rounded-full mt-8 shadow-[0_0_20px_rgba(56,189,248,0.5)]" />
        </div>
      </section>

      <div className="container-tight py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Welcome Intro Section */}
          <div className="bg-slate-50 p-10 lg:p-16 rounded-[4rem] border border-slate-100 shadow-sm space-y-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-black text-primary leading-tight">
               {isAr ? 'أهلاً بكم في دليل الطالب، نحن متحمسون لانضمامكم إلينا!' : 'Welcome to the BBA Student Guide. We are excited to have you join us!'}
            </h2>
            <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-lg">
               <p>{isAr ? 'سواء كنت طالباً جديداً أو ولي أمر، فقد تم تصميم هذا الدليل لمساعدتك على فهم كيفية عمل برنامج BBA، وما هو متوقع طوال العام الدراسي، وكيفية البقاء على المسار الصحيح للنجاح.' : 'Whether you are a new student or a parent, this guide is designed to help you understand how the BBA program works, what is expected throughout the school year, and how to stay on track for success.'}</p>
               <p>{isAr ? 'نظراً لأن BBA هي مدرسة ذاتية التعلم عبر الإنترنت، يتمتع الطلاب بالمرونة للتعلم من أي مكان مع التقدم بوتيرة تناسب جدولهم الزمني. ومع ذلك، فإن هذه المرونة تأتي مع المسؤولية. يعتمد النجاح في BBA على الاستمرار في الالتزام واتباع خطة الطالب الخاصة بك والتواصل مع مرشدك كلما احتجت إلى مساعدة.' : 'Because BBA is an online, self-paced school, students have the flexibility to learn from anywhere while progressing at a pace that fits their schedule. However, with that flexibility comes responsibility. Success at BBA depends on staying consistent, following your Student Plan, and communicating with your mentor whenever you need assistance.'}</p>
            </div>
          </div>

          {/* Main Expandable List (Accordion) */}
          <div className="space-y-6">
            <Accordion type="single" collapsible className="space-y-6">
              {sections.map((section) => (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className="bg-white border border-slate-100 rounded-[3rem] px-8 sm:px-12 shadow-premium overflow-hidden transition-all duration-500 hover:shadow-2xl group data-[state=open]:ring-8 data-[state=open]:ring-secondary/5"
                >
                  <AccordionTrigger className="hover:no-underline py-10 group">
                    <div className="flex items-center gap-6 sm:gap-10 text-start">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-[2rem] bg-slate-50 text-secondary flex items-center justify-center shrink-0 transition-all group-hover:bg-secondary group-hover:text-white shadow-inner">
                        <section.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-3xl font-black text-primary group-hover:text-secondary transition-colors leading-tight">{section.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-400 font-bold leading-relaxed">{section.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-12 border-t border-slate-50 animate-in fade-in slide-in-from-top-8 duration-700">
                     {section.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Final Encouragement Card */}
          <div className="bg-primary text-white p-12 sm:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden text-center space-y-10 mt-20 sm:mt-32">
             <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                  {isAr ? 'نحن معك في كل خطوة على الطريق' : 'We\'re With You Every Step of the Way'}
                </h2>
                <div className="space-y-4 text-sm sm:text-xl opacity-80 font-bold leading-relaxed italic">
                   <p>{isAr ? 'كل درس تكتمله... كل مهمة تنهيها... كل إنجاز تحققه... يقربك خطوة واحدة من أهدافك.' : 'Every completed lesson... Every finished assignment... Every milestone you achieve... Brings you one step closer to your goals.'}</p>
                   <p>{isAr ? 'تذكر، النجاح لا يعني أن تكون مثالياً - بل يعني الحضور والاستمرار في المضي قدماً.' : 'Remember, success isn\'t about being perfect—it\'s about showing up, staying consistent, and continuing to move forward.'}</p>
                </div>
                <div className="pt-8">
                  <Button asChild className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-full px-12 h-16 sm:h-20 text-lg transition-all shadow-2xl shadow-secondary/20 active:scale-95 group">
                    <Link href={`/${lang}/contact`}>
                      {isAr ? 'تواصل مع فريق الدعم' : 'Contact Our Support Team'}
                      {isAr ? <ChevronLeft className="h-6 w-6 mr-3 group-hover:-translate-x-2 transition-transform" /> : <ChevronRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />}
                    </Link>
                  </Button>
                </div>
             </div>
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <ShieldCheck className="h-64 w-64 sm:h-[30rem] sm:w-[30rem]" />
             </div>
          </div>

          <div className="text-center pb-20 space-y-4">
             <p className="text-slate-400 font-black text-xs uppercase tracking-[0.4em]">
                {isAr ? 'نتمنى لكم عاماً دراسياً مذهلاً ومليئاً بالنجاح' : 'Wishing you an amazing and successful school year'}
             </p>
             <div className="h-1 w-12 bg-slate-200 mx-auto rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
