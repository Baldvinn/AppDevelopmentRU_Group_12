import AppButton from "@/components/appbutton/appbutton";
import { useState } from "react";
import { Text, TextInput } from "react-native";
import styles from "../styles";

export interface BoardFormValues {
  name: string;
  description: string;
  thumbnailPhoto: string;
}

interface BoardFormProps {
  initialValues?: BoardFormValues;
  submitLabel: string;
  onSubmit: (values: BoardFormValues) => void;
}

const emptyValues: BoardFormValues = {
  name: "",
  description: "",
  thumbnailPhoto: "",
};

export default function BoardForm({
  initialValues = emptyValues,
  submitLabel,
  onSubmit,
}: BoardFormProps) {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [thumbnailPhoto, setThumbnailPhoto] = useState(
    initialValues.thumbnailPhoto,
  );
  const [nameError, setNameError] = useState("");
  const [photoError, setPhotoError] = useState("");

  function handleSubmit() {
    const nameMissing = name.trim() === "";
    const photoMissing = thumbnailPhoto.trim() === "";
    setNameError(nameMissing ? "Name is required" : "");
    setPhotoError(photoMissing ? "Image URL is required" : "");
    if (nameMissing || photoMissing) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      thumbnailPhoto: thumbnailPhoto.trim(),
    });
  }

  return (
    <>
      <Text>Board name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter board name"
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

      <Text>Image URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Image URL"
        placeholderTextColor="grey"
        value={thumbnailPhoto}
        onChangeText={(text) => {
          setThumbnailPhoto(text);
          setPhotoError("");
        }}
      />
      {photoError !== "" && <Text style={styles.error}>{photoError}</Text>}

      <AppButton
        label={submitLabel}
        marginTop={10}
        onPress={handleSubmit}
      ></AppButton>
    </>
  );
}
