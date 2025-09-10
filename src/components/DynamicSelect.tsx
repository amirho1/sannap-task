import { useEffect, useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { axiosInstance } from "@/api";
import type { AxiosResponse } from "axios";
import { translate } from "@/lib/utils";

interface DynamicSelectProps<T> {
  url: string;
  placeholder?: string;
  renderItem: (item: T) => React.ReactNode;
  apiSelectData?: (res: AxiosResponse<any, any>) => T[];
  onChange?: (value: string) => void;
  value: string;
  disabled?: boolean;
}

export default function DynamicSelect<T>({
  url,
  placeholder,
  renderItem,
  apiSelectData,
  onChange,
  disabled,
  value,
  ...props
}: DynamicSelectProps<T>) {
  const [isPending, startTransition] = useTransition();
  const [options, setOptions] = useState<T[]>([]);

  useEffect(() => {
    if (!disabled)
      startTransition(async () => {
        const res = await axiosInstance.get(url);
        setOptions(apiSelectData ? apiSelectData(res) : res.data);
      });
  }, [url, disabled]);

  return (
    <Select onValueChange={onChange} disabled={disabled} value={value} {...props}>
      <SelectTrigger className="!text-muted-foreground data-[placeholder]:[&*]:text-muted-foreground w-full">
        {!!value || <span className="text-muted-foreground">{placeholder}</span>}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {isPending ? (
          <SelectItem value="loading" disabled>
            {translate("loading")}...
          </SelectItem>
        ) : (
          options.map(renderItem)
        )}
      </SelectContent>
    </Select>
  );
}
