
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Search, UserPlus, ShieldCheck, Mail, Calendar, 
  Trash2, Ban, ChevronRight, Archive, PencilLine,
  UserCog, AlertCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  
  // States for Soft Delete Confirmation
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToArchive, setUserToArchive] = useState<any>(null);

  // استعلام بسيط لتجنب مشاكل الفهارس
  const usersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'admin_users'), 
      orderBy('createdAt', 'desc')
    );
  }, [firestore]);

  const { data: rawUsers, loading } = useCollection(usersQuery);

  // تصفية البيانات في المتصفح
  const filteredUsers = useMemo(() => {
    if (!rawUsers) return [];
    return rawUsers
      .filter(u => u.status !== 'archived')
      .filter(u => 
        u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [rawUsers, searchTerm]);

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

  const confirmArchive = async () => {
    if (!firestore || !userToArchive) return;
    
    try {
      await updateDoc(doc(firestore, 'admin_users', userToArchive.id), {
        status: 'archived',
        updatedAt: serverTimestamp(),
        archivedAt: serverTimestamp()
      });
      
      toast({ 
        title: isAr ? "تم النقل لسلة المهملات" : "Moved to Trash", 
        description: isAr ? "تم إلغاء تنشيط الحساب بنجاح." : "Account has been deactivated successfully." 
      });
      setIsDeleteDialogOpen(false);
      setUserToArchive(null);
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Operation failed." });
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'إدارة المستخدمين' : 'User Management'}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'التحكم في هويات وصلاحيات النظام' : 'Manage Admin Identities & Core Privileges'}</p>
         </div>
         <Button asChild className="h-14 rounded-2xl bg-secondary text-white font-black px-8 shadow-xl shadow-secondary/20 transition-all active:scale-95">
            <Link href={`/${lang}/admin/users/new`}>
               <UserPlus className="h-5 w-5 mr-2" /> {isAr ? 'تفعيل حساب جديد' : 'Activate New Account'}
            </Link>
         </Button>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-6">
         <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
            <Input 
               placeholder={isAr ? 'بحث بالاسم أو البريد...' : 'Search by name or email...'} 
               className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                          <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{isAr ? 'لا يوجد مستخدمون نشطون' : 'No active user accounts'}</p>
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
                            <div className="flex justify-end gap-2">
                               {/* Edit Data Button */}
                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button size="icon" variant="outline" className="h-9 w-9 rounded-lg border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm" asChild>
                                        <Link href={`/${lang}/admin/users/${user.id}`}>
                                           <PencilLine className="h-4 w-4" />
                                        </Link>
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">
                                     {isAr ? 'تعديل البيانات' : 'Edit Profile'}
                                  </TooltipContent>
                               </Tooltip>

                               {/* Block/Activate Button */}
                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button onClick={() => toggleUserStatus(user)} size="icon" variant="outline" className="h-9 w-9 rounded-lg border-amber-100 bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-all shadow-sm">
                                        <Ban className="h-4 w-4" />
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-amber-600 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">
                                     {user.status === 'active' ? (isAr ? 'حظر الدخول' : 'Restrict Access') : (isAr ? 'إعادة التنشيط' : 'Reactivate User')}
                                  </TooltipContent>
                               </Tooltip>

                               {/* Soft Delete (Archive) Button */}
                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button 
                                       onClick={() => { setUserToArchive(user); setIsDeleteDialogOpen(true); }} 
                                       size="icon" 
                                       variant="outline" 
                                       className="h-9 w-9 rounded-lg border-red-100 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                     >
                                        <Trash2 className="h-4 w-4" />
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-red-600 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">
                                     {isAr ? 'نقل لسلة المهملات' : 'Move to Trash'}
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

      {/* Elegant Archive Confirmation Modal */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md border-none shadow-2xl rounded-[2.5rem] p-0 overflow-hidden bg-white">
          <div className="bg-secondary p-8 text-white flex flex-col items-center gap-4 text-center">
             <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl">
                <Archive className="h-8 w-8 text-white" />
             </div>
             <div className="space-y-1">
                <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight">
                   {isAr ? 'إجراء إداري: نقل للأرشفة' : 'Admin Action: Archive User'}
                </AlertDialogTitle>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Baneen & Banaat Academy OS</p>
             </div>
          </div>
          <div className="p-10 space-y-6">
            <AlertDialogDescription className="text-slate-600 font-bold text-base leading-relaxed text-center">
               {isAr 
                 ? `أنت على وشك إلغاء تنشيط حساب "${userToArchive?.displayName}". سيتم سحب كافة صلاحيات الدخول فوراً ونقل السجل إلى سلة المهملات.` 
                 : `You are about to deactivate "${userToArchive?.displayName}". All access privileges will be revoked immediately and moved to the trash bin.`}
            </AlertDialogDescription>
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
               <AlertCircle className="h-5 w-5 text-secondary shrink-0" />
               <p className="text-[10px] font-bold text-slate-400 italic">
                  {isAr ? 'يمكنك استعادة هذا الحساب لاحقاً من قسم الأرشفة.' : 'You can restore this account later from the archive section.'}
               </p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button onClick={confirmArchive} className="h-14 rounded-xl bg-secondary text-white font-black uppercase tracking-widest shadow-xl shadow-secondary/20 hover:bg-primary transition-all">
                {isAr ? 'تأكيد النقل للأرشفة' : 'Confirm Deactivation'}
              </Button>
              <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="h-14 rounded-xl font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50">
                {isAr ? 'تراجع عن الإجراء' : 'Cancel Operation'}
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
