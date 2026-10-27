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
  AlertCircle,
  CheckCircle2,
  XCircle,
  Inbox
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

  const t = {
    title: isAr ? 'سجل الطلبات' : 'Admissions Register',
    subtitle: isAr ? 'عرض كافة طلبات التسجيل الواردة وتتبع حالاتها' : 'View all incoming enrollment applications and track their status',
    searchPlaceholder: isAr ? 'بحث بالاسم، البريد، أو رقم الطلب...' : 'Search Name, Email, or ID...',
    export: isAr ? 'تصدير' : 'Export',
    allStatuses: isAr ? 'كافة الحالات' : 'All Statuses',
    stats: {
      total: isAr ? 'إجمالي الطلبات' : 'Total Intake',
      new: isAr ? 'طلبات جديدة' : 'New Submissions',
      review: isAr ? 'قيد المراجعة' : 'Under Review',
      missing: isAr ? 'نقص بيانات' : 'Awaiting Info',
      accepted: isAr ? 'مقبول / مكتمل' : 'Accepted / Done',
      rejected: isAr ? 'طلبات مرفوضة' : 'Rejected'
    },
    table: {
      guardian: isAr ? 'الطلب وولي الأمر' : 'Application & Guardian',
      path: isAr ? 'المسار' : 'Path',
      students: isAr ? 'الطلاب' : 'Students',
      status: isAr ? 'الحالة' : 'Status',
      date: isAr ? 'تاريخ التحديث' : 'Updated At'
    },
    statusMap: {
      submitted: isAr ? 'طلب جديد' : 'New Submission',
      reviewed: isAr ? 'قيد المراجعة' : 'Under Review',
      missing_info: isAr ? 'نقص بيانات' : 'Awaiting Info',
      approved: isAr ? 'مقبول' : 'Approved',
      Completed: isAr ? 'مكتمل' : 'Completed',
      rejected: isAr ? 'مرفوض' : 'Rejected',
      draft: isAr ? 'مسودة' : 'Draft'
    }
  };

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
    if (!enrollments) return { total: 0, new: 0, review: 0, missing: 0, accepted: 0, rejected: 0 };
    return {
      total: enrollments.length,
      new: enrollments.filter(e => e.status === 'submitted').length,
      review: enrollments.filter(e => e.status === 'reviewed').length,
      missing: enrollments.filter(e => e.status === 'missing_info').length,
      accepted: enrollments.filter(e => e.status === 'approved' || e.status === 'Completed').length,
      rejected: enrollments.filter(e => e.status === 'rejected').length
    };
  }, [enrollments]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <FileText className="h-8 w-8 text-secondary" />
               {t.title}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{t.subtitle}</p>
         </div>
      </div>

      {/* Grid Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
         <Card className="border-none shadow-sm rounded-xl bg-white p-4 border border-slate-100 transition-all hover:shadow-md">
            <div className="space-y-1">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.stats.total}</p>
               <h3 className="text-2xl font-black text-primary">{stats.total}</h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary mt-3"><Inbox className="h-4 w-4" /></div>
         </Card>
         <Card className="border-none shadow-sm rounded-xl bg-white p-4 border border-slate-100 transition-all hover:shadow-md">
            <div className="space-y-1">
               <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{t.stats.new}</p>
               <h3 className="text-2xl font-black text-blue-600">{stats.new}</h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 mt-3"><Clock className="h-4 w-4" /></div>
         </Card>
         <Card className="border-none shadow-sm rounded-xl bg-white p-4 border border-slate-100 transition-all hover:shadow-md">
            <div className="space-y-1">
               <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest">{t.stats.review}</p>
               <h3 className="text-2xl font-black text-amber-600">{stats.review}</h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 mt-3"><Users className="h-4 w-4" /></div>
         </Card>
         <Card className="border-none shadow-sm rounded-xl bg-white p-4 border border-slate-100 transition-all hover:shadow-md">
            <div className="space-y-1">
               <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest">{t.stats.missing}</p>
               <h3 className="text-2xl font-black text-purple-600">{stats.missing}</h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 mt-3"><AlertCircle className="h-4 w-4" /></div>
         </Card>
         <Card className="border-none shadow-sm rounded-xl bg-white p-4 border border-slate-100 transition-all hover:shadow-md">
            <div className="space-y-1">
               <p className="text-[9px] font-black text-green-400 uppercase tracking-widest">{t.stats.accepted}</p>
               <h3 className="text-2xl font-black text-green-600">{stats.accepted}</h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mt-3"><BadgeCheck className="h-4 w-4" /></div>
         </Card>
         <Card className="border-none shadow-sm rounded-xl bg-white p-4 border border-slate-100 transition-all hover:shadow-md">
            <div className="space-y-1">
               <p className="text-[9px] font-black text-red-400 uppercase tracking-widest">{t.stats.rejected}</p>
               <h3 className="text-2xl font-black text-red-600">{stats.rejected}</h3>
            </div>
            <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 mt-3"><XCircle className="h-4 w-4" /></div>
         </Card>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-4">
         <div className="relative flex-1 w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 transition-colors group-focus-within:text-secondary" />
            <Input 
               placeholder={t.searchPlaceholder} 
               className="pl-10 h-11 rounded-lg bg-slate-50 border-none font-bold text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

         <div className="flex items-center gap-3 w-full md:w-auto">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
               <SelectTrigger className="w-full md:w-48 h-11 rounded-lg bg-slate-50 border-none font-black text-[10px] uppercase">
                  <SelectValue placeholder={t.allStatuses} />
               </SelectTrigger>
               <SelectContent className="rounded-xl">
                  <SelectItem value="all">{t.allStatuses}</SelectItem>
                  <SelectItem value="submitted" className="text-blue-600 font-bold">{t.statusMap.submitted}</SelectItem>
                  <SelectItem value="reviewed" className="text-amber-600 font-bold">{t.statusMap.reviewed}</SelectItem>
                  <SelectItem value="missing_info" className="text-purple-600 font-bold">{t.statusMap.missing_info}</SelectItem>
                  <SelectItem value="approved" className="text-green-600 font-bold">{t.statusMap.approved}</SelectItem>
                  <SelectItem value="rejected" className="text-red-600 font-bold">{t.statusMap.rejected}</SelectItem>
               </SelectContent>
            </Select>

            <Button variant="outline" className="h-11 px-6 rounded-lg border-slate-100 font-black text-[10px] uppercase gap-2 hover:bg-slate-50 transition-all shrink-0">
               <Download className="h-4 w-4" /> {t.export}
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
                          <th className="px-8 py-5 text-start">{t.table.guardian}</th>
                          <th className="px-6 py-5 text-center">{t.table.path}</th>
                          <th className="px-6 py-5 text-center">{t.table.students}</th>
                          <th className="px-6 py-5 text-center">{t.table.status}</th>
                          <th className="px-6 py-5 text-end pr-8"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {filteredData.length === 0 ? (
                         <tr>
                            <td colSpan={5} className="py-20 text-center">
                               <Inbox className="h-12 w-12 text-slate-100 mx-auto mb-4" />
                               <p className="text-slate-400 font-bold uppercase text-xs">{isAr ? 'لا توجد طلبات تطابق معايير البحث' : 'No applications match your criteria'}</p>
                            </td>
                         </tr>
                       ) : filteredData.map((app: any) => (
                          <tr key={app.id} className="hover:bg-slate-50/40 transition-all group cursor-pointer" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
                             <td className="px-8 py-6 text-start">
                                <div className="flex items-center gap-4">
                                   <div className={cn(
                                      "h-12 w-12 rounded-full flex items-center justify-center font-black text-lg shadow-xl text-white transition-all",
                                      app.status === 'submitted' ? "bg-blue-500 shadow-blue-500/20" : 
                                      app.status === 'reviewed' ? "bg-amber-500 shadow-amber-500/20" :
                                      app.status === 'missing_info' ? "bg-purple-500 shadow-purple-500/20" :
                                      app.status === 'approved' || app.status === 'Completed' ? "bg-green-600 shadow-green-600/20" : 
                                      app.status === 'rejected' ? "bg-red-500 shadow-red-500/20" :
                                      "bg-primary shadow-primary/20"
                                   )}>
                                      {app.parent1Name?.charAt(0)}
                                   </div>
                                   <div className="space-y-0.5">
                                      <p className="text-sm font-black text-primary truncate max-w-[200px]">{app.parent1Name}</p>
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
                                   app.status === 'reviewed' ? "bg-amber-100 text-amber-600" :
                                   app.status === 'missing_info' ? "bg-purple-100 text-purple-600" :
                                   app.status === 'approved' || app.status === 'Completed' ? "bg-green-100 text-green-600" : 
                                   app.status === 'rejected' ? "bg-red-50 text-red-500" :
                                   "bg-slate-100 text-slate-400"
                                )}>
                                   {t.statusMap[app.status as keyof typeof t.statusMap] || app.status}
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
