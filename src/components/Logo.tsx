import type { HTMLAttributes } from "react";

export default function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <img src="/public/logo.svg" alt="Logo" loading="lazy" width="47px" height="67px" />
    </div>
  );
}
