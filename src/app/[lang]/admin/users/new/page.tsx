
'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore } from '@/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { 
  UserPlus, ChevronLeft, ShieldCheck, Mail, User, 
  LockKeyhole, AlertCircle, Loader2, CheckCircle2 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

const ROLES = [
  { value: 'admin', label: 'Super Admin' },
  { value: 'admissions', label: 'Admissions Officer' },
  { value: 'academic', label: 'Academic Coordinator' },
  { value: 'financial', label: 'Financial Officer' },
  { value: 'viewer', label: 'Viewer (Read Only)' },
];

export default function NewUserPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const router = useRouter();
  const firestore = useFirestore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    role: '',
    tempPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    
    if (!formData.displayName || !formData.email || !formData.role) {
      toast({ variant: "destructive", title: "Missing Fields", description: "Please fill all required fields." });
      return;
    }

    setLoading(true);
    try {
      // For a real app, this would be a Cloud Function or Admin SDK call
      // to create the Auth user. Here we create the Firestore metadata.
      const newUserRef = doc(collection(firestore, 'admin_users'));
      const userData = {
        id: newUserRef.id,
        displayName: formData.displayName,
        email: formData.email.toLowerCase(),
        role: formData.role,
        status: 'active',
        permissions: {
          enrollments: formData.role === 'admin' || formData.role === 'admissions' ? { read: true, write: true, delete: formData.role === 'admin' } : { read: true, write: false, delete: false },
          students: formData.role === 'admin' || formData.role === 'academic' ? { read: true, write: true, delete: formData.role === 'admin' } : { read: true, write: false, delete: false },
          finances: formData.role === 'admin' || formData.role === 'financial' ? { read: true, write: true, delete: formData.role === 'admin' } : { read: false, write: false, delete: false },
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(newUserRef, userData);
      
      toast({
        title: isAr ? "تم إنشاء الحساب" : "Account Created",
        description: isAr ? "تمت إضافة المستخدم الجديد بنجاح." : "New user metadata has been successfully added.",
      });
      router.push(`/${lang}/admin/users`);
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: "Failed to create account." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex items-center gap-6">
         <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm border border-slate-100">
           <ChevronLeft className="h-5 w-5" />
         </button>
         <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{isAr ? 'إنشاء حساب جديد' : 'New User Account'}</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'إضافة مسؤول جديد للنظام' : 'Provision a New Admin Staff Member'}</p>
         </div>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
         <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg"><ShieldCheck className="h-6 w-6" /></div>
               <div>
                  <CardTitle className="text-xl font-black uppercase text-primary">{isAr ? 'بيانات الحساب' : 'Account Intelligence'}</CardTitle>
                  <CardDescription className="font-bold">Define identity and system privileges.</CardDescription>
               </div>
            </div>
         </CardHeader>
         <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <User className="h-3 w-3 text-secondary" /> {isAr ? 'الاسم الكامل' : 'Full Name'}
                     </Label>
                     <Input 
                        value={formData.displayName}
                        onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                        className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50 focus:bg-white" 
                        placeholder="Mustafa Ali" 
                     />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <Mail className="h-3 w-3 text-secondary" /> {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                     </Label>
                     <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50 focus:bg-white" 
                        placeholder="m.ali@baneenbanaat.org" 
                     />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <LockKeyhole className="h-3 w-3 text-secondary" /> {isAr ? 'الدور الوظيفي' : 'System Role'}
                     </Label>
                     <Select onValueChange={(v) => setFormData({...formData, role: v})} value={formData.role}>
                        <SelectTrigger className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50">
                           <SelectValue placeholder={isAr ? 'اختر الدور' : 'Assign Role'} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-2">
                           {ROLES.map(role => (
                              <SelectItem key={role.value} value={role.value} className="font-bold py-3">{role.label}</SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <LockKeyhole className="h-3 w-3 text-secondary" /> {isAr ? 'كلمة مرور مؤقتة' : 'Temporary Password'}
                     </Label>
                     <Input 
                        type="password"
                        className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50 focus:bg-white" 
                        placeholder="••••••••" 
                     />
                  </div>
               </div>

               <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
                  <p className="text-xs font-bold text-amber-900 leading-relaxed italic">
                     {isAr 
                       ? 'ملاحظة: إنشاء حساب هنا يؤسس السجل في قاعدة البيانات، يجب التأكد من تطابق البريد مع الحساب المفعل في Firebase Auth.' 
                       : 'Note: Creating an account here establishes the database record. Ensure the email matches the verified account in Firebase Authentication.'}
                  </p>
               </div>

               <div className="flex justify-end pt-6">
                  <Button type="submit" disabled={loading} className="h-16 rounded-2xl bg-primary text-white font-black px-12 shadow-xl shadow-primary/20 gap-3 text-lg transition-all active:scale-95">
                     {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (isAr ? 'تفعيل الحساب الآن' : 'Provision Account')}
                     {!loading && <CheckCircle2 className="h-6 w-6" />}
                  </Button>
               </div>
            </form>
         </CardContent>
      </Card>
    </div>
  );
}
