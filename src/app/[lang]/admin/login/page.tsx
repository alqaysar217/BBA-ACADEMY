
'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock, Mail, Loader2, ArrowLeft, ArrowRight, ShieldCheck, User, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const isAr = lang === 'ar';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setNetworkError(false);

    // 1. TESTING BYPASS: Allow admin/admin for rapid local testing
    if (email.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
      setLoading(true);
      localStorage.setItem('bba_test_admin', 'true');
      toast({
        title: isAr ? "تم الدخول التجريبي" : "Test Access Granted",
        description: isAr ? "مرحباً بك في لوحة الإدارة (وضع الاختبار)." : "Welcome to the Admin Panel (Test Mode).",
      });
      setTimeout(() => {
        router.push(`/${lang}/admin`);
      }, 500);
      return;
    }

    // 2. REAL FIREBASE AUTHENTICATION
    if (!auth) {
      toast({
        variant: "destructive",
        title: isAr ? "خطأ في النظام" : "System Error",
        description: isAr ? "خدمة المصادقة غير متوفرة حالياً." : "Auth service is currently unavailable.",
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.removeItem('bba_test_admin');
      toast({
        title: isAr ? "تم تسجيل الدخول بنجاح" : "Logged In Successfully",
        description: isAr ? "تم التحقق من حسابك الرسمي." : "Official account verified.",
      });
      router.push(`/${lang}/admin`);
    } catch (err: any) {
      console.error("Login failed:", err.code);
      
      if (err.code === 'auth/network-request-failed') {
        setNetworkError(true);
        toast({
          variant: "destructive",
          title: isAr ? "خطأ في الاتصال" : "Network Error",
          description: isAr ? "فشل الاتصال بخوادم التحقق. يرجى مراجعة إعدادات النطاق المعتمد." : "Failed to reach Auth servers. Please check Authorized Domains.",
        });
      } else {
        const errorMsg = isAr ? "بيانات الدخول غير صحيحة." : "Invalid credentials. Please check your Firebase account.";
        toast({
          variant: "destructive",
          title: isAr ? "فشل الدخول" : "Login Failed",
          description: errorMsg,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-sm transition-colors">
            {isAr ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            {isAr ? "العودة للموقع" : "Back to Website"}
          </Link>
          
          <div className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/10 p-4 overflow-hidden border border-slate-100">
               <Image 
                src="/logo.png" 
                alt="BBA Logo" 
                width={80} 
                height={80} 
                className="object-contain"
                unoptimized
               />
            </div>
            <div>
              <h1 className="text-2xl font-black text-primary uppercase tracking-tight">Admin Gateway</h1>
              <p className="text-[10px] text-secondary font-black uppercase tracking-[0.3em]">Baneen & Banaat Academy</p>
            </div>
          </div>
        </div>

        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="bg-primary p-8 text-white">
            <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3 text-center w-full justify-center">
              <Lock className="h-5 w-5 text-secondary" />
              {isAr ? "دخول المسؤول" : "Admin Secure Login"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {networkError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 items-start animate-in fade-in">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-black text-red-900 uppercase">Action Required</p>
                  <p className="text-[11px] text-red-800 leading-relaxed">
                    {isAr 
                      ? "نطاق العمل الحالي غير معتمد في Firebase Console. يرجى إضافة هذا النطاق إلى 'Authorized Domains' في قسم Authentication."
                      : "The current domain is not authorized in Firebase Console. Add this domain to 'Authorized Domains' in the Authentication section."}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <User className="h-3 w-3 text-secondary" />
                  {isAr ? "البريد الإلكتروني" : "Email Address"}
                </Label>
                <Input 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-xl border-slate-200 font-bold focus:border-secondary focus:ring-secondary/10"
                  placeholder={isAr ? "example@baneenbanaat.org" : "admin@test.com"}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <Lock className="h-3 w-3 text-secondary" />
                  {isAr ? "كلمة المرور" : "Password"}
                </Label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 rounded-xl border-slate-200 font-bold focus:border-secondary focus:ring-secondary/10"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-secondary hover:bg-primary text-white font-black rounded-xl shadow-xl shadow-secondary/10 transition-all text-lg"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (isAr ? "تسجيل الدخول آمن" : "Secure Sign In")}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed px-10">
          Authorized personnel only. Use credentials created via Firebase Console for full access.
        </p>
      </div>
    </div>
  );
}
