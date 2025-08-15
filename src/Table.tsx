import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { SortableRow } from './SortableRow';
import { TableHeader } from './TableHeader';
import './Table.css';

export interface TableData {
  id: string;
  name: string;
  age: number;
  city: string;
  email: string;
}

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

const columns: Column[] = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' },
  { key: 'email', label: 'Email' },
];

const initialData: TableData[] = [
  { id: '1', name: 'John Doe', age: 30, city: 'New York', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', age: 25, city: 'Los Angeles', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', age: 35, city: 'Chicago', email: 'bob@example.com' },
  { id: '4', name: 'Alice Brown', age: 28, city: 'Houston', email: 'alice@example.com' },
  { id: '5', name: 'Charlie Wilson', age: 42, city: 'Phoenix', email: 'charlie@example.com' },
  { id: '6', name: 'Diana Davis', age: 33, city: 'Philadelphia', email: 'diana@example.com' },
];

export function Table() {
  const [data, setData] = useState<TableData[]>(initialData);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="table-container">
      <h2>Sortable Table with Drag & Drop</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <div className="table-wrapper">
          <table className="sortable-table">
            <TableHeader columns={columns} />
            <tbody>
              <SortableContext items={data} strategy={verticalListSortingStrategy}>
                {data.map((row) => (
                  <SortableRow 
                    key={row.id} 
                    id={row.id} 
                    row={row} 
                    columns={columns} 
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </div>
      </DndContext>
    </div>
  );
}
