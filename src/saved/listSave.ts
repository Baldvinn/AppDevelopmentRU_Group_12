import { useSyncExternalStore } from "react";
import { lists as initialLists } from "../resources/data.json";
import { ListItem } from "@/types/List";


let lists: ListItem[] = initialLists;

const listeners = new Set<() => void>();

export function getLists(): ListItem[] {
    return lists; 
}

export function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function updateList(id: number, changes: Partial<ListItem>) {
    lists = lists.map((list) => (list.id === id ? { ...list, ...changes } : list))
    listeners.forEach((listener) => listener());
}

export function useLists(): ListItem[] {
    return useSyncExternalStore(subscribe, getLists);
}




