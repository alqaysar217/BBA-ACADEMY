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
  Printer
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';

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
  
  // Per-plan assessment type filters
  const [planFilters, setPlanFilters] = useState<Record<string, string>>({});

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
      actions: isAr ? 'إجراءات' : 'Actions',
      filterLabel: isAr ? 'تصفية:' : 'Filter:'
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
    ],
    report: {
      btn: isAr ? 'تصدير الشهادة' : 'Export Transcript',
      bismillah: 'بسم الله الرحمن الرحيم',
      academyEn: 'Baneen and Banaat Academy',
      academyAr: 'أكاديمية بنين وبنات للتعليم المنزلي',
      subAr: 'للتعليم عن بعد والتفوق الأكاديمي',
      subEn: 'For Homeschooling & Remote Learning',
      certTitle: isAr ? 'كشف الدرجات الأكاديمي' : 'OFFICIAL TRANSCRIPT',
      certIntro: isAr ? 'تشهد الأكاديمية بأن الطالب:' : 'The Academy certifies that student:',
      certMeta: isAr ? 'قد أتم متطلبات الخط الدراسية المذكورة أدناه بنجاح.' : 'has successfully completed the academic requirements listed below.',
      signAdmin: isAr ? 'مدير الأكاديمية' : 'Academy Director',
      signReg: isAr ? 'مسؤول القبول والتسجيل' : 'Admissions Officer',
      totalScore: isAr ? 'المجموع الكلي' : 'Total Score (%)'
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

  const handlePlanFilterChange = (planId: string, value: string) => {
    setPlanFilters(prev => ({ ...prev, [planId]: value }));
  };

  const handlePrint = (planId: string) => {
    const printContent = document.getElementById(`printable-report-${planId}`);
    if (!printContent) return;

    const originalDisplay = printContent.style.display;
    printContent.style.display = 'block';
    
    // Add print-specific style for landscape
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page { size: landscape; margin: 1cm; }
        body * { visibility: hidden; }
        #printable-report-${planId}, #printable-report-${planId} * { visibility: visible; }
        #printable-report-${planId} { 
          position: fixed; 
          left: 0; 
          top: 0; 
          width: 100%; 
          height: 100%; 
          background: white !important; 
          z-index: 9999; 
          padding: 2cm;
          display: block !important;
        }
      }
    `;
    document.head.appendChild(style);

    window.print();

    // Clean up
    document.head.removeChild(style);
    printContent.style.display = originalDisplay;
  };

  if (studentLoading) return <div className="p-20 text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 animate-in fade-in duration-500">
      
      {/* Navigation */}
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

      {/* Header & Quick Stats */}
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
                <div className="bg-primary p-8 text-white flex items-center gap-4">
                   <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shadow-lg"><ClipboardCheck className="h-6 w-6" /></div>
                   <DialogTitle className="text-xl font-black uppercase tracking-tight text-start">{editGrade ? t.editGrade : t.addGrade}</DialogTitle>
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
                           <ClipboardCheck className="h-3 w-3 text-secondary" /> {t.fields.assessment}
                        </Label>
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
                        <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 px-1">
                           <Calendar className="h-3 w-3 text-secondary" /> {t.fields.date}
                        </Label>
                        <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="h-12 border-slate-200 rounded-xl font-bold" />
                     </div>
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

      {/* Stats Grid */}
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

      {/* Collapsible Grade Tables Organized by Plan */}
      <Accordion type="multiple" className="space-y-6">
        {plans.map(plan => {
          const planGrades = groupedGrades[plan.id] || [];
          const currentFilter = planFilters[plan.id] || 'all';
          const filteredGrades = planGrades.filter(g => currentFilter === 'all' || g.assessmentName === currentFilter);

          return (
            <AccordionItem key={plan.id} value={plan.id} className="border-none">
              <Card className="border border-slate-200 shadow-premium rounded-[1.5rem] overflow-hidden bg-white">
                 <div className="flex flex-col lg:flex-row items-center justify-between bg-slate-50/80 border-b border-slate-100 group px-8 py-4 lg:py-0">
                    <AccordionTrigger className="flex-1 hover:no-underline py-6 text-start [&[data-state=open]>svg]:rotate-180 transition-colors group-hover:bg-slate-50/50">
                       <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 shadow-inner"><FileSpreadsheet className="h-6 w-6" /></div>
                          <div>
                             <CardTitle className="text-xl font-black uppercase text-primary tracking-tight">{plan.name}</CardTitle>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{plan.year} • {plan.term}</p>
                          </div>
                       </div>
                    </AccordionTrigger>
                    
                    <div className="flex flex-wrap items-center gap-3 py-4 lg:py-0">
                       <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                          <Filter className="h-3.5 w-3.5 text-secondary" />
                          <span className="text-[10px] font-black uppercase text-slate-400 whitespace-nowrap">{t.table.filterLabel}</span>
                          <Select value={currentFilter} onValueChange={(v) => handlePlanFilterChange(plan.id, v)}>
                            <SelectTrigger className="h-8 border-none bg-transparent font-bold text-xs shadow-none focus:ring-0 p-0 w-[120px]">
                              <SelectValue placeholder="..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="all" className="font-bold text-xs">{isAr ? 'الكل' : 'All'}</SelectItem>
                              {t.assessmentTypes.map(at => (
                                <SelectItem key={at.v} value={at.v} className="font-bold text-xs">{at.l}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                       </div>

                       <div className="flex items-center gap-2">
                          <Button onClick={() => handlePrint(plan.id)} variant="outline" className="h-10 px-4 rounded-lg border-slate-200 text-primary font-black text-[10px] uppercase gap-2 bg-white hover:bg-slate-50 shadow-sm">
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
                                {visibleColumns.includes('assessment') && <th className="px-8 py-5 text-start">{t.table.assessment}</th>}
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
                                     <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">
                                       {currentFilter === 'all' ? (isAr ? 'لا توجد درجات مرصودة' : 'No grades recorded') : (isAr ? 'لا توجد نتائج لهذا النوع' : 'No results for this type')}
                                     </p>
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
                 </AccordionContent>

                 {/* PRINTABLE REPORT CARD COMPONENT (Hidden by default) */}
                 <div id={`printable-report-${plan.id}`} className="hidden print:block fixed inset-0 bg-white z-[9999] p-12 overflow-y-auto" dir="rtl">
                    <div className="text-center mb-8">
                       <p className="text-2xl font-bold mb-4 font-serif">{t.report.bismillah}</p>
                       <div className="flex justify-between items-center px-4">
                          <div className="text-start w-1/3 space-y-1">
                             <h2 className="text-xl font-black text-[#0b1f5b] uppercase leading-none">{t.report.academyEn}</h2>
                             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.report.subEn}</p>
                          </div>
                          <div className="flex justify-center w-1/3">
                             <img src="/logo.png" className="h-28 w-28 object-contain" alt="Logo" />
                          </div>
                          <div className="text-end w-1/3 space-y-1">
                             <h2 className="text-xl font-black text-[#0b1f5b] font-arabic leading-none">{t.report.academyAr}</h2>
                             <p className="text-[10px] font-black text-slate-500 font-arabic">{t.report.subAr}</p>
                          </div>
                       </div>
                    </div>

                    <div className="h-1.5 w-full bg-[#0b1f5b] my-8" />

                    <div className="text-center space-y-8 my-12">
                       <h1 className="text-4xl font-black text-slate-900 border-b-4 border-[#0b1f5b] inline-block pb-2 px-10 uppercase tracking-tight">{t.report.certTitle}</h1>
                       <div className="text-xl font-bold text-slate-700 space-y-4">
                          <p>{t.report.certIntro} <span className="text-[#0b1f5b] font-black mx-2 text-3xl underline underline-offset-8"> {student?.firstName} {student?.lastName} </span></p>
                          <p>{isAr ? 'السجل الدراسي لـ:' : 'Academic Plan:'} <span className="text-[#1A73E8] font-black mx-1"> {plan.name} </span> | {isAr ? 'العام:' : 'AY:'} <span className="text-[#1A73E8] font-black mx-1"> {plan.year} </span></p>
                          <p className="text-sm opacity-70 italic">{t.report.certMeta}</p>
                       </div>
                    </div>

                    <table className="w-full border-collapse border-4 border-[#0b1f5b] mb-16 overflow-hidden rounded-lg shadow-xl">
                       <thead>
                          <tr className="bg-[#0b1f5b] text-white text-lg">
                             <th className="border-2 border-white/20 p-5 w-[35%]">{isAr ? 'المادة الدراسية' : 'Subject'} / Subject</th>
                             <th className="border-2 border-white/20 p-5">{isAr ? 'التقييمات' : 'Assessments'}</th>
                             <th className="border-2 border-white/20 p-5">{isAr ? 'الاختبار النهائي' : 'Final Exam'}</th>
                             <th className="border-2 border-white/20 p-5">{t.report.totalScore}</th>
                             <th className="border-2 border-white/20 p-5">{isAr ? 'التقدير' : 'Grade'}</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {plan.subjects.map((sub: any, sIdx: number) => {
                             const subName = isAr ? (sub.nameAr || sub.nameEn) : (sub.nameEn || sub.nameAr);
                             const subGrades = planGrades.filter(g => g.subject === subName);
                             const finalExam = subGrades.find(g => g.assessmentName === 'Final Exam');
                             const nonFinals = subGrades.filter(g => g.assessmentName !== 'Final Exam');
                             
                             const avgScore = subGrades.length ? Math.round(subGrades.reduce((a,c) => a + (Number(c.score)/Number(c.totalScore))*100, 0) / subGrades.length) : 0;
                             
                             return (
                               <tr key={sIdx} className="text-center font-bold text-slate-800 odd:bg-slate-50/50">
                                  <td className="border-2 border-slate-100 p-5 text-start">
                                     <div className="flex flex-col">
                                        <span className="text-lg font-black text-[#0b1f5b]">{sub.nameAr}</span>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{sub.nameEn}</span>
                                     </div>
                                  </td>
                                  <td className="border-2 border-slate-100 p-5">
                                     <div className="flex flex-col gap-1">
                                        {nonFinals.length > 0 ? (
                                           nonFinals.map((ng, ni) => <span key={ni} className="text-[10px] text-slate-500">{ng.assessmentName}: {ng.score}</span>)
                                        ) : '-'}
                                     </div>
                                  </td>
                                  <td className="border-2 border-slate-100 p-5 text-xl">{finalExam ? finalExam.score : '-'}</td>
                                  <td className="border-2 border-slate-100 p-5 text-2xl font-black text-[#0b1f5b]">{avgScore}%</td>
                                  <td className="border-2 border-slate-100 p-5">
                                     <div className="h-10 w-10 rounded bg-[#0b1f5b] text-white flex items-center justify-center mx-auto text-xl">{getLetterGrade(avgScore)}</div>
                                  </td>
                               </tr>
                             );
                          })}
                       </tbody>
                    </table>

                    <div className="grid grid-cols-2 gap-32 mt-20 px-10">
                       <div className="text-center space-y-16">
                          <p className="font-black border-b-2 border-[#0b1f5b] pb-3 text-lg uppercase tracking-tight">{t.report.signReg}</p>
                          <div className="h-24" />
                       </div>
                       <div className="text-center space-y-16">
                          <p className="font-black border-b-2 border-[#0b1f5b] pb-3 text-lg uppercase tracking-tight">{t.report.signAdmin}</p>
                          <div className="h-24 relative flex flex-col items-center justify-center">
                             <p className="font-black text-[#0b1f5b] text-xl mt-4">Dr. Mustafa Ali</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase">Academy Director</p>
                          </div>
                       </div>
                    </div>

                    <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center opacity-40">
                       <p className="text-[9px] font-bold text-slate-400">OFFICIAL ACADEMIC RECORD - BBA OS VERSION 2.0</p>
                       <p className="text-[9px] font-bold text-slate-400" dir="ltr">{new Date().toLocaleDateString()}</p>
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
                 ? 'تستخدم هذه الجداول كمرجع أساسي لإصدار التقارير الأكاديمية والشهادات. يتم حساب التقديرات تلقائياً لضمان الدقة وتوفير سجل أكاديمي شامل للطالب.' 
                 : 'These tables serve as the primary reference for academic reports and certificates. Grades are calculated automatically to ensure accuracy and maintain a comprehensive academic record.'}
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
