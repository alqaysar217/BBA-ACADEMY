
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Users, User, ChevronLeft, ChevronRight, Mail, Phone, MessageCircle, 
  Edit3, Save, Loader2, BookOpen, ClipboardCheck, CreditCard, FileText, 
  Plus, MessageSquare, MapPin, Heart, Info, Globe, ShieldCheck, Type
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

/**
 * DataField - Stable Input component for editing or display
 */
const DataField = ({ label, value, path, isEditing, onUpdate, icon: Icon, placeholder, className = "" }: any) => {
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

export default function StudentGuardiansPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading } = useDoc(studentRef);
  const [editData, setEditData] = useState<any>(null);

  // Sync internal state with document data, providing robust fallback for older data structures
  useEffect(() => {
    if (student && !editData) {
      const normalizedData = {
        ...student,
        parent1: student.parent1 || {
          name: student.parentName || '',
          email: student.parentEmail || '',
          phone: student.parentPhone || '',
          relationship: student.parentRelationship || student.relationship1 || ''
        },
        parent2: student.parent2 || null
      };
      setEditData(normalizedData);
    }
  }, [student, editData]);

  if (loading || !student || !editData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'جاري مزامنة بيانات العائلة...' : 'Syncing Family Records...'}</p>
    </div>
  );

  const t = {
    title: isAr ? 'أولياء الأمور والتواصل' : 'Guardians & Communication Hub',
    back: isAr ? 'العودة' : 'Back',
    edit: isAr ? 'تعديل البيانات' : 'Edit Info',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    save: isAr ? 'حفظ' : 'Save',
    p1: isAr ? 'ولي الأمر الأول (الأساسي)' : 'Guardian 1 (Primary)',
    p2: isAr ? 'ولي الأمر الثاني' : 'Guardian 2',
    addressTitle: isAr ? 'عنوان السكن المعتمد' : 'Verified Home Address',
    fields: {
      name: isAr ? 'الاسم الكامل' : 'Full Name',
      phone: isAr ? 'رقم الهاتف' : 'Phone Number',
      email: isAr ? 'البريد الإلكتروني' : 'Email Address',
      relation: isAr ? 'صلة القرابة' : 'Relationship'
    },
    nav: {
      profile: isAr ? 'الهوية' : 'Identity',
      guardians: isAr ? 'أولياء الأمور' : 'Guardians',
      documents: isAr ? 'المستندات' : 'Documents',
      academic: isAr ? 'خطة الطالب' : 'Study Plan',
      grades: isAr ? 'الدرجات' : 'Grades',
      finances: isAr ? 'المالية' : 'Finances'
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
      await updateDoc(studentRef, { 
        parent1: editData.parent1 || {},
        parent2: editData.parent2 || null,
        updatedAt: serverTimestamp() 
      });
      setIsEditing(false);
      toast({ title: isAr ? "تم تحديث بيانات العائلة" : "Family records updated" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error saving changes" });
    } finally {
      setIsSaving(false);
    }
  };

  const openWhatsapp = (phone: string) => {
    const clean = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${clean}`, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      
      {/* 1. Navigation Bar */}
      <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar bg-white/50 p-1 rounded-xl shrink-0">
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

      {/* 2. Top Bar Actions */}
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

      <div className="px-2 text-start">
         <h1 className="text-2xl font-black uppercase text-primary tracking-tighter">{t.title} — {student.firstName}</h1>
      </div>

      {/* 3. Guardian Cards Section */}
      <div className="grid grid-cols-1 gap-8">
        {[
          { key: 'parent1', label: t.p1, data: editData.parent1 },
          { key: 'parent2', label: t.p2, data: editData.parent2 }
        ].map((item) => {
          if (!item.data && !isEditing) return null;
          
          return (
            <Card key={item.key} className="border-none shadow-premium bg-white overflow-hidden rounded-2xl w-full group">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 md:px-10 py-5 flex flex-row items-center justify-between">
                <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
                  <Users className="h-4 w-4 text-secondary" />
                  {item.label}
                </CardTitle>
                
                {item.data && !isEditing && (
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => openWhatsapp(item.data.phone)}
                      className="bg-green-500 hover:bg-green-600 text-white h-9 px-4 rounded-lg font-black text-[9px] uppercase gap-2 shadow-lg shadow-green-500/10 active:scale-95 transition-all"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="h-9 px-4 rounded-lg border-blue-100 text-blue-600 hover:bg-blue-50 font-black text-[9px] uppercase gap-2 transition-all"
                    >
                      <a href={`tel:${item.data.phone}`}>
                        <Phone className="h-3.5 w-3.5" /> {isAr ? 'اتصال' : 'Call'}
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="h-9 px-4 rounded-lg border-secondary/10 text-secondary hover:bg-secondary/5 font-black text-[9px] uppercase gap-2 transition-all"
                    >
                      <a href={`mailto:${item.data.email}`}>
                        <Mail className="h-3.5 w-3.5" /> {isAr ? 'بريد' : 'Email'}
                      </a>
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6 md:p-10 lg:p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DataField 
                    label={t.fields.name} 
                    value={item.data?.name} 
                    path={`${item.key}.name`} 
                    isEditing={isEditing} 
                    onUpdate={handleNestedUpdate} 
                    icon={User} 
                  />
                  <DataField 
                    label={t.fields.relation} 
                    value={item.data?.relationship} 
                    path={`${item.key}.relationship`} 
                    isEditing={isEditing} 
                    onUpdate={handleNestedUpdate} 
                    icon={Heart} 
                  />
                  <DataField 
                    label={t.fields.phone} 
                    value={item.data?.phone} 
                    path={`${item.key}.phone`} 
                    isEditing={isEditing} 
                    onUpdate={handleNestedUpdate} 
                    icon={Phone} 
                  />
                  <DataField 
                    label={t.fields.email} 
                    value={item.data?.email} 
                    path={`${item.key}.email`} 
                    isEditing={isEditing} 
                    onUpdate={handleNestedUpdate} 
                    icon={Mail} 
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Option to add Parent 2 if missing */}
        {!editData.parent2 && isEditing && (
          <Button 
            variant="ghost" 
            className="w-full h-24 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex flex-col gap-2"
            onClick={() => handleNestedUpdate('parent2', { name: '', email: '', phone: '', relationship: '' })}
          >
             <Plus className="h-6 w-6 text-secondary" />
             {isAr ? 'إضافة بيانات ولي أمر ثاني' : 'Add Second Guardian Records'}
          </Button>
        )}
      </div>

      {/* 4. Home Address Reference Section */}
      <Card className="border-none shadow-premium bg-white overflow-hidden rounded-2xl w-full">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 md:px-10 py-5">
           <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
              <MapPin className="h-4 w-4 text-secondary" />
              {t.addressTitle}
           </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-10 lg:p-12">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3">
                <DataField label={isAr ? 'العنوان' : 'Street Address'} value={editData.address?.line1} isEditing={false} onUpdate={() => {}} icon={MapPin} />
              </div>
              <DataField label={isAr ? 'المدينة' : 'City'} value={editData.address?.city} isEditing={false} onUpdate={() => {}} icon={Globe} />
              <DataField label={isAr ? 'الولاية' : 'State'} value={editData.address?.state} isEditing={false} onUpdate={() => {}} icon={ShieldCheck} />
              <DataField label={isAr ? 'الرمز البريدي' : 'ZIP'} value={editData.address?.zip} isEditing={false} onUpdate={() => {}} icon={Type} />
           </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50/50 p-6 md:p-8 rounded-2xl border border-blue-100 flex items-start gap-5 mx-2 shadow-sm">
         <Info className="h-6 w-6 text-blue-600 shrink-0 mt-1 opacity-60" />
         <div className="space-y-1.5 text-start">
            <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">{isAr ? 'إرشادات التواصل' : 'Communication Guidance'}</p>
            <p className="text-xs md:text-sm font-bold text-blue-900/60 leading-relaxed italic">
               {isAr 
                  ? 'يرجى استخدام قنوات التواصل الرسمية لتوثيق المحادثات الهامة. أزرار التواصل السريع مخصصة للمتابعة الروتينية والمستعجلة.' 
                  : 'Please use official channels for documenting critical conversations. Quick contact buttons are for routine and urgent follow-ups.'}
            </p>
         </div>
      </div>
    </div>
  );
}
