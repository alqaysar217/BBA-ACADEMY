import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ShieldAlert, Search, QrCode } from 'lucide-react';

export default function VerifyCertificatePage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Header />
      <main className="container px-4 md:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold mb-4">التحقق من صحة الشهادة</h1>
            <p className="text-muted-foreground">تأكد من مصداقية وصحة الشهادات الصادرة من منصة ArabDevs</p>
          </div>

          <Card className="shadow-xl border-none">
            <CardHeader className="text-right">
              <CardTitle className="font-headline">بيانات التحقق</CardTitle>
              <CardDescription>أدخل رقم الشهادة الموضح في أسفل الشهادة أو امسح رمز QR</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 flex-row-reverse">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-3 size-4 text-muted-foreground" />
                  <Input 
                    placeholder="CERT-2026-XXXXXX" 
                    className="pr-10 text-center font-mono uppercase tracking-wider h-12 text-lg" 
                  />
                </div>
                <Button size="lg" className="bg-accent hover:bg-accent/90 h-12 px-8">تحقق الآن</Button>
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">أو</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-12 gap-2 text-lg">
                <QrCode className="size-5" /> مسح رمز QR
              </Button>
            </CardContent>
          </Card>

          {/* Example Result Section (Static for now) */}
          <div className="mt-12 space-y-6">
             {/* Valid Certificate Example */}
             <Card className="border-green-500/50 bg-green-50/50 overflow-hidden">
                <CardContent className="p-8 flex items-start gap-6 flex-row-reverse">
                  <div className="p-3 bg-green-100 rounded-full text-green-600">
                    <ShieldCheck className="size-10" />
                  </div>
                  <div className="text-right flex-1">
                    <div className="flex items-center justify-between mb-2 flex-row-reverse">
                      <Badge variant="default" className="bg-green-600">شهادة موثقة وصحيحة</Badge>
                      <span className="text-sm font-mono font-bold text-green-700">CERT-2026-000845</span>
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-4">أساسيات JavaScript من الصفر</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">اسم الطالب</div>
                        <div className="font-bold">أحمد محمد عبد الله</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">تاريخ الإصدار</div>
                        <div className="font-bold">15 يونيو 2026</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
             </Card>

             {/* Invalid Certificate Example */}
             <Card className="border-red-500/50 bg-red-50/50 overflow-hidden opacity-50 grayscale hover:grayscale-0 transition-all">
                <CardContent className="p-8 flex items-start gap-6 flex-row-reverse">
                  <div className="p-3 bg-red-100 rounded-full text-red-600">
                    <ShieldAlert className="size-10" />
                  </div>
                  <div className="text-right flex-1">
                    <Badge variant="destructive" className="mb-2">الشهادة غير موجودة</Badge>
                    <p className="text-muted-foreground">عذراً، لم نتمكن من العثور على أي شهادة مرتبطة بهذا الرقم. يرجى التأكد من الرقم والمحاولة مرة أخرى.</p>
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
