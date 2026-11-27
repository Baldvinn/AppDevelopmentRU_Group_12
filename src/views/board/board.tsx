import BoardList from "@/components/board-list/board-list";
import CheckButton from "@/components/check-button/check-button";
import { Modal } from "@/components/modal/modal";
import { useBoards } from "@/saved/boardSave";
import { useLists } from "@/saved/listSave";
import { addTask, toggleTaskFinished, useTasks } from "@/saved/taskSave";
import { ListItem } from "@/types/List";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import styles from "./styles";
import { BoardToolbar } from "@/components/toolbar/toolbar";
import { deleteList } from "@/saved/listSave";

export default function Board() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Fetch all items
  const boards = useBoards();
  const tasks = useTasks();
  const lists = useLists();

  // All selected tasks
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  // All selected lists
  const [selectedLists, setSelectedLists] = useState<number[]>([]);

  // Id of open task in modal
  const [viewedTaskId, setViewedTaskId] = useState<number | null>(null);

  // Find the appropriate board
  const board = boards.find((item) => item.id === Number(id));

  const onCreateTask = (name: string, description: string, listId: number) => {
    addTask({ name, description, listId, isFinished: false });
  };

  if (!board) {
    return <Text>Board not found</Text>;
  }

  // All lists on this board
  const board_lists: ListItem[] = lists.filter(
    (list) => list.boardId === board.id,
  );

  const viewedTask = tasks.find((task) => task.id === viewedTaskId);

  // Helper functions
  function onTaskLongPress(taskId: number): void {
    setSelectedTasks((previousTasks) => {
      if (previousTasks.includes(taskId)) {
        return previousTasks.filter((id) => id !== taskId);
      } else {
        return [...previousTasks, taskId];
      }
    });
  }

  function onListLongPress (listId: number):void {
    setSelectedLists((previousLists) => {
      if (previousLists.includes(listId)) {
        return previousLists.filter((id) => id !== listId);
      }
      return [...previousLists, listId];
    });
  }

  function handleDeleteSelectedLists(): void {
    selectedLists.forEach(deleteList);
    setSelectedLists([]);
  }

  function onTaskPress(taskId: number): void {
    if (selectedTasks.length > 0) {
      onTaskLongPress(taskId);
    } else {
      setViewedTaskId(taskId);
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
              selectedTasks={selectedTasks}
              onTaskPress={onTaskPress}
              onTaskLongPress={onTaskLongPress}
              onToggleTaskFinished={toggleTaskFinished}
              onCreateTask={onCreateTask}
              isListSelected={selectedLists.includes(item.id)}
              onListLongPress={onListLongPress}
            />
          )}
          extraData={{ selectedTasks, selectedLists}}
        />
      </View>
      <BoardToolbar onDeleteCard={handleDeleteSelectedLists} />
      {/* Modal for viewing tasks*/}
      {viewedTask && (
        <Modal
          title={viewedTask.name}
          isOpen={true}
          closeModal={() => setViewedTaskId(null)}
        >
          <Text>{viewedTask.description}</Text>
          <CheckButton
            task={viewedTask}
            onToggleTaskFinished={toggleTaskFinished}
          />
        </Modal>
      )}
    </View>
  );
}
