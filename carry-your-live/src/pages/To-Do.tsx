import React, { useState } from 'react';
import { TodoList } from '../components/TodoList';
import { CreateTodoForm } from '../components/CreateTodoForm';

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const addTodo = (newTodo: any) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6 md:p-12 text-white">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-purple-400">
          My To-Do List
        </h1>
        <p className="mt-2 text-gray-400">Stay organized and focused on your tasks</p>
      </header>

      {/* Add New Todo Form */}
      <section className="mb-10 max-w-3xl mx-auto">
        <CreateTodoForm 
          onAddTodo={addTodo} 
        />
      </section>

      {/* Display To-Do List */}
      <section className="max-w-3xl mx-auto">
        {todos.length > 0 ? (
          <TodoList 
            todos={todos}
          />
        ) : (
          <div className="text-center text-gray-500 mt-6 py-10 border-2 border-dashed border-gray-700 rounded-xl">
            No to-dos yet. Add one above!
          </div>
        )}
      </section>
    </div>
  );
};

export default ToDo;
