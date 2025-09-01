'use client'

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function AuthProviders() {
    const [isLoading, setIsLoading] = useState<"google" | "microsoft" | null>(null);

    const handleOAuthLogin = (provider: "google" | "azure") => {
        setIsLoading(provider === "google" ? "google" : "microsoft");
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!
        const REDIRECT_URL = encodeURIComponent(`${SITE_URL}/auth/callback`);

        const url = `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${REDIRECT_URL}`;
        window.open(url, "_blank");
    };

    const handleGoogleLogin = async () => {
        const supabase = await createClient()
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    // redirectTo: `${window.location.origin}/auth/callback`,
                    redirectTo: `https://itx-components.vercel.app/auth/callback`,
                },
            })
            if (error) throw error
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div dir="rtl" className="w-full flex flex-col gap-3">
            <Button
                // onClick={() => handleOAuthLogin("google")}
                onClick={handleGoogleLogin}
                disabled={isLoading === "google"}
                className="w-full h-12 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-[30px] flex items-center justify-center gap-3 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
                <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M24 9.5c3.9 0 7.1 1.4 9.2 3.6l6.9-6.9C35.4 2.6 30.2 0 24 0 14.6 0 6.8 5.8 2.8 14.1l8.1 6.3C12.5 14.6 17.8 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.7-2.1 5-4.5 6.5l7.1 5.5c4.2-3.9 6.6-9.7 6.6-16z" />
                    <path fill="#FBBC05" d="M10.9 28.7c-.6-1.5-1-3.2-1-4.9s.4-3.4 1-4.9l-8.1-6.3C1.3 16.2 0 19.9 0 24s1.3 7.8 2.8 11.3l8.1-6.6z" />
                    <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.1-5.5c-2 1.4-4.6 2.3-8.1 2.3-6.2 0-11.5-4.1-13.4-9.8l-8.1 6.6C6.8 42.2 14.6 48 24 48z" />
                    <path fill="none" d="M0 0h48v48H0z" />
                </svg>

                {isLoading === "google" ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                    <span className="text-sm font-medium">المتابعة باستخدام جوجل</span>
                )}
            </Button>

            <Button
                onClick={() => handleOAuthLogin("azure")}
                disabled={isLoading === "microsoft"}
                className="w-full h-12 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-[30px] flex items-center justify-center gap-3 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
                    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                    <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                    <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                </svg>

                {isLoading === "microsoft" ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                    <span className="text-sm font-medium">المتابعة باستخدام مايكروسوفت</span>
                )}
            </Button>
        </div>
    );
}