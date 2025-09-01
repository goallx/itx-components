"use client";

import React from "react";
import CourseCard from "./CourseCard";


export interface ICourse {
    name: string,
    description: string,
    image: string,
    id: number,
    created_at: string,
    redirect_url: string
}

interface CoursesSectionProps {
    courses: ICourse[]
}


const CoursesSection: React.FC<CoursesSectionProps> = ({ courses }) => {
    return (
        <section className="bg-gray-50 py-16 px-4 md:px-16">
            {
                courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        name={course.name}
                        description={course.description}
                        redirect_url={course.redirect_url}
                        image={course.image}
                        id={0}
                        created_at={""} />
                ))
            }
        </section>
    );
};

export default CoursesSection;
