import React, { useState } from 'react';

interface CreateTodoFormProps {
  onAddTodo: (newTodo: {
    id: number;
    title: string;
    done: boolean;
    subTasks: { text: string; done: boolean }[];
    priority: 'low' | 'medium' | 'high';
    deadline: string;
    tags: string[];
    colorGroup: 'purpleLight';
  }) => void;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [subTasks, setSubTasks] = useState<string[]>(['']);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [deadline, setDeadline] = useState('');
  const [tags, setTags] = useState<string[]>(['']);
  const [colorGroup] = useState<'purpleLight'>('purpleLight');

  const handleSubTaskChange = (index: number, value: string) => {
    const updated = [...subTasks];
    updated[index] = value;
    setSubTasks(updated);
  };

  const addSubTaskField = () => setSubTasks([...subTasks, '']);
  const removeSubTaskField = (index: number) =>
    setSubTasks(subTasks.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      done: false,
      subTasks: subTasks.filter((s) => s.trim()).map((s) => ({ text: s.trim(), done: false })),
      priority,
      deadline,
      tags,
      colorGroup,
    };
    onAddTodo(newTodo);

    // Reset form
    setTitle('');
    setSubTasks(['']);
    setPriority('medium');
    setDeadline('');
    setTags(['']);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#2b0a3c] p-5 rounded-2xl shadow-lg max-w-full">
      <h3 className="text-lg font-bold text-[#e0c7ff] mb-3">Add New Task</h3>

      {/* Task Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full mb-3 px-3 py-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* Subtasks */}
      <div className="mb-3">
        {subTasks.map((sub, index) => (
          <div key={index} className="flex mb-2 items-center space-x-2">
            <input
              type="text"
              value={sub}
              onChange={(e) => handleSubTaskChange(index, e.target.value)}
              placeholder={`Subtask ${index + 1}`}
              className="flex-1 px-3 py-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {subTasks.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubTaskField(index)}
                className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded text-sm text-white"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSubTaskField}
          className="px-3 py-1 mt-1 bg-purple-600 hover:bg-purple-500 rounded text-sm text-white"
        >
          + Add Subtask
        </button>
      </div>

      {/* Priority */}
      <div className="mb-3">
        <label className="text-[#e0c7ff] mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="w-full p-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Deadline */}
      <div className="mb-3">
        <label className="text-[#e0c7ff] mb-1">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Tags */}
      <div className="mb-3">
        <label className="text-[#e0c7ff] mb-1">Tags</label>
        <input
          type="text"
          value={tags.join(', ')}
          onChange={(e) => setTags(e.target.value.split(',').map((tag) => tag.trim()))}
          placeholder="Add tags (comma separated)"
          className="w-full p-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-[#6a1b9a] to-[#8e24aa] text-white font-semibold rounded-lg hover:scale-105 transition-transform"
      >
        Add Task
      </button>
    </form>
  );
};
