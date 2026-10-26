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
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Calendar,
  CreditCard,
  AlertTriangle,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, PieChart, Pie
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

  const { data: enrollments, loading } = useCollection(enrollmentsQuery);

  const stats = useMemo(() => {
    const total = enrollments?.length || 0;
    const submitted = enrollments?.filter(e => e.status === 'submitted' || e.status === 'approved').length || 0;
    const revenue = submitted * 1650; // Dynamic revenue calculation based on payments needed
    const studentCount = enrollments?.reduce((acc, curr) => acc + (curr.students?.length || 0), 0) || 0;
    
    return { total, submitted, revenue, studentCount };
  }, [enrollments]);

  if (loading) return <div className="p-10 animate-pulse space-y-8">
    <div className="grid grid-cols-4 gap-6 h-32 bg-white rounded-3xl" />
    <div className="grid grid-cols-3 gap-6 h-96 bg-white rounded-3xl" />
  </div>;

  return (
    <div className="space-y-10">
      {/* 1. Welcome & Summary */}
      <div className="flex justify-between items-end">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'نظرة عامة' : 'System Insights'}</h1>
            <p className="text-slate-500 font-bold flex items-center gap-2">
               <Calendar className="h-4 w-4" />
               {format(new Date(), 'MMMM dd, yyyy')} • {isAr ? 'أداء الأكاديمية الحالي' : 'Live performance tracking'}
            </p>
         </div>
         <div className="flex gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-black px-6">
               {isAr ? 'تحميل التقرير السنوي' : 'Export Annual Report'}
            </Button>
            <Button className="h-12 rounded-xl bg-secondary text-white font-black px-6 shadow-xl shadow-secondary/20">
               {isAr ? 'إضافة دفعة مالية' : 'Record Payment'}
            </Button>
         </div>
      </div>

      {/* 2. Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: isAr ? 'إجمالي الإيرادات' : 'Total Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', trend: '+14%' },
           { label: isAr ? 'الطلاب المسجلين' : 'Active Students', value: stats.studentCount, icon: Users, color: 'bg-secondary', trend: '+22%' },
           { label: isAr ? 'طلبات القبول' : 'Applications', value: stats.total, icon: FileText, color: 'bg-primary', trend: '+8%' },
           { label: isAr ? 'معدل التحويل' : 'Conversion Rate', value: '76%', icon: Target, color: 'bg-amber-500', trend: '+3%' },
         ].map((stat, i) => (
           <Card key={i} className="border-none shadow-premium rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-white">
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

      {/* 3. Charts & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="p-10 pb-0">
               <CardTitle className="text-xl font-black uppercase text-slate-900">{isAr ? 'نمو التسجيل والطلاب' : 'Enrollment Growth'}</CardTitle>
               <CardDescription className="font-bold">{isAr ? 'مقارنة الطلبات المسجلة بالأشهر السابقة' : 'Monthly application volume comparison'}</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
               <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={[
                        { name: 'Sep', apps: 45, students: 30 },
                        { name: 'Oct', apps: 52, students: 38 },
                        { name: 'Nov', apps: 48, students: 40 },
                        { name: 'Dec', apps: 61, students: 55 },
                        { name: 'Jan', apps: 75, students: 68 },
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
                        <Area type="monotone" dataKey="students" stroke="#0FB9B1" strokeWidth={4} fillOpacity={0} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="p-10">
               <CardTitle className="text-xl font-black uppercase text-slate-900">{isAr ? 'الحالة المالية' : 'Financial Health'}</CardTitle>
               <CardDescription className="font-bold">{isAr ? 'الدفعات المستلمة والمستحقة' : 'Paid vs Outstanding balances'}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={[
                              { name: 'Paid', value: 75, fill: '#0FB9B1' },
                              { name: 'Outstanding', value: 25, fill: '#EB3B5A' },
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
               <div className="w-full space-y-4 mt-6">
                  <div className="flex justify-between p-4 bg-slate-50 rounded-2xl">
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-xs font-black uppercase text-slate-500">{isAr ? 'تم تحصيله' : 'Paid'}</span>
                     </div>
                     <span className="font-black text-slate-900">$124,500</span>
                  </div>
                  <div className="flex justify-between p-4 bg-red-50/50 rounded-2xl border border-red-100">
                     <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span className="text-xs font-black uppercase text-red-500">{isAr ? 'متأخرات' : 'Overdue'}</span>
                     </div>
                     <span className="font-black text-red-600">$42,300</span>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* 4. Action Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white overflow-hidden">
            <CardContent className="p-10 space-y-8">
               <div className="h-16 w-16 rounded-3xl bg-secondary flex items-center justify-center shadow-xl">
                  <MessageSquare className="h-8 w-8 text-white" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase">{isAr ? 'مركز المراسلات الذكي' : 'Parent Outreach'}</h3>
                  <p className="text-slate-400 font-bold leading-relaxed">{isAr ? 'أرسل تذكيرات الدفع، رسائل الترحيب، أو طلبات الوثائق بنقرة واحدة.' : 'Send automated reminders, welcome packages, or document requests to parents.'}</p>
               </div>
               <Button asChild className="w-full h-14 bg-white text-slate-900 hover:bg-secondary hover:text-white font-black rounded-2xl transition-all">
                  <Link href={`/${lang}/admin/communication`}>
                     {isAr ? 'ابدأ المراسلة' : 'Launch Comms Hub'}
                  </Link>
               </Button>
            </CardContent>
         </Card>

         <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="p-10 flex flex-row items-center justify-between">
               <CardTitle className="text-xl font-black uppercase text-slate-900">{isAr ? 'طلاب يحتاجون للمراجعة' : 'Attention Required'}</CardTitle>
               <Badge className="bg-amber-100 text-amber-600 border-none">5 {isAr ? 'تنبيهات' : 'Alerts'}</Badge>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-black">ST</div>
                       <div>
                          <p className="text-sm font-black text-slate-900">Student Name {i}</p>
                          <p className="text-[10px] text-red-500 font-bold uppercase">{isAr ? 'وثيقة مفقودة' : 'Missing Transcript'}</p>
                       </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-10 w-10 p-0 rounded-xl"><ArrowRight className="h-4 w-4" /></Button>
                 </div>
               ))}
               <Button variant="link" className="w-full text-secondary font-black">{isAr ? 'مشاهدة كافة التنبيهات' : 'View All Alerts'}</Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
