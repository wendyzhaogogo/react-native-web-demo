import React, { createContext, useContext, useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMemoizedFn } from 'ahooks';

interface CustomModalContextType {
  registerModal: (id: string) => void;
  unregisterModal: (id: string) => void;
}

const CustomModalContext = createContext<CustomModalContextType | undefined>(undefined);

export const CustomModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const triggerScale = (scale: number) => {
    Animated.timing(scaleAnim, {
      toValue: scale,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

 const modalMap = useRef<Map<string, string>>(new Map()).current;

  const refreshScale = useMemoizedFn(() => {
    if(modalMap.size > 0) {
      console.log('modalMap.size', modalMap.size,"triggerScale(0.9);");
      triggerScale(0.9);
    } else {
      console.log('modalMap.size', modalMap.size,"triggerScale(1);");
      triggerScale(1);
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

  return (
    <CustomModalContext.Provider value={{ registerModal, unregisterModal }}>
      <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
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