import * as colors from "@/styles/colors";
import { headings } from "@/styles/headings";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  boardContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.lightblue,
  },

  boardHeader: {
    paddingVertical: 12,
    marginBottom: 16,
    alignItems: "center",
  },

  boardContents: {
    flex: 1,
    minHeight: 0,
  },

  boardName: {
    ...headings.h2,
    color: colors.mildblack,
  },
});
