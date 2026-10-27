
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
        <p className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">Loading Student 360...</p>
      </div>
    </div>
  );

  if (!student) return <div className="p-20 text-center font-black text-red-500 uppercase">Student Profile Not Found</div>;

  const handleRecordPayment = async () => {
    toast({ title: isAr ? "قريباً" : "Feature Coming Soon", description: "Payment logging interface is under development." });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Profile */}
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
         <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="h-11 w-11 rounded-lg bg-slate-50 text-slate-400 hover:text-primary transition-all flex items-center justify-center border border-slate-100">
              {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
            <div className="h-20 w-20 rounded-xl bg-primary text-secondary flex items-center justify-center text-3xl font-black shadow-lg">
               {student.firstName?.charAt(0)}
            </div>
            <div className="space-y-1 text-center md:text-start">
               <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">{student.firstName} {student.lastName}</h1>
                  <Badge className="bg-green-100 text-green-600 rounded-md uppercase text-[9px] font-black border-none px-3">
                    {student.status}
                  </Badge>
               </div>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center md:justify-start gap-2">
                  <GraduationCap className="h-3 w-3 text-secondary" /> Grade {student.gradeLevel} • {student.programOption}
               </p>
            </div>
         </div>
         
         <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-lg px-6 font-black gap-2 border-slate-200 text-[10px] uppercase tracking-widest">
               <FileText className="h-4 w-4" /> {isAr ? 'تعديل الملف' : 'Edit Profile'}
            </Button>
            <Button onClick={handleRecordPayment} className="flex-1 md:flex-none h-12 rounded-lg bg-secondary text-white px-6 font-black gap-2 shadow-md text-[10px] uppercase tracking-widest">
               <DollarSign className="h-4 w-4" /> {isAr ? 'تسجيل دفعة' : 'Record Payment'}
            </Button>
         </div>
      </div>

      {/* 2. Main Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
         <TabsList className="bg-white p-1.5 rounded-xl h-14 shadow-sm border border-slate-100 inline-flex">
            <TabsTrigger value="overview" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all px-6 h-full gap-2">
               <ShieldCheck className="h-3.5 w-3.5" /> {isAr ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="academic" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all px-6 h-full gap-2">
               <BookOpen className="h-3.5 w-3.5" /> {isAr ? 'الخطة الدراسية' : 'Academic Plan'}
            </TabsTrigger>
            <TabsTrigger value="financial" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all px-6 h-full gap-2">
               <CreditCard className="h-3.5 w-3.5" /> {isAr ? 'السجل المالي' : 'Financials'}
            </TabsTrigger>
            <TabsTrigger value="docs" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all px-6 h-full gap-2">
               <FileText className="h-3.5 w-3.5" /> {isAr ? 'المستندات' : 'Documents'}
            </TabsTrigger>
         </TabsList>

         <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Contact Card */}
               <Card className="border-none shadow-sm rounded-xl bg-white p-8 space-y-8 border border-slate-100">
                  <div className="space-y-6">
                     <h3 className="font-black text-primary uppercase text-xs border-b pb-4 flex items-center gap-3">
                        <Users className="h-5 w-5 text-secondary" /> {isAr ? 'بيانات التواصل' : 'Contact Info'}
                     </h3>
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><Mail className="h-4 w-4" /></div>
                           <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</p><p className="font-bold text-slate-700 text-sm">{student.email}</p></div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><Phone className="h-4 w-4" /></div>
                           <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone</p><p className="font-bold text-slate-700 text-sm" dir="ltr">{student.phone}</p></div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100"><MapPin className="h-4 w-4" /></div>
                           <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Location</p><p className="font-bold text-slate-700 text-sm">{student.address?.city}, {student.address?.state}</p></div>
                        </div>
                     </div>
                  </div>
               </Card>

               {/* Quick Stats */}
               <Card className="md:col-span-2 border-none shadow-sm rounded-xl bg-slate-900 text-white p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-6 flex flex-col justify-center">
                     <div className="h-12 w-12 rounded-xl bg-white/10 text-secondary flex items-center justify-center"><BookOpen className="h-6 w-6" /></div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-white/40 tracking-widest">Academic Progress</p>
                        <h4 className="text-4xl font-black">{student.academicPlan?.progress || 0}%</h4>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-3">
                           <div className="h-full bg-secondary" style={{ width: `${student.academicPlan?.progress || 0}%` }} />
                        </div>
                     </div>
                  </div>
                  <div className="space-y-6 flex flex-col justify-center border-l border-white/5 pl-8">
                     <div className="h-12 w-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center"><DollarSign className="h-6 w-6" /></div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-white/40 tracking-widest">Outstanding Balance</p>
                        <h4 className="text-4xl font-black">${((student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0)).toLocaleString()}</h4>
                        <p className="text-[9px] font-bold text-slate-500 uppercase mt-3">Next Due: Net 30</p>
                     </div>
                  </div>
               </Card>
            </div>
         </TabsContent>

         <TabsContent value="academic">
            <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden border border-slate-100">
               <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/30">
                  <div>
                     <CardTitle className="text-xl font-black uppercase text-primary">{isAr ? 'الخطة الدراسية والمواد' : 'Course Enrollment & Plan'}</CardTitle>
                     <CardDescription className="font-bold text-xs">{isAr ? 'تتبع المواد المخصصة والتقدم في منصة Edgenuity' : 'Track individual course progress and mastery'}</CardDescription>
                  </div>
                  <Button variant="outline" className="rounded-lg font-black gap-2 h-10 text-[10px] uppercase tracking-widest">
                    <Plus className="h-4 w-4" /> Add Course
                  </Button>
               </CardHeader>
               <div className="overflow-x-auto">
                 <Table>
                    <TableHeader className="bg-slate-50">
                       <TableRow className="border-slate-100 hover:bg-transparent">
                          <TableHead className="px-8 py-5 font-black uppercase text-[9px] tracking-widest text-slate-400">Subject</TableHead>
                          <TableHead className="font-black uppercase text-[9px] tracking-widest text-slate-400 text-center">Status</TableHead>
                          <TableHead className="font-black uppercase text-[9px] tracking-widest text-slate-400 text-center">Progress</TableHead>
                          <TableHead className="font-black uppercase text-[9px] tracking-widest text-slate-400 text-right pr-8">Final Grade</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       <TableRow className="border-slate-50 hover:bg-slate-50/30">
                          <TableCell className="px-8 py-6 font-bold text-primary">English Language Arts</TableCell>
                          <TableCell className="text-center"><Badge className="bg-blue-100 text-blue-600 rounded-md border-none uppercase text-[8px] font-black px-2">In Progress</Badge></TableCell>
                          <TableCell className="text-center">
                             <div className="flex flex-col items-center gap-2">
                                <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-secondary w-[65%]" />
                                </div>
                                <span className="text-[10px] font-black text-slate-400">65% Complete</span>
                             </div>
                          </TableCell>
                          <TableCell className="text-right pr-8 font-black text-slate-300 italic">Pending</TableCell>
                       </TableRow>
                       <TableRow className="border-none hover:bg-slate-50/30">
                          <TableCell className="px-8 py-6 font-bold text-primary">Pre-Algebra</TableCell>
                          <TableCell className="text-center"><Badge className="bg-green-100 text-green-600 rounded-md border-none uppercase text-[8px] font-black px-2">Completed</Badge></TableCell>
                          <TableCell className="text-center">
                             <div className="flex flex-col items-center gap-2">
                                <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500 w-full" />
                                </div>
                                <span className="text-[10px] font-black text-green-500">100% Mastered</span>
                             </div>
                          </TableCell>
                          <TableCell className="text-right pr-8 font-black text-secondary text-lg">A-</TableCell>
                       </TableRow>
                    </TableBody>
                 </Table>
               </div>
            </Card>
         </TabsContent>

         <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Contract Value</p>
                  <h5 className="text-2xl font-black text-primary">${(student.financialLedger?.totalDue || 0).toLocaleString()}</h5>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Paid to Date</p>
                  <h5 className="text-2xl font-black text-green-500">${(student.financialLedger?.totalPaid || 0).toLocaleString()}</h5>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Next Installment</p>
                  <h5 className="text-2xl font-black text-secondary">$150.00</h5>
               </div>
            </div>

            <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden border border-slate-100">
               <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                  <CardTitle className="text-lg font-black uppercase text-primary">{isAr ? 'سجل المدفوعات' : 'Payment Ledger'}</CardTitle>
               </CardHeader>
               <Table>
                  <TableHeader className="bg-slate-50">
                     <TableRow className="border-slate-100">
                        <TableHead className="px-8 py-5 font-black uppercase text-[9px] tracking-widest">Date</TableHead>
                        <TableHead className="font-black uppercase text-[9px] tracking-widest">Reference</TableHead>
                        <TableHead className="font-black uppercase text-[9px] tracking-widest">Amount</TableHead>
                        <TableHead className="font-black uppercase text-[9px] tracking-widest text-right pr-8">Status</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     <TableRow>
                        <TableCell colSpan={4} className="py-20 text-center text-slate-300 font-bold uppercase text-[10px] tracking-widest">
                           No transaction history found for this student.
                        </TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </Card>
         </TabsContent>

         <TabsContent value="docs">
            <Card className="border-none shadow-sm rounded-xl bg-white p-12 border border-slate-100">
               <div className="flex flex-col items-center justify-center py-12 gap-8 text-center">
                  <div className="h-20 w-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-200">
                    <FileText className="h-10 w-10" />
                  </div>
                  <div className="space-y-3">
                     <h3 className="text-xl font-black uppercase text-primary">{isAr ? 'طلب سجل دراسي' : 'Academic Records Request'}</h3>
                     <p className="text-slate-400 font-medium text-sm max-w-sm leading-relaxed">
                       Initiate a formal request to the student's previous school to retrieve official transcripts and academic history.
                     </p>
                  </div>
                  <Button className="rounded-lg h-14 px-10 bg-primary hover:bg-secondary font-black uppercase text-xs tracking-widest shadow-lg transition-all">
                    Start Formal Request
                  </Button>
               </div>
            </Card>
         </TabsContent>
      </Tabs>
    </div>
  );
}
