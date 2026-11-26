import { BoardItem } from "@/types/Board";
import { boards as initialBoards } from "../resources/data.json";
import { createSave } from "./createSave";
import { deleteList, listSave } from "./listSave";

const boardSave = createSave<BoardItem>(initialBoards);

export const useBoards = boardSave.useAll;
export const addBoards = boardSave.add;
export const updateBoards = boardSave.update;

export function deleteBoard(id: number) {
  listSave
    .getAll()
    .filter((list) => list.boardId === id)
    .forEach((list) => deleteList(list.id));
  boardSave.remove(id);
}
