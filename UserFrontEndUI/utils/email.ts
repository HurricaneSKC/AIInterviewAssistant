// utils/email.ts
import nodemailer from 'nodemailer';

// Create the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send reset email
export async function sendResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/user/reset-password/${token}`;

  const mailOptions = {
    from: '"AIIA" <noreply@yourapp.com>',
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Please click on this link to reset your password: ${resetUrl}`,
    html: `
      <p style="color: black; font-size: 60px; margin: 10px 0px">AI<span style="color: #07bcc2;">IA</span></p>
      <h1 style="color: #1e2b3a;">Password Reset Request</h1>
      <p style="color: #1e2b3a;">You requested a password reset. Please click on the button below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #07bcc2; border: none; border-radius: 9999px; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; box-shadow: rgba(12, 25, 39, 0.08) 0px 1px 1px, rgba(12, 25, 39, 0.14) 0px 1px 3px;">Reset Password</a>
      <p style="color: #1e2b3a;">If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}