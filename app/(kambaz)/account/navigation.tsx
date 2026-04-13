"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const links = currentUser
    ? [{ label: "Profile", path: "/account/profile" }]
    : [
        { label: "Sign In", path: "/account/signin" },
        { label: "Sign Up", path: "/account/signup" },
      ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
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
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          href="/account/users"
          className={`list-group-item border-0 ${
            pathname.includes("/account/users") ? "active" : "text-danger"
          }`}
        >
          Users
        </Link>
      )}
    </div>
  );
}