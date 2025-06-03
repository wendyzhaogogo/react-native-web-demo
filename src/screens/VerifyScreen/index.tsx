import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { verifySignature } from '@/utils/crypto';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'Verify'>;

export const VerifyScreen = () => {
  const route = useRoute<VerifyScreenRouteProp>();
  const [message, setMessage] = useState(route.params?.message || '');
  const [publicKey, setPublicKey] = useState(route.params?.publicKey || '');
  const [signature, setSignature] = useState(route.params?.signature || '');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleVerify = async () => {
    if (!message || !publicKey || !signature) return;
    
    const valid = await verifySignature(message, signature, publicKey);
    setIsValid(valid);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>Verify Signature</Text>

        <TextInput
          mode="outlined"
          label="Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          style={styles.input}
          submitBehavior="blurAndSubmit"
          returnKeyType="done"
        />

        <TextInput
          mode="outlined"
          label="Public Key (base64)"
          value={publicKey}
          onChangeText={setPublicKey}
          style={styles.input}
          submitBehavior="blurAndSubmit"
          returnKeyType="done"
          multiline
        />

        <TextInput
          mode="outlined"
          label="Signature (base64)"
          value={signature}
          onChangeText={setSignature}
          style={styles.input}
          submitBehavior="blurAndSubmit"
          returnKeyType="done"
          multiline
        />

        <Button 
          mode="contained"
          onPress={handleVerify} 
          style={styles.button}
        >
          Verify
        </Button>

        {isValid !== null ? (
          <View style={[
            styles.resultCard,
            isValid ? styles.successCard : styles.errorCard
          ]}>
            <Text style={[
              styles.resultText,
              isValid ? styles.successText : styles.errorText
            ]}>
              {isValid ? 'Valid Signature' : 'Invalid Signature'}
            </Text>
          </View>
        ):null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 16,
  },
  resultCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  successCard: {
    backgroundColor: '#dcfce7',
  },
  errorCard: {
    backgroundColor: '#fee2e2',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  successText: {
    color: '#166534',
  },
  errorText: {
    color: '#991b1b',
  },
}); 