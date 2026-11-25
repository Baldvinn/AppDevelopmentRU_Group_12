import { Stack, router } from "expo-router";
import { Pressable, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000000",
          headerTitle: () => (
            <Pressable
              onPress={() => router.dismissTo("/")}
              accessibilityRole="button"
              accessibilityLabel="Go to Toodler home"
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                Toodler
              </Text>
            </Pressable>
          ),
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="boards" />
        <Stack.Screen name="board" />
        <Stack.Screen name="task" />
      </Stack>
    </GestureHandlerRootView>
  );
}
