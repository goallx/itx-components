import { supabaseAdmin } from "@/utils/supabase/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, name, birthday } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: { full_name: name, created_by: "self" },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const { error: confirmError } = await supabaseAdmin.auth.admin.generateLink(
      {
        type: "signup",
        email,
        password,
      }
    );
    if (confirmError) throw confirmError;

    return NextResponse.json({
      message: "✅ Account created! Please check your email to confirm.",
      user_id: user.user?.id,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
