
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ShieldCheck, ChevronLeft, Loader2, Save,
  FileText, Users, CreditCard, UserCog,
  MessageSquare, LayoutDashboard, KeyRound,
  BarChart3, Briefcase, ShieldAlert, Search,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
        dashboard: { read: true, write: false, execute: false },
        enrollments: { read: true, write: false, execute: false },
        students: { read: true, write: false, execute: false },
        academic: { read: true, write: false, execute: false },
        finances: { read: false, write: false, execute: false },
        communication: { read: false, write: false, execute: false },
        cms: { read: false, write: false, execute: false },
        users: { read: false, write: false, execute: false },
        reports: { read: false, write: false, execute: false }
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
      toast({ title: isAr ? "تم تحديث مصفوفة الصلاحيات" : "Permissions Matrix Updated" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error" });
    } finally {
      setIsSaving(false);
    }
  };

  const modules = [
    { id: 'dashboard', label: isAr ? 'لوحة المعلومات الرئيسية' : 'Main Dashboard', icon: LayoutDashboard },
    { id: 'enrollments', label: isAr ? 'القبول وطلبات الالتحاق' : 'Admissions & Applications', icon: Search },
    { id: 'students', label: isAr ? 'إدارة ملفات الطلاب' : 'Student Management', icon: Users },
    { id: 'academic', label: isAr ? 'الخطط الدراسية والمتابعة' : 'Academic Plans', icon: BookOpen },
    { id: 'finances', label: isAr ? 'الإدارة والتقارير المالية' : 'Financial Management', icon: CreditCard },
    { id: 'communication', label: isAr ? 'التواصل وقوالب الرسائل' : 'Comms & Outreach', icon: MessageSquare },
    { id: 'cms', label: isAr ? 'إدارة البرامج والمحتوى' : 'CMS & Programs', icon: Briefcase },
    { id: 'users', label: isAr ? 'إدارة المستخدمين' : 'User Administration', icon: UserCog },
    { id: 'reports', label: isAr ? 'التقارير والإحصائيات العامة' : 'Reports & Analytics', icon: BarChart3 },
  ];

  if (loading || !permissions || !userData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
      <Loader2 className="h-12 w-12 text-secondary animate-spin" />
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Permissions Matrix...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm border border-slate-100">
              <ChevronLeft className={cn("h-5 w-5", isAr && "rotate-180")} />
            </button>
            <div className="flex items-center gap-4">
               <div className="h-14 w-14 rounded-2xl bg-primary/10 overflow-hidden flex items-center justify-center border-2 border-white shadow-md shrink-0">
                  <Image src={userData.photoURL || '/logo.png'} alt={userData.displayName} width={56} height={56} className="object-contain p-1" unoptimized />
               </div>
               <div>
                  <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none mb-2">{isAr ? 'تخصيص الصلاحيات' : 'Granular Permissions'}</h1>
                  <p className="text-secondary font-black uppercase text-[10px] tracking-widest">{userData.displayName} • {userData.role}</p>
               </div>
            </div>
         </div>
         <Button onClick={handleSave} disabled={isSaving} className="w-full md:w-auto h-16 rounded-2xl bg-secondary text-white font-black px-12 shadow-xl shadow-secondary/20 gap-3 text-lg transition-all active:scale-95">
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {isAr ? 'حفظ الصلاحيات' : 'Commit Changes'}
         </Button>
      </div>

      <Card className="border-none shadow-premium rounded-[3rem] bg-white overflow-hidden border border-slate-100">
         <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg"><KeyRound className="h-6 w-6" /></div>
               <CardTitle className="text-xl font-black uppercase text-primary">{isAr ? 'مصفوفة التحكم الدقيق' : 'Granular Control Matrix'}</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left" dir={isAr ? 'rtl' : 'ltr'}>
                  <thead>
                     <tr className="bg-slate-50/50 border-b border-slate-50">
                        <th className="p-8 font-black text-[10px] uppercase text-slate-400 tracking-widest w-2/5 text-start">{isAr ? 'الوحدة الوظيفية' : 'Module / Unit'}</th>
                        <th className="p-8 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'قراءة' : 'Read'}</th>
                        <th className="p-8 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'كتابة' : 'Write'}</th>
                        <th className="p-8 text-center font-black text-[10px] uppercase text-slate-400 tracking-widest">{isAr ? 'تنفيذ' : 'Execute'}</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {modules.map((mod) => (
                        <tr key={mod.id} className="hover:bg-slate-50/30 transition-all group">
                           <td className="p-8">
                              <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                    <mod.icon className="h-5 w-5" />
                                 </div>
                                 <span className="font-black text-slate-900 uppercase text-xs tracking-tight">{mod.label}</span>
                              </div>
                           </td>
                           <td className="p-8 text-center">
                              <Checkbox 
                                 checked={permissions[mod.id]?.read} 
                                 onCheckedChange={() => togglePermission(mod.id, 'read')}
                                 className="h-7 w-7 border-2 border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-lg"
                              />
                           </td>
                           <td className="p-8 text-center">
                              <Checkbox 
                                 checked={permissions[mod.id]?.write} 
                                 onCheckedChange={() => togglePermission(mod.id, 'write')}
                                 className="h-7 w-7 border-2 border-slate-200 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary rounded-lg"
                              />
                           </td>
                           <td className="p-8 text-center">
                              <Checkbox 
                                 checked={permissions[mod.id]?.execute} 
                                 onCheckedChange={() => togglePermission(mod.id, 'execute')}
                                 className="h-7 w-7 border-2 border-slate-200 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 rounded-lg"
                              />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>

      <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 flex items-start gap-6 shadow-sm">
         <ShieldAlert className="h-8 w-8 text-amber-600 shrink-0 mt-1" />
         <div className="space-y-2">
            <h4 className="font-black text-amber-900 uppercase text-sm">{isAr ? 'تنبيه أمان النظام' : 'System Security Notice'}</h4>
            <p className="text-xs font-bold text-amber-900/70 leading-relaxed italic">
               {isAr 
                  ? 'التغييرات في مصفوفة الصلاحيات تسري فوراً على جلسة المستخدم. يرجى التأكد من فصل المهام وعدم منح صلاحيات "تنفيذ" للموظفين إلا عند الضرورة القصوى.' 
                  : 'Changes to permissions apply immediately. Ensure proper separation of duties and restrict "Execute" rights to authorized personnel only.'}
            </p>
         </div>
      </div>
    </div>
  );
}
