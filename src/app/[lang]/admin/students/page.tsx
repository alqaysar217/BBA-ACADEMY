
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, Users, GraduationCap, MapPin, 
  ChevronRight, MoreVertical, Filter, Download,
  UserCheck, CreditCard, BookOpen
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function StudentsRegistryPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');

  const studentsQuery = useMemo(() => {
    if (!firestore) return null;
    // In a real scenario, this fetches from the 'students' collection populated after approval
    return query(collection(firestore, 'enrollments'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: enrollments, loading } = useCollection(studentsQuery);

  const students = useMemo(() => {
    if (!enrollments) return [];
    // Flattening students from enrollments for this view
    return enrollments.flatMap(e => (e.students || []).map((s: any) => ({
      ...s,
      parentName: e.parent1Name,
      program: e.programOption,
      status: e.status,
      enrollmentId: e.id,
      city: e.address?.city,
      state: e.address?.state
    })));
  }, [enrollments]);

  const filteredStudents = students.filter(s => 
    s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.parentName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <div className="bg-white p-6 rounded-[2rem] shadow-premium flex flex-col lg:flex-row justify-between items-center gap-6">
         <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
               placeholder={isAr ? 'بحث عن طالب، ولي أمر...' : 'Search student or parent...'} 
               className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex gap-3 w-full lg:w-auto">
            <Button variant="outline" className="h-14 rounded-2xl px-6 border-slate-200 font-black gap-2">
               <Filter className="h-4 w-4" /> {isAr ? 'فلترة متقدمة' : 'Filters'}
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl px-6 border-slate-200 font-black gap-2">
               <Download className="h-4 w-4" /> {isAr ? 'تصدير للبيانات' : 'Export List'}
            </Button>
         </div>
      </div>

      {/* Registry Table */}
      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                     <th className="px-10 py-6 text-left">{isAr ? 'اسم الطالب' : 'Student Name'}</th>
                     <th className="px-10 py-6 text-left">{isAr ? 'المستوى الدراسي' : 'Level'}</th>
                     <th className="px-10 py-6 text-left">{isAr ? 'البرنامج' : 'Program'}</th>
                     <th className="px-10 py-6 text-left">{isAr ? 'الموقع' : 'Location'}</th>
                     <th className="px-10 py-6 text-left">{isAr ? 'الحالة المالية' : 'Financials'}</th>
                     <th className="px-10 py-6 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => window.location.href=`/${lang}/admin/students/${student.enrollmentId}`}>
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                             <div className="h-12 w-12 rounded-2xl bg-slate-900 text-secondary flex items-center justify-center font-black">
                                {student.firstName?.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900">{student.firstName} {student.lastName}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{student.parentName}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-6">
                          <Badge variant="outline" className="rounded-lg bg-slate-50 border-none font-black text-[10px]">
                             Grade {student.lastGrade}
                          </Badge>
                       </td>
                       <td className="px-10 py-6">
                          <p className="text-xs font-bold text-slate-600 uppercase">{student.program}</p>
                       </td>
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-2 text-slate-400">
                             <MapPin className="h-3 w-3" />
                             <span className="text-xs font-bold">{student.city}, {student.state}</span>
                          </div>
                       </td>
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-3">
                             <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[80%]" />
                             </div>
                             <span className="text-[10px] font-black text-slate-400">80%</span>
                          </div>
                       </td>
                       <td className="px-10 py-6 text-right">
                          <Button size="sm" variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-white hover:shadow-md">
                             <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-secondary transition-colors" />
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
