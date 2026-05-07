import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Award, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const stats = [
    { label: 'إجمالي الأرباح', value: '$12,450', icon: <DollarSign className="size-5" />, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'الطلاب النشطون', value: '3,842', icon: <Users className="size-5" />, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'الكورسات المتاحة', value: '24', icon: <BookOpen className="size-5" />, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'الشهادات المصدرة', value: '1,120', icon: <Award className="size-5" />, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const pendingApprovals = [
    { id: 1, student: 'فهد الأحمد', course: 'احتراف Flutter', date: 'منذ ساعتين', amount: '89$' },
    { id: 2, student: 'سارة خالد', course: 'تصميم UI/UX', date: 'منذ 5 ساعات', amount: '45$' },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <Header />
      <main className="container px-4 md:px-8 py-10">
        <div className="flex items-center gap-4 mb-8 flex-row-reverse">
          <div className="p-2 bg-primary text-white rounded-lg"><LayoutDashboard className="size-6" /></div>
          <h1 className="font-headline text-3xl font-bold text-right">لوحة التحكم الإدارية</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center justify-between flex-row-reverse">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold font-headline">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between flex-row-reverse">
              <CardTitle className="font-headline text-xl">طلبات الاشتراك المعلقة</CardTitle>
              <Button variant="outline" size="sm">عرض الكل</Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {pendingApprovals.map((req) => (
                  <div key={req.id} className="py-4 flex items-center justify-between flex-row-reverse">
                    <div className="flex items-center gap-4 flex-row-reverse">
                       <div className="size-10 rounded-full bg-muted" />
                       <div className="text-right">
                          <div className="font-bold">{req.student}</div>
                          <div className="text-xs text-muted-foreground">{req.course} • {req.amount}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">رفض</Button>
                       <Button size="sm" className="bg-green-600 hover:bg-green-700">تفعيل</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
             <CardHeader className="text-right">
               <CardTitle className="font-headline text-xl">أدوات الإدارة السريعة</CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col gap-3">
               <Button variant="outline" className="w-full justify-between flex-row-reverse h-12">
                 <span>إضافة كورس جديد</span>
                 <BookOpen className="size-5" />
               </Button>
               <Button variant="outline" className="w-full justify-between flex-row-reverse h-12">
                 <span>رفع كتاب للمكتبة</span>
                 <TrendingUp className="size-5" />
               </Button>
               <Button variant="outline" className="w-full justify-between flex-row-reverse h-12">
                 <span>إصدار شهادة يدوياً</span>
                 <Award className="size-5" />
               </Button>
               <Button variant="outline" className="w-full justify-between flex-row-reverse h-12">
                 <span>إدارة المستخدمين</span>
                 <Users className="size-5" />
               </Button>
             </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
