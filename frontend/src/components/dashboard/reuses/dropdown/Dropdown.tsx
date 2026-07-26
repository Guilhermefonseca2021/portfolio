import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  label?: string;
  children: React.ReactNode;
}

export default function Dropdown({
  label = "Opções",
  children,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-xl bg-card border border-secondary px-4 py-2 text-secondaryText"
      >
        {label}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-secondary bg-card shadow-xl">
          {children}
        </div>
      )}
    </div>
  );
}
