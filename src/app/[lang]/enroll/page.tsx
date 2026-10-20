'use client';

import { useState, useEffect, use } from 'react';
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
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useUser } from '@/firebase';
import { addDoc, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

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
  
  const [openParent, setOpenParent] = useState<'p1' | 'p2'>('p1');
  const [openStudentIdx, setOpenStudentIdx] = useState<number>(0);

  const [formData, setFormData] = useState<any>({
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
    students: [
      {
        status: '', 
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        lastGrade: '',
      }
    ],
    programFormat: 'online',
    programOption: '', 
    paymentTier: '',
    languageOption: '',
    files: {
      reportCards: [],
      studentIds: [],
      parentIds: [],
    }
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem('bba_enrollment_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
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
        description: isAr ? 'يمكنك العودة وإكمال التسجيل في أي وقت.' : 'You can return and complete your registration anytime.',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleSubmit = async () => {
    if (!firestore) return;
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
      {/* Refined and Shallow Header Background */}
      <section className="bg-primary pt-10 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
           {/* Sophisticated Decorative Layers */}
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
           <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/40" />
        </div>

        <div className="container-tight relative z-10 text-center space-y-4 px-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              {isAr ? 'تسجيل الطلاب الجدد' : 'Student Enrollment'}
            </h1>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full shadow-[0_0_20px_rgba(var(--secondary),0.6)]" />
          </div>
          <p className="text-white/60 font-bold max-w-lg mx-auto text-xs md:text-base italic leading-relaxed">
            {isAr 
              ? 'يرجى تعبئة كافة البيانات المطلوبة لضمان معالجة طلبكم بدقة واحترافية.' 
              : 'Please complete all required information to ensure accurate and professional processing of your application.'}
          </p>
        </div>
      </section>

      <div className="container-tight -mt-8 relative z-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
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
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5 overflow-hidden">
                  <div className="text-secondary font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px]">{isAr ? 'الخطوة الحالية' : 'Current Step'}</div>
                  <CardTitle className="text-base md:text-xl font-black text-primary uppercase truncate leading-tight">
                    {steps[currentStep-1].name[lang]}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-10">
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
                          <div className="p-8 space-y-10 animate-in slide-in-from-top-4 duration-500" onClick={(e) => e.stopPropagation()}>
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
                  <div className="space-y-6">
                    <h3 className="font-black text-primary border-l-4 border-secondary pl-4 uppercase tracking-widest text-sm flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-secondary" />
                      {isAr ? 'نظام التعليم المختار' : 'Program Format'}
                    </h3>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary">
                           <GraduationCap className="h-6 w-6" />
                         </div>
                         <div>
                            <div className="font-black text-primary">{isAr ? 'عن بعد (أونلاين)' : 'Online (Remote)'}</div>
                            <div className="text-xs text-slate-400 font-bold">{isAr ? 'التعلم من أي مكان في العالم' : 'Learn from anywhere in the world'}</div>
                         </div>
                       </div>
                       <Check className="h-6 w-6 text-green-500" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="text-center space-y-2">
                       <Label className="text-sm font-black text-primary uppercase tracking-widest">{isAr ? 'اختر البرنامج المناسب' : 'Select Your Program'}</Label>
                    </div>

                    <RadioGroup 
                      value={formData.programOption}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      onValueChange={(v) => { updateField('programOption', v); updateField('paymentTier', ''); }}
                      dir={isAr ? 'rtl' : 'ltr'}
                    >
                      <Label htmlFor="opt-3-5" className={cn(
                        "p-8 rounded-xl border-2 cursor-pointer transition-all space-y-4",
                        formData.programOption === 'grades-3-5' ? "bg-secondary/5 border-secondary shadow-xl" : "bg-white border-slate-100 hover:border-secondary/20"
                      )}>
                        <RadioGroupItem value="grades-3-5" id="opt-3-5" className="sr-only" />
                        <div className="flex justify-between items-start">
                           <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                              <span className="font-black text-lg">3-5</span>
                           </div>
                           {formData.programOption === 'grades-3-5' && <Check className="h-6 w-6 text-secondary" />}
                        </div>
                        <div className="space-y-1">
                          <div className="text-xl font-black text-primary">{isAr ? 'الصفوف 3-5' : 'Grades 3–5'}</div>
                          <p className="text-xs text-slate-500 font-bold">{isAr ? 'تأسيس للمرحلة الابتدائية' : 'Elementary foundation building'}</p>
                        </div>
                      </Label>

                      <Label htmlFor="opt-6-12" className={cn(
                        "p-8 rounded-xl border-2 cursor-pointer transition-all space-y-4",
                        formData.programOption === 'grades-6-12' ? "bg-primary/5 border-primary shadow-xl" : "bg-white border-slate-100 hover:border-primary/20"
                      )}>
                        <RadioGroupItem value="grades-6-12" id="opt-6-12" className="sr-only" />
                        <div className="flex justify-between items-start">
                           <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                              <span className="font-black text-lg">6-12</span>
                           </div>
                           {formData.programOption === 'grades-6-12' && <Check className="h-6 w-6 text-primary" />}
                        </div>
                        <div className="space-y-1">
                          <div className="text-xl font-black text-primary">{isAr ? 'الصفوف 6-12' : 'Grades 6–12'}</div>
                          <p className="text-xs text-slate-500 font-bold">{isAr ? 'المرحلة المتوسطة والثانوية' : 'Middle and high school academics'}</p>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>

                  {formData.programOption && (
                    <div className="space-y-8 animate-in slide-in-from-top-6 duration-500">
                      <div className="text-center space-y-2">
                         <Label className="text-sm font-black text-primary uppercase tracking-widest">{isAr ? 'خيارات الرسوم والدفع' : 'Payment & Tuition Options'}</Label>
                      </div>

                      <RadioGroup 
                        value={formData.paymentTier} 
                        onValueChange={(v) => updateField('paymentTier', v)}
                        className="grid grid-cols-1 gap-4"
                        dir={isAr ? 'rtl' : 'ltr'}
                      >
                        {formData.programOption === 'grades-3-5' && (
                          <>
                            <Label htmlFor="pay-3-5-1" className={cn(
                              "flex items-center justify-between p-6 rounded-xl border-2 cursor-pointer transition-all bg-white",
                              formData.paymentTier === 'initial-3-5' ? "border-secondary bg-secondary/5 shadow-md" : "border-slate-100 hover:border-secondary/20"
                            )}>
                              <div className="flex items-center gap-4">
                                <RadioGroupItem value="initial-3-5" id="pay-3-5-1" />
                                <div className="space-y-1">
                                  <div className="font-black text-primary">{isAr ? 'رسوم التسجيل + الدفعة الأولى' : 'Registration Fee + Initial Payment'}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black text-secondary">$1,650</div>
                              </div>
                            </Label>
                            <Label htmlFor="pay-3-5-2" className={cn(
                              "flex items-center justify-between p-6 rounded-xl border-2 cursor-pointer transition-all bg-white",
                              formData.paymentTier === 'full-3-5' ? "border-secondary bg-secondary/5 shadow-md" : "border-slate-100 hover:border-secondary/20"
                            )}>
                              <div className="flex items-center gap-4">
                                <RadioGroupItem value="full-3-5" id="pay-3-5-2" />
                                <div className="space-y-1">
                                  <div className="font-black text-primary">{isAr ? 'كامل الرسوم الدراسية (خصم 10%)' : 'Full Tuition (Save 10%)'}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black text-secondary">$2,850</div>
                              </div>
                            </Label>
                          </>
                        )}

                        {formData.programOption === 'grades-6-12' && (
                          <>
                            <Label htmlFor="pay-6-12-eng" className={cn(
                              "flex items-center justify-between p-6 rounded-xl border-2 cursor-pointer transition-all bg-white",
                              formData.paymentTier === 'initial-6-12-eng' ? "border-primary bg-primary/5 shadow-md" : "border-slate-100 hover:border-primary/20"
                            )}>
                              <div className="flex items-center gap-4">
                                <RadioGroupItem value="initial-6-12-eng" id="pay-6-12-eng" onClick={() => updateField('languageOption', 'english-only')} />
                                <div className="space-y-1">
                                  <div className="font-black text-primary">{isAr ? 'برنامج اللغة الإنجليزية فقط' : 'English Only Program'}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black text-primary">$1,650</div>
                              </div>
                            </Label>
                            <Label htmlFor="pay-6-12-both" className={cn(
                              "flex items-center justify-between p-6 rounded-xl border-2 cursor-pointer transition-all bg-white",
                              formData.paymentTier === 'initial-6-12-both' ? "border-primary bg-primary/5 shadow-md" : "border-slate-100 hover:border-primary/20"
                            )}>
                              <div className="flex items-center gap-4">
                                <RadioGroupItem value="initial-6-12-both" id="pay-6-12-both" onClick={() => updateField('languageOption', 'english-arabic')} />
                                <div className="space-y-1">
                                  <div className="font-black text-primary">{isAr ? 'برنامج الإنجليزية + العربية' : 'English + Arabic Program'}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black text-primary">$1,650</div>
                              </div>
                            </Label>
                          </>
                        )}
                      </RadioGroup>

                      <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 flex items-start gap-4" dir={isAr ? 'rtl' : 'ltr'}>
                        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
                        <p className="text-xs font-bold text-amber-800 leading-relaxed">
                          {isAr 
                            ? 'يرجى تأكيد اختيار البرنامج وخيار اللغة الصحيح قبل المتابعة. الرسوم المعروضة هي لطالب واحد، وسيتم تأكيد الرسوم النهائية للعائلات من قبل الأكاديمية.' 
                            : 'Please confirm that you have selected the correct program and language option before continuing. Displayed tuition is for one student. Final tuition for families will be confirmed by BBA.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                       <h3 className="text-2xl font-black text-primary uppercase flex items-center justify-center gap-3">
                         <FileText className="h-6 w-6 text-secondary" />
                         {isAr ? 'المستندات المطلوبة' : 'Required Documents'}
                       </h3>
                       <p className="text-sm text-slate-500 font-bold max-w-md mx-auto leading-relaxed">
                         {isAr 
                           ? 'يرجى رفع آخر شهادة مدرسية، هوية الطلاب، وهوية الأبوين لإكمال الطلب.' 
                           : 'Please upload the student\'s last report card, student IDs, and parents\' IDs to complete your application.'}
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { id: 'reportCard', label: { en: 'Report Cards', ar: 'الشهادات المدرسية' }, icon: FileText },
                        { id: 'studentId', label: { en: 'Student IDs', ar: 'هويات الطلاب' }, icon: User },
                        { id: 'parentId', label: { en: 'Parent IDs', ar: 'هويات أولياء الأمور' }, icon: ShieldCheck },
                      ].map((doc) => (
                        <div key={doc.id} className="p-8 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center text-center space-y-4 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group">
                           <div className="h-14 w-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-secondary group-hover:shadow-md transition-all">
                             <doc.icon className="h-6 w-6" />
                           </div>
                           <div className="space-y-1">
                              <div className="text-xs font-black text-primary uppercase tracking-tight">{doc.label[lang]}</div>
                              <p className="text-[10px] text-slate-400 font-bold">{isAr ? 'انقر للرفع' : 'Click to upload'}</p>
                           </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 flex items-center gap-4" dir={isAr ? 'rtl' : 'ltr'}>
                       <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center text-slate-400">
                          <Upload className="h-5 w-5" />
                       </div>
                       <div className="flex-1">
                          <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{isAr ? 'إجمالي الملفات' : 'Total Files'}</div>
                          <div className="text-xs font-bold text-primary italic">{isAr ? 'يمكنك رفع حتى 12 ملفاً (PDF, JPG, PNG)' : 'Support up to 12 files (PDF, JPG, PNG)'}</div>
                       </div>
                    </div>
                  </div>

                  <div className="p-8 bg-primary text-white rounded-xl shadow-2xl relative overflow-hidden space-y-6">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                       <Check className="h-24 w-24" />
                    </div>
                    <div className="space-y-2 relative z-10" dir={isAr ? 'rtl' : 'ltr'}>
                      <h4 className="text-xl font-black uppercase tracking-tight">{isAr ? 'تأكيد الإرسال' : 'Final Submission'}</h4>
                      <p className="text-sm font-bold text-white/70 leading-relaxed max-w-xl">
                        {isAr 
                          ? 'بمجرد إرسال طلبكم، سيقوم فريق الأكاديمية بمراجعة البيانات والمستندات والتواصل معكم للبدء في الخطوات التالية.' 
                          : 'After you submit your application, BBA will review the information and contact you to proceed with the next steps.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Simplified Navigation Layout */}
              <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center gap-8">
                <div className="flex w-full flex-row gap-3">
                  {/* Previous Button - Only shown if not in Step 1 */}
                  {currentStep > 1 && (
                    <Button 
                      variant="outline" 
                      onClick={handleBack} 
                      disabled={isSubmitting}
                      className="flex-1 h-16 rounded-2xl border-2 border-slate-100 text-slate-500 font-black hover:bg-slate-50 gap-2 transition-all active:scale-95"
                    >
                      {isAr ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
                      {isAr ? 'السابق' : 'Back'}
                    </Button>
                  )}
                  
                  {/* Main Action Button (Continue or Submit) */}
                  <Button 
                    onClick={currentStep < 4 ? handleNext : handleSubmit} 
                    disabled={isSubmitting}
                    className={cn(
                      "h-16 rounded-2xl font-black text-lg transition-all gap-3 shadow-xl active:scale-95",
                      currentStep > 1 ? "flex-[2]" : "w-full",
                      "bg-secondary text-white hover:bg-secondary/90 shadow-secondary/20"
                    )}
                  >
                    <span className="flex-1 text-center">
                      {currentStep < 4 
                        ? (isAr ? 'المتابعة' : 'Continue') 
                        : (isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'تأكيد وإرسال' : 'Confirm & Submit'))
                      }
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      {currentStep < 4 ? (
                        isAr ? <ArrowLeft className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />
                      ) : (
                        isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />
                      )}
                    </div>
                  </Button>
                </div>

                {/* Save Draft - Low emphasis link below buttons */}
                <button 
                  onClick={saveDraft}
                  disabled={isSavingDraft || isSubmitting}
                  className="text-secondary hover:underline font-black text-[11px] uppercase tracking-widest flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSavingDraft ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                  {isAr ? 'حفظ كمسودة للعودة لاحقاً' : 'Save draft and resume later'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
