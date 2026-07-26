import React, { useEffect } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;

  width?: "sm" | "md" | "lg" | "xl" | "2xl";

  footer?: React.ReactNode;

  closeOnOverlay?: boolean;
}

const widths = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
  "2xl": "max-w-7xl",
};

export default function Modal({
  open,
  title,
  children,
  onClose,
  footer,
  width = "lg",
  closeOnOverlay = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-6"
    >
      <div
        onClick={() => {
          if (closeOnOverlay) {
            onClose();
          }
        }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${widths[width]} overflow-hidden rounded-2xl border border-secondary bg-card shadow-2xl`}
      >
        <header className="flex items-center justify-between border-b border-secondary px-6 py-5">
          <h2 className="text-xl font-bold text-secondaryText">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-secondaryText transition hover:bg-secondary"
          >
            <HiOutlineXMark size={22} />
          </button>
        </header>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          {children}
        </div>

        {footer && (
          <footer className="border-t border-secondary px-6 py-5">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
