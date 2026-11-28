import {lightgrey, mildblack } from "@/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flexDirection:"row",
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: lightgrey,
        borderRadius: 20,
        overflow: "hidden",
        marginHorizontal: 12,
        marginBottom: 12,
        backgroundColor: "#ffffff",
    },
    option: {
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    selected: {
        backgroundColor: "#1F4A82",
    },
    text: {
        fontSize: 14,
        color: mildblack,
    },
    selectedText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});