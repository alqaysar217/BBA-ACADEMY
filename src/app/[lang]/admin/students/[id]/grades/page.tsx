
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { 
  ClipboardCheck, User, CreditCard, BookOpen, 
  ChevronLeft, ChevronRight, Plus, Star,
  Award, Trash2, Edit3, Search, Filter,
  Download, ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function StudentGradesIndividualPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading } = useDoc(studentRef);

  if (loading) return <div className="p-20 text-center animate-pulse">Accessing Gradebook...</div>;
  if (!student) return <div className="p-20 text-center text-red-500 uppercase font-black">Student Not Found</div>;

  const t = {
    title: isAr ? 'سجل درجات الطالب' : 'Student Grade Registry',
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

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
         <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-xl font-black uppercase flex items-center gap-4">
                  <Award className="h-6 w-6 text-secondary" /> {isAr ? 'نتائج التقييمات' : 'Assessment Results'}
               </CardTitle>
               <CardDescription className="font-bold">Official marks and semester summaries.</CardDescription>
            </div>
            <Button className="rounded-xl bg-primary text-white font-black text-[10px] h-11 px-8 shadow-xl shadow-primary/10">
               <Plus className="h-4 w-4 mr-2" /> RECORD GRADE
            </Button>
         </CardHeader>
         <CardContent className="p-0">
            <div className="py-32 text-center space-y-6">
               <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center mx-auto shadow-inner">
                  <Star className="h-10 w-10 text-slate-100" />
               </div>
               <div className="space-y-1">
                  <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">No grades have been entered for the current semester.</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase">Sync with Edgenuity to import latest results.</p>
               </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
