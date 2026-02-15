import React, { useState } from 'react';
import { TodoList } from '../components/TodoList';
import { CreateTodoForm } from '../components/CreateTodoForm';

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const addTodo = (newTodo: any) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6 text-white">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-purpleCustom-light">
          My To-Do List
        </h1>
        <p className="mt-2 text-gray-300">Stay organized with your tasks</p>
      </header>

      {/* Add New Todo Form */}
      <section className="mb-8 max-w-3xl mx-auto">
        <CreateTodoForm onAddTodo={addTodo} />
      </section>

      {/* Display To-Do List */}
      <section className="max-w-3xl mx-auto">
        {todos.length > 0 ? (
          <TodoList todos={todos} />
        ) : (
          <div className="text-center text-gray-400 mt-6 py-10 border-2 border-dashed border-gray-700 rounded-lg">
            No to-dos yet. Add one above!
          </div>
        )}
      </section>
    </div>
  );
};

export default ToDo;
