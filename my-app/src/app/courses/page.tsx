import { createClient } from "@/utils/supabase/server";
import CourseCardSkeleton from "./loading";
import CoursesSection, { ICourse } from "./components/Courses";

export default async function CoursesPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("courses").select("*");
    console.log('@@data', data)
    console.log('@@auth', supabase.auth.getUser())
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
        <section className="bg-gray-50 py-16 px-4 md:px-16 w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center md:text-left text-gray-800">
                Available Courses
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <CoursesSection courses={data as ICourse[]} />
            </div>
        </section>
    );
}
