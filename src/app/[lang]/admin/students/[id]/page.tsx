
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

// Sub-component for Data Field to ensure stable rendering and focus management
const DataField = ({ label, value, path, type = "text", isEditing, onUpdate, icon: Icon, placeholder, className = "" }: any) => {
  return (
    <div className={cn("space-y-1.5 text-start w-full", className)}>
      <div className="flex items-center gap-2 px-1">
        {Icon && <Icon className="h-3 w-3 text-secondary/70" />}
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
          {label}
        </p>
      </div>
      {isEditing ? (
        <Input 
          type={type}
          value={value || ''} 
          onChange={(e) => onUpdate(path, e.target.value)}
          className="h-11 bg-white border-slate-200 rounded-xl font-bold focus:border-primary transition-all w-full shadow-sm"
          placeholder={placeholder}
        />
      ) : (
        <div className={cn(
          "min-h-[2.75rem] flex items-center px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl transition-all duration-300 hover:border-secondary/20 hover:bg-white hover:shadow-sm",
          !value && "opacity-60"
        )}>
          <p className={cn("text-sm md:text-base font-bold text-slate-700 leading-tight truncate w-full", !value && "text-slate-300 italic font-medium")}>
            {value || '---'}
          </p>
        </div>
      )}
    </div>
  );
};

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
      addr1: isAr ? 'العنوان (السطر 1)' : 'Address Line 1',
      addr2: isAr ? 'العنوان (السطر 2)' : 'Address Line 2',
      city: isAr ? 'المدينة' : 'City',
      state: isAr ? 'الولاية' : 'State',
      zip: isAr ? 'الرمز البريدي' : 'ZIP',
      program: isAr ? 'البرنامج' : 'Program'
    }
  };

  const navItems = [
    { id: 'profile', label: t.nav.profile, icon: User, href: `/${lang}/admin/students/${id}` },
    { id: 'guardians', label: t.nav.guardians, icon: Users, href: `/${lang}/admin/students/${id}/guardians` },
    { id: 'documents', label: t.nav.documents, icon: FileText, href: `/${lang}/admin/students/${id}/documents` },
    { id: 'academic', label: t.nav.academic, icon: BookOpen, href: `/${lang}/admin/students/${id}/plans` },
    { id: 'grades', label: t.nav.grades, icon: ClipboardCheck, href: `/${lang}/admin/students/${id}/grades` },
    { id: 'finances', label: t.nav.finances, icon: CreditCard, href: `/${lang}/admin/students/${id}/finances` },
  ];

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new (window as any).Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 600; 
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && studentRef) {
      setIsUploadingPhoto(true);
      try {
        const base64 = await compressImage(file);
        await updateDoc(studentRef, { photoURL: base64, updatedAt: serverTimestamp() });
        setEditData((prev: any) => ({ ...prev, photoURL: base64 }));
        toast({ title: isAr ? "تم تحديث الصورة" : "Photo updated" });
      } catch (err: any) {
        console.error(err);
        toast({ variant: "destructive", title: isAr ? "فشل رفع الصورة" : "Upload failed", description: err.message });
      } finally {
        setIsUploadingPhoto(false);
      }
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
      toast({ title: isAr ? "تم حفظ التعديلات" : "Saved Changes Successfully" });
    } finally {
      setIsSaving(false);
    }
  };

  const getValueByPath = (path: string) => {
    return path.split('.').reduce((acc: any, part: string) => acc && acc[part], editData);
  };

  if (loading || !student || !editData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'جاري التحميل...' : 'Syncing Data...'}</p>
    </div>
  );

  const profileImage = editData.photoURL || (student.gender === 'Female' ? '/Female.png' : '/Male.png');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      
      {/* 1. Navigation Bar (Stable implementation) */}
      <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar bg-white/50 p-1 rounded-xl">
         {navItems.map(nav => {
           const isActive = pathname === nav.href;
           return (
             <Link 
               key={nav.id} 
               href={isActive ? '#' : nav.href}
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
              <Button onClick={saveChanges} disabled={isSaving} className="bg-primary text-white h-11 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2 text-secondary" />}
                {t.save}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="h-11 px-8 rounded-xl border-slate-200 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
              <Edit3 className="h-4 w-4 mr-2 text-secondary" /> {t.edit}
            </Button>
          )}
        </div>
      </div>

      {/* 2. MAIN IDENTITY CARD (Three Rows Layout) */}
      <Card className="border-none shadow-premium bg-white overflow-hidden rounded-2xl w-full">
        <CardContent className="p-6 md:p-10 lg:p-12">
          <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 lg:gap-16">
             
             {/* LEFT: PHOTO & ID/STATUS */}
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
                   <div className="px-4 py-2 bg-slate-50/50 rounded-xl border border-slate-100 shadow-inner">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">ID</p>
                     <p className="text-xs font-black text-primary font-mono truncate">{id?.toUpperCase()}</p>
                   </div>
                   <Badge className={cn(
                       "border-none text-[9px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-sm w-full justify-center",
                       editData.status === 'active' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
                   )}>{editData.status || 'inactive'}</Badge>
                </div>
             </div>

             {/* RIGHT: VITAL DATA (3 Organized Rows) */}
             <div className="flex-1 w-full flex flex-col justify-center space-y-8 md:space-y-10">
                {/* Row 1: Full Names */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   <DataField label={t.fields.firstName} value={getValueByPath('firstName')} path="firstName" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={User} />
                   <DataField label={t.fields.middleName} value={getValueByPath('middleName')} path="middleName" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={Type} />
                   <DataField label={t.fields.lastName} value={getValueByPath('lastName')} path="lastName" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={User} />
                </div>
                
                {/* Row 2: Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   <DataField label={t.fields.dob} value={getValueByPath('dob')} path="dob" type="date" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={CalendarIcon} />
                   <DataField label={t.fields.gender} value={getValueByPath('gender')} path="gender" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={Users} />
                   <DataField label={t.fields.grade} value={getValueByPath('gradeLevel')} path="gradeLevel" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={GraduationCap} />
                </div>

                {/* Row 3: Direct Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   <DataField label={t.fields.phone} value={getValueByPath('phone')} path="phone" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={Phone} />
                   <div className="sm:col-span-2">
                     <DataField label={t.fields.email} value={getValueByPath('email')} path="email" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={Mail} />
                   </div>
                </div>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* CARD 2: PROGRAM & RESIDENCE DETAILS */}
      <Card className="border-none shadow-premium bg-white overflow-hidden rounded-2xl w-full">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 md:px-10 py-5">
           <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
              <MapPin className="h-4 w-4 text-secondary" />
              {t.sections.residence}
           </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-10 lg:p-12 space-y-10">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <DataField label={t.fields.program} value={getValueByPath('program')} path="program" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={Briefcase} />
              <div className="sm:col-span-1 md:col-span-3">
                <DataField label={t.fields.addr1} value={getValueByPath('address.line1')} path="address.line1" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={MapPin} />
              </div>
              
              <DataField label={t.fields.addr2} value={getValueByPath('address.line2')} path="address.line2" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={MapPin} />
              <DataField label={t.fields.city} value={getValueByPath('address.city')} path="address.city" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={Building} />
              <DataField label={t.fields.state} value={getValueByPath('address.state')} path="address.state" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={MapPin} />
              <DataField label={t.fields.zip} value={getValueByPath('address.zip')} path="address.zip" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={Hash} />
           </div>

           <div className="pt-10 border-t border-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center gap-6 md:gap-16">
              <div className="space-y-2 flex-1">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                    <CalendarIcon className="h-3 w-3 text-secondary/70" />
                    {isAr ? 'تاريخ الانضمام' : 'Joined Since'}
                 </p>
                 <div className="min-h-[2.75rem] flex items-center px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <p className="text-sm md:text-base font-black text-slate-700">
                       {editData.createdAt && typeof editData.createdAt.toDate === 'function' 
                          ? format(editData.createdAt.toDate(), 'MMMM dd, yyyy') 
                          : '-'}
                    </p>
                 </div>
              </div>
              <div className="space-y-2 flex-1">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                    <Info className="h-3 w-3 text-secondary/70" />
                    {isAr ? 'آخر تحديث للسجل' : 'Last Master Update'}
                 </p>
                 <div className="min-h-[2.75rem] flex items-center px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <p className="text-sm md:text-base font-black text-secondary">
                       {editData.updatedAt && typeof editData.updatedAt.toDate === 'function' 
                          ? format(editData.updatedAt.toDate(), 'MMMM dd, HH:mm') 
                          : '-'}
                    </p>
                 </div>
              </div>
           </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50/50 p-6 md:p-8 rounded-2xl border border-amber-100 flex items-start gap-5 mx-2 shadow-sm transition-all hover:bg-amber-50">
         <Info className="h-6 w-6 text-amber-600 shrink-0 mt-1 opacity-60" />
         <div className="space-y-1.5 text-start">
            <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest">{isAr ? 'ملاحظة الأرشفة' : 'Registry Note'}</p>
            <p className="text-xs md:text-sm font-bold text-amber-900/60 leading-relaxed italic">
               {isAr 
                  ? 'تم تجميع كافة بيانات الطالب في هذا الملف الموحد لضمان سهولة الوصول والتوثيق الأكاديمي.' 
                  : 'All student vital statistics and residence data have been consolidated into this master profile for streamlined academic documentation.'}
            </p>
         </div>
      </div>
    </div>
  );
}
