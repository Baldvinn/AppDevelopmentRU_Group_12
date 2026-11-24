import * as colors from "@/styles/colors";
import { headings } from "@/styles/headings";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  listContainer: {
    width: 280,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#fff",
    elevation: 5,
  },

  listHeader: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    padding: 12,
    backgroundColor: "#fff",
  },

  listName: {
    ...headings.h3,
    color: colors.mildblack,
  },
});
