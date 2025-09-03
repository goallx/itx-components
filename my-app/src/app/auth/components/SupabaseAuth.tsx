'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'

export default function SupabaseAuthPage() {
    const supabase = createClient()

    useEffect(() => {
        if (!supabase) return

        const handleLogin = async () => {
            const redirectUrl = 'https://itx-components.vercel.app/auth/callback'

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: redirectUrl },
            })

            if (error) console.error('Login error:', error)
            if (data?.url) window.location.href = data.url
        }

        handleLogin()
    }, [supabase])

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="text-center">
                <p>جارٍ تسجيل الدخول...</p>
            </div>
        </div>
    )
}
