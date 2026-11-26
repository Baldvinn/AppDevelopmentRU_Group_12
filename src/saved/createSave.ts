import { useSyncExternalStore } from "react";

interface HasId {
  id: number;
}

export function createSave<type extends HasId>(initialItems: type[]) {
  let items: type[] = initialItems;
  const listeners = new Set<() => void>();

  const notify = () => listeners.forEach((listener) => listener());

  const getAll = (): type[] => items;

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const useAll = (): type[] => useSyncExternalStore(subscribe, getAll);

  const add = (item: Omit<type, "id">): type => {
    const nextId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem = { ...item, id: nextId } as type;
    items = [...items, newItem];
    notify();
    return newItem;
  };

  const update = (id: number, changes: Partial<type>) => {
    items = items.map((i) => (i.id === id ? { ...i, ...changes } : i));
    notify();
  };

  const remove = (id: number) => {
    items = items.filter((i) => i.id !== id);
    notify();
  };

  const removeWhere = (shouldRemove: (item: type) => boolean) => {
    items = items.filter((i) => !shouldRemove(i));
    notify();
  };

  return { getAll, subscribe, useAll, add, update, remove, removeWhere };
}
