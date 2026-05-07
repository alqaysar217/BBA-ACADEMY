import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center gap-2 justify-center mb-4">
            <span className="font-headline font-bold text-3xl">ArabDevs</span>
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
              <span className="font-headline font-bold text-xl">A</span>
            </div>
          </Link>
          <h1 className="font-headline text-2xl font-bold">تسجيل الدخول</h1>
          <p className="text-muted-foreground mt-2">مرحباً بك مجدداً في رحلتك التعليمية</p>
        </div>

        <Card className="border-none shadow-xl">
          <CardContent className="pt-8 space-y-4 text-right">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" placeholder="example@domain.com" className="text-left" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                 <Link href="/forgot-password" size="sm" className="text-xs text-primary hover:underline">نسيت كلمة المرور؟</Link>
                 <Label htmlFor="password">كلمة المرور</Label>
              </div>
              <Input id="password" type="password" className="text-left" />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">دخول</Button>
            <div className="text-center text-sm text-muted-foreground mt-4">
              ليس لديك حساب؟ <Link href="/register" className="text-primary font-bold hover:underline">أنشئ حساباً جديداً</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
