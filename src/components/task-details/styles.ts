import { StyleSheet } from "react-native";
import * as colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    gap: 6,
  },

  modalLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    opacity: 0.6,
  },

  modalDescription: {
    fontSize: 16,
    lineHeight: 22,
  },

  modalDivider: {
    height: 1,
    backgroundColor: colors.lightgrey,
    marginTop: 8,
  },

  editRemoveTaskButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },

  modalButton: {
    flex: 1,
  },
});
