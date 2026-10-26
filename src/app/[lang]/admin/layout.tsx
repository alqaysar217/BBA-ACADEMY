
'use client';

import { ReactNode, useState, useEffect, use } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  CreditCard,
  MessageSquare,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Bell,
  Search,
  Layers,
  GraduationCap,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
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
  
  // Sidebar State: Expanded by default on Desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isTestAdmin = localStorage.getItem('bba_test_admin') === 'true';
    if (!loading && !user && !isTestAdmin && !pathname.includes('/login')) {
      router.push(`/${lang}/admin/login`);
    }
  }, [user, loading, router, lang, pathname]);

  if (pathname.includes('/login')) return children;

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
        { label: isAr ? 'إحصائيات المتقدمين' : 'Analytics', href: `/${lang}/admin/enrollments/analytics`, icon: Layers },
      ]
    },
    {
      title: isAr ? 'الأكاديميين' : 'Academics',
      items: [
        { label: isAr ? 'قائمة الطلاب' : 'Students', href: `/${lang}/admin/students`, icon: Users },
        { label: isAr ? 'الخطط الدراسية' : 'Academic Plans', href: `/${lang}/admin/academics/plans`, icon: GraduationCap },
      ]
    },
    {
      title: isAr ? 'المالية' : 'Finances',
      items: [
        { label: isAr ? 'المركز المالي' : 'Financial Hub', href: `/${lang}/admin/finances`, icon: CreditCard },
      ]
    },
    {
      title: isAr ? 'التواصل' : 'Communication',
      items: [
        { label: isAr ? 'مركز المراسلات' : 'Comms Hub', href: `/${lang}/admin/communication`, icon: MessageSquare },
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('bba_test_admin');
    router.push(`/${lang}`);
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      {/* Sidebar Header */}
      <div className={cn(
        "h-20 flex items-center px-6 bg-slate-950/40 border-b border-white/5",
        !isSidebarOpen && !isMobile ? "justify-center px-0" : "justify-between"
      )}>
        {(isSidebarOpen || isMobile) && (
          <div className="flex flex-col animate-in fade-in duration-500">
            <span className="font-black text-xl tracking-tighter text-white">BBA <span className="text-secondary">OS</span></span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-slate-400 font-bold">Admin Portal</span>
          </div>
        )}
        {!isMobile && (
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isSidebarOpen ? (isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />) : (isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-8 overflow-y-auto scrollbar-hide">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-2">
            {(isSidebarOpen || isMobile) && (
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">{group.title}</p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-xl transition-all group relative",
                      active ? "bg-secondary text-white shadow-lg shadow-secondary/20" : "hover:bg-white/5 text-slate-400 hover:text-white",
                      !isSidebarOpen && !isMobile ? "justify-center" : ""
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 shrink-0 transition-transform", !active && "group-hover:scale-110")} />
                    {(isSidebarOpen || isMobile) && (
                      <span className="font-bold text-sm truncate animate-in slide-in-from-left-2 duration-300">
                        {item.label}
                      </span>
                    )}
                    {/* Tooltip for collapsed state */}
                    {!isSidebarOpen && !isMobile && (
                      <div className={cn(
                        "absolute invisible group-hover:visible bg-slate-800 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xl z-50 whitespace-nowrap",
                        isAr ? "right-full mr-4" : "left-full ml-4"
                      )}>
                        {item.label}
                        <div className={cn(
                          "absolute top-1/2 -translate-y-1/2 border-8 border-transparent",
                          isAr ? "left-full border-l-slate-800" : "right-full border-r-slate-800"
                        )} />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-bold",
            !isSidebarOpen && !isMobile ? "justify-center" : ""
          )}
        >
          <LogOut className="h-5 w-5" />
          {(isSidebarOpen || isMobile) && <span>{isAr ? 'خروج' : 'Logout'}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
      {/* Desktop Sidebar (Persistent) */}
      <aside className={cn(
        "hidden lg:flex flex-col fixed inset-y-0 z-50 transition-all duration-500 ease-in-out border-slate-800 shadow-2xl",
        isSidebarOpen ? "w-64" : "w-20",
        isAr ? "right-0" : "left-0"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side={isAr ? 'right' : 'left'} className="p-0 border-none w-72">
          <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>

      {/* Main Page Area */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out",
        isSidebarOpen ? (isAr ? "lg:mr-64" : "lg:ml-64") : (isAr ? "lg:mr-20" : "lg:ml-20")
      )}>
        {/* Header - Compact & Clean */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden" 
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight truncate max-w-[200px] md:max-w-none">
                 {menuGroups.flatMap(g => g.items).find(i => pathname === i.href)?.label || (isAr ? 'الإدارة' : 'Admin')}
              </h2>
           </div>
           
           <div className="flex items-center gap-2 md:gap-6">
              <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2 gap-3 w-64 focus-within:ring-2 focus-within:ring-secondary/20 transition-all border border-transparent focus-within:bg-white focus-within:border-slate-200">
                 <Search className="h-4 w-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder={isAr ? 'بحث سريع...' : 'Quick search...'} 
                    className="bg-transparent border-none text-xs font-bold outline-none w-full text-slate-900" 
                 />
              </div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <button className="relative p-2.5 text-slate-400 hover:text-secondary hover:bg-slate-50 rounded-xl transition-all">
                   <Bell className="h-5 w-5" />
                   <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
                
                <div className="h-8 w-px bg-slate-200" />

                <div className="flex items-center gap-3">
                   <div className="text-right hidden sm:block">
                      <p className="text-xs font-black text-slate-900 leading-none">Admin</p>
                      <p className="text-[9px] text-secondary font-black uppercase mt-1 tracking-widest">Director</p>
                   </div>
                   <div className="h-10 w-10 rounded-xl bg-slate-900 text-secondary flex items-center justify-center font-black shadow-lg shadow-slate-900/10">
                      AD
                   </div>
                </div>
              </div>
           </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
          {children}
        </main>
      </div>
    </div>
  );
}

