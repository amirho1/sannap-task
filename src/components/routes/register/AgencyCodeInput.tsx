import { axiosInstance } from "@/api";
import { Input } from "@/components/ui/input";
import { apiRoutes, cn, debounce, translate } from "@/lib/utils";
import { useCallback, useMemo, useRef, type ChangeEvent } from "react";

export default function AgencyCodeInput({ onChange, ...props }: React.ComponentProps<"input">) {
  const controller = useRef<AbortController | undefined>(undefined);

  const checkAgencyValidation = useCallback((value: string) => {
    if (controller.current) controller.current.abort();

    controller.current = new AbortController();

    if (value)
      axiosInstance.post(
        apiRoutes.checkAgencyCode,
        { agent_code: value },
        { signal: controller.current.signal }
      );
  }, []);

  const debouncedAgencyValidation = useMemo(
    () => debounce(checkAgencyValidation),
    [checkAgencyValidation]
  );

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    debouncedAgencyValidation(e.target.value);
  }

  return (
    <Input
      placeholder={translate("enterAgentCode")}
      type="number"
      onChange={handleOnChange}
      className={cn("!text-xs")}
      {...props}
    />
  );
}
