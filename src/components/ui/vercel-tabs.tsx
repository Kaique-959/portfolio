"use client"

import * as React from "react"
import { useLayoutEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

type Box = { left: number; width: number }

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, activeTab, onTabChange, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [boxes, setBoxes] = useState<Box[]>([])
    const trackRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<(HTMLAnchorElement | null)[]>([])
    const tabKey = tabs.map((tab) => tab.id).join("|")

    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)

    // mede de novo quando a largura do trilho muda: a troca de fonte desalinhava o indicador
    useLayoutEffect(() => {
      const track = trackRef.current
      if (!track) return undefined

      const measure = () =>
        setBoxes(
          tabRefs.current.map((el) => ({ left: el?.offsetLeft ?? 0, width: el?.offsetWidth ?? 0 }))
        )

      measure()
      const observer = new ResizeObserver(measure)
      observer.observe(track)
      return () => observer.disconnect()
    }, [tabKey])

    const hoverBox = hoveredIndex !== null ? boxes[hoveredIndex] : undefined
    const activeBox = activeIndex >= 0 ? boxes[activeIndex] : undefined

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div ref={trackRef} className="relative">
          <div
            aria-hidden="true"
            className="absolute h-[30px] rounded-[6px] bg-[#0e0f1114] transition-all duration-300 ease-out"
            style={{ left: hoverBox?.left ?? 0, width: hoverBox?.width ?? 0, opacity: hoverBox ? 1 : 0 }}
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] transition-all duration-300 ease-out"
            style={{ left: activeBox?.left ?? 0, width: activeBox?.width ?? 0, opacity: activeBox ? 1 : 0 }}
          />

          <div className="relative flex items-center gap-[6px]">
            {tabs.map((tab, index) => (
              <a
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                href={`#${tab.id}`}
                aria-current={index === activeIndex ? "location" : undefined}
                className="h-[30px] cursor-pointer transition-colors duration-300"
                // inline porque o reset global (* { padding: 0 } e a { color: inherit }) fica fora de camada e vence as utilidades do Tailwind
                style={{ padding: "8px 12px", color: index === activeIndex ? "#0e0e10" : "#0e0f1199" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                onClick={(event) => {
                  event.preventDefault()
                  onTabChange?.(tab.id)
                }}
              >
                <span className="flex h-full items-center justify-center whitespace-nowrap text-sm font-medium leading-5">
                  {tab.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
Tabs.displayName = "Tabs"

export { Tabs }
