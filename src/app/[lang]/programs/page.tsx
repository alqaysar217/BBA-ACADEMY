
'use client';

import { useState, use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, GraduationCap, Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft, Info, Check } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProgramsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const t = {
    title: isAr ? 'برامجنا التعليمية' : 'Educational Programs',
    subtitle: isAr ? 'من القرآن والعربية إلى الأكاديميين باللغة الإنجليزية، توفر برامجنا تجربة تعليمية شاملة ومرنة وداعمة لكل طالب.' : 'From Quran and Arabic to English academics, our programs provide a holistic, flexible, and supportive learning experience for every student.',
    enrollNow: isAr ? 'ابدأ التسجيل الآن' : 'Start Enrollment Now',
    apply: isAr ? 'سجل في البرنامج' : 'Apply for Program',
    details: isAr ? 'تفاصيل البرنامج' : 'Program Details',
    outcomes: isAr ? 'مخرجات التعلم المتوقعة' : 'Expected Learning Outcomes',
    requirements: isAr ? 'متطلبات الطلاب' : 'Student Requirements',
    programs: [
      {
        id: 'grades-3-5',
        title: isAr ? 'برنامج المرحلة الابتدائية (3-5)' : 'Grade 3-5 Remote Program',
        desc: isAr ? 'تجربة تعليمية متوازنة عبر الإنترنت تعزز الأسس الأكاديمية وتبني المهارات اللغوية وتغذي الهوية الإسلامية.' : 'A balanced and engaging online learning experience that strengthens academic foundations, builds language skills, and nurtures a strong Islamic identity.',
        icon: BookOpen,
        schedule: isAr ? 'الإثنين - الخميس' : 'Monday–Thursday',
        subjects: isAr ? 'الإنجليزية، الرياضيات، القرآن، العربية والدراسات الإسلامية' : 'English, Mathematics, Quran, Arabic & Islamic Studies',
        image: "https://picsum.photos/seed/grade35/800/600",
        color: 'bg-primary',
        fullDetails: {
          intro: isAr ? 'يوفر برنامجنا للصفوف 3-5 تجربة تعليمية متوازنة وجذابة عبر الإنترنت تعزز الأسس الأكاديمية وتبني المهارات اللغوية وتغذي الهوية الإسلامية القوية. يتبع الطلاب جدولاً منظماً يجمع بين المواد الأكاديمية الأمريكية والقرآن والعربية والدراسات الإسلامية.' : 'Our Grades 3–5 program provides a balanced and engaging online learning experience that strengthens academic foundations, builds language skills, and nurtures a strong Islamic identity. Students follow a structured schedule that combines American academic subjects with Quran, Arabic, and Islamic Studies.',
          outcomes: [
            isAr ? 'مهارات قوية في القراءة والكتابة باللغة العربية' : 'Stronger Arabic reading and writing skills',
            isAr ? 'تلاوة وحفظ القرآن الكريم مع التجويد السليم' : 'Improved Quran recitation and memorization with proper Tajweed',
            isAr ? 'فهم عميق للمفاهيم الإسلامية الأساسية والقيم' : 'A meaningful understanding of core Islamic concepts and values',
            isAr ? 'جاهزية أكاديمية متوافقة مع المعايير الأمريكية' : 'Academic readiness aligned with American academic standards',
            isAr ? 'هوية واثقة متجذرة في اللغة والثقافة والدين' : 'A confident identity rooted in language, culture, and faith'
          ],
          features: [
            isAr ? 'روتين تعليمي أسبوعي منظم' : 'A structured weekly learning routine',
            isAr ? 'تعليم مباشر عبر الإنترنت من المنزل' : 'Live online instruction from home',
            isAr ? 'تطوير مهارات اللغة العربية' : 'Arabic language development',
            isAr ? 'مناهج أمريكية معتمدة للغة الإنجليزية والرياضيات' : 'Accredited American curriculum for core subjects'
          ]
        }
      },
      {
        id: 'grades-6-12',
        title: isAr ? 'المرحلة المتوسطة والثانوية (6-12)' : 'Grades 6–12 Remote Program',
        desc: isAr ? 'برنامج مرن مصمم لدعم الطلاب أكاديمياً وتعزيز مهاراتهم في الإنجليزية عبر منصة Edgenuity مع إشراف ومتابعة دقيقة.' : 'A flexible program designed to support students academically, strengthen English skills, and provide a structured environment using Edgenuity.',
        icon: GraduationCap,
        schedule: isAr ? 'مرن مع متابعة وتقدم أسبوعي' : 'Flexible with Weekly Progress Tracking',
        subjects: isAr ? 'الإنجليزية (Edgenuity)، الدراسات الإسلامية، القرآن الكريم' : 'English (Edgenuity), Islamic Studies, Quran',
        image: "https://picsum.photos/seed/grade612/800/600",
        color: 'bg-accent',
        fullDetails: {
          intro: isAr ? 'تم تصميم برنامجنا للمرحلة المتوسطة والثانوية لدعم الطلاب أكاديمياً، وتعزيز مهاراتهم في اللغة الإنجليزية، وتوفير بيئة تعليمية منظمة تساعدهم على البقاء على المسار الصحيح. نستخدم منصة Edgenuity مع مراقبة أسبوعية للتقدم.' : 'Our Middle and High School program for Grades 6–12 is fully online and designed to support students academically, strengthen their English skills, and provide a structured learning environment using the Edgenuity platform with weekly monitoring.',
          outcomes: [
            isAr ? 'إكمال المقررات الدراسية عبر الإنترنت بانتظام' : 'More consistent completion of online coursework',
            isAr ? 'مهارات قوية في التعلم المستقل والتنظيم' : 'Stronger independent learning and organizational skills',
            isAr ? 'تحسين مهارات القراءة والكتابة من خلال الدعم المباشر' : 'Improved reading and writing through coursework and support',
            isAr ? 'وعي أكبر بالمسؤوليات الأكاديمية والتقدم' : 'Greater awareness of academic responsibilities and progress',
            isAr ? 'استمرار تطوير تلاوة القرآن والمعرفة الإسلامية' : 'Continued development of Quran recitation and Islamic knowledge'
          ],
          requirements: [
            isAr ? 'كفاءة أساسية في اللغة الإنجليزية' : 'Basic English proficiency (Reading/Writing)',
            isAr ? 'مهارات حاسوبية أساسية للتعلم عبر الإنترنت' : 'Basic computer skills for online platforms',
            isAr ? 'القدرة على العمل بشكل مستقل مع التوجيه' : 'The ability to work independently with guidance',
            isAr ? 'جهاز كمبيوتر محمول واتصال مستقر بالإنترنت' : 'A laptop or tablet and stable internet connection'
          ]
        }
      },
      {
        id: 'weekend',
        title: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
        desc: isAr ? 'نساعد الأطفال المقيمين في الخارج على تطوير هوية إسلامية واثقة مع تعزيز معرفتهم بالعربية والقرآن.' : 'Helping children abroad develop a confident Islamic identity while strengthening their Arabic and Quranic knowledge.',
        icon: Calendar,
        schedule: isAr ? 'السبت والأحد (فترات متعددة)' : 'Saturday & Sunday (Multiple Slots)',
        subjects: isAr ? 'القرآن، التجويد، اللغة العربية، الدراسات الإسلامية' : 'Quran, Tajweed, Arabic Language, Islamic Studies',
        image: "https://picsum.photos/seed/weekend/800/600",
        color: 'bg-secondary',
        fullDetails: {
          intro: isAr ? 'تم تصميم برنامج عطلة نهاية الأسبوع لمساعدة الأطفال المقيمين في الخارج على تطوير هوية إسلامية واثقة مع تعزيز معرفتهم باللغة العربية والقرآن من خلال دروس تفاعلية مباشرة.' : 'Our Weekend Program is designed to help children living abroad develop a confident Islamic identity while strengthening their Arabic and Quranic knowledge through engaging live online lessons.',
          outcomes: [
            isAr ? 'تلاوة قرآنية دقيقة مع التجويد' : 'More accurate Quranic recitation and Tajweed',
            isAr ? 'تحسين مهارات الكتابة والتواصل بالعربية' : 'Stronger Arabic writing and communication skills',
            isAr ? 'فهم أعمق للعبادات والمعرفة الإسلامية' : 'Greater understanding of Islamic knowledge and practices',
            isAr ? 'شخصية إسلامية واثقة واتصال قوي بالعقيدة' : 'A confident Islamic character and stronger connection to faith'
          ],
          features: [
            isAr ? 'حصص مباشرة تفاعلية عبر الإنترنت' : 'Live online weekend lessons from home',
            isAr ? 'تعليم القواعد والكتابة والمحادثة بالعربية' : 'Arabic grammar, writing, and spoken practice',
            isAr ? 'معلمون ذوو خبرة ودعم شخصي للطلاب' : 'Experienced teachers providing personalized attention',
            isAr ? 'خيارات متعددة للأوقات (8-10، 10-12، 12-2 ظهراً ET)' : 'Session slots: 8-10 AM, 10-12 PM, 12-2 PM (ET)'
          ]
        }
      }
    ]
  };

  const selectedProgData = t.programs.find(p => p.id === selectedProgram);

  return (
    <div className="bg-slate-50/30">
      {/* Header Section */}
      <section className="bg-primary text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="container-tight relative z-10">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-medium">
              {t.subtitle}
            </p>
            <div className="pt-6">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-black h-16 px-10 rounded-2xl shadow-xl shadow-secondary/20 transition-all hover:scale-105">
                <Link href={`/${lang}/enroll`}>{t.enrollNow}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
      </section>

      {/* Programs List */}
      <section className="section-padding">
        <div className="container-tight space-y-20 lg:space-y-32">
          {t.programs.map((prog, idx) => (
            <div key={prog.id} className="group relative">
              <div className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 premium-card rounded-[3rem] overflow-hidden border-none shadow-2xl bg-white",
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              )}>
                {/* Image Section */}
                <div className={cn(
                  "relative h-80 lg:h-auto min-h-[400px] overflow-hidden",
                  idx % 2 === 1 ? 'lg:order-2' : ''
                )}>
                  <Image 
                    src={prog.image} 
                    alt={prog.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    data-ai-hint="student online learning"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
                  <div className="absolute top-8 left-8">
                    <div className={cn("h-16 w-16 flex items-center justify-center rounded-2xl text-white shadow-lg", prog.color)}>
                      <prog.icon className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={cn(
                  "p-10 lg:p-16 space-y-10",
                  idx % 2 === 1 ? 'lg:order-1' : ''
                )}>
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-black text-primary group-hover:text-secondary transition-colors">
                      {prog.title}
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                      {prog.desc}
                    </p>
                  </div>
                  
                  <div className="grid gap-6 border-y border-slate-100 py-10">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{isAr ? 'الجدول الزمني' : 'Schedule'}</div>
                        <div className="text-primary font-bold">{prog.schedule}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{isAr ? 'المواد الدراسية' : 'Key Subjects'}</div>
                        <div className="text-primary font-bold">{prog.subjects}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <Button asChild className="bg-primary hover:bg-accent rounded-full h-14 px-8 font-bold shadow-lg">
                      <Link href={`/${lang}/enroll`}>
                        {t.apply}
                        {isAr ? <ArrowLeft className="mr-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedProgram(prog.id)}
                      className="rounded-full h-14 px-8 text-primary font-bold hover:bg-primary/5"
                    >
                      {t.details}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Program Details Dialog */}
      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-none p-0">
          {selectedProgData && (
            <div className="flex flex-col">
              <div className={cn("p-8 sm:p-12 text-white relative overflow-hidden", selectedProgData.color)}>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <selectedProgData.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-80">{isAr ? 'تفاصيل البرنامج' : 'Program Details'}</div>
                  </div>
                  <DialogTitle className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    {selectedProgData.title}
                  </DialogTitle>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>

              <div className="p-8 sm:p-12 space-y-12">
                <div className="space-y-6">
                  <p className="text-lg font-bold text-primary leading-relaxed italic border-r-4 border-secondary pr-6">
                    {selectedProgData.fullDetails.intro}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-primary flex items-center gap-3">
                      <Check className="h-6 w-6 text-secondary" />
                      {t.outcomes}
                    </h3>
                    <ul className="space-y-4">
                      {selectedProgData.fullDetails.outcomes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div className="h-2 w-2 rounded-full bg-secondary mt-2 shrink-0" />
                          <span className="font-bold text-slate-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-primary flex items-center gap-3">
                      <Info className="h-6 w-6 text-secondary" />
                      {selectedProgData.fullDetails.requirements ? t.requirements : (isAr ? 'مميزات البرنامج' : 'Key Features')}
                    </h3>
                    <ul className="space-y-4">
                      {(selectedProgData.fullDetails.requirements || selectedProgData.fullDetails.features || []).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="font-bold text-slate-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex justify-end">
                   <Button asChild size="lg" className="bg-secondary text-white font-black rounded-full h-14 px-10 shadow-xl shadow-secondary/20 transition-all hover:scale-105">
                     <Link href={`/${lang}/enroll`}>{t.apply}</Link>
                   </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom CTA */}
      <section className="section-padding bg-primary text-white text-center relative overflow-hidden">
        <div className="container-tight relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-black">{isAr ? 'هل أنت مستعد لبدء الرحلة؟' : 'Ready to Start the Journey?'}</h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-medium">
            {isAr ? 'انضم إلى أكاديميتنا اليوم وامنح طفلك التعليم الذي يستحقه.' : 'Join our academy today and give your child the education they deserve.'}
          </p>
          <div className="pt-4">
            <Link href={`/${lang}/enroll`}>
              <Button size="lg" className="bg-secondary hover:bg-white hover:text-secondary rounded-full h-16 px-12 font-black transition-all">
                {isAr ? 'سجل طفلك الآن' : 'Enroll My Student Now'}
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border-8 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border-8 border-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
      </section>
    </div>
  );
}
