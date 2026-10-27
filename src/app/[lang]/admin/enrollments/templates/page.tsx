
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
  History,
  FileText,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Official BBA Template Library - Full Content
const INITIAL_LIBRARY = [
  {
    id: 'app_received',
    category: 'Admissions',
    label: 'Application Received & Welcome',
    subject: 'BBA Academy: Application Received - {{parentName}}',
    body: 'Dear {{parentName}},\n\nThank you for choosing Baneen and Banaat Academy. We are pleased to confirm that we have successfully received your enrollment application (Ref: {{applicationNumber}}) for the following student(s):\n\n{{studentNames}}\n\nOur admissions team is currently conducting an initial review of the submitted information. Please note that this confirmation acknowledges receipt of your application and does not imply final acceptance into the academy. We will contact you shortly should any additional information be required or to update you on the status of the review process.\n\nShould you have any immediate questions, please feel free to reply to this email.\n\nBest regards,\nBBA Admissions Office\nbanaatacademy@gmail.com'
  },
  {
    id: 'app_review',
    category: 'Admissions',
    label: 'Application Under Review',
    subject: 'Update: Your application is now under review',
    body: 'Dear {{parentName}},\n\nWe are writing to provide you with an update regarding application {{applicationNumber}}. The files for {{studentNames}} have been moved to the "Under Review" stage and are currently being evaluated by our academic committee.\n\nWe appreciate your patience during this evaluation period. No further action is required from your side at this moment. We will notify you as soon as a decision has been reached or if further clarification is needed.\n\nSincerely,\nBBA Academic Committee'
  },
  {
    id: 'info_required',
    category: 'Admissions',
    label: 'Additional Information Required',
    subject: 'Action Required: Information missing for your BBA application',
    body: 'Dear {{parentName}},\n\nDuring the preliminary review of your application ({{applicationNumber}}), our team identified that certain details require further clarification or are currently missing from the record.\n\nPlease provide the following information at your earliest convenience:\n\n{{missingInformation}}\n\nYou may provide these details by replying directly to this email. Please be advised that we cannot proceed with the final evaluation of {{studentNames}} until this information is received.\n\nThank you for your cooperation,\nBBA Admissions Team'
  },
  {
    id: 'docs_required',
    category: 'Admissions',
    label: 'Additional Documents Required',
    subject: 'Document Request: BBA Enrollment ({{applicationNumber}})',
    body: 'Dear {{parentName}},\n\nTo complete the formal evaluation of the application for {{studentNames}}, we require the following supporting documentation:\n\n{{missingDocuments}}\n\nYou may upload these files through the student portal using your account or reply directly to this email with the attachments. We recommend providing these documents within the next few business days to avoid any delays in the enrollment process.\n\nRegards,\nBBA Administration'
  },
  {
    id: 'docs_received',
    category: 'Admissions',
    label: 'Documents Received Acknowledgment',
    subject: 'Confirmation: Documents Received - {{applicationNumber}}',
    body: 'Dear {{parentName}},\n\nWe are writing to confirm that we have successfully received the documents you provided for {{studentNames}}. \n\nOur team will now review these materials to ensure they meet our academic and administrative requirements. Please note that this email confirms the physical receipt of the files; a separate update will be sent once the verification process is complete.\n\nThank you for your prompt response.\n\nSincerely,\nBBA Registrar'
  },
  {
    id: 'admission_offer',
    category: 'Admissions',
    label: 'Admission Accepted - Full Offer',
    subject: 'Congratulations! Admission Offer from BBA Academy',
    body: 'Dear {{parentName}},\n\nOn behalf of the academic committee, I am delighted to inform you that {{studentNames}} has been accepted into Baneen and Banaat Academy for the {{programName}} program.\n\nWe were impressed by the application and believe that BBA will provide a nurturing environment for your child to excel both academically and spiritually.\n\nNext Steps:\n{{nextSteps}}\n\nAn academy administrator will contact you within 48 hours to finalize the orientation details and tuition setup. We are honored to welcome your family to our learning community.\n\nBest regards,\nDr. Mustafa Ali\nAcademy Director'
  },
  {
    id: 'admission_rejected',
    category: 'Admissions',
    label: 'Admission Decision: Not Accepted',
    subject: 'Update regarding your BBA Application ({{applicationNumber}})',
    body: 'Dear {{parentName}},\n\nThank you for your interest in Baneen and Banaat Academy and for giving us the opportunity to review the application for {{studentNames}}.\n\nAfter a careful and thorough review of the current enrollment capacity and academic requirements, we regret to inform you that we are unable to offer admission at this time.\n\nDecision Details:\n{{decisionReason}}\n\nWe understand this may be disappointing news, and we wish you and your family the very best in your future educational journey. Your files will be kept on record should our capacity change in the future.\n\nRespectfully,\nBBA Admissions Office'
  },
  {
    id: 'reg_completed',
    category: 'Admissions',
    label: 'Registration Completed Confirmation',
    subject: 'Official Confirmation: Registration Complete - {{studentNames}}',
    body: 'Dear {{parentName}},\n\nWe are pleased to inform you that all administrative and financial requirements for {{studentNames}} have been successfully met. The registration process is now officially complete.\n\nYou will receive a separate email containing orientation materials, login credentials for our learning systems, and the final academic calendar for the current session.\n\nWelcome once again to BBA Academy. We look forward to a successful and productive year ahead.\n\nSincerely,\nBBA Administration'
  },
  {
    id: 'welcome_onboard',
    category: 'Academic',
    label: 'Welcome to the Academy (Onboarding)',
    subject: 'Welcome to BBA Academy! Getting Started Guide',
    body: 'Dear {{parentName}},\n\nWelcome to the BBA family! We are excited to begin this educational journey with {{studentNames}}. \n\nTo ensure a smooth transition, please review the following onboarding steps:\n1. Log in to your parent dashboard to review the final schedule.\n2. Ensure your child has access to a reliable device and stable internet.\n3. Mark your calendar for the upcoming virtual orientation session.\n\nWe are committed to providing {{studentNames}} with an exceptional learning experience rooted in values and academic excellence.\n\nBest regards,\nBBA Academic Support Team'
  },
  {
    id: 'records_request',
    category: 'Academic',
    label: 'Academic Records Request',
    subject: 'Request for Academic Records: {{studentNames}}',
    body: 'Dear {{parentName}},\n\nTo ensure proper placement and continuity of instruction for {{studentNames}}, we require official copies of previous academic records or transcripts.\n\nPlease provide these documents at your earliest convenience. If you prefer, we can contact the previous educational institution directly if you provide us with their contact details and a signed release form.\n\nAccurate records are essential for developing a personalized learning plan that meets the specific needs of your child.\n\nThank you,\nBBA Registrar Office'
  },
  {
    id: 'followup_reminder',
    category: 'Academic',
    label: 'Follow-up Reminder',
    subject: 'Friendly Reminder: Pending Action for {{applicationNumber}}',
    body: 'Dear {{parentName}},\n\nThis is a friendly follow-up regarding our previous communication concerning the application for {{studentNames}}. We noticed that we are still awaiting a response or the submission of required details.\n\nTo avoid any interruption in the processing of your request, please provide the necessary information as soon as possible. If you have already taken action, please disregard this message.\n\nWe appreciate your attention to this matter.\n\nSincerely,\nBBA Follow-up Team'
  },
  {
    id: 'payment_reminder',
    category: 'Financial',
    label: 'Payment Reminder',
    subject: 'Invoice Reminder: BBA Tuition Fee',
    body: 'Dear {{parentName}},\n\nThis is a friendly reminder regarding the outstanding tuition balance for {{studentNames}}. \n\nAccording to our records, the following amount is currently due:\nDue Amount: {{paymentAmount}}\nDue Date: {{paymentDueDate}}\n\nPlease ensure that the payment is settled by the due date to maintain active enrollment status. You may complete the payment through your secure parent portal or by following the instructions provided in your initial invoice.\n\nIf you have recently made this payment, please disregard this notice.\n\nSincerely,\nBBA Financial Department'
  },
  {
    id: 'payment_received',
    category: 'Financial',
    label: 'Payment Received Acknowledgment',
    subject: 'Receipt: Payment Successfully Processed',
    body: 'Dear {{parentName}},\n\nWe are writing to confirm that we have successfully received and processed your payment for {{studentNames}}.\n\nTransaction Details:\nAmount: {{paymentAmount}}\nReference: {{paymentReference}}\n\nA formal receipt has been added to your parent account for your records. Thank you for your prompt payment and continued support of the academy.\n\nBest regards,\nBBA Billing Team'
  },
  {
    id: 'balance_notice',
    category: 'Financial',
    label: 'Outstanding Balance Notice',
    subject: 'Important: Outstanding Balance - {{studentNames}}',
    body: 'Dear {{parentName}},\n\nWe are contacting you regarding an outstanding balance on your account for {{studentNames}}. \n\nOur records indicate a current balance of {{outstandingBalance}}. We kindly request that you review your account and arrange for payment at your earliest convenience to ensure there is no disruption to the educational services provided.\n\nIf you have any questions or would like to discuss a payment arrangement, please contact our financial office directly.\n\nRespectfully,\nBBA Financial Office'
  },
  {
    id: 'graduation_notice',
    category: 'Academic',
    label: 'Graduation / Program Completion',
    subject: 'Congratulations on Your Graduation from BBA Academy!',
    body: 'Dear {{parentName}},\n\nIt is with great pride and joy that we announce the successful completion of the {{programName}} program by {{studentNames}}! \n\nThis achievement is a testament to the hard work, dedication, and perseverance shown throughout the academic year. We are honored to have played a part in your child\'s growth and success. \n\nInformation regarding the issuance of the official certificate and the final transcript will be sent to you in the coming days. We wish {{studentNames}} the very best in all future endeavors.\n\nCongratulations once again!\n\nDr. Mustafa Ali\nAcademy Director'
  }
];

