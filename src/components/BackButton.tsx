import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import type { HTMLAttributes } from "react";

export default function BackButton(props: HTMLAttributes<HTMLButtonElement>) {
  function handleOnBackClick() {
    history.back();
  }

  return (
    <Button variant="link" onClick={handleOnBackClick} {...props}>
      <ChevronRight size={24} color="white" />
    </Button>
  );
}
