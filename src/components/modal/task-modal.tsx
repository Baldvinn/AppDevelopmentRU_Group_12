import { AntDesign } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, Modal as RNModal, Text, View } from "react-native";
import * as colors from "../../styles/colors";
import styles from "./styles";

interface ModalProps {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children?: ReactNode;
}

export function Modal(props: ModalProps) {
  return (
    <RNModal
      visible={props.isOpen}
      transparent
      animationType="fade"
      onRequestClose={props.closeModal}
    >
      <Pressable style={styles.bakdrop} onPress={props.closeModal}>
        <Pressable
          style={styles.container}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>{props.title}</Text>
              <Pressable
                onPress={props.closeModal}
                accessibilityLabel={"Close"}
                hitSlop={10}
              >
                <AntDesign name="close" size={22} color={colors.mildblack} />
              </Pressable>
            </View>
            {props.children}
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
