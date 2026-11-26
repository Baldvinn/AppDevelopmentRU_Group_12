import AppButton from "@/components/appbutton/appbutton";
import { updateList, useLists } from "@/saved/listSave";
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
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import styles from "./styles";

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

export default function EditList() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lists = useLists();
  const list = lists.find((item) => item.id === Number(id));
  const [name, setname] = useState(list?.name ?? "");
  const [color, setcolor] = useState(list?.color ?? PRESET_COLORS[0]);
  const [nameError, setNameError] = useState("");

  if (!list) {
    return <Text>List could not load, try again later.</Text>;
  }

  function handleSave() {
    if (!list) return;
    if (name.trim() === "") {
      setNameError("Name is required");
      return;
    }
    setNameError("");

    updateList(list.id, { name: name.trim(), color });
    router.back();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => {
          setname(text);
          setNameError("");
        }}
      />
      {nameError !== "" && <Text style={styles.error}>{nameError}</Text>}
      <Text style={styles.label}>Color</Text>
      <View style={styles.colorRow}>
        {PRESET_COLORS.map((presetColor) => (
          <Pressable
            key={presetColor}
            onPress={() => setcolor(presetColor)}
            style={[
              styles.colorCircle,
              { backgroundColor: presetColor },
              color === presetColor && styles.colorSelected,
            ]}
          />
        ))}
      </View>
      <AppButton label="Save" onPress={handleSave} />
    </View>
  );
}
