
'use client';

import { use, useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc, useCollection, useUser } from '@/firebase';
import { 
  doc, 
  collection, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ClipboardCheck, 
  User, 
  Users,
  CreditCard, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Star,
  Award, 
  Trash2, 
  Edit3, 
  Save,
  Calendar,
  X,
  TrendingUp,
  Info,
  Layers,
  Loader2,
  FileText,
  Trophy,
  Columns,
  Check,
  AlertTriangle,
  FileSpreadsheet,
  BadgeCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function StudentGradesIndividualPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editGrade, setEditGrade] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['subject', 'assessment', 'score', 'percent', 'grade', 'date']);

  const [formData, setFormData] = useState({
    planId: '',
    subject: '',
    assessmentName: '',
    score: '',
    totalScore: '100',
    date: new Date().toISOString().split('T')[0]
  });

  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading: studentLoading } = useDoc(studentRef);

  const plansQuery = useMemo(() => {
    if (!firestore || !id) return null;
    return query(collection(firestore, 'academic_plans'), where('studentId', '==', id));
  }, [firestore, id]);
  const { data: plans, loading: plansLoading } = useCollection(plansQuery);

  const gradesQuery = useMemo(() => {
    if (!firestore || !id) return null;
    return query(collection(firestore, 'grades'), where('studentId', '==', id));
  }, [firestore, id]);
  const { data: rawGrades, loading: gradesLoading } = useCollection(gradesQuery);

  const selectedPlanForForm = useMemo(() => {
    return plans.find(p => p.id === formData.planId);
  }, [plans, formData.planId]);

  const availableSubjects = useMemo(() => {
    return selectedPlanForForm?.subjects || [];
  }, [selectedPlanForForm]);

  const getLetterGrade = (percent: number) => {
    if (percent >= 90) return 'A';
    if (percent >= 80) return 'B';
    if (percent >= 70) return 'C';
    if (percent >= 60) return 'D';
    return 'F';
  };

  const t = {
    title: isAr ? 'سجل الدرجات والتقييمات' : 'Academic Grade Registry',
    back: isAr ? 'العودة' : 'Back',
    addGrade: isAr ? 'رصد درجة جديدة' : 'Record New Grade',
    editGrade: isAr ? 'تعديل السجل' : 'Edit Record',
    save: isAr ? 'حفظ البيانات' : 'Save Record',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    confirmDelete: isAr ? 'تأكيد الحذف النهائي' : 'Confirm Permanent Deletion',
    deleteDesc: isAr ? 'سيتم حذف هذا السجل نهائياً من قاعدة البيانات. لا يمكن التراجع عن هذا الإجراء.' : 'This entry will be permanently removed from the database. This cannot be undone.',
    stats: {
      avg: isAr ? 'المعدل التراكمي' : 'Overall GPA',
      total: isAr ? 'إجمالي التقييمات' : 'Total Assessments',
      high: isAr ? 'أعلى نتيجة' : 'Peak Performance'
    },
    fields: {
      plan: isAr ? 'الخطة الدراسية (الترم)' : 'Academic Plan (Term)',
      subject: isAr ? 'المادة الدراسية' : 'Academic Subject',
      assessment: isAr ? 'نوع التقييم' : 'Assessment Type',
      score: isAr ? 'الدرجة' : 'Score',
      total: isAr ? 'الدرجة الكلية' : 'Total Score',
      date: isAr ? 'التاريخ' : 'Date'
    },
    table: {
      columns: isAr ? 'الأعمدة' : 'Columns',
      subject: isAr ? 'المادة' : 'Subject',
      assessment: isAr ? 'التقييم' : 'Assessment',
      result: isAr ? 'النتيجة' : 'Result',
      percent: isAr ? 'النسبة' : 'Percent',
      grade: isAr ? 'التقدير' : 'Grade',
      date: isAr ? 'التاريخ' : 'Date',
      actions: isAr ? 'إجراءات' : 'Actions'
    },
    nav: {
      profile: isAr ? 'الهوية' : 'Identity',
      guardians: isAr ? 'أولياء الأمور' : 'Guardians',
      documents: isAr ? 'المستندات' : 'Documents',
      academic: isAr ? 'خطة الطالب' : 'Study Plan',
      grades: isAr ? 'الدرجات' : 'Grades',
      finances: isAr ? 'المالية' : 'Finances'
    },
    assessmentTypes: [
      { v: 'Monthly Exam', l: isAr ? 'اختبار شهري' : 'Monthly Exam' },
      { v: 'Midterm Exam', l: isAr ? 'اختبار منتصف الفصل' : 'Midterm Exam' },
      { v: 'Final Exam', l: isAr ? 'الاختبار النهائي' : 'Final Exam' },
      { v: 'Assignment', l: isAr ? 'واجب / مشروع' : 'Assignment' },
      { v: 'Oral Test', l: isAr ? 'اختبار شفوي' : 'Oral Test' },
    ]
  };

  const groupedGrades = useMemo(() => {
    const groups: Record<string, any[]> = {};
    rawGrades.forEach((g: any) => {
      if (!groups[g.planId]) groups[g.planId] = [];
      groups[g.planId].push(g);
    });
    return groups;
  }, [rawGrades]);

  const stats = useMemo(() => {
    if (!rawGrades.length) return { avg: 0, total: 0, high: 0 };
    const totalPct = rawGrades.reduce((acc, curr) => acc + (Number(curr.score) / Number(curr.totalScore)) * 100, 0);
    const avg = Math.round(totalPct / rawGrades.length);
    const high = Math.max(...rawGrades.map(g => (Number(g.score) / Number(g.totalScore)) * 100));
    return { avg, total: rawGrades.length, high: Math.round(high) };
  }, [rawGrades]);

  const handleSave = async () => {
    if (!firestore || !id || !formData.planId) return;
    setIsProcessing(true);
    const selectedPlan = plans.find(p => p.id === formData.planId);
    const data = { 
      ...formData, 
      studentId: id, 
      planName: selectedPlan?.name,
      term: selectedPlan?.term,
      updatedAt: serverTimestamp() 
    };
    try {
      if (editGrade) {
        await updateDoc(doc(firestore, 'grades', editGrade.id), data);
      } else {
        await addDoc(collection(firestore, 'grades'), { ...data, createdAt: serverTimestamp() });
      }
      setIsAddOpen(false);
      setEditGrade(null);
      setFormData({ planId: '', subject: '', assessmentName: '', score: '', totalScore: '100', date: new Date().toISOString().split('T')[0] });
      toast({ title: isAr ? "تم الحفظ بنجاح" : "Saved Successfully" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!firestore || !deleteId) return;
    try {
      await deleteDoc(doc(firestore, 'grades', deleteId));
      toast({ title: isAr ? "تم الحذف" : "Deleted" });
      setDeleteId(null);
    } catch (e) {
      toast({ variant: 'destructive', title: "Delete failed" });
    }
  };

  const toggleColumn = (col: string) => {
    setVisibleColumns(prev => prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]);
  };

  if (studentLoading) return <div className="p-20 text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 animate-in fade-in duration-500">
      
      {/* 1. Integrated Navigation */}
      <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar bg-white/50 p-1 rounded-xl shadow-sm">
         {[
           { id: 'profile', label: t.nav.profile, icon: User, href: `/${lang}/admin/students/${id}` },
           { id: 'guardians', label: t.nav.guardians, icon: Users, href: `/${lang}/admin/students/${id}/guardians` },
           { id: 'documents', label: t.nav.documents, icon: FileText, href: `/${lang}/admin/students/${id}/documents` },
           { id: 'academic', label: t.nav.academic, icon: BookOpen, href: `/${lang}/admin/students/${id}/plans` },
           { id: 'grades', label: t.nav.grades, icon: ClipboardCheck, href: `/${lang}/admin/students/${id}/grades` },
           { id: 'finances', label: t.nav.finances, icon: CreditCard, href: `/${lang}/admin/students/${id}/finances` },
         ].map(nav => (
           <Link key={nav.id} href={nav.href} className={cn(
             "px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg whitespace-nowrap flex items-center gap-2",
             pathname === nav.href ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-primary hover:bg-slate-50"
           )}>
              <nav.icon className="h-3.5 w-3.5" />
              {nav.label}
           </Link>
         ))}
      </div>

      {/* 2. Header & Quick Stats */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-5 text-start w-full lg:w-auto">
            <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl"><Trophy className="h-7 w-7 text-secondary" /></div>
            <div>
               <h1 className="text-2xl font-black text-primary uppercase tracking-tight">{t.title} — {student?.firstName}</h1>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Matrix & Report Card Data</p>
            </div>
         </div>
         <div className="flex items-center gap-3 w-full lg:w-auto">
            <Dialog open={isAddOpen} onOpenChange={(v) => { setIsAddOpen(v); if(!v) setEditGrade(null); }}>
              <DialogTrigger asChild>
                <Button className="h-12 px-8 rounded-xl bg-secondary text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-secondary/20 w-full lg:w-auto">
                   <Plus className="h-4 w-4 mr-2" /> {t.addGrade}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl rounded-2xl border-none shadow-2xl p-0 overflow-hidden">
                <div className="bg-primary p-8 text-white flex items-center gap-4">
                   <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shadow-lg"><ClipboardCheck className="h-6 w-6" /></div>
                   <DialogTitle className="text-xl font-black uppercase tracking-tight">{editGrade ? t.editGrade : t.addGrade}</DialogTitle>
                </div>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">{t.fields.plan}</Label>
                        <Select value={formData.planId} onValueChange={(v) => setFormData({...formData, planId: v, subject: ''})}>
                           <SelectTrigger className="h-12 border-slate-200 rounded-xl font-bold bg-white">
                              <SelectValue placeholder="..." />
                           </SelectTrigger>
                           <SelectContent>
                              {plans.map(p => <SelectItem key={p.id} value={p.id} className="font-bold py-3">{p.name} ({p.term})</SelectItem>)}
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">{t.fields.subject}</Label>
                        <Select disabled={!formData.planId} value={formData.subject} onValueChange={(v) => setFormData({...formData, subject: v})}>
                           <SelectTrigger className="h-12 border-slate-200 rounded-xl font-bold bg-white">
                              <SelectValue placeholder="..." />
                           </SelectTrigger>
                           <SelectContent>
                              {availableSubjects.map((s: any, idx: number) => (
                                <SelectItem key={idx} value={s.nameEn || s.nameAr} className="font-bold py-3">
                                   {isAr ? (s.nameAr || s.nameEn) : (s.nameEn || s.nameAr)}
                                </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">{t.fields.assessment}</Label>
                        <Select value={formData.assessmentName} onValueChange={(v) => setFormData({...formData, assessmentName: v})}>
                           <SelectTrigger className="h-12 border-slate-200 rounded-xl font-bold bg-white">
                              <SelectValue placeholder="..." />
                           </SelectTrigger>
                           <SelectContent>
                              {t.assessmentTypes.map(at => <SelectItem key={at.v} value={at.v} className="font-bold py-3">{at.l}</SelectItem>)}
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">{t.fields.date}</Label>
                        <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="h-12 border-slate-200 rounded-xl font-bold" />
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">{t.fields.score}</Label>
                        <Input type="number" value={formData.score} onChange={(e) => setFormData({...formData, score: e.target.value})} className="h-12 border-slate-200 rounded-xl font-bold" />
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400">{t.fields.total}</Label>
                        <Input type="number" value={formData.totalScore} onChange={(e) => setFormData({...formData, totalScore: e.target.value})} className="h-12 border-slate-200 rounded-xl font-bold" />
                     </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-8 border-t">
                     <Button variant="ghost" onClick={() => setIsAddOpen(false)} className="font-black text-[10px] uppercase tracking-widest text-slate-400">{t.cancel}</Button>
                     <Button onClick={handleSave} disabled={isProcessing} className="h-12 px-10 rounded-xl bg-primary text-white font-black text-[10px] uppercase shadow-xl">
                        {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2 text-secondary" />} {t.save}
                     </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
         </div>
      </div>

      {/* 3. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border border-slate-200 shadow-sm bg-white p-6 flex flex-col items-center text-center space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Star className="h-16 w-16" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.stats.avg}</p>
            <h3 className="text-4xl font-black text-primary tracking-tighter">{stats.avg}%</h3>
         </Card>
         <Card className="border border-slate-200 shadow-sm bg-white p-6 flex flex-col items-center text-center space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><ClipboardCheck className="h-16 w-16" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.stats.total}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stats.total}</h3>
         </Card>
         <Card className="border border-slate-200 shadow-sm bg-primary text-white p-6 flex flex-col items-center text-center space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><BadgeCheck className="h-16 w-16 text-secondary" /></div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{t.stats.high}</p>
            <h3 className="text-4xl font-black text-white tracking-tighter">{stats.high}%</h3>
         </Card>
      </div>

      {/* 4. Plan-Based Grade Tables */}
      <div className="space-y-12">
        {plans.map(plan => {
          const planGrades = groupedGrades[plan.id] || [];
          return (
            <Card key={plan.id} className="border border-slate-200 shadow-premium rounded-[2rem] overflow-hidden bg-white">
               <CardHeader className="bg-slate-50/80 p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-start">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 shadow-inner"><FileSpreadsheet className="h-6 w-6" /></div>
                     <div>
                        <CardTitle className="text-xl font-black uppercase text-primary tracking-tight">{plan.name}</CardTitle>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{plan.year} • {plan.term}</p>
                     </div>
                  </div>
                  
                  {/* Column Toggle Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-10 px-6 rounded-lg border-slate-200 text-slate-500 font-black text-[10px] uppercase gap-2">
                        <Columns className="h-4 w-4" /> {t.table.columns}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-2xl border-slate-100 p-2">
                      <DropdownMenuLabel className="text-[10px] font-black text-slate-400 uppercase">{isAr ? 'إظهار / إخفاء' : 'Show/Hide Columns'}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {Object.keys(t.table).filter(k => k !== 'columns' && k !== 'actions').map(col => (
                        <DropdownMenuCheckboxItem
                          key={col}
                          checked={visibleColumns.includes(col)}
                          onCheckedChange={() => toggleColumn(col)}
                          className="rounded-lg font-bold text-xs py-2.5"
                        >
                          {t.table[col as keyof typeof t.table]}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
               </CardHeader>

               <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                     <thead>
                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                           {visibleColumns.includes('subject') && <th className="px-8 py-5 text-start w-1/4">{t.table.subject}</th>}
                           {visibleColumns.includes('assessment') && <th className="px-8 py-5 text-start">{t.table.assessment}</th>}
                           {visibleColumns.includes('result') && <th className="px-8 py-5 text-center">{t.table.result}</th>}
                           {visibleColumns.includes('percent') && <th className="px-8 py-5 text-center">{t.table.percent}</th>}
                           {visibleColumns.includes('grade') && <th className="px-8 py-5 text-center">{t.table.grade}</th>}
                           {visibleColumns.includes('date') && <th className="px-8 py-5 text-center">{t.table.date}</th>}
                           <th className="px-8 py-5 text-right w-32"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {planGrades.length === 0 ? (
                          <tr>
                             <td colSpan={visibleColumns.length + 1} className="py-20 text-center">
                                <Info className="h-10 w-10 text-slate-100 mx-auto mb-4" />
                                <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'لا توجد درجات مرصودة لهذه الخطة بعد' : 'No grades recorded for this plan'}</p>
                             </td>
                          </tr>
                        ) : planGrades.map((g: any) => {
                          const pct = Math.round((Number(g.score) / Number(g.totalScore)) * 100);
                          const letterGrade = getLetterGrade(pct);
                          
                          return (
                            <tr key={g.id} className="hover:bg-slate-50/50 transition-colors group">
                               {visibleColumns.includes('subject') && (
                                 <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                       <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-lg group-hover:scale-110 transition-transform">{g.subject?.charAt(0).toUpperCase()}</div>
                                       <span className="font-black text-slate-900 uppercase text-sm">{g.subject}</span>
                                    </div>
                                 </td>
                               )}
                               {visibleColumns.includes('assessment') && (
                                 <td className="px-8 py-6 text-sm font-bold text-slate-600">{g.assessmentName}</td>
                               )}
                               {visibleColumns.includes('result') && (
                                 <td className="px-8 py-6 text-center font-mono font-black text-primary text-lg">
                                    {g.score} <span className="text-[10px] text-slate-300 font-bold">/ {g.totalScore}</span>
                                 </td>
                               )}
                               {visibleColumns.includes('percent') && (
                                 <td className="px-8 py-6 text-center">
                                    <div className="inline-flex items-center gap-2">
                                       <span className="text-sm font-black text-slate-900">{pct}%</span>
                                       <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                          <div className={cn("h-full", pct >= 90 ? "bg-green-500" : pct >= 70 ? "bg-blue-500" : "bg-red-500")} style={{ width: `${pct}%` }} />
                                       </div>
                                    </div>
                                 </td>
                               )}
                               {visibleColumns.includes('grade') && (
                                 <td className="px-8 py-6 text-center">
                                    <Badge className={cn(
                                       "h-8 w-8 rounded-lg flex items-center justify-center border-none font-black text-sm p-0 shadow-sm",
                                       letterGrade === 'A' ? "bg-green-100 text-green-700" : 
                                       letterGrade === 'B' ? "bg-blue-100 text-blue-700" :
                                       letterGrade === 'C' ? "bg-amber-100 text-amber-700" :
                                       "bg-red-50 text-red-600"
                                    )}>
                                       {letterGrade}
                                    </Badge>
                                 </td>
                               )}
                               {visibleColumns.includes('date') && (
                                 <td className="px-8 py-6 text-center">
                                    <span className="text-[10px] font-black text-slate-400 flex items-center justify-center gap-2">
                                       <Calendar className="h-3 w-3 text-secondary" /> {g.date}
                                    </span>
                                 </td>
                               )}
                               <td className="px-8 py-6 text-right">
                                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <Button onClick={() => { setEditGrade(g); setFormData({...g}); setIsAddOpen(true); }} size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-primary transition-all"><Edit3 className="h-4 w-4" /></Button>
                                     <Button onClick={() => setDeleteId(g.id)} size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-red-500 transition-all"><Trash2 className="h-4 w-4" /></Button>
                                  </div>
                               </td>
                            </tr>
                          );
                        })}
                     </tbody>
                  </table>
               </div>
            </Card>
          );
        })}
      </div>

      <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex items-start gap-6 shadow-sm mx-2">
         <Info className="h-6 w-6 text-blue-600 shrink-0 mt-1 opacity-60" />
         <p className="text-xs font-bold text-blue-900/60 leading-relaxed italic text-start">
            {isAr 
              ? 'تستخدم هذه الجداول كمرجع أساسي لإصدار التقارير الأكاديمية والشهادات. يتم حساب التقديرات تلقائياً لضمان الدقة وتوفير سجل أكاديمي شامل للطالب.' 
              : 'These tables serve as the primary reference for academic reports and certificates. Grades are calculated automatically to ensure accuracy and maintain a comprehensive academic record.'}
         </p>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent className="max-w-md rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
          <div className="bg-red-500 p-10 text-white flex flex-col items-center gap-4 text-center">
             <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl">
                <AlertTriangle className="h-8 w-8 text-white" />
             </div>
             <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight">{t.confirmDelete}</AlertDialogTitle>
          </div>
          <div className="p-10 space-y-8 text-center">
            <AlertDialogDescription className="text-slate-600 font-bold text-base leading-relaxed">
               {t.deleteDesc}
            </AlertDialogDescription>
            <div className="flex flex-col gap-3">
              <Button onClick={handleDelete} className="h-14 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 hover:bg-red-700">
                {isAr ? 'حذف السجل الآن' : 'Yes, Delete Record'}
              </Button>
              <Button variant="ghost" onClick={() => setDeleteId(null)} className="h-14 rounded-xl font-black text-slate-400 uppercase tracking-widest">
                {t.cancel}
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .shadow-premium {
          box-shadow: 0 10px 15px -3px rgba(11, 31, 91, 0.03), 0 4px 6px -4px rgba(11, 31, 91, 0.02);
        }
      `}</style>
    </div>
  );
}
