import { Pressable, Text } from "react-native";
import styles from "./styles";

type AppButtonProps = {
    label: string;
    onPress: () => void;
    marginTop?: number;
};

export default function AppButton({ label, onPress, marginTop = 30 }: AppButtonProps) {
    return (
        <Pressable onPress={onPress} 
        style={({ pressed }) => [styles.button_style, { marginTop}, pressed && styles.buttonPressed]}
        >
            <Text style={styles.label}>{label}</Text>
            
        </Pressable>
    );
}


