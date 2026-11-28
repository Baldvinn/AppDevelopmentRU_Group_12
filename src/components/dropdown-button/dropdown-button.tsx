import { BoardItem } from "@/types/Board";
import { ListItem } from "@/types/List";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import * as colors from "../../styles/colors";
import styles from "./styles";

interface DropdownButtonProps {
  data: ListItem[] | BoardItem[];
  currentParent?: ListItem | BoardItem;
  placeholder?: string;
  onSelect: (id: number) => void;
}

export default function DropdownButton(props: DropdownButtonProps) {
  return (
    <View style={styles.modalDropdownSection}>
      <SelectDropdown
        data={props.data}
        defaultValue={props.currentParent}
        onSelect={(selectedParent: ListItem | BoardItem) =>
          props.onSelect(selectedParent.id)
        }
        renderButton={(
          selectedParent: ListItem | BoardItem | null,
          isOpened: boolean,
        ) => (
          <View style={styles.dropdownButton}>
            <Text>
              {selectedParent?.name ?? props.placeholder ?? "Choose..."}
            </Text>
            <AntDesign
              name={isOpened ? "up" : "down"}
              size={14}
              color={colors.mildblack}
            />
          </View>
        )}
        renderItem={(
          item: ListItem | BoardItem,
          index: number,
          isSelected: boolean,
        ) => (
          <View
            style={[
              styles.dropdownItem,
              isSelected && styles.dropdownItemSelected,
            ]}
          >
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
