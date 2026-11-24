import { ListItem } from "@/types/List";
import { TaskItem } from "@/types/Task";
import { FlatList, View } from "react-native";
import { tasks } from "../../resources/data.json";
import ListTask from "../list-task/list-task";
import styles from "./styles";

interface BoardListProps {
  list: ListItem;
}

export default function BoardList({ list }: BoardListProps) {
  const list_tasks = tasks as unknown as TaskItem[];
  return (
    <View style={styles.listContainer}>
      <FlatList<ListItem>
        numColumns={1}
        data={list_tasks}
        renderItem={({ item }) => <ListTask task={item} />}
      />
    </View>
  );
}
