
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  DollarSign, TrendingUp, TrendingDown, Clock, 
  CheckCircle2, AlertTriangle, Download, Filter,
  CreditCard, Search, ArrowUpRight, ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  // Mock data for payments - in real app fetch from 'payments' sub-collection or similar
  const paymentLog = [
    { id: '1', student: 'Omar Khalid', amount: 1650, date: new Date(), status: 'completed', type: 'Full Payment' },
    { id: '2', student: 'Aisha Ahmed', amount: 400, date: new Date(), status: 'pending', type: 'Installment' },
    { id: '3', student: 'Zaid Ali', amount: 1650, date: new Date(), status: 'completed', type: 'Reg Fee' },
  ];

  return (
    <div className="space-y-10">
      {/* Financial Overview Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <Card className="border-none shadow-premium rounded-[2rem] bg-secondary text-white overflow-hidden p-10 relative">
            <div className="absolute top-0 right-0 p-8 opacity-10"><DollarSign className="h-32 w-32" /></div>
            <div className="relative z-10 space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{isAr ? 'إجمالي المحصل (هذا الشهر)' : 'Total Collected (MTD)'}</p>
               <h3 className="text-5xl font-black tracking-tighter">$42,350</h3>
               <div className="flex items-center gap-2 text-[10px] font-bold bg-white/10 w-fit px-3 py-1 rounded-full">
                  <ArrowUpRight className="h-3 w-3" /> +12% {isAr ? 'عن الشهر الماضي' : 'vs Last Month'}
               </div>
            </div>
         </Card>

         <Card className="border-none shadow-premium rounded-[2rem] bg-white overflow-hidden p-10 relative">
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'مبالغ تحت التحصيل' : 'Accounts Receivable'}</p>
               <h3 className="text-5xl font-black tracking-tighter text-slate-900">$18,400</h3>
               <p className="text-xs font-bold text-red-500 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> 12 {isAr ? 'طالباً متأخراً عن السداد' : 'Students Overdue'}
               </p>
            </div>
         </Card>

         <Card className="border-none shadow-premium rounded-[2rem] bg-slate-900 text-white overflow-hidden p-10 relative">
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{isAr ? 'توقعات الإيرادات السنوية' : 'Revenue Projection (FY2026)'}</p>
               <h3 className="text-5xl font-black tracking-tighter text-secondary">$320,000</h3>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[65%]" />
               </div>
               <p className="text-[10px] font-bold text-slate-400">65% {isAr ? 'من الهدف المحقق' : 'of annual target reached'}</p>
            </div>
         </Card>
      </div>

      {/* Management Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Payment Log */}
         <Card className="lg:col-span-2 border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-xl font-black uppercase text-slate-900">{isAr ? 'سجل العمليات المالية' : 'Recent Transactions'}</CardTitle>
                  <CardDescription className="font-bold">{isAr ? 'آخر 10 دفعات تم توثيقها' : 'Last 10 payments recorded in system'}</CardDescription>
               </div>
               <Button variant="outline" className="rounded-xl font-black gap-2">
                  <Download className="h-4 w-4" /> {isAr ? 'تقرير CSV' : 'Export'}
               </Button>
            </CardHeader>
            <CardContent className="p-0">
               <table className="w-full">
                  <tbody className="divide-y divide-slate-50">
                     {paymentLog.map((log) => (
                       <tr key={log.id} className="hover:bg-slate-50 transition-all group">
                          <td className="px-10 py-6">
                             <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                                   <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                   <p className="text-sm font-black text-slate-900">{log.student}</p>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase">{log.type}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-6 text-sm font-bold text-slate-500">
                             {format(log.date, 'MMM dd, yyyy')}
                          </td>
                          <td className="px-10 py-6">
                             <span className="text-lg font-black text-slate-900">${log.amount}</span>
                          </td>
                          <td className="px-10 py-6 text-right">
                             <Badge className={cn(
                                "rounded-lg border-none font-black text-[9px] uppercase",
                                log.status === 'completed' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                             )}>
                                {log.status}
                             </Badge>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </CardContent>
         </Card>

         {/* Square Sync & Quick Tools */}
         <div className="space-y-8">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-8 space-y-6">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                     <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-slate-900">{isAr ? 'مزامنة منصة Square' : 'Square Integration'}</h4>
               </div>
               <p className="text-xs font-bold text-slate-500 leading-relaxed">
                  {isAr ? 'يتم سحب كافة الدفعات التي تتم عبر منصة سكوير آلياً لضمان عدم فقدان أي بيانات.' : 'System automatically syncs Square payments to prevent manual documentation errors.'}
               </p>
               <Button className="w-full bg-primary h-12 rounded-xl font-black">{isAr ? 'مزامنة الآن' : 'Sync Payments Now'}</Button>
            </Card>

            <Card className="border-none shadow-premium rounded-[2.5rem] bg-amber-50 border border-amber-100 p-8 space-y-6">
               <div className="flex items-center gap-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                  <h4 className="font-black uppercase text-amber-900">{isAr ? 'تحذير المتابعة' : 'Risk Management'}</h4>
               </div>
               <p className="text-xs font-bold text-amber-800/70">
                  {isAr ? 'هناك 5 دفعات أقساط مستحقة خلال الـ 48 ساعة القادمة. هل تود إرسال تذكيرات آلية؟' : '5 installment payments are due within 48 hours. Send automated reminders?'}
               </p>
               <Button variant="outline" className="w-full border-amber-200 text-amber-600 hover:bg-amber-100 rounded-xl font-black">{isAr ? 'إرسال التذكيرات' : 'Send Reminders'}</Button>
            </Card>
         </div>
      </div>
    </div>
  );
}
