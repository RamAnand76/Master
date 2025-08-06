
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
          "flex items-center w-full rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          "[&_>_:first-child]:pl-3 [&_>_:last-child]:pr-3",
          "[&_input]:border-none [&_input]:w-full [&_input]:h-auto [&_input]:p-0 [&_input]:bg-transparent [&_input]:focus-visible:ring-0 [&_input]:focus-visible:ring-offset-0",
          className
        )}
        {...props}
      >
        {startContent && (
          <div className="flex items-center pr-2 [&>svg]:w-4 [&>svg]:h-4">
            {startContent}
          </div>
        )}
        {children}
        {endContent && (
          <div className="flex items-center pl-2 [&>svg]:w-4 [&>svg]:h-4">
            {endContent}
          </div>
        )}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
