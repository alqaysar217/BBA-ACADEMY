'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  CreditCard, 
  FileText, 
  CheckCircle2,
  Users,
  ShieldCheck,
  Briefcase,
  DownloadCloud,
  FileCheck,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Clock,
  Layers,
  Globe,
  Trash2,
  FileSearch,
  Hash,
  Home
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

  const downloadFile = (file: any) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                     app.status === 'submitted' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                   )}>
                     {app.status === 'submitted' ? (isAr ? 'مكتمل' : 'Submitted') : (isAr ? 'مسودة' : 'Draft')}
                   </Badge>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Clock className="h-3 w-3" />
                   {isAr ? 'آخر تحديث:' : 'Last Update:'} {app.updatedAt ? format(app.updatedAt.toDate(), 'MMM dd, yyyy · HH:mm') : '-'}
                </p>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <Button variant="outline" className="hidden md:flex rounded-2xl h-12 border-slate-200 font-black text-xs text-slate-500 uppercase tracking-widest hover:bg-slate-50">
                <FileSearch className="h-4 w-4 mr-2" />
                {isAr ? 'معاينة' : 'Quick View'}
              </Button>
              <Button className="rounded-2xl h-12 bg-primary hover:bg-secondary text-white font-black px-6 shadow-xl shadow-primary/10 transition-all">
                {isAr ? 'اعتماد الطلب' : 'Approve Application'}
              </Button>
           </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-12 space-y-16">
        
        {/* SECTION 1: GUARDIANS & ADDRESS HUB (SINGLE TABLE) */}
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
                              <span className="text-[10px] text-slate-300 uppercase block mb-0.5">{isAr ? 'العنوان الرئيسي' : 'Street Line 1'}</span>
                              {app.address?.line1}
                           </div>
                           {app.address?.line2 && (
                             <div className="px-4 py-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                <span className="text-[10px] text-slate-300 uppercase block mb-0.5">{isAr ? 'السطر الثاني' : 'Line 2'}</span>
                                {app.address?.line2}
                             </div>
                           )}
                           <div className="px-4 py-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-[10px] text-slate-300 uppercase block mb-0.5">{isAr ? 'المدينة' : 'City'}</span>
                              {app.address?.city}
                           </div>
                           <div className="px-4 py-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-[10px] text-slate-300 uppercase block mb-0.5">{isAr ? 'الولاية' : 'State'}</span>
                              {app.address?.state}
                           </div>
                           <div className="px-4 py-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-[10px] text-slate-300 uppercase block mb-0.5">{isAr ? 'الرمز البريدي' : 'ZIP'}</span>
                              {app.address?.zip}
                           </div>
                        </div>
                     </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* SECTION 2: STUDENT ROSTER (WIDE TABLE) */}
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
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'التواصل' : 'Contact (Phone/Email)'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400">{isAr ? 'المستوى' : 'Grade Level'}</TableHead>
                    <TableHead className="font-black text-[10px] uppercase text-slate-400 text-right pr-8">{isAr ? 'السجل' : 'Entry'}</TableHead>
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
                        <Badge variant="outline" className="bg-slate-50 text-slate-500 font-black text-[9px] uppercase border-none">
                           {student.gender === 'Male' ? (isAr ? 'ذكر' : 'Male') : (isAr ? 'أنثى' : 'Female')}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-slate-600 text-xs">{student.dob}</TableCell>
                      <TableCell>
                        <Badge className="bg-secondary/10 text-secondary border-none font-black text-[9px] uppercase">
                           {student.status === 'New Student' ? (isAr ? 'طالب جديد' : 'New') : (isAr ? 'عائد' : 'Returning')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-600 flex items-center gap-2" dir="ltr"><Phone className="h-3 w-3 text-slate-300" /> {student.phone}</p>
                          <p className="text-[10px] font-bold text-slate-600 flex items-center gap-2"><Mail className="h-3 w-3 text-slate-300" /> {student.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <div className="h-6 w-6 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                              <Layers className="h-3 w-3" />
                           </div>
                           <span className="font-black text-primary text-xs">Grade {student.lastGrade}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">#{id.slice(0, 4)}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
        </section>

        {/* SECTION 3: PROGRAM & ATTACHMENTS (ORGANIZED TABLES) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Program Details Table */}
          <section>
             <SectionHeader 
               icon={Briefcase} 
               title={isAr ? 'البرنامج التعليمي' : 'Academic Program'} 
               subtitle={isAr ? 'المسار والخيارات المالية' : 'Selected Track & Financials'}
             />
             <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white">
                <Table>
                  <TableBody>
                    <TableRow className="hover:bg-transparent border-slate-50">
                      <TableCell className="w-1/3 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 pl-8">{isAr ? 'نوع البرنامج' : 'Program Option'}</TableCell>
                      <TableCell className="font-black text-primary text-lg py-6">
                         {app.programOption === 'grades-3-5' ? (isAr ? 'برنامج التأسيس (3-5)' : 'Foundation 3-5') : 
                          app.programOption === 'grades-6-12' ? (isAr ? 'البرنامج الأكاديمي (6-12)' : 'Academics 6-12') : 
                          (isAr ? 'برنامج عطلة الأسبوع' : 'Weekend Remote')}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-slate-50">
                      <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 pl-8">{isAr ? 'اللغة المعتمدة' : 'Language Path'}</TableCell>
                      <TableCell className="font-bold text-slate-600 py-6 flex items-center gap-3">
                        <Globe className="h-4 w-4 text-secondary" />
                        {app.languageOption === 'english-arabic' ? (isAr ? 'الإنجليزية والعربية' : 'English & Arabic') : (isAr ? 'الإنجليزية فقط' : 'English Only')}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-none">
                      <TableCell className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest py-6 pl-8">{isAr ? 'الرسوم المقدرة' : 'Tuition Projection'}</TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-baseline gap-2">
                           <span className="font-black text-secondary text-4xl">
                              {app.programOption === 'weekend' ? '$75' : app.paymentTier === 'full-3-5' ? '$2,850' : '$1,650'}
                           </span>
                           <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">USD</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
             </Card>
          </section>

          {/* Attachments Table */}
          <section>
             <SectionHeader 
               icon={FileCheck} 
               title={isAr ? 'المرفقات والمستندات' : 'Required Documents'} 
               subtitle={isAr ? 'الوثائق الرسمية المرفوعة' : 'PDF & Image Evidence'}
               color="bg-slate-900"
             />
             <Card className="border-none shadow-premium rounded-[2rem] overflow-hidden bg-white h-full min-h-[300px]">
                <Table>
                  <TableHeader className="bg-slate-50 border-b border-slate-100">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-black text-[9px] uppercase text-slate-400 py-4 px-8">{isAr ? 'اسم الملف' : 'File Name'}</TableHead>
                      <TableHead className="font-black text-[9px] uppercase text-slate-400 py-4 text-right pr-8">{isAr ? 'الإجراء' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {app.files && app.files.length > 0 ? (
                      app.files.map((file: any, idx: number) => (
                        <TableRow key={idx} className="hover:bg-slate-50/50 border-slate-50 group">
                          <TableCell className="py-5 px-8">
                             <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                   <FileText className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                   <p className="text-xs font-black text-primary truncate max-w-[200px]">{file.name}</p>
                                   <p className="text-[9px] font-bold text-slate-300 uppercase">{(file.size / 1024).toFixed(0)} KB</p>
                                </div>
                             </div>
                          </TableCell>
                          <TableCell className="py-5 text-right pr-8">
                             <div className="flex justify-end gap-3">
                                <button onClick={() => window.open(file.data, '_blank')} className="h-9 w-9 rounded-xl bg-slate-50 text-slate-400 hover:text-secondary hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-slate-100"><ExternalLink className="h-4 w-4" /></button>
                                <button onClick={() => downloadFile(file)} className="h-9 w-9 rounded-xl bg-secondary text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"><DownloadCloud className="h-4 w-4" /></button>
                             </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="py-24 text-center">
                           <div className="space-y-4">
                              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                                 <FileCheck className="h-8 w-8" />
                              </div>
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'لم يتم رفع أي مستندات بعد' : 'No documents uploaded yet'}</p>
                           </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
             </Card>
          </section>
        </div>

        {/* ADMIN ACTIONS FOOTER */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shadow-inner">
                 <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                 <h4 className="font-black text-primary uppercase text-sm tracking-tight">{isAr ? 'جاهز للاعتماد؟' : 'Ready for Approval?'}</h4>
                 <p className="text-xs font-bold text-slate-400">{isAr ? 'يرجى مراجعة كافة البيانات والوثائق قبل اتخاذ القرار.' : 'Please verify all data and documents before proceeding.'}</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none h-16 px-10 rounded-2xl border-slate-200 text-slate-400 font-black hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all gap-3">
                 <Trash2 className="h-5 w-5" />
                 {isAr ? 'رفض الطلب' : 'Reject Request'}
              </Button>
              <Button className="flex-[2] md:flex-none h-16 px-16 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black shadow-xl shadow-green-500/20 gap-3 text-lg transition-all active:scale-[0.98]">
                 <CheckCircle2 className="h-6 w-6" />
                 {isAr ? 'اعتماد وتسجيل' : 'Approve & Enroll'}
              </Button>
           </div>
        </div>
      </main>
    </div>
  );
}

