import ConfirmDelete from "@/components/confirm-delete/confirm-delete";
import TaskForm from "@/components/forms/task-form/task-form";
import { Modal } from "@/components/modal/modal";
import TaskDetails from "@/components/task-details/task-details";
import {
  moveTask,
  removeTask,
  toggleTaskFinished,
  updateTask,
} from "@/saved/taskSave";
import { ListItem } from "@/types/List";
import { TaskItem } from "@/types/Task";
import { useState } from "react";

interface TaskModalProps {
  task: TaskItem;
  boardLists: ListItem[];
  onClose: () => void;
}

export default function TaskModal({
  task,
  boardLists,
  onClose,
}: TaskModalProps) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const title = confirmingDelete
    ? "Remove task?"
    : editing
      ? "Edit task"
      : task.name;

  return (
    <Modal
      task={editing || confirmingDelete ? undefined : task}
      title={title}
      isOpen={true}
      closeModal={onClose}
    >
      {confirmingDelete ? (
        <ConfirmDelete
          message={
            '"' + task.name + "\" will be deleted. This can't be undone."
          }
          onConfirm={() => {
            removeTask(task.id);
            onClose();
          }}
          onCancel={() => setConfirmingDelete(false)}
        />
      ) : editing ? (
        <TaskForm
          initialValues={task}
          submitLabel="Save changes"
          onSubmit={(values) => {
            updateTask(task.id, values);
            setEditing(false);
          }}
        />
      ) : (
        <TaskDetails
          boardLists={boardLists}
          task={task}
          onToggleTaskFinished={toggleTaskFinished}
          onMoveTask={moveTask}
          onOpenEditing={() => setEditing(true)}
          onRemove={() => setConfirmingDelete(true)}
        />
      )}
    </Modal>
  );
}
