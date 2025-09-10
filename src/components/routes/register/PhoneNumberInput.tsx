import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, type ChangeEvent, type ComponentProps } from "react";

interface PhoneNumberInputProps extends ComponentProps<"input"> {
  prefix?: string;
  maxLength: number;
}

export default function PhoneNumberInput(
  { onChange, prefix, maxLength, ...props }: PhoneNumberInputProps = {
    maxLength: 11,
    prefix: "+98",
  }
) {
  const [value, setValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const numberReg = /^[0-9\b]+$/;
    if (
      (numberReg.test(e.target.value) && e.target.value.length <= maxLength) ||
      e.target.value === ""
    ) {
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
        {prefix}
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
