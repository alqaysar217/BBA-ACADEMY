
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
  Home
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

// Official English Email Templates
const EMAIL_TEMPLATES = [
  {
    id: 'received',
    label: 'Application Received',
    subject: 'BBA Academy: We have received your application',
    body: (data: any) => `Dear ${data.parentName},\n\nThank you for choosing Baneen and Banaat Academy. We are writing to confirm that we have successfully received your enrollment application for ${data.studentCount} student(s).\n\nOur admissions team is currently reviewing your details. Please note that this confirmation does not imply final acceptance. We will contact you shortly if any further documentation or information is required.\n\nBest regards,\nBBA Admissions Office`
  },
  {
    id: 'under_review',
    label: 'Under Review',
    subject: 'BBA Academy: Your application is under review',
    body: (data: any) => `Dear ${data.parentName},\n\nThis is a formal update regarding your application (ID: ${data.appId}). Your file is now "Under Review" by our academic committee.\n\nWe appreciate your patience during this process. No further action is required from your side at this moment.\n\nSincerely,\nBBA Academic Committee`
  },
  {
    id: 'offer',
    label: 'Admission Offer',
    subject: 'Congratulations! Admission Offer from BBA Academy',
    body: (data: any) => `Dear ${data.parentName},\n\nWe are pleased to inform you that the following student(s) have been accepted into Baneen and Banaat Academy:\n\n${data.acceptedStudents}\n\nWe are excited to have you join our learning community. An administrator will contact you within 48 hours to finalize the tuition setup and provide orientation details.\n\nWelcome to the family!\nBBA Administration`
  },
  {
    id: 'missing_docs',
    label: 'Missing Documents',
    subject: 'Action Required: Missing Documentation for BBA Enrollment',
    body: (data: any) => `Dear ${data.parentName},\n\nDuring the review of your application, we noticed that some required documents are missing or incomplete for ${data.targetStudents}.\n\nRequirements:\n${data.reason || 'Please provide updated ID copies and previous report cards.'}\n\nPlease upload these documents through the portal or reply to this email to proceed with the application.\n\nThank you,\nBBA Admissions Team`
  },
  {
    id: 'not_accepted',
    label: 'Admission Decision: Not Accepted',
    subject: 'Update regarding your BBA Application',
    body: (data: any) => `Dear ${data.parentName},\n\nThank you for your interest in Baneen and Banaat Academy. After careful review of the application for ${data.targetStudents}, we regret to inform you that we are unable to offer admission at this time.\n\nReason: ${data.reason || 'Maximum capacity reached for the current semester.'}\n\nWe wish you and your family the very best in your educational journey.\n\nRespectfully,\nBBA Admissions Office`
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

  const updateAppStatus = (newStatus: string) => {
    if (!docRef) return;
    updateDoc(docRef, { 
      status: newStatus, 
      updatedAt: serverTimestamp(),
      processedBy: user?.email || 'admin'
    });
    toast({ title: isAr ? "تم تحديث حالة الطلب" : "Application Status Updated" });
  };

  const updateStudentStatus = (studentIdx: number, newStatus: string) => {
    if (!docRef || !app) return;
    const updatedStudents = [...app.students];
    updatedStudents[studentIdx].status = newStatus;
    updateDoc(docRef, { 
      students: updatedStudents, 
      updatedAt: serverTimestamp() 
    });
    toast({ title: isAr ? "تم تحديث حالة الطالب" : "Student Status Updated" });
  };

  const enrollStudent = async (studentIdx: number) => {
    if (!firestore || !app || !docRef) return;
    const student = app.students[studentIdx];
    
    if (student.isEnrolled) {
      toast({ variant: "destructive", title: isAr ? "الطالب مسجل بالفعل" : "Student already enrolled" });
      return;
    }

    setIsProcessing(true);
    try {
      const studentIdStr = `${id}-${studentIdx}`;
      const q = query(collection(firestore, 'students'), where('enrollmentRef', '==', studentIdStr));
      const snapshot = await getDocs(q);
      
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

      await setDoc(studentDoc, studentData);

      const updatedStudents = [...app.students];
      updatedStudents[studentIdx].isEnrolled = true;
      updatedStudents[studentIdx].status = 'Accepted';
      await updateDoc(docRef, { students: updatedStudents });

      toast({ title: isAr ? "تم إنشاء ملف الطالب بنجاح" : "Student profile created successfully" });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error creating record" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async () => {
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

    try {
      const existingLogs = app.communications || [];
      await updateDoc(docRef, { 
        communications: [logEntry, ...existingLogs],
        lastCommunicationAt: serverTimestamp()
      });
      
      toast({ title: "Message Logged", description: "Correspondence record added to application." });
      setIsMsgOpen(false);
      setReason('');
    } catch (err) {
      toast({ variant: "destructive", title: "Failed to log message" });
    } finally {
      setIsProcessing(false);
    }
  };

  if (authLoading || dataLoading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Application...</p>
    </div>
  );

  if (!app) return <div className="p-20 text-center font-black text-red-500 uppercase">Application Not Found</div>;

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
                 {app.status}
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
                <SelectItem value="submitted" className="font-bold py-3">New Submission</SelectItem>
                <SelectItem value="reviewed" className="font-bold py-3">Under Review</SelectItem>
                <SelectItem value="missing_info" className="font-bold py-3 text-amber-600">Awaiting Info</SelectItem>
                <SelectItem value="approved" className="font-bold py-3 text-green-600">Completed / Approved</SelectItem>
                <SelectItem value="rejected" className="font-bold py-3 text-red-600">Rejected</SelectItem>
             </SelectContent>
          </Select>

          <Dialog open={isMsgOpen} onOpenChange={setIsMsgOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-white h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/10 gap-2 hover:bg-primary/90 transition-all">
                <MessageSquare className="h-4 w-4 text-secondary" />
                {isAr ? 'تواصل مع ولي الأمر' : 'Send Message'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-2xl border-none p-0 overflow-hidden shadow-2xl">
              <div className="bg-primary p-6 text-white flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center"><Mail className="h-6 w-6 text-secondary" /></div>
                 <DialogTitle className="text-xl font-black uppercase tracking-tight">Parent Correspondence</DialogTitle>
              </div>
              <div className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">1. Select Template</label>
                    <Select onValueChange={(val) => setSelectedTemplate(EMAIL_TEMPLATES.find(t => t.id === val) || EMAIL_TEMPLATES[0])}>
                       <SelectTrigger className="h-14 rounded-xl font-bold border-slate-100 bg-slate-50">
                          <SelectValue placeholder="Select Template..." />
                       </SelectTrigger>
                       <SelectContent className="rounded-xl">
                          {EMAIL_TEMPLATES.map(t => <SelectItem key={t.id} value={t.id} className="font-bold py-3">{t.label}</SelectItem>)}
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">2. Details / Reasons</label>
                    <Textarea 
                      value={msgReason} 
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Type details here (reason for rejection, missing docs, etc)..." 
                      className="min-h-[120px] bg-slate-50 border-none rounded-xl font-bold p-5"
                    />
                 </div>
                 <div className="bg-slate-900 rounded-2xl p-6 space-y-3">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Email Preview</span>
                    <p className="text-[11px] text-white/80 whitespace-pre-wrap font-medium leading-relaxed italic">
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
              </div>
              <DialogFooter className="bg-slate-50 p-6">
                 <Button onClick={handleSendMessage} disabled={isProcessing} className="bg-primary text-white px-10 rounded-xl h-14 font-black shadow-xl w-full sm:w-auto">
                    {isProcessing ? <Clock className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                    Log & Record Correspondence
                 </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 2. PARENT & FAMILY INFORMATION (FULL ROW) */}
      <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white border border-slate-100">
         <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg"><Users className="h-5 w-5" /></div>
               <CardTitle className="text-sm font-black text-primary uppercase">{isAr ? 'بيانات أولياء الأمور والعنوان' : 'Family & Contact Information'}</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {/* Parent 1 */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-secondary">
                     <UserPlus className="h-4 w-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'ولي الأمر الأول' : 'Parent 1 (Primary)'}</span>
                  </div>
                  <div className="space-y-1">
                     <p className="text-lg font-black text-primary">{app.parent1Name}</p>
                     <p className="text-xs font-bold text-slate-500 flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {app.parent1Email}</p>
                     <p className="text-xs font-bold text-slate-500 flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {app.parent1Phone}</p>
                     <Badge variant="outline" className="mt-2 bg-slate-50 border-none font-black text-[9px] uppercase px-3">{app.relationship1}</Badge>
                  </div>
               </div>

               {/* Parent 2 */}
               <div className="space-y-4 border-l border-slate-100 pl-10">
                  <div className="flex items-center gap-2 text-secondary">
                     <UserPlus className="h-4 w-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'ولي الأمر الثاني' : 'Parent 2'}</span>
                  </div>
                  {app.parent2Name ? (
                    <div className="space-y-1">
                       <p className="text-lg font-black text-primary">{app.parent2Name}</p>
                       <p className="text-xs font-bold text-slate-500 flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {app.parent2Email}</p>
                       <p className="text-xs font-bold text-slate-500 flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {app.parent2Phone}</p>
                       <Badge variant="outline" className="mt-2 bg-slate-50 border-none font-black text-[9px] uppercase px-3">{app.relationship2}</Badge>
                    </div>
                  ) : (
                    <p className="text-xs font-bold text-slate-400 italic">Not provided</p>
                  )}
               </div>

               {/* Home Address */}
               <div className="space-y-4 border-l border-slate-100 pl-10">
                  <div className="flex items-center gap-2 text-secondary">
                     <MapPin className="h-4 w-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'عنوان السكن' : 'Physical Address'}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                     <p className="text-sm font-bold text-primary leading-relaxed">
                        {app.address?.line1}<br />
                        {app.address?.line2 && <>{app.address.line2}<br/></>}
                        <span className="text-secondary">{app.address?.city}, {app.address?.state} {app.address?.zip}</span>
                     </p>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* 3. STUDENT REVIEW QUEUE (FULL WIDTH TABLE) */}
      <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white border border-slate-100">
         <CardHeader className="bg-secondary/5 p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg"><GraduationCap className="h-5 w-5" /></div>
               <CardTitle className="text-sm font-black text-primary uppercase">{isAr ? 'مراجعة بيانات الطلاب' : 'Student Eligibility & Decision Queue'}</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <Table>
               <TableHeader className="bg-slate-50/50">
                  <TableRow className="h-14 border-none">
                     <TableHead className="text-[10px] font-black uppercase text-slate-400 pl-10 w-1/3">Full Name & Details</TableHead>
                     <TableHead className="text-[10px] font-black uppercase text-slate-400">Academic Context</TableHead>
                     <TableHead className="text-[10px] font-black uppercase text-slate-400 text-center">Eligibility Decision</TableHead>
                     <TableHead className="text-[10px] font-black uppercase text-slate-400 text-right pr-10">Administrative Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {app.students?.map((st: any, i: number) => (
                    <TableRow key={i} className="hover:bg-slate-50/30 transition-colors border-slate-50 h-24">
                       <td className="pl-10">
                          <div className="flex items-center gap-4">
                             <div className="h-10 w-10 rounded-full bg-primary/5 text-primary flex items-center justify-center font-black">{i+1}</div>
                             <div>
                                <p className="text-sm font-black text-primary">{st.firstName} {st.lastName}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{st.gender} • DOB: {st.dob}</p>
                             </div>
                          </div>
                       </td>
                       <td>
                          <p className="text-xs font-black text-secondary">Target: Grade {st.lastGrade}</p>
                          <Badge variant="outline" className="bg-white border-slate-100 text-[8px] font-black uppercase text-slate-400 mt-1">{st.status || 'NEW ENTRY'}</Badge>
                       </td>
                       <td className="text-center">
                          <Select value={st.status || 'Pending'} onValueChange={(val) => updateStudentStatus(i, val)}>
                             <SelectTrigger className="h-10 rounded-lg text-[10px] font-black uppercase border-slate-200 bg-white w-40 mx-auto shadow-sm">
                                <SelectValue />
                             </SelectTrigger>
                             <SelectContent className="rounded-xl p-1">
                                <SelectItem value="Pending" className="text-[10px] font-bold py-2.5">Pending Review</SelectItem>
                                <SelectItem value="Accepted" className="text-[10px] font-bold text-green-600 py-2.5">Accept Candidate</SelectItem>
                                <SelectItem value="Missing Docs" className="text-[10px] font-bold text-amber-600 py-2.5">Request More Docs</SelectItem>
                                <SelectItem value="Rejected" className="text-[10px] font-bold text-red-600 py-2.5">Decline Application</SelectItem>
                             </SelectContent>
                          </Select>
                       </td>
                       <td className="text-right pr-10">
                          {st.isEnrolled ? (
                            <Badge className="bg-green-100 text-green-600 border-none font-black text-[9px] py-2 px-4 rounded-xl flex items-center gap-2 w-fit ml-auto shadow-sm">
                               <BadgeCheck className="h-4 w-4" /> ENROLLED & ACTIVE
                            </Badge>
                          ) : (
                            <Button 
                              onClick={() => enrollStudent(i)} 
                              disabled={isProcessing || st.status !== 'Accepted'}
                              className="bg-primary hover:bg-secondary text-white h-11 px-6 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-primary/10 transition-all active:scale-95"
                            >
                               Provision Profile
                            </Button>
                          )}
                       </td>
                    </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>

      {/* 4. BOTTOM GRID: PROGRAMS, LOGS & ATTACHMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Program Selection Card */}
               <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-primary text-white p-10 space-y-10 relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Briefcase className="h-32 w-32" /></div>
                  <div className="space-y-2 relative z-10">
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{isAr ? 'البرنامج المختار' : 'Program Selection'}</p>
                     <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">{app.programOption}</h3>
                     <Badge className="bg-secondary text-white border-none font-black text-[9px] uppercase tracking-widest">{app.paymentTier || 'Standard'}</Badge>
                  </div>
                  <div className="space-y-2 relative z-10 pt-6 border-t border-white/5">
                     <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{isAr ? 'الرسوم الأولية' : 'Base Tuition Estimate'}</p>
                     <div className="text-5xl font-black text-secondary tracking-tighter">${app.programOption === 'weekend' ? '75' : (app.paymentTier === 'full-3-5' ? '2,850' : '1,650')}</div>
                  </div>
               </Card>

               {/* Communication Logs Card */}
               <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white border border-slate-100">
                  <CardHeader className="p-6 border-b border-slate-50 flex flex-row items-center justify-between">
                     <CardTitle className="text-[11px] font-black text-primary uppercase tracking-widest flex items-center gap-2"><Clock className="h-4 w-4 text-secondary" /> Correspondence Logs</CardTitle>
                     <Badge variant="outline" className="text-[9px] border-slate-100 text-slate-400 px-3">{app.communications?.length || 0} Events</Badge>
                  </CardHeader>
                  <CardContent className="p-6">
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
                             <p className="text-slate-300 font-bold uppercase text-[10px] tracking-widest">No communication history</p>
                          </div>
                        )}
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Verification Files (Full Height in Column) */}
         <Card className="border-none shadow-premium rounded-2xl overflow-hidden bg-white border border-slate-100 flex flex-col">
            <CardHeader className="p-6 border-b border-slate-100 bg-slate-50/30">
               <CardTitle className="text-[11px] font-black text-primary uppercase tracking-widest flex items-center gap-2"><FileCheck className="h-4 w-4 text-secondary" /> Document Artifacts</CardTitle>
               <CardDescription className="text-[10px] font-bold">Verification files uploaded by parents.</CardDescription>
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
                       <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest px-10">No artifacts were uploaded with this application.</p>
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

