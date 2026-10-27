
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, 
  Download, 
  ChevronRight,
  Filter,
  Users,
  BadgeCheck,
  Clock,
  FileText,
  LayoutGrid
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function AdmissionsRegisterPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const enrollmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: enrollments, loading } = useCollection(enrollmentsQuery);

  const filteredData = useMemo(() => {
    if (!enrollments) return [];
    return enrollments.filter(app => {
      const matchesSearch = 
        app.parent1Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.parent1Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [enrollments, searchTerm, filterStatus]);

  const stats = useMemo(() => {
    if (!enrollments) return { total: 0, pending: 0, completed: 0 };
    return {
      total: enrollments.length,
      pending: enrollments.filter(e => e.status === 'submitted' || e.status === 'reviewed').length,
      completed: enrollments.filter(e => e.status === 'approved' || e.status === 'Completed').length
    };
  }, [enrollments]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <FileText className="h-8 w-8 text-secondary" />
               {isAr ? 'سجل الطلبات' : 'Admissions Register'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'عرض كافة طلبات التسجيل الواردة' : 'Master list of all incoming enrollment applications'}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card className="border-none shadow-sm rounded-xl bg-white p-6 border border-slate-100 flex justify-between items-center">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Intake</p>
               <h3 className="text-2xl font-black text-primary">{stats.total}</h3>
            </div>
            <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><Users className="h-5 w-5" /></div>
         </Card>
         <Card className="border-none shadow-sm rounded-xl bg-white p-6 border border-slate-100 flex justify-between items-center">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Review</p>
               <h3 className="text-2xl font-black text-secondary">{stats.pending}</h3>
            </div>
            <div className="h-10 w-10 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary"><Clock className="h-5 w-5" /></div>
         </Card>
         <Card className="border-none shadow-sm rounded-xl bg-white p-6 border border-slate-100 flex justify-between items-center">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Onboarded</p>
               <h3 className="text-2xl font-black text-green-600">{stats.completed}</h3>
            </div>
            <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600"><BadgeCheck className="h-5 w-5" /></div>
         </Card>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-4 overflow-x-auto no-scrollbar">
         <div className="relative flex-1 w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 transition-colors group-focus-within:text-secondary" />
            <Input 
               placeholder={isAr ? 'بحث بالاسم، البريد، رقم الطلب...' : 'Search Name, Email, ID...'} 
               className="pl-10 h-11 rounded-lg bg-slate-50 border-none font-bold text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

         <div className="flex items-center gap-3 w-full md:w-auto">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
               <SelectTrigger className="w-full md:w-44 h-11 rounded-lg bg-slate-50 border-none font-black text-[10px] uppercase">
                  <SelectValue placeholder="All Statuses" />
               </SelectTrigger>
               <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted" className="text-blue-600">New (Submitted)</SelectItem>
                  <SelectItem value="reviewed" className="text-amber-600">Under Review</SelectItem>
                  <SelectItem value="approved" className="text-green-600">Approved</SelectItem>
                  <SelectItem value="rejected" className="text-red-600">Rejected</SelectItem>
               </SelectContent>
            </Select>

            <Button variant="outline" className="h-11 px-6 rounded-lg border-slate-100 font-black text-[10px] uppercase gap-2 hover:bg-slate-50 transition-all shrink-0">
               <Download className="h-4 w-4" /> Export
            </Button>
         </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4">
           {[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-slate-50 animate-pulse" />)}
        </div>
      ) : (
        <Card className="border border-slate-100 shadow-sm rounded-xl bg-white overflow-hidden">
           <CardContent className="p-0">
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead>
                       <tr className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-8 py-5 text-start">Application & Guardian</th>
                          <th className="px-6 py-5 text-center">Path</th>
                          <th className="px-6 py-5 text-center">Students</th>
                          <th className="px-6 py-5 text-center">Status</th>
                          <th className="px-6 py-5 text-end pr-8"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {filteredData.map((app: any) => (
                          <tr key={app.id} className="hover:bg-slate-50/40 transition-all group cursor-pointer" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
                             <td className="px-8 py-6 text-start">
                                <div className="flex items-center gap-4">
                                   <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-xl shadow-primary/10">
                                      {app.parent1Name?.charAt(0)}
                                   </div>
                                   <div className="space-y-0.5">
                                      <p className="text-sm font-black text-primary truncate max-w-[180px]">{app.parent1Name}</p>
                                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{app.id}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-6 text-center">
                                <Badge variant="outline" className="text-[9px] font-black uppercase bg-secondary/5 text-secondary border-none px-3 py-1 rounded-md">
                                   {app.programOption}
                                </Badge>
                             </td>
                             <td className="px-6 py-6 text-center">
                                <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-primary mx-auto shadow-sm">
                                   {app.students?.length}
                                </div>
                             </td>
                             <td className="px-6 py-6 text-center">
                                <Badge className={cn(
                                   "text-[9px] font-black uppercase rounded-lg border-none px-4 py-1.5 shadow-sm",
                                   app.status === 'submitted' ? "bg-blue-100 text-blue-600" : 
                                   app.status === 'approved' || app.status === 'Completed' ? "bg-green-100 text-green-600" : 
                                   app.status === 'rejected' ? "bg-red-50 text-red-500" :
                                   "bg-slate-100 text-slate-400"
                                )}>
                                   {app.status}
                                </Badge>
                             </td>
                             <td className="px-6 py-6 text-end pr-8">
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                   <ChevronRight className={cn("h-5 w-5 text-slate-300 group-hover:text-white", isAr && "rotate-180")} />
                                </Button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </CardContent>
        </Card>
      )}
    </div>
  );
}
