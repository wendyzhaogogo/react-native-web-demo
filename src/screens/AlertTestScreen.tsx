import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import NativeAlert from '../native/NativeAlert';

export const AlertTestScreen = () => {
  const handleShowAlert = async () => {
    try {
      await NativeAlert.showAlert(
        'Native Alert',
        'This is a native system alert!'
      );
    } catch (error) {
      console.error('Error showing alert:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={handleShowAlert}
        style={styles.button}
      >
        Show Native Alert
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    width: '80%',
  },
}); 