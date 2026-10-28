
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  ClipboardCheck, Search, Filter, Download,
  ChevronRight, ArrowUpDown, Star, BookOpen,
  GraduationCap, User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function GradeBookPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');

  const studentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'students'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: students, loading } = useCollection(studentsQuery);

  const filteredData = useMemo(() => {
    if (!students) return [];
    return students.filter(s => 
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'سجل الدرجات' : 'Grade Book'}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'رصد ومتابعة التقييمات الأكاديمية' : 'Academic Assessment & Grading Matrix'}</p>
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
         <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-secondary transition-colors" />
            <Input 
               placeholder={isAr ? 'البحث عن طالب...' : 'Search for a student...'} 
               className="pl-12 h-14 rounded-xl bg-slate-50 border-none font-bold"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <Button variant="outline" className="h-14 rounded-xl border-slate-100 font-black text-[10px] px-8 uppercase gap-2 hover:bg-slate-50">
            <Filter className="h-4 w-4" /> {isAr ? 'فلترة' : 'Filters'}
         </Button>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                     <th className="px-10 py-6 text-left w-1/3">Student Details</th>
                     <th className="px-10 py-6 text-center">Current Progress</th>
                     <th className="px-10 py-6 text-center">GPA / Average</th>
                     <th className="px-10 py-6 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={4} className="h-20 bg-slate-50/50" /></tr>)
                  ) : filteredData.map((s: any) => (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-all group">
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                             <div className="h-11 w-11 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg">
                                {s.firstName?.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 uppercase">{s.firstName} {s.lastName}</p>
                                <p className="text-[10px] font-bold text-slate-400">Grade {s.gradeLevel}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-6 text-center">
                          <div className="flex flex-col items-center gap-2">
                             <span className="font-black text-xs text-primary">{s.academicPlan?.progress || 0}%</span>
                             <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary" style={{ width: `${s.academicPlan?.progress || 0}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-6 text-center font-black text-slate-900">
                          -
                       </td>
                       <td className="px-10 py-6 text-right">
                          <Button size="sm" variant="ghost" className="h-10 w-10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                             <ChevronRight className={cn("h-5 w-5", isAr && "rotate-180")} />
                          </Button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
}
