'use client';

import { useEffect, useState, use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { 
  Users, 
  Search, 
  ChevronRight, 
  LogOut,
  LayoutDashboard,
  FileText,
  Clock,
  Calendar,
  Mail
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function AdminDashboard({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const { user, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const isAr = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isTestAdmin = localStorage.getItem('bba_test_admin') === 'true';
    if (!authLoading && !user && !isTestAdmin) {
      router.push(`/${lang}/admin/login`);
    }
  }, [user, authLoading, router, lang]);

  const enrollmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'enrollments'),
      where('status', '==', 'submitted'),
      orderBy('submittedAt', 'desc')
    );
  }, [firestore]);

  const { data: enrollments, loading: dataLoading } = useCollection(enrollmentsQuery);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('bba_test_admin');
    router.push(`/${lang}`);
  };

  if (!mounted || authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
           <div className="h-12 w-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
           <p className="text-sm font-black text-primary uppercase tracking-widest">{isAr ? 'جاري التحميل...' : 'System Loading...'}</p>
        </div>
      </div>
    );
  }

  const filteredEnrollments = enrollments.filter(e => 
    e.parent1Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.students?.some((s: any) => s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = [
    { label: isAr ? 'إجمالي الطلبات' : 'Total Apps', value: enrollments.length, icon: FileText, color: 'text-primary' },
    { label: isAr ? 'إجمالي الطلاب' : 'Total Students', value: enrollments.reduce((acc, curr) => acc + (curr.students?.length || 0), 0), icon: Users, color: 'text-secondary' },
    { label: isAr ? 'قيد المراجعة' : 'In Review', value: enrollments.filter(e => e.status === 'submitted').length, icon: Clock, color: 'text-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <header className="h-20 bg-primary text-white flex items-center px-6 md:px-12 sticky top-0 z-30 shadow-xl">
        <div className="container-tight flex items-center justify-between w-full">
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center">
                 <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <div>
                 <h1 className="text-lg font-black uppercase tracking-tight">{isAr ? 'لوحة التحكم' : 'Admin Console'}</h1>
                 <p className="text-[9px] text-secondary font-bold uppercase tracking-widest">Management System</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="hidden md:block text-right">
                <p className="text-xs font-black">{user?.email || 'Test Administrator'}</p>
                <p className="text-[9px] text-white/50 font-bold uppercase">Administrator</p>
             </div>
             <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white hover:bg-white/10">
                <LogOut className="h-5 w-5" />
             </Button>
           </div>
        </div>
      </header>

      <main className="flex-1 py-10 px-4 md:px-8">
        <div className="container-tight space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="border-none shadow-sm rounded-2xl">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className={cn("h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center", stat.color)}>
                     <stat.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-primary">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h2 className="text-2xl font-black text-primary uppercase tracking-tight">{isAr ? 'طلبات التسجيل الأخيرة' : 'Recent Enrollments'}</h2>
                  <p className="text-xs text-slate-500 font-bold">{isAr ? 'إدارة ومراجعة الطلبات الواردة من الموقع' : 'Review and manage incoming registrations'}</p>
               </div>
               
               <div className="flex items-center gap-3 w-full md:w-auto">
                 <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder={isAr ? 'بحث بالاسم...' : 'Search names...'} 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 rounded-xl bg-white border-none shadow-sm font-bold"
                    />
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredEnrollments.map((app) => (
                <div key={app.id} className="group bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-start gap-5">
                       <div className="h-14 w-14 rounded-2xl bg-secondary/5 text-secondary flex items-center justify-center shrink-0 border border-secondary/10">
                          <UserCircle2 className="h-7 w-7" />
                       </div>
                       <div className="space-y-1">
                          <div className="flex items-center gap-3">
                             <h3 className="text-lg font-black text-primary">{app.parent1Name}</h3>
                             <Badge variant="secondary" className="text-[9px] uppercase font-black bg-slate-100 text-slate-500 border-none">
                                {app.lang === 'ar' ? 'العربية' : 'English'}
                             </Badge>
                          </div>
                          <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                             <Mail className="h-3.5 w-3.5" /> {app.parent1Email}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1">
                             {app.students?.map((s: any, idx: number) => (
                               <Badge key={idx} variant="outline" className="text-[9px] font-black uppercase border-slate-200 text-primary bg-slate-50">
                                 {s.firstName} - Grade {s.lastGrade}
                               </Badge>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                       <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                          <Calendar className="h-3 w-3" />
                          {app.submittedAt && format((app.submittedAt as Timestamp).toDate(), 'MMM dd, yyyy HH:mm')}
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="text-right hidden sm:block">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'البرنامج المختار' : 'Program Selection'}</p>
                             <p className="text-xs font-black text-secondary uppercase">
                                {app.programOption === 'grades-3-5' ? 'Grade 3-5' : 
                                 app.programOption === 'grades-6-12' ? 'Grade 6-12' : 'Weekend'}
                             </p>
                          </div>
                          <Button 
                            className="bg-primary hover:bg-secondary text-white rounded-xl h-12 px-6 gap-2 font-black transition-all group-hover:scale-105"
                            onClick={() => router.push(`/${lang}/admin/enrollments/${app.id}`)}
                          >
                             {isAr ? 'عرض التفاصيل' : 'Review Details'}
                             <ChevronRight className="h-4 w-4" />
                          </Button>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredEnrollments.length === 0 && (
                <div className="py-20 text-center space-y-4">
                   <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                      <Search className="h-10 w-10 text-slate-300" />
                   </div>
                   <p className="text-slate-400 font-bold">{isAr ? 'لا توجد طلبات تطابق بحثك' : 'No matching applications found'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function UserCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}
