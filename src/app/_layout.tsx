import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Main",
          }}
        />
        <Stack.Screen
          name="boards"
          options={{
            title: "Boards",
          }}
        />
        <Stack.Screen
          name="board"
          options={{
            title: "Board",
          }}
        />
        <Stack.Screen
          name="task"
          options={{
            title: "Task",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
