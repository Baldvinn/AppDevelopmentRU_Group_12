import * as colors from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'whitesmoke',
        opacity: 0.8,
        padding: 20,
        borderRadius: 10,
        borderColor: 'powderblue',
        borderWidth: 4,
        
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
    },
});

