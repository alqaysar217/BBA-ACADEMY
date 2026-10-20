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
  FileWarning
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useUser } from '@/firebase';
import { addDoc, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
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

export default function EnrollmentPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const { user } = useUser();
  const firestore = useFirestore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  
  const [openParent, setOpenParent] = useState<'p1' | 'p2'>('p1');
  const [openStudentIdx, setOpenStudentIdx] = useState<number>(0);

  // File Upload State
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialFormData = {
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
    files: [] // Consolidated into a single list
  };

  const [formData, setFormData] = useState<any>(initialFormData);

  // Network Status Monitor
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        variant: "destructive",
        title: isAr ? "انقطع الاتصال بالإنترنت" : "Internet Connection Lost",
        description: isAr ? "تم حفظ تقدمك تلقائياً في المتصفح. يرجى محاولة الاتصال بالإنترنت للمتابعة." : "Your progress is saved locally. Please check your connection to continue.",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isAr]);

  const availablePrograms = [
    {
      id: 'grades-3-5',
      title: isAr ? 'برنامج الصفوف 3-5 (عن بعد)' : 'Grades 3–5 Remote Program',
      desc: isAr ? 'تأسيس للمرحلة الابتدائية مع القرآن والعربية والمواد الأكاديمية.' : 'Elementary foundation building with Quran, Arabic and academics.',
      image: '/program-1.png',
      icon: BookOpen,
      color: 'secondary'
    },
    {
      id: 'grades-6-12',
      title: isAr ? 'برنامج الصفوف 6-12 (عن بعد)' : 'Grades 6–12 Remote Program',
      desc: isAr ? 'أكاديميات المرحلة المتوسطة والثانوية مع تعليم مرن عبر الإنترنت.' : 'Middle and high school academics with flexible online learning.',
      image: '/program-2.png',
      icon: GraduationCap,
      color: 'primary'
    },
    {
      id: 'weekend',
      title: isAr ? 'برنامج عطلة نهاية الأسبوع (عن بعد)' : 'Weekend Program (Remote)',
      desc: isAr ? 'إثراء أيام السبت والأحد لتعزيز الهوية الإسلامية واللغة.' : 'Saturday/Sunday enrichment to strengthen Islamic identity.',
      image: '/program-3.png',
      icon: Calendar,
      color: 'accent'
    }
  ];

  useEffect(() => {
    const savedDraft = localStorage.getItem('bba_enrollment_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        // Handle migration from old categorized files to unified array
        let consolidatedFiles = [];
        if (Array.isArray(parsed.files)) {
          consolidatedFiles = parsed.files;
        } else if (parsed.files && typeof parsed.files === 'object') {
          consolidatedFiles = [
            ...(parsed.files.reportCard || []),
            ...(parsed.files.studentId || []),
            ...(parsed.files.parentId || []),
          ];
        }

        const mergedData = {
          ...initialFormData,
          ...parsed,
          files: consolidatedFiles
        };
        setFormData(mergedData);
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bba_enrollment_draft', JSON.stringify(formData));
  }, [formData]);

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

  const formatPhoneNumber = (value: string) => {
    const cleaned = ('' + value).replace(/\D/g, '').slice(0, 10);
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return cleaned;
  };

  const formatZipCode = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 5);
  };

  const handleSiblingCountChange = (count: string) => {
    const n = parseInt(count);
    let newStudents = [...formData.students];
    
    if (n > newStudents.length) {
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
    } else if (n < newStudents.length) {
      if (confirm(isAr ? 'سيتم حذف بيانات الطلاب الإضافيين، هل تود الاستمرار؟' : 'Extra student data will be removed, do you want to continue?')) {
        newStudents = newStudents.slice(0, n);
      } else {
        return;
      }
    }
    
    setFormData((prev: any) => ({ ...prev, siblingCount: count, students: newStudents }));
    setOpenStudentIdx(0);
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const saveDraft = async () => {
    if (!firestore) return;
    setIsSavingDraft(true);
    
    const draftData = {
      ...formData,
      status: 'draft',
      updatedAt: serverTimestamp(),
      userId: user?.uid || 'anonymous',
      lastStep: currentStep
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
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleSubmit = async () => {
    if (!firestore) return;
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: isAr ? "لا يمكن الإرسال حالياً" : "Submission Unavailable",
        description: isAr ? "يرجى التحقق من اتصالك بالإنترنت للمتابعة." : "Please check your internet connection to continue.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const finalData = {
        ...formData,
        status: 'submitted',
        submittedAt: serverTimestamp(),
        userId: user?.uid || 'anonymous',
        lang
      };

      const draftId = localStorage.getItem('bba_draft_id');
      if (draftId) {
        await setDoc(doc(firestore, 'enrollments', draftId), finalData);
      } else {
        await addDoc(collection(firestore, 'enrollments'), finalData);
      }

      localStorage.removeItem('bba_enrollment_draft');
      localStorage.removeItem('bba_draft_id');
      setIsSubmitted(true);
    } catch (err) {
      const permissionError = new FirestorePermissionError({
        path: 'enrollments',
        operation: 'create',
        requestResourceData: formData,
      });
      errorEmitter.emit('permission-error', permissionError);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FILE HANDLING LOGIC ---

  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const MAX_DIM = 1000; // More aggressive compression for many files
          if (width > height) {
            if (width > MAX_DIM) {
              height *= MAX_DIM / width;
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width *= MAX_DIM / height;
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6); // 60% quality
          resolve(compressedBase64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
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
    const existingFiles = Array.isArray(formData.files) ? formData.files : [];
    const newFilesList = [...existingFiles];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (newFilesList.length >= 15) {
          toast({
            variant: "destructive",
            title: isAr ? "الحد الأقصى للملفات" : "File Limit Reached",
            description: isAr ? "يمكنك رفع 15 ملفاً كحد أقصى." : "You can only upload up to 15 files."
          });
          break;
        }

        let base64Data = '';
        if (file.type.startsWith('image/')) {
          base64Data = await compressImage(file);
        } else {
          base64Data = await fileToBase64(file);
        }

        newFilesList.push({
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64Data
        });
      }

      setFormData((prev: any) => ({
        ...prev,
        files: newFilesList
      }));

    } catch (err) {
      console.error("File processing error:", err);
    } finally {
      setIsProcessingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...(formData.files || [])];
    updatedFiles.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      files: updatedFiles
    }));
  };

  // Weekend Tuition Logic
  const getWeekendTuition = (count: string) => {
    const n = parseInt(count) || 1;
    if (n === 1) return { monthly: 75, term: 225 };
    if (n === 2) return { monthly: 70, term: 420 };
    if (n === 3) return { monthly: 65, term: 585 };
    return { monthly: 60, term: 720 }; 
  };

  if (isSubmitted) {
    return (
      <div className="container py-32 px-4 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="h-24 w-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-inner">
          <Check className="h-12 w-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-primary uppercase tracking-tight">
            {isAr ? 'تم استلام طلبكم بنجاح!' : 'Application Submitted!'}
          </h1>
          <p className="text-lg text-slate-500 max-w-md font-medium leading-relaxed">
            {isAr 
              ? 'شكراً لانضمامكم لأكاديمية بنين وبنات. سيقوم فريقنا بمراجعة طلبكم والتواصل معكم عبر بيانات الاتصال المزودة.' 
              : 'Thank you for joining Baneen and Banaat Academy. Our team will review your application and contact you using the details provided.'}
          </p>
        </div>
        <div className="pt-4">
          <Button asChild size="lg" className="bg-primary rounded-xl px-10 h-14 font-bold shadow-xl">
            <Link href={`/${lang}`}>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Offline Status Bar */}
      {!isOnline && (
        <div className="bg-red-600 text-white py-2 px-4 flex items-center justify-center gap-3 sticky top-20 z-[55] animate-in slide-in-from-top duration-300">
          <WifiOff className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-widest">
            {isAr ? 'أنت في وضع عدم الاتصال - تم تأمين البيانات محلياً' : 'Offline Mode - Data Secured Locally'}
          </span>
        </div>
      )}

      <section className="bg-primary pt-8 pb-10 relative overflow-hidden">
        <div className="absolute inset-0">
           <svg className="absolute inset-0 h-full w-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="enroll-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                 <circle cx="20" cy="20" r="1.5" fill="white" className="opacity-40" />
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#enroll-grid)" />
           </svg>
           <div className="absolute top-0 right-0 w-[40%] h-full bg-secondary/15 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse" />
           <div className="absolute bottom-0 left-0 w-[50%] h-full bg-accent/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container-tight relative z-10 text-center space-y-3 px-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {isAr ? 'تسجيل الطلاب الجدد' : 'Student Enrollment'}
            </h1>
            <div className="h-1.5 w-20 bg-secondary mx-auto rounded-full shadow-[0_0_20px_rgba(var(--secondary),0.6)]" />
          </div>
        </div>
      </section>

      <div className="container-tight -mt-6 relative z-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-5">
          
          <Card className="bg-white/95 backdrop-blur-md border-none shadow-2xl rounded-2xl p-4 md:p-6">
            <div className="relative flex justify-between items-center px-4" dir={isAr ? 'rtl' : 'ltr'}>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
              {steps.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500",
                    currentStep === step.id ? "bg-secondary border-secondary text-white scale-110 shadow-lg shadow-secondary/20" : 
                    currentStep > step.id ? "bg-primary border-primary text-white" : 
                    "bg-white border-slate-200 text-slate-400"
                  )}>
                    {currentStep > step.id ? <Check className="h-5 w-5 md:h-7 md:w-7" /> : <span className="font-black text-sm md:text-lg">{step.id}</span>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-none shadow-2xl rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-5">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5 overflow-hidden">
                  <div className="text-secondary font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px]">{isAr ? 'الخطوة الحالية' : 'Current Step'}</div>
                  <CardTitle className="text-sm md:text-xl font-black text-primary uppercase truncate leading-tight">
                    {steps[currentStep-1].name[lang]}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 md:p-10">
              {currentStep === 1 && (
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="font-black text-primary border-l-4 border-secondary pl-4 uppercase tracking-widest text-sm mb-6">
                      {isAr ? 'بيانات أولياء الأمور (إلزامية)' : 'Parent Details (Required)'}
                    </h3>
                    
                    <div className={cn(
                      "rounded-2xl border transition-all duration-300",
                      openParent === 'p1' ? "border-secondary bg-secondary/5 p-6" : "border-slate-100 bg-white p-4 cursor-pointer hover:border-slate-200"
                    )} onClick={() => setOpenParent('p1')}>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", openParent === 'p1' ? "bg-secondary text-white" : "bg-slate-100 text-slate-400")}>
                            <UserCircle2 className="h-5 w-5" />
                          </div>
                          <span className="font-black text-primary">{isAr ? 'ولي الأمر الأول' : 'Parent 1'}</span>
                        </div>
                        {openParent !== 'p1' && <ChevronDown className="h-4 w-4 text-slate-400" />}
                      </div>

                      {openParent === 'p1' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                              <User className="h-3 w-3 text-secondary" />
                              {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                            </Label>
                            <Input value={formData.parent1Name} onChange={(e) => updateField('parent1Name', e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl font-bold" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                              <Phone className="h-3 w-3 text-secondary" />
                              {isAr ? 'رقم الهاتف *' : 'Phone Number *'}
                            </Label>
                            <Input value={formData.parent1Phone} onChange={(e) => updateField('parent1Phone', formatPhoneNumber(e.target.value))} className="h-12 bg-white border-slate-200 rounded-xl font-bold" placeholder="(777) 777-7777" inputMode="numeric" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                              <Mail className="h-3 w-3 text-secondary" />
                              {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
                            </Label>
                            <Input value={formData.parent1Email} onChange={(e) => updateField('parent1Email', e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl font-bold" type="email" placeholder="example@mail.com" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                              <Users className="h-3 w-3 text-secondary" />
                              {isAr ? 'صلة القرابة *' : 'Relationship *'}
                            </Label>
                            <Select value={formData.relationship1} onValueChange={(v) => updateField('relationship1', v)} dir={isAr ? 'rtl' : 'ltr'}>
                              <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold">
                                <SelectValue placeholder={isAr ? 'اختر الصلة' : 'Select'} />
                              </SelectTrigger>
                              <SelectContent>
                                {relationships.map(r => (
                                  <SelectItem key={r.value} value={r.value}>{r.label[lang]}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={cn(
                      "rounded-2xl border transition-all duration-300",
                      openParent === 'p2' ? "border-secondary bg-secondary/5 p-6" : "border-slate-100 bg-white p-4 cursor-pointer hover:border-slate-200"
                    )} onClick={() => setOpenParent('p2')}>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", openParent === 'p2' ? "bg-secondary text-white" : "bg-slate-100 text-slate-400")}>
                            <UserCircle2 className="h-5 w-5" />
                          </div>
                          <span className="font-black text-primary">{isAr ? 'ولي الأمر الثاني' : 'Parent 2'}</span>
                        </div>
                        {openParent !== 'p2' && <ChevronDown className="h-4 w-4 text-slate-400" />}
                      </div>

                      {openParent === 'p2' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500" onClick={(e) => e.stopPropagation()}>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                              <User className="h-3 w-3 text-secondary" />
                              {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                            </Label>
                            <Input value={formData.parent2Name} onChange={(e) => updateField('parent2Name', e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl font-bold" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                              <Phone className="h-3 w-3 text-secondary" />
                              {isAr ? 'رقم الهاتف *' : 'Phone Number *'}
                            </Label>
                            <Input value={formData.parent2Phone} onChange={(e) => updateField('parent2Phone', formatPhoneNumber(e.target.value))} className="h-12 bg-white border-slate-200 rounded-xl font-bold" placeholder="(777) 777-7777" inputMode="numeric" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                              <Mail className="h-3 w-3 text-secondary" />
                              {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
                            </Label>
                            <Input value={formData.parent2Email} onChange={(e) => updateField('parent2Email', e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl font-bold" type="email" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                              <Users className="h-3 w-3 text-secondary" />
                              {isAr ? 'صلة القرابة *' : 'Relationship *'}
                            </Label>
                            <Select value={formData.relationship2} onValueChange={(v) => updateField('relationship2', v)} dir={isAr ? 'rtl' : 'ltr'}>
                              <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold">
                                <SelectValue placeholder={isAr ? 'اختر الصلة' : 'Select'} />
                              </SelectTrigger>
                              <SelectContent>
                                {relationships.map(r => (
                                  <SelectItem key={r.value} value={r.value}>{r.label[lang]}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6 pt-8 border-t border-slate-100">
                    <h3 className="font-black text-primary border-l-4 border-secondary pl-4 uppercase tracking-widest text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-secondary" />
                      {isAr ? 'عنوان السكن في الولايات المتحدة (مطلوب)' : 'USA Home Address (Required)'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                          <Type className="h-3 w-3 text-secondary" />
                          {isAr ? 'العنوان (السطر 1) *' : 'Address Line 1 *'}
                        </Label>
                        <Input value={formData.address.line1} onChange={(e) => updateAddress('line1', e.target.value)} className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold" placeholder="123 Academy St." />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                          <Hash className="h-3 w-3 text-secondary" />
                          {isAr ? 'العنوان (السطر 2)' : 'Address Line 2'}
                        </Label>
                        <Input value={formData.address.line2} onChange={(e) => updateAddress('line2', e.target.value)} className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold" placeholder="Apt 4B" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                            <Building className="h-3 w-3 text-secondary" />
                            {isAr ? 'المدينة *' : 'City *'}
                          </Label>
                          <Input value={formData.address.city} onChange={(e) => updateAddress('city', e.target.value)} className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-secondary" />
                            {isAr ? 'الولاية *' : 'State *'}
                          </Label>
                          <Select value={formData.address.state} onValueChange={(v) => updateAddress('state', v)} dir={isAr ? 'rtl' : 'ltr'}>
                            <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold">
                              <SelectValue placeholder={isAr ? 'الولاية' : 'State'} />
                            </SelectTrigger>
                            <SelectContent>
                              {usStates.map(state => (
                                <SelectItem key={state.en} value={state.en}>{lang === 'ar' ? state.ar : state.en}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                            <Hash className="h-3 w-3 text-secondary" />
                            {isAr ? 'الرمز البريدي *' : 'ZIP Code *'}
                          </Label>
                          <Input value={formData.address.zip} onChange={(e) => updateAddress('zip', formatZipCode(e.target.value))} className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold" maxLength={5} inputMode="numeric" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-12">
                  <div className="bg-slate-50 p-4 md:p-8 rounded-2xl border border-slate-100 space-y-6">
                    <div className="text-center space-y-2">
                      <Label className="text-sm font-black text-primary uppercase tracking-widest flex items-center justify-center gap-2">
                        <Users className="h-4 w-4 text-secondary" />
                        {isAr ? 'كم عدد الطلاب الذين ستقوم بتسجيلهم؟' : 'How many students (siblings) will you register?'}
                      </Label>
                    </div>
                    <RadioGroup 
                      value={formData.siblingCount} 
                      onValueChange={handleSiblingCountChange}
                      className="flex w-full gap-2 bg-slate-200/50 p-1 rounded-xl"
                      dir={isAr ? 'rtl' : 'ltr'}
                    >
                      {['1', '2', '3'].map((n) => {
                        const isSelected = formData.siblingCount === n;
                        return (
                          <Label key={n} htmlFor={`count-${n}`} className={cn(
                            "flex items-center justify-center py-4 rounded-lg cursor-pointer transition-all duration-500 gap-2 min-w-0 overflow-hidden",
                            isSelected 
                              ? "flex-[2.5] bg-white text-secondary shadow-md ring-1 ring-slate-200" 
                              : "flex-1 text-slate-500 hover:bg-white/50"
                          )}>
                            <RadioGroupItem value={n} id={`count-${n}`} className="sr-only" />
                            <span className={cn("text-xl font-black transition-transform", isSelected && "scale-110")}>{n}</span>
                            {isSelected && (
                              <span className="text-[10px] font-black uppercase truncate animate-in fade-in slide-in-from-bottom-1 duration-500">
                                {isAr ? (n === '1' ? 'طالب' : 'طلاب') : (n === '1' ? 'Student' : 'Students')}
                              </span>
                            )}
                          </Label>
                        );
                      })}
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    {formData.students.map((student: any, idx: number) => (
                      <div key={idx} className={cn(
                        "rounded-xl border transition-all duration-300 overflow-hidden",
                        openStudentIdx === idx ? "border-primary shadow-lg" : "border-slate-100 bg-white cursor-pointer hover:border-slate-200"
                      )} onClick={() => setOpenStudentIdx(idx)}>
                        <div className={cn("flex justify-between items-center p-5", openStudentIdx === idx ? "bg-primary text-white" : "bg-white")}>
                          <div className="flex items-center gap-3">
                            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center font-black", openStudentIdx === idx ? "bg-white text-primary" : "bg-slate-100 text-slate-400")}>
                              {idx + 1}
                            </div>
                            <span className="font-black uppercase tracking-tight">
                              {isAr ? `بيانات الطالب ${idx + 1}` : `Student ${idx + 1} Information`}
                              {student.firstName && ` - ${student.firstName}`}
                            </span>
                          </div>
                          {openStudentIdx !== idx ? (isAr ? <ChevronLeft className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />) : <ChevronDown className="h-4 w-4" />}
                        </div>

                        {openStudentIdx === idx && (
                          <div className="p-4 md:p-8 space-y-10 animate-in slide-in-from-top-4 duration-500" onClick={(e) => e.stopPropagation()}>
                            <div className="space-y-4">
                              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                                <ShieldCheck className="h-3 w-3 text-secondary" />
                                {isAr ? 'حالة الطالب في الأكاديمية' : 'Student Status at Academy'}
                              </Label>
                              <RadioGroup 
                                value={student.status} 
                                onValueChange={(v) => updateStudent(idx, 'status', v)}
                                className="grid grid-cols-1 gap-3"
                                dir={isAr ? 'rtl' : 'ltr'}
                              >
                                {['New Student', 'Returning Student'].map(status => (
                                  <Label 
                                    key={status} 
                                    htmlFor={`status-${idx}-${status}`}
                                    className={cn(
                                      "relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                      student.status === status 
                                        ? "bg-secondary/5 border-secondary shadow-sm" 
                                        : "bg-white border-slate-100 hover:border-slate-200"
                                    )}
                                  >
                                    <RadioGroupItem value={status} id={`status-${idx}-${status}`} className="h-5 w-5 text-secondary border-slate-300" />
                                    <span className="font-black text-sm text-primary">
                                      {isAr ? (status === 'New Student' ? 'طالب جديد' : 'طالب عائد') : status}
                                    </span>
                                  </Label>
                                ))}
                              </RadioGroup>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                  <User className="h-3 w-3 text-secondary" />
                                  {isAr ? 'الاسم الأول *' : 'First Name *'}
                                </Label>
                                <Input value={student.firstName} onChange={(e) => updateStudent(idx, 'firstName', e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl font-bold" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                  <Type className="h-3 w-3 text-secondary" />
                                  {isAr ? 'الاسم الأوسط' : 'Middle Name'}
                                </Label>
                                <Input value={student.middleName} onChange={(e) => updateStudent(idx, 'middleName', e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl font-bold" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                  <User className="h-3 w-3 text-secondary" />
                                  {isAr ? 'الاسم الأخير *' : 'Last Name *'}
                                </Label>
                                <Input value={student.lastName} onChange={(e) => updateStudent(idx, 'lastName', e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl font-bold" />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                  <CalendarIcon className="h-3 w-3 text-secondary" />
                                  {isAr ? 'تاريخ الميلاد *' : 'Date of Birth *'}
                                </Label>
                                <Input type="date" value={student.dob} onChange={(e) => updateStudent(idx, 'dob', e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl font-bold" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                  <UserCircle2 className="h-3 w-3 text-secondary" />
                                  {isAr ? 'الجنس *' : 'Gender *'}
                                </Label>
                                <Select value={student.gender} onValueChange={(v) => updateStudent(idx, 'gender', v)} dir={isAr ? 'rtl' : 'ltr'}>
                                  <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold">
                                    <SelectValue placeholder={isAr ? 'اختر' : 'Select'} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Male">{isAr ? 'ذكر' : 'Male'}</SelectItem>
                                    <SelectItem value="Female">{isAr ? 'أنثى' : 'Female'}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                  <GraduationCap className="h-3 w-3 text-secondary" />
                                  {isAr ? 'آخر مرحلة دراسية *' : 'Last Grade *'}
                                </Label>
                                <Select value={student.lastGrade} onValueChange={(v) => updateStudent(idx, 'lastGrade', v)} dir={isAr ? 'rtl' : 'ltr'}>
                                  <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl font-bold">
                                    <SelectValue placeholder={isAr ? 'اختر' : 'Select'} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {gradeLevels.map(g => (
                                      <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-secondary" />
                                  {isAr ? 'رقم هاتف الطالب *' : 'Student Phone *'}
                                </Label>
                                <Input value={student.phone} onChange={(e) => updateStudent(idx, 'phone', formatPhoneNumber(e.target.value))} className="h-12 bg-white border-slate-200 rounded-xl font-bold" placeholder="(777) 777-7777" inputMode="numeric" />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                  <Mail className="h-3 w-3 text-secondary" />
                                  {isAr ? 'البريد الإلكتروني للطالب *' : 'Student Email *'}
                                </Label>
                                <Input type="email" value={student.email} onChange={(e) => updateStudent(idx, 'email', e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl font-bold" placeholder="student@example.com" />
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
                    <h3 className="text-2xl font-black text-primary uppercase tracking-tight px-4">
                      {isAr ? 'ما هو برنامج BBA الذي ترغب في التسجيل فيه؟' : 'Which BBA Online Program Would You Like to Enroll In?'}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-bold max-w-lg mx-auto">
                      {isAr ? 'جميع برامجنا تقدم بالكامل عبر الإنترنت (عن بعد).' : 'All available programs are online by default.'}
                    </p>
                  </div>

                  <RadioGroup 
                    value={formData.programOption}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    onValueChange={(v) => { 
                      updateField('programOption', v); 
                      updateField('paymentTier', '');
                      updateField('languageOption', '');
                      updateField('weekendTerm', '');
                      updateField('weekendSlot', '');
                    }}
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    {availablePrograms.map((prog) => (
                      <Label key={prog.id} htmlFor={`opt-${prog.id}`} className={cn(
                        "relative group rounded-[1.5rem] overflow-hidden border-2 cursor-pointer transition-all duration-500 h-56 md:h-64",
                        formData.programOption === prog.id ? `border-${prog.color} shadow-2xl scale-[1.02] z-10` : "border-slate-100 hover:border-slate-300"
                      )}>
                        <RadioGroupItem value={prog.id} id={`opt-${prog.id}`} className="sr-only" />
                        <div className="absolute inset-0 z-0">
                          <Image src={prog.image} alt={prog.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity",
                            formData.programOption === prog.id ? "opacity-95" : "opacity-80"
                          )} />
                        </div>
                        <div className="absolute inset-0 z-10 p-5 md:p-6 flex flex-col justify-end text-white space-y-2">
                          <div className="flex justify-between items-start">
                             <div className={cn("h-8 w-8 md:h-10 md:w-10 rounded-xl flex items-center justify-center shadow-lg", `bg-${prog.color} text-white`)}>
                                <prog.icon className="h-4 w-4 md:h-5 md:w-5" />
                             </div>
                             {formData.programOption === prog.id && (
                               <div className={cn("h-5 w-5 md:h-6 md:w-6 rounded-full flex items-center justify-center text-white", `bg-${prog.color}`)}>
                                 <Check className="h-3 w-3 md:h-4 md:w-4" />
                               </div>
                             )}
                          </div>
                          <div className="space-y-1">
                            <div className="text-lg md:text-xl font-black leading-tight">{prog.title}</div>
                            <p className="text-[9px] md:text-[10px] text-white/70 font-bold leading-relaxed line-clamp-2">{prog.desc}</p>
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>

                  {formData.programOption === 'grades-3-5' && (
                    <div className="space-y-10 animate-in slide-in-from-top-6 duration-700">
                      <Card className="border-2 border-secondary/20 bg-secondary/5 rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-secondary text-white p-6 md:p-8">
                          <div className="flex items-center gap-4">
                            <BookOpen className="h-6 w-6 md:h-8 md:w-8" />
                            <div className="min-w-0">
                              <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tight truncate">{isAr ? 'برنامج الصفوف 3-5 (عن بعد)' : 'Grades 3–5 Remote Program'}</CardTitle>
                              <div className="text-[10px] md:text-sm font-bold opacity-80">{isAr ? 'خطة التعلم عبر الإنترنت - لجميع الطلاب' : 'Online Learning Plan - Audience: All Students'}</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-5 md:p-8 space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-4">
                                <h4 className="font-black text-primary uppercase text-xs md:text-sm border-b-2 border-secondary/20 pb-2">{isAr ? 'التسجيل والرسوم' : 'Registration and Tuition'}</h4>
                                <div className="space-y-3">
                                   <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                                      <span className="font-bold text-slate-600 text-xs md:text-sm">{isAr ? 'التسجيل + الكتب' : 'Registration + Books'}</span>
                                      <span className="font-black text-secondary text-sm md:text-base">$150.00</span>
                                   </div>
                                   <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                                      <span className="font-bold text-slate-600 text-xs md:text-sm">{isAr ? 'الرسوم السنوية' : 'Annual Tuition'}</span>
                                      <span className="font-black text-secondary text-sm md:text-base">$3,000.00</span>
                                   </div>
                                </div>
                             </div>
                             <div className="bg-amber-50 p-5 md:p-6 rounded-2xl border border-amber-200 space-y-3">
                                <div className="flex items-center gap-2 text-amber-800">
                                   <Star className="h-4 w-4 md:h-5 md:w-5 fill-amber-500 text-amber-500" />
                                   <span className="font-black uppercase text-xs md:text-sm">{isAr ? 'عرض خاص' : 'Special Offer'}</span>
                                </div>
                                <p className="text-xs md:text-sm font-bold text-amber-900 leading-relaxed">
                                   {isAr ? 'وفر 300 دولار عند دفع الرسوم الدراسية الكاملة مقدماً!' : 'Save $300 when paying full tuition upfront!'}
                                </p>
                                <p className="text-[9px] md:text-[10px] text-amber-700 italic">
                                   {isAr ? '* خصم 10% يطبق على الرسوم السنوية فقط (من 3000$ إلى 2700$). ' : '* 10% discount applies to annual tuition only ($3,000 → $2,700).'}
                                </p>
                             </div>
                          </div>

                          <div className="space-y-6">
                             <h4 className="text-center font-black text-primary uppercase tracking-widest text-xs md:text-sm">{isAr ? 'اختر خطة الدفع المناسبة' : 'Select a Payment Option'}</h4>
                             <RadioGroup value={formData.paymentTier} onValueChange={(v) => updateField('paymentTier', v)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Label htmlFor="pay-3-5-a" className={cn(
                                   "relative flex flex-col p-5 md:p-6 rounded-2xl border-2 cursor-pointer transition-all bg-white",
                                   formData.paymentTier === 'initial-3-5' ? "border-secondary shadow-xl scale-[1.01]" : "border-slate-100 hover:border-secondary/30"
                                )}>
                                   <RadioGroupItem value="initial-3-5" id="pay-3-5-a" className="absolute top-4 right-4" />
                                   <div className="flex flex-col h-full space-y-4">
                                      <div>
                                         <div className="font-black text-primary text-base md:text-lg">{isAr ? 'خطة الدفعتين' : '2 Payment Plan'}</div>
                                         <div className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase">{isAr ? 'رسوم التسجيل + الدفعة الأولى' : 'Reg Fee + Initial Payment'}</div>
                                      </div>
                                      <div className="text-2xl md:text-3xl font-black text-secondary">$1,650</div>
                                   </div>
                                </Label>

                                <Label htmlFor="pay-3-5-b" className={cn(
                                   "relative flex flex-col p-5 md:p-6 rounded-2xl border-2 cursor-pointer transition-all bg-white",
                                   formData.paymentTier === 'full-3-5' ? "border-secondary shadow-xl scale-[1.01]" : "border-slate-100 hover:border-secondary/30"
                                )}>
                                   <RadioGroupItem value="full-3-5" id="pay-3-5-b" className="absolute top-4 right-4" />
                                   <div className="flex flex-col h-full space-y-4">
                                      <div>
                                         <div className="font-black text-primary text-base md:text-lg">{isAr ? 'دفع كامل الرسوم' : 'Pay All at Once'}</div>
                                         <div className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase">{isAr ? 'وفر 10% على التعليم' : 'Save 10% on Tuition'}</div>
                                      </div>
                                      <div className="text-2xl md:text-3xl font-black text-secondary">$2,850</div>
                                   </div>
                                </Label>
                             </RadioGroup>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {formData.programOption === 'grades-6-12' && (
                    <div className="space-y-10 animate-in slide-in-from-top-6 duration-700">
                      <div className="text-center space-y-4 px-4">
                        <h4 className="font-black text-primary uppercase tracking-widest text-xs md:text-sm">{isAr ? 'اختر مسار البرنامج' : 'Select Program Variant'}</h4>
                        <RadioGroup 
                           value={formData.languageOption} 
                           onValueChange={(v) => { updateField('languageOption', v); updateField('paymentTier', ''); }} 
                           className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
                           dir={isAr ? 'rtl' : 'ltr'}
                        >
                           {[
                              { id: 'english-arabic', label: isAr ? 'إنجليزي + عربي' : 'English + Arabic', icon: Languages },
                              { id: 'english-esl', label: isAr ? 'إنجليزي + دعم ESL' : 'English + ESL Support', icon: GraduationCap }
                           ].map(opt => (
                              <Label key={opt.id} htmlFor={`var-${opt.id}`} className={cn(
                                 "flex flex-col items-center justify-center p-6 rounded-2xl border-2 text-center transition-all cursor-pointer",
                                 formData.languageOption === opt.id ? "bg-primary text-white border-primary shadow-xl" : "bg-white border-slate-100 hover:border-primary/20 text-primary"
                              )}>
                                 <RadioGroupItem value={opt.id} id={`var-${opt.id}`} className="sr-only" />
                                 <opt.icon className={cn("h-6 w-6 mb-3", formData.languageOption === opt.id ? "text-secondary" : "text-primary/40")} />
                                 <span className="font-black text-sm md:text-base uppercase tracking-tight">{opt.label}</span>
                              </Label>
                           ))}
                        </RadioGroup>
                      </div>

                      {formData.languageOption && (
                        <Card className="border-2 border-primary/20 bg-primary/5 rounded-[2rem] overflow-hidden">
                           <CardHeader className="bg-primary text-white p-6 md:p-8">
                              <div className="flex items-center gap-4">
                                 <GraduationCap className="h-6 w-6 md:h-8 md:w-8" />
                                 <div className="min-w-0">
                                    <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tight truncate">{isAr ? 'برنامج الصفوف 6-12 (عن بعد)' : 'Grades 6–12 Remote Program'}</CardTitle>
                                 </div>
                              </div>
                           </CardHeader>
                           <CardContent className="p-4 md:p-8 space-y-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="space-y-4">
                                    <h4 className="font-black text-primary uppercase text-xs md:text-sm border-b-2 border-primary/20 pb-2">{isAr ? 'جدول الدفع' : 'Payment Schedule'}</h4>
                                    <div className="p-4 bg-white rounded-xl shadow-sm space-y-3 text-xs md:text-sm">
                                       <div className="flex justify-between items-center"><span className="font-bold">{isAr ? 'رسوم التسجيل' : 'Registration Fee'}</span><span className="font-black">$150.00</span></div>
                                       <div className="flex justify-between items-center"><span className="font-bold">{isAr ? 'الدفعة الأولى' : 'First Payment'}</span><span className="font-black">$1,500.00</span></div>
                                       <div className="flex justify-between items-center"><span className="font-bold">{isAr ? 'الدفعة الثانية' : 'Second Payment'}</span><span className="font-black">$1,000.00</span></div>
                                       <div className="flex justify-between items-center"><span className="font-bold">{isAr ? 'الدفعة النهائية' : 'Final Payment'}</span><span className="font-black">$1,000.00</span></div>
                                    </div>
                                 </div>
                                 <div className="p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                    <h4 className="font-black text-primary uppercase text-xs md:text-sm border-b-2 border-slate-50 pb-2">{isAr ? 'تفاصيل الرسوم' : 'Tuition Details'}</h4>
                                    <div className="space-y-3">
                                       <div className="flex justify-between items-center"><span className="text-slate-500">{isAr ? 'إجمالي التعليم قبل الخصم' : 'Total Tuition'}</span><span className="font-black text-primary">$3,500.00</span></div>
                                       <div className="flex justify-between items-center text-secondary"><span className="font-bold">{isAr ? 'خصم الأشقاء (10%)' : 'Sibling Discount (10%)'}</span><span className="font-black">-$350.00</span></div>
                                    </div>
                                 </div>
                              </div>

                              <div className="pt-8 border-t border-primary/10">
                                 <RadioGroup value={formData.paymentTier} onValueChange={(v) => updateField('paymentTier', v)} className="max-w-md mx-auto">
                                    <Label htmlFor="pay-6-12" className={cn(
                                       "flex items-center justify-between p-5 md:p-6 rounded-2xl border-2 cursor-pointer transition-all bg-white",
                                       formData.paymentTier === 'initial-6-12' ? "border-primary shadow-xl scale-[1.01]" : "border-slate-100 hover:border-primary/30"
                                    )}>
                                       <RadioGroupItem value="initial-6-12" id="pay-6-12" />
                                       <div className="flex flex-col text-center flex-1 px-4">
                                          <div className="font-black text-primary text-sm md:text-base">{isAr ? 'رسوم التسجيل + الدفعة الأولى' : 'Reg Fee + Initial Payment'}</div>
                                       </div>
                                       <div className="text-xl md:text-2xl font-black text-primary">$1,650</div>
                                    </Label>
                                 </RadioGroup>
                              </div>
                           </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {formData.programOption === 'weekend' && (
                    <div className="space-y-10 animate-in slide-in-from-top-6 duration-700">
                       <Card className="border-2 border-accent/20 bg-accent/5 rounded-[2rem] overflow-hidden">
                          <CardHeader className="bg-accent text-white p-6 md:p-8">
                             <div className="flex items-center gap-4">
                                <Calendar className="h-6 w-6 md:h-8 md:w-8" />
                                <div className="min-w-0">
                                   <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tight truncate">{isAr ? 'برنامج عطلة نهاية الأسبوع (عن بعد)' : 'Weekend Program (Remote)'}</CardTitle>
                                </div>
                             </div>
                          </CardHeader>
                          <CardContent className="p-4 md:p-8 space-y-10">
                             <div className="space-y-4">
                                <h4 className="font-black text-primary uppercase text-xs md:text-sm border-b-2 border-accent/20 pb-2 flex items-center gap-2">
                                   <Clock className="h-4 w-4" />
                                   {isAr ? 'الفترات الزمنية المتاحة (بتوقيت نيويورك)' : 'Available Time Slots (New York Time)'}
                                </h4>
                                <RadioGroup value={formData.weekendSlot} onValueChange={(v) => updateField('weekendSlot', v)} className="grid grid-cols-1 md:grid-cols-3 gap-4" dir="ltr">
                                   {['8:00 AM – 10:00 AM', '10:00 AM – 12:00 PM', '12:00 PM – 2:00 PM'].map(slot => (
                                      <Label key={slot} htmlFor={`slot-${slot}`} className={cn(
                                         "p-4 rounded-xl border-2 text-center font-black cursor-pointer transition-all text-xs md:text-sm",
                                         formData.weekendSlot === slot ? "bg-accent text-white border-accent shadow-lg" : "bg-white border-slate-100 hover:border-accent/20 text-accent"
                                      )}>
                                         <RadioGroupItem value={slot} id={`slot-${slot}`} className="sr-only" />
                                         {slot}
                                      </Label>
                                   ))}
                                </RadioGroup>
                             </div>

                             <div className="space-y-6">
                                <h4 className="font-black text-primary uppercase text-xs md:text-sm border-b-2 border-accent/20 pb-2 flex items-center gap-2">
                                   <Users className="h-4 w-4" />
                                   {isAr ? 'رسوم البرنامج لكل فصل (3 أشهر)' : 'Program Tuition — Per Term (3 Months)'}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                   {[
                                      { count: '1', total: '225' },
                                      { count: '2', total: '420' },
                                      { count: '3', total: '585' }
                                   ].map(tier => {
                                      const isMatched = formData.siblingCount === tier.count;
                                      return (
                                         <div key={tier.count} className={cn(
                                            "p-4 rounded-xl border-2 text-center space-y-2 transition-all",
                                            isMatched ? "bg-accent border-accent text-white shadow-lg scale-105" : "bg-white border-slate-100 opacity-60"
                                         )}>
                                            <div className="text-[9px] md:text-[10px] font-black uppercase">{isAr ? (tier.count === '1' ? 'طالب واحد' : 'طلاب') : tier.count + ' Student(s)'}</div>
                                            <div className="text-lg md:text-xl font-black">${tier.total}</div>
                                         </div>
                                      );
                                   })}
                                </div>
                             </div>

                             {formData.weekendSlot && (
                                <div className="pt-8 border-t border-accent/10">
                                   <div className="bg-accent text-white p-5 md:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                                      <div className="space-y-1 text-center md:text-start">
                                         <div className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-70">{isAr ? 'المبلغ المستحق للفصل' : 'Total Due per Term'}</div>
                                         <div className="text-2xl md:text-3xl font-black">${getWeekendTuition(formData.siblingCount).term}.00</div>
                                      </div>
                                   </div>
                                </div>
                             )}
                          </CardContent>
                       </Card>
                    </div>
                  )}

                  {formData.paymentTier && (
                    <div className="bg-slate-900 text-white p-6 md:p-8 rounded-[2rem] shadow-2xl space-y-6 animate-in fade-in duration-700 mx-1">
                       <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                          <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                          <h4 className="text-sm md:text-base font-black uppercase tracking-tight">{isAr ? 'ملخص البرنامج المختار' : 'Selection Summary'}</h4>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                          <div className="space-y-4">
                             <div>
                                <div className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'البرنامج' : 'Program'}</div>
                                <div className="font-bold text-base md:text-lg leading-tight">{availablePrograms.find(p => p.id === formData.programOption)?.title}</div>
                             </div>
                             <div>
                                <div className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'خطة الدفع المختارة' : 'Payment Choice'}</div>
                                <div className="font-black text-secondary text-lg md:text-xl">
                                   {formData.programOption === 'weekend' ? `$${getWeekendTuition(formData.siblingCount).term}.00` : 
                                    formData.paymentTier === 'initial-3-5' || formData.paymentTier === 'initial-6-12' ? '$1,650.00' : '$2,850.00'}
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-12">
                  <div className="space-y-10">
                    <div className="text-center space-y-2">
                       <h3 className="text-xl md:text-2xl font-black text-primary uppercase flex items-center justify-center gap-3">
                         <FileUp className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                         {isAr ? 'رفع المستندات المطلوبة' : 'Upload Required Documents'}
                       </h3>
                       <p className="text-xs md:text-sm text-slate-500 font-bold max-w-md mx-auto leading-relaxed px-4">
                         {isAr 
                           ? 'يرجى رفع كافة المستندات المطلوبة في الحقل أدناه (حتى 15 ملفاً).' 
                           : 'Please upload all required documents in the field below (up to 15 files).'}
                       </p>
                    </div>

                    {/* Requirements Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
                      {[
                        { t: isAr ? 'هوية أولياء الأمور' : 'Parent IDs', i: ShieldCheck },
                        { t: isAr ? 'هويات الطلاب' : 'Student IDs', i: UserCircle2 },
                        { t: isAr ? 'تقرير الدرجات' : 'Report Cards', i: FileText }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-white text-secondary flex items-center justify-center shadow-sm shrink-0">
                            <item.i className="h-5 w-5" />
                          </div>
                          <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-tight">{item.t}</span>
                        </div>
                      ))}
                    </div>

                    {/* Unified Upload Area */}
                    <div 
                      className={cn(
                        "relative p-10 md:p-16 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center text-center space-y-6 transition-all group mx-2",
                        isProcessingFile ? "bg-secondary/5 border-secondary animate-pulse" : "bg-slate-50/50 border-slate-200 hover:bg-white hover:border-secondary/50 hover:shadow-2xl"
                      )}
                      onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-secondary', 'bg-secondary/5'); }}
                      onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-secondary', 'bg-secondary/5'); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-secondary', 'bg-secondary/5');
                        handleFileSelect(e.dataTransfer.files);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                       {isProcessingFile ? (
                         <Loader2 className="h-16 w-16 text-secondary animate-spin" />
                       ) : (
                         <div className="h-20 w-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-slate-300 group-hover:text-secondary group-hover:scale-110 transition-all duration-500">
                           <Upload className="h-10 w-10" />
                         </div>
                       )}
                       <div className="space-y-2">
                          <div className="text-sm md:text-lg font-black text-primary uppercase tracking-tight">
                            {isAr ? 'اسحب الملفات هنا أو انقر للإضافة' : 'Drag files here or click to add'}
                          </div>
                          <p className="text-[10px] md:text-xs text-slate-400 font-bold max-w-xs mx-auto">
                            {isAr ? 'نقبل الصور وملفات PDF. الحد الأقصى 15 ملفاً.' : 'Accepts images and PDFs. Maximum 15 files.'}
                          </p>
                       </div>
                    </div>

                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      multiple 
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileSelect(e.target.files)}
                    />

                    {/* File List */}
                    {formData.files?.length > 0 && (
                      <div className="space-y-3 px-2">
                        <div className="flex justify-between items-center px-4">
                           <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{isAr ? 'الملفات المرفوعة' : 'Uploaded Files'}</h4>
                           <span className="text-[10px] font-black text-secondary">{formData.files.length} / 15</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {formData.files.map((file: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-secondary/20 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                 <div className="h-8 w-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                                    <FileCheck className="h-4 w-4" />
                                 </div>
                                 <span className="text-xs font-bold text-slate-600 truncate">{file.name}</span>
                              </div>
                              <button 
                               onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                               className="h-8 w-8 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 flex items-center gap-4 mx-2" dir={isAr ? 'rtl' : 'ltr'}>
                       <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-400">
                          <CloudOff className="h-5 w-5" />
                       </div>
                       <div className="flex-1">
                          <div className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{isAr ? 'نظام الحماية من فقدان البيانات' : 'Offline Protection System'}</div>
                          <div className="text-[11px] font-bold text-primary italic leading-relaxed">
                            {isAr 
                              ? 'يتم تشفير الملفات وحفظها في متصفحك تلقائياً. حتى لو فقدت الاتصال، بياناتك في أمان.' 
                              : 'Files are encrypted and auto-saved to your browser. Your data is safe even if connection is lost.'}
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="p-8 bg-primary text-white rounded-[2rem] shadow-2xl relative overflow-hidden space-y-6 mx-2">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                       <Send className="h-24 w-24" />
                    </div>
                    <div className="space-y-2 relative z-10" dir={isAr ? 'rtl' : 'ltr'}>
                      <h4 className="text-xl font-black uppercase tracking-tight">{isAr ? 'تأكيد الإرسال' : 'Final Submission'}</h4>
                      <p className="text-sm font-bold text-white/70 leading-relaxed max-w-xl">
                        {isAr 
                          ? 'بمجرد الضغط على إرسال، سيتم رفع البيانات المشفرة لمراجعتها من قبل الإدارة.' 
                          : 'Upon clicking submit, your secured data will be uploaded for administration review.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-slate-100 flex flex-col items-center gap-8">
                <div className="flex w-full flex-row gap-3 px-2">
                  {currentStep > 1 && (
                    <Button 
                      variant="outline" 
                      onClick={handleBack} 
                      disabled={isSubmitting}
                      className="flex-1 h-14 md:h-16 rounded-2xl border-2 border-slate-100 text-slate-500 font-black hover:bg-slate-50 gap-2 transition-all active:scale-95 text-xs md:text-sm"
                    >
                      {isAr ? <ArrowRight className="h-4 w-4 md:h-5 md:w-5" /> : <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />}
                      {isAr ? 'السابق' : 'Back'}
                    </Button>
                  )}
                  
                  <Button 
                    onClick={currentStep < 4 ? handleNext : handleSubmit} 
                    disabled={isSubmitting || (currentStep === 3 && !formData.paymentTier)}
                    className={cn(
                      "h-14 md:h-16 rounded-2xl font-black text-sm md:text-lg transition-all gap-3 shadow-xl active:scale-95",
                      currentStep > 1 ? "flex-[2.5]" : "w-full",
                      "bg-secondary text-white hover:bg-secondary/90 shadow-secondary/20"
                    )}
                  >
                    <span className="flex-1 text-center">
                      {currentStep < 4 
                        ? (isAr ? 'المتابعة' : 'Continue') 
                        : (isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'تأكيد وإرسال' : 'Confirm & Submit'))
                      }
                    </span>
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      {currentStep < 4 ? (
                        isAr ? <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" /> : <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                      ) : (
                        isSubmitting ? <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin" /> : <Send className="h-5 w-5 md:h-6 md:w-6" />
                      )}
                    </div>
                  </Button>
                </div>

                <button 
                  onClick={saveDraft}
                  disabled={isSavingDraft || isSubmitting}
                  className="text-secondary hover:underline font-black text-[10px] md:text-[11px] uppercase tracking-widest flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSavingDraft ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                  {isAr ? 'حفظ كمسودة وتأمين البيانات' : 'Save draft and secure data'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
