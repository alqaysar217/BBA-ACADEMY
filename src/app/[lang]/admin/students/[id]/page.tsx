
'use client';

import { use, useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  User, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  UserCircle2, 
  Edit3, 
  Save, 
  X, 
  BadgeCheck, 
  ClipboardCheck,
  CreditCard,
  Layers,
  Eye,
  Loader2,
  FileText,
  Users,
  ShieldCheck,
  Calendar as CalendarIcon,
  Type,
  Hash,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';

export default function StudentProfilePage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const studentRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'students', id);
  }, [firestore, id]);

  const { data: student, loading } = useDoc(studentRef);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    if (student && !editData) {
      setEditData(student);
    }
  }, [student, editData]);

  const t = {
    title: isAr ? 'الملف الشخصي للطالب' : 'Student Identity Profile',
    back: isAr ? 'العودة للسجل' : 'Back to Registry',
    edit: isAr ? 'تعديل الملف' : 'Edit Profile',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    save: isAr ? 'حفظ التغييرات' : 'Save Changes',
    notRegistered: isAr ? 'غير مسجل' : 'Not Registered',
    nav: {
      profile: isAr ? 'الهوية' : 'Identity',
      guardians: isAr ? 'أولياء الأمور' : 'Guardians',
      documents: isAr ? 'المستندات' : 'Documents',
      academic: isAr ? 'خطة الطالب' : 'Study Plan',
      grades: isAr ? 'الدرجات' : 'Grades',
      finances: isAr ? 'المالية' : 'Finances'
    },
    sections: {
      personal: isAr ? 'البيانات الشخصية والأساسية' : 'Identity & Vital Statistics',
      residence: isAr ? 'عنوان السكن المسجل' : 'Registered Residence',
    },
    fields: {
      firstName: isAr ? 'الاسم الأول' : 'First Name',
      lastName: isAr ? 'الاسم الأخير' : 'Last Name',
      middleName: isAr ? 'الاسم الأوسط' : 'Middle Name',
      dob: isAr ? 'تاريخ الميلاد' : 'Date of Birth',
      gender: isAr ? 'الجنس' : 'Gender',
      phone: isAr ? 'رقم الهاتف' : 'Phone Number',
      email: isAr ? 'البريد الإلكتروني' : 'Email Address',
      grade: isAr ? 'الصف الدراسي' : 'Grade Level',
      status: isAr ? 'الحالة' : 'Status',
      addr1: isAr ? 'العنوان' : 'Address',
      city: isAr ? 'المدينة' : 'City',
      state: isAr ? 'الولاية' : 'State',
      zip: isAr ? 'الرمز البريدي' : 'ZIP'
    }
  };

  const NavigationBar = () => {
    const navItems = [
      { id: 'profile', label: t.nav.profile, icon: User, href: `/${lang}/admin/students/${id}` },
      { id: 'guardians', label: t.nav.guardians, icon: Users, href: `/${lang}/admin/students/${id}/guardians` },
      { id: 'documents', label: t.nav.documents, icon: FileText, href: `/${lang}/admin/students/${id}/documents` },
      { id: 'academic', label: t.nav.academic, icon: BookOpen, href: `/${lang}/admin/students/${id}/plans` },
      { id: 'grades', label: t.nav.grades, icon: ClipboardCheck, href: `/${lang}/admin/students/${id}/grades` },
      { id: 'finances', label: t.nav.finances, icon: CreditCard, href: `/${lang}/admin/students/${id}/finances` },
    ];

    return (
      <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar bg-white/50 p-1 rounded-xl">
         {navItems.map(nav => {
           const isActive = pathname === nav.href;
           return (
             <Link 
               key={nav.id} 
               href={nav.href}
               className={cn(
                 "px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg whitespace-nowrap flex items-center gap-2",
                 isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:text-primary hover:bg-slate-50"
               )}
             >
                <nav.icon className="h-3.5 w-3.5" />
                {nav.label}
             </Link>
           )
         })}
      </div>
    );
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !studentRef) return;
    setIsUploadingPhoto(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      try {
        await updateDoc(studentRef, { photoURL: base64, updatedAt: serverTimestamp() });
        setEditData((prev: any) => ({ ...prev, photoURL: base64 }));
        toast({ title: isAr ? "تم تحديث الصورة" : "Photo updated" });
      } finally {
        setIsUploadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNestedUpdate = (path: string, value: any) => {
    setEditData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const saveChanges = async () => {
    if (!studentRef || !editData) return;
    setIsSaving(true);
    try {
      await updateDoc(studentRef, { ...editData, updatedAt: serverTimestamp() });
      setIsEditing(false);
      toast({ title: isAr ? "تم حفظ التعديلات" : "Saved" });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !student || !editData) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-primary animate-spin" />
    </div>
  );

  const defaultImage = student.gender === 'Female' ? '/Female.png' : '/Male.png';
  const profileImage = editData.photoURL || defaultImage;

  const DataField = ({ label, path, type = "text" }: any) => {
    const value = path.split('.').reduce((acc: any, part: string) => acc && acc[part], editData);
    return (
      <div className="space-y-1 text-start">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        {isEditing ? (
          <Input 
            type={type}
            value={value || ''} 
            onChange={(e) => handleNestedUpdate(path, e.target.value)}
            className="h-10 bg-slate-50 border-slate-100 font-bold focus:border-primary"
          />
        ) : (
          <p className={cn("text-sm font-bold text-slate-900", !value && "text-slate-300 italic")}>
            {value || t.notRegistered}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* 1. NAVIGATION BAR - MOVED TO TOP */}
      <NavigationBar />

      {/* 2. TOP HEADER BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
        <Link href={`/${lang}/admin/students`} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
          {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {t.back}
        </Link>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {t.cancel}
              </Button>
              <Button onClick={saveChanges} disabled={isSaving} className="bg-primary text-white h-10 px-6 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-lg">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                {t.save}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="h-10 px-6 rounded-lg border-slate-200 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
              <Edit3 className="h-4 w-4 mr-2" /> {t.edit}
            </Button>
          )}
        </div>
      </div>

      {/* 3. STUDENT HERO CARD */}
      <Card className="border-none shadow-premium bg-white overflow-hidden">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
           <div className="relative group shrink-0">
              <div className="h-40 w-40 rounded-3xl bg-slate-50 border-4 border-white overflow-hidden relative shadow-2xl">
                <Image src={profileImage} alt="Student" fill className="object-cover" unoptimized />
                {isUploadingPhoto && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="h-6 w-6 text-white animate-spin" /></div>}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="absolute -bottom-2 -right-2 h-10 w-10 bg-white shadow-2xl rounded-xl border border-slate-100 flex items-center justify-center text-primary hover:text-secondary transition-all"
              >
                <Camera className="h-5 w-5" />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
           </div>

           <div className="text-center md:text-start space-y-4 flex-1">
              <div className="space-y-1">
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                   <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tighter uppercase">{student.firstName} {student.lastName}</h1>
                   <Badge className={cn(
                      "border-none text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm",
                      student.status === 'active' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                   )}>{student.status}</Badge>
                 </div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">STUDENT ID: {id?.toUpperCase()}</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-12 border-t border-slate-50 pt-6">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.fields.grade}</p>
                    <p className="text-lg font-black text-slate-700">Grade {student.gradeLevel}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.fields.gender}</p>
                    <p className="text-lg font-black text-slate-700">{student.gender}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'البرنامج' : 'Program'}</p>
                    <p className="text-lg font-black text-secondary uppercase tracking-tight">{student.program || '-'}</p>
                 </div>
              </div>
           </div>
        </CardContent>
      </Card>

      {/* 4. MAIN DATA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-4 text-start">
              <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-secondary" />
                {t.sections.personal}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12">
               <DataField label={t.fields.firstName} path="firstName" />
               <DataField label={t.fields.middleName} path="middleName" />
               <DataField label={t.fields.lastName} path="lastName" />
               <DataField label={t.fields.dob} path="dob" type="date" />
               <DataField label={t.fields.gender} path="gender" />
               <DataField label={t.fields.grade} path="gradeLevel" />
               <DataField label={t.fields.phone} path="phone" />
               <div className="sm:col-span-2">
                <DataField label={t.fields.email} path="email" />
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
             <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-4 text-start">
                <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-secondary" />
                  {t.sections.residence}
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8 lg:p-10">
                <div className="space-y-10">
                  <DataField label={t.fields.addr1} path="address.line1" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                     <DataField label={t.fields.city} path="address.city" />
                     <DataField label={t.fields.state} path="address.state" />
                     <DataField label={t.fields.zip} path="address.zip" />
                  </div>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* 5. SIDEBAR: QUICK INFO */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><ClipboardCheck className="h-32 w-32 text-secondary" /></div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{isAr ? 'الإحصائيات السريعة' : 'Registry Status'}</h4>
              <div className="space-y-6 relative z-10">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{isAr ? 'تاريخ الالتحاق' : 'Joined Since'}</p>
                    <p className="text-base font-black">
                      {student.createdAt && typeof student.createdAt.toDate === 'function' 
                         ? format(student.createdAt.toDate(), 'MMMM dd, yyyy') 
                         : '-'}
                    </p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{isAr ? 'آخر تحديث للملف' : 'Last Synced'}</p>
                    <p className="text-base font-black text-secondary">
                      {student.updatedAt && typeof student.updatedAt.toDate === 'function' 
                         ? format(student.updatedAt.toDate(), 'MMMM dd, HH:mm') 
                         : '-'}
                    </p>
                 </div>
              </div>
           </Card>
           
           <Card className="border-none shadow-sm bg-white p-8 space-y-6 border border-slate-100">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center"><BookOpen className="h-5 w-5" /></div>
                 <h4 className="text-xs font-black uppercase tracking-widest text-primary">{isAr ? 'المسار التعليمي' : 'Academic Path'}</h4>
              </div>
              <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                 {isAr ? 'يتم إدارة المنهج الدراسي وتقدم الطالب من خلال تبويب "خطة الطالب" المدمج مع Edgenuity.' : 'Curriculum and progress are managed through the Study Plan tab integrated with Edgenuity.'}
              </p>
              <Button asChild variant="outline" className="w-full h-12 rounded-xl border-slate-200 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-slate-50">
                 <Link href={`/${lang}/admin/students/${id}/plans`}>{isAr ? 'عرض الخطة الدراسية' : 'Access Study Plan'}</Link>
              </Button>
           </Card>
        </div>
      </div>
    </div>
  );
}

