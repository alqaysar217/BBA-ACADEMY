
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  UserCheck, 
  Search, 
  UserPlus, 
  BadgeCheck, 
  GraduationCap, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function AcceptedStudentsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');

  // We query enrollments and then filter for accepted students in code
  const enrollmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: enrollments, loading } = useCollection(enrollmentsQuery);

  const acceptedList = useMemo(() => {
    if (!enrollments) return [];
    const list: any[] = [];
    enrollments.forEach(app => {
      if (app.students && Array.isArray(app.students)) {
        app.students.forEach((st, idx) => {
          if (st.status === 'Accepted' || st.isEnrolled) {
            list.push({
              ...st,
              appId: app.id,
              parentName: app.parent1Name,
              programOption: app.programOption,
              paymentTier: app.paymentTier,
              appRef: `${app.id}-${idx}`
            });
          }
        });
      }
    });
    return list;
  }, [enrollments]);

  const filteredList = useMemo(() => {
    return acceptedList.filter(st => 
      st.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.appId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [acceptedList, searchTerm]);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <UserCheck className="h-8 w-8 text-secondary" />
               {isAr ? 'الطلاب المقبولون' : 'Accepted Students'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'متابعة الطلاب الناجحين في القبول وبدء التسجيل' : 'Monitor approved candidates and manage student file onboarding'}</p>
         </div>
         <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <Input 
               placeholder={isAr ? 'بحث في المقبولين...' : 'Search accepted students...'} 
               className="pl-12 h-12 rounded-xl bg-white border-slate-100 font-bold"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm rounded-xl bg-white p-6 border border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="h-6 w-6" /></div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase">Ready for Onboarding</p>
               <h3 className="text-xl font-black text-primary">{acceptedList.filter(s => !s.isEnrolled).length} Students</h3>
            </div>
         </Card>
      </div>

      <Card className="border-none shadow-premium rounded-xl bg-white overflow-hidden border border-slate-100">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                     <th className="px-8 py-5 text-left">{isAr ? 'الطالب والبرنامج' : 'Student & Program'}</th>
                     <th className="px-8 py-5 text-center">{isAr ? 'ولي الأمر' : 'Parent'}</th>
                     <th className="px-8 py-5 text-center">{isAr ? 'الحالة' : 'Profile Status'}</th>
                     <th className="px-8 py-5 text-right pr-8"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {loading ? (
                     [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={4} className="h-20 bg-slate-50/50" /></tr>)
                  ) : filteredList.length === 0 ? (
                     <tr><td colSpan={4} className="py-24 text-center text-slate-300 font-black uppercase text-[10px] tracking-widest">No accepted candidates found</td></tr>
                  ) : filteredList.map((st, idx) => (
                     <tr key={idx} className="hover:bg-slate-50/40 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-black text-lg">
                                 {st.firstName?.charAt(0)}
                              </div>
                              <div className="space-y-0.5">
                                 <p className="text-sm font-black text-primary">{st.firstName} {st.lastName}</p>
                                 <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-[8px] font-black uppercase bg-secondary/5 text-secondary border-none">{st.programOption}</Badge>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Grade {st.lastGrade}</span>
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                           <p className="text-xs font-bold text-slate-600">{st.parentName}</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase">Ref: {st.appId}</p>
                        </td>
                        <td className="px-8 py-6 text-center">
                           {st.isEnrolled ? (
                              <Badge className="bg-green-100 text-green-600 border-none font-black text-[8px] px-3 py-1 rounded-md flex items-center gap-1.5 w-fit mx-auto">
                                 <BadgeCheck className="h-3 w-3" /> ENROLLED
                              </Badge>
                           ) : (
                              <Badge className="bg-amber-50 text-amber-600 border-none font-black text-[8px] px-3 py-1 rounded-md flex items-center gap-1.5 w-fit mx-auto">
                                 <Clock className="h-3 w-3" /> PENDING FILE
                              </Badge>
                           )}
                        </td>
                        <td className="px-8 py-6 text-right pr-8">
                           <Button size="sm" variant="ghost" className="h-10 px-4 rounded-lg font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-primary hover:text-white transition-all" onClick={() => router.push(`/${lang}/admin/enrollments/${st.appId}`)}>
                              Review & Finalize <ChevronRight className={cn("h-4 w-4", isAr && "rotate-180")} />
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
