import AppButton from "@/components/appbutton/appbutton";
import BoardForm from "@/components/forms/board-form/board-form";
import { Modal } from "@/components/modal/modal";
import { BoardToolbar } from "@/components/toolbar/toolbar";
import {
  addBoards,
  deleteBoard,
  updateBoards,
  useBoards,
} from "@/saved/boardSave";
import { mildblack } from "@/styles/colors";
import { BoardItem } from "@/types/Board";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function Boards() {
  const [createBoardVisible, setCreateBoardVisible] = useState(false);
  const [editingBoard, setEditingBoard] = useState<BoardItem | null>(null);
  const [selectedBoards, setSelectedBoards] = useState<number[]>([]);
  const boards = useBoards();

  function toggleBoardSelection(boardId: number): void {
    setSelectedBoards((previousBoards) =>
      previousBoards.includes(boardId)
        ? previousBoards.filter((id) => id !== boardId)
        : [...previousBoards, boardId],
    );
  }

  function handleDeleteSelectedBoards(): void {
    selectedBoards.forEach(deleteBoard);
    setSelectedBoards([]);
  }
  return (
    <View style={styles.screen}>
      <FlatList
        data={boards}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list}
        style={styles.screen}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.card,
              selectedBoards.includes(item.id) && styles.selectedCard,
            ]}
            onLongPress={() => toggleBoardSelection(item.id)}
            onPress={() =>
              router.push({
                pathname: "/board",
                params: { id: item.id.toString() },
              })
            }
          >
            <Image
              source={{ uri: item.thumbnailPhoto }}
              style={styles.thumbnail}
            />
            <View style={styles.textBlock}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <Pressable
              style={styles.editButton}
              onPress={() => setEditingBoard(item)}
              accessibilityRole="button"
              accessibilityLabel={"Edit " + item.name}
              hitSlop={10}
            >
              <Ionicons name="pencil" size={20} color={mildblack}></Ionicons>
            </Pressable>
          </Pressable>
        )}
      />
      <View style={styles.buttonContainer}>
        <AppButton
          label="Create new board"
          onPress={() => setCreateBoardVisible(true)}
        />
      </View>
      <BoardToolbar onDeleteCard={handleDeleteSelectedBoards} />
      <Modal
        title="Create new board"
        isOpen={createBoardVisible}
        closeModal={() => setCreateBoardVisible(false)}
      >
        <BoardForm
          submitLabel="Create Board"
          onSubmit={(values) => {
            addBoards(values);
            setCreateBoardVisible(false);
          }}
        ></BoardForm>
      </Modal>

      <Modal
        title="Edit board"
        isOpen={editingBoard !== null}
        closeModal={() => setEditingBoard(null)}
      >
        {editingBoard && (
          <BoardForm
            key={editingBoard.id}
            initialValues={editingBoard}
            submitLabel="Save changes"
            onSubmit={(values) => {
              updateBoards(editingBoard.id, values);
              setEditingBoard(null);
            }}
          ></BoardForm>
        )}
      </Modal>
    </View>
  );
}
