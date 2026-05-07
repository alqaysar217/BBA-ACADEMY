import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { 
  Code2, 
  Brain, 
  ShieldCheck, 
  Gamepad2, 
  Layout, 
  Users, 
  Star,
  BookOpen,
  Award,
  ArrowRight,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const categories = [
    { name: 'تطوير الويب', icon: <Code2 className="size-6" />, color: 'bg-purple-100 text-purple-600' },
    { name: 'الذكاء الاصطناعي', icon: <Brain className="size-6" />, color: 'bg-blue-100 text-blue-600' },
    { name: 'الأمن السيبراني', icon: <ShieldCheck className="size-6" />, color: 'bg-red-100 text-red-600' },
    { name: 'تطوير الألعاب', icon: <Gamepad2 className="size-6" />, color: 'bg-green-100 text-green-600' },
    { name: 'تصميم UI/UX', icon: <Layout className="size-6" />, color: 'bg-orange-100 text-orange-600' },
  ];

  const courses = [
    { id: '1', title: 'أساسيات JavaScript من الصفر', instructor: 'م. أحمد علي', students: 1250, rating: 4.8, price: 0, thumbnail: PlaceHolderImages.find(img => img.id === 'course-web')?.imageUrl },
    { id: '2', title: 'مقدمة في الذكاء الاصطناعي', instructor: 'د. ليلى حسن', students: 850, rating: 4.9, price: 49, thumbnail: PlaceHolderImages.find(img => img.id === 'course-ai')?.imageUrl },
    { id: '3', title: 'احتراف الأمن السيبراني', instructor: 'م. عمر كمال', students: 2100, rating: 4.7, price: 99, thumbnail: PlaceHolderImages.find(img => img.id === 'course-cyber')?.imageUrl },
  ];

  const stats = [
    { label: 'طلاب متعلمون', value: '+50,000', icon: <Users className="size-8" /> },
    { label: 'كورسات تدريبية', value: '+200', icon: <BookOpen className="size-8" /> },
    { label: 'شهادات معتمدة', value: '+15,000', icon: <Award className="size-8" /> },
    { label: 'مسارات تعليمية', value: '12', icon: <TrendingUp className="size-8" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-primary/5">
          <div className="container px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-right">
              <Badge variant="secondary" className="mb-4 py-1 px-4 text-sm font-medium">مستقبلك يبدأ هنا 🚀</Badge>
              <h1 className="font-headline text-4xl md:text-6xl font-bold leading-tight mb-6">
                تعلم البرمجة من الصفر <br />
                <span className="text-primary">حتى الاحتراف العالمي</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl ml-auto">
                انضم إلى أكبر منصة تعليمية عربية متخصصة في التقنية والبرمجة. مسارات تعليمية متكاملة، شهادات معتمدة، ومجتمع تقني تفاعلي.
              </p>
              <div className="flex flex-wrap gap-4 justify-start flex-row-reverse">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 gap-2">
                  <ArrowRight className="size-5" /> ابدأ التعلم الآن
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">تصفح المسارات</Button>
              </div>
            </div>
            <div className="flex-1 relative w-full aspect-video lg:aspect-square">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-2 scale-105" />
              <Image 
                src={PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl || ""} 
                alt="ArabDevs Hero" 
                fill 
                className="rounded-3xl object-cover shadow-2xl relative z-10"
                data-ai-hint="programming abstract"
              />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-background">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl font-bold mb-4">استكشف المجالات التعليمية</h2>
              <p className="text-muted-foreground">اختر المجال الذي ترغب في التخصص فيه وابدأ رحلة النجاح</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((cat, i) => (
                <Card key={i} className="group hover:shadow-lg transition-all cursor-pointer border-none bg-muted/30">
                  <CardContent className="p-8 flex flex-col items-center gap-4">
                    <div className={`p-4 rounded-2xl ${cat.color} group-hover:scale-110 transition-transform`}>
                      {cat.icon}
                    </div>
                    <h3 className="font-headline font-semibold text-center">{cat.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-20 bg-muted/20">
          <div className="container px-4 md:px-8">
            <div className="flex items-end justify-between mb-12">
              <div className="text-right">
                <h2 className="font-headline text-3xl font-bold mb-4">أحدث الكورسات التدريبية</h2>
                <p className="text-muted-foreground">تعلم من أفضل الخبراء في الوطن العربي</p>
              </div>
              <Link href="/courses">
                <Button variant="link" className="text-primary gap-2">عرض الكل <ArrowRight className="size-4" /></Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all group border-none">
                  <div className="relative aspect-video">
                    <Image 
                      src={course.thumbnail || ""} 
                      alt={course.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4" variant={course.price === 0 ? "secondary" : "default"}>
                      {course.price === 0 ? "مجاني" : `${course.price}$`}
                    </Badge>
                  </div>
                  <CardContent className="p-6 text-right">
                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <GraduationCap className="size-4" /> <span>{course.instructor}</span>
                    </div>
                    <h3 className="font-headline font-bold text-xl mb-4 group-hover:text-primary transition-colors">{course.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                        <Star className="size-4 fill-current" /> {course.rating}
                      </div>
                      <div className="text-sm text-muted-foreground">{course.students} طالب</div>
                    </div>
                    <Button className="w-full mt-6 bg-accent hover:bg-accent/90">عرض الكورس</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <div className="p-4 bg-white/10 rounded-full mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-headline font-bold">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-background">
          <div className="container px-4 md:px-8 text-center">
            <h2 className="font-headline text-3xl font-bold mb-12">ماذا يقول طلابنا؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-8 text-right border-none shadow-sm bg-muted/20">
                  <div className="flex items-center gap-4 mb-6 flex-row-reverse">
                    <div className="size-12 rounded-full overflow-hidden bg-muted">
                      <Image src={`https://picsum.photos/seed/student-${i}/50/50`} alt="student" width={50} height={50} />
                    </div>
                    <div className="text-right">
                      <div className="font-bold">أحمد محمود</div>
                      <div className="text-xs text-muted-foreground">مطور ويب واعد</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic line-clamp-3">
                    "بفضل هذه المنصة استطعت أن أتحول من هاوٍ للبرمجة إلى محترف أعمل في شركة كبرى. الشرح بسيط والمسارات واضحة جداً."
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t">
        <div className="container px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-right">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 justify-end mb-6">
              <span className="font-headline font-bold text-2xl">ArabDevs</span>
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                <span className="font-headline font-bold">A</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-md ml-auto">
              المنصة العربية الأولى لتمكين الشباب العربي من مهارات المستقبل. نؤمن بأن المعرفة هي مفتاح التغيير، والبرمجة هي لغة العصر.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/courses" className="hover:text-primary">الكورسات</Link></li>
              <li><Link href="/verify" className="hover:text-primary">تحقق من الشهادة</Link></li>
              <li><Link href="/library" className="hover:text-primary">مكتبة الكتب</Link></li>
              <li><Link href="/faq" className="hover:text-primary">الأسئلة الشائعة</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>support@arabdevs.com</li>
              <li>واتساب: +966 500 000 000</li>
              <li className="flex gap-4 justify-end mt-4">
                {/* Social icons placeholder */}
                <div className="size-8 rounded bg-primary/10 hover:bg-primary hover:text-white transition-colors cursor-pointer" />
                <div className="size-8 rounded bg-primary/10 hover:bg-primary hover:text-white transition-colors cursor-pointer" />
                <div className="size-8 rounded bg-primary/10 hover:bg-primary hover:text-white transition-colors cursor-pointer" />
              </li>
            </ul>
          </div>
        </div>
        <div className="container px-4 md:px-8 mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
          جميع الحقوق محفوظة © {new Date().getFullYear()} ArabDevs
        </div>
      </footer>
    </div>
  );
}
