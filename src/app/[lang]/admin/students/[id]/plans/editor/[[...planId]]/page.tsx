
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { 
  BookOpen, Target, Plus, ChevronRight, ChevronLeft, 
  Save, Trash2, Layers, Info,
  ListTree, X, PencilLine, Loader2, Calendar, User, Type, FileText,
  Clock, CheckCircle2, GraduationCap, Star, ClipboardCheck,
  Languages, Search, Trash
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

  const [mounted, setMounted] = useState(false);
  const isEditMode = !!planId && planId.length > 0;
  const currentPlanId = isEditMode ? planId![0] : null;

  const planRef = useMemo(() => (firestore && currentPlanId) ? doc(firestore, 'academic_plans', currentPlanId) : null, [firestore, currentPlanId]);
  const { data: existingPlan, loading } = useDoc(planRef);

  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

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
    setMounted(true);
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

  const t = {
    title: isEditMode ? (isAr ? 'تعديل الخطة الدراسية' : 'Edit Academic Plan') : (isAr ? 'مصمم الخطة الدراسية' : 'Academic Plan Designer'),
    subtitle: isAr ? 'تخصيص المسار التعليمي بدقة' : 'Custom educational pathway refinement',
    saveDraft: isAr ? 'حفظ مسودة' : 'Save Draft',
    approve: isAr ? 'حفظ واعتماد الخطة' : 'Save & Approve Plan',
    prev: isAr ? 'السابق' : 'Previous Stage',
    next: isAr ? 'المرحلة التالية' : 'Next Stage',
    generalSettings: isAr ? 'إعدادات الخطة العامة' : 'General Plan Settings',
    courseLoad: isAr ? 'المقررات الدراسية' : 'Academic Course Load',
    courseLoadSub: isAr ? 'تعديل المواد التعليمية لهذه الخطة' : 'Define subjects included in this study plan',
    structure: isAr ? 'الوحدات والموضوعات' : 'Detailed Structure',
    objectives: isAr ? 'الأهداف التعليمية' : 'Learning Objectives',
    stages: [
      { id: 1, name: isAr ? 'البيانات' : 'Base Info', icon: Info },
      { id: 2, name: isAr ? 'المواد' : 'Subjects', icon: BookOpen },
      { id: 3, name: isAr ? 'الهيكلية' : 'Structure', icon: ListTree },
      { id: 4, name: isAr ? 'الأهداف' : 'Objectives', icon: Target },
    ],
    fields: {
      planName: isAr ? 'اسم الخطة (مثلاً: الفصل الأول)' : 'Plan Name (e.g. Term 1)',
      teacher: isAr ? 'المعلم المسؤول' : 'Responsible Teacher',
      year: isAr ? 'السنة الدراسية' : 'Academic Year',
      term: isAr ? 'الفصل الدراسي' : 'Term',
      startDate: isAr ? 'تاريخ البداية' : 'Start Date',
      endDate: isAr ? 'تاريخ الانتهاء' : 'End Date',
      notes: isAr ? 'ملاحظات إضافية' : 'General Notes',
      subjectName: isAr ? 'اسم المادة' : 'Subject Name',
      subjectTeacher: isAr ? 'معلم المادة' : 'Subject Teacher',
      unitTitle: isAr ? 'عنوان الوحدة' : 'Unit Title',
      topicTitle: isAr ? 'عنوان الدرس' : 'Topic title...',
      objectiveTitle: isAr ? 'هدف تعليمي...' : 'Learning objective...',
    },
    terms: [
      { v: 'First Semester', l: isAr ? 'الفصل الدراسي الأول' : 'First Semester' },
      { v: 'Second Semester', l: isAr ? 'الفصل الدراسي الثاني' : 'Second Semester' },
      { v: 'Summer Term', l: isAr ? 'الفصل الصيفي' : 'Summer Term' },
    ]
  };

  const addSubject = () => {
    setPlan(prev => ({
      ...prev,
      subjects: [...prev.subjects, {
        id: Math.random().toString(36).substring(7),
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
      id: Math.random().toString(36).substring(7),
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
      id: Math.random().toString(36).substring(7),
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
        id: Math.random().toString(36).substring(7),
        title: '',
        status: 'not_started'
      }]
    }));
  };

  const removeObjective = (oIdx: number) => {
    const newObj = [...plan.objectives];
    newObj.splice(oIdx, 1);
    setPlan(p => ({ ...p, objectives: newObj }));
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

  if (!mounted || (loading && isEditMode)) return (
    <div className="p-20 text-center animate-pulse">
      <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-3xl shadow-premium border border-slate-100">
         <div className="flex items-center gap-6 text-start">
            <Button onClick={() => router.back()} variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary transition-all shadow-sm">
               {isAr ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
            </Button>
            <div className="space-y-1">
               <h1 className="text-xl md:text-3xl font-black text-primary uppercase tracking-tight leading-none">{t.title}</h1>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{t.subtitle}</p>
            </div>
         </div>
         <div className="flex items-center gap-3 w-full md:w-auto">
            <Button onClick={() => handleSavePlan('draft')} disabled={isSaving} variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest border-slate-200 text-slate-600 bg-white shadow-sm">
               {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2 text-secondary" />} {t.saveDraft}
            </Button>
         </div>
      </div>

      {/* Stepper Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {t.stages.map(s => (
           <button 
            key={s.id} 
            onClick={() => setStep(s.id)}
            className={cn(
              "flex items-center justify-center gap-3 p-5 rounded-2xl transition-all border-2",
              step === s.id ? "bg-primary border-primary text-white shadow-xl scale-[1.02]" : "bg-white border-slate-100 text-slate-400 hover:border-primary/20"
            )}
           >
              <s.icon className={cn("h-5 w-5", step === s.id ? "text-secondary" : "text-slate-200")} />
              <span className="font-black text-[11px] uppercase tracking-widest leading-none">{s.name}</span>
           </button>
         ))}
      </div>

      {/* Main Content Area */}
      <div className="min-h-[500px]">
        {step === 1 && (
          <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
           <CardHeader className="bg-slate-50/50 p-8 md:p-10 border-b border-slate-100">
              <div className="flex items-center gap-4 text-start">
                 <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg"><Info className="h-6 w-6" /></div>
                 <CardTitle className="text-xl font-black uppercase text-primary tracking-tight">{t.generalSettings}</CardTitle>
              </div>
           </CardHeader>
           <CardContent className="p-8 md:p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2 text-start">
                    <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2 px-1">
                      <FileText className="h-3.5 w-3.5 text-secondary" /> {t.fields.planName}
                    </Label>
                    <Input value={plan.name} onChange={(e) => setPlan({...plan, name: e.target.value})} className="h-14 bg-white border border-slate-200 rounded-xl font-bold focus:border-primary transition-all shadow-sm" />
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2 px-1">
                      <User className="h-3.5 w-3.5 text-secondary" /> {t.fields.teacher}
                    </Label>
                    <Input value={plan.responsibleTeacher} onChange={(e) => setPlan({...plan, responsibleTeacher: e.target.value})} className="h-14 bg-white border border-slate-200 rounded-xl font-bold focus:border-primary transition-all shadow-sm" />
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2 px-1">
                      <GraduationCap className="h-3.5 w-3.5 text-secondary" /> {t.fields.year}
                    </Label>
                    <Select value={plan.year} onValueChange={(v) => setPlan({...plan, year: v})}>
                       <SelectTrigger className="h-14 bg-white border border-slate-200 rounded-xl font-bold focus:border-primary transition-all shadow-sm"><SelectValue /></SelectTrigger>
                       <SelectContent className="rounded-xl">
                         <SelectItem value="2025-2026" className="font-bold py-3">2025-2026</SelectItem>
                         <SelectItem value="2026-2027" className="font-bold py-3">2026-2027</SelectItem>
                         <SelectItem value="2027-2028" className="font-bold py-3">2027-2028</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[11px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2 px-1">
                      <Star className="h-3.5 w-3.5 text-secondary" /> {t.fields.term}
                    </Label>
                    <Select value={plan.term} onValueChange={(v) => setPlan({...plan, term: v})}>
                       <SelectTrigger className="h-14 bg-white border border-slate-200 rounded-xl font-bold focus:border-primary transition-all shadow-sm"><SelectValue /></SelectTrigger>
                       <SelectContent className="rounded-xl">
                          {t.terms.map(term => (
                             <SelectItem key={term.v} value={term.v} className="font-bold py-3">{term.l}</SelectItem>
                          ))}
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                      <Calendar className="h-3.5 w-3.5 text-secondary" /> {t.fields.startDate}
                    </Label>
                    <Input type="date" value={plan.startDate} onChange={(e) => setPlan({...plan, startDate: e.target.value})} className="h-14 bg-white border border-slate-200 rounded-xl font-bold uppercase shadow-sm" />
                 </div>
                 <div className="space-y-2 text-start">
                    <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                      <Calendar className="h-3.5 w-3.5 text-secondary" /> {t.fields.endDate}
                    </Label>
                    <Input type="date" value={plan.endDate} onChange={(e) => setPlan({...plan, endDate: e.target.value})} className="h-14 bg-white border border-slate-200 rounded-xl font-bold uppercase shadow-sm" />
                 </div>
              </div>
              <div className="space-y-2 text-start">
                 <Label className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                   <ClipboardCheck className="h-3.5 w-3.5 text-secondary" /> {t.fields.notes}
                 </Label>
                 <Textarea value={plan.notes} onChange={(e) => setPlan({...plan, notes: e.target.value})} className="min-h-[120px] bg-white border border-slate-200 rounded-2xl p-6 font-bold shadow-sm" />
              </div>
           </CardContent>
        </Card>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2 text-start">
              <div className="space-y-1">
                 <h2 className="text-2xl font-black text-primary uppercase tracking-tight">{t.courseLoad}</h2>
                 <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t.courseLoadSub}</p>
              </div>
              <Button onClick={addSubject} className="w-full md:w-auto h-12 px-8 rounded-xl bg-secondary text-white font-black text-[11px] uppercase shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all active:scale-95">
                 <Plus className="h-4 w-4 mr-2" /> {isAr ? 'أضف مادة' : 'Add Subject'}
              </Button>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {plan.subjects.map((sub, sIdx) => (
                <Card key={sub.id} className="border-none shadow-premium rounded-2xl bg-white overflow-hidden border border-slate-100 group">
                   <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                         <div className="md:col-span-1 flex items-center justify-center">
                            <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-300 flex items-center justify-center font-black text-lg shadow-inner">{sIdx+1}</div>
                         </div>
                         <div className="md:col-span-5 space-y-2 text-start">
                            <Label className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                              <BookOpen className="h-3 w-3 text-secondary" /> {t.fields.subjectName}
                            </Label>
                            <Input value={sub.name} onChange={(e) => updateSubject(sIdx, 'name', e.target.value)} className="h-12 bg-white border border-slate-200 rounded-xl font-bold shadow-sm" />
                         </div>
                         <div className="md:col-span-4 space-y-2 text-start">
                            <Label className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                              <User className="h-3 w-3 text-secondary" /> {t.fields.subjectTeacher}
                            </Label>
                            <Input value={sub.teacher} onChange={(e) => updateSubject(sIdx, 'teacher', e.target.value)} className="h-12 bg-white border border-slate-200 rounded-xl font-bold shadow-sm" />
                         </div>
                         <div className="md:col-span-2 flex justify-end">
                            <Button onClick={() => removeSubject(sIdx)} variant="ghost" className="h-12 w-12 rounded-xl text-red-300 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 className="h-5 w-5" /></Button>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           {plan.subjects.map((sub, sIdx) => (
             <Card key={sub.id} className="border-none shadow-premium rounded-[2rem] bg-white overflow-hidden border border-slate-100">
                <CardHeader className="bg-primary p-6 md:p-8 text-white text-start relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><BookOpen className="h-32 w-32" /></div>
                   <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg"><Layers className="h-6 w-6" /></div>
                         <div>
                            <CardTitle className="text-lg font-black uppercase tracking-widest">{sub.name || (isAr ? 'مادة غير محددة' : 'Unnamed Subject')}</CardTitle>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">{sub.teacher || '-'}</p>
                         </div>
                      </div>
                      <Button onClick={() => addUnit(sIdx)} variant="outline" className="w-full md:w-auto h-10 border-white/40 text-white hover:bg-white hover:text-primary font-black text-[10px] uppercase tracking-widest bg-transparent">
                         <Plus className="h-4 w-4 mr-2" /> {isAr ? 'إضافة وحدة' : 'Add Unit'}
                      </Button>
                   </div>
                </CardHeader>
                <CardContent className="p-6 md:p-10 space-y-8">
                   {sub.units.map((unit: any, uIdx: number) => (
                     <div key={unit.id} className="bg-slate-50/50 p-6 md:p-8 rounded-2xl border border-slate-100 space-y-8 text-start relative group shadow-inner">
                        <Button onClick={() => removeUnit(sIdx, uIdx)} variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash className="h-4 w-4" /></Button>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                           <div className="flex-1 space-y-2 w-full">
                              <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 px-1">
                                <Star className="h-3 w-3 text-secondary" /> {isAr ? `الوحدة ${uIdx+1}` : `Unit ${uIdx+1}`}
                              </Label>
                              <Input value={unit.title} onChange={(e) => updateUnit(sIdx, uIdx, e.target.value)} className="h-12 bg-white border border-slate-200 rounded-xl font-bold shadow-sm" placeholder={t.fields.unitTitle} />
                           </div>
                           <Button onClick={() => addTopic(sIdx, uIdx)} className="w-full md:w-auto bg-secondary text-white font-black text-[10px] h-12 px-8 rounded-xl uppercase tracking-widest shadow-xl shadow-secondary/10 hover:bg-secondary/90 transition-all active:scale-95">
                             <Plus className="h-4 w-4 mr-2" /> {isAr ? 'أضف درساً' : 'Add Topic'}
                           </Button>
                        </div>
                        
                        <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4 border-slate-200/50", isAr ? "pr-4 md:pr-10 border-r-2" : "pl-4 md:pl-10 border-l-2")}>
                           {unit.topics.map((topic: any, tIdx: number) => (
                             <div key={topic.id} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm group/topic hover:border-secondary/30 transition-all">
                                <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-300 shadow-inner group-hover/topic:text-secondary group-hover/topic:bg-secondary/5 transition-all">{tIdx+1}</div>
                                <Input value={topic.title} onChange={(e) => updateTopic(sIdx, uIdx, tIdx, e.target.value)} className="h-10 border-none bg-transparent font-bold text-xs p-0 focus-visible:ring-0 flex-1" placeholder={t.fields.topicTitle} />
                                <button onClick={() => removeTopic(sIdx, uIdx, tIdx)} className="ml-auto text-slate-200 hover:text-red-400 opacity-0 group-hover/topic:opacity-100 transition-all"><X className="h-3.5 w-3.5" /></button>
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

        {step === 4 && (
          <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
           <CardHeader className="bg-slate-900 p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between text-start relative">
              <div className="absolute top-0 right-0 p-6 opacity-10"><Target className="h-48 w-48 text-secondary" /></div>
              <div className="flex items-center gap-6 relative z-10">
                 <div className="h-14 w-14 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg"><Target className="h-7 w-7" /></div>
                 <div className="space-y-1">
                   <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tight">{t.objectives}</CardTitle>
                   <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Define student learning outcomes</p>
                 </div>
              </div>
              <Button onClick={addObjective} className="w-full md:w-auto bg-secondary text-white hover:bg-white hover:text-secondary h-14 px-10 font-black text-[12px] uppercase shadow-2xl transition-all active:scale-95 mt-6 md:mt-0 relative z-10 border-none">
                 <Plus className="h-5 w-5 mr-3" /> {isAr ? 'تحديد هدف تعليمي' : 'Define Objective'}
              </Button>
           </CardHeader>
           <CardContent className="p-8 md:p-12 space-y-6">
              {plan.objectives.map((obj, oIdx) => (
                <div key={obj.id} className="flex gap-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 items-center group shadow-inner">
                   <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-300 text-sm shrink-0 shadow-sm group-hover:text-secondary group-hover:border-secondary/30 transition-all">{oIdx+1}</div>
                   <div className="flex-1 space-y-2 text-start">
                      <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                        <Target className="h-3 w-3 text-secondary/50" /> Objective Details
                      </Label>
                      <Input value={obj.title} onChange={(e) => {
                        const newObj = [...plan.objectives];
                        newObj[oIdx].title = e.target.value;
                        setPlan({...plan, objectives: newObj});
                      }} className="h-14 bg-white border border-slate-200 rounded-xl font-bold shadow-sm focus:border-secondary transition-all" placeholder={t.fields.objectiveTitle} />
                   </div>
                   <button onClick={() => removeObjective(oIdx)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="h-5 w-5" /></button>
                </div>
              ))}
           </CardContent>
        </Card>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 px-4 pt-12 border-t border-slate-100">
         {step > 1 ? (
           <Button onClick={() => setStep(step - 1)} variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl font-black text-[12px] uppercase tracking-widest text-slate-500 border-slate-200 hover:bg-slate-50 gap-3 shadow-sm transition-all active:scale-95 bg-white">
              {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />} {t.prev}
           </Button>
         ) : <div className="hidden sm:block" />}

         {step < 4 ? (
           <Button onClick={() => setStep(step + 1)} className="w-full sm:w-auto h-16 px-16 rounded-2xl bg-primary text-white font-black text-[12px] uppercase tracking-widest shadow-2xl shadow-primary/20 gap-4 group active:scale-95 transition-all">
              {t.next} {isAr ? <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" /> : <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />}
           </Button>
         ) : (
            <Button onClick={() => handleSavePlan('approved')} disabled={isSaving} className="w-full sm:w-auto h-16 px-16 rounded-2xl bg-secondary text-white font-black text-[14px] uppercase tracking-widest shadow-2xl shadow-secondary/20 gap-4 active:scale-95 transition-all hover:bg-secondary/90">
               {isSaving ? <Loader2 className="h-6 w-6 animate-spin" /> : <CheckCircle2 className="h-6 w-6" />}
               {t.approve}
            </Button>
         )}
      </div>

      <style jsx global>{`
        .shadow-premium {
          box-shadow: 0 10px 15px -3px rgba(11, 31, 91, 0.03), 0 4px 6px -4px rgba(11, 31, 91, 0.02);
        }
        input::placeholder {
          font-weight: 600;
          opacity: 0.3;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
