import ConfirmDelete from "@/components/confirm-delete/confirm-delete";
import { Modal } from "@/components/modal/modal";

interface DeleteSelectedModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteSelectedModal({
  message,
  onConfirm,
  onClose,
}: DeleteSelectedModalProps) {
  return (
    <Modal title="Delete selected?" isOpen={true} closeModal={onClose}>
      <ConfirmDelete
        message={message}
        onConfirm={onConfirm}
        onCancel={onClose}
      />
    </Modal>
  );
}
