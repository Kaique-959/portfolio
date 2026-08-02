"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { FlowButton, type FlowButtonProps } from "@/components/ui/flow-button"

const gradientButtonVariants = cva(
  [
    "gradient-button",
    "relative inline-flex min-h-11 min-w-[132px] items-center justify-center gap-2",
    "overflow-hidden rounded-full px-7 py-3.5",
    "text-base font-medium leading-[19px] text-black",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "",
        variant: "gradient-button-variant",
      },
      size: {
        default: "",
        compact: "min-w-0 px-5 py-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface GradientButtonProps
  extends FlowButtonProps,
    VariantProps<typeof gradientButtonVariants> {
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      type,
      ...props
    },
    ref
  ) => {
    return (
      <FlowButton
        className={cn(
          gradientButtonVariants({ variant, size, className })
        )}
        ref={ref}
        asChild={asChild}
        type={type}
        {...props}
      />
    )
  }
)

GradientButton.displayName = "GradientButton"

export { GradientButton, gradientButtonVariants }
