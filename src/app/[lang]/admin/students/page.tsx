
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, Users, GraduationCap, MapPin, 
  ChevronRight, Filter, Download,
  CreditCard, BookOpen, User, Wallet,
  Calendar, X, ArrowUpDown, FileSpreadsheet,
  CalendarDays, Briefcase, UserSearch,
  SortAsc, SortDesc, Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { format, startOfDay, endOfDay, isWithinInterval } from 'date-fns';

export default function StudentsRegistryPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  
  // States for Filtering & Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'name-asc' | 'name-desc'>('newest');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Query ordered by creation time descending (Last added on top)
  const studentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'students'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: students, loading } = useCollection(studentsQuery);

  const filteredAndSortedStudents = useMemo(() => {
    if (!students) return [];
    
    // 1. Filtering Logic
    let result = students.filter(s => {
      const matchesSearch = 
        s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecificName = !filterName || 
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(filterName.toLowerCase());

      const matchesProgram = filterProgram === 'all' || s.program === filterProgram;

      const matchesGrade = filterGrade === 'all' || String(s.gradeLevel) === filterGrade;

      let matchesDate = true;
      if (dateFrom || dateTo) {
        const joinDate = s.createdAt?.toDate ? s.createdAt.toDate() : null;
        if (joinDate) {
          const from = dateFrom ? startOfDay(new Date(dateFrom)) : new Date(0);
          const to = dateTo ? endOfDay(new Date(dateTo)) : new Date();
          matchesDate = isWithinInterval(joinDate, { start: from, end: to });
        } else {
          matchesDate = false;
        }
      }

      return matchesSearch && matchesSpecificName && matchesProgram && matchesGrade && matchesDate;
    });

    // 2. Sorting Logic
    if (sortOrder === 'name-asc') {
      result.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
    } else if (sortOrder === 'name-desc') {
      result.sort((a, b) => `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`));
    }
    // 'newest' is already the base order from Firestore query, filter preserves it

    return result;
  }, [students, searchTerm, filterName, filterProgram, filterGrade, dateFrom, dateTo, sortOrder]);

  const exportToCSV = () => {
    if (!filteredAndSortedStudents.length) return;
    
    const headers = [
      isAr ? 'المعرف' : 'ID',
      isAr ? 'الاسم' : 'Name',
      isAr ? 'المستوى' : 'Grade',
      isAr ? 'البرنامج' : 'Program',
      isAr ? 'الحالة' : 'Status',
      isAr ? 'الرصيد' : 'Balance',
      isAr ? 'تاريخ الانضمام' : 'Joined At'
    ];

    const rows = filteredAndSortedStudents.map(s => {
      const balance = (s.financialLedger?.totalDue || 0) - (s.financialLedger?.totalPaid || 0);
      const joined = s.createdAt?.toDate ? format(s.createdAt.toDate(), 'yyyy-MM-dd') : '-';
      return [
        s.id,
        `${s.firstName} ${s.lastName}`,
        s.gradeLevel,
        s.program,
        s.status,
        balance,
        joined
      ].join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.join(",") + "\n" + rows.join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `BBA_Students_Registry_${format(new Date(), 'yyyyMMdd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const t = {
    title: isAr ? 'سجل الطلاب النشطين' : 'Active Student Roster',
    searchPlaceholder: isAr ? 'بحث سريع باسم الطالب أو المعرف...' : 'Search student name or ID...',
    filters: {
      title: isAr ? 'أدوات الفلترة والبحث' : 'Filter & Search Tools',
      name: isAr ? 'فلترة حسب الاسم' : 'Filter by Name',
      program: isAr ? 'البرنامج التعليمي' : 'Educational Program',
      grade: isAr ? 'المستوى الدراسي' : 'Grade Level',
      from: isAr ? 'من تاريخ' : 'From Date',
      to: isAr ? 'إلى تاريخ' : 'To Date',
      all: isAr ? 'الكل' : 'All',
      sort: isAr ? 'ترتيب حسب' : 'Sort By',
      newest: isAr ? 'المضاف حديثاً' : 'Newest First',
      nameAsc: isAr ? 'الاسم (أ-ي)' : 'Name (A-Z)',
      nameDesc: isAr ? 'الاسم (ي-أ)' : 'Name (Z-A)',
    },
    table: {
      student: isAr ? 'هوية الطالب' : 'Student Identity',
      level: isAr ? 'المستوى' : 'Level',
      program: isAr ? 'البرنامج' : 'Program',
      status: isAr ? 'الحالة' : 'Status',
      balance: isAr ? 'الرصيد' : 'Balance'
    }
  };

  const toggleNameSort = () => {
    if (sortOrder === 'name-asc') setSortOrder('name-desc');
    else setSortOrder('name-asc');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Integrated Filter Bar */}
      <Card className="border-none shadow-premium bg-white rounded-2xl overflow-hidden border border-slate-100">
         <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
               <div className="relative w-full lg:max-w-md group">
                  <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-secondary", isAr ? "right-4" : "left-4")} />
                  <Input 
                     placeholder={t.searchPlaceholder} 
                     className={cn("h-14 bg-slate-50 border-none font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20 transition-all rounded-xl", isAr ? "pr-12" : "pl-12")}
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <div className="flex gap-3 w-full lg:w-auto">
                  <Button 
                    variant={isFilterVisible ? "secondary" : "outline"} 
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                    className="h-14 flex-1 lg:flex-none rounded-xl px-6 border-slate-200 font-black gap-2 uppercase text-[10px] tracking-widest transition-all"
                  >
                     <Filter className="h-4 w-4" /> {isAr ? 'تخصيص الفلترة' : 'Advanced Filters'}
                  </Button>
                  <Button 
                    onClick={exportToCSV}
                    variant="outline" 
                    className="h-14 flex-1 lg:flex-none rounded-xl px-6 border-slate-200 font-black gap-2 hover:bg-slate-900 hover:text-white uppercase text-[10px] tracking-widest transition-all"
                  >
                     <Download className="h-4 w-4" /> {isAr ? 'تصدير' : 'Export (CSV)'}
                  </Button>
               </div>
            </div>

            {/* Expandable Filter Grid */}
            {isFilterVisible && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 pt-6 border-t border-slate-100 animate-in slide-in-from-top-4 duration-500">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                       <UserSearch className="h-3.5 w-3.5 text-secondary" /> {t.filters.name}
                    </Label>
                    <Input 
                       value={filterName} 
                       onChange={(e) => setFilterName(e.target.value)}
                       className="h-12 bg-slate-50 border-none rounded-xl font-bold text-xs"
                       placeholder={isAr ? "اكتب الاسم..." : "Type name..."}
                    />
                 </div>

                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                       <Briefcase className="h-3.5 w-3.5 text-secondary" /> {t.filters.program}
                    </Label>
                    <Select value={filterProgram} onValueChange={setFilterProgram}>
                       <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-bold">
                          <SelectValue placeholder={t.filters.all} />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="all">{t.filters.all}</SelectItem>
                          <SelectItem value="grades-3-5">Foundation 3-5</SelectItem>
                          <SelectItem value="grades-6-12">Academics 6-12</SelectItem>
                          <SelectItem value="weekend">Weekend Remote</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>

                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                       <GraduationCap className="h-3.5 w-3.5 text-secondary" /> {t.filters.grade}
                    </Label>
                    <Select value={filterGrade} onValueChange={setFilterGrade}>
                       <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-bold">
                          <SelectValue placeholder={t.filters.all} />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="all">{t.filters.all}</SelectItem>
                          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(g => (
                            <SelectItem key={g} value={g}>Grade {g}</SelectItem>
                          ))}
                       </SelectContent>
                    </Select>
                 </div>

                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                       <ArrowUpDown className="h-3.5 w-3.5 text-secondary" /> {t.filters.sort}
                    </Label>
                    <Select value={sortOrder} onValueChange={(v: any) => setSortOrder(v)}>
                       <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-bold">
                          <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="newest" className="font-bold text-xs"><div className="flex items-center gap-2"><Clock className="h-3 w-3" /> {t.filters.newest}</div></SelectItem>
                          <SelectItem value="name-asc" className="font-bold text-xs"><div className="flex items-center gap-2"><SortAsc className="h-3 w-3" /> {t.filters.nameAsc}</div></SelectItem>
                          <SelectItem value="name-desc" className="font-bold text-xs"><div className="flex items-center gap-2"><SortDesc className="h-3 w-3" /> {t.filters.nameDesc}</div></SelectItem>
                       </SelectContent>
                    </Select>
                 </div>

                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                       <CalendarDays className="h-3.5 w-3.5 text-secondary" /> {t.filters.from}
                    </Label>
                    <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="h-12 bg-slate-50 border-none rounded-xl font-bold text-xs uppercase" />
                 </div>

                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                       <CalendarDays className="h-3.5 w-3.5 text-secondary" /> {t.filters.to}
                    </Label>
                    <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="h-12 bg-slate-50 border-none rounded-xl font-bold text-xs uppercase" />
                 </div>
              </div>
            )}
         </div>
      </Card>

      {/* 2. Enhanced Registry Table */}
      <Card className="border-none shadow-premium rounded-3xl bg-white overflow-hidden border border-slate-100">
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse min-w-[1000px]">
               <thead>
                  <tr className="bg-slate-900 text-white border-b border-white/5">
                     <th 
                        className="px-8 py-6 text-start font-black uppercase text-[11px] tracking-[0.2em] border-r border-white/5 cursor-pointer hover:bg-slate-800 transition-colors group"
                        onClick={toggleNameSort}
                     >
                        <div className="flex items-center justify-between gap-2">
                           <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-secondary" />
                              {t.table.student}
                           </div>
                           <ArrowUpDown className={cn("h-3 w-3 transition-opacity", sortOrder.startsWith('name') ? "opacity-100" : "opacity-30 group-hover:opacity-100")} />
                        </div>
                     </th>
                     <th className="px-8 py-6 text-center font-black uppercase text-[11px] tracking-[0.2em] border-r border-white/5">
                        <div className="flex items-center justify-center gap-2">
                           <GraduationCap className="h-4 w-4 text-secondary" />
                           {t.table.level}
                        </div>
                     </th>
                     <th className="px-8 py-6 text-center font-black uppercase text-[11px] tracking-[0.2em] border-r border-white/5">
                        <div className="flex items-center justify-center gap-2">
                           <Briefcase className="h-4 w-4 text-secondary" />
                           {t.table.program}
                        </div>
                     </th>
                     <th className="px-8 py-6 text-center font-black uppercase text-[11px] tracking-[0.2em] border-r border-white/5">
                        {t.table.status}
                     </th>
                     <th className="px-8 py-6 text-center font-black uppercase text-[11px] tracking-[0.2em]">
                        <div className="flex items-center justify-center gap-2">
                           <Wallet className="h-4 w-4 text-secondary" />
                           {t.table.balance}
                        </div>
                     </th>
                     <th className="px-8 py-6 w-16 bg-slate-900"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    [1,2,3,4,5].map(i => <tr key={i} className="animate-pulse"><td colSpan={6} className="h-24 bg-slate-50/50" /></tr>)
                  ) : filteredAndSortedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-32 text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto shadow-inner">
                           <Users className="h-10 w-10 text-slate-100" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No students matching these criteria</p>
                           <p className="text-[10px] font-bold text-slate-300 uppercase italic">Try adjusting your filters or search term</p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredAndSortedStudents.map((student: any) => {
                    const balance = (student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0);
                    // Force English Numerals (en-US locale)
                    const balanceStr = balance.toLocaleString('en-US');
                    const profileImg = student.photoURL || (student.gender === 'Female' ? '/Female.png' : '/Male.png');
                    
                    return (
                      <tr 
                         key={student.id} 
                         className="hover:bg-slate-50/60 transition-all group cursor-pointer" 
                         onClick={() => window.location.href=`/${lang}/admin/students/${student.id}`}
                      >
                         <td className="px-8 py-6 border-r border-slate-50">
                            <div className="flex items-center gap-5">
                               <div className="h-16 w-16 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-50 shrink-0 relative group-hover:scale-110 transition-transform duration-700 ring-1 ring-slate-100">
                                  <Image 
                                    src={profileImg} 
                                    alt={student.firstName} 
                                    fill 
                                    className="object-cover"
                                    unoptimized
                                  />
                               </div>
                               <div className="min-w-0 space-y-1">
                                  <p className="text-base font-black text-slate-900 leading-tight uppercase truncate transition-colors group-hover:text-primary">{student.firstName} {student.lastName}</p>
                                  <div className="flex items-center gap-2">
                                     <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">REF:</span>
                                     <span className="text-[11px] font-black text-secondary font-mono tracking-tighter">{student.id?.toUpperCase()}</span>
                                  </div>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-center border-r border-slate-50">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 shadow-inner group-hover:bg-white transition-colors">
                               <span className="text-sm font-black text-primary font-mono tracking-tighter">Grade {student.gradeLevel}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-center border-r border-slate-50">
                            <Badge variant="outline" className="rounded-lg bg-secondary/5 border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 text-secondary shadow-sm">
                               {student.program || student.programOption || '-'}
                            </Badge>
                         </td>
                         <td className="px-8 py-6 text-center border-r border-slate-50">
                            <Badge className={cn(
                              "rounded-lg border-none font-black text-[9px] uppercase tracking-widest px-5 py-2 shadow-sm",
                              student.status === 'active' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                            )}>
                               {student.status || 'active'}
                            </Badge>
                         </td>
                         <td className="px-8 py-6 text-center">
                            <div className="inline-flex flex-col items-center gap-2">
                               <div className="flex items-center gap-2 text-primary">
                                  <span className="text-[10px] font-bold opacity-30">$</span>
                                  <span className="text-lg font-black tracking-tighter font-mono">{balanceStr}</span>
                                </div>
                                <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                  <div 
                                    className={cn(
                                       "h-full transition-all duration-1000",
                                       balance === 0 ? "bg-green-500" : "bg-secondary"
                                    )} 
                                    style={{ width: `${Math.min(100, ((student.financialLedger?.totalPaid || 0) / (student.financialLedger?.totalDue || 1)) * 100)}%` }} 
                                  />
                                </div>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-end">
                            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-200 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                               <ChevronRight className={cn("h-6 w-6", isAr && "rotate-180")} />
                            </div>
                         </td>
                      </tr>
                    );
                  })}
               </tbody>
            </table>
         </div>
      </Card>

      {/* 3. Footer Stats / Data Matrix Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
         <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center"><FileSpreadsheet className="h-4 w-4 text-slate-300" /></div>
            <span>{isAr ? 'إجمالي السجلات المفلترة:' : 'Total Filtered Records:'} {filteredAndSortedStudents.length}</span>
         </div>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
               {isAr ? 'فرز ذكي نشط' : 'Smart Sorting Active'}
            </div>
            <div className="flex items-center gap-2">
               <CreditCard className="h-3 w-3 text-secondary" />
               {isAr ? 'المبالغ بالأرقام الإنجليزية' : 'English Numeral Formatting'}
            </div>
         </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 10px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
          border: 2px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
