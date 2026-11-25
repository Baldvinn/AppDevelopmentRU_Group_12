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
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    padding: 12,
  },

  listName: {
    ...headings.h3,
    color: colors.mildblack,
  },

  taskList: {
    flex: 1,
    minHeight: 0,
  },
});
