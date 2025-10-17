import React from "react";
import { cn } from "../../lib/utils";

export function Button({ className, variant = "default", size = "md", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-white text-gray-800 shadow-sm hover:shadow-md",
    outline: "border border-gray-300 hover:bg-gray-50",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    hero: "bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:opacity-90 shadow-lg",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
