
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
      <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar">
         <div className="relative group min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input 
               placeholder={isAr ? 'بحث...' : 'Search...'} 
               className="pl-9 h-10 rounded-lg bg-slate-50 border-none font-bold"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

         <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32 h-10 rounded-lg bg-slate-50 border-none font-bold shrink-0">
               <SelectValue placeholder={isAr ? 'الحالة' : 'Status'} />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
               <SelectItem value="all" className="font-bold">{isAr ? 'الكل' : 'All'}</SelectItem>
               <SelectItem value="submitted" className="font-bold text-green-600">Submitted</SelectItem>
               <SelectItem value="reviewed" className="font-bold text-blue-600">Reviewed</SelectItem>
               <SelectItem value="approved" className="font-bold text-emerald-600">Approved</SelectItem>
            </SelectContent>
         </Select>

         <Select value={filterProgram} onValueChange={setFilterProgram}>
            <SelectTrigger className="w-32 h-10 rounded-lg bg-slate-50 border-none font-bold shrink-0">
               <SelectValue placeholder={isAr ? 'البرنامج' : 'Program'} />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
               <SelectItem value="all" className="font-bold">{isAr ? 'الكل' : 'All'}</SelectItem>
               <SelectItem value="grades-3-5" className="font-bold">Foundation</SelectItem>
               <SelectItem value="grades-6-12" className="font-bold">Academics</SelectItem>
            </SelectContent>
         </Select>

         <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100 shrink-0">
            <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setViewMode('table')}
               className={cn(
                 "rounded-md h-8 w-8 transition-all", 
                 viewMode === 'table' ? "bg-primary text-white" : "text-primary"
               )}
            >
               <TableIcon className="h-3.5 w-3.5" />
            </Button>
            <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setViewMode('grid')}
               className={cn(
                 "rounded-md h-8 w-8 transition-all", 
                 viewMode === 'grid' ? "bg-primary text-white" : "text-primary"
               )}
            >
               <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
         </div>

         <Button onClick={exportToCSV} variant="outline" className="h-10 rounded-lg border-slate-200 font-black text-[10px] uppercase tracking-widest gap-2 shrink-0">
            <Download className="h-3.5 w-3.5" />
            {isAr ? 'تصدير' : 'Export'}
         </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[1,2,3,4,5,6].map(i => <div key={i} className="h-40 bg-white rounded-xl border border-slate-100 animate-pulse" />)}
        </div>
      ) : viewMode === 'table' ? (
        <Card className="border border-slate-100 shadow-sm rounded-xl bg-white overflow-hidden">
           <CardContent className="p-0">
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead>
                       <tr className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-6 py-4 text-start">Guardian & Students</th>
                          <th className="px-6 py-4 text-center">Program</th>
                          <th className="px-6 py-4 text-center">Location</th>
                          <th className="px-6 py-4 text-center">Status</th>
                          <th className="px-6 py-4 text-center">Date</th>
                          <th className="px-6 py-4 text-end"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {filteredData.map((app: any) => (
                          <tr key={app.id} className="hover:bg-slate-50/30 transition-colors group cursor-pointer" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
                             <td className="px-6 py-4 text-start">
                                <div className="flex items-center gap-3">
                                   <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center font-black shrink-0">
                                      {app.parent1Name?.charAt(0)}
                                   </div>
                                   <div className="space-y-0.5 min-w-0">
                                      <p className="text-sm font-black text-primary truncate">{app.parent1Name}</p>
                                      <p className="text-[9px] text-slate-400 font-bold truncate">
                                         {app.students?.length} students • {app.parent1Email}
                                      </p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-center">
                                <Badge variant="outline" className="text-[8px] font-black uppercase bg-secondary/5 text-secondary rounded-md">
                                   {app.programOption}
                                </Badge>
                             </td>
                             <td className="px-6 py-4 text-center text-xs font-bold text-slate-600">
                                {app.address?.city}, {app.address?.state}
                             </td>
                             <td className="px-6 py-4 text-center">
                                <Badge className={cn(
                                   "text-[8px] font-black uppercase rounded-md border-none",
                                   app.status === 'submitted' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                                )}>
                                   {app.status}
                                </Badge>
                             </td>
                             <td className="px-6 py-4 text-center text-[10px] font-bold text-slate-500">
                                {app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy') : '-'}
                             </td>
                             <td className="px-6 py-4 text-end">
                                <ChevronRight className="h-4 w-4 text-slate-300" />
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
             <Card key={app.id} className="border border-slate-100 shadow-sm rounded-xl bg-white overflow-hidden group hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
                <div className="h-20 bg-slate-50 p-4 flex items-center gap-4">
                   <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center text-lg font-black shadow-lg">
                      {app.parent1Name?.charAt(0)}
                   </div>
                   <div className="space-y-0.5">
                      <h3 className="text-primary font-black text-sm truncate w-40">{app.parent1Name}</h3>
                      <Badge className="bg-secondary text-white text-[7px] font-black uppercase rounded-md">{app.status}</Badge>
                   </div>
                </div>
                <CardContent className="p-4 space-y-4 text-xs font-bold">
                   <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400 uppercase text-[8px]">Program</span>
                      <span className="text-primary">{app.programOption}</span>
                   </div>
                   <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-400 uppercase text-[8px]">Students</span>
                      <span className="text-primary">{app.students?.length}</span>
                   </div>
                   <div className="flex items-center justify-between text-slate-400 pt-2">
                      <span className="text-[10px]">{app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy') : '-'}</span>
                      <ChevronRight className="h-4 w-4" />
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>
      )}
    </div>
  );
}
