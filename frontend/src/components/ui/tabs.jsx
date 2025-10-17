import React, { useState } from "react";
import { cn } from "../../lib/utils.jsx";

export function Tabs({ defaultValue, children, className }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  );
}

export function TabsList({ children, className, value, setValue }) {
  return (
    <div className={cn("flex border-b", className)}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  );
}

export function TabsTrigger({ value: tabValue, value, setValue, children }) {
  const active = value === tabValue;
  return (
    <button
      onClick={() => setValue(tabValue)}
      className={cn(
        "flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-all",
        active
          ? "border-primary text-primary"
          : "border-transparent text-gray-500 hover:text-primary"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, value: tabValue, children, className }) {
  if (value !== tabValue) return null;
  return <div className={cn("mt-4", className)}>{children}</div>;
}
