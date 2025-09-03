import { createClient } from "@/utils/supabase/server";
import CourseCardSkeleton from "./loading";
import CoursesSection, { ICourse } from "./components/Courses";
import { redirect } from "next/navigation";

export default async function CoursesPage() {
    const supabase = await createClient();
    const { data: { session }, error: userError } = await supabase.auth.getSession()

    // if (!session) {
    //     redirect('/sign-in')
    // }

    const { data, error } = await supabase.from("courses").select("*");

    if (error) {
        return (
            <section className="bg-gray-50 py-16 px-4 md:px-16 w-full min-h-[80vh] flex items-center justify-center">
                <p className="text-red-500 text-lg">Failed to load courses. Please try again later.</p>
            </section>
        );
    }

    if (!data || data.length === 0) {
        return (
            <section className="bg-gray-50 py-16 px-4 md:px-16 w-full">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 px-4 md:px-16 w-full h-auto">
            <CoursesSection courses={data as ICourse[]} />
        </section>
    );
}
