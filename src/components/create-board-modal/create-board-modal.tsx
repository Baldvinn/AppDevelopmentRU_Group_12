import { useState } from "react";
import { Modal, View, Text, TextInput } from "react-native";

interface CreateBoardModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function CreateBoardModal({
    visible,
    onClose
}: CreateBoardModalProps) {

}