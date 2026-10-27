
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
  Settings2,
  Filter,
  Calendar,
  X,
  ExternalLink,
  MapPin,
  Users,
  GraduationCap,
  Check,
  ChevronDown
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, startOfDay, endOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ComprehensiveTablePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  
  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterState, setFilterState] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [colSearch, setColSearch] = useState('');

  // Column management - Default visible
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'id', 'parent1Name', 'addressState', 'program', 'studentCount', 'status', 'date'
  ]);

  const enrollmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: enrollments, loading } = useCollection(enrollmentsQuery);

  const columns = [
    { id: 'id', label: isAr ? 'رقم الطلب' : 'App ID' },
    // Parent 1
    { id: 'parent1Name', label: isAr ? 'ولي أمر 1: الاسم' : 'P1: Name' },
    { id: 'parent1Phone', label: isAr ? 'ولي أمر 1: هاتف' : 'P1: Phone' },
    { id: 'parent1Email', label: isAr ? 'ولي أمر 1: بريد' : 'P1: Email' },
    { id: 'relationship1', label: isAr ? 'ولي أمر 1: صلة' : 'P1: Relation' },
    // Parent 2
    { id: 'parent2Name', label: isAr ? 'ولي أمر 2: الاسم' : 'P2: Name' },
    { id: 'parent2Phone', label: isAr ? 'ولي أمر 2: هاتف' : 'P2: Phone' },
    { id: 'parent2Email', label: isAr ? 'ولي أمر 2: بريد' : 'P2: Email' },
    { id: 'relationship2', label: isAr ? 'ولي أمر 2: صلة' : 'P2: Relation' },
    // Address
    { id: 'addressLine1', label: isAr ? 'العنوان: سطر 1' : 'Addr: Line 1' },
    { id: 'addressLine2', label: isAr ? 'العنوان: سطر 2' : 'Addr: Line 2' },
    { id: 'addressCity', label: isAr ? 'المدينة' : 'City' },
    { id: 'addressState', label: isAr ? 'الولاية' : 'State' },
    { id: 'addressZip', label: isAr ? 'الرمز البريدي' : 'ZIP' },
    // Students Count
    { id: 'studentCount', label: isAr ? 'عدد الطلاب' : 'Student Qty' },
    // Student 1
    { id: 's1Status', label: isAr ? 'طالب 1: النوع' : 'S1: Type' },
    { id: 's1Name', label: isAr ? 'طالب 1: الاسم' : 'S1: Full Name' },
    { id: 's1Dob', label: isAr ? 'طالب 1: ميلاد' : 'S1: DOB' },
    { id: 's1Gender', label: isAr ? 'طالب 1: جنس' : 'S1: Gender' },
    { id: 's1Grade', label: isAr ? 'طالب 1: مستوى' : 'S1: Grade' },
    { id: 's1Phone', label: isAr ? 'طالب 1: هاتف' : 'S1: Phone' },
    { id: 's1Email', label: isAr ? 'طالب 1: بريد' : 'S1: Email' },
    // Student 2
    { id: 's2Status', label: isAr ? 'طالب 2: النوع' : 'S2: Type' },
    { id: 's2Name', label: isAr ? 'طالب 2: الاسم' : 'S2: Full Name' },
    { id: 's2Dob', label: isAr ? 'طالب 2: ميلاد' : 'S2: DOB' },
    { id: 's2Gender', label: isAr ? 'طالب 2: جنس' : 'S2: Gender' },
    { id: 's2Grade', label: isAr ? 'طالب 2: مستوى' : 'S2: Grade' },
    // Student 3
    { id: 's3Status', label: isAr ? 'طالب 3: النوع' : 'S3: Type' },
    { id: 's3Name', label: isAr ? 'طالب 3: الاسم' : 'S3: Full Name' },
    // Global Selection
    { id: 'program', label: isAr ? 'البرنامج' : 'Program' },
    { id: 'payment', label: isAr ? 'فئة الدفع' : 'Payment Tier' },
    { id: 'language', label: isAr ? 'اللغة' : 'Language' },
    { id: 'filesLink', label: isAr ? 'المرفقات' : 'Attachments' },
    { id: 'status', label: isAr ? 'الحالة' : 'Status' },
    { id: 'date', label: isAr ? 'آخر تحديث' : 'Last Updated' },
  ];

  const filteredData = useMemo(() => {
    if (!enrollments) return [];
    return enrollments.filter(app => {
      const searchStr = `${app.parent1Name || ''} ${app.id || ''} ${app.parent1Email || ''} ${app.parent1Phone || ''}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      const matchesProgram = filterProgram === 'all' || app.programOption === filterProgram;
      const matchesState = filterState === 'all' || app.address?.state === filterState;

      let matchesDate = true;
      if (app.updatedAt && typeof app.updatedAt.toDate === 'function') {
        const appDate = app.updatedAt.toDate();
        if (dateFrom) matchesDate = matchesDate && appDate >= startOfDay(new Date(dateFrom));
        if (dateTo) matchesDate = matchesDate && appDate <= endOfDay(new Date(dateTo));
      }

      return matchesSearch && matchesProgram && matchesState && matchesDate;
    });
  }, [enrollments, searchTerm, filterProgram, filterState, dateFrom, dateTo]);

  const uniqueStates = useMemo(() => {
    if (!enrollments) return [];
    const states = new Set(enrollments.map(e => e.address?.state).filter(Boolean));
    return Array.from(states).sort();
  }, [enrollments]);

  const toggleColumn = (id: string) => {
    setVisibleColumns(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const showAllColumns = () => setVisibleColumns(columns.map(c => c.id));
  const hideAllColumns = () => setVisibleColumns(['id', 'parent1Name', 'status']);

  const getCellValue = (app: any, colId: string) => {
    const s1 = app.students?.[0];
    const s2 = app.students?.[1];
    const s3 = app.students?.[2];

    switch (colId) {
      case 'id': return app.id;
      case 'parent1Name': return app.parent1Name;
      case 'parent1Phone': return app.parent1Phone;
      case 'parent1Email': return app.parent1Email;
      case 'relationship1': return app.relationship1;
      case 'parent2Name': return app.parent2Name;
      case 'parent2Phone': return app.parent2Phone;
      case 'parent2Email': return app.parent2Email;
      case 'relationship2': return app.relationship2;
      case 'addressLine1': return app.address?.line1;
      case 'addressLine2': return app.address?.line2;
      case 'addressCity': return app.address?.city;
      case 'addressState': return app.address?.state;
      case 'addressZip': return app.address?.zip;
      case 'studentCount': return app.students?.length || 0;
      case 's1Status': return s1?.status;
      case 's1Name': return s1 ? `${s1.firstName} ${s1.middleName || ''} ${s1.lastName}` : '';
      case 's1Dob': return s1?.dob;
      case 's1Gender': return s1?.gender;
      case 's1Grade': return s1?.lastGrade;
      case 's1Phone': return s1?.phone;
      case 's1Email': return s1?.email;
      case 's2Status': return s2?.status;
      case 's2Name': return s2 ? `${s2.firstName} ${s2.middleName || ''} ${s2.lastName}` : '';
      case 's2Dob': return s2?.dob;
      case 's2Gender': return s2?.gender;
      case 's2Grade': return s2?.lastGrade;
      case 's3Status': return s3?.status;
      case 's3Name': return s3 ? `${s3.firstName} ${s3.middleName || ''} ${s3.lastName}` : '';
      case 'program': return app.programOption;
      case 'payment': return app.paymentTier;
      case 'language': return app.languageOption;
      case 'filesLink': return app.files?.length || 0;
      case 'status': return app.status;
      case 'date': return app.updatedAt && typeof app.updatedAt.toDate === 'function' ? format(app.updatedAt.toDate(), 'yyyy-MM-dd') : '-';
      default: return '';
    }
  };

  const exportToCSV = () => {
    if (!filteredData.length) return;
    const exportHeaders = columns.map(c => c.label);
    const rows = filteredData.map(app => {
      return columns.map(col => {
        const val = getCellValue(app, col.id);
        return `"${String(val || '').replace(/"/g, '""')}"`;
      }).join(",");
    });
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + exportHeaders.join(",") + "\n" + rows.join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `BBA_Full_Export_${format(new Date(), 'yyyyMMdd_HHmm')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCols = columns.filter(c => c.label.toLowerCase().includes(colSearch.toLowerCase()));

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
         <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <FileSpreadsheet className="h-6 w-6 text-secondary" />
               {isAr ? 'جدول البيانات الشامل (كامل الاستمارة)' : 'Comprehensive Data Matrix (Full Form)'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">{isAr ? 'عرض تفصيلي لكافة حقول الاستمارة مع فلاتر ذكية' : 'Detailed view of all form fields with advanced logical filters'}</p>
         </div>
      </div>

      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 space-y-4 shrink-0">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-4">
          <div className="relative flex-1 group min-w-0">
              <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400", isAr ? "right-3" : "left-3")} />
              <Input 
                placeholder={isAr ? 'بحث سريع (اسم، هاتف، بريد، رقم طلب)...' : 'Quick Search (Name, Phone, Email, ID)...'} 
                className={cn("h-11 rounded-lg bg-slate-50 border-none font-bold text-sm w-full", isAr ? "pr-10" : "pl-10")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>

          <div className="flex flex-wrap items-center gap-2 overflow-hidden">
              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100 shrink-0">
                <Calendar className="h-4 w-4 text-slate-400 ml-2" />
                <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="h-8 w-32 border-none bg-transparent text-[10px] font-bold uppercase" />
                <span className="text-[10px] font-black text-slate-300 px-1">TO</span>
                <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="h-8 w-32 border-none bg-transparent text-[10px] font-bold uppercase" />
              </div>

              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger className="h-11 w-36 rounded-lg bg-slate-50 border-none font-black text-[10px] uppercase shrink-0">
                  <MapPin className="h-3 w-3 mr-2 text-secondary" />
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">{isAr ? 'كافة الولايات' : 'All States'}</SelectItem>
                  {uniqueStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-11 rounded-lg border-slate-200 font-black text-[10px] uppercase tracking-widest gap-2 bg-white hover:bg-slate-50 shadow-sm px-6 shrink-0">
                    <Columns className="h-4 w-4 text-secondary" />
                    {isAr ? 'إدارة الأعمدة' : 'Manage Columns'}
                    <ChevronDown className="h-3 w-3 opacity-30" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0 rounded-xl shadow-2xl border-slate-100 overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Visible Fields</span>
                       <div className="flex gap-2">
                          <button onClick={showAllColumns} className="text-[9px] font-black text-secondary hover:underline uppercase">Show All</button>
                          <span className="text-slate-300">|</span>
                          <button onClick={hideAllColumns} className="text-[9px] font-black text-slate-400 hover:underline uppercase">Reset</button>
                       </div>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <Input 
                        placeholder="Search columns..." 
                        value={colSearch} 
                        onChange={(e) => setColSearch(e.target.value)}
                        className="h-9 pl-9 bg-white border-slate-200 text-xs font-bold rounded-lg"
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-80">
                    <div className="p-2 space-y-1">
                      {filteredCols.map(col => (
                        <div 
                          key={col.id} 
                          onClick={() => toggleColumn(col.id)}
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-xs font-bold",
                            visibleColumns.includes(col.id) ? "bg-primary/5 text-primary" : "text-slate-500 hover:bg-slate-50"
                          )}
                        >
                          <span>{col.label}</span>
                          {visibleColumns.includes(col.id) && <Check className="h-3.5 w-3.5 text-secondary" />}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              <Button onClick={exportToCSV} variant="outline" className="h-11 rounded-lg border-slate-200 font-black text-[10px] uppercase tracking-widest gap-2 bg-white hover:bg-slate-900 hover:text-white transition-all shadow-sm shrink-0">
                <Download className="h-4 w-4" /> Export (CSV)
              </Button>
          </div>
        </div>
      </div>

      <Card className="border border-slate-100 shadow-xl rounded-xl bg-white overflow-hidden flex-1 min-h-0 flex flex-col">
         <CardContent className="p-0 flex-1 min-h-0 relative overflow-hidden">
            <div className="absolute inset-0 overflow-auto custom-scrollbar">
               <table className="w-full border-collapse min-w-max">
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
                        <th className={cn("px-6 py-5 text-end bg-slate-900 sticky z-40 shadow-[-10px_0_15px_rgba(0,0,0,0.15)]", isAr ? "left-0" : "right-0")}></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {loading ? (
                        [1,2,3,4,5].map(i => <tr key={i} className="animate-pulse"><td colSpan={visibleColumns.length + 1} className="h-16 bg-slate-50/50" /></tr>)
                     ) : filteredData.length === 0 ? (
                        <tr>
                           <td colSpan={visibleColumns.length + 1} className="py-32 text-center">
                              <div className="space-y-4">
                                 <Filter className="h-12 w-12 text-slate-100 mx-auto" />
                                 <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">No entries matching current filters</p>
                              </div>
                           </td>
                        </tr>
                     ) : filteredData.map((app: any) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                           {columns.map(col => visibleColumns.includes(col.id) && (
                              <td key={col.id} className="px-6 py-4 border-r border-slate-50 whitespace-nowrap">
                                {col.id === 'filesLink' ? (
                                   app.files?.length > 0 ? (
                                      <Button size="sm" variant="outline" className="h-7 rounded-md text-[9px] font-black uppercase gap-1.5 border-secondary/20 text-secondary hover:bg-secondary hover:text-white" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
                                         <ExternalLink className="h-3 w-3" /> {app.files.length} Files
                                      </Button>
                                   ) : '-'
                                ) : col.id === 'status' ? (
                                   <Badge className={cn(
                                      "text-[9px] font-black uppercase rounded-md border-none px-3 py-1",
                                      app.status === 'submitted' ? "bg-blue-100 text-blue-600" : 
                                      app.status === 'approved' || app.status === 'Completed' ? "bg-green-100 text-green-600" : 
                                      app.status === 'rejected' ? "bg-red-50 text-red-500" :
                                      "bg-slate-100 text-slate-500"
                                   )}>{app.status}</Badge>
                                ) : (
                                   <span className={cn(
                                      "text-xs font-bold",
                                      col.id === 'parent1Name' || col.id === 'id' ? "text-slate-900 font-black" : "text-slate-600"
                                   )}>
                                      {getCellValue(app, col.id)}
                                   </span>
                                )}
                              </td>
                           ))}
                           <td className={cn(
                             "px-6 py-4 text-end sticky bg-white group-hover:bg-slate-50/50 shadow-[-10px_0_15px_rgba(0,0,0,0.05)] z-30",
                             isAr ? "left-0" : "right-0"
                           )}>
                              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
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
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white p-4 rounded-xl shadow-sm border border-slate-100 shrink-0">
         <div>Total: {filteredData.length} records in view</div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <Users className="h-3 w-3 text-secondary" />
               Excel-Style Master Grid Active
            </div>
            <Settings2 className="h-3 w-3" />
         </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 10px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 5px;
          border: 2px solid #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
