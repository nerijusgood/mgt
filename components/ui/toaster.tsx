"use client";

import { Toaster } from "sonner";

const toastStyle: React.CSSProperties = {
  fontFamily: '"Circular Std", "Avenir Next", system-ui, sans-serif',
  fontSize: "13px",
  fontWeight: "500",
  letterSpacing: "-0.01em",
  borderRadius: "0",
  border: "1px solid #c6c5c3",
  boxShadow: "0 4px 16px rgba(56,56,56,0.08)",
  padding: "14px 18px",
  background: "#f5f4f2",
  color: "#383838",
  minWidth: "260px",
  maxWidth: "340px"
};

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      offset={20}
      gap={8}
      toastOptions={{
        style: toastStyle,
        classNames: {
          error: "toast-error",
          success: "toast-success"
        }
      }}
    />
  );
}
