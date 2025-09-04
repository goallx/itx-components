"use client";

import React, { useEffect, useState } from "react";
import CoursesSection, { ICourse } from "./components/Courses";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import CourseCardSkeleton from "./loading";

export default function CoursesPage() {

    const searchParams = useSearchParams();
    const userId = searchParams.get("user");
    const [loading, setLoading] = useState<boolean>(false)
    const [courses, setCourses] = useState<(ICourse & { isSubscribed: boolean })[]>([]);

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

        const { data: subscriptions } = await supabase
            .from("user_courses")
            .select("course_id")
            .eq("user_id", userId);

        const subscribedCourseIds = subscriptions?.map(s => s.course_id) || [];

        const mapped = coursesData.map(course => ({
            ...course,
            isSubscribed: subscribedCourseIds.includes(course.id),
        }));

        setCourses(mapped);
        setLoading(false);
    };

    if (loading) return <CourseCardSkeleton />

    return <CoursesSection courses={courses} />;

}
