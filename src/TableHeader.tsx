interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableHeaderProps {
  columns: Column[];
}

export function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.key}>{column.label}</th>
        ))}
      </tr>
    </thead>
  );
}
