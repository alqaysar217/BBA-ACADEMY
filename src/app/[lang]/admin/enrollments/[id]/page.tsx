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
  Hash,
  Activity,
  Layers,
  Building2,
  Globe
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

  const InfoRow = ({ label, value, icon: Icon, isBold = true }: { label: string, value: string, icon?: any, isBold?: boolean }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 group px-2 hover:bg-slate-50/50 transition-colors">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 text-slate-400 group-hover:text-secondary transition-colors" />}
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className={cn("text-sm text-primary", isBold ? "font-black" : "font-medium")}>{value || '-'}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/30 pb-24">
      {/* HEADER */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* MAIN COLUMN (LEFT) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. GUARDIANS SECTION - Structured Rows/Cols */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 px-2">
                  <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-primary uppercase tracking-tight leading-none">{isAr ? 'سجل أولياء الأمور' : 'Guardians Registry'}</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{isAr ? 'بيانات التواصل والصلة' : 'Contact & Relationship Data'}</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Primary Guardian Table */}
                  <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
                    <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100">
                       <Badge variant="outline" className="bg-white text-slate-400 font-black uppercase text-[8px] tracking-widest border-slate-200">Guardian 01</Badge>
                       <CardTitle className="text-2xl font-black text-primary mt-4">{app.parent1Name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                       <div className="flex flex-col">
                          <InfoRow icon={User} label={isAr ? 'الاسم بالكامل' : 'Full Name'} value={app.parent1Name} />
                          <InfoRow icon={Phone} label={isAr ? 'رقم الهاتف' : 'Phone'} value={app.parent1Phone} />
                          <InfoRow icon={Mail} label={isAr ? 'البريد الإلكتروني' : 'Email'} value={app.parent1Email} isBold={false} />
                          <InfoRow icon={ShieldCheck} label={isAr ? 'صلة القرابة' : 'Relationship'} value={app.relationship1} />
                       </div>
                    </CardContent>
                  </Card>

                  {/* Secondary Guardian Table */}
                  {app.parent2Name ? (
                    <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
                      <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100">
                         <Badge variant="outline" className="bg-white text-slate-400 font-black uppercase text-[8px] tracking-widest border-slate-200">Guardian 02</Badge>
                         <CardTitle className="text-2xl font-black text-primary mt-4">{app.parent2Name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="flex flex-col">
                           <InfoRow icon={User} label={isAr ? 'الاسم بالكامل' : 'Full Name'} value={app.parent2Name} />
                           <InfoRow icon={Phone} label={isAr ? 'رقم الهاتف' : 'Phone'} value={app.parent2Phone} />
                           <InfoRow icon={Mail} label={isAr ? 'البريد الإلكتروني' : 'Email'} value={app.parent2Email} isBold={false} />
                           <InfoRow icon={ShieldCheck} label={isAr ? 'صلة القرابة' : 'Relationship'} value={app.relationship2} />
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="h-full rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
                       <Info className="h-10 w-10 text-slate-200 mb-4" />
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                          {isAr ? 'لا يوجد ولي أمر ثانٍ مسجل' : 'No Secondary Guardian Registered'}
                       </p>
                    </div>
                  )}
               </div>
            </div>

            {/* 2. STUDENTS GRID - Structured Columns */}
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-primary uppercase tracking-tight leading-none">{isAr ? 'قائمة الطلاب المشمولين' : 'Student Roster'}</h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{isAr ? 'التفاصيل الأكاديمية والشخصية' : 'Academic & Personal Profiles'}</p>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black shadow-xl ring-4 ring-white">{app.students?.length || 0}</div>
               </div>

               <div className="space-y-6">
                  {app.students?.map((student: any, idx: number) => (
                    <Card key={idx} className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden group">
                      <div className="flex flex-col md:flex-row items-stretch">
                         <div className="w-full md:w-32 bg-primary text-white flex flex-col items-center justify-center p-8 md:p-0 relative">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/60 mb-2 relative z-10">Entry</span>
                            <span className="text-5xl font-black relative z-10">{String(idx + 1).padStart(2, '0')}</span>
                         </div>
                         <div className="flex-1 p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12">
                               <div className="space-y-2">
                                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'الاسم الثلاثي' : 'Full Name'}</p>
                                  <h3 className="text-xl font-black text-primary leading-tight">{student.firstName} {student.middleName} {student.lastName}</h3>
                                  <Badge className="bg-secondary/10 text-secondary text-[9px] font-black rounded-lg border-none">{student.gender}</Badge>
                               </div>
                               <div className="space-y-2">
                                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'الحالة والمرحلة' : 'Status & Level'}</p>
                                  <div className="font-bold text-slate-600 flex flex-col gap-1">
                                     <span className="text-sm flex items-center gap-2"><Activity className="h-3 w-3 text-green-500" /> {student.status}</span>
                                     <span className="text-sm flex items-center gap-2"><Layers className="h-3 w-3 text-secondary" /> Grade {student.lastGrade}</span>
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{isAr ? 'المعلومات الحيوية' : 'Personal Specs'}</p>
                                  <div className="space-y-3">
                                     <div className="flex items-center gap-3">
                                        <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Calendar className="h-3 w-3" /></div>
                                        <span className="text-xs font-bold text-slate-600">{student.dob}</span>
                                     </div>
                                     <div className="flex items-center gap-3">
                                        <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Phone className="h-3 w-3" /></div>
                                        <span className="text-xs font-bold text-slate-600" dir="ltr">{student.phone}</span>
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

            {/* 3. ADDRESS TABLE */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 px-2">
                  <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-primary uppercase tracking-tight leading-none">{isAr ? 'العنوان الجغرافي' : 'Residence Address'}</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{isAr ? 'موقع السكن الحالي' : 'Current Living Location'}</p>
                  </div>
               </div>

               <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
                 <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                       <div className="p-8 border-b md:border-b-0 md:border-r border-slate-100 space-y-6">
                          <InfoRow icon={Building2} label={isAr ? 'العنوان الرئيسي' : 'Primary Line'} value={app.address?.line1} />
                          <InfoRow icon={Hash} label={isAr ? 'السطر الثاني' : 'Secondary Line'} value={app.address?.line2 || '-'} />
                       </div>
                       <div className="p-8 space-y-6">
                          <div className="grid grid-cols-2 gap-8">
                             <InfoRow icon={Globe} label={isAr ? 'المدينة' : 'City'} value={app.address?.city} />
                             <InfoRow icon={MapPin} label={isAr ? 'الولاية' : 'State'} value={app.address?.state} />
                          </div>
                          <InfoRow icon={Hash} label={isAr ? 'الرمز البريدي' : 'ZIP Code'} value={app.address?.zip} />
                       </div>
                    </div>
                 </CardContent>
               </Card>
            </div>
          </div>

          {/* SIDEBAR COLUMN (RIGHT) */}
          <aside className="lg:col-span-4 space-y-10 sticky top-28">
            
            {/* PROGRAM & FINANCE CARD */}
            <Card className="border-none shadow-2xl rounded-[3rem] bg-primary text-white overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 group-hover:rotate-45 transition-transform duration-1000"><Briefcase className="h-40 w-40" /></div>
               <CardHeader className="p-10 pb-0 relative z-10">
                  <Badge className="bg-secondary text-white font-black uppercase text-[8px] tracking-[0.2em] h-6 px-3 border-none">Active Enrollment</Badge>
                  <CardTitle className="text-3xl font-black text-secondary uppercase leading-tight mt-6">
                    {app.programOption === 'grades-3-5' ? (isAr ? 'برنامج التأسيس' : 'Foundation 3-5') : 
                     app.programOption === 'grades-6-12' ? (isAr ? 'الأكاديمي' : 'Academics 6-12') : 
                     (isAr ? 'عطلة الأسبوع' : 'Weekend Remote')}
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-10 space-y-10 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-white/40 tracking-widest">
                       <span>{isAr ? 'مسار اللغة' : 'Language Path'}</span>
                       <Globe className="h-3 w-3" />
                    </div>
                    <p className="text-lg font-bold text-white/90">
                       {app.languageOption === 'english-arabic' ? (isAr ? 'الإنجليزية والعربية' : 'English & Arabic') : (isAr ? 'الإنجليزية فقط' : 'English Only')}
                    </p>
                  </div>

                  <div className="pt-10 border-t border-white/10 space-y-6">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{isAr ? 'خطة الدفع والرسوم' : 'Financial Breakdown'}</span>
                        <CreditCard className="h-4 w-4 text-secondary" />
                     </div>
                     <div className="flex items-end justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-secondary uppercase tracking-[0.2em]">{isAr ? 'الإجمالي المتوقع' : 'Projected Total'}</p>
                          <div className="text-6xl font-black text-white tracking-tighter">
                             {app.programOption === 'weekend' ? '$75' : 
                              app.paymentTier === 'full-3-5' ? '$2,850' : '$1,650'}
                          </div>
                        </div>
                        <Badge className="bg-white/10 text-white/60 mb-2 border-none font-bold text-[8px] uppercase">USD</Badge>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* ATTACHMENTS TABLE */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-primary"><FileText className="h-4 w-4" /></div>
                     <CardTitle className="text-base font-black uppercase tracking-tight text-primary">{isAr ? 'المرفقات' : 'Attachments'}</CardTitle>
                  </div>
                  <Badge className="bg-slate-900 text-white font-black h-6 w-6 rounded-full flex items-center justify-center p-0 text-[10px]">{app.files?.length || 0}</Badge>
               </CardHeader>
               <CardContent className="p-8 pt-4">
                  {app.files && app.files.length > 0 ? (
                    <div className="space-y-3">
                       {app.files.map((file: any, idx: number) => (
                         <div key={idx} className="group flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-white hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-4 min-w-0">
                               <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary shrink-0 relative overflow-hidden group-hover:scale-110 transition-transform">
                                  {file.type?.includes('image') ? (
                                    <Image src={file.data} alt="file" fill className="object-cover" unoptimized />
                                  ) : (
                                    <FileText className="h-4 w-4" />
                                  )}
                               </div>
                               <div className="min-w-0">
                                  <p className="text-[10px] font-black text-primary truncate leading-tight">{file.name}</p>
                                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{(file.size / 1024).toFixed(0)} KB</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-2">
                               <button onClick={() => window.open(file.data, '_blank')} className="h-9 w-9 rounded-xl bg-white text-slate-400 hover:text-secondary shadow-sm flex items-center justify-center transition-all border border-slate-100"><ExternalLink className="h-3.5 w-3.5" /></button>
                               <button onClick={() => downloadFile(file)} className="h-9 w-9 rounded-xl bg-secondary text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"><DownloadCloud className="h-3.5 w-3.5" /></button>
                            </div>
                         </div>
                       ))}
                    </div>
                  ) : (
                    <div className="py-10 bg-slate-50/30 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-4">
                       <FileCheck className="h-8 w-8 text-slate-200 mb-3" />
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'لم يتم إرفاق ملفات' : 'Zero Files Found'}</p>
                    </div>
                  )}
               </CardContent>
            </Card>

            {/* ADMIN ACTIONS */}
            <div className="pt-4 grid grid-cols-1 gap-4 px-2">
               <Button className="w-full h-16 rounded-[1.5rem] bg-green-500 hover:bg-green-600 text-white font-black shadow-xl shadow-green-500/20 gap-3 text-lg transition-all active:scale-[0.98]">
                  <CheckCircle2 className="h-6 w-6" />
                  {isAr ? 'اعتماد هذا الطلب' : 'Approve Enrollment'}
               </Button>
               <Button variant="outline" className="w-full h-14 rounded-[1.5rem] border-2 border-slate-100 text-slate-400 font-black hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">
                  {isAr ? 'رفض الطلب' : 'Reject Application'}
               </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
