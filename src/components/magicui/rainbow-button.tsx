"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex h-11 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            "absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--accent))_50%,hsl(var(--primary))_100%)]"
          )}
        />
        <span
          className={cn(
            "inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-[5px] bg-background px-8 py-1 text-sm font-medium text-foreground backdrop-blur-3xl",
            variant === "outline" && "bg-transparent",
          )}
        >
          {props.children}
        </span>
      </button>
    );
  },
);
RainbowButton.displayName = "RainbowButton";

export { RainbowButton };
