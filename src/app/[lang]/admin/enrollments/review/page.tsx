
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { 
  Search, 
  ChevronRight, 
  Clock, 
  AlertCircle,
  FileSearch,
  Users,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ApplicationReviewPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');

  const reviewQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'enrollments'), 
      where('status', 'in', ['submitted', 'reviewed']),
      orderBy('updatedAt', 'desc')
    );
  }, [firestore]);

  const { data: apps, loading } = useCollection(reviewQuery);

  const filteredApps = useMemo(() => {
    if (!apps) return [];
    return apps.filter(app => 
      app.parent1Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [apps, searchTerm]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <FileSearch className="h-8 w-8 text-secondary" />
               {isAr ? 'مراجعة الطلبات' : 'Application Review'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'طلبات بانتظار المراجعة والقرار' : 'Queue of applications awaiting review and decision'}</p>
         </div>
         <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 transition-colors group-focus-within:text-secondary" />
            <Input 
               placeholder={isAr ? 'بحث في قائمة المراجعة...' : 'Search review queue...'} 
               className="pl-12 h-12 rounded-xl bg-white border-slate-100 font-bold"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm rounded-xl bg-white p-6 border border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary"><Clock className="h-6 w-6" /></div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase">Pending</p>
               <h3 className="text-xl font-black text-primary">{apps?.length || 0} Apps</h3>
            </div>
         </Card>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4">
           {[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-slate-50 animate-pulse" />)}
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="py-32 text-center bg-white rounded-xl border-2 border-dashed border-slate-100 space-y-4">
           <AlertCircle className="h-16 w-16 text-slate-100 mx-auto" />
           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{isAr ? 'قائمة المراجعة فارغة حالياً' : 'Review queue is empty at the moment'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
           {filteredApps.map((app: any) => (
             <Card key={app.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-xl bg-white overflow-hidden border border-slate-100 group cursor-pointer" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}>
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="h-14 w-14 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-xl shadow-primary/10">
                         {app.parent1Name?.charAt(0)}
                      </div>
                      <div className="space-y-0.5">
                         <h3 className="font-black text-primary text-lg">{app.parent1Name}</h3>
                         <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            <Calendar className="h-3 w-3 text-secondary" /> {app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, HH:mm') : '-'}
                            <span className="h-1 w-1 rounded-full bg-slate-200" />
                            <Users className="h-3 w-3 text-secondary" /> {app.students?.length} Registered
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                      <Badge variant="outline" className={cn(
                        "text-[9px] font-black uppercase rounded-lg px-4 py-1.5 border-none",
                        app.status === 'submitted' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                      )}>
                         {app.status === 'submitted' ? 'New Submission' : 'Under Review'}
                      </Badge>
                      <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                         <ChevronRight className={cn("h-5 w-5 text-slate-300 group-hover:text-white", isAr && "rotate-180")} />
                      </Button>
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>
      )}
    </div>
  );
}
