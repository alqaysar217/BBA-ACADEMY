
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { 
  Users, 
  MapPin, 
  GraduationCap, 
  CreditCard, 
  FileText, 
  CheckCircle2,
  DownloadCloud,
  FileCheck,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Clock,
  Layers,
  Globe,
  Trash2,
  ShieldCheck,
  Briefcase,
  AlertCircle,
  MoreVertical,
  UserPlus,
  Mail,
  Phone,
  Layout
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function EnrollmentDetailPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const { user, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const isAr = lang === 'ar';
  const [isProcessing, setIsProcessing] = useState(false);

  const docRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'enrollments', id);
  }, [firestore, id]);

  const { data: app, loading: dataLoading } = useDoc(docRef);

  useEffect(() => {
    const isTestAdmin = localStorage.getItem('bba_test_admin') === 'true';
    if (!authLoading && !user && !isTestAdmin) {
      router.push(`/${lang}/admin/login`);
    }
  }, [user, authLoading, router, lang]);

  const updateStatus = async (newStatus: string) => {
    if (!firestore || !app) return;
    setIsProcessing(true);
    
    const updateData = {
      status: newStatus,
      updatedAt: serverTimestamp(),
      processedBy: user?.email || 'admin'
    };

    setDoc(docRef!, updateData, { merge: true })
      .then(() => {
        toast({
          title: isAr ? "تم تحديث الحالة" : "Status Updated",
          description: isAr ? `تم تغيير حالة الطلب إلى: ${newStatus}` : `Application status changed to ${newStatus}.`,
        });
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: docRef!.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => setIsProcessing(false));
  };

  const approveAndEnroll = async () => {
    if (!firestore || !app) return;
    if (app.status === 'approved') {
       toast({ variant: "destructive", title: isAr ? "الطلب معتمد بالفعل" : "Already Approved" });
       return;
    }

    setIsProcessing(true);
    try {
      const studentsCollection = collection(firestore, 'students');
      const creationPromises = app.students.map((student: any) => {
        const studentDoc = doc(studentsCollection);
        const studentData = {
          ...student,
          enrollmentId: id,
          parentId: user?.uid || 'anonymous',
          parent1Name: app.parent1Name,
          parent1Email: app.parent1Email,
          parent1Phone: app.parent1Phone,
          address: app.address,
          programOption: app.programOption,
          status: 'active',
          gradeLevel: student.lastGrade,
          academicPlan: {
            courses: [],
            progress: 0,
            graduationYear: new Date().getFullYear() + (12 - parseInt(student.lastGrade || '0'))
          },
          financialLedger: {
            totalDue: app.programOption === 'weekend' ? 75 : (app.paymentTier === 'full-3-5' ? 2850 : 1650),
            totalPaid: 0,
            payments: [],
            lastPaymentDate: null
          },
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        return setDoc(studentDoc, studentData);
      });

      await Promise.all(creationPromises);

      await setDoc(docRef!, { 
        status: 'approved', 
        updatedAt: serverTimestamp(),
        approvedAt: serverTimestamp()
      }, { merge: true });

      toast({
        title: isAr ? "تم الاعتماد والتسجيل" : "Approved & Enrolled",
        description: isAr ? "تم إنشاء ملفات الطلاب بنجاح." : "Student records have been created successfully.",
      });
      router.push(`/${lang}/admin/students`);
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error during enrollment" });
    } finally {
      setIsProcessing(false);
    }
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-8">
           <div className="relative h-20 w-20">
              <div className="absolute inset-0 border-4 border-secondary/10 rounded-[2rem]" />
              <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-[2rem] animate-spin" />
           </div>
           <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] animate-pulse">
              {isAr ? 'مزامنة السجلات...' : 'Syncing Records...'}
           </p>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-8 max-w-sm px-8">
           <div className="h-32 w-32 bg-white shadow-2xl rounded-[3rem] flex items-center justify-center mx-auto text-slate-200 border border-slate-100">
              <FileText className="h-12 w-12" />
           </div>
           <h2 className="text-3xl font-black text-primary uppercase tracking-tight">{isAr ? 'الطلب غير موجود' : 'Missing Entry'}</h2>
           <Button onClick={() => router.back()} className="w-full bg-primary text-white rounded-2xl h-16 font-black shadow-xl">
              {isAr ? 'العودة للخلف' : 'Go Back'}
           </Button>
        </div>
      </div>
    );
  }

  const SectionHeader = ({ icon: Icon, title, subtitle, color = "bg-primary" }: { icon: any, title: string, subtitle: string, color?: string }) => (
    <div className="flex items-center gap-6 mb-8 px-4">
      <div className={cn("h-14 w-14 rounded-2xl text-white flex items-center justify-center shadow-2xl ring-4 ring-white transition-transform hover:scale-110", color)}>
        <Icon className="h-7 w-7" />
      </div>
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-primary uppercase tracking-tighter leading-none">{title}</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Premium Header Container */}
      <header className="bg-white/80 backdrop-blur-2xl border border-slate-100 rounded-[2.5rem] p-6 shadow-premium sticky top-4 z-40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.back()} 
            className="h-14 w-14 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-white hover:shadow-xl transition-all border border-slate-100 flex items-center justify-center group"
          >
            {isAr ? <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" /> : <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />}
          </button>
          <div className="space-y-1">
            <div className="flex items-center gap-4">
               <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tight">{app.parent1Name}</h1>
               <Badge className={cn(
                 "h-8 px-4 rounded-xl font-black uppercase text-[10px] tracking-widest border-none shadow-sm",
                 app.status === 'approved' ? "bg-green-100 text-green-600" : 
                 app.status === 'rejected' ? "bg-red-100 text-red-600" :
                 "bg-blue-100 text-blue-600"
               )}>
                 {app.status}
               </Badge>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {isAr ? 'آخر تحديث:' : 'Last Update:'} {app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, HH:mm') : '-'}</span>
               <span className="h-1 w-1 bg-slate-200 rounded-full" />
               <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /> ID: {id.slice(0,8)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-none rounded-2xl h-14 border-slate-200 font-black text-xs uppercase tracking-widest bg-white hover:bg-slate-50">
                <Layers className="h-4.5 w-4.5 mr-2 text-secondary" />
                {isAr ? 'تغيير الحالة' : 'Status Action'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[220px] shadow-2xl border-slate-100">
              <DropdownMenuItem onClick={() => updateStatus('reviewed')} className="font-bold text-primary p-3 rounded-xl">{isAr ? 'تمت المراجعة' : 'Mark Reviewed'}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus('missing_docs')} className="font-bold text-amber-600 p-3 rounded-xl">{isAr ? 'وثائق مفقودة' : 'Missing Documents'}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus('rejected')} className="font-bold text-red-600 p-3 rounded-xl">{isAr ? 'رفض الطلب' : 'Reject Application'}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            onClick={approveAndEnroll}
            disabled={isProcessing || app.status === 'approved'}
            className="flex-[2] md:flex-none rounded-2xl h-14 bg-primary hover:bg-secondary text-white font-black px-10 shadow-2xl shadow-primary/20 transition-all gap-3 text-sm active:scale-95"
          >
            {isProcessing ? <Clock className="h-5 w-5 animate-spin" /> : <UserPlus className="h-5 w-5 text-secondary" />}
            {isAr ? 'اعتماد وتسجيل الطالب' : 'Approve & Enroll'}
          </Button>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-16">
        
        {/* SECTION 1: GUARDIANS & ADDRESS */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <SectionHeader 
            icon={Users} 
            title={isAr ? 'بيانات العائلة والتواصل' : 'Family Intelligence'} 
            subtitle={isAr ? 'جدول الممثلين القانونيين وعنوان السكن' : 'Authorized Guardians & Residence'}
            color="bg-primary"
          />
          <Card className="border-none shadow-premium rounded-[3rem] overflow-hidden bg-white border border-slate-100/50">
            <div className="overflow-x-auto">
               <Table>
                 <TableHeader className="bg-slate-50/50 border-b border-slate-100">
                   <TableRow className="hover:bg-transparent h-16">
                     <TableHead className="w-20 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">#</TableHead>
                     <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest px-8 text-start">{isAr ? 'اسم ولي الأمر' : 'Guardian Name'}</TableHead>
                     <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'رقم الهاتف' : 'Contact Phone'}</TableHead>
                     <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'البريد الإلكتروني' : 'Email'}</TableHead>
                     <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'القرابة' : 'Relation'}</TableHead>
                     <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'الدور' : 'Role'}</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   <TableRow className="hover:bg-slate-50/30 border-slate-100 transition-colors">
                     <TableCell className="text-center font-black text-slate-300 py-8">01</TableCell>
                     <TableCell className="px-8 font-black text-primary text-lg text-start">{app.parent1Name}</TableCell>
                     <TableCell className="font-bold text-slate-600 text-center" dir="ltr">{app.parent1Phone}</TableCell>
                     <TableCell className="font-bold text-slate-600 text-center">{app.parent1Email}</TableCell>
                     <TableCell className="text-center"><Badge variant="outline" className="bg-slate-50 text-slate-500 border-none font-black text-[9px] uppercase tracking-tighter">{app.relationship1}</Badge></TableCell>
                     <TableCell className="text-center"><Badge className="bg-secondary text-white text-[8px] font-black uppercase tracking-[0.2em] shadow-lg shadow-secondary/10 px-3">Primary</Badge></TableCell>
                   </TableRow>
                   
                   {app.parent2Name && (
                     <TableRow className="hover:bg-slate-50/30 border-slate-100 transition-colors">
                       <TableCell className="text-center font-black text-slate-300 py-8">02</TableCell>
                       <TableCell className="px-8 font-black text-primary text-lg text-start">{app.parent2Name}</TableCell>
                       <TableCell className="font-bold text-slate-600 text-center" dir="ltr">{app.parent2Phone}</TableCell>
                       <TableCell className="font-bold text-slate-600 text-center">{app.parent2Email}</TableCell>
                       <TableCell className="text-center"><Badge variant="outline" className="bg-slate-50 text-slate-500 border-none font-black text-[9px] uppercase tracking-tighter">{app.relationship2}</Badge></TableCell>
                       <TableCell className="text-center"><Badge className="bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3">Secondary</Badge></TableCell>
                     </TableRow>
                   )}

                   <TableRow className="bg-slate-50/30 border-none">
                     <TableCell colSpan={6} className="p-10">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                           <div className="flex items-center gap-5 shrink-0 relative z-10">
                              <div className="h-14 w-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shadow-inner ring-1 ring-secondary/20">
                                 <MapPin className="h-7 w-7" />
                              </div>
                              <div className="space-y-0.5">
                                 <span className="font-black text-primary uppercase text-sm tracking-tighter">{isAr ? 'عنوان السكن المعتمد' : 'Registered Shared Residence'}</span>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Shipping & Records Address</p>
                              </div>
                           </div>
                           <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-700 relative z-10">
                              <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner group-hover:bg-white transition-colors">
                                 <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1">{isAr ? 'تفاصيل الموقع' : 'Location Details'}</span>
                                 <span className="text-primary font-black">{app.address?.line1} {app.address?.line2}</span>
                              </div>
                              <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner group-hover:bg-white transition-colors">
                                 <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1">{isAr ? 'المنطقة والرمز' : 'Region & ZIP'}</span>
                                 <span className="text-secondary font-black">{app.address?.city}, {app.address?.state} {app.address?.zip}</span>
                              </div>
                           </div>
                        </div>
                     </TableCell>
                   </TableRow>
                 </TableBody>
               </Table>
            </div>
          </Card>
        </section>

        {/* SECTION 2: STUDENT ROSTER */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
           <SectionHeader 
              icon={GraduationCap} 
              title={isAr ? 'سجل الطلاب الأكاديمي' : 'Student Roster'} 
              subtitle={isAr ? 'البيانات الشخصية والأكاديمية لكافة الأبناء' : 'Sibling Academic Profiles & Records'}
              color="bg-secondary"
            />
            <Card className="border-none shadow-premium rounded-[3rem] overflow-hidden bg-white border border-slate-100/50">
              <Table>
                <TableHeader className="bg-slate-50/50 border-b border-slate-100">
                  <TableRow className="hover:bg-transparent h-16">
                    <TableHead className="w-20 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">#</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest px-8 text-start">{isAr ? 'اسم الطالب' : 'Full Name'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'الجنس' : 'Gender'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'تاريخ الميلاد' : 'D.O.B'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'المستوى' : 'Level'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'التواصل' : 'Contact'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'الحالة' : 'Status'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {app.students?.map((student: any, idx: number) => (
                    <TableRow key={idx} className="hover:bg-slate-50/30 border-slate-100 transition-colors group">
                      <TableCell className="text-center font-black text-slate-300 py-8">{idx + 1}</TableCell>
                      <TableCell className="px-8 font-black text-primary text-lg text-start">
                        {student.firstName} {student.middleName} {student.lastName}
                      </TableCell>
                      <TableCell className="text-center font-bold text-slate-500">
                         {student.gender === 'Male' ? (isAr ? 'ذكر' : 'Male') : (isAr ? 'أنثى' : 'Female')}
                      </TableCell>
                      <TableCell className="font-bold text-slate-600 text-xs text-center">{student.dob}</TableCell>
                      <TableCell className="text-center">
                         <Badge variant="outline" className="rounded-xl border-slate-100 bg-slate-50 text-primary font-black text-[10px] px-4 py-1.5">Grade {student.lastGrade}</Badge>
                      </TableCell>
                      <TableCell className="text-[11px] font-black text-slate-600 text-center" dir="ltr">
                        {student.phone}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-secondary/10 text-secondary border-none font-black text-[9px] uppercase tracking-tighter px-3">
                           {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
        </section>

        {/* SECTION 3: BOTTOM GRID (PROGRAM & FILES) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <section className="space-y-8">
             <SectionHeader icon={Briefcase} title={isAr ? 'المسار التعليمي' : 'Academic Track'} subtitle={isAr ? 'البرنامج المختار والرسوم المقدرة' : 'Enrollment Path & Tuition'} color="bg-accent" />
             <Card className="border-none shadow-premium rounded-[3rem] overflow-hidden bg-white border border-slate-100/50 p-10 flex flex-col justify-center gap-8 min-h-[300px] relative group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-150" />
                <div className="space-y-2 relative z-10">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'خيار البرنامج' : 'Selected Program Option'}</p>
                   <h3 className="text-4xl font-black text-primary tracking-tighter">{app.programOption}</h3>
                </div>
                <div className="h-px bg-slate-50 w-full" />
                <div className="space-y-4 relative z-10">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الرسوم الدراسية المقدرة' : 'Tuition Projection'}</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-secondary tracking-tighter drop-shadow-sm">
                         {app.programOption === 'weekend' ? '$75' : app.paymentTier === 'full-3-5' ? '$2,850' : '$1,650'}
                      </span>
                      <span className="text-slate-300 font-bold text-sm uppercase tracking-widest">{app.programOption === 'weekend' ? '/ Month' : '/ One-Time'}</span>
                   </div>
                </div>
             </Card>
          </section>

          <section className="space-y-8">
             <SectionHeader icon={FileCheck} title={isAr ? 'الأرشيف الرقمي' : 'Digital Evidence'} subtitle={isAr ? 'الوثائق والمرفقات الرسمية' : 'Verified PDF & Image Uploads'} color="bg-slate-900" />
             <Card className="border-none shadow-premium rounded-[3rem] overflow-hidden bg-white border border-slate-100/50 h-full min-h-[300px]">
                <Table>
                  <TableBody>
                    {app.files && app.files.length > 0 ? (
                      app.files.map((file: any, idx: number) => (
                        <TableRow key={idx} className="hover:bg-slate-50/50 border-slate-100 transition-colors">
                          <TableCell className="py-8 px-10">
                             <div className="flex items-center gap-6">
                                <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-secondary shadow-sm transition-transform hover:rotate-6"><FileText className="h-6 w-6" /></div>
                                <div className="space-y-0.5">
                                   <p className="text-sm font-black text-primary truncate max-w-[250px]">{file.name}</p>
                                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Formal Document #{idx + 1}</p>
                                </div>
                             </div>
                          </TableCell>
                          <TableCell className="py-8 text-right pr-10">
                             <Button 
                                onClick={() => window.open(file.data, '_blank')} 
                                variant="outline" 
                                className="h-12 w-12 rounded-2xl border-slate-200 text-slate-400 hover:text-secondary hover:bg-white hover:shadow-xl transition-all"
                             >
                                <ExternalLink className="h-5 w-5" />
                             </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={2} className="py-32 text-center text-slate-300 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'لا توجد مستندات مرفوعة' : 'No Digital Artifacts Found'}</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
             </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

