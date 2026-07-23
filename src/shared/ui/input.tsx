import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "min-h-12 w-full rounded-nexo-control border border-nexo-line bg-white px-[0.8rem] py-[0.7rem] text-nexo-plum-deep outline-none transition-colors",
        "focus-visible:border-nexo-plum focus-visible:ring-3 focus-visible:ring-nexo-coral focus-visible:ring-offset-3",
        "aria-invalid:border-[#9b423b] aria-invalid:ring-[#9b423b]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
