import { Text, Pressable, View} from "react-native";
import styles from "./styles";
import { useRouter } from "expo-router";

export default function Main() {
  const router = useRouter();  
  return (
    <View style={styles.container}>
      <Text>Edit src/views/main.tsx to edit this screen
      </Text>
      <Pressable
        onPress={() => router.push("../boards")}
        style={styles.button}
        accessibilityLabel="Go to boards"
        accessibilityRole="button"
        >

        <Text style={styles.buttonText}>Boards</Text>
      </Pressable>
    </View>
  );
}


