
import { redirect } from 'next/navigation';
import { i18n } from '@/lib/i18n/config';

export default function VerifyRedirect() {
  // This page was from a previous project. Redirecting to home.
  redirect(`/${i18n.defaultLocale}`);
}
