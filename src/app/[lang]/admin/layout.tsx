
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
  Settings,
  TableProperties,
  LayoutTemplate,
  UserCheck
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
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('bba_admin_theme');
      if (savedTheme === 'dark') setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bba_admin_theme', newTheme ? 'dark' : 'light');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTestAdmin = localStorage.getItem('bba_test_admin') === 'true';
      if (!loading && !user && !isTestAdmin && pathname && !pathname.includes('/login')) {
        router.push(`/${lang}/admin/login`);
      }
    }
  }, [user, loading, router, lang, pathname]);

  const hasPermission = (module: string, action: 'read' | 'write' | 'delete' | 'execute' = 'read') => {
    if (typeof window !== 'undefined' && localStorage.getItem('bba_test_admin') === 'true') return true;
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
      title: isAr ? 'القبول والتسجيل' : 'Admissions & Enrollment',
      show: hasPermission('enrollments'),
      items: [
        { label: isAr ? 'سجل الطلبات' : 'Admissions Register', href: `/${lang}/admin/enrollments`, icon: FileText, show: true },
        { label: isAr ? 'مراسلات أولياء الأمور' : 'Parent Communications', href: `/${lang}/admin/enrollments/communications`, icon: MessageSquare, show: true },
        { label: isAr ? 'الطلاب المقبولون' : 'Accepted Students', href: `/${lang}/admin/enrollments/accepted`, icon: UserCheck, show: true },
        { label: isAr ? 'قوالب الرسائل' : 'Email Templates', href: `/${lang}/admin/enrollments/templates`, icon: LayoutTemplate, show: true },
        { label: isAr ? 'جدول الطلبات الشامل' : 'Comprehensive Table', href: `/${lang}/admin/enrollments/table`, icon: TableProperties, show: true },
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
      title: isAr ? 'إدارة المستخدمين' : 'User Management',
      show: hasPermission('users'),
      items: [
        { label: isAr ? 'سجل الحسابات' : 'Account Registry', href: `/${lang}/admin/users`, icon: Users2, show: true },
        { label: isAr ? 'إضافة موظف' : 'Register Staff', href: `/${lang}/admin/users/new`, icon: UserPlus, show: hasPermission('users', 'write') },
        { label: isAr ? 'صلاحيات الوصول' : 'Access Privileges', href: `/${lang}/admin/users/permissions`, icon: KeyRound, show: hasPermission('users', 'execute') },
      ]
    },
    {
      title: isAr ? 'الأكاديميا والمالية' : 'Academic & Finance',
      show: true,
      items: [
        { label: isAr ? 'الخطط الدراسية' : 'Study Plans', icon: BookOpen, href: `/${lang}/admin/academic/plans`, show: hasPermission('academic') },
        { label: isAr ? 'المركز المالي' : 'Financial Hub', href: `/${lang}/admin/finances`, icon: CreditCard, show: hasPermission('finances') },
      ]
    },
    {
      title: isAr ? 'التقارير والإعدادات' : 'Reports & Settings',
      show: true,
      items: [
        { label: isAr ? 'إدارة المحتوى' : 'CMS', href: `/${lang}/admin/cms`, icon: Briefcase, show: hasPermission('cms') },
        { label: isAr ? 'مركز التقارير' : 'Reporting Center', href: `/${lang}/admin/reports`, icon: BarChart3, show: true },
        { label: isAr ? 'سلة المهملات' : 'Trash Bin', href: `/${lang}/admin/users/trash`, icon: Trash2, show: true },
      ]
    }
  ];

  useEffect(() => {
    if (!pathname) return;
    menuGroups.forEach(group => {
      const hasActiveChild = group.items.some(item => pathname === item.href || (item.href !== `/${lang}/admin` && pathname.startsWith(item.href)));
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
      "flex flex-col h-full transition-all duration-300 relative z-10",
      isAr ? "font-arabic" : "font-sans",
      isDarkMode 
        ? "bg-slate-950 text-slate-100" 
        : "bg-primary text-white"
    )}>
      <div className="p-6 border-b border-white/5 relative z-10 flex flex-col gap-4">
        <Link href={`/${lang}`} className="flex items-center gap-4 group">
          <div className="h-10 w-10 rounded-xl bg-white p-2 shrink-0 shadow-xl transition-all duration-500 group-hover:rotate-12">
            <Image src="/logo.png" alt="BBA Logo" width={32} height={32} className="object-contain" unoptimized />
          </div>
          {(isSidebarOpen || isMobile) && (
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter leading-none">BBA <span className="text-secondary">OS</span></span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-black mt-1">Management Portal</span>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-4 overflow-y-auto relative z-10 no-scrollbar">
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
                    "w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all group font-black text-[9px] uppercase tracking-[0.2em] relative overflow-hidden",
                    isGroupOpen ? "bg-white/10 text-white" : "text-white/30 hover:bg-white/5 hover:text-white"
                  )}>
                    <span className="truncate">{group.title}</span>
                    <ChevronDown className={cn("h-3 w-3 transition-transform duration-500", !isGroupOpen && (isAr ? "rotate-90" : "-rotate-90"))} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                    {group.items.map((item, iIdx) => {
                      if (!item.show) return null;
                      const active = pathname === item.href || (item.href !== `/${lang}/admin` && pathname.startsWith(item.href));
                      return (
                        <Link
                          key={`${item.label}-${iIdx}`}
                          href={item.href}
                          onClick={() => isMobile && setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 p-2.5 rounded-lg transition-all group mx-1",
                            active 
                              ? "bg-secondary text-white shadow-lg" 
                              : "hover:bg-white/5 text-white/50 hover:text-white"
                          )}
                        >
                          <div className={cn(
                             "h-8 w-8 rounded-lg flex items-center justify-center transition-all",
                             active ? "bg-white/20 text-white" : "bg-white/5 text-secondary/60 group-hover:text-secondary"
                          )}>
                             <item.icon className="h-4 w-4" />
                          </div>
                          <span className="font-bold text-[12px] tracking-tight truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </CollapsibleContent>
                </>
              ) : (
                <div className="space-y-3 flex flex-col items-center">
                  {group.items.map((item, iIdx) => {
                    if (!item.show) return null;
                    const active = pathname === item.href || (item.href !== `/${lang}/admin` && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={`${item.label}-${iIdx}`}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center h-10 w-10 rounded-lg transition-all group relative",
                          active ? "bg-secondary text-white shadow-lg" : "bg-white/5 text-white/30 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </Collapsible>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t border-white/5 relative z-10">
        <div className="flex gap-2">
          <button onClick={toggleTheme} className="flex-1 p-2.5 bg-white/5 rounded-lg text-white/50 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href={redirectedPathname(isAr ? 'en' : 'ar')} className="flex-1 p-2.5 bg-white/5 rounded-lg text-white/50 flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all">
            <Languages className="h-4 w-4 text-secondary" />
            {(isSidebarOpen || isMobile) && <span className="text-[10px] font-black tracking-widest">{isAr ? 'EN' : 'AR'}</span>}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn(
      "min-h-screen flex overflow-hidden transition-colors duration-500",
      isAr ? "font-arabic" : "font-sans",
      isDarkMode ? "bg-slate-900" : "bg-slate-50/50"
    )}>
      <aside className={cn(
        "hidden lg:flex flex-col fixed inset-y-0 z-50 transition-all duration-500 ease-in-out border-r border-black/5 shadow-2xl",
        isSidebarOpen ? "w-64" : "w-20",
        isAr ? "right-0" : "left-0"
      )}>
        <SidebarInner />
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className={cn(
            "absolute top-10 h-8 w-8 rounded-lg bg-white text-primary flex items-center justify-center shadow-xl transition-all z-[60] border border-slate-100 hover:scale-110", 
            isAr ? "-left-4" : "-right-4"
          )}
        >
          {isAr ? (isSidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />) : (isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
        </button>
      </aside>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side={isAr ? 'right' : 'left'} className="p-0 border-none w-72">
          <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
          <SidebarInner isMobile />
        </SheetContent>
      </Sheet>

      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out min-w-0 overflow-hidden", 
        isSidebarOpen ? (isAr ? "lg:mr-64" : "lg:ml-64") : (isAr ? "lg:mr-20" : "lg:ml-20")
      )}>
        <header className="lg:hidden h-16 bg-white/80 backdrop-blur-xl border-b border-black/5 flex items-center px-6 justify-between sticky top-0 z-40">
           <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} className="rounded-lg bg-slate-100">
             <Menu className="h-5 w-5 text-primary" />
           </Button>
           <span className="font-black text-primary uppercase tracking-tighter text-lg">BBA <span className="text-secondary">OS</span></span>
           <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-primary/30 border border-slate-200">
              <UserCog className="h-5 w-5" />
           </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-10 animate-in fade-in duration-700 w-full overflow-hidden flex flex-col">
          <div className="w-full max-w-[1500px] mx-auto relative flex-1 min-w-0 flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
