import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const dangerIcon = (
  <div className="w-7 h-7 rounded-md bg-secondary-error flex justify-center items-center">
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
        error: dangerIcon,
      }}
      toastOptions={{
        classNames: {
          error:
            "!bg-secondary-error-light !border-2 !border-secondary-error !flex !gap-3 !w-[327px] !left-1/2 !-translate-x-1/2 ",
        },
      }}
      position="top-center"
      {...props}
    />
  );
};

export { Toaster };
