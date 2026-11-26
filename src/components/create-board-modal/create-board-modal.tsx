import AppButton from "@/components/appbutton/appbutton";
import { Modal, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { useState } from "react";

interface CreateBoardModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateBoardModal({
  visible,
  onClose,
}: CreateBoardModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailPhoto, setThumbnailPhoto] = useState("");
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
            value={name}
            onChangeText={setName}
          />
          <Text>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a description"
            placeholderTextColor="grey"
            value={description}
            onChangeText={setDescription}
          />
          <Text>Image URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Image URL"
            placeholderTextColor="grey"
            value={thumbnailPhoto}
            onChangeText={setThumbnailPhoto}
          />
          <AppButton
            label="Create new board"
            marginTop={10}
            onPress={() => {}}
          ></AppButton>
          <AppButton
            label="Cancel"
            marginTop={10}
            onPress={onClose}
          ></AppButton>
        </View>
      </View>
    </Modal>
  );
}
