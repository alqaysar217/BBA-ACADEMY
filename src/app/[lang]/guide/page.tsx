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
  ChevronRight,
  ChevronLeft,
  Trophy,
  ExternalLink,
  Target,
  Clock,
  LayoutDashboard,
  ClipboardCheck,
  UserCheck,
  Star,
  FileText,
  MousePointer2,
  ArrowRight,
  ArrowLeft,
  GraduationCap
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
      <div className="space-y-8 py-4">
        <p className="text-slate-600 font-medium leading-relaxed">
          {isAr 
            ? 'تهانينا لانضمامك إلى أكاديمية بنين وبنات! بمجرد اكتمال تسجيلك، ستكون مستعداً لبدء رحلة التعلم الخاصة بك. قبل البدء في دورتك الأولى، خذ بضع لحظات لإكمال الخطوات أدناه:'
            : 'Congratulations on joining Banaat Academy! Once your enrollment has been completed, you\'re ready to begin your learning journey. Before starting your first course, take a few moments to complete the steps below:'}
        </p>
        <div className="grid grid-cols-1 gap-6">
          {[
            { 
              t: isAr ? 'تحقق من بريدك الترحيبي' : 'Check Your Welcome Email', 
              d: isAr ? 'يحتوي بريدك الترحيبي على كل ما تحتاجه للبدء، بما في ذلك معلومات تسجيل الدخول إلى Edgenuity، وخطة الطالب الشخصية الخاصة بك، والمرشد المعين لك ومعلومات الاتصال الخاصة به. إذا لم تجد البريد الإلكتروني، فتأكد من مراجعة مجلد البريد العشوائي.' : 'Your Welcome Email contains everything you need to get started, including your Edgenuity login information, your personalized Student Plan, and your assigned mentor. If you cannot find the email, be sure to check your Spam folder.' 
            },
            { 
              t: isAr ? 'تسجيل الدخول إلى حساب Edgenuity' : 'Log Into Your Edgenuity Account', 
              d: isAr ? 'Edgenuity هي منصة التعلم عبر الإنترنت حيث ستكمل جميع دروسك ومهامك واختباراتك. هذا هو المكان الذي ستقضي فيه معظم وقتك طوال العام الدراسي.' : 'Edgenuity is the online learning platform where you will complete all of your lessons, assignments, and quizzes. This is where you will spend most of your time.' 
            },
            { 
              t: isAr ? 'مراجعة خطة الطالب الخاصة بك' : 'Review Your Student Plan', 
              d: isAr ? 'يتلقى كل طالب خطة طالب تحدد الدورات التي من المتوقع أن يكملها. في معظم الحالات، يتوقع من الطلاب إكمال 10 دورات بين سبتمبر ويونيو، بمعدل دورة واحدة كل شهر.' : 'Every student receives a Student Plan outlining the courses they are expected to complete. Usually, students complete 10 courses between September and June, averaging one per month.' 
            },
            { 
              t: isAr ? 'تعرف على مرشدك' : 'Meet Your Mentor', 
              d: isAr ? 'يتم تعيين مرشد لكل طالب ويكون متاحاً للإجابة على الأسئلة وتقديم التوجيه ومراقبة التقدم ومساعدة الطلاب على البقاء في المسار الصحيح. مرشدك هو نقطة الاتصال الأولى لك.' : 'Every student is assigned a BBA mentor who is available to answer questions, provide guidance, and monitor progress. Your mentor is your first point of contact.' 
            },
            { 
              t: isAr ? 'ابدأ دورتك الأولى' : 'Start Your First Course', 
              d: isAr ? 'بمجرد مراجعة خطة الطالب، وتسجيل الدخول إلى Edgenuity، ولقاء مرشدك، فقد حان الوقت لبدء التعلم! ابدأ بأول دورة تدريبية واعمل كل يوم عمل باستمرار للبقاء في الجدول الزمني.' : 'Once you\'ve reviewed your plan and met your mentor, it\'s time to begin learning! Start with your first assigned course and work consistently each weekday.' 
            }
          ].map((s, i) => (
            <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center font-black text-primary shrink-0 border border-primary/10">
                {i + 1}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-primary text-lg">{s.t}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20">
          <p className="text-sm font-bold text-primary italic leading-relaxed text-center">
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
      <div className="space-y-8 py-4">
        <div className="text-center space-y-3">
          <h4 className="font-black text-primary text-2xl">{isAr ? 'الأكاديمية تختلف عن المدرسة التقليدية' : 'BBA is different from a traditional school'}</h4>
          <p className="text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {isAr 
              ? 'بدلاً من حضور دروس مباشرة كل يوم، يكمل الطلاب دوراتهم الدراسية عبر الإنترنت من خلال Edgenuity مع تلقي التوجيه والدعم من الفريق الأكاديمي. هذا يمنح الطلاب المرونة للتعلم بالسرعة التي تناسبهم.'
              : 'Instead of attending live classes every day, students complete their coursework online through Edgenuity while receiving guidance and support. This gives students the flexibility to learn at their own pace.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { t: isAr ? 'اتبع خطة الطالب الخاصة بك' : 'Follow Your Student Plan', d: isAr ? 'خارطة طريقك للنجاح. يتلقى كل طالب خطة طالب شخصية تحدد الدورات التي من المتوقع أن يكملها طوال العام الدراسي.' : 'Your roadmap to success. Every student receives a personalized Student Plan outlining the courses they are expected to complete.' },
            { t: isAr ? 'تعلم بالسرعة التي تناسبك' : 'Learn at Your Own Pace', d: isAr ? 'اعمل عندما يناسبك ذلك بشكل أفضل. لا توجد ساعات عمل يومية مطلوبة، ولكن يتوقع من الطلاب إكمال ما يقرب من 5-7٪ يومياً.' : 'Work when it works best for you. No required daily class hours, but students are expected to complete approximately 5–7% daily.' },
            { t: isAr ? 'مرشدك هنا للمساعدة' : 'Your Mentor Is Here to Help', d: isAr ? 'يتم تعيين مرشد مخصص لكل طالب يراقب التقدم ويجيب على الأسئلة ويقدم التشجيع طوال العام الدراسي.' : 'Every student is assigned a dedicated mentor who monitors progress, answers questions, and provides encouragement.' },
            { t: isAr ? 'التقدم هو ما يهم' : 'Progress Is What Matters', d: isAr ? 'النجاح لا يقاس بالحضور! بل يقاس بالتقدم. تركز الأكاديمية على التقدم الأكاديمي الملموس في الدورات.' : 'Success isn\'t measured by attendance! It\'s measured by progress. BBA focuses on tangible academic advancement.' },
            { t: isAr ? 'تعلم من أي مكان' : 'Learn From Anywhere', d: isAr ? 'سواء كنت تتعلم من المنزل أو تسافر، تظل دوراتك متاحة أينما كان لديك اتصال موثوق بالإنترنت.' : 'Whether learning from home or traveling, your courses remain available wherever you have a reliable internet connection.' },
            { t: isAr ? 'نجاح الطلاب جهد جماعي' : 'Student Success Is a Team Effort', d: isAr ? 'يأتي النجاح من الشراكة بين الطلاب وأولياء الأمور والمرشدين والمستشارين والأكاديمية.' : 'Success comes from the partnership between students, parents, mentors, counselors, and the academy.' }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-black text-primary text-base">{item.t}</h4>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
        
        {/* Success Formula */}
        <div className="bg-primary text-white p-10 rounded-[2rem] space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
          <h4 className="text-center font-black text-secondary uppercase tracking-[0.2em] text-sm">{isAr ? 'معادلة النجاح في الأكاديمية' : 'The BBA Success Formula'}</h4>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative">
            {[
              { t: isAr ? 'تسجيل الدخول' : 'Log in', s: isAr ? 'كل يوم عمل' : 'Every weekday' },
              { t: isAr ? 'إكمال 5-7%' : 'Complete 5–7%', s: isAr ? 'يومياً' : 'Daily progress' },
              { t: isAr ? 'إنهاء دورة' : 'Finish 1 Course', s: isAr ? 'كل شهر' : 'Each month' },
              { t: isAr ? 'إكمال 10 دورات' : 'Finish 10 Courses', s: isAr ? 'في 10 أشهر' : 'In 10 months' },
              { t: isAr ? 'البقاء في المسار' : 'Stay on Track', s: isAr ? 'للتخرج' : 'For Graduation' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-3 relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center font-black text-secondary border border-white/20 shadow-xl">
                  {idx + 1}
                </div>
                <div>
                  <div className="font-black text-sm whitespace-nowrap">{step.t}</div>
                  <div className="text-[10px] opacity-60 font-bold uppercase">{step.s}</div>
                </div>
                {idx < 4 && <div className="hidden md:block absolute top-7 -right-8 w-12 h-px bg-white/20" />}
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
      <div className="space-y-8 py-4">
        <div className="space-y-3">
          <h4 className="text-primary font-black text-2xl">{isAr ? 'جديد في Edgenuity؟ لا قلق، ابدأ من هنا!' : 'New to Edgenuity? No Worries, Start here!'}</h4>
          <p className="text-slate-600 font-medium leading-relaxed">
            {isAr 
              ? 'قبل البدء في دورتك الأولى، شاهد هذا الفيديو لتعرف كيفية التنقل في دوراتك وإكمال الدروس وتتبع تقدمك واستخدام الأدوات التي ستعتمد عليها.'
              : 'Before beginning your first course, watch this video to learn how to navigate your courses, complete lessons, track progress, and use essential tools.'}
          </p>
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
             <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
             <p className="text-xs font-bold text-amber-800 italic">
               {isAr ? 'هام: يركز هذا الفيديو على استخدام منصة Edgenuity. استمر في قراءة هذا الدليل للتعرف على سياسات الأكاديمية.' : 'Important: This video focuses on using the platform. Continue reading for BBA policies and expectations.'}
             </p>
          </div>
        </div>

        <div className="aspect-video bg-slate-900 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/wTuSRO3BJ8k?start=9"
            title="Edgenuity Orientation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-8">
          <div className="text-center space-y-2">
             <h4 className="text-primary font-black text-xl">{isAr ? 'جاهز لبدء دوراتك؟' : 'Ready to Begin Your Courses?'}</h4>
             <p className="text-sm text-slate-500 font-medium">{isAr ? 'استخدم زر الدخول أدناه للبدء' : 'Use the login button below to get started'}</p>
          </div>
          
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-primary text-white font-black h-16 px-12 rounded-2xl shadow-xl shadow-secondary/20 transition-all scale-105 active:scale-95">
              <Link href="https://student.edgenuity.com/login" target="_blank" className="flex items-center gap-3">
                {isAr ? 'دخول منصة الطالب' : 'Student Login'}
                <ExternalLink className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <h5 className="font-black text-primary text-center mb-6">{isAr ? 'ماذا ستجد في الداخل' : 'What You\'ll Find Inside'}</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { t: isAr ? 'الدورات' : 'Courses', d: isAr ? 'الوصول إلى جميع الدورات التدريبية في مكان واحد مريح، منظمة في دروس وأنشطة.' : 'Access all courses in one convenient location, organized into lessons and activities.' },
                { t: isAr ? 'الدرجات والتقدم' : 'Grades & Progress', d: isAr ? 'مراقبة أدائك الأكاديمي، عرض العمل المكتمل، والتقدم العام لضمان البقاء في المسار.' : 'Monitor academic performance, view completed work, and overall course progress.' },
                { t: isAr ? 'المهام والتقييمات' : 'Assignments & Assessments', d: isAr ? 'إكمال الاختبارات والمشاريع مع ميزة الحفظ التلقائي للتقدم.' : 'Complete quizzes and projects with automatic progress saving features.' },
                { t: isAr ? 'التواصل والدعم' : 'Communication & Support', d: isAr ? 'فريق الأكاديمية متاح دائماً للإجابة على الأسئلة وتقديم التوجيه اللازم.' : 'The BBA team is always available to answer questions and provide guidance.' }
              ].map((i, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
                  <div className="h-2 w-2 rounded-full bg-secondary shrink-0 mt-2" />
                  <div className="space-y-1">
                    <h6 className="font-black text-primary text-sm">{i.t}</h6>
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{i.d}</p>
                  </div>
                </div>
              ))}
            </div>
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
      <div className="space-y-8 py-4">
        <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-secondary pl-6 py-2">
          {isAr 
            ? 'في أكاديمية بنين وبنات، يُبنى نجاح الطلاب على الشراكة. هدفنا هو تزويد كل طالب بالأدوات والتوجيه اللازم للنجاح. في المقابل، نطلب من الطلاب وأولياء الأمور البقاء مشاركين.'
            : 'At Baneen Banaat Academy, student success is built on partnership. Our goal is to provide every student with the tools and guidance needed. In return, we ask students and parents to stay engaged.'}
        </p>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4 border-slate-200">
              <Star className="h-6 w-6 text-secondary" />
              <h4 className="font-black text-primary text-xl">
                {isAr ? 'ماذا تتوقع من الأكاديمية' : 'What You Can Expect From BBA'}
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                isAr ? 'تقديم خطة طالب شخصية مصممة لتوجيهك.' : 'Provide a personalized Student Plan designed to guide you.',
                isAr ? 'تعيين مرشد مخصص لدعمك وتشجيعك.' : 'Assign a dedicated mentor to support and encourage you.',
                isAr ? 'مراقبة تقدمك الأكاديمي والتواصل عند الحاجة.' : 'Monitor your academic progress and reach out if needed.',
                isAr ? 'الرد على أسئلتك خلال ساعات العمل الرسمية.' : 'Respond to your questions during regular office hours.',
                isAr ? 'مراجعة الدورات المكتملة وفتح دورات جديدة.' : 'Review completed courses and unlock new ones.',
                isAr ? 'معاملة كل أسرة بمهنية واحترام ورعاية.' : 'Treat every family with professionalism and respect.'
              ].map((li, i) => (
                <div key={i} className="flex gap-3 text-xs font-bold text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b pb-4 border-slate-100">
              <Users className="h-6 w-6 text-primary" />
              <h4 className="font-black text-primary text-xl">
                {isAr ? 'ماذا تتوقع الأكاديمية من الطلاب' : 'What BBA Expects From Students'}
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                isAr ? 'تسجيل الدخول إلى Edgenuity بانتظام.' : 'Log into Edgenuity regularly.',
                isAr ? 'إكمال ما يقرب من 5-7٪ من الدورات يومياً.' : 'Complete approximately 5–7% of courses daily.',
                isAr ? 'اتباع خطة الطالب وإكمال الدورات في وقتها.' : 'Follow your Student Plan and complete courses on time.',
                isAr ? 'قراءة الرسائل من المرشد والرد عليها.' : 'Read and respond to messages from your mentor.',
                isAr ? 'طلب المساعدة عند وجود أسئلة أو تحديات.' : 'Reach out for help whenever you have questions.',
                isAr ? 'إكمال جميع المهام والامتحانات بأمانة.' : 'Complete all assignments and exams honestly.',
                isAr ? 'إخطار المرشد عند التوقف عن الدراسة مؤقتاً.' : 'Notify your mentor if you stop studying temporarily.'
              ].map((li, i) => (
                <div key={i} className="flex gap-3 text-xs font-bold text-slate-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-primary text-white rounded-[2rem] space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b pb-4 border-white/10">
              <Heart className="h-6 w-6 text-secondary" />
              <h4 className="font-black text-xl">
                {isAr ? 'ماذا تتوقع الأكاديمية من أولياء الأمور' : 'What BBA Expects From Parents'}
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                isAr ? 'تشجيع الطفل على روتين تعليمي ثابت.' : 'Encourage a consistent learning routine.',
                isAr ? 'البقاء على اتصال مع المرشدين وفريق العمل.' : 'Stay in communication with mentors and staff.',
                isAr ? 'الرد على المكالمات ورسائل البريد والواتساب.' : 'Respond to emails, calls, and WhatsApp messages.',
                isAr ? 'مراقبة التقدم الأكاديمي للطفل بانتظام.' : 'Monitor your child\'s academic progress regularly.',
                isAr ? 'دعم الطفل في البقاء متحفزاً ومنظماً.' : 'Support your child in staying motivated and organized.'
              ].map((li, i) => (
                <div key={i} className="flex gap-3 text-xs font-bold text-white/80">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                  <span>{li}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-white/50 font-bold mt-4 pt-4 border-t border-white/10">
              {isAr ? 'يمكن لأولياء الأمور طلب تلقي تحديثات التقدم اليومية التلقائية عبر البريد الإلكتروني.' : 'Parents may request automatic daily progress updates via email.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-[2rem] text-center italic font-bold text-lg leading-relaxed shadow-2xl">
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
      <div className="space-y-6 py-4">
        <p className="text-slate-500 font-bold text-sm leading-relaxed mb-6">
          {isAr ? 'دوراتك هي أساس تجربتك التعليمية. فهم كيفية عملها سيساعدك على البقاء منظماً وتجنب التأخير.' : 'Your courses are the foundation of your experience. Understanding how they work will help you stay organized and avoid delays.'}
        </p>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            { q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب لإكمالها خلال العام الدراسي، وهي مدرجة في خطة الطالب الشخصية الخاصة بك من سبتمبر حتى يونيو.' : 'Most students are assigned 10 courses to complete during the school year, as listed in your Student Plan from September through June.' },
            { q: isAr ? 'هل يمكنني العمل على أكثر من دورة في وقت واحد؟' : 'Can I work on more than one course at a time?', a: isAr ? 'في معظم الحالات، لا. يتوقع من الطلاب التركيز على دورة واحدة في كل مرة لتعزيز التعلم وتجنب الإرهاق، إلا في حالات خاصة يوافق عليها المستشار.' : 'In most cases, NO. Students should focus on one course at a time to improve learning and prevent overwhelm, unless approved by a counselor.' },
            { q: isAr ? 'هل يمكنني إعادة المهام أو الاختبارات؟' : 'Can I redo assignments, quizzes, or exams?', a: isAr ? 'نعم، إذا كانت درجتك أقل من النجاح أو للتحسين، ولكن فرص إعادة الاختبار محدودة وتتطلب تنسيقاً مع المرشد.' : 'Yes, if your grade is below passing or for improvement, but retake opportunities are limited and require coordination with your mentor.' },
            { q: isAr ? 'هل يمكنني تغيير إحدى دوراتي؟' : 'Can I change one of my courses?', a: isAr ? 'ممكن، يجب عليك الاتصال بالمستشار لمناقشة الطلب، وتعتمد الموافقة على متطلبات التخرج والخطة الأكاديمية.' : 'Possibly. Contact your counselor to discuss the request; approval depends on graduation requirements and your plan.' },
            { q: isAr ? 'كم من الوقت يجب أن تستغرق كل دورة؟' : 'How long should each course take?', a: isAr ? 'من 3-4 أسابيع، مما يتيح إنهاء دورة واحدة شهرياً عند الالتزام بتقدم 5-7٪ يومياً.' : 'Generally 3–4 weeks, allowing for one course per month with 5–7% daily progress.' },
            { q: isAr ? 'هل يمكنني العمل مسبقاً؟' : 'Can I work ahead?', a: isAr ? 'نعم! نشجع على ذلك، ولكن يُسمح بإنهاء دورتين كحد أقصى في الشهر الواحد.' : 'Yes! We encourage staying ahead, but students are limited to two courses per month.' },
            { q: isAr ? 'هل يمكنني تخطي الدروس؟' : 'Can I skip lessons or assignments?', a: isAr ? 'لا. كل درس ومهمة ضرورية لإتقان المادة، وتخطيها يمنع إكمال الدورة بنجاح.' : 'No. Every lesson and assignment is essential for mastery; skipping them prevents successful completion.' },
            { q: isAr ? 'كيف أستلم دورتي القادمة؟' : 'How Do I Receive My Next Course?', a: isAr ? 'أكمل الدورة الحالية، أخطر مرشدك، سنراجع درجتك وأداءك، ثم يتم تعيين الدورة التالية.' : 'Complete the current course, notify your mentor, we review your performance, then assign the next course.' }
          ].map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-2xl px-6 bg-slate-50 hover:bg-white transition-all">
              <AccordionTrigger className="hover:no-underline font-black text-primary text-start">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 font-bold leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 mt-8">
          <p className="text-xs font-bold text-primary italic leading-relaxed text-center">
            {isAr ? 'تذكر: تم تصميم خطة الطالب بعناية لمساعدتك على النجاح. أسهل طريقة هي التركيز على دورة واحدة، والعمل باستمرار، والتواصل الدائم مع مرشدك.' : 'Remember: Your Student Plan is designed for your success. The easiest way is to focus on one course, work consistently, and stay in touch with your mentor.'}
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'support',
    icon: MessageSquare,
    title: isAr ? '6. الدعم والتواصل' : '6. Mentoring, Support & Communication',
    content: (
      <div className="space-y-8 py-4">
        <div className="space-y-3">
          <h4 className="text-2xl font-black text-primary">{isAr ? 'التعليم أفضل مع التوجيه' : 'Education Is Better with Guidance'}</h4>
          <p className="text-slate-600 font-medium leading-relaxed">
            {isAr 
              ? 'أحد أكبر المفاهيم الخاطئة عن التعلم عبر الإنترنت هو أن الطالب يجب أن يكتشف كل شيء بنفسه. في الأكاديمية، لست وحدك أبداً.'
              : 'A big misconception about online learning is that you must figure everything out alone. At BBA, you are never alone.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { t: isAr ? 'مراقبة التقدم' : 'Monitoring progress', icon: Target },
            { t: isAr ? 'تقديم التوجيه' : 'Providing guidance', icon: BookOpen },
            { t: isAr ? 'الإجابة على الأسئلة' : 'Answering questions', icon: MessageSquare },
            { t: isAr ? 'المساعدة في الالتزام' : 'Helping stay on pace', icon: Clock },
            { t: isAr ? 'الشراكة مع الأسرة' : 'Partnering with families', icon: Users }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
               <div className="h-12 w-12 rounded-xl bg-slate-50 text-secondary flex items-center justify-center shrink-0 border border-slate-100">
                  <item.icon className="h-6 w-6" />
               </div>
               <span className="font-black text-primary text-sm">{item.t}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-100 p-8 rounded-[2.5rem] space-y-8 border border-slate-200">
          <div className="text-center space-y-2">
            <h4 className="text-xl font-black text-primary uppercase tracking-tight">{isAr ? 'نحن هنا لدعمك' : 'We\'re Here to Support You'}</h4>
            <p className="text-sm text-slate-500 font-bold">{isAr ? 'لا تتردد في التواصل معنا' : 'Don\'t hesitate to contact us'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center shrink-0 border border-slate-100">
                 <Mail className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email</div>
                <div className="text-xs font-black text-primary truncate">banaatacademy@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center shrink-0 border border-slate-100">
                 <Phone className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone</div>
                <div className="text-xs font-black text-primary">(313) 455-0322</div>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-bold">
              {isAr ? 'وقت الاستجابة: نسعى للرد على جميع الاستفسارات في أسرع وقت ممكن خلال ساعات العمل العادية.' : 'Response Time: We strive to respond as quickly as possible during regular business hours.'}
            </p>
            <p className="text-sm font-black text-primary leading-relaxed">
              "{isAr ? 'النجاح لا يقاس بمدى سرعة انتهائك؛ إنه يُبنى من خلال الجهد المستمر والفضول والمثابرة' : 'Success isn’t measured by how quickly you finish; it’s built through consistent effort, curiosity, and perseverance'}"
            </p>
          </div>
        </div>
      </div>
    )
  }
];

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const sections = getGuideSections(isAr);
  const [openSection, setOpenSection] = useState<string | undefined>(undefined);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Dynamic Glow Header Section */}
      <section className="bg-primary pt-28 pb-24 relative overflow-hidden">
        <div className="absolute inset-0">
           {/* Geometric Pattern Overlay */}
           <svg className="absolute inset-0 h-full w-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="guide-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <circle cx="2" cy="2" r="1" fill="white" />
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#guide-grid)" />
           </svg>
           
           {/* Sophisticated Glow Layers */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/15 blur-[140px] rounded-full animate-pulse" />
           <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
           <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary to-transparent" />
        </div>
        
        <div className="container-tight relative z-10 text-center space-y-8 px-4">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]">
              {isAr ? 'دليل طالب BBA' : 'BBA Student Guide'}
            </h1>
            <div className="h-1.5 w-32 bg-secondary mx-auto rounded-full shadow-[0_0_20px_rgba(var(--secondary),0.5)]" />
          </div>
          <p className="text-base sm:text-2xl text-white/80 font-bold max-w-3xl mx-auto leading-relaxed italic">
            {isAr 
              ? 'كل ما يحتاجه الطلاب وأولياء الأمور لمعرفته من أجل عام دراسي ناجح ومليء بالإنجازات.' 
              : 'Everything Students & Parents Need to Know for a Successful and Productive School Year.'}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-12 relative z-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Welcome Intro Card */}
          <div className="bg-white p-8 sm:p-12 rounded-[2rem] border border-slate-100 shadow-2xl space-y-8">
            <div className="space-y-6 text-slate-600 font-bold leading-relaxed text-sm sm:text-lg">
               <p className="text-primary font-black text-xl sm:text-2xl leading-tight border-l-4 border-secondary pl-6">
                 {isAr ? 'أهلاً بكم في دليل الطالب، نحن متحمسون لانضمامكم إلينا!' : 'Welcome to the BBA Student Guide. We are excited to have you join us!'}
               </p>
               <p>{isAr ? 'سواء كنت طالباً جديداً أو ولي أمر، فقد تم تصميم هذا الدليل لمساعدتك على فهم كيفية عمل البرنامج، وما هو متوقع منك، وكيفية البقاء على المسار الصحيح.' : 'Whether you are a new student or a parent, this guide is designed to help you understand how the program works, what is expected, and how to stay on track.'}</p>
               <p>{isAr ? 'النجاح في الأكاديمية يعتمد على الالتزام واتباع خطة الطالب والتواصل المستمر مع مرشدك.' : 'Success at BBA depends on commitment, following your Student Plan, and communicating with your mentor.'}</p>
               <p>{isAr ? 'نشجعكم على قراءة هذا الدليل بعناية قبل البدء، والعودة إليه كلما ظهرت أسئلة.' : 'We encourage you to read this guide carefully before beginning and return to it whenever questions arise.'}</p>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            <Accordion 
              type="single" 
              collapsible 
              value={openSection} 
              onValueChange={setOpenSection}
              className="space-y-4"
            >
              {sections.map((section) => (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className="bg-white border border-slate-100 rounded-[1.5rem] px-4 sm:px-8 shadow-sm overflow-hidden transition-all duration-300 data-[state=open]:shadow-xl data-[state=open]:border-secondary/20"
                >
                  <AccordionTrigger className="hover:no-underline py-8 group">
                    <div className="flex items-center gap-6 text-start">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-slate-50 text-primary flex items-center justify-center shrink-0 shadow-inner group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all duration-500">
                        <section.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black text-primary leading-tight group-hover:text-secondary transition-colors">
                        {section.title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-10 border-t border-slate-50 pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                     {section.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Encouragement Footer */}
          <div className="bg-primary text-white p-10 sm:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden text-center space-y-10 border-b-8 border-secondary">
             <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                <div className="flex justify-center">
                   <div className="h-20 w-20 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20 shadow-inner">
                      <Trophy className="h-10 w-10 text-secondary" />
                   </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                    {isAr ? 'نحن معك في كل خطوة' : 'With You Every Step'}
                  </h2>
                  <p className="text-sm sm:text-xl opacity-80 font-bold leading-relaxed italic max-w-lg mx-auto">
                     {isAr ? 'كل درس تكتمله وكل مهمة تنهيها تقربك خطوة واحدة من أهدافك الكبيرة.' : 'Every lesson completed and every task finished brings you one step closer to your big goals.'}
                  </p>
                </div>
                
                <div className="pt-6 flex justify-center">
                  <Button asChild className="bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-xl px-6 h-12 text-xs sm:text-sm transition-all shadow-lg active:scale-95">
                    <Link href={`/${lang}/contact`}>
                      {isAr ? 'تواصل معنا' : 'Contact us'}
                    </Link>
                  </Button>
                </div>
                
                <div className="pt-4 text-xs font-black uppercase tracking-[0.3em] opacity-40">
                   {isAr ? 'نتمنى لكم عاماً دراسياً مذهلاً' : 'Wishing you an amazing school year'}
                </div>
             </div>
             {/* Large background decorative icon */}
             <div className="absolute -bottom-16 -right-16 opacity-5 rotate-12">
                <Users className="h-64 w-64 sm:h-96 sm:w-96" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
