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
  BadgeCheck
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

// 1. Email Templates Library (English)
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
    subject: 'Update regarding your BBA Academy Application',
    body: (data: any) => `Dear ${data.parentName},\n\nThank you for your interest in Baneen and Banaat Academy. After careful review of the application for ${data.targetStudents}, we regret to inform you that we are unable to offer admission at this time.\n\nReason: ${data.reason || 'Maximum capacity reached for the current semester.'}\n\nWe wish you and your family the very best in your educational journey.\n\nRespectfully,\nBBA Admissions Office`
  }
];

export default function EnrollmentDetailPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
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

  // Status Handlers
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

  // Enrollment Logic (Individual)
  const enrollStudent = async (studentIdx: number) => {
    if (!firestore || !app || !docRef) return;
    const student = app.students[studentIdx];
    
    if (student.isEnrolled) {
      toast({ variant: "destructive", title: isAr ? "الطالب مسجل بالفعل" : "Student already enrolled" });
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Check for duplicates
      const studentIdStr = `${id}-${studentIdx}`;
      const q = query(collection(firestore, 'students'), where('enrollmentRef', '==', studentIdStr));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        toast({ variant: "destructive", title: "Record already exists" });
        setIsProcessing(false);
        return;
      }

      // 2. Create Student Profile
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

      // 3. Mark as Enrolled in Application
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

  // Messaging Logic
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
      
      toast({ title: "Message Sent (Logged)", description: "The official correspondence has been recorded." });
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
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Accessing Secure Records...</p>
    </div>
  );

  if (!app) return <div className="p-20 text-center font-black text-red-500">ENTRY NOT FOUND</div>;

  return (
    <div className="space-y-8 pb-20">
      {/* Header Actions */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 sticky top-4 z-40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-lg bg-slate-50">
            {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          <div className="space-y-0.5">
            <h1 className="text-xl font-black text-primary truncate max-w-[200px] md:max-w-none">{app.parent1Name}</h1>
            <div className="flex items-center gap-2">
               <Badge className="bg-secondary/10 text-secondary border-none font-black text-[9px] uppercase">{app.status}</Badge>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{id}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Main App Status Control */}
          <Select value={app.status} onValueChange={updateAppStatus}>
             <SelectTrigger className="h-11 rounded-lg border-slate-200 font-black text-[10px] uppercase w-full md:w-44 bg-white shadow-sm">
                <Layers className="h-3.5 w-3.5 mr-2 text-secondary" />
                <SelectValue />
             </SelectTrigger>
             <SelectContent className="rounded-xl p-1">
                <SelectItem value="submitted" className="font-bold py-2.5">New Application</SelectItem>
                <SelectItem value="reviewed" className="font-bold py-2.5">Under Review</SelectItem>
                <SelectItem value="missing_info" className="font-bold py-2.5 text-amber-600">Awaiting Info</SelectItem>
                <SelectItem value="partially_accepted" className="font-bold py-2.5 text-blue-600">Partially Accepted</SelectItem>
                <SelectItem value="approved" className="font-bold py-2.5 text-green-600">Completed</SelectItem>
                <SelectItem value="rejected" className="font-bold py-2.5 text-red-600">Rejected</SelectItem>
             </SelectContent>
          </Select>

          {/* Messaging Dialog */}
          <Dialog open={isMsgOpen} onOpenChange={setIsMsgOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-white h-11 px-6 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/10 gap-2">
                <MessageSquare className="h-4 w-4 text-secondary" />
                {isAr ? 'تواصل مع العائلة' : 'Send Message'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-xl border-none p-0 overflow-hidden shadow-2xl">
              <div className="bg-primary p-6 text-white flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center"><Mail className="h-6 w-6 text-secondary" /></div>
                 <div>
                    <DialogTitle className="text-xl font-black uppercase tracking-tight">Official Correspondence</DialogTitle>
                    <DialogDescription className="text-white/60 font-bold text-xs">Direct communication with ${app.parent1Email}</DialogDescription>
                 </div>
              </div>
              <div className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">1. Select Template</label>
                    <Select onValueChange={(val) => setSelectedTemplate(EMAIL_TEMPLATES.find(t => t.id === val) || EMAIL_TEMPLATES[0])}>
                       <SelectTrigger className="h-12 rounded-lg font-bold border-slate-100 bg-slate-50">
                          <SelectValue placeholder="Choose a template..." />
                       </SelectTrigger>
                       <SelectContent>
                          {EMAIL_TEMPLATES.map(t => <SelectItem key={t.id} value={t.id} className="font-bold">{t.label}</SelectItem>)}
                       </SelectContent>
                    </Select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">2. Detailed Reason / Additional Info (Optional)</label>
                    <Textarea 
                      value={msgReason} 
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Type details about missing docs or rejection reasons here..." 
                      className="min-h-[100px] bg-slate-50 border-none rounded-xl font-bold"
                    />
                 </div>

                 <div className="bg-slate-900 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Preview (Final Result in English)</span>
                       <Badge variant="outline" className="border-secondary text-secondary text-[8px] font-black uppercase">Official BBA Layout</Badge>
                    </div>
                    <div className="space-y-3">
                       <p className="text-xs font-black text-secondary">Subject: {selectedTemplate.subject}</p>
                       <p className="text-[11px] text-white/70 whitespace-pre-wrap font-medium leading-relaxed italic">
                         {selectedTemplate.body({ 
                            parentName: app.parent1Name, 
                            appId: id, 
                            studentCount: app.students.length,
                            acceptedStudents: app.students.filter((s: any) => s.status === 'Accepted').map((s: any) => `• ${s.firstName} ${s.lastName}`).join('\n'),
                            targetStudents: app.students.map((s: any) => `${s.firstName} ${s.lastName}`).join(', '),
                            reason: msgReason || '...' 
                         })}
                       </p>
                    </div>
                 </div>
              </div>
              <DialogFooter className="bg-slate-50 p-6">
                 <Button variant="ghost" onClick={() => setIsMsgOpen(false)} className="font-black text-[10px] uppercase">Cancel</Button>
                 <Button onClick={handleSendMessage} disabled={isProcessing} className="bg-primary text-white px-8 rounded-lg h-12 font-black shadow-xl">
                    {isProcessing ? <Clock className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                    Confirm & Log Message
                 </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Forms & Data */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Guardian Info Card */}
          <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white border border-slate-100">
             <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg"><Users className="h-5 w-5" /></div>
                   <CardTitle className="text-sm font-black text-primary uppercase tracking-tight">Family Contacts & Residence</CardTitle>
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <Table>
                   <TableHeader className="bg-slate-50/30">
                      <TableRow className="h-12">
                         <TableHead className="text-[9px] font-black uppercase text-slate-400 pl-8">#</TableHead>
                         <TableHead className="text-[9px] font-black uppercase text-slate-400">Guardian Name</TableHead>
                         <TableHead className="text-[9px] font-black uppercase text-slate-400">Email & Phone</TableHead>
                         <TableHead className="text-[9px] font-black uppercase text-slate-400">Relationship</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      <TableRow>
                         <td className="py-5 pl-8 text-xs font-black text-slate-300">01</td>
                         <td className="py-5"><p className="text-sm font-black text-primary">{app.parent1Name}</p></td>
                         <td className="py-5">
                            <p className="text-xs font-bold text-slate-600">{app.parent1Email}</p>
                            <p className="text-[10px] font-bold text-slate-400" dir="ltr">{app.parent1Phone}</p>
                         </td>
                         <td className="py-5"><Badge variant="outline" className="text-[8px] font-black uppercase bg-slate-50 border-none">{app.relationship1}</Badge></td>
                      </TableRow>
                      {app.parent2Name && (
                        <TableRow>
                           <td className="py-5 pl-8 text-xs font-black text-slate-300">02</td>
                           <td className="py-5"><p className="text-sm font-black text-primary">{app.parent2Name}</p></td>
                           <td className="py-5">
                              <p className="text-xs font-bold text-slate-600">{app.parent2Email}</p>
                              <p className="text-[10px] font-bold text-slate-400" dir="ltr">{app.parent2Phone}</p>
                           </td>
                           <td className="py-5"><Badge variant="outline" className="text-[8px] font-black uppercase bg-slate-50 border-none">{app.relationship2}</Badge></td>
                        </TableRow>
                      )}
                   </TableBody>
                </Table>
                
                {/* Verified Address Sub-section */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                   <div className="flex flex-col md:flex-row items-start md:items-center gap-8 bg-white p-6 rounded-xl border border-slate-100 shadow-inner">
                      <div className="flex items-center gap-3 shrink-0">
                         <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center"><MapPin className="h-5 w-5" /></div>
                         <div className="space-y-0.5">
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Residence</span>
                            <p className="text-xs font-black text-primary">Verified Address</p>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-[11px] font-bold text-slate-600">
                         <div className="space-y-1"><span className="text-[8px] uppercase text-slate-400">Street 1</span><p className="text-primary truncate">{app.address?.line1 || '-'}</p></div>
                         <div className="space-y-1"><span className="text-[8px] uppercase text-slate-400">Street 2</span><p className="text-primary truncate">{app.address?.line2 || '-'}</p></div>
                         <div className="space-y-1"><span className="text-[8px] uppercase text-slate-400">City</span><p className="text-primary truncate">{app.address?.city || '-'}</p></div>
                         <div className="space-y-1"><span className="text-[8px] uppercase text-slate-400">State</span><p className="text-primary truncate">{app.address?.state || '-'}</p></div>
                         <div className="space-y-1"><span className="text-[8px] uppercase text-slate-400">ZIP</span><p className="text-secondary font-black">{app.address?.zip || '-'}</p></div>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* Student Roster Card */}
          <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white border border-slate-100">
             <CardHeader className="bg-secondary/5 p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg"><GraduationCap className="h-5 w-5" /></div>
                   <CardTitle className="text-sm font-black text-primary uppercase tracking-tight">Sibling Academic Profiles</CardTitle>
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <Table>
                   <TableHeader className="bg-slate-50/30">
                      <TableRow className="h-12">
                         <TableHead className="text-[9px] font-black uppercase text-slate-400 pl-8">Full Name</TableHead>
                         <TableHead className="text-[9px] font-black uppercase text-slate-400">Academic Info</TableHead>
                         <TableHead className="text-[9px] font-black uppercase text-slate-400 text-center">Status</TableHead>
                         <TableHead className="text-[9px] font-black uppercase text-slate-400 text-right pr-8">Actions</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {app.students.map((st: any, i: number) => (
                        <TableRow key={i} className="hover:bg-slate-50/30 transition-colors">
                           <td className="py-6 pl-8">
                              <div className="flex items-center gap-3">
                                 <div className="h-9 w-9 rounded-lg bg-primary/5 text-primary flex items-center justify-center font-black text-xs">{i+1}</div>
                                 <div>
                                    <p className="text-sm font-black text-primary">{st.firstName} {st.middleName} {st.lastName}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">{st.gender} • {st.dob}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="py-6">
                              <p className="text-xs font-black text-secondary">Grade {st.lastGrade}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase">{st.status || 'New Student'}</p>
                           </td>
                           <td className="py-6 text-center">
                              <Select value={st.status || 'Pending'} onValueChange={(val) => updateStudentStatus(i, val)}>
                                 <SelectTrigger className="h-8 rounded-md text-[8px] font-black uppercase border-slate-100 bg-white w-28 mx-auto">
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent className="rounded-lg p-1">
                                    <SelectItem value="Pending" className="text-[9px] font-bold">Pending Review</SelectItem>
                                    <SelectItem value="Accepted" className="text-[9px] font-bold text-green-600">Accepted</SelectItem>
                                    <SelectItem value="Missing Docs" className="text-[9px] font-bold text-amber-600">Missing Docs</SelectItem>
                                    <SelectItem value="Rejected" className="text-[9px] font-bold text-red-600">Rejected</SelectItem>
                                 </SelectContent>
                              </Select>
                           </td>
                           <td className="py-6 text-right pr-8">
                              {st.isEnrolled ? (
                                <Badge className="bg-green-100 text-green-600 border-none font-black text-[8px] py-1.5 px-3 rounded-lg flex items-center gap-2 w-fit ml-auto">
                                   <BadgeCheck className="h-3 w-3" /> ENROLLED
                                </Badge>
                              ) : (
                                <Button 
                                  onClick={() => enrollStudent(i)} 
                                  disabled={isProcessing || st.status !== 'Accepted'}
                                  className="bg-primary hover:bg-secondary text-white h-9 px-4 rounded-lg font-black text-[9px] uppercase shadow-lg shadow-primary/10"
                                >
                                   Create Profile
                                </Button>
                              )}
                           </td>
                        </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </CardContent>
          </Card>
        </div>

        {/* Right Column: Summaries & Files */}
        <div className="space-y-8">
           {/* Program Selection Card */}
           <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-primary text-white p-8 space-y-6 relative">
              <div className="absolute top-0 right-0 p-6 opacity-10"><Briefcase className="h-24 w-24" /></div>
              <div className="space-y-1 relative z-10">
                 <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Enrolling Path</p>
                 <h3 className="text-xl font-black uppercase tracking-tight">{app.programOption}</h3>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div className="space-y-2 relative z-10">
                 <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Projected One-Time Payment</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-secondary">${app.programOption === 'weekend' ? '75' : (app.paymentTier === 'full-3-5' ? '2,850' : '1,650')}</span>
                    <span className="text-[9px] font-bold text-white/30 uppercase">{app.programOption === 'weekend' ? '/ month' : '/ reg'}</span>
                 </div>
              </div>
           </Card>

           {/* Communication Logs Card */}
           <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white border border-slate-100">
              <CardHeader className="p-6 border-b border-slate-50 flex flex-row items-center justify-between">
                 <CardTitle className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-secondary" /> History Logs</CardTitle>
                 <Badge variant="outline" className="text-[8px] border-slate-100 text-slate-400">{app.communications?.length || 0} Events</Badge>
              </CardHeader>
              <CardContent className="p-6">
                 <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                    {app.communications?.length > 0 ? app.communications.map((log: any, idx: number) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 group">
                         <div className="h-9 w-9 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0"><Mail className="h-4 w-4 text-slate-300 group-hover:text-secondary transition-colors" /></div>
                         <div className="space-y-1 flex-1">
                            <div className="flex justify-between items-start">
                               <p className="text-[10px] font-black text-primary uppercase">{log.templateId}</p>
                               <span className="text-[8px] font-bold text-slate-400 uppercase">{format(new Date(log.sentAt), 'MMM dd')}</span>
                            </div>
                            <p className="text-[10px] font-medium text-slate-500 line-clamp-1">{log.subject}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-1 italic">By: {log.sender}</p>
                         </div>
                      </div>
                    )) : (
                      <div className="py-12 text-center space-y-3">
                         <Info className="h-8 w-8 text-slate-100 mx-auto" />
                         <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No previous correspondence</p>
                      </div>
                    )}
                 </div>
              </CardContent>
           </Card>

           {/* Attachments Card */}
           <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white border border-slate-100">
              <CardHeader className="p-6 border-b border-slate-50">
                 <CardTitle className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2"><FileCheck className="h-3.5 w-3.5 text-secondary" /> Verified Artifacts</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-slate-50">
                    {app.files?.length > 0 ? app.files.map((file: any, idx: number) => (
                      <div key={idx} className="p-5 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                         <div className="flex items-center gap-4">
                            {file.type?.startsWith('image/') || file.data?.startsWith('data:image/') ? (
                              <div className="h-12 w-12 rounded-lg border-2 border-white shadow-sm overflow-hidden shrink-0"><img src={file.data} className="h-full w-full object-cover" alt="preview" /></div>
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0"><FileText className="h-4 w-4 text-slate-400" /></div>
                            )}
                            <div className="min-w-0">
                               <p className="text-[10px] font-black text-primary truncate max-w-[120px]">{file.name}</p>
                               <p className="text-[8px] font-bold text-slate-400 uppercase">{file.type?.split('/')[1] || 'DOC'}</p>
                            </div>
                         </div>
                         <Button onClick={() => window.open(file.data, '_blank')} variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-300 hover:text-secondary hover:bg-white transition-all"><ExternalLink className="h-4 w-4" /></Button>
                      </div>
                    )) : (
                      <div className="py-20 text-center text-slate-300 font-bold uppercase text-[9px]">No Digital Artifacts</div>
                    )}
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
