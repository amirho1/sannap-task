import Logo from "./Logo";

import BackButton from "./BackButton";
import { useLocation } from "react-router";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <header className="h-[207px] bg-primary p-4 rounded-b-2xl relative ">
      <div className="">
        {isHome ? null : <BackButton />}

        <Logo className="absolute top-4 left-1/2 -translate-x-1/2 " />
      </div>
    </header>
  );
}
