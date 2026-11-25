import BoardList from "@/components/board-list/board-list";
import { ListItem } from "@/types/List";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { boards, lists } from "../../resources/data.json";
import styles from "./styles";

export default function Board() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const board = boards.find((item) => item.id === Number(id));

  if (!board) {
    return <Text>Board not found</Text>;
  }

  const board_lists: ListItem[] = lists.filter(
    (list) => list.boardId === board.id,
  );

  return (
    <View style={styles.boardContainer}>
      <View style={styles.boardHeader}>
        <Text style={styles.boardName}>{board.name}</Text>
      </View>

      <View style={styles.boardContents}>
        <FlatList<ListItem>
          horizontal
          data={board_lists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BoardList list={item} />}
        />
      </View>
    </View>
  );
}
