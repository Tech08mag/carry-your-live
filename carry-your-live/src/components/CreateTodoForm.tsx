import React, { useState } from 'react';

interface CreateTodoFormProps {
  onAddTodo: (todo: any) => void;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [colorGroup, setColorGroup] = useState('purpleGradient'); // default custom color
  const [subTasks, setSubTasks] = useState<string[]>(['']);

  const addSubTask = () => setSubTasks([...subTasks, '']);

  const handleSubTaskChange = (index: number, value: string) => {
    const updated = [...subTasks];
    updated[index] = value;
    setSubTasks(updated);
  };

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

    setTitle('');
    setSubTasks(['']);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-[#121212] p-6 rounded-2xl shadow-xl mb-6 text-white max-w-lg mx-auto"
    >
      {/* Title */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2">To-Do Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter to-do title"
          required
          className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-purpleCustom-dark focus:outline-none focus:ring-2 focus:ring-purpleCustom-light transition-colors duration-200"
        />
      </div>

      {/* Color Group */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2">Color Group</label>
        <select
          value={colorGroup}
          onChange={e => setColorGroup(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-purpleCustom-dark text-white focus:outline-none focus:ring-2 focus:ring-purpleCustom-light transition-colors duration-200"
        >
          <option value="dark">Dark</option>
          <option value="purpleLight">Purple Light</option>
          <option value="purpleDark">Purple Dark</option>
          <option value="purpleGradient">Purple Gradient</option>
        </select>
      </div>

      {/* Sub-Tasks */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2">Sub-Tasks</label>
        {subTasks.map((task, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={task}
              onChange={e => handleSubTaskChange(index, e.target.value)}
              placeholder={`Sub-task ${index + 1}`}
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-purpleCustom-dark focus:outline-none focus:ring-2 focus:ring-purpleCustom-light text-white transition-colors duration-200"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSubTask}
          className="text-purpleCustom-light text-sm mt-2 hover:underline transition-colors duration-200"
        >
          + Add another sub-task
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purpleCustom-dark to-purpleCustom-light hover:from-purpleCustom-light hover:to-purpleCustom-dark rounded-2xl p-3 font-semibold text-white shadow-md transition-all duration-300"
      >
        Add To-Do
      </button>
    </form>
  );
};
