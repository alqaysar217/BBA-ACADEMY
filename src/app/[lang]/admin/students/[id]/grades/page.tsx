
'use client';

import { use, useState, useMemo, useEffect, useRef } from 'react';
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
  Image as ImageIcon,
  Download,
  FileBadge,
  Type,
  Send,
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
import * as htmlToImage from 'html-to-image';

export default function StudentGradesIndividualPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const certificateRef = useRef<HTMLDivElement>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editGrade, setEditGrade] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Simulation & Export States
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [exportType, setExportType] = useState<'monthly' | 'final'>('final');
  const [isExportingImage, setIsExportingImage] = useState(false);

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
    export: {
      btn: isAr ? 'تصدير الشهادة' : 'Export Certificate',
      configTitle: isAr ? 'معاينة الشهادة الرسمية' : 'Official Certificate Preview',
      configDesc: isAr ? 'يرجى مراجعة بيانات الشهادة قبل التحميل كصورة.' : 'Please review the certificate data before downloading as an image.',
      download: isAr ? 'تحميل الشهادة كصورة' : 'Download Certificate Image',
      preparing: isAr ? 'جاري التوليد...' : 'Generating Image...',
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

  const downloadAsImage = async () => {
    if (!certificateRef.current) return;
    setIsExportingImage(true);
    try {
      // Fix for "font is undefined" trim error: Ensure fonts are loaded and use robust toPng options
      const dataUrl = await htmlToImage.toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        skipFonts: false,
        style: {
           // Force clean font inheritance to avoid trim() on undefined font property
           font: 'inherit'
        }
      });
      const link = document.createElement('a');
      link.download = `BBA_Certificate_${student?.firstName}_${selectedPlanId}.png`;
      link.href = dataUrl;
      link.click();
      setIsExportingDialogOpen(false);
      toast({ title: isAr ? "تم تحميل الصورة بنجاح" : "Image downloaded successfully" });
    } catch (error: any) {
      console.error('Export Error:', error);
      toast({ 
        variant: 'destructive', 
        title: "Export failed", 
        description: error.message || "Failed to process image capture." 
      });
    } finally {
      setIsExportingImage(false);
    }
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
                   <div className="flex items-center gap-4 text-start">
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

      {/* 3. Export Simulation Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="max-w-5xl rounded-2xl border-none shadow-2xl p-0 overflow-hidden flex flex-col h-[90vh]" dir={isAr ? 'rtl' : 'ltr'}>
           <div className="bg-primary p-6 text-white text-center flex flex-col items-center gap-3 shrink-0">
              <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center shadow-lg"><FileBadge className="h-6 w-6" /></div>
              <div className="space-y-0.5">
                <DialogTitle className="text-xl font-black uppercase tracking-tight">{t.export.configTitle}</DialogTitle>
                <DialogDescription className="text-white/60 font-bold text-xs">{t.export.configDesc}</DialogDescription>
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto bg-slate-100 p-8 custom-scrollbar">
              <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                 <div className="flex items-center gap-3">
                   <span className="text-[10px] font-black uppercase text-slate-400">{isAr ? 'نوع الكشف:' : 'Report Type:'}</span>
                   <Select value={exportType} onValueChange={(v: any) => setExportType(v)}>
                      <SelectTrigger className="h-10 w-44 border-slate-200 rounded-lg font-bold">
                         <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                         {t.reportTypes.map(rt => (
                           <SelectItem key={rt.v} value={rt.v} className="font-bold py-2.5 text-xs">{rt.l}</SelectItem>
                         ))}
                      </SelectContent>
                   </Select>
                 </div>
                 <Button 
                    onClick={downloadAsImage}
                    disabled={isExportingImage}
                    className="h-10 px-8 bg-secondary hover:bg-primary text-white font-black rounded-lg shadow-xl transition-all text-xs uppercase tracking-widest gap-2"
                 >
                    {isExportingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    {t.export.download}
                 </Button>
              </div>

              <div className="flex justify-center">
                 <div 
                   ref={certificateRef}
                   className="bg-white text-slate-900 flex flex-col relative font-sans shadow-2xl overflow-hidden" 
                   style={{ 
                     width: '210mm', 
                     height: '297mm', 
                     minHeight: '297mm', 
                     boxSizing: 'border-box',
                     fontFamily: 'var(--font-inter), sans-serif'
                   }}
                 >
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
                       <img src="/logo.png" className="w-96 h-96 grayscale" alt="watermark" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full border-[10mm] border-double border-primary/10 p-10" style={{ font: 'inherit' }}>
                       <div className="text-center font-serif font-black text-[16pt] text-primary mb-6">
                          بسم الله الرحمن الرحيم
                       </div>

                       <header className="grid grid-cols-3 items-start gap-6 border-b-2 border-primary/20 pb-6 mb-8">
                          <div className="text-center space-y-1">
                             <p className="text-[10pt] font-black text-primary leading-tight font-arabic">أكاديمية البنين والبنات للتعليم عن بعد والتفوق الأكاديمي</p>
                             <p className="text-[8pt] text-slate-500 font-bold font-arabic">ميشيغان - الولايات المتحدة الأمريكية</p>
                          </div>
                          
                          <div className="flex justify-center items-center">
                             <img src="/logo.png" className="h-20 w-20 object-contain" alt="Logo" />
                          </div>
                          
                          <div className="text-center space-y-1">
                             <p className="text-[9pt] font-black text-primary leading-tight">Masjid Al-Salam & Banaat Academy for Distance Education & Academic Excellence</p>
                             <p className="text-[8pt] text-slate-500 font-bold">Michigan - USA</p>
                          </div>
                       </header>

                       <div className="text-center mb-8 space-y-3">
                          <h1 className="bg-primary text-white py-3 px-12 rounded-lg inline-block text-[14pt] font-black uppercase tracking-widest shadow-lg">
                             {exportType === 'monthly' ? (isAr ? 'شهادة نتيجة الاختبار الشهري' : 'Monthly Examination Report') : (isAr ? 'شهادة نتيجة الاختبار الفصلي' : 'Semester Examination Report')}
                          </h1>
                          {plans.find(p => p.id === selectedPlanId) && (
                             <div className="flex justify-center gap-8 text-[11pt] font-black text-slate-600 uppercase tracking-tight pt-2">
                                <span>Academic Year: {plans.find(p => p.id === selectedPlanId)?.year}</span>
                                <span className="text-secondary opacity-30">|</span>
                                <span>Term: {plans.find(p => p.id === selectedPlanId)?.term}</span>
                             </div>
                          )}
                       </div>

                       <div className="text-center px-10 mb-10 space-y-4">
                          <p className="text-[12pt] text-slate-800 leading-relaxed font-arabic">
                             تشهد إدارة أكاديمية البنين والبنات - ميشيغان، بأن الطالب/ـة: 
                             <span className="mx-2 px-8 border-b-2 border-primary font-black text-primary text-[14pt]">{student?.firstName} {student?.lastName}</span>
                          </p>
                          <p className="text-[12pt] text-slate-800 leading-relaxed font-arabic">
                             بالمقيد في الصف / المرحلة: <span className="mx-2 font-black text-primary">{student?.gradeLevel}</span>، قد أتم/ت متطلبات الاختبارات للفصل الدراسي 
                             <span className="mx-2 font-black text-primary">{plans.find(p => p.id === selectedPlanId)?.term === 'First Semester' ? 'الأول' : 'الثاني'}</span> بكل جدارة واقتدار، وتقديراً لجهوده/ا المثمرة ومثابرته/ا، تُمنح هذه الشهادة مع خالص التمنيات له/ا دوام النجاح والتألق.
                          </p>
                       </div>

                       <div className="flex-1">
                          <table className="w-full border-collapse border-2 border-primary/20 text-[10pt]">
                             <thead>
                                <tr className="bg-primary text-white h-20">
                                   <th className="border border-white/20 p-3 text-center w-40 font-arabic uppercase leading-tight">اسم المادة <br/> Course Name</th>
                                   {plans.find(p => p.id === selectedPlanId)?.subjects?.map((sub: any, sIdx: number) => (
                                      <th key={sIdx} className="border border-white/20 p-2 text-center">
                                         <div className="font-arabic font-black leading-tight text-[11pt]">{sub.nameAr || '-'}</div>
                                         <div className="text-[9pt] font-medium opacity-80 uppercase">{sub.nameEn || '-'}</div>
                                      </th>
                                   ))}
                                   <th className="border border-white/20 p-3 text-center w-24 font-arabic uppercase">التقدير <br/> Grade</th>
                                   <th className="border border-white/20 p-3 text-center w-24 font-arabic uppercase">الإجمالي <br/> Total</th>
                                </tr>
                             </thead>
                             <tbody>
                                <tr className="bg-slate-50/50 h-14">
                                   <td className="border border-slate-200 p-4 font-black text-slate-700 font-arabic">Monthly Assessment <br/> الأعمال الشهرية</td>
                                   {plans.find(p => p.id === selectedPlanId)?.subjects?.map((sub: any, sIdx: number) => {
                                      const g = groupedGrades[selectedPlanId!]?.find(x => x.subject === (sub.nameEn || sub.nameAr) && x.reportType === 'monthly');
                                      return <td key={sIdx} className="border border-slate-200 p-2 text-center font-bold text-primary">{g ? g.score : '-'}</td>;
                                   })}
                                   <td className="border border-slate-200 p-2 text-center">-</td>
                                   <td className="border border-slate-200 p-2 text-center">-</td>
                                </tr>
                                <tr className="bg-white h-14">
                                   <td className="border border-slate-200 p-4 font-black text-slate-700 font-arabic">Term Examinations <br/> الاختبارات الفصلية</td>
                                   {plans.find(p => p.id === selectedPlanId)?.subjects?.map((sub: any, sIdx: number) => {
                                      const g = groupedGrades[selectedPlanId!]?.find(x => x.subject === (sub.nameEn || sub.nameAr) && x.reportType === 'final');
                                      return <td key={sIdx} className="border border-slate-200 p-2 text-center font-bold text-primary">{g ? g.score : '-'}</td>;
                                   })}
                                   <td className="border border-slate-200 p-2 text-center">-</td>
                                   <td className="border border-slate-200 p-2 text-center">-</td>
                                </tr>
                                <tr className="bg-secondary/5 font-black border-t-2 border-primary/10 h-16">
                                   <td className="border border-primary/10 p-4 text-primary font-arabic">Total (AR / EN) <br/> الإجمالي (عربي / إنجليزي)</td>
                                   {plans.find(p => p.id === selectedPlanId)?.subjects?.map((sub: any, sIdx: number) => {
                                      const grades = groupedGrades[selectedPlanId!]?.filter(g => g.subject === (sub.nameEn || sub.nameAr)) || [];
                                      const pct = grades.length ? Math.round(grades.reduce((a,b) => a + (Number(b.score)/Number(b.totalScore))*100, 0) / grades.length) : 0;
                                      return <td key={sIdx} className="border border-primary/10 p-2 text-center text-primary text-[12pt]">{pct > 0 ? `${pct}%` : '-'}</td>;
                                   })}
                                   <td className="border border-primary/10 p-2 text-center bg-primary text-white text-[12pt]">{stats.avg > 0 ? getLetterGrade(stats.avg) : '-'}</td>
                                   <td className="border border-primary/10 p-2 text-center bg-primary text-white text-[12pt]">{stats.avg}%</td>
                                </tr>
                             </tbody>
                          </table>

                          <div className="mt-8 grid grid-cols-3 gap-6 font-arabic px-2">
                             <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex justify-between items-center shadow-sm">
                                <span className="text-[10pt] font-black text-slate-400 uppercase tracking-widest">Total Points</span>
                                <span className="text-2xl font-black text-primary">{stats.avg}%</span>
                             </div>
                             <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex justify-between items-center shadow-sm">
                                <span className="text-[10pt] font-black text-slate-400 uppercase tracking-widest">Overall Grade</span>
                                <span className="text-2xl font-black text-primary">{stats.avg > 0 ? getLetterGrade(stats.avg) : '-'}</span>
                             </div>
                             <div className="bg-primary p-5 rounded-2xl shadow-xl flex justify-between items-center text-white">
                                <span className="text-[10pt] font-black opacity-60 uppercase">Final Result</span>
                                <span className="text-xl font-black">{isAr ? 'ناجح ومنقول' : 'PASS / PROMOTED'}</span>
                             </div>
                          </div>
                       </div>

                       <footer className="grid grid-cols-3 gap-12 mt-20 pt-10 border-t-2 border-slate-100 text-center font-arabic">
                          <div className="space-y-8">
                             <div className="space-y-1">
                                <p className="text-[11pt] font-black text-slate-900">معلم المادة</p>
                                <p className="text-[9pt] text-slate-400 font-bold uppercase tracking-widest">Subject Teacher</p>
                             </div>
                             <div className="pt-4 border-t border-slate-200 w-4/5 mx-auto">
                                <p className="text-[9pt] text-slate-300 italic">Signature & Date</p>
                             </div>
                          </div>
                          
                          <div className="space-y-8">
                             <div className="space-y-1">
                                <p className="text-[11pt] font-black text-slate-900">القبول والتسجيل</p>
                                <p className="text-[9pt] text-slate-400 font-bold uppercase tracking-widest">Admission & Registration</p>
                             </div>
                             <div className="pt-4 border-t border-slate-200 w-4/5 mx-auto">
                                <p className="text-[9pt] text-slate-300 italic">Official Seal</p>
                             </div>
                          </div>
                          
                          <div className="space-y-8">
                             <div className="space-y-1">
                                <p className="text-[11pt] font-black text-slate-900">مدير الأكاديمية</p>
                                <p className="text-[9pt] text-slate-400 font-bold uppercase tracking-widest">Academy Director</p>
                             </div>
                             <div className="pt-4 border-t border-slate-200 w-4/5 mx-auto">
                                <p className="text-[10pt] font-black text-primary">Dr. Mustafa Ali</p>
                                <p className="text-[9pt] text-slate-300 italic">Approved & Signed</p>
                             </div>
                          </div>
                       </footer>
                    </div>
                 </div>
              </div>
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
                              setSelectedPlanId(plan.id);
                              setIsExportDialogOpen(true);
                            }} 
                            variant="outline" 
                            className="h-10 px-4 rounded-lg border-slate-200 text-primary font-black text-[10px] uppercase gap-2 bg-white hover:bg-slate-50 shadow-sm"
                          >
                             <ImageIcon className="h-4 w-4" /> {t.export.btn}
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
                                      <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'لا توجد سجلات درجات متاحة' : 'No grade records found'}</p>
                                   </td>
                                </tr>
                             ) : (
                                filteredGrades.map((g: any) => {
                                   const percent = Math.round((Number(g.score) / Number(g.totalScore)) * 100);
                                   const letter = getLetterGrade(percent);
                                   return (
                                      <tr key={g.id} className="hover:bg-slate-50/50 transition-colors">
                                         {visibleColumns.includes('subject') && (
                                            <td className="px-8 py-5 font-bold text-slate-900 text-start">
                                               <div className="flex items-center gap-3">
                                                  <div className="h-8 w-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center font-black text-xs">{g.subject?.[0]}</div>
                                                  <div>
                                                     <p className="font-black text-xs text-primary">{g.subject}</p>
                                                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{g.planName} • {g.reportType}</span>
                                                  </div>
                                               </div>
                                            </td>
                                         )}
                                         {visibleColumns.includes('result') && (
                                            <td className="px-8 py-5 text-center">
                                               <span className="font-black text-xs text-slate-700">{g.score} / {g.totalScore}</span>
                                            </td>
                                         )}
                                         {visibleColumns.includes('percent') && (
                                            <td className="px-8 py-5 text-center">
                                               <span className={cn("inline-flex px-3 py-1 rounded-full text-[10px] font-black", percent >= 60 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")}>
                                                  {percent}%
                                               </span>
                                            </td>
                                         )}
                                         {visibleColumns.includes('grade') && (
                                            <td className="px-8 py-5 text-center">
                                               <span className="h-8 w-8 rounded-lg bg-slate-100 text-slate-700 inline-flex items-center justify-center font-black text-xs">{letter}</span>
                                            </td>
                                         )}
                                         {visibleColumns.includes('date') && (
                                            <td className="px-8 py-5 text-center font-bold text-xs text-slate-400">{g.date}</td>
                                         )}
                                         <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                               <Button variant="ghost" size="icon" onClick={() => { setEditGrade(g); setFormData({ planId: g.planId, subject: g.subject, reportType: g.reportType, score: g.score, totalScore: g.totalScore, date: g.date }); setIsAddOpen(true); }} className="h-9 w-9 text-slate-400 hover:text-primary rounded-lg">
                                                  <Edit3 className="h-4 w-4" />
                                               </Button>
                                               <Button variant="ghost" size="icon" onClick={() => setDeleteId(g.id)} className="h-9 w-9 text-slate-400 hover:text-rose-600 rounded-lg">
                                                  <Trash2 className="h-4 w-4" />
                                               </Button>
                                            </div>
                                         </td>
                                      </tr>
                                   );
                                })
                             )}
                          </tbody>
                       </table>
                    </div>
                 </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl p-0 overflow-hidden bg-white">
           <div className="bg-red-500 p-8 text-white flex flex-col items-center gap-4 text-center">
              <div className="h-16 w-16 rounded-xl bg-white/20 flex items-center justify-center shadow-xl"><AlertTriangle className="h-8 w-8" /></div>
              <AlertDialogTitle className="text-xl font-black uppercase tracking-tight">{t.confirmDelete}</AlertDialogTitle>
           </div>
           <div className="p-8 space-y-8">
              <AlertDialogDescription className="text-slate-500 font-bold text-sm text-center leading-relaxed">{t.deleteDesc}</AlertDialogDescription>
              <div className="flex flex-col gap-3">
                 <Button onClick={handleDelete} className="h-14 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 hover:bg-red-700">
                    {isAr ? 'تأكيد الحذف' : 'Delete Now'}
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
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

