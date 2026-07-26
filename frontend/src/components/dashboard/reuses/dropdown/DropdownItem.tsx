import React from "react";

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function DropdownItem({
  children,
  onClick,
}: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className="block w-full px-4 py-3 text-left text-secondaryText hover:bg-secondary"
    >
      {children}
    </button>
  );
}
