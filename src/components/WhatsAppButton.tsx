'use client';

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n/config';

export function WhatsAppButton({ lang }: { lang: Locale }) {
  const isAr = lang === 'ar';
  const whatsappNumber = '13136555778';
  const message = isAr 
    ? 'مرحباً أكاديمية بنين وبنات، أرغب في الاستفسار عن برامجكم التعليمية.' 
    : 'Hello BBA Academy, I would like to inquire about your educational programs.';
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] group flex items-center gap-3"
      aria-label="Contact us on WhatsApp"
    >
      {/* Tooltip Label */}
      <span className="hidden md:block bg-white text-primary font-bold px-4 py-2 rounded-xl shadow-xl border border-slate-100 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        {isAr ? 'تحدث معنا الآن' : 'Chat with us'}
      </span>
      
      {/* Floating Button */}
      <div className="relative h-14 w-14 sm:h-16 sm:w-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 active:scale-95 transition-all duration-300">
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
        
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
      </div>
    </Link>
  );
}
