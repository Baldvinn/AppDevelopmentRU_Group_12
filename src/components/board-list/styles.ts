import * as colors from "@/styles/colors";
import { headings } from "@/styles/headings";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  listContainer: {
    height: "100%",
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#fff",
    overflow: "hidden",

    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  listHeader: {
    padding: 14,
    backgroundColor: "#D4EAFB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 48,
  },

  listContent: {
    padding: 12,
  },

  listName: {
    flex: 1,
    flexShrink:1, 
    textAlign: "center",
    ...headings.h3,
    color: colors.mildblack,
  },

  taskList: {
    flex: 1,
    minHeight: 0,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginLeft: 8,
    padding: 6,
  },
  editText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1A1A1A",
  },
  sideAction: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  listSelected: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  noTaskMessage: {
      textAlign: "center",
      marginTop: 40,
      fontSize: 16,
      color: colors.mildblack,
  },
});
