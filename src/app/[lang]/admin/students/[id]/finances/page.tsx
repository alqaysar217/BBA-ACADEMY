
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { 
  CreditCard, User, BookOpen, ClipboardCheck, 
  ChevronLeft, ChevronRight, DollarSign, TrendingUp,
  AlertTriangle, CheckCircle2, History, Plus,
  Download, Filter, ArrowUpRight, Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function StudentFinancePage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading } = useDoc(studentRef);

  if (loading) return <div className="p-20 text-center animate-pulse">Loading Financial Ledger...</div>;
  if (!student) return <div className="p-20 text-center text-red-500 uppercase font-black">Student Not Found</div>;

  const t = {
    title: isAr ? 'السجل المالي للطالب' : 'Student Financial Ledger',
    nav: {
      profile: isAr ? 'الملف الشخصي' : 'Identity',
      finances: isAr ? 'السجل المالي' : 'Finances',
      academic: isAr ? 'المسار الأكاديمي' : 'Academics',
      grades: isAr ? 'الدرجات' : 'Gradebook'
    },
    stats: {
      due: isAr ? 'إجمالي المستحق' : 'Total Due',
      paid: isAr ? 'إجمالي المحصل' : 'Total Paid',
      balance: isAr ? 'الرصيد المتبقي' : 'Outstanding Balance'
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm rounded-2xl bg-slate-900 text-white p-8 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{t.stats.due}</p>
            <h3 className="text-4xl font-black">${student.financialLedger?.totalDue?.toLocaleString()}</h3>
         </Card>
         <Card className="border-none shadow-sm rounded-2xl bg-green-500 text-white p-8 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{t.stats.paid}</p>
            <h3 className="text-4xl font-black">${student.financialLedger?.totalPaid?.toLocaleString()}</h3>
         </Card>
         <Card className="border-none shadow-sm rounded-2xl bg-white border border-slate-100 p-8 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.stats.balance}</p>
            <h3 className="text-4xl font-black text-red-500">${((student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0)).toLocaleString()}</h3>
         </Card>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
         <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-xl font-black uppercase flex items-center gap-4">
                  <History className="h-6 w-6 text-secondary" /> {isAr ? 'سجل العمليات المالية' : 'Transaction History'}
               </CardTitle>
               <CardDescription className="font-bold">Itemized billing and payment receipts.</CardDescription>
            </div>
            <Button className="rounded-xl bg-primary text-white font-black text-[10px] h-11 px-8 shadow-xl">
               <Plus className="h-4 w-4 mr-2" /> ADD TRANSACTION
            </Button>
         </CardHeader>
         <CardContent className="p-0">
            <div className="py-20 text-center space-y-4">
               <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
                  <CreditCard className="h-8 w-8 text-slate-200" />
               </div>
               <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">No transaction history found for this session.</p>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
