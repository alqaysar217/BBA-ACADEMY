
'use client';

import { use, useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc, useUser } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  User, GraduationCap, CreditCard, FileText, 
  ChevronLeft, ChevronRight, Clock, BookOpen, 
  Plus, CheckCircle2, AlertCircle, DollarSign,
  Briefcase, ShieldCheck, Mail, Phone, MapPin, Layers,
  Users, Camera, Calendar as CalendarIcon, 
  UserCircle2, Home, Building, Hash, Eye, Loader2,
  MoreVertical, Edit3, Trash2, Heart, Award, ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function StudentDetailPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const studentRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'students', id);
  }, [firestore, id]);

  const { data: student, loading } = useDoc(studentRef);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !studentRef) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      try {
        await updateDoc(studentRef, {
          photoURL: base64,
          updatedAt: serverTimestamp()
        });
        toast({ title: isAr ? "تم تحديث الصورة بنجاح" : "Profile photo updated" });
      } catch (err) {
        toast({ variant: "destructive", title: "Error updating photo" });
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      <div className="h-16 w-16 border-4 border-primary border-t-secondary rounded-full animate-spin" />
      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing Profile Data...</p>
    </div>
  );

  if (!student) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-10 space-y-4">
      <div className="h-20 w-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center shadow-inner">
         <AlertCircle className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-black text-primary uppercase">{isAr ? 'لم يتم العثور على الطالب' : 'Student Record Not Found'}</h2>
      <Button onClick={() => router.back()} variant="outline" className="rounded-xl border-slate-200">Return to Registry</Button>
    </div>
  );

  // Default image logic
  const defaultImage = student.gender === 'Female' ? '/Female.png' : '/Male.png';
  const profileImage = student.photoURL || defaultImage;

  return (
    <div className="space-y-8 pb-24">
      {/* 1. HERO HEADER AREA */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-slate-900 rounded-[2.5rem] shadow-2xl opacity-90" />
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="profile-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                 <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#profile-pattern)" />
           </svg>
        </div>

        <div className="relative z-10 p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar Section */}
            <div className="relative">
               <div className="h-40 w-40 rounded-[2.5rem] bg-white border-4 border-white/20 shadow-2xl overflow-hidden relative group/avatar">
                  <Image 
                    src={profileImage} 
                    alt={student.firstName} 
                    fill 
                    className="object-cover" 
                    unoptimized 
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                    </div>
                  )}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 backdrop-blur-[2px]"
                  >
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'تغيير' : 'Change'}</span>
                  </button>
               </div>
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </div>

            <div className="text-center lg:text-start space-y-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase">{student.firstName} {student.lastName}</h1>
                  <Badge className="bg-secondary text-white border-none rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-widest shadow-xl">
                    {student.status}
                  </Badge>
                </div>
                <p className="text-white/60 font-bold uppercase text-xs lg:text-base tracking-[0.2em] flex items-center justify-center lg:justify-start gap-3">
                  <GraduationCap className="h-5 w-5 text-secondary" />
                  Grade {student.gradeLevel} • {student.programOption}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                 <div className="px-4 py-1.5 bg-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/5 backdrop-blur-md">
                    <UserCircle2 className="h-3 w-3 text-secondary" /> {student.gender}
                 </div>
                 <div className="px-4 py-1.5 bg-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/5 backdrop-blur-md">
                    <Award className="h-3 w-3 text-secondary" /> ID: {student.id.slice(-6).toUpperCase()}
                 </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button variant="secondary" className="h-14 rounded-2xl px-8 font-black gap-3 shadow-2xl active:scale-95 transition-all text-white">
               <DollarSign className="h-5 w-5" /> {isAr ? 'إجراء دفعة' : 'Register Payment'}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white hover:text-primary shadow-xl">
                  <MoreVertical className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl border-slate-100">
                <DropdownMenuItem className="rounded-xl font-bold py-3 gap-3">
                  <Edit3 className="h-4 w-4 text-primary" /> {isAr ? 'تعديل البيانات' : 'Edit Profile'}
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl font-bold py-3 gap-3 text-red-500 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" /> {isAr ? 'أرشفة الحساب' : 'Archive Account'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="border-none shadow-sm rounded-2xl bg-white border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الرصيد المالي' : 'Current Balance'}</p>
               <div className="h-8 w-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center"><CreditCard className="h-4 w-4" /></div>
            </div>
            <div className="mt-4">
               <h3 className="text-3xl font-black text-slate-900">${((student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0)).toLocaleString()}</h3>
               <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{isAr ? 'إجمالي المستحق' : 'Total Outstanding'}</p>
            </div>
         </Card>
         <Card className="border-none shadow-sm rounded-2xl bg-white border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'التقدم الأكاديمي' : 'Academic Rank'}</p>
               <div className="h-8 w-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center"><Award className="h-4 w-4" /></div>
            </div>
            <div className="mt-4">
               <h3 className="text-3xl font-black text-slate-900">{student.academicPlan?.progress || 0}%</h3>
               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${student.academicPlan?.progress || 0}%` }} />
               </div>
            </div>
         </Card>
         <Card className="border-none shadow-sm rounded-2xl bg-white border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'الدورات المكتملة' : 'Completed Courses'}</p>
               <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center"><BookOpen className="h-4 w-4" /></div>
            </div>
            <div className="mt-4">
               <h3 className="text-3xl font-black text-slate-900">{student.academicPlan?.courses?.filter((c:any) => c.status === 'completed').length || 0} / 10</h3>
               <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">AY 2026-2027 Goals</p>
            </div>
         </Card>
         <Card className="border-none shadow-sm rounded-2xl bg-white border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'تاريخ الانضمام' : 'Registry Date'}</p>
               <div className="h-8 w-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center"><CalendarIcon className="h-4 w-4" /></div>
            </div>
            <div className="mt-4">
               <h3 className="text-xl font-black text-slate-700">{student.createdAt ? format(student.createdAt.toDate(), 'MMM dd, yyyy') : '-'}</h3>
               <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Active since Day 1</p>
            </div>
         </Card>
      </div>

      {/* 3. MAIN TABS CONTENT */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white/50 backdrop-blur-md p-1.5 rounded-2xl h-16 shadow-sm border border-slate-100 inline-flex w-full sm:w-auto">
          <TabsTrigger value="profile" className="rounded-xl font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-8 h-full transition-all">
             <User className="h-4 w-4 mr-2" /> {isAr ? 'الملف الشخصي' : 'Student Identity'}
          </TabsTrigger>
          <TabsTrigger value="academic" className="rounded-xl font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-8 h-full transition-all">
             <BookOpen className="h-4 w-4 mr-2" /> {isAr ? 'السجل الأكاديمي' : 'Academic Ledger'}
          </TabsTrigger>
          <TabsTrigger value="financial" className="rounded-xl font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-8 h-full transition-all">
             <DollarSign className="h-4 w-4 mr-2" /> {isAr ? 'المركز المالي' : 'Financial Statement'}
          </TabsTrigger>
          <TabsTrigger value="docs" className="rounded-xl font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-8 h-full transition-all">
             <Layers className="h-4 w-4 mr-2" /> {isAr ? 'الخزانة' : 'The Vault'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             {/* Student Details Card */}
             <div className="lg:col-span-8 space-y-8">
                <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
                   <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100">
                      <CardTitle className="text-xl font-black uppercase text-primary flex items-center gap-3">
                         <UserCircle2 className="h-6 w-6 text-secondary" />
                         {isAr ? 'البيانات الشخصية المفصلة' : 'Personal Data Matrix'}
                      </CardTitle>
                   </CardHeader>
                   <CardContent className="p-8 lg:p-12">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
                         {[
                           { label: isAr ? 'الاسم الأول' : 'First Name', value: student.firstName, icon: User },
                           { label: isAr ? 'الاسم الأخير' : 'Last Name', value: student.lastName, icon: User },
                           { label: isAr ? 'تاريخ الميلاد' : 'Date of Birth', value: student.dob, icon: CalendarIcon },
                           { label: isAr ? 'الجنس' : 'Gender', value: student.gender, icon: UserCircle2 },
                           { label: isAr ? 'رقم الهاتف' : 'Contact Phone', value: student.phone, icon: Phone, dir: 'ltr' },
                           { label: isAr ? 'البريد الإلكتروني' : 'Official Email', value: student.email, icon: Mail, lowercase: true },
                           { label: isAr ? 'نوع القيد' : 'Entry Type', value: student.entryType || 'New Student', icon: Award },
                           { label: isAr ? 'المستوى الدراسي' : 'Current Grade', value: `Grade ${student.gradeLevel}`, icon: GraduationCap },
                         ].map((item, idx) => (
                           <div key={idx} className="space-y-2 group">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 group-hover:text-secondary transition-colors">
                                 <item.icon className="h-3 w-3" /> {item.label}
                              </p>
                              <p className={cn("text-base font-bold text-slate-700 border-b border-slate-50 pb-2", item.lowercase && "lowercase", item.dir === 'ltr' && "text-start font-mono")}>
                                 {item.value || '-'}
                              </p>
                           </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>

                {/* Family Accordion Section */}
                <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
                   <CardHeader className="bg-primary p-8 text-white relative">
                      <CardTitle className="text-xl font-black uppercase flex items-center gap-3 relative z-10">
                         <Users className="h-6 w-6 text-secondary" />
                         {isAr ? 'البيانات العائلية والسكن' : 'Family & Household Identity'}
                      </CardTitle>
                      <p className="text-white/40 text-[10px] font-black uppercase tracking-widest relative z-10 mt-1">Multi-parent linked data</p>
                   </CardHeader>
                   <CardContent className="p-4 md:p-8">
                      <Accordion type="single" collapsible className="w-full space-y-4">
                         <AccordionItem value="parent1" className="border border-slate-100 rounded-2xl overflow-hidden px-6 bg-slate-50/50 hover:bg-white transition-all shadow-sm">
                            <AccordionTrigger className="hover:no-underline py-6">
                               <div className="flex items-center gap-4 text-start">
                                  <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg"><User className="h-5 w-5" /></div>
                                  <div>
                                     <p className="text-sm font-black text-primary uppercase">{student.parent1?.name || student.parentName}</p>
                                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'ولي الأمر الأول' : 'Primary Guardian'}</p>
                                  </div>
                               </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-8 pt-2">
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pl-14">
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'رقم الهاتف' : 'Phone'}</p>
                                     <p className="font-bold text-slate-700" dir="ltr">{student.parent1?.phone || student.parentPhone}</p>
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'البريد الإلكتروني' : 'Email'}</p>
                                     <p className="font-bold text-slate-700 lowercase">{student.parent1?.email || student.parentEmail}</p>
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'صلة القرابة' : 'Relationship'}</p>
                                     <p className="font-bold text-slate-700 uppercase">{student.parent1?.relationship || student.relationship1 || '-'}</p>
                                  </div>
                               </div>
                            </AccordionContent>
                         </AccordionItem>

                         {student.parent2?.name && (
                           <AccordionItem value="parent2" className="border border-slate-100 rounded-2xl overflow-hidden px-6 bg-slate-50/50 hover:bg-white transition-all shadow-sm">
                              <AccordionTrigger className="hover:no-underline py-6">
                                 <div className="flex items-center gap-4 text-start">
                                    <div className="h-10 w-10 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center"><User className="h-5 w-5" /></div>
                                    <div>
                                       <p className="text-sm font-black text-primary uppercase">{student.parent2.name}</p>
                                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'ولي الأمر الثاني' : 'Secondary Guardian'}</p>
                                    </div>
                                 </div>
                              </AccordionTrigger>
                              <AccordionContent className="pb-8 pt-2">
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pl-14">
                                    <div className="space-y-1">
                                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'رقم الهاتف' : 'Phone'}</p>
                                       <p className="font-bold text-slate-700" dir="ltr">{student.parent2.phone}</p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'البريد الإلكتروني' : 'Email'}</p>
                                       <p className="font-bold text-slate-700 lowercase">{student.parent2.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'صلة القرابة' : 'Relationship'}</p>
                                       <p className="font-bold text-slate-700 uppercase">{student.parent2.relationship || '-'}</p>
                                    </div>
                                 </div>
                              </AccordionContent>
                           </AccordionItem>
                         )}

                         <AccordionItem value="address" className="border border-slate-100 rounded-2xl overflow-hidden px-6 bg-slate-50/50 hover:bg-white transition-all shadow-sm">
                            <AccordionTrigger className="hover:no-underline py-6">
                               <div className="flex items-center gap-4 text-start">
                                  <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center"><MapPin className="h-5 w-5" /></div>
                                  <div>
                                     <p className="text-sm font-black text-primary uppercase">{isAr ? 'عنوان السكن المثبت' : 'Verified USA Address'}</p>
                                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.address?.city}, {student.address?.state}</p>
                                  </div>
                               </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-8 pt-2">
                               <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-inner grid grid-cols-1 sm:grid-cols-2 gap-8 ml-14">
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'العنوان' : 'Physical Line'}</p>
                                     <p className="font-bold text-slate-700">{student.address?.line1} {student.address?.line2 && `, ${student.address.line2}`}</p>
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'المنطقة والرمز' : 'Region & ZIP'}</p>
                                     <p className="font-bold text-slate-700 uppercase">{student.address?.city}, {student.address?.state} {student.address?.zip}</p>
                                  </div>
                               </div>
                            </AccordionContent>
                         </AccordionItem>
                      </Accordion>
                   </CardContent>
                </Card>
             </div>

             {/* Right Column: Mini Tools */}
             <div className="lg:col-span-4 space-y-8">
                <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-10"><Award className="h-32 w-32 text-secondary" /></div>
                   <div className="space-y-2 relative z-10">
                      <h4 className="text-xl font-black uppercase tracking-tight">{isAr ? 'الحالة الأكاديمية' : 'Status Check'}</h4>
                      <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Real-time Intelligence</p>
                   </div>
                   <div className="space-y-6 relative z-10">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase text-white/60">Edgenuity Sync</span>
                         <Badge className="bg-green-500 text-white border-none font-black text-[9px]">ACTIVE</Badge>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase text-white/60">Mentor Check-in</span>
                         <span className="text-[10px] font-black text-secondary">3 DAYS AGO</span>
                      </div>
                      <Button className="w-full bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-xl h-12 transition-all">
                         {isAr ? 'عرض خطة الدراسة' : 'Open Study Plan'}
                      </Button>
                   </div>
                </Card>

                <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-8 border border-slate-100 flex flex-col items-center text-center space-y-6">
                   <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                      <Heart className="h-8 w-8 fill-current" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-black text-primary uppercase text-sm">{isAr ? 'ملاحظات المعلمين' : 'Educator Notes'}</h4>
                      <p className="text-xs text-slate-400 font-bold leading-relaxed">{isAr ? 'لا توجد ملاحظات سلوكية أو أكاديمية مسجلة حالياً.' : 'No behavioral or special academic flags registered.'}</p>
                   </div>
                   <Button variant="ghost" className="text-secondary font-black uppercase text-[10px] tracking-widest gap-2">
                      <Plus className="h-3 w-3" /> {isAr ? 'إضافة ملاحظة' : 'Add Educator Note'}
                   </Button>
                </Card>
             </div>
          </div>
        </TabsContent>

        <TabsContent value="docs" className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
           <Card className="border-none shadow-premium rounded-[3rem] bg-white overflow-hidden border border-slate-100">
              <CardHeader className="bg-slate-50 p-10 border-b border-slate-100 flex flex-row items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"><Layers className="h-6 w-6 text-secondary" /></div>
                    <div>
                       <CardTitle className="text-xl font-black uppercase text-primary">{isAr ? 'خزانة المستندات الموثقة' : 'Secure Document Vault'}</CardTitle>
                       <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Encrypted Artifact Storage</p>
                    </div>
                 </div>
                 <Button className="rounded-xl font-black text-[10px] h-12 uppercase bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-all gap-2">
                    <Plus className="h-4 w-4" /> {isAr ? 'إرفاق مستند جديد' : 'Upload Artifact'}
                 </Button>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-slate-50">
                    {student.files?.length > 0 ? (
                       student.files.map((file: any, idx: number) => (
                         <div key={idx} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                            <div className="flex items-center gap-6">
                               <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-300 group-hover:text-secondary group-hover:border-secondary/20 transition-all shrink-0">
                                  {file.type?.startsWith('image/') || file.data?.startsWith('data:image/') ? (
                                    <img src={file.data} className="h-full w-full object-cover rounded-2xl" alt="doc" />
                                  ) : (
                                    <FileText className="h-8 w-8" />
                                  )}
                               </div>
                               <div>
                                  <p className="text-sm font-black text-primary uppercase tracking-tight">{file.name}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{Math.round(file.size / 1024)} KB • {file.type || 'Document'}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-3">
                               <Button onClick={() => window.open(file.data, '_blank')} variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-300 hover:text-secondary hover:bg-white hover:shadow-md transition-all">
                                  <Eye className="h-5 w-5" />
                               </Button>
                               <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                                  <Trash2 className="h-5 w-5" />
                               </Button>
                            </div>
                         </div>
                       ))
                    ) : (
                       <div className="py-32 text-center flex flex-col items-center gap-6">
                          <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                             <Layers className="h-12 w-12" />
                          </div>
                          <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{isAr ? 'لا توجد مستندات في الخزانة حالياً' : 'The vault is empty. No artifacts uploaded yet.'}</p>
                       </div>
                    )}
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

