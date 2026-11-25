import { ListItem } from "@/types/List";
import { TaskItem } from "@/types/Task";
import { FlatList, Text, useWindowDimensions, View } from "react-native";
import ListTask from "../list-task/list-task";
import styles from "./styles";

interface BoardListProps {
  list: ListItem;
  tasks: TaskItem[];
  selectedTasks: number[];
  onTaskPress: (id: number) => void;
  onTaskLongPress: (id: number) => void;
  onToggleTaskFinished: (id: number) => void;
}

export default function BoardList(props: BoardListProps) {
  const { width } = useWindowDimensions();
  const columnWidth = Math.min(280, width - 48);

  return (
    <View style={[styles.listContainer, { width: columnWidth }]}>
      <View
        style={[
          styles.listHeader,
          { backgroundColor: props.list.color || "#D4EAFB" },
        ]}
      >
        <Text style={styles.listName}>{props.list.name}</Text>
      </View>

      <FlatList<TaskItem>
        style={styles.taskList}
        contentContainerStyle={styles.listContent}
        data={props.tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListTask
            task={item}
            isSelected={props.selectedTasks.includes(item.id)}
            onTaskPress={props.onTaskPress}
            onTaskLongPress={props.onTaskLongPress}
            onToggleTaskFinished={props.onToggleTaskFinished}
          />
        )}
        extraData={props.selectedTasks}
      />
    </View>
  );
}
