import * as colors from "@/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    formContainer: {
        width: "100%",
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#ccc",
    },
    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    addTaskContainer: {
        height: 30,
        alignItems: "center",
        justifyContent: "center",    
    },
    addTaskText: {
        fontWeight: "bold",
        fontSize: 14,
    }

})