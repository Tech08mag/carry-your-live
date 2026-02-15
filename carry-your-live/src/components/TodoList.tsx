import React, { useState } from 'react';
import { TodoItem } from './TodoItem';

interface Todo {
  id: number;
  title: string;
  done: boolean;
  subTasks: { text: string; done: boolean }[];
  colorGroup: 'red' | 'blue' | 'green' | 'yellow' | 'purpleLight' | 'purpleDark' | 'purpleGradient' | 'dark';
}

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const deleteTodo = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  const toggleDone = (id: number) =>
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const editTodo = (id: number, newTitle: string) =>
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );

  const toggleSubTask = (todoId: number, subIndex: number) =>
    setTodos(
      todos.map((t) =>
        t.id === todoId
          ? {
              ...t,
              subTasks: t.subTasks.map((s, i) =>
                i === subIndex ? { ...s, done: !s.done } : s
              ),
            }
          : t
      )
    );

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
          onDelete={deleteTodo}
          onToggleDone={toggleDone}
          onEdit={editTodo}
          onToggleSubTask={toggleSubTask}
        />
      ))}
    </div>
  );
};
