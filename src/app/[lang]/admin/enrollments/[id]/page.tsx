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
  Globe,
  Trash2,
  FileSearch
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

  const SectionTitle = ({ icon: Icon, title, subtitle, color = "bg-primary" }: { icon: any, title: string, subtitle: string, color?: string }) => (
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
                     app.status === 'submitted' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                   )}>
                     {app.status === 'submitted' ? (isAr ? 'مكتمل' : 'Submitted') : (isAr ? 'مسودة' : 'Draft')}
                   </Badge>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Clock className="h-3 w-3" />
                   {isAr ? 'تاريخ التحديث:' : 'Last Update:'} {app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy · HH:mm') : '-'}
                </p>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <Button variant="outline" className="hidden md:flex rounded-2xl h-12 border-slate-200 font-black text-xs text-slate-500 uppercase tracking-widest hover:bg-slate-50">
                <FileSearch className="h-4 w-4 mr-2" />
                {isAr ? 'معاينة سريعة' : 'Quick View'}
              </Button>
              <Button className="rounded-2xl h-12 bg-primary hover:bg-secondary text-white font-black px-6 shadow-xl shadow-primary/10 transition-all">
                {isAr ? 'اعتماد الطلب' : 'Approve Application'}
              </Button>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-12 space-y-16">
        
        {/* SECTION 1: GUARDIANS TABLES */}
        <section>
          <SectionTitle 
            icon={Users} 
            title={isAr ? 'سجل أولياء الأمور' : 'Guardians Information'} 
            subtitle={isAr ? 'بيانات التواصل والصلة بالأكاديمية' : 'Contact Details & Family Relations'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Parent 1 Table */}
            <Card className="border-none shadow-premium rounded-3xl overflow-hidden">
              <div className="bg-primary p-4 px-6 flex justify-between items-center">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Primary Guardian</span>
                <Badge className="bg-white/10 text-white border-none text-[8px] font-black uppercase">P01</Badge>
              </div>
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-transparent border-slate-50">
                    <TableCell className="w-1/3 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 pl-6">{isAr ? 'الاسم بالكامل' : 'Full Name'}</TableCell>
                    <TableCell className="font-black text-primary py-4">{app.parent1Name}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-transparent border-slate-50">
                    <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 pl-6">{isAr ? 'رقم الهاتف' : 'Phone'}</TableCell>
                    <TableCell className="font-bold text-slate-600 py-4" dir="ltr">{app.parent1Phone}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-transparent border-slate-50">
                    <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 pl-6">{isAr ? 'البريد الإلكتروني' : 'Email'}</TableCell>
                    <TableCell className="font-bold text-slate-600 py-4">{app.parent1Email}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-transparent border-none">
                    <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 pl-6">{isAr ? 'صلة القرابة' : 'Relationship'}</TableCell>
                    <TableCell className="font-black text-secondary py-4 uppercase">{app.relationship1}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

            {/* Parent 2 Table */}
            {app.parent2Name ? (
              <Card className="border-none shadow-premium rounded-3xl overflow-hidden">
                <div className="bg-slate-900 p-4 px-6 flex justify-between items-center">
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Secondary Guardian</span>
                  <Badge className="bg-white/10 text-white border-none text-[8px] font-black uppercase">P02</Badge>
                </div>
                <Table>
                  <TableBody>
                    <TableRow className="hover:bg-transparent border-slate-50">
                      <TableCell className="w-1/3 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 pl-6">{isAr ? 'الاسم بالكامل' : 'Full Name'}</TableCell>
                      <TableCell className="font-black text-primary py-4">{app.parent2Name}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-slate-50">
                      <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 pl-6">{isAr ? 'رقم الهاتف' : 'Phone'}</TableCell>
                      <TableCell className="font-bold text-slate-600 py-4" dir="ltr">{app.parent2Phone}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-slate-50">
                      <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 pl-6">{isAr ? 'البريد الإلكتروني' : 'Email'}</TableCell>
                      <TableCell className="font-bold text-slate-600 py-4">{app.parent2Email}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-none">
                      <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-4 pl-6">{isAr ? 'صلة القرابة' : 'Relationship'}</TableCell>
                      <TableCell className="font-black text-secondary py-4 uppercase">{app.relationship2}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <div className="h-full rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
                 <User className="h-10 w-10 text-slate-200 mb-4" />
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                    {isAr ? 'لم يتم إدراج ولي أمر ثانٍ' : 'No Secondary Guardian Provided'}
                 </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: STUDENTS DATA TABLE */}
        <section>
           <SectionTitle 
              icon={GraduationCap} 
              title={isAr ? 'قائمة الطلاب المشمولين' : 'Student Roster'} 
              subtitle={isAr ? 'التفاصيل الأكاديمية والشخصية للطلاب' : 'Comprehensive Profiles for Enrolled Siblings'}
              color="bg-secondary"
            />
            <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
              <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-100">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-16 text-center font-black text-[10px] uppercase text-slate-400">#</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 px-6">{isAr ? 'الاسم الثلاثي' : 'Student Full Name'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'الجنس' : 'Gender'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'تاريخ الميلاد' : 'D.O.B'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'المرحلة' : 'Grade'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'التواصل' : 'Contact'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 text-right pr-8">{isAr ? 'الحالة' : 'Status'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {app.students?.map((student: any, idx: number) => (
                    <TableRow key={idx} className="hover:bg-slate-50/50 border-slate-50 group">
                      <TableCell className="text-center font-black text-slate-300 py-6">{idx + 1}</TableCell>
                      <TableCell className="px-6">
                        <div className="space-y-0.5">
                          <p className="font-black text-primary text-base">{student.firstName} {student.middleName} {student.lastName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Entry</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-50 text-slate-500 font-black text-[9px] uppercase border-none">{student.gender}</Badge>
                      </TableCell>
                      <TableCell className="font-bold text-slate-600 text-xs">{student.dob}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <Layers className="h-3 w-3 text-secondary" />
                           <span className="font-black text-primary text-xs">Grade {student.lastGrade}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-600 flex items-center gap-2"><Phone className="h-3 w-3 text-slate-300" /> {student.phone}</p>
                          <p className="text-xs font-bold text-slate-600 flex items-center gap-2"><Mail className="h-3 w-3 text-slate-300" /> {student.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <Badge className="bg-secondary text-white font-black text-[9px] uppercase rounded-lg border-none shadow-sm">{student.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
        </section>

        {/* SECTION 3: PROGRAM & FINANCIAL TABLE + ADDRESS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
             {/* Program Data Table */}
             <section>
                <SectionTitle 
                  icon={Briefcase} 
                  title={isAr ? 'تفاصيل البرنامج التعليمي' : 'Program Selection'} 
                  subtitle={isAr ? 'المسار الأكاديمي والخيارات اللغوية' : 'Academic Track & Language Settings'}
                />
                <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                  <Table>
                    <TableBody>
                      <TableRow className="hover:bg-transparent border-slate-50">
                        <TableCell className="w-1/3 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 pl-8">{isAr ? 'البرنامج الأساسي' : 'Academic Program'}</TableCell>
                        <TableCell className="font-black text-primary text-lg py-6">
                           {app.programOption === 'grades-3-5' ? (isAr ? 'برنامج التأسيس (3-5)' : 'Foundation 3-5') : 
                            app.programOption === 'grades-6-12' ? (isAr ? 'البرنامج الأكاديمي (6-12)' : 'Academics 6-12') : 
                            (isAr ? 'برنامج عطلة الأسبوع' : 'Weekend Remote')}
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-transparent border-slate-50">
                        <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 pl-8">{isAr ? 'مسار اللغة' : 'Language Option'}</TableCell>
                        <TableCell className="font-bold text-slate-600 py-6 flex items-center gap-3">
                          <Globe className="h-4 w-4 text-secondary" />
                          {app.languageOption === 'english-arabic' ? (isAr ? 'الإنجليزية والعربية' : 'English & Arabic') : (isAr ? 'الإنجليزية فقط' : 'English Only')}
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-transparent border-slate-50">
                        <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 pl-8">{isAr ? 'خطة الدفع' : 'Payment Plan'}</TableCell>
                        <TableCell className="font-bold text-slate-600 py-6">
                           {app.paymentTier === 'full-3-5' ? (isAr ? 'دفع كامل - خصم 10%' : 'Full Tuition (Prepaid)') : (isAr ? 'دفعة أولية + أقساط' : 'Standard Installments')}
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-transparent border-none">
                        <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 pl-8">{isAr ? 'المبلغ الإجمالي' : 'Tuition Amount'}</TableCell>
                        <TableCell className="font-black text-secondary text-3xl py-6">
                           {app.programOption === 'weekend' ? '$75' : app.paymentTier === 'full-3-5' ? '$2,850' : '$1,650'}
                           <span className="text-[10px] text-slate-300 font-bold ml-2 uppercase tracking-widest">USD Projected</span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
             </section>

             {/* Address Data Table */}
             <section>
                <SectionTitle 
                  icon={MapPin} 
                  title={isAr ? 'العنوان الجغرافي' : 'Residence Data'} 
                  subtitle={isAr ? 'موقع السكن الحالي في الولايات المتحدة' : 'Primary Living Location (USA)'}
                  color="bg-slate-900"
                />
                <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                  <Table>
                    <TableBody>
                      <TableRow className="hover:bg-transparent border-slate-50">
                        <TableCell className="w-1/3 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-5 pl-8">{isAr ? 'العنوان الرئيسي' : 'Primary Line'}</TableCell>
                        <TableCell className="font-bold text-primary py-5">{app.address?.line1}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-transparent border-slate-50">
                        <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-5 pl-8">{isAr ? 'السطر الثاني' : 'Secondary'}</TableCell>
                        <TableCell className="font-medium text-slate-400 py-5">{app.address?.line2 || '-'}</TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-transparent border-none">
                        <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-5 pl-8">{isAr ? 'المدينة / الولاية' : 'Location'}</TableCell>
                        <TableCell className="font-black text-primary py-5">
                          {app.address?.city}, {app.address?.state} {app.address?.zip}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
             </section>
          </div>

          {/* SIDEBAR: DOCUMENTS TABLE */}
          <aside className="lg:col-span-4 space-y-12">
             <section>
                <SectionTitle 
                  icon={FileCheck} 
                  title={isAr ? 'المرفقات والمستندات' : 'Attachments'} 
                  subtitle={isAr ? 'الوثائق الرسمية المرفوعة' : 'Uploaded PDF & Image Files'}
                  color="bg-secondary"
                />
                <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="font-black text-[9px] uppercase text-slate-400 py-4 px-6">{isAr ? 'اسم الملف' : 'File Name'}</TableHead>
                        <TableHead className="font-black text-[9px] uppercase text-slate-400 py-4 text-right pr-6">{isAr ? 'الإجراء' : 'Action'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {app.files && app.files.length > 0 ? (
                        app.files.map((file: any, idx: number) => (
                          <TableRow key={idx} className="hover:bg-slate-50/50 border-slate-50 group">
                            <TableCell className="py-4 px-6">
                               <div className="flex items-center gap-3 min-w-0">
                                  <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-all">
                                     <FileText className="h-4 w-4" />
                                  </div>
                                  <div className="min-w-0">
                                     <p className="text-[10px] font-black text-primary truncate max-w-[120px]">{file.name}</p>
                                     <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{(file.size / 1024).toFixed(0)} KB</p>
                                  </div>
                               </div>
                            </TableCell>
                            <TableCell className="py-4 text-right pr-6">
                               <div className="flex justify-end gap-2">
                                  <button onClick={() => window.open(file.data, '_blank')} className="h-8 w-8 rounded-lg bg-slate-50 text-slate-400 hover:text-secondary hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-slate-100"><ExternalLink className="h-3.5 w-3.5" /></button>
                                  <button onClick={() => downloadFile(file)} className="h-8 w-8 rounded-lg bg-secondary text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"><DownloadCloud className="h-3.5 w-3.5" /></button>
                               </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2} className="py-12 text-center">
                             <FileCheck className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'لا توجد مستندات' : 'Zero Files'}</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
             </section>

             {/* ADMIN ACTIONS */}
             <div className="space-y-4">
                <Button className="w-full h-16 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black shadow-xl shadow-green-500/20 gap-3 text-lg transition-all active:scale-[0.98]">
                   <CheckCircle2 className="h-6 w-6" />
                   {isAr ? 'اعتماد الطلب' : 'Approve Enrollment'}
                </Button>
                <div className="grid grid-cols-2 gap-4">
                   <Button variant="outline" className="h-14 rounded-2xl border-slate-200 text-slate-400 font-black hover:bg-white hover:text-primary transition-all">
                      {isAr ? 'تعديل' : 'Modify'}
                   </Button>
                   <Button variant="outline" className="h-14 rounded-2xl border-slate-100 text-slate-300 font-black hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isAr ? 'رفض' : 'Reject'}
                   </Button>
                </div>
             </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
