
"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
  speed?: number;
}

const AnimatedGradientText = React.forwardRef<
  HTMLSpanElement,
  AnimatedGradientTextProps
>(
  (
    { children, className, colorFrom = "#4ade80", colorTo = "#06b6d4", speed = 4 },
    ref
  ) => {
    return (
      <span
        ref={ref}
        style={
          {
            "--gradient-from": colorFrom,
            "--gradient-to": colorTo,
            "--animation-speed": `${speed}s`,
          } as React.CSSProperties
        }
        className={cn(
          "bg-gradient-to-r from-[--gradient-from] to-[--gradient-to] bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent",
          className
        )}
      >
        {children}
      </span>
    );
  }
);
AnimatedGradientText.displayName = "AnimatedGradientText";

export { AnimatedGradientText };
