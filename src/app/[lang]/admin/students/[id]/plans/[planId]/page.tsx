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
  MessageSquare, Star, User, Globe,
  ArrowLeft, ArrowRight
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
    back: isAr ? 'العودة' : 'Back',
    activeLabel: isAr ? 'متابعة نشطة' : 'Active Monitoring',
    saveTemplate: isAr ? 'حفظ كقالب' : 'Save Template',
    editPlan: isAr ? 'تعديل الخطة' : 'Edit Plan',
    progressLabel: isAr ? 'نسبة الإنجاز' : 'Progress',
    courseLoad: isAr ? 'المواد' : 'Subjects',
    coreSubjects: isAr ? 'أساسية' : 'Core',
    planStart: isAr ? 'البداية' : 'Start',
    targetRelease: isAr ? 'الإصدار' : 'Target',
    deadline: isAr ? 'النهاية' : 'Deadline',
    endSession: isAr ? 'الفترة' : 'Session',
    topicsMatrix: isAr ? 'مصفوفة متابعة الدروس' : 'Curriculum Progress Matrix',
    milestones: isAr ? 'الأهداف المحققة' : 'Milestones',
    monitoringGuidance: isAr ? 'توجيهات' : 'Guidance',
    guidanceMsg: isAr ? 'قم بالتأشير على الموضوعات المكتملة لتحديث التقدم آلياً.' : 'Check completed topics to auto-sync progress.'
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
          nameAr: s.nameAr || '',
          nameEn: s.nameEn || '',
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
      toast({ title: isAr ? 'تم حفظ القالب' : 'Template Saved' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error' });
    } finally {
      setIsTemplating(false);
    }
  };

  if (!mounted || loading || !plan) return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-24 px-4 sm:px-6">
      
      {/* 1. Slim & Professional Header */}
      <div className="bg-primary text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-secondary">
         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Award className="h-32 w-32 text-white" />
         </div>
         
         <div className="flex items-center gap-4 sm:gap-6 relative z-10 w-full min-w-0">
            <Button onClick={() => router.back()} variant="ghost" className="h-10 w-10 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all shrink-0">
               {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <div className="space-y-1 text-start flex-1 min-w-0">
               <h1 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight leading-tight truncate">
                  {plan.name}
               </h1>
               <div className="flex items-center gap-3">
                  <Badge className="bg-secondary text-white border-none font-black text-[9px] uppercase px-3 py-0.5 rounded shadow-sm">
                    {t.activeLabel}
                  </Badge>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{plan.year} • {plan.term}</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3 relative z-10 w-full md:w-auto shrink-0">
            <Button onClick={saveAsTemplate} disabled={isTemplating} className="flex-1 md:flex-none h-11 px-6 rounded-lg bg-white/10 text-white hover:bg-white hover:text-primary font-black text-[10px] uppercase gap-2 transition-all border border-white/10">
               {isTemplating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LayoutTemplate className="h-4 w-4 text-secondary" />} 
               {t.saveTemplate}
            </Button>
            <Button asChild className="flex-1 md:flex-none h-11 px-6 rounded-lg bg-secondary text-white font-black text-[10px] uppercase gap-2 shadow-lg transition-all hover:bg-secondary/90">
               <Link href={`/${lang}/admin/students/${id}/plans/editor/${planId}`}>
                  <PencilLine className="h-4 w-4" /> {t.editPlan}
               </Link>
            </Button>
         </div>
      </div>

      {/* 2. Stats Row - Standardized Visibility */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <Card className="border border-slate-200 shadow-sm bg-white p-5 space-y-3 text-start">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Star className="h-3 w-3 text-secondary" /> {t.progressLabel}
            </p>
            <div className="flex items-end justify-between">
               <h3 className="text-3xl font-black text-primary tracking-tighter">{plan.progress || 0}%</h3>
               <div className="h-8 w-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><CheckCircle2 className="h-4 w-4" /></div>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-secondary transition-all duration-1000" style={{ width: `${plan.progress || 0}%` }} />
            </div>
         </Card>

         <Card className="border border-slate-200 shadow-sm bg-white p-5 flex flex-col justify-center text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.courseLoad}</p>
            <h3 className="text-2xl font-black text-slate-900">{plan.subjects?.length || 0}</h3>
            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{t.coreSubjects}</p>
         </Card>

         <Card className="border border-slate-200 shadow-sm bg-white p-5 flex flex-col justify-center text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.planStart}</p>
            <h3 className="text-base font-black text-slate-900 truncate">{plan.startDate || '---'}</h3>
            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{t.targetRelease}</p>
         </Card>

         <Card className="border border-slate-200 shadow-sm bg-slate-50 p-5 flex flex-col justify-center text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.deadline}</p>
            <h3 className="text-base font-black text-primary truncate">{plan.endDate || '---'}</h3>
            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{t.endSession}</p>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
         
         {/* 3. Subjects - Enhanced Borders & Spacing */}
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3 px-1 text-start">
               <ListTree className="h-5 w-5 text-secondary" />
               <h2 className="text-sm font-black uppercase text-primary tracking-widest">{t.topicsMatrix}</h2>
            </div>

            <Accordion type="multiple" className="space-y-3">
               {plan.subjects.map((sub: any, sIdx: number) => (
                 <AccordionItem key={sIdx} value={`sub-${sIdx}`} className="border border-slate-200 bg-white rounded-xl shadow-sm overflow-hidden group/acc">
                    <AccordionTrigger className="p-4 sm:p-5 hover:no-underline hover:bg-slate-50 transition-colors">
                       <div className="flex items-center gap-4 text-start min-w-0">
                          <div className="h-9 w-9 rounded-lg bg-primary text-white flex items-center justify-center font-black text-xs shrink-0">
                            {sIdx+1}
                          </div>
                          <div className="space-y-0.5 min-w-0">
                             <h4 className="font-black text-primary uppercase text-sm truncate">
                                {isAr ? (sub.nameAr || sub.nameEn) : (sub.nameEn || sub.nameAr)}
                             </h4>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                <User className="h-3 w-3 text-secondary" /> {sub.teacher || '-'}
                             </p>
                          </div>
                       </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 sm:p-8 space-y-8 border-t border-slate-100">
                       {sub.units.map((unit: any, uIdx: number) => (
                         <div key={uIdx} className="space-y-4">
                            <div className="flex items-center gap-3">
                               <div className="h-2 w-2 rounded-full bg-secondary shrink-0" />
                               <h5 className="font-black text-slate-900 uppercase text-xs">{unit.title}</h5>
                               <div className="h-px flex-1 bg-slate-100" />
                            </div>
                            
                            <div className="grid grid-cols-1 gap-2">
                               {unit.topics.map((topic: any, tIdx: number) => {
                                 const isDone = topic.status === 'completed';
                                 return (
                                   <div key={tIdx} className={cn(
                                     "flex items-center justify-between p-3.5 rounded-lg border transition-all",
                                     isDone ? "bg-green-50/30 border-green-100" : "bg-white border-slate-100 hover:border-slate-200"
                                   )}>
                                      <div className="flex items-center gap-3 min-w-0">
                                         <button 
                                           onClick={() => updateTopicStatus(sIdx, uIdx, tIdx, isDone ? 'not_started' : 'completed')}
                                           className={cn(
                                             "h-7 w-7 rounded border-2 flex items-center justify-center transition-all shrink-0",
                                             isDone ? "bg-green-500 border-green-500 text-white" : "bg-white border-slate-200"
                                           )}
                                         >
                                            <Check className="h-4 w-4 stroke-[3px]" />
                                         </button>
                                         <span className={cn("text-xs font-bold transition-all truncate", isDone ? "text-slate-400 line-through" : "text-slate-700")}>
                                           {topic.title}
                                         </span>
                                      </div>
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

         {/* 4. Milestones - Sidebar */}
         <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3 px-1 text-start">
               <Target className="h-5 w-5 text-secondary" />
               <h2 className="text-sm font-black uppercase text-primary tracking-widest">{t.milestones}</h2>
            </div>

            <Card className="border border-slate-200 shadow-sm bg-white p-6 space-y-5 text-start">
               {plan.objectives?.map((obj: any, oIdx: number) => {
                  const isDone = obj.status === 'completed';
                  return (
                    <div key={oIdx} className="flex gap-4 items-start group">
                       <button 
                          onClick={() => updateObjectiveStatus(oIdx, isDone ? 'not_started' : 'completed')}
                          className={cn(
                            "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 shrink-0",
                            isDone ? "bg-secondary border-secondary text-white" : "border-slate-200 bg-white"
                          )}
                       >
                          <Check className="h-3.5 w-3.5 stroke-[3px]" />
                       </button>
                       <p className={cn("text-xs font-bold transition-all leading-relaxed", isDone ? "text-slate-300 line-through" : "text-slate-700")}>
                         {obj.title}
                       </p>
                    </div>
                  );
               })}
            </Card>

            <Card className="border border-slate-200 shadow-sm bg-slate-50 p-6 space-y-3">
               <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-secondary" />
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.monitoringGuidance}</h4>
               </div>
               <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic text-start">
                  {t.guidanceMsg}
               </p>
            </Card>
         </div>
      </div>
    </div>
  );
}
