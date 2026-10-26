
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  UserCog, ChevronLeft, ShieldCheck, Mail, User, 
  LockKeyhole, CheckCircle2, Loader2, Save,
  Eye, Pencil, Trash2, ShieldAlert, FileSearch,
  Users, CreditCard, KeyRound, LayoutGrid
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const getRoles = (isAr: boolean) => [
  { value: 'admin', label: isAr ? 'مدير النظام (Super Admin)' : 'Super Admin' },
  { value: 'admissions', label: isAr ? 'مسؤول القبول (Admissions)' : 'Admissions Officer' },
  { value: 'academic', label: isAr ? 'المنسق الأكاديمي (Academic)' : 'Academic Coordinator' },
  { value: 'financial', label: isAr ? 'المسؤول المالي (Financial)' : 'Financial Officer' },
  { value: 'viewer', label: isAr ? 'مشاهد (Viewer)' : 'Viewer (Read Only)' },
];

export default function EditUserPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const router = useRouter();
  const firestore = useFirestore();
  const [isSaving, setIsSaving] = useState(false);
  const roles = getRoles(isAr);

  const userRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'admin_users', id);
  }, [firestore, id]);

  const { data: userData, loading } = useDoc(userRef);

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (userData && !formData) {
      setFormData({
        displayName: userData.displayName || '',
        email: userData.email || '',
        role: userData.role || '',
        status: userData.status || 'active',
        permissions: userData.permissions || {
          enrollments: { read: true, write: false, delete: false },
          students: { read: true, write: false, delete: false },
          finances: { read: false, write: false, delete: false },
          users: { read: false, write: false, delete: false }
        }
      });
    }
  }, [userData, formData]);

  const togglePermission = (module: string, action: string) => {
    setFormData((prev: any) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [action]: !prev.permissions[module]?.[action]
        }
      }
    }));
  };

  const handleSave = async () => {
    if (!firestore || !formData || !userRef) return;
    setIsSaving(true);
    try {
      await updateDoc(userRef, {
        displayName: formData.displayName,
        role: formData.role,
        permissions: formData.permissions,
        updatedAt: serverTimestamp()
      });
      toast({ 
        title: isAr ? "تم تحديث البيانات" : "Changes Saved", 
        description: isAr ? "تم حفظ التعديلات والصلاحيات بنجاح." : "User account and privileges updated successfully." 
      });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to update user." });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !formData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 text-secondary animate-spin" />
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">
        {isAr ? 'جاري مزامنة بيانات المستخدم...' : 'Syncing User Profile...'}
      </p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm border border-slate-100">
              <ChevronLeft className={cn("h-5 w-5", isAr && "rotate-180")} />
            </button>
            <div>
               <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{isAr ? 'تعديل بيانات الحساب' : 'Edit User Profile'}</h1>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'إدارة الهوية والصلاحيات النظامية' : 'Manage Identity & System Permissions'}</p>
            </div>
         </div>
         <Button onClick={handleSave} disabled={isSaving} className="h-14 rounded-2xl bg-primary text-white font-black px-10 shadow-xl shadow-primary/20 gap-3 transition-all active:scale-95">
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {isAr ? 'حفظ كافة التعديلات' : 'Commit All Changes'}
         </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* SECTION 1: ACCOUNT DETAILS */}
         <div className="lg:col-span-1 space-y-8">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white overflow-hidden">
               <div className="p-10 space-y-8 relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><UserCog className="h-32 w-32" /></div>
                  <div className="h-24 w-24 rounded-3xl bg-secondary flex items-center justify-center text-white text-4xl font-black shadow-2xl relative z-10">
                     {userData.photoURL ? (
                        <Image src={userData.photoURL} alt="Profile" width={96} height={96} className="rounded-3xl object-cover" unoptimized />
                     ) : formData.displayName?.charAt(0)}
                  </div>
                  <div className="space-y-6 relative z-10">
                     <div className="space-y-1">
                        <Label className="text-[10px] font-black uppercase text-white/40 tracking-widest">{isAr ? 'اسم المستخدم' : 'Account Name'}</Label>
                        <Input 
                           value={formData.displayName} 
                           onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                           className="bg-white/5 border-white/10 text-white font-bold h-12 rounded-xl focus:bg-white/10"
                        />
                     </div>
                     <div className="space-y-1">
                        <Label className="text-[10px] font-black uppercase text-white/40 tracking-widest">{isAr ? 'البريد الإلكتروني (للقراءة فقط)' : 'Login Email (Read Only)'}</Label>
                        <div className="flex items-center gap-3 p-3.5 bg-white/5 rounded-xl border border-white/10 text-xs font-bold text-white/60">
                           <Mail className="h-4 w-4 text-secondary" /> {formData.email}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <Label className="text-[10px] font-black uppercase text-white/40 tracking-widest">{isAr ? 'الدور الوظيفي الأساسي' : 'Primary System Role'}</Label>
                        <Select value={formData.role} onValueChange={(v) => setFormData({...formData, role: v})}>
                           <SelectTrigger className="bg-white/5 border-white/10 text-white font-bold h-12 rounded-xl focus:bg-white/10">
                              <SelectValue placeholder="Select Role" />
                           </SelectTrigger>
                           <SelectContent className="rounded-xl p-2">
                              {roles.map(r => (
                                 <SelectItem key={r.value} value={r.value} className="font-bold py-3">{r.label}</SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="border-none shadow-premium rounded-[2rem] bg-white p-8 border border-slate-100 flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6" />
               </div>
               <div className="space-y-1">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{isAr ? 'تغيير كلمة المرور؟' : 'Reset Password?'}</p>
                  <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{isAr ? 'يجب إرسال رابط إعادة تعيين للبريد.' : 'Send a secure reset link to their email.'}</p>
               </div>
            </Card>
         </div>

         {/* SECTION 2: PERMISSIONS MATRIX */}
         <div className="lg:col-span-2">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
               <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/30">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg"><ShieldCheck className="h-6 w-6" /></div>
                     <div>
                        <CardTitle className="text-xl font-black uppercase text-primary">{isAr ? 'مصفوفة صلاحيات المستخدم' : 'Access Control Matrix'}</CardTitle>
                        <CardDescription className="font-bold">Grant scoped access to specific functional modules.</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50/50 border-b border-slate-50">
                              <th className="p-8 font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'الموديول / المورد' : 'Module / Resource'}</th>
                              <th className="p-8 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'قراءة' : 'Read'}</th>
                              <th className="p-8 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'كتابة' : 'Write'}</th>
                              <th className="p-8 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'حذف' : 'Delete'}</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {[
                              { id: 'enrollments', label: isAr ? 'القبول والتسجيل' : 'Admissions', icon: FileSearch },
                              { id: 'students', label: isAr ? 'إدارة الطلاب' : 'Students', icon: Users },
                              { id: 'finances', label: isAr ? 'الإدارة المالية' : 'Finances', icon: CreditCard },
                              { id: 'users', label: isAr ? 'إدارة المستخدمين' : 'Users Admin', icon: UserCog },
                           ].map((mod) => (
                              <tr key={mod.id} className="hover:bg-slate-50/30 transition-all group">
                                 <td className="p-8">
                                    <div className="flex items-center gap-4">
                                       <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-secondary group-hover:text-white transition-all">
                                          <mod.icon className="h-5 w-5" />
                                       </div>
                                       <span className="font-black text-slate-900 uppercase text-xs tracking-tight">{mod.label}</span>
                                    </div>
                                 </td>
                                 <td className="p-8 text-center">
                                    <Checkbox 
                                       checked={formData.permissions?.[mod.id]?.read} 
                                       onCheckedChange={() => togglePermission(mod.id, 'read')}
                                       className="h-6 w-6 border-2 border-slate-200 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                                    />
                                 </td>
                                 <td className="p-8 text-center">
                                    <Checkbox 
                                       checked={formData.permissions?.[mod.id]?.write} 
                                       onCheckedChange={() => togglePermission(mod.id, 'write')}
                                       className="h-6 w-6 border-2 border-slate-200 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                                    />
                                 </td>
                                 <td className="p-8 text-center">
                                    <Checkbox 
                                       checked={formData.permissions?.[mod.id]?.delete} 
                                       onCheckedChange={() => togglePermission(mod.id, 'delete')}
                                       className="h-6 w-6 border-2 border-slate-200 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                                    />
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>

            <div className="mt-8 bg-blue-50/50 border border-blue-100 p-6 rounded-3xl flex items-start gap-4">
               <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
               <p className="text-[10px] sm:text-xs font-bold text-blue-800/70 leading-relaxed">
                  {isAr 
                    ? 'نصيحة أمنية: يوصى بمنح صلاحية "الحذف" فقط لمديري النظام (Super Admins) لتجنب الفقدان العرضي للبيانات الحساسة.' 
                    : 'Security Tip: It is recommended to grant "Delete" privileges only to Super Admins to prevent accidental loss of sensitive academy data.'}
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}

