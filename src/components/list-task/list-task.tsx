import { TaskItem } from "@/types/Task";
import { Text, View } from "react-native";

interface TaskProps {
  task: TaskItem;
}

export default function ListTask({ task }: TaskProps) {
  return (
    <View>
      <Text>{task.name}</Text>
      <Text>{task.description}</Text>
    </View>
  );
}
