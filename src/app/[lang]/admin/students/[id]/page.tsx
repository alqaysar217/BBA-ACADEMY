
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc, useUser } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { 
  User, GraduationCap, CreditCard, FileText, 
  ChevronLeft, ChevronRight, Clock, BookOpen, 
  Plus, CheckCircle2, AlertCircle, DollarSign,
  Briefcase, ShieldCheck, Mail, Phone, MapPin, Layers,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function StudentDetailPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  const studentRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'students', id);
  }, [firestore, id]);

  const { data: student, loading } = useDoc(studentRef);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">Loading Profile...</p>
      </div>
    </div>
  );

  if (!student) return <div className="p-20 text-center font-black text-red-500 uppercase">Student Not Found</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
         <div className="flex items-center gap-5">
            <button onClick={() => router.back()} className="h-10 w-10 rounded-lg bg-slate-50 text-slate-400 hover:text-primary transition-all flex items-center justify-center border border-slate-100">
              {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
            <div className="h-16 w-16 rounded-xl bg-primary text-secondary flex items-center justify-center text-2xl font-black shadow-lg">
               {student.firstName?.charAt(0)}
            </div>
            <div className="space-y-1">
               <div className="flex items-center gap-3">
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">{student.firstName} {student.lastName}</h1>
                  <Badge className="bg-green-100 text-green-600 rounded-md uppercase text-[8px] font-black border-none px-2">{student.status}</Badge>
               </div>
               <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest flex items-center gap-2">
                  <GraduationCap className="h-3 w-3 text-secondary" /> Grade {student.gradeLevel} • {student.programOption}
               </p>
            </div>
         </div>
         
         <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-10 rounded-lg px-4 font-black gap-2 border-slate-200 text-[10px] uppercase tracking-widest">
               <FileText className="h-4 w-4" /> Edit
            </Button>
            <Button className="flex-1 md:flex-none h-10 rounded-lg bg-secondary text-white px-4 font-black gap-2 shadow-md text-[10px] uppercase tracking-widest">
               <DollarSign className="h-4 w-4" /> Payment
            </Button>
         </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
         <TabsList className="bg-white p-1 rounded-lg h-12 shadow-sm border border-slate-100 inline-flex">
            <TabsTrigger value="overview" className="rounded-md font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 h-full">Overview</TabsTrigger>
            <TabsTrigger value="academic" className="rounded-md font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 h-full">Academic</TabsTrigger>
            <TabsTrigger value="financial" className="rounded-md font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-5 h-full">Finances</TabsTrigger>
         </TabsList>

         <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card className="border-none shadow-sm rounded-xl bg-white p-6 space-y-6 border border-slate-100">
                  <h3 className="font-black text-primary uppercase text-[10px] border-b pb-3 flex items-center gap-2">
                     <Users className="h-4 w-4 text-secondary" /> Contact Info
                  </h3>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><Mail className="h-3.5 w-3.5" /></div>
                        <div><p className="text-[8px] font-black text-slate-400 uppercase">Email</p><p className="font-bold text-slate-700 text-xs">{student.email}</p></div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><Phone className="h-3.5 w-3.5" /></div>
                        <div><p className="text-[8px] font-black text-slate-400 uppercase">Phone</p><p className="font-bold text-slate-700 text-xs" dir="ltr">{student.phone}</p></div>
                     </div>
                  </div>
               </Card>

               <Card className="md:col-span-2 border-none shadow-sm rounded-xl bg-slate-900 text-white p-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <p className="text-[8px] font-black uppercase text-white/40">Academic Progress</p>
                     <h4 className="text-3xl font-black">{student.academicPlan?.progress || 0}%</h4>
                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary" style={{ width: `${student.academicPlan?.progress || 0}%` }} />
                     </div>
                  </div>
                  <div className="space-y-4 border-l border-white/5 pl-8">
                     <p className="text-[8px] font-black uppercase text-white/40">Balance</p>
                     <h4 className="text-3xl font-black">${((student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0)).toLocaleString()}</h4>
                  </div>
               </Card>
            </div>
         </TabsContent>
      </Tabs>
    </div>
  );
}
