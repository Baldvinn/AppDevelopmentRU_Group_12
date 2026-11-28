import AppButton from "@/components/appbutton/appbutton";
import ConfirmDelete from "@/components/confirm-delete/confirm-delete";
import BoardForm from "@/components/forms/board-form/board-form";
import { Modal } from "@/components/modal/modal";
import { deleteBoard, updateBoards } from "@/saved/boardSave";
import { BoardItem } from "@/types/Board";
import { useState } from "react";

interface EditBoardModalProps {
  board: BoardItem;
  onClose: () => void;
}

export default function EditBoardModal({
  board,
  onClose,
}: EditBoardModalProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <Modal
      title={confirmingDelete ? "Delete board?" : "Edit board"}
      isOpen={true}
      closeModal={onClose}
    >
      {confirmingDelete ? (
        <ConfirmDelete
          message={
            '"' +
            board.name +
            "\" and all of its lists and tasks will be deleted. This can't be undone."
          }
          onConfirm={() => {
            deleteBoard(board.id);
            onClose();
          }}
          onCancel={() => setConfirmingDelete(false)}
        />
      ) : (
        <>
          <BoardForm
            initialValues={board}
            submitLabel="Save changes"
            onSubmit={(values) => {
              updateBoards(board.id, values);
              onClose();
            }}
          />
          <AppButton
            label="Delete board"
            marginTop={10}
            onPress={() => setConfirmingDelete(true)}
          />
        </>
      )}
    </Modal>
  );
}
