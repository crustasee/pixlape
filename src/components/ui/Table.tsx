import React from 'react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

export function Table<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = 'No data available in catalog',
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto shadow-hard-sm">
      <table className="w-full text-left text-sm text-text font-mono">
        <thead className="bg-yellow-green text-darkteal text-xs sm:text-sm font-black uppercase tracking-wider font-mono">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-5 py-4 font-black" scope="col">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-border-color bg-yellow-100 text-darkteal font-mono">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center text-darkteal font-bold italic">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-yellow-green transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-5 py-4 whitespace-nowrap font-medium">
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                      ? String(item[col.accessorKey] ?? '')
                      : null}
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
