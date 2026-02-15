import React from 'react';
import { TodoItem } from './TodoItem';

interface Todo {
  id: number;
  title: string;
  subTasks: string[];
  colorGroup: 'red' | 'blue' | 'green' | 'yellow' | 'purpleLight' | 'purpleDark' | 'purpleGradient' | 'dark';
}

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-6 italic">
        No to-dos yet. Add one above!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
