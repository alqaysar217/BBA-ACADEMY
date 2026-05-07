import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, User, BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
              <span className="font-headline font-bold text-xl">A</span>
            </div>
            <span className="font-headline font-bold text-2xl hidden md:block">ArabDevs</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/courses" className="transition-colors hover:text-primary">الكورسات</Link>
            <Link href="/paths" className="transition-colors hover:text-primary">المسارات</Link>
            <Link href="/library" className="transition-colors hover:text-primary">المكتبة</Link>
            <Link href="/community" className="transition-colors hover:text-primary">المجتمع</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="relative hidden md:flex items-center w-full max-w-sm">
            <Search className="absolute left-3 size-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="ابحث عن كورس، مسار، أو تقنية..." 
              className="pl-10 pr-4 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">تسجيل الدخول</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-accent hover:bg-accent/90">ابدأ الآن</Button>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
