
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
  serverTimestamp, 
  orderBy 
} from 'firebase/firestore';
import { 
  ClipboardCheck, 
  User, 
  CreditCard, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Star,
  Award, 
  Trash2, 
  Edit3, 
  Search, 
  Filter,
  Download, 
  ArrowUpRight, 
  Users, 
  Loader2, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  X,
  Save,
  GraduationCap,
  TrendingUp,
  Info
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
  DialogFooter,
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

  // State Management
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editGrade, setEditGrade] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    subject: '',
    assessmentName: '',
    score: '',
    totalScore: '100',
    term: 'First Semester',
    date: new Date().toISOString().split('T')[0]
  });

  // Data Fetching
  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading: studentLoading } = useDoc(studentRef);

  const gradesQuery = useMemo(() => {
    if (!firestore || !id) return null;
    return query(
      collection(firestore, 'grades'),
      where('studentId', '==', id),
      orderBy('date', 'desc')
    );
  }, [firestore, id]);

  const { data: grades, loading: gradesLoading } = useCollection(gradesQuery);

  // Stats Calculations
  const stats = useMemo(() => {
    if (!grades || grades.length === 0) return { avg: 0, total: 0, high: 0 };
    const validGrades = grades.filter(g => !isNaN(Number(g.score)) && !isNaN(Number(g.totalScore)));
    const totalScore = validGrades.reduce((acc, curr) => acc + (Number(curr.score) / Number(curr.totalScore)) * 100, 0);
    const avg = validGrades.length > 0 ? Math.round(totalScore / validGrades.length) : 0;
    const high = Math.max(...validGrades.map(g => (Number(g.score) / Number(g.totalScore)) * 100), 0);
    return { avg, total: grades.length, high: Math.round(high) };
  }, [grades]);

  const t = {
    title: isAr ? 'سجل درجات الطالب' : 'Student Grade Registry',
    back: isAr ? 'العودة' : 'Back',
    addGrade: isAr ? 'رصد درجة جديدة' : 'Record New Grade',
    editGrade: isAr ? 'تعديل الدرجة' : 'Edit Grade Record',
    save: isAr ? 'حفظ البيانات' : 'Save Record',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    confirmDelete: isAr ? 'هل أنت متأكد من الحذف؟' : 'Confirm Deletion',
    deleteDesc: isAr ? 'سيتم حذف هذا التقييم نهائياً من سجل الطالب. لا يمكن التراجع عن هذا الإجراء.' : 'This assessment will be permanently removed from the student registry. This cannot be undone.',
    deleteBtn: isAr ? 'تأكيد الحذف' : 'Confirm Delete',
    stats: {
      avg: isAr ? 'المعدل العام' : 'Overall Average',
      total: isAr ? 'إجمالي التقييمات' : 'Total Assessments',
      high: isAr ? 'أعلى نتيجة' : 'Highest Score'
    },
    fields: {
      subject: isAr ? 'المادة الدراسية' : 'Subject',
      assessment: isAr ? 'اسم الاختبار / التقييم' : 'Assessment Name',
      score: isAr ? 'الدرجة المحققة' : 'Score Obtained',
      total: isAr ? 'الدرجة الكلية' : 'Total Possible',
      term: isAr ? 'الفصل الدراسي' : 'Term',
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

  const NavigationBar = () => {
    const navItems = [
      { id: 'profile', label: t.nav.profile, icon: User, href: `/${lang}/admin/students/${id}` },
      { id: 'guardians', label: t.nav.guardians, icon: Users, href: `/${lang}/admin/students/${id}/guardians` },
      { id: 'documents', label: t.nav.documents, icon: FileText, href: `/${lang}/admin/students/${id}/documents` },
      { id: 'academic', label: t.nav.academic, icon: BookOpen, href: `/${lang}/admin/students/${id}/plans` },
      { id: 'grades', label: t.nav.grades, icon: ClipboardCheck, href: `/${lang}/admin/students/${id}/grades` },
      { id: 'finances', label: t.nav.finances, icon: CreditCard, href: `/${lang}/admin/students/${id}/finances` },
    ];

    return (
      <div className="flex items-center gap-1 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar bg-white p-1 rounded-xl shadow-sm">
         {navItems.map(nav => {
           const isActive = pathname === nav.href;
           return (
             <Link 
               key={nav.id} 
               href={nav.href}
               className={cn(
                 "px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg whitespace-nowrap flex items-center gap-2",
                 isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:text-primary hover:bg-slate-50"
               )}
             >
                <nav.icon className="h-3.5 w-3.5" />
                {nav.label}
             </Link>
           )
         })}
      </div>
    );
  };

  const handleSave = async () => {
    if (!firestore || !id) return;
    if (!formData.subject || !formData.assessmentName || !formData.score) {
      toast({ variant: 'destructive', title: isAr ? 'يرجى ملء الحقول' : 'Please fill all fields' });
      return;
    }

    setIsProcessing(true);
    const data = {
      ...formData,
      studentId: id,
      updatedAt: serverTimestamp(),
      createdBy: user?.email || 'admin'
    };

    try {
      if (editGrade) {
        await updateDoc(doc(firestore, 'grades', editGrade.id), data);
        toast({ title: isAr ? 'تم التحديث بنجاح' : 'Record updated successfully' });
      } else {
        await addDoc(collection(firestore, 'grades'), { ...data, createdAt: serverTimestamp() });
        toast({ title: isAr ? 'تم الحفظ بنجاح' : 'Grade recorded successfully' });
      }
      setIsAddOpen(false);
      setEditGrade(null);
      setFormData({ subject: '', assessmentName: '', score: '', totalScore: '100', term: 'First Semester', date: new Date().toISOString().split('T')[0] });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error saving grade' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!firestore || !deleteId) return;
    try {
      await deleteDoc(doc(firestore, 'grades', deleteId));
      toast({ title: isAr ? 'تم الحذف بنجاح' : 'Record deleted' });
      setDeleteId(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error deleting record' });
    }
  };

  if (studentLoading || !student) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'جاري مزامنة السجلات الأكاديمية...' : 'Syncing Grade Records...'}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 animate-in fade-in duration-700">
      <NavigationBar />

      {/* 1. Slim Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-5 text-start w-full md:w-auto">
            <Button onClick={() => router.back()} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 hover:text-primary shrink-0">
               {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <div className="space-y-0.5">
               <h1 className="text-xl font-black text-primary uppercase tracking-tight leading-none">{t.title} — {student.firstName}</h1>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Managing Academic Performance Matrix</p>
            </div>
         </div>
         
         <Dialog open={isAddOpen} onOpenChange={(v) => { setIsAddOpen(v); if(!v) setEditGrade(null); }}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto h-12 px-8 rounded-xl bg-secondary text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-secondary/20 gap-2 hover:bg-secondary/90 transition-all active:scale-95">
                 <Plus className="h-4 w-4" /> {t.addGrade}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
               <div className="bg-primary p-8 text-white flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg"><Award className="h-6 w-6" /></div>
                  <div>
                    <DialogTitle className="text-xl font-black uppercase tracking-tight">{editGrade ? t.editGrade : t.addGrade}</DialogTitle>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Official Assessment Capture</p>
                  </div>
               </div>
               <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <BookOpen className="h-3 w-3 text-secondary" /> {t.fields.subject}
                        </Label>
                        <Input value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="h-12 bg-white border border-slate-200 rounded-xl font-bold" placeholder="e.g. Mathematics" />
                     </div>
                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <ClipboardCheck className="h-3 w-3 text-secondary" /> {t.fields.assessment}
                        </Label>
                        <Input value={formData.assessmentName} onChange={(e) => setFormData({...formData, assessmentName: e.target.value})} className="h-12 bg-white border border-slate-200 rounded-xl font-bold" placeholder="e.g. Midterm Exam" />
                     </div>
                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <TrendingUp className="h-3 w-3 text-secondary" /> {t.fields.score}
                        </Label>
                        <Input type="number" value={formData.score} onChange={(e) => setFormData({...formData, score: e.target.value})} className="h-12 bg-white border border-slate-200 rounded-xl font-bold" />
                     </div>
                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <TrendingUp className="h-3 w-3 text-slate-300" /> {t.fields.total}
                        </Label>
                        <Input type="number" value={formData.totalScore} onChange={(e) => setFormData({...formData, totalScore: e.target.value})} className="h-12 bg-white border border-slate-200 rounded-xl font-bold" />
                     </div>
                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <Star className="h-3 w-3 text-secondary" /> {t.fields.term}
                        </Label>
                        <Select value={formData.term} onValueChange={(v) => setFormData({...formData, term: v})}>
                           <SelectTrigger className="h-12 border-slate-200 rounded-xl font-bold"><SelectValue /></SelectTrigger>
                           <SelectContent className="rounded-xl">
                              <SelectItem value="First Semester" className="font-bold py-3">{isAr ? 'الفصل الأول' : 'First Term'}</SelectItem>
                              <SelectItem value="Second Semester" className="font-bold py-3">{isAr ? 'الفصل الثاني' : 'Second Term'}</SelectItem>
                              <SelectItem value="Summer Term" className="font-bold py-3">{isAr ? 'الفصل الصيفي' : 'Summer Term'}</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2 text-start">
                        <Label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 px-1">
                          <Calendar className="h-3 w-3 text-secondary" /> {t.fields.date}
                        </Label>
                        <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="h-12 bg-white border border-slate-200 rounded-xl font-bold" />
                     </div>
                  </div>
               </div>
               <div className="p-8 pt-0 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setIsAddOpen(false)} className="h-12 px-6 rounded-xl font-black text-[10px] uppercase text-slate-400">{t.cancel}</Button>
                  <Button onClick={handleSave} disabled={isProcessing} className="h-12 px-10 rounded-xl bg-primary text-white font-black text-[10px] uppercase shadow-xl shadow-primary/10">
                     {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2 text-secondary" />}
                     {t.save}
                  </Button>
               </div>
            </DialogContent>
         </Dialog>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         <Card className="border border-slate-200 bg-white p-6 space-y-4 text-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Award className="h-20 w-20" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.stats.avg}</p>
            <div className="flex items-end justify-between relative z-10">
               <h3 className="text-4xl font-black text-primary tracking-tighter">{stats.avg}%</h3>
               <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center shadow-inner",
                  stats.avg >= 90 ? "bg-green-50 text-green-600" : stats.avg >= 70 ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
               )}><TrendingUp className="h-5 w-5" /></div>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-secondary transition-all duration-1000" style={{ width: `${stats.avg}%` }} />
            </div>
         </Card>

         <Card className="border border-slate-200 bg-white p-6 space-y-4 text-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><ClipboardCheck className="h-20 w-20" /></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.stats.total}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stats.total}</h3>
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Active records this session</p>
         </Card>

         <Card className="border border-slate-200 bg-primary p-6 space-y-4 text-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Star className="h-20 w-20 text-secondary" /></div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t.stats.high}</p>
            <div className="flex items-center gap-3">
               <h3 className="text-4xl font-black text-white tracking-tighter">{stats.high}%</h3>
               <div className="h-8 w-8 rounded-lg bg-secondary text-white flex items-center justify-center shadow-lg"><Star className="h-4 w-4 fill-current" /></div>
            </div>
            <p className="text-[9px] font-bold text-secondary uppercase tracking-widest">Student Peak Performance</p>
         </Card>
      </div>

      {/* 3. Main Grade Registry Table */}
      <Card className="border border-slate-200 bg-white shadow-premium rounded-[2.5rem] overflow-hidden">
         <CardHeader className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between text-start">
            <div className="space-y-1">
               <CardTitle className="text-xl font-black uppercase text-primary flex items-center gap-4">
                  <BookOpen className="h-6 w-6 text-secondary" /> {isAr ? 'تفاصيل كافة التقييمات' : 'Detailed Grade Roster'}
               </CardTitle>
               <CardDescription className="font-bold text-xs">Official academic achievements logged for this student.</CardDescription>
            </div>
            <Button variant="outline" className="hidden sm:flex h-10 rounded-xl border-slate-200 font-black text-[9px] uppercase tracking-widest gap-2 bg-white">
               <Download className="h-4 w-4" /> {isAr ? 'تصدير' : 'Export'}
            </Button>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full border-collapse min-w-[900px]">
                  <thead>
                     <tr className="bg-white text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <th className="px-10 py-6 text-start w-1/4">{t.table.subject}</th>
                        <th className="px-10 py-6 text-start">{t.table.assessment}</th>
                        <th className="px-10 py-6 text-center">{t.table.result}</th>
                        <th className="px-10 py-6 text-center">{t.table.date}</th>
                        <th className="px-10 py-6 text-right pr-12">{t.table.actions}</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {gradesLoading ? (
                       [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={5} className="h-20 bg-slate-50/50" /></tr>)
                     ) : grades.length === 0 ? (
                       <tr>
                         <td colSpan={5} className="py-32 text-center space-y-6">
                            <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center mx-auto shadow-inner border border-slate-100">
                               <Award className="h-10 w-10 text-slate-200" />
                            </div>
                            <div className="space-y-1">
                               <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">No grades recorded yet</p>
                               <p className="text-[10px] font-bold text-slate-300 uppercase">Click "Record New Grade" to begin academic entry.</p>
                            </div>
                         </td>
                       </tr>
                     ) : grades.map((g: any) => {
                       const percentage = Math.round((Number(g.score) / Number(g.totalScore)) * 100);
                       return (
                         <tr key={g.id} className="hover:bg-slate-50/50 transition-all group">
                            <td className="px-10 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                     {g.subject?.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="text-sm font-black text-slate-900 uppercase truncate max-w-[200px]">{g.subject}</span>
                               </div>
                            </td>
                            <td className="px-10 py-6">
                               <div className="space-y-1">
                                  <p className="text-xs font-bold text-slate-600">{g.assessmentName}</p>
                                  <Badge variant="outline" className="border-none bg-slate-100 text-[8px] font-black uppercase text-slate-400 px-2 py-0.5">{g.term}</Badge>
                               </div>
                            </td>
                            <td className="px-10 py-6 text-center">
                               <div className="inline-flex flex-col items-center gap-1.5">
                                  <div className="flex items-center gap-2">
                                     <span className="text-lg font-black text-primary font-mono tracking-tighter">{g.score}</span>
                                     <span className="text-[9px] font-bold text-slate-300">/ {g.totalScore}</span>
                                     <Badge className={cn(
                                       "ml-2 border-none font-black text-[9px] px-2 py-0.5 rounded",
                                       percentage >= 90 ? "bg-green-100 text-green-600" : percentage >= 70 ? "bg-blue-100 text-blue-600" : "bg-red-50 text-red-500"
                                     )}>{percentage}%</Badge>
                                  </div>
                               </div>
                            </td>
                            <td className="px-10 py-6 text-center">
                               <span className="text-[10px] font-black text-slate-400 flex items-center justify-center gap-2">
                                  <Calendar className="h-3 w-3" /> {g.date}
                               </span>
                            </td>
                            <td className="px-10 py-6 text-right pr-12">
                               <div className="flex justify-end gap-2">
                                  <Button onClick={() => { setEditGrade(g); setFormData({...g}); setIsAddOpen(true); }} size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-300 hover:text-secondary hover:bg-secondary/5 transition-all">
                                     <Edit3 className="h-4 w-4" />
                                  </Button>
                                  <Button onClick={() => setDeleteId(g.id)} size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                                     <Trash2 className="h-4 w-4" />
                                  </Button>
                               </div>
                            </td>
                         </tr>
                       )
                     })}
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>

      {/* 4. Support & Documentation Alert */}
      <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 flex items-start gap-6 shadow-sm mx-2">
         <Info className="h-8 w-8 text-blue-600 shrink-0 mt-1 opacity-60" />
         <div className="space-y-2 text-start">
            <h4 className="font-black text-blue-900 uppercase text-sm">{isAr ? 'سياسة رصد الدرجات' : 'Academic Grading Policy'}</h4>
            <p className="text-xs md:text-sm font-bold text-blue-900/60 leading-relaxed italic">
               {isAr 
                  ? 'يتم استخدام هذه الدرجات في إصدار التقارير الأكاديمية الرسمية. يرجى التأكد من دقة البيانات ومطابقتها للسجلات الأصلية في Edgenuity لضمان النزاهة التعليمية.' 
                  : 'These grades are used to generate official academic reports. Please ensure data accuracy and cross-reference with Edgenuity records to maintain educational integrity.'}
            </p>
         </div>
      </div>

      {/* Deletion Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent className="max-w-md rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
          <div className="bg-red-500 p-10 text-white text-center flex flex-col items-center gap-5">
             <div className="h-16 w-16 rounded-3xl bg-white/20 flex items-center justify-center shadow-xl"><AlertTriangle className="h-8 w-8 text-white" /></div>
             <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight">{t.confirmDelete}</AlertDialogTitle>
          </div>
          <div className="p-10 space-y-10 text-center">
             <AlertDialogDescription className="text-slate-500 font-bold text-base leading-relaxed">{t.deleteDesc}</AlertDialogDescription>
             <div className="flex flex-col gap-3">
               <Button onClick={handleDelete} className="h-16 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest shadow-2xl shadow-red-500/20 hover:bg-red-700 transition-all">
                 {t.deleteBtn}
               </Button>
               <Button variant="ghost" onClick={() => setDeleteId(null)} className="h-14 rounded-2xl font-black text-slate-400 uppercase tracking-widest">
                 {t.cancel}
               </Button>
             </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
