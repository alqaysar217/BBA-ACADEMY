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
import { Lock, Mail, Loader2, ArrowLeft, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const isAr = lang === 'ar';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // TESTING BYPASS: Allow admin/admin for rapid testing
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

    if (!auth) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.removeItem('bba_test_admin'); // Clear test flag if real auth used
      toast({
        title: isAr ? "تم تسجيل الدخول" : "Logged In Successfully",
        description: isAr ? "مرحباً بك في لوحة الإدارة." : "Welcome to the Admin Panel.",
      });
      router.push(`/${lang}/admin`);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: isAr ? "خطأ في الدخول" : "Login Error",
        description: isAr ? "يرجى التحقق من البيانات." : "Invalid credentials.",
      });
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
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <User className="h-3 w-3 text-secondary" />
                  {isAr ? "اسم المستخدم" : "Username / Email"}
                </Label>
                <Input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-xl border-slate-200 font-bold focus:border-secondary focus:ring-secondary/10"
                  placeholder={isAr ? "أدخل admin للاختبار" : "Enter 'admin' for testing"}
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
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (isAr ? "دخول" : "Sign In")}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed px-10">
          Authorized personnel only. Access is monitored and recorded by BBA Security Systems.
        </p>
      </div>
    </div>
  );
}
