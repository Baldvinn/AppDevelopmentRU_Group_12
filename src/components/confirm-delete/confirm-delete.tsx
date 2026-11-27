import AppButton from "@/components/appbutton/appbutton";
import { Text, View } from "react-native";
import styles from "./styles";

interface ConfirmDeleteProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDelete({ message, onConfirm, onCancel}: ConfirmDeleteProps) {
    return (
        <View>
            <Text style={styles.message}>{message}</Text>
            <AppButton label="Delete" marginTop={10} onPress={onConfirm}></AppButton>
            <AppButton label="Cancel" marginTop={10} onPress={onCancel}></AppButton>
        </View>
    );
}