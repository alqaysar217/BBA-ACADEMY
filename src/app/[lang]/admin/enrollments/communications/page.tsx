
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { 
  MessageSquare, 
  Search, 
  Mail, 
  Clock, 
  User, 
  ChevronRight,
  ExternalLink,
  History,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ParentCommunicationsHub({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch enrollments that have communications
  const commsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'enrollments'),
      orderBy('lastCommunicationAt', 'desc')
    );
  }, [firestore]);

  const { data: enrollments, loading } = useCollection(commsQuery);

  const history = useMemo(() => {
    if (!enrollments) return [];
    // Flatten and sort all communication logs across all apps
    const allLogs: any[] = [];
    enrollments.forEach(app => {
      if (app.communications && Array.isArray(app.communications)) {
        app.communications.forEach(log => {
          allLogs.push({
            ...log,
            appId: app.id,
            parentName: app.parent1Name,
            parentEmail: app.parent1Email
          });
        });
      }
    });
    return allLogs.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
  }, [enrollments]);

  const filteredHistory = useMemo(() => {
    return history.filter(log => 
      log.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.parentEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [history, searchTerm]);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <MessageSquare className="h-8 w-8 text-secondary" />
               {isAr ? 'مراسلات أولياء الأمور' : 'Parent Communications'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'إدارة وسجل كافة المراسلات الرسمية' : 'Unified log of official academy correspondence'}</p>
         </div>
         <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <Input 
               placeholder={isAr ? 'بحث في السجلات...' : 'Search logs...'} 
               className="pl-12 h-12 rounded-xl bg-white border-slate-100 font-bold"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-premium rounded-xl bg-primary text-white p-8 space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Send className="h-24 w-24" /></div>
               <div className="space-y-1 relative z-10">
                  <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Total Sent</p>
                  <h3 className="text-4xl font-black">{history.length} Logs</h3>
               </div>
               <p className="text-xs font-medium text-white/50 relative z-10 leading-relaxed italic">All messages are officially recorded for compliance and tracking.</p>
            </Card>

            <Card className="border-none shadow-sm rounded-xl bg-white p-6 space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-3">{isAr ? 'إحصائيات المراسلة' : 'Delivery Metrics'}</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-slate-500">Delivered</span>
                     <Badge className="bg-green-100 text-green-600 border-none font-black text-[10px]">100%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-slate-500">Read Rate</span>
                     <Badge className="bg-blue-100 text-blue-600 border-none font-black text-[10px]">85%</Badge>
                  </div>
               </div>
            </Card>
         </div>

         <div className="lg:col-span-3">
            <Card className="border-none shadow-premium rounded-xl bg-white overflow-hidden border border-slate-100">
               <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center"><History className="h-5 w-5" /></div>
                     <CardTitle className="text-sm font-black text-primary uppercase">{isAr ? 'سجل المراسلات الأخير' : 'Recent Comms History'}</CardTitle>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                     {loading ? (
                        [1,2,3].map(i => <div key={i} className="h-20 bg-white animate-pulse" />)
                     ) : filteredHistory.length === 0 ? (
                        <div className="py-24 text-center space-y-4">
                           <AlertCircle className="h-12 w-12 text-slate-100 mx-auto" />
                           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No correspondence records found</p>
                        </div>
                     ) : filteredHistory.map((log, idx) => (
                        <div key={idx} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                           <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0"><Mail className="h-5 w-5" /></div>
                              <div className="space-y-1">
                                 <p className="text-sm font-black text-primary line-clamp-1">{log.subject}</p>
                                 <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-[10px] font-bold text-secondary uppercase bg-secondary/5 px-2 py-0.5 rounded-full">{log.templateId}</span>
                                    <span className="text-[10px] font-bold text-slate-400">To: {log.parentName}</span>
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {format(new Date(log.sentAt), 'MMM dd, HH:mm')}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 self-end md:self-center">
                              <Badge className="bg-green-100 text-green-600 border-none font-black text-[8px] px-3 rounded-md flex items-center gap-1.5">
                                 <CheckCircle2 className="h-3 w-3" /> SENT
                              </Badge>
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm" onClick={() => router.push(`/${lang}/admin/enrollments/${log.appId}`)}>
                                 <ChevronRight className={cn("h-5 w-5 text-slate-300", isAr && "rotate-180")} />
                              </Button>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
