"use client";

import { motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

import "./origin-button.css";

const componentThemeClassName =
  "[--ic-background:#ffffff] [--ic-foreground:#111111] [--ic-primary:#111111] [--ic-secondary:#646b75] [--ic-surface-border:#e9edf2] [--ic-border:#e3e7ec] [--ic-card:#ffffff] [--ic-card-foreground:#111111] [--ic-muted:#f5f7fa] [--ic-muted-foreground:#6d7480] [--ic-accent:#f3f5f8] [--color-accent:var(--ic-accent)] [--color-accent-foreground:var(--ic-accent-foreground)] [--ic-accent-foreground:#111111] [--ic-input:#e3e7ec] [--ic-ring:rgba(17,17,17,0.16)] [--ic-destructive:#dc2626] [--ic-paper:#fcfcfd] [--ic-popover-foreground:#111111] [--ic-brand:#0ea5e9] [--ic-brand-soft:#bae6fd] [--ic-shadow-soft:0_18px_38px_-24px_rgba(15,23,42,0.35)] [--ic-chart-1:oklch(0.52_0.19_254)] [--ic-chart-2:oklch(0.74_0.11_232)] [--ic-chart-3:oklch(0.42_0.16_262)] [--ic-chart-4:oklch(0.84_0.07_228)] [--ic-chart-5:oklch(0.62_0.14_240)] [--color-background:var(--ic-background)] [--color-foreground:var(--ic-foreground)] [--color-primary:var(--ic-primary)] [--color-secondary:var(--ic-secondary)] [--color-border:var(--ic-border)] [--color-card:var(--ic-card)] [--color-card-foreground:var(--ic-card-foreground)] [--color-muted:var(--ic-muted)] [--color-muted-foreground:var(--ic-muted-foreground)] [--color-accent:var(--ic-accent)] [--color-accent-foreground:var(--ic-accent-foreground)] [--color-input:var(--ic-input)] [--color-ring:var(--ic-ring)] [--color-destructive:var(--ic-destructive)] [--color-paper:var(--ic-paper)] [--color-popover-foreground:var(--ic-popover-foreground)] [--color-brand:var(--ic-brand)] [--color-brand-soft:var(--ic-brand-soft)] [--color-chart-1:var(--ic-chart-1)] [--color-chart-2:var(--ic-chart-2)] [--color-chart-3:var(--ic-chart-3)] [--color-chart-4:var(--ic-chart-4)] [--color-chart-5:var(--ic-chart-5)] dark:[--ic-background:#111111] dark:[--ic-foreground:#f6f3ec] dark:[--ic-primary:#f6f3ec] dark:[--ic-secondary:#cbc6bb] dark:[--ic-surface-border:#2a2a25] dark:[--ic-border:#2b2a25] dark:[--ic-card:#111111] dark:[--ic-card-foreground:#f6f3ec] dark:[--ic-muted:#171716] dark:[--ic-muted-foreground:#9a958a] dark:[--ic-accent:#1a1a18] dark:[--ic-accent-foreground:#f6f3ec] dark:[--ic-input:#2b2a25] dark:[--ic-ring:rgba(246,243,236,0.18)] dark:[--ic-destructive:#f87171] dark:[--ic-paper:#171716] dark:[--ic-popover-foreground:#f6f3ec] dark:[--ic-brand:#38bdf8] dark:[--ic-brand-soft:#0c4a6e] dark:[--ic-shadow-soft:0_20px_44px_-28px_rgba(0,0,0,0.6)] dark:[--ic-chart-1:oklch(0.68_0.17_250)] dark:[--ic-chart-2:oklch(0.82_0.09_225)] dark:[--ic-chart-3:oklch(0.58_0.15_260)] dark:[--ic-chart-4:oklch(0.75_0.12_235)] dark:[--ic-chart-5:oklch(0.88_0.06_220)]";

const FILL_DURATION = 0.5;
const FILL_EASE = [0.16, 1, 0.3, 1] as const;

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

type ButtonHTMLAttributesForMotion = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  MotionEventKeys
>;

type LinkHTMLAttributesForMotion = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  MotionEventKeys
>;

function getCoverDiameter(width: number, height: number, x: number, y: number) {
  return Math.ceil(
    2 *
      Math.max(
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
    return;
  }

  if (ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

function hasTextContent(node: React.ReactNode): boolean {
  if (typeof node === "string" || typeof node === "number") {
    return String(node).trim().length > 0;
  }

  if (Array.isArray(node)) {
    return node.some(hasTextContent);
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return hasTextContent(node.props.children);
  }

  return false;
}

function useOriginInteraction<T extends HTMLElement>(isDisabled: boolean) {
  const controlRef = React.useRef<T | null>(null);
  const [hovered, setHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
  const [coverSize, setCoverSize] = React.useState(0);
  const showFill = !isDisabled && (hovered || isPressed);

  const updateOrigin = React.useCallback((x: number, y: number) => {
    const node = controlRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    setOrigin({ x, y });
    setCoverSize(getCoverDiameter(rect.width, rect.height, x, y));
  }, []);

  const updateOriginFromPointer = React.useCallback(
    (event: React.PointerEvent<T>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      updateOrigin(event.clientX - rect.left, event.clientY - rect.top);
    },
    [updateOrigin]
  );

  const updateOriginFromCenter = React.useCallback(() => {
    const node = controlRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    updateOrigin(rect.width / 2, rect.height / 2);
  }, [updateOrigin]);

  React.useLayoutEffect(() => {
    const node = controlRef.current;
    if (!(node && showFill)) return undefined;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      setCoverSize(
        getCoverDiameter(rect.width, rect.height, origin.x, origin.y)
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);

    const fonts = document.fonts;
    if (fonts?.ready) {
      fonts.ready.then(measure).catch(() => undefined);
    }

    return () => observer.disconnect();
  }, [showFill, origin.x, origin.y]);

  return {
    controlRef,
    hovered,
    isPressed,
    origin,
    coverSize,
    showFill,
    setHovered,
    setIsPressed,
    updateOriginFromPointer,
    updateOriginFromCenter,
  };
}

function controlClassName(showFill: boolean, className?: string) {
  return cn(
    componentThemeClassName,
    "origin-button relative inline-flex h-12 cursor-pointer touch-manipulation select-none items-center justify-center overflow-hidden rounded-xl px-8 font-medium text-[15px] tracking-[-0.02em]",
    "border-[0.5px] border-border bg-card text-card-foreground",
    "dark:bg-muted dark:text-foreground",
    "transition-[color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    showFill && "!text-background dark:!text-neutral-950",
    className
  );
}

function OriginFill({
  showFill,
  coverSize,
  origin,
}: {
  showFill: boolean;
  coverSize: number;
  origin: { x: number; y: number };
}) {
  return (
    <motion.span
      animate={{ scale: showFill && coverSize > 0 ? 1 : 0 }}
      aria-hidden
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground dark:bg-neutral-50"
      initial={false}
      style={{
        height: coverSize,
        left: origin.x,
        top: origin.y,
        width: coverSize,
      }}
      transition={{ duration: FILL_DURATION, ease: FILL_EASE }}
    />
  );
}

type OriginButtonProps = ButtonHTMLAttributesForMotion & {
  children?: React.ReactNode;
  loading?: boolean;
};

const OriginButton = React.forwardRef<HTMLButtonElement, OriginButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      loading = false,
      type = "button",
      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      onPointerCancel,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerUp,
      ...props
    },
    ref
  ) => {
    const isDisabled = Boolean(disabled || loading);
    const interaction = useOriginInteraction<HTMLButtonElement>(isDisabled);
    const ariaLabel = props["aria-label"];
    const ariaLabelledBy = props["aria-labelledby"];

    React.useEffect(() => {
      if (process.env.NODE_ENV === "production") return;
      if (
        hasTextContent(children) ||
        ariaLabel?.trim() ||
        ariaLabelledBy?.trim()
      ) {
        return;
      }

      console.warn(
        "OriginButton: provide visible label text or aria-label / aria-labelledby so the control has an accessible name."
      );
    }, [ariaLabel, ariaLabelledBy, children]);

    const setMergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        interaction.controlRef.current = node;
        assignRef(ref, node);
      },
      [interaction.controlRef, ref]
    );

    return (
      <motion.button
        {...props}
        aria-busy={loading || undefined}
        className={controlClassName(interaction.showFill, className)}
        data-pressed={interaction.isPressed ? "true" : "false"}
        disabled={isDisabled}
        onBlur={(event) => {
          onBlur?.(event);
          interaction.setIsPressed(false);
          if (!event.defaultPrevented) interaction.setHovered(false);
        }}
        onClick={onClick}
        onFocus={(event) => {
          onFocus?.(event);
          if (isDisabled || event.defaultPrevented) return;
          if (event.currentTarget.matches(":focus-visible")) {
            interaction.updateOriginFromCenter();
            interaction.setHovered(true);
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            event.defaultPrevented ||
            isDisabled ||
            event.repeat ||
            (event.key !== " " && event.key !== "Enter")
          ) {
            return;
          }
          if (event.key === " ") event.preventDefault();
          interaction.updateOriginFromCenter();
          interaction.setIsPressed(true);
          interaction.setHovered(true);
        }}
        onKeyUp={(event) => {
          onKeyUp?.(event);
          if (event.key === " " || event.key === "Enter") {
            interaction.setIsPressed(false);
            if (!event.currentTarget.matches(":focus-visible")) {
              interaction.setHovered(false);
            }
          }
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          interaction.setIsPressed(false);
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (event.defaultPrevented || isDisabled || event.button !== 0) return;
          interaction.updateOriginFromPointer(event);
          interaction.setIsPressed(true);
          interaction.setHovered(true);
        }}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (isDisabled || event.defaultPrevented) return;
          interaction.updateOriginFromPointer(event);
          interaction.setHovered(true);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          interaction.setHovered(false);
          interaction.setIsPressed(false);
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          interaction.setIsPressed(false);
        }}
        ref={setMergedRef}
        type={type}
        whileTap={isDisabled ? undefined : { scale: 0.985 }}
      >
        <OriginFill
          coverSize={interaction.coverSize}
          origin={interaction.origin}
          showFill={interaction.showFill}
        />
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);
OriginButton.displayName = "OriginButton";

