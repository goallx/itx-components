import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const course = searchParams.get("course");

    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabaseAdmin
      .from("leads")
      .insert([{ name, email, phone, course }]);
    if (error) {
      console.error("Insert lead error:", error);
    }

    console.log("API KEY exists:", !!process.env.SENDGRID_API_KEY);

    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY!,
      },
    });

    const html = `
      <h2>New Lead Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Course:</strong> ${course || ""}</p>
    `;

    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL!,
      to: process.env.SENDGRID_FROM_EMAIL!,
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
