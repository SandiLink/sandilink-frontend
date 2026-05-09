import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

export function DataTable({
  columns,
  data,
  actions,
  emptyMessage = "No data found",
  rowClassName,
  onRowClick,
}) {
  return (
    <div className="overflow-x-auto">
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
              {actions && (
                <TableHead className="text-right w-[80px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-8 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  className={rowClassName ? rowClassName(row) : ""}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className={column.cellClassName}>
                      {column.cell ? column.cell(row) : row[column.accessorKey]}
                    </TableCell>
                  ))}

                  {actions && (
                    <TableCell className="text-right">
                      {actions(row)?.length > 0 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            {actions(row).map((action, i) => {
                              if (action.separator) {
                                return <DropdownMenuSeparator key={i} />;
                              }

                              return (
                                <DropdownMenuItem
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick();
                                  }}
                                  className={action.className}
                                >
                                  {action.content}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
