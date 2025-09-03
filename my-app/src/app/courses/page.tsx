"use client";

import React, { useEffect, useState } from "react";
import CoursesSection, { ICourse } from "./components/Courses";
import { createClient } from "@/utils/supabase/client";

export default function CoursesPage() {
    const [user, setUser] = useState<any>(null);
    const [courses, setCourses] = useState<(ICourse & { isSubscribed: boolean })[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Only accept messages from Framer parent
            const allowedOrigins = ["https://framer.com"];
            if (!allowedOrigins.includes(event.origin)) return;

            const { type, user: incomingUser } = event.data || {};
            if (type === "AUTH_STATE_CHANGE" && incomingUser) {
                setUser(incomingUser);
                fetchCourses(incomingUser.id);
            }
        };

        window.addEventListener("message", handleMessage);

        // Optional: fallback if iframe opened directly
        supabase.auth.getSession().then(({ data }) => {
            if (data?.session?.user) {
                setUser(data.session.user);
                fetchCourses(data.session.user.id);
            } else {
                setLoading(false);
            }
        });

        return () => window.removeEventListener("message", handleMessage);
    }, []);

    const fetchCourses = async (userId: string) => {
        // 1️⃣ Fetch all courses
        const { data: coursesData } = await supabase.from("courses").select("*");
        if (!coursesData) {
            setLoading(false);
            return;
        }

        // 2️⃣ Fetch user subscriptions
        const { data: subscriptions } = await supabase
            .from("user_courses")
            .select("course_id")
            .eq("user_id", userId);

        const subscribedCourseIds = subscriptions?.map(s => s.course_id) || [];

        // 3️⃣ Map courses with subscription info
        const mapped = coursesData.map(course => ({
            ...course,
            isSubscribed: subscribedCourseIds.includes(course.id),
        }));

        setCourses(mapped);
        setLoading(false);
    };

    if (loading) return <p className="text-center py-20">Loading courses...</p>;
    if (!user) return <p className="text-center py-20">Waiting for login...</p>;

    return <CoursesSection courses={courses} />;
}
