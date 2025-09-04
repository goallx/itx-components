"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ICourse } from "./Courses";

export default function CourseCard({
    name,
    description,
    redirect_url,
    image,
    isSubscribed = false,
}: ICourse) {
    const router = useRouter();

    return (
        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl p-6 md:p-8 shadow-lg mb-8 md:mb-12 border border-gray-100">
            {/* Text Content */}
            <div className="flex-1 md:pr-8 text-right order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{name}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
                <button
                    onClick={() => isSubscribed && router.push("https://itx-academy.com" + redirect_url)}
                    className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${isSubscribed
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                        : "bg-gray-300 text-gray-700 cursor-not-allowed"
                        }`}
                >
                    {isSubscribed ? "اكمل الكورس" : "اشترك الان"}
                </button>
            </div>

            {/* Image */}
            <div className="mt-6 md:mt-0 flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative order-1 md:order-2">
                <div className="absolute inset-0 bg-blue-100 rounded-3xl"></div>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover rounded-3xl z-10 p-2"
                    sizes="(max-width: 768px) 128px, 160px"
                />
            </div>
        </div>
    );
}