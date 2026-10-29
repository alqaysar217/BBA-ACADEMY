
'use client';

import { use, useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc, useUser } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Users, User, ChevronLeft, ChevronRight, Mail, Phone, MessageCircle, 
  Edit3, Save, Loader2, BookOpen, ClipboardCheck, CreditCard, FileText, 
  Plus, MessageSquare, MapPin, Heart, Info, Globe, ShieldCheck, Type,
  Paperclip, FileUp, FileCheck, Send, Eye, X, Building, Loader2 as Spinner
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { dispatchEmailAction } from '@/app/actions/send-email';

// Comprehensive BBA Official Email Templates (Full Library)
const EMAIL_TEMPLATES = [
  {
    id: 'under_review',
    labelEn: 'Under Review',
    labelAr: 'طلب قيد المراجعة',
    subject: 'BBA Academy: Your file is now under review',
    body: (data: any) => `Dear ${data.parentName},\n\nThis is a formal update regarding the academic record of ${data.targetStudents} (ID: ${data.studentId}). Your files are currently being evaluated by our academic committee.\n\nWe appreciate your patience during this evaluation period.\n\nSincerely,\nBBA Academic Committee`
  },
  {
    id: 'missing_info',
    labelEn: 'Information Required',
    labelAr: 'طلب معلومات إضافية',
    subject: 'Action Required: Additional Information for BBA Academy',
    body: (data: any) => `Dear ${data.parentName},\n\nDuring our ongoing review of the student records for ${data.targetStudents}, our team identified that certain details require clarification.\n\nRequired Information:\n${data.reason || 'Please provide updated academic background details.'}\n\nThank you,\nBBA Admissions Team`
  },
  {
    id: 'missing_docs',
    labelEn: 'Documents Required',
    labelAr: 'طلب مستندات ناقصة',
    subject: 'Action Required: Missing Documentation for BBA Student Record',
    body: (data: any) => `Dear ${data.parentName},\n\nTo complete the formal documentation for ${data.targetStudents}, we require the following supporting documents:\n\n${data.reason || 'Please provide updated ID copies and previous report cards.'}\n\nRegards,\nBBA Administration`
  },
  {
    id: 'docs_received',
    labelEn: 'Documents Received',
    labelAr: 'تم استلام المستندات',
    subject: 'Confirmation: Documents Received - BBA Academy',
    body: (data: any) => `Dear ${data.parentName},\n\nWe confirm receipt of the additional documents for ${data.targetStudents}. Our team will now verify these materials against our requirements.\n\nSincerely,\nBBA Registrar`
  },
  {
    id: 'payment_reminder',
    labelEn: 'Payment Reminder',
    labelAr: 'تذكير بالدفع',
    subject: 'Friendly Reminder: BBA Tuition Payment',
    body: (data: any) => `Dear ${data.parentName},\n\nThis is a friendly reminder regarding the outstanding tuition balance for ${data.targetStudents}. Amount Due: ${data.paymentAmount || '$[Amount]'}.\n\nSincerely,\nBBA Financial Department`
  },
  {
    id: 'payment_received',
    labelEn: 'Payment Received',
    labelAr: 'تأكيد استلام دفعة',
    subject: 'Receipt: Payment Successfully Processed',
    body: (data: any) => `Dear ${data.parentName},\n\nWe have successfully received your payment for ${data.targetStudents}. A formal receipt has been added to your account.\n\nBest regards,\nBBA Billing Team`
  },
  {
    id: 'records_request',
    labelEn: 'Records Request',
    labelAr: 'طلب سجلات أكاديمية',
    subject: 'Request for Academic Records: BBA Academy',
    body: (data: any) => `Dear ${data.parentName},\n\nTo ensure proper placement and record accuracy for ${data.targetStudents}, we require official copies of previous academic transcripts.\n\nThank you,\nBBA Registrar Office`
  },
  {
    id: 'general_notice',
    labelEn: 'General Announcement',
    labelAr: 'تنويه عام',
    subject: 'BBA Academy: Important Update',
    body: (data: any) => `Dear ${data.parentName},\n\nWe are writing to provide you with an important update regarding ${data.targetStudents}.\n\nMessage Details:\n${data.reason || 'No specific details provided.'}\n\nBest regards,\nBBA Administration`
  }
];

/**
 * DataField - Stable Input component for editing or display
 */
