import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { useCustomModalContext } from "./CustomModalProvider";
import { Portal } from "react-native-paper";

const { height } = Dimensions.get("window");
const MODAL_HEIGHT = height * 0.95;

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(height)).current;

  const { registerModal, unregisterModal } = useCustomModalContext();
  const id = useRef(Math.random().toString(36).substring(2, 15)).current;
  useEffect(() => {
    if (visible) {
      registerModal(id);
      return () => {
        unregisterModal(id);
      };
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.93,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalAnim, {
          toValue: height - MODAL_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <Portal>
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {/* 遮罩 */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.overlay, { opacity: overlayAnim }]} />
        </TouchableWithoutFeedback>
        {/* Modal 内容 */}
        <Animated.View
          style={[
            styles.modal,
            {
              height: MODAL_HEIGHT,
              transform: [{ translateY: modalAnim }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    position: "absolute",
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    bottom: 0,
    elevation: 10,
  },
});
