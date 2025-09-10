import nodemailer from "nodemailer";

export async function sendMail(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // port 465 requires SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ITX Academy" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
}
