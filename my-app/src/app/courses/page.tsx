import { createClient } from "@/utils/supabase/server";
import CourseCardSkeleton from "./loading";
import CoursesSection, { ICourse } from "./components/Courses";

export default async function CoursesPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("courses").select("*");
    

    if (!data) {
        return (
            <section className="bg-gray-50 py-16 px-4 md:px-16">
                <CourseCardSkeleton />
            </section>
        );
    }

    return <CoursesSection courses={data as ICourse[]} />;
}
