import { Pressable, Text } from "react-native";
import styles from "./styles";

type AppButtonProps = {
    label: string;
    onPress: () => void;
};

export default function AppButton({ label, onPress }: AppButtonProps) {
    return (
        <Pressable onPress={onPress} 
        style={({ pressed }) => [styles.button_style, pressed && styles.buttonPressed]}
        >
            <Text style={styles.label}>{label}</Text>
            
        </Pressable>
    );
}


