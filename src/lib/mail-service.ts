
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
      message: 'Email configuration is missing on the server. Please set GMAIL_USER and GMAIL_PASS (App Password) in your environment settings.' 
    };
  }

  // 2. Transporter Configuration (Optimized for Gmail)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: user,
      pass: pass, // This MUST be an App Password
    },
    // Prevent common timeouts
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });

  // 3. Email Formatting & Wrap in professional HTML
  const formattedHtml = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #1a202c; max-width: 600px; margin: 0 auto; border: 1px solid #edf2f7; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0b1f5b; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">BBA Academy</h1>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        ${html.replace(/\n/g, '<br>')}
      </div>
      <div style="background-color: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #edf2f7;">
        <p style="margin: 0; font-size: 12px; color: #a0aec0;">&copy; 2026 Baneen & Banaat Academy. All rights reserved.</p>
        <p style="margin: 5px 0 0; font-size: 10px; color: #cbd5e0;">Official Correspondence: ${user}</p>
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
    // 4. Verify connection before sending
    await transporter.verify();
    
    // 5. Dispatch Email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email successfully dispatched:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Detailed SMTP Error:', error);
    
    // Handle specific Gmail errors
    if (error.code === 'EAUTH') {
      return { 
        success: false, 
        error: 'AUTH_FAILED', 
        message: 'Invalid credentials. If using Gmail, ensure you use an "App Password" not your regular password.' 
      };
    }

    return { success: false, error: 'SMTP_FAILED', message: error.message };
  }
}
