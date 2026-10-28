
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { 
  BookOpen, User, CreditCard, ClipboardCheck, 
  ChevronLeft, ChevronRight, Target, Clock,
  Award, Layers, PencilLine, Plus, Search,
  ArrowUpRight, Users, Loader2, FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function StudentAcademicPlanPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading } = useDoc(studentRef);

  if (loading || !student) return <div className="p-20 text-center animate-pulse"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" /></div>;

  const t = {
    title: isAr ? 'المسار الأكاديمي للطالب' : 'Student Academic Pathway',
    back: isAr ? 'العودة' : 'Back',
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
      <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar bg-white/50 p-1 rounded-xl">
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

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32">
      <NavigationBar />

      <div className="flex items-center justify-between px-2">
         <Button variant="ghost" onClick={() => router.back()} className="text-slate-400 font-black text-[10px] uppercase gap-2 p-0 hover:text-primary transition-colors">
            {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />} {isAr ? 'العودة' : 'Back'}
         </Button>
         <h1 className="text-xl font-black uppercase text-primary tracking-tight">{t.title} — {student.firstName}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
            <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between text-start">
               <div>
                  <CardTitle className="text-xl font-black uppercase flex items-center gap-4">
                     <Layers className="h-6 w-6 text-secondary" /> {isAr ? 'الدورات المخصصة' : 'Active Course Load'}
                  </CardTitle>
                  <CardDescription className="font-bold">Managed via Edgenuity Sync Integration.</CardDescription>
               </div>
               <Button variant="outline" className="rounded-xl font-black text-[10px] h-11 px-8 border-slate-200">
                  EDIT STUDENT PLAN
               </Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="py-24 text-center space-y-5">
                  <div className="h-20 w-20 rounded-3xl bg-slate-50 text-slate-200 flex items-center justify-center mx-auto shadow-inner">
                     <BookOpen className="h-10 w-10" />
                  </div>
                  <p className="text-slate-300 font-black uppercase text-[10px] tracking-[0.2em] px-10">
                     Official study plan has not been initialized for AY 2026-2027.
                  </p>
                  <Button className="bg-primary text-white font-black text-[10px] uppercase h-12 px-10 rounded-xl shadow-xl shadow-primary/20">
                     Initialize Student Plan
                  </Button>
               </div>
            </CardContent>
         </Card>

         <div className="space-y-8">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden text-start">
               <div className="absolute top-0 right-0 p-8 opacity-10"><Award className="h-32 w-32 text-secondary" /></div>
               <h4 className="text-lg font-black uppercase tracking-tight relative z-10">{isAr ? 'إحصائيات الإنجاز' : 'Achievement Metrics'}</h4>
               <div className="space-y-6 relative z-10">
                  <div className="space-y-2">
                     <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Total Progress</span>
                        <span className="text-3xl font-black text-white">{student.academicPlan?.progress || 0}%</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary shadow-[0_0_15px_rgba(var(--secondary),0.5)]" style={{ width: `${student.academicPlan?.progress || 0}%` }} />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                        <p className="text-[9px] font-black text-white/40 uppercase">Target</p>
                        <p className="text-xl font-black">10 Courses</p>
                     </div>
                     <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                        <p className="text-[9px] font-black text-white/40 uppercase">Done</p>
                        <p className="text-xl font-black text-secondary">0</p>
                     </div>
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
