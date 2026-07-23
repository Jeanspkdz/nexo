import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center rounded-nexo-control px-[1.15rem] py-3 font-nexo-sans text-base leading-[1.15] font-[650] transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-nexo-coral disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-nexo-coral text-white hover:bg-nexo-coral-deep active:bg-nexo-coral-deep",
        secondary:
          "border border-nexo-plum bg-transparent text-nexo-plum hover:bg-nexo-plum hover:text-white",
        ghost: "bg-transparent text-nexo-plum hover:bg-nexo-surface",
      },
      size: {
        default: "min-h-12",
        compact: "min-h-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      data-slot="button"
      type={type}
      {...props}
    />
  );
}
