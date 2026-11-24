import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { boards, lists, tasks } from "../../resources/data.json";
import styles from "./styles";

export default function Task() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const task = tasks.find((item) => item.id === Number(id));
  const list = lists.find((item) => item.id === task?.listId);
  const board = boards.find((item) => item.id === list?.boardId);

  if (!task) {
    return <Text>Task not found</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>{task.name}</Text>

        <Text style={styles.taskStatus}>
          {task.isFinished ? "✓ Completed" : "○ Not Completed"}
        </Text>

        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>

        <Text style={styles.descriptionLabel}>List</Text>
        <Text>{list?.name ?? "Unknown list"}</Text>

        <Text style={styles.descriptionLabel}>Board</Text>

        <Pressable disabled={!board} onPress={() => board && router.back()}>
          <Text style={styles.boardLink}>{board?.name ?? "unknown board"}</Text>
        </Pressable>
      </View>
    </View>
  );
}
