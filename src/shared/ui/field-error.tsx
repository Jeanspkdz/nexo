import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function FieldError({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-error"
      role="alert"
      className={cn(
        "m-0 rounded-nexo-control bg-[#f9e7e5] p-3 text-[0.85rem] text-[#9b423b]",
        className,
      )}
      {...props}
    />
  );
}
