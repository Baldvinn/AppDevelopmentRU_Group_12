import { ListItem } from "@/types/List";
import { TaskItem } from "@/types/Task";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import * as colors from "../../styles/colors";
import AppButton from "../appbutton/appbutton";
import CheckButton from "../check-button/check-button";
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
      <View style={styles.modalDropdownSection}>
        <Text style={styles.modalLabel}>Move to list</Text>
        <SelectDropdown
          data={props.boardLists}
          defaultValue={currentList}
          onSelect={(selectedList: ListItem) =>
            props.onMoveTask(props.task.id, selectedList.id)
          }
          renderButton={(selectedList: ListItem | null, isOpened: boolean) => (
            <View style={styles.dropdownButton}>
              <Text>{selectedList?.name ?? "Choose a list"}</Text>
              <AntDesign
                name={isOpened ? "up" : "down"}
                size={14}
                color={colors.mildblack}
              />
            </View>
          )}
          renderItem={(list: ListItem, index: number, isSelected: boolean) => (
            <View
              style={[
                styles.dropdownItem,
                isSelected && styles.dropdownItemSelected,
              ]}
            >
              <Text>{list.name}</Text>
            </View>
          )}
        />
      </View>

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
          <AppButton label={"Remove"} onPress={(props.onRemove)} marginTop={0} />
        </View>
      </View>
    </View>
  );
}
