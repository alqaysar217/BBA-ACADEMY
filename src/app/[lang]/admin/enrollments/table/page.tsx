
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, 
  Download, 
  ChevronRight,
  FileSpreadsheet,
  Columns,
  ArrowUpDown,
  Settings2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ComprehensiveTablePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'id', 'parentName', 'location', 'program', 'studentCount', 'status', 'date'
  ]);

  const enrollmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: enrollments, loading } = useCollection(enrollmentsQuery);

  const columns = [
    { id: 'id', label: isAr ? 'رقم الطلب' : 'App ID' },
    { id: 'parentName', label: isAr ? 'اسم ولي الأمر' : 'Guardian Name' },
    { id: 'location', label: isAr ? 'الموقع' : 'Location' },
    { id: 'program', label: isAr ? 'البرنامج' : 'Program' },
    { id: 'studentCount', label: isAr ? 'عدد الطلاب' : 'Students' },
    { id: 'status', label: isAr ? 'الحالة العامة' : 'Global Status' },
    { id: 'date', label: isAr ? 'آخر تحديث' : 'Last Action' },
  ];

  const filteredData = useMemo(() => {
    if (!enrollments) return [];
    return enrollments.filter(app => {
      const searchStr = `${app.parent1Name || ''} ${app.id || ''} ${app.programOption || ''}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
  }, [enrollments, searchTerm]);

  const toggleColumn = (id: string) => {
    setVisibleColumns(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    if (!filteredData.length) return;
    const headers = columns.filter(c => visibleColumns.includes(c.id)).map(c => c.label);
    const rows = filteredData.map(app => {
      const row: any = [];
      if (visibleColumns.includes('id')) row.push(app.id);
      if (visibleColumns.includes('parentName')) row.push(app.parent1Name);
      if (visibleColumns.includes('location')) row.push(`${app.address?.city || ''}, ${app.address?.state || ''}`);
      if (visibleColumns.includes('program')) row.push(app.programOption);
      if (visibleColumns.includes('studentCount')) row.push(app.students?.length || 0);
      if (visibleColumns.includes('status')) row.push(app.status);
      if (visibleColumns.includes('date')) row.push(app.updatedAt ? format(app.updatedAt.toDate(), 'yyyy-MM-dd') : '');
      return row;
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `BBA_Master_Table_${format(new Date(), 'yyyyMMdd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <FileSpreadsheet className="h-6 w-6 text-secondary" />
               {isAr ? 'جدول الطلبات الشامل' : 'Comprehensive Table'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">{isAr ? 'عرض بيانات تفصيلي مع تحكم كامل' : 'Advanced data view with full column & filter control'}</p>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
         <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
               placeholder={isAr ? 'بحث في كافة الحقول...' : 'Global table search...'} 
               className="pl-10 h-11 rounded-lg bg-slate-50 border-none font-bold text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-11 rounded-lg border-slate-200 font-black text-[10px] uppercase tracking-widest gap-2 bg-white">
                     <Columns className="h-4 w-4" />
                     {isAr ? 'الأعمدة' : 'Columns'}
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 bg-white shadow-2xl border-slate-100">
                  <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Toggle Fields</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {columns.map(col => (
                     <DropdownMenuCheckboxItem
                        key={col.id}
                        checked={visibleColumns.includes(col.id)}
                        onCheckedChange={() => toggleColumn(col.id)}
                        className="rounded-lg font-bold text-xs py-2.5"
                     >
                        {col.label}
                     </DropdownMenuCheckboxItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={exportToCSV} variant="outline" className="h-11 rounded-lg border-slate-200 font-black text-[10px] uppercase tracking-widest gap-2 bg-white hover:bg-slate-50">
               <Download className="h-4 w-4" /> Export CSV
            </Button>
         </div>
      </div>

      <Card className="border border-slate-100 shadow-xl rounded-xl bg-white overflow-hidden">
         <CardContent className="p-0">
            <div className="overflow-x-auto max-h-[70vh]">
               <table className="w-full border-collapse">
                  <thead className="sticky top-0 z-30 bg-slate-900 text-white">
                     <tr>
                        {columns.map(col => visibleColumns.includes(col.id) && (
                           <th key={col.id} className="px-6 py-5 text-start font-black uppercase text-[10px] tracking-widest border-r border-white/5 whitespace-nowrap">
                              <div className="flex items-center justify-between gap-4">
                                 {col.label}
                                 <ArrowUpDown className="h-3 w-3 opacity-30" />
                              </div>
                           </th>
                        ))}
                        <th className="px-6 py-5 text-end"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {loading ? (
                        [1,2,3,4,5].map(i => <tr key={i} className="animate-pulse"><td colSpan={visibleColumns.length + 1} className="h-14 bg-slate-50/50" /></tr>)
                     ) : filteredData.map((app: any) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                           {visibleColumns.includes('id') && <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">{app.id}</td>}
                           {visibleColumns.includes('parentName') && <td className="px-6 py-4 text-sm font-black text-primary">{app.parent1Name}</td>}
                           {visibleColumns.includes('location') && <td className="px-6 py-4 text-xs font-bold text-slate-500">{app.address?.city}, {app.address?.state}</td>}
                           {visibleColumns.includes('program') && <td className="px-6 py-4"><Badge variant="outline" className="text-[8px] font-black uppercase bg-secondary/5 text-secondary border-none">{app.programOption}</Badge></td>}
                           {visibleColumns.includes('studentCount') && <td className="px-6 py-4 text-center font-black text-primary">{app.students?.length}</td>}
                           {visibleColumns.includes('status') && <td className="px-6 py-4"><Badge className={cn("text-[9px] font-black uppercase rounded-md border-none px-3", app.status === 'submitted' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500")}>{app.status}</Badge></td>}
                           {visibleColumns.includes('date') && <td className="px-6 py-4 text-[10px] font-bold text-slate-400 whitespace-nowrap">{app.updatedAt ? format(app.updatedAt.toDate(), 'yyyy-MM-dd') : '-'}</td>}
                           <td className="px-6 py-4 text-end">
                              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
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
      
      <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white p-4 rounded-xl shadow-sm border border-slate-100">
         <div>Total Records: {filteredData.length}</div>
         <div className="flex items-center gap-2">
            <Settings2 className="h-3 w-3" /> System Analytics Matrix Activated
         </div>
      </div>
    </div>
  );
}
