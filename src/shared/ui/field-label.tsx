import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function FieldLabel({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn("font-[650] text-nexo-plum-deep", className)}
      {...props}
    />
  );
}
