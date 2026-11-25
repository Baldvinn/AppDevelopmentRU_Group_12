import { FlatList, Text, View, Image, Pressable } from "react-native";
import AppButton from "@/components/appbutton/appbutton";
import { boards } from "../../resources/data.json";
import styles from "./styles";
import { router } from "expo-router";

export default function Boards() {
    return (
        <FlatList
        data={boards}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list}
        style={styles.screen}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <Pressable style={styles.card} 
            onPress={() => router.push({ 
                pathname: "/board", 
                params: { id: item.id.toString() } })}>
            <Image source={{ uri: item.thumbnailPhoto}} style={styles.thumbnail}/>
            <View style={styles.textBlock}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            </View>
            </Pressable>
            )}
            ListFooterComponent={<AppButton label="Create new board" onPress={() => console.log("Create board pressed")} />}
        />
    )
}



