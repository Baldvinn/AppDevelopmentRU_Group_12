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
    backgroundColor: "#E6F2FF",
  },
  taskName: {
    flexShrink: 1,
    marginRight: 10,
  },
  finishedTaskName: {
    color: "#16A34A",
    textDecorationLine: "line-through",
    textDecorationColor: "#16A34A",
  },
  checkButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  emptyCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#888888",
  },
});
