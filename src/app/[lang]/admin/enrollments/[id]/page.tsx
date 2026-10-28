'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { 
  Users, 
  MapPin, 
  GraduationCap, 
  CreditCard, 
  FileText, 
  CheckCircle2,
  FileCheck,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Clock,
  Layers,
  Briefcase,
  UserPlus,
  Mail,
  Send,
  MessageSquare,
  AlertCircle,
  Check,
  X,
  FileWarning,
  Info,
  BadgeCheck,
  PencilLine,
  Phone,
  Home,
  Building,
  Hash,
  Type,
  Calendar as CalendarIcon,
  Eye,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

// Official English Email Templates (Professional Versions)
const EMAIL_TEMPLATES = [
  {
    id: 'received',
    label: 'Application Received',
    subject: 'BBA Academy: We have received your application',
    body: (data: any) => `Dear ${data.parentName},\n\nThank you for choosing Baneen and Banaat Academy. We are writing to confirm that we have successfully received your enrollment application (ID: ${data.appId}) for ${data.studentCount} student(s).\n\nOur admissions team is currently conducting an initial review of the submitted information. Please note that this confirmation acknowledges receipt of your application and does not imply final acceptance into the academy. We will contact you shortly should any additional information be required.\n\nBest regards,\nBBA Admissions Office`
  },
  {
    id: 'under_review',
    label: 'Under Review',
    subject: 'BBA Academy: Your application is now under review',
    body: (data: any) => `Dear ${data.parentName},\n\nThis is a formal update regarding your application (ID: ${data.appId}). The files for ${data.targetStudents} have been moved to the "Under Review" stage and are currently being evaluated by our academic committee.\n\nSincerely,\nBBA Academic Committee`
  },
  {
    id: 'offer',
    label: 'Admission Offer',
    subject: 'Congratulations! Admission Offer from BBA Academy',
    body: (data: any) => `Dear ${data.parentName},\n\nOn behalf of the academic committee, I am delighted to inform you that the following student(s) have been accepted into Baneen and Banaat Academy:\n\n${data.acceptedStudents}\n\nAn academy administrator will contact you within 48 hours to finalize the tuition setup and provide orientation details.\n\nDetails/Next Steps: ${data.reason || 'Welcome to the family!'}\n\nBest regards,\nDr. Mustafa Ali\nAcademy Director`
  },
  {
    id: 'missing_docs',
    label: 'Missing Documents',
    subject: 'Action Required: Missing Documentation for BBA Enrollment',
    body: (data: any) => `Dear ${data.parentName},\n\nDuring the preliminary review of your application (ID: ${data.appId}), our team identified that certain supporting documents are missing or require clarification for ${data.targetStudents}.\n\nRequirements:\n${data.reason || 'Please provide updated ID copies and previous report cards.'}\n\nThank you,\nBBA Admissions Team`
  },
  {
    id: 'not_accepted',
    label: 'Admission Decision: Not Accepted',
    subject: 'Update regarding your BBA Application',
    body: (data: any) => `Dear ${data.parentName},\n\nThank you for your interest in Baneen and Banaat Academy. After careful review of the application for ${data.targetStudents}, we regret to inform you that we are unable to offer admission at this time.\n\nReason: ${data.reason || 'Maximum enrollment capacity reached for the current term.'}\n\nRespectfully,\nBBA Admissions Office`
  }
];

