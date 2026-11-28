import { ListItem } from "@/types/List";
import { lists as initialLists } from "../resources/data.json";
import { createSave } from "./createSave";
import { taskSave } from "./taskSave";

export const listSave = createSave<ListItem>(initialLists);

export const useLists = listSave.useAll;
export const updateList = listSave.update;
export const addList = listSave.add;

export function deleteList(id: number) {
  taskSave.removeWhere((task) => task.listId === id);
  listSave.remove(id);
}

export function moveList(id: number, newBoardId: number) {
  listSave.update(id, { boardId: newBoardId });
}
