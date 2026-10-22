import { type Locale } from '@/lib/i18n/config';
import { EnrollmentClient } from './EnrollmentClient';

export default async function EnrollmentPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  return <EnrollmentClient lang={lang} />;
}
