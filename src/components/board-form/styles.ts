import { lightgrey, lightred } from "@/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: lightgrey,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
  },
  error: {
    color: lightred,
    marginTop: -10,
    marginBottom: 10,
  },

});
