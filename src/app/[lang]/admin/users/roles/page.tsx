
'use client';

import { use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  ShieldCheck, LockKeyhole, UserCog, CheckCircle2, 
  AlertTriangle, Settings, Info, Search, Plus,
  ShieldAlert, Eye, FileSearch, CreditCard, Target, Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function RolesPermissionsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';

  const ROLES_INFO = [
    {
      id: 'admin',
      name: isAr ? 'مدير النظام (Super Admin)' : 'Super Admin',
      desc: isAr ? 'وصول كامل ومطلق لكافة أجزاء النظام والتحكم في الإعدادات' : 'Unrestricted system access and global settings control',
      permissions: ['All System Modules', 'User Management', 'Financial Records', 'Security Rules'],
      color: 'bg-primary'
    },
    {
      id: 'admissions',
      name: isAr ? 'مسؤول القبول (Admissions)' : 'Admissions Officer',
      desc: isAr ? 'إدارة طلبات التسجيل الجديدة، مراجعة المستندات، واتخاذ قرارات القبول' : 'Primary handler for new intake, document review, and status updates',
      permissions: ['Read/Write Enrollments', 'Student Onboarding', 'Document Verification'],
      color: 'bg-secondary'
    },
    {
      id: 'financial',
      name: isAr ? 'المسؤول المالي (Financial)' : 'Financial Officer',
      desc: isAr ? 'إدارة الرسوم، تحصيل الدفعات، تتبع المتأخرات، وإصدار التقارير المالية' : 'Accounts receivable, revenue tracking, and financial reporting',
      permissions: ['Financial Hub', 'Payment Ledger', 'Debt Recovery', 'Square Sync'],
      color: 'bg-green-600'
    },
    {
      id: 'academic',
      name: isAr ? 'المنسق الأكاديمي (Academic)' : 'Academic Coordinator',
      desc: isAr ? 'إدارة الخطط الدراسية، تتبع تقدم الطلاب، وتنسيق المواد مع Edgenuity' : 'Educational progress monitor, study plans, and course catalog management',
      permissions: ['Study Plans', 'Course Catalog', 'Progress Tracking', 'Academic Records'],
      color: 'bg-amber-600'
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'هيكلية الأدوار والصلاحيات' : 'Roles & Privileges'}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'تحديد مصفوفة الوصول لموارد الأكاديمية' : 'Access Control List Definition & Templates'}</p>
         </div>
      </div>

      {/* Info Alert: Explanation of the page's role */}
      <Card className="border-none bg-blue-50 border-l-4 border-blue-500 rounded-2xl overflow-hidden shadow-sm">
         <CardContent className="p-6 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
               <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-2">
               <h3 className="font-black text-blue-900 uppercase text-sm">{isAr ? 'ما هو دور هذه الواجهة؟' : 'How this page works'}</h3>
               <p className="text-sm text-blue-800/80 leading-relaxed font-medium">
                  {isAr 
                    ? 'تستخدم هذه الصفحة كقالب تعريفي للأدوار الوظيفية داخل BBA OS. عند تعديل صلاحيات أي موظف من "سجل المستخدمين"، يتم الاستناد إلى هذه القواعد لضمان خصوصية البيانات وفصل المهام بين الأقسام المختلفة.'
                    : 'This page acts as a structural reference for job roles within BBA OS. When modifying a staff member\'s permissions from the User Registry, these standard rules apply to ensure data privacy and separation of duties between departments.'}
               </p>
            </div>
         </CardContent>
      </Card>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {ROLES_INFO.map((role, idx) => (
           <Card key={idx} className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <CardHeader className={cn("p-10 text-white relative overflow-hidden", role.color)}>
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700"><LockKeyhole className="h-32 w-32" /></div>
                 <div className="relative z-10 space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight">{role.name}</h3>
                    <p className="text-white/60 font-bold text-xs uppercase tracking-widest leading-relaxed max-w-[90%]">{role.desc}</p>
                 </div>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{isAr ? 'الصلاحيات الافتراضية' : 'Standard Capabilities'}</h4>
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
                    <Button variant="ghost" asChild className="text-secondary font-black uppercase text-[10px] tracking-widest hover:bg-secondary/5">
                       <Link href={`/${lang}/admin/users`}>
                          {isAr ? 'تخصيص لموظف' : 'Assign to User'}
                       </Link>
                    </Button>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      {/* Security Summary Table */}
      <Card className="border-none shadow-premium rounded-[3rem] bg-slate-900 text-white overflow-hidden group">
         <CardHeader className="p-12 pb-6">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center shadow-lg"><ShieldAlert className="h-6 w-6 text-white" /></div>
               <div>
                  <CardTitle className="text-2xl font-black uppercase">{isAr ? 'مستويات الوصول للموارد' : 'Resource Access Matrix'}</CardTitle>
                  <CardDescription className="text-white/40 font-bold">Quick glance at cross-departmental data access</CardDescription>
               </div>
            </div>
         </CardHeader>
         <CardContent className="p-12 pt-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                        <th className="py-6 px-4">{isAr ? 'القسم / المورد' : 'Module / Resource'}</th>
                        <th className="py-6 px-4">Admin</th>
                        <th className="py-6 px-4">Admissions</th>
                        <th className="py-6 px-4">Financial</th>
                        <th className="py-6 px-4">Academic</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-bold text-sm">
                     {[
                        { m: isAr ? 'المالية' : 'Finance', i: CreditCard, a: 'Full', ad: 'None', f: 'Full', ac: 'View' },
                        { m: isAr ? 'الطلاب' : 'Students', i: Users, a: 'Full', ad: 'Partial', f: 'View', ac: 'Full' },
                        { m: isAr ? 'القبول' : 'Enrollments', i: FileSearch, a: 'Full', ad: 'Full', f: 'None', ac: 'None' },
                        { m: isAr ? 'الخطط' : 'Plans', i: Target, a: 'Full', ad: 'None', f: 'None', ac: 'Full' },
                     ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                           <td className="py-6 px-4 flex items-center gap-3">
                              <row.i className="h-4 w-4 text-secondary/50" />
                              {row.m}
                           </td>
                           <td className="py-6 px-4 text-green-400">{row.a}</td>
                           <td className="py-6 px-4 text-white/60">{row.ad}</td>
                           <td className="py-6 px-4 text-white/60">{row.f}</td>
                           <td className="py-6 px-4 text-white/60">{row.ac}</td>
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
