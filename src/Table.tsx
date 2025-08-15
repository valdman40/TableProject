import { useState, useEffect } from 'react';
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
import { dummyData, type TableData } from './dummyData';
import './Table.css';

// Re-export TableData for other components that might need it
export type { TableData };

interface FlatTableData extends TableData {
  level: number;
  hasChildren: boolean;
  isExpanded?: boolean;
  parentId?: string;
}

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any, onToggleExpand?: (id: string) => void) => React.ReactNode;
}

const columns: Column[] = [
  { 
    key: 'name', 
    label: 'Name',
    render: (value: string, row: FlatTableData, onToggleExpand?: (id: string) => void) => (
      <div style={{ 
        paddingLeft: `${row.level * 20}px`,
        display: 'flex',
        alignItems: 'center'
      }}>
        {row.hasChildren && (
          <span 
            style={{ 
              marginRight: '8px', 
              cursor: 'pointer',
              userSelect: 'none',
              fontSize: '12px',
              width: '16px',
              textAlign: 'center',
              color: '#6b7280'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand?.(row.id);
            }}
          >
            {row.isExpanded ? '▼' : '▶'}
          </span>
        )}
        <span style={{ marginLeft: row.hasChildren ? '0' : '24px' }}>
          {value}
        </span>
      </div>
    )
  },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' },
  { key: 'email', label: 'Email' },
];

// Function to flatten hierarchical data
function flattenData(data: TableData[], level = 0, parentId?: string, expandedIds: Set<string> = new Set()): FlatTableData[] {
  let result: FlatTableData[] = [];
  
  data.forEach(item => {
    const hasChildren = !!(item.children && item.children.length > 0);
    const isExpanded = expandedIds.has(item.id);
    
    const flatItem: FlatTableData = {
      ...item,
      level,
      hasChildren,
      isExpanded,
      parentId
    };
    
    result.push(flatItem);
    
    if (item.children && item.children.length > 0 && isExpanded) {
      result = result.concat(flattenData(item.children, level + 1, item.id, expandedIds));
    }
  });
  
  return result;
}

export function Table() {
  // Track which items are expanded
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => {
      // Start with all parent items expanded
      const initialExpanded = new Set<string>();
      const addExpandedIds = (items: TableData[]) => {
        items.forEach(item => {
          if (item.children && item.children.length > 0) {
            initialExpanded.add(item.id);
            addExpandedIds(item.children);
          }
        });
      };
      addExpandedIds(dummyData);
      return initialExpanded;
    }
  );

  const [flatData, setFlatData] = useState<FlatTableData[]>(
    () => flattenData(dummyData, 0, undefined, expandedIds)
  );

  // Update flat data when expanded state changes
  useEffect(() => {
    setFlatData(flattenData(dummyData, 0, undefined, expandedIds));
  }, [expandedIds]);

  // Handle expand/collapse
  const toggleExpanded = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
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
      setFlatData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="table-container">
      <h2>Sortable Hierarchical Table with Drag & Drop</h2>
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
              <SortableContext items={flatData} strategy={verticalListSortingStrategy}>
                {flatData.map((row) => (
                  <SortableRow 
                    key={row.id} 
                    id={row.id} 
                    row={row} 
                    columns={columns} 
                    onToggleExpand={toggleExpanded}
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
