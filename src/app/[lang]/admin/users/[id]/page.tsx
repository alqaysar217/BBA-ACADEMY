
'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc, useAuth } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { 
  UserCog, ChevronLeft, ShieldCheck, Mail, User, 
  LockKeyhole, Loader2, Save, KeyRound, Camera, X
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
        photoURL: userData.photoURL || '',
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
        photoURL: formData.photoURL,
        updatedAt: serverTimestamp()
      });
      toast({ title: isAr ? "تم الحفظ" : "Saved" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!auth || !formData.email) return;
    setIsSendingReset(true);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      toast({ title: isAr ? "تم إرسال الرابط" : "Reset Sent" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error" });
    } finally {
      setIsSendingReset(false);
    }
  };

  if (loading || !formData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 text-secondary animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24 px-4">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm border border-slate-100">
              <ChevronLeft className={cn("h-5 w-5", isAr && "rotate-180")} />
            </button>
            <h1 className="text-3xl font-black text-slate-900 uppercase">{isAr ? 'تعديل بيانات الحساب' : 'Edit Account Info'}</h1>
         </div>
         <Button onClick={handleSave} disabled={isSaving} className="h-14 rounded-2xl bg-primary text-white font-black px-10 shadow-xl">
            {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5 mr-2" />}
            {isAr ? 'حفظ البيانات' : 'Save Changes'}
         </Button>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
         <CardContent className="p-10 space-y-10">
            {/* Photo Edit */}
            <div className="flex flex-col items-center gap-4">
               <div className="h-32 w-32 rounded-3xl bg-slate-100 border-4 border-white shadow-xl relative overflow-hidden">
                  <Image src={formData.photoURL || '/logo.png'} alt="Profile" fill className="object-contain p-2" unoptimized />
               </div>
               <p className="text-[10px] font-black uppercase text-slate-400">{isAr ? 'صورة الحساب الشخصية' : 'Profile Picture'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'الاسم الكامل' : 'Full Name'}</Label>
                  <Input value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} className="h-14 rounded-xl bg-slate-50 border-none font-bold" />
               </div>
               <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <Input value={formData.email} readOnly className="h-14 rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed border-none font-bold" />
               </div>
               <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'نوع الحساب' : 'Account Type'}</Label>
                  <Select value={formData.role} onValueChange={(v) => setFormData({...formData, role: v})}>
                     <SelectTrigger className="h-14 rounded-xl bg-slate-50 border-none font-bold">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="admissions">Admissions</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isAr ? 'كلمة المرور' : 'Password'}</Label>
                  <Button onClick={handlePasswordReset} disabled={isSendingReset} variant="outline" className="w-full h-14 rounded-xl border-slate-100 font-bold">
                     {isSendingReset ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4 mr-2" />}
                     {isAr ? 'إرسال رابط إعادة تعيين' : 'Send Reset Link'}
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
