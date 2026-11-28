import ListForm from "@/components/forms/list-form/list-form";
import { Modal } from "@/components/modal/modal";
import { addList } from "@/saved/listSave";

interface CreateListModalProps {
  boardId: number;
  onClose: () => void;
}

export default function CreateListModal({
  boardId,
  onClose,
}: CreateListModalProps) {
  return (
    <Modal title="Create new list" isOpen={true} closeModal={onClose}>
      <ListForm
        submitLabel="Create list"
        onSubmit={(values) => {
          addList({ ...values, boardId });
          onClose();
        }}
      />
    </Modal>
  );
}
