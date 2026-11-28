import { lightlightgrey, mildblack } from "@/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingTop: 8,
    },
    track: {
        flexDirection: "row",
        height: 8,
        borderRadius: 4,
        backgroundColor: lightlightgrey,
        overflow: "hidden",
    },
    fill: {
        backgroundColor: "#89C66F",
        borderRadius: 4,
    },
    label: {
        fontSize: 12,
        color: mildblack,
        marginTop: 4,
    },

})