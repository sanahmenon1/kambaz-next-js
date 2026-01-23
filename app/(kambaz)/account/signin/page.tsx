import Link from "next/link";
export default function Signin() {
 return (
    <div id="wd-signin-screen">
    <h1>Sanah Menon </h1>
      <h3>Sign in</h3>
      <input className="wd-username" placeholder="username" /> <br />
      <input className="wd-password" placeholder="password" type="password" /> <br />
      <Link id="wd-signin-btn" href="/dashboard"> Sign in </Link> <br />
      <Link id="wd-signup-link" href="signup"> Sign up </Link>

      <h6>Section 02: Jose Annunziato</h6>
    </div>
);}
