import { lightgrey, mildblack } from "@/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: mildblack,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: lightgrey,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  error: {
    color: "#cc0000",
    marginTop: 4,
  },
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: lightgrey,
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: mildblack,
  },

  modalLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    opacity: 0.6,
    marginTop: 10,
  },
});
