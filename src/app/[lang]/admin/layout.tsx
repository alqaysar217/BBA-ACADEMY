
'use client';

import { ReactNode, useState, useEffect, use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut, 
  Menu, 
  CreditCard,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Layers,
  GraduationCap,
  Sun,
  Moon,
  Languages,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export default function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = use(params);
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isAr = lang === 'ar';
  
  // States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('bba_admin_theme');
    if (savedTheme === 'dark') setIsDarkMode(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('bba_admin_theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    const isTestAdmin = localStorage.getItem('bba_test_admin') === 'true';
    if (!loading && !user && !isTestAdmin && !pathname.includes('/login')) {
      router.push(`/${lang}/admin/login`);
    }
  }, [user, loading, router, lang, pathname]);

  if (pathname.includes('/login')) return children;

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const menuGroups = [
    {
      title: isAr ? 'الرئيسية' : 'Core',
      items: [
        { label: isAr ? 'لوحة القيادة' : 'Dashboard', href: `/${lang}/admin`, icon: LayoutDashboard },
      ]
    },
    {
      title: isAr ? 'القبول والتسجيل' : 'Admissions',
      items: [
        { label: isAr ? 'طلبات الالتحاق' : 'Applications', href: `/${lang}/admin/enrollments`, icon: FileText },
      ]
    },
    {
      title: isAr ? 'الأكاديميين' : 'Academics',
      items: [
        { label: isAr ? 'قائمة الطلاب' : 'Students Registry', href: `/${lang}/admin/students`, icon: Users },
      ]
    },
    {
      title: isAr ? 'المالية' : 'Finances',
      items: [
        { label: isAr ? 'المركز المالي' : 'Financial Hub', href: `/${lang}/admin/finances`, icon: CreditCard },
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('bba_test_admin');
    router.push(`/${lang}`);
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn(
      "flex flex-col h-full transition-colors duration-500",
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-primary text-white"
    )}>
      {/* 1. Brand Header */}
      <div className={cn(
        "p-6 border-b",
        isDarkMode ? "border-white/5" : "border-white/10"
      )}>
        <Link href={`/${lang}`} className="flex items-center gap-4 group">
          <div className="h-14 w-14 rounded-2xl bg-white p-2 shrink-0 shadow-2xl transition-transform group-hover:scale-105">
            <Image src="/logo.png" alt="BBA Logo" width={50} height={50} className="object-contain" unoptimized />
          </div>
          {(isSidebarOpen || isMobile) && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-500">
              <span className="font-black text-2xl tracking-tighter leading-none">BBA <span className="text-secondary">OS</span></span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-black mt-1">Admin Portal</span>
            </div>
          )}
        </Link>
      </div>

      {/* 2. Navigation */}
      <nav className="flex-1 py-8 px-3 space-y-8 overflow-y-auto custom-scrollbar">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-3">
            {(isSidebarOpen || isMobile) && (
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-4">{group.title}</p>
            )}
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-3.5 rounded-2xl transition-all group relative",
                      active 
                        ? "bg-secondary text-white shadow-xl shadow-secondary/30 scale-[1.02]" 
                        : "hover:bg-white/5 text-white/60 hover:text-white",
                      !isSidebarOpen && !isMobile ? "justify-center" : ""
                    )}
                  >
                    <item.icon className={cn("h-6 w-6 shrink-0 transition-transform", !active && "group-hover:scale-110")} />
                    {(isSidebarOpen || isMobile) && (
                      <span className="font-black text-sm tracking-tight truncate animate-in fade-in duration-300">
                        {item.label}
                      </span>
                    )}
                    {/* Tooltip for collapsed state */}
                    {!isSidebarOpen && !isMobile && (
                      <div className={cn(
                        "absolute invisible group-hover:visible bg-slate-800 text-white text-xs font-black py-2 px-4 rounded-xl shadow-2xl z-50 whitespace-nowrap",
                        isAr ? "right-full mr-4" : "left-full ml-4"
                      )}>
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. Bottom Actions (Theme, Lang, Logout) */}
      <div className={cn(
        "p-4 space-y-3 border-t",
        isDarkMode ? "border-white/5" : "border-white/10"
      )}>
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className={cn(
            "w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all font-black text-xs uppercase tracking-widest",
            isDarkMode ? "bg-white/5 text-amber-400" : "bg-white/5 text-white/60 hover:text-white",
            !isSidebarOpen && !isMobile ? "justify-center" : ""
          )}
        >
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          {(isSidebarOpen || isMobile) && <span>{isDarkMode ? (isAr ? 'الوضع الفاتح' : 'Light Mode') : (isAr ? 'الوضع الليلي' : 'Dark Mode')}</span>}
        </button>

        {/* Language Switch */}
        <Link
          href={redirectedPathname(isAr ? 'en' : 'ar')}
          className={cn(
            "w-full flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 text-white/60 hover:text-white transition-all font-black text-xs uppercase tracking-widest",
            !isSidebarOpen && !isMobile ? "justify-center" : ""
          )}
        >
          <Languages className="h-6 w-6 text-secondary" />
          {(isSidebarOpen || isMobile) && <span>{isAr ? 'English' : 'العربية'}</span>}
        </Link>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-4 p-3.5 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all font-black text-xs uppercase tracking-widest",
            !isSidebarOpen && !isMobile ? "justify-center" : ""
          )}
        >
          <LogOut className="h-6 w-6" />
          {(isSidebarOpen || isMobile) && <span>{isAr ? 'خروج آمن' : 'Secure Logout'}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className={cn(
      "min-h-screen flex overflow-hidden font-sans transition-colors duration-500",
      isDarkMode ? "bg-slate-900 admin-dark-mode" : "bg-slate-50"
    )}>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col fixed inset-y-0 z-50 transition-all duration-700 ease-in-out border-r border-black/5",
        isSidebarOpen ? "w-72" : "w-24",
        isAr ? "right-0" : "left-0"
      )}>
        <SidebarContent />
        {/* Toggle Button Floating */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "absolute top-8 h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-2xl transition-all z-[60]",
            isAr 
              ? (isSidebarOpen ? "-left-5 rotate-0" : "-left-5 rotate-180")
              : (isSidebarOpen ? "-right-5 rotate-0" : "-right-5 rotate-180")
          )}
        >
          {isAr ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </button>
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side={isAr ? 'right' : 'left'} className="p-0 border-none w-80">
          <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-700 ease-in-out",
        isSidebarOpen ? (isAr ? "lg:mr-72" : "lg:ml-72") : (isAr ? "lg:mr-24" : "lg:ml-24")
      )}>
        {/* Compact Mobile Header Only */}
        <header className="lg:hidden h-20 bg-white dark:bg-slate-950 border-b border-black/5 flex items-center px-6 justify-between sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-8 w-8 text-primary dark:text-white" />
              </Button>
              <span className="font-black text-xl text-primary dark:text-white">BBA OS</span>
           </div>
           <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-white font-black">AD</div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-10 lg:p-12 animate-in fade-in slide-in-from-bottom-3 duration-1000">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <style jsx global>{`
        .admin-dark-mode h1, .admin-dark-mode h2, .admin-dark-mode h3, .admin-dark-mode h4 { color: #f8fafc !important; }
        .admin-dark-mode p { color: #94a3b8 !important; }
        .admin-dark-mode .bg-white { background-color: #0f172a !important; border-color: #1e293b !important; }
        .admin-dark-mode .border-slate-100, .admin-dark-mode .border-slate-50 { border-color: #1e293b !important; }
        .admin-dark-mode table thead tr { background-color: #1e293b !important; }
        .admin-dark-mode table tbody tr:hover { background-color: #1e293b/50 !important; }
        .admin-dark-mode input, .admin-dark-mode select { background-color: #1e293b !important; border-color: #334155 !important; color: white !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}
