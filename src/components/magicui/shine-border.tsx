
"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  className?: string;
  children: React.ReactNode;
}

/**
 * @name ShineBorder
 * @description It is an animated background border effect component.
 * @param borderRadius defines the radius of the border.
 * @param borderWidth defines the width of the border.
 * @param duration defines the duration of the animation.
 * @param color defines the color of the border.
 * @param className defines the class name of the component.
 * @param children defines the children of the component.
 */
export const ShineBorder = ({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "hsl(var(--primary))",
  className,
  children,
  ...props
}: ShineBorderProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative w-full rounded-[--border-radius] border border-transparent p-px",
        "bg-gradient-to-r from-border to-border", // Fallback border
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "animate-shine-border",
          "absolute inset-0 h-full w-full rounded-[--border-radius]"
        )}
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--border-color": `${
              Array.isArray(color) ? color.join(",") : color
            }`,
            "--duration": `${duration}s`,
            border: "var(--border-width) solid transparent",
            background: `linear-gradient(110deg, transparent, ${
              Array.isArray(color) ? color.join(",") : color
            }, transparent) border-box`,
            WebkitMask:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            backgroundSize: "200% 100%",
          } as React.CSSProperties
        }
      ></div>
      <div className="relative h-full w-full rounded-[calc(var(--border-radius)-1px)] bg-background">
        {children}
      </div>
    </div>
  );
};
