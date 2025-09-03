"use client";

import React from "react";
import CourseCard from "./CourseCard";

export interface ICourse {
    id: number;
    name: string;
    description: string;
    image: string;
    redirect_url: string;
    isSubscribed?: boolean;
    created_at?: string;
}

interface CoursesSectionProps {
    courses: ICourse[];
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ courses }) => {
    return (
        <section className="bg-gray-50 py-16 px-4 md:px-16 w-full">
            {courses.map(course => (
                <CourseCard key={course.id} {...course} />
            ))}
        </section>
    );
};

export default CoursesSection;
