import { forwardRef } from "react";
import type { TableHTMLAttributes } from "react";

export interface TableColumn<T> {
  key: string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: string | ((row: T) => string);
  emptyMessage?: string;
  striped?: boolean;
  hoverable?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps<unknown>>(
  ({ columns, data, rowKey, emptyMessage = "Nenhum registro encontrado", striped = true, hoverable = true, className = "", children, ...props }, ref) => {
    const getRowKey = (row: unknown) => (typeof rowKey === "function" ? rowKey(row) : String(row[rowKey as keyof typeof row]));

    return (
      <div className="overflow-x-auto">
        <table ref={ref} className={`w-full min-w-[800px] ${className}`} {...props}>
          <thead>
            <tr className="border-b border-secondary bg-secondary/30">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-5 py-3 text-left text-sm font-semibold text-secondaryText ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : ""}`}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-secondaryText/60">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={getRowKey(row) || index}
                  className={`border-b border-secondary/40 transition ${hoverable ? "hover:bg-secondary/30" : ""} ${striped && index % 2 === 1 ? "bg-secondary/20" : ""}`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-5 py-4 text-secondaryText ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : ""}`}
                    >
                      {column.render ? column.render(row) : String(row[column.key as keyof typeof row] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";