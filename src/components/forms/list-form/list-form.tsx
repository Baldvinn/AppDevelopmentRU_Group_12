import AppButton from "@/components/appbutton/appbutton";
import { useState } from "react";
import { Text, TextInput } from "react-native";
import styles from "../styles";

export interface ListFormValues {
  name: string;
  color?: string;
}

interface ListFormProps {
  initialValues?: ListFormValues;
  submitLabel: string;
  onSubmit: (values: ListFormValues) => void;
}

const emptyValues: ListFormValues = {
  name: "",
  color: "",
};

export default function ListForm({
  initialValues = emptyValues,
  submitLabel,
  onSubmit,
}: ListFormProps) {
  const [name, setName] = useState(initialValues.name);
  const [color, setColor] = useState(initialValues.color);

  const [nameError, setNameError] = useState("");

  function handleSubmit() {
    const nameMissing = name.trim() === "";
    setNameError(nameMissing ? "Name is required" : "");

    onSubmit({
      name: name.trim(),
      color: color?.trim(),
    });
  }

  return (
    <>
      <Text>List name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter list name"
        placeholderTextColor="grey"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setNameError("");
        }}
      />
      {nameError !== "" && <Text style={styles.error}>{nameError}</Text>}

      <Text>Color</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a description"
        placeholderTextColor="grey"
        value={color}
        onChangeText={setColor}
      />

      <AppButton
        label={submitLabel}
        marginTop={10}
        onPress={handleSubmit}
      ></AppButton>
    </>
  );
}
