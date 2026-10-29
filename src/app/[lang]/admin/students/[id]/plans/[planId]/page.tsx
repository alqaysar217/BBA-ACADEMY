'use client';

import { use, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc, useUser } from '@/firebase';
import { doc, updateDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { 
  BookOpen, Target, ChevronLeft, ChevronRight, 
  Layers, CheckCircle2, Clock, Info,
  GraduationCap, Users, Calendar, ListTree,
  RotateCcw, Save, LayoutTemplate, PencilLine,
  Search, ExternalLink, Loader2, Award,
  Check, X, AlertTriangle, ClipboardCheck,
  MessageSquare, Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';

export default function PlanMonitoringPage({ params }: { params: Promise<{ lang: Locale, id: string, planId: string }> }) {
  const { lang, id, planId } = use(params);
  const isAr = lang === 'ar';
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isTemplating, setIsTemplating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const planRef = useMemo(() => (firestore && planId) ? doc(firestore, 'academic_plans', planId) : null, [firestore, planId]);
  const { data: plan, loading } = useDoc(planRef);

  const t = {
    back: isAr ? 'العودة للسجل' : 'Back to Registry',
    activeLabel: isAr ? 'متابعة نشطة' : 'Monitoring Active',
    saveTemplate: isAr ? 'حفظ كقالب' : 'Save as Template',
    editPlan: isAr ? 'تعديل الهيكلية' : 'Edit Structure',
    progressLabel: isAr ? 'نسبة إنجاز الخطة' : 'Total Plan Progress',
    courseLoad: isAr ? 'الحمل الدراسي' : 'Course Load',
    coreSubjects: isAr ? 'مواد أساسية' : 'Core Subjects',
    planStart: isAr ? 'بداية التنفيذ' : 'Plan Start',
    targetRelease: isAr ? 'الإصدار المستهدف' : 'Target Release',
    deadline: isAr ? 'الموعد النهائي' : 'Plan Deadline',
    endSession: isAr ? 'نهاية الفترة' : 'End of Session',
    topicsMatrix: isAr ? 'مصفوفة متابعة الدروس' : 'Topic Execution Matrix',
    milestones: isAr ? 'الأهداف المحققة' : 'Milestones',
    monitoringGuidance: isAr ? 'إرشادات المتابعة' : 'Monitoring Guidance',
    guidanceMsg: isAr ? 'قم بالتأشير على الموضوعات عند إتقانها. سيتم تحديث مصفوفة التقدم أعلاه تلقائيًا لتعكس تغطية المنهج الدراسي الإجمالية.' : 'Check off topics as they are mastered. The progress matrix above will update automatically to reflect the overall curriculum coverage.'
  };

  const updateTopicStatus = async (sIdx: number, uIdx: number, tIdx: number, newStatus: string) => {
    if (!plan || !planRef) return;
    const newSubjects = JSON.parse(JSON.stringify(plan.subjects));
    newSubjects[sIdx].units[uIdx].topics[tIdx].status = newStatus;
    
    let totalTopics = 0;
    let completedTopics = 0;
    newSubjects.forEach((s: any) => s.units.forEach((u: any) => u.topics.forEach((t: any) => {
       totalTopics++;
       if (t.status === 'completed') completedTopics++;
    })));

    const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    try {
      await updateDoc(planRef, { 
        subjects: newSubjects, 
        progress: progress,
        updatedAt: serverTimestamp() 
      });
      toast({ title: isAr ? 'تم تحديث حالة الدرس' : 'Topic status updated' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Update failed' });
    }
  };

  const updateObjectiveStatus = async (oIdx: number, newStatus: string) => {
    if (!plan || !planRef) return;
    const newObjectives = [...plan.objectives];
    newObjectives[oIdx].status = newStatus;
    try {
      await updateDoc(planRef, { objectives: newObjectives, updatedAt: serverTimestamp() });
      toast({ title: isAr ? 'تم تحديث حالة الهدف' : 'Objective updated' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Update failed' });
    }
  };

  const saveAsTemplate = async () => {
    if (!plan || !firestore) return;
    setIsTemplating(true);
    try {
      const templateData = {
        name: plan.name + ' (Template)',
        year: plan.year,
        term: plan.term,
        subjects: plan.subjects.map((s: any) => ({
          name: s.name,
          teacher: s.teacher,
          units: s.units.map((u: any) => ({
            title: u.title,
            topics: u.topics.map((t: any) => ({ title: t.title, status: 'not_started' }))
          }))
        })),
        objectives: plan.objectives.map((o: any) => ({ title: o.title, status: 'not_started' })),
        type: 'custom_template',
        createdAt: serverTimestamp()
      };
      await addDoc(collection(firestore, 'academic_templates'), templateData);
      toast({ title: isAr ? 'تم حفظ الخطة كقالب بنجاح' : 'Plan converted to template' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Templating failed' });
    } finally {
      setIsTemplating(false);
    }
  };

  if (!mounted || loading || !plan) return <div className="p-20 text-center animate-pulse"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-32 px-4">
      {/* Action Header Card */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10"><Award className="h-48 w-48 text-secondary" /></div>
         <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
            <Button onClick={() => router.back()} variant="ghost" className="h-12 w-12 rounded-2xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all shrink-0">
               {isAr ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
            </Button>
            <div className="text-start space-y-1 overflow-hidden">
               <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none truncate">{plan.name}</h1>
               <div className="flex items-center gap-3">
                  <Badge className="bg-secondary text-white border-none font-black text-[8px] uppercase px-3 rounded-md">{t.activeLabel}</Badge>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest truncate">{plan.year} • {plan.term}</span>
               </div>
            </div>
         </div>
         <div className="flex gap-3 relative z-10 w-full md:w-auto">
            <Button onClick={saveAsTemplate} disabled={isTemplating} variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl border-white/10 text-white hover:bg-white hover:text-slate-900 font-black text-[10px] uppercase gap-2 transition-all">
               {isTemplating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LayoutTemplate className="h-4 w-4 text-secondary" />} {t.saveTemplate}
            </Button>
            <Button asChild className="flex-1 md:flex-none h-12 px-6 rounded-xl bg-secondary text-white font-black text-[10px] uppercase gap-2 shadow-xl shadow-secondary/20 transition-all hover:bg-secondary/90 active:scale-95">
               <Link href={`/${lang}/admin/students/${id}/plans/editor/${planId}`}><PencilLine className="h-4 w-4" /> {t.editPlan}</Link>
            </Button>
         </div>
      </div>

      {/* Progress Cards Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
         <Card className="border-none shadow-premium rounded-2xl bg-white p-6 space-y-4 text-start border border-slate-50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Star className="h-3 w-3 text-secondary" /> {t.progressLabel}</p>
            <div className="flex items-end justify-between">
               <h3 className="text-4xl font-black text-primary">{plan.progress || 0}%</h3>
               <div className="h-10 w-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shadow-inner"><CheckCircle2 className="h-5 w-5" /></div>
            </div>
            <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
               <div className="h-full bg-secondary transition-all duration-1000 shadow-[0_0_15px_rgba(var(--secondary),0.4)]" style={{ width: `${plan.progress || 0}%` }} />
            </div>
         </Card>

         <Card className="border-none shadow-premium rounded-2xl bg-white p-6 space-y-2 text-center flex flex-col justify-center border border-slate-50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.courseLoad}</p>
            <h3 className="text-3xl font-black text-slate-900">{plan.subjects?.length || 0}</h3>
            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em]">{t.coreSubjects}</p>
         </Card>

         <Card className="border-none shadow-premium rounded-2xl bg-white p-6 space-y-2 text-center flex flex-col justify-center border border-slate-50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.planStart}</p>
            <h3 className="text-xl font-black text-slate-900 truncate px-2">{plan.startDate || '-'}</h3>
            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em]">{t.targetRelease}</p>
         </Card>

         <Card className="border-none shadow-premium rounded-2xl bg-primary text-white p-6 space-y-2 text-center flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10"><Clock className="h-20 w-20" /></div>
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{t.deadline}</p>
            <h3 className="text-xl font-black relative z-10 truncate px-2">{plan.endDate || '-'}</h3>
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em] relative z-10">{t.endSession}</p>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Main Column: Subjects Accordion */}
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2 text-start">
               <h2 className="text-lg font-black uppercase text-primary tracking-widest flex items-center gap-3">
                  <ListTree className="h-5 w-5 text-secondary" />
                  {t.topicsMatrix}
               </h2>
            </div>

            <Accordion type="multiple" className="space-y-4">
               {plan.subjects.map((sub: any, sIdx: number) => (
                 <AccordionItem key={sub.id || sIdx} value={`sub-${sub.id || sIdx}`} className="border-none bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group/acc hover:shadow-md transition-all">
                    <AccordionTrigger className="p-6 hover:no-underline hover:bg-slate-50/50 transition-colors">
                       <div className="flex items-center gap-6 text-start">
                          <div className="h-11 w-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-black shadow-inner group-hover/acc:bg-primary group-hover/acc:text-white transition-all">{sIdx+1}</div>
                          <div className="space-y-0.5">
                             <h4 className="font-black text-slate-900 uppercase tracking-tight">{sub.name}</h4>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><User className="h-3 w-3 text-secondary" /> {sub.teacher}</p>
                          </div>
                       </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 md:p-10 space-y-12 border-t border-slate-50">
                       {sub.units.map((unit: any, uIdx: number) => (
                         <div key={unit.id || uIdx} className="space-y-6">
                            <div className="flex items-center gap-4">
                               <div className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary),0.5)]" />
                               <h5 className="font-black text-primary uppercase text-sm tracking-tight">{unit.title}</h5>
                               <div className="h-px flex-1 bg-slate-100" />
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                               {unit.topics.map((topic: any, tIdx: number) => {
                                 const isDone = topic.status === 'completed';
                                 return (
                                   <div key={topic.id || tIdx} className={cn(
                                     "flex items-center justify-between p-4 rounded-xl transition-all border shadow-sm",
                                     isDone ? "bg-green-50/50 border-green-100" : "bg-white border-slate-100 hover:border-secondary/20 hover:shadow-md"
                                   )}>
                                      <div className="flex items-center gap-4">
                                         <button 
                                           onClick={() => updateTopicStatus(sIdx, uIdx, tIdx, isDone ? 'not_started' : 'completed')}
                                           className={cn(
                                             "h-8 w-8 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm active:scale-90",
                                             isDone ? "bg-green-500 border-green-500 text-white" : "bg-white border-slate-200 text-transparent hover:border-secondary/40"
                                           )}
                                         >
                                            <Check className="h-4.5 w-4.5 stroke-[4px]" />
                                         </button>
                                         <span className={cn("text-xs font-bold uppercase transition-all", isDone ? "text-green-700/60 line-through" : "text-slate-700")}>{topic.title}</span>
                                      </div>
                                      {!isDone && (
                                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                                           <div className="h-1.5 w-1.5 rounded-full bg-slate-200 animate-pulse" />
                                           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pending</span>
                                        </div>
                                      )}
                                   </div>
                                 );
                               })}
                            </div>
                         </div>
                       ))}
                    </AccordionContent>
                 </AccordionItem>
               ))}
            </Accordion>
         </div>

         {/* Sidebar Column: Objectives */}
         <div className="lg:col-span-4 space-y-6">
            <h2 className="text-lg font-black uppercase text-primary tracking-widest flex items-center gap-3 text-start px-2">
               <Target className="h-5 w-5 text-secondary" />
               {t.milestones}
            </h2>

            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
               <CardContent className="p-8 space-y-6">
                  {plan.objectives?.map((obj: any, oIdx: number) => {
                     const isDone = obj.status === 'completed';
                     return (
                       <div key={obj.id || oIdx} className="flex gap-4 items-start group">
                          <button 
                             onClick={() => updateObjectiveStatus(oIdx, isDone ? 'not_started' : 'completed')}
                             className={cn(
                               "h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 shadow-sm active:scale-90 shrink-0",
                               isDone ? "bg-secondary border-secondary text-white" : "border-slate-200 bg-white hover:border-secondary/30"
                             )}
                          >
                             <Check className="h-4 w-4 stroke-[4px]" />
                          </button>
                          <div className="space-y-1 text-start">
                             <p className={cn("text-sm font-bold transition-all leading-tight", isDone ? "text-slate-300 line-through" : "text-slate-700")}>{obj.title}</p>
                             {isDone && (
                               <div className="inline-flex items-center gap-1.5 text-green-500">
                                  <CheckCircle2 className="h-2.5 w-2.5" />
                                  <span className="text-[8px] font-black uppercase tracking-widest">Achieved</span>
                               </div>
                             )}
                          </div>
                       </div>
                     );
                  })}
                  {(!plan.objectives || plan.objectives.length === 0) && (
                     <div className="py-10 text-center opacity-30 italic text-xs font-bold uppercase">No objectives.</div>
                  )}
               </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-slate-50/50 border border-slate-100 rounded-3xl p-6 space-y-4 shadow-inner">
               <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center"><Info className="h-4 w-4 text-primary opacity-40" /></div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.monitoringGuidance}</h4>
               </div>
               <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic text-start border-l-2 border-slate-200 pl-4 py-1">
                  {t.guidanceMsg}
               </p>
            </Card>
         </div>
      </div>

      <style jsx global>{`
        .shadow-premium {
          box-shadow: 0 10px 15px -3px rgba(11, 31, 91, 0.03), 0 4px 6px -4px rgba(11, 31, 91, 0.02);
        }
      `}</style>
    </div>
  );
}
