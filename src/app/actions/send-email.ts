
'use server';

import { sendAcademyEmail } from '@/lib/mail-service';

/**
 * Server Action: Dispatch Email
 * Wraps the mail service in a secure environment.
 */

export async function dispatchEmailAction({
  to,
  subject,
  content,
  attachments
}: {
  to: string;
  subject: string;
  content: string;
  attachments?: any[];
}) {
  try {
    const result = await sendAcademyEmail({
      to,
      subject,
      html: content,
      attachments
    });

    return result;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
