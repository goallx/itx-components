"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import CoursesSection, { ICourse } from "./components/Courses";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
    const [user, setUser] = useState<any>(null);
    const [courses, setCourses] = useState<(ICourse & { isSubscribed: boolean })[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();

        async function fetchData() {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            console.log("@@user", user)
            if (!user) {
                router.replace("/sign-in");
                return;
            }

            setUser(user);

            const { data: coursesData } = await supabase.from("courses").select("*");
            if (!coursesData) {
                setLoading(false);
                return;
            }

            const { data: subscriptions } = await supabase
                .from("user_courses")
                .select("course_id")
                .eq("user_id", user.id);

            const subscribedCourseIds = subscriptions?.map(s => s.course_id) || [];

            const mapped = coursesData.map(course => ({
                ...course,
                isSubscribed: subscribedCourseIds.includes(course.id),
            }));

            setCourses(mapped);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) return <p className="text-center py-20">Loading courses...</p>;

    return <CoursesSection courses={courses} />;
}
