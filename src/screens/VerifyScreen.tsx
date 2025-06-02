import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { verifySignature } from '@/utils/crypto';

export const VerifyScreen = () => {
  const [message, setMessage] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [signature, setSignature] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleVerify = async () => {
    if (!message || !publicKey || !signature) return;
    
    const valid = await verifySignature(message, signature, publicKey);
    setIsValid(valid);
  };

  return (
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
      />

      <TextInput
        mode="outlined"
        label="Public Key (base64)"
        value={publicKey}
        onChangeText={setPublicKey}
        style={styles.input}
      />

      <TextInput
        mode="outlined"
        label="Signature (base64)"
        value={signature}
        onChangeText={setSignature}
        style={styles.input}
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