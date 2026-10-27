
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, 
  Download, 
  LayoutGrid, 
  Table as TableIcon,
  ChevronRight,
  MapPin,
  Calendar,
  X
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function EnrollmentsListPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProgram, setFilterProgram] = useState('all');

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
        app.students?.some((s: any) => s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
      const matchesProgram = filterProgram === 'all' || app.programOption === filterProgram;

      return matchesSearch && matchesStatus && matchesProgram;
    });
  }, [enrollments, searchTerm, filterStatus, filterProgram]);

  const exportToCSV = () => {
    if (!filteredData.length) return;
    
    const headers = ["Guardian Name", "Email", "Phone", "Program", "Status", "Total Students", "City", "State", "Date"];
    const rows = filteredData.map(app => [
      app.parent1Name,
      app.parent1Email,
      app.parent1Phone,
      app.programOption,
      app.status,
      app.students?.length || 0,
      app.address?.city,
      app.address?.state,
      app.updatedAt ? format(app.updatedAt.toDate(), 'yyyy-MM-dd') : ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BBA_Enrollments_${format(new Date(), 'yyyyMMdd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar: Unified Single Row Toolbar */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar">
         {/* Search Input */}
         <div className="relative group min-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input 
               placeholder={isAr ? 'بحث بالاسم أو البريد...' : 'Search by name or email...'} 
               className="pl-10 h-10 rounded-lg bg-slate-50 border-none font-bold focus:bg-white focus:ring-1 focus:ring-slate-100"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
               <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors">
                  <X className="h-3 w-3" />
               </button>
            )}
         </div>

         {/* Status Filter */}
         <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36 h-10 rounded-lg bg-slate-50 border-none font-bold shrink-0">
               <SelectValue placeholder={isAr ? 'الحالة' : 'Status'} />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
               <SelectItem value="all" className="font-bold">{isAr ? 'كافة الحالات' : 'All Status'}</SelectItem>
               <SelectItem value="submitted" className="font-bold text-green-600">{isAr ? 'مكتمل' : 'Submitted'}</SelectItem>
               <SelectItem value="reviewed" className="font-bold text-blue-600">{isAr ? 'تمت المراجعة' : 'Reviewed'}</SelectItem>
               <SelectItem value="approved" className="font-bold text-emerald-600">{isAr ? 'مقبول' : 'Approved'}</SelectItem>
               <SelectItem value="rejected" className="font-bold text-red-600">{isAr ? 'مرفوض' : 'Rejected'}</SelectItem>
               <SelectItem value="draft" className="font-bold text-slate-400">{isAr ? 'مسودة' : 'Draft'}</SelectItem>
            </SelectContent>
         </Select>

         {/* Program Filter */}
         <Select value={filterProgram} onValueChange={setFilterProgram}>
            <SelectTrigger className="w-36 h-10 rounded-lg bg-slate-50 border-none font-bold shrink-0">
               <SelectValue placeholder={isAr ? 'البرنامج' : 'Program'} />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
               <SelectItem value="all" className="font-bold">{isAr ? 'كافة البرامج' : 'All Programs'}</SelectItem>
               <SelectItem value="grades-3-5" className="font-bold">Foundation (3-5)</SelectItem>
               <SelectItem value="grades-6-12" className="font-bold">Academics (6-12)</SelectItem>
               <SelectItem value="weekend" className="font-bold">Weekend Remote</SelectItem>
            </SelectContent>
         </Select>

         {/* View Mode Toggle */}
         <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100 shrink-0">
            <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setViewMode('table')}
               className={cn(
                 "rounded-md h-8 w-8 transition-all", 
                 viewMode === 'table' ? "bg-primary text-white shadow-md hover:bg-primary" : "text-primary hover:bg-white"
               )}
            >
               <TableIcon className="h-4 w-4" />
            </Button>
            <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setViewMode('grid')}
               className={cn(
                 "rounded-md h-8 w-8 transition-all", 
                 viewMode === 'grid' ? "bg-primary text-white shadow-md hover:bg-primary" : "text-primary hover:bg-white"
               )}
            >
               <LayoutGrid className="h-4 w-4" />
            </Button>
         </div>

         {/* Export Button */}
         <Button onClick={exportToCSV} variant="outline" className="h-10 rounded-lg border-slate-200 font-black text-[10px] uppercase tracking-widest gap-2 shrink-0 hover:bg-primary hover:text-white transition-all">
            <Download className="h-4 w-4" />
            {isAr ? 'تصدير' : 'Export'}
         </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-white rounded-xl border border-slate-100 animate-pulse" />)}
        </div>
      ) : viewMode === 'table' ? (
        <Card className="border border-slate-100 shadow-sm rounded-xl bg-white overflow-hidden">
           <CardContent className="p-0">
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead>
                       <tr className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-6 py-4 text-start">{isAr ? 'ولي الأمر والطلاب' : 'Guardian & Students'}</th>
                          <th className="px-6 py-4 text-center">{isAr ? 'البرنامج' : 'Program'}</th>
                          <th className="px-6 py-4 text-center">{isAr ? 'الموقع' : 'Location'}</th>
                          <th className="px-6 py-4 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                          <th className="px-6 py-4 text-center">{isAr ? 'التاريخ' : 'Date'}</th>
                          <th className="px-6 py-4 text-end"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {filteredData.map((app: any) => (
                          <tr key={app.id} className="hover:bg-slate-50/30 transition-colors group cursor-pointer" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
                             <td className="px-6 py-5 text-start">
                                <div className="flex items-center gap-3">
                                   <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center font-black shrink-0 shadow-sm">
                                      {app.parent1Name?.charAt(0)}
                                   </div>
                                   <div className="space-y-0.5 min-w-0">
                                      <p className="text-sm font-black text-primary leading-tight truncate">{app.parent1Name}</p>
                                      <p className="text-[9px] text-slate-400 font-bold truncate">
                                         {app.students?.length} {isAr ? 'طلاب' : 'students'} • {app.parent1Email}
                                      </p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-5 text-center">
                                <Badge variant="outline" className="text-[8px] font-black uppercase bg-secondary/5 border-secondary/10 text-secondary rounded-lg">
                                   {app.programOption}
                                </Badge>
                             </td>
                             <td className="px-6 py-5 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                   <MapPin className="h-3 w-3 text-slate-300" />
                                   <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap">{app.address?.city}, {app.address?.state}</span>
                                </div>
                             </td>
                             <td className="px-6 py-5 text-center">
                                <Badge className={cn(
                                   "text-[8px] font-black uppercase rounded-lg border-none mx-auto",
                                   app.status === 'submitted' ? "bg-green-100 text-green-600" : 
                                   app.status === 'reviewed' ? "bg-blue-100 text-blue-600" :
                                   app.status === 'approved' ? "bg-emerald-100 text-emerald-600" :
                                   app.status === 'rejected' ? "bg-red-100 text-red-600" :
                                   "bg-slate-100 text-slate-400"
                                )}>
                                   {app.status}
                                </Badge>
                             </td>
                             <td className="px-6 py-5 text-center">
                                <p className="text-[11px] font-bold text-slate-600 whitespace-nowrap">{app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy') : '-'}</p>
                             </td>
                             <td className="px-6 py-5 text-end">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                                   <ChevronRight className={cn("h-4 w-4", isAr && "rotate-180")} />
                                </Button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredData.map((app: any) => (
             <Card key={app.id} className="border border-slate-100 shadow-sm rounded-xl bg-white overflow-hidden group hover:shadow-xl transition-all cursor-pointer border-t-4 border-t-primary" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
                <div className="h-24 bg-slate-50 relative p-5 flex items-center gap-4 border-b border-slate-100">
                   <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center text-xl font-black shadow-lg relative z-10 transition-transform group-hover:scale-110">
                      {app.parent1Name?.charAt(0)}
                   </div>
                   <div className="relative z-10 space-y-1">
                      <h3 className="text-primary font-black text-base truncate w-40 leading-tight">{app.parent1Name}</h3>
                      <Badge className="bg-secondary text-white text-[7px] font-black uppercase tracking-widest rounded-lg">{app.status}</Badge>
                   </div>
                </div>
                <CardContent className="p-5 space-y-4">
                   <div className="grid grid-cols-2 gap-4 border-b border-slate-50 pb-4">
                      <div className="space-y-0.5">
                         <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'البرنامج' : 'Program'}</p>
                         <p className="text-[11px] font-bold text-primary truncate">{app.programOption}</p>
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'الطلاب' : 'Students'}</p>
                         <p className="text-[11px] font-bold text-primary">{app.students?.length}</p>
                      </div>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-400">
                         <Calendar className="h-3 w-3" />
                         <span className="text-[10px] font-bold">{app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy') : '-'}</span>
                      </div>
                      <div className="h-7 w-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors">
                         <ChevronRight className={cn("h-3.5 w-3.5", isAr && "rotate-180")} />
                      </div>
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>
      )}
    </div>
  );
}
