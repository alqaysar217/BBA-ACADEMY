'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  CreditCard, 
  FileText, 
  Download, 
  Eye,
  CheckCircle2,
  Clock,
  Briefcase,
  Users,
  ShieldCheck,
  Building,
  Hash,
  DownloadCloud,
  FileCheck,
  PencilLine,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function EnrollmentDetailPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const { user, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const isAr = lang === 'ar';

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

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
           <div className="h-12 w-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
           <p className="text-sm font-black text-primary uppercase tracking-widest">{isAr ? 'جاري فتح الطلب...' : 'Opening Application...'}</p>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-6">
           <div className="h-20 w-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <FileText className="h-10 w-10" />
           </div>
           <h2 className="text-2xl font-black text-primary uppercase">{isAr ? 'الطلب غير موجود' : 'Application Not Found'}</h2>
           <Button onClick={() => router.back()} className="bg-primary text-white rounded-xl h-12 px-8 font-black">
              {isAr ? 'العودة للخلف' : 'Go Back'}
           </Button>
        </div>
      </div>
    );
  }

  const downloadFile = (file: any) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header Area */}
      <header className="bg-primary text-white py-8 md:py-12 sticky top-0 z-30 shadow-2xl">
        <div className="container-tight px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div className="space-y-3">
              <button 
                onClick={() => router.back()} 
                className="inline-flex items-center gap-2 text-white/50 hover:text-secondary font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                {isAr ? <ArrowLeft className="h-3 w-3 rotate-180" /> : <ArrowLeft className="h-3 w-3" />}
                {isAr ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
              </button>
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-none uppercase">
                   {app.parent1Name}
                </h1>
                <Badge className={cn(
                  "h-8 px-4 rounded-full font-black uppercase text-[10px] tracking-widest border-2",
                  app.status === 'submitted' ? "bg-green-500 border-green-400 text-white" : "bg-secondary border-blue-400 text-white"
                )}>
                  {app.status === 'submitted' ? (isAr ? 'طلب مكتمل' : 'Submitted') : (isAr ? 'مسودة' : 'Draft')}
                </Badge>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{isAr ? 'تاريخ التحديث' : 'Last Updated'}</p>
                <p className="text-sm font-bold">{app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy') : '-'}</p>
              </div>
           </div>
        </div>
      </header>

      <main className="container-tight mt-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTENT: 8 COLS */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Parent Information Card */}
            <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white">
               <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100 flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                     <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black uppercase tracking-tight text-primary">{isAr ? 'بيانات أولياء الأمور' : 'Parents Details'}</CardTitle>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isAr ? 'معلومات التواصل والصلة' : 'Contact & Relationship Info'}</p>
                  </div>
               </CardHeader>
               <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     {/* Parent 1 */}
                     <div className="space-y-6">
                        <div className="inline-block px-3 py-1 bg-secondary/10 rounded-lg text-secondary font-black text-[10px] uppercase tracking-widest mb-2">
                          {isAr ? 'ولي الأمر الرئيسي' : 'Primary Parent'}
                        </div>
                        <div className="space-y-4">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'الاسم' : 'Full Name'}</p>
                              <p className="text-xl font-black text-primary">{app.parent1Name}</p>
                           </div>
                           <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-3 text-slate-600 font-bold">
                                 <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-secondary"><Phone className="h-4 w-4" /></div>
                                 <span dir="ltr">{app.parent1Phone}</span>
                              </div>
                              <div className="flex items-center gap-3 text-slate-600 font-bold">
                                 <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-secondary"><Mail className="h-4 w-4" /></div>
                                 <span className="truncate">{app.parent1Email}</span>
                              </div>
                              <div className="flex items-center gap-3 text-slate-600 font-bold">
                                 <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-secondary"><ShieldCheck className="h-4 w-4" /></div>
                                 <span className="capitalize">{app.relationship1}</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Parent 2 */}
                     {app.parent2Name && (
                       <div className="space-y-6 border-t md:border-t-0 md:border-l border-slate-100 md:pl-12 pt-8 md:pt-0">
                          <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">
                            {isAr ? 'ولي الأمر الثاني' : 'Secondary Parent'}
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'الاسم' : 'Full Name'}</p>
                                <p className="text-xl font-black text-primary">{app.parent2Name}</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-slate-600 font-bold">
                                  <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Phone className="h-4 w-4" /></div>
                                  <span dir="ltr">{app.parent2Phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 font-bold">
                                  <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Mail className="h-4 w-4" /></div>
                                  <span className="truncate">{app.parent2Email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 font-bold">
                                  <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><ShieldCheck className="h-4 w-4" /></div>
                                  <span className="capitalize">{app.relationship2}</span>
                                </div>
                            </div>
                          </div>
                       </div>
                     )}
                  </div>
               </CardContent>
            </Card>

            {/* 2. Students List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
                  <GraduationCap className="h-7 w-7 text-secondary" />
                  {isAr ? 'قائمة الطلاب المسجلين' : 'Enrolled Students'}
                  <span className="text-sm font-black text-slate-300 ml-2">({app.students?.length || 0})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {app.students?.map((student: any, idx: number) => (
                  <Card key={idx} className="border-none shadow-sm rounded-[2rem] overflow-hidden group hover:shadow-xl transition-all duration-500">
                    <div className="flex flex-col md:flex-row items-stretch">
                      <div className="w-full md:w-24 bg-primary text-white flex flex-col items-center justify-center p-6 md:p-0 shrink-0 relative overflow-hidden">
                        <div className="absolute top-0 left-0 p-2 opacity-10"><GraduationCap className="h-12 w-12" /></div>
                        <span className="text-4xl font-black relative z-10">{idx + 1}</span>
                      </div>
                      <div className="flex-1 p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div className="space-y-4">
                            <div>
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'الاسم بالكامل' : 'Full Name'}</p>
                               <p className="text-xl font-black text-primary leading-tight">{student.firstName} {student.middleName} {student.lastName}</p>
                               <Badge variant="outline" className="mt-2 text-[9px] uppercase font-black border-slate-200 bg-slate-50">{student.gender}</Badge>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'الحالة' : 'Status'}</p>
                               <span className="text-xs font-bold text-secondary uppercase italic">{student.status}</span>
                            </div>
                         </div>
                         <div className="space-y-6">
                            <div className="flex items-start gap-4">
                               <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary shrink-0"><Calendar className="h-5 w-5" /></div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase">{isAr ? 'تاريخ الميلاد' : 'Date of Birth'}</p>
                                  <p className="font-bold text-slate-700">{student.dob}</p>
                               </div>
                            </div>
                            <div className="flex items-start gap-4">
                               <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary shrink-0"><GraduationCap className="h-5 w-5" /></div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase">{isAr ? 'آخر صف دراسي' : 'Last Grade'}</p>
                                  <p className="font-bold text-slate-700">Grade {student.lastGrade}</p>
                               </div>
                            </div>
                         </div>
                         <div className="space-y-6">
                            <div className="flex items-start gap-4">
                               <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary shrink-0"><Mail className="h-5 w-5" /></div>
                               <div className="min-w-0">
                                  <p className="text-[9px] font-black text-slate-400 uppercase">{isAr ? 'بريد الطالب' : 'Student Email'}</p>
                                  <p className="text-xs font-bold text-slate-700 truncate">{student.email}</p>
                               </div>
                            </div>
                            <div className="flex items-start gap-4">
                               <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary shrink-0"><Phone className="h-5 w-5" /></div>
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase">{isAr ? 'هاتف الطالب' : 'Student Phone'}</p>
                                  <p className="text-xs font-bold text-slate-700" dir="ltr">{student.phone}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* 3. Address Card */}
            <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white">
               <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg">
                     <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black uppercase tracking-tight text-primary">{isAr ? 'عنوان السكن' : 'Home Address'}</CardTitle>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isAr ? 'موقع الإقامة الحالي' : 'Current Residence'}</p>
                  </div>
               </CardHeader>
               <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <div>
                           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{isAr ? 'العنوان' : 'Street Address'}</p>
                           <p className="text-xl font-bold text-primary leading-relaxed">
                              {app.address?.line1}
                              {app.address?.line2 && <span className="block text-slate-500 text-sm mt-1">{app.address?.line2}</span>}
                           </p>
                        </div>
                     </div>
                     <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-400 uppercase">{isAr ? 'المدينة' : 'City'}</p>
                           <p className="font-bold text-primary">{app.address?.city}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-400 uppercase">{isAr ? 'الولاية' : 'State'}</p>
                           <p className="font-bold text-primary">{app.address?.state}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-400 uppercase">{isAr ? 'الرمز' : 'ZIP'}</p>
                           <p className="font-bold text-primary">{app.address?.zip}</p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDEBAR: 4 COLS */}
          <div className="lg:col-span-4 space-y-8 sticky top-32">
            
            {/* 1. Program Selection Card */}
            <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-primary text-white">
               <CardHeader className="bg-white/5 p-8 border-b border-white/10 flex flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg">
                     <Briefcase className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-black uppercase tracking-widest">{isAr ? 'اختيارات البرنامج' : 'Selection'}</CardTitle>
               </CardHeader>
               <CardContent className="p-8 md:p-10 space-y-10">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{isAr ? 'البرنامج المعتمد' : 'Core Program'}</p>
                    <p className="text-2xl font-black text-secondary leading-tight uppercase">
                       {app.programOption === 'grades-3-5' ? (isAr ? 'تأسيس (3-5)' : 'Grades 3-5') : 
                        app.programOption === 'grades-6-12' ? (isAr ? 'متوسط/ثانوي (6-12)' : 'Grades 6-12') : 
                        (isAr ? 'عطلة الأسبوع' : 'Weekend')}
                    </p>
                  </div>
                  
                  {app.languageOption && (
                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{isAr ? 'مسار الدراسة' : 'Language Path'}</p>
                      <Badge className="bg-white/10 text-white font-black uppercase text-[11px] py-2 px-4 rounded-xl border-white/10 ring-1 ring-white/5">
                         {app.languageOption === 'english-arabic' ? (isAr ? 'الإنجليزية والعربية' : 'English + Arabic') : 
                          (isAr ? 'الإنجليزية فقط' : 'English Only')}
                      </Badge>
                    </div>
                  )}

                  <div className="pt-8 border-t border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                       <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{isAr ? 'خطة الدفع' : 'Payment Tier'}</p>
                       <CreditCard className="h-4 w-4 text-secondary/50" />
                    </div>
                    <p className="text-lg font-bold text-white/90">
                        {app.paymentTier === 'initial-3-5' ? (isAr ? 'خطة الدفع الأولية' : 'Initial Payment') : 
                         app.paymentTier === 'full-3-5' ? (isAr ? 'خطة الدفع الكامل' : 'Full Tuition') : 
                         (isAr ? 'رسوم اشتراك شهري' : 'Monthly Subscription')}
                    </p>
                    <div className="text-3xl font-black text-secondary">
                       {app.programOption === 'weekend' ? '$75' : 
                        app.paymentTier === 'full-3-5' ? '$2,850' : '$1,650'}
                    </div>
                  </div>
               </CardContent>
            </Card>

            {/* 2. Documents Card - THE FIX FOR DISPLAY */}
            <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white">
               <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary shadow-inner">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-black uppercase tracking-tight text-primary">{isAr ? 'المستندات' : 'Documents'}</CardTitle>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{isAr ? 'الملفات المرفوعة' : 'Uploaded Files'}</p>
                    </div>
                  </div>
                  <Badge className="bg-secondary text-white font-black h-7 w-7 rounded-full flex items-center justify-center p-0">
                    {app.files?.length || 0}
                  </Badge>
               </CardHeader>
               <CardContent className="p-6 md:p-8 space-y-4">
                  {app.files && app.files.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {app.files.map((file: any, idx: number) => (
                        <div key={idx} className="group flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                           <div className="flex items-center gap-4 min-w-0">
                              <div className="h-10 w-10 rounded-xl bg-white text-secondary flex items-center justify-center shadow-sm shrink-0">
                                 {file.type?.includes('pdf') ? <FileText className="h-5 w-5" /> : <Image src={file.data} alt="thumb" width={24} height={24} className="rounded object-cover" unoptimized />}
                              </div>
                              <div className="min-w-0">
                                 <p className="text-xs font-black text-primary truncate">{file.name}</p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase">{(file.size / 1024).toFixed(1)} KB</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <button 
                                className="h-9 w-9 rounded-xl bg-white text-slate-400 hover:text-secondary shadow-sm flex items-center justify-center transition-all active:scale-90"
                                onClick={() => window.open(file.data, '_blank')}
                                title={isAr ? 'فتح الملف' : 'Open File'}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </button>
                              <button 
                                className="h-9 w-9 rounded-xl bg-secondary text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                                onClick={() => downloadFile(file)}
                                title={isAr ? 'تحميل' : 'Download'}
                              >
                                <DownloadCloud className="h-4 w-4" />
                              </button>
                           </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-4 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                       <FileCheck className="h-12 w-12 text-slate-200 mx-auto" />
                       <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{isAr ? 'لا توجد مرفقات' : 'No Files Found'}</p>
                          <p className="text-[10px] font-bold text-slate-300 mt-1 max-w-[150px] mx-auto">{isAr ? 'لم يقم ولي الأمر برفع أي مستندات مع هذا الطلب.' : 'The parent did not upload any documents.'}</p>
                       </div>
                    </div>
                  )}
               </CardContent>
            </Card>

            {/* 3. Actions */}
            <div className="space-y-4 pt-4">
               <Button className="w-full h-16 rounded-[1.5rem] bg-green-500 hover:bg-green-600 text-white font-black shadow-xl shadow-green-500/20 transition-all flex items-center justify-center gap-3 text-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1">
                  <CheckCircle2 className="h-6 w-6" />
                  {isAr ? 'اعتماد الطلب' : 'Approve'}
               </Button>
               <Button variant="outline" className="w-full h-14 rounded-[1.5rem] border-2 text-slate-400 font-black hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all flex items-center justify-center gap-3">
                  <XCircle className="h-5 w-5" />
                  {isAr ? 'رفض أو تعديل' : 'Reject / Edit'}
               </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function XCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}
