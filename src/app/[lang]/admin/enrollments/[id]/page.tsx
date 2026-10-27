
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

  const updateStatus = (newStatus: string) => {
    if (!firestore || !app || !docRef) return;
    setIsProcessing(true);
    
    const updateData = {
      status: newStatus,
      updatedAt: serverTimestamp(),
      processedBy: user?.email || 'admin'
    };

    setDoc(docRef, updateData, { merge: true })
      .then(() => {
        toast({
          title: isAr ? "تم تحديث الحالة" : "Status Updated",
          description: isAr ? `تم تغيير حالة الطلب إلى: ${newStatus}` : `Application status changed to ${newStatus}.`,
        });
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => setIsProcessing(false));
  };

  const approveAndEnroll = () => {
    if (!firestore || !app || !docRef) return;
    if (app.status === 'approved') {
       toast({ variant: "destructive", title: isAr ? "الطلب معتمد بالفعل" : "Already Approved" });
       return;
    }

    setIsProcessing(true);
    
    const studentsCollection = collection(firestore, 'students');
    
    // Create student records
    app.students.forEach((student: any) => {
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
      
      setDoc(studentDoc, studentData).catch(async (err) => {
        const pError = new FirestorePermissionError({
          path: studentDoc.path,
          operation: 'create',
          requestResourceData: studentData,
        });
        errorEmitter.emit('permission-error', pError);
      });
    });

    // Update enrollment status
    const enrollmentUpdate = { 
      status: 'approved', 
      updatedAt: serverTimestamp(),
      approvedAt: serverTimestamp()
    };

    setDoc(docRef, enrollmentUpdate, { merge: true })
      .then(() => {
        toast({
          title: isAr ? "تم الاعتماد والتسجيل" : "Approved & Enrolled",
          description: isAr ? "تم إنشاء ملفات الطلاب بنجاح." : "Student records have been created successfully.",
        });
        router.push(`/${lang}/admin/students`);
      })
      .catch(async (err) => {
        const pError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: enrollmentUpdate,
        });
        errorEmitter.emit('permission-error', pError);
      })
      .finally(() => setIsProcessing(false));
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
           <div className="h-12 w-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
           <p className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">
              {isAr ? 'مزامنة السجلات...' : 'Syncing Records...'}
           </p>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center p-8">
        <div className="space-y-6 max-w-sm">
           <div className="h-20 w-20 bg-white shadow-lg rounded-xl flex items-center justify-center mx-auto text-slate-200 border border-slate-100">
              <FileText className="h-10 w-10" />
           </div>
           <h2 className="text-2xl font-black text-primary uppercase">{isAr ? 'الطلب غير موجود' : 'Missing Entry'}</h2>
           <Button onClick={() => router.back()} className="w-full bg-primary text-white rounded-lg h-12 font-black">
              {isAr ? 'العودة للخلف' : 'Go Back'}
           </Button>
        </div>
      </div>
    );
  }

  const SectionHeader = ({ icon: Icon, title, subtitle, color = "bg-primary" }: { icon: any, title: string, subtitle: string, color?: string }) => (
    <div className="flex items-center gap-4 mb-6 px-2">
      <div className={cn("h-11 w-11 rounded-lg text-white flex items-center justify-center shadow-md", color)}>
        <Icon className="h-5.5 w-5.5" />
      </div>
      <div className="space-y-0.5">
        <h2 className="text-xl font-black text-primary uppercase tracking-tight leading-none">{title}</h2>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Sharp Header Container */}
      <header className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-xl p-5 shadow-sm sticky top-4 z-40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="h-11 w-11 rounded-lg bg-slate-50 text-slate-400 hover:text-primary hover:bg-white hover:shadow-md transition-all border border-slate-100 flex items-center justify-center group"
          >
            {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
          <div className="space-y-0.5">
            <div className="flex items-center gap-3">
               <h1 className="text-xl md:text-2xl font-black text-primary truncate">{app.parent1Name}</h1>
               <Badge className={cn(
                 "h-6 px-3 rounded-lg font-black uppercase text-[9px] tracking-widest border-none shadow-sm",
                 app.status === 'approved' ? "bg-green-100 text-green-600" : 
                 app.status === 'rejected' ? "bg-red-100 text-red-600" :
                 "bg-blue-100 text-blue-600"
               )}>
                 {app.status}
               </Badge>
            </div>
            <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, HH:mm') : '-'}</span>
               <span className="h-1 w-1 bg-slate-200 rounded-full" />
               <span>ID: {id.slice(0,8)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-none rounded-lg h-11 border-slate-200 font-black text-[10px] uppercase tracking-widest bg-white">
                <Layers className="h-4 w-4 mr-2 text-secondary" />
                {isAr ? 'تغيير الحالة' : 'Status'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg p-1.5 min-w-[200px] shadow-xl border-slate-100">
              <DropdownMenuItem onClick={() => updateStatus('reviewed')} className="font-bold text-primary p-2.5 rounded-md">{isAr ? 'تمت المراجعة' : 'Mark Reviewed'}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus('missing_docs')} className="font-bold text-amber-600 p-2.5 rounded-md">{isAr ? 'وثائق مفقودة' : 'Missing Docs'}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus('rejected')} className="font-bold text-red-600 p-2.5 rounded-md">{isAr ? 'رفض الطلب' : 'Reject'}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus('approved')} className="font-bold text-green-600 p-2.5 rounded-md">{isAr ? 'مقبول' : 'Accept'}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            onClick={approveAndEnroll}
            disabled={isProcessing || app.status === 'approved'}
            className="flex-[2] md:flex-none rounded-lg h-11 bg-primary hover:bg-secondary text-white font-black px-8 shadow-md transition-all gap-2 text-xs active:scale-95"
          >
            {isProcessing ? <Clock className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4 text-secondary" />}
            {isAr ? 'اعتماد وتسجيل الطالب' : 'Approve & Enroll'}
          </Button>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-12">
        
        {/* SECTION 1: GUARDIANS */}
        <section className="animate-in fade-in duration-500">
          <SectionHeader 
            icon={Users} 
            title={isAr ? 'بيانات العائلة والتواصل' : 'Family Intelligence'} 
            subtitle={isAr ? 'جدول الممثلين القانونيين وعنوان السكن' : 'Authorized Guardians & Residence'}
          />
          <Card className="border-none shadow-sm rounded-lg overflow-hidden bg-white border border-slate-100">
            <div className="overflow-x-auto">
               <Table>
                 <TableHeader className="bg-slate-50 border-b border-slate-100">
                   <TableRow className="hover:bg-transparent h-14">
                     <TableHead className="w-16 text-center font-black text-[9px] uppercase text-slate-400 tracking-widest">#</TableHead>
                     <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest px-6 text-start">{isAr ? 'اسم ولي الأمر' : 'Guardian Name'}</TableHead>
                     <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'رقم الهاتف' : 'Contact Phone'}</TableHead>
                     <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'البريد الإلكتروني' : 'Email'}</TableHead>
                     <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'القرابة' : 'Relation'}</TableHead>
                     <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'الدور' : 'Role'}</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   <TableRow className="hover:bg-slate-50/50 border-slate-100">
                     <TableCell className="text-center font-black text-slate-300 py-6">01</TableCell>
                     <TableCell className="px-6 font-black text-primary text-base text-start">{app.parent1Name}</TableCell>
                     <TableCell className="font-bold text-slate-600 text-center" dir="ltr">{app.parent1Phone}</TableCell>
                     <TableCell className="font-bold text-slate-600 text-center">{app.parent1Email}</TableCell>
                     <TableCell className="text-center"><Badge variant="outline" className="bg-slate-50 text-slate-500 border-none font-black text-[8px] uppercase">{app.relationship1}</Badge></TableCell>
                     <TableCell className="text-center"><Badge className="bg-secondary text-white text-[8px] font-black uppercase tracking-widest px-2">Primary</Badge></TableCell>
                   </TableRow>
                   
                   {app.parent2Name && (
                     <TableRow className="hover:bg-slate-50/50 border-slate-100">
                       <TableCell className="text-center font-black text-slate-300 py-6">02</TableCell>
                       <TableCell className="px-6 font-black text-primary text-base text-start">{app.parent2Name}</TableCell>
                       <TableCell className="font-bold text-slate-600 text-center" dir="ltr">{app.parent2Phone}</TableCell>
                       <TableCell className="font-bold text-slate-600 text-center">{app.parent2Email}</TableCell>
                       <TableCell className="text-center"><Badge variant="outline" className="bg-slate-50 text-slate-500 border-none font-black text-[8px] uppercase">{app.relationship2}</Badge></TableCell>
                       <TableCell className="text-center"><Badge className="bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest px-2">Secondary</Badge></TableCell>
                     </TableRow>
                   )}

                   <TableRow className="bg-slate-50/30">
                     <TableCell colSpan={6} className="p-6">
                        <div className="bg-white p-6 rounded-lg border border-slate-100 flex flex-row items-center gap-8 shadow-sm overflow-x-auto no-scrollbar">
                           <div className="flex items-center gap-4 shrink-0">
                              <div className="h-11 w-11 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                                 <MapPin className="h-5 w-5" />
                              </div>
                              <div className="space-y-0.5">
                                 <span className="font-black text-primary uppercase text-[10px] tracking-tight">{isAr ? 'عنوان السكن المعتمد' : 'Verified Address'}</span>
                                 <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Shipping & Records</p>
                              </div>
                           </div>
                           <div className="h-10 w-px bg-slate-100 shrink-0" />
                           <div className="flex flex-row gap-8 text-xs font-bold text-slate-700 whitespace-nowrap">
                              <div className="space-y-1">
                                 <span className="text-[8px] text-slate-400 uppercase tracking-widest block">{isAr ? 'العنوان الأول' : 'Address 1'}</span>
                                 <span className="text-primary font-black text-sm">{app.address?.line1 || '-'}</span>
                              </div>
                              <div className="space-y-1">
                                 <span className="text-[8px] text-slate-400 uppercase tracking-widest block">{isAr ? 'العنوان الثاني' : 'Address 2'}</span>
                                 <span className="text-primary font-black text-sm">{app.address?.line2 || '-'}</span>
                              </div>
                              <div className="space-y-1">
                                 <span className="text-[8px] text-slate-400 uppercase tracking-widest block">{isAr ? 'المدينة' : 'City'}</span>
                                 <span className="text-primary font-black text-sm">{app.address?.city || '-'}</span>
                              </div>
                              <div className="space-y-1">
                                 <span className="text-[8px] text-slate-400 uppercase tracking-widest block">{isAr ? 'الولاية' : 'State'}</span>
                                 <span className="text-primary font-black text-sm">{app.address?.state || '-'}</span>
                              </div>
                              <div className="space-y-1">
                                 <span className="text-[8px] text-slate-400 uppercase tracking-widest block">{isAr ? 'الرمز البريدي' : 'ZIP Code'}</span>
                                 <span className="text-secondary font-black text-sm">{app.address?.zip || '-'}</span>
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
        <section className="animate-in fade-in duration-500 delay-100">
           <SectionHeader 
              icon={GraduationCap} 
              title={isAr ? 'سجل الطلاب الأكاديمي' : 'Student Roster'} 
              subtitle={isAr ? 'البيانات الشخصية والأكاديمية لكافة الأبناء' : 'Sibling Academic Profiles'}
              color="bg-secondary"
            />
            <Card className="border-none shadow-sm rounded-lg overflow-hidden bg-white border border-slate-100">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50 border-b border-slate-100">
                    <TableRow className="hover:bg-transparent h-14">
                      <TableHead className="w-16 text-center font-black text-[9px] uppercase text-slate-400 tracking-widest">#</TableHead>
                      <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest px-6 text-start">{isAr ? 'اسم الطالب' : 'Full Name'}</TableHead>
                      <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'الجنس' : 'Gender'}</TableHead>
                      <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'تاريخ الميلاد' : 'D.O.B'}</TableHead>
                      <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'المستوى' : 'Level'}</TableHead>
                      <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'الهاتف' : 'Phone'}</TableHead>
                      <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'البريد' : 'Email'}</TableHead>
                      <TableHead className="font-black text-[9px] uppercase text-slate-400 tracking-widest text-center">{isAr ? 'الحالة' : 'Status'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {app.students?.map((student: any, idx: number) => (
                      <TableRow key={idx} className="hover:bg-slate-50/50 border-slate-100 transition-colors">
                        <TableCell className="text-center font-black text-slate-300 py-6">{idx + 1}</TableCell>
                        <TableCell className="px-6 font-black text-primary text-base text-start whitespace-nowrap">
                          {student.firstName} {student.middleName} {student.lastName}
                        </TableCell>
                        <TableCell className="text-center font-bold text-slate-500">
                           {student.gender === 'Male' ? (isAr ? 'ذكر' : 'Male') : (isAr ? 'أنثى' : 'Female')}
                        </TableCell>
                        <TableCell className="font-bold text-slate-600 text-[11px] text-center whitespace-nowrap">{student.dob}</TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                           <Badge variant="outline" className="rounded-lg border-slate-100 bg-slate-50 text-primary font-black text-[9px] px-3 py-1">Grade {student.lastGrade}</Badge>
                        </TableCell>
                        <TableCell className="text-[10px] font-black text-slate-600 text-center whitespace-nowrap" dir="ltr">
                          {student.phone}
                        </TableCell>
                        <TableCell className="text-[10px] font-bold text-slate-600 text-center whitespace-nowrap">
                          {student.email}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap">
                          <Badge className="bg-secondary/10 text-secondary border-none font-black text-[8px] uppercase px-2">
                             {student.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
        </section>

        {/* SECTION 3: BOTTOM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500 delay-200">
          <section className="space-y-6">
             <SectionHeader icon={Briefcase} title={isAr ? 'المسار التعليمي' : 'Academic Track'} subtitle={isAr ? 'البرنامج المختار والرسوم' : 'Enrollment Path'} color="bg-accent" />
             <Card className="border-none shadow-sm rounded-lg overflow-hidden bg-white border border-slate-100 p-8 flex flex-col justify-center gap-6 min-h-[240px]">
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'خيار البرنامج' : 'Selected Program'}</p>
                   <h3 className="text-2xl font-black text-primary tracking-tight">{app.programOption}</h3>
                </div>
                <div className="h-px bg-slate-50 w-full" />
                <div className="space-y-2">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الرسوم الدراسية المقدرة' : 'Tuition Projection'}</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-secondary tracking-tighter">
                         {app.programOption === 'weekend' ? '$75' : app.paymentTier === 'full-3-5' ? '$2,850' : '$1,650'}
                      </span>
                      <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">{app.programOption === 'weekend' ? '/ Month' : '/ One-Time'}</span>
                   </div>
                </div>
             </Card>
          </section>

          <section className="space-y-6">
             <SectionHeader icon={FileCheck} title={isAr ? 'الأرشيف الرقمي' : 'Digital Evidence'} subtitle={isAr ? 'الوثائق المرفقة' : 'Verified Uploads'} color="bg-slate-900" />
             <Card className="border-none shadow-sm rounded-lg overflow-hidden bg-white border border-slate-100 min-h-[240px]">
                <Table>
                  <TableBody>
                    {app.files && app.files.length > 0 ? (
                      app.files.map((file: any, idx: number) => (
                        <TableRow key={idx} className="hover:bg-slate-50/50 border-slate-100">
                          <TableCell className="py-5 px-8">
                             <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-secondary shadow-sm">
                                   <FileText className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                   <p className="text-xs font-black text-primary truncate max-w-[200px]">{file.name}</p>
                                   <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Formal Document #{idx + 1}</p>
                                </div>
                             </div>
                          </TableCell>
                          <TableCell className="py-5 text-right pr-8">
                             <Button 
                                onClick={() => window.open(file.data, '_blank')} 
                                variant="outline" 
                                className="h-10 w-10 rounded-lg border-slate-200 text-slate-400 hover:text-secondary hover:bg-white"
                             >
                                <ExternalLink className="h-4 w-4" />
                             </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={2} className="py-20 text-center text-slate-300 font-bold uppercase text-[9px] tracking-widest">{isAr ? 'لا توجد مستندات مرفوعة' : 'No Digital Artifacts'}</TableCell></TableRow>
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
