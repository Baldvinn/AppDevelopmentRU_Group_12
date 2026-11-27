import { lightred, mildblack } from "@/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button_style: {
    alignItems: "center",
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: lightred,
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  label: {
    color: mildblack,
    fontWeight: `bold`,
    fontSize: 16,
  },
});
