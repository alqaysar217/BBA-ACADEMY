
'use client';

import { use, useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  User, GraduationCap, CreditCard, 
  ChevronLeft, ChevronRight, ChevronDown, BookOpen, 
  CheckCircle2, 
  ShieldCheck, Mail, Phone, MapPin, Layers,
  Users, Camera, Calendar as CalendarIcon, 
  UserCircle2, Home, Building, Hash, Eye, Loader2,
  Edit3, Trash2, Heart, Award,
  Save, X, Type, Map, BadgeCheck, ClipboardCheck
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
      profile: isAr ? 'الملف الشخصي' : 'Identity',
      finances: isAr ? 'السجل المالي' : 'Finances',
      academic: isAr ? 'المسار الأكاديمي' : 'Academics',
      grades: isAr ? 'الدرجات' : 'Gradebook'
    },
    sections: {
      personal: isAr ? 'البيانات الشخصية' : 'Identity & Vital Statistics',
      guardians: isAr ? 'بيانات أولياء الأمور' : 'Parental Linked Contacts',
      address: isAr ? 'عنوان السكن' : 'Registered Residence',
      attachments: isAr ? 'المستندات والمرفقات' : 'Document Vault',
      academics: isAr ? 'المسار الأكاديمي' : 'Academic Performance',
      finances: isAr ? 'البيانات المالية' : 'Financial Ledger'
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
      relation: isAr ? 'الصلة' : 'Relationship',
      addr1: isAr ? 'العنوان' : 'Address',
      city: isAr ? 'المدينة' : 'City',
      state: isAr ? 'الولاية' : 'State',
      zip: isAr ? 'الرمز' : 'ZIP'
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
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
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

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      <Loader2 className="h-12 w-12 text-secondary animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Record...</p>
    </div>
  );

  if (!student || !editData) return <div className="p-20 text-center font-black text-red-500 uppercase">{t.notFound}</div>;

  const defaultImage = student.gender === 'Female' ? '/Female.png' : '/Male.png';
  const profileImage = editData.photoURL || defaultImage;

  const NavigationBar = () => (
    <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
       {[
         { id: 'profile', label: t.nav.profile, icon: User, href: `/${lang}/admin/students/${id}` },
         { id: 'finances', label: t.nav.finances, icon: CreditCard, href: `/${lang}/admin/students/${id}/finances` },
         { id: 'academic', label: t.nav.academic, icon: BookOpen, href: `/${lang}/admin/students/${id}/plans` },
         { id: 'grades', label: t.nav.grades, icon: ClipboardCheck, href: `/${lang}/admin/students/${id}/grades` },
       ].map(nav => {
         const isActive = pathname === nav.href;
         return (
           <Button 
             key={nav.id} 
             asChild 
             variant={isActive ? "default" : "ghost"}
             className={cn(
               "rounded-xl h-11 px-6 font-black text-[10px] uppercase tracking-widest gap-2 shrink-0",
               isActive ? "bg-primary text-white shadow-xl" : "text-slate-400"
             )}
           >
             <Link href={nav.href}>
                <nav.icon className="h-4 w-4" />
                {nav.label}
             </Link>
           </Button>
         )
       })}
    </div>
  );

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const DataField = ({ label, icon: Icon, path, type = "text" }: any) => {
    const value = getNestedValue(editData, path);
    return (
      <div className="space-y-1.5 group">
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-secondary transition-colors">
          {Icon && <Icon className="h-3 w-3" />}
          {label}
        </div>
        {isEditing ? (
          <Input 
            type={type}
            value={value || ''} 
            onChange={(e) => handleNestedUpdate(path, e.target.value)}
            className="h-10 bg-slate-50 border-none font-bold rounded-lg focus:ring-secondary/10"
          />
        ) : (
          <p className={cn("text-sm font-bold text-slate-700 truncate", !value && "text-slate-300 italic")}>
            {value || t.notRegistered}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => router.push(`/${lang}/admin/students`)} className="hover:bg-slate-100 text-slate-400 font-black text-[10px] uppercase gap-2">
          {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />} {t.back}
        </Button>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} variant="outline" className="h-11 rounded-xl font-black text-[10px] uppercase">
                <X className="h-4 w-4 mr-2" /> {t.cancel}
              </Button>
              <Button onClick={saveChanges} disabled={isSaving} className="h-11 rounded-xl bg-secondary text-white font-black text-[10px] uppercase shadow-xl">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />} {t.save}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="h-11 rounded-xl bg-primary text-white font-black text-[10px] uppercase shadow-xl">
              <Edit3 className="h-4 w-4 text-secondary mr-2" /> {t.edit}
            </Button>
          )}
        </div>
      </div>

      {/* Hero Card */}
      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-r from-primary to-slate-900 opacity-95" />
         <CardContent className="p-8 lg:p-12 relative z-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="relative shrink-0">
               <div className="h-44 w-44 rounded-[2.5rem] bg-white border-4 border-white/20 shadow-2xl overflow-hidden relative group/photo">
                  <Image src={profileImage} alt="Student Avatar" fill className="object-cover" unoptimized />
                  {isUploadingPhoto && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="h-8 w-8 text-white animate-spin" /></div>}
                  <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all backdrop-blur-[2px]">
                    <Camera className="h-7 w-7 mb-1" />
                    <span className="text-[9px] font-black uppercase">{isAr ? 'تغيير الصورة' : 'Change Photo'}</span>
                  </button>
               </div>
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </div>

            <div className="text-center lg:text-start space-y-6 flex-1 min-w-0">
               <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
                     <Badge className={cn("border-none font-black text-[9px] uppercase px-3 py-1 rounded-full bg-green-500/20 text-green-400")}>{student.status}</Badge>
                     <p className="text-white/40 font-black text-[10px] uppercase tracking-widest">{isAr ? 'بيانات الطالب المعتمدة' : 'Official Student Record'}</p>
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase truncate">{student.firstName} {student.lastName}</h1>
                  <p className="text-secondary font-black text-sm tracking-widest">ID: {student.id?.slice(-6).toUpperCase() || 'NEW'}</p>
               </div>
               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  <div className="space-y-1">
                     <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">{isAr ? 'المستوى الدراسي' : 'Grade Level'}</p>
                     <p className="text-xl font-black text-white">Grade {student.gradeLevel}</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="space-y-1">
                     <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">{isAr ? 'التقدم الأكاديمي' : 'Course Progress'}</p>
                     <div className="flex items-center gap-3">
                        <p className="text-xl font-black text-secondary">{student.academicPlan?.progress || 0}%</p>
                        <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-secondary shadow-[0_0_10px_rgba(var(--secondary),0.5)]" style={{ width: `${student.academicPlan?.progress || 0}%` }} />
                        </div>
                     </div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="space-y-1">
                     <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">{isAr ? 'الرصيد المالي' : 'Balance'}</p>
                     <p className="text-xl font-black text-white">${((student.financialLedger?.totalDue || 0) - (student.financialLedger?.totalPaid || 0)).toLocaleString()}</p>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>

      <NavigationBar />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            {/* Identity Statistics */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100">
                  <CardTitle className="text-lg font-black uppercase text-primary flex items-center gap-4">
                    <UserCircle2 className="h-6 w-6 text-secondary" /> {t.sections.personal}
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <DataField label={t.fields.firstName} path="firstName" icon={Type} />
                  <DataField label={t.fields.middleName} path="middleName" icon={Type} />
                  <DataField label={t.fields.lastName} path="lastName" icon={Type} />
                  <DataField label={t.fields.dob} path="dob" icon={CalendarIcon} type="date" />
                  <DataField label={t.fields.gender} path="gender" icon={UserCircle2} />
                  <DataField label={t.fields.grade} path="gradeLevel" icon={GraduationCap} />
                  <DataField label={t.fields.phone} path="phone" icon={Phone} />
                  <div className="sm:col-span-2">
                    <DataField label={t.fields.email} path="email" icon={Mail} />
                  </div>
               </CardContent>
            </Card>

            {/* Guardians Accordion */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="bg-primary p-8 text-white">
                  <CardTitle className="text-lg font-black uppercase flex items-center gap-4">
                    <Users className="h-6 w-6 text-secondary" /> {t.sections.guardians}
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 md:p-10">
                  <Accordion type="single" collapsible defaultValue="p1" className="space-y-4">
                     {['parent1', 'parent2'].map((pKey, i) => (
                       <AccordionItem key={pKey} value={pKey === 'parent1' ? 'p1' : 'p2'} className="border border-slate-100 rounded-3xl bg-slate-50/50 overflow-hidden px-6">
                          <AccordionTrigger className="hover:no-underline py-6">
                             <div className="flex items-center gap-5 text-start">
                                <div className="h-10 w-10 rounded-2xl bg-white text-primary flex items-center justify-center shrink-0 shadow-sm"><User className="h-5 w-5" /></div>
                                <div>
                                   <p className="text-sm font-black text-primary uppercase">{editData[pKey]?.name || t.notRegistered}</p>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAr ? `ولي الأمر ${i+1}` : `Guardian ${i+1}`}</p>
                                </div>
                             </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-8 pt-4 grid grid-cols-1 md:grid-cols-2 gap-8 pl-12 border-t border-slate-100/50">
                             <DataField label={t.fields.relation} path={`${pKey}.relationship`} icon={Heart} />
                             <DataField label={t.fields.phone} path={`${pKey}.phone`} icon={Phone} />
                             <div className="md:col-span-2">
                                <DataField label={t.fields.email} path={`${pKey}.email`} icon={Mail} />
                             </div>
                          </AccordionContent>
                       </AccordionItem>
                     ))}
                  </Accordion>
               </CardContent>
            </Card>
         </div>

         {/* Sidebar Blocks */}
         <div className="lg:col-span-4 space-y-8">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10 space-y-8 border border-slate-100">
               <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center"><MapPin className="h-5 w-5" /></div>
                  <h4 className="font-black text-primary uppercase text-sm tracking-widest">{t.sections.address}</h4>
               </div>
               <div className="space-y-6">
                  <DataField label={t.fields.addr1} path="address.line1" icon={Home} />
                  <div className="grid grid-cols-2 gap-4">
                     <DataField label={t.fields.city} path="address.city" icon={Building} />
                     <DataField label={t.fields.state} path="address.state" icon={Map} />
                  </div>
               </div>
            </Card>

            <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white overflow-hidden">
               <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="files" className="border-none">
                     <AccordionTrigger className="hover:no-underline p-0 w-full group">
                        <div className="w-full p-8 flex items-center justify-between transition-colors hover:bg-slate-800">
                           <div className="flex items-center gap-5 text-start">
                              <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg"><Layers className="h-6 w-6" /></div>
                              <div>
                                <CardTitle className="text-sm font-black uppercase tracking-tight">{t.sections.attachments}</CardTitle>
                                <p className="text-white/30 font-bold text-[9px] uppercase tracking-widest">{editData.files?.length || 0} Artifacts Locked</p>
                              </div>
                           </div>
                           <ChevronDown className="h-5 w-5 text-white/30 group-hover:text-white transition-all mr-6" />
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="p-0 border-t border-white/5 animate-in slide-in-from-top-4 duration-500">
                        <div className="divide-y divide-white/5">
                           {editData.files?.map((file: any, i: number) => (
                             <div key={i} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-4 overflow-hidden">
                                   <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-secondary shadow-sm shrink-0">
                                      <Eye className="h-4 w-4" />
                                   </div>
                                   <div className="min-w-0">
                                      <p className="text-[10px] font-black text-white uppercase truncate">{file.name}</p>
                                      <p className="text-[8px] text-white/30 font-bold uppercase">{Math.round((file.size || 0)/1024)} KB</p>
                                   </div>
                                </div>
                                <Button onClick={() => window.open(file.data, '_blank')} variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-white/20 hover:text-secondary hover:bg-white/5"><Eye className="h-4 w-4" /></Button>
                             </div>
                           ))}
                           {!editData.files?.length && <p className="p-10 text-center text-white/20 font-black text-[9px] uppercase tracking-[0.2em]">No artifacts found</p>}
                        </div>
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </Card>

            {/* Performance Overview (Quick Glance) */}
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-50 p-8 space-y-6">
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.sections.academics}</p>
                  <h4 className="text-sm font-black text-primary uppercase">{isAr ? 'نظرة سريعة على الأداء' : 'Performance Glance'}</h4>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                     <span className="text-[10px] font-bold text-slate-500 uppercase">{isAr ? 'الدورات المكتملة' : 'Courses Done'}</span>
                     <span className="font-black text-primary">0 / 10</span>
                  </div>
                  <Button asChild variant="outline" className="w-full h-12 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest">
                     <Link href={`/${lang}/admin/students/${id}/plans`}>{isAr ? 'فتح خطة الدراسة' : 'Access Study Plan'}</Link>
                  </Button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}

