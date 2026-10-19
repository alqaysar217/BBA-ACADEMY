
import { redirect } from 'next/navigation';
import { i18n } from '@/lib/i18n/config';

export default function RootPage() {
  // Fallback redirect if middleware is bypassed
  redirect(`/${i18n.defaultLocale}`);
}
