import { getTextColorFor } from "@/styles/colors";
import { ListItem } from "@/types/List";
import { TaskItem } from "@/types/Task";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import ListTask from "../list-task/list-task";
import styles from "./styles";

interface BoardListProps {
  list: ListItem;
  tasks: TaskItem[];
  selectedTasks: number[];
  isListSelected: boolean;
  onTaskPress: (id: number) => void;
  onTaskLongPress: (id: number) => void;
  onToggleTaskFinished: (id: number) => void;
  onListLongPress: (listId: number) => void;
  onAddTaskPress: (id: number) => void;
  onListPress: (id: number) => void;
}

export default function BoardList(props: BoardListProps) {
  const { width } = useWindowDimensions();
  const columnWidth = Math.min(280, width - 48);
  const headerColor = props.list.color || "#D4EAFB";
  const headerTextColor = getTextColorFor(headerColor);

  const completed = props.tasks.filter((task) => task.isFinished === true);
  const incomplete = props.tasks.filter((task) => task.isFinished === false);

  return (
    <View
      style={[
        styles.listContainer,
        { width: columnWidth },
        props.isListSelected && styles.listSelected,
      ]}
    >
      <View style={[styles.listHeader, { backgroundColor: headerColor }]}>
        <Pressable
          onPress={() => props.onAddTaskPress(props.list.id)}
          style={styles.sideAction}
        >
          <Ionicons name="add-circle" size={24} color={headerTextColor} />
        </Pressable>
        <Pressable
          accessibilityLabel={"Add task"}
          onLongPress={() => props.onListLongPress(props.list.id)}
          onPress={() => props.onListPress(props.list.id)}
          style={{ flex: 1 }}
        >
          <Text style={[styles.listName, { color: headerTextColor }]}>
            {props.list.name}
          </Text>
        </Pressable>
        <Pressable
          style={styles.sideAction}
          onPress={() =>
            router.push({
              pathname: "/edit-list",
              params: { id: props.list.id.toString() },
            })
          }
        >
          <Ionicons name="pencil" size={16} color={headerTextColor} />
          <Text style={[styles.editText, { color: headerTextColor }]}>
            Edit
          </Text>
        </Pressable>
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
