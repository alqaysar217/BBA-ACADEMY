
'use client';

import { use, useState, useMemo, useEffect } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
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
  GraduationCap,
  LayoutTemplate,
  UserCheck,
  ChevronDown
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
import Image from 'next/image';

// Official Template Library Constants
const TEMPLATES_CATALOG = (isAr: boolean) => [
  { id: 'app_received', label: isAr ? 'تأكيد استلام الطلب والترحيب' : 'Application Received & Welcome', cat: 'Admissions' },
  { id: 'app_review', label: isAr ? 'الطلب قيد المراجعة الأكاديمية' : 'Application Under Review', cat: 'Admissions' },
  { id: 'info_required', label: isAr ? 'طلب استكمال بيانات ناقصة' : 'Additional Information Required', cat: 'Admissions', needsField: 'missingInformation' },
  { id: 'docs_required', label: isAr ? 'طلب مستندات إضافية' : 'Additional Documents Required', cat: 'Admissions', needsField: 'missingDocuments' },
  { id: 'admission_offer', label: isAr ? 'إشعار القبول النهائي' : 'Admission Accepted - Full', cat: 'Admissions', needsField: 'nextSteps' },
  { id: 'admission_rejected', label: isAr ? 'إشعار عدم القبول' : 'Admission Decision: Not Accepted', cat: 'Admissions', needsField: 'decisionReason' },
  { id: 'payment_reminder', label: isAr ? 'تذكير بالرسوم المستحقة' : 'Payment Reminder', cat: 'Financial', needsField: 'paymentAmount' },
  { id: 'payment_received', label: isAr ? 'تأكيد استلام دفعة' : 'Payment Received Acknowledgment', cat: 'Financial', needsField: 'paymentAmount' },
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
  const { data: allApps, loading: appsLoading } = useCollection(appsQuery);

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

  const getResolvedBody = (app: any) => {
    if (!app || !selectedTemplateId) return '';
    
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
      academyEmail: 'banaatacademy@gmail.com'
    };

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
    <div className="space-y-10 pb-20 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
         <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <MessageSquare className="h-7 w-7 text-secondary" />
               </div>
               {t.title}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] pl-1">{t.subtitle}</p>
         </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
         <div className="flex justify-center">
            <TabsList className="bg-white p-1.5 rounded-2xl h-16 shadow-xl border border-slate-100 inline-flex ring-4 ring-slate-50">
               <TabsTrigger value="send" className="rounded-xl font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-10 h-full transition-all">
                  <Send className="h-4 w-4 mr-2" /> {t.tabCompose}
               </TabsTrigger>
               <TabsTrigger value="history" className="rounded-xl font-black text-[11px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-10 h-full transition-all">
                  <History className="h-4 w-4 mr-2" /> {t.tabHistory}
               </TabsTrigger>
            </TabsList>
         </div>

         <TabsContent value="send" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               {/* Left: Form Controls */}
               <div className="lg:col-span-7 space-y-8">
                  <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10 space-y-8 relative overflow-hidden border border-slate-100">
                     <div className="flex items-center gap-4 mb-2">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 text-secondary flex items-center justify-center font-black shadow-xl">1</div>
                        <h3 className="text-lg font-black uppercase text-primary tracking-tight">{t.step1}</h3>
                     </div>

                     <div className="relative group">
                        <Search className={cn("absolute top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 transition-colors group-focus-within:text-secondary", isAr ? "right-4" : "left-4")} />
                        <Input 
                           placeholder={t.searchPlaceholder} 
                           className={cn("h-16 bg-slate-50 border-none rounded-2xl font-bold text-lg shadow-inner", isAr ? "pr-12" : "pl-12")}
                           value={searchApp}
                           onChange={(e) => setSearchApp(e.target.value)}
                        />
                        {searchApp && !selectedApp && (
                           <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                              {filteredApps.map(app => (
                                 <div 
                                    key={app.id} 
                                    onClick={() => { setSelectedApp(app); setSearchApp(''); setSelectedStudentIds(app.students?.map((_:any,i:number)=>`${i}`) || []); }}
                                    className="p-5 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-50 last:border-none group/item transition-all"
                                 >
                                    <div className="flex items-center gap-4">
                                       <div className="h-10 w-10 rounded-full bg-primary/5 text-primary flex items-center justify-center font-black text-sm">{app.parent1Name?.charAt(0)}</div>
                                       <div>
                                          <p className="font-black text-primary text-base uppercase">{app.parent1Name}</p>
                                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.programOption} • ID: {app.id}</p>
                                       </div>
                                    </div>
                                    <ChevronRight className={cn("h-5 w-5 text-slate-300 group-hover/item:text-secondary transition-colors", isAr && "rotate-180")} />
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>

                     {selectedApp && (
                        <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 space-y-8 animate-in zoom-in-95 duration-500 text-white relative">
                           <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                 <Badge className="bg-secondary text-white border-none font-black text-[9px] uppercase px-4 py-1.5 rounded-full mb-2 shadow-lg shadow-secondary/20">{t.activeTarget}</Badge>
                                 <h4 className="font-black text-2xl tracking-tight">{selectedApp.parent1Name}</h4>
                                 <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    <Building className="h-3 w-3" /> {selectedApp.address?.city}, {selectedApp.address?.state}
                                 </div>
                              </div>
                              <Button onClick={() => setSelectedApp(null)} variant="ghost" size="icon" className="text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-xl"><X className="h-6 w-6" /></Button>
                           </div>

                           <div className="space-y-4">
                              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{t.recipientSelection}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 <div className={cn("flex items-center gap-4 p-4 rounded-2xl transition-all border", recipients.p1 ? "bg-white/10 border-secondary/50" : "bg-white/5 border-transparent")}>
                                    <Checkbox id="p1" checked={recipients.p1} onCheckedChange={(v) => setRecipients({...recipients, p1: !!v})} className="border-white/20 data-[state=checked]:bg-secondary" />
                                    <label htmlFor="p1" className="text-xs font-bold text-white/80 truncate cursor-pointer">{selectedApp.parent1Email}</label>
                                 </div>
                                 {selectedApp.parent2Email && (
                                    <div className={cn("flex items-center gap-4 p-4 rounded-2xl transition-all border", recipients.p2 ? "bg-white/10 border-secondary/50" : "bg-white/5 border-transparent")}>
                                       <Checkbox id="p2" checked={recipients.p2} onCheckedChange={(v) => setRecipients({...recipients, p2: !!v})} className="border-white/20 data-[state=checked]:bg-secondary" />
                                       <label htmlFor="p2" className="text-xs font-bold text-white/80 truncate cursor-pointer">{selectedApp.parent2Email}</label>
                                    </div>
                                 )}
                              </div>
                           </div>

                           <div className="space-y-4">
                              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{t.targetStudents}</p>
                              <div className="flex flex-wrap gap-3">
                                 {selectedApp.students?.map((s:any, i:number) => {
                                    const isSelected = selectedStudentIds.includes(`${i}`);
                                    return (
                                       <button 
                                          key={i}
                                          onClick={() => setSelectedStudentIds(prev => isSelected ? prev.filter(x => x !== `${i}`) : [...prev, `${i}`])}
                                          className={cn(
                                             "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                                             isSelected 
                                                ? "bg-secondary border-secondary text-white shadow-xl shadow-secondary/20" 
                                                : "bg-white/5 text-white/40 border-white/5 hover:border-white/10 hover:text-white"
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

                  <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10 space-y-10 border border-slate-100">
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-900 text-secondary flex items-center justify-center font-black shadow-xl">2</div>
                        <h3 className="text-lg font-black uppercase text-primary tracking-tight">{t.step2}</h3>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{t.templateLabel}</label>
                        <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                           <SelectTrigger className="h-16 bg-slate-50 border-none rounded-2xl font-bold text-primary shadow-inner">
                              <SelectValue placeholder={t.templatePlaceholder} />
                           </SelectTrigger>
                           <SelectContent className="rounded-2xl p-2 border-none shadow-2xl">
                              {TEMPLATES_CATALOG(isAr).map(tpl => (
                                 <SelectItem key={tpl.id} value={tpl.id} className="rounded-xl font-bold py-4 hover:bg-slate-50">
                                    <div className="flex items-center justify-between w-full min-w-[300px]">
                                       <span>{tpl.label}</span>
                                       <Badge variant="outline" className="text-[9px] ml-4 bg-slate-100 border-none text-slate-500 uppercase font-black">{tpl.cat}</Badge>
                                    </div>
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     </div>

                     {selectedTemplate?.needsField && (
                        <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                           <label className="text-[10px] font-black uppercase text-secondary tracking-[0.2em] flex items-center gap-2">
                              <Info className="h-3.5 w-3.5" />
                              {t.requiredInfo}
                           </label>
                           <Textarea 
                              value={customField}
                              onChange={(e) => setCustomField(e.target.value)}
                              placeholder={t.customFieldPlaceholder}
                              className="min-h-[160px] bg-slate-50 border-none rounded-2xl font-bold p-6 text-primary shadow-inner leading-relaxed text-base"
                           />
                        </div>
                     )}

                     <div className="pt-10 border-t border-slate-100">
                        <Button 
                           onClick={handleSend} 
                           disabled={isProcessing || !selectedApp || !selectedTemplateId}
                           className="h-20 w-full rounded-2xl bg-primary text-white font-black text-xl shadow-[0_20px_40px_rgba(var(--primary),0.2)] gap-4 group active:scale-[0.98] transition-all"
                        >
                           {isProcessing ? <Loader2 className="h-7 w-7 animate-spin" /> : <Send className={cn("h-7 w-7 text-secondary transition-transform", isAr ? "group-hover:-translate-x-2" : "group-hover:translate-x-2")} />}
                           {t.btnDispatch}
                        </Button>
                        <div className="flex items-center justify-center gap-3 mt-6 text-slate-400">
                           <ShieldCheck className="h-4 w-4" />
                           <p className="text-[9px] font-bold text-center uppercase tracking-[0.2em]">
                              {t.archiveNotice}
                           </p>
                        </div>
                     </div>
                  </Card>
               </div>

               {/* Right: Live Realistic Preview */}
               <div className="lg:col-span-5">
                  <div className="sticky top-28 space-y-6">
                     <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                           <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                           <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{t.previewTitle}</h3>
                        </div>
                        <Badge className="bg-slate-100 text-slate-400 border-none font-black text-[8px] uppercase tracking-widest">Real-time Simulation</Badge>
                     </div>

                     <Card className="border-none shadow-premium rounded-[3rem] bg-slate-900 overflow-hidden ring-8 ring-slate-100">
                        {/* Browser-like Header */}
                        <div className="bg-slate-800 p-6 flex items-center gap-4">
                           <div className="flex gap-2 shrink-0">
                              <div className="h-3 w-3 rounded-full bg-red-400/40" />
                              <div className="h-3 w-3 rounded-full bg-amber-400/40" />
                              <div className="h-3 w-3 rounded-full bg-green-400/40" />
                           </div>
                           <div className="flex-1 h-9 bg-slate-900/50 rounded-xl flex items-center px-5 border border-white/5">
                              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Official BBA Comms Engine</span>
                           </div>
                        </div>

                        {/* Email Client Content */}
                        <div className="p-10 space-y-10 bg-white min-h-[750px] mx-4 mb-4 rounded-[2rem] shadow-2xl overflow-y-auto custom-scrollbar">
                           {selectedApp && selectedTemplateId ? (
                              <div className="space-y-10 animate-in fade-in duration-700">
                                 {/* Email Meta Info */}
                                 <div className="space-y-4 pb-8 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                       <p className="text-[9px] font-black text-slate-400 uppercase w-14 shrink-0">{t.previewFrom}</p>
                                       <div className="px-3 py-1.5 bg-primary/5 text-primary text-[10px] font-black rounded-lg border border-primary/10">BBA Academy &lt;banaatacademy@gmail.com&gt;</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                       <p className="text-[9px] font-black text-slate-400 uppercase w-14 shrink-0">{t.previewTo}</p>
                                       <div className="flex flex-wrap gap-2">
                                          {recipients.p1 && <span className="px-3 py-1.5 bg-secondary/5 text-secondary text-[10px] font-black rounded-lg border border-secondary/10">{selectedApp.parent1Email}</span>}
                                          {recipients.p2 && selectedApp.parent2Email && <span className="px-3 py-1.5 bg-secondary/5 text-secondary text-[10px] font-black rounded-lg border border-secondary/10">{selectedApp.parent2Email}</span>}
                                       </div>
                                    </div>
                                    <div className="flex items-start gap-3 pt-2">
                                       <p className="text-[9px] font-black text-slate-400 uppercase w-14 shrink-0 mt-1">{t.previewSubject}</p>
                                       <p className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tight">BBA Academy Update - {selectedTemplate?.label}</p>
                                    </div>
                                 </div>

                                 {/* Actual Email HTML Representation */}
                                 <div className="space-y-10 text-start bg-slate-50/30 p-8 rounded-3xl border border-slate-100/50 relative">
                                    <div className="flex justify-center mb-8">
                                       <img src="/logo.png" className="h-20 w-20 object-contain grayscale opacity-20" alt="BBA Logo" />
                                    </div>
                                    
                                    <div className="prose prose-slate max-w-none">
                                       <p className="text-slate-700 leading-relaxed font-bold text-base whitespace-pre-wrap italic">
                                          {getResolvedBody(selectedApp)}
                                       </p>
                                    </div>

                                    <div className="pt-12 border-t border-slate-100 space-y-2 opacity-70">
                                       <p className="font-black text-primary text-sm tracking-tight">Dr. Mustafa Ali</p>
                                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Academy Director | Baneen & Banaat Academy</p>
                                       <p className="text-[9px] font-medium text-slate-400 underline decoration-slate-200 underline-offset-4">banaatacademy@gmail.com</p>
                                    </div>

                                    <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-lg border border-slate-100">
                                       <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    </div>
                                 </div>

                                 <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                    <ShieldCheck className="h-6 w-6 text-green-600" />
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                                       This is a verified communication. Metadata will be archived in the student's primary ledger upon dispatch.
                                    </p>
                                 </div>
                              </div>
                           ) : (
                              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-40 py-40">
                                 <div className="h-32 w-32 rounded-[2.5rem] bg-slate-50 flex items-center justify-center shadow-inner ring-8 ring-slate-100/50">
                                    <Mail className="h-16 w-16 text-slate-200" />
                                 </div>
                                 <div className="space-y-2">
                                    <p className="text-lg font-black text-slate-400 uppercase tracking-tighter">{t.previewEmpty}</p>
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Select target and template to initiate engine</p>
                                 </div>
                              </div>
                           )}
                        </div>
                     </Card>
                  </div>
               </div>
            </div>
         </TabsContent>

         <TabsContent value="history">
            <Card className="border-none shadow-premium rounded-[3rem] bg-white overflow-hidden border border-slate-100">
               <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/10">
                        <History className="h-6 w-6" />
                     </div>
                     <div>
                        <CardTitle className="text-xl font-black uppercase text-primary tracking-tight">{t.historyTitle}</CardTitle>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full audit log of outgoing academy notifications</p>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                     {allApps?.filter(a => a.communications?.length > 0).length === 0 && (
                        <div className="py-32 text-center space-y-4">
                           <Clock className="h-16 w-16 text-slate-100 mx-auto" />
                           <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No communication logs found in the archives</p>
                        </div>
                     )}
                     {allApps?.filter(a => a.communications?.length > 0).map((app: any) => (
                        app.communications.map((log: any, idx: number) => (
                           <div key={`${app.id}-${idx}`} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-slate-50/80 transition-all group">
                              <div className="flex items-start gap-6 flex-1">
                                 <div className="h-14 w-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-slate-300 group-hover:text-secondary group-hover:bg-slate-900 transition-all shrink-0 border border-slate-100">
                                    <Mail className="h-6 w-6" />
                                 </div>
                                 <div className="space-y-2">
                                    <p className="text-base font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">{log.subject}</p>
                                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-400">
                                       <span className="uppercase text-secondary font-black bg-secondary/5 px-2 py-0.5 rounded-md flex items-center gap-2">
                                          <UserCheck className="h-3 w-3" /> {app.parent1Name}
                                       </span>
                                       <span className="opacity-30">|</span>
                                       <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-slate-300" /> {format(new Date(log.sentAt), 'MMMM dd, HH:mm')}</span>
                                       <span className="opacity-30">|</span>
                                       <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 font-black text-slate-500 uppercase tracking-widest">Sent By: {log.sender || 'Admin'}</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-4">
                                 <Badge className="bg-green-100 text-green-600 border-none font-black text-[9px] px-4 py-1.5 rounded-xl shadow-sm tracking-widest">{t.statusDelivered}</Badge>
                                 <Button variant="outline" size="icon" onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)} className="h-12 w-12 rounded-2xl bg-white hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm border-slate-200">
                                    <ChevronRight className={cn("h-6 w-6", isAr && "rotate-180")} />
                                 </Button>
                              </div>
                           </div>
                        ))
                     ))}
                  </div>
               </CardContent>
            </Card>
         </TabsContent>
      </Tabs>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
          border: 2px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