const DataField = ({ label, value, path, isEditing, onUpdate, icon: Icon, placeholder, className = "" }: any) => {
  return (
    <div className={cn("space-y-1.5 text-start w-full", className)}>
      <div className="flex items-center gap-2 px-1">
        {Icon && <Icon className="h-3 w-3 text-secondary/70" />}
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
          {label}
        </p>
      </div>
      {isEditing ? (
        <Input 
          value={value || ''} 
          onChange={(e) => onUpdate(path, e.target.value)}
          className="h-11 bg-white border-slate-200 rounded-xl font-bold focus:border-primary transition-all w-full shadow-sm"
          placeholder={placeholder}
        />
      ) : (
        <div className={cn(
          "min-h-[2.75rem] flex items-center px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl transition-all duration-300 hover:border-secondary/20 hover:bg-white hover:shadow-sm",
          !value && "opacity-60"
        )}>
          <p className={cn("text-sm md:text-base font-bold text-slate-700 leading-tight truncate w-full", !value && "text-slate-300 italic font-medium")}>
            {value || '---'}
          </p>
        </div>
      )}
    </div>
  );
};

export default function StudentGuardiansPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Messaging Hub States
  const [isMsgOpen, setIsMsgOpen] = useState(false);
  const [isProcessingMsg, setIsProcessingMsg] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(EMAIL_TEMPLATES[0]);
  const [msgReason, setMsgReason] = useState('');
  const [activeRecipient, setActiveRecipient] = useState<any>(null);
  const [externalAttachments, setExternalAttachments] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading } = useDoc(studentRef);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    if (student && !editData) {
      const normalizedData = {
        ...student,
        parent1: student.parent1 || {
          name: student.parentName || '',
          email: student.parentEmail || '',
          phone: student.parentPhone || '',
          relationship: student.relationship1 || ''
        },
        parent2: student.parent2 || null
      };
      setEditData(normalizedData);
    }
  }, [student, editData]);

  if (loading || !student || !editData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'جاري مزامنة بيانات العائلة...' : 'Syncing Family Records...'}</p>
    </div>
  );

  const t = {
    title: isAr ? 'أولياء الأمور والتواصل' : 'Guardians & Communication Hub',
    back: isAr ? 'العودة' : 'Back',
    edit: isAr ? 'تعديل البيانات' : 'Edit Info',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    save: isAr ? 'حفظ' : 'Save',
    p1: isAr ? 'ولي الأمر الأول (الأساسي)' : 'Guardian 1 (Primary)',
    p2: isAr ? 'ولي الأمر الثاني' : 'Guardian 2',
    addressTitle: isAr ? 'عنوان السكن المعتمد' : 'Verified Home Address',
    fields: {
      name: isAr ? 'الاسم الكامل' : 'Full Name',
      phone: isAr ? 'رقم الهاتف' : 'Phone Number',
      email: isAr ? 'البريد الإلكتروني' : 'Email Address',
      relation: isAr ? 'صلة القرابة' : 'Relationship'
    },
    nav: {
      profile: isAr ? 'الهوية' : 'Identity',
      guardians: isAr ? 'أولياء الأمور' : 'Guardians',
      documents: isAr ? 'المستندات' : 'Documents',
      academic: isAr ? 'خطة الطالب' : 'Study Plan',
      grades: isAr ? 'الدرجات' : 'Grades',
      finances: isAr ? 'المالية' : 'Finances'
    },
    dialog: {
      title: isAr ? 'مركز مراسلة ولي الأمر' : 'Parent Correspondence Hub',
      template: isAr ? '1. اختيار القالب الرسمي' : '1. Select Official Template',
      reason: isAr ? '2. التفاصيل الإضافية / الأسباب' : '2. Additional Details / Reasons',
      attachments: isAr ? '3. المرفقات المرفوعة حالياً' : '3. Currently Uploaded Attachments',
      externalFiles: isAr ? 'رفع ملفات جديدة من جهازك' : 'Upload Files From Your Device',
      preview: isAr ? 'محاكاة البريد الصادر (مباشر)' : 'Live Email Outbox Simulation',
      placeholder: isAr ? 'اكتب الأسباب أو المستندات الناقصة هنا ليتم دمجها في الرسالة...' : 'Type specific reasons or missing details here to be merged...',
      from: isAr ? 'من:' : 'From:',
      to: isAr ? 'إلى:' : 'To:',
      subject: isAr ? 'الموضوع:' : 'Subject:',
      attachCount: (count: number) => isAr ? `${count} مرفقاً مرفوعاً` : `${count} uploaded file(s)`,
      send: isAr ? 'إرسال وتوثيق المراسلة' : 'Dispatch & Record Correspondence'
    }
  };

  const navItems = [
    { id: 'profile', label: t.nav.profile, icon: User, href: `/${lang}/admin/students/${id}` },
    { id: 'guardians', label: t.nav.guardians, icon: Users, href: `/${lang}/admin/students/${id}/guardians` },
    { id: 'documents', label: t.nav.documents, icon: FileText, href: `/${lang}/admin/students/${id}/documents` },
    { id: 'academic', label: t.nav.academic, icon: BookOpen, href: `/${lang}/admin/students/${id}/plans` },
    { id: 'grades', label: t.nav.grades, icon: ClipboardCheck, href: `/${lang}/admin/students/${id}/grades` },
    { id: 'finances', label: t.nav.finances, icon: CreditCard, href: `/${lang}/admin/students/${id}/finances` },
  ];

  const handleNestedUpdate = (path: string, value: any) => {
    setEditData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const saveChanges = async () => {
    if (!studentRef || !editData) return;
    setIsSaving(true);
    try {
      await updateDoc(studentRef, { 
        parent1: editData.parent1 || {},
        parent2: editData.parent2 || null,
        address: editData.address || {},
        updatedAt: serverTimestamp() 
      });
      setIsEditing(false);
      toast({ title: isAr ? "تم تحديث بيانات العائلة" : "Family records updated" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error saving changes" });
    } finally {
      setIsSaving(false);
    }
  };

  const openWhatsapp = (phone: string) => {
    const clean = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${clean}`, '_blank');
  };

  const handleExternalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles: any[] = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          data: event.target?.result as string,
          isExternal: true
        });
        if (newFiles.length === files.length) {
          setExternalAttachments(prev => [...prev, ...newFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExternalFile = (idx: number) => {
    setExternalAttachments(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSendMessage = async () => {
    if (!student || !activeRecipient || !studentRef) return;
    setIsProcessingMsg(true);

    const allAttachments = externalAttachments.map(f => ({ 
      name: f.name, 
      source: 'manual_upload', 
      size: f.size, 
      data: f.data,
      type: f.type
    }));

    const finalBody = selectedTemplate.body({
      parentName: activeRecipient.name,
      studentId: id,
      targetStudents: `${student.firstName} ${student.lastName}`,
      reason: msgReason,
      paymentAmount: student.program === 'weekend' ? '$75' : '$1,650'
    });

    try {
      const result = await dispatchEmailAction({
        to: activeRecipient.email,
        subject: selectedTemplate.subject,
        content: finalBody,
        attachments: allAttachments
      });

      if (!result.success) {
        toast({ 
          variant: "destructive", 
          title: isAr ? "فشل إرسال البريد" : "Email Dispatch Failed",
          description: result.message
        });
        setIsProcessingMsg(false);
        return;
      }

      // Record log in Firestore
      // NOTE: We avoid nested arrays (attachments: [...]) because Firestore rejects them inside array elements.
      // We'll store a summary string instead.
      const logEntry = {
        templateId: selectedTemplate.id,
        sentAt: new Date().toISOString(),
        recipient: activeRecipient.email,
        recipientName: activeRecipient.name,
        subject: selectedTemplate.subject,
        content: finalBody,
        attachmentSummary: allAttachments.map(a => a.name).join(', '), // Comply with Firestore by avoiding nested arrays
        sender: user?.email || 'admin',
        smtpMessageId: result.messageId
      };

      const existingLogs = student.communications || [];
      await updateDoc(studentRef, { 
        communications: [logEntry, ...existingLogs],
        lastCommunicationAt: serverTimestamp()
      });
      
      toast({ title: isAr ? "تم إرسال البريد وتوثيق المراسلة بنجاح" : "Email Dispatched & Logged Successfully" });
      setIsMsgOpen(false);
      setMsgReason('');
      setExternalAttachments([]);
    } catch (err: any) {
      toast({ variant: "destructive", title: "Dispatch Error", description: err.message });
    } finally {
      setIsProcessingMsg(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-20 px-4 sm:px-6 animate-in fade-in duration-700">
      
      {/* 1. Navigation Bar */}
      <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar bg-white/50 p-1 rounded-xl shrink-0">
         {navItems.map(nav => {
           const isActive = pathname === nav.href;
           return (
             <Link 
               key={nav.id} 
               href={isActive ? '#' : nav.href}
               className={cn(
                 "px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg whitespace-nowrap flex items-center gap-2",
                 isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:text-primary hover:bg-slate-50"
               )}
             >
                <nav.icon className="h-3.5 w-3.5" />
                {nav.label}
             </Link>
           )
         })}
      </div>

      {/* 2. Top Bar Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
        <Link href={`/${lang}/admin/students`} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shrink-0">
          {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {t.back}
        </Link>
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)} variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {t.cancel}
              </Button>
              <Button onClick={saveChanges} disabled={isSaving} className="bg-primary text-white h-11 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2 text-secondary" />}
                {t.save}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="h-11 px-8 rounded-xl border-slate-200 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
              <Edit3 className="h-4 w-4 mr-2 text-secondary" /> {t.edit}
            </Button>
          )}
        </div>
      </div>

      <div className="px-2 text-start">
         <h1 className="text-2xl font-black uppercase text-primary tracking-tighter">{t.title} — {student.firstName}</h1>
      </div>

      {/* 3. Guardian Cards Section */}
      <div className="grid grid-cols-1 gap-8">
        {[
          { key: 'parent1', label: t.p1, data: editData.parent1 },
          { key: 'parent2', label: t.p2, data: editData.parent2 }
        ].map((item) => {
          if (!item.data && !isEditing) return null;
          
          return (
            <Card key={item.key} className="border-none shadow-premium bg-white overflow-hidden rounded-2xl w-full group">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 md:px-10 py-5 flex flex-row items-center justify-between">
                <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
                  <Users className="h-4 w-4 text-secondary" />
                  {item.label}
                </CardTitle>
                
                {item.data && !isEditing && (
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => openWhatsapp(item.data.phone)}
                      className="bg-green-500 hover:bg-green-600 text-white h-9 px-4 rounded-lg font-black text-[9px] uppercase gap-2 shadow-lg shadow-green-500/10 active:scale-95 transition-all"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="h-9 px-4 rounded-lg border-blue-100 text-blue-600 hover:bg-blue-50 font-black text-[9px] uppercase gap-2 transition-all"
                    >
                      <a href={`tel:${item.data.phone}`}>
                        <Phone className="h-3.5 w-3.5" /> {isAr ? 'اتصال' : 'Call'}
                      </a>
                    </Button>
                    <Button 
                      onClick={() => {
                        setActiveRecipient(item.data);
                        setIsMsgOpen(true);
                      }}
                      variant="outline"
                      className="h-9 px-4 rounded-lg border-secondary/10 text-secondary hover:bg-secondary/5 font-black text-[9px] uppercase gap-2 transition-all"
                    >
                      <Mail className="h-3.5 w-3.5" /> {isAr ? 'بريد' : 'Email'}
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6 md:p-10 lg:p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DataField 
                    label={t.fields.name} 
                    value={item.data?.name} 
                    path={`${item.key}.name`} 
                    isEditing={isEditing} 
                    onUpdate={handleNestedUpdate} 
                    icon={User} 
                  />
                  <div className="space-y-1.5 text-start w-full">
                    <div className="flex items-center gap-2 px-1">
                      <Heart className="h-3 w-3 text-secondary/70" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        {t.fields.relation}
                      </p>
                    </div>
                    {isEditing ? (
                      <Select value={item.data?.relationship} onValueChange={(v) => handleNestedUpdate(`${item.key}.relationship`, v)} dir={isAr ? 'rtl' : 'ltr'}>
                        <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl font-bold">
                          <SelectValue placeholder="..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mother">{isAr ? 'الأم' : 'Mother'}</SelectItem>
                          <SelectItem value="father">{isAr ? 'الأب' : 'Father'}</SelectItem>
                          <SelectItem value="brother">{isAr ? 'الأخ' : 'Brother'}</SelectItem>
                          <SelectItem value="sister">{isAr ? 'الأخت' : 'Sister'}</SelectItem>
                          <SelectItem value="guardian">{isAr ? 'وصي قانوني' : 'Legal Guardian'}</SelectItem>
                          <SelectItem value="other">{isAr ? 'غير ذلك' : 'Other'}</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="min-h-[2.75rem] flex items-center px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                        <p className="text-sm md:text-base font-bold text-slate-700">{item.data?.relationship || '---'}</p>
                      </div>
                    )}
                  </div>
                  <DataField 
                    label={t.fields.phone} 
                    value={item.data?.phone} 
                    path={`${item.key}.phone`} 
                    isEditing={isEditing} 
                    onUpdate={handleNestedUpdate} 
                    icon={Phone} 
                  />
                  <DataField 
                    label={t.fields.email} 
                    value={item.data?.email} 
                    path={`${item.key}.email`} 
                    isEditing={isEditing} 
                    onUpdate={handleNestedUpdate} 
                    icon={Mail} 
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Option to add Parent 2 if missing */}
        {!editData.parent2 && isEditing && (
          <Button 
            variant="ghost" 
            className="w-full h-24 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex flex-col gap-2"
            onClick={() => handleNestedUpdate('parent2', { name: '', email: '', phone: '', relationship: '' })}
          >
             <Plus className="h-6 w-6 text-secondary" />
             {isAr ? 'إضافة بيانات ولي أمر ثاني' : 'Add Second Guardian Records'}
          </Button>
        )}
      </div>

      {/* 4. Home Address Reference Section */}
      <Card className="border-none shadow-premium bg-white overflow-hidden rounded-2xl w-full">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 md:px-10 py-5">
           <CardTitle className="text-[11px] font-black uppercase text-primary tracking-[0.2em] flex items-center gap-3">
              <MapPin className="h-4 w-4 text-secondary" />
              {t.addressTitle}
           </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-10 lg:p-12">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <DataField label={isAr ? 'العنوان (السطر 1)' : 'Address Line 1'} value={editData.address?.line1} path="address.line1" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={MapPin} />
              </div>
              <div>
                <DataField label={isAr ? 'العنوان (السطر 2)' : 'Address Line 2'} value={editData.address?.line2} path="address.line2" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={MapPin} />
              </div>
              <DataField label={isAr ? 'المدينة' : 'City'} value={editData.address?.city} path="address.city" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={Building} />
              <DataField label={isAr ? 'الولاية' : 'State'} value={editData.address?.state} path="address.state" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={Globe} />
              <DataField label={isAr ? 'الرمز البريدي' : 'ZIP'} value={editData.address?.zip} path="address.zip" isEditing={isEditing} onUpdate={handleNestedUpdate} icon={ShieldCheck} />
           </div>
        </CardContent>
      </Card>

      {/* Messaging Hub Dialog */}
      <Dialog open={isMsgOpen} onOpenChange={(val) => { setIsMsgOpen(val); if (!val) setExternalAttachments([]); }}>
        <DialogContent className={cn("max-w-6xl rounded-3xl border-none p-0 overflow-hidden shadow-2xl", isAr && "font-arabic")}>
          <div className="grid grid-cols-1 lg:grid-cols-12 h-[85vh] max-h-[900px]">
            {/* Form Side */}
            <div className="lg:col-span-6 p-8 flex flex-col h-full overflow-y-auto border-r border-slate-100 bg-white">
              <DialogHeader className="mb-8 text-start">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg"><Mail className="h-6 w-6 text-secondary" /></div>
                  <div className="space-y-0.5">
                    <DialogTitle className="text-xl font-black uppercase text-primary tracking-tight">{t.dialog.title}</DialogTitle>
                    <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Official Correspondence Dispatcher</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 space-y-8">
                <div className="space-y-3 text-start">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.dialog.template}</label>
                  <Select onValueChange={(val) => setSelectedTemplate(EMAIL_TEMPLATES.find(t => t.id === val) || EMAIL_TEMPLATES[0])}>
                    <SelectTrigger className="h-14 rounded-xl font-bold border-slate-100 bg-slate-50 text-slate-700">
                       <SelectValue placeholder="..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl max-h-[300px]">
                       {EMAIL_TEMPLATES.map(t => (
                         <SelectItem key={t.id} value={t.id} className="font-bold py-3">
                           {isAr ? t.labelAr : t.labelEn}
                         </SelectItem>
                       ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 text-start">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.dialog.reason}</label>
                  <Textarea 
                    value={msgReason} 
                    onChange={(e) => setMsgReason(e.target.value)}
                    placeholder={t.dialog.placeholder} 
                    className="min-h-[140px] bg-slate-50 border-none rounded-2xl font-bold p-6 text-slate-700 leading-relaxed shadow-inner"
                  />
                </div>

                <div className="space-y-4 text-start">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                     <Paperclip className="h-3 w-3 text-secondary" />
                     {t.dialog.attachments}
                  </label>
                  
                  <div className="space-y-4">
                    <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full h-14 border-dashed border-2 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-secondary hover:border-secondary transition-all">
                       <FileUp className="h-5 w-5 mr-3" /> {t.dialog.externalFiles}
                    </Button>
                    <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleExternalFile} />
                    
                    {externalAttachments.length > 0 && (
                      <div className="grid grid-cols-1 gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner animate-in slide-in-from-top-2">
                         {externalAttachments.map((f, idx) => (
                           <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm group">
                              <div className="flex items-center gap-3 overflow-hidden">
                                 <div className="h-8 w-8 rounded bg-secondary/10 flex items-center justify-center shrink-0"><FileCheck className="h-4 w-4 text-secondary" /></div>
                                 <span className="text-xs font-bold text-slate-600 truncate">{f.name}</span>
                              </div>
                              <button onClick={() => removeExternalFile(idx)} className="text-slate-300 hover:text-red-500 transition-colors p-2"><X className="h-4 w-4" /></button>
                           </div>
                         ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                <Button onClick={handleSendMessage} disabled={isProcessingMsg} className="flex-1 bg-primary text-white px-10 rounded-xl h-16 font-black shadow-xl shadow-primary/10 transition-all hover:bg-primary/90 active:scale-95">
                  {isProcessingMsg ? <Spinner className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 mr-3 text-secondary" />}
                  {t.dialog.send}
                </Button>
              </div>
            </div>

            {/* Preview Side */}
            <div className="lg:col-span-6 bg-slate-50 p-8 flex flex-col h-full overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.dialog.preview}</span>
              </div>

              <div className="flex-1 bg-white rounded-2xl shadow-inner border border-slate-200/50 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-slate-50 space-y-2 bg-slate-50/50 shrink-0 text-start">
                   <div className="flex items-center gap-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase w-12">{t.dialog.from}</p>
                      <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/5 rounded">BBA Academy &lt;banaatacademy@gmail.com&gt;</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase w-12">{t.dialog.to}</p>
                      <span className="text-[10px] font-bold text-secondary px-2 py-0.5 bg-secondary/5 rounded">{activeRecipient?.email}</span>
                   </div>
                   <div className="flex items-center gap-2 pt-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase w-12">{t.dialog.subject}</p>
                      <p className="text-xs font-black text-slate-900 truncate">{selectedTemplate.subject}</p>
                   </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-8 text-start">
                   <div className="flex justify-center mb-4">
                      <img src="/logo.png" className="h-16 w-16 object-contain grayscale opacity-30" alt="BBA Logo" />
                   </div>
                   
                   <div className="prose prose-slate max-w-none">
                      <div className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap text-sm italic bg-slate-50/30 p-4 rounded-lg border border-slate-100">
                         {selectedTemplate.body({ 
                            parentName: activeRecipient?.name || '[Parent Name]', 
                            studentId: id || '[ID]',
                            targetStudents: `${student.firstName} ${student.lastName}`,
                            reason: msgReason || '...',
                            paymentAmount: student.program === 'weekend' ? '$75' : '$1,650'
                         })}
                      </div>
                   </div>

                   {externalAttachments.length > 0 && (
                     <div className="pt-8 border-t border-slate-100 space-y-4">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Paperclip className="h-3 w-3 text-secondary" /> 
                           {t.dialog.attachCount(externalAttachments.length)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                           {externalAttachments.map((f, idx) => (
                             <div key={idx} className="px-3 py-2 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 border border-slate-200 flex items-center gap-2 shadow-sm">
                                <FileText className="h-3.5 w-3.5 text-secondary" />
                                {f.name}
                                <span className="text-[8px] opacity-40 uppercase">{Math.round(f.size / 1024)} KB</span>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}

                   <div className="pt-12 border-t border-slate-100 space-y-1 opacity-60">
                      <p className="font-black text-primary text-xs tracking-tight">Dr. Mustafa Ali</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Academy Director | Baneen & Banaat Academy</p>
                      <p className="text-[8px] font-medium text-slate-400">banaatacademy@gmail.com</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-blue-50/50 p-6 md:p-8 rounded-2xl border border-blue-100 flex items-start gap-5 mx-2 shadow-sm">
         <Info className="h-6 w-6 text-blue-600 shrink-0 mt-1 opacity-60" />
         <div className="space-y-1.5 text-start">
            <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">{isAr ? 'إرشادات التواصل' : 'Communication Guidance'}</p>
            <p className="text-xs md:text-sm font-bold text-blue-900/60 leading-relaxed italic">
               {isAr 
                  ? 'يرجى استخدام قنوات التواصل الرسمية لتوثيق المحادثات الهامة. أزرار التواصل السريع مخصصة للمتابعة الروتينية والمستعجلة.' 
                  : 'Please use official channels for documenting critical conversations. Quick contact buttons are for routine and urgent follow-ups.'}
            </p>
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
