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

export function TabsTrigger({ value: tabValue, valueActive, setValue, children }) {
  const active = valueActive === tabValue;

  return (
    <button
      onClick={() => setValue(tabValue)}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium select-none border-b-2",
        "transition-all duration-150 ease-in-out transform cursor-pointer",
        active
          ? "border-primary text-primary bg-background shadow-sm scale-100"
          : "border-transparent text-gray-500 hover:text-primary hover:bg-background/60 hover:shadow-sm active:scale-95"
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
