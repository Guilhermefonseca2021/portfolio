import type { ReactNode } from "react";
import { Fragment } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumb?: Array<{ label: string; href?: string }>;
}

export function PageHeader({ title, description, actions, breadcrumb }: PageHeaderProps) {
  return (
    <header className="space-y-4">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-secondaryText/60" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && <span className="mx-1">/</span>}
              {item.href ? (
                <a href={item.href} className="hover:text-primary transition">
                  {item.label}
                </a>
              ) : (
                <span className="font-medium text-secondaryText">{item.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondaryText">{title}</h1>
          {description && <p className="mt-1 text-sm text-secondaryText/60">{description}</p>}
        </div>

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
}