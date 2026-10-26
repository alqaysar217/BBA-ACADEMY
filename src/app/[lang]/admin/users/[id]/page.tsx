
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
  Users, CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from "@/components/ui/switch";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function EditUserPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const router = useRouter();
  const firestore = useFirestore();
  const [isSaving, setIsSaving] = useState(false);

  // تثبيت مرجع المستند لمنع إعادة التحميل اللانهائي
  const userRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'admin_users', id);
  }, [firestore, id]);

  const { data: userData, loading } = useDoc(userRef);

  const [permissions, setPermissions] = useState<any>(null);

  useEffect(() => {
    if (userData && !permissions) {
      setPermissions(userData.permissions || {
        enrollments: { read: true, write: false, delete: false },
        students: { read: true, write: false, delete: false },
        finances: { read: false, write: false, delete: false },
        users: { read: false, write: false, delete: false }
      });
    }
  }, [userData, permissions]);

  const togglePermission = (module: string, action: string) => {
    setPermissions((prev: any) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module]?.[action]
      }
    }));
  };

  const handleSave = async () => {
    if (!firestore || !userData || !userRef) return;
    setIsSaving(true);
    try {
      await updateDoc(userRef, {
        permissions: permissions,
        updatedAt: serverTimestamp()
      });
      toast({ 
        title: isAr ? "تم الحفظ" : "Changes Saved", 
        description: isAr ? "تم تحديث الصلاحيات بنجاح." : "User permissions updated successfully." 
      });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to update permissions." });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 text-secondary animate-spin" />
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">
        {isAr ? 'جاري مزامنة بيانات الصلاحيات...' : 'Syncing User Matrix...'}
      </p>
    </div>
  );

  if (!userData) return (
    <div className="p-20 text-center space-y-4">
       <ShieldAlert className="h-16 w-16 text-slate-200 mx-auto" />
       <p className="text-slate-400 font-bold">{isAr ? 'لم يتم العثور على هذا المستخدم.' : 'User not found.'}</p>
       <Button onClick={() => router.back()} variant="outline">{isAr ? 'العودة للخلف' : 'Go Back'}</Button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <div className="flex items-center gap-6">
         <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm border border-slate-100">
           <ChevronLeft className={cn("h-5 w-5", isAr && "rotate-180")} />
         </button>
         <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{isAr ? 'صلاحيات المستخدم' : 'Privilege Management'}</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{userData.displayName} • {userData.role}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="space-y-6">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white p-10 space-y-8">
               <div className="h-20 w-20 rounded-3xl bg-secondary flex items-center justify-center text-white text-3xl font-black shadow-xl">
                  {userData.displayName?.charAt(0)}
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase">{userData.displayName}</h3>
                  <p className="text-white/40 font-bold text-xs flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {userData.email}</p>
               </div>
               <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Account Status</span>
                     <Badge className={cn("rounded-lg border-none font-black text-[8px] uppercase", userData.status === 'active' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>{userData.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">System Role</span>
                     <Badge className="bg-secondary/10 text-secondary border-none rounded-lg font-black text-[8px] uppercase">{userData.role}</Badge>
                  </div>
               </div>
            </Card>

            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-8 space-y-6 border border-slate-100">
               <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <ShieldAlert className="h-6 w-6 text-amber-500" />
                  <h4 className="font-black text-primary uppercase text-sm tracking-widest">Security Log</h4>
               </div>
               <p className="text-[10px] font-bold text-slate-400 italic">Audit trails and login history will be visible here in the next version.</p>
            </Card>
         </div>

         <div className="lg:col-span-2">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="p-10 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between bg-slate-50/30 gap-6">
                  <div>
                     <CardTitle className="text-xl font-black uppercase text-primary">{isAr ? 'مصفوفة الصلاحيات' : 'Access Permissions Matrix'}</CardTitle>
                     <CardDescription className="font-bold">Grant specific CRUD access per functional module.</CardDescription>
                  </div>
                  <Button onClick={handleSave} disabled={isSaving} className="h-12 w-full md:w-auto rounded-xl bg-primary text-white font-black px-8 shadow-xl shadow-primary/10 gap-2 transition-all active:scale-95">
                     {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                     {isAr ? 'حفظ التعديلات' : 'Commit Changes'}
                  </Button>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-slate-50">
                     {[
                        { id: 'enrollments', label: isAr ? 'القبول والتسجيل' : 'Admissions & Enrollments', icon: FileSearch },
                        { id: 'students', label: isAr ? 'إدارة الطلاب' : 'Active Student Records', icon: Users },
                        { id: 'finances', label: isAr ? 'الإدارة المالية' : 'Financial Ledgers', icon: CreditCard },
                        { id: 'users', label: isAr ? 'إدارة المستخدمين' : 'Admin User Control', icon: UserCog },
                     ].map((mod) => (
                        <div key={mod.id} className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-slate-50/50 transition-all group">
                           <div className="flex items-center gap-6">
                              <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                 <mod.icon className="h-6 w-6" />
                              </div>
                              <div>
                                 <h4 className="font-black text-slate-900 text-lg">{mod.label}</h4>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module Code: {mod.id}</p>
                              </div>
                           </div>
                           
                           <div className="flex flex-wrap gap-10">
                              {['read', 'write', 'delete'].map((action) => (
                                 <div key={action} className="flex items-center gap-3">
                                    <Switch 
                                       checked={permissions?.[mod.id]?.[action] || false} 
                                       onCheckedChange={() => togglePermission(mod.id, action)}
                                    />
                                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{action}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
