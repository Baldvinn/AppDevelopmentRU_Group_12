import { useState } from "react";

// Keeps track of selected ids (like tasks or lists)
export function useSelection() {
  const [selected, setSelected] = useState<number[]>([]);

  // Select the id if not already selected, otherwise unselect it
  const toggle = (id: number) =>
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((selectedId) => selectedId !== id)
        : [...previous, id],
    );

  const isSelected = (id: number) => selected.includes(id);

  const clear = () => setSelected([]);

  return { selected, toggle, isSelected, clear };
}
