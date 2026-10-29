
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  MessageSquare
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

export default function PlanMonitoringPage({ params }: { params: Promise<{ lang: Locale, id: string, planId: string }> }) {
  const { lang, id, planId } = use(params);
  const isAr = lang === 'ar';
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const planRef = useMemo(() => (firestore && planId) ? doc(firestore, 'academic_plans', planId) : null, [firestore, planId]);
  const { data: plan, loading } = useDoc(planRef);
  const [isSaving, setIsSaving] = useState(false);
  const [isTemplating, setIsTemplating] = useState(false);

  // Monitor Logic: Update Status of Topics or Objectives
  const updateTopicStatus = async (sIdx: number, uIdx: number, tIdx: number, newStatus: string) => {
    if (!plan || !planRef) return;
    const newSubjects = [...plan.subjects];
    newSubjects[sIdx].units[uIdx].topics[tIdx].status = newStatus;
    
    // Auto-calculate progress: % of completed topics
    let totalTopics = 0;
    let completedTopics = 0;
    newSubjects.forEach(s => s.units.forEach((u: any) => u.topics.forEach((t: any) => {
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

  // Convert to Template Logic
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

  if (loading || !plan) return <div className="p-20 text-center animate-pulse"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-32">
      {/* Dynamic Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10"><Award className="h-48 w-48 text-secondary" /></div>
         <div className="flex items-center gap-6 relative z-10">
            <Button onClick={() => router.back()} variant="ghost" className="h-12 w-12 rounded-2xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all">
               <ChevronLeft className={cn("h-6 w-6", isAr && "rotate-180")} />
            </Button>
            <div className="text-start space-y-1">
               <h1 className="text-2xl font-black uppercase tracking-tight leading-none">{plan.name}</h1>
               <div className="flex items-center gap-3">
                  <Badge className="bg-secondary text-white border-none font-black text-[8px] uppercase px-3 rounded-md">Monitoring Active</Badge>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{plan.year} • {plan.term}</span>
               </div>
            </div>
         </div>
         <div className="flex gap-3 relative z-10">
            <Button onClick={saveAsTemplate} disabled={isTemplating} variant="outline" className="h-12 px-6 rounded-xl border-white/10 text-white hover:bg-white hover:text-slate-900 font-black text-[10px] uppercase gap-2 transition-all">
               {isTemplating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LayoutTemplate className="h-4 w-4 text-secondary" />} {isAr ? 'حفظ كقالب' : 'Save as Template'}
            </Button>
            <Button asChild className="h-12 px-6 rounded-xl bg-secondary text-white font-black text-[10px] uppercase gap-2 shadow-xl shadow-secondary/20 transition-all hover:bg-secondary/90">
               <Link href={`/${lang}/admin/students/${id}/plans/editor/${planId}`}><PencilLine className="h-4 w-4" /> {isAr ? 'تعديل الخطة' : 'Edit Structure'}</Link>
            </Button>
         </div>
      </div>

      {/* Progress Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="border-none shadow-premium rounded-2xl bg-white p-6 space-y-4 text-start">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Plan Progress</p>
            <div className="flex items-end justify-between">
               <h3 className="text-4xl font-black text-primary">{plan.progress || 0}%</h3>
               <div className="h-10 w-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><CheckCircle2 className="h-5 w-5" /></div>
            </div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
               <div className="h-full bg-secondary transition-all duration-1000" style={{ width: `${plan.progress || 0}%` }} />
            </div>
         </Card>

         <Card className="border-none shadow-premium rounded-2xl bg-white p-6 space-y-2 text-center flex flex-col justify-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Course Load</p>
            <h3 className="text-3xl font-black text-slate-900">{plan.subjects?.length || 0}</h3>
            <p className="text-[8px] font-bold text-slate-300 uppercase">Core Subjects</p>
         </Card>

         <Card className="border-none shadow-premium rounded-2xl bg-white p-6 space-y-2 text-center flex flex-col justify-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Plan Start</p>
            <h3 className="text-xl font-black text-slate-900">{plan.startDate || '-'}</h3>
            <p className="text-[8px] font-bold text-slate-300 uppercase">Target Release</p>
         </Card>

         <Card className="border-none shadow-premium rounded-2xl bg-primary text-white p-6 space-y-2 text-center flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10"><Clock className="h-20 w-20" /></div>
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Plan Deadline</p>
            <h3 className="text-xl font-black relative z-10">{plan.endDate || '-'}</h3>
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em] relative z-10">End of Session</p>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* LEFT: Execution Tracker (Topics) */}
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2">
               <h2 className="text-lg font-black uppercase text-primary tracking-widest flex items-center gap-3">
                  <ListTree className="h-5 w-5 text-secondary" />
                  {isAr ? 'متابعة الموضوعات والدروس' : 'Topic Execution Matrix'}
               </h2>
            </div>

            <Accordion type="multiple" className="space-y-4">
               {plan.subjects.map((sub: any, sIdx: number) => (
                 <AccordionItem key={sub.id} value={`sub-${sub.id}`} className="border-none bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <AccordionTrigger className="p-6 hover:no-underline hover:bg-slate-50/50 transition-colors">
                       <div className="flex items-center gap-6 text-start">
                          <div className="h-11 w-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-black">{sIdx+1}</div>
                          <div className="space-y-0.5">
                             <h4 className="font-black text-slate-900 uppercase tracking-tight">{sub.name}</h4>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{sub.teacher}</p>
                          </div>
                       </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-8 space-y-10 border-t border-slate-50">
                       {sub.units.map((unit: any, uIdx: number) => (
                         <div key={unit.id} className="space-y-6">
                            <div className="flex items-center gap-4">
                               <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                               <h5 className="font-black text-primary uppercase text-sm">{unit.title}</h5>
                               <div className="h-px flex-1 bg-slate-50" />
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                               {unit.topics.map((topic: any, tIdx: number) => {
                                 const isDone = topic.status === 'completed';
                                 return (
                                   <div key={topic.id} className={cn(
                                     "flex items-center justify-between p-4 rounded-xl transition-all border",
                                     isDone ? "bg-green-50 border-green-100" : "bg-white border-slate-100 hover:border-secondary/20"
                                   )}>
                                      <div className="flex items-center gap-4">
                                         <button 
                                           onClick={() => updateTopicStatus(sIdx, uIdx, tIdx, isDone ? 'not_started' : 'completed')}
                                           className={cn(
                                             "h-7 w-7 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm",
                                             isDone ? "bg-green-500 border-green-500 text-white" : "bg-white border-slate-200 text-transparent"
                                           )}
                                         >
                                            <Check className="h-4 w-4 stroke-[4px]" />
                                         </button>
                                         <span className={cn("text-xs font-bold uppercase", isDone ? "text-green-700 line-through opacity-60" : "text-slate-600")}>{topic.title}</span>
                                      </div>
                                      {!isDone && (
                                        <div className="flex items-center gap-2">
                                           <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                                           <span className="text-[9px] font-black text-slate-300 uppercase">Not Started</span>
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

         {/* RIGHT: Objectives Monitoring */}
         <div className="lg:col-span-4 space-y-6">
            <h2 className="text-lg font-black uppercase text-primary tracking-widest flex items-center gap-3">
               <Target className="h-5 w-5 text-secondary" />
               {isAr ? 'الأهداف المحققة' : 'Milestones'}
            </h2>

            <Card className="border-none shadow-premium rounded-[2rem] bg-white overflow-hidden border border-slate-100">
               <CardContent className="p-8 space-y-6">
                  {plan.objectives?.map((obj: any, oIdx: number) => {
                     const isDone = obj.status === 'completed';
                     return (
                       <div key={obj.id} className="flex gap-4 items-start group">
                          <button 
                             onClick={() => updateObjectiveStatus(oIdx, isDone ? 'not_started' : 'completed')}
                             className={cn(
                               "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5",
                               isDone ? "bg-secondary border-secondary text-white" : "border-slate-200"
                             )}
                          >
                             <Check className="h-3.5 w-3.5 stroke-[4px]" />
                          </button>
                          <div className="space-y-1 text-start">
                             <p className={cn("text-sm font-bold transition-all", isDone ? "text-slate-300 line-through" : "text-slate-700")}>{obj.title}</p>
                             {isDone && <p className="text-[8px] font-black text-green-500 uppercase tracking-widest">Achieved</p>}
                          </div>
                       </div>
                     );
                  })}
                  {(!plan.objectives || plan.objectives.length === 0) && (
                     <div className="py-10 text-center opacity-30 italic text-xs font-bold uppercase">No target objectives.</div>
                  )}
               </CardContent>
            </Card>

            {/* Note Section */}
            <Card className="border-none shadow-sm bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
               <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-primary opacity-40" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monitoring Guidance</h4>
               </div>
               <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic text-start">
                  Check off topics as they are mastered. The progress matrix above will update automatically to reflect the overall curriculum coverage.
               </p>
            </Card>
         </div>
      </div>
    </div>
  );
}
