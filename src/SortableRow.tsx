import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandleIcon } from './DragHandleIcon';

interface Column {
  key: string;
  render?: (value: any, row: any, onToggleExpand?: (id: string) => void) => React.ReactNode;
}

interface SortableRowProps {
  id: string;
  row: Record<string, any>;
  columns: Column[];
  onToggleExpand?: (id: string) => void;
}

export function SortableRow({ id, row, columns, onToggleExpand }: SortableRowProps) {
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
      className={`sortable-row ${isDragging ? 'dragging' : ''}`}
      data-level={row.level || 0}
    >
      <td className="drag-handle-cell">
        <div 
          className="drag-handle" 
          {...attributes} 
          {...listeners}
          title="Drag to reorder"
        >
          <DragHandleIcon />
        </div>
      </td>
      {columns.map((column) => (
        <td key={column.key}>
          {column.render ? column.render(row[column.key], row, onToggleExpand) : row[column.key]}
        </td>
      ))}
    </tr>
  );
}
