import React, { createContext, useContext, useRef } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useMemoizedFn } from 'ahooks';

interface CustomModalContextType {
  registerModal: (id: string) => void;
  unregisterModal: (id: string) => void;
}

const CustomModalContext = createContext<CustomModalContextType | undefined>(undefined);

export const CustomModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scale = useSharedValue(1);
  const modalMap = useRef<Map<string, string>>(new Map()).current;

  const refreshScale = useMemoizedFn(() => {
    if (modalMap.size > 0) {
      scale.value = withTiming(0.9, { duration: 300 });
    } else {
      scale.value = withTiming(1, { duration: 300 });
    }
  });

  const unregisterModal = useMemoizedFn((id: string) => {
    modalMap.delete(id);
    refreshScale();
  });

  const registerModal = useMemoizedFn((id: string) => {
    modalMap.set(id, id);
    refreshScale();
  });

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{ scale: scale.value }],
  }));

  return (
    <CustomModalContext.Provider value={{ registerModal, unregisterModal }}>
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </CustomModalContext.Provider>
  );
};

export const useCustomModalContext = () => {
  const context = useContext(CustomModalContext);
  if (context === undefined) {
    throw new Error('useCustomModal must be used within a CustomModalProvider');
  }
  return context;
}; 