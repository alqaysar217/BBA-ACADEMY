
'use client';

import { use, useState, useMemo } from 'react';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Search, ShieldCheck, KeyRound, User, 
  ChevronRight, Mail, ShieldAlert, Users2, Loader2 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function PermissionsManagementPage({ params }: { params: Promise<{ lang: Locale }> }) {
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
      <div className="space-y-2">
         <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{isAr ? 'إدارة صلاحيات الوصول' : 'Manage Access Privileges'}</h1>
         <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">{isAr ? 'اختر مستخدماً لتعديل مصفوفة الوصول الخاصة به' : 'Select a user to modify their granular access matrix'}</p>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-8">
         <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-secondary transition-colors" />
            <Input 
               placeholder={isAr ? 'ابحث عن موظف بالاسم أو البريد...' : 'Search staff by name or email...'} 
               className="pl-14 h-16 rounded-2xl bg-slate-50 border-none font-bold text-lg focus:bg-white focus:ring-2 focus:ring-secondary/20 transition-all"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {loading ? (
           [1,2,3,4].map(i => <div key={i} className="h-32 bg-white rounded-[2rem] animate-pulse shadow-sm" />)
         ) : filteredUsers.map((u: any) => (
           <Link key={u.id} href={`/${lang}/admin/users/permissions/${u.id}`}>
             <Card className="border-none shadow-sm hover:shadow-2xl hover:-translate-y-1 rounded-[2rem] bg-white transition-all duration-500 group overflow-hidden">
                <CardContent className="p-6 flex items-center justify-between">
                   <div className="flex items-center gap-5">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 overflow-hidden flex items-center justify-center border-2 border-white shadow-md">
                         <Image src={u.photoURL || '/logo.png'} alt={u.displayName} width={64} height={64} className="object-contain p-1" unoptimized />
                      </div>
                      <div>
                         <h3 className="font-black text-slate-900 group-hover:text-secondary transition-colors uppercase tracking-tight">{u.displayName}</h3>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail className="h-3 w-3" /> {u.email}</p>
                         <p className="mt-1 text-[9px] font-black text-secondary uppercase bg-secondary/5 px-2 py-0.5 rounded-full inline-block">{u.role}</p>
                      </div>
                   </div>
                   <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-secondary group-hover:text-white transition-all">
                      <KeyRound className="h-5 w-5" />
                   </div>
                </CardContent>
             </Card>
           </Link>
         ))}
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div className="py-24 text-center space-y-4 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
           <Users2 className="h-16 w-16 text-slate-100 mx-auto" />
           <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{isAr ? 'لم يتم العثور على مستخدمين' : 'No staff members found'}</p>
        </div>
      )}
    </div>
  );
}
