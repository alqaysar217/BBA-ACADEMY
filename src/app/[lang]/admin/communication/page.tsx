
'use client';

import { use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { Mail, Send, MessageSquare, History, Search, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CommunicationHub({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'مركز التواصل' : 'Comms Hub'}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'التواصل الموحد مع أولياء الأمور' : 'Unified Parent Engagement Center'}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Sidebar Tools */}
         <div className="space-y-6">
            <Card className="border-none shadow-premium rounded-[2rem] bg-white p-6">
               <h3 className="font-black uppercase text-xs text-slate-400 mb-6 tracking-widest">{isAr ? 'القوالب السريعة' : 'Quick Templates'}</h3>
               <div className="space-y-2">
                  {['Welcome Email', 'Admission Confirmed', 'Tuition Reminder', 'Document Request'].map((t, i) => (
                    <button key={i} className="w-full text-start p-4 rounded-xl hover:bg-slate-50 text-xs font-black uppercase text-primary/80 transition-all border border-transparent hover:border-slate-100 flex items-center justify-between group">
                       {t}
                       <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
               </div>
            </Card>

            <Card className="border-none shadow-premium rounded-[2rem] bg-slate-900 text-white p-8 space-y-6">
               <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center shadow-lg"><History className="h-6 w-6" /></div>
               <div className="space-y-2">
                  <h4 className="font-black uppercase tracking-tight">{isAr ? 'تاريخ المراسلات' : 'Recent Outbox'}</h4>
                  <p className="text-[10px] text-white/40 font-bold">Monitor all outgoing parent notifications.</p>
               </div>
               <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white h-12 rounded-xl font-black text-[10px] uppercase tracking-widest">View All Logs</Button>
            </Card>
         </div>

         {/* Composer Area */}
         <div className="lg:col-span-2">
            <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
               <CardHeader className="bg-slate-50 p-10 border-b border-slate-100">
                  <CardTitle className="text-xl font-black uppercase text-primary flex items-center gap-4">
                     <Mail className="h-6 w-6 text-secondary" />
                     {isAr ? 'إنشاء رسالة جديدة' : 'Compose Unified Message'}
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'إلى:' : 'Recipient:'}</label>
                        <Input placeholder={isAr ? 'ابحث عن اسم ولي الأمر...' : 'Search parent name...'} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'الموضوع:' : 'Subject:'}</label>
                        <Input className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'محتوى الرسالة:' : 'Message Body:'}</label>
                     <Textarea className="min-h-[300px] rounded-2xl bg-slate-50 border-none p-8 font-medium leading-relaxed" />
                  </div>
                  <div className="flex justify-end pt-6">
                     <Button className="h-14 rounded-2xl bg-primary text-white font-black px-12 shadow-xl shadow-primary/10 gap-3 text-lg transition-all active:scale-95">
                        {isAr ? 'إرسال الآن' : 'Broadcast Message'}
                        <Send className="h-5 w-5" />
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
