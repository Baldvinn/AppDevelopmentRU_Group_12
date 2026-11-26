import * as colors from "@/styles/colors";
import { headings } from "@/styles/headings";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bakdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
  },
  content: {
    backgroundColor: colors.ivory,
    borderRadius: 12,
    padding: 20,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    ...headings.h3,
    color: colors.mildblack,
    flex: 1,
    textAlign: "center",
  },
});
