
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Search, UserPlus, ShieldCheck, Mail, Calendar, 
  Trash2, Ban, CheckCircle2, ChevronRight, Filter,
  MoreVertical, ShieldAlert, UserCog, PencilLine
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function UserRegistryPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');

  const usersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'admin_users'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: users, loading } = useCollection(usersQuery);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(u => 
      u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const toggleUserStatus = async (user: any) => {
    if (!firestore) return;
    const newStatus = user.status === 'active' ? 'blocked' : 'active';
    try {
      await updateDoc(doc(firestore, 'admin_users', user.id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      toast({
        title: isAr ? "تم تحديث الحالة" : "Status Updated",
        description: isAr ? `تم ${newStatus === 'blocked' ? 'حظر' : 'تفعيل'} الحساب بنجاح.` : `Account successfully ${newStatus === 'blocked' ? 'blocked' : 'activated'}.`,
      });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to update status." });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!firestore) return;
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذا الحساب؟ لا يمكن التراجع عن هذه العملية.' : 'Are you sure you want to delete this account? This action cannot be undone.')) return;
    
    try {
      await deleteDoc(doc(firestore, 'admin_users', userId));
      toast({ title: isAr ? "تم الحذف" : "Deleted", description: isAr ? "تم حذف الحساب نهائياً." : "Account has been deleted." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete user." });
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'إدارة المستخدمين' : 'User Management'}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'إدارة حسابات المسؤولين والصلاحيات' : 'Manage Admin Accounts & Permissions'}</p>
         </div>
         <Button asChild className="h-14 rounded-2xl bg-secondary text-white font-black px-8 shadow-xl shadow-secondary/20 transition-all active:scale-95">
            <Link href={`/${lang}/admin/users/new`}>
               <UserPlus className="h-5 w-5 mr-2" /> {isAr ? 'إنشاء حساب جديد' : 'Create New Account'}
            </Link>
         </Button>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
         <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
            <Input 
               placeholder={isAr ? 'بحث بالاسم أو البريد...' : 'Search by name or email...'} 
               className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex gap-3 w-full lg:w-auto">
            <Button variant="outline" className="h-14 rounded-2xl px-6 border-slate-100 font-black gap-2">
               <Filter className="h-4 w-4" /> {isAr ? 'تصفية' : 'Filters'}
            </Button>
         </div>
      </Card>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
         <div className="overflow-x-auto">
            <TooltipProvider delayDuration={0}>
              <table className="w-full">
                 <thead>
                    <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                       <th className="px-10 py-6 text-left">{isAr ? 'المستخدم' : 'User Details'}</th>
                       <th className="px-10 py-6 text-left">{isAr ? 'الدور الوظيفي' : 'Role'}</th>
                       <th className="px-10 py-6 text-left">{isAr ? 'الحالة' : 'Status'}</th>
                       <th className="px-10 py-6 text-left">{isAr ? 'تاريخ الإنشاء' : 'Created At'}</th>
                       <th className="px-10 py-6 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={5} className="h-24 bg-slate-50/50" /></tr>)
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-32 text-center">
                          <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-200 mb-6">
                             <UserCog className="h-10 w-10" />
                          </div>
                          <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{isAr ? 'لا يوجد مستخدمون حالياً' : 'No user accounts found'}</p>
                        </td>
                      </tr>
                    ) : filteredUsers.map((user: any) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-all group">
                         <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                               <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-md">
                                  <Image 
                                     src={user.photoURL || '/logo.png'} 
                                     alt={user.displayName} 
                                     width={40} 
                                     height={40} 
                                     className="object-contain p-1"
                                     unoptimized
                                  />
                               </div>
                               <div>
                                  <p className="text-sm font-black text-slate-900 leading-none mb-1">{user.displayName}</p>
                                  <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase">
                                     <Mail className="h-3 w-3" /> {user.email}
                                  </div>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-6">
                            <Badge variant="outline" className="rounded-lg bg-secondary/5 border-secondary/20 text-secondary font-black text-[9px] uppercase tracking-widest px-3 py-1">
                               {user.role}
                            </Badge>
                         </td>
                         <td className="px-10 py-6">
                            <Badge className={cn(
                              "rounded-lg border-none font-black text-[9px] uppercase px-3 py-1",
                              user.status === 'active' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            )}>
                               {user.status === 'active' ? (isAr ? 'نشط' : 'Active') : (isAr ? 'محظور' : 'Blocked')}
                            </Badge>
                         </td>
                         <td className="px-10 py-6">
                            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                               <Calendar className="h-3.5 w-3.5" />
                               {user.createdAt ? format(user.createdAt.toDate(), 'MMM dd, yyyy') : '-'}
                            </div>
                         </td>
                         <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                               {/* Edit Profile Button */}
                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md">
                                        <PencilLine className="h-4.5 w-4.5 text-slate-400 hover:text-primary transition-colors" />
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-primary text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">
                                     {isAr ? 'تعديل البيانات' : 'Edit Profile Data'}
                                  </TooltipContent>
                               </Tooltip>

                               {/* Permissions Button */}
                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md" asChild>
                                        <Link href={`/${lang}/admin/users/${user.id}`}>
                                           <UserCog className="h-4.5 w-4.5 text-slate-400 hover:text-secondary transition-colors" />
                                        </Link>
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-secondary text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">
                                     {isAr ? 'إدارة الصلاحيات' : 'Manage Permissions'}
                                  </TooltipContent>
                               </Tooltip>

                               {/* Status Toggle Button */}
                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button onClick={() => toggleUserStatus(user)} size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-md">
                                        <Ban className={cn("h-4.5 w-4.5 transition-colors", user.status === 'active' ? "text-amber-500" : "text-green-500")} />
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">
                                     {user.status === 'active' ? (isAr ? 'حظر الحساب' : 'Block Access') : (isAr ? 'تفعيل الحساب' : 'Activate Access')}
                                  </TooltipContent>
                               </Tooltip>

                               {/* Delete Button */}
                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button onClick={() => deleteUser(user.id)} size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-red-50">
                                        <Trash2 className="h-4.5 w-4.5 text-red-400" />
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-red-600 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">
                                     {isAr ? 'حذف نهائي' : 'Permanent Delete'}
                                  </TooltipContent>
                               </Tooltip>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
            </TooltipProvider>
         </div>
      </Card>
    </div>
  );
}
