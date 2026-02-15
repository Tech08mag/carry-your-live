import React, { useState } from 'react';

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    subTasks: { text: string; done: boolean }[];
    done: boolean;
    colorGroup:
      | 'red'
      | 'blue'
      | 'green'
      | 'yellow'
      | 'purpleLight'
      | 'purpleDark'
      | 'purpleGradient'
      | 'dark';
  };
  onDelete: (id: number) => void;
  onToggleDone: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
  onToggleSubTask: (todoId: number, subIndex: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onToggleDone,
  onEdit,
  onToggleSubTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // Dark mode / theme colors
  const colorClasses: Record<string, string> = {
    red: 'bg-red-700 text-red-100 border-red-600',
    blue: 'bg-blue-700 text-blue-100 border-blue-600',
    green: 'bg-green-700 text-green-100 border-green-600',
    yellow: 'bg-yellow-600 text-yellow-900 border-yellow-500',
    purpleLight: 'bg-[#4e137d] text-[#e0c7ff] border-purple-600',
    purpleDark: 'bg-[#2b0a3c] text-[#e0c7ff] border-purple-800',
    purpleGradient:
      'bg-gradient-to-br from-[#3b0a45] via-[#4e137d] to-[#6a1b9a] text-white border-purple-700',
    dark: 'bg-[#1a1a1a] text-white border-gray-700',
  };

  const appliedClass = colorClasses[todo.colorGroup] || 'bg-gray-800 text-gray-200 border-gray-700';

  return (
    <div
      className={`p-5 rounded-2xl shadow-lg border ${appliedClass} transition-transform transform hover:scale-105`}
    >
      {/* Title */}
      <div className="flex justify-between items-center mb-3">
        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-gray-800 text-white rounded px-2 py-1 outline-none border border-gray-600"
          />
        ) : (
          <h2
            className={`font-bold text-lg md:text-xl ${
              todo.done ? 'line-through opacity-60' : ''
            }`}
          >
            {todo.title}
          </h2>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-2">
          {isEditing ? (
            <button
              className="px-2 py-1 text-sm bg-green-600 rounded hover:bg-green-500"
              onClick={() => {
                onEdit(todo.id, editTitle);
                setIsEditing(false);
              }}
            >
              Save
            </button>
          ) : (
            <button
              className="px-2 py-1 text-sm bg-yellow-600 rounded hover:bg-yellow-500"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
          <button
            className="px-2 py-1 text-sm bg-red-600 rounded hover:bg-red-500"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
          <button
            className={`px-2 py-1 text-sm rounded ${
              todo.done ? 'bg-gray-600' : 'bg-purple-600 hover:bg-purple-500'
            }`}
            onClick={() => onToggleDone(todo.id)}
          >
            {todo.done ? 'Undo' : 'Done'}
          </button>
        </div>
      </div>

      {/* Subtasks */}
      {todo.subTasks.length > 0 && (
        <ul className="list-disc pl-5 space-y-1 text-sm opacity-90">
          {todo.subTasks.map((sub, index) => (
            <li
              key={index}
              className={`flex items-center justify-between ${
                sub.done ? 'line-through opacity-60' : ''
              }`}
            >
              <span>{sub.text}</span>
              <button
                className={`px-2 py-0.5 text-xs rounded ${
                  sub.done ? 'bg-gray-600' : 'bg-purple-600 hover:bg-purple-500'
                }`}
                onClick={() => onToggleSubTask(todo.id, index)}
              >
                {sub.done ? 'Undo' : 'Done'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
