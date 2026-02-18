import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../../models/ToDo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
  onEdit?: (todo: Todo) => void; // optional edit callback
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdate,
  onDelete,
  onEdit,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle main task done
  const toggleDone = () => {
    onUpdate(todo.id, {
      ...todo,
      done: !todo.done,
      updatedAt: Date.now(),
      synced: false,
    });
  };

  // Toggle subtask done
  const toggleSubTaskDone = (subTaskId: string) => {
    const updatedSubTasks = todo.subTasks.map((sub) =>
      sub.id === subTaskId
        ? {
            ...sub,
            done: !sub.done,
            updatedAt: Date.now(),
          }
        : sub
    );

    onUpdate(todo.id, {
      ...todo,
      subTasks: updatedSubTasks,
      updatedAt: Date.now(),
      synced: false,
    });
  };

  return (
    <div
      className={`
        mb-4 p-5 rounded-2xl
        bg-gradient-to-r from-[#3a1b4d] to-[#2b0a3c]
        border border-purple-700
        shadow-lg
        transition-all duration-200
        active:scale-[0.97]
        ${todo.done ? 'opacity-60' : ''}
      `}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Main Checkbox */}
          <button
            onClick={toggleDone}
            className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center
              transition-colors
              ${todo.done ? 'bg-purple-600 border-purple-600' : 'border-purple-400'}
            `}
          >
            {todo.done && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
          </button>

          {/* Title */}
          <h2
            className={`text-lg font-semibold text-white ${
              todo.done ? 'line-through opacity-70' : ''
            }`}
          >
            {todo.title}
          </h2>
        </div>

        {/* 3-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/70 text-xl px-2 hover:text-purple-400 transition-colors"
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-[#2b0a3c] border border-purple-600 rounded shadow-lg z-10">
              <button
                onClick={() => {
                  onEdit && onEdit(todo);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-white hover:bg-purple-600 rounded-t"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(todo.id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-600 rounded-b"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subtasks */}
      {todo.subTasks.length > 0 && (
        <div className="space-y-2">
          {todo.subTasks.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between text-sm text-white/80"
            >
              <span className={`${sub.done ? 'line-through opacity-60' : ''}`}>
                {sub.text}
              </span>

              <button
                onClick={() => toggleSubTaskDone(sub.id)}
                className={`
                  w-5 h-5 border rounded-sm flex-shrink-0
                  ${sub.done ? 'bg-purple-600 border-purple-600' : 'border-purple-400'}
                `}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
