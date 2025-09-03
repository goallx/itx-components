import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(new URL("/auth/error", request.url));
      }

      return NextResponse.redirect(new URL("/after-log-in", request.url));
    } catch (error) {
      console.error("Error in auth callback:", error);
      return NextResponse.redirect(new URL("/auth/error", request.url));
    }
  }

  return NextResponse.redirect(new URL("/auth/error", request.url));
}
