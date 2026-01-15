import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Debugging: Check if the server can see your settings
    console.log("📨 Subscribe API Triggered");
    console.log("Using User:", process.env.GMAIL_USER); 
    
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error("❌ ERROR: GMAIL_USER or GMAIL_PASS is missing from .env.local");
      return NextResponse.json({ success: false, error: "Server misconfiguration" }, { status: 500 });
    }

    // 2. Configure Email (Using GMAIL_ variables)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Matches your .env.local
        pass: process.env.GMAIL_PASS, // Matches your .env.local
      },
    });

    // 3. Send Notification to YOU
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'sanjar@aliboyev.com',
      subject: '📧 New Newsletter Subscriber',
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    });

    console.log("✅ Email sent successfully to Admin");

    // 4. Send Confirmation to USER
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Welcome to LexCorp Updates',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #001F3F;">
          <h2>Thank you for subscribing!</h2>
          <p>You will now receive updates about our articles, news, and success cases.</p>
          <br>
          <p>Best regards,<br><strong>LexCorp Team</strong></p>
        </div>
      `,
    });

    console.log("✅ Welcome email sent to User");
    return NextResponse.json({ success: true });

  } catch (error: any) {
    // This prints the exact error to your terminal
    console.error("❌ FINAL EMAIL ERROR:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}