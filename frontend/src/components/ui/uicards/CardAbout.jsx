import { cn } from "../../../lib/utils";
import React from "react";

// Card principal
export const CardAbout = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-border bg-white text-card-foreground shadow-sm hover:shadow-md transition-shadow",
      className
    )}
    {...props}
  />
));
CardAbout.displayName = "CardAbout";