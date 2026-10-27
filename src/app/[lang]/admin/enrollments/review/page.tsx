
import { redirect } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';

export default async function RedirectReviewPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  
  // توجيه تلقائي لسجل الطلبات الرئيسي لأن واجهة المراجعة أصبحت مكررة
  redirect(`/${lang}/admin/enrollments`);
}
