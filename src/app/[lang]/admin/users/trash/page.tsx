'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Search, Archive, RefreshCw, Trash2, ChevronLeft, Calendar, Mail, UserCheck, AlertCircle, X, Clock
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
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TrashBinPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Permanent Delete states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const usersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'admin_users'), orderBy('updatedAt', 'desc'));
  }, [firestore]);

  const { data: rawUsers, loading } = useCollection(usersQuery);

  // تصفية المحذوفين مع تطبيق منطق الـ 30 يوم والبحث
  const archivedUsers = useMemo(() => {
    if (!rawUsers) return [];
    const now = new Date();
    
    return rawUsers
      .filter(u => u.status === 'archived')
      .filter(u => {
        // إذا كان هناك تاريخ أرشفة، نحسب الفرق
        if (u.archivedAt) {
          const daysOld = differenceInDays(now, u.archivedAt.toDate());
          return daysOld <= 30; // إظهار فقط ما لم يتجاوز 30 يوم
        }
        return true;
      })
      .filter(u => 
        u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [rawUsers, searchTerm]);

  const restoreUser = async (user: any) => {
    if (!firestore) return;
    try {
      await updateDoc(doc(firestore, 'admin_users', user.id), {
        status: 'active',
        updatedAt: serverTimestamp(),
        archivedAt: null // مسح تاريخ الأرشفة عند الاستعادة
      });
      toast({
        title: isAr ? "تمت استعادة الحساب" : "Account Restored",
        description: isAr ? "تم إعادة تفعيل الحساب بنجاح." : "Account has been reactivated successfully.",
      });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to restore." });
    }
  };

  const confirmPermanentDelete = async () => {
    if (!firestore || !userToDelete) return;
    try {
      await deleteDoc(doc(firestore, 'admin_users', userToDelete.id));
      toast({ 
        title: isAr ? "حذف نهائي" : "Permanently Deleted", 
        description: isAr ? "تم حذف السجل من القاعدة نهائياً." : "Record has been permanently removed." 
      });
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Operation failed." });
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="h-12 w-12 rounded-2xl bg-white text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm border border-slate-100">
              <ChevronLeft className={cn("h-5 w-5", isAr && "rotate-180")} />
            </button>
            <div>
               <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{isAr ? 'سلة المهملات' : 'Trash Bin'}</h1>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{isAr ? 'إدارة الحسابات الملغى تنشيطها (تحذف بعد 30 يوم)' : 'Manage Deactivated Accounts (Auto-purged after 30 days)'}</p>
            </div>
         </div>
         
         <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-600 animate-pulse" />
            <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest leading-relaxed">
               {isAr ? 'ملاحظة: السجلات تختفي تلقائياً بعد 30 يوماً من تاريخ الأرشفة.' : 'Note: Records auto-hide after 30 days of deactivation.'}
            </p>
         </div>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-6">
         <div className="relative w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
            <Input 
               placeholder={isAr ? 'بحث في المحذوفات...' : 'Search archived...'} 
               className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
               <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                  <X className="h-4 w-4" />
               </button>
            )}
         </div>
      </Card>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
         <div className="overflow-x-auto">
            <TooltipProvider delayDuration={0}>
              <table className="w-full">
                 <thead>
                    <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                       <th className="px-10 py-6 text-left">{isAr ? 'المستخدم' : 'User Details'}</th>
                       <th className="px-10 py-6 text-left">{isAr ? 'تاريخ الأرشفة' : 'Archived At'}</th>
                       <th className="px-10 py-6 text-left">{isAr ? 'الأيام المتبقية' : 'Days Remaining'}</th>
                       <th className="px-10 py-6 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={4} className="h-24 bg-slate-50/50" /></tr>)
                    ) : archivedUsers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-32 text-center">
                          <Archive className="h-16 w-16 text-slate-100 mx-auto mb-4" />
                          <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{isAr ? 'سلة المهملات فارغة أو السجلات انتهت' : 'Trash bin is empty or records expired'}</p>
                        </td>
                      </tr>
                    ) : archivedUsers.map((user: any) => {
                      const daysOld = user.archivedAt ? differenceInDays(new Date(), user.archivedAt.toDate()) : 0;
                      const daysLeft = Math.max(0, 30 - daysOld);
                      
                      return (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-all group">
                           <td className="px-10 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center grayscale opacity-50 overflow-hidden">
                                    <Image src={user.photoURL || '/logo.png'} alt={user.displayName} width={40} height={40} className="object-contain p-1" unoptimized />
                                 </div>
                                 <div>
                                    <p className="text-sm font-black text-slate-400 line-through decoration-slate-300">{user.displayName}</p>
                                    <p className="text-slate-400 font-bold text-[10px] uppercase">{user.email}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-6">
                              <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                                 <Calendar className="h-3.5 w-3.5" />
                                 {user.archivedAt ? format(user.archivedAt.toDate(), 'MMM dd, yyyy') : '-'}
                              </div>
                           </td>
                           <td className="px-10 py-6">
                              <div className="flex items-center gap-2">
                                 <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                       className={cn("h-full transition-all", daysLeft < 5 ? "bg-red-500" : "bg-amber-500")} 
                                       style={{ width: `${(daysLeft / 30) * 100}%` }} 
                                    />
                                 </div>
                                 <span className={cn("text-[10px] font-black uppercase", daysLeft < 5 ? "text-red-500" : "text-amber-600")}>
                                    {daysLeft} {isAr ? 'يوم' : 'Days'}
                                 </span>
                              </div>
                           </td>
                           <td className="px-10 py-6 text-right">
                              <div className="flex justify-end gap-2">
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <Button onClick={() => restoreUser(user)} size="icon" variant="outline" className="h-10 w-10 rounded-xl border-green-100 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm">
                                          <RefreshCw className="h-4.5 w-4.5" />
                                       </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-green-600 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">
                                       {isAr ? 'استعادة الحساب' : 'Restore Account'}
                                    </TooltipContent>
                                 </Tooltip>

                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <Button onClick={() => { setUserToDelete(user); setIsDeleteDialogOpen(true); }} size="icon" variant="outline" className="h-10 w-10 rounded-xl border-red-100 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                          <Trash2 className="h-4.5 w-4.5" />
                                       </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest border-none px-3 py-1.5">
                                       {isAr ? 'حذف نهائي' : 'Delete Permanently'}
                                    </TooltipContent>
                                 </Tooltip>
                              </div>
                           </td>
                        </tr>
                      );
                    })}
                 </tbody>
              </table>
            </TooltipProvider>
         </div>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md border-none shadow-2xl rounded-[2.5rem] p-0 overflow-hidden bg-white">
          <div className="bg-slate-900 p-8 text-white flex flex-col items-center gap-4 text-center">
             <div className="h-16 w-16 rounded-2xl bg-red-500 flex items-center justify-center shadow-xl">
                <Trash2 className="h-8 w-8 text-white" />
             </div>
             <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight">
                {isAr ? 'حذف نهائي من النظام' : 'Permanent Record Deletion'}
             </AlertDialogTitle>
          </div>
          <div className="p-10 space-y-8">
            <AlertDialogDescription className="text-slate-600 font-bold text-base leading-relaxed text-center">
               {isAr 
                 ? `هل أنت متأكد من حذف حساب "${userToDelete?.displayName}" نهائياً؟ هذا الإجراء سيمسح السجل تماماً من قاعدة البيانات ولا يمكن التراجع عنه.` 
                 : `Are you sure you want to permanently delete "${userToDelete?.displayName}"? This action will completely erase the record from the database and cannot be undone.`}
            </AlertDialogDescription>
            <div className="flex flex-col gap-3">
              <Button onClick={confirmPermanentDelete} className="h-14 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all">
                {isAr ? 'حذف نهائي الآن' : 'Confirm Permanent Delete'}
              </Button>
              <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="h-14 rounded-xl font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50">
                {isAr ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
