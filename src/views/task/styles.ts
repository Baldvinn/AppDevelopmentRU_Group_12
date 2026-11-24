import * as colors from "@/styles/colors";
import { headings } from "@/styles/headings";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  taskCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dddddd",
  },

  taskTitle: {
    ...headings.h2,
    marginBottom: 12,
  },

  taskStatus: {
    fontSize: 15,
    marginBottom: 20,
  },

  descriptionLabel: {
    ...headings.h3,
    marginBottom: 8,
    marginTop: 15,
    borderBottomColor: colors.lightgrey,
    borderBottomWidth: 2,
  },

  taskDescription: {
    fontSize: 15,
    color: "#442c2c",
  },

  boardLink: {
    color: colors.darkblue,
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 4,
  },
});
