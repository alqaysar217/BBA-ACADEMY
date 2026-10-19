import { type Locale } from '@/lib/i18n/config';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Mail, 
  Phone, 
  PlayCircle, 
  BookOpen, 
  UserCheck, 
  Clock, 
  Rocket, 
  ClipboardCheck, 
  Users, 
  Heart,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Monitor,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const t = {
    title: isAr ? 'دليل طالب BBA' : 'BBA Student Guide',
    welcome: isAr 
      ? 'كل ما يحتاجه الطلاب وأولياء الأمور لمعرفته من أجل عام دراسي ناجح'
      : 'Everything Students & Parents Need to Know for a Successful School Year',
    intro: isAr
      ? 'مرحباً بكم في دليل طالب BBA. نحن متحمسون لانضمامكم إلى مجتمعنا التعليمي ونتطلع إلى دعمكم طوال رحلتكم التعليمية. بما أن BBA هي مدرسة عبر الإنترنت وبوتيرة ذاتية، يتمتع الطلاب بالمرونة للتعلم من أي مكان مع التقدم بوتيرة تناسب جدولهم الزمني. ومع ذلك، فإن هذه المرونة تأتي مع المسؤولية.'
      : 'Welcome to the BBA Student Guide. We are excited to have you join our learning community and look forward to supporting you throughout your educational journey. Because BBA is an online, self-paced school, students have the flexibility to learn from anywhere while progressing at a pace that fits their schedule. However, with that flexibility comes responsibility.',
    
    gettingStartedTitle: isAr ? '🚀 البدء في BBA' : '🚀 Getting Started at BBA',
    gettingStartedSteps: [
      {
        id: 1,
        title: isAr ? 'تحقق من بريدك الإلكتروني الترحيبي' : 'Check Your Welcome Email',
        desc: isAr 
          ? 'يحتوي بريدك الإلكتروني الترحيبي على كل ما تحتاجه للبدء، بما في ذلك معلومات تسجيل الدخول إلى Edgenuity، وخطة الطالب الشخصية، ومعلومات التواصل مع مرشدك.'
          : 'Your Welcome Email contains everything you need to get started, including your Edgenuity login information, your personalized Student Plan, and your assigned mentor information.',
        icon: Mail
      },
      {
        id: 2,
        title: isAr ? 'سجل الدخول إلى حساب Edgenuity' : 'Log Into Your Edgenuity Account',
        desc: isAr 
          ? 'Edgenuity هي منصة التعلم عبر الإنترنت حيث ستكمل جميع دروسك ومهامك واختباراتك. هذا هو المكان الذي ستقضي فيه معظم وقتك.'
          : 'Edgenuity is the online learning platform where you will complete all of your lessons, assignments, quizzes, and exams. This is where you will spend most of your time.',
        icon: Monitor
      },
      {
        id: 3,
        title: isAr ? 'راجع خطة الطالب الخاصة بك' : 'Review Your Student Plan',
        desc: isAr 
          ? 'يتلقى كل طالب خطة طالب توضح الدورات التدريبية المتوقع إكمالها. في المتوسط، يتوقع من الطلاب إكمال 10 دورات بين سبتمبر ويونيو.'
          : 'Every student receives a Student Plan outlining the courses they are expected to complete. On average, students complete 10 courses between September and June.',
        icon: ClipboardCheck
      },
      {
        id: 4,
        title: isAr ? 'قابل مرشدك الأكاديمي' : 'Meet Your Mentor',
        desc: isAr 
          ? 'يتم تعيين مرشد لكل طالب للإجابة على الأسئلة وتقديم التوجيه ومراقبة التقدم. مرشدك هو نقطة الاتصال الأولى لأي مساعدة.'
          : 'Every student is assigned a mentor to answer questions, provide guidance, and monitor progress. Your mentor is your first point of contact for any assistance.',
        icon: UserCheck
      },
      {
        id: 5,
        title: isAr ? 'ابدأ دورتك الأولى' : 'Start Your First Course',
        desc: isAr 
          ? 'ابدأ بدورتك الأولى المحددة واعمل في كل يوم عمل باستمرار. الطلاب الذين يحققون تقدماً صغيراً يومياً هم الأكثر نجاحاً.'
          : 'Start with your first assigned course and work each weekday consistently. Students who make a little progress every weekday are far more successful.',
        icon: Rocket
      }
    ],

    howItWorksTitle: isAr ? '🏫 كيف يعمل برنامج BBA' : '🏫 How the BBA Program Works',
    howItWorksDesc: isAr 
      ? 'BBA تختلف عن المدرسة التقليدية. بدلاً من حضور حصص حية يومياً، يكمل الطلاب دوراتهم عبر منصة Edgenuity مع تلقي التوجيه من فريقنا.'
      : 'BBA is different from a traditional school. Instead of attending live classes every day, students complete their coursework through Edgenuity while receiving guidance from our team.',
    workingPoints: [
      { t: isAr ? 'اتبع خطة الطالب الخاصة بك' : 'Follow Your Student Plan', d: isAr ? 'خارطة الطريق الخاصة بك للنجاح.' : 'Your roadmap to success.' },
      { t: isAr ? 'تعلم بالسرعة التي تناسبك' : 'Learn At Your Own Pace', d: isAr ? 'لا توجد ساعات فصل محددة، لكن يتوقع إنجاز 5-7% يومياً.' : 'No required class hours, but 5–7% daily progress is expected.' },
      { t: isAr ? 'مرشدك هنا للمساعدة' : 'Your Mentor Is Here to Help', d: isAr ? 'دعم مخصص للإجابة على الأسئلة وحل المشكلات.' : 'Dedicated support to answer questions and solve challenges.' },
      { t: isAr ? 'التقدم هو الأهم' : 'Progress Is What Matters', d: isAr ? 'النجاح يُقاس بالتقدم الأكاديمي الثابت لا بساعات الحضور.' : 'Success is measured by steady academic progress, not hours in a seat.' }
    ],

    successFormulaTitle: isAr ? '🏆 معادلة نجاح BBA' : '🏆 The BBA Success Formula',
    formulaSteps: [
      { text: isAr ? 'سجل الدخول كل يوم عمل' : 'Log in every weekday', icon: Monitor },
      { text: isAr ? 'أكمل 5-7٪ يومياً' : 'Complete 5–7% daily', icon: Clock },
      { text: isAr ? 'أنهِ دورة واحدة كل شهر' : 'Finish 1 course each month', icon: BookOpen },
      { text: isAr ? 'أكمل جميع الدورات الـ 10' : 'Complete all 10 courses', icon: GraduationCap }
    ],

    agreementTitle: isAr ? '🤝 اتفاقية طلاب BBA' : '🤝 The BBA Student Agreement',
    agreementSections: [
      {
        title: isAr ? 'ماذا تتوقع من BBA' : 'What You Can Expect From BBA',
        items: [
          isAr ? 'تقديم خطة طالب مخصصة.' : 'Provide a personalized Student Plan.',
          isAr ? 'تعيين مرشد مخصص لدعمك.' : 'Assign a dedicated mentor to support you.',
          isAr ? 'مراقبة التقدم والتواصل عند وجود قلق.' : 'Monitor progress and reach out if concerned.',
          isAr ? 'الرد على استفساراتكم خلال ساعات العمل.' : 'Respond to questions during office hours.'
        ]
      },
      {
        title: isAr ? 'ماذا تتوقع BBA من الطلاب' : 'What BBA Expects From Students',
        items: [
          isAr ? 'تسجيل الدخول بانتظام (5-7% يومياً).' : 'Log in regularly (5–7% daily progress).',
          isAr ? 'اتباع خطة الطالب الموصى بها.' : 'Follow the recommended Student Plan.',
          isAr ? 'الرد على رسائل المرشد الأكاديمي.' : 'Read and respond to mentor messages.',
          isAr ? 'التواصل عند الحاجة للمساعدة.' : 'Reach out for help when needed.'
        ]
      }
    ],

    faqTitle: isAr ? '📚 فهم دوراتك التدريبية (الأسئلة الشائعة)' : '📚 Understanding Your Courses (FAQs)',
    faqs: [
      { 
        q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', 
        a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب لإكمالها من سبتمبر إلى يونيو كما هو موضح في خطتك.' : 'Most students are assigned 10 courses to complete from September through June as listed in your plan.' 
      },
      { 
        q: isAr ? 'هل يمكنني العمل في أكثر من دورة؟' : 'Can I work on more than one course at a time?', 
        a: isAr ? 'في معظم الحالات، لا. يركز الطلاب على دورة واحدة في كل مرة لضمان الإتقان.' : 'In most cases, NO. Students focus on one course at a time to ensure mastery.' 
      },
      { 
        q: isAr ? 'كم من الوقت يجب أن تستغرق كل دورة؟' : 'How long should each course take?', 
        a: isAr ? 'عادة من 3-4 أسابيع عند الحفاظ على تقدم يومي بنسبة 5-7٪.' : 'Typically 3–4 weeks when maintaining 5–7% daily progress.' 
      },
      { 
        q: isAr ? 'هل يمكنني التقدم في العمل؟' : 'Can I work ahead?', 
        a: isAr ? 'نعم، ولكن عادة ما يقتصر الأمر على دورتين كحد أقصى في الشهر الواحد.' : 'Yes, but generally limited to no more than two courses within a single month.' 
      }
    ],

    contactSupportTitle: isAr ? '📩 هل تحتاج للمساعدة؟ نحن هنا!' : '📩 Need Help? We\'re Here!',
    contactInfo: [
      { label: isAr ? 'البريد الإلكتروني' : 'Email', value: 'banaatacademy@gmail.com', icon: Mail },
      { label: isAr ? 'الهاتف' : 'Phone', value: '(313) 455-0322', icon: Phone }
    ],
    closingQuote: isAr 
      ? 'النجاح لا يُقاس بالسرعة، بل بالجهد المستمر والفضول والمثابرة في كل خطوة.'
      : 'Success isn’t measured by how quickly you finish; it’s built through consistent effort, curiosity, and perseverance.'
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="guide-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#guide-pattern)" />
          </svg>
        </div>
        <div className="container-tight relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/20 rounded-full text-secondary font-black text-xs uppercase tracking-[0.2em] animate-pulse">
            <Star className="h-4 w-4" />
            {isAr ? 'دليل شامل' : 'Comprehensive Guide'}
          </div>
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-xl lg:text-2xl font-bold text-secondary max-w-3xl mx-auto italic">
            "{t.welcome}"
          </p>
          <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="container-tight">
          <div className="max-w-4xl mx-auto bg-white p-10 lg:p-16 rounded-[3rem] shadow-xl border border-slate-100 text-center space-y-8">
            <GraduationCap className="h-16 w-16 text-primary mx-auto" />
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium italic">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-24">
        <div className="container-tight">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-black text-primary uppercase tracking-tight">{t.gettingStartedTitle}</h2>
            <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.gettingStartedSteps.map((step) => (
              <Card key={step.id} className="premium-card rounded-[2.5rem] border-none shadow-lg overflow-hidden flex flex-col h-full">
                <CardHeader className="bg-slate-50 p-8 border-b border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-secondary" />
                    </div>
                    <span className="text-4xl font-black text-slate-100">0{step.id}</span>
                  </div>
                  <CardTitle className="text-xl font-black text-primary leading-tight">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 flex-1">
                  <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Flow & Success Formula */}
      <section className="py-24 bg-primary text-white rounded-[4rem] mx-4 lg:mx-12 overflow-hidden relative shadow-2xl shadow-primary/30">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Monitor className="h-64 w-64" />
        </div>
        <div className="container-tight relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight">{t.howItWorksTitle}</h2>
              <p className="text-lg text-white/70 font-medium leading-relaxed">{t.howItWorksDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {t.workingPoints.map((point, idx) => (
                  <div key={idx} className="space-y-2 group">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary group-hover:scale-150 transition-transform" />
                      <h4 className="font-black text-white">{point.t}</h4>
                    </div>
                    <p className="text-sm text-white/50 font-medium pl-5">{point.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-10 lg:p-12 rounded-[3rem] border border-white/10 space-y-10">
              <h3 className="text-2xl font-black text-secondary text-center uppercase tracking-widest">{t.successFormulaTitle}</h3>
              <div className="space-y-6">
                {t.formulaSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="h-12 w-12 rounded-full border-2 border-secondary/30 flex items-center justify-center shrink-0 font-black text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                      {idx + 1}
                    </div>
                    <div className="flex items-center gap-4">
                      <step.icon className="h-5 w-5 text-white/40" />
                      <span className="text-lg font-bold text-white/90">{step.text}</span>
                    </div>
                    {idx < t.formulaSteps.length - 1 && (
                      <div className="flex-1 border-b border-dashed border-white/10 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agreement Section */}
      <section className="py-32">
        <div className="container-tight">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-black text-primary uppercase tracking-tight">{t.agreementTitle}</h2>
            <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.agreementSections.map((section, idx) => (
              <div key={idx} className="bg-slate-50 p-10 lg:p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                    {idx === 0 ? <Users className="h-6 w-6" /> : <Heart className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-primary">{section.title}</h3>
                </div>
                <ul className="space-y-4">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 group hover:border-secondary transition-all">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="font-bold text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-slate-50">
        <div className="container-tight max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-primary uppercase tracking-tight">{t.faqTitle}</h2>
            <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full" />
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {t.faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white border-none rounded-3xl px-8 py-2 shadow-sm">
                <AccordionTrigger className="text-lg font-black text-primary hover:no-underline hover:text-secondary text-start">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 font-medium text-base leading-relaxed pt-2 pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Support & Closing */}
      <section className="py-32">
        <div className="container-tight">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-5xl font-black text-primary leading-tight">{t.contactSupportTitle}</h2>
                <p className="text-xl font-bold text-slate-500 italic">"{t.closingQuote}"</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:border-secondary transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{info.label}</div>
                      <div className="text-primary font-black">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="bg-primary hover:bg-accent rounded-full h-16 px-12 font-black text-lg shadow-xl shadow-primary/20">
                <Link href={`/${lang}/contact`}>
                  {isAr ? 'تواصل مع فريق الدعم' : 'Contact Support Team'}
                  {isAr ? <ChevronLeft className="mr-3 h-5 w-5" /> : <ChevronRight className="ml-3 h-5 w-5" />}
                </Link>
              </Button>
            </div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-slate-50">
              <Image 
                src="https://picsum.photos/seed/bba-guide/800/1000" 
                alt="Student studying" 
                fill 
                className="object-cover"
                data-ai-hint="student online study"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from 'next/image';
import { Star } from 'lucide-react';
