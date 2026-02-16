// src/components/ToDo.ts
export interface SubTask {
  text: string;
  done: boolean;
}

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  subTasks: SubTask[];
  priority: 'low' | 'medium' | 'high'; // Add priority
  deadline: string; // Add deadline (string in ISO format)
  tags: string[]; // Add tags (array of strings)
  colorGroup: 'purpleLight';
}
