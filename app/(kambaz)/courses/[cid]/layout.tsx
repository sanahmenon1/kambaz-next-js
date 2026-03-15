"use client";
import { ReactNode, useEffect } from "react";
import CourseNavigation from "./navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa6";
export default function CoursesLayout({ children }: { children: ReactNode }) {
 const { cid } = useParams();
 const router = useRouter();
 const { courses } = useSelector((state: RootState) => state.coursesReducer);
 const { currentUser } = useSelector((state: RootState) => state.accountReducer);
 const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
 const course = courses.find((course: any) => course._id === cid);

 const enrolled = currentUser && enrollments.some(
   (e) => e.user === currentUser._id && e.course === cid
 );

 useEffect(() => {
   if (currentUser && !enrolled) {
     router.push("/dashboard");
   }
 }, [currentUser, enrolled, router]);

 if (currentUser && !enrolled) {
   return null;
 }

 return (
   <div id="wd-courses">
     <h2>
       <FaAlignJustify className="me-4 fs-4 mb-1" />
       {course?.name}
     </h2>
     <hr />
     <div className="d-flex">
       <div>
         <CourseNavigation />
       </div>
       <div className="flex-fill ps-3 overflow-hidden">{children}</div>
     </div>
   </div>
 );
}
