import { StyleSheet } from "react-native";
import { lightblue, lightgrey, mildblack} from "@/styles/colors";


export default StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: lightgrey,
        borderRadius: 10,
        padding: 15,
        height: 110,
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: mildblack,
    },
    description: {
        fontSize: 14,
        color: "#666666",
    },
    list: {
        padding: 20,
    },
    screen: {
        flex: 1,
        backgroundColor: lightblue,
    }
});
