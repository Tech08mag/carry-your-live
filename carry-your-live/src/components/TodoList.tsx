// src/components/TodoList.tsx
import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from './ToDo';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: number, updatedTodo: Todo) => void;
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdateTodo, onDeleteTodo }) => {
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
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};

// Ensure that TodoList is exported correctly
export default TodoList;
