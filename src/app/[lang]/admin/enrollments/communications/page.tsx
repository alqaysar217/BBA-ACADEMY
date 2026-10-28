
import { redirect } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';

export default async function RedirectCommsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  
  // توجيه تلقائي لسجل الطلبات الرئيسي لأن واجهة المراسلات الموحدة تم إلغاؤها
  redirect(`/${lang}/admin/enrollments`);
}
