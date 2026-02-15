import React from 'react';

interface TodoItemProps {
  todo: any;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className={`p-4 rounded shadow-md ${todo.colorGroup === 'red' ? 'bg-red-100' : ''} ${todo.colorGroup === 'blue' ? 'bg-blue-100' : ''} ${todo.colorGroup === 'green' ? 'bg-green-100' : ''} ${todo.colorGroup === 'yellow' ? 'bg-yellow-100' : ''}`}>
      <h2 className="font-bold text-xl">{todo.title}</h2>
      <ul className="mt-2 list-disc pl-5">
        {todo.subTasks.map((task: string, index: number) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};
