import React from 'react';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: any[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
