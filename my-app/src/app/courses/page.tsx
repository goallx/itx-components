"use client";

import React, { useEffect, useState } from "react";
import CoursesSection, { ICourse } from "./components/Courses";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
    const [user, setUser] = useState<any>(null);
    const [courses, setCourses] = useState<(ICourse & { isSubscribed: boolean })[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();

        async function fetchData() {
            const { data } = await supabase.auth.getSession()
            console.log('@@data', data)
            // 1️⃣ Get user from localStorage
            const sessionStr = localStorage.getItem("supabaseUser");
            let userId: string | null = null;
            console.log('@@sessionsr', sessionStr)
            if (sessionStr) {
                try {
                    const session = JSON.parse(sessionStr);
                    userId = session.id

                } catch (err) {
                    console.error("Error parsing Supabase session from localStorage", err);
                }
            }

            if (!userId) {
                // redirect to sign-in if no user
                // router.replace("/sign-in");
                return;
            }

            console.log('@@userId', userId)
            setUser({ id: userId });

            // 2️⃣ Fetch all courses
            const { data: coursesData } = await supabase.from("courses").select("*");
            if (!coursesData) {
                setLoading(false);
                return;
            }

            // 3️⃣ Fetch user subscriptions
            const { data: subscriptions } = await supabase
                .from("user_courses")
                .select("course_id")
                .eq("user_id", userId);

            const subscribedCourseIds = subscriptions?.map(s => s.course_id) || [];

            // 4️⃣ Map courses with subscription info
            const mapped = coursesData.map(course => ({
                ...course,
                isSubscribed: subscribedCourseIds.includes(course.id),
            }));

            setCourses(mapped);
            setLoading(false);
        }

        fetchData();
    }, [router]);

    if (loading) return <p className="text-center py-20">Loading courses...</p>;

    return <CoursesSection courses={courses} />;
}
