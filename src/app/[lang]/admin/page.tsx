
'use client';

import { use, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function AdminOverview({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();

  const enrollmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: enrollments, loading } = useCollection(enrollmentsQuery);

  // Statistics Calculation
  const stats = useMemo(() => {
    const total = enrollments?.length || 0;
    const submitted = enrollments?.filter(e => e.status === 'submitted').length || 0;
    const drafts = enrollments?.filter(e => e.status === 'draft').length || 0;
    const reviewed = enrollments?.filter(e => e.status === 'reviewed').length || 0;
    const students = enrollments?.reduce((acc, curr) => acc + (curr.students?.length || 0), 0) || 0;
    
    return { total, submitted, drafts, reviewed, students };
  }, [enrollments]);

  // Chart Data: Programs
  const programData = useMemo(() => {
    const counts: Record<string, number> = {};
    enrollments?.forEach(e => {
      const p = e.programOption || (isAr ? 'غير محدد' : 'Not Set');
      counts[p] = (counts[p] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [enrollments, isAr]);

  // Chart Data: States
  const regionData = useMemo(() => {
    const counts: Record<string, number> = {};
    enrollments?.forEach(e => {
      const s = e.address?.state || (isAr ? 'أخرى' : 'Other');
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count })).slice(0, 5);
  }, [enrollments, isAr]);

  const COLORS = ['#1A73E8', '#0FB9B1', '#F7B731', '#EB3B5A', '#A55EEA'];

  if (loading) return (
    <div className="p-8 space-y-8 animate-pulse">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100" />)}
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-white rounded-2xl border border-slate-100" />
          <div className="h-96 bg-white rounded-2xl border border-slate-100" />
       </div>
    </div>
  );

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="text-3xl font-black text-primary uppercase tracking-tight">{isAr ? 'نظرة عامة' : 'System Overview'}</h1>
            <p className="text-slate-500 font-bold text-sm">{isAr ? 'تحليلات وإحصائيات طلبات الالتحاق بالأكاديمية' : 'Real-time analytics and application performance'}</p>
         </div>
         <div className="flex items-center gap-3">
            <Button asChild className="rounded-xl bg-primary text-white font-black px-6 h-12 shadow-xl shadow-primary/10">
               <Link href={`/${lang}/admin/enrollments`}>
                  <FileText className="h-4 w-4 mr-2" />
                  {isAr ? 'عرض كافة الطلبات' : 'View All Applications'}
               </Link>
            </Button>
         </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: isAr ? 'إجمالي الطلبات' : 'Total Applications', value: stats.total, icon: FileText, color: 'bg-primary', trend: '+12%' },
           { label: isAr ? 'طلبات مكتملة' : 'Submitted Apps', value: stats.submitted, icon: CheckCircle2, color: 'bg-green-500', trend: '+8%' },
           { label: isAr ? 'المسودات' : 'Current Drafts', value: stats.drafts, icon: Clock, color: 'bg-amber-500', trend: '-2%' },
           { label: isAr ? 'إجمالي الطلاب' : 'Total Students', value: stats.students, icon: Users, color: 'bg-secondary', trend: '+15%' },
         ].map((stat, i) => (
           <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                 <div className="flex justify-between items-start">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-white", stat.color)}>
                       <stat.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className={cn(
                       "font-black text-[10px] border-none",
                       stat.trend.startsWith('+') ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"
                    )}>
                       {stat.trend} {stat.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3 ml-1 inline" /> : <ArrowDownRight className="h-3 w-3 ml-1 inline" />}
                    </Badge>
                 </div>
                 <div className="mt-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-3xl font-black text-primary mt-1">{stat.value}</h3>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart: Regional Distribution */}
         <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="p-8">
               <CardTitle className="text-xl font-black text-primary uppercase">{isAr ? 'التوزيع الجغرافي' : 'Regional Distribution'}</CardTitle>
               <CardDescription className="font-bold">{isAr ? 'أكثر 5 ولايات تقديماً للطلبات' : 'Top 5 states by application volume'}</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-8">
               <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={regionData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                        <Tooltip 
                           cursor={{fill: '#f8fafc'}}
                           contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 700}}
                        />
                        <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                           {regionData.map((_, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         {/* Side Chart: Programs */}
         <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="p-8">
               <CardTitle className="text-xl font-black text-primary uppercase">{isAr ? 'توزيع البرامج' : 'Program Distribution'}</CardTitle>
               <CardDescription className="font-bold">{isAr ? 'نسبة الإقبال على البرامج التعليمية' : 'Applications by educational track'}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-8">
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={programData}
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {programData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                        </Pie>
                        <Tooltip contentStyle={{borderRadius: '12px', fontWeight: 700}} />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="w-full space-y-3 mt-4">
                  {programData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{backgroundColor: COLORS[idx % COLORS.length]}} />
                          <span className="text-[10px] font-black text-slate-500 uppercase truncate max-w-[120px]">{item.name}</span>
                       </div>
                       <span className="text-xs font-black text-primary">{Math.round((item.value / stats.total) * 100)}%</span>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>

      {/* 4. Recent Applications List */}
      <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
         <CardHeader className="p-8 flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-xl font-black text-primary uppercase">{isAr ? 'آخر الطلبات' : 'Recent Applications'}</CardTitle>
               <CardDescription className="font-bold">{isAr ? 'أحدث 5 طلبات مسجلة في النظام' : 'Last 5 records added to database'}</CardDescription>
            </div>
            <Button variant="ghost" asChild className="text-secondary font-black">
               <Link href={`/${lang}/admin/enrollments`}>{isAr ? 'مشاهدة الكل' : 'View All'}</Link>
            </Button>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-y border-slate-100">
                        <th className="px-8 py-4 text-left">{isAr ? 'ولي الأمر' : 'Guardian'}</th>
                        <th className="px-8 py-4 text-left">{isAr ? 'البرنامج' : 'Program'}</th>
                        <th className="px-8 py-4 text-left">{isAr ? 'الحالة' : 'Status'}</th>
                        <th className="px-8 py-4 text-left">{isAr ? 'التاريخ' : 'Date'}</th>
                        <th className="px-8 py-4 text-right"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {enrollments?.slice(0, 5).map((app: any) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary font-black uppercase">
                                    {app.parent1Name?.charAt(0)}
                                 </div>
                                 <div className="space-y-0.5">
                                    <p className="text-sm font-black text-primary">{app.parent1Name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{app.parent1Email}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-5">
                              <Badge variant="outline" className="text-[9px] font-black uppercase border-slate-200">
                                 {app.programOption === 'grades-3-5' ? 'Foundation' : app.programOption === 'grades-6-12' ? 'Academics' : 'Weekend'}
                              </Badge>
                           </td>
                           <td className="px-8 py-5">
                              <Badge className={cn(
                                 "text-[9px] font-black uppercase border-none rounded-lg",
                                 app.status === 'submitted' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                              )}>
                                 {app.status}
                              </Badge>
                           </td>
                           <td className="px-8 py-5">
                              <div className="flex flex-col">
                                 <span className="text-xs font-bold text-slate-600">{app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy') : '-'}</span>
                                 <span className="text-[10px] text-slate-400">{app.updatedAt ? format(app.updatedAt.toDate(), 'HH:mm') : ''}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-white hover:shadow-md">
                                 <Link href={`/${lang}/admin/enrollments/${app.id}`}>
                                    <ChevronRight className={cn("h-4 w-4 text-slate-300 group-hover:text-primary transition-colors", isAr && "rotate-180")} />
                                 </Link>
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
