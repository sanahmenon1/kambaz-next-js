import { ReactNode } from "react";
import KambazNavigation from "./navigation";
import "./styles.css";

export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
        </div>
        <div className="flex-fill wd-main-content-offset">
          {children}
        </div>
      </div>
    </div>

);}
