"use client"

import * as React from "react"
import { HTMLMotionProps, MotionConfig, motion } from "framer-motion"

interface TextStaggerHoverProps {
  text: string
  index: number
}

interface HoverSliderImageProps {
  index: number
  imageUrl?: string
}

interface HoverSliderProps {
  activeSlide?: number
  onSlideChange?: (index: number) => void
}

interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}

function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)
  return { words, characters }
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined)

function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error("useHoverSliderContext must be used within a HoverSliderProvider")
  }
  return context
}

export { useHoverSliderContext }

export const HoverSlider = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & HoverSliderProps>(
  ({ children, className, activeSlide: externalActive, onSlideChange, ...props }, ref) => {
    const [internalActive, setInternalActive] = React.useState<number>(0)
    const activeSlide = externalActive !== undefined ? externalActive : internalActive
    const changeSlide = React.useCallback(
      (index: number) => {
        if (onSlideChange) onSlideChange(index)
        else setInternalActive(index)
      },
      [onSlideChange]
    )
    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <div className={className}>{children}</div>
      </HoverSliderContext.Provider>
    )
  }
)
HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps>(
  ({ text, index, className, ...props }, ref) => {
    const { activeSlide, changeSlide } = useHoverSliderContext()
    const { characters } = splitText(text)
    const isActive = activeSlide === index
    const handleMouse = () => changeSlide(index)
    return (
      <span
        ref={ref}
        className={className}
        onMouseEnter={handleMouse}
        onClick={handleMouse}
        style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', cursor: 'pointer' }}
        {...props}
      >
        {characters.map((char, charIdx) => (
          <span key={`${char}-${charIdx}`} style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
            <MotionConfig transition={{ delay: charIdx * 0.025, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <motion.span
                style={{ display: 'inline-block', opacity: 0.2 }}
                initial={{ y: "0%" }}
                animate={isActive ? { y: "-110%" } : { y: "0%" }}
              >
                {char}
                {char === " " && charIdx < characters.length - 1 && <>&nbsp;</>}
              </motion.span>
              <motion.span
                style={{ position: 'absolute', left: 0, top: 0, display: 'inline-block' }}
                initial={{ y: "110%" }}
                animate={isActive ? { y: "0%" } : { y: "110%" }}
              >
                {char}
              </motion.span>
            </MotionConfig>
          </span>
        ))}
      </span>
    )
  }
)
TextStaggerHover.displayName = "TextStaggerHover"

export const HoverSliderImageWrap = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...(props.style || {}) }} {...props}>
        {React.Children.map(children, (child) => (
          <div style={{ position: 'absolute', inset: 0 }}>
            {child}
          </div>
        ))}
      </div>
    )
  }
)
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"
