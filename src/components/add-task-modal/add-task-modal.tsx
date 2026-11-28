import { Modal } from "@/components/modal/modal";
import { addTask } from "@/saved/taskSave";
import TaskForm from "../forms/task-form/task-form";

interface AddTaskModalProps {
  listId: number;
  onClose: () => void;
}

export default function AddTaskModal({ listId, onClose }: AddTaskModalProps) {
  return (
    <Modal title="Add new task" isOpen={true} closeModal={onClose}>
      <TaskForm
        submitLabel="Add task"
        onSubmit={(values) => {
          addTask({ ...values, listId, isFinished: false });
          onClose();
        }}
      />
    </Modal>
  );
}
