"use client";

import { motion, useReducedMotion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

const componentThemeClassName =
  "[--ic-background:#ffffff] [--ic-foreground:#111111] [--ic-primary:#111111] [--ic-border:#e3e7ec] [--ic-card:#ffffff] [--ic-card-foreground:#111111] [--ic-ring:rgba(17,17,17,0.16)]";

const FILL_TRANSITION = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

function getCoverDiameter(width: number, height: number, x: number, y: number) {
  return Math.ceil(
    2 * Math.max(
      Math.hypot(x, y),
      Math.hypot(width - x, y),
      Math.hypot(x, height - y),
      Math.hypot(width - x, height - y)
    )
  );
}

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

function hasTextContent(node: React.ReactNode): boolean {
  if (typeof node === "string" || typeof node === "number") return String(node).trim().length > 0;
  if (Array.isArray(node)) return node.some(hasTextContent);
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return hasTextContent(node.props.children);
  return false;
}

function useOriginInteraction(disabled: boolean) {
  const nodeRef = React.useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
  const [coverSize, setCoverSize] = React.useState(0);
  const showFill = !disabled && (hovered || pressed);

  const updateOrigin = React.useCallback((x: number, y: number) => {
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setOrigin({ x, y });
    setCoverSize(getCoverDiameter(rect.width, rect.height, x, y));
  }, []);

  const updateFromPointer = React.useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    updateOrigin(event.clientX - rect.left, event.clientY - rect.top);
  }, [updateOrigin]);

  const updateFromCenter = React.useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    updateOrigin(rect.width / 2, rect.height / 2);
  }, [updateOrigin]);

  React.useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node || !showFill) return undefined;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      setCoverSize(getCoverDiameter(rect.width, rect.height, origin.x, origin.y));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [origin.x, origin.y, showFill]);

  return {
    nodeRef,
    origin,
    coverSize,
    showFill,
    updateFromPointer,
    updateFromCenter,
    onPointerEnter: (event: React.PointerEvent<HTMLElement>) => {
      if (!disabled) {
        updateFromPointer(event);
        setHovered(true);
      }
    },
    onPointerLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
      if (!disabled && event.button === 0) {
        updateFromPointer(event);
        setPressed(true);
        setHovered(true);
      }
    },
    onPointerUp: () => setPressed(false),
    onPointerCancel: () => setPressed(false),
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      if (!disabled && event.currentTarget.matches(":focus-visible")) {
        updateFromCenter();
        setHovered(true);
      }
    },
    onBlur: () => {
      setPressed(false);
      setHovered(false);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      if (!disabled && !event.repeat && (event.key === "Enter" || event.key === " ")) {
        if (event.key === " ") event.preventDefault();
        updateFromCenter();
        setPressed(true);
        setHovered(true);
      }
    },
    onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") setPressed(false);
    },
  };
}

function OriginFill({ interaction }: { interaction: ReturnType<typeof useOriginInteraction> }) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
      initial={false}
      animate={{ scale: reduce ? 0 : interaction.showFill ? 1 : 0 }}
      style={{
        width: interaction.coverSize,
        height: interaction.coverSize,
        left: interaction.origin.x,
        top: interaction.origin.y,
        backgroundColor: "#111111",
      }}
      transition={reduce ? { duration: 0 } : FILL_TRANSITION}
    />
  );
}

type MotionEventKeys =
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop";

type OriginButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, MotionEventKeys> & {
  loading?: boolean;
};

