"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Home", path: "/courses/1234/home" },
    { label: "Modules", path: "/courses/1234/modules" },
    { label: "Piazza", path: "/courses/1234/piazza" },
    { label: "Zoom", path: "/courses/1234/zoom" },
    { label: "Assignments", path: "/courses/1234/assignments" },
    { label: "Quizzes", path: "/courses/1234/quizzes" },
    { label: "Grades", path: "/courses/1234/grades" },
    { label: "People", path: "/courses/1234/people/table" },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`list-group-item border-0 ${
            pathname.includes(link.path) ? "active" : "text-danger"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}