export default function EmailTemplatesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  
  const [templates, setTemplates] = useState(INITIAL_LIBRARY);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const t = {
    title: isAr ? 'قوالب المراسلات الرسمية' : 'Official Email Templates',
    subtitle: isAr ? 'إدارة مكتبة الرسائل والمتغيرات الذكية' : 'Manage global library of dynamic academy messages',
    btnNew: isAr ? 'إنشاء قالب جديد' : 'Create New Template',
    searchPlaceholder: isAr ? 'بحث في القوالب...' : 'Search templates...',
    catAll: isAr ? 'الكل' : 'All',
    catAdmissions: isAr ? 'القبول' : 'Admissions',
    catAcademic: isAr ? 'الأكاديمية' : 'Academic',
    catFinancial: isAr ? 'المالية' : 'Financial',
    catFollowup: isAr ? 'المتابعة' : 'Follow-up',
    varRef: isAr ? 'مرجع المتغيرات الذكية' : 'Variable Dictionary',
    editorTitle: isAr ? 'محرر القوالب' : 'Template Composer',
    editingLabel: isAr ? 'تعديل:' : 'Editing:',
    btnSave: isAr ? 'حفظ التغييرات' : 'Save Changes',
    fieldLabel: isAr ? 'اسم القالب (للإدارة)' : 'Internal Label',
    fieldCategory: isAr ? 'التصنيف' : 'Category',
    fieldSubject: isAr ? 'عنوان البريد الإلكتروني' : 'Email Subject',
    fieldBody: isAr ? 'محتوى الرسالة (يدعم المتغيرات)' : 'Message Body (Dynamic)',
    emptyTitle: isAr ? 'اختر قالباً للتعديل أو العرض' : 'Select a Template to Begin',
    emptySubtitle: isAr ? 'إدارة مراسلات الأكاديمية الرسمية مع ربط البيانات الذكي.' : 'Manage the official academy correspondence library with smart data binding.',
    toastSaved: isAr ? 'تم حفظ القالب بنجاح' : 'Template Saved Successfully',
    toastCopied: isAr ? 'تم نسخ المتغير' : 'Variable Copied',
    variables: [
      { name: '{{parentName}}', desc: isAr ? 'اسم ولي الأمر الأساسي' : 'Primary Parent Name' },
      { name: '{{studentNames}}', desc: isAr ? 'قائمة أسماء الطلاب المشمولين' : 'List of selected student names' },
      { name: '{{applicationNumber}}', desc: isAr ? 'رقم مرجع الطلب (ID)' : 'Application Reference ID' },
      { name: '{{programName}}', desc: isAr ? 'اسم البرنامج التعليمي' : 'Educational Program Name' },
      { name: '{{missingInformation}}', desc: isAr ? 'البيانات الناقصة (يدوي)' : 'Missing Info (Manual Input)' },
      { name: '{{missingDocuments}}', desc: isAr ? 'المستندات المطلوبة (يدوي)' : 'Missing Documents (Manual Input)' },
      { name: '{{decisionReason}}', desc: isAr ? 'سبب القرار الإداري (يدوي)' : 'Decision Reason (Manual Input)' },
      { name: '{{nextSteps}}', desc: isAr ? 'الخطوات التالية (يدوي)' : 'Next Steps Instructions (Manual)' },
      { name: '{{paymentAmount}}', desc: isAr ? 'المبلغ المستحق أو المدفوع' : 'Due or Paid Amount' },
      { name: '{{outstandingBalance}}', desc: isAr ? 'الرصيد المتبقي الإجمالي' : 'Total Outstanding Balance' },
    ]
  };

  const filteredTemplates = templates.filter(tpl => {
    const matchesSearch = tpl.label.toLowerCase().includes(searchTerm.toLowerCase()) || tpl.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'all' || tpl.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleSave = () => {
    if (!selectedTemplate) return;
    setTemplates(prev => {
      const exists = prev.find(t => t.id === selectedTemplate.id);
      if (exists) return prev.map(t => t.id === selectedTemplate.id ? selectedTemplate : t);
      return [selectedTemplate, ...prev];
    });
    toast({ title: t.toastSaved });
    setSelectedTemplate(null);
  };

  const copyVar = (name: string) => {
    navigator.clipboard.writeText(name);
    toast({ title: t.toastCopied, description: name });
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <LayoutTemplate className="h-8 w-8 text-secondary" />
               {t.title}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{t.subtitle}</p>
         </div>
         <Button onClick={() => setSelectedTemplate({ id: `custom_${Date.now()}`, category: 'Admissions', label: isAr ? 'قالب جديد' : 'New Template', subject: '', body: '' })} className="h-14 rounded-xl bg-primary text-white font-black px-8 shadow-xl shadow-primary/10">
            <Plus className="h-5 w-5 mr-2" /> {t.btnNew}
         </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Sidebar: Library and Variables */}
         <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-premium rounded-2xl bg-white p-4">
               <div className="space-y-4">
                  <div className="relative">
                     <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300", isAr ? "right-3" : "left-3")} />
                     <Input 
                        placeholder={t.searchPlaceholder} 
                        className={cn("h-11 bg-slate-50 border-none rounded-xl text-xs font-bold", isAr ? "pr-10" : "pl-10")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                  <div className="flex flex-wrap gap-2">
                     <button onClick={() => setActiveCategory('all')} className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", activeCategory === 'all' ? "bg-primary text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100")}>{t.catAll}</button>
                     <button onClick={() => setActiveCategory('Admissions')} className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", activeCategory === 'Admissions' ? "bg-secondary text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100")}>{t.catAdmissions}</button>
                     <button onClick={() => setActiveCategory('Academic')} className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", activeCategory === 'Academic' ? "bg-secondary text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100")}>{t.catAcademic}</button>
                     <button onClick={() => setActiveCategory('Financial')} className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", activeCategory === 'Financial' ? "bg-secondary text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100")}>{t.catFinancial}</button>
                  </div>
               </div>
               
               <div className="mt-6 space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredTemplates.map(tpl => (
                     <div 
                        key={tpl.id} 
                        onClick={() => setSelectedTemplate({...tpl})}
                        className={cn(
                           "p-4 rounded-xl border cursor-pointer transition-all group flex items-center justify-between",
                           selectedTemplate?.id === tpl.id ? "bg-secondary/5 border-secondary shadow-md" : "bg-white border-slate-100 hover:border-slate-200"
                        )}
                     >
                        <div className="space-y-1 overflow-hidden">
                           <p className="text-[10px] font-black text-primary uppercase truncate">{tpl.label}</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{tpl.category}</p>
                        </div>
                        <ChevronRight className={cn("h-4 w-4 text-slate-200 group-hover:text-secondary", selectedTemplate?.id === tpl.id && "text-secondary", isAr && "rotate-180")} />
                     </div>
                  ))}
               </div>
            </Card>

            <Card className="border-none shadow-sm bg-slate-900 text-white rounded-2xl p-6 space-y-6">
               <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-secondary" />
                  <h3 className="text-xs font-black uppercase tracking-widest">{t.varRef}</h3>
               </div>
               <div className="space-y-3">
                  {t.variables.map(v => (
                     <div key={v.name} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                        <div className="space-y-0.5">
                           <code className="text-[10px] font-black text-secondary">{v.name}</code>
                           <p className="text-[9px] font-bold text-white/40 uppercase">{v.desc}</p>
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
                           <CardTitle className="text-lg font-black uppercase text-primary">{t.editorTitle}</CardTitle>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.editingLabel} {selectedTemplate.label}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="h-5 w-5" /></Button>
                        <Button onClick={handleSave} className="h-12 rounded-xl bg-primary text-white font-black px-6 shadow-xl shadow-primary/10 gap-2">
                           <Save className="h-4 w-4 text-secondary" /> {t.btnSave}
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.fieldLabel}</label>
                           <Input 
                              value={selectedTemplate.label}
                              onChange={(e) => setSelectedTemplate({...selectedTemplate, label: e.target.value})}
                              className="h-12 bg-slate-50 border-none rounded-xl font-bold" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.fieldCategory}</label>
                           <Select value={selectedTemplate.category} onValueChange={(v) => setSelectedTemplate({...selectedTemplate, category: v})}>
                              <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-bold">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                 <SelectItem value="Admissions" className="font-bold py-3">{t.catAdmissions}</SelectItem>
                                 <SelectItem value="Academic" className="font-bold py-3">{t.catAcademic}</SelectItem>
                                 <SelectItem value="Financial" className="font-bold py-3">{t.catFinancial}</SelectItem>
                                 <SelectItem value="Follow-up" className="font-bold py-3">{t.catFollowup}</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.fieldSubject}</label>
                        <Input 
                           value={selectedTemplate.subject}
                           onChange={(e) => setSelectedTemplate({...selectedTemplate, subject: e.target.value})}
                           className="h-14 bg-slate-50 border-none rounded-xl font-black text-primary text-base" 
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.fieldBody}</label>
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
                     <h3 className="text-xl font-black text-slate-300 uppercase tracking-tight">{t.emptyTitle}</h3>
                     <p className="text-sm font-bold text-slate-400 max-w-sm mx-auto">{t.emptySubtitle}</p>
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
