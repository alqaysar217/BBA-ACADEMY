'use client';

import { MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n/config';
import { toast } from '@/hooks/use-toast';

export function WhatsAppButton({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar';
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
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col gap-4 items-center">
      {/* AI Button (Above) */}
      <div className="group flex flex-row-reverse items-center gap-3">
        {/* Tooltip Label */}
        <span className="hidden md:block bg-white text-primary font-bold px-4 py-2 rounded-xl shadow-xl border border-slate-100 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          {isAr ? 'مساعد الذكاء الاصطناعي' : 'AI Assistant'}
        </span>
        
        {/* Floating AI Button */}
        <button
          onClick={handleAiClick}
          className="relative h-12 w-12 sm:h-14 sm:w-14 bg-primary text-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-secondary/20 group"
          aria-label="AI Assistant"
        >
          <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 fill-secondary animate-pulse" />
          
          {/* Badge "Soon" */}
          <span className="absolute -top-1 -right-1 bg-secondary text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">
            {isAr ? 'قريباً' : 'Soon'}
          </span>
        </button>
      </div>

      {/* WhatsApp Button (Below) */}
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-row-reverse items-center gap-3"
        aria-label="Contact us on WhatsApp"
      >
        {/* Tooltip Label */}
        <span className="hidden md:block bg-white text-primary font-bold px-4 py-2 rounded-xl shadow-xl border border-slate-100 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          {isAr ? 'تحدث معنا الآن' : 'Chat with us'}
        </span>
        
        {/* Floating Button */}
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 active:scale-95 transition-all duration-300">
          <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
          
          {/* Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        </div>
      </Link>
    </div>
  );
}
