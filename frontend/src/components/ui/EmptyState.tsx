import type { ReactNode } from "react";
import { Button } from "./primitives";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  };
  icon?: ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      {icon && <div className="text-secondaryText/30">{icon}</div>}
      <div>
        <h3 className="text-lg font-semibold text-secondaryText">{title}</h3>
        {description && <p className="mt-1 text-sm text-secondaryText/60">{description}</p>}
      </div>
      {action && (
        <Button variant={action.variant || "primary"} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}