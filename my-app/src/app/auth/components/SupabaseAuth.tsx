'use client'

import { createClient } from '@/utils/supabase/client'

export default function SupabaseAuth() {
    const supabase = createClient()

    const handleGoogleLogin = async () => {
        const redirectUrl = 'https://itx-components.vercel.app/auth/callback'
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: redirectUrl },
        })
        if (error) console.error(error)
        if (data?.url) window.location.href = data.url
    }

    // Expose method globally so Framer can call it
    if (typeof window !== 'undefined') {
        ; (window as any).supabaseGoogleLogin = handleGoogleLogin
    }

    return null
}
