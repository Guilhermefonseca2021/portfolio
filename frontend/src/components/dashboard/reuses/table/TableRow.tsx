import type { TableColumn } from "../../../../@types/table";

interface Props<T> {
  row: T;
  columns: TableColumn<T>[];
}

export default function TableRow<T>({
  row,
  columns,
}: Props<T>) {
  return (
    <tr className="border-b border-secondary transition hover:bg-secondary/30">
      {columns.map((column) => (
        <td
          key={String(column.key)}
          className="px-6 py-4 text-secondaryText"
        >
          {column.render
            ? column.render(row)
            : String(row[column.key as keyof T] ?? "-")}
        </td>
      ))}
    </tr>
  );
}
