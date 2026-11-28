import EditList from "@/components/edit-list/edit-list";
import { Modal } from "@/components/modal/modal";
import { BoardItem } from "@/types/Board";
import { ListItem } from "@/types/List";

interface EditListModalProps {
  list: ListItem;
  currentBoard: BoardItem;
  onClose: () => void;
}

export default function EditListModal({
  list,
  currentBoard,
  onClose,
}: EditListModalProps) {
  return (
    <Modal title="Edit list" isOpen={true} closeModal={onClose}>
      <EditList list={list} currentBoard={currentBoard} onClose={onClose} />
    </Modal>
  );
}
