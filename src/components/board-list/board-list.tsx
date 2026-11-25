import { ListItem } from "@/types/List";
import { TaskItem } from "@/types/Task";
import { FlatList, Text, useWindowDimensions, View } from "react-native";
import { tasks } from "../../resources/data.json";
import ListTask from "../list-task/list-task";
import styles from "./styles";

interface BoardListProps {
  list: ListItem;
  selectedTasks: number[];
  onTaskLongPress: (id: number) => void;
}

export default function BoardList({
  list,
  selectedTasks,
  onTaskLongPress,
}: BoardListProps) {
  const { width } = useWindowDimensions();
  const columnWidth = Math.min(280, width - 48);

  const list_tasks: TaskItem[] = tasks.filter(
    (task) => task.listId === list.id,
  );

  return (
    <View style={[styles.listContainer, { width: columnWidth }]}>
      <View
        style={[
          styles.listHeader,
          { backgroundColor: list.color || "#D4EAFB" },
        ]}
      >
        <Text style={styles.listName}>{list.name}</Text>
      </View>

      <FlatList<TaskItem>
        style={styles.taskList}
        contentContainerStyle={styles.listContent}
        data={list_tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListTask
            task={item}
            isSelected={selectedTasks.includes(item.id)}
            onTaskLongPress={onTaskLongPress}
          />
        )}
      />
    </View>
  );
}
