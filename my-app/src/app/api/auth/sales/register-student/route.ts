import { supabaseAdmin } from "@/utils/supabase/supabaseAdmin";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is missing" }, { status: 400 });
    }

    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = users.users.find((u) => u.email === email);
    let userId: string;

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const randomPassword = Math.random().toString(36).slice(-10);

      const { data: newUser, error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email,
          password: randomPassword,
          email_confirm: false,
        });

      if (createError) throw new Error(createError.message);
      userId = newUser.user?.id!;

      const { data: confirmEmailData, error: confirmError } =
        await supabaseAdmin.auth.admin.generateLink({
          type: "signup",
          email,
          password: randomPassword,
          options: {
            redirectTo: "https://itxacademy.com/welcome",
          },
        });

      if (confirmError) throw confirmError;
      const signupLink = confirmEmailData.properties?.action_link;
      if (!signupLink) throw new Error("Signup link missing");

      await sendMail(
        email,
        "Your ITX Academy Account",
        `
Hi ${name || "Student"},

Your account has been created at ITX Academy 🎉

Please confirm your email and set up your account:
${signupLink}

Temporary Password: ${randomPassword}

After confirming, log in with your email and this password.
Make sure to change it after first login.

Best regards,
ITX Academy Team
        `
      );
    }

    return NextResponse.json({
      message: "Student registered! Email confirmation sent.",
      user_id: userId,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
