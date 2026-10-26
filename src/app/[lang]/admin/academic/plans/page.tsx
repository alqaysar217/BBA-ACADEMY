
'use client';

import { use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { Target, Plus, Search, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function StudyPlansPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'الخطط الدراسية' : 'Study Plans'}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'إدارة وتخصيص المسارات الأكاديمية' : 'Manage & Customize Academic Pathways'}</p>
         </div>
         <Button className="h-14 rounded-2xl bg-secondary text-white font-black px-8 shadow-xl shadow-secondary/20">
            <Plus className="h-5 w-5 mr-2" /> {isAr ? 'خطة جديدة' : 'Create New Plan'}
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {/* Template Card */}
         <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden group">
            <CardHeader className="bg-primary p-8 text-white relative overflow-hidden">
               <BookOpen className="absolute top-0 right-0 p-8 opacity-10 h-32 w-32" />
               <CardTitle className="text-xl font-black uppercase tracking-tight relative z-10">{isAr ? 'قالب المرحلة الابتدائية' : 'Elementary Template'}</CardTitle>
               <p className="text-white/60 text-xs font-bold relative z-10 uppercase tracking-widest">AY 2026-2027</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                     <span>{isAr ? 'المواد المقررة' : 'Subjects'}</span>
                     <span className="text-primary">8 Core</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                     <span>{isAr ? 'طلاب نشطون' : 'Active Students'}</span>
                     <span className="text-secondary">42 Students</span>
                  </div>
               </div>
               <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 font-black uppercase text-[10px] tracking-widest group-hover:bg-primary group-hover:text-white transition-all">
                  {isAr ? 'تعديل القالب' : 'Edit Template'}
               </Button>
            </CardContent>
         </Card>
         
         <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden group">
            <CardHeader className="bg-secondary p-8 text-white relative overflow-hidden">
               <GraduationCap className="absolute top-0 right-0 p-8 opacity-10 h-32 w-32" />
               <CardTitle className="text-xl font-black uppercase tracking-tight relative z-10">{isAr ? 'قالب المرحلة الثانوية' : 'High School Template'}</CardTitle>
               <p className="text-white/60 text-xs font-bold relative z-10 uppercase tracking-widest">AY 2026-2027</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                     <span>{isAr ? 'المواد المقررة' : 'Subjects'}</span>
                     <span className="text-primary">12 Core</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                     <span>{isAr ? 'طلاب نشطون' : 'Active Students'}</span>
                     <span className="text-secondary">85 Students</span>
                  </div>
               </div>
               <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 font-black uppercase text-[10px] tracking-widest group-hover:bg-secondary group-hover:text-white transition-all">
                  {isAr ? 'تعديل القالب' : 'Edit Template'}
               </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
