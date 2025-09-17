'use client'

import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const supabase = createClient()
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                console.log("Login successful:", data);
                alert("تم تسجيل الدخول بنجاح!");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto text-center p-8 bg-gray-50 rounded-2xl">
            <h2 className="text-2xl font-bold mb-2">تسجيل الدخول</h2>
            <p className="text-gray-600 mb-6">ادخل على حسابك بطريقة آمنة وبسيطة</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-full transition"
                    disabled={loading}
                >
                    {loading ? "جاري الدخول..." : "تسجيل الدخول"}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>

            <button
                className="mt-4 text-sm text-gray-700 hover:underline"
            // onClick={onForgotPassword}
            >
                نسيت كلمة المرور
            </button>

            <div className="h-px bg-gray-300 my-6" />

            <p className="text-sm text-gray-700">
                لا تملك حساب؟{" "}
                <span
                    className="text-blue-600 font-bold cursor-pointer hover:underline"
                    onClick={() => window.location.href = "/signup"}
                >
                    قم بإنشاء حساب
                </span>
            </p>
        </div>
    );
};

export default LoginForm;
