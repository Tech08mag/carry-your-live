import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Todo, SubTask } from '../../models/ToDo';

interface CreateTodoFormProps {
  onAddTodo: (newTodo: Todo) => void;
  customColors: string[]; // color group options
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({
  onAddTodo,
  customColors,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subTasks, setSubTasks] = useState<string[]>(['']);
  const [colorGroup, setColorGroup] = useState('');
  const [deadline, setDeadline] = useState('');

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
    if (!title.trim() || !colorGroup) return;

    const now = Date.now();
    const todoId = uuid();

    const newTodo: Todo = {
      id: todoId,
      title: title.trim(),
      done: false,
      color: colorGroup,
      subTasks: subTasks
        .filter((s) => s.trim())
        .map<SubTask>((s) => ({
          id: uuid(),
          todoId,
          text: s.trim(),
          done: false,
          createdAt: now,
          updatedAt: now,
        })),
      createdAt: now,
      updatedAt: now,
      synced: false,
      deleted: false,
      deadline: deadline ? new Date(deadline).getTime() : undefined,
      description: description.trim() || undefined,
    };

    onAddTodo(newTodo);

    // Reset form
    setTitle('');
    setDescription('');
    setSubTasks(['']);
    setColorGroup('');
    setDeadline('');
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setSubTasks(['']);
    setColorGroup('');
    setDeadline('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2b0a3c] p-6 rounded-2xl shadow-lg max-w-full space-y-4"
    >
      <h3 className="text-xl font-bold text-[#e0c7ff] text-center">
        Add New Task
      </h3>

      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full px-4 py-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* Subtasks */}
      <div className="space-y-2">
        {subTasks.map((sub, index) => (
          <div key={index} className="flex items-center gap-2">
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
                className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded text-white font-bold transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSubTaskField}
          className="px-4 py-1 bg-purple-600 hover:bg-purple-500 rounded text-white font-semibold transition-transform hover:scale-105"
        >
          + Add Subtask
        </button>
      </div>

      {/* Deadline */}
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* Description */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description (optional)"
        className="w-full px-4 py-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        rows={3}
      />

      {/* Color Group */}
      <div>
        <label className="text-[#e0c7ff] mb-1 block">Color Group</label>
        <select
          value={colorGroup}
          onChange={(e) => setColorGroup(e.target.value)}
          className="w-full p-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">Select a color group</option>
          <option value="purpleLight">Purple Light</option>
          {customColors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <button
          type="submit"
          className="flex-1 py-2 bg-gradient-to-r from-[#6a1b9a] to-[#8e24aa] text-white font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          Add Task
        </button>
      <div className="flex justify-between gap-4 mt-4">
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-2 bg-gradient-to-r from-[#6a1b9a] to-[#8e24aa] text-white font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default CreateTodoForm;
