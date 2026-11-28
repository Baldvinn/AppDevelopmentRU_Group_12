import TaskModal from "@/components/task-modal/task-modal";
import DeleteSelectedModal from "@/components/delete-selected-modal/delete-selected-modal";
import EditListModal from "@/components/edit-list-modal/edit-list-modal";
import CreateListModal from "@/components/create-list-modal/create-list-modal";
import AddTaskModal from "@/components/add-task-modal/add-task-modal";
import BoardList from "@/components/board-list/board-list";
import TaskFilter from "@/components/task-filter/task-filter";
import { BoardToolbar } from "@/components/toolbar/toolbar";
import { useSelection } from "@/hooks/useSelection";
import { useBoards } from "@/saved/boardSave";
import { deleteList, useLists } from "@/saved/listSave";
import {
  removeTask,
  toggleTaskFinished,
  useTasks,
} from "@/saved/taskSave";
import { ListItem } from "@/types/List";
import { TaskFilter as Filter } from "@/types/TaskFilter";
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

  // List id the new task is being added to
  const [addingToListId, setAddingToListId] = useState<number | null>(null);

  // If the create list is open
  const [creatingList, setCreatingList] = useState(false);

  const [confirmingSelectedDelete, setConfirmingSelectedDelete] =
    useState(false);

  // Wich tasks to show in every list
  const [filter, setFilter] = useState<Filter>("all");

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

  // e.g. "2 list(s) and their tasks and 3 task(s) will be deleted..."
  const deleteParts: string[] = [];
  if (listSelection.selected.length > 0) {
    deleteParts.push(
      `${listSelection.selected.length} list(s) and their tasks`,
    );
  }
  if (taskSelection.selected.length > 0) {
    deleteParts.push(`${taskSelection.selected.length} task(s)`);
  }
  const deleteMessage =
    deleteParts.join(" and ") + " will be deleted. This can't be undone.";

  // True if any lists or tasks are selected
  const hasSelection =
    listSelection.selected.length > 0 || taskSelection.selected.length > 0;

  // Helper functions
  function handleDeleteSelected(): void {
    taskSelection.selected.forEach(removeTask);
    listSelection.selected.forEach(deleteList);
    taskSelection.clear();
    listSelection.clear();
    setConfirmingSelectedDelete(false);
  }

  function requestDeleteSelected(): void {
    if (!hasSelection) return;
    setConfirmingSelectedDelete(true);
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

      <TaskFilter
        value={filter}
        onChange={(value) => {
          setFilter(value);
          taskSelection.clear();
        }}
      />

      {/* Contents of a board */}
      <View style={styles.boardContents}>
        <FlatList<ListItem>
          horizontal
          style={{ flex: 1 }}
          data={board_lists}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.noListsMessage}>
              You have no lists, feel free to create one.
            </Text>
          }
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
              filter={filter}
            />
          )}
          extraData={{
            selectedTasks: taskSelection.selected,
            selectedLists: listSelection.selected,
            filter,
          }}
        />
      </View>

      <BoardToolbar
        onAddCard={() => setCreatingList(true)}
        addLabel="Add list"
        onDeleteCard={requestDeleteSelected}
        deleteDisabled={!hasSelection}
      />

      {/* Modal for confirming removal of selected items */}
      {confirmingSelectedDelete && (
        <DeleteSelectedModal
          message={deleteMessage}
          onConfirm={handleDeleteSelected}
          onClose={() => setConfirmingSelectedDelete(false)}
        />
      )}

      {/* Modal for task details*/}
      {viewedTask && (
        <TaskModal
          task={viewedTask}
          boardLists={board_lists}
          onClose={() => setViewedTaskId(null)}
        />
      )}

      {/* Modal for adding new task */}
      {addingToListId !== null && (
        <AddTaskModal
          listId={addingToListId}
          onClose={() => setAddingToListId(null)}
        />
      )}

      {/* Modal for editing a list */}
      {editingList && (
        <EditListModal
          list={editingList}
          currentBoard={board}
          onClose={() => setEditingListId(null)}
        />
      )}

      {/* Modal for creating a list */}
      {creatingList && (
        <CreateListModal
          boardId={board.id}
          onClose={() => setCreatingList(false)}
        />
      )}
    </View>
  );
}
