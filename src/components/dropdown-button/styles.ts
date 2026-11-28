import { StyleSheet } from "react-native";
import * as colors from "../../styles/colors";

export default StyleSheet.create({
  modalButton: {
    flex: 1,
  },

  modalDropdownSection: {
    gap: 6,
  },

  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  dropdownItemSelected: {
    backgroundColor: colors.lightlightgrey,
  },
});
