"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

import "./origin-button.css";

const componentThemeClassName =
  "[--ic-background:#ffffff] [--ic-foreground:#111111] [--ic-primary:#111111] [--ic-fill-foreground:#ffffff] [--ic-border:#e3e7ec]";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const HOVER_IN = 0.45;
const HOVER_OUT = 0.32;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

function getLocalPoint(node: HTMLElement, clientX: number, clientY: number) {
  const rect = node.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function useOriginReveal(disabled: boolean) {
  const nodeRef = React.useRef<HTMLElement | null>(null);
  const filledRef = React.useRef(false);

  const originX = useMotionValue(0);
  const originY = useMotionValue(0);
  const radius = useMotionValue(0);
  const clipPath = useMotionTemplate`circle(${radius}px at ${originX}px ${originY}px)`;

  const getMaxRadius = React.useCallback(() => {
    const node = nodeRef.current;
    if (!node) return 0;
    const rect = node.getBoundingClientRect();
    const x = Math.min(Math.max(originX.get(), 0), rect.width);
    const y = Math.min(Math.max(originY.get(), 0), rect.height);
    const dx = Math.max(x, rect.width - x);
    const dy = Math.max(y, rect.height - y);
    return Math.ceil(Math.hypot(dx, dy));
  }, [originX, originY]);

  const revealAt = React.useCallback((x: number, y: number) => {
    originX.set(x);
    originY.set(y);
    filledRef.current = true;
    animate(radius, getMaxRadius(), {
      duration: prefersReducedMotion() ? 0 : HOVER_IN,
      ease: EASE,
    });
  }, [originX, originY, radius, getMaxRadius]);

  const hideAt = React.useCallback((x: number, y: number) => {
    originX.set(x);
    originY.set(y);
    filledRef.current = false;
    animate(radius, 0, {
      duration: prefersReducedMotion() ? 0 : HOVER_OUT,
      ease: EASE,
    });
  }, [originX, originY, radius]);

  React.useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;
    const observer = new ResizeObserver(() => {
      if (filledRef.current) {
        animate(radius, getMaxRadius(), { duration: 0 });
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [radius, getMaxRadius]);

  const enterFromPointer = React.useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (disabled) return;
    const node = nodeRef.current;
    if (!node) return;
    const point = getLocalPoint(node, event.clientX, event.clientY);
    revealAt(point.x, point.y);
  }, [disabled, revealAt]);

  const leaveFromPointer = React.useCallback((event: React.PointerEvent<HTMLElement>) => {
    const node = nodeRef.current;
    if (!node) return;
    const point = getLocalPoint(node, event.clientX, event.clientY);
    hideAt(point.x, point.y);
  }, [hideAt]);

  const pressFromPointer = React.useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (disabled || event.button !== 0) return;
    const node = nodeRef.current;
    if (!node) return;
    const point = getLocalPoint(node, event.clientX, event.clientY);
    revealAt(point.x, point.y);
  }, [disabled, revealAt]);

  const enterFromCenter = React.useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    revealAt(rect.width / 2, rect.height / 2);
  }, [revealAt]);

  const hideFromCenter = React.useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    hideAt(rect.width / 2, rect.height / 2);
  }, [hideAt]);

  return {
    nodeRef,
    clipPath,
    enterFromPointer,
    leaveFromPointer,
    pressFromPointer,
    enterFromCenter,
    hideFromCenter,
  };
}

type OriginInteraction = ReturnType<typeof useOriginReveal>;

function OriginFill({
  interaction,
  children,
}: {
  interaction: OriginInteraction;
  children: React.ReactNode;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="origin-button__fill"
      style={{ clipPath: interaction.clipPath }}
    >
      <span className="origin-button__fill-content">{children}</span>
    </motion.span>
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
  | "onDragEnd"
  | "onDrop";

type OriginButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, MotionEventKeys> & {
  loading?: boolean;
};

const OriginButton = React.forwardRef<HTMLButtonElement, OriginButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      loading = false,
      style,
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const isDisabled = Boolean(disabled || loading);
    const reduce = useReducedMotion();
    const interaction = useOriginReveal(isDisabled);

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
        style={style}
        whileTap={isDisabled || reduce ? undefined : { scale: 0.985 }}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          interaction.enterFromPointer(event);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          interaction.leaveFromPointer(event);
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          interaction.pressFromPointer(event);
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (!isDisabled && event.currentTarget.matches(":focus-visible")) {
            interaction.enterFromCenter();
          }
        }}
        onBlur={(event) => {
          onBlur?.(event);
          interaction.hideFromCenter();
        }}
      >
        <span className="origin-button__inner">
          <OriginFill interaction={interaction}>{children}</OriginFill>
          <span className="origin-button__content">{children}</span>
        </span>
      </motion.button>
    );
  }
);
OriginButton.displayName = "OriginButton";

type OriginLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, MotionEventKeys>;

const OriginLink = React.forwardRef<HTMLAnchorElement, OriginLinkProps>(
  (
    {
      children,
      className,
      style,
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const reduce = useReducedMotion();
    const interaction = useOriginReveal(false);

    return (
      <motion.a
        {...props}
        ref={(node) => {
          interaction.nodeRef.current = node;
          assignRef(ref, node);
        }}
        className={cn("origin-button", componentThemeClassName, className)}
        style={style}
        whileTap={reduce ? undefined : { scale: 0.985 }}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          interaction.enterFromPointer(event);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          interaction.leaveFromPointer(event);
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          interaction.pressFromPointer(event);
        }}
        onPointerUp={(event) => {
          onPointerUp?.(event);
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (event.currentTarget.matches(":focus-visible")) {
            interaction.enterFromCenter();
          }
        }}
        onBlur={(event) => {
          onBlur?.(event);
          interaction.hideFromCenter();
        }}
      >
        <span className="origin-button__inner">
          <OriginFill interaction={interaction}>{children}</OriginFill>
          <span className="origin-button__content">{children}</span>
        </span>
      </motion.a>
    );
  }
);
OriginLink.displayName = "OriginLink";

export { OriginButton, OriginLink };
export type { OriginButtonProps, OriginLinkProps };
