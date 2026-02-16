import React from 'react';
import { Todo } from './ToDo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updatedTodo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const toggleDone = () => {
    onUpdate(todo.id, { ...todo, done: !todo.done });
  };

  const toggleSubTaskDone = (index: number) => {
    const updated = todo.subTasks.map((s, i) =>
      i === index ? { ...s, done: !s.done } : s
    );
    onUpdate(todo.id, { ...todo, subTasks: updated });
  };

  // Ensure tags is always an array (fallback to an empty array if undefined)
  const tags = todo.tags || [];

  return (
    <div className="p-5 rounded-2xl shadow-lg mb-4 bg-gradient-to-r from-purple-800 to-purple-500 text-white transition-transform transform hover:scale-[1.02] border border-purple-700">
      {/* Task Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className={`font-bold text-xl ${todo.done ? 'line-through opacity-60' : ''}`}>
          {todo.title}
        </h2>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDone}
            className={`px-2 py-1 text-sm rounded ${
              todo.done ? 'bg-gray-600' : 'bg-purple-600 hover:bg-purple-500'
            }`}
          >
            {todo.done ? 'Undo' : 'Done'}
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-2 py-1 text-sm bg-red-600 rounded hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Priority, Deadline, and Tags */}
      <div className="text-sm mb-2">
        <span className={`font-semibold text-${todo.priority === 'high' ? 'red-600' : 'green-500'}`}>
          Priority: {todo.priority}
        </span>
        {todo.deadline && (
          <div className="text-gray-400 mt-1">Deadline: {todo.deadline}</div>
        )}
        {tags.length > 0 && (
          <div className="mt-2 text-gray-300">
            Tags: {tags.join(', ')}
          </div>
        )}
      </div>

      {/* Subtasks */}
      <ul className="list-disc pl-5 space-y-1 text-sm opacity-90">
        {todo.subTasks.map((sub, index) => (
          <li
            key={index}
            className={`flex items-center justify-between ${sub.done ? 'line-through opacity-60' : ''}`}
          >
            <span>{sub.text}</span>
            <button
              className={`px-2 py-0.5 text-xs rounded ${
                sub.done ? 'bg-gray-600' : 'bg-purple-600 hover:bg-purple-500'
              }`}
              onClick={() => toggleSubTaskDone(index)}
            >
              {sub.done ? 'Undo' : 'Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
