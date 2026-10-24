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
  PencilLine
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

  // تثبيت المرجع لمنع الدوران اللانهائي (Infinite Loop Fix)
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
      <header className="bg-primary text-white py-10 sticky top-0 z-30 shadow-2xl">
        <div className="container-tight px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div className="space-y-2">
              <button 
                onClick={() => router.back()} 
                className="inline-flex items-center gap-2 text-white/60 hover:text-secondary font-black text-xs uppercase tracking-widest transition-colors"
              >
                {isAr ? <ArrowLeft className="h-4 w-4 rotate-180" /> : <ArrowLeft className="h-4 w-4" />}
                {isAr ? 'العودة للقائمة' : 'Back to Dashboard'}
              </button>
              <h1 className="text-3xl font-black tracking-tight flex items-center gap-4">
                 {app.parent1Name}
                 <Badge className="bg-secondary text-white font-black uppercase text-[10px]">
                    {app.programOption === 'grades-3-5' ? (isAr ? 'تأسيس' : 'Grades 3-5') : 
                     app.programOption === 'grades-6-12' ? (isAr ? 'متوسط/ثانوي' : 'Grades 6-12') : 
                     (isAr ? 'عطلة الأسبوع' : 'Weekend')}
                 </Badge>
              </h1>
           </div>
           
           <div className="flex items-center gap-3">
              <Badge className={cn(
                "h-10 px-4 rounded-xl font-black uppercase tracking-widest flex items-center gap-2",
                app.status === 'submitted' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-white/10 text-white border-white/20"
              )}>
                 {app.status === 'submitted' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4 text-secondary" />}
                 {app.status === 'submitted' ? (isAr ? 'تم الإرسال' : 'Submitted') : (isAr ? 'مسودة' : 'Draft')}
              </Badge>
           </div>
        </div>
      </header>

      <main className="container-tight mt-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Personal Data */}
          <div className="lg:col-span-2 space-y-8">
            {/* Parents Card */}
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
               <CardHeader className="border-b border-slate-100 p-6 flex flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                     <Users className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">{isAr ? 'بيانات أولياء الأمور' : 'Parents Information'}</CardTitle>
               </CardHeader>
               <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'ولي الأمر الأول' : 'Parent 1 (Primary)'}</p>
                        <p className="text-lg font-black text-primary">{app.parent1Name}</p>
                        <div className="flex flex-col gap-2 mt-2">
                           <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                              <Phone className="h-4 w-4 text-secondary" /> {app.parent1Phone}
                           </div>
                           <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                              <Mail className="h-4 w-4 text-secondary" /> {app.parent1Email}
                           </div>
                           <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                              <ShieldCheck className="h-4 w-4 text-secondary" /> {app.relationship1}
                           </div>
                        </div>
                     </div>
                  </div>
                  {app.parent2Name && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'ولي الأمر الثاني' : 'Parent 2'}</p>
                          <p className="text-lg font-black text-primary">{app.parent2Name}</p>
                          <div className="flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                <Phone className="h-4 w-4 text-secondary" /> {app.parent2Phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                <Mail className="h-4 w-4 text-secondary" /> {app.parent2Email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                <ShieldCheck className="h-4 w-4 text-secondary" /> {app.relationship2}
                            </div>
                          </div>
                      </div>
                    </div>
                  )}
               </CardContent>
            </Card>

            {/* Address Card */}
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
               <CardHeader className="border-b border-slate-100 p-6 flex flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                     <MapPin className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">{isAr ? 'عنوان السكن' : 'Home Address'}</CardTitle>
               </CardHeader>
               <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'العنوان الرئيسي' : 'Line 1'}</p>
                           <p className="font-bold text-primary">{app.address?.line1}</p>
                        </div>
                        {app.address?.line2 && (
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'السطر الثاني' : 'Line 2'}</p>
                            <p className="font-bold text-primary">{app.address?.line2}</p>
                          </div>
                        )}
                     </div>
                     <div className="grid grid-cols-3 gap-4">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'المدينة' : 'City'}</p>
                           <p className="font-bold text-primary">{app.address?.city}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'الولاية' : 'State'}</p>
                           <p className="font-bold text-primary">{app.address?.state}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'الرمز' : 'ZIP'}</p>
                           <p className="font-bold text-primary">{app.address?.zip}</p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Students List */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-primary uppercase tracking-tight px-2">{isAr ? 'قائمة الطلاب' : 'Registered Students'} ({app.students?.length || 0})</h3>
              {app.students?.map((student: any, idx: number) => (
                <Card key={idx} className="border-none shadow-sm rounded-3xl overflow-hidden group">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-20 bg-primary text-white flex items-center justify-center font-black text-2xl p-6 md:p-0 shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الاسم بالكامل' : 'Full Name'}</p>
                          <p className="text-lg font-black text-primary leading-tight">{student.firstName} {student.middleName} {student.lastName}</p>
                          <Badge variant="outline" className="mt-2 text-[9px] uppercase font-black">{student.gender}</Badge>
                       </div>
                       <div className="space-y-4">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'تاريخ الميلاد' : 'Date of Birth'}</p>
                            <p className="font-bold text-slate-700 flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-secondary" /> {student.dob}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'المرحلة الدراسية' : 'Last Grade'}</p>
                            <p className="font-bold text-slate-700 flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5 text-secondary" /> Grade {student.lastGrade}</p>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'البريد الإلكتروني' : 'Student Email'}</p>
                            <p className="text-sm font-bold text-slate-700 break-all">{student.email}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'الهاتف' : 'Student Phone'}</p>
                            <p className="text-sm font-bold text-slate-700">{student.phone}</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Selections & Files */}
          <div className="space-y-8">
            {/* Program Selection Card */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-primary text-white">
               <CardHeader className="bg-white/5 border-b border-white/10 p-6">
                  <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
                     <Briefcase className="h-5 w-5 text-secondary" />
                     {isAr ? 'اختيارات البرنامج' : 'Program Selection'}
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-8 space-y-8">
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">{isAr ? 'البرنامج الأساسي' : 'Core Program'}</p>
                    <p className="text-xl font-black text-secondary uppercase leading-tight">
                       {app.programOption === 'grades-3-5' ? (isAr ? 'تأسيس (3-5)' : 'Grades 3-5 Remote') : 
                        app.programOption === 'grades-6-12' ? (isAr ? 'متوسط/ثانوي (6-12)' : 'Grades 6-12 Remote') : 
                        (isAr ? 'برنامج عطلة الأسبوع' : 'Weekend Program')}
                    </p>
                  </div>
                  
                  {app.languageOption && (
                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">{isAr ? 'مسار الدراسة' : 'Study Path'}</p>
                      <Badge className="bg-white/10 text-white font-black uppercase text-[11px] p-2 rounded-lg border-white/20">
                         {app.languageOption === 'english-arabic' ? (isAr ? 'الإنجليزية والعربية' : 'English + Arabic') : 
                          (isAr ? 'الإنجليزية فقط' : 'English Only')}
                      </Badge>
                    </div>
                  )}

                  {app.weekendSlot && (
                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">{isAr ? 'الفترة الزمنية' : 'Time Slot'}</p>
                      <div className="flex items-center gap-2 font-black text-secondary italic">
                         <Clock className="h-4 w-4" />
                         {app.weekendSlot}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">{isAr ? 'خطة الدفع المعتمدة' : 'Payment Plan'}</p>
                    <div className="flex items-center justify-between">
                       <p className="font-bold text-sm text-white/80">
                          {app.paymentTier === 'initial-3-5' ? (isAr ? 'الدفعة الأولية' : 'Initial Payment Plan') : 
                           app.paymentTier === 'full-3-5' ? (isAr ? 'الدفع الكامل' : 'Full Tuition Plan') : 
                           (isAr ? 'رسوم البرنامج' : 'Program Fees')}
                       </p>
                       <CreditCard className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
               </CardContent>
            </Card>

            {/* Documents Card */}
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
               <CardHeader className="p-6 border-b border-slate-100 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-black uppercase tracking-tight">{isAr ? 'المستندات المرفقة' : 'Uploaded Files'}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="font-black">{app.files?.length || 0}</Badge>
               </CardHeader>
               <CardContent className="p-6 space-y-4">
                  {app.files?.map((file: any, idx: number) => (
                    <div key={idx} className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                       <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 rounded-xl bg-white text-secondary flex items-center justify-center shadow-sm">
                             {file.type?.includes('pdf') ? <FileText className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </div>
                          <div className="min-w-0">
                             <p className="text-xs font-black text-primary truncate max-w-[120px]">{file.name}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          {file.type?.includes('image') && (
                             <button className="h-8 w-8 rounded-lg bg-white text-slate-400 hover:text-primary shadow-sm flex items-center justify-center transition-colors" onClick={() => window.open(file.data)}>
                                <Eye className="h-4 w-4" />
                             </button>
                          )}
                          <button className="h-8 w-8 rounded-lg bg-secondary text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all" onClick={() => downloadFile(file)}>
                             <DownloadCloud className="h-4 w-4" />
                          </button>
                       </div>
                    </div>
                  ))}
                  
                  {(!app.files || app.files.length === 0) && (
                    <div className="py-10 text-center space-y-2">
                       <FileCheck className="h-10 w-10 text-slate-200 mx-auto" />
                       <p className="text-xs font-bold text-slate-400">{isAr ? 'لا توجد مرفقات' : 'No documents uploaded'}</p>
                    </div>
                  )}
               </CardContent>
            </Card>

            <div className="pt-6 space-y-4">
               <Button className="w-full h-16 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black shadow-xl shadow-green-500/20 transition-all flex items-center justify-center gap-3 text-lg">
                  <CheckCircle2 className="h-6 w-6" />
                  {isAr ? 'اعتماد الطلب' : 'Approve Application'}
               </Button>
               <Button variant="outline" className="w-full h-14 rounded-2xl border-2 text-slate-500 font-black hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
                  {isAr ? 'رفض أو طلب تعديل' : 'Reject / Request Changes'}
               </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
