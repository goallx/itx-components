"use client";


import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthCallback() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const handleRedirect = async () => {
            const supabase = await createClient();
            try {
                supabase.auth.onAuthStateChange(async (event) => {
                    if (!mounted) return;
                    console.log('@@event', event)
                    if (event === "SIGNED_IN")
                        router.replace('/dashboard')
                });

            } catch (err) {
                console.log('@@err', err)
                if (mounted) {
                    // setError(err instanceof Error ? err.message : "Authentication failed");
                    setLoading(false);
                }
            }
        };

        handleRedirect();

        return () => {
            mounted = false;
        };
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
