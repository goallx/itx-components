"use client";

import React, { useEffect, useState } from "react";
import CoursesSection, { ICourse } from "./components/Courses";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";

export default function CoursesPage() {
    // const [user, setUser] = useState<any>(null);

    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const handleMessage = (event: MessageEvent) => {
    //         // Only accept messages from Framer
    //         const allowedOrigins = ["https://itx-academy.com"];
    //         if (!allowedOrigins.includes(event.origin)) return;

    //         const { type, user: incomingUser } = event.data || {};
    //         if (type === "AUTH_STATE_CHANGE" && incomingUser) {
    //             setUser(incomingUser);
    //             fetchCourses(incomingUser.id);
    //         }
    //     };

    //     window.addEventListener("message", handleMessage);

    //     // Notify parent that iframe is ready
    //     window.parent.postMessage({ type: "READY_FOR_USER" }, "https://itx-academy.com");

    //     return () => window.removeEventListener("message", handleMessage);
    // }, []);


    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         const userRes = await fetch('https://itx-components.vercel.app/api/auth/user', {
    //             credentials: 'include',
    //         })
    //         const data = await userRes.json()
    //         console.log('@@user data', data)
    //         setUser(data.user)
    //     }
    //     fetchCourses()
    // }, [])

    // if (loading) return <p className="text-center py-20">Loading courses...</p>;
    // if (!user) return <p className="text-center py-20">Waiting for login...</p>;

    const searchParams = useSearchParams();
    const userId = searchParams.get("user");
    const [loading, setLoading] = useState<boolean>(false)
    const [courses, setCourses] = useState<(ICourse & { isSubscribed: boolean })[]>([]);
    console.log('@@userid', userId)

    useEffect(() => {
        if (userId) {
            fetchCourses(userId)
        }
    }, [userId])

    const fetchCourses = async (userId: string) => {
        setLoading(true)
        const supabase = createClient();

        // Fetch courses
        const { data: coursesData } = await supabase.from("courses").select("*");
        if (!coursesData) {
            setLoading(false);
            return;
        }

        // Fetch user subscriptions
        const { data: subscriptions } = await supabase
            .from("user_courses")
            .select("course_id")
            .eq("user_id", userId);

        console.log('@@coures', subscriptions)
        const subscribedCourseIds = subscriptions?.map(s => s.course_id) || [];

        const mapped = coursesData.map(course => ({
            ...course,
            isSubscribed: subscribedCourseIds.includes(course.id),
        }));

        setCourses(mapped);
        setLoading(false);
    };

    if (loading) return <p className="text-center py-20">Loading courses...</p>;

    return <CoursesSection courses={courses} />;

}
