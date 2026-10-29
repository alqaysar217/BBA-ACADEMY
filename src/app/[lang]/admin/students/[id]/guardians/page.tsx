
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Users, User, ChevronLeft, ChevronRight, Mail, Phone, MessageCircle, 
  Edit3, Save, Loader2, BookOpen, ClipboardCheck, CreditCard, FileText, Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

// Sub-component for Guardian Card to ensure stable rendering and focus management
const GuardianCard = ({ parent, path, label, isEditing, onUpdate, t, isAr }: any) => {
  if (!parent && !isEditing) return null;
  
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden text-start">
      <CardHeader className="bg-slate-50/50 border-b border-slate-50 px-8 py-5 flex flex-row items-center justify-between">
         <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
            <Users className="h-4 w-4 text-secondary" />
            {label}
         </CardTitle>
         {!isEditing && parent && (
           <div className="flex gap-2">
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-lg border-green-100 text-green-600 hover:bg-green-50" onClick={() => window.open(`https://wa.me/${parent?.phone?.replace(/\D/g, '')}`, '_blank')}>
                 <MessageCircle className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-lg border-blue-100 text-blue-600 hover:bg-blue-50" onClick={() => window.location.href = `tel:${parent?.phone}`}>
                 <Phone className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-lg border-secondary/20 text-secondary hover:bg-secondary/5" onClick={() => window.location.href = `mailto:${parent?.email}`}>
                 <Mail className="h-4 w-4" />
              </Button>
           </div>
         )}
      </CardHeader>
      <CardContent className="p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.fields.name}</p>
            {isEditing ? (
              <Input value={parent?.name || ''} onChange={(e) => onUpdate(`${path}.name`, e.target.value)} className="h-10 bg-slate-50 border-slate-100 font-bold" />
            ) : (
              <p className="text-sm font-black text-slate-900">{parent?.name || t.notRegistered}</p>
            )}
         </div>
         <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.fields.relation}</p>
            {isEditing ? (
              <Input value={parent?.relationship || ''} onChange={(e) => onUpdate(`${path}.relationship`, e.target.value)} className="h-10 bg-slate-50 border-slate-100 font-bold" />
            ) : (
              <Badge variant="outline" className="bg-primary/5 text-primary border-none text-[10px] font-black uppercase tracking-tighter">{parent?.relationship || '-'}</Badge>
            )}
         </div>
         <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.fields.phone}</p>
            {isEditing ? (
              <Input value={parent?.phone || ''} onChange={(e) => onUpdate(`${path}.phone`, e.target.value)} className="h-10 bg-slate-50 border-slate-100 font-bold" />
            ) : (
              <p className="text-sm font-bold text-slate-600" dir="ltr">{parent?.phone || '-'}</p>
            )}
         </div>
         <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.fields.email}</p>
            {isEditing ? (
              <Input value={parent?.email || ''} onChange={(e) => onUpdate(`${path}.email`, e.target.value)} className="h-10 bg-slate-50 border-slate-100 font-bold" />
            ) : (
              <p className="text-sm font-medium text-slate-500 lowercase">{parent?.email || '-'}</p>
            )}
         </div>
      </CardContent>
    </Card>
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

  useEffect(() => {
    if (student && !editData) {
      setEditData(student);
    }
  }, [student, editData]);

  if (loading || !student || !editData) return (
    <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Records...</p>
    </div>
  );

  const t = {
    title: isAr ? 'أولياء الأمور والتواصل' : 'Guardians & Communication Hub',
    back: isAr ? 'العودة' : 'Back',
    edit: isAr ? 'تعديل البيانات' : 'Edit Info',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    save: isAr ? 'حفظ' : 'Save',
    notRegistered: isAr ? 'غير مسجل' : 'Not Registered',
    contact: isAr ? 'تواصل الآن' : 'Contact Now',
    p1: isAr ? 'ولي الأمر الأول (الأساسي)' : 'Guardian 1 (Primary)',
    p2: isAr ? 'ولي الأمر الثاني' : 'Guardian 2',
    fields: {
      name: isAr ? 'الاسم الكامل' : 'Full Name',
      phone: isAr ? 'رقم الهاتف' : 'Phone Number',
      email: isAr ? 'البريد الإلكتروني' : 'Email Address',
      relation: isAr ? 'الصلة' : 'Relationship'
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      
      {/* Navigation Bar */}
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

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
        <Button variant="ghost" onClick={() => router.back()} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest p-0">
          {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {t.back}
        </Button>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {t.cancel}
              </Button>
              <Button onClick={saveChanges} disabled={isSaving} className="bg-primary text-white h-10 px-6 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2 text-secondary" />}
                {t.save}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="h-10 px-6 rounded-lg border-slate-200 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
              <Edit3 className="h-4 w-4 mr-2 text-secondary" /> {t.edit}
            </Button>
          )}
        </div>
      </div>

      <div className="px-2 text-start">
         <h1 className="text-2xl font-black uppercase text-primary tracking-tighter">{t.title} — {student.firstName}</h1>
      </div>

      <div className="space-y-8">
         <GuardianCard parent={editData.parent1} path="parent1" label={t.p1} isEditing={isEditing} onUpdate={handleNestedUpdate} t={t} isAr={isAr} />
         <GuardianCard parent={editData.parent2} path="parent2" label={t.p2} isEditing={isEditing} onUpdate={handleNestedUpdate} t={t} isAr={isAr} />

         {!editData.parent2 && isEditing && (
            <Button variant="ghost" className="w-full h-20 border-2 border-dashed border-slate-100 text-slate-300 font-black uppercase tracking-widest hover:bg-slate-50 transition-all" onClick={() => handleNestedUpdate('parent2', { name: '', email: '', phone: '', relationship: '' })}>
               <Plus className="h-5 w-5 mr-2 text-secondary" /> Add Second Guardian Record
            </Button>
         )}
      </div>
    </div>
  );
}
