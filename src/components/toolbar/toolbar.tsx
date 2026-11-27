import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type BoardToolbarProps = {
  onAddCard: () => void;
};

export function BoardToolbar({ onAddCard }: BoardToolbarProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onAddCard} style={styles.button}>
        {bookIcon}
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>
    </View>
  );
}

export const bookIcon = (
  <SimpleLineIcons name="notebook" size={24} color="black" />
);
