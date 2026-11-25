import { StyleSheet } from "react-native";
import { lightred, mildblack} from "@/styles/colors";


export default StyleSheet.create({
    button_style: {
        marginTop: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderColor:lightred,
        borderWidth: 2,
        backgroundColor: "white",
        borderRadius:20,
        elevation: 5, 
    },
    buttonPressed: {
        opacity: 0.7,
    },
    label: {
        color:mildblack,
        fontWeight: `bold`,
        fontSize: 16,
    },
});

