'use client';

import { MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { toast } from '@/hooks/use-toast';

export function WhatsAppButton({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const isAr = lang === 'ar';
  
  // منع ظهور زر واتساب والمساعد الذكي في صفحات الإدارة
  if (pathname?.includes('/admin')) return null;

  const whatsappNumber = '13136555778';
  const message = isAr 
    ? 'مرحباً أكاديمية بنين وبنات، أرغب في الاستفسار عن برامجكم التعليمية.' 
    : 'Hello BBA Academy, I would like to inquire about your educational programs.';
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleAiClick = () => {
    toast({
      title: isAr ? 'قريباً' : 'Coming Soon',
      description: isAr 
        ? 'المساعد الذكي للأكاديمية سيكون متاحاً قريباً لمساعدتكم في الاستفسارات والتعلم.' 
        : 'The Academy AI Assistant will be available soon to help with your inquiries and learning.',
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-[60] flex flex-col gap-3 items-center">
      {/* AI Button (Above) */}
      <div className="group flex flex-row-reverse items-center gap-2">
        {/* Tooltip Label */}
        <span className="hidden md:block bg-white text-primary font-bold px-3 py-1.5 rounded-lg shadow-xl border border-slate-100 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap text-xs">
          {isAr ? 'مساعد الذكاء الاصطناعي' : 'AI Assistant'}
        </span>
        
        {/* Floating AI Button */}
        <button
          onClick={handleAiClick}
          className="relative h-10 w-10 sm:h-11 sm:w-11 bg-primary text-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-secondary/20 group"
          aria-label="AI Assistant"
        >
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 fill-secondary animate-pulse" />
          
          {/* Badge "Soon" */}
          <span className="absolute -top-1 -right-1 bg-secondary text-white text-[7px] font-black px-1 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">
            {isAr ? 'قريباً' : 'Soon'}
          </span>
        </button>
      </div>

      {/* WhatsApp Button (Below) */}
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-row-reverse items-center gap-2"
        aria-label="Contact us on WhatsApp"
      >
        {/* Tooltip Label */}
        <span className="hidden md:block bg-white text-primary font-bold px-3 py-1.5 rounded-lg shadow-xl border border-slate-100 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap text-xs">
          {isAr ? 'تحدث معنا الآن' : 'Chat with us'}
        </span>
        
        {/* Floating Button */}
        <div className="relative h-12 w-12 sm:h-13 sm:w-13 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 active:scale-95 transition-all duration-300">
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
          
          {/* Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        </div>
      </Link>
    </div>
  );
}
