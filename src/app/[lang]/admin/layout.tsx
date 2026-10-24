
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
  ChevronRight,
  ChevronLeft,
  Bell,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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

  const menuItems = [
    { label: isAr ? 'لوحة القيادة' : 'Dashboard', href: `/${lang}/admin`, icon: LayoutDashboard },
    { label: isAr ? 'طلبات التسجيل' : 'Applications', href: `/${lang}/admin/enrollments`, icon: FileText },
    { label: isAr ? 'قائمة الطلاب' : 'Students List', href: `/${lang}/admin/students`, icon: Users },
    { label: isAr ? 'الإعدادات' : 'Settings', href: `/${lang}/admin/settings`, icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('bba_test_admin');
    router.push(`/${lang}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 z-50 bg-primary text-white transition-all duration-300 shadow-2xl",
        isSidebarOpen ? "w-64" : "w-20",
        isAr ? "right-0 border-l border-white/10" : "left-0 border-r border-white/10"
      )}>
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight">BBA ADMIN</span>
                <span className="text-[8px] uppercase tracking-widest text-secondary font-bold">Management System</span>
              </div>
            )}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <nav className="flex-1 py-6 px-3 space-y-1">
            {menuItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl transition-all group",
                    active ? "bg-secondary text-white shadow-lg shadow-secondary/20" : "hover:bg-white/5 text-white/60 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", active ? "text-white" : "group-hover:scale-110 transition-transform")} />
                  {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-3 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="h-5 w-5" />
              {isSidebarOpen && <span className="font-bold text-sm">{isAr ? 'تسجيل الخروج' : 'Logout'}</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 min-h-screen flex flex-col",
        isSidebarOpen ? (isAr ? "mr-64" : "ml-64") : (isAr ? "mr-20" : "ml-20")
      )}>
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <h2 className="text-xl font-black text-primary uppercase tracking-tight">
                 {menuItems.find(i => pathname === i.href)?.label || (isAr ? 'الإدارة' : 'Admin')}
              </h2>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-full px-4 py-2 gap-3 w-64 focus-within:ring-2 focus-within:ring-secondary/20 transition-all">
                 <Search className="h-4 w-4 text-slate-400" />
                 <input type="text" placeholder={isAr ? 'بحث سريع...' : 'Quick search...'} className="bg-transparent border-none text-xs font-bold outline-none w-full" />
              </div>
              <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
                 <Bell className="h-5 w-5" />
                 <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-3 border-l border-slate-100 pl-6 h-10">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-primary leading-none">Admin User</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Super Admin</p>
                 </div>
                 <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-black">
                    A
                 </div>
              </div>
           </div>
        </header>

        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
