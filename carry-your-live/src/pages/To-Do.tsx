import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import { CreateTodoForm } from '../components/CreateTodoForm';
import ColorNavbar from '../components/ColorNavbar';
import { Todo } from '../components/ToDo'; // Ensure correct path to the Todo interface

const ToDoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Your list of to-dos
  const [selectedColor, setSelectedColor] = useState(''); // The selected color group for filtering

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  // Function to handle updating a todo
  const onUpdateTodo = (id: number, updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  // Function to handle deleting a todo
  const onDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Filter todos by selected color
  const filteredTodos = selectedColor
    ? todos.filter((todo) => todo.colorGroup === selectedColor)
    : todos;

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6 text-white">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-purpleCustom-light">
          My To-Do List
        </h1>
        <p className="mt-2 text-gray-300">Stay organized with your tasks</p>
      </header>

      {/* Color Group Navbar */}
      <ColorNavbar selectedColor={selectedColor} onSelectColor={setSelectedColor} />

      {/* Add New Todo Form */}
      <section className="mb-8 max-w-3xl mx-auto">
        <CreateTodoForm onAddTodo={addTodo} />
      </section>

      {/* Display To-Do List */}
      <section className="max-w-3xl mx-auto">
        {filteredTodos.length > 0 ? (
          <TodoList
            todos={filteredTodos}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ) : (
          <div className="text-center text-gray-400 mt-6 py-10 border-2 border-dashed border-gray-700 rounded-lg">
            No to-dos yet. Add one above!
          </div>
        )}
      </section>
    </div>
  );
};

export default ToDoPage;
