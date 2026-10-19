'use client';

import { useState, use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, ChevronRight, ChevronLeft, Upload, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Link from 'next/link';

const steps = [
  { id: 1, name: { en: 'Parent Info', ar: 'بيانات ولي الأمر' } },
  { id: 2, name: { en: 'Student Info', ar: 'بيانات الطالب' } },
  { id: 3, name: { en: 'Program & Payment', ar: 'البرنامج والدفع' } },
  { id: 4, name: { en: 'Documents', ar: 'المستندات' } },
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
      <div className="container py-32 px-4 flex flex-col items-center text-center space-y-6">
        <div className="h-20 w-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
          <Check className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-primary">
          {isAr ? 'تم استلام طلبكم بنجاح!' : 'Application Submitted Successfully!'}
        </h1>
        <p className="text-muted-foreground max-w-md">
          {isAr 
            ? 'شكراً لانضمامكم لأكاديمية بنين وبنات. سيقوم فريقنا بمراجعة طلبكم والتواصل معكم قريباً.' 
            : 'Thank you for joining Baneen and Banaat Academy. Our team will review your application and contact you soon.'}
        </p>
        <Button asChild>
          <Link href={`/${lang}`}>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-24 bg-muted/30 min-h-screen">
      <div className="container px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-12">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center space-y-2 flex-1 relative">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all z-10",
                  currentStep >= step.id ? "bg-primary border-primary text-white" : "bg-white border-muted text-muted-foreground"
                )}>
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <span className={cn(
                  "text-xs font-bold",
                  currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.name[lang]}
                </span>
                {step.id < 4 && (
                  <div className={cn(
                    "absolute top-5 left-[60%] w-[80%] h-[2px]",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          <Card className="premium-card rounded-3xl overflow-hidden border-none shadow-xl">
            <CardHeader className="bg-primary text-primary-foreground p-8">
              <CardTitle className="text-2xl">
                {steps[currentStep - 1].name[lang]}
              </CardTitle>
              <CardDescription className="text-primary-foreground/70">
                {isAr ? 'يرجى إكمال الحقول المطلوبة للمتابعة' : 'Please complete the required fields to continue'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{isAr ? 'الاسم الكامل لولي الأمر' : 'Parent Full Name'}</Label>
                    <Input 
                      value={formData.parent1Name} 
                      onChange={(e) => updateField('parent1Name', e.target.value)}
                      placeholder={isAr ? 'مثال: أحمد محمد' : 'e.g. John Doe'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isAr ? 'رقم الهاتف' : 'Phone Number'}</Label>
                    <Input 
                      value={formData.parent1Phone} 
                      onChange={(e) => updateField('parent1Phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>{isAr ? 'البريد الإلكتروني' : 'Email Address'}</Label>
                    <Input 
                      type="email"
                      value={formData.parent1Email} 
                      onChange={(e) => updateField('parent1Email', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{isAr ? 'اسم الطالب (الأول)' : 'Student First Name'}</Label>
                    <Input 
                      value={formData.studentName} 
                      onChange={(e) => updateField('studentName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isAr ? 'تاريخ الميلاد' : 'Date of Birth'}</Label>
                    <Input 
                      type="date"
                      value={formData.dob} 
                      onChange={(e) => updateField('dob', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isAr ? 'الجنس' : 'Gender'}</Label>
                    <RadioGroup 
                      value={formData.gender} 
                      onValueChange={(v) => updateField('gender', v)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">{isAr ? 'ذكر' : 'Male'}</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">{isAr ? 'أنثى' : 'Female'}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-bold">{isAr ? 'اختر البرنامج' : 'Select Program'}</Label>
                    <RadioGroup 
                      value={formData.programOption} 
                      onValueChange={(v) => updateField('programOption', v)}
                      className="grid grid-cols-1 gap-4"
                    >
                      <Label htmlFor="prog1" className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer hover:border-secondary transition-all">
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value="grades-3-5" id="prog1" />
                          <div>
                            <div className="font-bold">{isAr ? 'الصفوف 3-5' : 'Grades 3–5'}</div>
                            <div className="text-xs text-muted-foreground">{isAr ? 'تأسيس للمرحلة الابتدائية' : 'Elementary foundation building'}</div>
                          </div>
                        </div>
                        <span className="font-bold text-secondary">$1,650</span>
                      </Label>
                      <Label htmlFor="prog2" className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer hover:border-secondary transition-all">
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value="grades-6-12" id="prog2" />
                          <div>
                            <div className="font-bold">{isAr ? 'الصفوف 6-12' : 'Grades 6–12'}</div>
                            <div className="text-xs text-muted-foreground">{isAr ? 'الأكاديميين المتوسطة والثانوية' : 'Middle & high school academics'}</div>
                          </div>
                        </div>
                        <span className="font-bold text-secondary">$1,650</span>
                      </Label>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-bold">{isAr ? 'خطة الدفع' : 'Payment Plan'}</Label>
                    <RadioGroup 
                      value={formData.paymentTier} 
                      onValueChange={(v) => updateField('paymentTier', v)}
                      className="grid grid-cols-1 gap-4"
                    >
                      <Label htmlFor="pay1" className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer">
                        <RadioGroupItem value="initial" id="pay1" />
                        <div>
                          <div className="font-bold">{isAr ? 'رسوم التسجيل + الدفعة الأولى' : 'Registration Fee + Initial Payment'}</div>
                          <div className="text-xs text-muted-foreground">{isAr ? 'يتم دفع المتبقي لاحقاً' : 'Balance to be paid later'}</div>
                        </div>
                      </Label>
                      <Label htmlFor="pay2" className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer">
                        <RadioGroupItem value="full" id="pay2" />
                        <div>
                          <div className="font-bold">{isAr ? 'كامل الرسوم (وفر 10%)' : 'Full Tuition (Save 10%)'}</div>
                          <div className="text-xs text-muted-foreground">{isAr ? 'ادفع الآن ووفر' : 'Pay all at once and save'}</div>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="p-8 border-2 border-dashed rounded-2xl flex flex-col items-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold">{isAr ? 'انقر أو اسحب الملفات هنا' : 'Click or drag files here'}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isAr 
                          ? 'المطلوب: آخر شهادة مدرسية، هوية الطالب، هوية ولي الأمر' 
                          : 'Required: Last report card, student ID, parent ID'}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">{isAr ? 'اختر ملفات' : 'Select Files'}</Button>
                  </div>
                  
                  <div className="bg-secondary/5 p-4 rounded-xl text-xs text-muted-foreground">
                    <p>• {isAr ? 'الحد الأقصى للملفات: 12 ملف' : 'Max files: 12'}</p>
                    <p>• {isAr ? 'الصيغ المدعومة: PDF, JPG, PNG' : 'Supported formats: PDF, JPG, PNG'}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-8 border-t">
                <Button 
                  variant="ghost" 
                  onClick={handleBack} 
                  disabled={currentStep === 1 || isSubmitting}
                  className="gap-2"
                >
                  {lang === 'ar' ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  {isAr ? 'السابق' : 'Previous'}
                </Button>
                
                {currentStep < 4 ? (
                  <Button onClick={handleNext} className="gap-2 px-8">
                    {isAr ? 'التالي' : 'Next'}
                    {lang === 'ar' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="bg-secondary text-primary font-bold px-10 gap-2"
                  >
                    {isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'تأكيد التسجيل' : 'Confirm Enrollment')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-2 text-sm text-muted-foreground">
            <Save className="h-4 w-4" />
            <span>{isAr ? 'سيتم حفظ تقدمك تلقائياً' : 'Your progress is saved automatically'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
