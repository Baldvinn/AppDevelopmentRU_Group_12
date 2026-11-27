import AppButton from "@/components/appbutton/appbutton";
import { useState } from "react";
import { Text, TextInput } from "react-native";
import styles from "../styles";

export interface TaskFormValues {
  name: string;
  description: string;
}

interface TaskFormProps {
  initialValues?: TaskFormValues;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => void;
}

const emptyValues: TaskFormValues = {
  name: "",
  description: "",
};

export default function TaskForm({
  initialValues = emptyValues,
  submitLabel,
  onSubmit,
}: TaskFormProps) {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [nameError, setNameError] = useState("");

  function handleSubmit() {
    const nameMissing = name.trim() === "";
    setNameError(nameMissing ? "Name is required" : "");
    if (nameMissing) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
    });
  }

  return (
    <>
      <Text>Task name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        placeholderTextColor="grey"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setNameError("");
        }}
      />
      {nameError !== "" && <Text style={styles.error}>{nameError}</Text>}

      <Text>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a description"
        placeholderTextColor="grey"
        value={description}
        onChangeText={setDescription}
      />

      <AppButton
        label={submitLabel}
        marginTop={10}
        onPress={handleSubmit}
      ></AppButton>
    </>
  );
}
