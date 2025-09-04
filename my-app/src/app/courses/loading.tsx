export default function CourseCardSkeleton() {
    return (
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-l from-blue-50 to-white rounded-3xl p-6 md:p-8 shadow-lg mb-8 md:mb-12 relative overflow-hidden border border-gray-200 animate-pulse">
            {/* Decorative elements skeleton */}
            <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gray-200 rounded-full opacity-50"></div>
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-gray-200 rounded-full opacity-30"></div>

            {/* Text Content skeleton */}
            <div className="flex-1 md:pr-8 text-right order-2 md:order-1">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 float-right"></div>
                <div className="clear-both"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 mb-6"></div>
                <div className="h-12 bg-gray-300 rounded-full w-40 float-right"></div>
            </div>

            {/* Image skeleton */}
            <div className="mt-6 md:mt-0 flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative order-1 md:order-2">
                <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );
}