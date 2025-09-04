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
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-l from-blue-50 to-white rounded-3xl p-6 md:p-8 shadow-lg mb-8 md:mb-12 relative overflow-hidden border border-gray-200">
            {/* Decorative elements */}
            <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-200 rounded-full opacity-30"></div>

            {/* Text Content */}
            <div className="flex-1 md:pr-8 text-right order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{name}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
                <button
                    onClick={() => isSubscribed && router.push("https://itx-academy.com" + redirect_url)}
                    className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-md ${isSubscribed
                        ? "bg-gradient-to-l from-blue-600 to-blue-800 text-white hover:shadow-lg hover:scale-105"
                        : "bg-gradient-to-l from-gray-400 to-gray-600 text-white cursor-not-allowed"
                        }`}
                >
                    {isSubscribed ? "اكمل الكورس" : "اشترك الان"}
                </button>
            </div>

            {/* Image */}
            <div className="mt-6 md:mt-0 flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative order-1 md:order-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full shadow-md"></div>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover rounded-full z-10"
                    sizes="(max-width: 768px) 128px, 160px"
                />
            </div>
        </div>
    );
}