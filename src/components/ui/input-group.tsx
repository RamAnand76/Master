
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, startContent, endContent, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center w-full",
          className
        )}
        {...props}
      >
        {startContent && (
          <div className="absolute left-3 flex items-center pointer-events-none [&>svg]:w-4 [&>svg]:h-4 text-muted-foreground">
            {startContent}
          </div>
        )}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childClassName = child.props.className || '';
            const newClassName = cn(
              childClassName,
              startContent ? "pl-9" : "pl-3",
              endContent ? "pr-9" : "pr-3"
            );
            return React.cloneElement(child, { className: newClassName } as React.HTMLAttributes<HTMLElement>);
          }
          return child;
        })}
        {endContent && (
          <div className="absolute right-3 flex items-center pointer-events-none [&>svg]:w-4 [&>svg]:h-4 text-muted-foreground">
            {endContent}
          </div>
        )}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
