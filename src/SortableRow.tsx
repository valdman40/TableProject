import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Column {
  key: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface SortableRowProps {
  id: string;
  row: Record<string, any>;
  columns: Column[];
}

export function SortableRow({ id, row, columns }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`sortable-row ${isDragging ? 'dragging' : ''}`}
    >
      {columns.map((column) => (
        <td key={column.key}>
          {column.render ? column.render(row[column.key], row) : row[column.key]}
        </td>
      ))}
    </tr>
  );
}
