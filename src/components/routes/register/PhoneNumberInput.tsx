import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, type ChangeEvent } from "react";

export default function PhoneNumberInput({ onChange, ...props }: React.ComponentProps<"input">) {
  const [value, setValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const numberReg = /^[0-9\b]+$/;
    if ((numberReg.test(e.target.value) && e.target.value.length <= 11) || e.target.value === "") {
      onChange?.(e);
      setValue(e.target.value);
    }
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute left-0 top-2 flex justify-center items-center h-[31px] w-12 text-muted-foreground text-sm",
          "border-r-1"
        )}
      >
        98+
      </div>

      <Input
        dir="ltr"
        className="pl-16"
        value={value}
        placeholder="XXX - XXX - XXXX"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
