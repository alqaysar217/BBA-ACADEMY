
'use client';

import { use, useState, useMemo } from 'react';
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
  Globe,
  MapPin,
  Trophy
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

  // Fetch all academic plans for this student
  const plansQuery = useMemo(() => {
    if (!firestore || !id) return null;
    return query(collection(firestore, 'academic_plans'), where('studentId', '==', id));
  }, [firestore, id]);
  const { data: plans, loading: plansLoading } = useCollection(plansQuery);

  const selectedPlan = useMemo(() => {
    return plans.find(p => p.id === formData.planId);
  }, [plans, formData.planId]);

  const availableSubjects = useMemo(() => {
    return selectedPlan?.subjects || [];
  }, [selectedPlan]);

  const assessmentTypes = [
    { v: 'Monthly Exam', l: isAr ? 'اختبار شهري' : 'Monthly Exam' },
    { v: 'Midterm Exam', l: isAr ? 'اختبار منتصف الفصل' : 'Midterm Exam' },
    { v: 'Final Exam', l: isAr ? 'الاختبار النهائي' : 'Final Exam' },
    { v: '1st Semester Assessment', l: isAr ? 'تقييم الفصل الدراسي الأول' : '1st Semester Assessment' },
    { v: '2nd Semester Assessment', l: isAr ? 'تقييم الفصل الدراسي الثاني' : '2nd Semester Assessment' },
    { v: 'Summer Program', l: isAr ? 'تقييم الدورة الصيفية' : 'Summer Program' },
    { v: 'Project/Assignment', l: isAr ? 'مشروع / واجب' : 'Project / Assignment' },
  ];

  const gradesQuery = useMemo(() => {
    if (!firestore || !id) return null;
    return query(collection(firestore, 'grades'), where('studentId', '==', id));
  }, [firestore, id]);
  const { data: rawGrades, loading: gradesLoading } = useCollection(gradesQuery);

  const grades = useMemo(() => {
    if (!rawGrades) return [];
    return [...rawGrades].sort((a: any, b: any) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    });
  }, [rawGrades]);

  const stats = useMemo(() => {
    if (!grades || grades.length === 0) return { avg: 0, total: 0, high: 0 };
    const validGrades = grades.filter(g => !isNaN(Number(g.score)) && !isNaN(Number(g.totalScore)));
    const totalScore = validGrades.reduce((acc, curr) => acc + (Number(curr.score) / Number(curr.totalScore)) * 100, 0);
    const avg = validGrades.length > 0 ? Math.round(totalScore / validGrades.length) : 0;
    const high = Math.max(...validGrades.map(g => (Number(g.score) / Number(g.totalScore)) * 100), 0);
    return { avg, total: grades.length, high: Math.round(high) };
  }, [grades]);

  const t = {
    title: isAr ? 'سجل الدرجات والتقييمات' : 'Academic Grade Registry',
    back: isAr ? 'العودة' : 'Back',
    addGrade: isAr ? 'رصد درجة' : 'Record Grade',
    editGrade: isAr ? 'تعديل الدرجة' : 'Edit Grade',
    save: isAr ? 'حفظ البيانات' : 'Save Record',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    confirmDelete: isAr ? 'هل أنت متأكد من الحذف؟' : 'Confirm Deletion',
    deleteDesc: isAr ? 'سيتم حذف هذا التقييم نهائياً من سجل الطالب.' : 'This assessment will be permanently removed.',
    stats: {
      avg: isAr ? 'المعدل العام' : 'Overall Average',
      total: isAr ? 'إجمالي التقييمات' : 'Total Assessments',
      high: isAr ? 'أعلى درجة' : 'Highest Score'
    },
    fields: {
      plan: isAr ? 'الخطة الدراسية / الترم' : 'Academic Plan / Term',
      subject: isAr ? 'المادة الدراسية' : 'Subject',
      assessment: isAr ? 'نوع التقييم' : 'Assessment Type',
      score: isAr ? 'الدرجة المحققة' : 'Score Obtained',
      total: isAr ? 'الدرجة الكلية' : 'Total Possible',
      date: isAr ? 'تاريخ التقييم' : 'Assessment Date'
    },
    table: {
      subject: isAr ? 'المادة' : 'Subject',
      assessment: isAr ? 'التقييم' : 'Assessment',
      result: isAr ? 'النتيجة' : 'Result',
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
    }
  };

  const handleSave = async () => {
    if (!firestore || !id || !selectedPlan) return;
    if (!formData.planId || !formData.subject || !formData.assessmentName || !formData.score) {
      toast({ variant: 'destructive', title: isAr ? 'يرجى ملء الحقول' : 'Please fill all fields' });
      return;
    }
    setIsProcessing(true);
    const data = { 
      ...formData, 
      studentId: id, 
      term: selectedPlan.term,
      year: selectedPlan.year,
      planName: selectedPlan.name,
      updatedAt: serverTimestamp(), 
      createdBy: user?.email || 'admin' 
    };
    try {
      if (editGrade) {
        await updateDoc(doc(firestore, 'grades', editGrade.id), data);
        toast({ title: isAr ? 'تم تحديث السجل' : 'Record updated' });
      } else {
        await addDoc(collection(firestore, 'grades'), { ...data, createdAt: serverTimestamp() });
        toast({ title: isAr ? 'تم رصد الدرجة بنجاح' : 'Grade recorded successfully' });
      }
      setIsAddOpen(false);
      setEditGrade(null);
      setFormData({ planId: '', subject: '', assessmentName: '', score: '', totalScore: '100', date: new Date().toISOString().split('T')[0] });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!firestore || !deleteId) return;
    try {
      await deleteDoc(doc(firestore, 'grades', deleteId));
      toast({ title: isAr ? 'تم الحذف' : 'Deleted' });
    } finally {
      setDeleteId(null);
    }
  };

  if (studentLoading || !student) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 animate-in fade-in duration-700">
      
      {/* 1. Navigation Menu */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar bg-white p-1 rounded-xl shadow-sm">
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

      {/* 2. Header & Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-5 text-start w-full md:w-auto">
            <Button onClick={() => router.back()} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100">
              <ChevronLeft className={cn("h-5 w-5", isAr && "rotate-180")} />
            </Button>
            <div className="space-y-0.5">
               <h1 className="text-xl md:text-2xl font-black text-primary uppercase tracking-tight">{t.title} — {student.firstName}</h1>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Achievement Matrix</p>
            </div>
         </div>
         <Dialog open={isAddOpen} onOpenChange={(v) => { setIsAddOpen(v); if(!v) setEditGrade(null); }}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto h-12 px-8 rounded-xl bg-secondary text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-secondary/20">
                 <Plus className="h-4 w-4 mr-2" /> {t.addGrade}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-2xl border-none shadow-2xl p-0 overflow-hidden">
               <div className="bg-primary p-8 text-white flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shadow-lg"><Trophy className="h-6 w-6" /></div>
                  <DialogTitle className="text-xl font-black uppercase tracking-tight">{editGrade ? t.editGrade : t.addGrade}</DialogTitle>
               </div>
               <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* Step 1: Select Plan */}
                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <Layers className="h-3 w-3 text-secondary" /> {t.fields.plan}
                        </Label>
                        <Select value={formData.planId} onValueChange={(v) => setFormData({...formData, planId: v, subject: ''})}>
                           <SelectTrigger className="h-12 border border-slate-200 rounded-xl font-bold bg-white">
                              <SelectValue placeholder={isAr ? 'اختر الخطة' : 'Select Plan'} />
                           </SelectTrigger>
                           <SelectContent className="max-h-[250px]">
                              {plans.map((p: any) => (
                                <SelectItem key={p.id} value={p.id} className="font-bold py-3">
                                  {p.name} ({p.term})
                                </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     {/* Step 2: Select Subject from Plan */}
                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <BookOpen className="h-3 w-3 text-secondary" /> {t.fields.subject}
                        </Label>
                        <Select disabled={!formData.planId} value={formData.subject} onValueChange={(v) => setFormData({...formData, subject: v})}>
                           <SelectTrigger className="h-12 border border-slate-200 rounded-xl font-bold bg-white">
                              <SelectValue placeholder={isAr ? 'اختر المادة' : 'Select Subject'} />
                           </SelectTrigger>
                           <SelectContent className="max-h-[250px]">
                              {availableSubjects.map((sub: any, i: number) => (
                                <SelectItem key={i} value={sub.nameEn || sub.nameAr} className="font-bold py-3">
                                  {isAr ? (sub.nameAr || sub.nameEn) : (sub.nameEn || sub.nameAr)}
                                </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <Award className="h-3 w-3 text-secondary" /> {t.fields.assessment}
                        </Label>
                        <Select value={formData.assessmentName} onValueChange={(v) => setFormData({...formData, assessmentName: v})}>
                           <SelectTrigger className="h-12 border border-slate-200 rounded-xl font-bold bg-white">
                              <SelectValue placeholder="..." />
                           </SelectTrigger>
                           <SelectContent>
                              {assessmentTypes.map(type => (
                                <SelectItem key={type.v} value={type.v} className="font-bold py-3">{type.l}</SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <Calendar className="h-3 w-3 text-secondary" /> {t.fields.date}
                        </Label>
                        <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="h-12 border border-slate-200 rounded-xl font-bold uppercase" />
                     </div>

                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500">{t.fields.score}</Label>
                        <Input type="number" value={formData.score} onChange={(e) => setFormData({...formData, score: e.target.value})} className="h-12 border border-slate-200 rounded-xl font-bold" />
                     </div>
                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500">{t.fields.total}</Label>
                        <Input type="number" value={formData.totalScore} onChange={(e) => setFormData({...formData, totalScore: e.target.value})} className="h-12 border border-slate-200 rounded-xl font-bold" />
                     </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t">
                     <Button variant="ghost" onClick={() => setIsAddOpen(false)} className="h-12 px-6 rounded-xl font-black text-[10px] uppercase text-slate-400">{t.cancel}</Button>
                     <Button onClick={handleSave} disabled={isProcessing} className="h-12 px-10 rounded-xl bg-primary text-white font-black text-[10px] uppercase shadow-xl">
                        {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2 text-secondary" />} {t.save}
                     </Button>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </div>

      {/* 3. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         <Card className="border border-slate-200 bg-white p-6 space-y-4 text-start relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Award className="h-20 w-20" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.stats.avg}</p>
            <h3 className="text-4xl font-black text-primary tracking-tighter relative z-10">{stats.avg}%</h3>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-secondary transition-all duration-1000" style={{ width: `${stats.avg}%` }} />
            </div>
         </Card>
         <Card className="border border-slate-200 bg-white p-6 space-y-4 text-start relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><ClipboardCheck className="h-20 w-20" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.stats.total}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter relative z-10">{stats.total}</h3>
            <p className="text-[9px] font-bold text-slate-300 uppercase">Assessment items</p>
         </Card>
         <Card className="border border-slate-200 bg-primary p-6 space-y-4 text-start relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Star className="h-20 w-20 text-secondary" /></div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t.stats.high}</p>
            <h3 className="text-4xl font-black text-white tracking-tighter relative z-10">{stats.high}%</h3>
            <p className="text-[9px] font-bold text-secondary uppercase">Peak Result</p>
         </Card>
      </div>

      {/* 4. Grade Roster Table */}
      <Card className="border border-slate-200 bg-white shadow-premium rounded-2xl overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
               <thead>
                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                     <th className="px-10 py-6 text-start">{t.table.subject}</th>
                     <th className="px-10 py-6 text-start">{t.table.assessment}</th>
                     <th className="px-10 py-6 text-center">{t.table.result}</th>
                     <th className="px-10 py-6 text-center">{t.table.date}</th>
                     <th className="px-10 py-6 text-right pr-12">{t.table.actions}</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {gradesLoading ? [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={5} className="h-20 bg-slate-50/50" /></tr>) : 
                   grades.length === 0 ? <tr><td colSpan={5} className="py-32 text-center text-slate-400 uppercase font-black text-xs">No records found</td></tr> : 
                   grades.map((g: any) => {
                    const pct = Math.round((Number(g.score) / Number(g.totalScore)) * 100);
                    return (
                      <tr key={g.id} className="hover:bg-slate-50/50 transition-all group">
                         <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                               <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-lg">{g.subject?.charAt(0).toUpperCase()}</div>
                               <div className="space-y-0.5">
                                  <span className="text-sm font-black text-slate-900 uppercase">{g.subject}</span>
                                  <p className="text-[8px] font-bold text-slate-400 uppercase">{g.planName}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-6">
                            <div className="space-y-1">
                               <p className="text-xs font-bold text-slate-600">{g.assessmentName}</p>
                               <Badge variant="outline" className="border-none bg-slate-100 text-[8px] font-black uppercase text-slate-400 px-2 py-0.5">{g.term}</Badge>
                            </div>
                         </td>
                         <td className="px-10 py-6 text-center">
                            <div className="inline-flex items-center gap-2">
                               <span className="text-lg font-black text-primary font-mono">{g.score}</span>
                               <span className="text-[9px] font-bold text-slate-300">/ {g.totalScore}</span>
                               <Badge className={cn("ml-2 font-black text-[9px]", pct >= 90 ? "bg-green-100 text-green-600" : pct >= 70 ? "bg-blue-100 text-blue-600" : "bg-red-50 text-red-500")}>{pct}%</Badge>
                            </div>
                         </td>
                         <td className="px-10 py-6 text-center"><span className="text-[10px] font-black text-slate-400 flex items-center justify-center gap-2"><Calendar className="h-3 w-3 text-secondary" /> {g.date}</span></td>
                         <td className="px-10 py-6 text-right pr-12">
                            <div className="flex justify-end gap-2">
                               <Button onClick={() => { setEditGrade(g); setFormData({...g}); setIsAddOpen(true); }} size="icon" variant="ghost" className="h-9 w-9 text-slate-300 hover:text-secondary border border-transparent hover:border-slate-100 transition-all"><Edit3 className="h-4 w-4" /></Button>
                               <Button onClick={() => setDeleteId(g.id)} size="icon" variant="ghost" className="h-9 w-9 text-slate-300 hover:text-red-500 border border-transparent hover:border-red-50 transition-all"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                         </td>
                      </tr>
                    )
                  })}
               </tbody>
            </table>
         </div>
      </Card>

      <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100 flex items-start gap-6 shadow-sm mx-2">
         <Info className="h-6 w-6 text-blue-600 shrink-0 mt-1 opacity-60" />
         <p className="text-xs font-bold text-blue-900/60 leading-relaxed italic text-start">
           Grading entries are automatically associated with the selected academic plan. This ensures credit tracking and transcript generation follow the official school calendar and student path.
         </p>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent className="max-w-md rounded-2xl border-none shadow-2xl p-0 overflow-hidden bg-white">
          <div className="bg-red-500 p-8 text-white text-center flex flex-col items-center gap-4">
             <div className="h-16 w-16 rounded-xl bg-white/20 flex items-center justify-center shadow-xl"><Trash2 className="h-8 w-8 text-white" /></div>
             <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight">{t.confirmDelete}</AlertDialogTitle>
          </div>
          <div className="p-10 space-y-8 text-center">
             <AlertDialogDescription className="text-slate-500 font-bold text-base">{t.deleteDesc}</AlertDialogDescription>
             <div className="flex flex-col gap-3">
               <Button onClick={handleDelete} className="h-14 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-500/20">Confirm Delete</Button>
               <Button variant="ghost" onClick={() => setDeleteId(null)} className="h-12 rounded-xl font-black text-slate-400 uppercase tracking-widest">Cancel</Button>
             </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
