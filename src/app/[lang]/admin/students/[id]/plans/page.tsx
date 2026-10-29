'use client';

import { use, useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc, useCollection } from '@/firebase';
import { doc, collection, query, where, deleteDoc } from 'firebase/firestore';
import { 
  BookOpen, User, CreditCard, ClipboardCheck, 
  ChevronLeft, ChevronRight, Target, Clock,
  Award, Layers, PencilLine, Plus, Search,
  ArrowUpRight, Users, Loader2, FileText,
  Trash2, Calendar, LayoutTemplate, Eye,
  CheckCircle2, AlertTriangle, FileSearch, Star, GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
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

export default function StudentPlansListPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading: studentLoading } = useDoc(studentRef);

  const plansQuery = useMemo(() => {
    if (!firestore || !id) return null;
    return query(
      collection(firestore, 'academic_plans'), 
      where('studentId', '==', id)
    );
  }, [firestore, id]);

  const { data: rawPlans, loading: plansLoading } = useCollection(plansQuery);

  const plans = useMemo(() => {
    if (!rawPlans) return [];
    return [...rawPlans].sort((a: any, b: any) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [rawPlans]);

  const t = {
    title: isAr ? 'السجل الأكاديمي والخطط' : 'Academic Registry & Plans',
    back: isAr ? 'العودة' : 'Back',
    createNew: isAr ? 'إنشاء خطة دراسية جديدة' : 'Create New Study Plan',
    empty: isAr ? 'لا توجد خطط دراسية مسجلة لهذا الطالب حالياً.' : 'No study plans recorded for this student yet.',
    emptySub: isAr ? 'ابدأ بتصميم خطة مخصصة تلبي احتياجات الطالب الأكاديمية.' : 'Start by designing a custom plan tailored to the student\'s academic needs.',
    statusLabels: {
      draft: isAr ? 'مسودة' : 'Draft',
      approved: isAr ? 'معتمدة' : 'Approved',
      in_progress: isAr ? 'قيد التنفيذ' : 'In Progress',
      completed: isAr ? 'مكتملة' : 'Completed',
      archived: isAr ? 'مؤرشفة' : 'Archived'
    },
    nav: {
      profile: isAr ? 'الهوية' : 'Identity',
      guardians: isAr ? 'أولياء الأمور' : 'Guardians',
      documents: isAr ? 'المستندات' : 'Documents',
      academic: isAr ? 'خطة الطالب' : 'Study Plan',
      grades: isAr ? 'الدرجات' : 'Grades',
      finances: isAr ? 'المالية' : 'Finances'
    },
    confirmDelete: isAr ? 'هل أنت متأكد من حذف الخطة؟' : 'Are you sure you want to delete this plan?',
    confirmDeleteDesc: isAr ? 'سيتم حذف كافة المواد والموضوعات وسجلات المتابعة المرتبطة بها نهائياً.' : 'This will permanently remove all subjects, topics, and monitoring logs associated with it.',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    yesDelete: isAr ? 'تأكيد الحذف' : 'Yes, Delete Plan',
    openMonitor: isAr ? 'فتح المتابعة' : 'Open Monitoring',
    startAt: isAr ? 'تاريخ البدء' : 'Start Date',
    resp: isAr ? 'المسؤولية' : 'Responsibility',
    execProg: isAr ? 'تقدم التنفيذ' : 'Execution Progress'
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
      <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar bg-white/50 p-1 rounded-xl shadow-sm">
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

  const handleDelete = async () => {
    if (!deletePlanId || !firestore) return;
    try {
      await deleteDoc(doc(firestore, 'academic_plans', deletePlanId));
      toast({ title: isAr ? 'تم حذف الخطة' : 'Plan deleted successfully' });
      setDeletePlanId(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error deleting plan' });
    }
  };

  if (!mounted || studentLoading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'جاري مزامنة السجل الأكاديمي...' : 'Syncing Academic Registry...'}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4">
      <NavigationBar />

      {/* Student Identity Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="h-16 w-16 rounded-2xl bg-slate-50 border-4 border-white shadow-md overflow-hidden relative shrink-0">
             <Image 
              src={student?.photoURL || (student?.gender === 'Female' ? '/Female.png' : '/Male.png')} 
              alt="Student" 
              fill 
              className="object-cover"
              unoptimized 
             />
          </div>
          <div className="space-y-0.5 text-start overflow-hidden">
             <h1 className="text-xl font-black text-primary uppercase tracking-tight truncate">{student?.firstName} {student?.lastName}</h1>
             <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-secondary/5 text-secondary border-none font-black text-[9px] uppercase tracking-widest px-3">Grade {student?.gradeLevel}</Badge>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest font-mono truncate">ID: {id?.substring(0,8).toUpperCase()}</span>
             </div>
          </div>
        </div>
        <Button asChild className="w-full md:w-auto bg-primary text-white h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/10 gap-2 hover:bg-primary/90 transition-all active:scale-95">
          <Link href={`/${lang}/admin/students/${id}/plans/create`}>
            <Plus className="h-4 w-4 text-secondary" />
            {t.createNew}
          </Link>
        </Button>
      </div>

      <div className="px-2 text-start border-l-4 border-secondary pl-4">
         <h2 className="text-lg font-black uppercase text-primary tracking-widest">{t.title}</h2>
      </div>

      {plansLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2].map(i => <div key={i} className="h-48 bg-white rounded-3xl animate-pulse border border-slate-50" />)}
        </div>
      ) : plans.length === 0 ? (
        <div className="py-32 text-center bg-white/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] space-y-6 mx-2">
           <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto shadow-inner">
              <BookOpen className="h-10 w-10 text-slate-300" />
           </div>
           <div className="space-y-1">
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{t.empty}</p>
              <p className="text-[10px] font-bold text-slate-300 uppercase italic max-w-xs mx-auto leading-relaxed">{t.emptySub}</p>
           </div>
           <Button asChild variant="outline" className="border-secondary/20 text-secondary font-black text-[10px] h-11 px-10 rounded-xl uppercase tracking-widest hover:bg-secondary/5 shadow-sm bg-white">
              <Link href={`/${lang}/admin/students/${id}/plans/create`}>{t.createNew}</Link>
           </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {plans.map((plan: any) => (
             <Card key={plan.id} className="border-none shadow-premium bg-white rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-slate-100">
                <CardHeader className="bg-slate-50/50 p-6 md:p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                   <div className="flex items-center gap-4 text-start overflow-hidden">
                      <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform shrink-0">
                         <Target className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="space-y-0.5 overflow-hidden">
                         <CardTitle className="text-sm md:text-base font-black uppercase text-primary tracking-tight truncate">{plan.name}</CardTitle>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{plan.year} • {plan.term}</p>
                      </div>
                   </div>
                   <Badge className={cn(
                     "border-none font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-md shadow-sm shrink-0",
                     plan.status === 'approved' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                   )}>
                      {t.statusLabels[plan.status as keyof typeof t.statusLabels] || plan.status}
                   </Badge>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                   <div className="grid grid-cols-2 gap-6 text-start">
                      <div className="space-y-1 overflow-hidden">
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.startAt}</p>
                         <p className="text-xs font-bold text-slate-600 flex items-center gap-2 truncate"><Calendar className="h-3 w-3 text-secondary" /> {plan.startDate || '-'}</p>
                      </div>
                      <div className="space-y-1 overflow-hidden">
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.resp}</p>
                         <p className="text-xs font-bold text-slate-600 flex items-center gap-2 truncate"><Users className="h-3 w-3 text-secondary" /> {plan.responsibleTeacher || '-'}</p>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <div className="flex justify-between items-end">
                         <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                           <Layers className="h-3 w-3 text-secondary" /> {t.execProg}
                         </p>
                         <span className="text-lg font-black text-primary">{plan.progress || 0}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100">
                         <div className="h-full bg-secondary transition-all duration-1000 shadow-[0_0_12px_rgba(var(--secondary),0.4)]" style={{ width: `${plan.progress || 0}%` }} />
                      </div>
                   </div>

                   <div className="pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
                      <div className="flex gap-2">
                         <Button onClick={() => setDeletePlanId(plan.id)} size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-red-200 hover:text-red-500 hover:bg-red-50 transition-all">
                            <Trash2 className="h-4 w-4" />
                         </Button>
                         <Button asChild size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-200 hover:text-secondary hover:bg-secondary/5 transition-all">
                            <Link href={`/${lang}/admin/students/${id}/plans/editor/${plan.id}`}><PencilLine className="h-4 w-4" /></Link>
                         </Button>
                      </div>
                      <Button asChild className="bg-primary text-white font-black text-[10px] uppercase h-11 px-8 rounded-xl shadow-lg transition-all active:scale-95 group hover:bg-secondary">
                         <Link href={`/${lang}/admin/students/${id}/plans/${plan.id}`} className="flex items-center gap-2">
                            {t.openMonitor}
                            {isAr ? <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> : <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                         </Link>
                      </Button>
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePlanId} onOpenChange={(val) => !val && setDeletePlanId(null)}>
        <AlertDialogContent className="max-w-md rounded-2xl border-none shadow-2xl p-0 overflow-hidden bg-white">
          <div className="bg-red-500 p-8 text-white text-center flex flex-col items-center gap-4">
             <div className="h-16 w-16 rounded-xl bg-white/20 flex items-center justify-center shadow-xl"><Trash2 className="h-8 w-8 text-white" /></div>
             <AlertDialogTitle className="text-xl font-black uppercase tracking-tight">{t.confirmDelete}</AlertDialogTitle>
          </div>
          <div className="p-10 space-y-8 text-center">
             <AlertDialogDescription className="text-slate-600 font-bold text-base leading-relaxed">{t.confirmDeleteDesc}</AlertDialogDescription>
             <div className="flex flex-col gap-3">
               <Button onClick={handleDelete} className="h-14 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all">
                 {t.yesDelete}
               </Button>
               <Button variant="ghost" onClick={() => setDeletePlanId(null)} className="h-14 rounded-xl font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50">
                 {t.cancel}
               </Button>
             </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <style jsx global>{`
        .shadow-premium {
          box-shadow: 0 10px 15px -3px rgba(11, 31, 91, 0.03), 0 4px 6px -4px rgba(11, 31, 91, 0.02);
        }
      `}</style>
    </div>
  );
}
