import Link from "next/link";
export default function labs() {
 return (
   <div id="wd-labs">
     <h1>Labs</h1>
     <h2>Sanah Menon</h2>
     <h3>Section 02: Jose Annunziato</h3>
     <a href="https://github.com/sanahmenon1/kambaz-next-js" id="wd-github">GitHub</a>
     <br />
     <ul>
       <li>
         <Link href="/labs/lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/labs/lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/labs/lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
       <li>
       <Link href="/" id="wd-kambaz-link">Kambaz</Link>
       </li>
     </ul>
   </div>
);}