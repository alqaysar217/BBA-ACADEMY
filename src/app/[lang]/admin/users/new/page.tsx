'use client';

import { use, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useFirebaseApp } from '@/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseConfig } from '@/firebase/config';
import { 
  UserPlus, ChevronLeft, ShieldCheck, Mail, User, 
  LockKeyhole, AlertCircle, Loader2, CheckCircle2, Camera, Upload, X, KeyRound, Info, Eye, EyeOff 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

const getRoles = (isAr: boolean) => [
  { value: 'admin', label: isAr ? 'مدير النظام (Super Admin)' : 'Super Admin' },
  { value: 'admissions', label: isAr ? 'مسؤول القبول (Admissions)' : 'Admissions Officer' },
  { value: 'academic', label: isAr ? 'المنسق الأكاديمي (Academic)' : 'Academic Coordinator' },
  { value: 'financial', label: isAr ? 'المسؤول المالي (Financial)' : 'Financial Officer' },
  { value: 'viewer', label: isAr ? 'مشاهد (Viewer)' : 'Viewer (Read Only)' },
];

export default function NewUserPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const router = useRouter();
  const firestore = useFirestore();
  const firebaseApp = useFirebaseApp();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    role: '',
    photoURL: '',
  });

  const roles = getRoles(isAr);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new globalThis.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file);
      setPhotoPreview(compressed);
      setFormData(prev => ({ ...prev, photoURL: compressed }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !firebaseApp) return;
    
    if (!formData.displayName || !formData.email || !formData.role || !formData.password) {
      toast({ 
        variant: "destructive", 
        title: isAr ? "حقول ناقصة" : "Missing Fields", 
        description: isAr ? "يرجى ملء كافة الحقول الإلزامية بما في ذلك كلمة المرور." : "Please fill all required fields including password." 
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({ 
        variant: "destructive", 
        title: isAr ? "كلمة مرور ضعيفة" : "Weak Password", 
        description: isAr ? "يجب أن تكون كلمة المرور 6 أحرف على الأقل." : "Password must be at least 6 characters." 
      });
      return;
    }

    setLoading(true);

    // نظام التزويد المباشر: إنشاء الحساب في Auth دون الخروج من حساب المدير الحالي
    const tempAppName = `temp-app-${Date.now()}`;
    let tempApp;
    
    try {
      // 1. إنشاء مثيل مؤقت لفايربيس
      tempApp = initializeApp(firebaseConfig, tempAppName);
      const tempAuth = getAuth(tempApp);

      // 2. إنشاء المستخدم في Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(tempAuth, formData.email, formData.password);
      const uid = userCredential.user.uid;

      // 3. تسجيل الخروج من المثيل المؤقت (لحماية الجلسة)
      await signOut(tempAuth);

      // 4. حفظ بيانات وصلاحيات المستخدم في Firestore
      const newUserRef = doc(firestore, 'admin_users', uid);
      const userData = {
        id: uid,
        displayName: formData.displayName,
        email: formData.email.toLowerCase(),
        role: formData.role,
        photoURL: formData.photoURL || '/logo.png',
        status: 'active',
        permissions: {
          enrollments: formData.role === 'admin' || formData.role === 'admissions' ? { read: true, write: true, delete: formData.role === 'admin' } : { read: true, write: false, delete: false },
          students: formData.role === 'admin' || formData.role === 'academic' ? { read: true, write: true, delete: formData.role === 'admin' } : { read: true, write: false, delete: false },
          finances: formData.role === 'admin' || formData.role === 'financial' ? { read: true, write: true, delete: formData.role === 'admin' } : { read: false, write: false, delete: false },
          users: formData.role === 'admin' ? { read: true, write: true, delete: true } : { read: false, write: false, delete: false }
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(newUserRef, userData);
      
      toast({
        title: isAr ? "تم إنشاء الحساب بنجاح" : "Account Created",
        description: isAr ? "تم تزويد الموظف بالحساب والصلاحيات بنجاح. يمكنه الدخول الآن." : "Staff account and privileges provisioned successfully. They can login now.",
      });
      
      router.push(`/${lang}/admin/users`);
    } catch (err: any) {
      console.error(err);
      let errorMsg = isAr ? "فشل إنشاء الحساب." : "Failed to create account.";
      if (err.code === 'auth/email-already-in-use') {
        errorMsg = isAr ? "هذا البريد الإلكتروني مستخدم بالفعل." : "This email is already in use.";
      }
      toast({ variant: "destructive", title: "Error", description: errorMsg });
    } finally {
      // تنظيف المثيل المؤقت
      if (tempApp) await deleteApp(tempApp);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex items-center gap-6">
         <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm border border-slate-100">
           {isAr ? <ChevronLeft className="h-5 w-5 rotate-180" /> : <ChevronLeft className="h-5 w-5" />}
         </button>
         <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{isAr ? 'تفعيل حساب موظف جديد' : 'Activate New Staff Account'}</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'إنشاء هوية وصلاحيات الموظف مباشرة' : 'Direct Provisioning of Identity & Privileges'}</p>
         </div>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
         <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg"><ShieldCheck className="h-6 w-6" /></div>
               <div>
                  <CardTitle className="text-xl font-black uppercase text-primary">{isAr ? 'بيانات الاعتماد الذكية' : 'Credential Intelligence'}</CardTitle>
                  <CardDescription className="font-bold">Create direct login credentials and system role.</CardDescription>
               </div>
            </div>
         </CardHeader>
         <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
               {/* Photo Upload Section */}
               <div className="flex flex-col items-center gap-6 pb-6 border-b border-slate-50">
                  <div className="relative group">
                     <div className="h-32 w-32 rounded-3xl bg-slate-100 border-4 border-white shadow-xl overflow-hidden relative">
                        <Image 
                           src={photoPreview || '/logo.png'} 
                           alt="Preview" 
                           fill 
                           className="object-contain p-2"
                           unoptimized
                        />
                        {loading && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 text-white animate-spin" />
                          </div>
                        )}
                     </div>
                     <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-3 -right-3 h-10 w-10 bg-primary text-white rounded-xl shadow-xl flex items-center justify-center hover:bg-secondary transition-all"
                     >
                        <Camera className="h-5 w-5" />
                     </button>
                     {photoPreview && (
                        <button 
                           type="button"
                           onClick={() => { setPhotoPreview(null); setFormData(p => ({...p, photoURL: ''})); }}
                           className="absolute -top-3 -right-3 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                           <X className="h-4 w-4" />
                        </button>
                     )}
                  </div>
                  <div className="text-center">
                     <p className="text-xs font-black text-primary uppercase tracking-widest">{isAr ? 'صورة الموظف الشخصية' : 'Staff Profile Picture'}</p>
                  </div>
                  <input 
                     type="file" 
                     ref={fileInputRef} 
                     className="hidden" 
                     accept="image/*" 
                     onChange={handleImageChange} 
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <User className="h-3 w-3 text-secondary" /> {isAr ? 'الاسم الكامل للموظف *' : 'Staff Full Name *'}
                     </Label>
                     <Input 
                        value={formData.displayName}
                        onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                        className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50 focus:bg-white" 
                        placeholder="e.g. Ahmad Ali" 
                     />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <Mail className="h-3 w-3 text-secondary" /> {isAr ? 'البريد الإلكتروني الرسمي (لتسجيل الدخول) *' : 'Official Login Email *'}
                     </Label>
                     <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50 focus:bg-white" 
                        placeholder="name@baneenbanaat.org" 
                     />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <LockKeyhole className="h-3 w-3 text-secondary" /> {isAr ? 'كلمة مرور الحساب *' : 'Account Password *'}
                     </Label>
                     <div className="relative">
                        <Input 
                           type={showPassword ? "text" : "password"}
                           value={formData.password}
                           onChange={(e) => setFormData({...formData, password: e.target.value})}
                           className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50 focus:bg-white pr-12" 
                           placeholder="••••••••" 
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <KeyRound className="h-3 w-3 text-secondary" /> {isAr ? 'الدور الوظيفي والصلاحيات *' : 'Assigned Role & Permissions *'}
                     </Label>
                     <Select onValueChange={(v) => setFormData({...formData, role: v})} value={formData.role}>
                        <SelectTrigger className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50">
                           <SelectValue placeholder={isAr ? 'اختر الدور الوظيفي' : 'Assign System Role'} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-2">
                           {roles.map(role => (
                              <SelectItem key={role.value} value={role.value} className="font-bold py-3">{role.label}</SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               {/* New Direct Provisioning Info */}
               <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 flex flex-col md:flex-row items-start gap-6 shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-black text-primary uppercase text-sm">{isAr ? 'نظام التزويد المباشر مفعل' : 'Direct Provisioning Active'}</h4>
                    <p className="text-xs font-bold text-slate-600 leading-relaxed">
                      {isAr 
                        ? 'عند الضغط على تفعيل الحساب، سيقوم النظام تلقائياً بإنشاء بيانات الدخول للموظف وربطها بصلاحياته المختارة. لا حاجة لأي إجراءات تقنية إضافية.' 
                        : 'Clicking activate will automatically create the credentials and link permissions. No further technical steps required.'}
                    </p>
                  </div>
               </div>

               <div className="flex justify-end pt-6">
                  <Button type="submit" disabled={loading} className="h-16 rounded-2xl bg-primary text-white font-black px-12 shadow-xl shadow-primary/20 gap-3 text-lg transition-all active:scale-95">
                     {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (isAr ? 'إنشاء وتفعيل حساب الموظف' : 'Create & Provision Account')}
                     {!loading && <UserPlus className="h-6 w-6" />}
                  </Button>
               </div>
            </form>
         </CardContent>
      </Card>
    </div>
  );
}
