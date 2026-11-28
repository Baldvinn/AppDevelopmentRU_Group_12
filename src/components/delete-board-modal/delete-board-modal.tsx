import ConfirmDelete from "@/components/confirm-delete/confirm-delete";
import { Modal } from "@/components/modal/modal";

interface DeleteBoardsModalProps {
  count: number;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteBoardsModal({
  count,
  onConfirm,
  onClose,
}: DeleteBoardsModalProps) {
  return (
    <Modal title="Delete boards?" isOpen={true} closeModal={onClose}>
      <ConfirmDelete
        message={
          count +
          " board(s) and all of their lists and tasks will be deleted. This can't be undone."
        }
        onConfirm={onConfirm}
        onCancel={onClose}
      />
    </Modal>
  );
}
