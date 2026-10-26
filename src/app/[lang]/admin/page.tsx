
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
    const totalRevenue = students?.reduce((acc, curr) => acc + (curr.financialLedger?.totalPaid || 0), 0) || 0;
    const outstanding = students?.reduce((acc, curr) => acc + ((curr.financialLedger?.totalDue || 0) - (curr.financialLedger?.totalPaid || 0)), 0) || 0;
    
    return { totalApps, pendingApps, activeStudents, totalRevenue, outstanding };
  }, [enrollments, students]);

  if (enrollLoading || studentLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Academy Intelligence...</p>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'نظرة عامة على الأكاديمية' : 'Executive Dashboard'}</h1>
            <p className="text-slate-500 font-bold flex items-center gap-2">
               <Calendar className="h-4 w-4" />
               {format(new Date(), 'MMMM dd, yyyy')} • {isAr ? 'بيانات النظام الموحدة' : 'Live System Intelligence'}
            </p>
         </div>
         <div className="flex gap-3">
            <Button variant="outline" className="h-12 rounded-xl font-black px-6">
               {isAr ? 'تقارير السنة الحالية' : 'AY 2026 Reports'}
            </Button>
            <Button asChild className="h-12 rounded-xl bg-secondary text-white font-black px-6 shadow-xl shadow-secondary/20">
               <Link href={`/${lang}/admin/admissions/new`}>
                  {isAr ? 'مراجعة الطلبات الجديدة' : 'Review New Apps'}
               </Link>
            </Button>
         </div>
      </div>

      {/* 2. Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: isAr ? 'إجمالي المحصل المالي' : 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', trend: '+12%' },
           { label: isAr ? 'الطلاب النشطين' : 'Active Students', value: stats.activeStudents, icon: Users, color: 'bg-secondary', trend: '+18%' },
           { label: isAr ? 'طلبات بانتظار الإجراء' : 'Action Required', value: stats.pendingApps, icon: AlertTriangle, color: 'bg-primary', trend: 'Urgent' },
           { label: isAr ? 'مستحقات تحت التحصيل' : 'Accounts Receivable', value: `$${stats.outstanding.toLocaleString()}`, icon: CreditCard, color: 'bg-amber-500', trend: '-5%' },
         ].map((stat, i) => (
           <Card key={i} className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white border border-slate-100 transition-all hover:shadow-2xl">
              <CardContent className="p-8">
                 <div className="flex justify-between items-start">
                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg", stat.color)}>
                       <stat.icon className="h-7 w-7" />
                    </div>
                    <Badge className="bg-slate-50 text-slate-500 border-none rounded-lg px-2 py-1 font-black text-[10px]">
                       {stat.trend} <TrendingUp className="h-3 w-3 ml-1" />
                    </Badge>
                 </div>
                 <div className="mt-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      {/* 3. Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 border-none shadow-premium rounded-[2.5rem] bg-white">
            <CardHeader className="p-10 pb-0">
               <CardTitle className="text-xl font-black uppercase text-slate-900">{isAr ? 'نمو الأكاديمية والطلاب' : 'Academy Growth Matrix'}</CardTitle>
               <CardDescription className="font-bold">{isAr ? 'مقارنة الطلبات والتحويل لطلاب نشطين شهرياً' : 'Monthly conversion from application to active enrollment'}</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
               <div className="h-80 w-full">
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
                            <stop offset="5%" stopColor="#1A73E8" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#1A73E8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                        <Area type="monotone" dataKey="apps" stroke="#1A73E8" strokeWidth={4} fillOpacity={1} fill="url(#colorApps)" />
                        <Area type="monotone" dataKey="active" stroke="#0FB9B1" strokeWidth={4} fillOpacity={0} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-premium rounded-[2.5rem] bg-white">
            <CardHeader className="p-10">
               <CardTitle className="text-xl font-black uppercase text-slate-900">{isAr ? 'توزيع البرامج التعليمية' : 'Program Penetration'}</CardTitle>
               <CardDescription className="font-bold">{isAr ? 'نسبة الطلاب حسب نوع البرنامج' : 'Students distribution per academic track'}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={[
                              { name: 'Foundation', value: 40, fill: '#1A73E8' },
                              { name: 'Academics', value: 45, fill: '#0FB9B1' },
                              { name: 'Weekend', value: 15, fill: '#FA8231' },
                           ]}
                           innerRadius={70}
                           outerRadius={90}
                           paddingAngle={5}
                           dataKey="value"
                        />
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="w-full space-y-3 mt-6">
                  {[
                    { label: isAr ? 'برنامج التأسيس' : 'Foundation 3-5', color: 'bg-primary' },
                    { label: isAr ? 'المتوسط والثانوي' : 'Academics 6-12', color: 'bg-secondary' },
                    { label: isAr ? 'عطلة نهاية الأسبوع' : 'Weekend Remote', color: 'bg-orange-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between p-3 bg-slate-50 rounded-xl">
                       <div className="flex items-center gap-2">
                          <div className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                          <span className="text-[10px] font-black uppercase text-slate-500">{item.label}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>

      {/* 4. Attention Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
         <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white overflow-hidden">
            <CardContent className="p-10 space-y-8">
               <div className="h-16 w-16 rounded-3xl bg-secondary flex items-center justify-center shadow-xl">
                  <MessageSquare className="h-8 w-8 text-white" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase">{isAr ? 'مركز التواصل الذكي' : 'Parent Outreach'}</h3>
                  <p className="text-slate-400 font-bold leading-relaxed">{isAr ? 'أرسل تذكيرات الدفع، رسائل القبول، أو طلبات الوثائق بنقرة واحدة.' : 'Automated welcome packages, payment reminders, or missing document requests.'}</p>
               </div>
               <Button asChild className="w-full h-14 bg-white text-slate-900 hover:bg-secondary hover:text-white font-black rounded-2xl transition-all">
                  <Link href={`/${lang}/admin/communication`}>
                     {isAr ? 'فتح مركز المراسلات' : 'Launch Comms Hub'}
                  </Link>
               </Button>
            </CardContent>
         </Card>

         <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="p-10 flex flex-row items-center justify-between">
               <CardTitle className="text-xl font-black uppercase text-slate-900">{isAr ? 'تنبيهات النظام' : 'System Alerts'}</CardTitle>
               <Badge className="bg-red-100 text-red-600 border-none">Critical</Badge>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-4">
               {[
                 { t: isAr ? 'وثائق مفقودة' : 'Missing Transcript', s: 'Aisha Omar', i: AlertTriangle, c: 'text-amber-500' },
                 { t: isAr ? 'دفعة متأخرة' : 'Overdue Payment', s: 'Zaid Ali', i: DollarSign, c: 'text-red-500' },
               ].map((alert, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100 group">
                    <div className="flex items-center gap-4">
                       <div className={cn("h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center", alert.c)}>
                          <alert.i className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900">{alert.s}</p>
                          <p className="text-[10px] font-bold uppercase text-slate-400">{alert.t}</p>
                       </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-10 w-10 p-0 rounded-xl group-hover:bg-white group-hover:shadow-md transition-all"><ArrowRight className="h-4 w-4" /></Button>
                 </div>
               ))}
               <Button variant="link" className="w-full text-secondary font-black">{isAr ? 'عرض كافة المهام' : 'View All Tasks'}</Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
