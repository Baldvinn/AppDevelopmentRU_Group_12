import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function Main() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/images/ToodlerLogo.png")}
      ></Image>
      <Text>Welcome to Toodler</Text>
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
