
'use client';

import { use, useState, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { 
  LayoutTemplate, 
  Plus, 
  Search, 
  PencilLine, 
  Trash2, 
  Mail, 
  Eye, 
  Save, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Default library - In production, these should come from Firestore
const DEFAULT_TEMPLATES = [
  {
    id: 'received',
    label: 'Application Received',
    subject: 'BBA Academy: We have received your application',
    body: 'Dear {{parentName}},\n\nThank you for choosing Baneen and Banaat Academy. We are writing to confirm that we have successfully received your enrollment application for {{studentCount}} student(s).\n\nOur admissions team is currently reviewing your details. We will contact you shortly if any further documentation is required.\n\nBest regards,\nBBA Admissions Office'
  },
  {
    id: 'under_review',
    label: 'Under Review',
    subject: 'BBA Academy: Your application is under review',
    body: 'Dear {{parentName}},\n\nThis is a formal update regarding your application (ID: {{appId}}). Your file is now "Under Review" by our academic committee.\n\nWe appreciate your patience during this process.\n\nSincerely,\nBBA Academic Committee'
  },
  {
    id: 'offer',
    label: 'Admission Offer',
    subject: 'Congratulations! Admission Offer from BBA Academy',
    body: 'Dear {{parentName}},\n\nWe are pleased to inform you that the following student(s) have been accepted into Baneen and Banaat Academy:\n\n{{acceptedStudents}}\n\nWelcome to the family!\nBBA Administration'
  }
];

export default function EmailTemplatesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleSave = () => {
    if (!selectedTemplate) return;
    setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? selectedTemplate : t));
    toast({ title: "Template Saved", description: "The changes have been applied to the system library." });
    setSelectedTemplate(null);
  };

  const updateSelectedField = (field: string, value: string) => {
    setSelectedTemplate((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <LayoutTemplate className="h-8 w-8 text-secondary" />
               {isAr ? 'قوالب الرسائل' : 'Email Templates'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'إدارة محتوى القوالب والمتغيرات البرمجية' : 'Manage official library of communication templates and variables'}</p>
         </div>
         <Button className="h-14 rounded-xl bg-primary text-white font-black px-8 shadow-xl shadow-primary/20">
            <Plus className="h-5 w-5 mr-2" /> {isAr ? 'قالب جديد' : 'New Template'}
         </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 space-y-4">
            {templates.map(t => (
               <Card 
                  key={t.id} 
                  className={cn(
                     "border shadow-sm rounded-xl cursor-pointer transition-all group overflow-hidden",
                     selectedTemplate?.id === t.id ? "border-secondary ring-1 ring-secondary/20 shadow-lg" : "border-slate-100 hover:border-slate-200"
                  )}
                  onClick={() => setSelectedTemplate({...t})}
               >
                  <div className="p-5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center transition-colors", selectedTemplate?.id === t.id ? "bg-secondary text-white" : "bg-slate-50 text-slate-400")}>
                           <Mail className="h-5 w-5" />
                        </div>
                        <span className="font-black text-primary text-xs uppercase tracking-tight">{t.label}</span>
                     </div>
                     <ChevronRight className={cn("h-4 w-4 text-slate-300 transition-all", selectedTemplate?.id === t.id && "translate-x-1 text-secondary")} />
                  </div>
               </Card>
            ))}

            <Card className="border-none bg-amber-50 p-6 rounded-xl border border-amber-100 space-y-3">
               <div className="flex items-center gap-2 text-amber-700">
                  <Info className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase">Available Variables</span>
               </div>
               <div className="flex flex-wrap gap-2">
                  {['parentName', 'studentCount', 'appId', 'acceptedStudents', 'reason'].map(v => (
                     <code key={v} className="bg-white px-2 py-0.5 rounded border border-amber-200 text-[9px] font-bold text-amber-800">
                        {`{{${v}}}`}
                     </code>
                  ))}
               </div>
            </Card>
         </div>

         <div className="lg:col-span-2">
            {selectedTemplate ? (
               <Card className="border-none shadow-premium rounded-xl bg-white overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                  <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                     <CardTitle className="text-sm font-black text-primary uppercase flex items-center gap-3">
                        <PencilLine className="h-5 w-5 text-secondary" />
                        Edit Template: {selectedTemplate.label}
                     </CardTitle>
                     <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-50">
                        <Trash2 className="h-5 w-5" />
                     </Button>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Subject Line</label>
                        <Input 
                          value={selectedTemplate.subject} 
                          onChange={(e) => updateSelectedField('subject', e.target.value)}
                          className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Body (Markdown/Text)</label>
                        <Textarea 
                          value={selectedTemplate.body} 
                          onChange={(e) => updateSelectedField('body', e.target.value)}
                          className="min-h-[350px] rounded-xl bg-slate-50 border-none p-8 font-medium leading-relaxed italic" 
                        />
                     </div>
                     <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                        <Button variant="ghost" onClick={() => setSelectedTemplate(null)} className="font-black text-[10px] uppercase">Cancel</Button>
                        <Button onClick={handleSave} className="h-14 rounded-xl bg-primary text-white font-black px-12 shadow-xl shadow-primary/10 gap-2">
                           <Save className="h-5 w-5 text-secondary" /> Save Changes
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            ) : (
               <div className="h-[600px] rounded-xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12 bg-white/50">
                  <LayoutTemplate className="h-20 w-20 text-slate-100 mb-6" />
                  <h3 className="text-xl font-black text-slate-300 uppercase">Select a Template to Edit</h3>
                  <p className="text-xs font-bold text-slate-400 max-w-xs mt-2">Manage the content that parents will see in their official emails.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
