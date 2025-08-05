
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
  color = "#fff",
  className,
  children,
}: ShineBorderProps) => {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative w-full rounded-[--border-radius] p-px",
        "bg-white/10",
        className,
      )}
    >
      <div
        className="animate-shine-border"
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--border-color": `${
              Array.isArray(color) ? color.join(",") : color
            }`,
            "--duration": `${duration}s`,
          } as React.CSSProperties
        }
      ></div>
      <div className="h-full w-full rounded-[--border-radius] bg-background">
        {children}
      </div>
    </div>
  );
};
