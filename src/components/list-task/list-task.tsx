import { headings } from "@/styles/headings";
import { TaskItem } from "@/types/Task";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

interface TaskProps {
  task: TaskItem;
  isSelected: boolean;
  onTaskLongPress: (id: number) => void;
}

export default function ListTask({
  task,
  isSelected,
  onTaskLongPress,
}: TaskProps) {
  return (
    <Pressable
      style={[styles.taskCard, isSelected && styles.selectedTask]}
      onLongPress={() => onTaskLongPress(task.id)}
      onPress={() => {
        if (!isSelected) {
          router.push({
            pathname: "/task",
            params: { id: task.id.toString() },
          });
        }
      }}
    >
      <View style={styles.taskHeader}>
        <Text style={headings.h4}>{task.name}</Text>
        <Text>{task.isFinished ? "✓" : "○"}</Text>
      </View>
      <Text>{task.description}</Text>
    </Pressable>
  );
}
