'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  BookOpen, Target, Plus, ChevronRight, ChevronLeft, 
  Save, Trash2, Layers, Info,
  ListTree, X, Loader2, Calendar, User, Type, FileText,
  Clock, CheckCircle2, GraduationCap, Star, ClipboardCheck,
  Languages, Search, Trash, Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function CreateAcademicPlanPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
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
  }, []);

  const t = {
    title: isAr ? 'مصمم الخطة الدراسية' : 'Plan Designer',
    subtitle: isAr ? 'تصميم مسار مخصص' : 'Custom Pathway Design',
    saveDraft: isAr ? 'حفظ مسودة' : 'Save Draft',
    approve: isAr ? 'نشر الخطة' : 'Release Plan',
    prev: isAr ? 'السابق' : 'Previous',
    next: isAr ? 'التالي' : 'Next',
    generalSettings: isAr ? 'الإعدادات العامة' : 'General Settings',
    courseLoad: isAr ? 'المقررات الدراسية' : 'Course Load',
    courseLoadSub: isAr ? 'أضف المواد التي سيدرسها الطالب' : 'Define subjects for this plan',
    unitsTopics: isAr ? 'الهيكلية التفصيلية' : 'Detailed Structure',
    objectives: isAr ? 'الأهداف التعليمية' : 'Learning Goals',
    stages: [
      { id: 1, name: isAr ? 'البيانات' : 'Info', icon: Info },
      { id: 2, name: isAr ? 'المواد' : 'Subjects', icon: BookOpen },
      { id: 3, name: isAr ? 'الهيكلية' : 'Structure', icon: ListTree },
      { id: 4, name: isAr ? 'الأهداف' : 'Goals', icon: Target },
    ],
    fields: {
      planName: isAr ? 'اسم الخطة (عربي/إنجليزي)' : 'Plan Name',
      teacher: isAr ? 'المعلم المسؤول' : 'Lead Teacher',
      year: isAr ? 'السنة الدراسية' : 'Year',
      term: isAr ? 'الفصل الدراسي' : 'Term',
      startDate: isAr ? 'البداية' : 'Start',
      endDate: isAr ? 'النهاية' : 'End',
      notes: isAr ? 'ملاحظات' : 'Notes',
      subjectNameAr: isAr ? 'اسم المادة (عربي)' : 'Subject (Arabic)',
      subjectNameEn: isAr ? 'اسم المادة (إنجليزي)' : 'Subject (English)',
      subjectTeacher: isAr ? 'المعلم' : 'Teacher',
      unitTitle: isAr ? 'عنوان الوحدة' : 'Unit Title',
      topicTitle: isAr ? 'عنوان الدرس' : 'Topic title',
      objectiveTitle: isAr ? 'الهدف التعليمي...' : 'Learning goal...',
    },
    terms: [
      { v: 'First Semester', l: isAr ? 'الفصل الأول' : '1st Term' },
      { v: 'Second Semester', l: isAr ? 'الفصل الثاني' : '2nd Term' },
      { v: 'Summer Term', l: isAr ? 'الفصل الصيفي' : 'Summer' },
    ]
  };

  const addSubject = () => {
    setPlan(prev => ({
      ...prev,
      subjects: [...prev.subjects, {
        id: Math.random().toString(36).substring(7),
        nameAr: '',
        nameEn: '',
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

  const handleSavePlan = async (status: string = 'draft') => {
    if (!firestore || !id) return;
    if (!plan.name) {
      toast({ variant: 'destructive', title: isAr ? 'أدخل اسم الخطة' : 'Plan name required' });
      return;
    }

    setIsSaving(true);
    try {
      const finalData = {
        ...plan,
        studentId: id,
        status: status,
        progress: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await addDoc(collection(firestore, 'academic_plans'), finalData);
      toast({ title: isAr ? 'تم الحفظ' : 'Saved' });
      router.push(`/${lang}/admin/students/${id}/plans`);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted) return (
    <div className="p-20 text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 px-4 sm:px-6">
      
      {/* 1. Slim Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-4 text-start">
            <Button onClick={() => router.back()} variant="ghost" size="icon" className="h-10 w-10 rounded-lg bg-slate-50 text-slate-400 hover:text-primary transition-all">
               {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <div className="space-y-0.5">
               <h1 className="text-xl font-black text-primary uppercase tracking-tight">{t.title}</h1>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.subtitle}</p>
            </div>
         </div>
         <div className="flex items-center gap-3 w-full md:w-auto">
            <Button onClick={() => handleSavePlan('draft')} disabled={isSaving} variant="outline" className="flex-1 md:flex-none h-11 px-6 rounded-lg font-black text-[10px] uppercase tracking-widest border-slate-200 text-slate-600 hover:bg-slate-50 transition-all bg-white">
               {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2 text-secondary" />} {t.saveDraft}
            </Button>
         </div>
      </div>

      {/* 2. Stepper Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
         {t.stages.map(s => (
           <button 
            key={s.id} 
            onClick={() => setStep(s.id)}
            className={cn(
              "flex items-center justify-center gap-3 p-4 rounded-xl transition-all border",
              step === s.id ? "bg-primary border-primary text-white shadow-lg" : "bg-white border-slate-200 text-slate-400 hover:border-primary/20"
            )}
           >
              <s.icon className={cn("h-4 w-4", step === s.id ? "text-secondary" : "text-slate-300")} />
              <span className="font-black text-[10px] uppercase tracking-widest">{s.name}</span>
           </button>
         ))}
      </div>

      {/* 3. Stage Content */}
      <div className="min-h-[400px]">
        {step === 1 && (
          <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100">
                <div className="flex items-center gap-3 text-start">
                  <div className="h-10 w-10 rounded-lg bg-secondary text-white flex items-center justify-center"><Info className="h-5 w-5" /></div>
                  <CardTitle className="text-base font-black uppercase text-primary tracking-tight">{t.generalSettings}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6 md:p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 text-start">
                      <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                        <FileText className="h-3.5 w-3.5 text-secondary" /> {t.fields.planName}
                      </Label>
                      <Input value={plan.name} onChange={(e) => setPlan({...plan, name: e.target.value})} className="h-12 bg-white border border-slate-200 rounded-lg font-bold" />
                  </div>
                  <div className="space-y-1.5 text-start">
                      <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                        <User className="h-3.5 w-3.5 text-secondary" /> {t.fields.teacher}
                      </Label>
                      <Input value={plan.responsibleTeacher} onChange={(e) => setPlan({...plan, responsibleTeacher: e.target.value})} className="h-12 bg-white border border-slate-200 rounded-lg font-bold" />
                  </div>
                  <div className="space-y-1.5 text-start">
                      <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                        <GraduationCap className="h-3.5 w-3.5 text-secondary" /> {t.fields.year}
                      </Label>
                      <Select value={plan.year} onValueChange={(v) => setPlan({...plan, year: v})}>
                        <SelectTrigger className="h-12 border-slate-200 font-bold"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="2025-2026" className="font-bold">2025-2026</SelectItem>
                          <SelectItem value="2026-2027" className="font-bold">2026-2027</SelectItem>
                          <SelectItem value="2027-2028" className="font-bold">2027-2028</SelectItem>
                        </SelectContent>
                      </Select>
                  </div>
                  <div className="space-y-1.5 text-start">
                      <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                        <Star className="h-3.5 w-3.5 text-secondary" /> {t.fields.term}
                      </Label>
                      <Select value={plan.term} onValueChange={(v) => setPlan({...plan, term: v})}>
                        <SelectTrigger className="h-12 border-slate-200 font-bold"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl">
                           {t.terms.map(term => (
                             <SelectItem key={term.v} value={term.v} className="font-bold">{term.l}</SelectItem>
                           ))}
                        </SelectContent>
                      </Select>
                  </div>
                  <div className="space-y-1.5 text-start">
                      <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                        <Calendar className="h-3.5 w-3.5 text-secondary" /> {t.fields.startDate}
                      </Label>
                      <Input type="date" value={plan.startDate} onChange={(e) => setPlan({...plan, startDate: e.target.value})} className="h-12 border-slate-200 font-bold" />
                  </div>
                  <div className="space-y-1.5 text-start">
                      <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                        <Calendar className="h-3.5 w-3.5 text-secondary" /> {t.fields.endDate}
                      </Label>
                      <Input type="date" value={plan.endDate} onChange={(e) => setPlan({...plan, endDate: e.target.value})} className="h-12 border-slate-200 font-bold" />
                  </div>
                </div>
                <div className="space-y-1.5 text-start">
                  <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                    <ClipboardCheck className="h-3.5 w-3.5 text-secondary" /> {t.fields.notes}
                  </Label>
                  <Textarea value={plan.notes} onChange={(e) => setPlan({...plan, notes: e.target.value})} className="min-h-[100px] border-slate-200 rounded-xl font-bold" />
                </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between gap-4 px-2 text-start">
                <div className="space-y-0.5">
                  <h2 className="text-lg font-black text-primary uppercase">{t.courseLoad}</h2>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.courseLoadSub}</p>
                </div>
                <Button onClick={addSubject} className="h-10 px-6 rounded-lg bg-secondary text-white font-black text-[10px] uppercase shadow-md transition-all active:scale-95">
                  <Plus className="h-4 w-4 mr-2" /> {isAr ? 'مادة جديدة' : 'New Subject'}
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {plan.subjects.map((sub, sIdx) => (
                  <Card key={sub.id} className="border border-slate-200 shadow-sm bg-white overflow-hidden p-6 group">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
                          <div className="md:col-span-1 flex items-center justify-center">
                              <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-100 text-slate-300 flex items-center justify-center font-black text-base">{sIdx+1}</div>
                          </div>
                          <div className="md:col-span-3 space-y-1.5 text-start">
                              <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                                <Globe className="h-3 w-3 text-secondary" /> {t.fields.subjectNameAr}
                              </Label>
                              <Input value={sub.nameAr} onChange={(e) => updateSubject(sIdx, 'nameAr', e.target.value)} className="h-11 border-slate-200 rounded-lg font-bold" />
                          </div>
                          <div className="md:col-span-3 space-y-1.5 text-start">
                              <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                                <Globe className="h-3 w-3 text-secondary" /> {t.fields.subjectNameEn}
                              </Label>
                              <Input value={sub.nameEn} onChange={(e) => updateSubject(sIdx, 'nameEn', e.target.value)} className="h-11 border-slate-200 rounded-lg font-bold" />
                          </div>
                          <div className="md:col-span-3 space-y-1.5 text-start">
                              <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                                <User className="h-3 w-3 text-secondary" /> {t.fields.subjectTeacher}
                              </Label>
                              <Input value={sub.teacher} onChange={(e) => updateSubject(sIdx, 'teacher', e.target.value)} className="h-11 border-slate-200 rounded-lg font-bold" />
                          </div>
                          <div className="md:col-span-2 flex justify-end">
                              <Button onClick={() => removeSubject(sIdx)} variant="ghost" className="h-10 w-10 text-red-300 hover:text-red-500 transition-all">
                                <Trash2 className="h-5 w-5" />
                              </Button>
                          </div>
                        </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {plan.subjects.map((sub, sIdx) => (
              <Card key={sub.id} className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-xl">
                  <CardHeader className="bg-primary p-5 text-white text-start relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-secondary text-white flex items-center justify-center shadow-lg"><Layers className="h-5 w-5" /></div>
                          <div>
                            <CardTitle className="text-sm font-black uppercase tracking-tight">{isAr ? (sub.nameAr || 'مادة بدون اسم') : (sub.nameEn || 'Unnamed')}</CardTitle>
                          </div>
                        </div>
                        <Button onClick={() => addUnit(sIdx)} variant="outline" className="h-9 border-white/20 text-white hover:bg-white hover:text-primary font-black text-[10px] uppercase">
                          <Plus className="h-3 w-3 mr-2" /> {isAr ? 'أضف وحدة' : 'Add Unit'}
                        </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 md:p-8 space-y-6">
                    {sub.units.map((unit: any, uIdx: number) => (
                      <div key={unit.id} className="bg-slate-50/50 p-5 rounded-xl border border-slate-200 space-y-5 text-start relative group">
                          <Button onClick={() => removeUnit(sIdx, uIdx)} variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                             <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="flex-1 space-y-1.5 w-full">
                                <Label className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-2">
                                  <Star className="h-3 w-3 text-secondary" /> {isAr ? `الوحدة ${uIdx+1}` : `Unit ${uIdx+1}`}
                                </Label>
                                <Input value={unit.title} onChange={(e) => updateUnit(sIdx, uIdx, e.target.value)} className="h-11 border-slate-200 rounded-lg font-bold" />
                            </div>
                            <Button onClick={() => addTopic(sIdx, uIdx)} className="h-10 px-6 rounded-lg bg-secondary text-white font-black text-[10px] uppercase transition-all shadow-md active:scale-95">
                              <Plus className="h-3 w-3 mr-2" /> {isAr ? 'أضف درساً' : 'Add Topic'}
                            </Button>
                          </div>
                          
                          <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3", isAr ? "pr-6 border-r-2" : "pl-6 border-l-2")}>
                            {unit.topics.map((topic: any, tIdx: number) => (
                              <div key={topic.id} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm group/topic transition-all">
                                  <div className="h-7 w-7 rounded bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-300">{tIdx+1}</div>
                                  <Input value={topic.title} onChange={(e) => updateTopic(sIdx, uIdx, tIdx, e.target.value)} className="h-8 border-none bg-transparent font-bold text-xs p-0 focus-visible:ring-0 flex-1" />
                                  <Button onClick={() => removeTopic(sIdx, uIdx, tIdx)} variant="ghost" size="icon" className="h-7 w-7 text-slate-200 hover:text-red-400 opacity-0 group-hover/topic:opacity-100 transition-all">
                                     <X className="h-4 w-4" />
                                  </Button>
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
          <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CardHeader className="bg-primary p-6 text-white flex flex-col md:flex-row items-center justify-between text-start gap-4">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-secondary text-white flex items-center justify-center shadow-lg"><Target className="h-5 w-5" /></div>
                  <CardTitle className="text-base font-black uppercase tracking-tight">{t.objectives}</CardTitle>
                </div>
                <Button onClick={addObjective} className="bg-secondary hover:bg-secondary/90 text-white h-11 px-8 font-black text-[10px] uppercase shadow-lg transition-all active:scale-95">
                  <Plus className="h-4 w-4 mr-2" /> {isAr ? 'إضافة هدف تعليمي' : 'Add Learning Objective'}
                </Button>
            </CardHeader>
            <CardContent className="p-6 md:p-10 space-y-4">
                {plan.objectives.map((obj, oIdx) => (
                  <div key={obj.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 items-center group">
                    <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-slate-300 text-xs shrink-0">{oIdx+1}</div>
                    <div className="flex-1 space-y-1 text-start">
                       <Label className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                         <Target className="h-3 w-3 text-secondary/50" /> {isAr ? 'وصف الهدف' : 'Objective Description'}
                       </Label>
                       <Input value={obj.title} onChange={(e) => {
                        const newObj = [...plan.objectives];
                        newObj[oIdx].title = e.target.value;
                        setPlan({...plan, objectives: newObj});
                      }} className="h-11 bg-white border-slate-200 rounded-lg font-bold" />
                    </div>
                    <Button onClick={() => removeObjective(oIdx)} variant="ghost" className="h-10 w-10 text-red-300 hover:text-red-500 transition-all self-end">
                       <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* 4. Navigation Buttons */}
      <div className="flex items-center justify-between gap-6 px-1 pt-8 border-t border-slate-200">
         {step > 1 ? (
           <Button onClick={() => setStep(step - 1)} variant="outline" className="h-14 px-10 rounded-xl font-black text-[11px] uppercase tracking-widest text-slate-500 border-slate-200 hover:bg-slate-50 gap-2">
              {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />} {t.prev}
           </Button>
         ) : <div />}

         {step < 4 ? (
           <Button onClick={() => setStep(step + 1)} className="h-14 px-12 rounded-xl bg-primary text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-primary/10 gap-2 group active:scale-95">
              {t.next} {isAr ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
           </Button>
         ) : (
            <Button onClick={() => handleSavePlan('approved')} disabled={isSaving} className="h-14 px-12 rounded-xl bg-secondary text-white font-black text-[11px] uppercase tracking-widest shadow-xl transition-all hover:bg-secondary/90">
               {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <CheckCircle2 className="h-5 w-5 mr-2" />}
               {t.approve}
            </Button>
         )}
      </div>
    </div>
  );
}
