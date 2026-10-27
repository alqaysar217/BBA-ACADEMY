
'use client';

import { useState, useEffect, use, useMemo, useRef } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Save, 
  User, 
  GraduationCap, 
  FileText, 
  Plus, 
  AlertCircle, 
  Loader2, 
  ChevronDown, 
  UserCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Building, 
  Hash, 
  Calendar as CalendarIcon, 
  ShieldCheck,
  Type,
  Briefcase,
  UserPlus,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  Send,
  BookOpen,
  Calendar,
  Star,
  Info,
  DollarSign,
  Clock,
  Languages,
  CheckCircle2,
  X,
  FileCheck,
  WifiOff,
  CloudOff,
  FileUp,
  FileWarning,
  Eye,
  CreditCard,
  Search,
  PencilLine,
  Copy,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useUser } from '@/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

const steps = [
  { id: 1, name: { en: 'Parent Information', ar: 'بيانات ولي الأمر' } },
  { id: 2, name: { en: 'Student Information', ar: 'بيانات الطلاب' } },
  { id: 3, name: { en: 'Program & Tuition', ar: 'البرنامج والرسوم' } },
  { id: 4, name: { en: 'Documents & Submission', ar: 'المستندات والارسال' } },
];

const usStates = [
  { en: "Alabama", ar: "ألاباما" }, { en: "Alaska", ar: "ألاسكا" }, { en: "Arizona", ar: "أريزونا" },
  { en: "Arkansas", ar: "أركنساس" }, { en: "California", ar: "كاليفورنيا" }, { en: "Colorado", ar: "كولورادو" },
  { en: "Connecticut", ar: "كونيتيكت" }, { en: "Delaware", ar: "ديلاوير" }, { en: "Florida", ar: "فلوريدا" },
  { en: "Georgia", ar: "جورجيا" }, { en: "Hawaii", ar: "هاواي" }, { en: "Idaho", ar: "أيداهو" },
  { en: "Illinois", ar: "إلينوي" }, { en: "Indiana", ar: "إنديانا" }, { en: "Iowa", ar: "أيوا" },
  { en: "Kansas", ar: "كانساس" }, { en: "Kentucky", ar: "كنتاكي" }, { en: "Louisiana", ar: "لويزيانا" },
  { en: "Maine", ar: "مين" }, { en: "Maryland", ar: "ماريلاند" }, { en: "Massachusetts", ar: "ماساتشوستس" },
  { en: "Michigan", ar: "ميشيغان" }, { en: "Minnesota", ar: "مينيسوتا" }, { en: "Mississippi", ar: "ميسيسيبي" },
  { en: "Missouri", ar: "ميزوري" }, { en: "Montana", ar: "مونتانا" }, { en: "Nebraska", ar: "نبراسكا" },
  { en: "Nevada", ar: "نيفادا" }, { en: "New Hampshire", ar: "نيو هامبشاير" }, { en: "New Jersey", ar: "نيو جيرسي" },
  { en: "New Mexico", ar: "نيو مكسيكو" }, { en: "New York", ar: "نيويورك" }, { en: "North Carolina", ar: "نورث كارولاينا" },
  { en: "North Dakota", ar: "نورث داكوتا" }, { en: "Ohio", ar: "أوهايو" }, { en: "Oklahoma", ar: "أوكلاهوما" },
  { en: "Oregon", ar: "أوريغون" }, { en: "Pennsylvania", ar: "بنسيلفانيا" }, { en: "Rhode Island", ar: "رود آيلاند" },
  { en: "South Carolina", ar: "سوث كارولاينا" }, { en: "South Dakota", ar: "سوث داكوتا" }, { en: "Tennessee", ar: "تينيسي" },
  { en: "Texas", ar: "تكساس" }, { en: "Utah", ar: "يوتا" }, { en: "Vermont", ar: "فيرمونت" },
  { en: "Virginia", ar: "فيرجينيا" }, { en: "Washington", ar: "واشنطن" }, { en: "West Virginia", ar: "فرجينيا الغربية" },
  { en: "Wisconsin", ar: "ويسكونسن" }, { en: "Wyoming", ar: "وايومنغ" }
];

