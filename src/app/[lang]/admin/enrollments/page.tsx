
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, 
  Filter, 
  Download, 
  LayoutGrid, 
  Table as TableIcon,
  ChevronRight,
  MoreVertical,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  ArrowUpDown,
  X,
  Users,
  FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function EnrollmentsListPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
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
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
         <div className="flex-1 w-full lg:max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
               placeholder={isAr ? 'بحث بالاسم أو البريد...' : 'Search by name or email...'} 
               className="pl-10 h-10 rounded-lg bg-slate-50 border-none font-bold"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

         <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
               <SelectTrigger className="w-36 h-10 rounded-lg bg-slate-50 border-none font-bold">
                  <SelectValue placeholder={isAr ? 'الحالة' : 'Status'} />
               </SelectTrigger>
               <SelectContent className="rounded-lg">
                  <SelectItem value="all">{isAr ? 'كافة الحالات' : 'All Status'}</SelectItem>
                  <SelectItem value="submitted">{isAr ? 'مكتمل' : 'Submitted'}</SelectItem>
                  <SelectItem value="draft">{isAr ? 'مسودة' : 'Draft'}</SelectItem>
               </SelectContent>
            </Select>

            <Select value={filterProgram} onValueChange={setFilterProgram}>
               <SelectTrigger className="w-36 h-10 rounded-lg bg-slate-50 border-none font-bold">
                  <SelectValue placeholder={isAr ? 'البرنامج' : 'Program'} />
               </SelectTrigger>
               <SelectContent className="rounded-lg">
                  <SelectItem value="all">{isAr ? 'كافة البرامج' : 'All Programs'}</SelectItem>
                  <SelectItem value="grades-3-5">{isAr ? 'تأسيس' : 'Foundation'}</SelectItem>
                  <SelectItem value="grades-6-12">{isAr ? 'أكاديمي' : 'Academics'}</SelectItem>
                  <SelectItem value="weekend">{isAr ? 'عطلة الأسبوع' : 'Weekend'}</SelectItem>
               </SelectContent>
            </Select>

            <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
               <Button 
                  variant={viewMode === 'table' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  onClick={() => setViewMode('table')}
                  className={cn("rounded-md h-8 w-8", viewMode === 'table' && "bg-white shadow-sm border border-slate-100")}
               >
                  <TableIcon className="h-4 w-4" />
               </Button>
               <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  onClick={() => setViewMode('grid')}
                  className={cn("rounded-md h-8 w-8", viewMode === 'grid' && "bg-white shadow-sm border border-slate-100")}
               >
                  <LayoutGrid className="h-4 w-4" />
               </Button>
            </div>

            <Button onClick={exportToCSV} variant="outline" className="h-10 rounded-lg border-slate-200 font-black text-[10px] uppercase tracking-widest gap-2">
               <Download className="h-4 w-4" />
               {isAr ? 'تصدير' : 'Export'}
            </Button>
         </div>
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
                                   <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center font-black shrink-0">
                                      {app.parent1Name?.charAt(0)}
                                   </div>
                                   <div className="space-y-0.5 min-w-0">
                                      <p className="text-sm font-black text-primary leading-tight truncate">{app.parent1Name}</p>
                                      <p className="text-[9px] text-slate-400 font-bold truncate">{app.parent1Email}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-5 text-center">
                                <Badge variant="outline" className="text-[8px] font-black uppercase bg-secondary/5 border-secondary/10 text-secondary">
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
                                   "text-[8px] font-black uppercase rounded-md border-none mx-auto",
                                   app.status === 'submitted' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                )}>
                                   {app.status}
                                </Badge>
                             </td>
                             <td className="px-6 py-5 text-center">
                                <p className="text-[11px] font-bold text-slate-600 whitespace-nowrap">{app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy') : '-'}</p>
                             </td>
                             <td className="px-6 py-5 text-end">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-md">
                                   <ChevronRight className={cn("h-4 w-4 text-slate-300", isAr && "rotate-180")} />
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
             <Card key={app.id} className="border border-slate-100 shadow-sm rounded-xl bg-white overflow-hidden group hover:shadow-md transition-all cursor-pointer" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
                <div className="h-24 bg-primary relative p-5 flex items-center gap-4">
                   <div className="h-12 w-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xl font-black border border-white/20 relative z-10">
                      {app.parent1Name?.charAt(0)}
                   </div>
                   <div className="relative z-10">
                      <h3 className="text-white font-black text-base truncate w-40 leading-tight">{app.parent1Name}</h3>
                      <Badge className="bg-secondary text-white text-[7px] font-black uppercase tracking-widest mt-1">{app.status}</Badge>
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
                      <div className="h-7 w-7 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors">
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
