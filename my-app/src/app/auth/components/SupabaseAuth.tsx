'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'

export default function SupabaseAuth() {
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        if (!supabase) return

        const handleMessage = (event: any) => {
            if (event.data.type === 'TRIGGER_LOGOUT') handleLogout()
        }

        window.addEventListener('message', handleMessage)

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)

            // Notify parent window (Framer)
            if (window.parent !== window) {
                window.parent.postMessage({
                    type: 'AUTH_STATE_CHANGE',
                    user: session?.user,
                    event,
                }, '*')
            }
        })

        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
        })

        return () => {
            window.removeEventListener('message', handleMessage)
            subscription.unsubscribe()
        }
    }, [supabase])

    const handleGoogleLogin = async () => {
        if (!supabase) return
        const redirectUrl = 'https://itx-components.vercel.app/auth/callback'

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })

        if (error) {
            console.error('Google Sign-in error:', error)
            return
        }

        if (data?.url) {
            const loginWindow = window.open(
                data.url,
                'SupabaseAuth',
                'width=500,height=600'
            )
            if (!loginWindow) {
                alert('Popup blocked. Please allow popups for this site.')
            }
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        localStorage.removeItem('supabase_provider')
    }

    // 🔥 No UI here — this page runs silently
    return null
}
