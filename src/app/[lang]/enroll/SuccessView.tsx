'use client';

import { Check, MessageCircle, Home, Copy } from 'lucide-react';
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
    <div className="container py-32 px-4 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="h-24 w-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-inner">
        <Check className="h-12 w-12" />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-primary uppercase tracking-tight">
          {isAr ? 'تم استلام طلبكم بنجاح!' : 'Application Submitted!'}
        </h1>
        
        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 max-w-sm mx-auto">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{isAr ? 'رقم مرجع الطلب' : 'Application Reference ID'}</p>
           <div className="flex items-center justify-center gap-3">
              <p className="text-2xl font-black text-secondary select-all">{submissionId}</p>
              <button onClick={copyId} className="p-2 hover:bg-white rounded-lg transition-colors"><Copy className="h-4 w-4 text-slate-400" /></button>
           </div>
        </div>

        <p className="text-lg text-slate-500 max-w-md font-medium leading-relaxed">
          {isAr 
            ? 'شكراً لانضمامكم لأكاديمية بنين وبنات. سيقوم فريقنا بمراجعة طلبكم والتواصل معكم عبر بيانات الاتصال المزودة.' 
            : 'Thank you for joining Baneen and Banaat Academy. Our team will review your application and contact you using the details provided.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-md">
        <Button onClick={notifyAdminWhatsapp} className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl h-14 font-bold shadow-xl flex items-center justify-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {isAr ? 'إبلاغ عبر واتساب' : 'Notify via WhatsApp'}
        </Button>
        <Button asChild variant="outline" className="flex-1 rounded-xl h-14 font-bold border-slate-200">
          <Link href={`/${lang}`} className="flex items-center justify-center gap-2">
            <Home className="h-5 w-5" />
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
