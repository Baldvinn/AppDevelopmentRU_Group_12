import BoardForm from "@/components/forms/board-form/board-form";
import { Modal } from "@/components/modal/modal";
import { addBoards } from "@/saved/boardSave";

interface CreateBoardModalProps {
  onClose: () => void;
}

export default function CreateBoardModal({ onClose }: CreateBoardModalProps) {
  return (
    <Modal title="Create new board" isOpen={true} closeModal={onClose}>
      <BoardForm
        submitLabel="Create Board"
        onSubmit={(values) => {
          addBoards(values);
          onClose();
        }}
      />
    </Modal>
  );
}
