
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
      reportType: isAr ? 'نوع التقرير' : 'Report Type',
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
      academyEn: 'Masjid Al-Salam & Banaat Academy for Distance Education & Academic Excellence',
      academyAr: 'أكاديمية البنين والبنات للتعليم عن بعد والتفوق الأكاديمي',
      certTitleEn: 'Official Semester Examination Report',
      certTitleAr: 'شهادة نتيجة الاختبار الفصلي',
      certIntroEn: 'The Administration of Baneen and Banaat Academy hereby certifies that the student:',
      certIntroAr: 'تشهد إدارة أكاديمية البنين والبنات - ميشيغان، بأن الطالب/ـة:',
      certMetaEn: 'has successfully completed the requirements for the indicated academic term. In recognition of their fruitful efforts and perseverance, this certificate is awarded with our best wishes for continued success.',
      certMetaAr: 'قد أتم/ت متطلبات الاختبارات للفصل الدراسي المحدد بكل جدارة واقتدار، وتقديراً لجهوده/ا المثمرة ومثابرته/ا، تُمنح هذه الشهادة مع خالص التمنيات له/ا دوام النجاح والتألق.',
      signAdminEn: 'Academy Director',
      signAdminAr: 'مدير الأكاديمية',
      signTeacherEn: 'Subject Teacher',
      signTeacherAr: 'معلم المادة',
      signRegEn: 'Admission & Registration',
      signRegAr: 'القبول والتسجيل',
      rowMonthlyEn: 'Monthly Assessment',
      rowMonthlyAr: 'الأعمال الشهرية',
      rowFinalEn: 'Term Examinations',
      rowFinalAr: 'الاختبارات الفصلية',
      rowTotalEn: 'Total (AR / EN)',
      rowTotalAr: 'الإجمالي (عربي / إنجليزي)',
      colGradeEn: 'Grade',
      colGradeAr: 'التقدير',
      colTotalEn: 'Total',
      colTotalAr: 'الإجمالي',
      colSubjectEn: 'Course Name',
      colSubjectAr: 'اسم المادة',
      overallScore: 'Total Points / الإجمالي الكلي لجميع النقاط',
      overallGrade: 'Overall Grade / التقدير الكلي',
      finalResult: 'Final Result / النتيجة النهائية',
      pass: 'Pass / ناجح ومنقول إلى الصف التالي',
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
    const reportEl = document.getElementById(`printable-report-${planId}`);
    if (!reportEl) return;

    const styleId = 'print-engine-styles';
    let style = document.getElementById(styleId) as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }

    style.innerHTML = `
      @media print {
        @page { size: A4 portrait; margin: 0; }
        body * { visibility: hidden !important; overflow: visible !important; }
        #printable-report-${planId}, #printable-report-${planId} * { visibility: visible !important; }
        #printable-report-${planId} {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          width: 210mm !important;
          height: 297mm !important;
          margin: 0 !important;
          padding: 12mm !important;
          background: white !important;
          z-index: 9999999 !important;
          display: flex !important;
          flex-direction: column !important;
          box-sizing: border-box !important;
          font-family: 'Times New Roman', serif !important;
        }
        .print-only-block { display: block !important; }
        button, nav, header, footer, [role="dialog"], .dialog-overlay { display: none !important; }
      }
    `;

    setIsPrintDialogOpen(false);
    
    setTimeout(() => {
      window.print();
      style.innerHTML = '';
    }, 500);
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

      {/* 3. Export Config Dialog */}
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
                            onClick={(e) => {
                              e.stopPropagation();
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

                 {/* OFFICIAL A4 PORTRAIT REPORT CARD */}
                 <div id={`printable-report-${plan.id}`} className="hidden print-only-block" dir="ltr">
                    <div className="flex flex-col h-full bg-white text-slate-900 p-0 leading-normal">
                       
                       {/* [ Bismillah ] */}
                       <div className="text-center mb-6">
                          <p className="text-xl font-bold italic font-serif">{t.report.bismillah}</p>
                       </div>

                       {/* [ Main Header - 3 Columns ] */}
                       <div className="flex items-center justify-between border-b-4 border-slate-900 pb-6 mb-8 gap-4">
                          {/* Right (Arabic Text) */}
                          <div className="text-right w-[35%] font-arabic" dir="rtl">
                             <h2 className="text-sm font-black text-slate-900 leading-tight">{t.report.academyAr}</h2>
                             <p className="text-[9px] font-bold text-slate-500 mt-1">ميشيغان - الولايات المتحدة الأمريكية</p>
                          </div>
                          {/* Center (Logo) */}
                          <div className="shrink-0">
                             <img src="/logo.png" className="h-20 w-20 object-contain" alt="BBA Logo" />
                          </div>
                          {/* Left (English Text) */}
                          <div className="text-left w-[35%]">
                             <h2 className="text-sm font-black text-slate-900 leading-tight uppercase">{t.report.academyEn}</h2>
                             <p className="text-[9px] font-bold text-slate-500 mt-1">Michigan - USA</p>
                          </div>
                       </div>

                       {/* [ Certificate Title ] */}
                       <div className="text-center space-y-2 mb-10">
                          <h1 className="text-3xl font-black uppercase tracking-widest text-slate-900">
                             {t.report.certTitleEn}
                          </h1>
                          <h2 className="text-xl font-black font-arabic text-slate-800" dir="rtl">
                             {t.report.certTitleAr}
                          </h2>
                          <div className="flex justify-center gap-10 pt-2 font-bold text-sm text-slate-600">
                             <span>Academic Year / العام الدراسي: {plan.year}</span>
                             <span>Term / الفصل الدراسي: {plan.term}</span>
                          </div>
                       </div>

                       {/* [ Formal Intro Text ] */}
                       <div className="text-center space-y-6 mb-12">
                          <div className="space-y-1">
                             <p className="text-sm italic text-slate-500 font-serif">{t.report.certIntroEn}</p>
                             <p className="text-base font-arabic font-bold text-slate-700" dir="rtl">{t.report.certIntroAr}</p>
                          </div>
                          
                          <div className="relative inline-block px-16 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl">
                             <h2 className="text-2xl font-black text-primary uppercase">{student?.firstName} {student?.lastName}</h2>
                             <div className="text-xs font-bold text-slate-400 mt-1">Grade / الصف: {student?.gradeLevel}</div>
                          </div>

                          <div className="space-y-1 max-w-3xl mx-auto">
                             <p className="text-sm italic text-slate-500 font-serif leading-relaxed px-10">{t.report.certMetaEn}</p>
                             <p className="text-base font-arabic font-bold text-slate-700 leading-relaxed px-10" dir="rtl">{t.report.certMetaAr}</p>
                          </div>
                       </div>

                       {/* [ Matrix Grade Table ] */}
                       <div className="flex-1 mb-10 overflow-hidden">
                          <table className="w-full border-collapse text-center table-fixed border-[3px] border-slate-900">
                             <thead className="bg-slate-900 text-white">
                                <tr className="h-20">
                                   <th className="border-r border-white/20 w-[180px] text-[10px] font-black uppercase">
                                      {t.report.colSubjectEn}<br/>{t.report.colSubjectAr}
                                   </th>
                                   {plan.subjects.map((sub: any, sIdx: number) => (
                                     <th key={sIdx} className="border-r border-white/20 px-1 text-[9px] font-bold">
                                        <div className="flex flex-col gap-1 uppercase">
                                           <span className="truncate">{sub.nameEn || sub.nameAr}</span>
                                           <div className="h-px w-6 bg-white/20 mx-auto" />
                                           <span className="font-arabic" dir="rtl">{sub.nameAr || sub.nameEn}</span>
                                        </div>
                                     </th>
                                   ))}
                                   <th className="border-r border-white/20 w-[80px] text-[10px] font-black uppercase">
                                      {t.report.colGradeEn}<br/>{t.report.colGradeAr}
                                   </th>
                                   <th className="w-[80px] text-[10px] font-black uppercase">
                                      {t.report.colTotalEn}<br/>{t.report.colTotalAr}
                                   </th>
                                </tr>
                             </thead>
                             <tbody className="text-[12px] font-bold">
                                {/* Row 1: Monthly Assessment */}
                                <tr className="h-16 border-b-2 border-slate-200 bg-slate-50/50">
                                   <td className="border-r-2 border-slate-200 font-black uppercase text-[10px] bg-slate-100/50 text-left px-4">
                                      {t.report.rowMonthlyEn}<br/>
                                      <span className="font-arabic text-xs" dir="rtl">{t.report.rowMonthlyAr}</span>
                                   </td>
                                   {plan.subjects.map((sub: any, sIdx: number) => {
                                      const grade = planGradesRaw.find(g => g.planId === plan.id && g.subject === (sub.nameEn || sub.nameAr) && g.reportType === 'monthly');
                                      return (
                                        <td key={sIdx} className="border-r-2 border-slate-200 text-lg">
                                          {grade ? grade.score : '-'}
                                        </td>
                                      );
                                   })}
                                   <td className="border-r-2 border-slate-200 bg-slate-100">-</td>
                                   <td className="bg-slate-100">-</td>
                                </tr>

                                {/* Row 2: Term Examinations */}
                                <tr className="h-16 border-b-2 border-slate-200">
                                   <td className="border-r-2 border-slate-200 font-black uppercase text-[10px] bg-slate-100/50 text-left px-4">
                                      {t.report.rowFinalEn}<br/>
                                      <span className="font-arabic text-xs" dir="rtl">{t.report.rowFinalAr}</span>
                                   </td>
                                   {plan.subjects.map((sub: any, sIdx: number) => {
                                      const grade = planGradesRaw.find(g => g.planId === plan.id && g.subject === (sub.nameEn || sub.nameAr) && g.reportType === 'final');
                                      return (
                                        <td key={sIdx} className="border-r-2 border-slate-200 text-lg">
                                          {grade ? grade.score : '-'}
                                        </td>
                                      );
                                   })}
                                   <td className="border-r-2 border-slate-200 bg-slate-100">-</td>
                                   <td className="bg-slate-100">-</td>
                                </tr>

                                {/* Row 3: Totals */}
                                <tr className="h-20 bg-primary/5">
                                   <td className="border-r-2 border-slate-200 font-black uppercase text-[11px] text-primary text-left px-4">
                                      {t.report.rowTotalEn}<br/>
                                      <span className="font-arabic text-sm" dir="rtl">{t.report.rowTotalAr}</span>
                                   </td>
                                   {plan.subjects.map((sub: any, sIdx: number) => {
                                      const relevant = planGradesRaw.find(g => g.planId === plan.id && g.subject === (sub.nameEn || sub.nameAr) && g.reportType === printType);
                                      const pct = relevant ? Math.round((Number(relevant.score) / Number(relevant.totalScore)) * 100) : 0;
                                      return (
                                        <td key={sIdx} className="border-r-2 border-slate-200 font-black text-primary text-xl">
                                          {pct > 0 ? `${pct}%` : '-'}
                                        </td>
                                      );
                                   })}
                                   <td className="border-r-2 border-slate-200 bg-slate-900 text-white font-black text-2xl">
                                      {stats.avg > 0 ? getLetterGrade(stats.avg) : '-'}
                                   </td>
                                   <td className="bg-slate-900 text-white font-black text-2xl">
                                      {stats.avg}%
                                   </td>
                                </tr>
                             </tbody>
                          </table>
                       </div>

                       {/* [ Summary Totals ] */}
                       <div className="grid grid-cols-3 gap-6 mb-12">
                          <div className="border-[3px] border-slate-900 p-5 rounded-2xl text-center bg-slate-50 space-y-1">
                             <p className="text-[10px] font-black uppercase text-slate-400">{t.report.overallScore}</p>
                             <p className="text-3xl font-black text-primary">{stats.avg}%</p>
                          </div>
                          <div className="border-[3px] border-slate-900 p-5 rounded-2xl text-center bg-slate-50 space-y-1">
                             <p className="text-[10px] font-black uppercase text-slate-400">{t.report.overallGrade}</p>
                             <p className="text-3xl font-black text-primary">{getLetterGrade(stats.avg)}</p>
                          </div>
                          <div className="border-[3px] border-slate-900 p-5 rounded-2xl text-center bg-slate-900 text-white space-y-1">
                             <p className="text-[10px] font-black uppercase text-white/50">{t.report.finalResult}</p>
                             <p className="text-xl font-black">{stats.avg >= 60 ? t.report.pass.split(' / ')[0] : t.report.fail.split(' / ')[0]}</p>
                             <p className="text-xs font-bold text-white/70 italic uppercase">{stats.avg >= 60 ? 'Pass' : 'Fail'}</p>
                          </div>
                       </div>

                       {/* [ Triple Signature Blocks ] */}
                       <div className="grid grid-cols-3 gap-12 text-center mt-auto pb-10">
                          <div className="space-y-16">
                             <p className="font-black uppercase text-[10px] tracking-widest text-slate-400 border-b border-slate-100 pb-2">
                                {t.report.signTeacherEn}<br/>{t.report.signTeacherAr}
                             </p>
                             <div className="pt-2 border-t-2 border-slate-900 min-h-[16px]">
                                <span className="text-[11px] font-bold text-slate-400">Signature & Date</span>
                             </div>
                          </div>
                          <div className="space-y-16">
                             <p className="font-black uppercase text-[10px] tracking-widest text-slate-400 border-b border-slate-100 pb-2">
                                {t.report.signRegEn}<br/>{t.report.signRegAr}
                             </p>
                             <div className="pt-2 border-t-2 border-slate-900 min-h-[16px]">
                                <span className="text-[11px] font-bold text-slate-400">Official Stamp</span>
                             </div>
                          </div>
                          <div className="space-y-16">
                             <p className="font-black uppercase text-[10px] tracking-widest text-slate-400 border-b border-slate-100 pb-2">
                                {t.report.signAdminEn}<br/>{t.report.signAdminAr}
                             </p>
                             <div className="pt-2 border-t-2 border-slate-900 relative">
                                <p className="text-sm font-black text-primary">Dr. Mustafa Ali</p>
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-[0.08] pointer-events-none">
                                   <img src="/logo.png" className="h-20 w-20 grayscale" />
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* [ Footer Details ] */}
                       <div className="flex justify-between items-center opacity-30 border-t border-slate-100 pt-6">
                          <p className="text-[8px] font-black uppercase tracking-widest">Digital Registry Verification: {id?.toUpperCase()}</p>
                          <p className="text-[8px] font-black uppercase tracking-widest">Issued On: {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                       </div>

                    </div>
                 </div>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>

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
