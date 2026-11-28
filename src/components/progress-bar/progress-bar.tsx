import { Text, View } from "react-native";
import styles from "./styles";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  return (
    <View
      style={styles.container}
      accessibilityLabel={completed + " of " + total + " tasks completed"}
    >
      <View style={styles.track}>
        <View style={[styles.fill, { flex: completed }]}></View>
        <View style={{ flex: total - completed }}></View>
      </View>
      <Text style={styles.label}>
        {completed}/{total} tasks completed
      </Text>
    </View>
  );
}
