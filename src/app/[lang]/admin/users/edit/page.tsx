
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, Users2, Mail, 
  ChevronRight, UserCog, ShieldCheck, User 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function EditUserLandingPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');

  const usersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'admin_users'), orderBy('displayName', 'asc'));
  }, [firestore]);

  const { data: users, loading } = useCollection(usersQuery);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(u => 
      u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="space-y-2 text-center lg:text-start">
         <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'تعديل حسابات الموظفين' : 'Edit Staff Accounts'}</h1>
         <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'اختر حساباً لتحديث البيانات الأساسية والصورة' : 'Select an account to update basic info and profile picture'}</p>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-6">
         <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-secondary transition-colors" />
            <Input 
               placeholder={isAr ? 'بحث...' : 'Search by name or email...'} 
               className="pl-14 h-14 rounded-2xl bg-slate-50 border-none font-bold text-lg"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {loading ? (
           [1,2].map(i => <div key={i} className="h-32 bg-white rounded-[2rem] animate-pulse" />)
         ) : filteredUsers.map((u: any) => (
           <Link key={u.id} href={`/${lang}/admin/users/${u.id}`}>
             <Card className="border-none shadow-sm hover:shadow-xl rounded-[2rem] bg-white transition-all group overflow-hidden border border-transparent hover:border-slate-100">
                <CardContent className="p-6 flex items-center justify-between">
                   <div className="flex items-center gap-5">
                      <div className="h-16 w-16 rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center border-2 border-white shadow-sm">
                         <Image src={u.photoURL || '/logo.png'} alt={u.displayName} width={64} height={64} className="object-contain p-1" unoptimized />
                      </div>
                      <div>
                         <h3 className="font-black text-slate-900 uppercase group-hover:text-primary transition-colors">{u.displayName}</h3>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">{u.email}</p>
                      </div>
                   </div>
                   <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                      <UserCog className="h-5 w-5" />
                   </Button>
                </CardContent>
             </Card>
           </Link>
         ))}
      </div>
    </div>
  );
}
