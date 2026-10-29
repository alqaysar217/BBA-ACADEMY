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
  CheckCircle2, AlertTriangle, FileSearch, Star, GraduationCap,
  Sparkles,
  Zap
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
    <div className="max-w-7xl mx-auto space-y-10 pb-32 px-4">
      <NavigationBar />

      {/* Student Identity Header */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-xl">
        <div className="flex items-center gap-8 w-full md:w-auto">
          <div className="h-20 w-20 rounded-3xl bg-slate-50 border-4 border-white shadow-xl overflow-hidden relative shrink-0 transition-transform hover:rotate-3 duration-500">
             <Image 
              src={student?.photoURL || (student?.gender === 'Female' ? '/Female.png' : '/Male.png')} 
              alt="Student" 
              fill 
              className="object-cover"
              unoptimized 
             />
          </div>
          <div className="space-y-1 text-start overflow-hidden">
             <h1 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tight truncate leading-none">{student?.firstName} {student?.lastName}</h1>
             <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-secondary/10 text-secondary border-none font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-lg">Grade {student?.gradeLevel}</Badge>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] font-mono truncate">ID: {id?.substring(0,10).toUpperCase()}</span>
             </div>
          </div>
        </div>
        <Button asChild className="w-full md:w-auto bg-primary text-white h-16 px-10 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-primary/20 gap-3 hover:bg-secondary transition-all active:scale-95 group">
          <Link href={`/${lang}/admin/students/${id}/plans/create`}>
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
              <Plus className="h-5 w-5 text-secondary" />
            </div>
            {t.createNew}
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 px-2 text-start">
         <div className="h-10 w-2 bg-secondary rounded-full shadow-glow" />
         <h2 className="text-xl font-black uppercase text-primary tracking-widest">{t.title}</h2>
      </div>

      {plansLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1,2].map(i => <div key={i} className="h-64 bg-white rounded-[2.5rem] animate-pulse border border-slate-50" />)}
        </div>
      ) : plans.length === 0 ? (
        <div className="py-40 text-center bg-white/50 border-4 border-dashed border-slate-100 rounded-[3rem] space-y-8 mx-2 animate-in fade-in duration-1000">
           <div className="h-28 w-28 rounded-full bg-slate-50 flex items-center justify-center mx-auto shadow-inner">
              <BookOpen className="h-14 w-14 text-slate-200" />
           </div>
           <div className="space-y-2">
              <p className="text-slate-400 font-black uppercase text-sm tracking-[0.2em]">{t.empty}</p>
              <p className="text-[11px] font-bold text-slate-300 uppercase italic max-w-sm mx-auto leading-relaxed">{t.emptySub}</p>
           </div>
           <Button asChild className="bg-primary text-white font-black text-xs h-14 px-12 rounded-2xl uppercase tracking-widest shadow-xl hover:bg-secondary transition-all">
              <Link href={`/${lang}/admin/students/${id}/plans/create`}>{t.createNew}</Link>
           </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {plans.map((plan: any) => {
             const status = plan.status || 'draft';
             const isDraft = status === 'draft';
             const isApproved = status === 'approved';
             const isCompleted = status === 'completed';
             const isInProgress = status === 'in_progress';
             
             return (
               <Card key={plan.id} className={cn(
                 "border-none shadow-premium rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-700 relative",
                 isDraft ? "bg-slate-50/50 border-2 border-dashed border-slate-200" : "bg-white border border-slate-100",
                 isCompleted && "ring-2 ring-green-500/20"
               )}>
                  {/* Chic Status Strip */}
                  <div className={cn(
                    "h-2 w-full",
                    isDraft ? "bg-slate-300" : 
                    isApproved ? "bg-primary" : 
                    isInProgress ? "bg-secondary" : 
                    isCompleted ? "bg-green-500" : "bg-slate-400"
                  )} />

                  <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between text-start">
                     <div className="flex items-center gap-5 overflow-hidden">
                        <div className={cn(
                          "h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 shrink-0",
                          isDraft ? "bg-slate-100 text-slate-400" : 
                          isCompleted ? "bg-green-100 text-green-600" : "bg-primary text-white"
                        )}>
                           {isCompleted ? <Award className="h-7 w-7" /> : <Target className={cn("h-7 w-7", !isDraft && "text-secondary")} />}
                        </div>
                        <div className="space-y-1 overflow-hidden">
                           <CardTitle className={cn(
                             "text-lg md:text-xl font-black uppercase tracking-tight truncate",
                             isDraft ? "text-slate-400" : "text-primary"
                           )}>{plan.name}</CardTitle>
                           <div className="flex items-center gap-2">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{plan.year} • {plan.term}</p>
                           </div>
                        </div>
                     </div>
                     <Badge className={cn(
                       "border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm shrink-0",
                       isDraft ? "bg-slate-200 text-slate-600" : 
                       isApproved ? "bg-green-100 text-green-700" : 
                       isInProgress ? "bg-blue-100 text-blue-700 animate-pulse" :
                       isCompleted ? "bg-green-600 text-white" : "bg-slate-100 text-slate-500"
                     )}>
                        {t.statusLabels[status as keyof typeof t.statusLabels] || status}
                     </Badge>
                  </CardHeader>

                  <CardContent className="p-8 pt-4 space-y-8">
                     <div className="grid grid-cols-2 gap-6 text-start bg-slate-50/50 p-6 rounded-[1.5rem] shadow-inner border border-slate-100/50">
                        <div className="space-y-1 overflow-hidden">
                           <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{t.startAt}</p>
                           <p className="text-xs font-black text-slate-600 flex items-center gap-2 truncate">
                              <Calendar className="h-3.5 w-3.5 text-secondary opacity-60" /> 
                              {plan.startDate || '---'}
                           </p>
                        </div>
                        <div className="space-y-1 overflow-hidden">
                           <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{t.resp}</p>
                           <p className="text-xs font-black text-slate-600 flex items-center gap-2 truncate">
                              <Users className="h-3.5 w-3.5 text-secondary opacity-60" /> 
                              {plan.responsibleTeacher || '---'}
                           </p>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex justify-between items-end px-1">
                           <div className="flex items-center gap-3">
                              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shadow-sm", isDraft ? "bg-slate-100" : "bg-primary/5")}>
                                <Layers className={cn("h-4 w-4", isDraft ? "text-slate-300" : "text-secondary")} />
                              </div>
                              <p className={cn("text-[10px] font-black uppercase tracking-[0.3em]", isDraft ? "text-slate-300" : "text-primary")}>{t.execProg}</p>
                           </div>
                           <span className={cn("text-2xl font-black tracking-tighter", isDraft ? "text-slate-300" : "text-primary")}>{plan.progress || 0}%</span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/30">
                           <div className={cn(
                             "h-full transition-all duration-1000",
                             isDraft ? "bg-slate-300" : 
                             isCompleted ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : 
                             "bg-secondary shadow-[0_0_15px_rgba(var(--secondary),0.4)]"
                           )} style={{ width: `${plan.progress || 0}%` }} />
                        </div>
                     </div>

                     <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-2">
                           <Button onClick={() => setDeletePlanId(plan.id)} size="icon" variant="ghost" className="h-12 w-12 rounded-2xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
                              <Trash2 className="h-5 w-5" />
                           </Button>
                           <Button asChild size="icon" variant="ghost" className="h-12 w-12 rounded-2xl text-slate-300 hover:text-secondary hover:bg-secondary/5 transition-all border border-transparent hover:border-secondary/10">
                              <Link href={`/${lang}/admin/students/${id}/plans/editor/${plan.id}`}><PencilLine className="h-5 w-5" /></Link>
                           </Button>
                        </div>
                        
                        <Button asChild className={cn(
                          "h-14 px-10 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl transition-all active:scale-95 group",
                          isDraft ? "bg-slate-400 text-white" : "bg-primary text-white hover:bg-secondary shadow-primary/10"
                        )}>
                           <Link href={`/${lang}/admin/students/${id}/plans/${plan.id}`} className="flex items-center gap-3">
                              {t.openMonitor}
                              {isAr ? <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> : <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                           </Link>
                        </Button>
                     </div>
                  </CardContent>

                  {/* Corner Badge for Chic Effect */}
                  {!isDraft && (
                    <div className="absolute top-0 right-0 p-1 opacity-20 pointer-events-none group-hover:opacity-100 transition-opacity">
                       {isCompleted ? <Sparkles className="h-12 w-12 text-green-500 rotate-12" /> : <Zap className="h-12 w-12 text-secondary rotate-12" />}
                    </div>
                  )}
               </Card>
             );
           })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePlanId} onOpenChange={(val) => !val && setDeletePlanId(null)}>
        <AlertDialogContent className="max-w-md rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
          <div className="bg-red-500 p-10 text-white text-center flex flex-col items-center gap-5">
             <div className="h-20 w-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl animate-in zoom-in duration-500"><Trash2 className="h-10 w-10 text-white" /></div>
             <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight">{t.confirmDelete}</AlertDialogTitle>
          </div>
          <div className="p-10 space-y-10 text-center">
             <AlertDialogDescription className="text-slate-500 font-bold text-base leading-relaxed">{t.confirmDeleteDesc}</AlertDialogDescription>
             <div className="flex flex-col gap-4">
               <Button onClick={handleDelete} className="h-16 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest shadow-2xl shadow-red-500/30 hover:bg-red-700 transition-all text-sm">
                 {t.yesDelete}
               </Button>
               <Button variant="ghost" onClick={() => setDeletePlanId(null)} className="h-14 rounded-2xl font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 text-xs">
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
        .shadow-glow {
          box-shadow: 0 0 15px rgba(var(--secondary), 0.5);
        }
      `}</style>
    </div>
  );
}
