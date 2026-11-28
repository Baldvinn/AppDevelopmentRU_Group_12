import BoardList from "@/components/board-list/board-list";
import ConfirmDelete from "@/components/confirm-delete/confirm-delete";
import EditList from "@/components/edit-list/edit-list";
import ListForm from "@/components/forms/list-form/list-form";
import TaskForm from "@/components/forms/task-form/task-form";
import { Modal } from "@/components/modal/modal";
import TaskDetails from "@/components/task-details/task-details";
import { BoardToolbar } from "@/components/toolbar/toolbar";
import { useSelection } from "@/hooks/useSelection";
import { useBoards } from "@/saved/boardSave";
import { addList, deleteList, useLists } from "@/saved/listSave";
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

  //Store which list's modal is open, null if no list is being edited
  const [editingListId, setEditingListId] = useState<number | null>(null);

  // If task is being edited
  const [editingTask, setEditingTask] = useState(false);

  const [confirmingTaskDelete, setConfirmingTaskDelete] = useState(false);

  // List id the new task is being added to
  const [addingToListId, setAddingToListId] = useState<number | null>(null);

  // If the create list is open
  const [creatingList, setCreatingList] = useState(false);

  const [confirmingListDelete, setConfirmingListDelete] = useState(false);

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

  //look up the full list using the stored id so the modal always shows the current name and color
  const editingList = lists.find((list) => list.id === editingListId);

  // Helper functions

  function handleDeleteSelectedLists(): void {
    listSelection.selected.forEach(deleteList);
    listSelection.clear();
    setConfirmingListDelete(false);
  }

  function requestDeleteSelectedLists(): void {
    if (listSelection.selected.length === 0) return;
    setConfirmingListDelete(true);
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
              onEditPress={setEditingListId}
              onAddTaskPress={(listId) => setAddingToListId(listId)}
            />
          )}
          extraData={{
            selectedTasks: taskSelection.selected,
            selectedLists: listSelection.selected,
          }}
        />
      </View>

      <BoardToolbar
        onAddCard={() => setCreatingList(true)}
        addLabel="Add list"
        onDeleteCard={requestDeleteSelectedLists}
      />

      {/* Modal for confirming list removal */}
      {confirmingListDelete && (
        <Modal
          title="Delete lists?"
          isOpen={confirmingListDelete}
          closeModal={() => setConfirmingListDelete(false)}
        >
          <ConfirmDelete
            message={`${listSelection.selected.length} list(s) and their tasks will be deleted. This can't be undone.`}
            onConfirm={handleDeleteSelectedLists}
            onCancel={() => setConfirmingListDelete(false)}
          />
        </Modal>
      )}

      {/* Modal for task details*/}
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
          {/* Modal contents for Confirm task removal | editing | task details */}
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

      {/* Modal for adding new task */}
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

      {/* Modal for editing a list */}
      {editingList && (
        <Modal
          title="Edit list"
          isOpen={true}
          closeModal={() => setEditingListId(null)}
        >
          <EditList list={editingList} onClose={() => setEditingListId(null)} />
        </Modal>
      )}

      {/* Modal for creating a list */}
      {creatingList && (
        <Modal
          title="Create new list"
          isOpen={true}
          closeModal={() => setCreatingList(false)}
        >
          <ListForm
            submitLabel="Create list"
            onSubmit={(values) => {
              addList({ ...values, boardId: board.id });
              setCreatingList(false);
            }}
          />
        </Modal>
      )}
    </View>
  );
}
