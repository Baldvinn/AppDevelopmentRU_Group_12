import { ListItem } from "@/types/List";
import { TaskItem } from "@/types/Task";
import { Text, View } from "react-native";
import AppButton from "../appbutton/appbutton";
import CheckButton from "../check-button/check-button";
import DropdownButton from "../dropdown-button/dropdown-button";
import styles from "./styles";

interface TaskDetailProps {
  boardLists: ListItem[];
  task: TaskItem;
  onOpenEditing: () => void;
  onToggleTaskFinished: (id: number) => void;
  onMoveTask: (id: number, listId: number) => void;
  onRemove: () => void;
}

export default function TaskDetails(props: TaskDetailProps) {
  const currentList = props.boardLists.find(
    (list) => list.id === props.task?.listId,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.modalLabel}>Description</Text>
      <Text style={styles.modalDescription}>{props.task.description}</Text>

      <View style={styles.modalDivider} />

      <CheckButton
        task={props.task}
        onToggleTaskFinished={props.onToggleTaskFinished}
        label={true}
      />

      <View style={styles.modalDivider} />

      {/* Dropdown menu for moving tasks */}
      <Text style={styles.modalLabel}>Move to List</Text>
      <DropdownButton
        data={props.boardLists}
        currentParent={currentList}
        placeholder="Choose a list"
        onSelect={(listId) => props.onMoveTask(props.task.id, listId)}
      />

      <View style={styles.modalDivider} />

      {/*Edit or remove task*/}
      <View style={styles.editRemoveTaskButtons}>
        <View style={styles.modalButton}>
          <AppButton
            label={"Edit"}
            onPress={props.onOpenEditing}
            marginTop={0}
          />
        </View>
        <View style={styles.modalButton}>
          <AppButton label={"Remove"} onPress={props.onRemove} marginTop={0} />
        </View>
      </View>
    </View>
  );
}
