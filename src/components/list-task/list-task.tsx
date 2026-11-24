import { headings } from "@/styles/headings";
import { TaskItem } from "@/types/Task";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

interface TaskProps {
  task: TaskItem;
}

export default function ListTask({ task }: TaskProps) {
  return (
    <Pressable
      style={styles.taskCard}
      onPress={() =>
        router.push({
          pathname: "/task",
          params: { id: task.id.toString() },
        })
      }
    >
      <View style={styles.taskHeader}>
        <Text style={headings.h4}>{task.name}</Text>
        <Text>{task.isFinished ? "✓" : "○"}</Text>
      </View>
      <Text>{task.description}</Text>
    </Pressable>
  );
}
