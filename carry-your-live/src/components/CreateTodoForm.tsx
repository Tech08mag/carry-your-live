import React, { useState } from 'react';

interface CreateTodoFormProps {
  onAddTodo: (todo: any) => void;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [colorGroup, setColorGroup] = useState('red');
  const [subTasks, setSubTasks] = useState<string[]>(['']);

  // Add a new sub-task input
  const addSubTask = () => {
    setSubTasks([...subTasks, '']);
  };

  // Handle sub-task change
  const handleSubTaskChange = (index: number, value: string) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index] = value;
    setSubTasks(updatedSubTasks);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      colorGroup,
      subTasks: subTasks.filter(task => task.trim() !== ''),
    };

    onAddTodo(newTodo);

    // Reset form fields
    setTitle('');
    setSubTasks(['']);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">To-Do Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter to-do title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Color Group</label>
        <select
          value={colorGroup}
          onChange={(e) => setColorGroup(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Sub-Tasks</label>
        {subTasks.map((task, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              value={task}
              onChange={(e) => handleSubTaskChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={`Sub-task ${index + 1}`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSubTask}
          className="text-blue-500 text-sm mt-2"
        >
          Add another sub-task
        </button>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Add To-Do
      </button>
    </form>
  );
};
