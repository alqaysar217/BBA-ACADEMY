'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  Rocket, 
  BookOpen, 
  Trophy,
  GraduationCap,
  Laptop,
  ArrowRight,
  ArrowLeft,
  Zap,
  CheckCircle2,
  Users,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

export default function StudentGuidePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="container-tight relative z-10 text-center space-y-6 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
              {isAr ? 'دليل طالب BBA' : 'BBA Student Guide'}
            </h1>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full" />
          </div>
          <p className="text-xs sm:text-lg text-white/80 font-bold max-w-3xl mx-auto leading-relaxed">
            {isAr 
              ? 'كل ما يحتاجه الطلاب وأولياء الأمور لضمان عام دراسي متميز ونتائج أكاديمية قوية.' 
              : 'Everything Students & Parents Need to Know for a Successful School Year.'}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-10 relative z-20 px-4">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* Welcome Message */}
          <section className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-100 shadow-premium space-y-6">
             <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase">{isAr ? 'مرحباً بكم في BBA' : 'Welcome to BBA'}</h2>
             <div className="space-y-4 text-slate-600 font-medium text-sm sm:text-lg leading-relaxed">
                <p>
                   {isAr 
                     ? 'نحن متحمسون لانضمامكم لمجتمعنا التعليمي. كأكاديمية تعتمد على التعلم الذاتي، يمتلك الطلاب المرونة للتعلم من أي مكان وبوتيرة تناسب جداولهم.' 
                     : 'We are excited to have you join our learning community. Success at BBA depends on staying consistent, following your Student Plan, and communicating with your mentor.'}
                </p>
                <div className="bg-secondary/5 p-6 rounded-xl border-l-4 border-secondary italic font-bold text-primary">
                   {isAr 
                     ? 'النجاح يعتمد على الالتزام، اتباع خطة الطالب، والتواصل المستمر مع المرشد.' 
                     : 'Importance of consistency, responsibility, and communication.'}
                </div>
             </div>
          </section>

          {/* Getting Started - 5 Steps */}
          <section className="space-y-10">
            <div className="text-center space-y-2">
               <h2 className="text-2xl font-black text-primary uppercase tracking-tight">{isAr ? 'خطوات البدء في الأكاديمية' : 'Getting Started at BBA'}</h2>
               <p className="text-slate-500 font-bold">{isAr ? 'خمس خطوات بسيطة لتبدأ رحلتك' : 'Follow these five steps to begin your journey'}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
               {[
                 { id: 1, t: isAr ? 'تفقد بريدك الترحيبي' : 'Check Your Welcome Email', c: isAr ? 'يحتوي على بيانات دخول Edgenuity وخطتك الدراسية واسم مرشدك.' : 'Contains Edgenuity login, personalized Student Plan, and mentor info.' },
                 { id: 2, t: isAr ? 'سجل دخولك للمنصة' : 'Log Into Your Edgenuity Account', c: isAr ? 'Edgenuity هي المنصة التي ستنجز فيها كافة دروسك ومهامك الدراسية.' : 'The platform where you will complete all lessons, assignments, and exams.' },
                 { id: 3, t: isAr ? 'راجع خطة الطالب' : 'Review Your Student Plan', c: isAr ? 'خارطة الطريق الخاصة بك لإنهاء 10 دورات خلال العام الدراسي (دورة شهرياً).' : 'Your roadmap for the year. Most students complete 10 courses annually.' },
                 { id: 4, t: isAr ? 'تعرف على مرشدك' : 'Meet Your Mentor', c: isAr ? 'مرشدك هو جهة اتصالك الأولى للإجابة على الأسئلة ومراقبة تقدمك.' : 'Your first point of contact for guidance and progress monitoring.' },
                 { id: 5, t: isAr ? 'ابدأ دورتك الأولى' : 'Start Your First Course', c: isAr ? 'ابدأ العمل بانتظام كل يوم من أيام الأسبوع لبناء عادات دراسية جيدة.' : 'Work each weekday consistently to stay on schedule and build good habits.' }
               ].map((step) => (
                 <div key={step.id} className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all group">
                    <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xl shrink-0 group-hover:scale-110 transition-transform">{step.id}</div>
                    <div className="space-y-2">
                       <h3 className="font-black text-primary text-lg">{step.t}</h3>
                       <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.c}</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* How it Works */}
          <section className="bg-slate-50 p-8 sm:p-12 rounded-2xl space-y-8">
             <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase text-center">{isAr ? 'كيف يعمل برنامج BBA؟' : 'How the BBA Program Works'}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { t: isAr ? 'خطة طالب مخصصة' : 'Personalized Student Plans', d: isAr ? 'خارطة طريق واضحة لكل طالب.' : 'A clear roadmap tailored to each student.' },
                  { t: isAr ? 'جدول تعلم مرن' : 'Flexible learning schedules', d: isAr ? 'تعلم في الوقت الذي يناسب عائلتك.' : 'Learn at the times that fit your family.' },
                  { t: isAr ? 'التقدم اليومي المستمر' : 'Regular weekday progress', d: isAr ? 'هدفنا إنجاز 5-7% من المنهج يومياً.' : 'Target 5–7% progress each weekday.' },
                  { t: isAr ? 'دعم المرشد' : 'Mentor support', d: isAr ? 'مراقبة أكاديمية وتوجيه دائم.' : 'Academic monitoring and guidance.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                     <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                     <div className="space-y-1">
                        <p className="font-black text-primary">{item.t}</p>
                        <p className="text-sm text-slate-500 font-bold">{item.d}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Student Agreement */}
          <section className="space-y-10">
             <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase text-center">{isAr ? 'اتفاقية طالب BBA' : 'The BBA Student Agreement'}</h2>
             <div className="grid grid-cols-1 gap-8">
                <Card className="border-slate-100 rounded-2xl">
                   <CardHeader className="bg-primary text-white rounded-t-2xl"><CardTitle className="text-lg font-black">{isAr ? 'ماذا يتوقع الطالب من الأكاديمية' : 'What You Can Expect From BBA'}</CardTitle></CardHeader>
                   <CardContent className="p-6 space-y-3 font-medium text-slate-600 text-sm">
                      <p>✓ {isAr ? 'خطة دراسية مخصصة وواضحة.' : 'Provide a personalized Student Plan.'}</p>
                      <p>✓ {isAr ? 'مرشد مخصص للتوجيه والتشجيع.' : 'Assign a dedicated mentor to support you.'}</p>
                      <p>✓ {isAr ? 'مراقبة التقدم والتواصل المهني.' : 'Monitor progress and treat families with respect.'}</p>
                   </CardContent>
                </Card>
                <Card className="border-slate-100 rounded-2xl">
                   <CardHeader className="bg-secondary text-white rounded-t-2xl"><CardTitle className="text-lg font-black">{isAr ? 'ماذا تتوقع الأكاديمية من الطالب' : 'What BBA Expects From Students'}</CardTitle></CardHeader>
                   <CardContent className="p-6 space-y-3 font-medium text-slate-600 text-sm">
                      <p>✓ {isAr ? 'تسجيل الدخول وإحراز تقدم يومي (5-7%).' : 'Log in regularly and make consistent progress.'}</p>
                      <p>✓ {isAr ? 'الرد على رسائل المرشد عند الضرورة.' : 'Respond to messages from the mentor.'}</p>
                      <p>✓ {isAr ? 'إتمام المهام بنزاهة واعتماداً على الجهد الشخصي.' : 'Complete assignments honestly using your own work.'}</p>
                   </CardContent>
                </Card>
                <Card className="border-slate-100 rounded-2xl">
                   <CardHeader className="bg-slate-900 text-white rounded-t-2xl"><CardTitle className="text-lg font-black">{isAr ? 'ماذا تتوقع الأكاديمية من أولياء الأمور' : 'What BBA Expects From Parents'}</CardTitle></CardHeader>
                   <CardContent className="p-6 space-y-3 font-medium text-slate-600 text-sm">
                      <p>✓ {isAr ? 'تشجيع الطفل على الحفاظ على روتين تعليمي.' : 'Encourage a consistent learning routine.'}</p>
                      <p>✓ {isAr ? 'البقاء على تواصل مع المرشد وإدارة الأكاديمية.' : 'Stay in communication with mentors.'}</p>
                      <p>✓ {isAr ? 'مراقبة التقدم ودعم تحفيز الطفل.' : 'Monitor progress and support motivation.'}</p>
                   </CardContent>
                </Card>
             </div>
          </section>

          {/* Understanding Your Courses */}
          <section className="space-y-8">
             <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase border-b-4 border-secondary pb-2 inline-block">{isAr ? 'فهم الدورات الدراسية' : 'Understanding Your Courses'}</h2>
             <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  { q: isAr ? 'كم عدد الدورات التي سأكملها؟' : 'How many courses will I complete?', a: isAr ? 'يتم تعيين 10 دورات لمعظم الطلاب لإكمالها من سبتمبر حتى يونيو.' : 'Most students are assigned 10 courses between September and June.' },
                  { q: isAr ? 'هل يمكنني العمل على أكثر من دورة في وقت واحد؟' : 'Can I work on more than one course at a time?', a: isAr ? 'في الغالب لا، يركز الطلاب على دورة واحدة في كل مرة لضمان الإتقان.' : 'In most cases, no. Students focus on one course at a time.' },
                  { q: isAr ? 'هل يمكنني إعادة الاختبارات أو المهام؟' : 'Can I redo assignments or exams?', a: isAr ? 'نعم، إذا كانت الدرجة أقل من درجة النجاح أو لتحسين الأداء (فرص الإعادة محدودة).' : 'Yes, if the grade is below passing (limited retake opportunities).' },
                  { q: isAr ? 'كم تستغرق كل دورة دراسية؟' : 'How long does each course take?', a: isAr ? 'عادة من 3 إلى 4 أسابيع عند الحفاظ على تقدم يومي بنسبة 5-7%.' : '3–4 weeks when maintaining 5–7% daily progress.' }
                ].map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="bg-white border rounded-xl px-6">
                    <AccordionTrigger className="font-black text-primary text-sm sm:text-lg">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-slate-600 font-bold">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
             </Accordion>
          </section>

          {/* Support and Contact */}
          <section className="bg-slate-900 text-white p-10 sm:p-16 rounded-2xl shadow-2xl relative overflow-hidden group border-b-8 border-secondary">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Users className="h-48 w-48" /></div>
             <div className="relative z-10 space-y-8">
                <h2 className="text-2xl sm:text-4xl font-black uppercase">{isAr ? 'الدعم الأكاديمي والتواصل' : 'Academic Support and Contact'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-secondary" /><span className="font-black">{isAr ? 'المرشد الأكاديمي' : 'Assigned Mentor'}</span></div>
                      <p className="text-sm opacity-80">{isAr ? 'مرشدك يراقب تقدمك أسبوعياً وهو هنا لمساعدتك عند مواجهة أي صعوبات.' : 'Your mentor monitors progress weekly and is here to help.'}</p>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center gap-3"><Mail className="h-6 w-6 text-secondary" /><span className="font-black">{isAr ? 'معلومات التواصل' : 'Contact Information'}</span></div>
                      <p className="text-sm opacity-80">Email: banaatacademy@gmail.com</p>
                      <p className="text-sm opacity-80">Phone: (313) 455-0322</p>
                   </div>
                </div>
                <div className="pt-10 text-center border-t border-white/10">
                   <p className="text-xl sm:text-2xl font-black italic text-secondary">
                      {isAr ? '"كل درس تنهيه يقربك خطوة من أهدافك. أنت قادر على ذلك!"' : '"Every finished assignment brings you one step closer to your goals. You\'ve got this!"'}
                   </p>
                </div>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}