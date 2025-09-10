import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const DangerIcon = ({ type }: { type?: "error" | "warning" } = { type: "error" }) => (
  <div
    className={cn(
      "w-7 h-7 rounded-md flex justify-center items-center",
      type === "error" ? "bg-secondary-error" : "bg-warn"
    )}
  >
    <img src="/public/triangleError.svg" width={12} height={12} loading="lazy" />
  </div>
);

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group "
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      icons={{
        error: <DangerIcon />,
        warning: <DangerIcon type="warning" />,
      }}
      toastOptions={{
        classNames: {
          error:
            "!bg-secondary-error-light !border-2 !border-secondary-error !flex !gap-4 !w-[327px] !left-1/2 !-translate-x-1/2",
          warning:
            "!bg-secondary-warn-light !border-2 !border-warn !flex !gap-4 !w-[327px] !left-1/2 !-translate-x-1/2",
        },
      }}
      position="top-center"
      {...props}
    />
  );
};

export { Toaster };
