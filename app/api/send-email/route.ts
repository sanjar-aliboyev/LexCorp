import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, message, source, interest } = body;

    // 1. Configure the Transporter (Your Gmail Login)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // sanjar@aliboyev.com
        pass: process.env.GMAIL_PASS, // App Password
      },
    });

    // 2. Format the Email Body
    const mailOptions = {
      from: `"LexCorp Website" <${process.env.GMAIL_USER}>`, // Sender
      to: 'sanjar@aliboyev.com', // Receiver (You)
      subject: `🔔 New Lead: ${name} (${source})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #001F3F;">New Client Inquiry</h2>
          <p><strong>Source:</strong> ${source}</p>
          <hr />
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📞 Phone:</strong> ${phone}</p>
          ${email ? `<p><strong>📧 Email:</strong> ${email}</p>` : ''}
          ${interest ? `<p><strong>⚖️ Service:</strong> ${interest}</p>` : ''}
          <p><strong>💬 Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #C5A059;">
            ${message || "No message provided."}
          </blockquote>
        </div>
      `,
    };

    // 3. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}
