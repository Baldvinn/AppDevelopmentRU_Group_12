import AppButton from "@/components/appbutton/appbutton";
import BoardForm from "@/components/board-form/board-form";
import { Modal } from "@/components/modal/modal";
import { addBoards, useBoards } from "@/saved/boardSave";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function Boards() {
  const [createBoardVisible, setCreateBoardVisible] = useState(false);
  const boards = useBoards();
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
            style={styles.card}
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
          </Pressable>
        )}
      />
      <View style={styles.buttonContainer}>
        <AppButton
          label="Create new board"
          onPress={() => setCreateBoardVisible(true)}
        />
      </View>

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
    </View>
  );
}
