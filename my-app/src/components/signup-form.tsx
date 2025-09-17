'use client'

import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";

const SignupForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== retypePassword) {
            setError("كلمات المرور غير متطابقة");
            return;
        }

        setLoading(true);
        try {
            const supabase = createClient()
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: fullName },
                    emailRedirectTo: "https://itx-components.vercel.app/auth/callback",
                },
            });

            if (error) {
                setError(error.message);
            } else {
                alert("تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني لتأكيد الحساب.");
                // Optionally redirect to login page
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto text-center p-8 bg-gray-50 rounded-2xl mt-12">
            <h2 className="text-2xl font-bold mb-2">إنشاء حساب جديد</h2>
            <p className="text-gray-600 mb-6">قم بإنشاء حساب بطريقة آمنة وبسيطة</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="الاسم الكامل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="p-3 rounded-full border border-gray-300 text-right text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                />
                <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-full border border-gray-300 text-right text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                />
                <input
                    type="password"
                    placeholder="كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 rounded-full border border-gray-300 text-right text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                />
                <input
                    type="password"
                    placeholder="أعد كتابة كلمة المرور"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    className="p-3 rounded-full border border-gray-300 text-right text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                />

                <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-full transition"
                    disabled={loading}
                >
                    {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                </button>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>

            <div className="h-px bg-gray-300 my-6" />

            <p className="text-sm text-gray-700">
                لديك حساب؟{" "}
                <span
                    className="text-blue-600 font-bold cursor-pointer hover:underline"
                    onClick={() => window.location.href = "/login"}
                >
                    تسجيل الدخول
                </span>
            </p>
        </div>
    );
};

export default SignupForm;
