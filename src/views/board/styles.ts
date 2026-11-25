import * as colors from "@/styles/colors";
import { headings } from "@/styles/headings";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  boardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.lightblue,
  },

  boardHeader: {
    padding: 10,
  },

  boardContents: {},

  boardName: {
    ...headings.h2,
    color: colors.mildblack,
  },
});
