import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function Field({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field"
      className={cn("grid gap-[0.4rem] text-[0.85rem]", className)}
      {...props}
    />
  );
}
