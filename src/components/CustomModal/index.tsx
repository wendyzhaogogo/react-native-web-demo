import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
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
  const overlayAnim = useSharedValue(0);
  const modalAnim = useSharedValue(height);

  const { registerModal, unregisterModal } = useCustomModalContext();
  const id = useRef(Math.random().toString(36).substring(2, 15)).current;

  useEffect(() => {
    if (visible) {
      registerModal(id);
      setShouldRender(true);
      overlayAnim.value = withTiming(1, { duration: 300 });
      modalAnim.value = withSpring(height - MODAL_HEIGHT, {
        damping: 20,
        stiffness: 90,
      });
      return () => {
        unregisterModal(id);
      };
    } else {
      overlayAnim.value = withTiming(0, { duration: 300 });
      modalAnim.value = withSpring(height, {
        damping: 20,
        stiffness: 90,
      }, () => {
        runOnJS(setShouldRender)(false);
      });
    }
  }, [visible]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayAnim.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: modalAnim.value }],
  }));

  if (!shouldRender) return null;

  return (
    <Portal>
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {/* 遮罩 */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>
        {/* Modal 内容 */}
        <Animated.View
          style={[
            styles.modal,
            { height: MODAL_HEIGHT },
            modalStyle,
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
