'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AuthCallback() {
    const router = useRouter()
    const supabase = createClient()
    useEffect(() => {
        const handleAuth = async () => {
            const { data, error } = await supabase.auth.getSession()
            if (error) {
                console.error('Error getting session:', error)
                router.push('/auth/error')
            } else {
                router.push('/after-log-in')
            }
        }

        handleAuth()
    }, [router, supabase])

    return <p>Signing you in...</p>
}