export default function ApplicationReviewDetailPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const { user, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const isAr = lang === 'ar';

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(EMAIL_TEMPLATES[0]);
  const [msgReason, setReason] = useState('');
  const [isMsgOpen, setIsMsgOpen] = useState(false);

  const docRef = useMemo(() => (firestore && id) ? doc(firestore, 'enrollments', id) : null, [firestore, id]);
  const { data: app, loading: dataLoading } = useDoc(docRef);

  const t = {
    topTitle: isAr ? 'مراجعة تفاصيل الطلب' : 'Application Review Detail',
    syncing: isAr ? 'جاري مزامنة البيانات...' : 'Syncing Application...',
    notFound: isAr ? 'الطلب غير موجود' : 'Application Not Found',
    status: {
      submitted: isAr ? 'طلب جديد' : 'New Submission',
      reviewed: isAr ? 'قيد المراجعة' : 'Under Review',
      missing_info: isAr ? 'نقص بيانات' : 'Awaiting Info',
      approved: isAr ? 'مكتمل / مقبول' : 'Completed / Approved',
      rejected: isAr ? 'مرفوض' : 'Rejected',
    },
    actions: {
      sendMessage: isAr ? 'تواصل مع ولي الأمر' : 'Send Message',
      provision: isAr ? 'تفعيل الملف' : 'Provision',
      enrolled: isAr ? 'تم التسجيل' : 'ENROLLED',
      logMessage: isAr ? 'تسجيل وأرشفة المراسلة' : 'Log & Record Correspondence',
    },
    sections: {
      guardians: isAr ? 'بيانات أولياء الأمور' : 'Guardians Information',
      address: isAr ? 'تفاصيل العنوان السكني' : 'Physical Address Details',
      students: isAr ? 'سجل بيانات الطلاب المفصل' : 'Detailed Student Records',
      program: isAr ? 'البرنامج التعليمي المختار' : 'Program Selection',
      logs: isAr ? 'سجل المراسلات والأحداث' : 'Correspondence Logs',
      artifacts: isAr ? 'المرفقات والمستندات' : 'Document Artifacts',
    },
    table: {
      type: isAr ? 'الفئة' : 'Type',
      name: isAr ? 'الاسم الكامل' : 'Full Name',
      phone: isAr ? 'رقم الهاتف' : 'Phone Number',
      email: isAr ? 'البريد الإلكتروني' : 'Email Address',
      relation: isAr ? 'الصلة' : 'Relationship',
      addr1: isAr ? 'العنوان 1' : 'Address 1',
      addr2: isAr ? 'العنوان 2' : 'Address 2',
      city: isAr ? 'المدينة' : 'City',
      state: isAr ? 'الولاية' : 'State',
      zip: isAr ? 'الرمز البريدي' : 'ZIP',
      studentType: isAr ? 'نوع الطالب' : 'Student Type',
      dob: isAr ? 'الميلاد' : 'DOB',
      gender: isAr ? 'الجنس' : 'Gender',
      grade: isAr ? 'المستوى' : 'Grade',
      decision: isAr ? 'قرار الأهلية' : 'Decision',
      action: isAr ? 'إجراء' : 'Action',
    },
    decisions: {
      pending: isAr ? 'قيد المراجعة' : 'Pending Review',
      accept: isAr ? 'قبول الطالب' : 'Accept Candidate',
      missing: isAr ? 'نقص مستندات' : 'Request More Docs',
      decline: isAr ? 'رفض الطلب' : 'Decline Application',
    },
    dialog: {
      title: isAr ? 'مركز مراسلة ولي الأمر' : 'Parent Correspondence Hub',
      template: isAr ? '1. اختيار القالب الرسمي' : '1. Select Official Template',
      reason: isAr ? '2. التفاصيل الإضافية / الأسباب' : '2. Additional Details / Reasons',
      preview: isAr ? 'معاينة البريد الصادر (مباشر)' : 'Live Outgoing Email Preview',
      placeholder: isAr ? 'اكتب الأسباب أو المستندات الناقصة هنا ليتم دمجها في الرسالة...' : 'Type specific reasons or missing details here to be merged...',
      from: isAr ? 'من:' : 'From:',
      to: isAr ? 'إلى:' : 'To:',
      subject: isAr ? 'الموضوع:' : 'Subject:',
    },
    program: {
      tuition: isAr ? 'تقدير الرسوم الأولية' : 'Base Tuition Estimate',
      events: isAr ? 'أحداث' : 'Events',
      noLogs: isAr ? 'لا توجد سجلات مراسلة' : 'No communication history',
      noFiles: isAr ? 'لم يتم رفع أي مستندات مع هذا الطلب.' : 'No artifacts were uploaded with this application.',
    }
  };

  const updateAppStatus = (newStatus: string) => {
    if (!docRef) return;
    const updateData = { 
      status: newStatus, 
      updatedAt: serverTimestamp(),
      processedBy: user?.email || 'admin'
    };
    updateDoc(docRef, updateData)
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: updateData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
    toast({ title: isAr ? "تم تحديث حالة الطلب" : "Application Status Updated" });
  };

  const updateStudentStatus = (studentIdx: number, newStatus: string) => {
    if (!docRef || !app) return;
    const updatedStudents = [...app.students];
    updatedStudents[studentIdx].status = newStatus;
    const updateData = { 
      students: updatedStudents, 
      updatedAt: serverTimestamp() 
    };
    updateDoc(docRef, updateData)
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: updateData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
    toast({ title: isAr ? "تم تحديث حالة الطالب" : "Student Status Updated" });
  };

  const enrollStudent = (studentIdx: number) => {
    if (!firestore || !app || !docRef) return;
    const student = app.students[studentIdx];
    
    if (student.isEnrolled) {
      toast({ variant: "destructive", title: isAr ? "الطالب مسجل بالفعل" : "Student already enrolled" });
      return;
    }

    setIsProcessing(true);
    const studentIdStr = `${id}-${studentIdx}`;
    const q = query(collection(firestore, 'students'), where('enrollmentRef', '==', studentIdStr));
    
    getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        toast({ variant: "destructive", title: "Record already exists" });
        setIsProcessing(false);
        return;
      }

      const studentDoc = doc(collection(firestore, 'students'));
      const studentData = {
        firstName: student.firstName,
        middleName: student.middleName || '',
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        gender: student.gender,
        dob: student.dob,
        gradeLevel: student.lastGrade,
        entryType: student.entryType || '',
        enrollmentId: id,
        enrollmentRef: studentIdStr,
        parentId: app.userId || 'anonymous',
        parentName: app.parent1Name,
        parentEmail: app.parent1Email,
        parentPhone: app.parent1Phone,
        address: app.address,
        program: app.programOption,
        status: 'active',
        academicPlan: { progress: 0, courses: [] },
        financialLedger: {
           totalDue: app.programOption === 'weekend' ? 75 : (app.paymentTier === 'full-3-5' ? 2850 : 1650),
           totalPaid: 0,
           payments: []
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      setDoc(studentDoc, studentData)
        .then(() => {
          const updatedStudents = [...app.students];
          updatedStudents[studentIdx].isEnrolled = true;
          updatedStudents[studentIdx].status = 'Accepted';
          updateDoc(docRef, { students: updatedStudents });
          toast({ title: isAr ? "تم إنشاء ملف الطالب بنجاح" : "Student profile created successfully" });
        })
        .catch(async (err) => {
           const pError = new FirestorePermissionError({
            path: studentDoc.path,
            operation: 'create',
            requestResourceData: studentData,
          });
          errorEmitter.emit('permission-error', pError);
        })
        .finally(() => setIsProcessing(false));
    });
  };

  const handleSendMessage = () => {
    if (!app || !docRef) return;
    setIsProcessing(true);

    const logEntry = {
      templateId: selectedTemplate.id,
      sentAt: new Date().toISOString(),
      recipient: app.parent1Email,
      subject: selectedTemplate.subject,
      content: selectedTemplate.body({
        parentName: app.parent1Name,
        appId: id,
        studentCount: app.students.length,
        acceptedStudents: app.students.filter((s: any) => s.status === 'Accepted').map((s: any) => `• ${s.firstName} ${s.lastName}`).join('\n'),
        targetStudents: app.students.map((s: any) => `${s.firstName} ${s.lastName}`).join(', '),
        reason: msgReason
      }),
      sender: user?.email || 'admin'
    };

    const existingLogs = app.communications || [];
    const updateData = { 
      communications: [logEntry, ...existingLogs],
      lastCommunicationAt: serverTimestamp()
    };

    updateDoc(docRef, updateData)
      .then(() => {
        toast({ title: isAr ? "تم تسجيل الرسالة" : "Message Logged" });
        setIsMsgOpen(false);
        setReason('');
      })
      .catch(async (err) => {
        const pError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', pError);
      })
      .finally(() => setIsProcessing(false));
  };

  if (authLoading || dataLoading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">{t.syncing}</p>
    </div>
  );

  if (!app) return <div className="p-20 text-center font-black text-red-500 uppercase">{t.notFound}</div>;

  return (
    <div className="space-y-8 pb-20">
      {/* 1. TOP HEADER BAR */}
      <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-premium border border-slate-100 sticky top-4 z-40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100">
            {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          <div className="space-y-0.5">
            <h1 className="text-xl font-black text-primary truncate max-w-[350px]">{app.parent1Name}</h1>
            <div className="flex items-center gap-2">
               <Badge className={cn(
                 "border-none font-black text-[9px] uppercase px-3 py-1 rounded-full",
                 app.status === 'submitted' ? "bg-blue-100 text-blue-600" :
                 app.status === 'approved' ? "bg-green-100 text-green-600" :
                 "bg-secondary/10 text-secondary"
               )}>
                 {t.status[app.status as keyof typeof t.status] || app.status}
               </Badge>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ID: {id}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select value={app.status} onValueChange={updateAppStatus}>
             <SelectTrigger className="h-12 rounded-xl border-slate-200 font-black text-[10px] uppercase w-full md:w-52 bg-white shadow-sm">
                <Layers className="h-4 w-4 mr-2 text-secondary" />
                <SelectValue />
             </SelectTrigger>
             <SelectContent className="rounded-xl p-1">
                <SelectItem value="submitted" className="font-bold py-3">{t.status.submitted}</SelectItem>
                <SelectItem value="reviewed" className="font-bold py-3">{t.status.reviewed}</SelectItem>
                <SelectItem value="missing_info" className="font-bold py-3 text-amber-600">{t.status.missing_info}</SelectItem>
                <SelectItem value="approved" className="font-bold py-3 text-green-600">{t.status.approved}</SelectItem>
                <SelectItem value="rejected" className="font-bold py-3 text-red-600">{t.status.rejected}</SelectItem>
             </SelectContent>
          </Select>

          <Dialog open={isMsgOpen} onOpenChange={setIsMsgOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-white h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/10 gap-2 hover:bg-primary/90 transition-all">
                <MessageSquare className="h-4 w-4 text-secondary" />
                {t.actions.sendMessage}
              </Button>
            </DialogTrigger>
            <DialogContent className={cn("max-w-5xl rounded-3xl border-none p-0 overflow-hidden shadow-2xl", isAr && "font-arabic")}>
              <div className="grid grid-cols-1 lg:grid-cols-12 h-[80vh] max-h-[800px]">
                {/* Form Side */}
                <div className="lg:col-span-6 p-8 flex flex-col h-full overflow-y-auto border-r border-slate-100">
                  <DialogHeader className="mb-8">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"><Mail className="h-6 w-6 text-secondary" /></div>
                      <div className="space-y-0.5 text-start">
                        <DialogTitle className="text-xl font-black uppercase text-primary tracking-tight">{t.dialog.title}</DialogTitle>
                        <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Official Correspondence Dispatcher</DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="flex-1 space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.dialog.template}</label>
                      <Select onValueChange={(val) => setSelectedTemplate(EMAIL_TEMPLATES.find(t => t.id === val) || EMAIL_TEMPLATES[0])}>
                        <SelectTrigger className="h-14 rounded-xl font-bold border-slate-100 bg-slate-50 text-slate-700">
                           <SelectValue placeholder="..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                           {EMAIL_TEMPLATES.map(t => <SelectItem key={t.id} value={t.id} className="font-bold py-3">{t.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.dialog.reason}</label>
                      <Textarea 
                        value={msgReason} 
                        onChange={(e) => setReason(e.target.value)}
                        placeholder={t.dialog.placeholder} 
                        className="min-h-[180px] bg-slate-50 border-none rounded-2xl font-bold p-6 text-slate-700 leading-relaxed shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                    <Button onClick={handleSendMessage} disabled={isProcessing} className="flex-1 bg-primary text-white px-10 rounded-xl h-16 font-black shadow-xl shadow-primary/10 transition-all hover:bg-primary/90 active:scale-95">
                      {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 mr-3 text-secondary" />}
                      {t.actions.logMessage}
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
                    {/* Fake Email Header */}
                    <div className="p-6 border-b border-slate-50 space-y-2 bg-slate-50/50 shrink-0">
                       <p className="text-[9px] font-black text-slate-400 uppercase">{t.dialog.from} <span className="text-primary">BBA Academy &lt;banaatacademy@gmail.com&gt;</span></p>
                       <p className="text-[9px] font-black text-slate-400 uppercase">{t.dialog.to} <span className="text-secondary">{app.parent1Email}</span></p>
                       <p className="text-xs font-black text-slate-900 mt-3">{t.dialog.subject} {selectedTemplate.subject}</p>
                    </div>

                    {/* Email Content Body */}
                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-8">
                       <div className="flex justify-center">
                          <img src="/logo.png" className="h-14 w-14 object-contain opacity-80" alt="BBA Logo" />
                       </div>
                       <div className="prose prose-slate max-w-none">
                          <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap text-sm italic">
                             {selectedTemplate.body({ 
                                parentName: app.parent1Name, 
                                appId: id, 
                                studentCount: app.students?.length || 0,
                                acceptedStudents: app.students?.filter((s: any) => s.status === 'Accepted').map((s: any) => `• ${s.firstName} ${s.lastName}`).join('\n') || '',
                                targetStudents: app.students?.map((s: any) => `${s.firstName} ${s.lastName}`).join(', ') || '',
                                reason: msgReason || '...' 
                             })}
                          </p>
                       </div>
                       <div className="pt-10 border-t border-slate-50 space-y-1 opacity-60">
                          <p className="font-black text-primary text-[10px]">Dr. Mustafa Ali</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Academy Director | Baneen & Banaat Academy</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 2. FAMILY INFORMATION TABLES */}
      <div className="space-y-6">
        <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white/40 backdrop-blur-sm border border-slate-100">
           <CardHeader className="bg-slate-50/80 p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg"><Users className="h-5 w-5" /></div>
                 <CardTitle className="text-sm font-black text-primary uppercase tracking-tight">{t.sections.guardians}</CardTitle>
              </div>
           </CardHeader>
           <CardContent className="p-0 overflow-hidden">
              <Table className="border-collapse">
                <TableHeader className="bg-slate-100/80">
                  <TableRow className="border-b border-slate-200 hover:bg-transparent">
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 border-r border-slate-200/50 text-start">{t.table.type}</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 border-r border-slate-200/50 text-start">{t.table.name}</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 border-r border-slate-200/50 text-center">{t.table.phone}</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 border-r border-slate-200/50 text-center">{t.table.email}</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 text-center">{t.table.relation}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-slate-100 hover:bg-white/60 transition-colors">
                    <TableCell className="px-6 border-r border-slate-50/50">
                       <Badge variant="outline" className="bg-secondary/10 text-secondary border-none font-black text-[9px] uppercase">{isAr ? 'الأول (الأساسي)' : 'Parent 1 (Primary)'}</Badge>
                    </TableCell>
                    <TableCell className="font-black text-primary text-sm px-6 border-r border-slate-50/50">{app.parent1Name}</TableCell>
                    <TableCell className="text-xs font-bold text-slate-600 px-6 border-r border-slate-50/50 text-center" dir="ltr">{app.parent1Phone}</TableCell>
                    <TableCell className="text-xs font-bold text-slate-500 px-6 lowercase border-r border-slate-50/50 text-center">{app.parent1Email}</TableCell>
                    <TableCell className="px-6 text-center"><Badge variant="outline" className="bg-slate-50 border-none font-black text-[9px] uppercase px-3">{app.relationship1}</Badge></TableCell>
                  </TableRow>
                  {app.parent2Name && (
                    <TableRow className="border-none hover:bg-white/60 transition-colors">
                      <TableCell className="px-6 border-r border-slate-50/50">
                         <Badge variant="outline" className="bg-slate-50 text-slate-400 border-none font-black text-[9px] uppercase">{isAr ? 'الثاني' : 'Parent 2'}</Badge>
                      </TableCell>
                      <TableCell className="font-black text-primary text-sm px-6 border-r border-slate-50/50">{app.parent2Name}</TableCell>
                      <TableCell className="text-xs font-bold text-slate-600 px-6 border-r border-slate-50/50 text-center" dir="ltr">{app.parent2Phone}</TableCell>
                      <TableCell className="text-xs font-bold text-slate-500 px-6 lowercase border-r border-slate-50/50 text-center">{app.parent2Email}</TableCell>
                      <TableCell className="px-6 text-center"><Badge variant="outline" className="bg-slate-50 border-none font-black text-[9px] uppercase px-3">{app.relationship2}</Badge></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
           </CardContent>
        </Card>

        <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white/40 backdrop-blur-sm border border-slate-100">
           <CardHeader className="bg-slate-50/80 p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg"><MapPin className="h-5 w-5" /></div>
                 <CardTitle className="text-sm font-black text-primary uppercase tracking-tight">{t.sections.address}</CardTitle>
              </div>
           </CardHeader>
           <CardContent className="p-0 overflow-hidden">
              <Table className="border-collapse">
                <TableHeader className="bg-slate-100/80">
                  <TableRow className="border-b border-slate-200 hover:bg-transparent">
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 border-r border-slate-200/50 text-start">{t.table.addr1}</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 border-r border-slate-200/50 text-start">{t.table.addr2}</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 border-r border-slate-200/50 text-center">{t.table.city}</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 border-r border-slate-200/50 text-center">{t.table.state}</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 h-14 text-center">{t.table.zip}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-none hover:bg-white/60 transition-colors">
                    <TableCell className="px-6 text-sm font-bold text-primary border-r border-slate-50/50">{app.address?.line1}</TableCell>
                    <TableCell className="px-6 text-sm font-medium text-slate-500 border-r border-slate-50/50">{app.address?.line2 || '-'}</TableCell>
                    <TableCell className="px-6 text-sm font-bold text-slate-600 border-r border-slate-50/50 text-center">{app.address?.city}</TableCell>
                    <TableCell className="px-6 text-sm font-black text-secondary border-r border-slate-50/50 text-center">{app.address?.state}</TableCell>
                    <TableCell className="px-6 text-sm font-mono font-bold text-slate-400 text-center">{app.address?.zip}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
           </CardContent>
        </Card>
      </div>

      {/* 3. STUDENT REVIEW QUEUE TABLE */}
      <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white/40 backdrop-blur-sm border border-slate-100">
         <CardHeader className="bg-slate-50/80 p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg"><GraduationCap className="h-5 w-5" /></div>
               <CardTitle className="text-sm font-black text-primary uppercase tracking-tight">{t.sections.students}</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="border-collapse min-w-[1200px]">
                 <TableHeader className="bg-slate-100/80">
                    <TableRow className="h-14 border-b border-slate-200 hover:bg-transparent">
                       <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 border-r border-slate-200/50 text-center">{t.table.studentType}</TableHead>
                       <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 border-r border-slate-200/50 text-start">{t.table.name}</TableHead>
                       <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 border-r border-slate-200/50 text-center">{t.table.dob}</TableHead>
                       <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 border-r border-slate-200/50 text-center">{t.table.gender}</TableHead>
                       <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 border-r border-slate-200/50 text-center">{t.table.grade}</TableHead>
                       <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 border-r border-slate-200/50 text-center">{t.table.phone}</TableHead>
                       <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 border-r border-slate-200/50 text-center">{t.table.email}</TableHead>
                       <TableHead className="text-[10px] font-black uppercase text-slate-600 px-6 border-r border-slate-200/50 text-center">{t.table.decision}</TableHead>
                       <TableHead className="text-[10px] font-black uppercase text-slate-600 text-center px-6">{t.table.action}</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {app.students?.map((st: any, i: number) => (
                      <TableRow key={i} className="hover:bg-white/60 transition-colors border-b border-slate-50 h-24">
                         <TableCell className="px-6 border-r border-slate-50/50 text-center">
                            <Badge variant="outline" className="bg-slate-50 border-none font-black text-[9px] uppercase px-3">
                               {isAr ? (st.entryType === 'New Student' ? 'طالب جديد' : st.entryType === 'Returning Student' ? 'طالب عائد' : st.entryType) : st.entryType}
                            </Badge>
                         </TableCell>
                         <TableCell className="px-6 border-r border-slate-50/50">
                            <p className="text-sm font-black text-primary whitespace-nowrap">{st.firstName} {st.lastName}</p>
                         </TableCell>
                         <TableCell className="px-6 border-r border-slate-50/50 text-center text-xs font-bold text-slate-500 whitespace-nowrap">
                            {st.dob}
                         </TableCell>
                         <TableCell className="px-6 border-r border-slate-50/50 text-center">
                            <Badge variant="outline" className="bg-primary/5 text-primary border-none font-black text-[8px] uppercase">
                               {isAr ? (st.gender === 'Male' ? 'ذكر' : st.gender === 'Female' ? 'أنثى' : st.gender) : st.gender}
                            </Badge>
                         </TableCell>
                         <TableCell className="px-6 border-r border-slate-50/50 text-center">
                            <p className="text-xs font-black text-secondary uppercase">Grade {st.lastGrade}</p>
                         </TableCell>
                         <TableCell className="px-6 border-r border-slate-50/50 text-center text-xs font-bold text-slate-600" dir="ltr">
                            {st.phone}
                         </TableCell>
                         <TableCell className="px-6 border-r border-slate-50/50 text-center text-xs font-bold text-slate-500 lowercase truncate max-w-[150px]">
                            {st.email}
                         </TableCell>
                         <TableCell className="px-6 border-r border-slate-50/50 text-center">
                            <Select value={st.status || 'Pending'} onValueChange={(val) => updateStudentStatus(i, val)}>
                               <SelectTrigger className="h-10 rounded-lg text-[10px] font-black uppercase border-slate-200 bg-white w-36 mx-auto shadow-sm">
                                  <SelectValue />
                               </SelectTrigger>
                               <SelectContent className="rounded-xl p-1" dir={isAr ? 'rtl' : 'ltr'}>
                                  <SelectItem value="Pending" className="text-[10px] font-bold py-2.5">{t.decisions.pending}</SelectItem>
                                  <SelectItem value="Accepted" className="text-[10px] font-bold text-green-600 py-2.5">{t.decisions.accept}</SelectItem>
                                  <SelectItem value="Missing Docs" className="text-[10px] font-bold text-amber-600 py-2.5">{t.decisions.missing}</SelectItem>
                                  <SelectItem value="Rejected" className="text-[10px] font-bold text-red-600 py-2.5">{t.decisions.decline}</SelectItem>
                               </SelectContent>
                            </Select>
                         </TableCell>
                         <TableCell className="px-6 text-center">
                            {st.isEnrolled ? (
                              <Badge className="bg-green-100 text-green-600 border-none font-black text-[9px] py-2 px-4 rounded-xl flex items-center gap-2 w-fit mx-auto shadow-sm">
                                 <BadgeCheck className="h-4 w-4" /> {t.actions.enrolled}
                              </Badge>
                            ) : (
                              <Button 
                                onClick={() => enrollStudent(i)} 
                                disabled={isProcessing || st.status !== 'Accepted'}
                                className="bg-primary hover:bg-secondary text-white h-10 px-6 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-primary/10 transition-all active:scale-95"
                              >
                                 {t.actions.provision}
                              </Button>
                            )}
                         </TableCell>
                      </TableRow>
                    ))}
                 </TableBody>
              </Table>
            </div>
         </CardContent>
      </Card>

      {/* 4. BOTTOM GRID: PROGRAMS, LOGS & ATTACHMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Program Selection Card */}
               <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white border border-slate-100 flex flex-col h-full">
                  <CardHeader className="bg-slate-50/80 p-6 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg"><Briefcase className="h-5 w-5" /></div>
                        <CardTitle className="text-sm font-black text-primary uppercase tracking-tight">{t.sections.program}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8 flex-1 flex flex-col justify-center">
                     <div className="space-y-2">
                        <h3 className="text-2xl font-black text-primary uppercase tracking-tight leading-tight">{app.programOption}</h3>
                        <Badge className="bg-secondary text-white border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">{app.paymentTier || 'Standard'}</Badge>
                     </div>
                     <div className="space-y-1 pt-6 border-t border-slate-50">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.program.tuition}</p>
                        <div className="text-5xl font-black text-primary tracking-tighter">${app.programOption === 'weekend' ? '75' : (app.paymentTier === 'full-3-5' ? '2,850' : '1,650')}</div>
                     </div>
                  </CardContent>
               </Card>

               {/* Communication Logs Card */}
               <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white border border-slate-100 h-full flex flex-col">
                  <CardHeader className="bg-slate-50/80 p-6 border-b border-slate-200 flex flex-row items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shadow-lg"><Clock className="h-5 w-5" /></div>
                        <CardTitle className="text-sm font-black text-primary uppercase tracking-tight">{t.sections.logs}</CardTitle>
                     </div>
                     <Badge variant="outline" className="text-[9px] border-slate-200 text-slate-400 px-3">{app.communications?.length || 0} {t.program.events}</Badge>
                  </CardHeader>
                  <CardContent className="p-6 flex-1">
                     <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {app.communications?.length > 0 ? app.communications.map((log: any, idx: number) => (
                          <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 group transition-all">
                             <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100"><Mail className="h-4.5 w-4.5 text-slate-300" /></div>
                             <div className="space-y-1 flex-1">
                                <div className="flex justify-between items-start">
                                   <p className="text-[10px] font-black text-primary uppercase">{log.templateId}</p>
                                   <span className="text-[9px] font-bold text-slate-400 uppercase">{format(new Date(log.sentAt), 'MMM dd')}</span>
                                </div>
                                <p className="text-[10px] font-medium text-slate-500 line-clamp-2 leading-relaxed">{log.subject}</p>
                             </div>
                          </div>
                        )) : (
                          <div className="py-20 text-center flex flex-col items-center gap-3">
                             <Mail className="h-10 w-10 text-slate-100" />
                             <p className="text-slate-300 font-bold uppercase text-[10px] tracking-widest">{t.program.noLogs}</p>
                          </div>
                        )}
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Verification Files */}
         <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white border border-slate-100 flex flex-col">
            <CardHeader className="bg-slate-50/80 p-6 border-b border-slate-200">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg"><FileCheck className="h-5 w-5" /></div>
                  <CardTitle className="text-sm font-black text-primary uppercase tracking-tight">{t.sections.artifacts}</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-0 flex-1">
               <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto custom-scrollbar">
                  {app.files?.length > 0 ? app.files.map((file: any, idx: number) => (
                    <div key={idx} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                       <div className="flex items-center gap-4">
                          {file.type?.startsWith('image/') || file.data?.startsWith('data:image/') ? (
                            <div className="h-12 w-12 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-sm"><img src={file.data} className="h-full w-full object-cover" alt="preview" /></div>
                          ) : (
                            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200"><FileText className="h-5 w-5 text-slate-400" /></div>
                          )}
                          <div className="space-y-0.5">
                             <p className="text-[10px] font-black text-primary truncate max-w-[150px] uppercase tracking-tight">{file.name}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase">{Math.round(file.size / 1024)} KB</p>
                          </div>
                       </div>
                       <Button onClick={() => window.open(file.data, '_blank')} variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-300 hover:text-secondary hover:bg-white hover:shadow-sm transition-all"><ExternalLink className="h-5 w-5" /></Button>
                    </div>
                  )) : (
                    <div className="py-32 text-center flex flex-col items-center gap-4">
                       <FileWarning className="h-12 w-12 text-slate-100" />
                       <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest px-10">{t.program.noFiles}</p>
                    </div>
                  )}
               </div>
            </CardContent>
         </Card>
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
