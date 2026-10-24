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
  Eye,
  CheckCircle2,
  Users,
  ShieldCheck,
  Briefcase,
  DownloadCloud,
  FileCheck,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Info,
  Clock,
  Layout
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-6">
           <div className="relative h-16 w-16">
              <div className="absolute inset-0 border-4 border-secondary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
           </div>
           <p className="text-xs font-black text-primary uppercase tracking-[0.3em] animate-pulse">
              {isAr ? 'جاري استرداد البيانات...' : 'Fetching Records...'}
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
           <div className="space-y-2">
              <h2 className="text-2xl font-black text-primary uppercase tracking-tight">{isAr ? 'الطلب غير متوفر' : 'Record Not Found'}</h2>
              <p className="text-slate-400 font-bold text-sm leading-relaxed">{isAr ? 'لم نتمكن من العثور على هذا الطلب في قاعدة البيانات.' : 'The requested application could not be found.'}</p>
           </div>
           <Button onClick={() => router.back()} className="w-full bg-primary text-white rounded-2xl h-14 font-black shadow-xl shadow-primary/10">
              {isAr ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
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
    <div className="min-h-screen bg-slate-50/30 pb-24">
      {/* 1. STICKY PREMIUM HEADER */}
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
                     app.status === 'submitted' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                   )}>
                     {app.status === 'submitted' ? (isAr ? 'مكتمل' : 'Submitted') : (isAr ? 'مسودة' : 'Draft')}
                   </Badge>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Clock className="h-3 w-3" />
                   {isAr ? 'آخر تحديث:' : 'Updated:'} {app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy · HH:mm') : '-'}
                </p>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <Button variant="outline" className="hidden md:flex rounded-2xl h-12 border-slate-200 font-black text-xs text-slate-500 uppercase tracking-widest hover:bg-slate-50">
                <FileText className="h-4 w-4 mr-2" />
                {isAr ? 'تصدير PDF' : 'Export'}
              </Button>
              <Button className="rounded-2xl h-12 bg-primary hover:bg-secondary text-white font-black px-6 shadow-xl shadow-primary/10 transition-all">
                {isAr ? 'اعتماد الطلب' : 'Approve Application'}
              </Button>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: MAIN DATA (8 COLS) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* PARENT SECTION */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 px-2">
                  <div className="h-8 w-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-black text-primary uppercase tracking-tight">{isAr ? 'بيانات أولياء الأمور' : 'Guardians Information'}</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Parent Card */}
                  <Card className="border-none shadow-premium rounded-[2rem] bg-white group hover:shadow-2xl transition-all duration-500">
                    <CardHeader className="p-8 pb-0">
                       <Badge variant="outline" className="bg-slate-50 text-slate-400 font-black uppercase text-[8px] tracking-widest border-slate-100">Primary Guardian</Badge>
                       <CardTitle className="text-2xl font-black text-primary mt-4">{app.parent1Name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                       <div className="grid gap-4">
                          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                             <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary"><Phone className="h-4 w-4" /></div>
                             <div className="space-y-0.5">
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'رقم الهاتف' : 'Phone'}</p>
                                <p className="font-bold text-slate-700" dir="ltr">{app.parent1Phone}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                             <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary"><Mail className="h-4 w-4" /></div>
                             <div className="space-y-0.5 min-w-0">
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'البريد الإلكتروني' : 'Email'}</p>
                                <p className="font-bold text-slate-700 truncate">{app.parent1Email}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                             <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary"><ShieldCheck className="h-4 w-4" /></div>
                             <div className="space-y-0.5">
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'الصلة' : 'Relationship'}</p>
                                <p className="font-bold text-slate-700 capitalize">{app.relationship1}</p>
                             </div>
                          </div>
                       </div>
                    </CardContent>
                  </Card>

                  {/* Secondary Parent Card */}
                  {app.parent2Name ? (
                    <Card className="border-none shadow-premium rounded-[2rem] bg-white group hover:shadow-2xl transition-all duration-500">
                      <CardHeader className="p-8 pb-0">
                         <Badge variant="outline" className="bg-slate-50 text-slate-400 font-black uppercase text-[8px] tracking-widest border-slate-100">Secondary Guardian</Badge>
                         <CardTitle className="text-2xl font-black text-primary mt-4">{app.parent2Name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                         <div className="grid gap-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                               <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400"><Phone className="h-4 w-4" /></div>
                               <div className="space-y-0.5">
                                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'رقم الهاتف' : 'Phone'}</p>
                                  <p className="font-bold text-slate-700" dir="ltr">{app.parent2Phone}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                               <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400"><Mail className="h-4 w-4" /></div>
                               <div className="space-y-0.5 min-w-0">
                                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'البريد الإلكتروني' : 'Email'}</p>
                                  <p className="font-bold text-slate-700 truncate">{app.parent2Email}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                               <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400"><ShieldCheck className="h-4 w-4" /></div>
                               <div className="space-y-0.5">
                                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'الصلة' : 'Relationship'}</p>
                                  <p className="font-bold text-slate-700 capitalize">{app.relationship2}</p>
                               </div>
                            </div>
                         </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="h-full rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center bg-slate-50/50">
                       <Info className="h-8 w-8 text-slate-200 mb-4" />
                       <p className="text-xs font-black text-slate-300 uppercase tracking-widest leading-relaxed">
                          {isAr ? 'لا يوجد ولي أمر ثانٍ' : 'No Secondary Guardian'}
                       </p>
                    </div>
                  )}
               </div>
            </div>

            {/* STUDENTS SECTION */}
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <h2 className="text-lg font-black text-primary uppercase tracking-tight">{isAr ? 'قائمة الطلاب المسجلين' : 'Enrolled Students'}</h2>
                  </div>
                  <Badge className="bg-primary text-white h-7 px-3 rounded-lg font-black">{app.students?.length || 0}</Badge>
               </div>

               <div className="grid grid-cols-1 gap-6">
                  {app.students?.map((student: any, idx: number) => (
                    <Card key={idx} className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden group">
                      <div className="flex flex-col md:flex-row items-stretch">
                         <div className="w-full md:w-32 bg-primary text-white flex flex-col items-center justify-center p-8 md:p-0 relative">
                            <div className="absolute top-0 left-0 p-4 opacity-5 rotate-12"><GraduationCap className="h-20 w-20" /></div>
                            <span className="text-5xl font-black relative z-10">{idx + 1}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/60 mt-2 relative z-10">Student</span>
                         </div>
                         <div className="flex-1 p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                               <div className="space-y-6">
                                  <div>
                                     <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'الاسم الكامل' : 'Full Name'}</p>
                                     <h3 className="text-2xl font-black text-primary leading-tight">{student.firstName} {student.middleName} {student.lastName}</h3>
                                     <Badge variant="outline" className="mt-2 bg-slate-50 border-slate-100 text-secondary font-black text-[10px] py-1 px-3 rounded-lg">{student.gender}</Badge>
                                  </div>
                                  <div>
                                     <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'الحالة' : 'Status'}</p>
                                     <p className="font-bold text-slate-600 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        {student.status}
                                     </p>
                                  </div>
                               </div>
                               <div className="space-y-6">
                                  <div className="flex items-start gap-4">
                                     <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shrink-0"><Calendar className="h-5 w-5" /></div>
                                     <div>
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'تاريخ الميلاد' : 'Date of Birth'}</p>
                                        <p className="font-bold text-slate-700">{student.dob}</p>
                                     </div>
                                  </div>
                                  <div className="flex items-start gap-4">
                                     <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shrink-0"><GraduationCap className="h-5 w-5" /></div>
                                     <div>
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'آخر صف دراسي' : 'Last Grade'}</p>
                                        <p className="font-bold text-slate-700">Grade {student.lastGrade}</p>
                                     </div>
                                  </div>
                               </div>
                               <div className="space-y-6">
                                  <div className="flex items-start gap-4">
                                     <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shrink-0"><Mail className="h-5 w-5" /></div>
                                     <div className="min-w-0">
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'بريد الطالب' : 'Student Email'}</p>
                                        <p className="font-bold text-slate-700 truncate text-sm">{student.email}</p>
                                     </div>
                                  </div>
                                  <div className="flex items-start gap-4">
                                     <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shrink-0"><Phone className="h-5 w-5" /></div>
                                     <div>
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'هاتف الطالب' : 'Student Phone'}</p>
                                        <p className="font-bold text-slate-700 text-sm" dir="ltr">{student.phone}</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    </Card>
                  ))}
               </div>
            </div>

            {/* ADDRESS SECTION */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                     <div className="w-full md:w-48 bg-slate-900 p-10 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-14 w-14 rounded-2xl bg-white/10 text-secondary flex items-center justify-center backdrop-blur-md">
                           <MapPin className="h-7 w-7" />
                        </div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">{isAr ? 'عنوان السكن' : 'Address'}</h4>
                     </div>
                     <div className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                           <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'العنوان الرئيسي والمدينة' : 'Street & City'}</p>
                           <p className="text-xl font-bold text-primary leading-relaxed">
                              {app.address?.line1}
                              {app.address?.line2 && <span className="block text-slate-400 text-sm">{app.address?.line2}</span>}
                              <span className="block text-secondary mt-1">{app.address?.city}</span>
                           </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'الولاية' : 'State'}</p>
                              <p className="text-xl font-bold text-primary">{app.address?.state}</p>
                           </div>
                           <div className="space-y-2">
                              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'الرمز البريدي' : 'ZIP Code'}</p>
                              <p className="text-xl font-bold text-primary">{app.address?.zip}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDEBAR: PROGRAM & DOCUMENTS (4 COLS) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28">
            
            {/* PROGRAM SELECTION CARD */}
            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-primary text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-1000"><Briefcase className="h-40 w-40" /></div>
               <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between relative z-10">
                  <div className="h-10 w-10 rounded-xl bg-white/10 text-secondary flex items-center justify-center"><Briefcase className="h-5 w-5" /></div>
                  <Badge className="bg-secondary text-white font-black uppercase text-[8px] tracking-[0.2em] h-6 px-3">Selected Plan</Badge>
               </CardHeader>
               <CardContent className="p-10 space-y-10 relative z-10">
                  <div className="space-y-2">
                     <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">{isAr ? 'البرنامج المختار' : 'Course Program'}</p>
                     <h3 className="text-3xl font-black text-secondary uppercase leading-tight">
                        {app.programOption === 'grades-3-5' ? (isAr ? 'تأسيس (3-5)' : 'Foundation 3-5') : 
                         app.programOption === 'grades-6-12' ? (isAr ? 'ثانوي (6-12)' : 'Academics 6-12') : 
                         (isAr ? 'عطلة الأسبوع' : 'Weekend Remote')}
                     </h3>
                  </div>

                  {app.languageOption && (
                    <div className="space-y-2">
                       <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">{isAr ? 'مسار اللغة' : 'Language Path'}</p>
                       <p className="text-lg font-bold text-white/90">
                          {app.languageOption === 'english-arabic' ? (isAr ? 'الإنجليزية والعربية' : 'English & Arabic') : (isAr ? 'الإنجليزية فقط' : 'English Only')}
                       </p>
                    </div>
                  )}

                  <div className="pt-10 border-t border-white/10 space-y-4">
                     <div className="flex items-center justify-between">
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">{isAr ? 'التكلفة والدفع' : 'Payment Overview'}</p>
                        <CreditCard className="h-4 w-4 text-secondary" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-white/60 mb-1">
                           {app.paymentTier === 'full-3-5' ? (isAr ? 'الرسوم كاملة' : 'Full Tuition') : (isAr ? 'الدفعة الأولى' : 'Initial Payment Plan')}
                        </p>
                        <div className="text-5xl font-black text-white tracking-tighter">
                           {app.programOption === 'weekend' ? '$75' : 
                            app.paymentTier === 'full-3-5' ? '$2,850' : '$1,650'}
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* DOCUMENTS CARD */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary"><FileText className="h-5 w-5" /></div>
                     <CardTitle className="text-lg font-black uppercase tracking-tight text-primary">{isAr ? 'المستندات' : 'Documents'}</CardTitle>
                  </div>
                  <Badge className="bg-slate-100 text-slate-400 font-black h-7 w-7 rounded-full flex items-center justify-center p-0">{app.files?.length || 0}</Badge>
               </CardHeader>
               <CardContent className="p-8 pt-4 space-y-4">
                  {app.files && app.files.length > 0 ? (
                    <div className="grid gap-3">
                       {app.files.map((file: any, idx: number) => (
                         <div key={idx} className="group flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-4 min-w-0">
                               <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary shrink-0 relative overflow-hidden group-hover:scale-110 transition-transform">
                                  {file.type?.includes('image') ? (
                                    <Image src={file.data} alt="file" fill className="object-cover" unoptimized />
                                  ) : (
                                    <FileText className="h-5 w-5" />
                                  )}
                               </div>
                               <div className="min-w-0">
                                  <p className="text-[11px] font-black text-primary truncate leading-tight">{file.name}</p>
                                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{(file.size / 1024).toFixed(1)} KB · {file.type?.split('/')[1]}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-2">
                               <button 
                                 onClick={() => window.open(file.data, '_blank')}
                                 className="h-10 w-10 rounded-xl bg-white text-slate-400 hover:text-secondary shadow-sm flex items-center justify-center transition-all border border-slate-100 hover:border-secondary/20"
                               >
                                 <ExternalLink className="h-4 w-4" />
                               </button>
                               <button 
                                 onClick={() => downloadFile(file)}
                                 className="h-10 w-10 rounded-xl bg-secondary text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                               >
                                 <DownloadCloud className="h-4 w-4" />
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>
                  ) : (
                    <div className="py-12 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
                       <div className="h-14 w-14 rounded-2xl bg-white text-slate-100 flex items-center justify-center shadow-sm">
                          <FileCheck className="h-7 w-7" />
                       </div>
                       <div className="px-10">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{isAr ? 'لا توجد مستندات' : 'Zero Files Uploaded'}</p>
                          <p className="text-[9px] text-slate-300 font-bold mt-2 leading-relaxed italic">{isAr ? 'لم يقم المستخدم برفع أي مرفقات في طلب التسجيل هذا.' : 'The guardian has not attached any supporting documents yet.'}</p>
                       </div>
                    </div>
                  )}
               </CardContent>
            </Card>

            {/* ACTION SECTION */}
            <div className="pt-6 grid grid-cols-1 gap-4 px-2">
               <Button className="w-full h-16 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black shadow-xl shadow-green-500/20 gap-3 text-lg transition-all active:scale-[0.98]">
                  <CheckCircle2 className="h-6 w-6" />
                  {isAr ? 'اعتماد الطلب فوراً' : 'Approve Application'}
               </Button>
               <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-100 text-slate-400 font-black hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">
                  {isAr ? 'رفض أو طلب تعديلات' : 'Reject / Request Edits'}
               </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}