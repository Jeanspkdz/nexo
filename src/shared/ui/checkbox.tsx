"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-[1.15rem] shrink-0 rounded-[3px] border border-nexo-line bg-white text-white outline-none",
        "focus-visible:border-nexo-plum focus-visible:ring-3 focus-visible:ring-nexo-coral focus-visible:ring-offset-3",
        "data-[state=checked]:border-nexo-plum data-[state=checked]:bg-nexo-plum disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-items-center text-[0.75rem] leading-none"
      >
        ✓
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
