'use client';

import { Check, MessageCircle, Home, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

interface SuccessViewProps {
  isAr: boolean;
  lang: string;
  submissionId: string;
}

export function SuccessView({ isAr, lang, submissionId }: SuccessViewProps) {
  const notifyAdminWhatsapp = () => {
    const msg = isAr 
      ? `مرحباً أكاديمية BBA، لقد قمت بتقديم طلب تسجيل جديد برقم المرجع: ${submissionId}. يرجى مراجعته.` 
      : `Hello BBA Academy, I have submitted a new enrollment application with ID: ${submissionId}. Please review it.`;
    window.open(`https://wa.me/13136555778?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const copyId = () => {
    navigator.clipboard.writeText(submissionId);
    toast({
      title: isAr ? "تم النسخ" : "Copied",
      description: isAr ? "تم نسخ رقم المرجع بنجاح." : "Reference ID copied to clipboard.",
    });
  };

  return (
    <div className="container py-32 px-4 flex flex-col items-center text-center space-y-10 animate-in fade-in zoom-in duration-700">
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-inner relative z-10">
          <Check className="h-12 w-12" />
        </div>
        <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full animate-pulse" />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">
          {isAr ? 'تم استلام طلبكم بنجاح!' : 'Application Submitted!'}
        </h1>
        
        <div className="p-8 bg-white rounded-[2rem] border-2 border-slate-100 max-w-md mx-auto shadow-premium group transition-all hover:border-secondary/20">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">{isAr ? 'رقم مرجع الطلب' : 'Application Reference ID'}</p>
           <div className="flex items-center justify-center gap-4">
              <p className="text-2xl md:text-3xl font-black text-secondary select-all tracking-tight">{submissionId}</p>
              <button onClick={copyId} className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 hover:text-secondary hover:bg-secondary/5 transition-all flex items-center justify-center">
                 <Copy className="h-5 w-5" />
              </button>
           </div>
        </div>

        <p className="text-lg text-slate-500 max-w-md font-medium leading-relaxed mx-auto">
          {isAr 
            ? 'شكراً لانضمامكم لأكاديمية بنين وبنات. سيقوم فريقنا بمراجعة طلبكم والتواصل معكم عبر بيانات الاتصال المزودة قريباً.' 
            : 'Thank you for joining BBA Academy. Our team will review your application and contact you using the details provided soon.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 pt-6 w-full max-w-md">
        <Button onClick={notifyAdminWhatsapp} className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-2xl h-16 font-black shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 text-lg transition-all active:scale-95">
          <MessageCircle className="h-6 w-6" />
          {isAr ? 'إبلاغ عبر واتساب' : 'Notify via WhatsApp'}
        </Button>
        <Button asChild variant="outline" className="flex-1 rounded-2xl h-16 font-black border-2 border-slate-100 hover:bg-slate-50 transition-all active:scale-95">
          <Link href={`/${lang}`} className="flex items-center justify-center gap-2">
            <Home className="h-5 w-5" />
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
        </Button>
      </div>
    </div>
  );
}