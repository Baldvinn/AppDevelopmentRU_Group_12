import BoardList from "@/components/board-list/board-list";
import ConfirmDelete from "@/components/confirm-delete/confirm-delete";
import TaskForm from "@/components/forms/task-form/task-form";
import { Modal } from "@/components/modal/modal";
import TaskDetails from "@/components/task-details/task-details";
import { BoardToolbar } from "@/components/toolbar/toolbar";
import { useSelection } from "@/hooks/useSelection";
import { useBoards } from "@/saved/boardSave";
import { deleteList, useLists } from "@/saved/listSave";
import {
  addTask,
  moveTask,
  removeTask,
  toggleTaskFinished,
  updateTask,
  useTasks,
} from "@/saved/taskSave";
import { ListItem } from "@/types/List";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import styles from "./styles";

export default function Board() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Fetch all items
  const boards = useBoards();
  const tasks = useTasks();
  const lists = useLists();

  const taskSelection = useSelection();
  const listSelection = useSelection();

  // Id of open task in modal
  const [viewedTaskId, setViewedTaskId] = useState<number | null>(null);

  // If task is being edited
  const [editingTask, setEditingTask] = useState(false);

  const [confirmingTaskDelete, setConfirmingTaskDelete] = useState(false);

  // List id the new task is being added to
  const [addingToListId, setAddingToListId] = useState<number | null>(null);

  // Find the appropriate board
  const board = boards.find((item) => item.id === Number(id));

  if (!board) {
    return <Text>Board not found</Text>;
  }

  // All lists on this board
  const board_lists: ListItem[] = lists.filter(
    (list) => list.boardId === board.id,
  );

  // Get the task being viewed in the modal
  const viewedTask = tasks.find((task) => task.id === viewedTaskId);

  function handleDeleteSelectedLists(): void {
    listSelection.selected.forEach(deleteList);
    listSelection.clear();
  }

  function onTaskPress(taskId: number): void {
    if (taskSelection.selected.length > 0) {
      taskSelection.toggle(taskId);
    } else {
      setViewedTaskId(taskId);
    }
  }

  function onListPress(listId: number): void {
    if (listSelection.selected.length > 0) {
      listSelection.toggle(listId);
    }
  }

  function closeTaskModal(): void {
    setViewedTaskId(null);
    setEditingTask(false);
    setConfirmingTaskDelete(false);
  }

  return (
    <View style={styles.boardContainer}>
      {/* Board header */}
      <View style={styles.boardHeader}>
        <Image
          source={{ uri: board.thumbnailPhoto }}
          style={styles.boardThumbnail}
        />
        <View style={styles.boardHeaderText}>
          <Text style={styles.boardName}>{board.name}</Text>
          {board.description ? (
            <Text style={styles.boardDescription}>{board.description}</Text>
          ) : null}
        </View>
      </View>

      {/* Contents of a board */}
      <View style={styles.boardContents}>
        <FlatList<ListItem>
          horizontal
          style={{ flex: 1 }}
          data={board_lists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BoardList
              list={item}
              tasks={tasks.filter((task) => task.listId === item.id)}
              selectedTasks={taskSelection.selected}
              onTaskPress={onTaskPress}
              onTaskLongPress={taskSelection.toggle}
              onToggleTaskFinished={toggleTaskFinished}
              isListSelected={listSelection.isSelected(item.id)}
              onListLongPress={listSelection.toggle}
              onListPress={onListPress}
              onAddTaskPress={(listId) => setAddingToListId(listId)}
            />
          )}
          extraData={{
            selectedTasks: taskSelection.selected,
            selectedLists: listSelection.selected,
          }}
        />
      </View>

      <BoardToolbar onDeleteCard={handleDeleteSelectedLists} />
      {/* Modal for viewing tasks*/}
      {viewedTask && (
        <Modal
          task={editingTask || confirmingTaskDelete ? undefined : viewedTask}
          title={
            confirmingTaskDelete
              ? "Remove task?"
              : editingTask
                ? "Edit task"
                : viewedTask.name
          }
          isOpen={true}
          closeModal={closeTaskModal}
        >
          {/* Confirm removing, else editing, else details */}
          {confirmingTaskDelete ? (
            <ConfirmDelete
              message={
                '"' +
                viewedTask.name +
                "\" will be deleted. This can't be undone."
              }
              onConfirm={() => {
                removeTask(viewedTask.id);
                closeTaskModal();
              }}
              onCancel={() => setConfirmingTaskDelete(false)}
            />
          ) : editingTask ? (
            <TaskForm
              initialValues={viewedTask}
              submitLabel="Save changes"
              onSubmit={(values) => {
                updateTask(viewedTask.id, values);
                setEditingTask(false);
              }}
            />
          ) : (
            <TaskDetails
              boardLists={board_lists}
              task={viewedTask}
              onToggleTaskFinished={toggleTaskFinished}
              onMoveTask={moveTask}
              onOpenEditing={() => setEditingTask(true)}
              onRemove={() => setConfirmingTaskDelete(true)}
            />
          )}
        </Modal>
      )}
      {addingToListId !== null && (
        <Modal
          title="Add new task"
          isOpen={true}
          closeModal={() => setAddingToListId(null)}
        >
          <TaskForm
            submitLabel="Add task"
            onSubmit={(values) => {
              addTask({ ...values, listId: addingToListId, isFinished: false });
              setAddingToListId(null);
            }}
          />
        </Modal>
      )}
    </View>
  );
}
