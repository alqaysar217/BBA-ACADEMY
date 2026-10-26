
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
  UserPlus
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
      // 1. Create Student records for each sibling in the application
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

      // 2. Update Enrollment status to approved
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-6">
           <div className="relative h-16 w-16">
              <div className="absolute inset-0 border-4 border-secondary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
           </div>
           <p className="text-xs font-black text-primary uppercase tracking-[0.3em] animate-pulse">
              {isAr ? 'جاري تحميل الطلب...' : 'Loading Record...'}
           </p>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-6 max-w-sm px-6">
           <div className="h-24 w-24 bg-white shadow-2xl rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 border border-slate-100">
              <FileText className="h-10 w-10" />
           </div>
           <h2 className="text-2xl font-black text-primary uppercase tracking-tight">{isAr ? 'الطلب غير موجود' : 'Record Not Found'}</h2>
           <Button onClick={() => router.back()} className="w-full bg-primary text-white rounded-2xl h-14 font-black">
              {isAr ? 'العودة للخلف' : 'Go Back'}
           </Button>
        </div>
      </div>
    );
  }

  const SectionHeader = ({ icon: Icon, title, subtitle, color = "bg-primary" }: { icon: any, title: string, subtitle: string, color?: string }) => (
    <div className="flex items-center gap-4 mb-6">
      <div className={cn("h-12 w-12 rounded-2xl text-white flex items-center justify-center shadow-lg", color)}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h2 className="text-xl font-black text-primary uppercase tracking-tight leading-none">{title}</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/30 pb-24">
      {/* 1. TOP STICKY HEADER */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => router.back()} 
                className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary hover:bg-white hover:shadow-xl transition-all border border-slate-100 flex items-center justify-center"
              >
                {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </button>
              <div className="space-y-0.5">
                <div className="flex items-center gap-3">
                   <h1 className="text-xl md:text-2xl font-black text-primary tracking-tight">{app.parent1Name}</h1>
                   <Badge className={cn(
                     "h-7 px-3 rounded-lg font-black uppercase text-[9px] tracking-widest border-none",
                     app.status === 'approved' ? "bg-green-100 text-green-600" : 
                     app.status === 'rejected' ? "bg-red-100 text-red-600" :
                     "bg-blue-100 text-blue-600"
                   )}>
                     {app.status}
                   </Badge>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Clock className="h-3 w-3" />
                   {isAr ? 'آخر تحديث:' : 'Last Update:'} {app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy · HH:mm') : '-'}
                </p>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-2xl h-12 border-slate-200 font-black text-xs uppercase tracking-widest">
                    <Layers className="h-4 w-4 mr-2" />
                    {isAr ? 'تغيير الحالة' : 'Status Action'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl p-2 min-w-[200px]">
                  <DropdownMenuItem onClick={() => updateStatus('reviewed')} className="font-bold text-primary">{isAr ? 'تمت المراجعة' : 'Mark Reviewed'}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateStatus('missing_docs')} className="font-bold text-amber-600">{isAr ? 'وثائق مفقودة' : 'Missing Documents'}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateStatus('rejected')} className="font-bold text-red-600">{isAr ? 'رفض الطلب' : 'Reject Application'}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                onClick={approveAndEnroll}
                disabled={isProcessing || app.status === 'approved'}
                className="rounded-2xl h-12 bg-primary hover:bg-secondary text-white font-black px-6 shadow-xl shadow-primary/10 transition-all gap-2"
              >
                {isProcessing ? <Clock className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                {isAr ? 'اعتماد وتسجيل الطالب' : 'Approve & Enroll'}
              </Button>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-12 space-y-16">
        
        {/* SECTION 1: GUARDIANS & ADDRESS HUB */}
        <section>
          <SectionHeader 
            icon={Users} 
            title={isAr ? 'بيانات العائلة والتواصل' : 'Family & Guardians Information'} 
            subtitle={isAr ? 'جدول الممثلين القانونيين وعنوان السكن المشترك' : 'Legal Representatives & Shared Residence'}
          />
          <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-100">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-16 text-center font-black text-[10px] uppercase text-slate-400">#</TableHead>
                  <TableHead className="font-black text-[10px] uppercase text-slate-400 px-6">{isAr ? 'اسم ولي الأمر' : 'Guardian Full Name'}</TableHead>
                  <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'رقم الهاتف' : 'Phone Number'}</TableHead>
                  <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</TableHead>
                  <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'القرابة' : 'Relationship'}</TableHead>
                  <TableHead className="font-black text-[10px] uppercase text-slate-400 text-right pr-8">{isAr ? 'الدور' : 'Role'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Parent 1 */}
                <TableRow className="hover:bg-slate-50/50 border-slate-50">
                  <TableCell className="text-center font-black text-slate-300 py-6">01</TableCell>
                  <TableCell className="px-6 font-black text-primary text-base">{app.parent1Name}</TableCell>
                  <TableCell className="font-bold text-slate-600" dir="ltr">{app.parent1Phone}</TableCell>
                  <TableCell className="font-bold text-slate-600">{app.parent1Email}</TableCell>
                  <TableCell><Badge variant="outline" className="bg-secondary/5 text-secondary border-none font-black text-[10px] uppercase">{app.relationship1}</Badge></TableCell>
                  <TableCell className="text-right pr-8"><Badge className="bg-primary text-white text-[8px] font-black uppercase">Primary</Badge></TableCell>
                </TableRow>
                
                {/* Parent 2 (If Exists) */}
                {app.parent2Name && (
                  <TableRow className="hover:bg-slate-50/50 border-slate-50">
                    <TableCell className="text-center font-black text-slate-300 py-6">02</TableCell>
                    <TableCell className="px-6 font-black text-primary text-base">{app.parent2Name}</TableCell>
                    <TableCell className="font-bold text-slate-600" dir="ltr">{app.parent2Phone}</TableCell>
                    <TableCell className="font-bold text-slate-600">{app.parent2Email}</TableCell>
                    <TableCell><Badge variant="outline" className="bg-slate-100 text-slate-400 border-none font-black text-[10px] uppercase">{app.relationship2}</Badge></TableCell>
                    <TableCell className="text-right pr-8"><Badge className="bg-slate-900 text-white text-[8px] font-black uppercase">Secondary</Badge></TableCell>
                  </TableRow>
                )}

                {/* Shared Address Row */}
                <TableRow className="bg-slate-50/50 border-none">
                  <TableCell colSpan={6} className="p-8">
                     <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                        <div className="flex items-center gap-3 shrink-0">
                           <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary">
                              <MapPin className="h-5 w-5" />
                           </div>
                           <span className="font-black text-primary uppercase text-xs tracking-widest">{isAr ? 'عنوان السكن المشترك:' : 'Shared Residence Address:'}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500">
                           <div className="px-4 py-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-[10px] text-slate-300 uppercase block mb-0.5">{isAr ? 'العنوان' : 'Line 1'}</span>
                              {app.address?.line1} {app.address?.line2}
                           </div>
                           <div className="px-4 py-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-[10px] text-slate-300 uppercase block mb-0.5">{isAr ? 'المدينة والولاية' : 'City, State'}</span>
                              {app.address?.city}, {app.address?.state} {app.address?.zip}
                           </div>
                        </div>
                     </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* SECTION 2: STUDENT ROSTER */}
        <section>
           <SectionHeader 
              icon={GraduationCap} 
              title={isAr ? 'سجل الطلاب المشمولين' : 'Student Academic Roster'} 
              subtitle={isAr ? 'البيانات الشخصية والأكاديمية المفصلة لكافة الأبناء' : 'Comprehensive Profiles for Enrolled Siblings'}
              color="bg-secondary"
            />
            <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white">
              <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-100">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-16 text-center font-black text-[10px] uppercase text-slate-400">#</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 px-6">{isAr ? 'الاسم بالكامل' : 'Full Name'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'الجنس' : 'Gender'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'تاريخ الميلاد' : 'D.O.B'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'حالة الطالب' : 'Status'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'التواصل' : 'Contact'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 text-right pr-8">{isAr ? 'المستوى' : 'Grade'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {app.students?.map((student: any, idx: number) => (
                    <TableRow key={idx} className="hover:bg-slate-50/50 border-slate-50 group">
                      <TableCell className="text-center font-black text-slate-300 py-6">{idx + 1}</TableCell>
                      <TableCell className="px-6 font-black text-primary text-base">
                        {student.firstName} {student.middleName} {student.lastName}
                      </TableCell>
                      <TableCell>
                         {student.gender === 'Male' ? (isAr ? 'ذكر' : 'Male') : (isAr ? 'أنثى' : 'Female')}
                      </TableCell>
                      <TableCell className="font-bold text-slate-600 text-xs">{student.dob}</TableCell>
                      <TableCell>
                        <Badge className="bg-secondary/10 text-secondary border-none font-black text-[9px] uppercase">
                           {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[10px] font-bold text-slate-600" dir="ltr">
                        {student.phone}
                      </TableCell>
                      <TableCell className="text-right pr-8 font-black text-primary">
                        Grade {student.lastGrade}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
        </section>

        {/* SECTION 3: PROGRAM & ATTACHMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
             <SectionHeader icon={Briefcase} title={isAr ? 'البرنامج التعليمي' : 'Academic Program'} subtitle={isAr ? 'المسار والخيارات المالية' : 'Selected Track & Financials'} />
             <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white">
                <Table>
                  <TableBody>
                    <TableRow className="hover:bg-transparent border-slate-50">
                      <TableCell className="w-1/3 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 pl-8">{isAr ? 'نوع البرنامج' : 'Program Option'}</TableCell>
                      <TableCell className="font-black text-primary text-lg py-6">{app.programOption}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-none">
                      <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 pl-8">{isAr ? 'الرسوم المقدرة' : 'Tuition Projection'}</TableCell>
                      <TableCell className="py-6">
                        <span className="font-black text-secondary text-4xl">
                           {app.programOption === 'weekend' ? '$75' : app.paymentTier === 'full-3-5' ? '$2,850' : '$1,650'}
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
             </Card>
          </section>

          <section>
             <SectionHeader icon={FileCheck} title={isAr ? 'المستندات المرفوعة' : 'Uploaded Files'} subtitle={isAr ? 'الوثائق الرسمية للطلب' : 'Digital PDF & Image Evidence'} color="bg-slate-900" />
             <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white h-full min-h-[200px]">
                <Table>
                  <TableBody>
                    {app.files && app.files.length > 0 ? (
                      app.files.map((file: any, idx: number) => (
                        <TableRow key={idx} className="hover:bg-slate-50/50 border-slate-50">
                          <TableCell className="py-5 px-8">
                             <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-secondary"><FileText className="h-5 w-5" /></div>
                                <p className="text-xs font-black text-primary truncate max-w-[200px]">{file.name}</p>
                             </div>
                          </TableCell>
                          <TableCell className="py-5 text-right pr-8">
                             <div className="flex justify-end gap-2">
                                <button onClick={() => window.open(file.data, '_blank')} className="h-9 w-9 rounded-xl bg-slate-50 text-slate-400 hover:text-secondary flex items-center justify-center border border-slate-100"><ExternalLink className="h-4 w-4" /></button>
                             </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={2} className="py-20 text-center text-slate-300 font-bold uppercase text-[10px]">{isAr ? 'لا توجد مرفقات' : 'No files found'}</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
             </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
