'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AuthCallback() {
    const searchParams = useSearchParams()
    const supabase = createClient()

    useEffect(() => {
        const handleAuth = async () => {
            const code = searchParams.get('code')
            const error = searchParams.get('error')
            const redirectUrl = 'https://itx-academy.com/after-log-in'

            if (error) {
                console.error('OAuth error:', error)
                window.close()
                return
            }

            if (!code) {
                console.error('No code in query params')
                window.close()
                return
            }

            try {
                // Exchange the code for session
                const { data: { session }, error: exchangeError } =
                    await supabase.auth.exchangeCodeForSession(code)

                if (exchangeError || !session) {
                    console.error('Error exchanging code:', exchangeError)
                    window.close()
                    return
                }

                // Session is now set; redirect the popup to Framer after-login page
                window.location.href = redirectUrl
            } catch (err) {
                console.error('Auth callback failed:', err)
                window.close()
            }
        }

        handleAuth()
    }, [searchParams, supabase])

    return <p>Signing you in...</p>
}
