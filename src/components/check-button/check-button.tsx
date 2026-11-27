import { TaskItem } from "@/types/Task";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

interface CheckButtonProps {
  task: TaskItem;
  onToggleTaskFinished: (id: number) => void;
  label?: boolean;
}

export default function CheckButton(props: CheckButtonProps) {
  return (
    <Pressable
      style={[styles.checkButton, props.label && styles.withLabel]}
      onPress={() => props.onToggleTaskFinished(props.task.id)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: props.task.isFinished }}
      hitSlop={8}
    >
      {props.task.isFinished ? (
        <AntDesign name="check-circle" size={24} color="#16A34A" />
      ) : (
        <View style={styles.emptyCircle} />
      )}
      {props.label && (
        <Text
          style={[styles.labelText, props.task.isFinished && styles.labelDone]}
        >
          {props.task.isFinished ? "Completed" : "Mark as complete"}
        </Text>
      )}
    </Pressable>
  );
}
