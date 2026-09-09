import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiOutlineXMark } from "react-icons/hi2";

export type ModalWidth = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: ModalWidth;
  closeOnOverlay?: boolean;
  footer?: React.ReactNode;
}

const widths: Record<ModalWidth, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[90vw]",
};

export function Modal({
  open,
  title,
  children,
  onClose,
  width = "lg",
  closeOnOverlay = true,
  footer,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const handleOverlayClick = (event: MouseEvent) => {
      if (closeOnOverlay && event.target === overlayRef.current) onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    overlayRef.current?.addEventListener("click", handleOverlayClick);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      overlayRef.current?.removeEventListener("click", handleOverlayClick);
    };
  }, [open, closeOnOverlay, onClose]);

  if (!open) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
    >
      <div
        ref={overlayRef}
        onClick={closeOnOverlay ? onClose : undefined}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${widths[width]} overflow-hidden rounded-2xl border border-secondary bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="flex items-center justify-between border-b border-secondary px-6 py-4">
          <h2 id="modal-title" className="text-lg font-semibold text-secondaryText">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-secondaryText/60 transition hover:bg-secondary hover:text-secondaryText"
            aria-label="Fechar"
          >
            <HiOutlineXMark size={22} />
          </button>
        </header>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          {children}
        </div>

        {footer && (
          <footer className="border-t border-secondary px-6 py-4">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}