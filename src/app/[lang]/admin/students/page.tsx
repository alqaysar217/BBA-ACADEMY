
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, Users, GraduationCap, MapPin, 
  ChevronRight, Filter, Download,
  CreditCard, BookOpen, User, Wallet
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function StudentsRegistryPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');

  const studentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'students'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: students, loading } = useCollection(studentsQuery);

  const filteredStudents = useMemo(() => {
    if (!students) return [];
    return students.filter(s => 
      s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.parent1Name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const t = {
    title: isAr ? 'سجل الطلاب النشطين' : 'Active Student Roster',
    searchPlaceholder: isAr ? 'بحث عن طالب، ولي أمر، أو رقم المعرف...' : 'Search student, parent, or ID...',
    table: {
      student: isAr ? 'هوية الطالب' : 'Student Identity',
      level: isAr ? 'المستوى' : 'Level',
      program: isAr ? 'البرنامج' : 'Program',
      status: isAr ? 'الحالة' : 'Status',
      balance: isAr ? 'الرصيد' : 'Balance'
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Toolbar */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6">
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
            <Button variant="outline" className="h-14 flex-1 lg:flex-none rounded-xl px-6 border-slate-200 font-black gap-2 hover:bg-slate-50 uppercase text-[10px] tracking-widest">
               <Filter className="h-4 w-4 text-secondary" /> {isAr ? 'فلترة' : 'Filters'}
            </Button>
            <Button variant="outline" className="h-14 flex-1 lg:flex-none rounded-xl px-6 border-slate-200 font-black gap-2 hover:bg-slate-50 uppercase text-[10px] tracking-widest">
               <Download className="h-4 w-4 text-secondary" /> {isAr ? 'تصدير' : 'Export'}
            </Button>
         </div>
      </div>

      {/* Registry Table */}
      <Card className="border-none shadow-premium rounded-3xl bg-white overflow-hidden border border-slate-100">
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse min-w-[900px]">
               <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                     <th className="px-10 py-6 text-start">{t.table.student}</th>
                     <th className="px-10 py-6 text-center">{t.table.level}</th>
                     <th className="px-10 py-6 text-center">{t.table.program}</th>
                     <th className="px-10 py-6 text-center">{t.table.status}</th>
                     <th className="px-10 py-6 text-center">{t.table.balance}</th>
                     <th className="px-10 py-6 text-end"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    [1,2,3,4,5].map(i => <tr key={i} className="animate-pulse"><td colSpan={6} className="h-24 bg-slate-50/50" /></tr>)
                  ) : filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-32 text-center space-y-4">
                        <Users className="h-16 w-16 text-slate-100 mx-auto" />
                        <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{isAr ? 'لا يوجد طلاب مطابقين للبحث' : 'No students matching your search'}</p>
                      </td>
                    </tr>
                  ) : filteredStudents.map((student: any) => {
                    const balance = (student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0);
                    // Force English Numerals for balance and IDs
                    const balanceStr = balance.toLocaleString('en-US');
                    const profileImg = student.photoURL || (student.gender === 'Female' ? '/Female.png' : '/Male.png');
                    
                    return (
                      <tr key={student.id} className="hover:bg-slate-50/60 transition-all group cursor-pointer" onClick={() => window.location.href=`/${lang}/admin/students/${student.id}`}>
                         <td className="px-10 py-6">
                            <div className="flex items-center gap-5">
                               <div className="h-14 w-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-slate-100 shrink-0 relative group-hover:scale-105 transition-transform duration-500">
                                  <Image 
                                    src={profileImg} 
                                    alt={student.firstName} 
                                    fill 
                                    className="object-cover"
                                    unoptimized
                                  />
                               </div>
                               <div className="min-w-0">
                                  <p className="text-base font-black text-slate-900 leading-tight uppercase truncate">{student.firstName} {student.lastName}</p>
                                  <p className="text-[10px] font-bold text-slate-400 font-mono tracking-widest mt-1">ID: {student.id?.toUpperCase()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-6 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-lg border border-primary/10">
                               <GraduationCap className="h-3 w-3 text-secondary" />
                               <span className="text-xs font-black text-primary uppercase">Grade {student.gradeLevel}</span>
                            </div>
                         </td>
                         <td className="px-10 py-6 text-center">
                            <Badge variant="outline" className="rounded-lg bg-secondary/5 border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 text-secondary">
                               {student.program || student.programOption || '-'}
                            </Badge>
                         </td>
                         <td className="px-10 py-6 text-center">
                            <Badge className={cn(
                              "rounded-lg border-none font-black text-[9px] uppercase tracking-widest px-4 py-1.5 shadow-sm",
                              student.status === 'active' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                            )}>
                               {student.status || 'active'}
                            </Badge>
                         </td>
                         <td className="px-10 py-6 text-center">
                            <div className="inline-flex flex-col items-center gap-1">
                               <div className="flex items-center gap-1.5 text-primary">
                                  <Wallet className="h-3 w-3 opacity-30" />
                                  <span className="text-sm font-black tracking-tight">${balanceStr}</span>
                                </div>
                                <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-secondary transition-all duration-1000" 
                                    style={{ width: `${Math.min(100, ((student.financialLedger?.totalPaid || 0) / (student.financialLedger?.totalDue || 1)) * 100)}%` }} 
                                  />
                                </div>
                            </div>
                         </td>
                         <td className="px-10 py-6 text-end">
                            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                               <ChevronRight className={cn("h-5 w-5 text-slate-300 group-hover:text-white", isAr && "rotate-180")} />
                            </Button>
                         </td>
                      </tr>
                    );
                  })}
               </tbody>
            </table>
         </div>
      </Card>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

