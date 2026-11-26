import AppButton from "@/components/appbutton/appbutton";
import { useBoards } from "@/saved/boardSave";
import { router } from "expo-router";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function Boards() {
  const boards = useBoards();
  return (
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
      ListFooterComponent={
        <AppButton
          label="Create new board"
          onPress={() => console.log("Create board pressed")}
        />
      }
    />
  );
}
