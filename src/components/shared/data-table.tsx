import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  cellClassName?: string;
  render: (row: T, index: number) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  rowClassName?: (row: T, index: number) => string | undefined;
};

export function DataTable<T>({
  columns,
  data,
  emptyTitle = "No data found",
  emptyDescription = "There’s nothing to show here yet.",
  className,
  rowClassName,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-white", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-slate-50/80 hover:bg-slate-50/80">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "h-12 whitespace-nowrap px-5 text-xs font-semibold uppercase tracking-wide text-slate-500",
                    column.className,
                  )}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-5 py-12 text-center"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {emptyTitle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {emptyDescription}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "border-b last:border-0 hover:bg-slate-50/50",
                    rowClassName?.(row, index),
                  )}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn("px-5 py-4 align-middle", column.cellClassName)}
                    >
                      {column.render(row, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
