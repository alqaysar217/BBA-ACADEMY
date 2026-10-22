
'use client';

import { useState, useEffect, useRef } from 'react';
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
  Send,
  BookOpen,
  Calendar,
  Eye,
  CreditCard,
  X,
  FileCheck,
  WifiOff,
  FileUp,
  PencilLine
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useUser } from '@/firebase';
import { addDoc, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { SuccessView } from './SuccessView';
import { EnrollmentData, Student } from './types';

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
  { en: "Georgia", ar: "جورجيا" }, { en: "Hawaii", ar: "هواوي" }, { en: "Idaho", ar: "أيداهو" },
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
  { value: 'brother', label: { en: 'Brother', ar: 'الأخ' } },
  { value: 'sister', label: { en: 'Sister', ar: 'الأخت' } },
  { value: 'guardian', label: { en: 'Legal Guardian', ar: 'وصي قانوني' } },
  { value: 'other', label: { en: 'Other', ar: 'غير ذلك' } },
];

const gradeLevels = [
  { value: 'K', label: 'Kindergarten (K)' },
  { value: '1', label: 'Grade 1' },
  { value: '2', label: 'Grade 2' },
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

export function EnrollmentClient({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar';
  const { user } = useUser();
  const firestore = useFirestore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const [openParent, setOpenParent] = useState<'p1' | 'p2'>('p1');
  const [openStudentIdx, setOpenStudentIdx] = useState<number>(0);
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialFormData: EnrollmentData = {
    parent1Name: '',
    parent1Phone: '',
    parent1Email: '',
    relationship1: '',
    parent2Name: '',
    parent2Phone: '',
    parent2Email: '',
    relationship2: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    },
    siblingCount: '1', 
    students: [{
      status: '', 
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      gender: '',
      phone: '',
      email: '',
      lastGrade: '',
    }],
    programFormat: 'online', 
    programOption: '', 
    paymentTier: '',
    languageOption: '',
    weekendTerm: '',
    weekendSlot: '',
    files: [] 
  };

  const [formData, setFormData] = useState<EnrollmentData>(initialFormData);

  useEffect(() => {
    setMounted(true);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // PERSISTENCE: Load from localStorage
  useEffect(() => {
    if (!mounted) return;
    const savedDraft = localStorage.getItem('bba_enrollment_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(prev => ({ ...prev, ...parsed }));
        const savedStep = localStorage.getItem('bba_last_step');
        if (savedStep) setCurrentStep(parseInt(savedStep));
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, [mounted]);

  // PERSISTENCE: Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('bba_enrollment_draft', JSON.stringify(formData));
      localStorage.setItem('bba_last_step', currentStep.toString());
    }
  }, [formData, currentStep, mounted]);

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateAddress = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
  };

  const updateStudent = (index: number, field: string, value: any) => {
    const newStudents = [...formData.students];
    newStudents[index] = { ...newStudents[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, students: newStudents }));
  };

  const validateStep = (stepId: number) => {
    if (stepId === 1) {
      const p1 = formData.parent1Name?.trim() && formData.parent1Phone?.trim() && formData.parent1Email?.trim() && formData.relationship1;
      const p2 = formData.parent2Name?.trim() && formData.parent2Phone?.trim() && formData.parent2Email?.trim() && formData.relationship2;
      const addr = formData.address.line1?.trim() && formData.address.city?.trim() && formData.address.state && formData.address.zip?.trim();
      return !!(p1 && p2 && addr); // STRICT: Both parents mandatory
    }
    if (stepId === 2) {
      return formData.students.length > 0 && formData.students.every((st: any) => 
        st.status && st.firstName?.trim() && st.lastName?.trim() && st.dob && st.gender && st.lastGrade && st.phone?.trim() && st.email?.trim()
      );
    }
    if (stepId === 3) {
      const basic = !!formData.programOption;
      if (!basic) return false;
      if (formData.programOption === 'grades-3-5') return !!formData.paymentTier;
      if (formData.programOption === 'grades-6-12') return !!formData.languageOption && !!formData.paymentTier;
      if (formData.programOption === 'weekend') return !!formData.weekendSlot;
      return true;
    }
    if (stepId === 4) {
      return Array.isArray(formData.files) && formData.files.length > 0;
    }
    return true;
  };

  const isFieldInvalid = (value: any) => {
    return attemptedNext && (!value || (typeof value === 'string' && value.trim() === ''));
  };

  const handleSiblingCountChange = (count: string) => {
    const n = parseInt(count);
    let newStudents = [...formData.students];
    
    if (n < newStudents.length) {
      if (!confirm(isAr ? 'سيتم حذف بيانات الطلاب الإضافيين المسجلة، هل تود الاستمرار؟' : 'Data for extra students will be removed, do you want to continue?')) {
        return;
      }
      newStudents = newStudents.slice(0, n);
    } else if (n > newStudents.length) {
      for (let i = newStudents.length; i < n; i++) {
        newStudents.push({
          status: '', 
          firstName: '',
          middleName: '',
          lastName: '',
          dob: '',
          gender: '',
          phone: '',
          email: '',
          lastGrade: '',
        });
      }
    }
    
    setFormData((prev: any) => ({ ...prev, siblingCount: count, students: newStudents }));
    setOpenStudentIdx(0);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setAttemptedNext(false);
      if (currentStep < 4) setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setAttemptedNext(true);
      if (currentStep === 1) {
        // Auto-open Parent 2 if 1 is valid but 2 is missing
        const p1Valid = formData.parent1Name?.trim() && formData.parent1Phone?.trim() && formData.parent1Email?.trim() && formData.relationship1;
        if (p1Valid) setOpenParent('p2');
      }
      toast({
        variant: "destructive",
        title: isAr ? "بيانات ناقصة" : "Missing Information",
        description: isAr ? "يرجى تعبئة كافة الحقول المطلوبة باللون الأحمر للمتابعة." : "Please fill in all required fields marked in red to continue.",
      });
    }
  };

  const saveDraft = async () => {
    if (!firestore) return;
    setIsSavingDraft(true);
    
    const draftData = {
      ...formData,
      status: 'draft',
      updatedAt: serverTimestamp(),
      userId: user?.uid || 'anonymous',
      lastStep: currentStep,
      lang
    };

    try {
      const draftId = localStorage.getItem('bba_draft_id');
      if (draftId) {
        await setDoc(doc(firestore, 'enrollments', draftId), draftData, { merge: true });
      } else {
        const docRef = await addDoc(collection(firestore, 'enrollments'), draftData);
        localStorage.setItem('bba_draft_id', docRef.id);
      }
      
      toast({
        title: isAr ? 'تم حفظ المسودة' : 'Draft Saved',
        description: isAr ? 'تم تأمين بياناتك سحابياً ومحلياً.' : 'Your data is secured in the cloud and locally.',
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: isAr ? "خطأ في الحفظ" : "Save Error",
        description: isAr ? "فشل حفظ المسودة سحابياً." : "Failed to save draft to cloud.",
      });
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleSubmit = async () => {
    if (!firestore) return;
    if (!isOnline) {
      toast({ variant: "destructive", title: isAr ? "لا يمكن الإرسال حالياً" : "Submission Unavailable" });
      return;
    }

    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      setAttemptedNext(true);
      toast({ variant: "destructive", title: isAr ? "خطأ في الإرسال" : "Submission Error" });
      return;
    }

    setIsSubmitting(true);
    try {
      const finalData = { ...formData, status: 'submitted', submittedAt: serverTimestamp(), userId: user?.uid || 'anonymous', lang };
      const docRef = await addDoc(collection(firestore, 'enrollments'), finalData);
      setSubmissionId(docRef.id);
      
      // CLEAR ALL LOCAL DATA ON SUCCESS
      localStorage.removeItem('bba_enrollment_draft');
      localStorage.removeItem('bba_draft_id');
      localStorage.removeItem('bba_last_step');
      
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessingFile(true);
    const newFilesList = [...(formData.files || [])];
    try {
      for (let i = 0; i < files.length; i++) {
        if (newFilesList.length >= 15) break;
        const file = files[i];
        const base64Data = await fileToBase64(file);
        newFilesList.push({ name: file.name, type: file.type, size: file.size, data: base64Data });
      }
      setFormData((prev: any) => ({ ...prev, files: newFilesList }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const getWeekendTuition = (count: string) => {
    const n = parseInt(count) || 1;
    if (n === 1) return { monthly: 75, term: 225 };
    if (n === 2) return { monthly: 70, term: 420 };
    if (n === 3) return { monthly: 65, term: 585 };
    return { monthly: 60, term: 720 };
  };

  if (isSubmitted) return <SuccessView isAr={isAr} lang={lang} submissionId={submissionId} />;

  const availablePrograms = [
    { id: 'grades-3-5', title: isAr ? 'برنامج الصفوف 3-5 (عن بعد)' : 'Grades 3–5 Remote Program', desc: isAr ? 'تأسيس للمرحلة الابتدائية مع القرآن والعربية والمواد الأكاديمية.' : 'Elementary foundation building for Quran, Arabic and academics.', image: '/program-1.png', icon: BookOpen, color: 'secondary' },
    { id: 'grades-6-12', title: isAr ? 'برنامج الصفوف 6-12 (عن بعد)' : 'Grades 6–12 Remote Program', desc: isAr ? 'أكاديميات المرحلة المتوسطة والثانوية مع تعليم مرن عبر الإنترنت.' : 'Middle and high school academics with flexible online learning.', image: '/program-2.png', icon: GraduationCap, color: 'primary' },
    { id: 'weekend', title: isAr ? 'برنامج عطلة نهاية الأسبوع (عن بعد)' : 'Weekend Program (Remote)', desc: isAr ? 'إثراء أيام السبت والأحد لتعزيز الهوية الإسلامية واللغة.' : 'Saturday/Sunday enrichment to strengthen Islamic identity.', image: '/program-3.png', icon: Calendar, color: 'accent' }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {mounted && !isOnline && (
        <div className="bg-red-600 text-white py-2 px-4 flex items-center justify-center gap-3 sticky top-20 z-[55]">
          <WifiOff className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-widest">{isAr ? 'بدون اتصال' : 'Offline'}</span>
        </div>
      )}

      <section className="bg-primary pt-12 pb-16 relative overflow-hidden">
        <div className="container-tight text-center space-y-4 px-4 relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {isAr ? 'تسجيل الطلاب الجدد' : 'Student Enrollment'}
            </h1>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full" />
          </div>
        </div>
      </section>

      <div className="container-tight -mt-8 relative z-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-white/95 backdrop-blur-md border-none shadow-2xl rounded-2xl p-4 md:p-6">
            <div className="relative flex justify-between items-center px-4" dir={isAr ? 'rtl' : 'ltr'}>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
              {steps.map((step) => (
                <button key={step.id} onClick={() => { if(step.id < currentStep) setCurrentStep(step.id) }} className="relative z-10">
                  <div className={cn(
                    "w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 transition-all",
                    currentStep === step.id ? "bg-secondary border-secondary text-white scale-110 shadow-xl" : 
                    currentStep > step.id ? "bg-primary border-primary text-white" : "bg-white border-slate-200 text-slate-400"
                  )}>
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : <span className="font-black text-sm md:text-lg">{step.id}</span>}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-none shadow-2xl rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 md:p-6">
              <CardTitle className="text-sm md:text-2xl font-black text-primary uppercase">
                {steps[currentStep-1].name[lang]}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 md:p-10">
              {currentStep === 1 && (
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="font-black text-primary border-l-4 border-secondary pl-4 uppercase tracking-widest text-sm mb-6">
                      {isAr ? 'بيانات أولياء الأمور (كلاهما إلزامي)' : 'Parent Details (Both Required)'}
                    </h3>
                    
                    <div className={cn("rounded-2xl border transition-all p-6", openParent === 'p1' ? "border-secondary bg-secondary/5" : "border-slate-100 cursor-pointer")} onClick={() => setOpenParent('p1')}>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <UserCircle2 className={cn("h-5 w-5", openParent === 'p1' ? "text-secondary" : "text-slate-400")} />
                          <span className="font-black text-primary">{isAr ? 'ولي الأمر الأول' : 'Parent 1'}</span>
                        </div>
                      </div>
                      {openParent === 'p1' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-2">
                            <Label className={isFieldInvalid(formData.parent1Name) ? "text-red-500" : ""}>{isAr ? 'الاسم الكامل *' : 'Full Name *'}</Label>
                            <Input value={formData.parent1Name} onChange={(e) => updateField('parent1Name', e.target.value)} className={isFieldInvalid(formData.parent1Name) ? "border-red-500" : ""} />
                          </div>
                          <div className="space-y-2">
                            <Label className={isFieldInvalid(formData.parent1Phone) ? "text-red-500" : ""}>{isAr ? 'رقم الهاتف *' : 'Phone Number *'}</Label>
                            <Input value={formData.parent1Phone} onChange={(e) => updateField('parent1Phone', e.target.value)} className={isFieldInvalid(formData.parent1Phone) ? "border-red-500" : ""} />
                          </div>
                          <div className="space-y-2">
                            <Label className={isFieldInvalid(formData.parent1Email) ? "text-red-500" : ""}>{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</Label>
                            <Input value={formData.parent1Email} onChange={(e) => updateField('parent1Email', e.target.value)} className={isFieldInvalid(formData.parent1Email) ? "border-red-500" : ""} />
                          </div>
                          <div className="space-y-2">
                            <Label className={isFieldInvalid(formData.relationship1) ? "text-red-500" : ""}>{isAr ? 'صلة القرابة *' : 'Relationship *'}</Label>
                            <Select value={formData.relationship1} onValueChange={(v) => updateField('relationship1', v)}>
                              <SelectTrigger className={isFieldInvalid(formData.relationship1) ? "border-red-500" : ""}><SelectValue /></SelectTrigger>
                              <SelectContent>{relationships.map(r => <SelectItem key={r.value} value={r.value}>{r.label[lang]}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={cn("rounded-2xl border transition-all p-6", openParent === 'p2' ? "border-secondary bg-secondary/5" : "border-slate-100 cursor-pointer")} onClick={() => setOpenParent('p2')}>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <UserCircle2 className={cn("h-5 w-5", openParent === 'p2' ? "text-secondary" : "text-slate-400")} />
                          <span className="font-black text-primary">{isAr ? 'ولي الأمر الثاني (إلزامي)' : 'Parent 2 (Required)'}</span>
                        </div>
                      </div>
                      {openParent === 'p2' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-2">
                            <Label className={isFieldInvalid(formData.parent2Name) ? "text-red-500" : ""}>{isAr ? 'الاسم الكامل *' : 'Full Name *'}</Label>
                            <Input value={formData.parent2Name} onChange={(e) => updateField('parent2Name', e.target.value)} className={isFieldInvalid(formData.parent2Name) ? "border-red-500" : ""} />
                          </div>
                          <div className="space-y-2">
                            <Label className={isFieldInvalid(formData.parent2Phone) ? "text-red-500" : ""}>{isAr ? 'رقم الهاتف *' : 'Phone Number *'}</Label>
                            <Input value={formData.parent2Phone} onChange={(e) => updateField('parent2Phone', e.target.value)} className={isFieldInvalid(formData.parent2Phone) ? "border-red-500" : ""} />
                          </div>
                          <div className="space-y-2">
                            <Label className={isFieldInvalid(formData.parent2Email) ? "text-red-500" : ""}>{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</Label>
                            <Input value={formData.parent2Email} onChange={(e) => updateField('parent2Email', e.target.value)} className={isFieldInvalid(formData.parent2Email) ? "border-red-500" : ""} />
                          </div>
                          <div className="space-y-2">
                            <Label className={isFieldInvalid(formData.relationship2) ? "text-red-500" : ""}>{isAr ? 'صلة القرابة *' : 'Relationship *'}</Label>
                            <Select value={formData.relationship2} onValueChange={(v) => updateField('relationship2', v)}>
                              <SelectTrigger className={isFieldInvalid(formData.relationship2) ? "border-red-500" : ""}><SelectValue /></SelectTrigger>
                              <SelectContent>{relationships.map(r => <SelectItem key={r.value} value={r.value}>{r.label[lang]}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6 pt-8 border-t border-slate-100">
                    <h3 className="font-black text-primary border-l-4 border-secondary pl-4 uppercase tracking-widest text-sm mb-6">{isAr ? 'عنوان السكن (مطلوب)' : 'Home Address (Required)'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <Label className={isFieldInvalid(formData.address.line1) ? "text-red-500" : ""}>{isAr ? 'العنوان (السطر 1) *' : 'Address Line 1 *'}</Label>
                        <Input value={formData.address.line1} onChange={(e) => updateAddress('line1', e.target.value)} className={isFieldInvalid(formData.address.line1) ? "border-red-500" : ""} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-2">
                        <div className="space-y-2">
                          <Label className={isFieldInvalid(formData.address.city) ? "text-red-500" : ""}>{isAr ? 'المدينة *' : 'City *'}</Label>
                          <Input value={formData.address.city} onChange={(e) => updateAddress('city', e.target.value)} className={isFieldInvalid(formData.address.city) ? "border-red-500" : ""} />
                        </div>
                        <div className="space-y-2">
                          <Label className={isFieldInvalid(formData.address.state) ? "text-red-500" : ""}>{isAr ? 'الولاية *' : 'State *'}</Label>
                          <Select value={formData.address.state} onValueChange={(v) => updateAddress('state', v)}>
                            <SelectTrigger className={isFieldInvalid(formData.address.state) ? "border-red-500" : ""}><SelectValue /></SelectTrigger>
                            <SelectContent>{usStates.map(s => <SelectItem key={s.en} value={s.en}>{isAr ? s.ar : s.en}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className={isFieldInvalid(formData.address.zip) ? "text-red-500" : ""}>{isAr ? 'الرمز البريدي *' : 'ZIP *'}</Label>
                          <Input value={formData.address.zip} onChange={(e) => updateAddress('zip', e.target.value)} className={isFieldInvalid(formData.address.zip) ? "border-red-500" : ""} maxLength={5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-12">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                    <Label className="text-sm font-black text-primary uppercase tracking-widest mb-6 block">{isAr ? 'عدد الطلاب المسجلين' : 'Number of Students'}</Label>
                    <RadioGroup value={formData.siblingCount} onValueChange={handleSiblingCountChange} className="flex gap-4 justify-center">
                      {['1', '2', '3'].map((n) => (
                        <Label key={n} htmlFor={`count-${n}`} className={cn(
                          "flex items-center justify-center w-16 h-16 rounded-xl cursor-pointer transition-all border-2",
                          formData.siblingCount === n ? "bg-primary border-primary text-white" : "bg-white border-slate-100 text-slate-500"
                        )}>
                          <RadioGroupItem value={n} id={`count-${n}`} className="sr-only" />
                          <span className="text-xl font-black">{n}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="space-y-4">
                    {formData.students.map((student: any, idx: number) => (
                      <div key={idx} className={cn("rounded-xl border overflow-hidden", openStudentIdx === idx ? "border-primary shadow-lg" : "border-slate-100 bg-white cursor-pointer")} onClick={() => setOpenStudentIdx(idx)}>
                        <div className={cn("p-5 flex justify-between", openStudentIdx === idx ? "bg-primary text-white" : "bg-white")}>
                          <span className="font-black uppercase">{isAr ? `الطالب ${idx + 1}` : `Student ${idx + 1}`} {student.firstName && `- ${student.firstName}`}</span>
                          <ChevronDown className={cn("h-5 w-5 transition-transform", openStudentIdx === idx && "rotate-180")} />
                        </div>
                        {openStudentIdx === idx && (
                          <div className="p-8 space-y-6" onClick={(e) => e.stopPropagation()}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <Label className={isFieldInvalid(student.firstName) ? "text-red-500" : ""}>{isAr ? 'الاسم الأول *' : 'First Name *'}</Label>
                                <Input value={student.firstName} onChange={(e) => updateStudent(idx, 'firstName', e.target.value)} className={isFieldInvalid(student.firstName) ? "border-red-500" : ""} />
                              </div>
                              <div className="space-y-2">
                                <Label className={isFieldInvalid(student.lastName) ? "text-red-500" : ""}>{isAr ? 'الاسم الأخير *' : 'Last Name *'}</Label>
                                <Input value={student.lastName} onChange={(e) => updateStudent(idx, 'lastName', e.target.value)} className={isFieldInvalid(student.lastName) ? "border-red-500" : ""} />
                              </div>
                              <div className="space-y-2">
                                <Label className={isFieldInvalid(student.dob) ? "text-red-500" : ""}>{isAr ? 'تاريخ الميلاد *' : 'DOB *'}</Label>
                                <Input type="date" value={student.dob} onChange={(e) => updateStudent(idx, 'dob', e.target.value)} className={isFieldInvalid(student.dob) ? "border-red-500" : ""} />
                              </div>
                              <div className="space-y-2">
                                <Label className={isFieldInvalid(student.gender) ? "text-red-500" : ""}>{isAr ? 'الجنس *' : 'Gender *'}</Label>
                                <Select value={student.gender} onValueChange={(v) => updateStudent(idx, 'gender', v)}>
                                  <SelectTrigger className={isFieldInvalid(student.gender) ? "border-red-500" : ""}><SelectValue /></SelectTrigger>                                  <SelectContent><SelectItem value="Male">{isAr ? 'ذكر' : 'Male'}</SelectItem><SelectItem value="Female">{isAr ? 'أنثى' : 'Female'}</SelectItem></SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className={isFieldInvalid(student.lastGrade) ? "text-red-500" : ""}>{isAr ? 'آخر مرحلة *' : 'Last Grade *'}</Label>
                                <Select value={student.lastGrade} onValueChange={(v) => updateStudent(idx, 'lastGrade', v)}>
                                  <SelectTrigger className={isFieldInvalid(student.lastGrade) ? "border-red-500" : ""}><SelectValue /></SelectTrigger>
                                  <SelectContent>{gradeLevels.map(g => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}</SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className={isFieldInvalid(student.status) ? "text-red-500" : ""}>{isAr ? 'حالة الطالب *' : 'Status *'}</Label>
                                <Select value={student.status} onValueChange={(v) => updateStudent(idx, 'status', v)}>
                                  <SelectTrigger className={isFieldInvalid(student.status) ? "border-red-500" : ""}><SelectValue /></SelectTrigger>
                                  <SelectContent><SelectItem value="New Student">{isAr ? 'طالب جديد' : 'New Student'}</SelectItem><SelectItem value="Returning Student">{isAr ? 'عائد' : 'Returning'}</SelectItem></SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className={isFieldInvalid(student.phone) ? "text-red-500" : ""}>{isAr ? 'هاتف الطالب *' : 'Student Phone *'}</Label>
                                <Input value={student.phone} onChange={(e) => updateStudent(idx, 'phone', e.target.value)} className={isFieldInvalid(student.phone) ? "border-red-500" : ""} />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                <Label className={isFieldInvalid(student.email) ? "text-red-500" : ""}>{isAr ? 'البريد الإلكتروني *' : 'Student Email *'}</Label>
                                <Input type="email" value={student.email} onChange={(e) => updateStudent(idx, 'email', e.target.value)} className={isFieldInvalid(student.email) ? "border-red-500" : ""} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-12">
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-black text-primary uppercase">{isAr ? 'اختر البرنامج' : 'Select Program'}</h3>
                  </div>

                  <RadioGroup value={formData.programOption} onValueChange={(v) => { updateField('programOption', v); updateField('paymentTier', ''); updateField('languageOption', ''); }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {availablePrograms.map((prog) => (
                      <Label key={prog.id} htmlFor={`opt-${prog.id}`} className={cn(
                        "relative rounded-[2rem] overflow-hidden border-2 cursor-pointer transition-all h-56",
                        formData.programOption === prog.id ? "border-secondary shadow-xl scale-[1.02]" : "border-slate-100 hover:border-slate-300"
                      )}>
                        <RadioGroupItem value={prog.id} id={`opt-${prog.id}`} className="sr-only" />
                        <div className="absolute inset-0 z-0">
                          <Image src={prog.image} alt={prog.title} fill className="object-cover" unoptimized />
                          <div className="absolute inset-0 bg-black/50" />
                        </div>
                        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-white text-lg font-black">{prog.title}</div>
                      </Label>
                    ))}
                  </RadioGroup>

                  {formData.programOption === 'grades-3-5' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top">
                      <Label className={cn("p-8 rounded-3xl border-2 cursor-pointer", formData.paymentTier === 'initial-3-5' ? "border-secondary bg-secondary/5" : "border-slate-100")} onClick={() => updateField('paymentTier', 'initial-3-5')}>
                        <div className="font-black text-xl">2 Payment Plan</div>
                        <div className="text-secondary text-2xl font-black mt-2">$1,650</div>
                      </Label>
                      <Label className={cn("p-8 rounded-3xl border-2 cursor-pointer", formData.paymentTier === 'full-3-5' ? "border-secondary bg-secondary/5" : "border-slate-100")} onClick={() => updateField('paymentTier', 'full-3-5')}>
                        <div className="font-black text-xl">Full Tuition (Save 10%)</div>
                        <div className="text-secondary text-2xl font-black mt-2">$2,850</div>
                      </Label>
                    </div>
                  )}

                  {formData.programOption === 'grades-6-12' && (
                    <div className="space-y-10 animate-in slide-in-from-top">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Label className={cn("p-6 rounded-2xl border-2 cursor-pointer text-center font-black", formData.languageOption === 'english-arabic' ? "border-primary bg-primary/5" : "border-slate-100")} onClick={() => updateField('languageOption', 'english-arabic')}>English + Arabic</Label>
                        <Label className={cn("p-6 rounded-2xl border-2 cursor-pointer text-center font-black", formData.languageOption === 'english-esl' ? "border-primary bg-primary/5" : "border-slate-100")} onClick={() => updateField('languageOption', 'english-esl')}>English + ESL Support</Label>
                      </div>
                      {formData.languageOption && (
                        <div className="p-8 rounded-3xl bg-primary/5 border-2 border-primary/20 text-center font-black text-xl text-primary" onClick={() => updateField('paymentTier', 'initial-6-12')}>
                          Registration + Initial Payment: $1,650
                        </div>
                      )}
                    </div>
                  )}

                  {formData.programOption === 'weekend' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top">
                      {['8:00 AM – 10:00 AM', '10:00 AM – 12:00 PM', '12:00 PM – 2:00 PM'].map(slot => (
                        <Label key={slot} className={cn("p-6 rounded-xl border-2 text-center font-black cursor-pointer", formData.weekendSlot === slot ? "bg-accent border-accent text-white" : "bg-white")} onClick={() => updateField('weekendSlot', slot)}>{slot}</Label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-12">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-primary uppercase">{isAr ? 'رفع المستندات المطلوبة' : 'Upload Documents'}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{isAr ? '(تقرير الدرجات، هوية الطالب، هوية ولي الأمر)' : '(Report Card, Student ID, Parent ID)'}</p>
                  </div>

                  <div className={cn("p-12 md:p-24 border-2 border-dashed rounded-[3rem] text-center cursor-pointer transition-all", isProcessingFile ? "bg-secondary/5 animate-pulse" : "bg-slate-50 hover:bg-white")} onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <div className="font-black text-primary text-xl">{isAr ? 'انقر لرفع الملفات' : 'Click to Upload'}</div>
                    <input type="file" ref={fileInputRef} className="hidden" multiple accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileSelect(e.target.files)} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.files.map((f: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                        <span className="text-sm font-bold truncate">{f.name}</span>
                        <button onClick={() => { const nf = [...formData.files]; nf.splice(i, 1); updateField('files', nf); }} className="text-red-500"><X className="h-5 w-5" /></button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-8 pt-10 border-t border-slate-100">
                    <h3 className="text-2xl font-black text-primary uppercase flex items-center gap-4"><Eye className="h-6 w-6 text-secondary" /> {isAr ? 'مراجعة طلبك' : 'Review Your Application'}</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <Card className="rounded-3xl border-slate-100 bg-slate-50/50 overflow-hidden relative">
                        <button onClick={() => setCurrentStep(1)} className="absolute top-4 right-4 h-10 w-10 bg-white shadow-xl rounded-xl flex items-center justify-center text-secondary hover:text-primary transition-all z-20"><PencilLine className="h-5 w-5" /></button>
                        <CardHeader className="bg-primary text-white p-5"><CardTitle className="text-sm font-black uppercase">{isAr ? 'بيانات أولياء الأمور' : 'Parents'}</CardTitle></CardHeader>
                        <CardContent className="p-8 space-y-2">
                          <p className="font-bold text-primary">{formData.parent1Name} | {formData.parent2Name}</p>
                          <p className="text-xs text-slate-500">{formData.address.line1}, {formData.address.city}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col items-center gap-8">
                <div className="flex w-full gap-4">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={isSubmitting} className="flex-1 h-14 md:h-16 rounded-2xl border-2 font-black">
                      {isAr ? 'السابق' : 'Back'}
                    </Button>
                  )}
                  <Button onClick={currentStep < 4 ? handleNext : handleSubmit} disabled={isSubmitting} className="flex-[3] h-14 md:h-16 rounded-2xl bg-secondary text-white hover:bg-secondary/90 font-black shadow-xl">
                    {currentStep < 4 ? (isAr ? 'المتابعة' : 'Continue') : (isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'تأكيد وإرسال' : 'Confirm & Submit'))}
                    {isSubmitting ? <Loader2 className="ml-2 h-5 w-5 animate-spin" /> : <ChevronRight className="ml-2 h-5 w-5" />}
                  </Button>
                </div>
                <button onClick={saveDraft} disabled={isSavingDraft || isSubmitting} className="text-secondary font-black text-xs uppercase tracking-widest flex items-center gap-2">
                  <Save className="h-4 w-4" /> {isAr ? 'حفظ كمسودة' : 'Save draft'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
