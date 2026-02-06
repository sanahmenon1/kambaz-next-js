"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  
  return (
    <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 120 }}
      id="wd-kambaz-navigation">
      <ListGroupItem className="bg-black border-0 text-center" as="a"
        target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      <ListGroupItem className={`border-0 text-center ${pathname.includes("/account") ? "bg-white" : "bg-black"}`}>
        <Link href="/account" id="wd-account-link" className="text-decoration-none">
          <FaRegCircleUser className={`fs-1 ${pathname.includes("/account") ? "text-danger" : "text-white"}`} />
          <br />
          <span className={pathname.includes("/account") ? "text-danger" : "text-white"}>Account</span>
        </Link>
      </ListGroupItem>
      <ListGroupItem className={`border-0 text-center ${pathname.includes("/dashboard") ? "bg-white" : "bg-black"}`}>
        <Link href="/dashboard" id="wd-dashboard-link" className="text-decoration-none">
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          <span className={pathname.includes("/dashboard") ? "text-danger" : "text-white"}>Dashboard</span>
        </Link>
      </ListGroupItem>
      <ListGroupItem className={`border-0 text-center ${pathname.includes("/courses") ? "bg-white" : "bg-black"}`}>
        <Link href="/courses" id="wd-course-link" className="text-decoration-none">
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          <span className={pathname.includes("/courses") ? "text-danger" : "text-white"}>Courses</span>
        </Link>
      </ListGroupItem>
      <ListGroupItem className={`border-0 text-center ${pathname.includes("/calendar") ? "bg-white" : "bg-black"}`}>
        <Link href="/calendar" id="wd-calendar-link" className="text-decoration-none">
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          <span className={pathname.includes("/calendar") ? "text-danger" : "text-white"}>Calendar</span>
        </Link>
      </ListGroupItem>
      <ListGroupItem className={`border-0 text-center ${pathname.includes("/inbox") ? "bg-white" : "bg-black"}`}>
        <Link href="/inbox" id="wd-inbox-link" className="text-decoration-none">
          <FaInbox className="fs-1 text-danger" />
          <br />
          <span className={pathname.includes("/inbox") ? "text-danger" : "text-white"}>Inbox</span>
        </Link>
      </ListGroupItem>
      <ListGroupItem className={`border-0 text-center ${pathname.includes("/labs") ? "bg-white" : "bg-black"}`}>
        <Link href="/labs" id="wd-labs-link" className="text-decoration-none">
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          <span className={pathname.includes("/labs") ? "text-danger" : "text-white"}>Labs</span>
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}