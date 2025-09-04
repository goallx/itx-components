// import SupabaseAuth from "./components/SupabaseAuth";

// export default function AuthPage() {
//     return (
//         <SupabaseAuth />
//     )
// }

// app/auth/login/page.tsx
'use client'

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
    const supabase = createClient()

    useEffect(() => {
        const login = async () => {
            const redirectUrl = `${window.location.origin}/api/auth/callback`

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: redirectUrl },
            })

            if (error) console.error(error)
            if (data?.url) window.location.href = data.url
        }

        login()
    }, [supabase])

    return <div>Redirecting to Google...</div>
}
