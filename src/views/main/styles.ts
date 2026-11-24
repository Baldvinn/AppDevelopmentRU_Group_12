import { StyleSheet } from "react-native";
import { lightblue, lightred, ivory, mildblack} from "@/styles/colors";


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: lightblue,
        padding: 20,
        gap: 40,
    },

    button:{
        marginTop: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor:ivory,
        borderWidth: 2,
        backgroundColor: lightred,
    },

    buttonText:{
        color:mildblack,


    },
})
