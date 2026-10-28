
import nodemailer from 'nodemailer';

/**
 * Mail Service
 * Handles the actual SMTP connection and sending logic via Gmail.
 */

export async function sendAcademyEmail({
  to,
  subject,
  html,
  attachments = []
}: {
  to: string;
  subject: string;
  html: string;
  attachments?: any[];
}) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

  if (!user || !pass || user.trim() === '' || pass.trim() === '') {
    return { 
      success: false, 
      error: 'CONFIG_MISSING',
      message: 'Email configuration is missing on the server. Please set GMAIL_USER and GMAIL_PASS in your environment settings.' 
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass, // Should be a Google App Password
    },
  });

  const mailOptions = {
    from: `"BBA Academy" <${user}>`,
    to,
    subject,
    html: html.replace(/\n/g, '<br>'), // Convert newlines to HTML for proper display
    attachments: attachments.map(att => {
      // Handle base64 data URI format
      const base64Data = att.data.split(',')[1];
      return {
        filename: att.name,
        content: base64Data,
        encoding: 'base64',
        contentType: att.type
      };
    })
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('SMTP Error:', error);
    return { success: false, error: 'SMTP_FAILED', message: error.message };
  }
}
