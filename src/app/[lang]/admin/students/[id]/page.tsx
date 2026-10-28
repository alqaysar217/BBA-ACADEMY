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
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    notFound: isAr ? 'السجل غير موجود' : 'Record Not Found',
    back: isAr ? 'العودة للسجل' : 'Back to Registry',
    edit: isAr ? 'تعديل الملف' : 'Edit Profile',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    save: isAr ? 'حفظ التغييرات' : 'Save Changes',
    notRegistered: isAr ? 'غير مسجل' : 'Not Registered',
    nav: {
      profile: isAr ? 'الهوية' : 'Identity',
      guardians: isAr ? 'أولياء الأمور' : 'Guardians',
      finances: isAr ? 'المالية' : 'Finances',
      academic: isAr ? 'خطة الطالب' : 'Study Plan',
      grades: isAr ? 'الدرجات' : 'Grades'
    },
    sections: {
      personal: isAr ? 'البيانات الشخصية للطالب' : 'Student Personal Data',
      residence: isAr ? 'عنوان السكن المسجل' : 'Registered Residence',
      attachments: isAr ? 'المستندات الملحقة بملف الطالب' : 'Student Document Artifacts',
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

  const NavigationBar = () => {
    const navItems = [
      { id: 'profile', label: t.nav.profile, icon: User, href: `/${lang}/admin/students/${id}` },
      { id: 'guardians', label: t.nav.guardians, icon: Users, href: `/${lang}/admin/students/${id}/guardians` },
      { id: 'academic', label: t.nav.academic, icon: BookOpen, href: `/${lang}/admin/students/${id}/plans` },
      { id: 'grades', label: t.nav.grades, icon: ClipboardCheck, href: `/${lang}/admin/students/${id}/grades` },
      { id: 'finances', label: t.nav.finances, icon: CreditCard, href: `/${lang}/admin/students/${id}/finances` },
    ];

    return (
      <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar">
         {navItems.map(nav => {
           const isActive = pathname === nav.href;
           return (
             <Link 
               key={nav.id} 
               href={nav.href}
               className={cn(
                 "px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap flex items-center gap-2",
                 isActive 
                  ? "border-primary text-primary bg-primary/5" 
                  : "border-transparent text-slate-400 hover:text-primary hover:bg-slate-50"
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

  const getNestedValue = (obj: any, path: string) => {
    if (!obj) return undefined;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const DataField = ({ label, path, type = "text" }: any) => {
    const value = getNestedValue(editData, path);
    return (
      <div className="space-y-1 text-start">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
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
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between px-2">
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

      {/* Header Info */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
           <div className="relative group shrink-0">
              <div className="h-32 w-32 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative shadow-inner">
                <Image src={profileImage} alt="Student" fill className="object-cover" unoptimized />
                {isUploadingPhoto && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="h-6 w-6 text-white animate-spin" /></div>}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="absolute -bottom-2 -right-2 h-8 w-8 bg-white shadow-xl rounded-full border border-slate-100 flex items-center justify-center text-primary hover:text-secondary transition-all"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
           </div>

           <div className="text-center md:text-start space-y-4 flex-1">
              <div className="space-y-1">
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                   <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tight uppercase">{student.firstName} {student.lastName}</h1>
                   <Badge className="bg-primary/5 text-primary border-none text-[9px] font-black uppercase tracking-widest px-3">{student.status}</Badge>
                 </div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student ID: {id?.toUpperCase()}</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-8 border-t border-slate-50 pt-4">
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.fields.grade}</p>
                    <p className="text-sm font-black text-slate-700">Grade {student.gradeLevel}</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.fields.gender}</p>
                    <p className="text-sm font-black text-slate-700">{student.gender}</p>
                 </div>
              </div>
           </div>
        </CardContent>
      </Card>

      <NavigationBar />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Identity Data */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-50 px-8 py-5 text-start">
              <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
                <BadgeCheck className="h-4 w-4 text-primary/40" />
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
             <CardHeader className="bg-slate-50/50 border-b border-slate-50 px-8 py-5 text-start">
                <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary/40" />
                  {t.sections.residence}
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8 lg:p-10">
                <div className="space-y-8">
                  <DataField label={t.fields.addr1} path="address.line1" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <DataField label={t.fields.city} path="address.city" />
                     <DataField label={t.fields.state} path="address.state" />
                     <DataField label={t.fields.zip} path="address.zip" />
                  </div>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
             <Accordion type="single" collapsible>
                <AccordionItem value="docs" className="border-none">
                  <AccordionTrigger className="hover:no-underline p-0 group">
                    <div className="flex items-center justify-between w-full p-6 transition-colors hover:bg-slate-50">
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all">
                             <FileText className="h-5 w-5" />
                          </div>
                          <div className="text-start">
                             <p className="text-[10px] font-black text-primary uppercase tracking-widest">{isAr ? 'خزانة المستندات' : 'Document Vault'}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{editData.files?.length || 0} Artifacts</p>
                          </div>
                       </div>
                       <ChevronDown className="h-4 w-4 text-slate-300 group-data-[state=open]:rotate-180 transition-transform" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-2 border-t border-slate-50 animate-in slide-in-from-top-2 duration-300">
                     <div className="space-y-1">
                        {editData.files?.map((file: any, i: number) => (
                           <div key={i} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-all group">
                              <div className="flex items-center gap-3 overflow-hidden">
                                 <div className="h-8 w-8 rounded bg-primary/5 flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all shrink-0"><Eye className="h-4 w-4" /></div>
                                 <p className="text-[10px] font-bold text-slate-600 truncate uppercase">{file.name}</p>
                              </div>
                              <Button onClick={() => window.open(file.data, '_blank')} variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-300 hover:text-primary"><ChevronRight className={cn("h-4 w-4", isAr && "rotate-180")} /></Button>
                           </div>
                        ))}
                        {!editData.files?.length && (
                           <div className="p-10 text-center text-slate-300 italic text-[10px] uppercase font-bold tracking-widest">No documents found</div>
                        )}
                     </div>
                  </AccordionContent>
                </AccordionItem>
             </Accordion>
          </Card>
        </div>
      </div>
    </div>
  );
}
