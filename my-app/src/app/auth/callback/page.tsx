'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'

export default function AuthCallback() {
    const supabase = createClient()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (window.opener) {
                window.opener.postMessage(
                    { type: 'AUTH_STATE_CHANGE', user: session?.user },
                    '*'
                )
                window.close()
            }
        })
    }, [supabase])

    return <div>جارٍ تسجيل الدخول...</div>
}
