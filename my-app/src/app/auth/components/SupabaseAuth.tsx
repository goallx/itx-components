'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'

export default function SupabaseAuth() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const supabase = createClient()

    useEffect(() => {
        if (!supabase) {
            setLoading(false)
            return
        }

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)

            if (window.parent !== window) {
                window.parent.postMessage({
                    type: 'AUTH_STATE_CHANGE',
                    user: session?.user,
                    event: event
                }, '*')
            }
        })

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [supabase])


    const handleGoogleLogin = async () => {
        if (!supabase) return

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/api/auth/callback`,
            },
        })

        if (error) {
            console.error('Error signing in with Google:', error)
            return
        }

        if (data?.url) {
            const loginWindow = window.open(
                data.url,
                'supabaseAuth',
                'width=500,height=600'
            )

            const checkWindowClosed = setInterval(() => {
                if (loginWindow?.closed) {
                    clearInterval(checkWindowClosed)
                    supabase.auth.getUser().then(({ data: { user } }) => {
                        setUser(user)
                    })
                }
            }, 500)
        }
    }

    const handleLogout = async () => {
        if (!supabase) return
        await supabase.auth.signOut()
    }

    if (!supabase) {
        return <div>Initializing...</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            {user ? (
                <div>
                    <p>Welcome, {user.email}</p>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Sign out
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        onClick={handleGoogleLogin}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4285F4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            margin: '0 auto'
                        }}
                    >
                        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            )}
        </div>
    )
}