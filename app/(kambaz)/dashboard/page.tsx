import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/courses/4550" className="wd-dashboard-course-link">
                <Image
                src="/images/webdev.png"
                width={200}
                height={150}
                alt="web development"
                />
                <div>
                <h5>CS4550 Web Development</h5>
                <p className="wd-dashboard-course-title">
                    Building modern full-stack web apps
                </p>
                <button>Go</button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course"> 
            <Link href="/courses/2500" className="wd-dashboard-course-link">
                <Image
                src="/images/fundies.png"
                width={200}
                height={150}
                alt="fundies"
                />
                <div>
                <h5>CS2500 Fundamentals of CS</h5>
                <p className="wd-dashboard-course-title">
                    Program design and problem solving
                </p>
                <button>Go</button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1342" className="wd-dashboard-course-link">
            <Image
              src="/images/calculus.png"
              width={200}
              height={150}
              alt="calculus"
            />
            <div>
              <h5>MATH1342 Calculus II</h5>
              <p className="wd-dashboard-course-title">
                Integration techniques and applications
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2510" className="wd-dashboard-course-link">
            <Image
              src="/images/ood.png"
              width={200}
              height={150}
              alt="object oriented design"
            />
            <div>
              <h5>CS2510 Fundamentals of OOD</h5>
              <p className="wd-dashboard-course-title">
                Object-oriented design and abstraction
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3000" className="wd-dashboard-course-link">
            <Image
              src="/images/algorithms.png"
              width={200}
              height={150}
              alt="algorithms"
            />
            <div>
              <h5>CS3000 Algorithms</h5>
              <p className="wd-dashboard-course-title">
                Algorithm design and analysis
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3800" className="wd-dashboard-course-link">
            <Image
              src="/images/theory.png"
              width={200}
              height={150}
              alt="theory of computation"
            />
            <div>
              <h5>CS3800 Theory of Computation</h5>
              <p className="wd-dashboard-course-title">
                Automata, languages, and computability
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/2550" className="wd-dashboard-course-link">
                <Image
                src="/images/cybersecurity.png"
                width={200}
                height={150}
                alt="cybersecurity"
                />
                <div>
                <h5>CY2550 Foundations of Cybersecurity</h5>
                <p className="wd-dashboard-course-title">
                    Security principles, threats, and defenses
                </p>
                <button>Go</button>
                </div>
            </Link>
        </div>
      </div>
    </div>
);}