const OriginButton = React.forwardRef<HTMLButtonElement, OriginButtonProps>(
  ({ children, className, disabled = false, loading = false, style, onPointerEnter, onPointerLeave, onPointerDown, onPointerUp, onPointerCancel, onFocus, onBlur, onKeyDown, onKeyUp, ...props }, ref) => {
    const isDisabled = Boolean(disabled || loading);
    const reduce = useReducedMotion();
    const interaction = useOriginInteraction(isDisabled);

    React.useEffect(() => {
      if (import.meta.env.PROD || hasTextContent(children) || props["aria-label"] || props["aria-labelledby"]) return;
      console.warn("OriginButton: provide visible label text or aria-label / aria-labelledby so the control has an accessible name.");
    }, [children, props, props["aria-label"], props["aria-labelledby"]]);

    return (
      <motion.button
        {...props}
        ref={(node) => {
          interaction.nodeRef.current = node;
          assignRef(ref, node);
        }}
        type={props.type ?? "button"}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn("origin-button", componentThemeClassName, className)}
        style={{
          ...style,
          backgroundColor: interaction.showFill ? "#111111" : "#ffffff",
          borderColor: interaction.showFill ? "transparent" : "#e3e7ec",
          color: interaction.showFill ? "#ffffff" : "#111111",
        }}
        whileTap={isDisabled || reduce ? undefined : { scale: 0.985 }}
        onPointerEnter={(event) => { onPointerEnter?.(event); interaction.onPointerEnter(event); }}
        onPointerLeave={(event) => { onPointerLeave?.(event); interaction.onPointerLeave(); }}
        onPointerDown={(event) => { onPointerDown?.(event); interaction.onPointerDown(event); }}
        onPointerUp={(event) => { onPointerUp?.(event); interaction.onPointerUp(); }}
        onPointerCancel={(event) => { onPointerCancel?.(event); interaction.onPointerCancel(); }}
        onFocus={(event) => { onFocus?.(event); interaction.onFocus(event); }}
        onBlur={(event) => { onBlur?.(event); interaction.onBlur(); }}
        onKeyDown={(event) => { onKeyDown?.(event); interaction.onKeyDown(event); }}
        onKeyUp={(event) => { onKeyUp?.(event); interaction.onKeyUp(event); }}
      >
        <OriginFill interaction={interaction} />
        <span className="origin-button__content">{children}</span>
      </motion.button>
    );
  }
);
OriginButton.displayName = "OriginButton";

type OriginLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, MotionEventKeys>;

const OriginLink = React.forwardRef<HTMLAnchorElement, OriginLinkProps>(
  ({ children, className, style, onPointerEnter, onPointerLeave, onPointerDown, onPointerUp, onPointerCancel, onFocus, onBlur, onKeyDown, onKeyUp, ...props }, ref) => {
    const interaction = useOriginInteraction(false);
    return (
      <motion.a
        {...props}
        ref={(node) => {
          interaction.nodeRef.current = node;
          assignRef(ref, node);
        }}
        className={cn("origin-button", componentThemeClassName, className)}
        style={{
          ...style,
          backgroundColor: interaction.showFill ? "#111111" : "#ffffff",
          borderColor: interaction.showFill ? "transparent" : "#e3e7ec",
          color: interaction.showFill ? "#ffffff" : "#111111",
        }}
        onPointerEnter={(event) => { onPointerEnter?.(event); interaction.onPointerEnter(event); }}
        onPointerLeave={(event) => { onPointerLeave?.(event); interaction.onPointerLeave(); }}
        onPointerDown={(event) => { onPointerDown?.(event); interaction.onPointerDown(event); }}
        onPointerUp={(event) => { onPointerUp?.(event); interaction.onPointerUp(); }}
        onPointerCancel={(event) => { onPointerCancel?.(event); interaction.onPointerCancel(); }}
        onFocus={(event) => { onFocus?.(event); interaction.onFocus(event); }}
        onBlur={(event) => { onBlur?.(event); interaction.onBlur(); }}
        onKeyDown={(event) => { onKeyDown?.(event); interaction.onKeyDown(event); }}
        onKeyUp={(event) => { onKeyUp?.(event); interaction.onKeyUp(event); }}
      >
        <OriginFill interaction={interaction} />
        <span className="origin-button__content">{children}</span>
      </motion.a>
    );
  }
);
OriginLink.displayName = "OriginLink";

export { OriginButton, OriginLink };
export type { OriginButtonProps, OriginLinkProps };
