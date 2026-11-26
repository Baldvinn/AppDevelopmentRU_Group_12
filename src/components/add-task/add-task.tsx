import { Pressable, TextInput, Text, View } from "react-native";
import { useState } from 'react'
import styles from "./styles";
interface AddTaskProps {
  onAddTask: (name: string, description: string) => void;
}

export default function AddTask({ onAddTask }: AddTaskProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


function handleAdd() {
  const trimmedName = name.trim();
  if (!trimmedName) return;

  onAddTask(trimmedName, description.trim());
  setName("");
  setDescription("");
}
return (
  <View style={styles.formContainer}>
  <TextInput style={styles.inputText} value={name} onChangeText={setName} placeholder="Task name..."/>
  <TextInput style={styles.inputText} value={description} onChangeText={setDescription} placeholder="Description..."/>
  <Pressable style={styles.addTaskContainer} onPress={handleAdd}>
    <Text style={styles.addTaskText}>Add Task</Text>
  </Pressable>
  </View>
)
}