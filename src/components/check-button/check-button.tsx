import { TaskItem } from "@/types/Task";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import styles from "./styles";

interface CheckButtonProps {
  task: TaskItem;
  onToggleTaskFinished: (id: number) => void;
}

export default function CheckButton(props: CheckButtonProps) {
  return (
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
  );
}
