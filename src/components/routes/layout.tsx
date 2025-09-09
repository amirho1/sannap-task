import { Outlet } from "react-router";
import Header from "../Header";
import { Toaster } from "../ui/sonner";

export default function Layout() {
  return (
    <div className="container mx-auto max-w-[375px] min-h-screen relative">
      <Header />
      <main className="absolute top-18 w-full">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
