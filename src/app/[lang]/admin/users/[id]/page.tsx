
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc, useAuth } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { 
  UserCog, ChevronLeft, ShieldCheck, Mail, User, 
  LockKeyhole, CheckCircle2, Loader2, Save,
  KeyRound, ShieldAlert, UserPlus, Fingerprint
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function EditUserPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const router = useRouter();
  const firestore = useFirestore();
  const auth = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  const userRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'admin_users', id);
  }, [firestore, id]);

  const { data: userData, loading } = useDoc(userRef);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (userData && !formData) {
      setFormData({
        displayName: userData.displayName || '',
        email: userData.email || '',
        role: userData.role || 'viewer',
        status: userData.status || 'active',
      });
    }
  }, [userData, formData]);

  const handleSave = async () => {
    if (!firestore || !formData || !userRef) return;
    setIsSaving(true);
    try {
      await updateDoc(userRef, {
        displayName: formData.displayName,
        role: formData.role,
        updatedAt: serverTimestamp()
      });
      toast({ 
        title: isAr ? "تم تحديث البيانات" : "Changes Saved", 
        description: isAr ? "تم حفظ بيانات الحساب بنجاح." : "Account data updated successfully." 
      });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to update user." });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!auth || !formData.email) return;
    setIsSendingReset(true);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      toast({
        title: isAr ? "تم إرسال الرابط" : "Reset Link Sent",
        description: isAr ? "تم إرسال رابط تعيين كلمة المرور لبريد الموظف." : "A password reset link has been sent to the staff email.",
      });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Could not send reset email." });
    } finally {
      setIsSendingReset(false);
    }
  };

  if (loading || !formData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 text-secondary animate-spin" />
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">
        {isAr ? 'جاري تحميل بيانات الحساب...' : 'Loading Account Data...'}
      </p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm border border-slate-100">
              <ChevronLeft className={cn("h-5 w-5", isAr && "rotate-180")} />
            </button>
            <div>
               <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{isAr ? 'تعديل الملف الشخصي' : 'Edit Account Profile'}</h1>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'تعديل البيانات الأساسية للهوية' : 'Modify Core Identity Credentials'}</p>
            </div>
         </div>
         <Button onClick={handleSave} disabled={isSaving} className="h-14 rounded-2xl bg-primary text-white font-black px-10 shadow-xl shadow-primary/20 gap-3 transition-all active:scale-95">
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {isAr ? 'حفظ التعديلات' : 'Save Profile'}
         </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
         <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden border border-slate-100">
            <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/30 flex flex-row items-center gap-6">
               <div className="h-20 w-20 rounded-3xl bg-primary text-white flex items-center justify-center text-3xl font-black shadow-xl">
                  {formData.displayName?.charAt(0)}
               </div>
               <div>
                  <CardTitle className="text-xl font-black uppercase text-primary">{isAr ? 'بيانات الحساب الأساسية' : 'Primary Account Data'}</CardTitle>
                  <CardDescription className="font-bold">Name, Email, and System Role classification.</CardDescription>
               </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <User className="h-3 w-3 text-secondary" /> {isAr ? 'الاسم الكامل' : 'Full Name'}
                     </Label>
                     <Input 
                        value={formData.displayName} 
                        onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                        className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50 focus:bg-white transition-all"
                     />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <Mail className="h-3 w-3 text-secondary" /> {isAr ? 'البريد الإلكتروني' : 'Account Email'}
                     </Label>
                     <Input 
                        value={formData.email} 
                        readOnly
                        className="h-14 rounded-xl border-slate-100 font-bold bg-slate-100 text-slate-400 cursor-not-allowed"
                     />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <ShieldCheck className="h-3 w-3 text-secondary" /> {isAr ? 'نوع الحساب' : 'Account Type'}
                     </Label>
                     <Select value={formData.role} onValueChange={(v) => setFormData({...formData, role: v})}>
                        <SelectTrigger className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50">
                           <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl p-2">
                           <SelectItem value="admin" className="font-bold py-3">{isAr ? 'مدير نظام (Manager)' : 'System Manager'}</SelectItem>
                           <SelectItem value="academic" className="font-bold py-3">{isAr ? 'موظف أكاديمي (Staff)' : 'Academic Staff'}</SelectItem>
                           <SelectItem value="financial" className="font-bold py-3">{isAr ? 'موظف مالي (Staff)' : 'Financial Staff'}</SelectItem>
                           <SelectItem value="admissions" className="font-bold py-3">{isAr ? 'مسؤول قبول (Staff)' : 'Admissions Staff'}</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <LockKeyhole className="h-3 w-3 text-secondary" /> {isAr ? 'كلمة المرور' : 'Account Password'}
                     </Label>
                     <div className="flex gap-2">
                        <Input 
                           value="••••••••" 
                           readOnly
                           className="h-14 rounded-xl border-slate-100 font-bold bg-slate-50/50 flex-1"
                        />
                        <Button 
                           type="button"
                           onClick={handlePasswordReset}
                           disabled={isSendingReset}
                           variant="outline" 
                           className="h-14 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest px-4 hover:bg-secondary hover:text-white hover:border-secondary transition-all"
                        >
                           {isSendingReset ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldAlert className="h-4 w-4 mr-1.5" />}
                           {isAr ? 'إعادة تعيين' : 'Reset'}
                        </Button>
                     </div>
                  </div>
               </div>

               <div className="bg-amber-50/50 border border-amber-100 p-8 rounded-3xl flex items-start gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Fingerprint className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-amber-900 uppercase text-sm">{isAr ? 'تنبيه أمان الهوية' : 'Identity Security Note'}</h4>
                    <p className="text-xs font-bold text-amber-800/70 leading-relaxed">
                      {isAr 
                        ? 'لحماية خصوصية الموظف، لا يظهر النظام كلمة المرور الحالية. لتغييرها، اضغط على "إعادة تعيين" لإرسال رابط آمن لبريد الموظف ليقوم بتعيين كلمة مرور جديدة بنفسه.' 
                        : 'To protect staff privacy, current passwords are not displayed. To change it, click "Reset" to send a secure link to the staff email for them to set a new password personally.'}
                    </p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
