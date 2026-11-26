import { FlatList, Text, View, Image, Pressable, Modal } from "react-native";
import AppButton from "@/components/appbutton/appbutton";
import { boards } from "../../resources/data.json";
import styles from "./styles";
import { router } from "expo-router";
import { useState } from "react";
import CreateBoardModal from "@/components/create-board-modal/create-board-modal";

export default function Boards() {
    const [createBoardVisible, setCreateBoardVisible] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailPhoto, setThumbnailPhoto] = useState("");
    return (
        <View style={styles.screen}>
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
                
            />
            <View style={styles.buttonContainer}>
                <AppButton label="Create new board" onPress={() => setCreateBoardVisible(true)} />
            </View>
            
            <CreateBoardModal visible={createBoardVisible} onClose={() => setCreateBoardVisible(false)}></CreateBoardModal>
        </View>

    )
}



