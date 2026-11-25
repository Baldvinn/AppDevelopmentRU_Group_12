import { ivory, lightblue, lightred, mildblack } from "@/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightblue,
    padding: 20,
    gap: 40,
  },

  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderColor: ivory,
    borderWidth: 2,
    backgroundColor: lightred,
    borderRadius: 20,
    elevation: 5,
  },

  buttonText: {
    color: mildblack,
    fontWeight: "bold",
    fontSize: 16,
  },

  image: {
    width: "80%",
    height: "25%",
    resizeMode: "contain",
  },
});
