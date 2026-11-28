import { TaskFilter as Filter } from "@/types/TaskFilter";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

const OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "todo", label: "To do" },
  { value: "done", label: "Done" },
];

interface TaskFilterProps {
  value: Filter;
  onChange: (value: Filter) => void;
}

export default function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => onChange(option.value)}
          accessibilityRole="button"
          accessibilityState={{ selected: value === option.value }}
          style={[styles.option, value === option.value && styles.selected]}
        >
          <Text
            style={[styles.text, value === option.value && styles.selectedText]}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
