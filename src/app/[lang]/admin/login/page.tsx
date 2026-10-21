
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock, Mail, Loader2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function AdminLoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const isAr = (params as any).lang === 'ar';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: isAr ? "تم تسجيل الدخول" : "Logged In Successfully",
        description: isAr ? "مرحباً بك في لوحة الإدارة." : "Welcome to the Admin Panel.",
      });
      router.push(`/${(params as any).lang}/admin`);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: isAr ? "خطأ في الدخول" : "Login Error",
        description: isAr ? "يرجى التحقق من البريد وكلمة المرور." : "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href={`/${(params as any).lang}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-sm transition-colors">
            {isAr ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            {isAr ? "العودة للموقع" : "Back to Website"}
          </Link>
          <div className="mx-auto h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
             <ShieldCheck className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="text-2xl font-black text-primary uppercase tracking-tight">Admin Gateway</h1>
        </div>

        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="bg-primary p-8 text-white">
            <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
              <Lock className="h-5 w-5 text-secondary" />
              {isAr ? "دخول المسؤول" : "Admin Secure Login"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <Mail className="h-3 w-3 text-secondary" />
                  {isAr ? "البريد الإلكتروني" : "Email Address"}
                </Label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-xl border-slate-200 font-bold"
                  placeholder="admin@baneenbanaat.org"
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
                  className="h-14 rounded-xl border-slate-200 font-bold"
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
        
        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          Baneen & Banaat Academy Management System
        </p>
      </div>
    </div>
  );
}
