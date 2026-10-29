
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
  Edit3, 
  Save, 
  Loader2, 
  FileText,
  Users,
  MapPin,
  Camera,
  BookOpen,
  ClipboardCheck,
  CreditCard,
  Briefcase,
  Mail,
  Phone,
  Info,
  GraduationCap,
  Building,
  Type,
  Hash,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
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
      personal: isAr ? 'البيانات الشخصية الأساسية' : 'Identity & Vital Statistics',
      residence: isAr ? 'تفاصيل السجل والسكن' : 'Registry & Residence Details',
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
      zip: isAr ? 'الرمز البريدي' : 'ZIP',
      program: isAr ? 'البرنامج' : 'Program'
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
    if (file && studentRef) {
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
    }
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

  const DataField = ({ label, path, type = "text", className = "" }: any) => {
    const value = path.split('.').reduce((acc: any, part: string) => acc && acc[part], editData);
    return (
      <div className={cn("space-y-2 text-start w-full", className)}>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        {isEditing ? (
          <Input 
            type={type}
            value={value || ''} 
            onChange={(e) => handleNestedUpdate(path, e.target.value)}
            className="h-11 bg-slate-50 border-slate-100 font-bold focus:border-primary transition-all w-full"
          />
        ) : (
          <p className={cn("text-base font-bold text-slate-900 leading-tight min-h-[1.5rem]", !value && "text-slate-300 italic")}>
            {value || t.notRegistered}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-20 px-4 sm:px-6">
      <NavigationBar />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
        <Link href={`/${lang}/admin/students`} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shrink-0">
          {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {t.back}
        </Link>
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {t.cancel}
              </Button>
              <Button onClick={saveChanges} disabled={isSaving} className="bg-primary text-white h-11 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                {t.save}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="h-11 px-8 rounded-xl border-slate-200 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
              <Edit3 className="h-4 w-4 mr-2" /> {t.edit}
            </Button>
          )}
        </div>
      </div>

      {/* CARD 1: PRIMARY IDENTITY (Spacious responsive layout) */}
      <Card className="border-none shadow-premium bg-white overflow-hidden rounded-2xl w-full">
        <CardContent className="p-6 md:p-10 lg:p-12">
          <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 lg:gap-16">
             
             {/* PHOTO & BASIC IDENTIFIERS */}
             <div className="flex flex-col items-center gap-6 shrink-0 w-full md:w-48 lg:w-56">
                <div className="relative group w-full max-w-[180px] md:max-w-none aspect-square md:aspect-[4/5]">
                  <div className="h-full w-full rounded-2xl bg-slate-50 border-4 border-white overflow-hidden relative shadow-lg transition-transform duration-500 group-hover:scale-[1.02]">
                    <Image src={profileImage} alt="Student" fill className="object-cover" unoptimized />
                    {isUploadingPhoto && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="h-6 w-6 text-white animate-spin" /></div>}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="absolute -bottom-2 -right-2 h-10 w-10 bg-white shadow-2xl rounded-xl border border-slate-100 flex items-center justify-center text-primary hover:text-secondary transition-all hover:scale-110 active:scale-95"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </div>

                <div className="text-center space-y-3 w-full">
                   <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">ID</p>
                     <p className="text-xs font-black text-primary font-mono truncate">{id?.toUpperCase()}</p>
                   </div>
                   <Badge className={cn(
                       "border-none text-[9px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-sm w-full justify-center",
                       student.status === 'active' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                   )}>{student.status}</Badge>
                </div>
             </div>

             {/* MAIN DATA GRID (3 Rows - Responsive) */}
             <div className="flex-1 w-full space-y-10 lg:space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 lg:gap-x-12">
                   {/* Row 1: Personal Names */}
                   <DataField label={t.fields.firstName} path="firstName" />
                   <DataField label={t.fields.middleName} path="middleName" />
                   <DataField label={t.fields.lastName} path="lastName" />
                   
                   {/* Row 2: Vitals */}
                   <DataField label={t.fields.dob} path="dob" type="date" />
                   <DataField label={t.fields.gender} path="gender" />
                   <DataField label={t.fields.grade} path="gradeLevel" />

                   {/* Row 3: Communication */}
                   <DataField label={t.fields.phone} path="phone" />
                   <DataField label={t.fields.email} path="email" className="sm:col-span-2" />
                </div>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* CARD 2: RESIDENCE & PROGRAM DETAILS */}
      <Card className="border-none shadow-premium bg-white overflow-hidden rounded-2xl w-full">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 md:px-10 py-5">
           <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
              <MapPin className="h-4 w-4 text-secondary" />
              {t.sections.residence}
           </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-10 lg:p-12 space-y-12">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8 lg:gap-x-12">
              <DataField label={t.fields.program} path="program" />
              <DataField label={t.fields.addr1} path="address.line1" className="sm:col-span-1 md:col-span-3" />
              
              <DataField label={t.fields.city} path="address.city" />
              <DataField label={t.fields.state} path="address.state" />
              <DataField label={t.fields.zip} path="address.zip" />
           </div>

           <div className="pt-10 border-t border-slate-50 flex flex-wrap items-center gap-10 md:gap-20">
              <div className="space-y-1.5">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3 text-secondary" />
                    {isAr ? 'تاريخ الانضمام' : 'Joined Since'}
                 </p>
                 <p className="text-sm md:text-base font-black text-slate-700">
                    {student.createdAt && typeof student.createdAt.toDate === 'function' 
                       ? format(student.createdAt.toDate(), 'MMMM dd, yyyy') 
                       : '-'}
                 </p>
              </div>
              <div className="space-y-1.5">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Info className="h-3 w-3 text-secondary" />
                    {isAr ? 'آخر تحديث للسجل' : 'Last Master Update'}
                 </p>
                 <p className="text-sm md:text-base font-black text-secondary">
                    {student.updatedAt && typeof student.updatedAt.toDate === 'function' 
                       ? format(student.updatedAt.toDate(), 'MMMM dd, HH:mm') 
                       : '-'}
                 </p>
              </div>
           </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50/50 p-6 md:p-8 rounded-2xl border border-amber-100 flex items-start gap-5 mx-2 shadow-sm">
         <Info className="h-6 w-6 text-amber-600 shrink-0 mt-1 opacity-60" />
         <div className="space-y-1.5">
            <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest">{isAr ? 'ملاحظة الأرشفة' : 'Registry Note'}</p>
            <p className="text-xs md:text-sm font-bold text-amber-900/60 leading-relaxed italic text-start">
               {isAr 
                  ? 'تم تجميع كافة بيانات الطالب في هذا الملف الموحد لضمان سهولة الوصول والتوثيق الأكاديمي.' 
                  : 'All student vital statistics and residence data have been consolidated into this master profile for streamlined academic documentation.'}
            </p>
         </div>
      </div>
    </div>
  );
}
