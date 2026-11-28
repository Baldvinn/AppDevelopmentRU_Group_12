import AppButton from "@/components/appbutton/appbutton";
import { useBoards } from "@/saved/boardSave";
import { moveList, updateList } from "@/saved/listSave";
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
import { BoardItem } from "@/types/Board";
import { ListItem } from "@/types/List";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import DropdownButton from "../dropdown-button/dropdown-button";
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

//Receives list and onClose from board page.
export default function EditList({
  list,
  onClose,
  currentBoard,
}: {
  list: ListItem;
  onClose: () => void;
  currentBoard: BoardItem;
}) {
  const [name, setName] = useState(list.name);
  const [color, setColor] = useState(list.color ?? PRESET_COLORS[0]);
  const [nameError, setNameError] = useState("");

  // The board the list will be moved to when Save is pressed
  const [boardId, setBoardId] = useState(currentBoard.id);

  const boards = useBoards();

  function handleSave() {
    if (name.trim() === "") {
      setNameError("Name is required");
      return;
    }
    setNameError("");

    updateList(list.id, { name: name.trim(), color });
    moveList(list.id, boardId);
    onClose();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => {
          setName(text);
          setNameError("");
        }}
      />
      {nameError !== "" && <Text style={styles.error}>{nameError}</Text>}
      <Text style={styles.label}>Color</Text>
      <View style={styles.colorRow}>
        {PRESET_COLORS.map((presetColor) => (
          <Pressable
            key={presetColor}
            onPress={() => setColor(presetColor)}
            style={[
              styles.colorCircle,
              { backgroundColor: presetColor },
              color === presetColor && styles.colorSelected,
            ]}
          />
        ))}
      </View>

      <Text style={styles.modalLabel}>Move to Board</Text>
      <DropdownButton
        data={boards}
        currentParent={currentBoard}
        placeholder="Choose a board"
        onSelect={setBoardId}
      />
      <AppButton label="Save" onPress={handleSave} />
    </View>
  );
}