const relationships = [
  { value: 'mother', label: { en: 'Mother', ar: 'الأم' } },
  { value: 'father', label: { en: 'Father', ar: 'الأب' } },
  { value: 'guardian', label: { en: 'Legal Guardian', ar: 'وصي قانوني' } },
];

const gradeLevels = [
  { value: '3', label: 'Grade 3' },
  { value: '4', label: 'Grade 4' },
  { value: '5', label: 'Grade 5' },
  { value: '6', label: 'Grade 6' },
  { value: '7', label: 'Grade 7' },
  { value: '8', label: 'Grade 8' },
  { value: '9', label: 'Grade 9' },
  { value: '10', label: 'Grade 10' },
  { value: '11', label: 'Grade 11' },
  { value: '12', label: 'Grade 12' },
];

export default function EnrollmentPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const { user } = useUser();
  const firestore = useFirestore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const [openParent, setOpenParent] = useState<'p1' | 'p2'>('p1');
  const [openStudentIdx, setOpenStudentIdx] = useState<number>(0);

  const [attemptedNext, setAttemptedNext] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<any>({
    parent1Name: '',
    parent1Phone: '',
    parent1Email: '',
    relationship1: '',
    parent2Name: '',
    parent2Phone: '',
    parent2Email: '',
    relationship2: '',
    address: { line1: '', line2: '', city: '', state: '', zip: '' },
    siblingCount: '1',
    students: [{ status: '', firstName: '', middleName: '', lastName: '', dob: '', gender: '', phone: '', email: '', lastGrade: '' }],
    programOption: '',
    paymentTier: '',
    languageOption: '',
    files: []
  });

  useEffect(() => {
    setMounted(true);
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateField = (field: string, value: any) => setFormData((p: any) => ({ ...p, [field]: value }));
  const updateAddress = (field: string, value: any) => setFormData((p: any) => ({ ...p, address: { ...p.address, [field]: value } }));
  const updateStudent = (idx: number, field: string, value: any) => {
    const s = [...formData.students];
    s[idx] = { ...s[idx], [field]: value };
    setFormData((p: any) => ({ ...p, students: s }));
  };

  const validateStep = (id: number) => {
    if (id === 1) return formData.parent1Name && formData.parent1Phone && formData.parent1Email && formData.address.line1 && formData.address.city && formData.address.state && formData.address.zip;
    if (id === 2) return formData.students.every((s: any) => s.firstName && s.lastName && s.dob && s.gender && s.lastGrade);
    if (id === 3) return !!formData.programOption;
    if (id === 4) return formData.files.length > 0;
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setAttemptedNext(false);
      setCurrentStep(s => s + 1);
      window.scrollTo(0, 0);
    } else {
      setAttemptedNext(true);
      toast({ variant: "destructive", title: isAr ? "بيانات ناقصة" : "Missing Info", description: isAr ? "يرجى ملء الحقول المطلوبة." : "Fill required fields." });
    }
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    setIsProcessingFile(true);
    const newFiles = [...formData.files];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise(r => reader.onload = r);
      newFiles.push({ name: file.name, data: reader.result });
    }
    updateField('files', newFiles);
    setIsProcessingFile(false);
  };

  const handleSubmit = async () => {
    if (!firestore) return;
    setIsSubmitting(true);
    const docRef = doc(collection(firestore, 'enrollments'));
    const finalData = { ...formData, status: 'submitted', submittedAt: serverTimestamp(), updatedAt: serverTimestamp() };
    setSubmissionId(docRef.id);

    setDoc(docRef, finalData)
      .then(() => setIsSubmitted(true))
      .catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'write', requestResourceData: finalData }));
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <section className="bg-primary pt-12 pb-20 text-center space-y-4 px-4">
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">{isAr ? 'تسجيل الطلاب' : 'Enrollment'}</h1>
        <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
      </section>

      <div className="container-tight -mt-10 px-4">
        <Card className="border-none shadow-2xl rounded-xl overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b p-6">
             <div className="flex justify-between items-center">
                {steps.map(s => (
                  <div key={s.id} className={cn("h-10 w-10 rounded-lg flex items-center justify-center font-black transition-all", currentStep >= s.id ? "bg-secondary text-white" : "bg-white border text-slate-300")}>
                    {currentStep > s.id ? <Check className="h-5 w-5" /> : s.id}
                  </div>
                ))}
             </div>
          </CardHeader>
          <CardContent className="p-6 md:p-10 space-y-10">
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name *</Label>
                    <Input value={formData.parent1Name} onChange={e => updateField('parent1Name', e.target.value)} className="h-12 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone *</Label>
                    <Input value={formData.parent1Phone} onChange={e => updateField('parent1Phone', e.target.value)} className="h-12 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email *</Label>
                    <Input value={formData.parent1Email} onChange={e => updateField('parent1Email', e.target.value)} className="h-12 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">State *</Label>
                    <Select value={formData.address.state} onValueChange={v => updateAddress('state', v)}>
                      <SelectTrigger className="h-12 rounded-lg"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {usStates.map(s => <SelectItem key={s.en} value={s.en}>{s.en}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Address *</Label>
                  <Input value={formData.address.line1} onChange={e => updateAddress('line1', e.target.value)} className="h-12 rounded-lg" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in">
                {formData.students.map((s: any, i: number) => (
                  <div key={i} className="p-6 border rounded-xl space-y-6">
                    <div className="font-black uppercase text-primary">Student {i+1}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input placeholder="First Name" value={s.firstName} onChange={e => updateStudent(i, 'firstName', e.target.value)} className="h-12" />
                      <Input placeholder="Last Name" value={s.lastName} onChange={e => updateStudent(i, 'lastName', e.target.value)} className="h-12" />
                      <Input type="date" value={s.dob} onChange={e => updateStudent(i, 'dob', e.target.value)} className="h-12" />
                      <Select value={s.lastGrade} onValueChange={v => updateStudent(i, 'lastGrade', v)}>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Grade" /></SelectTrigger>
                        <SelectContent>{gradeLevels.map(g => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
                {['grades-3-5', 'grades-6-12', 'weekend'].map(opt => (
                  <div key={opt} onClick={() => updateField('programOption', opt)} className={cn("p-6 border-2 rounded-xl cursor-pointer transition-all", formData.programOption === opt ? "border-secondary bg-secondary/5" : "border-slate-100")}>
                    <div className="font-black uppercase text-primary mb-2">{opt}</div>
                    <div className="text-[10px] text-slate-400 font-bold">Remote Online Program</div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8 animate-in fade-in">
                <div onClick={() => fileInputRef.current?.click()} className="p-16 border-2 border-dashed rounded-xl flex flex-col items-center gap-4 cursor-pointer hover:bg-slate-50">
                  <Upload className="h-10 w-10 text-slate-300" />
                  <span className="font-black text-slate-400">Click to upload documents (ID, Report Cards)</span>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" multiple onChange={e => handleFileSelect(e.target.files)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.files.map((f: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-lg flex justify-between items-center">
                      <span className="text-xs font-bold truncate w-40">{f.name}</span>
                      <X className="h-4 w-4 cursor-pointer" onClick={() => updateField('files', formData.files.filter((_:any, i:number) => i !== idx))} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-10">
              {currentStep > 1 && <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} className="h-14 flex-1 rounded-xl font-black">Back</Button>}
              <Button onClick={currentStep < 4 ? handleNext : handleSubmit} disabled={isSubmitting} className="h-14 flex-[2] bg-secondary text-white rounded-xl font-black">
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (currentStep < 4 ? 'Continue' : 'Submit Application')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
