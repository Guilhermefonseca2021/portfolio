import { FaChevronDown } from "react-icons/fa";
import type { TableColumn } from "../../../../@types/table";

interface Props<T> {
  columns: TableColumn<T>[];
}

export default function TableHeader<T>({ columns }: Props<T>) {
  return (
    <thead>
      <tr className="border-b border-secondary bg-secondary/40">
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className="px-5 py-4 text-left text-sm font-semibold text-secondaryText"
            style={{ width: column.width }}
          >
            <div className="flex items-center gap-2">
              {column.title}

              {column.sortable && (
                <FaChevronDown className="h-4 w-4 text-secondaryText/50" />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
