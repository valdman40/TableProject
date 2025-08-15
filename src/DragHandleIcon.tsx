interface DragHandleIconProps {
  className?: string;
}

export function DragHandleIcon({ className }: DragHandleIconProps) {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="currentColor"
      className={className}
    >
      <circle cx="4" cy="4" r="1.5"/>
      <circle cx="4" cy="8" r="1.5"/>
      <circle cx="4" cy="12" r="1.5"/>
      <circle cx="12" cy="4" r="1.5"/>
      <circle cx="12" cy="8" r="1.5"/>
      <circle cx="12" cy="12" r="1.5"/>
    </svg>
  );
}
