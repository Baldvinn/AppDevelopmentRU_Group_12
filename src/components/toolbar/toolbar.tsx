import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


type BoardToolbarProps = {
  onAddCard?: () => void;
  onDeleteCard: () => void;
};

export function BoardToolbar({ onAddCard, onDeleteCard }: BoardToolbarProps) {
  return (
    <View style={styles.container}>
      {onAddCard && (
        <Pressable onPress={onAddCard} style={styles.button}>
          {bookIcon}
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
      )}
      <Pressable onPress={onDeleteCard} style={styles.button}>
        {trashIcon}
        <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
    </View>
  );
}

export const bookIcon = <SimpleLineIcons name="notebook" size={24} color="black" />;
export const trashIcon = <FontAwesome6 name="trash-can" size={24} color="black" />