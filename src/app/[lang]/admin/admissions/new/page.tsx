
'use client';

import { use, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { UserPlus, ChevronRight, Calendar, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import Link from 'next/link';

export default function NewAdmissionsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();

  // Query all ordered by time, filter status in memory to avoid Index requirements
  const allAppsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'enrollments'),
      orderBy('updatedAt', 'desc')
    );
  }, [firestore]);

  const { data: allApps, loading } = useCollection(allAppsQuery);

  const newApps = useMemo(() => {
    return allApps.filter((app: any) => app.status === 'submitted');
  }, [allApps]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{isAr ? 'الطلبات الجديدة' : 'New Admissions'}</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'طلبات بانتظار المراجعة الأولى' : 'Fresh Submissions Awaiting Initial Review'}</p>
         </div>
         <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <Input placeholder={isAr ? 'بحث...' : 'Search new...'} className="pl-12 h-12 rounded-xl bg-white border-slate-100" />
         </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
           {[1,2,3].map(i => <div key={i} className="h-48 bg-white rounded-3xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {newApps.map((app: any) => (
             <Card key={app.id} className="border-none shadow-premium rounded-xl bg-white overflow-hidden group hover:shadow-2xl transition-all">
                <CardContent className="p-8 space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center font-black text-xl">
                         {app.parent1Name?.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <h3 className="font-black text-primary truncate">{app.parent1Name}</h3>
                         <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
                            <Calendar className="h-3 w-3" /> {app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, HH:mm') : '-'}
                         </div>
                      </div>
                   </div>
                   <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <Badge variant="outline" className="bg-slate-50 text-slate-400 border-none font-black text-[9px] uppercase">{app.programOption}</Badge>
                      <Button asChild size="sm" className="rounded-xl bg-primary text-white font-black h-10 px-4 group-hover:bg-secondary transition-colors">
                         <Link href={`/${lang}/admin/enrollments/${app.id}`}>
                            {isAr ? 'مراجعة' : 'Review'} <ChevronRight className="h-4 w-4 ml-1" />
                         </Link>
                      </Button>
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>
      )}
      
      {!loading && newApps.length === 0 && (
        <div className="py-32 text-center bg-white rounded-xl border-2 border-dashed border-slate-100">
           <UserPlus className="h-16 w-16 text-slate-100 mx-auto mb-4" />
           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{isAr ? 'لا توجد طلبات جديدة حالياً' : 'No new applications at this moment'}</p>
        </div>
      )}
    </div>
  );
}
