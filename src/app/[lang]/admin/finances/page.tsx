
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  DollarSign, TrendingUp, TrendingDown, Clock, 
  CheckCircle2, AlertTriangle, Download, Filter,
  CreditCard, Search, ArrowUpRight, ArrowRight,
  TrendingUp as TrendingIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

export default function FinancialManagementPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();

  const studentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'students'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: students, loading } = useCollection(studentsQuery);

  const stats = useMemo(() => {
    const collected = students?.reduce((acc, curr) => acc + (curr.financialLedger?.totalPaid || 0), 0) || 0;
    const receivable = students?.reduce((acc, curr) => acc + ((curr.financialLedger?.totalDue || 0) - (curr.financialLedger?.totalPaid || 0)), 0) || 0;
    const overdueCount = students?.filter(s => (s.financialLedger?.totalDue - s.financialLedger?.totalPaid) > 0).length || 0;
    
    return { collected, receivable, overdueCount };
  }, [students]);

  return (
    <div className="space-y-10">
      {/* Financial Overview Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <Card className="border-none shadow-premium rounded-[2rem] bg-secondary text-white overflow-hidden p-10 relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700"><DollarSign className="h-32 w-32" /></div>
            <div className="relative z-10 space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{isAr ? 'إجمالي المحصل الفعلي' : 'Total Revenue (Received)'}</p>
               <h3 className="text-5xl font-black tracking-tighter">${stats.collected.toLocaleString()}</h3>
               <div className="flex items-center gap-2 text-[10px] font-bold bg-white/10 w-fit px-3 py-1 rounded-full">
                  <ArrowUpRight className="h-3 w-3" /> +12% {isAr ? 'عن السنة الماضية' : 'vs Last Year'}
               </div>
            </div>
         </Card>

         <Card className="border-none shadow-premium rounded-[2rem] bg-white overflow-hidden p-10 relative border border-slate-100">
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'مبالغ تحت التحصيل' : 'Accounts Receivable'}</p>
               <h3 className="text-5xl font-black tracking-tighter text-slate-900">${stats.receivable.toLocaleString()}</h3>
               <p className="text-xs font-bold text-red-500 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> {stats.overdueCount} {isAr ? 'طالباً لديهم أرصدة' : 'Students with balance'}
               </p>
            </div>
         </Card>

         <Card className="border-none shadow-premium rounded-[2rem] bg-slate-900 text-white overflow-hidden p-10 relative">
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{isAr ? 'توقعات التحصيل (الربع الحالي)' : 'Q1 Collection Forecast'}</p>
               <h3 className="text-5xl font-black tracking-tighter text-secondary">$84,000</h3>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[45%]" />
               </div>
               <p className="text-[10px] font-bold text-slate-400">45% {isAr ? 'تم تحصيله من الهدف' : 'of quarterly goal reached'}</p>
            </div>
         </Card>
      </div>

      {/* Main Financial Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
            <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-xl font-black uppercase text-slate-900">{isAr ? 'أرصدة الطلاب النشطين' : 'Active Student Balances'}</CardTitle>
                  <CardDescription className="font-bold">{isAr ? 'متابعة المبالغ المتبقية والأقساط' : 'Monitor remaining dues and active payment plans'}</CardDescription>
               </div>
               <Button variant="outline" className="rounded-xl font-black gap-2 h-12 border-slate-200">
                  <Download className="h-4 w-4" /> {isAr ? 'تصدير' : 'Export'}
               </Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead>
                       <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-10 py-5 text-left">Student Name</th>
                          <th className="px-10 py-5 text-left">Program</th>
                          <th className="px-10 py-5 text-left">Paid</th>
                          <th className="px-10 py-5 text-left">Remaining</th>
                          <th className="px-10 py-5 text-right pr-10">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {students?.map((s: any) => (
                         <tr key={s.id} className="hover:bg-slate-50 transition-all cursor-pointer" onClick={() => window.location.href=`/${lang}/admin/students/${s.id}`}>
                            <td className="px-10 py-6 font-black text-slate-900">{s.firstName} {s.lastName}</td>
                            <td className="px-10 py-6 text-xs font-bold text-slate-500 uppercase">{s.programOption}</td>
                            <td className="px-10 py-6 font-bold text-green-500">${s.financialLedger?.totalPaid.toLocaleString()}</td>
                            <td className="px-10 py-6 font-black text-primary">${(s.financialLedger?.totalDue - s.financialLedger?.totalPaid).toLocaleString()}</td>
                            <td className="px-10 py-6 text-right pr-10">
                               <Badge className={cn(
                                 "rounded-lg border-none font-black text-[9px] uppercase",
                                 (s.financialLedger?.totalDue - s.financialLedger?.totalPaid) === 0 ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                               )}>
                                  {(s.financialLedger?.totalDue - s.financialLedger?.totalPaid) === 0 ? 'Full' : 'Balance'}
                               </Badge>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </CardContent>
         </Card>

         {/* Square Sync & Financial Tools */}
         <div className="space-y-8">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10 space-y-8 border border-slate-100">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                     <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-slate-900">{isAr ? 'مزامنة Square' : 'Square Sync'}</h4>
               </div>
               <p className="text-xs font-bold text-slate-500 leading-relaxed italic">
                  {isAr ? 'يتم استيراد كافة العمليات المالية من منصة سكوير آلياً لضمان دقة السجلات.' : 'Automatically reconcile external Square transactions with internal student ledgers.'}
               </p>
               <Button className="w-full bg-primary h-14 rounded-xl font-black shadow-xl shadow-primary/10 transition-all active:scale-95">Sync Now</Button>
            </Card>

            <Card className="border-none shadow-premium rounded-[2.5rem] bg-amber-50 p-10 space-y-8 border border-amber-100">
               <div className="flex items-center gap-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                  <h4 className="font-black uppercase text-amber-900">{isAr ? 'إجراءات التحصيل' : 'Debt Recovery'}</h4>
               </div>
               <p className="text-xs font-bold text-amber-800/70 leading-relaxed">
                  {isAr ? 'هناك 5 طلاب تجاوزوا تاريخ استحقاق الدفعة بأكثر من 15 يوماً.' : '5 students have exceeded their payment due dates by more than 15 days.'}
               </p>
               <Button variant="outline" className="w-full border-amber-200 text-amber-600 hover:bg-amber-100 h-14 rounded-xl font-black uppercase text-[10px] tracking-widest">Send Reminders</Button>
            </Card>
         </div>
      </div>
    </div>
  );
}
