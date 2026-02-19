import React, { useState, useEffect } from 'react';
import CreateTodoForm from "../components/forms/CreateTodoForm";
import { Todo } from "../models/ToDo";

const CreateToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage when component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (newTodo: Todo) => setTodos([newTodo, ...todos]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6 text-white">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-purple-400">
          My To-Do List
        </h1>
        <p className="mt-2 text-gray-300">Stay organized with your tasks</p>
      </header>

      {/* Add Task Form */}
      <section className="mb-8 max-w-3xl mx-auto">
        <CreateTodoForm onAddTodo={addTodo} customColors={[]} />
      </section>
    </div>

  );
};

export default CreateToDo;
