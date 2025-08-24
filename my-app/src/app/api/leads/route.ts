import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey", // SendGrid requires this literal string
        pass: process.env.SENDGRID_API_KEY, // store your API key in env
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Lead Form" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL, // your email
      subject: "New Lead from Landing Page",
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
