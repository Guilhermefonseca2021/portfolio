import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon: ReactNode;
  children: ReactNode;
  right?: ReactNode;
  to: string;
}

export default function NavItem({
  icon,
  children,
  right,
  to,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center justify-between
        rounded-xl px-4 py-3
        transition-all duration-200
        ${
          isActive
            ? "bg-primary text-primaryText"
            : "text-secondaryText/70 hover:bg-secondary hover:text-secondaryText"
        }
      `
      }
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{children}</span>
      </div>

      {right}
    </NavLink>
  );
}
