import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Download } from 'lucide-react';
import Image from 'next/image';

export default function LibraryPage() {
  const books = [
    { title: 'أساسيات بايثون', author: 'د. خالد سليم', category: 'البرمجة', cover: 'https://picsum.photos/seed/book1/200/300' },
    { title: 'التصميم التفاعلي', author: 'أروى فهد', category: 'UI/UX', cover: 'https://picsum.photos/seed/book2/200/300' },
    { title: 'أمن الشبكات', author: 'م. سالم ناصر', category: 'الأمن السيبراني', cover: 'https://picsum.photos/seed/book3/200/300' },
    { title: 'الخوارزميات المتقدمة', author: 'بروفيسور ليث', category: 'البرمجة', cover: 'https://picsum.photos/seed/book4/200/300' },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <Header />
      <main className="container px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12 flex-row-reverse">
          <div className="text-right">
            <h1 className="font-headline text-4xl font-bold mb-4">مكتبة الكتب التقنية</h1>
            <p className="text-muted-foreground">أفضل المراجع والكتب المترجمة والمؤلفة بأيدٍ عربية</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute right-3 top-3 size-5 text-muted-foreground" />
            <Input placeholder="ابحث عن كتاب أو مؤلف..." className="pr-10 text-right h-12" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book, i) => (
            <Card key={i} className="overflow-hidden group hover:shadow-xl transition-all border-none">
              <div className="relative aspect-[3/4] bg-muted">
                <Image src={book.cover} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-full"><BookOpen className="size-5" /></Button>
                  <Button size="icon" variant="secondary" className="rounded-full"><Download className="size-5" /></Button>
                </div>
              </div>
              <CardContent className="p-6 text-right">
                <div className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">{book.category}</div>
                <h3 className="font-headline font-bold text-lg mb-1">{book.title}</h3>
                <div className="text-sm text-muted-foreground">{book.author}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
