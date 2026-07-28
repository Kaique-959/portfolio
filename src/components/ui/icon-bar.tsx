"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import * as React from "react"

import { cn } from "@/lib/utils"

const EXPAND_DURATION = 0.35
const COLLAPSE_DURATION = 0.25

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

  const contextValue = React.useMemo(() => ({ selectedValue, setSelectedValue }), [selectedValue, setSelectedValue])

  return (
    <IconBarContext.Provider value={contextValue}>
      <div aria-orientation="horizontal" className={cn("flex flex-wrap items-center gap-2", className)} role="toolbar">
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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const IconBarItem = React.forwardRef<HTMLButtonElement, IconBarItemProps>(
  ({ className, disabled = false, icon: Icon, label, onClick, value }, ref) => {
    const { selectedValue, setSelectedValue } = useIconBarContext("IconBarItem")
    const itemValue = value ?? label
    const isSelected = !disabled && selectedValue === itemValue

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-pressed={isSelected}
        onClick={() => {
          if (disabled) return
          setSelectedValue(itemValue)
          onClick?.()
        }}
        className={cn(
          "relative inline-flex h-9 items-center gap-0 rounded-xl border transition-all duration-200",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          isSelected
            ? "bg-[#C24E2E] border-[#C24E2E] text-white px-4 gap-2"
            : "bg-[#FAFAF8] border-[#E5E5E2] text-[#71717A] px-3 gap-2 hover:bg-[#F2F2F0] hover:text-[#141414]",
          className
        )}
      >
        <Icon aria-hidden className="size-[18px] stroke-[1.5]" />
        <motion.span
          initial={false}
          animate={{
            width: isSelected ? 'auto' : 0,
            opacity: isSelected ? 1 : 0,
          }}
          transition={{
            duration: isSelected ? 0.35 : 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="overflow-hidden whitespace-nowrap font-medium text-[14px] tracking-[-0.01em]"
          style={{ paddingLeft: isSelected ? '6px' : '0' }}
        >
          {label}
        </motion.span>
      </button>
    )
  }
)
IconBarItem.displayName = "IconBarItem"

export { IconBar, IconBarItem }
