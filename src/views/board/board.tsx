import BoardList from "@/components/board-list/board-list";
import { ListItem } from "@/types/List";
import { TaskItem } from "@/types/Task";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import {
  boards,
  tasks as initialTasks,
  lists,
} from "../../resources/data.json";
import styles from "./styles";

export default function Board() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const board = boards.find((item) => item.id === Number(id));

  // All Tasks within application directory
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  // All selected tasks
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  if (!board) {
    return <Text>Board not found</Text>;
  }

  const board_lists: ListItem[] = lists.filter(
    (list) => list.boardId === board.id,
  );

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

  function onTaskPress(taskId: number): void {
    if (selectedTasks.length > 0) {
      onTaskLongPress(taskId);
    } else {
      router.push({
        pathname: "/task",
        params: { id: taskId.toString() },
      });
    }
  }

  function onToggleTaskFinished(taskId: number): void {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, isFinished: !task.isFinished } : task,
      ),
    );
  }

  return (
    <View style={styles.boardContainer}>
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
              onToggleTaskFinished={onToggleTaskFinished}
            />
          )}
          extraData={{ tasks, selectedTasks }}
        />
      </View>
    </View>
  );
}
