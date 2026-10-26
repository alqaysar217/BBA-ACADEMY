
'use client';

import { use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  ShieldCheck, LockKeyhole, UserCog, CheckCircle2, 
  AlertTriangle, Settings, Info, Search, Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function RolesPermissionsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';

  const ROLES_INFO = [
    {
      name: 'Super Admin',
      desc: isAr ? 'وصول كامل لكافة أجزاء النظام' : 'Unrestricted system access',
      permissions: ['All System Modules', 'User Management', 'Financial Records', 'Admissions Control'],
      color: 'bg-primary'
    },
    {
      name: 'Admissions Officer',
      desc: isAr ? 'إدارة طلبات التسجيل والمراجعة' : 'Primary handler for new intake',
      permissions: ['Read Enrollments', 'Write Enrollments', 'Read Students'],
      color: 'bg-secondary'
    },
    {
      name: 'Financial Officer',
      desc: isAr ? 'إدارة الدفعات والسجلات المالية' : 'Accounts and revenue tracking',
      permissions: ['Financial Hub', 'Payment Ledger', 'Debt Recovery'],
      color: 'bg-green-500'
    },
    {
      name: 'Academic Coordinator',
      desc: isAr ? 'إدارة الخطط الدراسية وتقدم الطلاب' : 'Educational progress monitor',
      permissions: ['Study Plans', 'Course Catalog', 'Progress Tracking'],
      color: 'bg-amber-500'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'الأدوار والصلاحيات' : 'Roles & Privileges'}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'تحديد قوالب الوصول للنظام' : 'Access Control List Definition'}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {ROLES_INFO.map((role, idx) => (
           <Card key={idx} className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <CardHeader className={cn("p-10 text-white relative overflow-hidden", role.color)}>
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><LockKeyhole className="h-32 w-32" /></div>
                 <div className="relative z-10 space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight">{role.name}</h3>
                    <p className="text-white/60 font-bold text-xs uppercase tracking-widest">{role.desc}</p>
                 </div>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{isAr ? 'الصلاحيات المضمنة' : 'Core Permissions'}</h4>
                    <div className="flex flex-wrap gap-2">
                       {role.permissions.map((p, i) => (
                         <div key={i} className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 group/item">
                            <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                            <span className="text-xs font-bold text-slate-600">{p}</span>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => <div key={i} className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400">{i}</div>)}
                    </div>
                    <Button variant="ghost" className="text-secondary font-black uppercase text-[10px] tracking-widest">
                       {isAr ? 'تعديل الصلاحيات' : 'Adjust Matrix'}
                    </Button>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      <Card className="border-none shadow-premium rounded-[3rem] bg-slate-900 text-white p-12 text-center space-y-8 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform"><Settings className="h-48 w-48" /></div>
         <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3 className="text-3xl font-black uppercase tracking-tight">{isAr ? 'تخصيص أدوار جديدة؟' : 'Custom Functional Roles?'}</h3>
            <p className="text-white/40 font-bold leading-relaxed">If the preset roles do not meet your operational workflow, you can architect new privilege containers with specific scoped access.</p>
            <div className="pt-4">
               <Button className="h-16 rounded-2xl bg-white text-slate-900 hover:bg-secondary hover:text-white font-black px-12 text-lg shadow-xl transition-all">
                  <Plus className="h-6 w-6 mr-2" /> {isAr ? 'إضافة دور مخصص' : 'Architect New Role'}
               </Button>
            </div>
         </div>
      </Card>
    </div>
  );
}
