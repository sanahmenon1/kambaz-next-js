"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const pathParts = pathname.split("/");
  const cid = pathParts[2];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/courses/${cid}/${link.toLowerCase()}`;
        return (
          <Link
            key={path}
            href={path}
            className={`list-group-item border-0 ${
              pathname.includes(path) ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
