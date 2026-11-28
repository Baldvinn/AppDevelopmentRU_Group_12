import DeleteBoardsModal from "@/components/delete-board-modal/delete-board-modal";
import EditBoardModal from "@/components/edit-board-modal/edit-board-modal";
import CreateBoardModal from "@/components/create-board-modal/create-board-modal";
import AppButton from "@/components/appbutton/appbutton";
import { BoardToolbar } from "@/components/toolbar/toolbar";
import { useSelection } from "@/hooks/useSelection";
import {
  deleteBoard,
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
  const boardsSelection = useSelection();
  const [createBoardVisible, setCreateBoardVisible] = useState(false);
  const [editingBoard, setEditingBoard] = useState<BoardItem | null>(null);
  const [confirmSelectedDelete, setConfirmSelectedDelete] = useState(false);
  const boards = useBoards();

  function onBoardPress(boardId: number): void {
    if (boardsSelection.selected.length > 0) {
      boardsSelection.toggle(boardId);
    } else {
      router.push({ pathname: "/board", params: { id: boardId.toString() } });
    }
  }

  function requestDeleteSelectedBoards(): void {
    if (boardsSelection.selected.length === 0) return;
    setConfirmSelectedDelete(true);
  }

  function handleDeleteSelectedBoards(): void {
    boardsSelection.selected.forEach(deleteBoard);
    boardsSelection.clear();
    setConfirmSelectedDelete(false);
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={boards}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list}
        style={styles.screen}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.noBoardsMessage}>
            You have no boards, feel free to create one.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.card,
              boardsSelection.isSelected(item.id) && styles.selectedCard,
            ]}
            onLongPress={() => boardsSelection.toggle(item.id)}
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
            {boardsSelection.selected.length === 0 && (
              <Pressable
                style={styles.editButton}
                onPress={() => setEditingBoard(item)}
                accessibilityRole="button"
                accessibilityLabel={"Edit " + item.name}
                hitSlop={10}
              >
                <Ionicons name="pencil" size={20} color={mildblack}></Ionicons>
              </Pressable>
            )}
          </Pressable>
        )}
      />
      <View style={styles.buttonContainer}>
        <BoardToolbar
          style={{ alignSelf: "flex-start" }}
          onDeleteCard={requestDeleteSelectedBoards}
          deleteDisabled={boardsSelection.selected.length === 0}
        />
        <AppButton
          label="Create new board"
          onPress={() => setCreateBoardVisible(true)}
        />
      </View>
      {createBoardVisible && (
        <CreateBoardModal onClose={() => setCreateBoardVisible(false)} />
      )}

      {editingBoard && (
        <EditBoardModal
          board={editingBoard}
          onClose={() => setEditingBoard(null)}
        />
      )}
      {confirmSelectedDelete && (
        <DeleteBoardsModal
          count={boardsSelection.selected.length}
          onConfirm={handleDeleteSelectedBoards}
          onClose={() => setConfirmSelectedDelete(false)}
        />
      )}
    </View>
  );
}
