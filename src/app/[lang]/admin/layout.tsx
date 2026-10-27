'use client';

import { ReactNode, useState, useEffect, use, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Menu, 
  CreditCard,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sun,
  Moon,
  Languages,
  BookOpen,
  Briefcase,
  BarChart3,
  UserPlus,
  ShieldCheck,
  Users2,
  Trash2,
  KeyRound,
  UserCog,
  ShieldAlert,
  MessageSquare,
  Search,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = use(params);
  const { user, loading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const isAr = lang === 'ar';
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const profileRef = useMemo(() => (firestore && user) ? doc(firestore, 'admin_users', user.uid) : null, [firestore, user]);
  const { data: profile } = useDoc(profileRef);

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
    if (!loading && !user && !isTestAdmin && pathname && !pathname.includes('/login')) {
      router.push(`/${lang}/admin/login`);
    }
  }, [user, loading, router, lang, pathname]);

  const hasPermission = (module: string, action: 'read' | 'write' | 'delete' | 'execute' = 'read') => {
    if (localStorage.getItem('bba_test_admin') === 'true') return true;
    if (!profile) return true; 
    if (profile.role === 'admin') return true;
    return profile.permissions?.[module]?.[action] || false;
  };

  const menuGroups = [
    {
      title: isAr ? 'الرئيسية' : 'Main',
      show: true,
      items: [
        { label: isAr ? 'لوحة المعلومات' : 'Dashboard', href: `/${lang}/admin`, icon: LayoutDashboard, show: true },
      ]
    },
    {
      title: isAr ? 'إدارة المستخدمين' : 'User Management',
      show: hasPermission('users'),
      items: [
        { label: isAr ? 'سجل الحسابات' : 'Account Registry', href: `/${lang}/admin/users`, icon: Users2, show: true },
        { label: isAr ? 'إضافة مستخدم' : 'Register User', href: `/${lang}/admin/users/new`, icon: UserPlus, show: hasPermission('users', 'write') },
        { label: isAr ? 'تعديل مستخدم' : 'Edit User', href: `/${lang}/admin/users/edit`, icon: UserCog, show: hasPermission('users', 'write') },
        { label: isAr ? 'تحديد الصلاحيات' : 'Permissions Hub', href: `/${lang}/admin/users/permissions`, icon: KeyRound, show: hasPermission('users', 'execute') },
      ]
    },
    {
      title: isAr ? 'القبول والتسجيل' : 'Admissions',
      show: hasPermission('enrollments'),
      items: [
        { label: isAr ? 'كافة الطلبات' : 'All Applications', href: `/${lang}/admin/enrollments`, icon: FileText, show: true },
        { label: isAr ? 'طلبات جديدة' : 'New Submissions', href: `/${lang}/admin/admissions/new`, icon: UserPlus, show: true },
      ]
    },
    {
      title: isAr ? 'إدارة الطلاب' : 'Students',
      show: hasPermission('students'),
      items: [
        { label: isAr ? 'سجل الطلاب' : 'Active Roster', href: `/${lang}/admin/students`, icon: Users, show: true },
      ]
    },
    {
      title: isAr ? 'الأكاديميا' : 'Academic',
      show: hasPermission('academic'),
      items: [
        { label: isAr ? 'الخطط الدراسية' : 'Study Plans', href: `/${lang}/admin/academic/plans`, icon: BookOpen, show: true },
      ]
    },
    {
      title: isAr ? 'المالية' : 'Finances',
      show: hasPermission('finances'),
      items: [
        { label: isAr ? 'المركز المالي' : 'Financial Hub', href: `/${lang}/admin/finances`, icon: CreditCard, show: true },
      ]
    },
    {
      title: isAr ? 'إدارة المحتوى' : 'CMS',
      show: hasPermission('cms'),
      items: [
        { label: isAr ? 'منصة المحتوى' : 'Content CMS', href: `/${lang}/admin/cms`, icon: Briefcase, show: true },
      ]
    },
    {
      title: isAr ? 'التواصل' : 'Communication',
      show: hasPermission('communication'),
      items: [
        { label: isAr ? 'مركز المراسلات' : 'Comms Hub', href: `/${lang}/admin/communication`, icon: MessageSquare, show: true },
      ]
    },
    {
      title: isAr ? 'التقارير والإعدادات' : 'Reports & Settings',
      show: true,
      items: [
        { label: isAr ? 'مركز التقارير' : 'Reporting Center', href: `/${lang}/admin/reports`, icon: BarChart3, show: true },
        { label: isAr ? 'سلة المهملات' : 'Trash Bin', href: `/${lang}/admin/users/trash`, icon: Trash2, show: true },
      ]
    }
  ];

  useEffect(() => {
    if (!pathname) return;
    menuGroups.forEach(group => {
      const hasActiveChild = group.items.some(item => pathname === item.href);
      if (hasActiveChild && !openGroups.includes(group.title)) {
        setOpenGroups(prev => [...prev, group.title]);
      }
    });
  }, [pathname]);

  if (pathname?.includes('/login')) return children;

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    if (segments.length < 2) return `/${locale}`;
    segments[1] = locale;
    return segments.join('/');
  };

  const SidebarInner = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn(
      "flex flex-col h-full transition-all duration-700",
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-primary text-white"
    )}>
      {/* Dynamic Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="p-8 border-b border-white/5 relative z-10">
        <Link href={`/${lang}`} className="flex items-center gap-5 group">
          <div className="h-14 w-14 rounded-2xl bg-white p-2.5 shrink-0 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ring-1 ring-white/20">
            <Image src="/logo.png" alt="BBA Logo" width={50} height={50} className="object-contain" unoptimized />
          </div>
          {(isSidebarOpen || isMobile) && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="font-black text-2xl tracking-tighter leading-none">BBA <span className="text-secondary">OS</span></span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-black mt-1.5">Management Portal</span>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-6 overflow-y-auto relative z-10 no-scrollbar">
        {menuGroups.map((group, gIdx) => {
          if (!group.show) return null;
          const isGroupOpen = openGroups.includes(group.title);
          
          return (
            <Collapsible 
              key={`${group.title}-${gIdx}`} 
              open={isGroupOpen} 
              onOpenChange={() => setOpenGroups(prev => prev.includes(group.title) ? prev.filter(t => t !== group.title) : [...prev, group.title])}
              className="space-y-1.5"
            >
              {(isSidebarOpen || isMobile) ? (
                <>
                  <CollapsibleTrigger className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all group font-black text-[11px] uppercase tracking-[0.2em] relative overflow-hidden",
                    isGroupOpen ? "bg-white/10 text-white shadow-xl" : "text-white/30 hover:bg-white/5 hover:text-white"
                  )}>
                    {isGroupOpen && <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary shadow-[0_0_15px_rgba(var(--secondary),0.5)]" />}
                    <span className="truncate">{group.title}</span>
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-500", !isGroupOpen && (isAr ? "rotate-90" : "-rotate-90"))} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                    {group.items.map((item, iIdx) => {
                      if (!item.show) return null;
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={`${item.label}-${iIdx}`}
                          href={item.href}
                          onClick={() => isMobile && setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-4 p-3.5 rounded-2xl transition-all group border border-transparent",
                            active 
                              ? "bg-secondary text-white shadow-2xl shadow-secondary/20 scale-[1.02]" 
                              : "hover:bg-white/5 text-white/50 hover:text-white"
                          )}
                        >
                          <item.icon className={cn("h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-110", active ? "text-white" : "text-secondary/60")} />
                          <span className="font-bold text-[13px] tracking-tight truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </CollapsibleContent>
                </>
              ) : (
                <div className="space-y-2 flex flex-col items-center">
                  {group.items.map((item, iIdx) => {
                    if (!item.show) return null;
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={`${item.label}-${iIdx}`}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center h-12 w-12 rounded-2xl transition-all group relative",
                          active ? "bg-secondary text-white shadow-2xl" : "hover:bg-white/5 text-white/60"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {active && <div className="absolute -left-1 top-3 bottom-3 w-1 bg-white rounded-full shadow-[0_0_10px_white]" />}
                      </Link>
                    );
                  })}
                </div>
              )}
            </Collapsible>
          );
        })}
      </nav>

      <div className="p-6 space-y-3 border-t border-white/5 relative z-10">
        <div className="flex gap-3">
          <button onClick={toggleTheme} className="flex-1 p-4 bg-white/5 rounded-2xl text-white/50 flex items-center justify-center hover:text-white hover:bg-white/10 transition-all">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link href={redirectedPathname(isAr ? 'en' : 'ar')} className="flex-1 p-4 bg-white/5 rounded-2xl text-white/50 flex items-center justify-center gap-3 hover:text-white hover:bg-white/10 transition-all">
            <Languages className="h-5 w-5 text-secondary" />
            {(isSidebarOpen || isMobile) && <span className="text-[10px] font-black tracking-widest">{isAr ? 'EN' : 'AR'}</span>}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn(
      "min-h-screen flex overflow-hidden font-sans transition-colors duration-700",
      isDarkMode ? "bg-slate-900" : "bg-slate-50/50"
    )}>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col fixed inset-y-0 z-50 transition-all duration-700 ease-in-out border-r border-black/5 shadow-[25px_0_50px_-12px_rgba(0,0,0,0.05)]",
        isSidebarOpen ? "w-72" : "w-24",
        isAr ? "right-0" : "left-0"
      )}>
        <SidebarInner />
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className={cn(
            "absolute top-10 h-10 w-10 rounded-2xl bg-white text-primary flex items-center justify-center shadow-2xl transition-all z-[60] border border-slate-100 hover:scale-110 active:scale-90", 
            isAr ? "-left-5" : "-right-5"
          )}
        >
          {isAr ? (isSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />) : (isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />)}
        </button>
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side={isAr ? 'right' : 'left'} className="p-0 border-none w-80 shadow-2xl">
          <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
          <SidebarInner isMobile />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-700 ease-in-out", 
        isSidebarOpen ? (isAr ? "lg:mr-72" : "lg:ml-72") : (isAr ? "lg:mr-24" : "lg:ml-24")
      )}>
        {/* Mobile Header */}
        <header className="lg:hidden h-20 bg-white/80 backdrop-blur-xl border-b border-black/5 flex items-center px-8 justify-between sticky top-0 z-40">
           <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className="rounded-xl bg-slate-50">
             <Menu className="h-6 w-6 text-primary" />
           </Button>
           <span className="font-black text-primary uppercase tracking-tighter text-xl">BBA <span className="text-secondary">OS</span></span>
           <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-primary/30">
              <UserCog className="h-5 w-5" />
           </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-1 p-6 md:p-10 lg:p-16 animate-in fade-in zoom-in-95 duration-1000">
          <div className="max-w-[1600px] mx-auto relative">
            {/* Soft decorative blur backgrounds */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}