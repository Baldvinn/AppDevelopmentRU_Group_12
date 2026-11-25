import { headings } from "@/styles/headings";
import { TaskItem } from "@/types/Task";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

interface TaskProps {
  task: TaskItem;
  isSelected: boolean;
  onTaskPress: (id: number) => void;
  onTaskLongPress: (id: number) => void;
  onToggleTaskFinished: (id: number) => void;
}

export default function ListTask(props: TaskProps) {
  return (
    <Pressable
      style={[styles.taskCard, props.isSelected && styles.selectedTask]}
      onPress={() => props.onTaskPress(props.task.id)}
      onLongPress={() => props.onTaskLongPress(props.task.id)}
    >
      <View style={styles.taskHeader}>
        <Text
          key={`${props.task.id}-${props.task.isFinished}`}
          style={[
            headings.h4,
            styles.taskName,
            props.task.isFinished && styles.finishedTaskName,
          ]}
        >
          {props.task.name}
        </Text>

        <Pressable
          style={styles.checkButton}
          onPress={() => props.onToggleTaskFinished(props.task.id)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: props.task.isFinished }}
        >
          {props.task.isFinished ? (
            <AntDesign name="check-circle" size={24} color="#16A34A" />
          ) : (
            <View style={styles.emptyCircle} />
          )}
        </Pressable>
      </View>
      <Text>{props.task.description}</Text>
    </Pressable>
  );
}
