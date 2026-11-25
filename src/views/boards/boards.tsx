import { FlatList, Text, View } from "react-native";
import AppButton from "@/components/appbutton/appbutton";
import { boards } from "../../resources/data.json";
import styles from "./styles";

export default function Boards() {
    return (
        <FlatList
        data={boards}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list}
        style={styles.screen}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            </View>
            )}
            ListFooterComponent={<AppButton label="Create new board" onPress={() => console.log("Create board pressed")} />}
        />
    )
}



