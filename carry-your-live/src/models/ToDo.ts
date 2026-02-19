// models/ToDo.ts

export interface SubTask {
  id: string;          // UUID
  todoId: string;      // parent reference (important for SQLite later)
  text: string;
  done: boolean;       // UI state
  createdAt: number;
  updatedAt: number;
}

export interface Todo {
  id: string;          // UUID (never use number for offline sync)
  title: string;
  color: string;       // e.g. "purple", "red", etc.
  done: boolean;

  createdAt: number;
  updatedAt: number;

  synced: boolean;      // false = not synced, true = synced
  deleted: boolean;     // false = active, true = soft deleted

  deadline?: number; // optional timestamp for deadline
  description?: string;
  subTasks: SubTask[];
}

export interface ColorNavbarProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  customColors: string[];
  onAddColorGroup: (color: string) => void;
  onRemoveColorGroup: (color: string) => void;
}
