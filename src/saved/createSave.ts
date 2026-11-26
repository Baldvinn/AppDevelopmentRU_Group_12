import { useSyncExternalStore } from "react";

interface HasId {
  id: number;
}

export function createSave<type extends HasId>(initialItems: type[]) {
  let items: type[] = initialItems;
  // initialize set for listeners/screens
  const listeners = new Set<() => void>();

  // Notify screens if a change occurs
  const notify = () => listeners.forEach((listener) => listener());

  const getAll = (): type[] => items;

  // Subscribes a screen to the set
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  // Function for getting all items of type
  const useAll = (): type[] => useSyncExternalStore(subscribe, getAll);

  // Function for adding a new item
  const add = (item: Omit<type, "id">): type => {
    const nextId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem = { ...item, id: nextId } as type;
    items = [...items, newItem];
    notify();
    return newItem;
  };

  // Function for updating an item
  const update = (id: number, changes: Partial<type>) => {
    items = items.map((i) => (i.id === id ? { ...i, ...changes } : i));
    notify();
  };

  // Function for removing an item
  const remove = (id: number) => {
    items = items.filter((i) => i.id !== id);
    notify();
  };

  // Function for removing all items belonging to another item
  const removeWhere = (shouldRemove: (item: type) => boolean) => {
    items = items.filter((i) => !shouldRemove(i));
    notify();
  };

  return { getAll, subscribe, useAll, add, update, remove, removeWhere };
}
