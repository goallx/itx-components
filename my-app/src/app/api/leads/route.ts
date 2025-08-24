import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    // Validate fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    const html = `
      <h2>New Lead Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
    `;

    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL!,
      // to: process.env.SENDGRID_FROM_EMAIL!,
      to: "wael.haddad96@gmail.com",
      subject: `New Lead: ${name} - ${phone}`,
      html,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
