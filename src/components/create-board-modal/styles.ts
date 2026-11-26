import { ivory, lightgrey } from "@/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: "85%",
    backgroundColor: ivory,
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: lightgrey,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
  },
});
