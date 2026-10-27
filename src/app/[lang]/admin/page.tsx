
'use client';

import { use, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Clock,
  ArrowUpRight,
  Calendar,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Target,
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie
} from 'recharts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminDashboard({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();

  const enrollmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const studentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'students'), orderBy('firstName', 'asc'));
  }, [firestore]);

  const { data: enrollments, loading: enrollLoading } = useCollection(enrollmentsQuery);
  const { data: students, loading: studentLoading } = useCollection(studentsQuery);

  const stats = useMemo(() => {
    const totalApps = enrollments?.length || 0;
    const pendingApps = enrollments?.filter(e => e.status === 'submitted' || e.status === 'reviewed').length || 0;
    const activeStudents = students?.filter(s => s.status === 'active').length || 0;
    
    const totalRevenue = students?.reduce((acc, curr) => {
      const paid = Number(curr.financialLedger?.totalPaid) || 0;
      return acc + paid;
    }, 0) || 0;

    const outstanding = students?.reduce((acc, curr) => {
      const due = Number(curr.financialLedger?.totalDue) || 0;
      const paid = Number(curr.financialLedger?.totalPaid) || 0;
      return acc + (due - paid);
    }, 0) || 0;
    
    return { totalApps, pendingApps, activeStudents, totalRevenue, outstanding };
  }, [enrollments, students]);

  if (enrollLoading || studentLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Academy Intelligence...</p>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{isAr ? 'نظرة عامة على الأكاديمية' : 'Executive Dashboard'}</h1>
            <p className="text-slate-500 font-bold text-xs flex items-center gap-2">
               <Calendar className="h-3.5 w-3.5 text-secondary" />
               {format(new Date(), 'MMMM dd, yyyy')} • {isAr ? 'بيانات النظام الموحدة' : 'Live System Intelligence'}
            </p>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="h-10 rounded-lg font-black px-5 text-xs hover:bg-slate-50 border-slate-200 transition-all">
               {isAr ? 'تقارير السنة' : 'AY 2026 Reports'}
            </Button>
            <Button asChild className="h-10 rounded-lg bg-secondary text-white font-black px-5 shadow-xl shadow-secondary/10 text-xs hover:bg-secondary/90 active:scale-95 transition-all">
               <Link href={`/${lang}/admin/admissions/new`}>
                  {isAr ? 'مراجعة الطلبات' : 'Review Apps'}
               </Link>
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
         {[
           { label: isAr ? 'إجمالي المحصل' : 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', trend: '+12%' },
           { label: isAr ? 'الطلاب النشطين' : 'Active Students', value: stats.activeStudents, icon: Users, color: 'bg-secondary', trend: '+18%' },
           { label: isAr ? 'طلبات بانتظار الإجراء' : 'Action Required', value: stats.pendingApps, icon: AlertTriangle, color: 'bg-primary', trend: 'Urgent' },
           { label: isAr ? 'تحت التحصيل' : 'Receivables', value: `$${stats.outstanding.toLocaleString()}`, icon: CreditCard, color: 'bg-amber-500', trend: '-5%' },
         ].map((stat, i) => (
           <Card key={i} className="border-none shadow-sm rounded-xl overflow-hidden bg-white border border-slate-100 transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="p-6">
                 <div className="flex justify-between items-start">
                    <div className={cn("h-11 w-11 rounded-lg flex items-center justify-center text-white shadow-xl", stat.color)}>
                       <stat.icon className="h-5.5 w-5.5" />
                    </div>
                    <Badge className="bg-slate-50 text-slate-500 border-none rounded-lg px-2 py-0.5 font-black text-[9px] tracking-widest uppercase">
                       {stat.trend}
                    </Badge>
                 </div>
                 <div className="mt-6">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{stat.value}</h3>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 border border-slate-100 shadow-sm rounded-xl bg-white">
            <CardHeader className="p-6 pb-0">
               <CardTitle className="text-lg font-black uppercase text-slate-900 tracking-tight">{isAr ? 'نمو الأكاديمية والطلاب' : 'Academy Growth Matrix'}</CardTitle>
               <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'مقارنة الطلبات والتحويل لطلاب نشطين' : 'Monthly conversion metrics'}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={[
                        { name: 'Sep', apps: 45, active: 30 },
                        { name: 'Oct', apps: 52, active: 38 },
                        { name: 'Nov', apps: 48, active: 40 },
                        { name: 'Dec', apps: 61, active: 55 },
                        { name: 'Jan', apps: 75, active: stats.activeStudents },
                     ]}>
                        <defs>
                          <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#1A73E8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="apps" stroke="#1A73E8" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                        <Area type="monotone" dataKey="active" stroke="#0FB9B1" strokeWidth={3} fillOpacity={0} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <Card className="border border-slate-100 shadow-sm rounded-xl bg-white">
            <CardHeader className="p-6">
               <CardTitle className="text-lg font-black uppercase text-slate-900 tracking-tight">{isAr ? 'توزيع البرامج' : 'Program Penetration'}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
               <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={[
                              { name: 'Foundation', value: 40, fill: '#1A73E8' },
                              { name: 'Academics', value: 45, fill: '#0FB9B1' },
                              { name: 'Weekend', value: 15, fill: '#FA8231' },
                           ]}
                           innerRadius={50}
                           outerRadius={70}
                           paddingAngle={4}
                           dataKey="value"
                        />
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="w-full space-y-2 mt-4">
                  {[
                    { label: isAr ? 'برنامج التأسيس' : 'Foundation', color: 'bg-primary' },
                    { label: isAr ? 'المتوسط والثانوي' : 'Academics', color: 'bg-secondary' },
                    { label: isAr ? 'عطلة الأسبوع' : 'Weekend', color: 'bg-orange-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                       <div className="flex items-center gap-2">
                          <div className={cn("h-2 w-2 rounded-full shadow-sm", item.color)} />
                          <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{item.label}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
