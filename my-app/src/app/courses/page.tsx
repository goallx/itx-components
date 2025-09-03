import { createClient } from "@/utils/supabase/server";
import CoursesSection, { ICourse } from "./components/Courses";

export default async function CoursesPage() {
    const supabase = await createClient();

    // Get logged-in user
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    console.log('@@user', user)
    if (userErr || !user) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-lg text-gray-700">Please log in to view courses.</p>
            </div>
        );
    }

    // Fetch courses
    const { data: coursesData, error: coursesErr } = await supabase
        .from("courses")
        .select("*");
    if (coursesErr || !coursesData) return <div>Error loading courses.</div>;
    console.log('@@data courses', coursesData)
    // Fetch user subscriptions
    const { data: subscriptions } = await supabase
        .from("user_courses")
        .select("course_id")
        .eq("user_id", user?.id);

    const subscribedCourseIds = subscriptions?.map(s => s.course_id) || [];

    // Map courses with subscription info
    const courses: (ICourse & { isSubscribed: boolean })[] = coursesData.map(
        course => ({
            ...course,
            isSubscribed: subscribedCourseIds.includes(course.id),
        })
    );

    return <CoursesSection courses={courses} />;
}
