import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TablePagination from "./TablePagination";
import type { DataTableProps } from "../../../../@types/table";

export default function DataTable<T>({
  title,
  description,
  columns,
  data,
  actions,
  pagination,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-secondary bg-card shadow-xl">

      <div className="flex flex-col justify-between gap-4 border-b border-secondary p-6 lg:flex-row lg:items-center">

        <div>
          <h2 className="text-2xl font-bold text-secondaryText">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-secondaryText/60">
              {description}
            </p>
          )}
        </div>

        {actions}
      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <TableHeader columns={columns} />

          <tbody>

            {data.map((row, index) => (
              <TableRow
                key={index}
                row={row}
                columns={columns}
              />
            ))}

          </tbody>

        </table>

      </div>

      {pagination && <TablePagination {...pagination} />}

    </div>
  );
}
