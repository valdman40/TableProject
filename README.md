# React Drag & Drop Table

A React application featuring a sortable table with drag-and-drop functionality using the dnd-kit library.

## Features

- **Drag & Drop Sorting**: Reorder table rows by dragging them
- **Modern React**: Built with React 18+ and TypeScript
- **Smooth Animations**: Clean drag interactions with visual feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Accessible**: Keyboard navigation support

## Technologies Used

- React 18+ with TypeScript
- Vite for fast development and building
- @dnd-kit for drag-and-drop functionality
- Modern CSS with flexbox and grid

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sandbox_example
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

The table displays sample user data with the following columns:
- Name
- Age  
- City
- Email

To reorder rows:
1. Click and hold on any table row
2. Drag the row to your desired position
3. Release to drop the row in its new position

The table state is managed locally and will persist during your session.

## Project Structure

```
src/
├── App.tsx          # Main application component
├── Table.tsx        # Main table component with drag-and-drop logic
├── SortableRow.tsx  # Individual sortable row component
├── Table.css        # Table-specific styles
└── App.css          # Global application styles
```

## Customization

You can easily customize the table by:
- Modifying the `initialData` array in `Table.tsx`
- Adding new columns to the `TableData` interface
- Updating the CSS files for different styling
- Adding additional drag-and-drop constraints or modifiers
