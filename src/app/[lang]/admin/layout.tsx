
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
  ShieldCheck,
  Bell,
  Search,
  Layers,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        { label: isAr ? 'إحصائيات المتقدمين' : 'Admissions Analytics', href: `/${lang}/admin/enrollments/analytics`, icon: Layers },
      ]
    },
    {
      title: isAr ? 'الأكاديميين' : 'Academics',
      items: [
        { label: isAr ? 'قائمة الطلاب' : 'Active Students', href: `/${lang}/admin/students`, icon: Users },
        { label: isAr ? 'الخطط الدراسية' : 'Academic Plans', href: `/${lang}/admin/academics/plans`, icon: GraduationCap },
        { label: isAr ? 'إدارة البرامج' : 'Programs CMS', href: `/${lang}/admin/programs`, icon: BookOpen },
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
        { label: isAr ? 'مركز المراسلات' : 'Parent Comms', href: `/${lang}/admin/communication`, icon: MessageSquare },
      ]
    },
    {
      title: isAr ? 'النظام' : 'System',
      items: [
        { label: isAr ? 'الإعدادات والصلاحيات' : 'Settings & Roles', href: `/${lang}/admin/settings`, icon: Settings },
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('bba_test_admin');
    router.push(`/${lang}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 z-50 bg-slate-900 text-white transition-all duration-300 shadow-2xl flex flex-col",
        isSidebarOpen ? "w-72" : "w-20",
        isAr ? "right-0 border-l border-white/5" : "left-0 border-r border-white/5"
      )}>
        <div className="h-24 flex items-center justify-between px-6 bg-slate-950/50">
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-white">BBA <span className="text-secondary">OS</span></span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-slate-400 font-bold">School System v2.0</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-8 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              {isSidebarOpen && <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">{group.title}</p>}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-xl transition-all group",
                        active ? "bg-secondary text-white shadow-xl shadow-secondary/20" : "hover:bg-white/5 text-slate-400 hover:text-white"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5 shrink-0", active ? "text-white" : "group-hover:scale-110 transition-transform")} />
                      {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-bold"
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span>{isAr ? 'خروج' : 'Logout'}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 min-h-screen flex flex-col relative",
        isSidebarOpen ? (isAr ? "mr-72" : "ml-72") : (isAr ? "mr-20" : "ml-20")
      )}>
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                 {menuGroups.flatMap(g => g.items).find(i => pathname === i.href)?.label || (isAr ? 'الإدارة' : 'Admin')}
              </h2>
           </div>
           
           <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center bg-slate-100 rounded-2xl px-5 py-2.5 gap-3 w-80 focus-within:ring-2 focus-within:ring-secondary/20 transition-all border border-transparent focus-within:bg-white focus-within:border-slate-200">
                 <Search className="h-4 w-4 text-slate-400" />
                 <input type="text" placeholder={isAr ? 'بحث سريع في النظام...' : 'Quick system search...'} className="bg-transparent border-none text-xs font-bold outline-none w-full text-slate-900" />
              </div>
              
              <div className="flex items-center gap-4">
                <button className="relative p-3 text-slate-400 hover:text-secondary hover:bg-slate-50 rounded-xl transition-all">
                   <Bell className="h-5 w-5" />
                   <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
                </button>
                
                <div className="h-10 w-px bg-slate-200" />

                <div className="flex items-center gap-4">
                   <div className="text-right hidden sm:block">
                      <p className="text-xs font-black text-slate-900 leading-none">Mustafa Ali</p>
                      <p className="text-[10px] text-secondary font-black uppercase mt-1 tracking-widest">Director</p>
                   </div>
                   <div className="h-12 w-12 rounded-2xl bg-slate-900 text-secondary flex items-center justify-center font-black shadow-lg">
                      MA
                   </div>
                </div>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
          {children}
        </div>
      </main>
    </div>
  );
}
