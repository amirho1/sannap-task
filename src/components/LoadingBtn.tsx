import { LoaderCircle } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";

interface LoadingBtnParams extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function LoadingBtn({ loading = false, children, ...params }: LoadingBtnParams) {
  return (
    <Button type="submit" disabled={loading} {...params}>
      {children}
      {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
