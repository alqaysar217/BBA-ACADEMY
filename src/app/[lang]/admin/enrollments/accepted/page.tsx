
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, setDoc, serverTimestamp, getDocs, where } from 'firebase/firestore';
import { 
  UserCheck, 
  Search, 
  BadgeCheck, 
  GraduationCap, 
  ChevronRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  UserPlus,
  Mail,
  Phone,
  ArrowRight,
  ShieldAlert,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function AcceptedStudentsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Fetch all enrollments to extract students with 'Accepted' status
  const enrollmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: enrollments, loading } = useCollection(enrollmentsQuery);

  // Flatten logic: Extract only accepted students
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
              parentEmail: app.parent1Email,
              parentPhone: app.parent1Phone,
              address: app.address,
              programOption: app.programOption,
              paymentTier: app.paymentTier,
              studentIndex: idx, // To target the specific array element in the enrollment doc
              fullAppData: app
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

  // Action: Revert Acceptance (Undo)
  const handleRevertStatus = async (student: any) => {
    if (!firestore || student.isEnrolled) return;
    
    const confirmMsg = isAr 
      ? `هل أنت متأكد من إلغاء قبول الطالب "${student.firstName}" وإعادته لحالة "قيد المراجعة"؟` 
      : `Are you sure you want to revert "${student.firstName}" back to "Pending Review"?`;
    
    if (!window.confirm(confirmMsg)) return;

    const actionId = `revert-${student.appId}-${student.studentIndex}`;
    setIsProcessing(actionId);

    const appRef = doc(firestore, 'enrollments', student.appId);
    const updatedStudents = [...student.fullAppData.students];
    updatedStudents[student.studentIndex].status = 'Pending';
    
    const updateData = {
      students: updatedStudents,
      updatedAt: serverTimestamp()
    };

    updateDoc(appRef, updateData)
      .then(() => {
        toast({ title: isAr ? "تم التراجع عن القبول بنجاح" : "Acceptance Reverted Successfully" });
      })
      .catch(async (err) => {
        const pError = new FirestorePermissionError({
          path: appRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', pError);
      })
      .finally(() => setIsProcessing(null));
  };

  // Action: Direct Provision (Enrollment)
  const handleProvisionStudent = async (student: any) => {
    if (!firestore || student.isEnrolled) return;
    
    const actionId = `provision-${student.appId}-${student.studentIndex}`;
    setIsProcessing(actionId);

    const enrollmentId = student.appId;
    const studentIdx = student.studentIndex;
    const studentIdStr = `${enrollmentId}-${studentIdx}`;

    try {
      // Check if already exists in active students registry
      const q = query(collection(firestore, 'students'), where('enrollmentRef', '==', studentIdStr));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        toast({ variant: "destructive", title: "Record already exists in Registry" });
        setIsProcessing(null);
        return;
      }

      // Create new student document
      const newStudentDoc = doc(collection(firestore, 'students'));
      const studentData = {
        firstName: student.firstName,
        middleName: student.middleName || '',
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        gender: student.gender,
        dob: student.dob,
        gradeLevel: student.lastGrade,
        entryType: student.entryType || 'New Student',
        enrollmentId: enrollmentId,
        enrollmentRef: studentIdStr,
        parentId: student.fullAppData.userId || 'anonymous',
        parentName: student.parentName,
        parentEmail: student.parentEmail,
        parentPhone: student.parentPhone,
        address: student.address,
        programOption: student.programOption,
        status: 'active',
        academicPlan: { progress: 0, courses: [] },
        financialLedger: {
           totalDue: student.programOption === 'weekend' ? 75 : (student.paymentTier === 'full-3-5' ? 2850 : 1650),
           totalPaid: 0,
           payments: []
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(newStudentDoc, studentData);

      // Update enrollment status
      const appRef = doc(firestore, 'enrollments', enrollmentId);
      const updatedStudents = [...student.fullAppData.students];
      updatedStudents[studentIdx].isEnrolled = true;
      
      await updateDoc(appRef, { students: updatedStudents, updatedAt: serverTimestamp() });

      toast({ title: isAr ? "تم تفعيل حساب الطالب بنجاح" : "Student Provisioned Successfully" });
    } catch (err: any) {
      console.error(err);
      toast({ variant: "destructive", title: "Provisioning Error", description: err.message });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* 1. Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <UserCheck className="h-8 w-8 text-secondary" />
               {isAr ? 'إدارة الطلاب المقبولين' : 'Accepted Students Board'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'المرحلة النهائية لتفعيل ملفات الطلاب وتثبيت قبولهم' : 'Final stage for student onboarding and registry activation'}</p>
         </div>
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 transition-colors group-focus-within:text-secondary" />
            <Input 
               placeholder={isAr ? 'بحث عن طالب مقبل...' : 'Search approved candidates...'} 
               className="pl-12 h-14 rounded-2xl bg-white border-slate-100 font-bold text-sm shadow-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      {/* 2. Key Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="border-none shadow-premium rounded-2xl bg-primary text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><UserCheck className="h-20 w-20" /></div>
            <CardContent className="p-6 space-y-1 relative z-10">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Accepted</p>
               <h3 className="text-3xl font-black">{acceptedList.length}</h3>
            </CardContent>
         </Card>
         <Card className="border-none shadow-premium rounded-2xl bg-amber-500 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Clock className="h-20 w-20" /></div>
            <CardContent className="p-6 space-y-1 relative z-10">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Ready for Activation</p>
               <h3 className="text-3xl font-black">{acceptedList.filter(s => !s.isEnrolled).length}</h3>
            </CardContent>
         </Card>
         <Card className="border-none shadow-premium rounded-2xl bg-green-600 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><BadgeCheck className="h-20 w-20" /></div>
            <CardContent className="p-6 space-y-1 relative z-10">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Fully Enrolled</p>
               <h3 className="text-3xl font-black">{acceptedList.filter(s => s.isEnrolled).length}</h3>
            </CardContent>
         </Card>
         <Card className="border-none shadow-premium rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-6 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => router.push(`/${lang}/admin/students`)}>
            <div className="text-center">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">View Active Registry</p>
               <div className="flex items-center justify-center gap-2 text-primary font-black uppercase text-xs">
                  Student Roster <ArrowRight className="h-4 w-4" />
               </div>
            </div>
         </Card>
      </div>

      {/* 3. Main Actionable List */}
      <Card className="border-none shadow-premium rounded-[2rem] bg-white overflow-hidden border border-slate-100">
         <div className="overflow-x-auto">
            <table className="w-full border-collapse">
               <thead>
                  <tr className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                     <th className="px-8 py-6 text-left">{isAr ? 'بيانات الطالب' : 'Candidate Details'}</th>
                     <th className="px-8 py-6 text-center">{isAr ? 'ولي الأمر' : 'Guardian'}</th>
                     <th className="px-8 py-6 text-center">{isAr ? 'البرنامج والمستوى' : 'Track & Level'}</th>
                     <th className="px-8 py-6 text-center">{isAr ? 'حالة الملف' : 'Registry Status'}</th>
                     <th className="px-8 py-6 text-right pr-10">{isAr ? 'إجراءات تفعيل الملف' : 'Onboarding Actions'}</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {loading ? (
                     [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={5} className="h-28 bg-slate-50/50" /></tr>)
                  ) : filteredList.length === 0 ? (
                     <tr>
                        <td colSpan={5} className="py-32 text-center space-y-4">
                           <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
                              <ShieldAlert className="h-10 w-10 text-slate-200" />
                           </div>
                           <p className="text-slate-300 font-black uppercase text-xs tracking-widest">No accepted candidates waiting for activation</p>
                        </td>
                     </tr>
                  ) : filteredList.map((st, idx) => {
                     const isWorking = isProcessing === `provision-${st.appId}-${st.studentIndex}` || isProcessing === `revert-${st.appId}-${st.studentIndex}`;
                     
                     return (
                        <tr key={`${st.appId}-${idx}`} className="hover:bg-slate-50/30 transition-all group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className={cn(
                                    "h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:scale-110",
                                    st.isEnrolled ? "bg-green-100 text-green-600" : "bg-primary text-white"
                                 )}>
                                    {st.firstName?.charAt(0)}
                                 </div>
                                 <div className="space-y-0.5">
                                    <h4 className="text-base font-black text-slate-900 leading-tight">{st.firstName} {st.lastName}</h4>
                                    <div className="flex items-center gap-3">
                                       <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Mail className="h-3 w-3" /> {st.email}</span>
                                       <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1" dir="ltr"><Phone className="h-3 w-3" /> {st.phone}</span>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <p className="text-xs font-black text-primary">{st.parentName}</p>
                              <div className="flex items-center justify-center gap-1.5 mt-1">
                                 <Badge variant="outline" className="text-[8px] font-bold border-slate-100 bg-slate-50">REF: {st.appId}</Badge>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <div className="space-y-1.5">
                                 <Badge className="bg-secondary text-white border-none font-black text-[9px] uppercase px-3 py-1 rounded-full">{st.programOption}</Badge>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GRADE {st.lastGrade}</p>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              {st.isEnrolled ? (
                                 <div className="inline-flex flex-col items-center gap-1 text-green-600">
                                    <BadgeCheck className="h-6 w-6" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Enrolled</span>
                                 </div>
                              ) : (
                                 <div className="inline-flex flex-col items-center gap-1 text-amber-500 animate-pulse">
                                    <Clock className="h-6 w-6" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Pending Registry</span>
                                 </div>
                              )}
                           </td>
                           <td className="px-8 py-6 text-right pr-10">
                              <div className="flex justify-end gap-3">
                                 {!st.isEnrolled ? (
                                    <>
                                       <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          onClick={() => handleRevertStatus(st)}
                                          disabled={!!isProcessing}
                                          className="h-11 px-4 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 font-black text-[10px] uppercase gap-2"
                                       >
                                          <RotateCcw className="h-4 w-4" />
                                          {isAr ? 'تراجع' : 'Undo'}
                                       </Button>
                                       <Button 
                                          onClick={() => handleProvisionStudent(st)}
                                          disabled={!!isProcessing}
                                          className="h-11 px-6 rounded-xl bg-primary text-white font-black text-[10px] uppercase gap-2 shadow-xl shadow-primary/10 active:scale-95 transition-all"
                                       >
                                          {isProcessing === `provision-${st.appId}-${st.studentIndex}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4 text-secondary" />}
                                          {isAr ? 'تفعيل ملف الطالب' : 'Provision Student'}
                                       </Button>
                                    </>
                                 ) : (
                                    <Button 
                                       asChild
                                       variant="outline"
                                       className="h-11 px-6 rounded-xl border-slate-100 font-black text-[10px] uppercase gap-2 hover:bg-slate-50 transition-all"
                                    >
                                       <Link href={`/${lang}/admin/enrollments/${st.appId}`}>
                                          <ExternalLink className="h-4 w-4 text-secondary" />
                                          {isAr ? 'عرض الاستمارة' : 'View Application'}
                                       </Link>
                                    </Button>
                                 )}
                              </div>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </Card>

      {/* 4. Footer Guide */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldAlert className="h-32 w-32" /></div>
         <div className="space-y-2 relative z-10">
            <h3 className="text-xl font-black uppercase tracking-tight">{isAr ? 'كيف تعمل هذه الواجهة؟' : 'Onboarding Workflow'}</h3>
            <p className="text-sm font-medium text-white/60 max-w-2xl leading-relaxed italic">
               {isAr 
                 ? 'تعرض هذه الصفحة الطلاب الذين اجتازوا مراجعة اللجنة الأكاديمية بنجاح. تفعيل ملف الطالب (Provisioning) يقوم بنقل بياناته آلياً إلى سجل الطلاب النشطين ويهيئ سجلاته المالية والأكاديمية للبدء الفوري.' 
                 : 'This board displays students approved by the Academic Committee. Provisioning a student automatically migrates their data to the Active Registry and initializes their financial and academic ledgers for immediate start.'}
            </p>
         </div>
         <div className="shrink-0 relative z-10">
            <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl border border-white/5 backdrop-blur-md">
               <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isAr ? 'النظام جاهز للتفعيل' : 'Ready for Registry Sync'}</span>
            </div>
         </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
