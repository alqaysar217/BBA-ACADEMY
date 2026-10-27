
'use client';

import { use, useState, useMemo, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, where, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  MessageSquare, 
  Search, 
  Mail, 
  Clock, 
  User, 
  ChevronRight,
  Send,
  CheckCircle2,
  AlertCircle,
  History,
  Users,
  FileText,
  Eye,
  Check,
  X,
  FileUp,
  Loader2,
  Info,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Building,
  Star,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// Sync with Templates Library Categories & Fields
const TEMPLATES_CATALOG = (isAr: boolean) => [
  { id: 'app_received', label: isAr ? 'تأكيد استلام الطلب والترحيب' : 'Application Received & Welcome', cat: 'Admissions' },
  { id: 'app_review', label: isAr ? 'الطلب قيد المراجعة الأكاديمية' : 'Application Under Review', cat: 'Admissions' },
  { id: 'info_required', label: isAr ? 'طلب استكمال بيانات ناقصة' : 'Additional Information Required', cat: 'Admissions', needsField: 'missingInformation' },
  { id: 'docs_required', label: isAr ? 'طلب مستندات إضافية' : 'Additional Documents Required', cat: 'Admissions', needsField: 'missingDocuments' },
  { id: 'docs_received', label: isAr ? 'تأكيد استلام المستندات' : 'Documents Received Acknowledgment', cat: 'Admissions' },
  { id: 'admission_offer', label: isAr ? 'إشعار القبول النهائي' : 'Admission Accepted - Full', cat: 'Admissions', needsField: 'nextSteps' },
  { id: 'admission_rejected', label: isAr ? 'إشعار عدم القبول' : 'Admission Decision: Not Accepted', cat: 'Admissions', needsField: 'decisionReason' },
  { id: 'reg_completed', label: isAr ? 'تأكيد اكتمال التسجيل' : 'Registration Completed Confirmation', cat: 'Admissions' },
  { id: 'welcome_onboard', label: isAr ? 'ترحيب الطالب (Onboarding)' : 'Welcome to the Academy (Onboarding)', cat: 'Academic' },
  { id: 'records_request', label: isAr ? 'طلب سجلات أكاديمية' : 'Academic Records Request', cat: 'Academic' },
  { id: 'payment_reminder', label: isAr ? 'تذكير بالرسوم المستحقة' : 'Payment Reminder', cat: 'Financial', needsField: 'paymentAmount' },
  { id: 'payment_received', label: isAr ? 'تأكيد استلام دفعة' : 'Payment Received Acknowledgment', cat: 'Financial', needsField: 'paymentAmount' },
  { id: 'graduation_notice', label: isAr ? 'إشعار التخرج وإكمال البرنامج' : 'Graduation / Program Completion', cat: 'Academic' },
];

export default function ParentCommunicationsHub({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('send');
  const [searchApp, setSearchApp] = useState('');
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [recipients, setRecipients] = useState({ p1: true, p2: false });
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [customField, setCustomField] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const t = {
    title: isAr ? 'مركز المراسلات الموحد' : 'Unified Comms Hub',
    subtitle: isAr ? 'إرسال الرسائل الرسمية ومتابعة سجل التفاعل' : 'Broadcast official messages & track parent engagement',
    tabCompose: isAr ? 'إرسال رسالة جديدة' : 'Compose Message',
    tabHistory: isAr ? 'سجل الصادر' : 'Broadcast History',
    step1: isAr ? '1. اختيار الطلب والمستلمين' : '1. Select Enrollment & Recipients',
    searchPlaceholder: isAr ? 'ابحث باسم ولي الأمر أو رقم الطلب...' : 'Search by name or App ID...',
    activeTarget: isAr ? 'الهدف النشط' : 'Active Target',
    recipientSelection: isAr ? 'تحديد المستلمين' : 'Recipient Selection',
    targetStudents: isAr ? 'الطلاب المعنيين بالرسالة' : 'Target Students for this Message',
    step2: isAr ? '2. اختيار القالب وصياغة المحتوى' : '2. Message Content & Logic',
    templateLabel: isAr ? 'اختر القالب الرسمي' : 'Select Official Template',
    templatePlaceholder: isAr ? 'اختر من المكتبة...' : 'Choose from library...',
    requiredInfo: isAr ? 'معلومات إضافية مطلوبة' : 'Required Information',
    customFieldPlaceholder: isAr ? 'أدخل البيانات المطلوبة هنا ليتم دمجها في القالب...' : 'Type specific reasons or data here...',
    btnDispatch: isAr ? 'تأكيد وإرسال المراسلة' : 'Confirm & Dispatch Message',
    archiveNotice: isAr ? 'سيتم أرشفة نسخة دائمة من هذه الرسالة فوراً.' : 'A permanent record of this message will be archived instantly.',
    previewTitle: isAr ? 'معاينة البريد الصادر' : 'Live Email Preview',
    previewFrom: isAr ? 'من:' : 'From:',
    previewTo: isAr ? 'إلى:' : 'To:',
    previewSubject: isAr ? 'الموضوع:' : 'Subject:',
    previewEmpty: isAr ? 'اختر مستلماً وقالباً لعرض المعاينة' : 'Choose a recipient and template to see the preview',
    officialBadge: isAr ? 'مراسلة رسمية موثقة' : 'Verified Official Communication',
    historyTitle: isAr ? 'سجلات المراسلات الصادرة' : 'Outbox Logs',
    statusDelivered: isAr ? 'تم التسليم' : 'DELIVERED',
    toastSent: isAr ? 'تم إرسال الرسالة وتسجيلها في النظام' : 'Message Sent & Logged Successfully'
  };

  const appsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('updatedAt', 'desc'));
  }, [firestore]);
  const { data: allApps } = useCollection(appsQuery);

  const filteredApps = useMemo(() => {
    if (!allApps) return [];
    return allApps.filter(app => 
       app.parent1Name?.toLowerCase().includes(searchApp.toLowerCase()) || 
       app.id?.toLowerCase().includes(searchApp.toLowerCase())
    ).slice(0, 5);
  }, [allApps, searchApp]);

  const selectedTemplate = useMemo(() => {
    return TEMPLATES_CATALOG(isAr).find(tpl => tpl.id === selectedTemplateId);
  }, [selectedTemplateId, isAr]);

  // Logic to resolve template variables into a final string
  const getResolvedBody = (app: any) => {
    if (!app || !selectedTemplateId) return '';
    
    // Find the actual body from the INITIAL_LIBRARY or similar source
    // For this prototype, we'll simulate the logic based on the templates defined in the other page
    let content = "Dear {{parentName}},\n\nTemplate content loading...";
    
    // We would normally fetch this from the Firestore templates collection
    // Here we define the simplified logic for preview
    const studentNamesStr = app.students
      ?.filter((_: any, i: number) => selectedStudentIds.includes(`${i}`))
      .map((s: any) => `${s.firstName} ${s.lastName}`)
      .join(', ') || 'your student(s)';

    const vars: any = {
      parentName: app.parent1Name || 'Valued Parent',
      applicationNumber: app.id || 'N/A',
      studentNames: studentNamesStr,
      programName: app.programOption || 'BBA Program',
      missingInformation: customField || '[Pending Information]',
      missingDocuments: customField || '[Pending Documents]',
      decisionReason: customField || '[Decision Reason]',
      nextSteps: customField || '[Next Steps]',
      paymentAmount: customField || '[Amount]',
      paymentDueDate: 'the 1st of next month',
      outstandingBalance: customField || '[Total Balance]',
      paymentReference: 'REF-' + Math.floor(Math.random()*10000),
      academyEmail: 'banaatacademy@gmail.com'
    };

    // Find sample body text based on template ID
    const sampleBodies: Record<string, string> = {
      app_received: "Thank you for choosing Baneen and Banaat Academy. We are pleased to confirm that we have successfully received your enrollment application (Ref: {{applicationNumber}}) for the following student(s):\n\n{{studentNames}}\n\nOur admissions team is currently conducting an initial review of the submitted information. We will contact you shortly should any additional information be required.\n\nBest regards,\nBBA Admissions Office",
      admission_offer: "On behalf of the academic committee, I am delighted to inform you that {{studentNames}} has been accepted into Baneen and Banaat Academy for the {{programName}} program.\n\nNext Steps:\n{{nextSteps}}\n\nAn academy administrator will contact you within 48 hours to finalize details. Welcome to the family!\n\nBest regards,\nDr. Mustafa Ali",
      admission_rejected: "Thank you for your interest in Baneen and Banaat Academy. After a thorough review of the application for {{studentNames}}, we regret to inform you that we are unable to offer admission at this time.\n\nDecision Details:\n{{decisionReason}}\n\nWe wish you and your family the best in your educational journey.\n\nRespectfully,\nBBA Admissions Office",
      info_required: "During the preliminary review of your application ({{applicationNumber}}), our team identified that certain details require further clarification.\n\nPlease provide the following information:\n\n{{missingInformation}}\n\nPlease reply directly to this email to proceed.\n\nRegards,\nBBA Admissions Team"
    };

    let resolved = sampleBodies[selectedTemplateId] || "Official communication regarding {{studentNames}} for application {{applicationNumber}}.\n\nDetails: {{decisionReason}}";

    Object.entries(vars).forEach(([key, val]) => {
      resolved = resolved.split(`{{${key}}}`).join(String(val));
    });

    return resolved;
  };

  const handleSend = async () => {
    if (!firestore || !selectedApp || !selectedTemplateId) return;
    setIsProcessing(true);

    const finalBody = getResolvedBody(selectedApp);
    const logEntry = {
      templateId: selectedTemplateId,
      sentAt: new Date().toISOString(),
      recipients: [
        ...(recipients.p1 ? [selectedApp.parent1Email] : []),
        ...(recipients.p2 && selectedApp.parent2Email ? [selectedApp.parent2Email] : [])
      ],
      subject: `BBA Update: ${selectedTemplate?.label}`,
      content: finalBody,
      studentsMailed: selectedStudentIds,
      status: 'sent',
      sender: 'Admin'
    };

    try {
      const appRef = doc(firestore, 'enrollments', selectedApp.id);
      const existingLogs = selectedApp.communications || [];
      await updateDoc(appRef, {
        communications: [logEntry, ...existingLogs],
        lastCommunicationAt: serverTimestamp()
      });

      toast({ title: t.toastSent });
      setSelectedApp(null);
      setSelectedTemplateId('');
      setCustomField('');
      setActiveTab('history');
    } catch (e) {
      toast({ variant: "destructive", title: "Error sending message" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
               <MessageSquare className="h-8 w-8 text-secondary" />
               {t.title}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{t.subtitle}</p>
         </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
         <TabsList className="bg-white p-1 rounded-xl h-14 shadow-sm border border-slate-100 inline-flex">
            <TabsTrigger value="send" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-8 h-full">
               <Send className="h-4 w-4 mr-2" /> {t.tabCompose}
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-8 h-full">
               <History className="h-4 w-4 mr-2" /> {t.tabHistory}
            </TabsTrigger>
         </TabsList>

         <TabsContent value="send" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {/* Left: Form */}
               <div className="lg:col-span-7 space-y-8">
                  <Card className="border-none shadow-premium rounded-2xl bg-white p-8 space-y-6">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary font-black shadow-inner">1</div>
                        <h3 className="text-sm font-black uppercase text-primary tracking-widest">{t.step1}</h3>
                     </div>
                     <div className="relative">
                        <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300", isAr ? "right-3" : "left-3")} />
                        <Input 
                           placeholder={t.searchPlaceholder} 
                           className={cn("h-12 bg-slate-50 border-none rounded-xl font-bold", isAr ? "pr-10" : "pl-10")}
                           value={searchApp}
                           onChange={(e) => setSearchApp(e.target.value)}
                        />
                        {searchApp && !selectedApp && (
                           <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                              {filteredApps.map(app => (
                                 <div 
                                    key={app.id} 
                                    onClick={() => { setSelectedApp(app); setSearchApp(''); setSelectedStudentIds(app.students?.map((_:any,i:number)=>`${i}`) || []); }}
                                    className="p-4 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-50 last:border-none"
                                 >
                                    <div>
                                       <p className="font-black text-primary text-sm uppercase">{app.parent1Name}</p>
                                       <p className="text-[10px] font-bold text-slate-400">{app.parent1Email} • ID: {app.id}</p>
                                    </div>
                                    <ChevronRight className={cn("h-4 w-4 text-slate-300", isAr && "rotate-180")} />
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>

                     {selectedApp && (
                        <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 space-y-6 animate-in zoom-in-95">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <Badge className="bg-secondary text-white border-none font-black text-[9px] uppercase px-3 py-1 rounded-full mb-2">{t.activeTarget}</Badge>
                                 <h4 className="font-black text-primary text-lg">{selectedApp.parent1Name}</h4>
                                 <p className="text-xs font-bold text-slate-500 uppercase">{selectedApp.programOption}</p>
                              </div>
                              <Button onClick={() => setSelectedApp(null)} variant="ghost" size="icon" className="text-slate-300 hover:text-red-500"><X className="h-5 w-5" /></Button>
                           </div>

                           <div className="space-y-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.recipientSelection}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                                    <Checkbox id="p1" checked={recipients.p1} onCheckedChange={(v) => setRecipients({...recipients, p1: !!v})} />
                                    <label htmlFor="p1" className="text-xs font-bold text-slate-700 truncate">{selectedApp.parent1Email}</label>
                                 </div>
                                 {selectedApp.parent2Email && (
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                                       <Checkbox id="p2" checked={recipients.p2} onCheckedChange={(v) => setRecipients({...recipients, p2: !!v})} />
                                       <label htmlFor="p2" className="text-xs font-bold text-slate-700 truncate">{selectedApp.parent2Email}</label>
                                    </div>
                                 )}
                              </div>
                           </div>

                           <div className="space-y-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.targetStudents}</p>
                              <div className="flex flex-wrap gap-2">
                                 {selectedApp.students?.map((s:any, i:number) => {
                                    const isSelected = selectedStudentIds.includes(`${i}`);
                                    return (
                                       <button 
                                          key={i}
                                          onClick={() => setSelectedStudentIds(prev => isSelected ? prev.filter(x => x !== `${i}`) : [...prev, `${i}`])}
                                          className={cn(
                                             "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all",
                                             isSelected ? "bg-primary text-white shadow-lg" : "bg-white text-slate-400 border border-slate-100"
                                          )}
                                       >
                                          {s.firstName}
                                       </button>
                                    );
                                 })}
                              </div>
                           </div>
                        </div>
                     )}
                  </Card>

                  <Card className="border-none shadow-premium rounded-2xl bg-white p-8 space-y-8">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary font-black shadow-inner">2</div>
                        <h3 className="text-sm font-black uppercase text-primary tracking-widest">{t.step2}</h3>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.templateLabel}</label>
                        <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                           <SelectTrigger className="h-14 bg-slate-50 border-none rounded-xl font-bold">
                              <SelectValue placeholder={t.templatePlaceholder} />
                           </SelectTrigger>
                           <SelectContent className="rounded-xl">
                              {TEMPLATES_CATALOG(isAr).map(tpl => (
                                 <SelectItem key={tpl.id} value={tpl.id} className="font-bold py-3">
                                    <div className="flex items-center justify-between w-full">
                                       <span>{tpl.label}</span>
                                       <Badge variant="outline" className="text-[8px] ml-4 bg-slate-50 border-none opacity-50 uppercase">{tpl.cat}</Badge>
                                    </div>
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     {selectedTemplate?.needsField && (
                        <div className="space-y-4 animate-in slide-in-from-top-4">
                           <label className="text-[10px] font-black uppercase text-secondary tracking-widest flex items-center gap-2">
                              <Info className="h-3 w-3" />
                              {t.requiredInfo}
                           </label>
                           <Textarea 
                              value={customField}
                              onChange={(e) => setCustomField(e.target.value)}
                              placeholder={t.customFieldPlaceholder}
                              className="min-h-[120px] bg-slate-50 border-none rounded-xl font-bold p-5"
                           />
                        </div>
                     )}

                     <div className="pt-6 border-t border-slate-50">
                        <Button 
                           onClick={handleSend} 
                           disabled={isProcessing || !selectedApp || !selectedTemplateId}
                           className="h-16 w-full rounded-xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/10 gap-3 group"
                        >
                           {isProcessing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className={cn("h-6 w-6 text-secondary transition-transform", isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1")} />}
                           {t.btnDispatch}
                        </Button>
                        <p className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-widest mt-4">
                           {t.archiveNotice}
                        </p>
                     </div>
                  </Card>
               </div>

               {/* Right: Live Preview */}
               <div className="lg:col-span-5">
                  <div className="sticky top-28 space-y-6">
                     <div className="flex items-center gap-3">
                        <Eye className="h-5 w-5 text-secondary" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{t.previewTitle}</h3>
                     </div>

                     <Card className="border-none shadow-premium rounded-3xl bg-slate-900 overflow-hidden border-4 border-slate-800">
                        <div className="bg-slate-800 p-6 flex items-center gap-4">
                           <div className="h-3 w-3 rounded-full bg-red-500/30" />
                           <div className="h-3 w-3 rounded-full bg-amber-500/30" />
                           <div className="h-3 w-3 rounded-full bg-green-500/30" />
                           <div className="flex-1 h-6 bg-slate-900/50 rounded-lg flex items-center px-4">
                              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Official BBA Comms Preview</span>
                           </div>
                        </div>
                        <div className="p-10 space-y-8 bg-white min-h-[600px] mx-4 my-4 rounded-2xl shadow-inner overflow-y-auto">
                           {selectedApp && selectedTemplateId ? (
                              <div className="space-y-8 animate-in fade-in duration-500">
                                 <div className="space-y-1 pb-6 border-b border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase">{t.previewFrom} <span className="text-primary">BBA Academy &lt;banaatacademy@gmail.com&gt;</span></p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase">{t.previewTo} <span className="text-secondary">{[...(recipients.p1 ? [selectedApp.parent1Email] : []), ...(recipients.p2 && selectedApp.parent2Email && recipients.p2 ? [selectedApp.parent2Email] : [])].join(', ')}</span></p>
                                    <p className="text-sm font-black text-slate-900 mt-4">{t.previewSubject} BBA Academy Update - {selectedTemplate?.label}</p>
                                 </div>
                                 <div className="space-y-6">
                                    <div className="flex justify-center">
                                       <img src="/logo.png" className="h-16 w-16 object-contain" alt="BBA Logo" />
                                    </div>
                                    <div className="prose prose-slate max-w-none">
                                       <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap text-sm">
                                          {getResolvedBody(selectedApp)}
                                       </p>
                                    </div>
                                    <div className="pt-8 space-y-1">
                                       <p className="font-black text-primary text-xs">Dr. Mustafa Ali</p>
                                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academy Director</p>
                                    </div>
                                 </div>
                                 <div className="pt-10 border-t border-slate-100 space-y-4">
                                    <div className="flex items-center gap-4">
                                       <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>
                                       <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase tracking-widest">{t.officialBadge}</p>
                                    </div>
                                 </div>
                              </div>
                           ) : (
                              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30 pt-40">
                                 <Mail className="h-20 w-20 text-slate-200" />
                                 <p className="text-sm font-black text-slate-300 uppercase tracking-tighter">{t.previewEmpty}</p>
                              </div>
                           )}
                        </div>
                     </Card>
                  </div>
               </div>
            </div>
         </TabsContent>

         <TabsContent value="history">
            <Card className="border-none shadow-premium rounded-2xl bg-white overflow-hidden">
               <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                     <History className="h-5 w-5 text-secondary" />
                     <h3 className="text-sm font-black uppercase text-primary">{t.historyTitle}</h3>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-slate-50">
                     {allApps?.filter(a => a.communications?.length > 0).map((app: any) => (
                        app.communications.map((log: any, idx: number) => (
                           <div key={`${app.id}-${idx}`} className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50/50 transition-all">
                              <div className="flex items-start gap-4 flex-1">
                                 <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0"><Mail className="h-5 w-5" /></div>
                                 <div className="space-y-1">
                                    <p className="text-sm font-black text-slate-900">{log.subject}</p>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                                       <span className="uppercase text-secondary">{app.parent1Name}</span>
                                       <span className="opacity-40">|</span>
                                       <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {format(new Date(log.sentAt), 'MMM dd, HH:mm')}</span>
                                       <span className="opacity-40">|</span>
                                       <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-100">By: {log.sender || 'Admin'}</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <Badge className="bg-green-100 text-green-600 border-none font-black text-[8px] px-3 py-1 rounded-md">{t.statusDelivered}</Badge>
                                 <Button variant="ghost" size="icon" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)} className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-sm"><ChevronRight className={cn("h-5 w-5", isAr && "rotate-180")} /></Button>
                              </div>
                           </div>
                        ))
                     ))}
                  </div>
               </CardContent>
            </Card>
         </TabsContent>
      </Tabs>
    </div>
  );
}
