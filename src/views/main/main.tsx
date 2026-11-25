import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function Main() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Welcome to Toodler
      </Text>
      <Pressable
        onPress={() => router.push("../boards")}
        style={styles.button}
        accessibilityLabel="Go to boards"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Boards</Text>
      </Pressable>

      {/*For Board View testing purposes!*/}
      <Pressable
        onPress={() =>
          router.push({ pathname: "../board", params: { id: "1" } })
        }
        style={styles.button}
        accessibilityLabel="Go to board"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Board</Text>
      </Pressable>
    </View>
  );
}
