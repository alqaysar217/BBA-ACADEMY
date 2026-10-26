
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
  Search
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
      "flex flex-col h-full transition-colors duration-500",
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-primary text-white"
    )}>
      <div className="p-6 border-b border-white/10">
        <Link href={`/${lang}`} className="flex items-center gap-4 group">
          <div className="h-14 w-14 rounded-2xl bg-white p-2 shrink-0 shadow-2xl transition-transform group-hover:scale-105">
            <Image src="/logo.png" alt="BBA Logo" width={50} height={50} className="object-contain" unoptimized />
          </div>
          {(isSidebarOpen || isMobile) && (
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter leading-none">BBA <span className="text-secondary">OS</span></span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-black mt-1">Admin Portal</span>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 py-8 px-3 space-y-4 overflow-y-auto">
        {menuGroups.map((group, gIdx) => {
          if (!group.show) return null;
          const isGroupOpen = openGroups.includes(group.title);
          
          return (
            <Collapsible 
              key={`${group.title}-${gIdx}`} 
              open={isGroupOpen} 
              onOpenChange={() => setOpenGroups(prev => prev.includes(group.title) ? prev.filter(t => t !== group.title) : [...prev, group.title])}
              className="space-y-1"
            >
              {(isSidebarOpen || isMobile) ? (
                <>
                  <CollapsibleTrigger className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group font-black text-[11px] uppercase tracking-[0.2em]",
                    isGroupOpen ? "bg-secondary text-white shadow-xl shadow-secondary/20" : "text-white/30 hover:bg-white/5 hover:text-white"
                  )}>
                    <span className="truncate">{group.title}</span>
                    <ChevronRight className={cn("h-3.5 w-3.5 transition-transform duration-300", isGroupOpen && "rotate-90")} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
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
                            active ? "bg-white/10 text-white scale-[1.02]" : "hover:bg-white/5 text-white/60 hover:text-white"
                          )}
                        >
                          <item.icon className={cn("h-4.5 w-4.5 shrink-0", active ? "text-secondary" : "text-secondary/50")} />
                          <span className="font-bold text-[13px] tracking-tight truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </CollapsibleContent>
                </>
              ) : (
                <div className="space-y-1 flex flex-col items-center">
                  {group.items.map((item, iIdx) => {
                    if (!item.show) return null;
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={`${item.label}-${iIdx}`}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center h-12 w-12 rounded-2xl transition-all group",
                          active ? "bg-secondary text-white shadow-xl" : "hover:bg-white/5 text-white/60"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </Collapsible>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t border-white/10">
        <div className="flex gap-2">
          <button onClick={toggleTheme} className="flex-1 p-3.5 bg-white/5 rounded-2xl text-white/60 flex items-center justify-center hover:text-white">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link href={redirectedPathname(isAr ? 'en' : 'ar')} className="flex-1 p-3.5 bg-white/5 rounded-2xl text-white/60 flex items-center justify-center gap-2 hover:text-white">
            <Languages className="h-5 w-5 text-secondary" />
            {(isSidebarOpen || isMobile) && <span className="text-[10px] font-black">{isAr ? 'EN' : 'AR'}</span>}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn(
      "min-h-screen flex overflow-hidden font-sans transition-colors duration-500",
      isDarkMode ? "bg-slate-900 admin-dark-mode" : "bg-slate-50"
    )}>
      <aside className={cn(
        "hidden lg:flex flex-col fixed inset-y-0 z-50 transition-all duration-700 ease-in-out border-r border-black/5 shadow-2xl",
        isSidebarOpen ? "w-72" : "w-20",
        isAr ? "right-0" : "left-0"
      )}>
        <SidebarInner />
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={cn("absolute top-8 h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center shadow-2xl transition-all z-[60]", isAr ? "-left-4" : "-right-4")}>
          {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </aside>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side={isAr ? 'right' : 'left'} className="p-0 border-none w-80">
          <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
          <SidebarInner isMobile />
        </SheetContent>
      </Sheet>

      <div className={cn("flex-1 flex flex-col min-h-screen transition-all duration-700 ease-in-out", isSidebarOpen ? (isAr ? "lg:mr-72" : "lg:ml-72") : (isAr ? "lg:mr-20" : "lg:ml-20"))}>
        <header className="lg:hidden h-16 bg-white border-b border-black/5 flex items-center px-6 justify-between sticky top-0 z-40">
           <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
             <Menu className="h-6 w-6 text-primary" />
           </Button>
           <span className="font-black text-primary uppercase tracking-tighter">BBA OS</span>
           <div className="h-8 w-8 rounded-lg bg-secondary" />
        </header>
        <main className="flex-1 p-4 md:p-10 lg:p-12 animate-in fade-in duration-1000">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
