import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { TodoList } from '../components/todo/TodoList';
// ToDoPage.tsx
import CreateTodoForm from '../components/forms/CreateTodoForm';
import ColorFilterBar from '../components/todo/ColorFilterBar';
import { Todo } from '../models/ToDo';

const ToDoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [customColors, setCustomColors] = useState<string[]>([
    'purpleLight',
    'red',
    'blue',
    'green',
  ]);

  const addTodo = (newTodo: Todo) => setTodos([...todos, newTodo]);

  const updateTodo = (id: string, updatedTodo: Todo) =>
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));

  const deleteTodo = (id: string) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const filteredTodos = selectedColor
    ? todos.filter((todo) => todo.color === selectedColor)
    : todos;

  const addColorGroup = (color: string) => {
    if (!customColors.includes(color)) setCustomColors([...customColors, color]);
  };

  const removeColorGroup = (color: string) => {
    setCustomColors(customColors.filter((c) => c !== color));
    if (selectedColor === color) setSelectedColor('');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-[#1a1a1a] p-6 text-white">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-purpleCustom-light">
            My To-Do List
          </h1>
          <p className="mt-2 text-gray-300">Stay organized with your tasks</p>
        </header>

        {/* Color Filter Bar */}
        <ColorFilterBar
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          customColors={customColors}
          onAddColorGroup={addColorGroup}
          onRemoveColorGroup={removeColorGroup}
        />

        {/* Create Todo Form */}
        <section className="mb-8 max-w-3xl mx-auto">
          <CreateTodoForm onAddTodo={addTodo} customColors={customColors} />
        </section>

        {/* Todo List */}
        <section className="max-w-3xl mx-auto">
          {filteredTodos.length > 0 ? (
            <TodoList
              todos={filteredTodos}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
            />
          ) : (
            <div className="text-center text-gray-400 mt-6 py-10 border-2 border-dashed border-gray-700 rounded-lg">
              No to-dos yet. Add one above!
            </div>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};

export default ToDoPage;
