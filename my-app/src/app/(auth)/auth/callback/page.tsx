// "use client";

// import { createClient } from "@/utils/supabase/client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function AuthCallback() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const handleOAuthCallback = async () => {
//             const supabase = await createClient();
//             const code = searchParams.get("code");
//             const errorParam = searchParams.get("error");

//             if (errorParam) {
//                 console.error("OAuth error from URL:", errorParam);
//                 setLoading(false);
//                 return;
//             }

//             if (!code) {
//                 console.error("No code found in callback URL.");
//                 setLoading(false);
//                 return;
//             }

//             const { data, error } = await supabase.auth.exchangeCodeForSession(code);

//             if (error) {
//                 console.error("OAuth exchange error:", error.message);
//                 setLoading(false);
//                 return;
//             }

//             if (data?.session) {
//                 console.log("@@Session:", data.session);
//                 router.replace("/after-log-in");
//             } else {
//                 console.error("No session returned.");
//                 setLoading(false);
//             }
//         };

//         handleOAuthCallback();
//     }, [router, searchParams]);

//     if (loading) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen">
//                 <span className="mb-4">جارٍ تحضير لوحة التحكم الخاصة بك...</span>
//                 <svg
//                     className="w-6 h-6 animate-spin text-gray-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                 >
//                     <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                     ></circle>
//                     <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     ></path>
//                 </svg>
//             </div>
//         );
//     }

//     return null;
// }



"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthCallback() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const handleAuth = async () => {
            const supabase = await createClient();

            try {
                const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
                    if (!mounted) return;
                    const { user } = session || {}
                    if (user) {
                        console.log('@@user', user)
                        const { user_metadata } = user
                        if (!user_metadata.user_id) {
                            // await createProfile()
                        }
                    }
                    if (event === "SIGNED_IN" && session) {
                        const redirect = sessionStorage.getItem("redirect") || "/dashboard/account/profile";
                        router.replace(redirect);
                    } else if (event === "SIGNED_OUT") {
                        router.replace("/login");
                    }
                });

            } catch (err: any) {
                if (mounted) {
                    setError(err instanceof Error ? err.message : "Authentication failed");
                    setLoading(false);
                }
            }
        };

        handleAuth();

        return () => {
            mounted = false;
        };
    }, [router]);



    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                    <h1 className="text-2xl font-semibold text-red-600 mb-4">
                        فشل التحقق
                    </h1>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <Button onClick={() => window.location.reload()}>حاول مرة أخرى</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gradient-to-br from-[#526d92] via-[#3f526e] to-[#7C3AED]/20 flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#009BD1] opacity-20 blur-xl animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#0078A3] opacity-20 blur-xl animate-pulse delay-1000" />

            <div className="relative bg-white dark:bg-[#1F2937] border border-[#009BD1]/30 dark:border-[#009BD1]/20 rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#009BD1] to-[#0078A3]" />
                <div className="p-8">
                    <div className="space-y-4 mb-8 flex flex-col items-center">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Check className="w-10 h-10 text-green-500 animate-bounce" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                            تم تأكيد البريد الإلكتروني
                        </h2>
                        <p className="text-gray-500 dark:text-[#9CA3AF] text-sm font-medium">
                            تم التحقق من بريدك الإلكتروني بنجاح
                        </p>
                    </div>

                    <div
                        dir="rtl"
                        className="w-full relative overflow-hidden flex justify-center items-center space-x-2 bg-gradient-to-r from-[#009BD1] to-[#0078A3] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                    >
                        {loading ? (
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
                        ) : null}
                    </div>

                    <div className="mt-6 h-1.5 bg-gray-200 dark:bg-[#374151] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#009BD1] to-[#0078A3] rounded-full"
                            style={{
                                animation: "progress 2s ease-in-out infinite",
                            }}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
        </div>
    );
}
