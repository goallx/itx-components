'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function AfterLoginPage() {
    const supabase = createClient()
    const [user, setUser] = useState<any>(null)
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession()
            if (sessionError || !session) {
                setLoading(false)
                return
            }

            setUser(session.user)

            // Fetch user courses
            const { data, error: coursesError } = await supabase
                .from('courses')
                .select('*')

            console.log("@@data", data)

            if (coursesError) {
                console.error('Error fetching courses:', coursesError)
            } else {
                setCourses(data)
            }

            setLoading(false)

            // Send session info to Framer parent window
            if (window.parent !== window) {
                window.parent.postMessage({
                    type: 'AUTH_STATE_CHANGE',
                    user: session.user,
                }, '*')
            }
        }

        fetchData()
    }, [supabase])

    if (loading) return <p className="p-4">Loading...</p>

    if (!user) return <p className="p-4 text-red-500">Not logged in</p>

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>

            <h2 className="text-xl font-semibold mb-2">Your Courses:</h2>
            {courses.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                <ul className="space-y-2">
                    {courses.map(course => (
                        <li key={course.id} className="p-4 border rounded shadow-sm">
                            {course.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
