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
  BadgeCheck,
  ChevronDown,
  Globe,
  Filter,
  CheckCircle2,
  Printer,
  FileBadge
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
  DialogDescription,
  DialogFooter
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

  // Print Dialog States
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [selectedPrintPlanId, setSelectedPrintPlanId] = useState<string | null>(null);
  const [printType, setPrintType] = useState<'monthly' | 'final'>('final');

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['subject', 'score', 'percent', 'grade', 'date']);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    planId: '',
    subject: '',
    reportType: 'monthly',
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
    nav: {
      profile: isAr ? 'الهوية' : 'Identity',
      guardians: isAr ? 'أولياء الأمور' : 'Guardians',
      documents: isAr ? 'المستندات' : 'Documents',
      academic: isAr ? 'خطة الطالب' : 'Study Plan',
      grades: isAr ? 'الدرجات' : 'Grades',
      finances: isAr ? 'المالية' : 'Finances'
    },
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
      reportType: isAr ? 'نوع الدرجة' : 'Grade Type',
      score: isAr ? 'الدرجة المستحقة' : 'Earned Score',
      total: isAr ? 'الدرجة الكلية' : 'Total Score',
      date: isAr ? 'تاريخ التقييم' : 'Evaluation Date'
    },
    reportTypes: [
      { v: 'monthly', l: isAr ? 'درجة شهرية' : 'Monthly Grade' },
      { v: 'final', l: isAr ? 'درجة فصلية / نهائية' : 'Semester / Final Grade' }
    ],
    table: {
      columns: isAr ? 'الأعمدة' : 'Columns',
      subject: isAr ? 'المادة' : 'Subject',
      result: isAr ? 'النتيجة' : 'Result',
      percent: isAr ? 'النسبة' : 'Percent',
      grade: isAr ? 'التقدير' : 'Grade',
      date: isAr ? 'التاريخ' : 'Date',
      actions: isAr ? 'إجراءات' : 'Actions',
      filterLabel: isAr ? 'تصفية:' : 'Filter:'
    },
    report: {
      btn: isAr ? 'تصدير الشهادة' : 'Export Transcript',
      configTitle: isAr ? 'إعدادات تصدير الشهادة' : 'Transcript Export Settings',
      configDesc: isAr ? 'اختر نوع الدرجات التي ترغب في تضمينها في الكشف.' : 'Select the type of grades you wish to include in the transcript.',
      generate: isAr ? 'توليد الشهادة' : 'Generate Certificate',
      bismillah: 'بسم الله الرحمن الرحيم',
      academyEn: 'Baneen and Banaat Academy for Remote Learning & Academic Excellence',
      academyAr: 'أكاديمية بنين وبنات للتعليم عن بعد والتفوق الأكاديمي',
      certTitle: 'OFFICIAL ACADEMIC REPORT',
      certIntroEn: 'The Administration of Baneen and Banaat Academy hereby certifies that the student:',
      certIntroAr: 'تشهد إدارة أكاديمية بنين وبنات للتعليم عن بعد بأن الطالب/ـة:',
      certMetaEn: 'has successfully completed the requirements for the indicated academic term.',
      certMetaAr: 'قد أتم بنجاح المتطلبات الأكاديمية للفصل الدراسي المحدد أدناه، متمنين له دوام التوفيق والنجاح.',
      signAdmin: 'Academy Director',
      signDean: 'Academic Dean',
      signTeacher: 'Course Instructor',
      signReg: 'Registrar Office',
      rowMonthly: 'Monthly Assessments / أعمال السنة',
      rowFinal: 'Term Exam / الاختبار الفصلي',
      rowTotal: 'Total / الإجمالي',
      colGrade: 'Grade / التقدير',
      overallScore: 'Overall Score',
      finalResult: 'Final Result',
      pass: 'Pass / ناجح',
      fail: 'Fail / راسب'
    }
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
      setFormData({ 
        planId: '', 
        subject: '', 
        reportType: 'monthly',
        score: '', 
        totalScore: '100', 
        date: new Date().toISOString().split('T')[0] 
      });
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

  const handlePrint = (planId: string) => {
    const printContent = document.getElementById(`printable-report-${planId}`);
    if (!printContent) return;

    // Create a temporary style for printing
    const style = document.createElement('style');
    style.id = 'print-special-styles';
    style.innerHTML = `
      @media print {
        @page { size: portrait; margin: 1cm; }
        body * { visibility: hidden; }
        #printable-report-${planId}, #printable-report-${planId} * { visibility: visible !important; }
        #printable-report-${planId} {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          min-height: 100vh;
          background: white !important;
          z-index: 99999;
          display: block !important;
        }
        main, header, nav, footer, button, .dialog-overlay, [role="dialog"] { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    // Give time for UI to update (though dialog state might need to be handled)
    setIsPrintDialogOpen(false);
    setTimeout(() => {
      window.print();
      document.getElementById('print-special-styles')?.remove();
    }, 300);
  };

  if (studentLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 animate-in fade-in duration-500">
      
      {/* 1. Navigation */}
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

      {/* 2. Header */}
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
              <DialogContent className={cn("max-w-2xl rounded-2xl border-none shadow-2xl p-0 overflow-hidden", isAr && "font-arabic")} dir={isAr ? 'rtl' : 'ltr'}>
                <div className="bg-primary p-8 text-white flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shadow-lg"><ClipboardCheck className="h-6 w-6" /></div>
                      <DialogTitle className="text-xl font-black uppercase tracking-tight text-start">{editGrade ? t.editGrade : t.addGrade}</DialogTitle>
                   </div>
                </div>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                           <Layers className="h-3 w-3 text-secondary" /> {t.fields.plan}
                        </Label>
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
                        <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                           <BookOpen className="h-3 w-3 text-secondary" /> {t.fields.subject}
                        </Label>
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
                        <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                           <ClipboardCheck className="h-3 w-3 text-secondary" /> {t.fields.reportType}
                        </Label>
                        <Select value={formData.reportType} onValueChange={(v) => setFormData({...formData, reportType: v})}>
                           <SelectTrigger className="h-12 border-slate-200 rounded-xl font-bold bg-white">
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              {t.reportTypes.map(rt => (
                                <SelectItem key={rt.v} value={rt.v} className="font-bold py-3">{rt.l}</SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                              <Star className="h-3 w-3 text-secondary" /> {t.fields.score}
                           </Label>
                           <Input type="number" value={formData.score} onChange={(e) => setFormData({...formData, score: e.target.value})} className="h-12 border-slate-200 rounded-xl font-bold" />
                        </div>
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                              <CheckCircle2 className="h-3 w-3 text-secondary" /> {t.fields.total}
                           </Label>
                           <Input type="number" value={formData.totalScore} onChange={(e) => setFormData({...formData, totalScore: e.target.value})} className="h-12 border-slate-200 rounded-xl font-bold" />
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-1.5 text-start">
                     <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                        <Calendar className="h-3 w-3 text-secondary" /> {t.fields.date}
                     </Label>
                     <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="h-12 border-slate-200 rounded-xl font-bold" />
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

      {/* 3. Export Dialog */}
      <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl border-none shadow-2xl p-0 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
           <div className="bg-primary p-8 text-white text-center flex flex-col items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center shadow-lg"><FileBadge className="h-7 w-7" /></div>
              <div className="space-y-1">
                <DialogTitle className="text-xl font-black uppercase tracking-tight">{t.report.configTitle}</DialogTitle>
                <DialogDescription className="text-white/60 font-bold text-xs">{t.report.configDesc}</DialogDescription>
              </div>
           </div>
           <div className="p-8 space-y-6 text-start">
              <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase text-slate-400">{isAr ? 'اختر نوع الدرجات' : 'Select Grade Categories'}</Label>
                 <Select value={printType} onValueChange={(v: any) => setPrintType(v)}>
                    <SelectTrigger className="h-12 border-slate-200 rounded-xl font-bold">
                       <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                       {t.reportTypes.map(rt => (
                         <SelectItem key={rt.v} value={rt.v} className="font-bold py-3">{rt.l}</SelectItem>
                       ))}
                    </SelectContent>
                 </Select>
              </div>
              <Button 
                 onClick={() => selectedPrintPlanId && handlePrint(selectedPrintPlanId)}
                 className="w-full h-14 bg-secondary hover:bg-primary text-white font-black rounded-xl shadow-xl transition-all text-sm uppercase tracking-widest"
              >
                 <Printer className="h-5 w-5 mr-2" /> {t.report.generate}
              </Button>
           </div>
        </DialogContent>
      </Dialog>

      {/* 4. Stats Grid */}
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

      {/* 5. Plan Tables */}
      <Accordion type="multiple" className="space-y-6">
        {plans.map(plan => {
          const planGradesRaw = groupedGrades[plan.id] || [];
          const filteredGrades = planGradesRaw.filter(g => activeTypeFilter === 'all' || g.reportType === activeTypeFilter);

          return (
            <AccordionItem key={plan.id} value={plan.id} className="border-none">
              <Card className="border border-slate-200 shadow-premium rounded-[1.5rem] overflow-hidden bg-white">
                 <div className="flex flex-col lg:flex-row items-center justify-between bg-slate-50/80 border-b border-slate-100 group px-8 py-4 lg:py-0">
                    <AccordionTrigger className="flex-1 hover:no-underline py-6 text-start [&[data-state=open]>svg]:rotate-180 transition-colors group-hover:bg-slate-50/50">
                       <div className="flex items-center gap-4 text-start min-w-0">
                          <div className="h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 shadow-inner"><FileSpreadsheet className="h-6 w-6" /></div>
                          <div>
                             <CardTitle className="text-xl font-black uppercase text-primary tracking-tight">{plan.name}</CardTitle>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{plan.year} • {plan.term}</p>
                          </div>
                       </div>
                    </AccordionTrigger>
                    
                    <div className="flex flex-wrap items-center gap-3 py-4 lg:py-0">
                       <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
                             <span className="text-[9px] font-black text-slate-400 uppercase">{t.table.filterLabel}</span>
                             <Select value={activeTypeFilter} onValueChange={setActiveTypeFilter}>
                                <SelectTrigger className="h-8 border-none bg-transparent font-bold text-[10px] uppercase p-0 w-24">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   <SelectItem value="all">{isAr ? 'الكل' : 'All'}</SelectItem>
                                   {t.reportTypes.map(rt => <SelectItem key={rt.v} value={rt.v}>{rt.l}</SelectItem>)}
                                </SelectContent>
                             </Select>
                          </div>

                          <Button 
                            onClick={() => {
                              setSelectedPrintPlanId(plan.id);
                              setIsPrintDialogOpen(true);
                            }} 
                            variant="outline" 
                            className="h-10 px-4 rounded-lg border-slate-200 text-primary font-black text-[10px] uppercase gap-2 bg-white hover:bg-slate-50 shadow-sm"
                          >
                             <Printer className="h-4 w-4" /> {t.report.btn}
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="h-10 px-6 rounded-lg border-slate-200 text-slate-500 font-black text-[10px] uppercase gap-2 bg-white hover:bg-slate-50 shadow-sm transition-all">
                                <Columns className="h-4 w-4" /> {t.table.columns}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-2xl border-slate-100 p-2">
                              <DropdownMenuLabel className="text-[10px] font-black text-slate-400 uppercase">{isAr ? 'إظهار / إخفاء' : 'Show/Hide Columns'}</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {Object.keys(t.table).filter(k => !['columns', 'actions', 'filterLabel'].includes(k)).map(col => (
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
                       </div>
                    </div>
                 </div>

                 <AccordionContent className="p-0 border-t border-slate-100">
                    <div className="overflow-x-auto">
                       <table className="w-full border-collapse">
                          <thead>
                             <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                {visibleColumns.includes('subject') && <th className="px-8 py-5 text-start w-1/4">{t.table.subject}</th>}
                                {visibleColumns.includes('result') && <th className="px-8 py-5 text-center">{t.table.result}</th>}
                                {visibleColumns.includes('percent') && <th className="px-8 py-5 text-center">{t.table.percent}</th>}
                                {visibleColumns.includes('grade') && <th className="px-8 py-5 text-center">{t.table.grade}</th>}
                                {visibleColumns.includes('date') && <th className="px-8 py-5 text-center">{t.table.date}</th>}
                                <th className="px-8 py-5 text-right w-32"></th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {filteredGrades.length === 0 ? (
                               <tr>
                                  <td colSpan={visibleColumns.length + 1} className="py-20 text-center">
                                     <Info className="h-10 w-10 text-slate-100 mx-auto mb-4" />
                                     <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'لا توجد درجات مرصودة' : 'No grades recorded'}</p>
                                  </td>
                               </tr>
                             ) : filteredGrades.map((g: any) => {
                               const pct = Math.round((Number(g.score) / Number(g.totalScore)) * 100);
                               const letterGrade = getLetterGrade(pct);
                               
                               return (
                                 <tr key={g.id} className="hover:bg-slate-50/50 transition-colors group">
                                    {visibleColumns.includes('subject') && (
                                      <td className="px-8 py-6">
                                         <span className="font-black text-slate-900 uppercase text-sm">{g.subject}</span>
                                      </td>
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
                 </AccordionContent>

                 {/* PRINTABLE TRANSCRIPT COMPONENT (OFFICIAL A4 PORTRAIT) */}
                 <div id={`printable-report-${plan.id}`} className="hidden" dir="ltr">
                    <div className="flex flex-col h-full bg-white text-slate-900 text-center p-12 leading-normal font-serif">
                       {/* Official Bilingual Header */}
                       <div className="mb-8">
                          <p className="text-xl font-bold italic mb-4">{t.report.bismillah}</p>
                          <div className="relative flex items-center justify-between border-b-2 border-primary pb-6">
                             {/* Left: English Name */}
                             <div className="text-left w-[40%]">
                                <h2 className="text-[12px] font-black text-primary uppercase leading-tight">{t.report.academyEn}</h2>
                             </div>
                             {/* Center: Logo */}
                             <div className="shrink-0 px-4">
                                <img src="/logo.png" className="h-24 w-24 object-contain" alt="BBA Logo" />
                             </div>
                             {/* Right: Arabic Name */}
                             <div className="text-right w-[40%] font-arabic" dir="rtl">
                                <h2 className="text-[12px] font-black text-primary leading-tight">{t.report.academyAr}</h2>
                             </div>
                          </div>
                       </div>

                       {/* Title & Description */}
                       <div className="space-y-6 mb-8">
                          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-widest decoration-secondary decoration-4 underline-offset-8 underline">
                             {printType === 'monthly' ? 'Monthly Academic Progress Report' : 'Semester Final Examination Report'}
                          </h1>
                          
                          <div className="space-y-4 text-center">
                             <div className="space-y-1">
                                <p className="text-[11px] font-medium text-slate-500 italic">{t.report.certIntroEn}</p>
                                <p className="text-[11px] font-arabic font-bold text-slate-400" dir="rtl">{t.report.certIntroAr}</p>
                             </div>
                             
                             <h2 className="text-3xl font-black text-primary uppercase px-12 py-2 bg-slate-50 rounded-xl inline-block border-2 border-slate-100 shadow-sm">
                                {student?.firstName} {student?.lastName}
                             </h2>
                             
                             <div className="flex justify-center items-center gap-10 text-[12px] font-black text-slate-600 uppercase tracking-widest bg-white border border-slate-100 px-6 py-2 rounded-full w-fit mx-auto">
                                <span>Academic Year: {plan.year}</span>
                                <span className="h-1.5 w-1.5 bg-secondary rounded-full" />
                                <span>Term: {plan.term}</span>
                             </div>

                             <div className="space-y-1 max-w-2xl mx-auto">
                                <p className="text-[10px] font-medium text-slate-500 italic">{t.report.certMetaEn}</p>
                                <p className="text-[10px] font-arabic font-bold text-slate-400" dir="rtl">{t.report.certMetaAr}</p>
                             </div>
                          </div>
                       </div>

                       {/* Official Academic Grid (Subjects as Columns) */}
                       <div className="flex-1">
                          <div className="border-[3px] border-slate-900 rounded-lg overflow-hidden shadow-xl">
                            <table className="w-full border-collapse text-center table-fixed">
                               <thead className="bg-slate-900 text-white">
                                  <tr className="h-20">
                                     <th className="border-r border-white/20 w-[140px] text-[10px] font-black uppercase">Academic Categories</th>
                                     {plan.subjects.map((sub: any, sIdx: number) => (
                                       <th key={sIdx} className="border-r border-white/20 px-1 text-[9px] font-bold">
                                          <div className="flex flex-col gap-1 uppercase">
                                             <span className="truncate">{sub.nameEn || sub.nameAr}</span>
                                             <div className="h-px w-8 bg-white/20 mx-auto" />
                                             <span className="font-arabic opacity-80" dir="rtl">{sub.nameAr || sub.nameEn}</span>
                                          </div>
                                       </th>
                                     ))}
                                     <th className="border-r border-white/20 w-[60px] text-[10px] font-black uppercase">{t.report.colGrade}</th>
                                     <th className="w-[80px] text-[10px] font-black uppercase">Final Result</th>
                                  </tr>
                               </thead>
                               <tbody className="text-[11px] font-bold">
                                  {/* Row 1: Monthly Data */}
                                  <tr className="h-14 border-b-2 border-slate-200 bg-slate-50/50">
                                     <td className="border-r-2 border-slate-200 font-black uppercase text-[9px] bg-slate-100/50">{t.report.rowMonthly}</td>
                                     {plan.subjects.map((sub: any, sIdx: number) => {
                                        const scoreObj = planGradesRaw.find(g => g.planId === plan.id && g.subject === (sub.nameEn || sub.nameAr) && g.reportType === 'monthly');
                                        return (
                                          <td key={sIdx} className="border-r-2 border-slate-200">
                                            {scoreObj ? scoreObj.score : '-'}
                                          </td>
                                        );
                                     })}
                                     <td className="border-r-2 border-slate-200 bg-slate-100">-</td>
                                     <td className="bg-slate-100">-</td>
                                  </tr>

                                  {/* Row 2: Term Exam Data */}
                                  <tr className="h-14 border-b-2 border-slate-200">
                                     <td className="border-r-2 border-slate-200 font-black uppercase text-[9px] bg-slate-100/50">{t.report.rowFinal}</td>
                                     {plan.subjects.map((sub: any, sIdx: number) => {
                                        const scoreObj = planGradesRaw.find(g => g.planId === plan.id && g.subject === (sub.nameEn || sub.nameAr) && g.reportType === 'final');
                                        return (
                                          <td key={sIdx} className="border-r-2 border-slate-200">
                                            {scoreObj ? scoreObj.score : '-'}
                                          </td>
                                        );
                                     })}
                                     <td className="border-r-2 border-slate-200 bg-slate-100">-</td>
                                     <td className="bg-slate-100">-</td>
                                  </tr>

                                  {/* Row 3: Totals & Calculation */}
                                  <tr className="h-16 bg-primary/5">
                                     <td className="border-r-2 border-slate-200 font-black uppercase text-[10px] text-primary">{t.report.rowTotal}</td>
                                     {plan.subjects.map((sub: any, sIdx: number) => {
                                        const grades = planGradesRaw.filter(g => g.planId === plan.id && g.subject === (sub.nameEn || sub.nameAr));
                                        // Simple logic: if final exists, use it, else use monthly
                                        const relevant = grades.find(g => g.reportType === printType) || grades[0];
                                        const pct = relevant ? Math.round((Number(relevant.score) / Number(relevant.totalScore)) * 100) : null;
                                        return (
                                          <td key={sIdx} className="border-r-2 border-slate-200 font-black text-primary text-sm">
                                            {pct !== null ? `${pct}%` : '-'}
                                          </td>
                                        );
                                     })}
                                     {/* Overall Score & Result */}
                                     <td className="border-r-2 border-slate-200 bg-slate-900 text-white font-black text-lg">
                                        {stats.avg > 0 ? getLetterGrade(stats.avg) : '-'}
                                     </td>
                                     <td className="bg-slate-900 text-white font-black text-lg">
                                        {stats.avg}%
                                     </td>
                                  </tr>
                               </tbody>
                            </table>
                          </div>

                          {/* Final Verdict Summary */}
                          <div className="mt-8 grid grid-cols-2 gap-8">
                             <div className="border-[3px] border-slate-900 p-4 rounded-xl flex justify-between items-center bg-slate-50 shadow-inner">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{t.report.overallScore}</span>
                                <span className="text-3xl font-black text-primary">{stats.avg}%</span>
                             </div>
                             <div className="border-[3px] border-slate-900 p-4 rounded-xl flex justify-between items-center bg-slate-50 shadow-inner">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{t.report.finalResult}</span>
                                <span className={cn("text-2xl font-black uppercase", stats.avg >= 60 ? "text-green-600" : "text-red-600")}>
                                   {stats.avg >= 60 ? t.report.pass : t.report.fail}
                                </span>
                             </div>
                          </div>
                       </div>

                       {/* Professional Quad-Signature Blocks */}
                       <div className="mt-20 grid grid-cols-4 gap-8 px-4 text-center">
                          <div className="space-y-16">
                             <p className="font-black uppercase text-[9px] tracking-widest text-slate-400 border-b border-slate-100 pb-2">{t.report.signAdmin}</p>
                             <div className="pt-2 border-t-2 border-slate-900 relative">
                                <p className="text-[11px] font-black text-primary">Dr. Mustafa Ali</p>
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 opacity-10"><img src="/logo.png" className="grayscale" /></div>
                             </div>
                          </div>
                          <div className="space-y-16">
                             <p className="font-black uppercase text-[9px] tracking-widest text-slate-400 border-b border-slate-100 pb-2">{t.report.signDean}</p>
                             <div className="pt-2 border-t-2 border-slate-900 min-h-[14px]" />
                          </div>
                          <div className="space-y-16">
                             <p className="font-black uppercase text-[9px] tracking-widest text-slate-400 border-b border-slate-100 pb-2">{t.report.signTeacher}</p>
                             <div className="pt-2 border-t-2 border-slate-900 min-h-[14px]" />
                          </div>
                          <div className="space-y-16">
                             <p className="font-black uppercase text-[9px] tracking-widest text-slate-400 border-b border-slate-100 pb-2">{t.report.signReg}</p>
                             <div className="pt-2 border-t-2 border-slate-900 min-h-[14px]" />
                          </div>
                       </div>

                       {/* Certificate Footer */}
                       <div className="mt-auto pt-10 border-t border-slate-100 flex justify-between items-center opacity-40">
                          <div className="text-left space-y-0.5">
                             <p className="text-[8px] font-black text-primary tracking-[0.2em] uppercase">Verified Academic Transcript • Michigan, USA</p>
                             <p className="text-[7px] font-bold text-slate-400 uppercase">System Generated Record ID: {plan.id?.toUpperCase()}</p>
                          </div>
                          <p className="text-[8px] font-black text-slate-900 uppercase">Date Issued: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                       </div>
                    </div>
                 </div>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 flex items-start gap-6 shadow-sm mx-2">
         <Info className="h-6 w-6 text-blue-600 shrink-0 mt-1 opacity-60" />
         <div className="space-y-1 text-start">
            <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">{isAr ? 'إرشادات الأرشفة والتقارير' : 'Archiving & Reporting Guidance'}</p>
            <p className="text-xs font-bold text-blue-900/60 leading-relaxed italic">
               {isAr 
                 ? 'تستخدم هذه الجداول كمرجع أساسي لإصدار التقارير الأكاديمية والشهادات. يتم ربط كل درجة بخطة دراسية محددة لضمان دقة السجل الأكاديمي الشامل للطالب.' 
                 : 'These tables serve as the primary reference for academic reports and certificates. Each grade is linked to a specific study plan to ensure the accuracy of the student\'s comprehensive academic record.'}
            </p>
         </div>
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
      `}</style>
    </div>
  );
}