type OriginLinkProps = LinkHTMLAttributesForMotion;

const OriginLink = React.forwardRef<HTMLAnchorElement, OriginLinkProps>(
  (
    {
      children,
      className,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      onPointerCancel,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerUp,
      ...props
    },
    ref
  ) => {
    const interaction = useOriginInteraction<HTMLAnchorElement>(false);
    const setMergedRef = React.useCallback(
      (node: HTMLAnchorElement | null) => {
        interaction.controlRef.current = node;
        assignRef(ref, node);
      },
      [interaction.controlRef, ref]
    );

    return (
      <motion.a
        {...props}
        className={controlClassName(interaction.showFill, className)}
        data-pressed={interaction.isPressed ? "true" : "false"}
        onBlur={(event) => {
          onBlur?.(event);
          interaction.setIsPressed(false);
          if (!event.defaultPrevented) interaction.setHovered(false);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (event.defaultPrevented) return;
          if (event.currentTarget.matches(":focus-visible")) {
            interaction.updateOriginFromCenter();
            interaction.setHovered(true);
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || event.repeat || event.key !== "Enter") return;
          interaction.updateOriginFromCenter();
          interaction.setIsPressed(true);
          interaction.setHovered(true);
        }}
        onKeyUp={(event) => {
          onKeyUp?.(event);
          if (event.key === "Enter") interaction.setIsPressed(false);
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          interaction.setIsPressed(false);
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (event.defaultPrevented || event.button !== 0) return;
          interaction.updateOriginFromPointer(event);
          interaction.setIsPressed(true);
          interaction.setHovered(true);
        }}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (event.defaultPrevented) return;
          interaction.updateOriginFromPointer(event);
          interaction.setHovered(true);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          interaction.setHovered(false);
          interaction.setIsPressed(false);
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          interaction.setIsPressed(false);
        }}
        ref={setMergedRef}
        whileTap={{ scale: 0.985 }}
      >
        <OriginFill
          coverSize={interaction.coverSize}
          origin={interaction.origin}
          showFill={interaction.showFill}
        />
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.a>
    );
  }
);
OriginLink.displayName = "OriginLink";

export { OriginButton, OriginLink };
export type { OriginButtonProps, OriginLinkProps };
