export default function CourseCardSkeleton() {
    return (
        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl p-6 shadow-lg mb-8 md:mb-12 relative overflow-hidden animate-pulse">
            <div className="flex-1 md:pr-8 text-center md:text-left">
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                <div className="h-10 bg-gray-300 rounded-full w-32 mx-auto md:mx-0"></div>
            </div>

            <div className="mt-6 md:mt-0 flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full"></div>
        </div>
    );
}
