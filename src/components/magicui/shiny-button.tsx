
import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

export interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius,
      background = "radial-gradient(ellipse 80% 50% at 50% 120%, hsl(var(--primary)), hsl(var(--primary) / 0.8))",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
            "--shimmer-duration": shimmerDuration,
            "--border-radius": borderRadius,
            background: background,
          } as CSSProperties
        }
        className={cn(
          "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-2 text-base font-medium text-white/80 transition-all duration-300 ease-in-out",
          "hover:text-white",
          "disabled:cursor-not-allowed",
          "dark:from-black/60 dark:to-black/60",
          className,
        )}
        style={{
            ...props.style,
            borderRadius: borderRadius,
        }}
        ref={ref}
        {...props}
      >
        <div className="relative z-10 flex items-center">{children}</div>
        <div
          className={cn(
            "absolute inset-0 z-0 flex items-center justify-center",
            "group-hover:animate-shimmer",
          )}
          style={
            {
              "--shimmer-color": shimmerColor,
              "--shimmer-size": shimmerSize,
              "--shimmer-duration": shimmerDuration,
              "--border-radius": borderRadius,
              backgroundSize: "200% 200%",
              backgroundImage: `radial-gradient(
              farthest-side,
              var(--shimmer-color),
              transparent
            )`,
            } as CSSProperties
          }
        />
      </button>
    );
  },
);

ShinyButton.displayName = "ShinyButton";

export { ShinyButton };
