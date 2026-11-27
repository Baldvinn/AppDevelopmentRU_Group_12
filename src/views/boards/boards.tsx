import AppButton from "@/components/appbutton/appbutton";
import BoardForm from "@/components/board-form/board-form";
import ConfirmDelete from "@/components/confirm-delete/confirm-delete";
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
  const [confirmingEditDelete, setConfirmingEditDelete] = useState(false);
  const [selectedBoards, setSelectedBoards] = useState<number[]>([]);
  const [confirmSelectedDelete, setConfirmSelectedDelete] = useState(false);
  const boards = useBoards();

  function toggleBoardSelection(boardId: number): void {
    setSelectedBoards((previousBoards) =>
      previousBoards.includes(boardId)
        ? previousBoards.filter((id) => id !== boardId)
        : [...previousBoards, boardId],
    );
  }

  function onBoardPress(boardId: number): void {
    if (selectedBoards.length > 0) {
      toggleBoardSelection(boardId);
    } else {
      router.push({ pathname: "/board", params: { id: boardId.toString() } });
    }
  }

  function requestDeleteSelectedBoards(): void {
    if (selectedBoards.length === 0) return;
    setConfirmSelectedDelete(true);
  }

  function handleDeleteSelectedBoards(): void {
    selectedBoards.forEach(deleteBoard);
    setSelectedBoards([]);
    setConfirmSelectedDelete(false);
  }
  function closeEditBoard(): void {
    setEditingBoard(null);
    setConfirmingEditDelete(false);
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
            onPress={() => onBoardPress(item.id)}
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
      <BoardToolbar onDeleteCard={requestDeleteSelectedBoards} />
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
        title={confirmingEditDelete ? "Delete board?" : "Edit board"}
        isOpen={editingBoard !== null}
        closeModal={closeEditBoard}
      >
        {editingBoard && !confirmingEditDelete && (
          <>
            <BoardForm
              key={editingBoard.id}
              initialValues={editingBoard}
              submitLabel="Save changes"
              onSubmit={(values) => {
                updateBoards(editingBoard.id, values);
                closeEditBoard();
              }}
            ></BoardForm>
            <AppButton
              label="Delete board"
              marginTop={10}
              onPress={() => setConfirmingEditDelete(true)}
            ></AppButton>
          </>
        )}
        {editingBoard && confirmingEditDelete && (
          <ConfirmDelete
            message={
              '"' +
              editingBoard.name +
              "\" and all of its lists and tasks will be deleted. This can't be undone."
            }
            onConfirm={() => {
              deleteBoard(editingBoard.id);
              setSelectedBoards((ids) =>
                ids.filter((id) => id !== editingBoard.id),
              );
              closeEditBoard();
            }}
            onCancel={() => setConfirmingEditDelete(false)}
          ></ConfirmDelete>
        )}
      </Modal>
      <Modal
        title="Delete boards?"
        isOpen={confirmSelectedDelete}
        closeModal={() => setConfirmSelectedDelete(false)}
      >
        <ConfirmDelete
          message={
            selectedBoards.length +
            " board(s) and all of their lists and tasks will be deleted. This can't be undone."
          }
          onConfirm={handleDeleteSelectedBoards}
          onCancel={() => setConfirmSelectedDelete(false)}
        ></ConfirmDelete>
      </Modal>
    </View>
  );
}
