
'use client';

import { use, useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { 
  FileText, 
  User, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  CreditCard, 
  Upload, 
  X, 
  Eye, 
  Download, 
  Trash2, 
  Loader2, 
  FileCheck, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function StudentDocumentsPage({ params }: { params: Promise<{ lang: Locale, id: string }> }) {
  const { lang, id } = use(params);
  const isAr = lang === 'ar';
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const studentRef = useMemo(() => (firestore && id) ? doc(firestore, 'students', id) : null, [firestore, id]);
  const { data: student, loading } = useDoc(studentRef);

  if (loading || !student) return <div className="p-20 text-center animate-pulse"><Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" /></div>;

  const t = {
    title: isAr ? 'خزانة المستندات والتوثيق' : 'Document Vault & Archive',
    back: isAr ? 'العودة' : 'Back',
    upload: isAr ? 'رفع مستند جديد' : 'Upload New Document',
    noDocs: isAr ? 'لا توجد مستندات مسجلة حالياً.' : 'No artifacts found in the vault.',
    deleteConfirm: isAr ? 'هل أنت متأكد من حذف هذا المستند؟' : 'Are you sure you want to delete this document?',
    nav: {
      profile: isAr ? 'الهوية' : 'Identity',
      guardians: isAr ? 'أولياء الأمور' : 'Guardians',
      documents: isAr ? 'المستندات' : 'Documents',
      academic: isAr ? 'خطة الطالب' : 'Study Plan',
      grades: isAr ? 'الدرجات' : 'Grades',
      finances: isAr ? 'المالية' : 'Finances'
    }
  };

  const NavigationBar = () => {
    const navItems = [
      { id: 'profile', label: t.nav.profile, icon: User, href: `/${lang}/admin/students/${id}` },
      { id: 'guardians', label: t.nav.guardians, icon: Users, href: `/${lang}/admin/students/${id}/guardians` },
      { id: 'documents', label: t.nav.documents, icon: FileText, href: `/${lang}/admin/students/${id}/documents` },
      { id: 'academic', label: t.nav.academic, icon: BookOpen, href: `/${lang}/admin/students/${id}/plans` },
      { id: 'grades', label: t.nav.grades, icon: ClipboardCheck, href: `/${lang}/admin/students/${id}/grades` },
      { id: 'finances', label: t.nav.finances, icon: CreditCard, href: `/${lang}/admin/students/${id}/finances` },
    ];

    return (
      <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar bg-white/50 p-1 rounded-xl">
         {navItems.map(nav => {
           const isActive = pathname === nav.href;
           return (
             <Link 
               key={nav.id} 
               href={nav.href}
               className={cn(
                 "px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg whitespace-nowrap flex items-center gap-2",
                 isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:text-primary hover:bg-slate-50"
               )}
             >
                <nav.icon className="h-3.5 w-3.5" />
                {nav.label}
             </Link>
           )
         })}
      </div>
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !studentRef) return;
    
    setIsUploading(true);
    const newFilesList = [...(student.files || [])];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = (ev) => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        newFilesList.push({
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64,
          uploadedAt: new Date().toISOString()
        });
      }

      await updateDoc(studentRef, { 
        files: newFilesList,
        updatedAt: serverTimestamp()
      });
      
      toast({ title: isAr ? "تم رفع المستندات بنجاح" : "Documents uploaded successfully" });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Upload failed" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const deleteFile = async (idx: number) => {
    if (!studentRef || !window.confirm(t.deleteConfirm)) return;
    
    const updatedFiles = [...(student.files || [])];
    updatedFiles.splice(idx, 1);
    
    try {
      await updateDoc(studentRef, { files: updatedFiles, updatedAt: serverTimestamp() });
      toast({ title: isAr ? "تم حذف المستند" : "Document removed" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error deleting file" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <NavigationBar />

      <div className="flex items-center justify-between px-2">
        <Button variant="ghost" onClick={() => router.back()} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest p-0">
          {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {t.back}
        </Button>
        <div className="flex items-center gap-3">
          <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileUpload} />
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            disabled={isUploading}
            className="bg-primary text-white h-10 px-6 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/10 gap-2"
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 text-secondary" />}
            {t.upload}
          </Button>
        </div>
      </div>

      <div className="px-2 text-start">
         <h1 className="text-2xl font-black uppercase text-primary tracking-tighter">{t.title} — {student.firstName}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {student.files && student.files.length > 0 ? student.files.map((file: any, idx: number) => (
          <Card key={idx} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
             <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                   <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                      <FileText className="h-6 w-6" />
                   </div>
                   <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-300 hover:text-secondary" onClick={() => window.open(file.data, '_blank')}>
                         <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-300 hover:text-red-500" onClick={() => deleteFile(idx)}>
                         <Trash2 className="h-4 w-4" />
                      </Button>
                   </div>
                </div>
                <div className="space-y-1 text-start">
                   <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{file.name}</p>
                   <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>{Math.round(file.size / 1024)} KB</span>
                      <div className="h-1 w-1 rounded-full bg-slate-200" />
                      <span>{file.type?.split('/')[1] || 'DOC'}</span>
                   </div>
                </div>
             </div>
             <div className="h-1 w-full bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
             </div>
          </Card>
        )) : (
          <div className="lg:col-span-3 py-32 text-center space-y-6 bg-white/50 border-2 border-dashed border-slate-100 rounded-3xl">
             <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
                <FileText className="h-10 w-10 text-slate-100" />
             </div>
             <div className="space-y-1">
                <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{t.noDocs}</p>
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Upload files to start building the student's digital archive.</p>
             </div>
          </div>
        )}
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4 mx-2">
         <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
         <div className="space-y-1">
            <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest">{isAr ? 'ملاحظة حول المستندات' : 'Vault Security Note'}</p>
            <p className="text-xs font-bold text-amber-900/60 leading-relaxed italic">
               {isAr 
                  ? 'يتم تشفير وتخزين المستندات في سجل الطالب الدائم. يرجى التأكد من وضوح الملفات المرفوعة للتوثيق الأكاديمي.' 
                  : 'Files are stored in the student\'s permanent registry. Ensure all uploads are clear for academic documentation purposes.'}
            </p>
         </div>
      </div>
    </div>
  );
}

