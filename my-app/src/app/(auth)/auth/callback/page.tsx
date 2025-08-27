"use client";


import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthCallback() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const supabase = await createClient();

            const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

            if (error) {
                console.error("OAuth error:", error.message);
                return;
            }

            if (data?.session) {
                // ✅ user is signed in now
                router.replace("/after-log-in");
            }
        };

        handleOAuthCallback();
    }, [router]);

    if (loading) {
        return (
            <>
                <span>جارٍ تحضير لوحة التحكم الخاصة بك...</span>
                <div className="ml-2">
                    <svg
                        className="w-5 h-5 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    />
                </div>
            </>
        )
    }


    return (
        null
    );
}
