import React, { useState } from 'react';
import { TodoList } from '../components/TodoList';
import { CreateTodoForm } from '../components/CreateTodoForm';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const addTodo = (newTodo: any) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>
      
      {/* Add New Todo Form */}
      <CreateTodoForm onAddTodo={addTodo} />
      
      {/* Display To-Do List */}
      <TodoList todos={todos} />
    </div>
  );
};

export default Home;
