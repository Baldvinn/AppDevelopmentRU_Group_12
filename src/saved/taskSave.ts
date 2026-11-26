import { TaskItem } from "@/types/Task";
import { tasks as initialTasks } from "../resources/data.json";
import { createSave } from "./createSave";

export const taskSave = createSave<TaskItem>(initialTasks);

export const useTasks = taskSave.useAll;
export const addTask = taskSave.add;
export const updateTask = taskSave.update;
export const removeTask = taskSave.remove;

export function toggleTaskFinished(id: number) {
  const task = taskSave.getAll().find((t) => t.id === id);
  if (task) taskSave.update(id, { isFinished: !task.isFinished });
}

export function moveTask(id: number, newListId: number) {
  taskSave.update(id, { listId: newListId });
}
