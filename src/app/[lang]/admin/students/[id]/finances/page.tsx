
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
  Download, Filter, ArrowUpRight, Search, Users, Loader2, FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function StudentFinancePage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading } = useDoc(studentRef);

  if (loading || !student) return <div className="p-20 text-center animate-pulse"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" /></div>;

  const t = {
    title: isAr ? 'السجل المالي للطالب' : 'Student Financial Ledger',
    back: isAr ? 'العودة' : 'Back',
    nav: {
      profile: isAr ? 'الهوية' : 'Identity',
      guardians: isAr ? 'أولياء الأمور' : 'Guardians',
      documents: isAr ? 'المستندات' : 'Documents',
      academic: isAr ? 'خطة الطالب' : 'Study Plan',
      grades: isAr ? 'الدرجات' : 'Grades',
      finances: isAr ? 'المالية' : 'Finances'
    },
    stats: {
      due: isAr ? 'إجمالي المستحق' : 'Total Due',
      paid: isAr ? 'إجمالي المحصل' : 'Total Paid',
      balance: isAr ? 'الرصيد المتبقي' : 'Outstanding Balance'
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm rounded-2xl bg-slate-900 text-white p-8 space-y-4 text-start">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{t.stats.due}</p>
            <h3 className="text-4xl font-black">${(student.financialLedger?.totalDue || 0).toLocaleString()}</h3>
         </Card>
         <Card className="border-none shadow-sm rounded-2xl bg-green-500 text-white p-8 space-y-4 text-start">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{t.stats.paid}</p>
            <h3 className="text-4xl font-black">${(student.financialLedger?.totalPaid || 0).toLocaleString()}</h3>
         </Card>
         <Card className="border-none shadow-sm rounded-2xl bg-white border border-slate-100 p-8 space-y-4 text-start">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.stats.balance}</p>
            <h3 className="text-4xl font-black text-red-500">${((student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0)).toLocaleString()}</h3>
         </Card>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
         <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between text-start">
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

