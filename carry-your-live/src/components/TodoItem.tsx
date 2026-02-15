import React from 'react';

interface TodoItemProps {
  todo: {
    title: string;
    subTasks: string[];
    colorGroup: 'red' | 'blue' | 'green' | 'yellow' | 'purpleLight' | 'purpleDark' | 'purpleGradient' | 'dark';
  };
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  // Map colorGroup to custom palette classes
  const colorClasses: Record<string, string> = {
    red: 'bg-red-main text-red-light',
    blue: 'bg-blue-main text-blue-light',
    green: 'bg-green-main text-green-light',
    yellow: 'bg-yellow-main text-yellow-dark',
    purpleLight: 'bg-purpleLight text-purple-light',
    purpleDark: 'bg-purpleDark text-purple-light',
    purpleGradient: 'bg-gradient-to-r from-purpleDark to-purpleLight text-white',
    dark: 'bg-[#1a1a1a] text-white',
  };

  const appliedClass = colorClasses[todo.colorGroup] || 'bg-gray-200 text-gray-800';

  return (
    <div
      className={`p-5 rounded-2xl shadow-lg mb-4 ${appliedClass} transition-transform transform hover:scale-[1.02]`}
      style={{ border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <h2 className="font-bold text-xl mb-3">{todo.title}</h2>
      <ul className="list-disc pl-5 space-y-1">
        {todo.subTasks.map((task, index) => (
          <li key={index} className="text-sm opacity-90">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};
