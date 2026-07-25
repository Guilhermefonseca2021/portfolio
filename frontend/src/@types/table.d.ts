import { ReactNode } from "react";

interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;

  render?: (row: T) => ReactNode;
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

interface DataTableProps<T> {
  title: string;
  description?: string;

  columns: TableColumn<T>[];
  data: T[];

  actions?: ReactNode;

  pagination?: PaginationProps;
}
