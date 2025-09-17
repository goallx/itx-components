"use client";

import React from "react";
import CourseCard from "./CourseCard";
import { ICourse } from "@/utils/types";


interface CoursesSectionProps {
    courses: ICourse[];
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ courses }) => {
    return (
        <section className="py-16 px-4 md:px-16 w-full">
            {courses.map(course => (
                <CourseCard key={course.id} {...course} />
            ))}
        </section>
    );
};

export default CoursesSection;
