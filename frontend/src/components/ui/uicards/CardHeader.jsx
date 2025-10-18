import { cn } from "../../../lib/utils";
import React from "react";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6 pb-2", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";