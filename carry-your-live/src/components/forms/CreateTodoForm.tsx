import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Todo, SubTask } from '../../models/ToDo';
import { IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonCard, IonCardContent } from '@ionic/react';

interface CreateTodoFormProps {
  onAddTodo: (newTodo: Todo) => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subTasks, setSubTasks] = useState<string[]>(['']);
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<string>('Medium'); // Default priority

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
    if (!title.trim()) return; // Ensure title is provided

    const now = Date.now();
    const todoId = uuid();

    const newTodo: Todo = {
      id: todoId,
      title: title.trim(),
      description: description.trim(), // Add description to the new todo
      done: false,
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
      priority: priority, // Add priority to the new todo
    };

    onAddTodo(newTodo);

    // Reset form
    setTitle('');
    setDescription('');
    setSubTasks(['']);
    setDeadline('');
    setPriority('Medium'); // Reset priority
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonCard className="mb-4">
        <IonCardContent>
          {/* Task Title */}
          <IonItem>
            <IonLabel position="floating">Task Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
              placeholder="Enter task title"
              required
            />
          </IonItem>

          {/* Description */}
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
              placeholder="Enter task description"
            />
          </IonItem>

          {/* Deadline */}
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

          {/* Priority */}
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
                  className="ion-no-margin"
                >
                  ✕
                </IonButton>
              )}
            </IonItem>
          ))}
          <IonButton expand="block" onClick={addSubTaskField} color="primary" className="mt-2">
            + Add Subtask
          </IonButton>
        </IonCardContent>
      </IonCard>

      {/* Submit Button */}
      <IonButton expand="block" type="submit" color="success" className="mt-4">
        Add Task
      </IonButton>
    </form>
  );
};

export default CreateTodoForm;
