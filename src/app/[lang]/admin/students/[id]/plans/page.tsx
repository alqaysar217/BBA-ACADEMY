
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
  ArrowUpRight
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

  if (loading) return <div className="p-20 text-center animate-pulse">Syncing Academic Data...</div>;
  if (!student) return <div className="p-20 text-center text-red-500 uppercase font-black">Student Not Found</div>;

  const t = {
    title: isAr ? 'المسار الأكاديمي للطالب' : 'Student Academic Pathway',
    nav: {
      profile: isAr ? 'الملف الشخصي' : 'Identity',
      finances: isAr ? 'السجل المالي' : 'Finances',
      academic: isAr ? 'المسار الأكاديمي' : 'Academics',
      grades: isAr ? 'الدرجات' : 'Gradebook'
    }
  };

  const NavigationBar = () => (
    <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
       {[
         { id: 'profile', label: t.nav.profile, icon: User, href: `/${lang}/admin/students/${id}` },
         { id: 'finances', label: t.nav.finances, icon: CreditCard, href: `/${lang}/admin/students/${id}/finances` },
         { id: 'academic', label: t.nav.academic, icon: BookOpen, href: `/${lang}/admin/students/${id}/plans` },
         { id: 'grades', label: t.nav.grades, icon: ClipboardCheck, href: `/${lang}/admin/students/${id}/grades` },
       ].map(nav => {
         const isActive = pathname === nav.href;
         return (
           <Button 
             key={nav.id} 
             asChild 
             variant={isActive ? "default" : "ghost"}
             className={cn(
               "rounded-xl h-11 px-6 font-black text-[10px] uppercase tracking-widest gap-2 shrink-0",
               isActive ? "bg-primary text-white shadow-xl" : "text-slate-400"
             )}
           >
             <Link href={nav.href}>
                <nav.icon className="h-4 w-4" />
                {nav.label}
             </Link>
           </Button>
         )
       })}
    </div>
  );

  return (
    <div className="space-y-8 pb-32">
      <div className="flex items-center justify-between">
         <Button variant="ghost" onClick={() => router.back()} className="text-slate-400 font-black text-[10px] uppercase gap-2">
            {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />} {isAr ? 'العودة' : 'Back'}
         </Button>
         <h1 className="text-xl font-black uppercase text-primary tracking-tight">{t.title} — {student.firstName}</h1>
      </div>

      <NavigationBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
            <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
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
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
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

            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10 space-y-6 border border-slate-100 flex flex-col items-center text-center">
               <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm">
                  <PencilLine className="h-8 w-8" />
               </div>
               <h4 className="font-black text-slate-900 uppercase text-sm">{isAr ? 'ملاحظات المعلم' : 'Educator Logs'}</h4>
               <p className="text-xs text-slate-400 font-bold leading-relaxed italic">No academic warnings or check-ins recorded for this week.</p>
               <Button variant="ghost" className="text-secondary font-black text-[10px] uppercase tracking-widest hover:bg-secondary/5">
                  <Plus className="h-4 w-4 mr-2" /> Add Entry
               </Button>
            </Card>
         </div>
      </div>
    </div>
  );
}
