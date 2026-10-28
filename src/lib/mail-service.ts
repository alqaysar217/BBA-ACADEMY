
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

  // 1. Strict Configuration Check
  if (!user || !pass || user.trim() === '' || pass.trim() === '') {
    return { 
      success: false, 
      error: 'CONFIG_MISSING',
      message: 'إعدادات البريد مفقودة. يرجى ضبط GMAIL_USER و GMAIL_PASS في ملف .env' 
    };
  }

  // 2. Transporter Configuration (Optimized for Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass, // This MUST be a 16-character App Password
    },
  });

  // 3. Email Formatting & Wrap in professional HTML
  const formattedHtml = `
    <div dir="ltr" style="font-family: sans-serif; line-height: 1.6; color: #1a202c; max-width: 600px; margin: 0 auto; border: 1px solid #edf2f7; border-radius: 12px; overflow: hidden; shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="background-color: #0b1f5b; padding: 30px; text-align: center;">
        <img src="https://studio-2654552044-6b576.firebasestorage.app/v0/b/studio-2654552044-6b576.firebasestorage.app/o/logo.png?alt=media" alt="BBA Academy" style="height: 60px; margin-bottom: 10px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Baneen & Banaat Academy</h1>
      </div>
      <div style="padding: 40px; background-color: #ffffff;">
        ${html.replace(/\n/g, '<br>')}
      </div>
      <div style="background-color: #f7fafc; padding: 25px; text-align: center; border-top: 1px solid #edf2f7;">
        <p style="margin: 0; font-size: 12px; color: #a0aec0; font-weight: bold;">&copy; 2026 Baneen & Banaat Academy. All rights reserved.</p>
        <p style="margin: 5px 0 0; font-size: 10px; color: #cbd5e0;">Official Correspondence: ${user}</p>
        <div style="margin-top: 15px;">
           <a href="https://wa.me/13136555778" style="color: #25D366; text-decoration: none; font-size: 11px; font-weight: bold;">WhatsApp Support</a>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"BBA Academy" <${user}>`,
    to,
    subject,
    html: formattedHtml,
    attachments: attachments.map(att => {
      // Robust Base64 extraction
      const parts = att.data.split(',');
      const base64Data = parts.length > 1 ? parts[1] : parts[0];
      return {
        filename: att.name,
        content: base64Data,
        encoding: 'base64' as const,
        contentType: att.type
      };
    })
  };

  try {
    // 4. Dispatch Email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email successfully dispatched:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Detailed SMTP Error:', error);
    
    // Handle specific Gmail errors
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      return { 
        success: false, 
        error: 'AUTH_FAILED', 
        message: 'Invalid credentials. If using Gmail, ensure you use an "App Password" not your regular password.' 
      };
    }

    if (error.code === 'EENVELOPE') {
      return {
        success: false,
        error: 'INVALID_RECIPIENT',
        message: 'عنوان بريد المستلم غير صحيح أو غير موجود.'
      };
    }

    return { success: false, error: 'SMTP_FAILED', message: error.message };
  }
}
