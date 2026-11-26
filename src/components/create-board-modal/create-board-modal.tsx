import { Modal, Text, TextInput, View } from "react-native";
import styles from "./styles";

interface CreateBoardModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateBoardModal({
  visible,
  onClose,
}: CreateBoardModalProps) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Create new board</Text>
          <Text>Board name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter board name"
            placeholderTextColor="grey"
          />
          <Text>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a description"
            placeholderTextColor="grey"
            multiline
          />
          <Text>Image URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Image URL"
            placeholderTextColor="grey"
          />
          <Text onPress={onClose}>Cancel</Text>
        </View>
      </View>
    </Modal>
  );
}
