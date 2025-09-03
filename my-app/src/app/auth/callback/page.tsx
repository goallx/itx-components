// 'use client'

// import { useEffect } from 'react'
// import { createClient } from '@/utils/supabase/client'

// export default function AuthCallback() {
//     const supabase = createClient()

//     useEffect(() => {
//         const handleAuth = async () => {
//             try {
//                 // Exchange code for session if needed
//                 const { data: { session }, error } = await supabase.auth.getSession()
//                 if (error) {
//                     console.error('Error getting session:', error)
//                     if (window.opener) {
//                         window.opener.postMessage({ type: 'AUTH_STATE_CHANGE', user: null }, '*')
//                     }
//                     return
//                 }

//                 // Send user data to parent window (Framer)
//                 if (window.opener && session?.user) {
//                     window.opener.postMessage({ type: 'AUTH_STATE_CHANGE', user: session.user }, '*')
//                 }

//                 // Redirect the popup window to Framer after login
//                 window.location.href = 'https://itx-academy.com/after-log-in'
//             } catch (err) {
//                 console.error('Error in auth callback:', err)
//                 if (window.opener) {
//                     window.opener.postMessage({ type: 'AUTH_STATE_CHANGE', user: null }, '*')
//                 }
//                 window.location.href = 'https://itx-academy.com/auth/error'
//             }
//         }

//         handleAuth()
//     }, [supabase])

//     return <p>Signing you in...</p>
// }


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
