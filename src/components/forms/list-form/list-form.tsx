import AppButton from "@/components/appbutton/appbutton";
import {
  listBlue,
  listDarkGrey,
  listGreen,
  listGrey,
  listLightGrey,
  listMagenta,
  listRed,
  listWhite,
} from "@/styles/colors";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import styles from "../styles";

const PRESET_COLORS = [
  listWhite,
  listGreen,
  listLightGrey,
  listGrey,
  listDarkGrey,
  listRed,
  listBlue,
  listMagenta,
];

export interface ListFormValues {
  name: string;
  color: string;
}

interface ListFormProps {
  initialValues?: ListFormValues;
  submitLabel: string;
  onSubmit: (values: ListFormValues) => void;
}

const emptyValues: ListFormValues = {
  name: "",
  color: PRESET_COLORS[0],
};

export default function ListForm({
  initialValues = emptyValues,
  submitLabel,
  onSubmit,
}: ListFormProps) {
  const [name, setName] = useState(initialValues.name);
  const [color, setColor] = useState(initialValues.color || PRESET_COLORS[0]);
  const [nameError, setNameError] = useState("");

  function handleSubmit() {
    const nameMissing = name.trim() === "";
    setNameError(nameMissing ? "Name is required" : "");
    if (nameMissing) return;

    onSubmit({ name: name.trim(), color });
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
      <View style={styles.colorRow}>
        {PRESET_COLORS.map((presetColor) => (
          <Pressable
            key={presetColor}
            onPress={() => setColor(presetColor)}
            accessibilityLabel={"Color " + presetColor}
            style={[
              styles.colorCircle,
              { backgroundColor: presetColor },
              color === presetColor && styles.colorSelected,
            ]}
          />
        ))}
      </View>

      <AppButton
        label={submitLabel}
        marginTop={10}
        onPress={handleSubmit}
      ></AppButton>
    </>
  );
}
