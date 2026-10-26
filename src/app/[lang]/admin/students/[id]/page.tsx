
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
  Briefcase, ShieldCheck, Mail, Phone, MapPin, Layers
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

  if (loading) return <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase">Loading Student 360...</div>;
  if (!student) return <div className="p-20 text-center font-black text-red-500 uppercase">Student Profile Not Found</div>;

  const handleRecordPayment = async () => {
    // Logic for manual payment record
    toast({ title: isAr ? "قريباً" : "Feature Coming Soon", description: "Payment logging interface is under development." });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Profile */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-premium flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
         <div className="flex items-center gap-8">
            <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary transition-all flex items-center justify-center">
              {isAr ? <ChevronRight /> : <ChevronLeft />}
            </button>
            <div className="h-24 w-24 rounded-[2rem] bg-primary text-secondary flex items-center justify-center text-4xl font-black shadow-2xl">
               {student.firstName?.charAt(0)}
            </div>
            <div className="space-y-1 text-center md:text-start">
               <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{student.firstName} {student.lastName}</h1>
                  <Badge className="bg-green-100 text-green-600 rounded-lg uppercase text-[9px] font-black">{student.status}</Badge>
               </div>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center md:justify-start gap-2">
                  <GraduationCap className="h-3 w-3" /> Grade {student.gradeLevel} • {student.programOption}
               </p>
            </div>
         </div>
         
         <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-14 rounded-2xl px-8 font-black gap-2 border-slate-200">
               <FileText className="h-4 w-4" /> {isAr ? 'تعديل الملف' : 'Edit Profile'}
            </Button>
            <Button onClick={handleRecordPayment} className="flex-1 md:flex-none h-14 rounded-2xl bg-secondary text-white px-8 font-black gap-2 shadow-xl shadow-secondary/20">
               <DollarSign className="h-4 w-4" /> {isAr ? 'تسجيل دفعة' : 'Record Payment'}
            </Button>
         </div>
      </div>

      {/* 2. Main Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
         <TabsList className="bg-white p-2 rounded-2xl h-16 shadow-sm border border-slate-100 inline-flex">
            <TabsTrigger value="overview" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all px-8 h-full gap-2">
               <ShieldCheck className="h-3.5 w-3.5" /> {isAr ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="academic" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all px-8 h-full gap-2">
               <BookOpen className="h-3.5 w-3.5" /> {isAr ? 'الخطة الدراسية' : 'Academic Plan'}
            </TabsTrigger>
            <TabsTrigger value="financial" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all px-8 h-full gap-2">
               <CreditCard className="h-3.5 w-3.5" /> {isAr ? 'السجل المالي' : 'Financials'}
            </TabsTrigger>
            <TabsTrigger value="docs" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all px-8 h-full gap-2">
               <FileText className="h-3.5 w-3.5" /> {isAr ? 'المستندات' : 'Documents'}
            </TabsTrigger>
         </TabsList>

         <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Contact Card */}
               <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10 space-y-8">
                  <div className="space-y-6">
                     <h3 className="font-black text-primary uppercase text-sm border-b pb-4 flex items-center gap-3">
                        <Users className="h-5 w-5 text-secondary" /> {isAr ? 'بيانات التواصل' : 'Contact Info'}
                     </h3>
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Mail className="h-4 w-4" /></div>
                           <div><p className="text-[10px] font-black text-slate-400 uppercase">Email</p><p className="font-bold text-slate-700">{student.email}</p></div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Phone className="h-4 w-4" /></div>
                           <div><p className="text-[10px] font-black text-slate-400 uppercase">Phone</p><p className="font-bold text-slate-700" dir="ltr">{student.phone}</p></div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><MapPin className="h-4 w-4" /></div>
                           <div><p className="text-[10px] font-black text-slate-400 uppercase">Location</p><p className="font-bold text-slate-700">{student.address?.city}, {student.address?.state}</p></div>
                        </div>
                     </div>
                  </div>
               </Card>

               {/* Quick Stats */}
               <Card className="md:col-span-2 border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white p-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <div className="h-14 w-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center"><BookOpen className="h-7 w-7" /></div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Academic Progress</p>
                        <h4 className="text-4xl font-black">{student.academicPlan?.progress || 0}%</h4>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                           <div className="h-full bg-secondary" style={{ width: `${student.academicPlan?.progress}%` }} />
                        </div>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div className="h-14 w-14 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center"><DollarSign className="h-7 w-7" /></div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Outstanding Balance</p>
                        <h4 className="text-4xl font-black">${(student.financialLedger?.totalDue - student.financialLedger?.totalPaid).toLocaleString()}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Due Date: Net 30</p>
                     </div>
                  </div>
               </Card>
            </div>
         </TabsContent>

         <TabsContent value="academic">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                  <div>
                     <CardTitle className="text-xl font-black uppercase">{isAr ? 'الخطة الدراسية والمواد' : 'Course Enrollment & Plan'}</CardTitle>
                     <CardDescription className="font-bold">{isAr ? 'تتبع المواد المخصصة والتقدم في منصة Edgenuity' : 'Track individual course progress and mastery'}</CardDescription>
                  </div>
                  <Button variant="outline" className="rounded-xl font-black gap-2"><Plus className="h-4 w-4" /> Add Course</Button>
               </CardHeader>
               <Table>
                  <TableHeader className="bg-slate-50">
                     <TableRow>
                        <TableHead className="px-10 py-5 font-black uppercase text-[10px]">Subject</TableHead>
                        <TableHead className="font-black uppercase text-[10px]">Status</TableHead>
                        <TableHead className="font-black uppercase text-[10px]">Progress</TableHead>
                        <TableHead className="font-black uppercase text-[10px] text-right pr-10">Final Grade</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     <TableRow className="border-slate-50">
                        <TableCell className="px-10 py-6 font-bold text-primary">English Language Arts</TableCell>
                        <TableCell><Badge className="bg-blue-100 text-blue-600 rounded-lg uppercase text-[8px] font-black">In Progress</Badge></TableCell>
                        <TableCell>
                           <div className="flex items-center gap-3">
                              <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-secondary w-[65%]" /></div>
                              <span className="text-xs font-black text-slate-400">65%</span>
                           </div>
                        </TableCell>
                        <TableCell className="text-right pr-10 font-black text-slate-300">Pending</TableCell>
                     </TableRow>
                     <TableRow className="border-none">
                        <TableCell className="px-10 py-6 font-bold text-primary">Pre-Algebra</TableCell>
                        <TableCell><Badge className="bg-green-100 text-green-600 rounded-lg uppercase text-[8px] font-black">Completed</Badge></TableCell>
                        <TableCell>
                           <div className="flex items-center gap-3">
                              <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[100%]" /></div>
                              <span className="text-xs font-black text-green-500">100%</span>
                           </div>
                        </TableCell>
                        <TableCell className="text-right pr-10 font-black text-secondary">A-</TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </Card>
         </TabsContent>

         <TabsContent value="financial">
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-100">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Contract Value</p>
                     <h5 className="text-3xl font-black text-primary">${student.financialLedger?.totalDue.toLocaleString()}</h5>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-100">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Paid to Date</p>
                     <h5 className="text-3xl font-black text-green-500">${student.financialLedger?.totalPaid.toLocaleString()}</h5>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-100">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Next Payment Installment</p>
                     <h5 className="text-3xl font-black text-secondary">$150.00</h5>
                  </div>
               </div>

               <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
                  <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
                     <CardTitle className="text-xl font-black uppercase">{isAr ? 'سجل المدفوعات' : 'Payment Ledger'}</CardTitle>
                  </CardHeader>
                  <Table>
                     <TableHeader className="bg-slate-50">
                        <TableRow>
                           <TableHead className="px-10 py-5 font-black uppercase text-[10px]">Date</TableHead>
                           <TableHead className="font-black uppercase text-[10px]">Reference (Square/Cash)</TableHead>
                           <TableHead className="font-black uppercase text-[10px]">Amount</TableHead>
                           <TableHead className="font-black uppercase text-[10px] text-right pr-10">Status</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow className="border-none">
                           <TableCell colSpan={4} className="py-20 text-center text-slate-300 font-bold uppercase text-xs">No transaction history found for this student.</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </Card>
            </div>
         </TabsContent>

         <TabsContent value="docs">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10">
               <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
                  <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200"><FileText className="h-10 w-10" /></div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-black uppercase">{isAr ? 'طلب سجل دراسي' : 'Academic Records Request'}</h3>
                     <p className="text-slate-400 font-medium max-w-sm">Initiate a formal request to the student's previous school to retrieve official transcripts.</p>
                  </div>
                  <Button className="rounded-xl h-14 px-10 bg-primary font-black uppercase text-xs tracking-widest">Start Formal Request</Button>
               </div>
            </Card>
         </TabsContent>
      </Tabs>
    </div>
  );
}
