'use client';

import { use, useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';
import { useFirestore, useDoc } from '@/firebase';
import { doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
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
  Info,
  History,
  FileSignature
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
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
  const { data: student, loading: studentLoading } = useDoc(studentRef);

  // Enrollment Files Fetching (The ones from the original form)
  const [enrollmentFiles, setEnrollmentFiles] = useState<any[]>([]);
  const [loadingEnrollment, setLoadingEnrollment] = useState(false);

  useEffect(() => {
    if (student?.enrollmentId && firestore) {
      setLoadingEnrollment(true);
      const enRef = doc(firestore, 'enrollments', student.enrollmentId);
      getDoc(enRef).then(snap => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.files && Array.isArray(data.files)) {
            setEnrollmentFiles(data.files.map(f => ({ ...f, source: 'enrollment' })));
          }
        }
      }).catch(err => console.error("Error fetching enrollment files:", err))
      .finally(() => setLoadingEnrollment(false));
    }
  }, [student?.enrollmentId, firestore]);

  const t = {
    title: isAr ? 'خزانة المستندات والتوثيق' : 'Document Vault & Archive',
    back: isAr ? 'العودة' : 'Back',
    upload: isAr ? 'رفع مستند جديد' : 'Upload New Document',
    noDocs: isAr ? 'لا توجد مستندات مسجلة حالياً.' : 'No artifacts found in the vault.',
    deleteConfirm: isAr ? 'هل أنت متأكد من حذف هذا المستند؟' : 'Are you sure you want to delete this document?',
    sources: {
      enrollment: isAr ? 'من الاستمارة' : 'From Form',
      manual: isAr ? 'رفع يدوي' : 'Manual Upload'
    },
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
    if (!files || files.length === 0 || !studentRef || !student) return;
    
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
          uploadedAt: new Date().toISOString(),
          source: 'manual'
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

  const deleteFile = async (idx: number, source: 'manual' | 'enrollment') => {
    if (source === 'enrollment') {
      toast({ variant: "destructive", title: isAr ? "لا يمكن حذف مستندات الاستمارة" : "Cannot delete form documents" });
      return;
    }

    if (!studentRef || !student || !window.confirm(t.deleteConfirm)) return;
    
    const manualFiles = (student.files || []).filter((f: any) => f.source !== 'enrollment');
    const updatedManual = [...manualFiles];
    updatedManual.splice(idx, 1);
    
    try {
      await updateDoc(studentRef, { files: updatedManual, updatedAt: serverTimestamp() });
      toast({ title: isAr ? "تم حذف المستند" : "Document removed" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error deleting file" });
    }
  };

  const allFiles = useMemo(() => {
    const studentFiles = (student?.files || []).map((f: any) => ({ ...f, source: f.source || 'manual' }));
    // Merge, avoid duplicates if they were already copied
    const merged = [...studentFiles];
    enrollmentFiles.forEach(ef => {
       const exists = merged.find(mf => mf.name === ef.name && mf.size === ef.size);
       if (!exists) merged.push(ef);
    });
    return merged;
  }, [student?.files, enrollmentFiles]);

  if (studentLoading || !student) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'جاري فتح الخزانة...' : 'Opening Document Vault...'}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-4 sm:px-6">
      <NavigationBar />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
        <Button variant="ghost" onClick={() => router.back()} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest p-0">
          {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {t.back}
        </Button>
        <div className="flex items-center gap-3">
          <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileUpload} />
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            disabled={isUploading}
            className="bg-primary text-white h-11 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/10 gap-2 hover:bg-primary/90 transition-all active:scale-95"
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 text-secondary" />}
            {t.upload}
          </Button>
        </div>
      </div>

      <div className="px-2 text-start space-y-1">
         <h1 className="text-2xl font-black uppercase text-primary tracking-tighter">{t.title} — {student.firstName}</h1>
         <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">{isAr ? 'تصفح مستندات التقديم والملفات الإدارية المضافة' : 'Browse submission docs & added administrative files'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {allFiles.length > 0 ? allFiles.map((file: any, idx: number) => (
          <Card key={idx} className="border-none shadow-premium bg-white overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
             <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                   <div className={cn(
                     "h-12 w-12 rounded-xl flex items-center justify-center transition-all shadow-inner",
                     file.source === 'enrollment' ? "bg-secondary/10 text-secondary" : "bg-slate-50 text-primary/40 group-hover:bg-primary group-hover:text-white"
                   )}>
                      {file.source === 'enrollment' ? <FileSignature className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                   </div>
                   <div className="flex gap-1">
                      <Badge variant="outline" className={cn(
                        "text-[8px] font-black uppercase tracking-tighter border-none px-2 h-6 flex items-center",
                        file.source === 'enrollment' ? "bg-secondary/10 text-secondary" : "bg-slate-100 text-slate-400"
                      )}>
                        {t.sources[file.source as keyof typeof t.sources]}
                      </Badge>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-300 hover:text-secondary" onClick={() => window.open(file.data, '_blank')}>
                         <ExternalLink className="h-4 w-4" />
                      </Button>
                      {file.source === 'manual' && (
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-300 hover:text-red-500" onClick={() => deleteFile(idx, 'manual')}>
                           <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                   </div>
                </div>
                <div className="space-y-1 text-start">
                   <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{file.name}</p>
                   <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>{Math.round(file.size / 1024)} KB</span>
                      <div className="h-1 w-1 rounded-full bg-slate-200" />
                      <span>{file.type?.split('/')[1] || 'DOC'}</span>
                      {file.uploadedAt && (
                        <>
                          <div className="h-1 w-1 rounded-full bg-slate-200" />
                          <span className="flex items-center gap-1"><History className="h-2 w-2" /> {format(new Date(file.uploadedAt), 'MMM dd')}</span>
                        </>
                      )}
                   </div>
                </div>
             </div>
             <div className={cn(
               "h-1 w-full bg-slate-50 relative overflow-hidden",
               file.source === 'enrollment' ? "bg-secondary/20" : ""
             )}>
                <div className={cn(
                  "absolute inset-0 transition-transform origin-left duration-700 scale-x-0 group-hover:scale-x-100",
                  file.source === 'enrollment' ? "bg-secondary" : "bg-primary"
                )} />
             </div>
          </Card>
        )) : (
          <div className="lg:col-span-3 py-32 text-center space-y-6 bg-white/50 border-2 border-dashed border-slate-100 rounded-3xl">
             {loadingEnrollment ? (
               <div className="flex flex-col items-center gap-4">
                 <Loader2 className="h-10 w-10 animate-spin text-secondary" />
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'جاري البحث في الأرشيف...' : 'Searching archives...'}</p>
               </div>
             ) : (
               <>
                 <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
                    <FileText className="h-10 w-10 text-slate-100" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{t.noDocs}</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Upload files or verify form submissions.</p>
                 </div>
               </>
             )}
          </div>
        )}
      </div>

      <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4 mx-2 shadow-sm">
         <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5 opacity-60" />
         <div className="space-y-1">
            <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest">{isAr ? 'ملاحظة حول المستندات' : 'Vault Security Note'}</p>
            <p className="text-xs font-bold text-amber-900/60 leading-relaxed italic text-start">
               {isAr 
                  ? 'يتم عرض مستندات الاستمارة الأصلية كمرجع دائم ولا يمكن حذفها لضمان النزاهة الأكاديمية. يمكنك إضافة مستندات جديدة في أي وقت.' 
                  : 'Original form documents are displayed as permanent references and cannot be deleted to ensure academic integrity. You can add new documents at any time.'}
            </p>
         </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
