import { useRouter } from "next/navigation";
import { ICourse } from "./Courses";
import Image from "next/image";

export default function CourseCard({
    name,
    description,
    redirect_url,
    image,
}: ICourse) {
    const router = useRouter();

    return (
        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl p-6 shadow-lg mb-8 md:mb-12 relative overflow-hidden">
            {/* Text Content */}
            <div className="flex-1 md:pr-8 text-right">
                <h2 className="text-2xl font-bold mb-4">{name}</h2>
                <p className="text-gray-700 mb-6">{description}</p>
                <button
                    onClick={() => router.push(redirect_url)}
                    className="px-6 py-2 bg-blue-600 rounded-full text-white hover:opacity-90 transition"
                >
                    View Course
                </button>
            </div>

            <div className="mt-6 md:mt-0 flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative">
                {/* <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-100"> */}
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover rounded-full"
                    sizes="(max-width: 768px) 128px, 160px"
                />
                {/* </div> */}
            </div>
        </div>
    );
}