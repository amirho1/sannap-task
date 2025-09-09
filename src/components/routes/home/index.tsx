import { Button } from "@/components/ui/button";
import { translate } from "@/lib/utils";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="h-[calc(100vh-72px)] bg-primary flex flex-col-reverse p-6 gap-6">
      <Link to={"/register"} className="w-full">
        <Button variant="white" className="w-full">
          {translate("register")}
        </Button>
      </Link>
      <p className="text-white text-center font-medium">
        {translate("welcomeToRegisterAgentClick")}
      </p>
    </div>
  );
}
