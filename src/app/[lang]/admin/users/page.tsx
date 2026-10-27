
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Search, UserPlus, ShieldCheck, Mail, Calendar, 
  Trash2, Ban, ChevronRight, Archive, PencilLine,
  UserCog, AlertCircle, KeyRound, Filter, Shield, UserCheck
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function UserRegistryPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToArchive, setUserToArchive] = useState<any>(null);

  const usersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'admin_users'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: rawUsers, loading } = useCollection(usersQuery);

  const filteredUsers = useMemo(() => {
    if (!rawUsers) return [];
    return rawUsers
      .filter(u => u.status !== 'archived')
      .filter(u => {
        const matchesSearch = 
          u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        return matchesSearch && matchesRole;
      });
  }, [rawUsers, searchTerm, roleFilter]);

  const toggleUserStatus = (user: any) => {
    if (!firestore) return;
    const newStatus = user.status === 'active' ? 'blocked' : 'active';
    const userRef = doc(firestore, 'admin_users', user.id);
    const updateData = {
      status: newStatus,
      updatedAt: serverTimestamp()
    };

    updateDoc(userRef, updateData)
      .then(() => {
        toast({
          title: isAr ? "تم تحديث الحالة" : "Status Updated",
          description: isAr ? `تم ${newStatus === 'blocked' ? 'حظر' : 'تفعيل'} الحساب بنجاح.` : `Account successfully ${newStatus === 'blocked' ? 'blocked' : 'activated'}.`,
        });
      })
      .catch(async (err) => {
        const pError = new FirestorePermissionError({
          path: userRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', pError);
      });
  };

  const confirmArchive = () => {
    if (!firestore || !userToArchive) return;
    const userRef = doc(firestore, 'admin_users', userToArchive.id);
    const updateData = {
      status: 'archived',
      updatedAt: serverTimestamp(),
      archivedAt: serverTimestamp()
    };

    updateDoc(userRef, updateData)
      .then(() => {
        toast({ title: isAr ? "تم الإلغاء بنجاح" : "Deactivated", description: isAr ? "تم نقل الحساب لسلة المهملات." : "Account moved to trash bin." });
        setIsDeleteDialogOpen(false);
      })
      .catch(async (err) => {
        const pError = new FirestorePermissionError({
          path: userRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', pError);
      });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'سجل الحسابات' : 'Account Registry'}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'استعراض كافة الموظفين والمديرين' : 'List of all authorized personnel'}</p>
         </div>
         <Button asChild className="h-14 rounded-xl bg-primary text-white font-black px-8 shadow-xl shadow-primary/20">
            <Link href={`/${lang}/admin/users/new`}>
               <UserPlus className="h-5 w-5 mr-2" /> {isAr ? 'إضافة موظف جديد' : 'Register New Staff'}
            </Link>
         </Button>
      </div>

      <Card className="border-none shadow-premium rounded-xl bg-white p-6 flex flex-col md:flex-row gap-6 border border-slate-100">
         <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
            <Input 
               placeholder={isAr ? 'بحث بالاسم أو البريد...' : 'Search by name or email...'} 
               className="pl-12 h-14 rounded-xl bg-slate-50 border-none font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="w-full md:w-64">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
               <SelectTrigger className="h-14 rounded-xl bg-slate-50 border-none font-bold">
                  <SelectValue placeholder={isAr ? 'تصفية حسب الدور' : 'Filter by Role'} />
               </SelectTrigger>
               <SelectContent className="rounded-xl">
                  <SelectItem value="all">{isAr ? 'كافة الأدوار' : 'All Roles'}</SelectItem>
                  <SelectItem value="admin">{isAr ? 'مدير نظام' : 'Admin'}</SelectItem>
                  <SelectItem value="academic">{isAr ? 'موظف أكاديمي' : 'Academic'}</SelectItem>
                  <SelectItem value="financial">{isAr ? 'موظف مالي' : 'Financial'}</SelectItem>
                  <SelectItem value="admissions">{isAr ? 'مسؤول قبول' : 'Admissions'}</SelectItem>
               </SelectContent>
            </Select>
         </div>
      </Card>

      <Card className="border-none shadow-premium rounded-xl bg-white overflow-hidden border border-slate-100">
         <div className="overflow-x-auto">
            <TooltipProvider delayDuration={0}>
              <table className="w-full">
                 <thead>
                    <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                       <th className="px-10 py-6 text-left">{isAr ? 'المستخدم' : 'User'}</th>
                       <th className="px-10 py-6 text-left">{isAr ? 'الدور' : 'Role'}</th>
                       <th className="px-10 py-6 text-left">{isAr ? 'الحالة' : 'Status'}</th>
                       <th className="px-10 py-6 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={4} className="h-24 bg-slate-50/50" /></tr>)
                    ) : filteredUsers.map((user: any) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-all group">
                         <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                               <div className="h-12 w-12 rounded-lg bg-primary/10 overflow-hidden flex items-center justify-center border-2 border-white shadow-sm">
                                  <Image 
                                    src={user.photoURL || '/logo.png'} 
                                    alt={user.displayName} 
                                    width={48} 
                                    height={48} 
                                    className="object-contain p-1"
                                    unoptimized
                                  />
                               </div>
                               <div>
                                  <p className="text-sm font-black text-slate-900 leading-none mb-1">{user.displayName}</p>
                                  <p className="text-slate-400 font-bold text-[10px] uppercase">{user.email}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-6">
                            <Badge variant="outline" className="rounded-lg bg-secondary/5 border-secondary/10 text-secondary font-black text-[9px] uppercase tracking-widest">
                               {user.role}
                            </Badge>
                         </td>
                         <td className="px-10 py-6">
                            <Badge className={cn(
                              "rounded-lg border-none font-black text-[9px] uppercase",
                              user.status === 'active' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            )}>
                               {user.status === 'active' ? (isAr ? 'نشط' : 'Active') : (isAr ? 'محظور' : 'Blocked')}
                            </Badge>
                         </td>
                         <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-2">
                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button size="icon" variant="outline" className="h-10 w-10 rounded-lg border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm" asChild>
                                        <Link href={`/${lang}/admin/users/${user.id}`}>
                                           <PencilLine className="h-4 w-4" />
                                        </Link>
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">{isAr ? 'تعديل الملف' : 'Edit Profile'}</TooltipContent>
                               </Tooltip>

                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button size="icon" variant="outline" className="h-10 w-10 rounded-lg border-purple-100 bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-all shadow-sm" asChild>
                                        <Link href={`/${lang}/admin/users/permissions/${user.id}`}>
                                           <KeyRound className="h-4 w-4" />
                                        </Link>
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-purple-600 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">{isAr ? 'تعديل الصلاحيات' : 'Permissions'}</TooltipContent>
                               </Tooltip>

                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button onClick={() => toggleUserStatus(user)} size="icon" variant="outline" className="h-10 w-10 rounded-lg border-amber-100 bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-all shadow-sm">
                                        <Ban className="h-4 w-4" />
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-amber-600 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">{isAr ? 'حظر/تفعيل' : 'Block/Activate'}</TooltipContent>
                               </Tooltip>

                               <Tooltip>
                                  <TooltipTrigger asChild>
                                     <Button onClick={() => { setUserToArchive(user); setIsDeleteDialogOpen(true); }} size="icon" variant="outline" className="h-10 w-10 rounded-lg border-red-100 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                        <Trash2 className="h-4 w-4" />
                                     </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-red-600 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">{isAr ? 'نقل للمهملات' : 'Move to Trash'}</TooltipContent>
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

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md border-none shadow-2xl rounded-xl p-0 overflow-hidden bg-white">
          <div className="bg-primary p-8 text-white flex flex-col items-center gap-4 text-center">
             <div className="h-16 w-16 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl">
                <Shield className="h-8 w-8 text-secondary" />
             </div>
             <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight">{isAr ? 'تأكيد إجراء إداري' : 'Confirm Admin Action'}</AlertDialogTitle>
          </div>
          <div className="p-10 space-y-6 text-center">
            <AlertDialogDescription className="text-slate-600 font-bold text-base leading-relaxed">
               {isAr 
                 ? `هل أنت متأكد من إلغاء تنشيط حساب "${userToArchive?.displayName}" ونقله لسلة المهملات؟ سيفقد الموظف حق الوصول فوراً.` 
                 : `Are you sure you want to deactivate "${userToArchive?.displayName}" and move it to the trash bin? Access will be revoked immediately.`}
            </AlertDialogDescription>
            <div className="flex flex-col gap-3">
              <Button onClick={confirmArchive} className="h-14 rounded-xl bg-secondary text-white font-black uppercase tracking-widest transition-all">
                {isAr ? 'تأكيد النقل للمهملات' : 'Confirm Deactivation'}
              </Button>
              <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="h-14 rounded-xl font-black text-slate-400 uppercase tracking-widest">
                {isAr ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
