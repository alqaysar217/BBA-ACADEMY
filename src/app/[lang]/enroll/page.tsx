'use client';

import { useState, use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, ChevronRight, ChevronLeft, Upload, Save, User, GraduationCap, CreditCard, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';

const steps = [
  { id: 1, icon: User, name: { en: 'Parent Info', ar: 'ولي الأمر' } },
  { id: 2, icon: GraduationCap, name: { en: 'Student Info', ar: 'الطالب' } },
  { id: 3, icon: CreditCard, name: { en: 'Program & Payment', ar: 'البرنامج' } },
  { id: 4, icon: FileText, name: { en: 'Documents', ar: 'المستندات' } },
];

export default function EnrollmentPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    parent1Name: '',
    parent1Phone: '',
    parent1Email: '',
    studentName: '',
    programOption: 'grades-3-5',
    paymentTier: 'initial',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const firestore = useFirestore();
  const isAr = lang === 'ar';

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!firestore) return;

    const enrollmentRef = collection(firestore, 'enrollments');
    addDoc(enrollmentRef, {
      ...formData,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      lang
    }).then(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }).catch(async (err) => {
      setIsSubmitting(false);
      const permissionError = new FirestorePermissionError({
        path: 'enrollments',
        operation: 'create',
        requestResourceData: formData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  if (isSubmitted) {
    return (
      <div className="container py-32 px-4 flex flex-col items-center text-center space-y-8">
        <div className="h-24 w-24 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shadow-inner">
          <Check className="h-12 w-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-primary uppercase tracking-tight">
            {isAr ? 'تم استلام طلبكم بنجاح!' : 'Application Submitted!'}
          </h1>
          <p className="text-lg text-slate-500 max-w-md font-medium">
            {isAr 
              ? 'شكراً لانضمامكم لأكاديمية بنين وبنات. سيقوم فريقنا بمراجعة طلبكم والتواصل معكم قريباً.' 
              : 'Thank you for joining Baneen and Banaat Academy. Our admissions team will review your application and contact you soon.'}
          </p>
        </div>
        <Button asChild size="lg" className="bg-primary rounded-full px-10 h-14 font-bold">
          <Link href={`/${lang}`}>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="section-padding bg-slate-50/50 min-h-screen">
      <div className="container-tight">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-primary uppercase tracking-tight">{isAr ? 'نموذج تسجيل طالب جديد' : 'Student Enrollment'}</h1>
            <p className="text-slate-500 font-medium">{isAr ? 'أكمل الخطوات الأربع التالية لبدء الرحلة التعليمية' : 'Complete the 4 steps below to start the educational journey'}</p>
          </div>

          {/* Progress Indicator */}
          <div className="relative flex justify-between items-center max-w-2xl mx-auto mb-16">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-sm",
                  currentStep === step.id ? "bg-secondary border-secondary text-white scale-110 shadow-lg shadow-secondary/20" : 
                  currentStep > step.id ? "bg-primary border-primary text-white" : 
                  "bg-white border-slate-200 text-slate-400"
                )}>
                  {currentStep > step.id ? <Check className="h-6 w-6" /> : <step.icon className="h-5 w-5" />}
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest absolute -bottom-8 whitespace-nowrap",
                  currentStep >= step.id ? "text-primary" : "text-slate-400"
                )}>
                  {step.name[lang]}
                </span>
              </div>
            ))}
          </div>

          <Card className="premium-card rounded-[2.5rem] overflow-hidden border-none shadow-2xl bg-white mt-12">
            <CardHeader className="bg-primary text-white p-10 lg:p-12">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="text-secondary font-black uppercase tracking-widest text-xs">{isAr ? 'الخطوة' : 'Step'} {currentStep} {isAr ? 'من' : 'of'} 4</div>
                  <CardTitle className="text-3xl font-black uppercase tracking-tight">
                    {steps[currentStep - 1].name[lang]}
                  </CardTitle>
                </div>
                <div className="hidden sm:block">
                   <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                      {(() => { const StepIcon = steps[currentStep-1].icon; return <StepIcon className="h-6 w-6 text-secondary" /> })()}
                   </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 lg:p-12 space-y-8">
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{isAr ? 'الاسم الكامل لولي الأمر' : 'Parent Full Name'}</Label>
                    <Input 
                      value={formData.parent1Name} 
                      onChange={(e) => updateField('parent1Name', e.target.value)}
                      placeholder={isAr ? 'مثال: أحمد محمد' : 'e.g. John Smith'}
                      className="h-14 bg-slate-50 border-none rounded-xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{isAr ? 'رقم الهاتف' : 'Phone Number'}</Label>
                    <Input 
                      value={formData.parent1Phone} 
                      onChange={(e) => updateField('parent1Phone', e.target.value)}
                      className="h-14 bg-slate-50 border-none rounded-xl font-bold"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</Label>
                    <Input 
                      type="email"
                      value={formData.parent1Email} 
                      onChange={(e) => updateField('parent1Email', e.target.value)}
                      className="h-14 bg-slate-50 border-none rounded-xl font-bold"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{isAr ? 'اسم الطالب' : 'Student Full Name'}</Label>
                    <Input 
                      value={formData.studentName} 
                      onChange={(e) => updateField('studentName', e.target.value)}
                      className="h-14 bg-slate-50 border-none rounded-xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{isAr ? 'تاريخ الميلاد' : 'Date of Birth'}</Label>
                    <Input 
                      type="date"
                      value={formData.dob} 
                      onChange={(e) => updateField('dob', e.target.value)}
                      className="h-14 bg-slate-50 border-none rounded-xl font-bold"
                    />
                  </div>
                  <div className="space-y-4 md:col-span-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{isAr ? 'الجنس' : 'Gender'}</Label>
                    <RadioGroup 
                      value={formData.gender} 
                      onValueChange={(v) => updateField('gender', v)}
                      className="flex gap-8"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                        <RadioGroupItem value="Male" id="male" className="border-2 border-primary" />
                        <Label htmlFor="male" className="font-bold text-primary cursor-pointer">{isAr ? 'ذكر' : 'Male'}</Label>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                        <RadioGroupItem value="Female" id="female" className="border-2 border-primary" />
                        <Label htmlFor="female" className="font-bold text-primary cursor-pointer">{isAr ? 'أنثى' : 'Female'}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-10">
                  <div className="space-y-6">
                    <Label className="text-sm font-black uppercase tracking-widest text-slate-400">{isAr ? 'اختر البرنامج التعليمي' : 'Select Educational Program'}</Label>
                    <RadioGroup 
                      value={formData.programOption} 
                      onValueChange={(v) => updateField('programOption', v)}
                      className="grid grid-cols-1 gap-4"
                    >
                      <Label htmlFor="prog1" className="flex items-center justify-between p-6 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-secondary transition-all bg-slate-50/50 has-[:checked]:border-secondary has-[:checked]:bg-secondary/5">
                        <div className="flex items-center gap-6">
                          <RadioGroupItem value="grades-3-5" id="prog1" />
                          <div>
                            <div className="font-black text-primary text-lg">{isAr ? 'الصفوف 3-5' : 'Grades 3–5'}</div>
                            <div className="text-sm text-slate-500 font-medium">{isAr ? 'تأسيس للمرحلة الابتدائية' : 'Elementary Foundation Program'}</div>
                          </div>
                        </div>
                        <div className="text-right">
                           <span className="font-black text-secondary text-2xl">$1,650</span>
                           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">USD</div>
                        </div>
                      </Label>
                      <Label htmlFor="prog2" className="flex items-center justify-between p-6 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-secondary transition-all bg-slate-50/50 has-[:checked]:border-secondary has-[:checked]:bg-secondary/5">
                        <div className="flex items-center gap-6">
                          <RadioGroupItem value="grades-6-12" id="prog2" />
                          <div>
                            <div className="font-black text-primary text-lg">{isAr ? 'الصفوف 6-12' : 'Grades 6–12'}</div>
                            <div className="text-sm text-slate-500 font-medium">{isAr ? 'الأكاديميين المتوسطة والثانوية' : 'Middle & High School Program'}</div>
                          </div>
                        </div>
                        <div className="text-right">
                           <span className="font-black text-secondary text-2xl">$1,650</span>
                           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">USD</div>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>

                  <div className="space-y-6">
                    <Label className="text-sm font-black uppercase tracking-widest text-slate-400">{isAr ? 'خطة الدفع' : 'Payment Plan'}</Label>
                    <RadioGroup 
                      value={formData.paymentTier} 
                      onValueChange={(v) => updateField('paymentTier', v)}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <Label htmlFor="pay1" className="flex flex-col gap-3 p-6 rounded-2xl border-2 border-slate-100 cursor-pointer bg-slate-50/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <RadioGroupItem value="initial" id="pay1" />
                        <div>
                          <div className="font-black text-primary leading-tight">{isAr ? 'رسوم التسجيل + الدفعة الأولى' : 'Initial Payment + Registration Fee'}</div>
                          <div className="text-xs text-slate-500 font-medium mt-1">{isAr ? 'دفع المبلغ المتبقي لاحقاً' : 'Pay remaining balance later'}</div>
                        </div>
                      </Label>
                      <Label htmlFor="pay2" className="flex flex-col gap-3 p-6 rounded-2xl border-2 border-slate-100 cursor-pointer bg-slate-50/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <RadioGroupItem value="full" id="pay2" />
                        <div>
                          <div className="font-black text-primary leading-tight">{isAr ? 'كامل الرسوم (وفر 10%)' : 'Full Tuition (Save 10%)'}</div>
                          <div className="text-xs text-slate-500 font-medium mt-1">{isAr ? 'دفع كامل المبلغ الآن والاستفادة من الخصم' : 'Pay all at once and save 10%'}</div>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="p-12 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center text-center space-y-6 bg-slate-50/50 transition-all hover:bg-slate-50 hover:border-secondary/40">
                    <div className="h-20 w-20 rounded-3xl bg-secondary/10 text-secondary flex items-center justify-center shadow-sm">
                      <Upload className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-black text-primary text-xl">{isAr ? 'انقر أو اسحب الملفات هنا' : 'Drop Required Files'}</p>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
                        {isAr 
                          ? 'المطلوب: آخر شهادة مدرسية، هوية الطالب، هوية ولي الأمر' 
                          : 'Required: Last report card, student ID, and parent ID documents.'}
                      </p>
                    </div>
                    <Button variant="outline" className="rounded-full border-primary/20 text-primary font-bold px-8 h-12 hover:bg-primary hover:text-white transition-all">
                       {isAr ? 'اختر ملفات' : 'Select Files'}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{isAr ? 'الحد الأقصى: 12 ملف' : 'Max: 12 Files'}</span>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{isAr ? 'PDF, JPG, PNG' : 'Formats: PDF, JPG, PNG'}</span>
                     </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-10 border-t border-slate-100 mt-12">
                <Button 
                  variant="ghost" 
                  onClick={handleBack} 
                  disabled={currentStep === 1 || isSubmitting}
                  className="gap-2 font-bold text-slate-400 hover:text-primary transition-all"
                >
                  {lang === 'ar' ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  {isAr ? 'السابق' : 'Previous Step'}
                </Button>
                
                {currentStep < 4 ? (
                  <Button onClick={handleNext} className="bg-primary hover:bg-accent rounded-full h-14 px-10 font-bold shadow-xl shadow-primary/20 transition-all">
                    {isAr ? 'متابعة' : 'Continue'}
                    {lang === 'ar' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="bg-secondary hover:bg-secondary/90 text-white font-black h-14 px-12 rounded-full shadow-xl shadow-secondary/30 transition-all scale-105"
                  >
                    {isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'تأكيد التسجيل' : 'Submit Application')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
            <Save className="h-4 w-4" />
            <span>{isAr ? 'يتم حفظ تقدمك تلقائياً وبأمان' : 'Secure Auto-Save Active'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}