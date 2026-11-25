import { Stack, router, usePathname } from "expo-router";
import { Pressable, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoardToolbar } from "../components/toolbar/toolbar";

export default function RootLayout() {
  const pathname = usePathname();
  const hiddenRoutes = ["/", "/boards"];
  const showToolbar = !hiddenRoutes.includes(pathname);
  function handleAddCard() {
    console.log("Add card pressed");
  }
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
      {showToolbar && (
        <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#f2f2f2" }}>
          <BoardToolbar onAddCard={handleAddCard} />
        </SafeAreaView>
      )}
    </GestureHandlerRootView>
  );
}
