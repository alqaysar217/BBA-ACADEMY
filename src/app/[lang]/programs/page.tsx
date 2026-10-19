
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
  DialogDescription,
} from "@/components/ui/dialog";

export default function ProgramsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const t = {
    title: isAr ? 'برامجنا التعليمية' : 'Educational Programs',
    subtitle: isAr ? 'نحن نؤمن بأن التعليم هو حجر الزاوية لبناء شخصية متكاملة. برامجنا مصممة لتلبية احتياجات الطلاب الأكاديمية والروحية واللغوية.' : 'We believe education is more than courses; it\'s about building a strong foundation while supporting families every step of the way.',
    enrollNow: isAr ? 'ابدأ التسجيل الآن' : 'Start Enrollment Now',
    apply: isAr ? 'سجل في البرنامج' : 'Apply for Program',
    details: isAr ? 'تفاصيل البرنامج' : 'Program Details',
    outcomes: isAr ? 'مخرجات البرنامج' : 'Program Outcomes',
    requirements: isAr ? 'المتطلبات' : 'Requirements',
    programs: [
      {
        id: 'grades-3-5',
        title: isAr ? 'برنامج المرحلة الابتدائية (3-5)' : 'Grade 3-5 Remote Program',
        desc: isAr ? 'تجربة تعليمية متوازنة عبر الإنترنت تدمج المناهج الأمريكية المعتمدة مع اللغة العربية والقرآن الكريم.' : 'A balanced and engaging online learning experience following a structured schedule that blends accredited American subjects with Quran & Arabic.',
        icon: BookOpen,
        schedule: isAr ? 'الإثنين - الخميس (صباحاً)' : 'Monday–Thursday (Morning)',
        subjects: isAr ? 'الإنجليزية، الرياضيات، القرآن، العربية والدراسات الإسلامية' : 'English, Math, Quran, Arabic & Islamic Studies',
        image: "https://picsum.photos/seed/grade35/800/600",
        color: 'bg-primary',
        fullDetails: {
          intro: isAr ? 'يوفر برنامجنا للصفوف 3-5 تجربة تعليمية متوازنة وجذابة عبر الإنترنت تعزز الأكاديميين وتبني المهارات اللغوية وتغذي الهوية الإسلامية القوية.' : 'Our Grades 3–5 program provides a balanced and engaging online learning experience that strengthens academics, builds language skills, and nurtures a strong Islamic identity.',
          outcomes: [
            isAr ? 'مهارات قوية في القراءة والكتابة باللغة العربية' : 'Strong Arabic reading and writing skills',
            isAr ? 'تلاوة وحفظ القرآن الكريم بالتجويد' : 'Accurate Quran recitation and memorization with Tajweed',
            isAr ? 'فهم عميق للمفاهيم الإسلامية الأساسية' : 'Meaningful understanding of core Islamic concepts',
            isAr ? 'جاهزية أكاديمية متوافقة مع المعايير الأمريكية' : 'Academic readiness aligned with U.S. standards'
          ],
          features: [
            isAr ? 'حصص مباشرة من الإثنين إلى الخميس' : 'Live classes Monday to Thursday',
            isAr ? 'مناهج أمريكية معتمدة للغة الإنجليزية والرياضيات' : 'Accredited American curricula for English & Math',
            isAr ? 'دروس تفاعلية لبناء الثقة والاتقان' : 'Interactive online lessons that build confidence'
          ]
        }
      },
      {
        id: 'grades-6-12',
        title: isAr ? 'المرحلة المتوسطة والثانوية (6-12)' : '6-12 Remote Program',
        desc: isAr ? 'برنامج مرن وشامل يدعم الطلاب أكاديمياً عبر منصة Edgenuity مع توجيه شخصي ومتابعة مستمرة.' : 'Fully online and built to support students academically, strengthen English skills, and provide a structured environment using the Edgenuity platform.',
        icon: GraduationCap,
        schedule: isAr ? 'مرن مع متابعة أسبوعية' : 'Flexible with Weekly Mentor Progress',
        subjects: isAr ? 'الإنجليزية، المناهج الأساسية، الدراسات الإسلامية والقرآن' : 'English (Edgenuity), Core Academics, Islamic Studies & Qur’an',
        image: "https://picsum.photos/seed/grade612/800/600",
        color: 'bg-accent',
        fullDetails: {
          intro: isAr ? 'تم بناء برنامجنا للمرحلة المتوسطة والثانوية لدعم الطلاب أكاديمياً، وتعزيز مهاراتهم في اللغة الإنجليزية، وتوفير بيئة تعليمية منظمة تساعدهم على البقاء على المسار الصحيح.' : 'Our Middle & High School program is built to support students academically, strengthen their English skills, and provide a structured learning environment that helps them stay on track.',
          outcomes: [
            isAr ? 'تتبع التقدم الأسبوعي والمساءلة' : 'Weekly progress tracking and accountability',
            isAr ? 'دعم أكاديمي 1-على-1 عند الحاجة' : '1-on-1 academic support when needed',
            isAr ? 'التحضير للكلية والمسارات الوظيفية' : 'Preparation for college and career pathways',
            isAr ? 'تعزيز الشخصية من خلال الدراسات الإسلامية' : 'Character building through Islamic studies'
          ],
          requirements: [
            isAr ? 'كفاءة أساسية في اللغة الإنجليزية' : 'Basic English proficiency',
            isAr ? 'مهارات حاسوبية أساسية' : 'Basic computer skills',
            isAr ? 'القدرة على العمل بشكل مستقل' : 'Ability to work independently',
            isAr ? 'اتصال مستقر بالإنترنت' : 'Consistent internet access'
          ]
        }
      },
      {
        id: 'weekend',
        title: isAr ? 'برنامج عطلة نهاية الأسبوع' : 'Weekend Remote Program',
        desc: isAr ? 'مصمم لتعزيز الهوية الإسلامية واللغة العربية للأطفال المقيمين في الخارج بطريقة تفاعلية وممتعة.' : 'Designed to help children develop a confident Islamic identity while strengthening Arabic knowledge through engaging online lessons.',
        icon: Calendar,
        schedule: isAr ? 'السبت والأحد (فترات متعددة)' : 'Saturday & Sunday (Multiple Slots)',
        subjects: isAr ? 'التجويد، قواعد اللغة، العبادة والقيم الإسلامية' : 'Tajweed, Arabic Grammar, Worship & Islamic Values',
        image: "https://picsum.photos/seed/weekend/800/600",
        color: 'bg-secondary',
        fullDetails: {
          intro: isAr ? 'تم تصميم البرنامج المخصص لنهاية الأسبوع لمساعدة الأطفال في الخارج على تطوير هوية إسلامية واثقة مع تعزيز معرفتهم باللغة العربية والقرآن.' : 'The Weekend Program is designed to help children abroad develop a confident Islamic identity while strengthening their Arabic and Quranic knowledge.',
          outcomes: [
            isAr ? 'اتقان تلاوة القرآن بالتجويد' : 'Mastery of Quranic recitation with Tajweed',
            isAr ? 'فصاحة في التحدث باللغة العربية' : 'Fluency and eloquence in Arabic speech',
            isAr ? 'فهم ممارسات العبادة الإسلامية' : 'Understanding Islamic worship and practices',
            isAr ? 'قيم إسلامية قوية لمواجهة التحديات' : 'Strong Islamic values to overcome challenges'
          ],
          features: [
            isAr ? 'حصص مباشرة وتفاعلية من المنزل' : 'Live classes from the comfort of home',
            isAr ? 'معلمون ذوو خبرة وداعمة' : 'Experienced and supportive teachers',
            isAr ? 'بيئة تعليمية مخصصة وفصول صغيرة' : 'Personalized learning with small class sizes'
          ]
        }
      }
    ]
  };

  const selectedProgData = t.programs.find(p => p.id === selectedProgram);

  return (
    <div className="bg-slate-50/30">
      {/* Header Section */}
      <section className="bg-primary text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="container-tight relative z-10">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none underline decoration-secondary decoration-8 underline-offset-[12px]">
              {t.title}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed font-medium">
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
                    data-ai-hint="classroom study"
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
                <DialogHeader className="relative z-10 text-right sm:text-right">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <selectedProgData.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-80">{isAr ? 'تفاصيل البرنامج' : 'Program Details'}</div>
                  </div>
                  <DialogTitle className="text-3xl sm:text-5xl font-black text-white leading-tight">
                    {selectedProgData.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>

              <div className="p-8 sm:p-12 space-y-12">
                <div className="space-y-6">
                  <p className="text-xl font-bold text-primary leading-relaxed italic border-r-4 border-secondary pr-6">
                    {selectedProgData.fullDetails.intro}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black text-primary flex items-center gap-3">
                      <Check className="h-6 w-6 text-secondary" />
                      {t.outcomes}
                    </h3>
                    <ul className="space-y-4">
                      {selectedProgData.fullDetails.outcomes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div className="h-2 w-2 rounded-full bg-secondary mt-2 shrink-0" />
                          <span className="font-bold text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-black text-primary flex items-center gap-3">
                      <Info className="h-6 w-6 text-secondary" />
                      {selectedProgData.fullDetails.requirements ? t.requirements : (isAr ? 'المميزات' : 'Features')}
                    </h3>
                    <ul className="space-y-4">
                      {(selectedProgData.fullDetails.requirements || selectedProgData.fullDetails.features || []).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="font-bold text-slate-700">{item}</span>
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
          <h2 className="text-4xl font-black">{isAr ? 'مستعد لبدء الرحلة؟' : 'Ready to Start the Journey?'}</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
            {isAr ? 'انضم إلى عائلتنا اليوم وامنح طفلك التعليم الذي يستحقه.' : 'Join our academy today and give your child the education they deserve.'}
          </p>
          <div className="pt-4">
            <Link href={`/${lang}/enroll`}>
              <Button size="lg" className="bg-secondary hover:bg-white hover:text-secondary rounded-full h-16 px-12 font-black transition-all">
                {isAr ? 'قدم الآن' : 'Enroll My Student'}
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
