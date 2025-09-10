import type { ComponentProps } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchInput(props: ComponentProps<"input">) {
  return (
    <div className="relative">
      <Input className={cn("p-2 h-9 w-full")} {...props} />
      <SearchIcon className="absolute left-2 top-2" size={18} />
    </div>
  );
}
