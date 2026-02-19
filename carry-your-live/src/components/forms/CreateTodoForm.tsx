import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Todo, SubTask } from '../../models/ToDo';
import { IonButton, IonInput, IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import ColorNavbar from '../../components/todo/ColorFilterBar';  // Import ColorNavbar component

interface CreateTodoFormProps {
  onAddTodo: (newTodo: Todo) => void;
  customColors: string[];
  onAddColorGroup: (color: string) => void;
  onRemoveColorGroup: (color: string) => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({
  onAddTodo,
  customColors,
  onAddColorGroup,
  onRemoveColorGroup,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subTasks, setSubTasks] = useState<string[]>(['']);
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<string>('Medium'); // Default priority
  const [selectedColor, setSelectedColor] = useState<string>(''); // State for selected color

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
    if (!title.trim() || !selectedColor) return; // Ensure title and color are provided

    const now = Date.now();
    const todoId = uuid();

    const newTodo: Todo = {
      id: todoId,
      title: title.trim(),
      description: description.trim(),
      done: false,
      color: selectedColor, // Assign selected color to the todo
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
      priority: priority,
    };

    onAddTodo(newTodo);

    // Reset form
    setTitle('');
    setDescription('');
    setSubTasks(['']);
    setDeadline('');
    setPriority('Medium');
    setSelectedColor(''); // Reset color
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonItem>
        <IonLabel position="floating">Task Title</IonLabel>
        <IonInput
          value={title}
          onIonChange={(e) => setTitle(e.detail.value!)}
          placeholder="Enter task title"
          required
        />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">Description</IonLabel>
        <IonInput
          value={description}
          onIonChange={(e) => setDescription(e.detail.value!)}
          placeholder="Enter task description"
        />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">Deadline</IonLabel>
        <IonDatetime
          value={deadline}
          onIonChange={(e) => {
            const value = e.detail.value;
            setDeadline(Array.isArray(value) ? value[0] : value || '');
          }}
          min={new Date().toISOString()}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">Priority</IonLabel>
        <IonSelect
          value={priority}
          onIonChange={(e) => setPriority(e.detail.value!)}
          placeholder="Select priority"
        >
          <IonSelectOption value="Low">Low</IonSelectOption>
          <IonSelectOption value="Medium">Medium</IonSelectOption>
          <IonSelectOption value="High">High</IonSelectOption>
        </IonSelect>
      </IonItem>

      {/* Subtasks */}
      {subTasks.map((sub, index) => (
        <IonItem key={index}>
          <IonLabel position="floating">{`Subtask ${index + 1}`}</IonLabel>
          <IonInput
            value={sub}
            onIonChange={(e) => handleSubTaskChange(index, e.detail.value!)}
            placeholder={`Subtask ${index + 1}`}
          />
          {subTasks.length > 1 && (
            <IonButton
              fill="clear"
              color="danger"
              onClick={() => removeSubTaskField(index)}
            >
              ✕
            </IonButton>
          )}
        </IonItem>
      ))}
      <IonButton expand="block" onClick={addSubTaskField} color="primary">
        + Add Subtask
      </IonButton>

      {/* Color Navbar */}
      <ColorNavbar
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        customColors={customColors}
        onAddColorGroup={onAddColorGroup}
        onRemoveColorGroup={onRemoveColorGroup}
      />

      {/* Submit Button */}
      <IonButton expand="block" type="submit" color="success">
        Add Task
      </IonButton>
    </form>
  );
};

export default CreateTodoForm;
