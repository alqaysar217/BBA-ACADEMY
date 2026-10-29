
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { 
  BookOpen, Target, Plus, ChevronRight, ChevronLeft, 
  Save, Trash2, Layers, CheckCircle2, Star, Info,
  GraduationCap, Users, Calendar, Clock, Type, ListTree,
  RotateCcw, X, Edit3, ArrowRight, ArrowLeft, Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function AcademicPlanEditorPage({ params }: { params: Promise<{ lang: Locale, id: string, planId?: string[] }> }) {
  const { lang, id, planId } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();

  const isEditMode = !!planId && planId.length > 0;
  const currentPlanId = isEditMode ? planId![0] : null;

  const planRef = useMemo(() => (firestore && currentPlanId) ? doc(firestore, 'academic_plans', currentPlanId) : null, [firestore, currentPlanId]);
  const { data: existingPlan, loading } = useDoc(planRef);

  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Core State: The Plan Data Model
  const [plan, setPlan] = useState({
    name: '',
    year: '2026-2027',
    term: 'First Semester',
    startDate: '',
    endDate: '',
    responsibleTeacher: '',
    notes: '',
    subjects: [] as any[],
    objectives: [] as any[],
  });

  useEffect(() => {
    if (existingPlan) {
      setPlan({
        name: existingPlan.name || '',
        year: existingPlan.year || '2026-2027',
        term: existingPlan.term || 'First Semester',
        startDate: existingPlan.startDate || '',
        endDate: existingPlan.endDate || '',
        responsibleTeacher: existingPlan.responsibleTeacher || '',
        notes: existingPlan.notes || '',
        subjects: existingPlan.subjects || [],
        objectives: existingPlan.objectives || [],
      });
    }
  }, [existingPlan]);

  // Subjects & Units Handlers
  const addSubject = () => {
    setPlan(prev => ({
      ...prev,
      subjects: [...prev.subjects, {
        id: crypto.randomUUID(),
        name: '',
        teacher: '',
        units: []
      }]
    }));
  };

  const updateSubject = (idx: number, field: string, val: any) => {
    const newSubjects = [...plan.subjects];
    newSubjects[idx] = { ...newSubjects[idx], [field]: val };
    setPlan(prev => ({ ...prev, subjects: newSubjects }));
  };

  const removeSubject = (idx: number) => {
    const newSubjects = [...plan.subjects];
    newSubjects.splice(idx, 1);
    setPlan(prev => ({ ...prev, subjects: newSubjects }));
  };

  const addUnit = (subjectIdx: number) => {
    const newSubjects = [...plan.subjects];
    newSubjects[subjectIdx].units.push({
      id: crypto.randomUUID(),
      title: '',
      topics: []
    });
    setPlan(prev => ({ ...prev, subjects: newSubjects }));
  };

  const updateUnit = (subjectIdx: number, unitIdx: number, val: any) => {
    const newSubjects = [...plan.subjects];
    newSubjects[subjectIdx].units[unitIdx].title = val;
    setPlan(prev => ({ ...prev, subjects: newSubjects }));
  };

  const removeUnit = (sIdx: number, uIdx: number) => {
    const newSubjects = [...plan.subjects];
    newSubjects[sIdx].units.splice(uIdx, 1);
    setPlan(prev => ({ ...prev, subjects: newSubjects }));
  };

  const addTopic = (subjectIdx: number, unitIdx: number) => {
    const newSubjects = [...plan.subjects];
    newSubjects[subjectIdx].units[unitIdx].topics.push({
      id: crypto.randomUUID(),
      title: '',
      status: 'not_started'
    });
    setPlan(prev => ({ ...prev, subjects: newSubjects }));
  };

  const updateTopic = (sIdx: number, uIdx: number, tIdx: number, val: any) => {
    const newSubjects = [...plan.subjects];
    newSubjects[sIdx].units[uIdx].topics[tIdx].title = val;
    setPlan(prev => ({ ...prev, subjects: newSubjects }));
  };

  const removeTopic = (sIdx: number, uIdx: number, tIdx: number) => {
    const newSubjects = [...plan.subjects];
    newSubjects[sIdx].units[uIdx].topics.splice(tIdx, 1);
    setPlan(prev => ({ ...prev, subjects: newSubjects }));
  };

  const addObjective = () => {
    setPlan(prev => ({
      ...prev,
      objectives: [...prev.objectives, {
        id: crypto.randomUUID(),
        title: '',
        status: 'not_started'
      }]
    }));
  };

  const handleSavePlan = async (status: string = 'approved') => {
    if (!firestore || !id) return;
    if (!plan.name) {
      toast({ variant: 'destructive', title: isAr ? 'يرجى إدخال اسم الخطة' : 'Please enter a plan name' });
      return;
    }

    setIsSaving(true);
    try {
      const docRef = isEditMode ? doc(firestore, 'academic_plans', currentPlanId!) : doc(collection(firestore, 'academic_plans'));
      const finalData = {
        ...plan,
        studentId: id,
        status: status,
        updatedAt: serverTimestamp(),
        createdAt: isEditMode ? existingPlan.createdAt : serverTimestamp(),
      };
      await setDoc(docRef, finalData, { merge: true });
      toast({ title: isAr ? 'تم حفظ التغييرات بنجاح' : 'Academic plan updated successfully' });
      router.push(`/${lang}/admin/students/${id}/plans`);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Save failed' });
    } finally {
      setIsSaving(false);
    }
  };

  const t = {
    title: isEditMode ? (isAr ? 'تعديل الخطة الدراسية' : 'Edit Academic Plan') : (isAr ? 'مصمم الخطة الدراسية' : 'Academic Plan Designer'),
    stages: [
      { id: 1, name: isAr ? 'البيانات الأساسية' : 'Base Info', icon: Info },
      { id: 2, name: isAr ? 'إضافة المواد' : 'Subject Load', icon: BookOpen },
      { id: 3, name: isAr ? 'الوحدات والموضوعات' : 'Detailed Structure', icon: ListTree },
      { id: 4, name: isAr ? 'الأهداف التعليمية' : 'Learning Objectives', icon: Target },
    ]
  };

  if (loading && isEditMode) return <div className="p-20 text-center animate-pulse"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
         <div className="flex items-center gap-6 text-start">
            <Button onClick={() => router.back()} variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary transition-all">
               <ChevronLeft className={cn("h-6 w-6", isAr && "rotate-180")} />
            </Button>
            <div>
               <h1 className="text-2xl font-black text-primary uppercase tracking-tight">{t.title}</h1>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{isAr ? 'تصميم مسار تعليمي مخصص' : 'Custom educational pathway design'}</p>
            </div>
         </div>
         <div className="flex gap-3">
            <Button onClick={() => handleSavePlan('draft')} disabled={isSaving} variant="outline" className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest border-slate-200">
               {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />} {isAr ? 'حفظ مسودة' : 'Save Draft'}
            </Button>
            <Button onClick={() => handleSavePlan('approved')} disabled={isSaving} className="h-12 px-8 rounded-xl bg-secondary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-secondary/20 transition-all hover:bg-secondary/90">
               {isAr ? 'حفظ واعتماد الخطة' : 'Save & Approve Plan'}
            </Button>
         </div>
      </div>

      {/* Stepper Navigation */}
      <div className="grid grid-cols-4 gap-4 px-2">
         {t.stages.map(s => (
           <button 
            key={s.id} 
            onClick={() => setStep(s.id)}
            className={cn(
              "flex items-center justify-center gap-3 p-4 rounded-2xl transition-all border-2",
              step === s.id ? "bg-primary border-primary text-white shadow-xl scale-105" : "bg-white border-slate-100 text-slate-400 hover:border-primary/20"
            )}
           >
              <s.icon className={cn("h-4 w-4", step === s.id ? "text-secondary" : "text-slate-300")} />
              <span className="hidden md:block font-black text-[10px] uppercase tracking-widest">{s.name}</span>
           </button>
         ))}
      </div>

      {/* Stage 1: Basic Info */}
      {step === 1 && (
        <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
           <CardHeader className="bg-slate-50/50 p-10 border-b border-slate-100">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg"><Info className="h-6 w-6" /></div>
                 <CardTitle className="text-xl font-black uppercase text-primary tracking-tight">{isAr ? 'إعدادات الخطة العامة' : 'General Plan Settings'}</CardTitle>
              </div>
           </CardHeader>
           <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2 text-start">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'اسم الخطة' : 'Plan Name'}</Label>
                    <Input value={plan.name} onChange={(e) => setPlan({...plan, name: e.target.value})} className="h-14 bg-slate-50 border-none rounded-xl font-bold" />
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'المعلم المسؤول' : 'Responsible Teacher'}</Label>
                    <Input value={plan.responsibleTeacher} onChange={(e) => setPlan({...plan, responsibleTeacher: e.target.value})} className="h-14 bg-slate-50 border-none rounded-xl font-bold" />
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Year</Label>
                    <Select value={plan.year} onValueChange={(v) => setPlan({...plan, year: v})}>
                       <SelectTrigger className="h-14 bg-slate-50 border-none rounded-xl font-bold"><SelectValue /></SelectTrigger>
                       <SelectContent><SelectItem value="2025-2026">2025-2026</SelectItem><SelectItem value="2026-2027">2026-2027</SelectItem></SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Term</Label>
                    <Select value={plan.term} onValueChange={(v) => setPlan({...plan, term: v})}>
                       <SelectTrigger className="h-14 bg-slate-50 border-none rounded-xl font-bold"><SelectValue /></SelectTrigger>
                       <SelectContent><SelectItem value="First Semester">First Semester</SelectItem><SelectItem value="Second Semester">Second Semester</SelectItem></SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Start Date</Label>
                    <Input type="date" value={plan.startDate} onChange={(e) => setPlan({...plan, startDate: e.target.value})} className="h-14 bg-slate-50 border-none rounded-xl font-bold uppercase" />
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">End Date</Label>
                    <Input type="date" value={plan.endDate} onChange={(e) => setPlan({...plan, endDate: e.target.value})} className="h-14 bg-slate-50 border-none rounded-xl font-bold uppercase" />
                 </div>
              </div>
              <div className="space-y-2 text-start">
                 <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'ملاحظات إضافية' : 'General Notes'}</Label>
                 <Textarea value={plan.notes} onChange={(e) => setPlan({...plan, notes: e.target.value})} className="min-h-[120px] bg-slate-50 border-none rounded-2xl p-6 font-bold" />
              </div>
           </CardContent>
        </Card>
      )}

      {/* Stage 2: Subjects */}
      {step === 2 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center justify-between px-2">
              <div className="space-y-1 text-start">
                 <h2 className="text-xl font-black text-primary uppercase tracking-tight">{isAr ? 'المقررات الدراسية' : 'Academic Course Load'}</h2>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'تحديد المواد التعليمية لهذه الخطة' : 'Define subjects included in this study plan'}</p>
              </div>
              <Button onClick={addSubject} className="h-12 px-6 rounded-xl bg-secondary text-white font-black text-[10px] uppercase shadow-lg shadow-secondary/10">
                 <Plus className="h-4 w-4 mr-2" /> Add Subject
              </Button>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {plan.subjects.map((sub, sIdx) => (
                <Card key={sub.id} className="border-none shadow-premium rounded-2xl bg-white overflow-hidden border border-slate-100">
                   <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                         <div className="md:col-span-1 flex items-center justify-center">
                            <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-300 flex items-center justify-center font-black">{sIdx+1}</div>
                         </div>
                         <div className="md:col-span-5 space-y-2 text-start">
                            <Label className="text-[9px] font-black uppercase text-slate-400">Subject Name</Label>
                            <Input value={sub.name} onChange={(e) => updateSubject(sIdx, 'name', e.target.value)} className="h-12 bg-slate-50 border-none rounded-xl font-bold" placeholder="e.g. Mathematics" />
                         </div>
                         <div className="md:col-span-4 space-y-2 text-start">
                            <Label className="text-[9px] font-black uppercase text-slate-400">Subject Teacher</Label>
                            <Input value={sub.teacher} onChange={(e) => updateSubject(sIdx, 'teacher', e.target.value)} className="h-12 bg-slate-50 border-none rounded-xl font-bold" placeholder="Teacher Name" />
                         </div>
                         <div className="md:col-span-2 flex justify-end">
                            <Button onClick={() => removeSubject(sIdx)} variant="ghost" className="h-12 w-12 rounded-xl text-red-300 hover:text-red-500 hover:bg-red-50"><Trash2 className="h-5 w-5" /></Button>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>
      )}

      {/* Stage 3: Units & Topics */}
      {step === 3 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           {plan.subjects.map((sub, sIdx) => (
             <Card key={sub.id} className="border-none shadow-premium rounded-[2rem] bg-white overflow-hidden border border-slate-100">
                <CardHeader className="bg-primary p-6 text-white text-start">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg"><Layers className="h-5 w-5" /></div>
                         <CardTitle className="text-sm font-black uppercase tracking-widest">{sub.name || 'Unnamed Subject'}</CardTitle>
                      </div>
                      <Button onClick={() => addUnit(sIdx)} variant="outline" className="h-10 border-white/20 text-white hover:bg-white hover:text-primary font-black text-[9px] uppercase tracking-widest">
                         <Plus className="h-4 w-4 mr-2" /> Add Unit
                      </Button>
                   </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                   {sub.units.map((unit: any, uIdx: number) => (
                     <div key={unit.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6 text-start relative group">
                        <Button onClick={() => removeUnit(sIdx, uIdx)} variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-4 w-4" /></Button>
                        <div className="flex items-center gap-4">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit {uIdx+1}</span>
                           <Input value={unit.title} onChange={(e) => updateUnit(sIdx, uIdx, e.target.value)} className="flex-1 h-12 bg-white border-slate-200 rounded-xl font-bold" placeholder="Unit Title" />
                           <Button onClick={() => addTopic(sIdx, uIdx)} className="bg-secondary text-white font-black text-[9px] h-10 px-6 rounded-lg uppercase tracking-widest shadow-lg shadow-secondary/10">Add Topic</Button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
                           {unit.topics.map((topic: any, tIdx: number) => (
                             <div key={topic.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm relative group/topic">
                                <div className="h-6 w-6 rounded bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-300">{tIdx+1}</div>
                                <Input value={topic.title} onChange={(e) => updateTopic(sIdx, uIdx, tIdx, e.target.value)} className="h-9 border-none bg-transparent font-bold text-xs" placeholder="Topic title..." />
                                <button onClick={() => removeTopic(sIdx, uIdx, tIdx)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-200 hover:text-red-400 opacity-0 group-hover/topic:opacity-100 transition-all"><X className="h-3.5 w-3.5" /></button>
                             </div>
                           ))}
                        </div>
                     </div>
                   ))}
                </CardContent>
             </Card>
           ))}
        </div>
      )}

      {/* Stage 4: Objectives */}
      {step === 4 && (
        <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
           <CardHeader className="bg-slate-900 p-10 text-white flex flex-row items-center justify-between text-start">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg"><Target className="h-6 w-6" /></div>
                 <CardTitle className="text-xl font-black uppercase">{isAr ? 'الأهداف التعليمية' : 'Learning Objectives'}</CardTitle>
              </div>
              <Button onClick={addObjective} variant="outline" className="border-white/20 text-white hover:bg-white hover:text-slate-900 h-12 px-8 font-black text-[10px] uppercase">
                 <Plus className="h-4 w-4 mr-2" /> Define Objective
              </Button>
           </CardHeader>
           <CardContent className="p-10 space-y-4">
              {plan.objectives.map((obj, oIdx) => (
                <div key={obj.id} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 items-center relative group">
                   <div className="h-8 w-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center font-black text-slate-300 text-xs shrink-0">{oIdx+1}</div>
                   <Input value={obj.title} onChange={(e) => {
                     const newObj = [...plan.objectives];
                     newObj[oIdx].title = e.target.value;
                     setPlan({...plan, objectives: newObj});
                   }} className="flex-1 h-12 bg-white border-slate-100 rounded-xl font-bold" placeholder="Learning objective..." />
                   <button onClick={() => {
                      const newObj = [...plan.objectives];
                      newObj.splice(oIdx, 1);
                      setPlan({...plan, objectives: newObj});
                   }} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="h-5 w-5" /></button>
                </div>
              ))}
           </CardContent>
        </Card>
      )}

      {/* Footer Navigation */}
      <div className="flex justify-between items-center px-4 pt-10 border-t border-slate-100">
         {step > 1 ? (
           <Button onClick={() => setStep(step - 1)} variant="ghost" className="h-14 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 gap-2">
              <ChevronLeft className={cn("h-5 w-5", isAr && "rotate-180")} /> Previous
           </Button>
         ) : <div />}

         {step < 4 && (
           <Button onClick={() => setStep(step + 1)} className="h-14 px-12 rounded-xl bg-primary text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/10 gap-3 group">
              Next Stage <ChevronRight className={cn("h-5 w-5 group-hover:translate-x-1 transition-transform", isAr && "rotate-180")} />
           </Button>
         )}
      </div>
    </div>
  );
}
