import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Todo, SubTask } from '../../models/ToDo';

interface CreateTodoFormProps {
  onAddTodo: (newTodo: Todo) => void;
  customColors: string[];
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onAddTodo, customColors }) => {
  const [title, setTitle] = useState('');
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
    };

    onAddTodo(newTodo);

    // Reset form
    setTitle('');
    setSubTasks(['']);
    setColorGroup('');
    setDeadline('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2b0a3c] p-6 rounded-2xl shadow-lg space-y-4 max-w-full"
    >
      <h3 className="text-xl font-bold text-[#e0c7ff]">Add New Task</h3>

      {/* Task Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full px-4 py-2 rounded-lg bg-[#3a1b4d] text-[#e0c7ff] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* Deadline */}
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-[#6a1b9a] to-[#8e24aa] text-white font-semibold rounded-lg transition-transform hover:scale-105"
      >
        Add Task
      </button>
    </form>
  );
};

export default CreateTodoForm;
