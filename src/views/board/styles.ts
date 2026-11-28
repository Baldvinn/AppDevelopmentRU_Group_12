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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    marginBottom: 12,
  },

  boardContents: {
    flex: 1,
    minHeight: 0,
  },

  boardName: {
    ...headings.h2,
    color: colors.mildblack,
  },

  boardDescription: {
    marginTop: 2,
    fontSize: 14,
    color: colors.mildblack,
    opacity: 0.7,
  },

  boardThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: colors.lightgrey,
  },

  boardHeaderText: {
    flex: 1,
  },
  noListsMessage: {
    width: 300,
    marginTop: 40,
    marginLeft: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#1A1A1A",
  }
});
