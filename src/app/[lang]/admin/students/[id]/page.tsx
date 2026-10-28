
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
  MoreVertical, Edit3, Trash2, Heart, Award, ArrowUpRight,
  Save, X, UserPlus, Info, BadgeCheck, ExternalLink,
  Map, PhoneCall, Type
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const studentRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'students', id);
  }, [firestore, id]);

  const { data: student, loading } = useDoc(studentRef);

  // Local state for editing
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    if (student && !editData) {
      setEditData(student);
    }
  }, [student, editData]);

  const t = {
    notFound: isAr ? 'السجل غير موجود' : 'Record Not Found',
    back: isAr ? 'العودة للسجل' : 'Back to Registry',
    edit: isAr ? 'تعديل الملف' : 'Edit Profile',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    save: isAr ? 'حفظ التغييرات' : 'Save Changes',
    notRegistered: isAr ? 'غير مسجل' : 'Not Registered',
    sections: {
      personal: isAr ? 'البيانات الشخصية' : 'Personal Identity',
      academic: isAr ? 'المسار الأكاديمي' : 'Academic Pathway',
      guardians: isAr ? 'بيانات أولياء الأمور' : 'Guardians & Family',
      address: isAr ? 'عنوان السكن' : 'Verified Residence',
      attachments: isAr ? 'المستندات والمرفقات' : 'Documents & Attachments'
    },
    fields: {
      firstName: isAr ? 'الاسم الأول' : 'First Name',
      lastName: isAr ? 'الاسم الأخير' : 'Last Name',
      middleName: isAr ? 'الاسم الأوسط' : 'Middle Name',
      dob: isAr ? 'تاريخ الميلاد' : 'Date of Birth',
      gender: isAr ? 'الجنس' : 'Gender',
      phone: isAr ? 'رقم الهاتف' : 'Phone Number',
      email: isAr ? 'البريد الإلكتروني' : 'Email Address',
      grade: isAr ? 'الصف الدراسي' : 'Current Grade',
      status: isAr ? 'الحالة الدراسية' : 'Academic Status',
      entryType: isAr ? 'نوع التسجيل' : 'Entry Type',
      regDate: isAr ? 'تاريخ الانضمام' : 'Registry Date',
      guardian: isAr ? 'ولي الأمر' : 'Guardian',
      relation: isAr ? 'الصلة' : 'Relationship',
      addr1: isAr ? 'العنوان الأساسي' : 'Address Line 1',
      addr2: isAr ? 'العنوان الثانوي' : 'Address Line 2',
      city: isAr ? 'المدينة' : 'City',
      state: isAr ? 'الولاية' : 'State',
      zip: isAr ? 'الرمز البريدي' : 'ZIP Code'
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !studentRef) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast({ variant: "destructive", title: isAr ? "تنسيق غير مدعوم" : "Invalid file type" });
      return;
    }

    setIsUploadingPhoto(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      try {
        await updateDoc(studentRef, {
          photoURL: base64,
          updatedAt: serverTimestamp()
        });
        setEditData((prev: any) => ({ ...prev, photoURL: base64 }));
        toast({ title: isAr ? "تم تحديث الصورة" : "Photo updated successfully" });
      } catch (err) {
        toast({ variant: "destructive", title: "Error uploading photo" });
      } finally {
        setIsUploadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = async () => {
    if (!studentRef || !editData) return;
    setIsSaving(true);
    try {
      await updateDoc(studentRef, {
        ...editData,
        updatedAt: serverTimestamp()
      });
      setIsEditing(false);
      toast({ title: isAr ? "تم حفظ التعديلات بنجاح" : "Profile updated successfully" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error saving changes" });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      <div className="h-16 w-16 border-4 border-primary border-t-secondary rounded-full animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Accessing Secure Records...</p>
    </div>
  );

  if (!student || !editData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-10 space-y-6">
      <div className="h-24 w-24 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center shadow-inner">
         <AlertCircle className="h-12 w-12" />
      </div>
      <h2 className="text-2xl font-black text-primary uppercase">{t.notFound}</h2>
      <Button onClick={() => router.push(`/${lang}/admin/students`)} variant="outline" className="rounded-xl h-12 px-8 font-black">
         <ChevronLeft className="h-4 w-4 mr-2" /> {t.back}
      </Button>
    </div>
  );

  const defaultImage = student.gender === 'Female' ? '/Female.png' : '/Male.png';
  const profileImage = editData.photoURL || defaultImage;

  const DataField = ({ label, value, icon: Icon, field, type = "text", options = null }: any) => {
    const displayValue = value || t.notRegistered;
    
    return (
      <div className="space-y-1.5 group">
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-secondary transition-colors">
          {Icon && <Icon className="h-3 w-3" />}
          {label}
        </div>
        {isEditing ? (
          options ? (
            <Select 
              value={editData[field]} 
              onValueChange={(v) => setEditData({ ...editData, [field]: v })}
            >
              <SelectTrigger className="h-10 bg-slate-50 border-none font-bold rounded-lg focus:ring-secondary/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {options.map((opt: any) => (
                  <SelectItem key={opt.value} value={opt.value} className="font-bold">{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input 
              type={type}
              value={editData[field] || ''} 
              onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
              className="h-10 bg-slate-50 border-none font-bold rounded-lg focus:ring-secondary/10"
            />
          )
        ) : (
          <p className={cn(
            "text-sm font-bold text-slate-700 pb-2 border-b border-slate-50",
            !value && "text-slate-300 italic font-medium"
          )}>
            {displayValue}
          </p>
        )}
      </div>
    );
  };

  const GuardianDataField = ({ label, value, icon: Icon, parentKey, field }: any) => {
    const parentData = editData[parentKey] || {};
    const displayValue = value || t.notRegistered;

    return (
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
          {Icon && <Icon className="h-3 w-3" />}
          {label}
        </div>
        {isEditing ? (
          <Input 
            value={parentData[field] || ''} 
            onChange={(e) => {
              const newParent = { ...parentData, [field]: e.target.value };
              setEditData({ ...editData, [parentKey]: newParent });
            }}
            className="h-10 bg-white border-slate-100 font-bold rounded-lg"
          />
        ) : (
          <p className={cn("text-sm font-bold text-slate-700", !value && "text-slate-300 italic font-medium")}>{displayValue}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-32 max-w-7xl mx-auto px-4 lg:px-8">
      
      {/* 1. TOP NAVIGATION & ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => router.push(`/${lang}/admin/students`)} className="rounded-xl hover:bg-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest gap-2">
          {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {t.back}
        </Button>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isEditing ? (
            <>
              <Button onClick={() => { setIsEditing(false); setEditData(student); }} variant="outline" className="flex-1 sm:flex-none h-12 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest gap-2">
                <X className="h-4 w-4" /> {t.cancel}
              </Button>
              <Button onClick={saveChanges} disabled={isSaving} className="flex-1 sm:flex-none h-12 rounded-xl bg-secondary text-white font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-secondary/20">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {t.save}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto h-12 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest gap-2 shadow-xl shadow-primary/20">
              <Edit3 className="h-4 w-4 text-secondary" /> {t.edit}
            </Button>
          )}
        </div>
      </div>

      {/* 2. HERO STUDENT CARD */}
      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-primary to-slate-900 opacity-95" />
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <GraduationCap className="h-64 w-64 text-white" />
         </div>

         <CardContent className="p-8 lg:p-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
               {/* Avatar Area */}
               <div className="relative shrink-0">
                  <div className="h-44 w-44 rounded-[2.5rem] bg-white border-4 border-white/20 shadow-2xl overflow-hidden relative group/photo">
                     <Image 
                        src={profileImage} 
                        alt="Student Profile" 
                        fill 
                        className="object-cover" 
                        unoptimized 
                     />
                     {isUploadingPhoto && (
                       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                         <Loader2 className="h-8 w-8 text-white animate-spin" />
                       </div>
                     )}
                     <button 
                       onClick={() => fileInputRef.current?.click()}
                       className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all duration-300 backdrop-blur-[2px]"
                     >
                       <Camera className="h-7 w-7 mb-1" />
                       <span className="text-[9px] font-black uppercase tracking-widest">{isAr ? 'تغيير الصورة' : 'Update Photo'}</span>
                     </button>
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                  
                  {/* Floating Status */}
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-xl border-4 border-primary">
                    {student.status}
                  </div>
               </div>

               {/* Bio Info */}
               <div className="text-center lg:text-start space-y-4">
                  <div className="space-y-1">
                     <p className="text-secondary font-black text-xs uppercase tracking-[0.3em]">{isAr ? 'بيانات الطالب المعتمدة' : 'Official Student Record'}</p>
                     <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        {student.firstName} {student.lastName}
                     </h1>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                     <div className="px-5 py-2 bg-white/10 rounded-xl text-white text-xs font-black uppercase tracking-widest flex items-center gap-3 border border-white/5 backdrop-blur-md">
                        <Hash className="h-4 w-4 text-secondary" />
                        ID: {student.id.slice(-6).toUpperCase()}
                     </div>
                     <div className="px-5 py-2 bg-white/10 rounded-xl text-white text-xs font-black uppercase tracking-widest flex items-center gap-3 border border-white/5 backdrop-blur-md">
                        <GraduationCap className="h-4 w-4 text-secondary" />
                        Grade {student.gradeLevel}
                     </div>
                     <div className="px-5 py-2 bg-secondary text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-lg">
                        <Briefcase className="h-4 w-4" />
                        {student.programOption}
                     </div>
                  </div>
               </div>

               {/* Right Actions Grid */}
               <div className="hidden xl:grid grid-cols-2 gap-4 ml-auto">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center space-y-2 backdrop-blur-md">
                     <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Progress</p>
                     <p className="text-2xl font-black text-white">{student.academicPlan?.progress || 0}%</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center space-y-2 backdrop-blur-md">
                     <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Balance</p>
                     <p className="text-2xl font-black text-secondary">${((student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0)).toLocaleString()}</p>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* 3. MAIN DATA SECTIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
         
         {/* Main Content (8 cols) */}
         <div className="lg:col-span-8 space-y-10">
            
            {/* PERSONAL DATA SECTION */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100 flex flex-row items-center gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg"><User className="h-6 w-6 text-secondary" /></div>
                  <div>
                    <CardTitle className="text-xl font-black uppercase text-primary tracking-tight">{t.sections.personal}</CardTitle>
                    <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">Identity & Vital Statistics</p>
                  </div>
               </CardHeader>
               <CardContent className="p-8 lg:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                     <DataField label={t.fields.firstName} value={editData.firstName} field="firstName" icon={Type} />
                     <DataField label={t.fields.middleName} value={editData.middleName} field="middleName" icon={Type} />
                     <DataField label={t.fields.lastName} value={editData.lastName} field="lastName" icon={Type} />
                     <DataField label={t.fields.dob} value={editData.dob} field="dob" icon={CalendarIcon} type="date" />
                     <DataField 
                       label={t.fields.gender} 
                       value={editData.gender} 
                       field="gender" 
                       icon={UserCircle2} 
                       options={[{ value: 'Male', label: isAr ? 'ذكر' : 'Male' }, { value: 'Female', label: isAr ? 'أنثى' : 'Female' }]} 
                     />
                     <DataField label={t.fields.entryType} value={editData.entryType} field="entryType" icon={BadgeCheck} />
                     <DataField label={t.fields.phone} value={editData.phone} field="phone" icon={Phone} />
                     <div className="sm:col-span-2">
                        <DataField label={t.fields.email} value={editData.email} field="email" icon={Mail} />
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* GUARDIANS SECTION (Accordions) */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="bg-primary p-8 text-white flex flex-row items-center gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg"><Users className="h-6 w-6" /></div>
                  <div>
                    <CardTitle className="text-xl font-black uppercase tracking-tight">{t.sections.guardians}</CardTitle>
                    <p className="text-white/40 font-bold text-[9px] uppercase tracking-widest">Parental Linked Contacts</p>
                  </div>
               </CardHeader>
               <CardContent className="p-6 md:p-8">
                  <Accordion type="single" collapsible defaultValue="p1" className="space-y-4">
                     {/* Parent 1 */}
                     <AccordionItem value="p1" className="border border-slate-100 rounded-3xl bg-slate-50/50 hover:bg-white transition-all shadow-sm overflow-hidden px-6">
                        <AccordionTrigger className="hover:no-underline py-6">
                           <div className="flex items-center gap-5 text-start">
                              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-sm"><User className="h-6 w-6" /></div>
                              <div>
                                 <p className="text-sm font-black text-primary uppercase tracking-tight">{editData.parent1?.name || editData.parentName || t.notRegistered}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'ولي الأمر الأول' : 'Primary Guardian'}</p>
                              </div>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-8 pt-2">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-16">
                              <GuardianDataField label={t.fields.relation} value={editData.parent1?.relationship || editData.relationship1} parentKey="parent1" field="relationship" icon={Heart} />
                              <GuardianDataField label={t.fields.phone} value={editData.parent1?.phone || editData.parentPhone} parentKey="parent1" field="phone" icon={Phone} />
                              <div className="md:col-span-2">
                                <GuardianDataField label={t.fields.email} value={editData.parent1?.email || editData.parentEmail} parentKey="parent1" field="email" icon={Mail} />
                              </div>
                           </div>
                        </AccordionContent>
                     </AccordionItem>

                     {/* Parent 2 */}
                     <AccordionItem value="p2" className="border border-slate-100 rounded-3xl bg-slate-50/50 hover:bg-white transition-all shadow-sm overflow-hidden px-6">
                        <AccordionTrigger className="hover:no-underline py-6">
                           <div className="flex items-center gap-5 text-start">
                              <div className="h-12 w-12 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center shrink-0 shadow-sm"><User className="h-6 w-6" /></div>
                              <div>
                                 <p className="text-sm font-black text-primary uppercase tracking-tight">{editData.parent2?.name || t.notRegistered}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'ولي الأمر الثاني' : 'Secondary Guardian'}</p>
                              </div>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-8 pt-2">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-16">
                              <GuardianDataField label={t.fields.relation} value={editData.parent2?.relationship} parentKey="parent2" field="relationship" icon={Heart} />
                              <GuardianDataField label={t.fields.phone} value={editData.parent2?.phone} parentKey="parent2" field="phone" icon={Phone} />
                              <div className="md:col-span-2">
                                <GuardianDataField label={t.fields.email} value={editData.parent2?.email} parentKey="parent2" field="email" icon={Mail} />
                              </div>
                           </div>
                        </AccordionContent>
                     </AccordionItem>

                     {/* Household Address */}
                     <AccordionItem value="address" className="border border-slate-100 rounded-3xl bg-slate-50/50 hover:bg-white transition-all shadow-sm overflow-hidden px-6">
                        <AccordionTrigger className="hover:no-underline py-6">
                           <div className="flex items-center gap-5 text-start">
                              <div className="h-12 w-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-sm"><MapPin className="h-6 w-6" /></div>
                              <div>
                                 <p className="text-sm font-black text-primary uppercase tracking-tight">{editData.address?.city}, {editData.address?.state}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.sections.address}</p>
                              </div>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-8 pt-2">
                           <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-8 ml-16">
                              <div className="md:col-span-2">
                                <DataField label={t.fields.addr1} value={editData.address?.line1} field="line1" icon={Home} />
                              </div>
                              <DataField label={t.fields.addr2} value={editData.address?.line2} field="line2" icon={Building} />
                              <DataField label={t.fields.city} value={editData.address?.city} field="city" icon={Building} />
                              <DataField label={t.fields.state} value={editData.address?.state} field="state" icon={Map} />
                              <DataField label={t.fields.zip} value={editData.address?.zip} field="zip" icon={Hash} />
                           </div>
                        </AccordionContent>
                     </AccordionItem>
                  </Accordion>
               </CardContent>
            </Card>

            {/* ATTACHMENTS SECTION */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="attachments" className="border-none">
                     <AccordionTrigger className="hover:no-underline p-0 w-full group">
                        <div className="bg-slate-900 w-full p-8 flex items-center justify-between transition-colors group-hover:bg-slate-800">
                           <div className="flex items-center gap-5 text-start">
                              <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg shadow-secondary/20"><Layers className="h-6 w-6" /></div>
                              <div>
                                <CardTitle className="text-xl font-black uppercase text-white tracking-tight">{t.sections.attachments}</CardTitle>
                                <p className="text-white/30 font-bold text-[9px] uppercase tracking-widest">Encrypted Document Vault • {editData.files?.length || 0} Artifacts</p>
                              </div>
                           </div>
                           <ChevronDown className="h-6 w-6 text-white/30 group-hover:text-white transition-all mr-6" />
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="p-0 animate-in slide-in-from-top-4 duration-500">
                        <div className="divide-y divide-slate-50">
                           {editData.files?.length > 0 ? (
                             editData.files.map((file: any, i: number) => (
                               <div key={i} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                                  <div className="flex items-center gap-6">
                                     <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 shadow-sm overflow-hidden shrink-0">
                                        {file.type?.startsWith('image/') || file.data?.startsWith('data:image/') ? (
                                          <img src={file.data} className="h-full w-full object-cover" alt="artifact" />
                                        ) : (
                                          <FileText className="h-8 w-8" />
                                        )}
                                     </div>
                                     <div>
                                        <p className="text-sm font-black text-primary uppercase tracking-tight">{file.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{Math.round(file.size / 1024)} KB • {file.type || 'Document'}</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                     <Button onClick={() => window.open(file.data, '_blank')} variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-300 hover:text-secondary hover:bg-white hover:shadow-md">
                                        <Eye className="h-5 w-5" />
                                     </Button>
                                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50">
                                        <Trash2 className="h-5 w-5" />
                                     </Button>
                                  </div>
                               </div>
                             ))
                           ) : (
                             <div className="py-24 text-center flex flex-col items-center gap-5">
                                <Layers className="h-16 w-16 text-slate-100" />
                                <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest px-10">The vault is empty. No documents uploaded for this student.</p>
                             </div>
                           )}
                           <div className="p-8 bg-slate-50/50 flex justify-center">
                              <Button variant="outline" className="rounded-xl border-dashed border-2 border-slate-200 text-slate-400 font-black text-[10px] uppercase h-14 px-10 gap-3 hover:border-secondary hover:text-secondary transition-all">
                                 <Plus className="h-5 w-5" /> {isAr ? 'رفع مستند جديد' : 'Upload New Artifact'}
                              </Button>
                           </div>
                        </div>
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </Card>
         </div>

         {/* Sidebar Tools (4 cols) */}
         <div className="lg:col-span-4 space-y-10">
            
            {/* ACADEMIC OVERVIEW */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white p-10 space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10"><Award className="h-32 w-32 text-secondary" /></div>
               <div className="space-y-2 relative z-10">
                  <h4 className="text-xl font-black uppercase tracking-tight">{t.sections.academic}</h4>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Real-time Performance Metrics</p>
               </div>

               <div className="space-y-8 relative z-10">
                  <div className="space-y-3">
                     <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Course Progress</span>
                        <span className="text-2xl font-black text-white">{student.academicPlan?.progress || 0}%</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary shadow-[0_0_15px_rgba(var(--secondary),0.5)] transition-all duration-1000" style={{ width: `${student.academicPlan?.progress || 0}%` }} />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                        <p className="text-[9px] font-black text-white/40 uppercase mb-1">Completed</p>
                        <p className="text-xl font-black text-white">{student.academicPlan?.courses?.filter((c:any) => c.status === 'completed').length || 0}</p>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                        <p className="text-[9px] font-black text-white/40 uppercase mb-1">In Progress</p>
                        <p className="text-xl font-black text-secondary">{student.academicPlan?.courses?.filter((c:any) => c.status === 'active').length || 0}</p>
                     </div>
                  </div>

                  <Button className="w-full bg-secondary hover:bg-white hover:text-secondary text-white font-black rounded-xl h-14 transition-all shadow-xl shadow-secondary/10">
                    <BookOpen className="h-5 w-5 mr-3" /> {isAr ? 'فتح خطة الدراسة' : 'Open Study Planner'}
                  </Button>
               </div>
            </Card>

            {/* QUICK STATS & FINANCE */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10 space-y-10 border border-slate-100">
               <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="h-10 w-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center"><DollarSign className="h-5 w-5" /></div>
                  <h4 className="font-black text-primary uppercase text-sm tracking-widest">{isAr ? 'البيانات المالية' : 'Financial Ledger'}</h4>
               </div>

               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-slate-400">{isAr ? 'إجمالي الرسوم' : 'Total Due'}</span>
                     <span className="font-black text-slate-900">${student.financialLedger?.totalDue?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-slate-400">{isAr ? 'المبلغ المحصل' : 'Total Paid'}</span>
                     <span className="font-black text-green-500">${student.financialLedger?.totalPaid?.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                     <span className="text-xs font-black text-primary uppercase">{isAr ? 'الرصيد المتبقي' : 'Outstanding'}</span>
                     <span className="text-2xl font-black text-red-500">${((student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0)).toLocaleString()}</span>
                  </div>
                  
                  <Button variant="outline" className="w-full h-14 rounded-xl border-slate-100 font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-slate-50 transition-all">
                     <ArrowUpRight className="h-4 w-4" /> {isAr ? 'عرض الفواتير' : 'View All Invoices'}
                  </Button>
               </div>
            </Card>

            {/* EDUCATOR NOTES */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10 border border-slate-100 flex flex-col items-center text-center space-y-6">
               <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary group">
                  <Heart className="h-10 w-10 fill-current group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="space-y-2">
                  <h4 className="font-black text-primary uppercase text-sm">{isAr ? 'ملاحظات المعلمين' : 'Educator Insights'}</h4>
                  <p className="text-xs text-slate-400 font-bold leading-relaxed">{isAr ? 'لا توجد تنبيهات سلوكية أو أكاديمية حالياً.' : 'No behavioral flags or internal academic warnings registered.'}</p>
               </div>
               <Button variant="ghost" className="text-secondary font-black uppercase text-[10px] tracking-[0.2em] gap-2 hover:bg-secondary/5 h-12 px-8 rounded-xl transition-all">
                  <Plus className="h-4 w-4" /> {isAr ? 'إضافة ملاحظة' : 'Add Internal Note'}
               </Button>
            </Card>
         </div>
      </div>
    </div>
  );
}

