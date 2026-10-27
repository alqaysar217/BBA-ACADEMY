
'use client';

import { use, useState, useMemo } from 'react';
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
  Info,
  Copy,
  Check,
  Tag,
  BookOpen,
  Filter,
  Layers,
  GraduationCap,
  CreditCard,
  History
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Official BBA Template Library (Initial Set)
const INITIAL_LIBRARY = [
  {
    id: 'app_received',
    category: 'Admissions',
    label: 'Application Received & Welcome',
    subject: 'BBA Academy: Application Received - {{parentName}}',
    body: 'Dear {{parentName}},\n\nThank you for choosing Baneen and Banaat Academy. We are writing to confirm that we have successfully received your enrollment application (Ref: {{applicationNumber}}) for the following student(s):\n\n{{studentNames}}\n\nOur admissions team is currently conducting an initial review of your details. Please note that this confirmation does not imply final acceptance. We will contact you shortly regarding the next steps or if additional information is required.\n\nBest regards,\nBBA Admissions Office\nbanaatacademy@gmail.com'
  },
  {
    id: 'app_review',
    category: 'Admissions',
    label: 'Application Under Review',
    subject: 'Update: Your application is now under review',
    body: 'Dear {{parentName}},\n\nThis is an update regarding application {{applicationNumber}}. Your file is now "Under Review" by our academic committee for {{studentNames}}.\n\nWe appreciate your patience during this process. No further action is required from your side at this moment.\n\nSincerely,\nBBA Academic Committee'
  },
  {
    id: 'info_required',
    category: 'Admissions',
    label: 'Additional Information Required',
    subject: 'Action Required: Information missing for your BBA application',
    body: 'Dear {{parentName}},\n\nDuring the review of your application ({{applicationNumber}}), we noticed that some information is missing or requires clarification.\n\nDetails needed:\n{{missingInformation}}\n\nPlease provide these details by replying to this email so we can proceed with your application.\n\nThank you,\nBBA Admissions Team'
  },
  {
    id: 'docs_required',
    category: 'Admissions',
    label: 'Additional Documents Required',
    subject: 'Document Request: BBA Enrollment ({{applicationNumber}})',
    body: 'Dear {{parentName}},\n\nTo complete the evaluation of the application for {{studentNames}}, we require the following documents:\n\n{{missingDocuments}}\n\nYou may upload these files through the student portal or reply directly to this email with attachments.\n\nRegards,\nBBA Administration'
  },
  {
    id: 'admission_offer',
    category: 'Admissions',
    label: 'Admission Accepted - Full',
    subject: 'Congratulations! Admission Offer from BBA Academy',
    body: 'Dear {{parentName}},\n\nWe are pleased to inform you that the application for {{studentNames}} has been accepted into Baneen and Banaat Academy for the {{programName}} program.\n\nNext Steps:\n{{nextSteps}}\n\nAn administrator will contact you within 48 hours to finalize the orientation details. Welcome to the family!\n\nBest regards,\nDr. Mustafa Ali\nAcademy Director'
  },
  {
    id: 'admission_rejected',
    category: 'Admissions',
    label: 'Admission Decision: Not Accepted',
    subject: 'Update regarding your BBA Application ({{applicationNumber}})',
    body: 'Dear {{parentName}},\n\nThank you for your interest in Baneen and Banaat Academy. After careful review of the application for {{studentNames}}, we regret to inform you that we are unable to offer admission at this time.\n\nDecision Details:\n{{decisionReason}}\n\nWe wish you and your family the very best in your educational journey.\n\nRespectfully,\nBBA Admissions Office'
  },
  {
    id: 'payment_reminder',
    category: 'Financial',
    label: 'Payment Reminder',
    subject: 'Invoice Reminder: BBA Tuition Fee',
    body: 'Dear {{parentName}},\n\nThis is a friendly reminder regarding the outstanding balance for {{studentNames}}.\n\nDue Amount: {{paymentAmount}}\nDue Date: {{paymentDueDate}}\n\nPlease ensure payment is settled to maintain active enrollment status. If you have already made the payment, please disregard this notice.\n\nSincerely,\nBBA Financial Department'
  }
];

