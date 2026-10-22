
'use client';

import { Check, MessageCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

  return (
    <div className="container py-32 px-4 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="h-24 w-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-inner">
        <Check className="h-12 w-12" />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-primary uppercase tracking-tight">
          {isAr ? 'تم استلام طلبكم بنجاح!' : 'Application Submitted!'}
        </h1>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-md mx-auto">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isAr ? 'رقم مرجع الطلب' : 'Application Reference ID'}</p>
           <p className="text-xl font-black text-secondary select-all">{submissionId}</p>
        </div>
        <p className="text-lg text-slate-500 max-w-md font-medium leading-relaxed">
          {isAr 
            ? 'شكراً لانضمامكم لأكاديمية بنين وبنات. سيقوم فريقنا بمراجعة طلبكم والتواصل معكم قريباً.' 
            : 'Thank you for joining BBA Academy. Our team will review your application and contact you soon.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button onClick={notifyAdminWhatsapp} className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-10 h-14 font-bold shadow-xl flex items-center gap-3">
          <MessageCircle className="h-5 w-5" />
          {isAr ? 'إبلاغ الإدارة عبر واتساب' : 'Notify via WhatsApp'}
        </Button>
        <Button asChild variant="outline" className="rounded-xl px-10 h-14 font-bold border-2">
          <Link href={`/${lang}`}>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</Link>
        </Button>
      </div>
    </div>
  );
}
