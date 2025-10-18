import { cn } from "../../../lib/utils";
import React from "react";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-2 text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";