import * as colors from "@/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  taskCard: {
    backgroundColor: colors.lightlightgrey,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedTask: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
});
