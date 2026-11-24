import { ListItem } from "@/types/List";
import { TaskItem } from "@/types/Task";
import { FlatList, Text, View } from "react-native";
import { tasks } from "../../resources/data.json";
import ListTask from "../list-task/list-task";
import styles from "./styles";

interface BoardListProps {
  list: ListItem;
}

export default function BoardList({ list }: BoardListProps) {
  const list_tasks: TaskItem[] = tasks.filter(
    (task) => task.listId === list.id,
  );

  return (
    <View style={styles.listContainer}>
      <Text>{list.name}</Text>

      <FlatList<TaskItem>
        data={list_tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListTask task={item} />}
      />
    </View>
  );
}
