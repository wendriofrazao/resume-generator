import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border bg-white shadow ${className}`}>
      {children}
    </div>
  );
}
