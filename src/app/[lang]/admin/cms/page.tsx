
'use client';

import { use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { Briefcase, Settings, Globe, Plus, PencilLine, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PlatformCMS({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'إدارة محتوى المنصة' : 'Platform CMS'}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'التحكم في البرامج والمعلومات العامة' : 'Centralized Content & Program Control'}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-50 pb-8">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg"><Briefcase className="h-6 w-6" /></div>
                  <h3 className="text-xl font-black uppercase text-primary">{isAr ? 'البرامج التعليمية' : 'Active Programs'}</h3>
               </div>
               <Button variant="outline" className="rounded-xl font-black text-[10px] h-10 border-slate-100 uppercase tracking-widest"><Plus className="h-4 w-4 mr-2" /> Add Program</Button>
            </div>
            
            <div className="space-y-4">
               {['Foundation 3-5', 'Academics 6-12', 'Weekend Remote'].map((p, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-slate-100 group shadow-sm">
                    <span className="font-black text-primary uppercase text-sm">{p}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                       <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-secondary/10 hover:text-secondary"><PencilLine className="h-4 w-4" /></Button>
                       <Button size="icon" variant="ghost" className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="border-none shadow-premium rounded-[2.5rem] bg-slate-900 text-white p-10 space-y-8">
            <div className="flex items-center gap-4 border-b border-white/5 pb-8">
               <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center shadow-lg"><Globe className="h-6 w-6" /></div>
               <h3 className="text-xl font-black uppercase">{isAr ? 'تعديل الصفحات الرئيسية' : 'Website Sections'}</h3>
            </div>
            <p className="text-sm font-bold text-white/40 leading-relaxed italic">
               Edit the text, images, and FAQs visible to parents and visitors on the public website.
            </p>
            <div className="grid grid-cols-2 gap-4">
               {['Hero Section', 'About BBA', 'FAQ List', 'Testimonials'].map((s, i) => (
                 <Button key={i} variant="outline" className="h-14 border-white/10 bg-white/5 hover:bg-white hover:text-primary rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                    Edit {s}
                 </Button>
               ))}
            </div>
         </Card>
      </div>
    </div>
  );
}
