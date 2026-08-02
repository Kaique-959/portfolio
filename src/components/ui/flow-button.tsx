"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  showArrows?: boolean
}

const FlowButton = React.forwardRef<HTMLButtonElement, FlowButtonProps>(
  ({ asChild = false, showArrows = true, className, children, type, ...props }, ref) => {
    const child = asChild && React.isValidElement(children)
      ? (children as React.ReactElement<{ className?: string }>)
      : null
    const label = child ? child.props.children : children
    const content = (
      <>
        {showArrows && (
          <ArrowRight className="flow-button__arrow flow-button__arrow--left" aria-hidden="true" />
        )}
        <span className="flow-button__text">{label}</span>
        <span className="flow-button__circle" aria-hidden="true" />
        {showArrows && (
          <ArrowRight className="flow-button__arrow flow-button__arrow--right" aria-hidden="true" />
        )}
      </>
    )

    if (child) {
      return React.cloneElement(child, {
        className: cn("flow-button", className, child.props.className),
        ref,
        children: content,
      })
    }

    return (
      <button
        {...props}
        ref={ref}
        type={type ?? "button"}
        className={cn("flow-button", className)}
      >
        {content}
      </button>
    )
  },
)

FlowButton.displayName = "FlowButton"

export { FlowButton }
