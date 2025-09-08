import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary",
        "selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0",
        "rounded-md border border-muted-foreground bg-transparent px-4 py-3 text-base shadow-xs transition-[color,box-shadow]",
        "outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "data-[error=true]:focus-visible:border-destructive",
        "focus-visible:border-primary-shade-02",
        "focus-visible:border-2",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "error:border-2 error:border-",
        "disabled:bg-black-d2-d1",
        className
      )}
      {...props}
    />
  );
}

export { Input };
