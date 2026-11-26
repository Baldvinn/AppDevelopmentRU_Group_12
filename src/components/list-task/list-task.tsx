import { headings } from "@/styles/headings";
import { TaskItem } from "@/types/Task";
import { Pressable, Text, View } from "react-native";
import CheckButton from "../check-button/check-button";
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

        <CheckButton
          task={props.task}
          onToggleTaskFinished={props.onToggleTaskFinished}
        />
      </View>
      <Text>{props.task.description}</Text>
    </Pressable>
  );
}
