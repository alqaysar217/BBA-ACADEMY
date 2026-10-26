
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ShieldCheck, ChevronLeft, Loader2, Save,
  FileSearch, Users, CreditCard, UserCog, CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function UserPermissionsPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const router = useRouter();
  const firestore = useFirestore();
  const [isSaving, setIsSaving] = useState(false);

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
    if (!firestore || !permissions || !userRef) return;
    setIsSaving(true);
    try {
      await updateDoc(userRef, {
        permissions,
        updatedAt: serverTimestamp()
      });
      toast({ 
        title: isAr ? "تم تحديث الصلاحيات" : "Permissions Updated", 
        description: isAr ? "تم حفظ مصفوفة الوصول بنجاح." : "Access control matrix updated successfully." 
      });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to update permissions." });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !permissions) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 text-secondary animate-spin" />
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">
        {isAr ? 'جاري مزامنة الصلاحيات...' : 'Syncing Permissions...'}
      </p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24 px-4">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm border border-slate-100">
              <ChevronLeft className={cn("h-5 w-5", isAr && "rotate-180")} />
            </button>
            <div>
               <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{isAr ? 'إدارة الصلاحيات' : 'Manage Permissions'}</h1>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{userData.displayName} • {userData.email}</p>
            </div>
         </div>
         <Button onClick={handleSave} disabled={isSaving} className="h-14 rounded-2xl bg-secondary text-white font-black px-10 shadow-xl shadow-secondary/20 gap-3 transition-all active:scale-95">
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {isAr ? 'حفظ الصلاحيات' : 'Commit Matrix'}
         </Button>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
         <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg"><ShieldCheck className="h-6 w-6" /></div>
               <div>
                  <CardTitle className="text-xl font-black uppercase text-primary">{isAr ? 'مصفوفة الوصول للموارد' : 'Resource Access Matrix'}</CardTitle>
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
                        <th className="p-8 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'قراءة (Read)' : 'Read'}</th>
                        <th className="p-8 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'كتابة (Write)' : 'Write'}</th>
                        <th className="p-8 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'حذف (Delete)' : 'Delete'}</th>
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
                                 checked={permissions[mod.id]?.read} 
                                 onCheckedChange={() => togglePermission(mod.id, 'read')}
                                 className="h-6 w-6 border-2 border-slate-200 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                              />
                           </td>
                           <td className="p-8 text-center">
                              <Checkbox 
                                 checked={permissions[mod.id]?.write} 
                                 onCheckedChange={() => togglePermission(mod.id, 'write')}
                                 className="h-6 w-6 border-2 border-slate-200 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                              />
                           </td>
                           <td className="p-8 text-center">
                              <Checkbox 
                                 checked={permissions[mod.id]?.delete} 
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
    </div>
  );
}