const VARIABLE_REF = [
  { name: '{{parentName}}', ar: 'اسم ولي الأمر الأساسي', source: 'Parent 1 Field' },
  { name: '{{studentNames}}', ar: 'قائمة أسماء الطلاب', source: 'Students Array' },
  { name: '{{applicationNumber}}', ar: 'رقم مرجع الطلب', source: 'Document ID' },
  { name: '{{programName}}', ar: 'اسم البرنامج التعليمي', source: 'Program Selection' },
  { name: '{{missingInformation}}', ar: 'البيانات الناقصة (يدوي)', source: 'Staff Input' },
  { name: '{{decisionReason}}', ar: 'سبب القرار (يدوي)', source: 'Staff Input' },
];

export default function EmailTemplatesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  
  const [templates, setTemplates] = useState(INITIAL_LIBRARY);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.label.toLowerCase().includes(searchTerm.toLowerCase()) || t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'all' || t.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleSave = () => {
    if (!selectedTemplate) return;
    setTemplates(prev => {
      const exists = prev.find(t => t.id === selectedTemplate.id);
      if (exists) return prev.map(t => t.id === selectedTemplate.id ? selectedTemplate : t);
      return [selectedTemplate, ...prev];
    });
    toast({ title: isAr ? "تم حفظ القالب" : "Template Saved" });
    setSelectedTemplate(null);
  };

  const copyVar = (name: string) => {
    navigator.clipboard.writeText(name);
    toast({ title: isAr ? "تم النسخ" : "Variable Copied", description: name });
  };

  const categories = ['Admissions', 'Academic', 'Financial', 'Follow-up'];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <LayoutTemplate className="h-8 w-8 text-secondary" />
               {isAr ? 'قوالب المراسلات الرسمية' : 'Official Email Templates'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'إدارة مكتبة الرسائل والمتغيرات الذكية' : 'Manage global library of dynamic academy messages'}</p>
         </div>
         <Button onClick={() => setSelectedTemplate({ id: `custom_${Date.now()}`, category: 'Admissions', label: 'New Template', subject: '', body: '' })} className="h-14 rounded-xl bg-primary text-white font-black px-8 shadow-xl shadow-primary/20">
            <Plus className="h-5 w-5 mr-2" /> {isAr ? 'إنشاء قالب جديد' : 'Create New Template'}
         </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Sidebar: Library and Variables */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-premium rounded-2xl bg-white p-4">
               <div className="space-y-4">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                     <Input 
                        placeholder={isAr ? 'بحث في القوالب...' : 'Search templates...'} 
                        className="pl-10 h-11 bg-slate-50 border-none rounded-xl text-xs font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                  <div className="flex flex-wrap gap-2">
                     <button onClick={() => setActiveCategory('all')} className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", activeCategory === 'all' ? "bg-primary text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100")}>All</button>
                     {categories.map(c => (
                        <button key={c} onClick={() => setActiveCategory(c)} className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", activeCategory === c ? "bg-secondary text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100")}>{c}</button>
                     ))}
                  </div>
               </div>
               
               <div className="mt-6 space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredTemplates.map(t => (
                     <div 
                        key={t.id} 
                        onClick={() => setSelectedTemplate({...t})}
                        className={cn(
                           "p-4 rounded-xl border cursor-pointer transition-all group flex items-center justify-between",
                           selectedTemplate?.id === t.id ? "bg-secondary/5 border-secondary shadow-md" : "bg-white border-slate-100 hover:border-slate-200"
                        )}
                     >
                        <div className="space-y-1 overflow-hidden">
                           <p className="text-[10px] font-black text-primary uppercase truncate">{t.label}</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.category}</p>
                        </div>
                        <ChevronRight className={cn("h-4 w-4 text-slate-200 group-hover:text-secondary", selectedTemplate?.id === t.id && "text-secondary")} />
                     </div>
                  ))}
               </div>
            </Card>

            <Card className="border-none shadow-sm bg-slate-900 text-white rounded-2xl p-6 space-y-6">
               <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-secondary" />
                  <h3 className="text-xs font-black uppercase tracking-widest">{isAr ? 'مرجع المتغيرات الذكية' : 'Variable Dictionary'}</h3>
               </div>
               <div className="space-y-3">
                  {VARIABLE_REF.map(v => (
                     <div key={v.name} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                        <div className="space-y-0.5">
                           <code className="text-[10px] font-black text-secondary">{v.name}</code>
                           <p className="text-[9px] font-bold text-white/40 uppercase">{isAr ? v.ar : v.name.replace('{{', '').replace('}}', '')}</p>
                        </div>
                        <Button onClick={() => copyVar(v.name)} size="icon" variant="ghost" className="h-7 w-7 rounded-lg text-white/20 hover:text-white hover:bg-white/10">
                           <Copy className="h-3.5 w-3.5" />
                        </Button>
                     </div>
                  ))}
               </div>
            </Card>
         </div>

         {/* Main Editor */}
         <div className="lg:col-span-8">
            {selectedTemplate ? (
               <Card className="border-none shadow-premium rounded-2xl bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader className="bg-slate-50/80 p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg"><PencilLine className="h-6 w-6" /></div>
                        <div>
                           <CardTitle className="text-lg font-black uppercase text-primary">{isAr ? 'محرر القوالب' : 'Template Composer'}</CardTitle>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Editing: {selectedTemplate.label}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="h-5 w-5" /></Button>
                        <Button onClick={handleSave} className="h-12 rounded-xl bg-primary text-white font-black px-6 shadow-xl shadow-primary/10 gap-2">
                           <Save className="h-4 w-4 text-secondary" /> {isAr ? 'حفظ القالب' : 'Save Changes'}
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'اسم القالب (للإدارة)' : 'Internal Label'}</label>
                           <Input 
                              value={selectedTemplate.label}
                              onChange={(e) => setSelectedTemplate({...selectedTemplate, label: e.target.value})}
                              className="h-12 bg-slate-50 border-none rounded-xl font-bold" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'التصنيف' : 'Category'}</label>
                           <Select value={selectedTemplate.category} onValueChange={(v) => setSelectedTemplate({...selectedTemplate, category: v})}>
                              <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-bold">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                 {categories.map(c => <SelectItem key={c} value={c} className="font-bold py-3">{c}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'عنوان البريد الإلكتروني' : 'Email Subject'}</label>
                        <Input 
                           value={selectedTemplate.subject}
                           onChange={(e) => setSelectedTemplate({...selectedTemplate, subject: e.target.value})}
                           className="h-14 bg-slate-50 border-none rounded-xl font-black text-primary text-base" 
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{isAr ? 'محتوى الرسالة (يدعم المتغيرات)' : 'Message Body (Dynamic)'}</label>
                        <Textarea 
                           value={selectedTemplate.body}
                           onChange={(e) => setSelectedTemplate({...selectedTemplate, body: e.target.value})}
                           className="min-h-[400px] bg-slate-50 border-none rounded-2xl p-8 font-medium leading-relaxed italic text-slate-600" 
                        />
                     </div>
                  </CardContent>
               </Card>
            ) : (
               <div className="h-[700px] rounded-3xl border-2 border-dashed border-slate-100 bg-white/50 flex flex-col items-center justify-center text-center p-12 space-y-6">
                  <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                     <Mail className="h-12 w-12" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-black text-slate-300 uppercase tracking-tight">{isAr ? 'اختر قالباً للتعديل أو العرض' : 'Select a Template to Begin'}</h3>
                     <p className="text-sm font-bold text-slate-400 max-w-sm mx-auto">Manage the official academy correspondence library with smart data binding.</p>
                  </div>
               </div>
            )}
         </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

