"use client"

import type { LucideIcon } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

type IconBarContextValue = {
  selectedValue: string | null
  setSelectedValue: (value: string) => void
}

const IconBarContext = React.createContext<IconBarContextValue | null>(null)

function useIconBarContext(componentName: string) {
  const context = React.useContext(IconBarContext)
  if (!context) throw new Error(`${componentName} must be used within IconBar.`)
  return context
}

type IconBarProps = {
  className?: string
  children?: React.ReactNode
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  value?: string | null
}

function IconBar({ className, children, defaultValue, onValueChange, value: valueProp }: IconBarProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | null>(defaultValue ?? null)
  const isControlled = valueProp !== undefined
  const selectedValue = isControlled ? (valueProp ?? null) : uncontrolledValue

  const setSelectedValue = React.useCallback(
    (nextValue: string) => {
      const resolved = selectedValue === nextValue ? null : nextValue
      if (!isControlled) setUncontrolledValue(resolved)
      onValueChange?.(resolved)
    },
    [isControlled, onValueChange, selectedValue]
  )

  return (
    <IconBarContext.Provider value={{ selectedValue, setSelectedValue }}>
      <div aria-orientation="horizontal" className={cn("flex items-center gap-1.5", className)} role="toolbar">
        {children}
      </div>
    </IconBarContext.Provider>
  )
}
IconBar.displayName = "IconBar"

type IconBarItemProps = {
  className?: string
  disabled?: boolean
  icon: LucideIcon
  label: string
  value?: string
  onClick?: () => void
}

const IconBarItem = React.forwardRef<HTMLButtonElement, IconBarItemProps>(
  ({ className, disabled = false, icon: Icon, label, onClick, value }, ref) => {
    const { selectedValue, setSelectedValue } = useIconBarContext("IconBarItem")
    const itemValue = value ?? label
    const isSelected = !disabled && selectedValue === itemValue
    const [hovered, setHovered] = React.useState(false)
    const expanded = isSelected || hovered

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-pressed={isSelected}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => { if (!disabled) { setSelectedValue(itemValue); onClick?.() } }}
        className={cn(
          "relative inline-flex h-9 items-center rounded-xl border transition-all duration-200",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          expanded
            ? "px-3 gap-2"
            : "w-9 justify-center",
          isSelected
            ? "bg-[#C24E2E] border-[#C24E2E] text-white"
            : "bg-[#FAFAF8] border-[#E5E5E2] text-[#71717A] hover:bg-[#F2F2F0] hover:text-[#141414]",
          className
        )}
      >
        <Icon aria-hidden className="size-[18px] stroke-[1.5] shrink-0" />
        {expanded && (
          <span className="whitespace-nowrap font-medium text-[14px] tracking-[-0.01em]">{label}</span>
        )}
      </button>
    )
  }
)
IconBarItem.displayName = "IconBarItem"

export { IconBar, IconBarItem }
