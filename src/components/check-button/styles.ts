import { StyleSheet } from "react-native";
import * as colors from "../../styles/colors";

export default StyleSheet.create({
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
  withLabel: {
    width: "auto",
    height: "auto",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  labelText: {
    fontSize: 16,
    color: colors.mildblack,
  },
  labelDone: {
    color: "#16A34A",
    fontWeight: "600",
  },
});
