import { translate } from "@/lib/utils";
import { Link } from "react-router";
import { Button } from "../ui/button";

// FOF stands for "Four Oh Four" (404) - Page Not Found
export default function FOF() {
  return (
    <div className="h-[calc(100vh-97px)] flex items-center justify-center flex-col  p-2 ">
      <h3 className="text-3xl font-bold text-red-600">{translate("notFound")}</h3>

      <Link to={"/"} className="w-full max-w-xs mt-6">
        <Button variant="link" className="w-full">
          {translate("backToHome")}
        </Button>
      </Link>
    </div>
  );
}
